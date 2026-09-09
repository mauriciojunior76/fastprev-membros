/**
 * achar-cena.js — procura UMA CENA em todas as produções ao mesmo tempo.
 *
 * A busca útil é pela FALA, porque é da fala que a gente lembra: ninguém
 * lembra que a cena se chama "recap-baitscale", todo mundo lembra que "ali
 * ele fala de baleia". Por isso o índice de cada produção (`cenas.json`)
 * guarda o texto falado no intervalo de cada cena, e é nele que se procura.
 *
 * Produção sem `cenas.json` não é procurada: rode `organizar-producao.js`
 * nela antes. O resultado diz onde está o código e onde estão os vídeos, para
 * dar para reaproveitar o pedaço sem refazer.
 */

const fs = require("fs");
const path = require("path");

const OUTPUT = path.resolve(__dirname, "..", "..", "output");

/** Palavras que não distinguem nada e só geram ruído na busca. */
const VAZIAS = new Set(
  ("a as o os um uma de do da dos das em no na nos nas por para pra com sem sobre e ou mas que se " +
   "quando como onde qual quem porque pois entao então aquela aquele aquilo aqui ali esse essa isso " +
   "eu tu voce você ele ela nos eles elas meu minha seu sua parte pedaco pedaço trecho cena video " +
   "fala falando diz dizendo tem ter era foi vai esta está muito mais menos ja já so só tambem também").split(/\s+/)
);

const semAcento = (t) =>
  String(t).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

function producoesComIndice() {
  if (!fs.existsSync(OUTPUT)) return [];
  return fs
    .readdirSync(OUTPUT, { withFileTypes: true })
    .filter((e) => e.isDirectory() && fs.existsSync(path.join(OUTPUT, e.name, "cenas.json")))
    .map((e) => e.name);
}

function buscar(frase) {
  const termos = semAcento(frase).split(/[^a-z0-9]+/).filter((t) => t.length > 2 && !VAZIAS.has(t));
  const achados = [];
  for (const pasta of producoesComIndice()) {
    let d;
    try {
      d = JSON.parse(fs.readFileSync(path.join(OUTPUT, pasta, "cenas.json"), "utf8"));
    } catch {
      continue;
    }
    for (const c of d.cenas || []) {
      const alvo = semAcento([c.fala, c.cena, c.componente].filter(Boolean).join(" "));
      const bate = termos.filter((t) => alvo.includes(t));
      if (bate.length) achados.push({ ...c, tema: d.tema, pasta, pontos: bate.length });
    }
  }
  achados.sort((a, b) => b.pontos - a.pontos || a.de - b.de);
  return { termos, achados };
}

/** Imprime o resultado. Devolve 0 quando achou, 1 quando não. */
function acharCena(frase) {
  const { termos, achados } = buscar(frase);
  if (!termos.length) {
    console.error(`Erro: nao sobrou nenhuma palavra util em "${frase}"`);
    return 1;
  }
  if (!achados.length) {
    console.log(`\nNao achei "${frase}" em nenhuma cena.`);
    console.log(`Procurei por: ${termos.join(", ")}`);
    const com = producoesComIndice();
    console.log(`Producoes com indice: ${com.length ? com.join(", ") : "nenhuma"}`);
    console.log("Producao sem indice nao entra na busca: rode organizar-producao.js nela antes.\n");
    return 1;
  }

  console.log(`\n${achados.length} cena(s) para "${frase}"\n`);
  for (const a of achados.slice(0, 12)) {
    console.log(`  ${a.tema}  ${a.de}s a ${a.ate}s`);
    console.log(`    cena ${a.cena}${a.componente ? ", desenhada por " + a.componente : ""}`);
    if (a.fala) {
      const f = a.fala.length > 90 ? a.fala.slice(0, 87) + "..." : a.fala;
      console.log(`    fala: "${f}"`);
    }
    console.log(`    videos: squads/motion/output/${a.pasta}/`);
    console.log("");
  }
  if (achados.length > 12) console.log(`  (e mais ${achados.length - 12})\n`);
  return 0;
}

module.exports = { acharCena, buscar, producoesComIndice, VAZIAS };
