#!/usr/bin/env node
/**
 * checar-texto-duplicado.js — a mesma palavra não aparece no palco e na
 * legenda ao mesmo tempo.
 *
 * Lição `texto-igual-palco-e-legenda`. Ele já tinha dito isso em 04/09 e
 * repetiu em 06/09, com a régua na frase dele: "jamais pode ter texto igual
 * na legenda e no palco; quando o texto vai pro bullet no palco, sai da
 * legenda".
 *
 * POR QUE NENHUM GATE PEGAVA, que é o que este script resolve: o texto do
 * palco é literal dentro do TSX do componente, e o da legenda vem do
 * narration.json montado em tempo de render. São dois universos, e nenhum
 * script lia os dois juntos. O F6 da rubrica de aprovação chega perto mas
 * mede outra coisa: ele pergunta se a legenda CRUZA algum elemento do palco,
 * que é geometria. Palco e legenda podem estar perfeitamente separados no
 * espaço e dizer a mesma frase, e o F6 dá nota 10.
 *
 * COMO FUNCIONA: para cada cena com `caption: "on"`, pega as palavras do
 * narration.json dentro da janela da cena e compara com os literais de texto
 * do componente daquela cena. Palavra de conteúdo repetida nos dois é erro.
 *
 * O que NÃO conta como repetição:
 *   - palavra vazia (artigo, preposição, pronome, verbo de ligação)
 *   - número solto usado como estrutura (o "1", "2", "3" de uma escada)
 *   - cena com `caption: "muted"`, que por definição não tem legenda
 *
 * Uso:
 *   node scripts/checar-texto-duplicado.js <Composition>
 */

const fs = require("fs");
const path = require("path");

const MOTION = path.resolve(__dirname, "..");
const COMPS = path.join(MOTION, "src", "compositions");

/** Palavras que podem repetir à vontade: não carregam a informação. */
const VAZIAS = new Set([
  "a","o","as","os","um","uma","uns","umas","de","do","da","dos","das","em","no","na","nos","nas",
  "por","pra","para","pelo","pela","com","sem","que","se","e","ou","mas","ao","aos","à","às",
  "eu","tu","voce","você","ele","ela","eles","elas","nos","nós","meu","minha","seu","sua","isso",
  "isto","aquilo","é","e","ser","ter","tem","tinha","foi","vai","vou","ja","já","so","só","mais",
  "menos","muito","muita","pouco","bem","aqui","ali","la","lá","entao","então","depois","antes",
  "quando","onde","como","porque","ai","aí","né","то",
]);

const normalizar = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

const ehConteudo = (p) => p.length >= 4 && !VAZIAS.has(p) && !/^\d+$/.test(p);

/** Literais de texto JSX do componente: o que de fato vira letra na tela. */
function textosDoComponente(src) {
  const achados = [];

  // texto entre tags: <div ...>TEXTO</div>
  for (const m of src.matchAll(/>\s*([A-Za-zÀ-ÿ][^<>{}\n]{2,})\s*</g)) {
    achados.push(m[1].trim());
  }
  // strings usadas com split (lettering letra a letra) e literais soltos
  for (const m of src.matchAll(/"([A-Za-zÀ-ÿ][^"\n]{2,})"\s*\.split/g)) {
    achados.push(m[1].trim());
  }
  // rotulos declarados em tabela de dados: rotulo: "COMPRA"
  for (const m of src.matchAll(/\brotulo\s*:\s*"([^"\n]+)"/g)) {
    achados.push(m[1].trim());
  }
  return achados;
}

function lerCenas(tokensSrc) {
  const bloco = tokensSrc.match(/export const SCENES[^=]*=\s*\[([\s\S]*?)\n\];/);
  if (!bloco) return [];
  const cenas = [];
  const re = /key:\s*"([^"]+)"\s*,\s*start:\s*([\d.]+)\s*,\s*end:\s*([\d.]+)[^}]*?caption:\s*"([^"]+)"/g;
  for (const m of bloco[1].matchAll(re)) {
    cenas.push({ key: m[1], start: Number(m[2]), end: Number(m[3]), caption: m[4] });
  }
  return cenas;
}

function componentesPorCena(stageSrc) {
  const mapa = {};
  for (const m of stageSrc.matchAll(/"([^"]+)"\s*:\s*([A-Z][A-Za-z0-9_]*)/g)) mapa[m[1]] = m[2];
  return mapa;
}

function main() {
  const composition = process.argv[2];
  if (!composition) {
    console.error("Uso: node scripts/checar-texto-duplicado.js <Composition>");
    process.exit(1);
  }
  const compDir = path.join(COMPS, composition);
  const tokensPath = path.join(compDir, "tokens.ts");
  const stagePath = path.join(compDir, "components", "MotionStage.tsx");
  const narrPath = path.join(compDir, "data", "narration.json");

  if (!fs.existsSync(tokensPath) || !fs.existsSync(narrPath)) {
    console.log(`${composition}: sem tokens.ts ou narration.json; nada a conferir.`);
    process.exit(0);
  }

  const cenas = lerCenas(fs.readFileSync(tokensPath, "utf8"));
  const comps = fs.existsSync(stagePath)
    ? componentesPorCena(fs.readFileSync(stagePath, "utf8"))
    : {};

  const narr = JSON.parse(fs.readFileSync(narrPath, "utf8"));
  const palavras = Array.isArray(narr) ? narr : narr.words || [];

  const erros = [];

  for (const cena of cenas) {
    if (cena.caption !== "on") continue;

    const nomeComp = comps[cena.key];
    if (!nomeComp) continue;

    const arq = path.join(compDir, "components", "icons", `${nomeComp}.tsx`);
    if (!fs.existsSync(arq)) continue;

    const doPalco = new Set();
    for (const t of textosDoComponente(fs.readFileSync(arq, "utf8"))) {
      for (const p of normalizar(t)) if (ehConteudo(p)) doPalco.add(p);
    }
    if (!doPalco.size) continue;

    const daFala = new Set();
    for (const w of palavras) {
      const ini = Number(w.start);
      if (!(ini >= cena.start && ini < cena.end)) continue;
      for (const p of normalizar(String(w.text || w.word || ""))) {
        if (ehConteudo(p)) daFala.add(p);
      }
    }

    const repetidas = [...doPalco].filter((p) => daFala.has(p));
    if (repetidas.length) {
      erros.push(
        `  [ERRO] cena "${cena.key}" (${nomeComp}): ${repetidas.join(", ")} ` +
          `aparece no palco E na legenda ao mesmo tempo.\n` +
          `         Escolha um canal: ou a cena vai para caption "muted", ou o palco troca a palavra.`
      );
    }
  }

  if (erros.length) {
    console.log(`${composition}: texto repetido entre palco e legenda\n`);
    for (const e of erros) console.log(e);
    console.log(`\n${erros.length} cena(s) com repeticao.`);
    process.exit(2);
  }

  console.log(`${composition}: nenhuma palavra repetida entre palco e legenda.`);
}

main();
