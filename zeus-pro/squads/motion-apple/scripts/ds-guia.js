#!/usr/bin/env node
/**
 * ds-guia.js: abre UMA secao do guia, ou UM bloco do painel.
 *
 * O guia tem 68 KB e o painel 568 KB. Nenhum dos dois entra inteiro no contexto.
 * Quando o roteador aponta "where.guide: §6a", e isto aqui que traz so a §6a.
 *
 * Uso:
 *   node ds-guia.js "§6a" ["§9e"] [--max 2500]
 *   node ds-guia.js --painel "#s04d-enfase" [--max 1500]
 *   node ds-guia.js --lista
 */
const R = require("./lib/ds-registry");

const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const valor = (n, p = null) => {
  const i = args.indexOf(n);
  return i >= 0 && args[i + 1] ? args[i + 1] : p;
};
const max = Number(valor("--max", 2500));

if (flag("--lista")) {
  const idx = R.carregar();
  console.log("secoes do guia:");
  Object.entries(idx.guiaSecoes).forEach(([s, d]) => console.log(`  ${s.padEnd(6)} ${d.titulo}`));
  console.log("\nancoras do painel:");
  Object.keys(idx.painelAncoras).forEach((a) => console.log(`  ${a}`));
  process.exit(0);
}

if (flag("--painel")) {
  const b = R.blocoDoPainel(valor("--painel"), max);
  if (!b) {
    console.error(`ancora nao encontrada. Veja as disponiveis com --lista`);
    process.exit(1);
  }
  console.log(`painel ${b.ancora}${b.cortado ? " (cortado)" : ""}\n`);
  console.log(b.texto);
  process.exit(0);
}

const secoes = args.filter((a) => !a.startsWith("--") && args[args.indexOf(a) - 1] !== "--max");
if (!secoes.length) {
  console.error('uso: node ds-guia.js "§6a" | --painel "#s04d-enfase" | --lista');
  process.exit(1);
}
secoes.forEach((s) => {
  const r = R.secaoDoGuia(s, max);
  if (!r) {
    console.log(`${s}: secao nao encontrada (veja --lista)\n`);
    return;
  }
  console.log(`${r.secao} ${r.titulo}${r.cortado ? " (cortado)" : ""}\n${r.texto}\n`);
});
