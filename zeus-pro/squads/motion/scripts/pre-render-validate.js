#!/usr/bin/env node
/**
 * pre-render-validate.js v3 — spec de coreografia OBRIGATORIO pra
 * composicao nova (reforma do motion design system, 19/08/2026)
 *
 * O QUE MUDOU DA v2: antes, "sem config de cena declarada" virava
 * [INFO] e a composicao aprovava com 0 erros e 0 avisos SEM checar nada
 * de composicao/coreografia — foi assim que o ZeusTrafegoReels passou no
 * validador com um layout monotono, duplo movimento e rotacao linear (os
 * 3 defeitos reais que o o dono do canal apontou). A partir daqui:
 *
 *   - composicao na allowlist "noSpec" (scripts/lib/legacy-allowlist.json,
 *     lista CONGELADA das composicoes que ja existiam antes desta reforma):
 *     continua exatamente como era (INFO, sem bloquear).
 *   - composicao FORA da allowlist sem choreography.ts: ERRO, exit 1. Como
 *     render.js ja aborta em erro, composicao nova sem spec nao renderiza.
 *   - composicao COM choreography.ts (de qualquer lista): o spec e lido
 *     (scripts/lib/load-choreography.js) e scripts/choreo-lint.js roda os
 *     checks de composicao (direcao repetida, stagger ausente, delay
 *     hierarquico invertido, layout monotono, rotacao linear, duplo
 *     movimento, componente aposentado). O spec tambem passa a alimentar
 *     os checks de EXIT_F/overlap/sync, substituindo o SCENE_CONFIG
 *     hardcoded pra essa composicao (fonte unica: o proprio choreography.ts,
 *     nao um mapa separado que pode desatualizar).
 *
 * Hierarquia (heranca da v2, intacta):
 *   1. totalFrames e metadados: SEMPRE do bundle real (getCompositions).
 *   2. Config de cena (EXIT_F, overlap, gap): do choreography.ts se
 *      existir; senao do SCENE_CONFIG legado, so se ainda bate com o
 *      bundle (senao AVISO alto e pula os checks de cena, sem bloquear
 *      comp congelada).
 *
 * Uso:
 *   node scripts/pre-render-validate.js <CompositionName>
 */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { getComp } = require("./lib/get-compositions");
const { findChoreographyFile, loadSpec } = require("./lib/load-choreography");
const { resolveCompDir } = require("./lib/resolve-comp-dir");

const COMPOSITION = process.argv[2];
if (!COMPOSITION) {
  console.error("Uso: node scripts/pre-render-validate.js <CompositionName>");
  process.exit(1);
}

const COMPOSITIONS_DIR = path.join(__dirname, "..", "src", "compositions");
const ALLOWLIST = JSON.parse(fs.readFileSync(path.join(__dirname, "lib", "legacy-allowlist.json"), "utf8"));

// ─── CONFIG DE CENA LEGADO (opt-in, so pras comps ja mapeadas, herdado da v2) ─
// Estes numeros sao HISTORICOS e podem estar desatualizados. So e consultado
// quando a composicao NAO tem choreography.ts (o spec, quando existe, manda).

const SCENE_CONFIG = {
  AgenteArquiteto: {
    scenes: [
      { name: "SceneChatGPT", from: 0, dur: 120, EXIT_F: 100 },
      { name: "Scene1", from: 110, dur: 182, EXIT_F: 161 },
      { name: "Scene2", from: 282, dur: 75, EXIT_F: 45 },
      { name: "Scene3", from: 350, dur: 125, EXIT_F: 99 },
      { name: "Scene4", from: 465, dur: 145, EXIT_F: 119 },
      { name: "Scene5", from: 600, dur: 255, EXIT_F: 229 },
      { name: "Scene6", from: 845, dur: 240, EXIT_F: 210 },
      { name: "Scene7", from: 1075, dur: 200, EXIT_F: 168 },
      { name: "Scene8", from: 1265, dur: 122, EXIT_F: null },
    ],
  },
  ExemploCaptura: {
    scenes: [
      { name: "Scene1", from: 0, dur: 90, EXIT_F: 65 },
      { name: "Scene2", from: 83, dur: 87, EXIT_F: 62 },
      { name: "Scene3", from: 163, dur: 87, EXIT_F: 47 },
      { name: "Scene4", from: 243, dur: 87, EXIT_F: 67 },
      { name: "Scene5", from: 323, dur: 87, EXIT_F: 67 },
      { name: "Scene6", from: 403, dur: 87, EXIT_F: 67 },
      { name: "Scene7", from: 483, dur: 87, EXIT_F: 67 },
      { name: "Scene8", from: 563, dur: 87, EXIT_F: 62 },
      { name: "Scene9", from: 643, dur: 87, EXIT_F: 67 },
      { name: "Scene10", from: 723, dur: 87, EXIT_F: null },
    ],
  },
  MotionMassofy: {
    timingFile: path.join(__dirname, "../src/compositions/MotionMassofy/data/narration.json"),
    scenes: [
      { name: "Scene1", from: 0, dur: 180, EXIT_F: 158 },
      { name: "Scene2", from: 164, dur: 145, EXIT_F: 123 },
      { name: "Scene3", from: 293, dur: 157, EXIT_F: 135 },
      { name: "Scene4", from: 434, dur: 154, EXIT_F: 132 },
      { name: "Scene5", from: 572, dur: 202, EXIT_F: 180 },
      { name: "Scene6", from: 758, dur: 117, EXIT_F: 95 },
      { name: "Scene7", from: 859, dur: 225, EXIT_F: 203 },
      { name: "Scene8", from: 1068, dur: 200, EXIT_F: null },
    ],
  },
};

const MIN_OVERLAP = 5;
const MAX_OVERLAP = 20;
const EXIT_ANIM_DUR = 18;
const EXIT_SAFE_MARGIN = 22;

let errors = 0;
let warnings = 0;
const err = (m) => { console.error(`  [ERRO]    ${m}`); errors++; };
const warn = (m) => { console.warn(`  [AVISO]   ${m}`); warnings++; };
const ok = (m) => console.log(`  [OK]      ${m}`);
const info = (m) => console.log(`  [INFO]    ${m}`);

/**
 * Nomes de marca conhecidos. Lista derivada de templates/design-tokens/brands/*.json
 * (a fonte unica), mais os 2 nomes que sempre existem no BRAND_REGISTRY do loader.ts.
 * "cliente:*" e sempre aceito: e o namespace reservado pra marca de cliente externo
 * (protecoes-intocaveis.md), que pode nao ter JSON no design-core ainda.
 */
function marcasConhecidas() {
  const dir = path.join(__dirname, "..", "..", "..", "design-core", "tokens", "brands");
  const nomes = new Set(["universal-default"]);
  try {
    for (const f of fs.readdirSync(dir)) {
      if (f.endsWith(".json")) nomes.add(f.replace(/\.json$/, ""));
    }
  } catch (e) { /* pasta ausente: segue so com os 2 nomes fixos */ }
  return nomes;
}

/**
 * Varre o codigo da composition procurando loadBrand("algumId") e reprova se o id
 * nao existe em lugar nenhum. Nao e AST, e regex propositalmente simples: o objetivo
 * e pegar o erro de digitacao mais comum (marca inexistente), nao validar sintaxe.
 */
function checkBrandReference(compDir) {
  let arquivos = [];
  try {
    arquivos = fs.readdirSync(compDir).filter((f) => f.endsWith(".ts") || f.endsWith(".tsx"));
  } catch (e) {
    info("Sem pasta de composition pra checar marca (ok pra composition so em Root.tsx).");
    return;
  }
  const conhecidas = marcasConhecidas();
  let achou = false;
  for (const nome of arquivos) {
    let src;
    try { src = fs.readFileSync(path.join(compDir, nome), "utf8"); } catch (e) { continue; }
    for (const m of src.matchAll(/loadBrand\(\s*["'`]([a-zA-Z0-9:_-]+)["'`]\s*\)/g)) {
      achou = true;
      const id = m[1];
      if (id.startsWith("cliente:") || conhecidas.has(id)) {
        ok(`Marca "${id}" (em ${nome}) existe no registry.`);
      } else {
        err(
          `Marca "${id}" (em ${nome}) NAO existe no registry. Marcas conhecidas: ` +
            `${[...conhecidas].join(", ")}, ou "cliente:{slug}". Corrigir o nome, ou ` +
            `criar templates/design-tokens/brands/${id}.json e rodar ` +
            `a ferramenta de sincronizacao de marca (nao incluida: o arquivo ja vem pronto).`
        );
      }
    }
  }
  if (!achou) info("Composicao nao chama loadBrand() diretamente (ok pra legado com cor hardcoded).");
}

/** converte o SceneSpec (choreo.ts) pro mesmo formato { scenes, timingFile? }
 * que os checks 3/4/5 (herdados da v2) ja sabem consumir, sem duplicar logica. */
function specToLegacyShape(spec) {
  return {
    scenes: spec.scenes.map((s) => ({
      name: s.name,
      from: s.from,
      dur: s.dur,
      EXIT_F: s.exitF,
    })),
  };
}

async function main() {
  console.log(`\n========================================`);
  console.log(` PRE-RENDER VALIDATE v3 — ${COMPOSITION}`);
  console.log(`========================================\n`);

  // ── 1. Verdade do bundle ───────────────────────────────────────────────────
  console.log("1. Lendo metadados reais do bundle...");
  let meta;
  try {
    meta = await getComp(COMPOSITION);
  } catch (e) {
    err(`Falha ao avaliar o bundle: ${e.message}`);
    finish();
    return;
  }
  if (!meta) {
    err(`Composition "${COMPOSITION}" nao registrada no Root.tsx.`);
    finish();
    return;
  }
  const { durationInFrames: bundleFrames, fps, width, height } = meta;
  ok(`Bundle: ${bundleFrames}f = ${(bundleFrames / fps).toFixed(2)}s @ ${fps}fps, ${width}x${height}`);

  const compDir = resolveCompDir(COMPOSITIONS_DIR, COMPOSITION);

  // ── 1b. Marca referenciada existe? (Fase 5 da auditoria audiovisual, 27/08/2026) ──
  // loadBrand() em runtime cai no neutro profissional sem quebrar o render; isso e
  // correto (marca errada nunca pode virar crash), mas significa que um erro de
  // digitacao no nome da marca so aparecia como aviso perdido no meio do log do
  // render, depois de gastar o tempo inteiro renderizando. Aqui reprova ANTES.
  console.log("\n1b. Verificando marca referenciada...");
  checkBrandReference(compDir);

  // ── 2. Spec de coreografia: existe? e obrigatorio pra quem nao esta legado? ─
  console.log("\n2. Checando spec de coreografia (choreography.ts)...");
  const choreographyPath = findChoreographyFile(compDir);
  const isLegacyNoSpec = ALLOWLIST.noSpec.includes(COMPOSITION);

  if (!choreographyPath && !isLegacyNoSpec) {
    err(
      `Composicao "${COMPOSITION}" NAO esta na allowlist de legado ` +
        `(scripts/lib/legacy-allowlist.json) e nao tem choreography.ts em ` +
        `${path.relative(process.cwd(), compDir)}. Toda composicao NOVA precisa ` +
        `declarar o spec de coreografia antes de renderizar (defineSpec de core/choreo). ` +
        `Ver docs/zeus-motion-design-system.md.`
    );
    finish();
    return;
  }

  let spec = null;
  if (choreographyPath) {
    try {
      spec = loadSpec(choreographyPath);
      ok(`choreography.ts lido: ${spec.scenes.length} cena(s) declaradas.`);
    } catch (e) {
      err(`Falha ao ler choreography.ts: ${e.message}`);
      finish();
      return;
    }

    console.log("\n2b. Rodando choreo-lint (checks de composicao)...");
    try {
      /**
       * O stdout e lido TAMBEM no caminho de sucesso (06/09/2026).
       *
       * Antes, quando o lint saia com codigo 0, a saida JSON era jogada fora
       * e este validador imprimia "nenhum problema de composicao". Todo
       * achado de nivel `warn` evaporava sem ninguem ver: transbordo de
       * palco, tempo de leitura, ritmo de cena, densidade de som e, o pior,
       * o aviso de que o proprio gate do design system nao tinha rodado.
       */
      const saidaLint = execFileSync("node", [path.join(__dirname, "choreo-lint.js"), COMPOSITION, "--json"], {
        cwd: __dirname,
        stdio: ["ignore", "pipe", "pipe"],
      });
      let achadosLint = [];
      try { achadosLint = JSON.parse((saidaLint || "").toString()).findings || []; } catch { /* saida nao-JSON */ }
      const avisosLint = achadosLint.filter((f) => f.level !== "error");
      for (const f of avisosLint) warn(`choreo-lint (${f.check}): ${f.message}`);
      if (!avisosLint.length) ok("choreo-lint: nenhum problema de composicao.");
      else ok(`choreo-lint: sem erros, ${avisosLint.length} aviso(s) acima.`);
    } catch (e) {
      const out = (e.stdout || "").toString();
      let findings = [];
      try { findings = JSON.parse(out).findings || []; } catch { /* saida nao-JSON, ignora parse */ }
      if (findings.length) {
        for (const f of findings) {
          if (f.level === "error") err(`choreo-lint (${f.check}): ${f.message}`);
          else warn(`choreo-lint (${f.check}): ${f.message}`);
        }
      } else {
        err(`choreo-lint falhou: ${(e.stderr || e.message || "").toString().slice(0, 400)}`);
      }
    }
  } else {
    info(`Composicao legada sem spec (allowlist). Checks de composicao (choreo-lint) nao rodam.`);
  }

  /**
   * GATES PLUGADOS EM 06/09/2026.
   *
   * Estes dois checadores existiam e NUNCA rodavam no render: dependiam de
   * alguem lembrar de chamar `aprendizado.js --revisar` na mao. O codigo de
   * saida 2 deles nao chegava a lugar nenhum, e foi por ai que a peca da
   * Fernanda saiu com etiqueta desenhada a mao, caixa vazia, anel sem cor e
   * a mesma frase no palco e na legenda.
   *
   * A licao `design-system-do-indice` virou GATE (3a vez que ele fala) e a
   * `texto-igual-palco-e-legenda` virou checagem mecanica (2a vez). Gate que
   * so existe em texto nao e gate.
   */
  const GATES_PLUGADOS = [
    ["checar-design-system.js", "design system: molde declarado e escalas fechadas"],
    ["checar-texto-duplicado.js", "mesma palavra no palco e na legenda"],
    ["checar-estrutura-vazia.js", "forma fechada que nasce vazia e sem nome"],
  ];
  for (const [script, oque] of GATES_PLUGADOS) {
    const caminho = path.join(__dirname, script);
    if (!fs.existsSync(caminho)) continue;
    console.log(`\n2c. Rodando ${script} (${oque})...`);
    try {
      execFileSync("node", [caminho, COMPOSITION], { cwd: __dirname, stdio: ["ignore", "pipe", "pipe"] });
      ok(`${script}: passou.`);
    } catch (e) {
      const saida = ((e.stdout || "").toString() + (e.stderr || "").toString()).trim();
      for (const linha of saida.split("\n").filter((l) => l.includes("[ERRO]"))) {
        err(`${script}: ${linha.replace(/^\s*\[ERRO\]\s*/, "").trim()}`);
      }
      if (!saida.includes("[ERRO]")) err(`${script} reprovou: ${saida.slice(0, 400)}`);
    }
  }

  // ── 3. Config de cena: do spec se houver, senao do legado ──────────────────
  console.log("\n3. Resolvendo config de cena (EXIT_F/overlap/sync)...");
  const config = spec ? specToLegacyShape(spec) : SCENE_CONFIG[COMPOSITION];
  if (!config) {
    info(`Sem config de cena (nem spec, nem SCENE_CONFIG legado). Sem checks de cena pra esta comp.`);
    finish();
    return;
  }

  const scenes = config.scenes;
  const last = scenes[scenes.length - 1];
  const configTotal = last.from + last.dur;

  if (!spec && configTotal !== bundleFrames) {
    // esta divergencia so importa pro SCENE_CONFIG legado: o spec, quando
    // existe, e MEDIDO do proprio choreography.ts, entao nao tem como
    // "desatualizar" em relacao a si mesmo.
    warn(`Config de cena LEGADO desatualizado: soma das cenas = ${configTotal}f, bundle real = ${bundleFrames}f.`);
    warn(`Pulando checks de cena (EXIT_F/overlap) para nao reprovar comp congelada por config velho.`);
    warn(`Acao: atualizar o SCENE_CONFIG desta comp ou dar a ela um choreography.ts.`);
    finish();
    return;
  }
  ok(`Config de cena consistente (${configTotal}f, bundle ${bundleFrames}f). Rodando checks de cena.`);

  // ── 4. EXIT_F dentro de cada cena ──────────────────────────────────────────
  console.log("\n4. Verificando EXIT_F vs dur...");
  for (const s of scenes) {
    if (s.EXIT_F === null) { info(`${s.name}: ultima cena, sem EXIT_F.`); continue; }
    if (s.EXIT_F + EXIT_ANIM_DUR > s.dur) {
      err(`${s.name}: EXIT_F=${s.EXIT_F}+${EXIT_ANIM_DUR}=${s.EXIT_F + EXIT_ANIM_DUR} > dur=${s.dur} (saida estoura a Sequence)`);
    } else {
      ok(`${s.name}: EXIT_F=${s.EXIT_F}, dur=${s.dur}, margem=${s.dur - s.EXIT_F - EXIT_ANIM_DUR}f`);
      if (s.EXIT_F + EXIT_SAFE_MARGIN > s.dur) {
        warn(`${s.name}: margem apertada (${s.dur - s.EXIT_F - EXIT_ANIM_DUR}f < 4f recomendado)`);
      }
    }
  }

  // ── 5. Overlaps entre cenas ────────────────────────────────────────────────
  console.log("\n5. Verificando overlaps...");
  for (let i = 0; i < scenes.length - 1; i++) {
    const overlap = scenes[i].from + scenes[i].dur - scenes[i + 1].from;
    if (overlap < 0) err(`${scenes[i].name} -> ${scenes[i + 1].name}: GAP de ${Math.abs(overlap)}f (frame vazio proibido)`);
    else if (overlap < MIN_OVERLAP) err(`${scenes[i].name} -> ${scenes[i + 1].name}: overlap=${overlap}f < ${MIN_OVERLAP}f`);
    else if (overlap > MAX_OVERLAP) warn(`${scenes[i].name} -> ${scenes[i + 1].name}: overlap=${overlap}f > ${MAX_OVERLAP}f`);
    else ok(`${scenes[i].name} -> ${scenes[i + 1].name}: overlap=${overlap}f`);
  }

  // ── 6. Sync com narração (se houver arquivo de timing) ─────────────────────
  if (config.timingFile && fs.existsSync(config.timingFile)) {
    console.log("\n6. Verificando sync com narracao...");
    try {
      const timing = JSON.parse(fs.readFileSync(config.timingFile, "utf8"));
      const arr = Array.isArray(timing) ? timing : timing.words || [];
      for (let i = 0; i < Math.min(scenes.length, arr.length); i++) {
        const s = scenes[i];
        if (s.EXIT_F === null || !arr[i]) continue;
        const exitS = (s.from + s.EXIT_F) / fps;
        const narrEnd = arr[i].end_s ?? arr[i].end;
        if (narrEnd == null) continue;
        const diff = Math.abs(exitS - narrEnd);
        if (diff > 0.5) warn(`${s.name}: exit ${exitS.toFixed(2)}s vs narr ${narrEnd.toFixed(2)}s (diff ${diff.toFixed(2)}s)`);
        else ok(`${s.name}: exit=${exitS.toFixed(2)}s, narr=${narrEnd.toFixed(2)}s`);
      }
    } catch (e) {
      warn(`Falha ao ler timing: ${e.message}`);
    }
  }

  finish();
}

function finish() {
  console.log(`\n========================================`);
  if (errors > 0) {
    console.error(` RESULTADO: REPROVADO — ${errors} erro(s), ${warnings} aviso(s)`);
    console.log(`========================================\n`);
    process.exit(1);
  }
  if (warnings > 0) {
    console.warn(` RESULTADO: APROVADO COM AVISOS — 0 erros, ${warnings} aviso(s)`);
    console.log(`========================================\n`);
    process.exit(0);
  }
  console.log(` RESULTADO: APROVADO — 0 erros, 0 avisos`);
  console.log(`========================================\n`);
  process.exit(0);
}

main().catch((e) => {
  console.error("Erro inesperado:", e.message);
  process.exit(1);
});
