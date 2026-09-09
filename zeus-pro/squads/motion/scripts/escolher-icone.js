#!/usr/bin/env node
/**
 * escolher-icone.js — devolve o ícone Lucide certo para um conceito da fala,
 * pelo mapa recebido do Design System v2.1 (05/09/2026).
 *
 * Uso:
 *   node scripts/escolher-icone.js "nivel de consciencia"
 *   node scripts/escolher-icone.js "educar o publico" --video PauloRuizReels
 *
 * Ranking (icons-map.json): 1) match de expressão inteira, 2) palavra-chave,
 * 3) raiz/lema, 4) empate por rotação (menos usado nos 3 vídeos anteriores
 * no icons-log.json), 5) peso do conceito (assinatura vence). Nunca sorteia.
 * Score 0 = sem ícone: usar N3 (palavra) ou desenhar pela gramática e
 * ACRESCENTAR a entrada no mapa (não inventar uso sem registrar).
 */
const fs = require("fs");
const path = require("path");

const MOTION = path.resolve(__dirname, "..");
const MAPA_PATH = path.join(MOTION, "public/_icones/icons-map.json");
const LOG_PATH = path.join(MOTION, "public/_icones/icons-log.json");

function normalizar(s) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Plural regular do português (s final) casa com o singular do mapa e
// vice-versa: "resultados" tem que achar o termo "resultado" registrado em
// `award`, sem depender do mapa listar as duas formas de cada palavra.
const singularESingularizado = (palavra) =>
  palavra.length > 3 && palavra.endsWith("s") ? [palavra, palavra.slice(0, -1)] : [palavra];

function pontuar(frase, termos) {
  const fPalavras = ` ${normalizar(frase)} `.split(" ").flatMap(singularESingularizado);
  const f = ` ${fPalavras.join(" ")} `;
  let melhor = 0;
  for (const termoBruto of termos) {
    const termo = normalizar(termoBruto);
    if (!termo) continue;
    const palavras = termo.split(" ").length;
    const termoSing = termo.split(" ").map((p) => singularESingularizado(p)[singularESingularizado(p).length - 1]).join(" ");
    if (f.includes(` ${termo} `) || f.includes(` ${termoSing} `)) {
      // expressão inteira (2+ palavras) pontua mais que palavra solta
      melhor = Math.max(melhor, palavras >= 2 ? 3 : 2);
    } else if (palavras === 1 && f.includes(termo.slice(0, Math.max(4, termo.length - 2)))) {
      // raiz/lema: prefixo de pelo menos 4 letras (ex.: "pescar" ~ "pesc")
      melhor = Math.max(melhor, 1);
    }
  }
  return melhor;
}

function main() {
  const args = process.argv.slice(2);
  const frase = args.find((a) => !a.startsWith("--"));
  const videoIdx = args.indexOf("--video");
  const video = videoIdx >= 0 ? args[videoIdx + 1] : null;

  if (!frase) {
    console.error("Uso: node scripts/escolher-icone.js \"conceito ou frase\" [--video <Composition>]");
    process.exit(1);
  }
  if (!fs.existsSync(MAPA_PATH)) {
    console.error(`Mapa não encontrado: ${MAPA_PATH}`);
    process.exit(1);
  }

  const mapa = JSON.parse(fs.readFileSync(MAPA_PATH, "utf8"));
  const conceitos = mapa.icons || mapa.conceitos || mapa;
  const log = fs.existsSync(LOG_PATH) ? JSON.parse(fs.readFileSync(LOG_PATH, "utf8")) : { entries: [] };

  const usoRecente = new Map();
  for (const e of log.entries || []) {
    if (video && e.video !== video) continue;
    usoRecente.set(e.icone, (usoRecente.get(e.icone) || 0) + 1);
  }

  const candidatos = [];
  for (const [nome, termos] of Object.entries(conceitos)) {
    if (!Array.isArray(termos)) continue;
    const score = pontuar(frase, termos);
    if (score > 0) candidatos.push({ nome, score, usos: usoRecente.get(nome) || 0 });
  }

  if (!candidatos.length) {
    console.log(`Sem ícone para "${frase}" (score 0 em todo o mapa).`);
    console.log("Caminho: usar N3 (palavra) ou desenhar pela gramática do §7 e ACRESCENTAR a entrada em icons-map.json — nunca deixar sem registro.");
    process.exit(2);
  }

  candidatos.sort((a, b) => b.score - a.score || a.usos - b.usos);
  const [melhor, ...resto] = candidatos;

  console.log(`Ícone: ${melhor.nome}  (score ${melhor.score}, ${melhor.usos}x usado${video ? ` em ${video}` : ""})`);
  if (resto.length) {
    console.log("Alternativas:", resto.slice(0, 3).map((c) => `${c.nome} (${c.score})`).join(", "));
  }
  if (video && usoRecente.get(melhor.nome) > 0) {
    console.log(`AVISO: "${melhor.nome}" já foi usado neste vídeo. Repetir só com assinatura:true no log — confirmar que é o mesmo conceito de propósito (ex.: coroa = autoridade em dois moldes).`);
  }
}

main();
