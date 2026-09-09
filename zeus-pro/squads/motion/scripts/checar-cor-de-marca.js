#!/usr/bin/env node
/**
 * checar-cor-de-marca.js — a cor de marca é copiada da referência, nunca escolhida.
 *
 * Lição `cor-de-marca`, quatro rodadas: "ta horrivel essa cor da palavra
 * instagram", "era pra ser o colorido com as cores do arco iris nao ficar
 * repetindo cores", "tu inventou cores", "ainda ficou lavada a cor".
 *
 * Cada rodada teve uma causa diferente e todas produziram o mesmo sintoma, que
 * é justamente por que quatro tentativas de olho não resolveram:
 *
 *   1. paleta pastel do squad usada em texto grande, em vez da paleta pedida;
 *   2. o conversor de vetor dá a cada letra um deslocamento próprio, e um
 *      gradiente em espaço de usuário reinicia a cada deslocamento;
 *   3. máscara e opacidade lavam a cor, porque máscara em SVG trabalha por
 *      luminância.
 *
 * Este script cobre as três de forma mecânica, lendo o código:
 *   - cor de marca declarada fora da lista de referência
 *   - elemento de marca sob `mask`, `opacity` menor que 1 ou `filter`
 *   - gradiente de marca em `userSpaceOnUse` num elemento que tem `transform`
 *
 * Uso:
 *   node scripts/checar-cor-de-marca.js <Composition>
 *
 * Sai com código 2 quando acha problema.
 */

const fs = require("fs");
const path = require("path");

const MOTION = path.resolve(__dirname, "..");
const COMPS = path.join(MOTION, "src", "compositions");
const REFS = path.join(MOTION, "aprendizado", "cores-de-marca.json");

const hexes = (txt) => (txt.match(/#[0-9a-fA-F]{6}\b/g) || []).map((h) => h.toLowerCase());

/** Distância entre duas cores, 0 a 441. Acima de 40 o olho vê como outra cor. */
function distancia(a, b) {
  const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [r1, g1, b1] = p(a);
  const [r2, g2, b2] = p(b);
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

function arquivosDe(comp) {
  const dir = path.join(COMPS, comp);
  const achados = [];
  const anda = (d) => {
    if (!fs.existsSync(d)) return;
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) anda(p);
      else if (/\.tsx?$/.test(e.name)) achados.push(p);
    }
  };
  anda(dir);
  return achados;
}

function checar(comp) {
  if (!comp) {
    console.error("Uso: node scripts/checar-cor-de-marca.js <Composition>");
    return 1;
  }
  if (!fs.existsSync(REFS)) {
    console.error(`Erro: falta a lista de referencia em ${path.relative(MOTION, REFS)}`);
    return 1;
  }
  const refs = JSON.parse(fs.readFileSync(REFS, "utf8")).marcas || {};
  const erros = [];
  const avisos = [];
  let marcasVistas = 0;

  for (const arq of arquivosDe(comp)) {
    const src = fs.readFileSync(arq, "utf8");
    const nome = path.relative(path.join(COMPS, comp), arq);

    for (const [marca, ref] of Object.entries(refs)) {
      const mencao = new RegExp(ref.aparece_como || marca, "i");
      if (!mencao.test(src)) continue;
      marcasVistas++;

      // 1. cor declarada que não existe na referência.
      // Uma marca pode ter mais de um elemento, cada um com a sua paleta: o
      // nome escrito e o anel de story do Instagram são os dois oficiais e
      // são paletas diferentes. Confundir os dois foi parte do erro.
      const oficiais = [
        ...(ref.cores || []),
        ...Object.values(ref.elementos || {}).flatMap((e) => e.cores || []),
      ].map((c) => c.toLowerCase());
      for (const h of new Set(hexes(src))) {
        const perto = oficiais.some((o) => distancia(h, o) <= (ref.tolerancia || 40));
        const doSquad = (ref.cores_neutras_permitidas || []).map((c) => c.toLowerCase()).includes(h);
        if (!perto && !doSquad) {
          avisos.push(`${nome}: ${h} nao esta na referencia de ${marca}. Se e cor da marca, copie da referencia; se e cor de fundo do squad, declare em cores_neutras_permitidas.`);
        }
      }

      // 2. o que lava a cor
      for (const [re, oque] of [
        [/mask\s*=|<mask\b|mask-image/i, "mascara (trabalha por luminancia e lava a cor)"],
        [/opacity\s*[:=]\s*\{?\s*0?\.\d/i, "opacidade menor que 1"],
        [/filter\s*=\s*["'{]/i, "filtro"],
      ]) {
        if (re.test(src)) {
          erros.push(`${nome}: elemento de ${marca} com ${oque}. Cor de marca vai na cor cheia, na frente de tudo.`);
        }
      }

      // 3. gradiente que reinicia por letra
      if (/userSpaceOnUse/i.test(src) && /transform\s*=\s*["'{]/i.test(src)) {
        erros.push(`${nome}: gradiente de ${marca} em userSpaceOnUse num desenho com transform. Cada letra reinicia o gradiente. Asse o deslocamento nas coordenadas do caminho.`);
      }
    }
  }

  if (!marcasVistas) {
    console.log(`OK: ${comp} nao usa nenhuma marca da lista de referencia.`);
    return 0;
  }
  for (const a of avisos) console.log(`  [aviso] ${a}`);
  for (const e of erros) console.log(`  [ERRO] ${e}`);

  console.log(
    `\n${comp}: ${erros.length} erro(s), ${avisos.length} aviso(s) em cor de marca.` +
      (erros.length ? "\nEle ja teve que falar disso 4 vezes. Nao entregar assim.\n" : "\n")
  );
  return erros.length ? 2 : 0;
}

if (require.main === module) process.exit(checar(process.argv[2]));
module.exports = { checar };
