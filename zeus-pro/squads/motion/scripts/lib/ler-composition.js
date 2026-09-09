/**
 * ler-composition.js — leitura POR TEXTO dos arquivos de uma composition.
 *
 * POR QUE LER POR TEXTO E NAO EXECUTAR O TYPESCRIPT: os gates precisam rodar
 * antes do bundle, em milissegundos, sem depender de ts-node (que nao esta
 * instalado) nem de avaliar modulo que importa React e Remotion. O preco e
 * exigir literal no que e lido: SCENES, CONTENT_H e SFX_EVENTS sao literais
 * por regra do squad, com o motivo escrito no proprio componente
 * ("literal porque o gate le o numero, nao a expressao").
 *
 * Estas funcoes nasceram dentro de scripts/storyboard.js e foram extraidas
 * em 04/09/2026 para o mapa de som (scripts/lib/sfx-mapa.js) usar exatamente
 * a mesma leitura. Duas leituras diferentes do mesmo arquivo e como duas
 * fontes da verdade: uma hora divergem.
 *
 * MUDANCA NA EXTRACAO: a regex do SCENE_COMPONENTS passou a aceitar item sem
 * virgula final. Antes o ultimo componente do mapa sumia em silencio, e
 * silencio em gate e o pior defeito possivel.
 */

const fs = require("fs");
const path = require("path");

/* ------------------------------------------------------------------ *
 * blocos literais
 * ------------------------------------------------------------------ */

/** Bloco de um array literal exportado, do "[" ate o "]" que o fecha. */
function blocoDeArray(src, nomeConst) {
  // o "[" procurado e o que vem depois do "=", nunca o do tipo
  // (`export const SCENES: SceneDef[] = [`).
  const decl = new RegExp(`export const ${nomeConst}\\s*(?::[^=]+)?=\\s*\\[`).exec(src);
  if (!decl) return null;
  const abre = decl.index + decl[0].length - 1;
  let nivel = 0;
  for (let i = abre; i < src.length; i++) {
    if (src[i] === "[") nivel++;
    else if (src[i] === "]") {
      nivel--;
      if (nivel === 0) return src.slice(abre + 1, i);
    }
  }
  return null;
}

/** Bloco de um objeto literal exportado, do "{" ate o "}" que o fecha. */
function blocoDeObjeto(src, nomeConst) {
  const inicio = src.indexOf(`export const ${nomeConst}`);
  if (inicio === -1) return null;
  const abre = src.indexOf("{", inicio);
  if (abre === -1) return null;
  let nivel = 0;
  for (let i = abre; i < src.length; i++) {
    if (src[i] === "{") nivel++;
    else if (src[i] === "}") {
      nivel--;
      if (nivel === 0) return src.slice(abre + 1, i);
    }
  }
  return null;
}

function numeroDaConst(src, nome) {
  const m = new RegExp(`export const ${nome}\\s*(?::[^=]+)?=\\s*([\\d.]+)\\s*;`).exec(src);
  return m ? parseFloat(m[1]) : null;
}

/* ------------------------------------------------------------------ *
 * tokens.ts
 * ------------------------------------------------------------------ */

const RE_CENA =
  /\{\s*key:\s*"([^"]+)"\s*,\s*start:\s*([\d.]+)\s*,\s*end:\s*([\d.]+)\s*,\s*stage:\s*"([^"]+)"(?:\s*,\s*caption:\s*"([^"]+)")?/;

/**
 * Le SCENES junto com o comentario que vem IMEDIATAMENTE acima de cada
 * entrada. Linha em branco corta o comentario: assim o cabecalho geral do
 * array (separado por linha vazia) nao vira o motivo da primeira cena.
 *
 * `onErro` deixa o chamador decidir o que fazer: o storyboard encerra o
 * processo, o lint acumula o problema e segue.
 */
function lerCenas(tokensSrc, tokensPath, onErro) {
  const falhar = onErro || ((msg) => { throw new Error(msg); });
  const bloco = blocoDeArray(tokensSrc, "SCENES");
  if (bloco === null) return falhar(`nao achei o array SCENES em ${tokensPath}`) || [];

  const cenas = [];
  let comentario = [];
  for (const linhaBruta of bloco.split("\n")) {
    const linha = linhaBruta.trim();
    if (linha === "") {
      comentario = [];
      continue;
    }
    if (linha.startsWith("//")) {
      comentario.push(linha.replace(/^\/\/\s?/, "").trimEnd());
      continue;
    }
    if (linha.startsWith("/*") || linha.startsWith("*")) {
      comentario.push(linha.replace(/^\/\*+\s?|^\*+\/?\s?|\*\/$/g, "").trimEnd());
      continue;
    }
    const m = RE_CENA.exec(linha);
    if (m) {
      cenas.push({
        key: m[1],
        start: parseFloat(m[2]),
        end: parseFloat(m[3]),
        stage: m[4],
        caption: m[5] || null,
        porque: comentario.join("\n").trim(),
      });
      comentario = [];
      continue;
    }
    comentario = [];
  }
  if (!cenas.length) return falhar(`nenhuma cena reconhecida em ${tokensPath} (SCENES esta literal?)`) || [];
  return cenas;
}

function lerStageSafe(tokensSrc) {
  const bloco = blocoDeObjeto(tokensSrc, "STAGE_SAFE");
  const mapa = {};
  if (!bloco) return mapa;
  const re = /(?:^|\n)\s*(?:"([^"]+)"|([A-Za-z0-9_$]+))\s*:\s*(\d+)/g;
  let m;
  while ((m = re.exec(bloco)) !== null) mapa[m[1] || m[2]] = parseInt(m[3], 10);
  return mapa;
}

function lerTotalFrames(tokensSrc) {
  const literal = numeroDaConst(tokensSrc, "TOTAL_FRAMES");
  if (literal !== null) return literal;
  const hook = numeroDaConst(tokensSrc, "HOOK_FRAMES");
  const video = numeroDaConst(tokensSrc, "VIDEO_FRAMES");
  if (hook !== null && video !== null) return hook + video;
  return null;
}

/* ------------------------------------------------------------------ *
 * MotionStage.tsx e os componentes
 * ------------------------------------------------------------------ */

/**
 * mapa cena -> nome do componente, lido do SCENE_COMPONENTS.
 * A virgula final e OPCIONAL: sem isso o ultimo item do mapa sumia.
 */
function lerMapaDeCenas(stageSrc) {
  const inicio = stageSrc.indexOf("SCENE_COMPONENTS");
  if (inicio === -1) return {};
  const abre = stageSrc.indexOf("{", inicio);
  let nivel = 0;
  let bloco = "";
  for (let i = abre; i < stageSrc.length; i++) {
    if (stageSrc[i] === "{") nivel++;
    else if (stageSrc[i] === "}") {
      nivel--;
      if (nivel === 0) {
        bloco = stageSrc.slice(abre + 1, i);
        break;
      }
    }
  }
  const mapa = {};
  const re = /(?:^|\n)\s*(?:"([^"]+)"|([A-Za-z0-9_$-]+))\s*:\s*([A-Za-z0-9_$]+)\s*(?:,|$)/gm;
  let m;
  while ((m = re.exec(bloco)) !== null) mapa[m[1] || m[2]] = m[3];
  return mapa;
}

/** nome importado -> caminho do arquivo, lido dos imports do MotionStage. */
function lerImports(stageSrc, componentsDir) {
  const mapa = {};
  const re = /import\s+\{([^}]+)\}\s+from\s+["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(stageSrc)) !== null) {
    const alvo = m[2];
    if (!alvo.startsWith(".")) continue;
    const base = path.resolve(componentsDir, alvo);
    const candidatos = [base + ".tsx", base + ".ts", path.join(base, "index.tsx")];
    const arquivo = candidatos.find((c) => fs.existsSync(c));
    if (!arquivo) continue;
    for (const bruto of m[1].split(",")) {
      const nome = bruto.trim().split(/\s+as\s+/).pop().trim();
      if (nome) mapa[nome] = arquivo;
    }
  }
  return mapa;
}

/**
 * Valor de `export const CONTENT_H`. Aceita numero direto e tambem apelido
 * de uma constante do proprio arquivo (`export const CONTENT_H = PANEL_H;`,
 * padrao do TelegramChat), resolvendo um nivel.
 */
function lerContentH(arquivo) {
  if (!arquivo || !fs.existsSync(arquivo)) return null;
  const src = fs.readFileSync(arquivo, "utf8");
  const m = /export const CONTENT_H\s*(?::[^=]+)?=\s*([A-Za-z0-9_$.]+)\s*;/.exec(src);
  if (!m) return null;
  if (/^\d+(\.\d+)?$/.test(m[1])) return parseInt(m[1], 10);
  const alias = new RegExp(`(?:^|\\n)\\s*(?:export\\s+)?const ${m[1]}\\s*(?::[^=]+)?=\\s*(\\d+)`).exec(src);
  return alias ? parseInt(alias[1], 10) : null;
}

module.exports = {
  RE_CENA,
  blocoDeArray,
  blocoDeObjeto,
  numeroDaConst,
  lerCenas,
  lerStageSafe,
  lerTotalFrames,
  lerMapaDeCenas,
  lerImports,
  lerContentH,
};
