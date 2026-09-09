#!/usr/bin/env node
/**
 * get-compositions.js — FONTE ÚNICA de metadados de composition (M0)
 *
 * Avalia o Root.tsx REAL via bundle do Remotion e devolve os metadados de TODAS
 * as compositions registradas: { id, width, height, fps, durationInFrames }.
 *
 * Substitui os mapas manuais de render.js e pre-render-validate.js, que
 * desatualizavam em silêncio (bug ExemploCaptura 810 vs 1357 real).
 *
 * Uso como módulo:
 *   const { getComps, getComp } = require("./lib/get-compositions");
 *   const comps = await getComps();              // array
 *   const exemplo = await getComp("ExemploCaptura"); // objeto ou null
 *
 * Uso como CLI:
 *   node scripts/lib/get-compositions.js            # lista todas (tabela)
 *   node scripts/lib/get-compositions.js ExemploCaptura   # uma comp (JSON)
 *   node scripts/lib/get-compositions.js --json     # todas em JSON
 *   node scripts/lib/get-compositions.js --refresh  # ignora cache e reavalia
 *
 * Cache: scripts/lib/.compositions-cache.json, invalidado por hash de src/.
 */

const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const ROOT = path.resolve(__dirname, "..", ".."); // squads/motion
const ENTRY = path.join(ROOT, "src", "index.ts");
const SRC_DIR = path.join(ROOT, "src");
const CACHE_FILE = path.join(__dirname, ".compositions-cache.json");

/** Hash determinístico do conteúdo de src/ (nomes + mtime + tamanho). */
/**
 * Impressao digital do codigo, para amarrar a aprovacao visual ao que foi
 * renderizado.
 *
 * ESCOPO POR PECA (06/09/2026): com `composition` informada, a conta cobre
 * a pasta daquela peca mais o nucleo compartilhado (`core`, `modules`).
 * Sem ela, cobre o `src/` inteiro, como antes.
 *
 * Motivo: com o escopo global, QUALQUER arquivo salvo por outra sessao
 * invalidava a aprovacao desta peca, e o render final ficava impossivel
 * enquanto alguem trabalhasse em outra composition. Aconteceu em serie hoje.
 * O escopo por peca continua garantindo o que a trava existe para garantir
 * (o que foi aprovado e o que sera renderizado), sem depender de trabalho
 * alheio.
 */
function hashSrc(composition) {
  const h = crypto.createHash("sha1");
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      if (entry.name === "node_modules" || entry.name === "_versions" || entry.name === "_research") continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (/\.(tsx?|jsx?|json)$/.test(entry.name)) {
        const st = fs.statSync(full);
        h.update(full + ":" + st.size + ":" + Math.round(st.mtimeMs));
      }
    }
  };
  if (composition) {
    const pasta = path.join(SRC_DIR, "compositions", composition);
    if (fs.existsSync(pasta)) {
      walk(pasta);
      for (const comum of ["core", "modules"]) {
        const c = path.join(SRC_DIR, comum);
        if (fs.existsSync(c)) walk(c);
      }
      return h.digest("hex");
    }
  }
  walk(SRC_DIR);
  return h.digest("hex");
}

function readCache(srcHash) {
  try {
    const cache = JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));
    if (cache.srcHash === srcHash && Array.isArray(cache.comps)) return cache.comps;
  } catch {}
  return null;
}

function writeCache(srcHash, comps) {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify({ srcHash, comps, _updated: new Date().toISOString() }, null, 2));
  } catch {}
}

/**
 * Entrada isolada por composition, quando existe.
 *
 * O bundle padrao compila as 47 compositions do Root, entao uma peca em
 * edicao por OUTRA sessao derruba a validacao de qualquer outra. Quando
 * existe `src/_root-<slug>.tsx`, ele vira a entrada e o bundle passa a
 * depender so daquela peca. Criado em 06/09/2026, depois de tres bloqueios
 * seguidos em poucos minutos.
 */
function entryIsolado(nome) {
  if (!nome) return null;
  const slug = nome.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  const p = path.join(ROOT, "src", `_root-${slug}.tsx`);
  return fs.existsSync(p) ? p : null;
}

/** Avalia o Root.tsx via bundle e retorna os metadados de todas as comps. */
async function evaluate(nomeParaIsolar) {
  const { bundle } = require("@remotion/bundler");
  const { getCompositions } = require("@remotion/renderer");

  const serveUrl = await bundle({
    entryPoint: entryIsolado(nomeParaIsolar) || ENTRY,
    // sem webpackOverride: usa a config padrão do projeto
  });

  const comps = await getCompositions(serveUrl);
  return comps.map((c) => ({
    id: c.id,
    width: c.width,
    height: c.height,
    fps: c.fps,
    durationInFrames: c.durationInFrames,
  }));
}

/** Retorna todas as comps (usa cache salvo se src/ não mudou). */
async function getComps({ refresh = false, isolar = null } = {}) {
  const srcHash = hashSrc();
  if (!refresh) {
    const cached = readCache(srcHash);
    if (cached) return cached;
  }
  const comps = await evaluate(isolar);
  // O cache guarda o resultado do bundle COMPLETO. Com entrada isolada a
  // lista tem uma composition so, entao nao serve de cache para as outras.
  if (!isolar) writeCache(srcHash, comps);
  return comps;
}

/** Retorna uma comp por id, ou null. */
async function getComp(id, opts = {}) {
  const comps = await getComps({ isolar: id, ...opts });
  return comps.find((c) => c.id === id) || null;
}

module.exports = { getComps, getComp, hashSrc };

// ─── CLI ─────────────────────────────────────────────────────────────────────
if (require.main === module) {
  (async () => {
    const args = process.argv.slice(2);
    const refresh = args.includes("--refresh");
    const asJson = args.includes("--json");
    const idArg = args.find((a) => !a.startsWith("--"));

    try {
      if (idArg) {
        const comp = await getComp(idArg, { refresh });
        if (!comp) {
          console.error(`Composition "${idArg}" nao registrada no Root.tsx.`);
          const all = await getComps({ refresh });
          console.error(`Disponiveis (${all.length}): ${all.map((c) => c.id).join(", ")}`);
          process.exit(1);
        }
        console.log(JSON.stringify(comp, null, 2));
        return;
      }

      const comps = await getComps({ refresh });
      if (asJson) {
        console.log(JSON.stringify(comps, null, 2));
        return;
      }
      console.log(`\n${comps.length} compositions registradas:\n`);
      console.log("  " + "ID".padEnd(28) + "WxH".padEnd(14) + "fps".padEnd(6) + "frames".padEnd(9) + "duracao");
      console.log("  " + "-".repeat(70));
      for (const c of comps) {
        const dur = (c.durationInFrames / c.fps).toFixed(1) + "s";
        console.log(
          "  " +
            c.id.padEnd(28) +
            `${c.width}x${c.height}`.padEnd(14) +
            String(c.fps).padEnd(6) +
            String(c.durationInFrames).padEnd(9) +
            dur
        );
      }
      console.log("");
    } catch (e) {
      console.error("Erro ao avaliar compositions:", e.message);
      process.exit(1);
    }
  })();
}
