#!/usr/bin/env node
/**
 * minerar-ganchos.js — acha os melhores cortes dentro de uma gravação longa.
 *
 * PARA QUE SERVE: o o dono do canal vai passar gravações de 10, 20, 60 minutos. Cada
 * uma tem alguns trechos que viram Reels e muito material que não vira. Achar
 * esses trechos lendo a transcrição inteira dentro da conversa custa caro e
 * repete o custo a cada turno seguinte da sessão.
 *
 * A ECONOMIA: este script lê o arquivo inteiro FORA do contexto e devolve só
 * as linhas dos candidatos. Uma hora de gravação tem cerca de 9 mil palavras;
 * a saída daqui tem 20 linhas. É a diferença entre gastar 12 mil tokens por
 * gravação e gastar 300.
 *
 * A RÉGUA é a que já existe em docs/rules-on-demand/hook-intelligence.md: dez
 * gatilhos mentais, cinco critérios de qualidade e cinco motivos de reprovação
 * automática. Aqui ela vira código, com o mesmo gate.
 *
 * Uso:
 *   node scripts/minerar-ganchos.js <transcricao> [--quantos 10] [--json] [--min 25] [--max 75]
 *
 * Aceita `narration.json` do squad, `.srt`, `.vtt` e JSON do Whisper.
 */

const fs = require("fs");
const path = require("path");

const MOTION = path.resolve(__dirname, "..");
const REF = path.join(MOTION, "aprendizado", "ganchos-aprovados.json");

/* ------------------------------------------------------------------ *
 * ler a transcrição, em qualquer formato que ele mande
 * ------------------------------------------------------------------ */

const tempoSrt = (t) => {
  const m = /(\d+):(\d+):(\d+)[,.](\d+)/.exec(t);
  return m ? +m[1] * 3600 + +m[2] * 60 + +m[3] + +m[4] / 1000 : null;
};

function lerTranscricao(arquivo) {
  const bruto = fs.readFileSync(arquivo, "utf8");

  if (/\.(srt|vtt)$/i.test(arquivo)) {
    const blocos = bruto.split(/\r?\n\r?\n/);
    const falas = [];
    for (const b of blocos) {
      const linhas = b.split(/\r?\n/).filter(Boolean);
      const iTempo = linhas.findIndex((l) => l.includes("-->"));
      if (iTempo === -1) continue;
      const [de, ate] = linhas[iTempo].split("-->").map((x) => tempoSrt(x.trim()));
      const texto = linhas.slice(iTempo + 1).join(" ").trim();
      if (de === null || !texto) continue;
      falas.push({ texto, start: de, end: ate === null ? de + 2 : ate });
    }
    return falas;
  }

  const d = JSON.parse(bruto);
  // narration.json do squad, ou Whisper com word timestamps
  const palavras = d.words || (d.segments && d.segments.flatMap((s) => s.words || [])) || null;
  if (palavras && palavras.length && palavras[0].start !== undefined) {
    return palavras.map((w) => ({
      texto: (w.text || w.word || "").trim(),
      start: w.start,
      end: w.end,
      palavra: true,
    }));
  }
  if (d.segments) {
    return d.segments.map((s) => ({ texto: (s.text || "").trim(), start: s.start, end: s.end }));
  }
  throw new Error("nao reconheci o formato da transcricao");
}

/**
 * Junta palavras em unidades de fala. A fronteira ideal é ponto final ou pausa
 * longa, mas fala corrida não tem nem um nem outro: a transcrição do Hamilton
 * trouxe 37 palavras seguidas sem pausa de meio segundo. Por isso a quebra tem
 * três níveis, do melhor para o aceitável: pontuação, pausa, e vírgula ou
 * limite duro quando a unidade já ficou longa demais para caber num corte.
 */
const MAX_PALAVRAS = 22;
const MAX_SEGUNDOS = 9;

function emFrases(itens, pausaS = 0.45) {
  if (!itens.length) return [];
  if (!itens[0].palavra) return itens.map((i) => ({ ...i, palavras: i.texto.split(/\s+/).length }));

  const frases = [];
  let atual = null;
  let n = 0;
  for (let i = 0; i < itens.length; i++) {
    const w = itens[i];
    if (!atual) {
      atual = { texto: w.texto, start: w.start, end: w.end };
      n = 1;
    } else {
      atual.texto += " " + w.texto;
      atual.end = w.end;
      n++;
    }
    const proximo = itens[i + 1];
    const fimDeFrase = /[.!?]$/.test(w.texto);
    const pausa = proximo ? proximo.start - w.end >= pausaS : true;
    const longa = n >= 12 && /,$/.test(w.texto);
    const estourou = n >= MAX_PALAVRAS || atual.end - atual.start >= MAX_SEGUNDOS;
    if (fimDeFrase || pausa || longa || estourou || !proximo) {
      atual.palavras = n;
      frases.push(atual);
      atual = null;
    }
  }
  return frases;
}

/**
 * A abertura: o que o espectador ouve nos primeiros segundos, que é o que
 * decide se ele fica. A régua de seis palavras do hook-intelligence é do texto
 * ESCRITO na tela; a fala de abertura é naturalmente mais longa. Julgar a fala
 * pela régua do lettering reprovava gancho que funcionou de verdade.
 */
const ABERTURA_S = 4;
const ABERTURA_PALAVRAS = 14;

function abertura(frase) {
  const palavras = frase.texto.split(/\s+/);
  const proporcao = Math.min(1, ABERTURA_S / Math.max(0.1, frase.end - frase.start));
  const quantas = Math.max(
    5,
    Math.min(ABERTURA_PALAVRAS, Math.round(palavras.length * proporcao))
  );
  return {
    texto: palavras.slice(0, quantas).join(" "),
    palavras: Math.min(quantas, palavras.length),
  };
}

/* ------------------------------------------------------------------ *
 * os dez gatilhos, como léxico
 * ------------------------------------------------------------------ */

const semAcento = (t) =>
  String(t).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/**
 * Cada gatilho é um par de peso e marcas. Peso alto é o que para o dedo: dizer
 * que a pessoa está errando para mais do que prometer um resultado bonito.
 */
const GATILHOS = [
  { id: "erro-acusacao", peso: 10, marcas: ["esta errando", "voce erra", "erra na", "o erro que", "a maioria erra", "erro mais comum", "voce esta perdendo", "ta fazendo errado", "para de", "pare de"] },
  { id: "contraintuitivo", peso: 10, marcas: ["nao e bem assim", "ao contrario", "nao resolve", "nao funciona", "todo mundo acha", "todo mundo pensa", "na verdade nao", "nao adianta", "esqueca", "menos e mais", "o problema nao e"] },
  { id: "proibido", peso: 9, marcas: ["ninguem te conta", "ninguem fala", "nao te contam", "o que ninguem", "nao querem que", "segredo", "por tras dos panos", "verdade que"] },
  { id: "validacao-negada", peso: 8, marcas: ["nao e sobre", "nao tem nada a ver", "nao precisa de", "voce nao precisa", "isso nao e", "para de achar"] },
  { id: "medo-ameaca", peso: 8, marcas: ["voce vai perder", "vai quebrar", "vai fracassar", "abandonam", "desistem", "perdendo dinheiro", "jogando dinheiro", "queimando", "morre", "trava"] },
  { id: "gap-de-informacao", peso: 7, marcas: ["o que acontece quando", "sabe por que", "voce sabe", "por que sera", "o que faz", "qual a diferenca", "existe um", "tem um conceito", "chamado de"] },
  { id: "situacao-especifica", peso: 7, marcas: ["quando voce", "se voce tem", "aquele cliente", "aquele aluno", "quem ja", "toda vez que", "a maior parte das pessoas", "a maioria das pessoas"] },
  { id: "numero-especifico", peso: 6, re: /\b(\d+|um|dois|tres|quatro|cinco|seis|sete|oito|nove|dez)\s+(passos?|sinais?|erros?|jeitos?|formas?|motivos?|coisas?|tipos?|niveis?|etapas?)\b/ },
  { id: "antes-depois", peso: 6, marcas: ["de zero a", "antes eu", "hoje eu", "virou", "passou a ser", "saiu de", "em vez de"] },
  // APRENDIDO COM O QUE FUNCIONOU, nao veio da regua escrita: o reel do
  // Instagram do mentor foi aprovado e nao bate nenhum dos dez gatilhos de
  // conflito. Ele abre nomeando um objeto concreto do publico e prometendo a
  // forma certa dele. E gancho de utilidade, e vale menos que conflito, mas
  // vale. Sem isto o minerador reprovava uma peca que o o dono do canal aprovou.
  { id: "receita-especifica", peso: 6, re: /(o|a)\s+\w+\s+(do|da|de)\s+\w+,?\s+(ele|ela)?\s*(tem que|precisa|deve|deveria)/ },
  { id: "estranho", peso: 5, marcas: ["estranho", "bizarro", "voce acredita", "parece loucura", "ninguem imagina", "engracado que"] },
];

/**
 * Motivos de reprovação automática, direto do hook-intelligence, aplicados na
 * ABERTURA e não na unidade inteira: o que reprova um gancho é como ele começa.
 */
function reprovar(frase) {
  const ab = abertura(frase);
  const t = semAcento(ab.texto);
  const motivos = [];
  if (ab.palavras < 4) motivos.push("fragmento sem contexto");
  if (/^(eu (fiz|aprendi|falei|acho|vou|tava|estava)|entao eu|ai eu)\b/.test(t)) {
    motivos.push("comeca na primeira pessoa do mentor, nao fala com o espectador");
  }
  if (/^(entao|ai|dai|mas|porque|porem|e ai|tipo|assim|ne|bom|beleza|ok)\b/.test(t)) {
    motivos.push("comeca com emenda, o corte cairia no meio de um pensamento");
  }
  if (/(isso vai mudar tudo|muito importante|muito legal|muito bom|super importante)/.test(t)) {
    motivos.push("generico sem gatilho");
  }
  return motivos;
}

function pontuar(frase) {
  const ab = abertura(frase);
  const tAbertura = semAcento(ab.texto);
  const tTudo = semAcento(frase.texto);
  const achados = [];
  for (const g of GATILHOS) {
    const naAbertura = g.re ? g.re.test(tAbertura) : g.marcas.some((m) => tAbertura.includes(m));
    const noResto = g.re ? g.re.test(tTudo) : g.marcas.some((m) => tTudo.includes(m));
    // gatilho na abertura vale cheio; mais adiante vale metade, porque o
    // espectador já decidiu antes de chegar lá
    if (naAbertura) achados.push({ ...g, onde: "abertura", valor: g.peso });
    else if (noResto) achados.push({ ...g, onde: "depois", valor: Math.round(g.peso / 2) });
  }
  let nota = achados.reduce((s, g) => s + g.valor, 0);

  // um gatilho forte vale mais que três fracos empilhados
  if (achados.length > 2) nota -= (achados.length - 2) * 2;
  // abertura enxuta para o dedo mais rápido
  if (ab.palavras <= 10) nota += 3;
  // pergunta aberta cria tensão sozinha
  if (/\?/.test(ab.texto)) nota += 2;

  return {
    nota,
    gatilhos: achados.map((g) => (g.onde === "abertura" ? g.id : g.id + "(depois)")),
    abertura: ab.texto,
  };
}

/* ------------------------------------------------------------------ *
 * do gancho até onde o assunto fecha
 * ------------------------------------------------------------------ */

/**
 * O corte começa no gancho e vai até o assunto fechar. Fechar aqui é uma
 * fronteira de frase dentro da janela de duração pedida: cortar no meio de uma
 * frase é o defeito que faz o corte parecer automático.
 */
function fecharCorte(frases, i, minS, maxS, ehGancho) {
  const inicio = frases[i].start;
  let fim = frases[i].end;
  let j = i;
  while (j + 1 < frases.length && frases[j + 1].end - inicio <= maxS) {
    // O corte NAO atravessa o proximo gancho: em gravacao longa, engolir o
    // gancho seguinte custa um Reels inteiro. Melhor um corte mais curto e
    // dois videos do que um corte longo e um perdido.
    if (ehGancho && ehGancho(j + 1) && fim - inicio >= minS) break;
    j++;
    fim = frases[j].end;
  }
  if (fim - inicio < minS) return null;
  return { de: inicio, ate: fim, ultimaFrase: j };
}

/* ------------------------------------------------------------------ *
 * minerar
 * ------------------------------------------------------------------ */

function minerar(arquivo, opts = {}) {
  const quantos = opts.quantos || 10;
  const minS = opts.min || 25;
  const maxS = opts.max || 75;

  const frases = emFrases(lerTranscricao(arquivo));
  const duracao = frases.length ? frases[frases.length - 1].end : 0;

  // Passo 1: marcar TODAS as frases que são gancho. O corte precisa saber onde
  // começa o próximo para não passar por cima dele.
  const ehGancho = frases.map((f) => !reprovar(f).length && pontuar(f).gatilhos.length > 0);

  const candidatos = [];
  const reprovados = [];
  for (let i = 0; i < frases.length; i++) {
    const f = frases[i];
    const motivos = reprovar(f);
    const { nota, gatilhos, abertura: ab } = pontuar(f);
    if (motivos.length) {
      if (gatilhos.length) reprovados.push({ frase: f, motivos, gatilhos });
      continue;
    }
    if (!gatilhos.length) continue; // o gate: sem gatilho, não é gancho
    const corte = fecharCorte(frases, i, minS, maxS, (k) => ehGancho[k]);
    if (!corte) continue;
    candidatos.push({
      nota,
      gatilhos,
      gancho: ab,
      falaInteira: f.texto,
      de: +corte.de.toFixed(2),
      ate: +corte.ate.toFixed(2),
      duracao: +(corte.ate - corte.de).toFixed(1),
      frases: corte.ultimaFrase - i + 1,
    });
  }

  // Cortes que se cobrem: fica o de maior nota. Dois Reels do mesmo trecho é
  // um Reels e um desperdício.
  candidatos.sort((a, b) => b.nota - a.nota);
  const escolhidos = [];
  for (const c of candidatos) {
    if (escolhidos.some((e) => c.de < e.ate && c.ate > e.de)) continue;
    escolhidos.push(c);
    if (escolhidos.length >= quantos) break;
  }

  return {
    arquivo: path.basename(arquivo),
    duracaoS: +duracao.toFixed(1),
    frases: frases.length,
    candidatos: escolhidos,
    reprovadosComGatilho: reprovados.length,
  };
}

/* ------------------------------------------------------------------ *
 * saída
 * ------------------------------------------------------------------ */

const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

function imprimir(r) {
  console.log(`\n${r.arquivo}: ${mmss(r.duracaoS)} de gravacao, ${r.frases} frases.`);
  console.log(`${r.candidatos.length} corte(s) com gancho aprovado pela regua.\n`);
  if (!r.candidatos.length) {
    console.log("Nenhum trecho passou no gate. Ou a gravacao nao tem gancho, ou a fala");
    console.log("e toda em primeira pessoa e emenda. Vale ouvir antes de descartar.\n");
    return;
  }
  r.candidatos.forEach((c, i) => {
    console.log(`  ${String(i + 1).padStart(2)}. ${mmss(c.de)} a ${mmss(c.ate)}  (${c.duracao}s, nota ${c.nota})`);
    console.log(`      ${c.gatilhos.join(", ")}`);
    console.log(`      "${c.gancho.length > 100 ? c.gancho.slice(0, 97) + "..." : c.gancho}"`);
    console.log("");
  });
  if (r.reprovadosComGatilho) {
    console.log(`(${r.reprovadosComGatilho} trecho(s) tinham gatilho mas caíram no gate de reprovacao.)`);
  }
  console.log("Proximo passo: node scripts/lote.js --de <este arquivo> --cortes 1,3,5\n");
}

if (require.main === module) {
  const argv = process.argv.slice(2);
  const arquivo = argv.find((a) => !a.startsWith("--"));
  if (!arquivo) {
    console.error("Uso: node scripts/minerar-ganchos.js <transcricao> [--quantos 10] [--json]");
    process.exit(1);
  }
  if (!fs.existsSync(arquivo)) {
    console.error(`Erro: nao achei ${arquivo}`);
    process.exit(1);
  }
  const num = (n, d) => {
    const i = argv.indexOf("--" + n);
    return i !== -1 ? Number(argv[i + 1]) : d;
  };
  let r;
  try {
    r = minerar(arquivo, { quantos: num("quantos", 10), min: num("min", 25), max: num("max", 75) });
  } catch (e) {
    console.error("Erro: " + e.message);
    process.exit(1);
  }
  if (argv.includes("--json")) console.log(JSON.stringify(r, null, 2));
  else imprimir(r);
  process.exit(r.candidatos.length ? 0 : 3);
}

module.exports = { minerar, lerTranscricao, emFrases, pontuar, reprovar, GATILHOS };
