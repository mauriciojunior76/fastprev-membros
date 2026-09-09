#!/usr/bin/env node
/**
 * checar-origem-de-marca.js — todo desenho de marca de terceiro tem origem declarada.
 *
 * Lição `material-de-terceiro`: "a logo do instagram tu não deveria criar
 * deveria pegar na internet, logo de empresas marcas ou imagens padrão jamais
 * deve criar sempre buscar em locais que tenham as imagens".
 *
 * Nenhuma medida prova que um vetor foi desenhado à mão em vez de baixado: o
 * arquivo fica igual. Então a prova é DECLARADA. Cada desenho de marca precisa
 * de uma linha em `aprendizado/origem-de-marca.json` dizendo de onde veio.
 * Componente de marca sem essa linha reprova, e declarar exige olhar a origem.
 *
 * Uso:
 *   node scripts/checar-origem-de-marca.js <Composition>
 */

const fs = require("fs");
const path = require("path");

const MOTION = path.resolve(__dirname, "..");
const COMPS = path.join(MOTION, "src", "compositions");
const ORIGENS = path.join(MOTION, "aprendizado", "origem-de-marca.json");
const MARCAS = path.join(MOTION, "aprendizado", "cores-de-marca.json");

function arquivosDe(comp) {
  const achados = [];
  const anda = (d) => {
    if (!fs.existsSync(d)) return;
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) anda(p);
      // `_versions` guarda cópia de segurança de arquivo já editado: cobrar
      // origem lá é cobrar duas vezes pela mesma coisa.
      else if (/\.tsx?$/.test(e.name) && !p.includes("_versions")) achados.push(p);
    }
  };
  anda(path.join(COMPS, comp));
  return achados;
}

function checar(comp) {
  if (!comp) {
    console.error("Uso: node scripts/checar-origem-de-marca.js <Composition>");
    return 1;
  }
  let marcas = {};
  let origens = {};
  try { marcas = JSON.parse(fs.readFileSync(MARCAS, "utf8")).marcas || {}; } catch {}
  try { origens = JSON.parse(fs.readFileSync(ORIGENS, "utf8")).assets || {}; } catch {}

  const declarados = new Set(Object.values(origens).map((a) => String(a.onde || "")));
  const semOrigem = [];
  let vistos = 0;

  for (const arq of arquivosDe(comp)) {
    const rel = path.relative(MOTION, arq).split(path.sep).join("/");
    const src = fs.readFileSync(arq, "utf8");
    for (const marca of Object.keys(marcas)) {
      if (!new RegExp(marca, "i").test(src)) continue;
      // Só cobra de quem DESENHA A MARCA. Usar a COR do Instagram não é
      // desenhar o logo do Instagram: a primeira versão cobrava dos 12
      // componentes da peça, porque todos têm svg e todos citam a cor.
      // O sinal de que o arquivo desenha a marca é o nome dela no NOME do
      // arquivo, ou numa constante de logo dentro dele.
      const nomeArquivo = path.basename(arq).toLowerCase();
      const constanteDeLogo = new RegExp(
        `${marca}[_ ]?(path|logo|wordmark|mark|glifo)|(logo|wordmark)[_ ]?${marca}`, "i"
      );
      if (!nomeArquivo.includes(marca.toLowerCase()) && !constanteDeLogo.test(src)) continue;
      if (!/<path|<svg|\bd=\{|\bd="M/.test(src)) continue;
      vistos++;
      const declarado = [...declarados].some((d) => rel.endsWith(d) || d.endsWith(rel) || d.includes(path.basename(arq)));
      if (!declarado) semOrigem.push({ rel, marca });
    }
  }

  if (!vistos) {
    console.log(`OK: ${comp} nao desenha nenhuma marca de terceiro.`);
    return 0;
  }
  for (const s of semOrigem) {
    console.log(`  [ERRO] ${s.rel} desenha ${s.marca} e nao tem origem declarada.`);
    console.log(`         Declarar em aprendizado/origem-de-marca.json de onde veio o arquivo.`);
    console.log(`         Se foi desenhado a mao, buscar o oficial: isso e proibido.`);
  }
  console.log(`\n${comp}: ${vistos} desenho(s) de marca, ${semOrigem.length} sem origem declarada.\n`);
  return semOrigem.length ? 2 : 0;
}

if (require.main === module) process.exit(checar(process.argv[2]));
module.exports = { checar };
