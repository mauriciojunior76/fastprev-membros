#!/usr/bin/env node
/**
 * checar-pedido-literal.js — o elemento que ele nomeou está mesmo na tela.
 *
 * Lição `letras-jornada`, a campeã: cinco vezes. "agora pela 5 vez eu to te
 * falando tem que ter uma letra A bem grande e a letra B bem grande e a
 * animação da seta."
 *
 * Por que cinco explicações não resolveram: eu interpretava o pedido em vez de
 * executar o literal. Ele pedia "letra A grande", eu entregava um ponto de
 * partida rotulado, achando que comunicava a mesma coisa. Comunicava para mim.
 *
 * O conserto não é prestar mais atenção, é transformar o pedido em item
 * conferível: cada elemento que ele nomeia vira uma linha com uma prova, e a
 * prova é buscada no código. Sem prova, a peça não é entregue.
 *
 * Uso:
 *   node scripts/checar-pedido-literal.js <Composition>
 *   node scripts/checar-pedido-literal.js <Composition> --novo "letra A grande" \
 *        --arquivo JornadaSeta.tsx --contem 'texto="A"'
 *
 * Registro: `aprendizado/pedidos-literais/<Composition>.json`.
 */

const fs = require("fs");
const path = require("path");

const MOTION = path.resolve(__dirname, "..");
const COMPS = path.join(MOTION, "src", "compositions");
const DIR = path.join(MOTION, "aprendizado", "pedidos-literais");

function caminho(comp) {
  return path.join(DIR, comp + ".json");
}

function achar(comp, arquivo) {
  const base = path.join(COMPS, comp);
  let achado = null;
  const anda = (d) => {
    if (achado || !fs.existsSync(d)) return;
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) anda(p);
      else if (e.name === arquivo) achado = p;
    }
  };
  anda(base);
  return achado;
}

function checar(comp) {
  if (!comp) {
    console.error("Uso: node scripts/checar-pedido-literal.js <Composition>");
    return 1;
  }
  const p = caminho(comp);
  if (!fs.existsSync(p)) {
    console.log(`${comp}: nenhum pedido literal registrado ainda.`);
    console.log("Quando ele pedir um elemento pelo nome, registre com --novo antes de codar.");
    return 0;
  }
  const d = JSON.parse(fs.readFileSync(p, "utf8"));
  const faltando = [];
  const soOlho = [];

  // Pedido marcado como pendente reprova mesmo sem prova mecânica. É a lição
  // `executar-tudo`: mensagem longa dele virava execução dos itens que eu achei
  // mais importantes, e o resto sumia porque não existia lista para conferir.
  const pendentes = (d.pedidos || []).filter((p) => p.estado === "pendente");

  for (const item of d.pedidos || []) {
    if (item.estado === "pendente") continue; // já contado acima
    if (!item.prova) {
      soOlho.push(item);
      continue;
    }
    const arq = achar(comp, item.prova.arquivo);
    if (!arq) {
      faltando.push({ item, motivo: `o arquivo ${item.prova.arquivo} nao existe` });
      continue;
    }
    const src = fs.readFileSync(arq, "utf8");
    if (!src.includes(item.prova.contem)) {
      faltando.push({ item, motivo: `${item.prova.arquivo} nao contem ${item.prova.contem}` });
    }
  }

  for (const p of pendentes) {
    console.log(`  [ERRO] pedido ainda PENDENTE: "${p.pediu}"`);
    if (p.quando) console.log(`         ele pediu em ${p.quando}`);
    console.log(`         marcar como feito: --feito "${p.pediu.slice(0, 30)}"`);
  }
  for (const f of faltando) {
    console.log(`  [ERRO] pedido nao cumprido: "${f.item.pediu}"`);
    console.log(`         ${f.motivo}`);
    if (f.item.quando) console.log(`         ele pediu em ${f.item.quando}`);
  }
  if (soOlho.length) {
    console.log(`  ${soOlho.length} pedido(s) so conferivel(is) no print:`);
    for (const s of soOlho) console.log(`    - "${s.pediu}"`);
  }
  const abertos = faltando.length + pendentes.length;
  console.log(
    `\n${comp}: ${(d.pedidos || []).length} pedido(s) registrado(s), ${abertos} em aberto` +
      (abertos ? ` (${pendentes.length} pendente(s), ${faltando.length} sem prova no codigo)` : "") + "."
  );
  if (abertos) {
    console.log("Ele ja teve que repetir pedido 5 vezes, e cobrar lista feita pela metade 2 vezes.");
    console.log("Nao entregar com item em aberto.\n");
  } else console.log("");
  return abertos ? 2 : 0;
}

function novo(comp, pediu, arquivo, contem, quando) {
  if (!comp || !pediu) {
    console.error('Uso: --novo "o que ele pediu" [--arquivo X.tsx --contem "trecho"] [--data AAAA-MM-DD]');
    return 1;
  }
  fs.mkdirSync(DIR, { recursive: true });
  const p = caminho(comp);
  const d = fs.existsSync(p)
    ? JSON.parse(fs.readFileSync(p, "utf8"))
    : {
        _leia:
          "Elementos que o o dono do canal pediu pelo nome nesta peca. Cada um tem uma prova buscada no codigo. Pedido sem prova mecanica fica marcado para o print. A licao que gerou isto: ele teve que pedir a mesma letra 5 vezes.",
        composition: comp,
        pedidos: [],
      };
  d.pedidos.push({
    pediu,
    quando: quando || null,
    prova: arquivo && contem ? { arquivo, contem } : null,
  });
  fs.writeFileSync(p, JSON.stringify(d, null, 2) + "\n", "utf8");
  console.log(`registrado em ${path.relative(MOTION, p)}: "${pediu}"`);
  console.log(arquivo && contem ? `  prova: ${arquivo} contem ${contem}` : "  sem prova mecanica, vai para o print");
  return 0;
}

const argv = process.argv.slice(2);
const comp = argv.find((a) => !a.startsWith("--"));
const pegar = (n) => {
  const i = argv.indexOf("--" + n);
  return i !== -1 ? argv[i + 1] : null;
};

if (argv.includes("--extrair")) {
  process.exit(extrair(comp, pegar("extrair")));
}

if (argv.includes("--feito")) {
  const alvo = pegar("feito");
  const p2 = caminho(comp);
  if (!fs.existsSync(p2)) { console.error("nao ha pedidos registrados para " + comp); process.exit(1); }
  const d2 = JSON.parse(fs.readFileSync(p2, "utf8"));
  const item = (d2.pedidos || []).find((x) => x.pediu.toLowerCase().includes(String(alvo).toLowerCase()));
  if (!item) { console.error("nao achei pedido com \"" + alvo + "\""); process.exit(1); }
  delete item.estado;
  fs.writeFileSync(p2, JSON.stringify(d2, null, 2) + "\n", "utf8");
  console.log("marcado como feito: " + item.pediu);
  process.exit(0);
}

if (argv.includes("--novo")) {
  process.exit(novo(comp, pegar("novo"), pegar("arquivo"), pegar("contem"), pegar("data")));
}
process.exit(checar(comp));

/**
 * Lê uma mensagem do o dono do canal e sugere os elementos que ele nomeou, para virarem
 * itens conferíveis antes de tocar no código. Sugere, não decide: cada item é
 * confirmado com --novo.
 */
function extrair(comp, mensagem) {
  if (!mensagem) {
    console.error('Uso: node scripts/checar-pedido-literal.js <Composition> --extrair "a mensagem dele"');
    return 1;
  }
  const { extrairPedidos } = require("./lib/extrair-pedidos.js");
  const achados = extrairPedidos(mensagem);
  if (!achados.length) {
    console.log("Nenhum elemento nomeado nesta mensagem.");
    console.log("Se ele pediu algo pelo nome e nao apareceu aqui, registre na mao com --novo");
    console.log("e acrescente a palavra em scripts/lib/extrair-pedidos.js (lista COISAS).");
    return 0;
  }
  console.log(`\n${achados.length} trecho(s) com pedido de elemento:\n`);
  for (const a of achados) {
    console.log(`  "${a.frase}"`);
    for (const c of a.coisas) {
      console.log(`    -> ${c}`);
      console.log(`       node scripts/checar-pedido-literal.js ${comp || "<Composition>"} --novo "${c}" --arquivo <Arquivo.tsx> --contem "<trecho>"`);
    }
    console.log("");
  }
  console.log("Confirme cada um com o comando acima ANTES de mexer no codigo.");
  console.log("Ele ja teve que repetir o mesmo pedido 5 vezes.\n");
  return 0;
}
