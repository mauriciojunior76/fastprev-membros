#!/usr/bin/env node
/**
 * qa-approve.js — registra o veredicto do gate visual (reforma do motion
 * design system, 19/08/2026).
 *
 * qa-frames.js gera os PNGs e o checklist.md; um agente le as imagens
 * (Read) e preenche as notas 0-10 dos criterios fundamentais; este script
 * grava o veredicto em output/_qa/<Comp>/approval.json, amarrado ao hash
 * do src/ no momento da aprovacao (mesma funcao hashSrc de
 * get-compositions.js). render.js, no modo final, EXIGE esse arquivo com
 * hash batendo e todas as notas >= 8 pra composicao com choreography.ts —
 * senao aborta (regra: nota abaixo de 8 em qualquer fundamental reprova,
 * SEM MEDIA).
 *
 * Uso:
 *   node scripts/qa-approve.js <Comp> --scores F1=9,F2=9,F3=8,F4=10,F5=9,F6=10,F7=10
 *   node scripts/qa-approve.js <Comp> --scores F1=9,F2=9,F3=8,F4=10,F5=9,F6=10,F7=10 --note "revisado apos ajuste do CupAndGear"
 */

const fs = require("fs");
const path = require("path");
const { hashSrc } = require("./lib/get-compositions");

const ROOT = path.resolve(__dirname, "..");
const QA_BASE = path.join(ROOT, "output", "_qa");

const args = process.argv.slice(2);
const COMPOSITION = args[0];
const scoresArg = args.find((a) => a.startsWith("--scores="))?.split("=")[1]
  ?? (args.includes("--scores") ? args[args.indexOf("--scores") + 1] : null);
const noteArg = args.includes("--note") ? args[args.indexOf("--note") + 1] : "";

if (!COMPOSITION || !scoresArg) {
  console.error('Uso: node scripts/qa-approve.js <Comp> --scores F1=9,F2=9,F3=8,F4=10,F5=9,F6=10,F7=10 [--note "..."]');
  process.exit(1);
}

const scores = {};
for (const pair of scoresArg.split(",")) {
  const [k, v] = pair.split("=");
  scores[k.trim()] = Number(v);
}

// F6/F7 entraram em 27/08/2026 (6a rodada): colisao legenda-elemento e
// vazamento de filho fora do conteiner. Sao os dois defeitos que o
// o dono do canal fotografou e que nenhuma nota anterior media.
const REQUIRED = ["F1", "F2", "F3", "F4", "F5", "F6", "F7"];
for (const k of REQUIRED) {
  if (!(k in scores) || Number.isNaN(scores[k])) {
    console.error(`Faltando nota para ${k}. Esperado: F1..F7 (0-10 cada).`);
    process.exit(1);
  }
}

const failing = REQUIRED.filter((k) => scores[k] < 8);
const verdict = failing.length === 0 ? "aprovado" : "reprovado";

const outDir = path.join(QA_BASE, COMPOSITION);
fs.mkdirSync(outDir, { recursive: true });

const approval = {
  composition: COMPOSITION,
  srcHash: hashSrc(COMPOSITION),
  approvedAt: new Date().toISOString(),
  scores,
  verdict,
  failing,
  note: noteArg,
};

fs.writeFileSync(path.join(outDir, "approval.json"), JSON.stringify(approval, null, 2), "utf8");

console.log(`\n[qa-approve] ${COMPOSITION}: ${verdict.toUpperCase()}`);
for (const k of REQUIRED) {
  const tag = scores[k] < 8 ? "FALHA" : "ok";
  console.log(`  ${k}: ${scores[k]}/10  ${tag}`);
}
if (failing.length) {
  console.log(`\nReprovado em: ${failing.join(", ")}. Corrigir e rodar qa-frames + qa-approve de novo.`);
  process.exit(1);
}
console.log(`\nGravado em: ${path.join(outDir, "approval.json")}`);
