#!/usr/bin/env node
/**
 * comparar-plano.js: o plano novo contra a peca que esta no ar.
 *
 * Serve para calibrar a esteira: se o plano gerado reprova uma peca ja aprovada,
 * quem esta errado e a regua, nao a peca. Nao escreve nada na composition.
 *
 * Uso: node comparar-plano.js <Composition> [--plano <caminho 05-scene-plan.json>] [--json]
 */
const fs = require("fs");
const path = require("path");
const { paths, compDir, planDir, existe } = require("./lib/ds-root");

const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const valor = (n, p = null) => {
  const i = args.indexOf(n);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : p;
};
const comp = args.find((a) => !a.startsWith("--") && args[args.indexOf(a) - 1] !== "--plano");
const FPS = 60;

if (!comp) {
  console.error("uso: node comparar-plano.js <Composition> [--plano caminho.json]");
  process.exit(1);
}

const LC = require(path.join(paths.engineLib, "ler-composition.js"));
const tokensPath = path.join(compDir(comp), "tokens.ts");
if (!existe(tokensPath)) {
  console.error(`${comp} nao tem tokens.ts`);
  process.exit(1);
}
const cenasNoAr = LC.lerCenas(fs.readFileSync(tokensPath, "utf8"), tokensPath, (m) => {
  throw new Error(m);
});

const planoPath = valor("--plano", path.join(planDir(comp), "05-scene-plan.json"));
const plano = existe(planoPath) ? JSON.parse(fs.readFileSync(planoPath, "utf8")) : null;

function janelas(lista) {
  return lista.map((c) => [Math.round((c.start ?? c.startFrame / FPS) * FPS), Math.round((c.end ?? c.endFrameExclusive / FPS) * FPS)]);
}

function interseccao(a, b) {
  return Math.max(0, Math.min(a[1], b[1]) - Math.max(a[0], b[0]));
}

function medir(nome, cenas, densidades) {
  const dur = (cenas[cenas.length - 1][1] - cenas[0][0]) / FPS;
  const porMin = (cenas.length / dur) * 60;
  let maiorJanela = 0;
  cenas.forEach((c) => {
    const j = (c[1] - c[0]) / FPS;
    if (j > maiorJanela) maiorJanela = j;
  });
  return { nome, cenas: cenas.length, durS: Math.round(dur * 10) / 10, porMin: Math.round(porMin * 10) / 10, maiorCenaS: Math.round(maiorJanela * 10) / 10, densidades };
}

const noAr = janelas(cenasNoAr);
const medNoAr = medir("no ar", noAr, cenasNoAr.map((c) => (c.stage === "expanded" ? 3 : 2)));

const saida = { composition: comp, noAr: medNoAr };

if (plano) {
  const doPlano = janelas(plano.scenes);
  const medPlano = medir("plano", doPlano, plano.scenes.map((c) => c.density ?? 0));
  saida.plano = medPlano;

  // sobreposicao de janelas: quanto do tempo cai na mesma cena nos dois lados
  let somaIntersec = 0;
  let somaUniao = 0;
  doPlano.forEach((p) => {
    const melhor = noAr.reduce((acc, a) => Math.max(acc, interseccao(p, a)), 0);
    somaIntersec += melhor;
    somaUniao += p[1] - p[0];
  });
  saida.sobreposicao = Math.round((somaIntersec / somaUniao) * 100);

  // ancoras coincidentes (tolerancia 6 quadros)
  const ancorasPlano = plano.scenes.map((c) => c.startFrame);
  const ancorasNoAr = noAr.map((c) => c[0]);
  const coincidem = ancorasPlano.filter((f) => ancorasNoAr.some((g) => Math.abs(f - g) <= 6)).length;
  saida.ancorasCoincidentes = `${coincidem}/${ancorasPlano.length}`;

  const familias = {};
  plano.scenes.forEach((c) => {
    const id = c.chosen && c.chosen.id;
    if (id) familias[id.split(".")[0]] = (familias[id.split(".")[0]] || 0) + 1;
  });
  saida.familiasDoPlano = familias;
}

if (flag("--json")) {
  console.log(JSON.stringify(saida, null, 2));
} else {
  console.log(`${comp}\n`);
  console.log(`no ar : ${medNoAr.cenas} cenas · ${medNoAr.durS}s · ${medNoAr.porMin} por minuto · maior cena ${medNoAr.maiorCenaS}s`);
  if (saida.plano) {
    console.log(`plano : ${saida.plano.cenas} cenas · ${saida.plano.durS}s · ${saida.plano.porMin} por minuto · maior cena ${saida.plano.maiorCenaS}s`);
    console.log(`densidade do plano: ${saida.plano.densidades.join(" ")}`);
    console.log(`sobreposicao de janelas: ${saida.sobreposicao}%`);
    console.log(`ancoras coincidentes: ${saida.ancorasCoincidentes}`);
    console.log(`familias usadas: ${Object.entries(saida.familiasDoPlano).map(([f, n]) => `${f} ${n}`).join(" · ")}`);
  } else {
    console.log(`(sem plano de cenas em ${path.relative(paths.repo, planoPath)}: mostrando so o que esta no ar)`);
  }
}
