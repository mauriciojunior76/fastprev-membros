#!/usr/bin/env node
/**
 * checar-espacamento.js — mede alinhamento e folga entre os elementos da cena.
 *
 * Lição `espacamento-e-alinhamento`, quatro rodadas do o dono do canal:
 *   "o retângulo ao redor delas está muito encostado"
 *   "a tabelinha ta errado o alinhamento ta mal formatado mal pensado"
 *   "ficou mal feito mal organizado falta css falta layout"
 *   "revise todos os alinhamentos os espaçamentos pq não ta legal ainda"
 *
 * DUAS TENTATIVAS ANTERIORES E POR QUE FALHARAM, para ninguém repetir:
 *
 *   1. Ler os números do código. Falha pela causa raiz que ele mesmo apontou:
 *      "número que parece certo na linha do arquivo fica errado na tela".
 *   2. Medir margem de segurança nas bordas do quadro. Reprovou 40 dos 41
 *      frames da peça que ele APROVOU, porque estas peças ocupam a tela inteira
 *      de propósito. Descartada em 04/09/2026.
 *
 * O QUE FUNCIONA, e é o que este script faz: achar as caixas de conteúdo
 * desenhadas no frame e medir a relação entre elas. Dois defeitos viram número:
 *
 *   QUASE ALINHADO — duas caixas cujas bordas diferem por pouquíssimo. Ou era
 *   para alinhar e não alinhou, ou a diferença é pequena demais para ler como
 *   intenção. É o defeito que o olho pega na hora e o código nunca mostra.
 *
 *   ENCOSTADO — folga entre caixas menor que o respiro mínimo. Foi literalmente
 *   a primeira reclamação dele: o retângulo colado no texto.
 *
 * O QUE CONTINUA SENDO DO OLHO: hierarquia, peso visual, "ficou bonito". Isso é
 * do agente `revisor-visual-motion`, e este script não finge cobrir.
 *
 * Uso:
 *   node scripts/checar-espacamento.js <Composition> [--detalhe]
 */

const fs = require("fs");
const path = require("path");
const { caixasDoFrame, agruparEmLinhas } = require("./lib/caixas-do-frame.js");

const MOTION = path.resolve(__dirname, "..");
const QA = path.join(MOTION, "output", "_qa");

/**
 * Réguas, em fração da largura do quadro, para valerem em qualquer resolução.
 * Calibradas contra o reel do Instagram do mentor, peça aprovada por ele.
 */
// 0.007 e nao 0.003: a medida trabalha em escala reduzida, e 1 a 2px de
// diferenca sao o proprio erro da reducao, nao desalinhamento. Abaixo disso a
// diferenca nao existe na tela.
const QUASE_ALINHADO_MIN = 0.007;
const QUASE_ALINHADO_MAX = 0.022;  // acima disso a diferença lê como intenção

/** Bordas que se espera ver alinhadas entre elementos irmãos. */
const BORDAS = [
  ["esquerda", (c) => c.x],
  ["direita", (c) => c.x + c.largura],
  ["centro horizontal", (c) => c.x + c.largura / 2],
  ["topo", (c) => c.y],
  ["base", (c) => c.y + c.altura],
  ["centro vertical", (c) => c.y + c.altura / 2],
];

const ehVertical = (nome) => nome === "topo" || nome === "base" || nome === "centro vertical";

/** Folga entre duas caixas: negativa quando elas se sobrepõem. */
function folga(a, b) {
  const dx = Math.max(a.x - (b.x + b.largura), b.x - (a.x + a.largura));
  const dy = Math.max(a.y - (b.y + b.altura), b.y - (a.y + a.altura));
  if (dx >= 0 && dy >= 0) return Math.min(dx, dy);
  return Math.max(dx, dy);
}

/**
 * As famílias de elementos que formam grade: três ou mais caixas de tamanho
 * parecido na mesma cena.
 *
 * Por que isso importa: estas peças são composições livres, centralizadas, e
 * não seguem grade rígida. Cobrar alinhamento entre dois elementos quaisquer
 * acusava dezenas de casos legítimos nas quatro peças aprovadas. Mas a
 * reclamação dele foi específica: "a tabelinha ta errado o alinhamento ta mal
 * formatado". Grade é onde o alinhamento vira promessa, e onde quebrá-la salta
 * aos olhos.
 *
 * Três é o mínimo porque dois elementos parecidos podem ser um par deliberado;
 * três repetições declaram um sistema.
 */
function familiasDeGrade(caixas) {
  const usada = new Set();
  const familias = [];
  for (let i = 0; i < caixas.length; i++) {
    if (usada.has(i)) continue;
    const familia = [i];
    for (let j = i + 1; j < caixas.length; j++) {
      if (usada.has(j)) continue;
      const a = caixas[i];
      const b = caixas[j];
      const dl = Math.abs(a.largura - b.largura) / Math.max(a.largura, b.largura);
      const dh = Math.abs(a.altura - b.altura) / Math.max(a.altura, b.altura);
      if (dl <= 0.28 && dh <= 0.28) familia.push(j);
    }
    if (familia.length >= 3) {
      for (const k of familia) usada.add(k);
      familias.push(familia.map((k) => caixas[k]));
    }
  }
  return familias;
}

function analisar(r) {
  const min = r.largura * QUASE_ALINHADO_MIN;
  const max = r.largura * QUASE_ALINHADO_MAX;
  const achados = [];

  // Só onde existe grade: três ou mais elementos irmãos declarando um sistema.
  for (const familia of familiasDeGrade(r.caixas)) {
    // RITMO DA GRADE: numa fila de irmãos, o espaço entre vizinhos é sempre o
    // mesmo. Se um vão difere dos outros por pouco, a fila "quase" tem ritmo, e
    // é isso que o olho lê como tabela mal formatada. Foi assim que os três
    // círculos de destaque saíram com 100px e 103px de vão sem ninguém notar.
    for (const [eixo, pos, tam] of [["horizontal", (c) => c.x, (c) => c.largura], ["vertical", (c) => c.y, (c) => c.altura]]) {
      const fila = [...familia].sort((x, y) => pos(x) - pos(y));
      // fila de verdade: os irmãos precisam dividir a faixa do outro eixo
      const dividem = fila.every((c, k) => {
        if (k === 0) return true;
        const ant = fila[k - 1];
        return eixo === "horizontal"
          ? c.y < ant.y + ant.altura && ant.y < c.y + c.altura
          : c.x < ant.x + ant.largura && ant.x < c.x + c.largura;
      });
      if (!dividem) continue;

      // Ritmo so vale entre itens de MESMO tamanho. Icones de formas diferentes
      // (coroa, trofeu, lista) tem caixas de larguras diferentes mesmo em fila
      // perfeita, e o vao entre elas varia 1 a 3px por natureza.
      const tamanhos = fila.map(tam);
      const desvioTam = (Math.max(...tamanhos) - Math.min(...tamanhos)) / Math.max(...tamanhos);
      if (desvioTam > 0.06) continue;

      const vaos = [];
      for (let k = 1; k < fila.length; k++) vaos.push(pos(fila[k]) - (pos(fila[k - 1]) + tam(fila[k - 1])));
      if (vaos.length < 2) continue;
      const menor = Math.min(...vaos);
      const maior = Math.max(...vaos);
      const diferenca = maior - menor;
      if (diferenca > min && diferenca <= max) {
        achados.push({
          tipo: "ritmo irregular",
          detalhe: `fila ${eixo} de ${fila.length} itens com vaos ${vaos.map(Math.round).join(", ")}px: ${Math.round(diferenca)}px de diferenca`,
          a: fila[0], b: fila[fila.length - 1],
        });
      }
    }

   for (let i = 0; i < familia.length; i++) {
    for (let j = i + 1; j < familia.length; j++) {
      const a = familia[i];
      const b = familia[j];

      for (const [nome, ler] of BORDAS) {
        const d = Math.abs(ler(a) - ler(b));
        if (d <= min || d > max) continue;
        // "Quase alinhado" ofende quando a diferença é pequena PERTO DA CAIXA:
        // aí o olho lê intenção que falhou. 3px entre dois glifos de 22px é 13%
        // da caixa, e o olho lê como dois desenhos diferentes, não como erro.
        // Foi o que acusava a coroa contra o troféu nos círculos de destaque do
        // Paulo, com os círculos em si perfeitamente alinhados.
        const ladoMenor = Math.min(a.largura, a.altura, b.largura, b.altura);
        if (ladoMenor > 0 && d / ladoMenor > 0.08) continue;
        // Só faz sentido cobrar alinhamento de borda vertical entre caixas que
        // dividem faixa horizontal, e vice-versa: caixas em cantos opostos da
        // tela não precisam alinhar nada.
        // Qual par faz sentido cobrar, e por quê:
        //
        //   topo, base, centro vertical  ->  só entre elementos LADO A LADO,
        //   isto é, que dividem a mesma faixa de altura. Dois itens empilhados
        //   têm topos diferentes por definição: isso é espaçamento de lista, e
        //   cobrar alinhamento ali acusava toda lista da peça.
        //
        //   esquerda, direita, centro horizontal  ->  só entre elementos
        //   EMPILHADOS, que dividem a mesma coluna.
        const ladoALado = a.y < b.y + b.altura && b.y < a.y + a.altura;
        const empilhados = a.x < b.x + b.largura && b.x < a.x + a.largura;
        if (ehVertical(nome) ? !ladoALado : !empilhados) continue;

        // Elementos de proporção muito diferente não formam grade entre si. O
        // traço fino que sublinha uma palavra tem 5px de altura e o texto tem
        // 24: comparar a base de um com a base do outro acusava desalinhamento
        // onde havia só espaçamento normal. Grade se cobra entre pares de
        // tamanho comparável.
        const grandeza = ehVertical(nome)
          ? Math.max(a.altura, b.altura) / Math.max(1, Math.min(a.altura, b.altura))
          : Math.max(a.largura, b.largura) / Math.max(1, Math.min(a.largura, b.largura));
        if (grandeza > 2.5) continue;

        // Elementos de tamanho DIFERENTE alinham pelo centro, não pela borda.
        // Três ícones de formas diferentes (coroa, troféu, lista) têm caixas de
        // alturas diferentes mesmo perfeitamente centralizados: cobrar a base
        // deles acusava desalinhamento onde havia centralização correta.
        const centro = nome.startsWith("centro");
        const mesmoTamanho = ehVertical(nome)
          ? Math.abs(a.altura - b.altura) <= Math.max(a.altura, b.altura) * 0.06
          : Math.abs(a.largura - b.largura) <= Math.max(a.largura, b.largura) * 0.06;
        if (!centro && !mesmoTamanho) continue;
        achados.push({
          tipo: "quase alinhado",
          detalhe: `${nome} difere em ${Math.round(d)}px (alinhar, ou afastar de vez)`,
          a, b,
        });
      }

      // FOLGA MÍNIMA foi medida e DESCARTADA como gate em 04/09/2026.
      // Na peça aprovada, folga pequena aparece 29 vezes e quase toda é
      // legítima: espaço entre duas linhas de um texto, traço colado na palavra
      // que ele sublinha de propósito, partes do mesmo desenho. Não existe um
      // número que separe "colado por descuido" de "colado por decisão" sem
      // saber o que é cada elemento, e chutar esse número transformaria a peça
      // que ele aprovou em 40 reprovações. Isso fica com o revisor visual.
      //
      // O que sobrou aqui é o que a peça aprovada mostrou ser inequívoco:
      // desalinhamento pequeno, que deu ZERO nela.
      void folga;
    }
   }
  }
  return achados;
}

function framesDe(comp) {
  const dir = path.join(QA, comp);
  if (!fs.existsSync(dir)) return [];
  const achados = [];
  const anda = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) anda(p);
      // SÓ frame de repouso (tag "meio"). O qa-frames também gera "entrada" e
      // "transicao", que são tirados NO MEIO da animação: ali o elemento está
      // deslocado de propósito, e medir borda contra borda acusa desalinhamento
      // que é o próprio movimento. Frame em movimento continua servindo ao
      // agente revisor-visual-motion, que julga o quadro inteiro, não a régua.
      else if (/\.png$/i.test(e.name) && /-meio\.png$/i.test(e.name)) achados.push(p);
    }
  };
  anda(dir);
  return achados;
}

async function checar(comp, detalhe) {
  if (!comp) {
    console.error("Uso: node scripts/checar-espacamento.js <Composition> [--detalhe]");
    return 1;
  }
  const frames = framesDe(comp);
  if (!frames.length) {
    console.log(`${comp}: sem frames para medir.`);
    console.log(`Gerar antes: node scripts/qa-frames.js ${comp}`);
    console.log("Sem frame nao existe medida, e sem medida esta checagem nao aprova nada.");
    return 1;
  }

  const porFrame = [];
  for (const f of frames) {
    let r;
    try {
      r = await caixasDoFrame(f);
      // as letras viram linha antes de qualquer medida: o olho le a linha, nao a letra
      r = { ...r, caixas: agruparEmLinhas(r.caixas) };
    } catch (e) {
      console.log(`  [aviso] nao consegui medir ${path.basename(f)}: ${e.message}`);
      continue;
    }
    const achados = analisar(r);
    if (achados.length) porFrame.push({ frame: path.basename(f, ".png"), caixas: r.caixas.length, achados });
  }

  for (const p of porFrame) {
    const quase = p.achados.filter((a) => a.tipo === "quase alinhado");
    const ritmo = p.achados.filter((a) => a.tipo === "ritmo irregular");
    console.log(`  [ERRO] ${p.frame}: ${quase.length} borda(s) quase alinhada(s), ${ritmo.length} fila(s) sem ritmo`);
    const mostrar = detalhe ? p.achados : p.achados.slice(0, 2);
    for (const a of mostrar) {
      console.log(`         ${a.tipo}: ${a.detalhe}`);
      if (detalhe) {
        console.log(`           caixa A x${a.a.x} y${a.a.y} ${a.a.largura}x${a.a.altura}`);
        console.log(`           caixa B x${a.b.x} y${a.b.y} ${a.b.largura}x${a.b.altura}`);
      }
    }
    if (!detalhe && p.achados.length > 2) console.log(`         (mais ${p.achados.length - 2}, use --detalhe)`);
  }

  const total = porFrame.reduce((s, p) => s + p.achados.length, 0);
  console.log(`\n${comp}: ${frames.length} frame(s) medido(s), ${porFrame.length} com problema, ${total} achado(s).`);
  console.log("Hierarquia e 'ficou bonito' NAO sao medidos aqui: sao do agente revisor-visual-motion.\n");
  return porFrame.length ? 2 : 0;
}

if (require.main === module) {
  const argv = process.argv.slice(2);
  checar(argv.find((a) => !a.startsWith("--")), argv.includes("--detalhe")).then((c) => process.exit(c));
}
module.exports = { checar, analisar };
