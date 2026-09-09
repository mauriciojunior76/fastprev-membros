#!/usr/bin/env node
/**
 * registrar-icone.js — grava um uso de ícone no log, com o SEGUNDO REAL da
 * timeline da composition (nunca aproximado: o log recebido do Claude
 * Design trazia segundos chutados e uma nota própria pedindo conferência).
 *
 * Uso:
 *   node scripts/registrar-icone.js --video PauloRuizReels --molde trio-atributos \
 *     --icone award --conceito "resultados" --cena destaques [--assinatura]
 *
 * O segundo vem de `tokens.ts` SCENES pela key da cena (--cena), não é
 * digitado à mão: assim o log nunca destoa do código de novo.
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const MOTION = path.resolve(__dirname, "..");
const LOG_PATH = path.join(MOTION, "public/_icones/icons-log.json");

function arg(nome) {
  const i = process.argv.indexOf(`--${nome}`);
  return i >= 0 ? process.argv[i + 1] : null;
}

function segundoDaCena(video, cenaKey) {
  const tokensPath = path.join(MOTION, "src/compositions", video, "tokens.ts");
  if (!fs.existsSync(tokensPath)) return null;
  const src = fs.readFileSync(tokensPath, "utf8");
  const re = new RegExp(`key:\\s*"${cenaKey}"\\s*,\\s*start:\\s*([\\d.]+)`);
  const m = re.exec(src);
  return m ? Math.round(parseFloat(m[1])) : null;
}

function main() {
  const video = arg("video");
  const molde = arg("molde");
  const icone = arg("icone");
  const conceito = arg("conceito");
  const cena = arg("cena");
  const assinatura = process.argv.includes("--assinatura");

  if (!video || !molde || !icone || !conceito) {
    console.error("Uso: --video <Composition> --molde <id> --icone <nome> --conceito \"...\" [--cena <key>] [--assinatura]");
    process.exit(1);
  }

  const segundo = cena ? segundoDaCena(video, cena) : null;
  if (cena && segundo === null) {
    console.error(`Cena "${cena}" não achada em ${video}/tokens.ts — não vou gravar segundo chutado.`);
    process.exit(1);
  }

  const log = fs.existsSync(LOG_PATH) ? JSON.parse(fs.readFileSync(LOG_PATH, "utf8")) : { _doc: "Registro de icones por video.", entries: [] };

  const jaTem = log.entries.some((e) => e.video === video && e.icone === icone && !assinatura);
  if (jaTem) {
    console.error(`"${icone}" já está registrado em ${video} sem assinatura. Repetição exige --assinatura.`);
    process.exit(1);
  }

  log.entries.push({
    video,
    segundo: segundo ?? undefined,
    molde,
    icone,
    conceito,
    assinatura,
  });

  try {
    execFileSync("node", [path.join(MOTION, "..", "..", "scripts/fullsafe.js"), "backup",
      path.relative(path.join(MOTION, "..", ".."), LOG_PATH).split(path.sep).join("/")],
      { cwd: path.join(MOTION, "..", ".."), stdio: "pipe" });
  } catch (e) { /* git ainda guarda o arquivo */ }

  fs.writeFileSync(LOG_PATH, JSON.stringify(log, null, 2) + "\n", "utf8");
  console.log(`Registrado: ${icone} → ${conceito} (${video}${segundo !== null ? `, ${segundo}s` : ""})`);
}

main();
