/**
 * ds-root.js: onde estao as coisas.
 *
 * Este squad e o cerebro (design system, planos, auditorias). O MOTOR de video
 * (Remotion, legenda, render, validadores, som) vive em squads/motion e e
 * usado por caminho, nunca copiado. Qualquer script daqui que precise do motor
 * pega o caminho por este arquivo, nunca por caminho literal espalhado.
 */
const path = require("path");
const fs = require("fs");

const SQUAD = path.resolve(__dirname, "..", "..");            // squads/motion-apple
const REPO = path.resolve(SQUAD, "..", "..");                  // raiz do aios
const ENGINE = path.resolve(SQUAD, "..", "zeus-motion");       // squads/motion (motor)

const DS = path.join(SQUAD, "design-system");
const CACHE_DIR = path.join(SQUAD, ".cache");

const paths = {
  repo: REPO,
  squad: SQUAD,
  engine: ENGINE,
  ds: DS,
  cacheDir: CACHE_DIR,
  cacheFile: path.join(CACHE_DIR, "ds-index.json"),

  // design system (indices que o modelo consulta)
  dsRouter: path.join(DS, "design-router.json"),
  dsGuide: path.join(DS, "DESIGN-SYSTEM-REELS-APPLE-v2.md"),
  dsPanel: path.join(DS, "Zeus Reels Design System.dc.html"),
  dsIndex: path.join(DS, "INDEX.md"),
  dsOverrides: path.join(DS, "local-overrides.json"),
  dsTokens: path.join(DS, "tokens", "reels-tokens.css"),
  dsIconsMap: path.join(DS, "icons-map.json"),
  dsSfxMap: path.join(DS, "sfx-map.json"),
  dsNumbers: path.join(DS, "numbers-spec.json"),
  dsMoldes: path.join(DS, "moldes-index.json"),
  dsAtlas: path.join(DS, "semantic-atlas.md"),
  dsExamples: path.join(DS, "decision-examples.md"),
  dsTests: path.join(DS, "retrieval-tests.json"),
  reg: (nome) => path.join(DS, "registry", `${nome}-registry.json`),

  // motor
  compositions: path.join(ENGINE, "src", "compositions"),
  engineScripts: path.join(ENGINE, "scripts"),
  engineLib: path.join(ENGINE, "scripts", "lib"),
  sfxCatalogo: path.join(ENGINE, "public", "_sfx", "catalogo.json"),
  iconsMapCodigo: path.join(ENGINE, "public", "_icones", "icons-map.json"),
  iconsLogCodigo: path.join(ENGINE, "public", "_icones", "icons-log.json"),
  licoes: path.join(ENGINE, "aprendizado", "licoes.json"),
  pecasAprovadas: path.join(ENGINE, "aprendizado", "pecas-aprovadas.json"),
  outQa: path.join(ENGINE, "output", "_qa"),
};

/** pasta da composition no motor (onde ficam data/, plan/, components/) */
function compDir(comp) {
  return path.join(paths.compositions, comp);
}

/** pasta plan/ da composition, criada sob demanda */
function planDir(comp, criar = false) {
  const p = path.join(compDir(comp), "plan");
  if (criar && !fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
  return p;
}

/** modulo do motor, carregado por caminho (nunca copiado pra ca) */
function motor(rel) {
  return require(path.join(paths.engineLib, rel));
}

function existe(p) {
  return fs.existsSync(p);
}

module.exports = { paths, compDir, planDir, motor, existe };
