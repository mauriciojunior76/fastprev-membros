#!/usr/bin/env node
/**
 * extract-amplitude.js — extrai a amplitude REAL da narracao, frame a frame,
 * pra dirigir waveforms de voz que se mexem conforme a fala (ordem do
 * o dono do canal 27/08/2026: "ele vai se mover conforme a minha voz naquele
 * momento").
 *
 * Uso: node scripts/extract-amplitude.js <Composicao> [fps]
 *   ex: node scripts/extract-amplitude.js ZeusTrafegoReels 60
 *
 * Le public/<Comp>/audio-final.wav via ffmpeg (PCM mono 48kHz), calcula RMS
 * por janela de 1/fps segundos, normaliza pro pico (0..1), aplica media
 * movel de 5 frames (sem isso a barra treme feio) e grava
 * src/compositions/<Comp>/data/amplitude.json:
 *   { "fps": 60, "frames": [0.0, 0.12, ...] }
 *
 * Ferramenta padrao do squad: qualquer composicao com narracao gera o seu.
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const comp = process.argv[2];
const fps = Number(process.argv[3] || 60);
if (!comp) {
  console.error("uso: node scripts/extract-amplitude.js <Composicao> [fps]");
  process.exit(1);
}

const wav = path.join(ROOT, "public", comp, "audio-final.wav");
if (!fs.existsSync(wav)) {
  console.error(`audio nao encontrado: ${wav}`);
  process.exit(1);
}

const SR = 48000;
const pcm = execFileSync(
  "ffmpeg",
  ["-v", "error", "-i", wav, "-f", "s16le", "-acodec", "pcm_s16le", "-ac", "1", "-ar", String(SR), "-"],
  { maxBuffer: 1024 * 1024 * 512 }
);

const samples = pcm.length >> 1;
const win = Math.round(SR / fps);
const nFrames = Math.ceil(samples / win);
const raw = new Array(nFrames).fill(0);

for (let f = 0; f < nFrames; f++) {
  const start = f * win;
  const end = Math.min(start + win, samples);
  let sum = 0;
  for (let i = start; i < end; i++) {
    const s = pcm.readInt16LE(i * 2) / 32768;
    sum += s * s;
  }
  raw[f] = Math.sqrt(sum / Math.max(1, end - start));
}

// media movel de 5 frames (risco 2 do plano: amplitude ruidosa)
const smooth = raw.map((_, f) => {
  let acc = 0;
  let n = 0;
  for (let k = -2; k <= 2; k++) {
    const j = f + k;
    if (j >= 0 && j < nFrames) {
      acc += raw[j];
      n++;
    }
  }
  return acc / n;
});

const peak = Math.max(...smooth, 1e-6);
const frames = smooth.map((v) => Number((v / peak).toFixed(3)));

const outDir = path.join(ROOT, "src", "compositions", comp, "data");
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, "amplitude.json");
fs.writeFileSync(outFile, JSON.stringify({ fps, frames }));
console.log(`ok: ${outFile} (${frames.length} frames @ ${fps}fps, pico normalizado)`);
