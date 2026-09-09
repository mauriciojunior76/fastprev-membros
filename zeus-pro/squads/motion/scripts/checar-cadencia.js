#!/usr/bin/env node
/**
 * checar-cadencia.js — vídeo de câmera na cadência errada trava o olho.
 *
 * Lição `cadencia-do-tile`: o tile do rosto sai a 25 quadros por segundo e a
 * peça roda a 60. Como 60 não é múltiplo de 25, cada quadro do rosto se repete
 * de forma irregular, e o olho lê isso como engasgo. Neste caso o corte de
 * silêncios ainda deixou a taxa média em 24,96 em vez de 25 fixos.
 *
 * O conserto de verdade depende do arquivo bruto da gravação, que não está no
 * repositório. Mas o AVISO não depende: dá para medir a cadência de cada vídeo
 * usado pela peça e comparar com a da peça antes de renderizar, em vez de
 * descobrir olhando o resultado pronto.
 *
 * Regra: a cadência do material precisa ser a mesma da peça, ou um divisor
 * exato dela (30 dentro de 60 funciona; 25 dentro de 60 não).
 *
 * Uso:
 *   node scripts/checar-cadencia.js <Composition>
 */

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const MOTION = path.resolve(__dirname, "..");
const PUBLIC = path.join(MOTION, "public");
const COMPS = path.join(MOTION, "src", "compositions");

const VIDEO = /\.(mp4|mov|webm|mkv)$/i;

/** Quadros por segundo de um arquivo, lidos do próprio arquivo. */
function fpsDe(arquivo) {
  const r = spawnSync("ffprobe", ["-v", "error", "-select_streams", "v:0",
    "-show_entries", "stream=avg_frame_rate,r_frame_rate", "-of", "default=nw=1", arquivo],
    { encoding: "utf8" });
  const saida = (r.stdout || "").trim();
  const ler = (chave) => {
    const m = new RegExp(chave + "=(\\d+)/(\\d+)").exec(saida);
    if (!m || Number(m[2]) === 0) return null;
    return Number(m[1]) / Number(m[2]);
  };
  return { medio: ler("avg_frame_rate"), declarado: ler("r_frame_rate") };
}

/** Os quadros por segundo da peça, lidos dos tokens dela. */
function fpsDaPeca(comp) {
  const p = path.join(COMPS, comp, "tokens.ts");
  if (!fs.existsSync(p)) return null;
  const m = /export const FPS\s*=\s*(\d+)/.exec(fs.readFileSync(p, "utf8"));
  return m ? Number(m[1]) : null;
}

function videosDe(comp) {
  const raiz = path.join(PUBLIC, comp);
  const achados = [];
  const anda = (d) => {
    if (!fs.existsSync(d)) return;
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) anda(p);
      else if (VIDEO.test(e.name)) achados.push(p);
    }
  };
  anda(raiz);
  return achados;
}

function checar(comp) {
  if (!comp) {
    console.error("Uso: node scripts/checar-cadencia.js <Composition>");
    return 1;
  }
  const fpsPeca = fpsDaPeca(comp);
  if (!fpsPeca) {
    console.log(`${comp}: nao consegui ler os quadros por segundo da peca (sem tokens.ts).`);
    return 0;
  }
  const videos = videosDe(comp);
  if (!videos.length) {
    console.log(`OK: ${comp} nao usa video de camera, so desenho.`);
    return 0;
  }

  const problemas = [];
  for (const v of videos) {
    const { medio, declarado } = fpsDe(v);
    const fps = medio || declarado;
    if (!fps) {
      console.log(`  [aviso] nao consegui ler a cadencia de ${path.basename(v)}`);
      continue;
    }
    const divideExato = Math.abs(fpsPeca / fps - Math.round(fpsPeca / fps)) < 0.001;
    const constante = declarado && Math.abs(fps - declarado) < 0.05;
    if (!divideExato) {
      problemas.push({
        arquivo: path.relative(PUBLIC, v),
        motivo: `roda a ${fps.toFixed(2)} quadros e a peca a ${fpsPeca}: ${(fpsPeca / fps).toFixed(2)} nao e numero inteiro, entao cada quadro se repete de forma irregular`,
      });
    } else if (!constante) {
      problemas.push({
        arquivo: path.relative(PUBLIC, v),
        motivo: `cadencia varia (media ${fps.toFixed(2)}, declarada ${declarado.toFixed(2)}): reexportar com cadencia fixa`,
      });
    }
  }

  for (const p of problemas) {
    console.log(`  [ERRO] ${p.arquivo}: ${p.motivo}`);
    console.log(`         Reexportar o material a ${fpsPeca} quadros, ou num divisor exato disso.`);
  }
  console.log(`\n${comp}: ${videos.length} video(s) medido(s), ${problemas.length} fora da cadencia da peca (${fpsPeca}).\n`);
  return problemas.length ? 2 : 0;
}

if (require.main === module) process.exit(checar(process.argv[2]));
module.exports = { checar };
