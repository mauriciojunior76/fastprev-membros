#!/usr/bin/env node
/**
 * load-choreography.js — le e avalia um choreography.ts SEM montar o
 * bundle do Remotion (reforma do motion design system, 19/08/2026).
 *
 * choreography.ts (por regra de core/choreo.ts) so pode ter dados literais
 * e imports de core/choreo (defineSpec, alternateDir, childDelay, tipos).
 * Isso permite avaliar o arquivo com esbuild puro (transpila TS -> CJS) e
 * executar num contexto vm isolado, fornecendo um stub de core/choreo em
 * vez de resolver o import de verdade — muito mais rapido que bundlar o
 * projeto inteiro so pra ler coreografia, e funciona sem depender de nada
 * do Remotion estar disponivel.
 *
 * Usado por scripts/choreo-lint.js e scripts/pre-render-validate.js.
 */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

// esbuild vem junto do Remotion neste projeto, mas numa copia recem
// instalada (antes do npm install) ele nao existe ainda. Sem este cuidado o
// script morria com um erro tecnico feio de modulo nao encontrado, em vez de
// dizer o que fazer. Achado ao testar o pacote distribuido em 26/08/2026.
let esbuild;
try {
  esbuild = require("esbuild");
} catch (e) {
  console.error(
    "\nEsta conferencia precisa das dependencias do projeto instaladas.\n" +
      "Rode uma vez, dentro da pasta do squad:\n\n" +
      "  npm install\n\n" +
      "Depois rode o comando de novo.\n"
  );
  process.exit(1);
}

// import de VALOR de react/remotion (nao "import type") = proibido num
// choreography.ts. A regra existe pra este loader continuar funcionando
// sem montar o bundle Remotion inteiro.
const FORBIDDEN_IMPORT_RE = /import\s+(?!type\b)[^;]*from\s+["'](react|remotion)["']/;

/**
 * Stub das funcoes PURAS de core/choreo.ts (sem tipos, que nao existem em
 * runtime). Mantido em sincronia manual com src/core/choreo.ts — sao 3
 * funcoes triviais e estaveis (definidas na fase 1 da reforma), baixo
 * risco de desatualizar; se crescerem em complexidade, mover para um
 * arquivo .js compartilhado em vez de duplicar.
 */
const CHOREO_STUB = {
  defineSpec: (s) => s,
  alternateDir: (i) => ["bottom", "left", "top", "right"][((i % 4) + 4) % 4],
  childDelay: (el, childIndex) => (el.entry.delayF ?? 0) + (el.children?.staggerF ?? 0) * childIndex,
};

/** caminho do choreography.ts de uma composition, ou null se nao existe. */
function findChoreographyFile(compDir) {
  const p = path.join(compDir, "choreography.ts");
  return fs.existsSync(p) ? p : null;
}

/** avalia choreography.ts e devolve o SceneSpec exportado. */
function loadSpec(choreographyPath) {
  const src = fs.readFileSync(choreographyPath, "utf8");

  const withoutComments = src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "");
  if (FORBIDDEN_IMPORT_RE.test(withoutComments)) {
    throw new Error(
      `${path.basename(choreographyPath)}: nao pode importar "react" nem "remotion" ` +
        `como valor (so "import type" e permitido). Coreografia EXECUTAVEL ` +
        `(applyChoreo) mora em core/choreo-runtime.ts, importada de dentro da ` +
        `composition — nunca daqui.`
    );
  }

  const { code } = esbuild.transformSync(src, { loader: "ts", format: "cjs" });

  const sandboxModule = { exports: {} };
  const sandboxRequire = (id) => {
    if (id.endsWith("/choreo") || id.endsWith("/choreo.ts") || id === "./choreo") {
      return CHOREO_STUB;
    }
    throw new Error(
      `${path.basename(choreographyPath)}: tentou importar "${id}". So e permitido ` +
        `importar de core/choreo (defineSpec, alternateDir, childDelay, tipos).`
    );
  };

  const context = vm.createContext({
    module: sandboxModule,
    exports: sandboxModule.exports,
    require: sandboxRequire,
    __filename: choreographyPath,
    __dirname: path.dirname(choreographyPath),
  });

  vm.runInContext(code, context, { filename: choreographyPath });

  const exported = sandboxModule.exports;
  const spec =
    exported.default ||
    exported.spec ||
    Object.values(exported).find((v) => v && Array.isArray(v.scenes));

  if (!spec || !Array.isArray(spec.scenes)) {
    throw new Error(
      `${path.basename(choreographyPath)}: nao exportou um SceneSpec valido. ` +
        `Esperado "export default defineSpec({...})" ou "export const spec = defineSpec({...})".`
    );
  }
  return spec;
}

module.exports = { findChoreographyFile, loadSpec };
