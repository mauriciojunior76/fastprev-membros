#!/usr/bin/env node
/**
 * aprendizado.js — o squad aprende com o que já foi corrigido, sozinho.
 *
 * A regra que o o dono do canal deu: uma vez é registro; DUAS VEZES significa que a
 * explicação em texto não pegou, e a lição tem que virar checagem mecânica;
 * TRÊS ou mais vira gate que bloqueia a entrega. Atenção não escala, código
 * escala.
 *
 * Como o sistema sabe que errou: ele reclama.
 * Como o sistema sabe que acertou: ele aprova a peça.
 * Não existe terceira fonte de verdade, e o script não inventa nenhuma.
 *
 * Comandos:
 *   --revisar <Composition>     roda tudo que é automático e lista o que só o olho pega
 *   --relatorio                 quantas vezes cada erro, o que já virou gate, o que falta
 *   --reclamacao <id> "frase"   ele reclamou de novo: soma uma vez e escala a lição
 *   --aprovado <Composition>    ele aprovou: a peça vira referência do que é certo
 *
 * O registro é `aprendizado/licoes.json`. A contagem NUNCA se edita à mão: ela
 * é o que decide se a lição vira gate, então chute ali desliga proteção.
 */

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const MOTION = path.resolve(__dirname, "..");
const LICOES = path.join(MOTION, "aprendizado", "licoes.json");
const APROVADAS = path.join(MOTION, "aprendizado", "pecas-aprovadas.json");

const ler = () => JSON.parse(fs.readFileSync(LICOES, "utf8"));
const gravar = (d) => fs.writeFileSync(LICOES, JSON.stringify(d, null, 2) + "\n", "utf8");

/** A escada: quantas vezes ele falou decide o que a lição vira. */
function estadoPorVezes(vezes) {
  if (vezes >= 3) return "gate";
  if (vezes === 2) return "checagem";
  return "registrado";
}

/* ------------------------------------------------------------------ *
 * revisar: o que roda sozinho
 * ------------------------------------------------------------------ */

/**
 * Cada verificador é um comando de verdade. Um que não existe não conta como
 * cobertura: aparece como buraco no relatório, e não como sucesso silencioso.
 */
const VERIFICADORES = {
  "cor-de-marca": (comp) => ["node", ["scripts/checar-cor-de-marca.js", comp]],
  "imagem-repetida": (comp) => ["node", ["scripts/checar-asset-repetido.js", comp]],
  "enquadramento-de-foto": (comp) => ["node", ["scripts/checar-foto-enquadramento.js", comp]],
  "som-por-movimento": (comp) => ["node", ["scripts/choreo-lint.js", comp]],
  "organizacao-de-material": () => ["node", ["scripts/organizar-producao.js", "--auditar"]],
  "letras-jornada": (comp) => ["node", ["scripts/checar-pedido-literal.js", comp]],
  "espacamento-e-alinhamento": (comp) => ["node", ["scripts/checar-espacamento.js", comp]],
  "design-system-do-indice": (comp) => ["node", ["scripts/checar-design-system.js", comp]],
  "material-de-terceiro": (comp) => ["node", ["scripts/checar-origem-de-marca.js", comp]],
  "cadencia-do-tile": (comp) => ["node", ["scripts/checar-cadencia.js", comp]],
  // Os tres abaixo existiam soltos em scripts/ e nunca entravam na revisao
  // automatica: so rodavam quando alguem lembrava, que e o mesmo que nao
  // existir (achado do mapeamento de 06/09/2026, na absorcao do 3.2).
  // Provados antes de ligar: passam em Hamilton e ZeusTrafego; no Paulo o
  // "texto-duplicado" acusa a cena perfil-pronto, que e defeito de verdade
  // (mesma palavra no palco e na legenda, ja reprovado por ele duas vezes
  // em outras cenas), nao falso positivo da regua.
  "geometria-do-molde": (comp) => ["node", ["scripts/checar-build-registry.js", comp]],
  "estrutura-nasce-cheia": (comp) => ["node", ["scripts/checar-estrutura-vazia.js", comp]],
  "texto-em-dois-canais": (comp) => ["node", ["scripts/checar-texto-duplicado.js", comp]],
  // A mixagem so mede nivel quando existe video montado. Sem video, a licao
  // aparece como pendente de mixagem, nunca como aprovada em silencio.
  "nivel-do-fecho": (comp) => {
    // Peça que ainda não tem voz gravada não tem nível para medir. Bloquear aí
    // travaria todo lote novo por um defeito que ainda não pode existir.
    if (!fs.existsSync(path.join(MOTION, "public", comp, "audio-final.wav"))) return null;

    // O vídeo medido tem que ser O DESTA PEÇA. A primeira versão pegava o mp4
    // mais novo de `_preview`, que é uma pasta comum: revisar o Hamilton media
    // o vídeo do Paulo e reprovava a peça errada, com um número que não era
    // dela. Procura na pasta da própria composition, depois nas de campanha.
    const candidatos = [];
    const olhar = (dir) => {
      if (!fs.existsSync(dir)) return;
      for (const f of fs.readdirSync(dir)) {
        if (!f.endsWith(".mp4") || !f.startsWith(comp + "-")) continue;
        const p = path.join(dir, f);
        candidatos.push({ p, t: fs.statSync(p).mtimeMs });
      }
    };
    const output = path.join(MOTION, "output");
    olhar(path.join(output, comp));
    if (fs.existsSync(output)) {
      for (const e of fs.readdirSync(output, { withFileTypes: true })) {
        if (e.isDirectory() && e.name !== comp) olhar(path.join(output, e.name));
      }
    }
    if (!candidatos.length) return null;

    // o mais novo QUE JÁ TEM SOM, se houver: é o que representa a entrega
    const comSom = candidatos.filter((c) => c.p.endsWith("-som.mp4"));
    const alvo = (comSom.length ? comSom : candidatos).sort((a, b) => b.t - a.t)[0].p;

    // a trilha e o estilo saem da ficha da produção, nunca chutados
    const ficha = lerFichaDeProducao(comp);
    const args = ["../../scripts/video/mixar-final.js", alvo, "--comp", comp, "--so-medir"];
    if (ficha.estilo) args.push("--estilo", ficha.estilo);
    if (ficha.trilha) args.push("--trilha", ficha.trilha);
    else args.push("--sem-trilha");
    return ["node", args];
  },
};

/**
 * Trilha e estilo de uma peça, lidos de `aprendizado/mixagem-por-peca.json`.
 * Sem essa ficha o verificador teria que adivinhar, e adivinhar trilha é medir
 * a peça com o som de outra.
 */
function lerFichaDeProducao(comp) {
  try {
    const p = path.join(MOTION, "aprendizado", "mixagem-por-peca.json");
    return (JSON.parse(fs.readFileSync(p, "utf8")).pecas || {})[comp] || {};
  } catch {
    return {};
  }
}

/**
 * Licoes cuja prova e o OLHO de um agente, nao um comando. Ficam separadas no
 * relatorio: nao sao buraco de automacao, sao trabalho que so o print resolve.
 */
const PELO_REVISOR = {
  "espacamento-e-alinhamento": "revisor-visual-motion: print de cada cena, ler a tela e nao o codigo",
  "material-de-terceiro": "revisor-visual-motion: conferir que todo logo veio de arquivo oficial",
};

function revisar(comp) {
  if (!comp) {
    console.error("Uso: node scripts/aprendizado.js --revisar <Composition>");
    return 1;
  }
  const d = ler();
  const porVezes = [...d.licoes].sort((a, b) => b.vezes - a.vezes);

  console.log(`\nRevisao de aprendizado: ${comp}`);
  console.log(`${d.licoes.length} licoes no registro, da mais repetida para a menos.\n`);

  const rodados = [];
  const soOlho = [];
  let bloqueia = 0;

  for (const l of porVezes) {
    const fabrica = VERIFICADORES[l.id];
    if (!fabrica) {
      soOlho.push(l);
      continue;
    }
    const receita = fabrica(comp);
    if (!receita) {
      soOlho.push({ ...l, como_evitar: l.como_evitar + " (a medida so roda na hora da mixagem)" });
      continue;
    }
    const [cmd, args] = receita;
    const r = spawnSync(cmd, args, { cwd: MOTION, encoding: "utf8" });
    const saida = ((r.stdout || "") + (r.stderr || "")).trim();
    const passou = r.status === 0;
    rodados.push({ licao: l, passou, saida });

    const marca = passou ? "OK  " : l.estado === "gate" ? "BLOQUEIA" : "AVISA";
    console.log(`  ${marca}  ${l.titulo}  (ele falou ${l.vezes}x)`);
    if (!passou) {
      for (const linha of saida.split("\n").filter((x) => /ERRO|erro\(s\)|aviso\]/.test(x)).slice(0, 4)) {
        console.log(`          ${linha.trim()}`);
      }
      if (l.estado === "gate") bloqueia++;
    }
  }

  if (soOlho.length) {
    console.log(`\n  Sem checagem automatica, conferir no print antes de entregar:`);
    for (const l of soOlho) {
      console.log(`    - ${l.titulo} (${l.vezes}x)`);
      console.log(`      ${l.como_evitar}`);
    }
  }

  console.log("");
  if (bloqueia) {
    console.log(`REPROVADO: ${bloqueia} licao(oes) que ele ja repetiu 3 vezes ou mais falharam.`);
    console.log("Corrigir antes de mostrar para ele.\n");
    return 2;
  }
  console.log(`Tudo que e automatico passou. Falta o olho em ${soOlho.length} item(ns) acima.\n`);
  return 0;
}

/* ------------------------------------------------------------------ *
 * relatorio
 * ------------------------------------------------------------------ */

function relatorio() {
  const d = ler();
  const porVezes = [...d.licoes].sort((a, b) => b.vezes - a.vezes);
  const total = d.licoes.reduce((s, l) => s + l.vezes, 0);

  console.log(`\nO que ele ja teve que corrigir neste squad\n`);
  console.log(`${d.licoes.length} licoes, ${total} vezes que ele precisou falar.\n`);
  console.log("  vezes  estado      automatizado  licao");
  console.log("  -----  ----------  ------------  " + "-".repeat(46));
  for (const l of porVezes) {
    const auto = l.automatizado === "sim" ? "sim" : l.automatizado === "parcial" ? "parcial" : "NAO";
    console.log(
      `  ${String(l.vezes).padStart(5)}  ${l.estado.padEnd(10)}  ${auto.padEnd(12)}  ${l.titulo}`
    );
  }

  // A escada é MÍNIMO, não teto: automatizar cedo é virtude. Só reclama de
  // lição protegida de MENOS do que as vezes que ele falou exigem.
  const forca = { registrado: 0, checagem: 1, gate: 2 };
  const fracas = porVezes.filter((l) => forca[l.estado] < forca[estadoPorVezes(l.vezes)]);
  if (fracas.length) {
    console.log("\n  Protegida de menos para quantas vezes ele ja falou:");
    for (const l of fracas) {
      console.log(`    ${l.id}: esta como ${l.estado}, tem que ser ${estadoPorVezes(l.vezes)} (${l.vezes}x)`);
    }
  }

  const buracos = porVezes.filter((l) => l.automatizado !== "sim" && l.vezes >= 2);
  if (buracos.length) {
    console.log("\n  Ele falou 2 vezes ou mais e ainda depende de atencao:");
    for (const l of buracos) console.log(`    ${l.id} (${l.vezes}x): ${l.falta || "sem checagem"}`);
  }

  const pendentes = porVezes.filter((l) => l.falta && /PENDENTE/i.test(l.falta));
  if (pendentes.length) {
    console.log("\n  Ainda nao corrigido de verdade:");
    for (const l of pendentes) console.log(`    ${l.id}: ${l.falta}`);
  }
  console.log("");
  return 0;
}

/* ------------------------------------------------------------------ *
 * reclamacao: ele falou de novo
 * ------------------------------------------------------------------ */

function reclamacao(id, frase, quando) {
  const d = ler();
  const l = d.licoes.find((x) => x.id === id);
  if (!l) {
    console.error(`Erro: nao existe licao "${id}". As que existem:`);
    for (const x of d.licoes) console.error(`  ${x.id}  (${x.vezes}x)  ${x.titulo}`);
    console.error("\nSe e assunto novo, crie a licao no registro antes de contar a vez.");
    return 1;
  }
  const antes = l.estado;
  l.vezes += 1;
  if (frase) l.evidencia += " / " + frase;
  if (quando && !l.quando.includes(quando)) l.quando.push(quando);
  l.estado = estadoPorVezes(l.vezes);
  d.atualizado_em = quando || d.atualizado_em;
  gravar(d);

  console.log(`\n${l.titulo}`);
  console.log(`  agora sao ${l.vezes} vezes.`);
  if (l.estado !== antes) {
    console.log(`  SUBIU DE NIVEL: ${antes} vira ${l.estado}.`);
    if (l.estado === "checagem") {
      console.log("  Duas vezes significa que a explicacao escrita nao pegou.");
      console.log("  Escrever a checagem que roda sozinha. Repetir a explicacao nao resolve.");
    }
    if (l.estado === "gate") {
      console.log("  Tres vezes ou mais: nao se confia mais em atencao.");
      console.log("  A checagem passa a BLOQUEAR a entrega ate passar.");
    }
    if (l.automatizado !== "sim") {
      console.log(`  Falta automatizar: ${l.falta || "nenhuma checagem existe ainda"}`);
    }
  } else {
    console.log(`  continua em ${l.estado}.`);
  }
  console.log("");
  return 0;
}

/* ------------------------------------------------------------------ *
 * aprovado: o que ele aprova vira a referencia do certo
 * ------------------------------------------------------------------ */

function aprovado(comp, quando) {
  if (!comp) {
    console.error("Uso: node scripts/aprendizado.js --aprovado <Composition>");
    return 1;
  }
  const d = ler();
  let reg = { _leia: "Pecas que o o dono do canal aprovou. O estado de cada uma no dia da aprovacao e a referencia do que e certo: licao que ela respeita ganha uma prova a favor, e regressao se mede contra ela.", pecas: [] };
  if (fs.existsSync(APROVADAS)) reg = JSON.parse(fs.readFileSync(APROVADAS, "utf8"));

  // roda a revisao no instante da aprovacao: o que passou aqui vira o retrato
  // do certo, e serve de comparacao quando algo regredir depois
  const passaram = [];
  for (const [id, fabrica] of Object.entries(VERIFICADORES)) {
    const [cmd, args] = fabrica(comp);
    const r = spawnSync(cmd, args, { cwd: MOTION, encoding: "utf8" });
    if (r.status === 0) passaram.push(id);
  }

  const ja = reg.pecas.findIndex((p) => p.composition === comp);
  const entrada = { composition: comp, aprovada_em: quando || null, licoes_que_passaram: passaram };
  if (ja !== -1) reg.pecas[ja] = entrada;
  else reg.pecas.push(entrada);
  fs.writeFileSync(APROVADAS, JSON.stringify(reg, null, 2) + "\n", "utf8");

  console.log(`\n${comp} registrada como aprovada.`);
  console.log(`  ${passaram.length} licao(oes) provadas por esta peca: ${passaram.join(", ")}`);
  console.log("  A partir de agora, peca nova compara contra este retrato.");
  const semProva = d.licoes.filter((l) => VERIFICADORES[l.id] && !passaram.includes(l.id));
  if (semProva.length) {
    console.log(`  ATENCAO: ${semProva.map((l) => l.id).join(", ")} nao passou nem na peca aprovada.`);
    console.log("  Ou a checagem esta errada, ou a peca foi aprovada com o defeito dentro.");
  }
  console.log("");
  return 0;
}

/* ------------------------------------------------------------------ *
 * cli
 * ------------------------------------------------------------------ */

const argv = process.argv.slice(2);
const pegar = (n) => {
  const i = argv.indexOf("--" + n);
  return i !== -1 ? argv[i + 1] : null;
};

if (argv.includes("--relatorio")) process.exit(relatorio());
if (argv.includes("--revisar")) process.exit(revisar(pegar("revisar")));
if (argv.includes("--aprovado")) process.exit(aprovado(pegar("aprovado"), pegar("data")));
if (argv.includes("--reclamacao")) {
  const i = argv.indexOf("--reclamacao");
  process.exit(reclamacao(argv[i + 1], argv[i + 2] || null, pegar("data")));
}

console.error("Comandos: --revisar <Composition> | --relatorio | --reclamacao <id> \"frase\" | --aprovado <Composition>");
process.exit(1);
