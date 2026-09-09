#!/usr/bin/env node
/**
 * qa-frames.js — gate visual: renderiza frames-chave e gera a rubrica de
 * inspecao (reforma do motion design system, 19/08/2026).
 *
 * O choreo-lint (checks 2b do pre-render-validate) pega o que e
 * DETERMINISTICO a partir dos DADOS do spec (direcao repetida, stagger
 * ausente etc). O que ele NAO pega — "isto parece um slide de PowerPoint
 * congelado?", hierarquia visual real, eixo optico realmente alinhado,
 * legibilidade — so da pra avaliar OLHANDO pixels. Este script produz os
 * pixels certos pra isso: por cena, 3 frames (meio da cena = teste do
 * frame congelado; meio da entrada; meio da transicao de saida, se
 * houver) + um checklist.md com a rubrica 0-10 por criterio fundamental.
 * Quem PONTUA e o agente lendo as imagens (Read) — este script so gera
 * os artefatos.
 *
 * NOTA TECNICA (encontrado 19-20/08/2026, piloto ZeusTrafegoReels): chamar
 * renderStill() varias vezes em sequencia, no MESMO processo/serveUrl, pra
 * frames de composicoes com multiplos <Sequence> sobrepostos, produzia
 * frames ERRADOS (mostrava a cena anterior em vez da atual) mesmo com o
 * video final renderizado correto — comparado byte a byte via ffmpeg no
 * mesmo timestamp, o video real batia, o renderStill isolado nao. Causa
 * provavel: estado de Sequence nao reseta limpo entre chamadas isoladas
 * de renderStill no mesmo processo. Correcao: renderizar um MP4 real
 * (renderMedia, baixa qualidade, rapido) e extrair os frames-alvo dele
 * via ffmpeg — o mesmo pipeline que ja prova estar correto.
 *
 * Uso:
 *   node scripts/qa-frames.js <CompositionName>
 *
 * Saida:
 *   output/_qa/<Comp>/scene-NN-<tipo>.png
 *   output/_qa/<Comp>/checklist.md
 */

const path = require("path");
const fs = require("fs");
const { execFileSync } = require("child_process");
const { findChoreographyFile, loadSpec } = require("./lib/load-choreography");
const { resolveCompDir } = require("./lib/resolve-comp-dir");

const ROOT = path.resolve(__dirname, ".."); // squads/motion
const ENTRY = path.join(ROOT, "src", "index.ts");
const COMPOSITIONS_DIR = path.join(ROOT, "src", "compositions");
const QA_BASE = path.join(ROOT, "output", "_qa");

const COMPOSITION = process.argv[2];
if (!COMPOSITION) {
  console.error("Uso: node scripts/qa-frames.js <CompositionName>");
  process.exit(1);
}

// F6 e F7 nasceram do defeito de 27/08/2026 (6a rodada): a legenda
// atravessando o topo do celular do chat, e o dado sobreposto ao player
// dentro do balao. O choreo-lint pega o caso de ALTURA (palco-overflow),
// mas colisao horizontal e vazamento de filho so o olho pega no frame.
const FUNDAMENTAIS = [
  "Hierarquia clara no frame congelado (um elemento manda, o resto apoia)",
  "Nenhuma entrada/saida seca (sempre opacity+blur+posicao juntos)",
  "Eixo optico dos elementos alinhado (nao parecem soltos/flutuando)",
  "Dentro da safe area (nada cortado nas bordas, nada na dead zone da base)",
  "Isto pareceria um slide de PowerPoint se eu mostrasse parado?",
  "A LEGENDA cruza algum elemento do palco neste frame? (tem que ser NAO)",
  "Algum filho VAZA do conteiner (balao, card, moldura) ou se sobrepoe a outro?",
];

/** frames-alvo por cena: meio (frame congelado), meio da entrada, meio da
 * transicao de saida (se houver exitF). Sem spec: intervalos regulares. */
function targetFramesForScene(scene) {
  const targets = [{ tag: "meio", frame: scene.from + Math.round(scene.dur * 0.5) }];
  targets.push({ tag: "entrada", frame: scene.from + 8 });
  if (scene.exitF != null) {
    targets.push({ tag: "transicao", frame: scene.from + scene.exitF + 8 });
  }
  return targets;
}

function genericTargets(bundleFrames, count = 6) {
  const targets = [];
  for (let i = 1; i <= count; i++) {
    targets.push({ tag: `t${i}`, frame: Math.round((bundleFrames * i) / (count + 1)) });
  }
  return targets;
}

function sanitize(name) {
  return name.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 30) || "cena";
}

async function main() {
  const { bundle } = require("@remotion/bundler");
  const { selectComposition, renderMedia, getCompositions } = require("@remotion/renderer");

  console.log(`Empacotando o projeto (bundle)...`);
  const serveUrl = await bundle({ entryPoint: ENTRY });

  const comps = await getCompositions(serveUrl);
  const meta = comps.find((c) => c.id === COMPOSITION);
  if (!meta) {
    console.error(`Composition "${COMPOSITION}" nao registrada.`);
    process.exit(1);
  }

  const compDir = resolveCompDir(COMPOSITIONS_DIR, COMPOSITION);
  const choreographyPath = findChoreographyFile(compDir);
  let spec = null;
  if (choreographyPath) {
    try {
      spec = loadSpec(choreographyPath);
    } catch (e) {
      console.error(`Falha ao ler choreography.ts: ${e.message}`);
      process.exit(1);
    }
  }

  const outDir = path.join(QA_BASE, COMPOSITION);
  fs.mkdirSync(outDir, { recursive: true });
  for (const old of fs.readdirSync(outDir)) {
    if (old.endsWith(".png")) fs.unlinkSync(path.join(outDir, old));
  }

  const rows = []; // { file, sceneName, tag, frame }
  const scenesForTargets = spec
    ? spec.scenes.map((s, i) => ({ sceneIndex: i, name: s.name, targets: targetFramesForScene(s) }))
    : [{ sceneIndex: 0, name: "(sem spec)", targets: genericTargets(meta.durationInFrames) }];

  // 1. Render real (baixa qualidade, rapido) — a UNICA fonte confiavel de
  // pixel pro QA. Nunca renderStill isolado (ver nota tecnica no topo).
  console.log(`Renderizando amostra de ${COMPOSITION} para extrair os frames...`);
  const selected = await selectComposition({ serveUrl, id: COMPOSITION });
  const tmpVideo = path.join(outDir, "_qa-sample.mp4");
  await renderMedia({
    serveUrl,
    composition: selected,
    codec: "h264",
    outputLocation: tmpVideo,
    scale: 0.35,
    jpegQuality: 65,
    onProgress: ({ progress }) => process.stdout.write(`\r  ${Math.round(progress * 100)}%   `),
  });
  process.stdout.write("\n");

  // 2. Extrai cada frame-alvo do MP4 real via ffmpeg (mesmo pipeline que
  // ja prova estar correto — comparado byte a byte contra o video final).
  console.log(`Extraindo frames-chave...`);
  for (const scene of scenesForTargets) {
    for (const t of scene.targets) {
      // spec.frameOffset (ver core/choreo.ts): o choreography.ts pode usar
      // frames relativos ao INICIO DO CONTEUDO, nao da composicao renderizada
      // (ex.: ZeusTrafegoReels tem um HookCard de 60f antes). Sem somar isso
      // aqui, o frame extraido cai na cena ERRADA (bug real, encontrado e
      // corrigido no piloto: o video batia, o frame extraido nao).
      const rawFrame = Math.max(0, Math.min(meta.durationInFrames - 1, t.frame));
      const frame = Math.min(meta.durationInFrames - 1, rawFrame + (spec?.frameOffset ?? 0));
      const timeS = (frame / meta.fps).toFixed(4);
      const fileName = `scene-${String(scene.sceneIndex).padStart(2, "0")}-${sanitize(scene.name)}-${t.tag}.png`;
      const outputFile = path.join(outDir, fileName);
      execFileSync("ffmpeg", ["-y", "-v", "error", "-i", tmpVideo, "-ss", timeS, "-frames:v", "1", outputFile]);
      rows.push({ file: fileName, sceneName: scene.name, tag: t.tag, frame });
      process.stdout.write(`.`);
    }
  }
  process.stdout.write("\n");

  fs.unlinkSync(tmpVideo);

  writeChecklist(outDir, rows);

  console.log(`\n${rows.length} frame(s) em: ${outDir}`);
  console.log(`Checklist: ${path.join(outDir, "checklist.md")}`);
}

function writeChecklist(outDir, rows) {
  const lines = [];
  lines.push(`# QA visual — ${path.basename(outDir)}`);
  lines.push("");
  lines.push(
    "Regra de pontuacao: 0 a 10 por criterio fundamental, SEM MEDIA. " +
      "Nota abaixo de 8 em QUALQUER fundamental = reprovado, mesmo que os outros sejam altos."
  );
  lines.push("");
  lines.push("## Frames gerados");
  lines.push("");
  for (const r of rows) {
    lines.push(`- \`${r.file}\` — cena "${r.sceneName}", ${r.tag}, frame ${r.frame}`);
  }
  lines.push("");
  lines.push("## Rubrica (preencher por rodada de QA, uma linha por frame ou por cena)");
  lines.push("");
  lines.push("| Frame | " + FUNDAMENTAIS.map((_, i) => `F${i + 1}`).join(" | ") + " | Veredito |");
  lines.push("|---|" + FUNDAMENTAIS.map(() => "---").join("|") + "|---|");
  for (const r of rows) {
    lines.push(`| ${r.file} | | | | | | |`);
  }
  lines.push("");
  lines.push("Legenda dos criterios:");
  FUNDAMENTAIS.forEach((f, i) => lines.push(`- F${i + 1}: ${f}`));
  lines.push("");
  lines.push(
    "Aprovado = todas as notas fundamentais >= 8 em TODOS os frames. " +
      "Registrar o resultado final em approval.json (hash do bundle + notas) antes do render final."
  );
  fs.writeFileSync(path.join(outDir, "checklist.md"), lines.join("\n") + "\n", "utf8");
}

main().catch((e) => {
  console.error("Erro:", e.message);
  process.exit(1);
});
