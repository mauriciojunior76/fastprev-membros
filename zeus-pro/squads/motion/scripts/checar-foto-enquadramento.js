#!/usr/bin/env node
/**
 * checar-foto-enquadramento.js — foto de pessoa que não preenche a moldura.
 *
 * Lição `enquadramento-de-foto`, duas rodadas: "no segundo 04 que aparece a
 * foto da pessoa ta errada" e "o rosto da mulher ta mal enquadrado cortou o
 * queixo tem que ter um respiro abaixo do rosto e a foto do homem tem barras
 * brancas laterais".
 *
 * O que este script prova sozinho: barra sólida na borda, que é o defeito
 * objetivo. Mede as colunas da esquerda e da direita e as linhas de cima e de
 * baixo; se uma faixa inteira for de cor praticamente única, é fundo aparecendo
 * onde devia ter foto.
 *
 * O que ele NÃO prova: respiro abaixo do queixo, que depende de saber onde
 * está o rosto. Esse continua sendo do agente `revisor-visual-motion`, e o
 * script diz isso na cara em vez de fingir cobertura.
 *
 * Uso:
 *   node scripts/checar-foto-enquadramento.js <Composition>
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const MOTION = path.resolve(__dirname, "..");
const PUBLIC = path.join(MOTION, "public");

const FOTO = /\.(png|jpe?g|webp)$/i;
/** Faixa examinada em cada borda, em fração da largura ou altura. */
const FAIXA = 0.03;
/** Desvio de cor abaixo disso é faixa lisa, ou seja, fundo. */
const DESVIO_LISO = 6;

function pastasDeFoto(comp) {
  const raiz = path.join(PUBLIC, comp);
  const achados = [];
  const anda = (d) => {
    if (!fs.existsSync(d)) return;
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) anda(p);
      else if (FOTO.test(e.name)) achados.push(p);
    }
  };
  anda(raiz);
  return achados;
}

/**
 * Desvio padrão médio dos canais numa faixa: perto de zero é cor chapada.
 *
 * O recorte vira buffer antes de medir porque `stats()` encadeado depois de
 * `extract()` mede a imagem inteira e ignora o recorte sem avisar. Com o
 * encadeamento direto, toda borda devolvia o mesmo número e nada era detectado.
 */
async function desvioDaFaixa(img, regiao) {
  const recorte = await img.clone().extract(regiao).toBuffer();
  const { channels } = await sharp(recorte).stats();
  const usados = channels.slice(0, 3);
  return usados.reduce((s, c) => s + c.stdev, 0) / usados.length;
}

async function checarUma(arquivo) {
  const img = sharp(arquivo);
  const { width: w, height: h } = await img.metadata();
  if (!w || !h) return null;

  const fw = Math.max(2, Math.round(w * FAIXA));
  const fh = Math.max(2, Math.round(h * FAIXA));
  const bordas = {
    esquerda: { left: 0, top: 0, width: fw, height: h },
    direita: { left: w - fw, top: 0, width: fw, height: h },
    topo: { left: 0, top: 0, width: w, height: fh },
    base: { left: 0, top: h - fh, width: w, height: fh },
  };

  const lisas = [];
  for (const [nome, regiao] of Object.entries(bordas)) {
    const d = await desvioDaFaixa(img, regiao);
    if (d < DESVIO_LISO) lisas.push({ borda: nome, desvio: +d.toFixed(1) });
  }
  return { largura: w, altura: h, lisas };
}

async function checar(comp) {
  if (!comp) {
    console.error("Uso: node scripts/checar-foto-enquadramento.js <Composition>");
    return 1;
  }
  const fotos = pastasDeFoto(comp);
  if (!fotos.length) {
    console.log(`OK: ${comp} nao tem foto em public/${comp}.`);
    return 0;
  }

  const problemas = [];
  for (const f of fotos) {
    let r;
    try {
      r = await checarUma(f);
    } catch (e) {
      console.log(`  [aviso] nao consegui ler ${path.basename(f)}: ${e.message}`);
      continue;
    }
    if (!r) continue;
    // Um par de bordas opostas lisas é barra; uma borda só costuma ser
    // composição de propósito (céu, mesa, fundo de estúdio).
    const nomes = r.lisas.map((l) => l.borda);
    const par =
      (nomes.includes("esquerda") && nomes.includes("direita")) ||
      (nomes.includes("topo") && nomes.includes("base"));
    if (par) {
      problemas.push({
        arquivo: path.relative(PUBLIC, f),
        eixo: nomes.includes("esquerda") ? "laterais" : "topo e base",
        detalhe: r.lisas.map((l) => `${l.borda} ${l.desvio}`).join(", "),
      });
    }
  }

  for (const p of problemas) {
    console.log(`  [ERRO] ${p.arquivo}: barra lisa nas ${p.eixo} (desvio de cor ${p.detalhe}).`);
    console.log("         A foto nao cobre a moldura. Aproximar ate a barra sair.");
  }
  console.log(
    `\n${comp}: ${fotos.length} foto(s) medida(s), ${problemas.length} com barra na borda.`
  );
  console.log("Respiro abaixo do queixo NAO e medido aqui: e do agente revisor-visual-motion.\n");
  return problemas.length ? 2 : 0;
}

if (require.main === module) {
  checar(process.argv[2]).then((c) => process.exit(c));
}
module.exports = { checar };
