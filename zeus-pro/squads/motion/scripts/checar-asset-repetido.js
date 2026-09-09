#!/usr/bin/env node
/**
 * checar-asset-repetido.js — a mesma imagem em duas produções diferentes.
 *
 * Lição `imagem-repetida`: "cada vídeo é único, cada cena é única, o conceito e
 * o estilo seguem iguais, mas as imagens não podem ser iguais."
 *
 * Compara o conteúdo do arquivo, não o nome: o mesmo objeto salvo com dois
 * nomes continua sendo a mesma imagem na tela.
 *
 * Uso:
 *   node scripts/checar-asset-repetido.js [<Composition>]
 *
 * Sem argumento, varre todas. Sai com código 2 quando acha repetição.
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const MOTION = path.resolve(__dirname, "..");
const PUBLIC = path.join(MOTION, "public");

const IMAGEM = /\.(png|jpe?g|webp|avif|svg)$/i;

/** Pastas de public que não pertencem a uma produção específica. */
const COMUNS = new Set(["_sfx", "sounds", "audio", "fonts", "logos", "marca", "shared"]);

/**
 * Identidade da nossa marca repete de propósito: o selo Zeus fecha toda peça.
 * A lição vale para imagem de CONTEÚDO, e a diferença entre as duas coisas é
 * decisão de gente, por isso mora numa lista declarada e não numa heurística.
 */
function podeRepetir(rel) {
  const listaP = path.join(MOTION, "aprendizado", "assets-que-podem-repetir.json");
  if (!fs.existsSync(listaP)) return null;
  let lista;
  try { lista = JSON.parse(fs.readFileSync(listaP, "utf8")).padroes || []; } catch { return null; }
  const alvo = rel.split(path.sep).join("/").toLowerCase();
  const achou = lista.find((p) => alvo.includes(String(p.padrao).toLowerCase()));
  return achou ? achou.motivo : null;
}

function varrer(dir, base) {
  const achados = [];
  if (!fs.existsSync(dir)) return achados;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) achados.push(...varrer(p, base));
    else if (IMAGEM.test(e.name)) achados.push(path.relative(base, p));
  }
  return achados;
}

function hash(arquivo) {
  return crypto.createHash("md5").update(fs.readFileSync(arquivo)).digest("hex");
}

function checar(soEsta) {
  const producoes = fs
    .readdirSync(PUBLIC, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !COMUNS.has(e.name))
    .map((e) => e.name);

  const porHash = new Map();
  for (const prod of producoes) {
    for (const rel of varrer(path.join(PUBLIC, prod), path.join(PUBLIC, prod))) {
      const arq = path.join(PUBLIC, prod, rel);
      let h;
      try {
        h = hash(arq);
      } catch {
        continue;
      }
      if (!porHash.has(h)) porHash.set(h, []);
      porHash.get(h).push({ producao: prod, arquivo: rel, bytes: fs.statSync(arq).size });
    }
  }

  const permitidos = [];
  const repetidos = [...porHash.values()].filter((usos) => {
    const prods = new Set(usos.map((u) => u.producao));
    if (prods.size < 2) return false;
    if (soEsta && !prods.has(soEsta)) return false;
    const motivo = podeRepetir(usos[0].arquivo);
    if (motivo) { permitidos.push({ usos, motivo }); return false; }
    return true;
  });

  if (!repetidos.length) {
    console.log(`OK: nenhuma imagem de conteudo repetida entre producoes (${producoes.length} producoes varridas).`);
    for (const p of permitidos) {
      console.log(`  (${path.basename(p.usos[0].arquivo)} aparece em ${p.usos.length} pecas de proposito: ${p.motivo})`);
    }
    return 0;
  }

  console.log(`\n${repetidos.length} imagem(ns) usada(s) em mais de uma producao:\n`);
  for (const usos of repetidos) {
    console.log(`  ${(usos[0].bytes / 1024).toFixed(0)} KB, o mesmo arquivo em:`);
    for (const u of usos) console.log(`    ${u.producao}/${u.arquivo}`);
    console.log("");
  }
  console.log("Conceito e estilo se repetem entre pecas; imagem nunca. Trocar antes de entregar.\n");
  return 2;
}

if (require.main === module) {
  process.exit(checar(process.argv[2] || null));
}
module.exports = { checar };
