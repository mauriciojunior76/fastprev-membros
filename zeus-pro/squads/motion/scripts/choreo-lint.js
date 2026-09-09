#!/usr/bin/env node
/**
 * choreo-lint.js — checks de COMPOSICAO (nao so timing/API) contra o
 * choreography.ts de uma composition (reforma do motion design system,
 * 19/08/2026).
 *
 * Existe pra pegar em CODIGO exatamente os 3 defeitos reais que o
 * ZeusTrafegoReels tinha e que nenhum validador anterior via:
 *   1. layout monotono — MotionStage aplicava a MESMA direcao de entrada/
 *      saida aos 8 icones do palco (mandamentos 6 e 10 do BRABO v9);
 *   2. duplo movimento — AskBubble/ResponseBubble tinham entryFrom PROPRIO
 *      somado ao entryFrom que o palco ja aplicava;
 *   3. rotacao linear continua — CupAndGear girava a engrenagem com
 *      ci(frame,[40,400],[0,300]) sem nenhum easing, por 360 frames.
 *
 * Os 4 primeiros checks leem o SceneSpec (determinismo total, dado
 * estruturado). Os 3 ultimos varrem o CODIGO-FONTE da composition por
 * regex (heuristico: pode ter falso positivo, por isso o escape
 * "// linear-ok: <motivo>").
 *
 * Uso:
 *   node scripts/choreo-lint.js <CompositionName>
 *   node scripts/choreo-lint.js <CompositionName> --json
 *
 * Chamado automaticamente por pre-render-validate.js quando ha spec; pode
 * rodar standalone tambem.
 */

const fs = require("fs");
const path = require("path");
const { findChoreographyFile, loadSpec } = require("./lib/load-choreography");
const { resolveCompDir } = require("./lib/resolve-comp-dir");

const COMPOSITION = process.argv[2];
const AS_JSON = process.argv.includes("--json");
if (!COMPOSITION) {
  console.error("Uso: node scripts/choreo-lint.js <CompositionName>");
  process.exit(1);
}

const COMPOSITIONS_DIR = path.join(__dirname, "..", "src", "compositions");
const COMP_DIR = resolveCompDir(COMPOSITIONS_DIR, COMPOSITION);

const findings = []; // { level: "error"|"warn", check, message }
const errAdd = (check, message) => findings.push({ level: "error", check, message });
const warnAdd = (check, message) => findings.push({ level: "warn", check, message });

// ─── checks deterministicos por SPEC ───────────────────────────────────────

function checkRepeatedHeroDirection(spec) {
  let prevHero = null;
  for (const scene of spec.scenes) {
    const hero = scene.elements.find((e) => e.role === "hero");
    if (!hero) continue;
    if (prevHero && prevHero.entry.dir === hero.entry.dir) {
      errAdd(
        "direcao-repetida",
        `Cena "${scene.name}": elemento hero entra de "${hero.entry.dir}", igual a cena anterior. ` +
          `Mandamento 6 (BRABO v9): direcoes de entrada nunca repetem em cenas consecutivas. ` +
          `Usar alternateDir(indice) de core/choreo.`
      );
    }
    prevHero = hero;
  }
}

function checkMissingStagger(spec) {
  for (const scene of spec.scenes) {
    for (const el of scene.elements) {
      if (el.children && el.children.count > 1 && !(el.children.staggerF > 0)) {
        errAdd(
          "stagger-ausente",
          `Cena "${scene.name}", elemento "${el.id}": ${el.children.count} filhos sem staggerF ` +
            `(ou staggerF <= 0). Irmaos entrando juntos = "elementos aparecendo sem escalonamento".`
        );
      }
    }
  }
}

function checkHierarchyDelay(spec) {
  for (const scene of spec.scenes) {
    const hero = scene.elements.find((e) => e.role === "hero");
    if (!hero) continue;
    const heroDelay = hero.entry.delayF ?? 0;
    for (const el of scene.elements) {
      if (el.role !== "support" && el.role !== "label") continue;
      const elDelay = el.entry.delayF ?? 0;
      if (elDelay < heroDelay) {
        errAdd(
          "delay-hierarquico-invertido",
          `Cena "${scene.name}": elemento "${el.id}" (role=${el.role}) entra no frame ${elDelay}, ` +
            `antes do hero "${hero.id}" (frame ${heroDelay}). DNA ExemploMotion: rotulo sempre DEPOIS ` +
            `do numero/elemento principal, nunca antes.`
        );
      }
    }
  }
}

function checkMonotonousLayout(spec) {
  if (spec.scenes.length < 3) return;
  const pairs = spec.scenes
    .map((scene) => {
      const hero = scene.elements.find((e) => e.role === "hero");
      if (!hero) return null;
      return `${hero.entry.dir}>${hero.exit ? hero.exit.dir : "none"}`;
    })
    .filter(Boolean);
  if (pairs.length >= 3 && new Set(pairs).size === 1) {
    errAdd(
      "layout-monotono",
      `Todas as ${pairs.length} cenas com hero usam o MESMO par entrada/saida (${pairs[0]}). ` +
        `Mandamento 10 (BRABO v9): layouts variados entre cenas. Este e exatamente o bug original ` +
        `do MotionStage.tsx do ZeusTrafegoReels.`
    );
  }
}

// ─── checks heuristicos por CODIGO-FONTE ───────────────────────────────────

function listSourceFiles(dir) {
  const out = [];
  const walk = (d) => {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      if (entry.name === "_versions" || entry.name === "node_modules") continue;
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.tsx?$/.test(entry.name)) out.push(full);
    }
  };
  if (fs.existsSync(dir)) walk(dir);
  return out;
}

/** ci(frame, [a,b], [c,d]) SEM 4o argumento (easing) — 3 argumentos exatos. */
const CI_NO_EASING_RE =
  /\bci\(\s*[\w.]+\s*,\s*\[\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\]\s*,\s*\[[^\]]*\]\s*\)/g;

function checkLinearContinuousMotion(files) {
  for (const file of files) {
    const src = fs.readFileSync(file, "utf8");
    const lines = src.split("\n");
    lines.forEach((line, idx) => {
      CI_NO_EASING_RE.lastIndex = 0;
      let m;
      while ((m = CI_NO_EASING_RE.exec(line))) {
        const range = Math.abs(Number(m[2]) - Number(m[1]));
        if (range <= 45) continue;
        const context = [lines[idx - 1] || "", line, lines[idx + 1] || ""].join("\n");
        if (/\/\/\s*linear-ok:/.test(context)) continue; // escape documentado
        const rel = path.relative(COMP_DIR, file);
        if (/rotate\(/.test(context)) {
          errAdd(
            "rotacao-linear",
            `${rel}:${idx + 1}: ci() de ${range} frames sem easing alimentando rotate(). ` +
              `Rotacao continua linear e o tell classico de motion amador (caso real: CupAndGear ` +
              `do ZeusTrafegoReels, ci(frame,[40,400],[0,300])). Usar Easing.inOut por trecho, ou ` +
              `marcar "// linear-ok: <motivo>" se for intencional.`
          );
        } else if (/translate/.test(context)) {
          warnAdd(
            "translacao-linear",
            `${rel}:${idx + 1}: ci() de ${range} frames sem easing alimentando translate(). ` +
              `Pode ser parallax/drift legitimo; se for, marcar "// linear-ok: <motivo>".`
          );
        }
      }
    });
  }
}

function checkDoubleMotion(spec, files) {
  const OWNS_FALSE_IDS = spec.scenes
    .flatMap((s) => s.elements)
    .filter((e) => !e.ownsMotion)
    .map((e) => e.id);

  for (const file of files) {
    const base = path.basename(file, path.extname(file)).toLowerCase();
    const normalized = base.replace(/[^a-z0-9]/g, "");
    const matchId = OWNS_FALSE_IDS.find((id) => normalized.includes(id.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()));
    if (!matchId) continue;

    const src = fs.readFileSync(file, "utf8");
    const importsMotion = /import\s*\{[^}]*\b(entryFrom|exitTo|wordEntry)\b[^}]*\}/.test(src);
    if (importsMotion) {
      const rel = path.relative(COMP_DIR, file);
      errAdd(
        "duplo-movimento",
        `${rel}: importa entryFrom/exitTo/wordEntry, mas o elemento "${matchId}" no spec tem ` +
          `ownsMotion ausente/false (o palco ja aplica entrada/saida nele). Isso soma DOIS ` +
          `movimentos no mesmo elemento (caso real: AskBubble/ResponseBubble do ZeusTrafegoReels). ` +
          `Ou remove o entryFrom/exitTo interno, ou marca ownsMotion:true no spec e tira o elemento ` +
          `do controle do palco.`
      );
    }
  }
}

function checkDeprecatedComponents(files) {
  const allowlist = require("./lib/legacy-allowlist.json").deprecatedComponentsUsage.allowed;
  if (allowlist.includes(COMPOSITION)) return;
  const RE = /from\s+["'][^"']*motion-primitives\/(FadeIn|SlideIn|ScaleIn)["']/;
  for (const file of files) {
    const src = fs.readFileSync(file, "utf8");
    const m = src.match(RE);
    if (m) {
      const rel = path.relative(COMP_DIR, file);
      errAdd(
        "componente-aposentado",
        `${rel}: importa ${m[1]} de motion-primitives (aposentado, @deprecated). Usar entryFrom/ ` +
          `exitTo do nucleo (core/primitives ou core/choreo-runtime) em vez disso.`
      );
    }
  }
}

// ─── checks heuristicos adicionais (reforma 20/08/2026, pos-reprovacao v08) ─

/** Mesma duracao fixa que os drawUtils.tsx dos icones usam em
 * useDrawProgress (26 frames). Se essa janela mudar, atualizar aqui tambem —
 * nao ha como o lint importar isso de dentro de um arquivo React sem montar
 * o bundle. */
/** Janela PADRAO de useDrawProgress (drawUtils.tsx DRAW_DUR_DEFAULT, base
 * 60fps desde 27/08/2026). Cena que declara entry.dur no spec sobrescreve
 * isto — ver uso abaixo. */
// espelha DRAW_DUR_DEFAULT de components/icons/drawUtils.tsx (72 desde a
// 7a rodada de 27/08/2026: suavizacao mais longa em tudo)
const DRAW_PROGRESS_WINDOW = 72;

/**
 * AVISO (nao erro: e uma heuristica, useDrawProgress isolado nao prova que
 * o ELEMENTO inteiro fica incompleto — o palco pode aplicar so um fade de
 * saida por cima, tolerando desenho ainda em curso). Pega o padrao real dos
 * 4 casos reprovados na v08: useDrawProgress(delay) cujo desenho (delay +
 * 26f) so termina DEPOIS do exitF da cena — o espectador ve o traco, o
 * contador ou a barra ainda se formando quando a cena ja comecou a sumir.
 */
function checkAnimationBeyondExit(spec, files) {
  const RE = /useDrawProgress\(\s*(\d+)\s*\)/g;
  for (const file of files) {
    const base = path.basename(file, path.extname(file)).toLowerCase();
    if (base === "drawutils" || base === "telegrammark") continue; // utilitarios, nao um icone de cena
    const normalized = base.replace(/[^a-z0-9]/g, "");
    const scene = spec.scenes.find((s) =>
      s.elements.some((e) => normalized.includes(e.id.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()))
    );
    if (!scene || scene.exitF == null) continue;

    const src = fs.readFileSync(file, "utf8");
    let m;
    RE.lastIndex = 0;
    while ((m = RE.exec(src))) {
      const delay = Number(m[1]);
      // 27/08/2026: a janela deixou de ser sempre 26. A cena pode declarar
      // entry.dur no choreography.ts, e o MotionStage injeta esse valor nos
      // icones via DrawStyleContext — entao o check tem que usar o numero
      // que a cena realmente usa, senao subestima (ou superestima) o fim do
      // desenho justamente nas cenas que customizaram o caracter.
      const sceneElement = scene.elements[0];
      const drawWindow = sceneElement?.entry?.dur ?? DRAW_PROGRESS_WINDOW;
      const finishesAt = delay + drawWindow;
      if (finishesAt > scene.exitF) {
        const rel = path.relative(COMP_DIR, file);
        warnAdd(
          "animacao-alem-da-saida",
          `${rel}: useDrawProgress(${delay}) termina no frame ${finishesAt}, DEPOIS do exitF=${scene.exitF} ` +
            `da cena "${scene.name}". O elemento pode aparecer ainda se formando quando a saida ja comecou ` +
            `(caso real: ResponseBubble/CompareCalendar/CampaignPanel/AskBubble da v08). Antecipar o delay ou ` +
            `encurtar a janela.`
        );
      }
    }
  }
}

/** ERRO: fontSize abaixo de 30 em SVG de icone. A escala do palco de icones
 * e 1:1 (1 unidade de viewBox = 1 pixel real de tela 1080x1920, ver
 * docs/zeus-motion-design-system.md) — fontSize={16} e 16px reais, ilegivel
 * num Reels. Regex simples, so pega o padrao JSX `fontSize={N}` ou
 * `fontSize="N"` literal (nao pega valor computado, que fica por conta da
 * revisao visual). */
function checkTinyIconText(files) {
  const RE = /fontSize=\{?"?(\d+(?:\.\d+)?)"?\}?/g;
  for (const file of files) {
    if (!file.includes(`${path.sep}icons${path.sep}`)) continue; // so SVG de icone, nao texto de UI normal
    const src = fs.readFileSync(file, "utf8");
    const lines = src.split("\n");
    lines.forEach((line, idx) => {
      RE.lastIndex = 0;
      let m;
      while ((m = RE.exec(line))) {
        const size = Number(m[1]);
        if (size < 30) {
          const rel = path.relative(COMP_DIR, file);
          errAdd(
            "texto-pequeno-demais",
            `${rel}:${idx + 1}: fontSize=${size} num SVG de icone. Escala 1:1 com a tela (pixel real ` +
              `1080x1920) — abaixo de 30 fica ilegivel num Reels. Caso real: TrendChart/CampaignPanel/ ` +
              `CompareCalendar da v08, todos em 16.`
          );
        }
      }
    });
  }
}

// ─── checks de ENTRADA (reforma 26/08/2026, Zeus Visual Intelligence) ──────
//
// Os checks acima pegam defeito de COREOGRAFIA (direção repetida, spring cru
// sem stagger). Estes dois pegam o defeito que o o dono do canal relatou: peça nova
// nascendo com movimento cru, sem passar pelo núcleo suavizado (core/), como
// se o squad nunca tivesse aprendido o padrão. Só rodam em composição que já
// chegou até aqui (ou seja, JÁ tem choreography.ts — legado sem spec nem
// entra neste arquivo, ver "main" abaixo).

/** spring(...) cru do pacote remotion, sem passar por makeSpring/makeLegacySpring do núcleo. */
const RAW_SPRING_RE = /\b([A-Za-z_]*[Ss]pring)\(/g;

/**
 * interpolate(...) cru do pacote remotion, contornando ci() do núcleo.
 * "ci é lei BRABO" (comentário original em core/primitives.ts): ci clampa nas
 * pontas e aceita curva de easing; interpolate cru não clampa e por padrão é
 * linear, o padrão brusco exato que o o dono do canal reclamou (26/08/2026). Isto
 * pega a causa, não o sintoma: testado contra ZeusTrafegoReels mostrou que
 * medir "filter: blur(" direto dá falso positivo (drawUtils/HookCard/
 * ResponseBubble calculam o blur com ci()+CURVES e só não chamam a função
 * blurIn pelo nome; o problema real nunca foi a palavra "blur", foi
 * interpolate cru).
 */
const RAW_INTERPOLATE_RE = /\binterpolate\(/g;

function checkRawInlineMotion(files) {
  for (const file of files) {
    const src = fs.readFileSync(file, "utf8");
    const lines = src.split("\n");
    let inBlockComment = false;
    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      const wasInComment = inBlockComment;
      if (trimmed.includes("/*")) inBlockComment = true;
      if (trimmed.includes("*/")) inBlockComment = false;
      // Pula linha inteira de comentário (JSDoc, bloco, linha // solta): já
      // pegou 2 falso-positivo real (drawUtils.tsx e AskBubble.tsx citavam
      // "spring(" e "interpolate(" em prosa, explicando correção passada,
      // não código vivo).
      const isCommentLine = wasInComment || trimmed.startsWith("*") || trimmed.startsWith("//") || trimmed.startsWith("/*");
      if (isCommentLine) return;

      const context = [lines[idx - 1] || "", line, lines[idx + 1] || ""].join("\n");
      if (/\/\/\s*raw-motion-ok:/.test(context)) return; // escape documentado

      RAW_SPRING_RE.lastIndex = 0;
      let m;
      while ((m = RAW_SPRING_RE.exec(line))) {
        if (m[1] === "makeSpring" || m[1] === "makeLegacySpring") continue;
        const rel = path.relative(COMP_DIR, file);
        errAdd(
          "spring-cru",
          `${rel}:${idx + 1}: "${m[1]}(" chama spring() direto do remotion em vez de ` +
            `makeSpring()/makeLegacySpring() de core/springs. Composição nova nasce com o ` +
            `movimento cru, sem herdar nenhum dos 7 presets suavizados. Marcar ` +
            `"// raw-motion-ok: <motivo>" se for teste isolado fora de composition de produção.`
        );
      }

      RAW_INTERPOLATE_RE.lastIndex = 0;
      while (RAW_INTERPOLATE_RE.exec(line)) {
        const rel = path.relative(COMP_DIR, file);
        errAdd(
          "interpolate-cru",
          `${rel}:${idx + 1}: chama interpolate() direto do remotion em vez de ci() do núcleo. ` +
            `ci() clampa nas pontas e aceita curva de easing (CURVES); interpolate cru não clampa ` +
            `e por padrão é linear, o motivo mais comum de movimento saindo brusco/duro em vez de ` +
            `suave. Marcar "// raw-motion-ok: <motivo>" se for cálculo que não é motion visual ` +
            `(ex.: mapear um índice, não uma curva de tela).`
        );
      }
    });
  }
}

/** Resolve "../../modules/x" a partir de um arquivo pra um .ts/.tsx/index real, ou null. */
function resolveLocalImport(fromFile, importPath) {
  const base = path.resolve(path.dirname(fromFile), importPath);
  const candidates = [base, `${base}.tsx`, `${base}.ts`, path.join(base, "index.tsx"), path.join(base, "index.ts")];
  return candidates.find((c) => fs.existsSync(c) && fs.statSync(c).isFile()) || null;
}

const CORE_IMPORT_RE = /from\s+["'][^"']*\/core(?:\/[^"']*)?["']/;
const LOCAL_IMPORT_RE = /from\s+["'](\.[^"']*)["']/g;

function checkCoreImport(files) {
  const tsxFiles = files.filter((f) => f.endsWith(".tsx"));
  if (tsxFiles.length === 0) return;

  // Percorre a cadeia de import local inteira (BFS), não só 1 salto: se a
  // composition delega motion pra um módulo compartilhado (ex.: src/modules/
  // lower-thirds), e esse módulo é um barrel index.ts que só reexporta de
  // outro arquivo, o import de core pode estar 2 arquivos adiante. Achado
  // real (CasoLowerThird): composition -> modules/lower-thirds/index.ts
  // (barrel puro, zero import de core) -> SpeakerLowerThird.tsx (aqui sim
  // importa core/primitives). visited evita ciclo/reprocesso.
  const visited = new Set(tsxFiles);
  const filesToCheck = [...tsxFiles];
  const queue = [...tsxFiles];
  while (queue.length) {
    const f = queue.shift();
    const src = fs.readFileSync(f, "utf8");
    LOCAL_IMPORT_RE.lastIndex = 0;
    let m;
    while ((m = LOCAL_IMPORT_RE.exec(src))) {
      const resolved = resolveLocalImport(f, m[1]);
      if (resolved && !resolved.startsWith(COMP_DIR) && !visited.has(resolved)) {
        visited.add(resolved);
        filesToCheck.push(resolved);
        queue.push(resolved);
      }
    }
  }

  const importsCore = filesToCheck.some((f) => CORE_IMPORT_RE.test(fs.readFileSync(f, "utf8")));
  if (!importsCore) {
    errAdd(
      "sem-import-do-nucleo",
      `Nenhum arquivo .tsx desta composição (nem os módulos locais que ela importa) importa de ` +
        `"core" (core/choreo, core/primitives, core/springs, core/curves...). Composição nova só ` +
        `existe suavizada quando usa o núcleo, direto ou via um módulo de src/modules/ que já usa; ` +
        `ver o contrato em core/index.ts e os exemplos prontos em src/compositions/_casos/.`
    );
  }
}

/**
 * ERRO: texto exibido sem acento (27/08/2026, 3a reprovacao do Reels Zeus).
 * O squad tem SETE gates em prosa exigindo "acentuacao perfeita"
 * (copy-layer-reviewer, caption-sync, pre-render-gate...) e NENHUM pegou os
 * 4 rotulos sem acento dentro dos <text> de SVG — todos olhavam legenda e
 * texto de interface, ninguem varria components/icons/*.tsx. Este check
 * fecha o ponto cego: sentinelas em MAIUSCULAS (a forma como rotulo de
 * icone e escrito) cuja grafia sem acento e sempre erro em portugues.
 */
const ACCENT_SENTINELS = [
  ["ORCAMENTO", "ORÇAMENTO"],
  ["DIARIO", "DIÁRIO"],
  ["PUBLICO", "PÚBLICO"],
  ["CAMPEAO", "CAMPEÃO"],
  ["ANALISE", "ANÁLISE"],
  ["TRAFEGO", "TRÁFEGO"],
  ["CONFIGURACAO", "CONFIGURAÇÃO"],
  ["INFORMACAO", "INFORMAÇÃO"],
  ["VERSAO", "VERSÃO"],
  ["ATENCAO", "ATENÇÃO"],
  ["CRIACAO", "CRIAÇÃO"],
  ["SOLUCAO", "SOLUÇÃO"],
  ["PADRAO", "PADRÃO"],
  ["USUARIO", "USUÁRIO"],
  ["RELATORIO", "RELATÓRIO"],
  ["HISTORICO", "HISTÓRICO"],
];

function checkMissingAccents(files) {
  // so texto EXIBIDO: strings dentro de props de texto JSX ou entre tags.
  // Comentarios de codigo ficam de fora (o repo escreve comentario sem
  // acento de proposito em varios lugares).
  for (const file of files) {
    const src = fs.readFileSync(file, "utf8");
    const lines = src.split("\n");
    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("/*")) return;
      // linhas candidatas: contem string literal ou conteudo de tag JSX
      const isDisplayish = /["'`>]/.test(line);
      if (!isDisplayish) return;
      for (const [wrong, right] of ACCENT_SENTINELS) {
        const re = new RegExp(`(?<![A-ZÀ-Ü])${wrong}(?![A-ZÀ-Ü])`);
        if (re.test(line)) {
          const rel = path.relative(COMP_DIR, file);
          errAdd(
            "texto-sem-acento",
            `${rel}:${idx + 1}: "${wrong}" sem acento em texto exibido — o correto e "${right}". ` +
              `Acentuacao perfeita e regra de zero tolerancia do squad (copy-layer-reviewer.md), e ` +
              `os 4 rotulos sem acento da v08-v11 passaram por 7 gates de prosa sem serem pegos. ` +
              `Caso real: ORCAMENTO DIARIO / PUBLICO / CRIATIVO CAMPEAO / ANALISE REAL.`
          );
        }
      }
    });
  }
}

/**
 * ERRO: acabamento de traco quadrado (27/08/2026). strokeLinecap="square" e
 * strokeLinejoin="miter" eram a causa raiz do "linhas quebradas, bruto,
 * grosseiro" da 3a reprovacao — ponta com quina saliente e vertice em bico
 * (farpa em angulo agudo). O acabamento Apple e round nos dois, e virou o
 * padrao do DrawPath. Este check impede o retorno.
 */
function checkSquareStroke(files) {
  const RE = /strokeLinecap=["']square["']|strokeLinejoin=["']miter["']/;
  for (const file of files) {
    const src = fs.readFileSync(file, "utf8");
    const lines = src.split("\n");
    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("//") || trimmed.startsWith("*")) return;
      if (RE.test(line)) {
        const prev = lines[idx - 1] || "";
        if (/\/\/\s*square-ok:/.test(prev) || /\/\/\s*square-ok:/.test(line)) return;
        const rel = path.relative(COMP_DIR, file);
        errAdd(
          "traco-quadrado",
          `${rel}:${idx + 1}: strokeLinecap="square" ou strokeLinejoin="miter" — acabamento bruto ` +
            `(quina saliente / vertice em bico). O padrao do squad e round/round (SF Symbols). ` +
            `Se a quina reta for INTENCIONAL (raro), marcar "// square-ok: <motivo>" na linha anterior.`
        );
      }
    });
  }
}

/**
 * ERRO: cor hex hardcoded fora de tokens.ts (Fase 5 da auditoria audiovisual,
 * 27/08/2026). O contrato do sistema (INTENT-MAP.md: "cor de acordo com a marca")
 * e que COR/FONTE vem do tokens.ts da composition, alimentado por
 * design-core-brands.ts (fonte unica: templates/design-tokens/brands/*.json). Cor solta
 * num componente e exatamente o padrao que gerou 2 paletas rosegold "fonte unica"
 * conflitantes (exemplo-1 vs palette-deluxe) por nunca ter um dono so. tokens.ts E
 * o lugar certo de declarar hex, entao fica de fora do check.
 */
const HEX_COLOR_RE = /#[0-9A-Fa-f]{3,8}\b/g;

function checkHardcodedColor(files) {
  // src/compositions/_casos/ sao os 6 fixtures de regressao (fase 6 da reforma
  // 19-20/08): testam COREOGRAFIA (direcao, stagger, overlap), nunca tiveram
  // tokens.ts, e sao diffados PIXEL A PIXEL contra baseline como prova de zero
  // regressao. Retrofitar tokens.ts neles pra este check passar arrisca exatamente
  // a regressao que existem pra provar que nao acontece, por um ganho que nao e
  // deles (nao tem marca, sao teste estrutural). Isentos deste check so, os outros
  // 13 continuam valendo neles.
  if (COMP_DIR.split(path.sep).includes("_casos")) return;
  for (const file of files) {
    if (path.basename(file) === "tokens.ts") continue;
    // BRAND.ts (9a rodada, 27/08/2026): fonte unica de IDENTIDADE VISUAL
    // (cor/fonte/texto de marca), separada de tokens.ts (formato/layout) de
    // proposito, pra replicabilidade — "trocar cor e fonte num arquivo so,
    // sem procurar". tokens.ts REEXPORTA de BRAND.ts, entao continua sendo
    // 1 fonte de verdade so, so que em 2 arquivos com papeis diferentes.
    if (path.basename(file) === "BRAND.ts") continue;
    const src = fs.readFileSync(file, "utf8");
    const lines = src.split("\n");
    let inBlockComment = false;
    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      const wasInComment = inBlockComment;
      if (trimmed.includes("/*")) inBlockComment = true;
      if (trimmed.includes("*/")) inBlockComment = false;
      const isCommentLine = wasInComment || trimmed.startsWith("*") || trimmed.startsWith("//") || trimmed.startsWith("/*");
      if (isCommentLine) return;
      if (/\/\/\s*cor-ok:/.test(line) || /\/\/\s*cor-ok:/.test(lines[idx - 1] || "")) return;

      HEX_COLOR_RE.lastIndex = 0;
      let m;
      while ((m = HEX_COLOR_RE.exec(line))) {
        const rel = path.relative(COMP_DIR, file);
        errAdd(
          "cor-hardcoded",
          `${rel}:${idx + 1}: "${m[0]}" e hex hardcoded fora de tokens.ts. Declarar em ` +
            `tokens.ts (COLORS.*, vindo de design-core-brands.ts) e importar de lá; cor solta ` +
            `num componente e a mesma raiz que gerou 2 paletas rosegold conflitantes se ` +
            `declarando "fonte única" (exemplo-1.json vs palette-deluxe.json, corrigido ` +
            `27/08/2026). Marcar "// cor-ok: <motivo>" se for cor de teste isolado, fora de ` +
            `composition de produção.`
        );
      }
    });
  }
}

// ─── main ───────────────────────────────────────────────────────────────────

// ─── checks de LAYOUT (6a rodada, 27/08/2026) ─────────────────────────────
//
// Nasceram do defeito que o o dono do canal fotografou: a legenda atravessando o
// topo do celular do chat. Palavras dele: "tem alguma coisa que deixa o
// squad cego, ele nao ve o que ta fazendo... mapear isso e criar um codigo
// pra jamais se repetir esses erros grosseiros". Estes dois checks sao esse
// codigo.

/**
 * palco-overflow: o conteudo de uma cena nao pode ser mais alto que a area
 * util do palco daquele stage, senao invade a faixa da legenda.
 *
 * Cada componente de cena declara `export const CONTENT_H = <px>`, e a
 * composition declara `STAGE_SAFE` (normal/expanded) em tokens.ts. O check
 * cruza os dois pelo mapa de cenas do MotionStage.
 *
 * A declaracao e OBRIGATORIA: componente de cena sem CONTENT_H reprova,
 * porque sem ela o gate fica cego, que era exatamente o problema.
 */
/**
 * acento-limite: o acento de passagem tem teto, janela e lugar.
 *
 * O acento (design system 3.3) e a variante de interface que entra POR CIMA
 * da cena quando a fala apenas MENCIONA uma plataforma. E remedio de ritmo,
 * e remedio em excesso vira veneno: tres por minuto e o teto, 40 a 60
 * quadros e a janela, e cena cheia (densidade 4 ou 5) nao recebe acento.
 *
 * Le o campo `acento` das cenas em `tokens.ts`. Peca sem nenhum acento nao
 * e checada: o gate so existe pra quem usa.
 */
function checkAcentoLimite() {
  const tokensPath = path.join(COMP_DIR, "tokens.ts");
  if (!fs.existsSync(tokensPath)) return;
  const tokensSrc = fs.readFileSync(tokensPath, "utf8");
  const scenesBlock = tokensSrc.match(/SCENES\s*:\s*SceneDef\[\]\s*=\s*\[([\s\S]*?)\n\];/);
  if (!scenesBlock) return;

  const cenas = [];
  for (const m of scenesBlock[1].matchAll(/key:\s*"([^"]+)"[^}]*?start:\s*([\d.]+)[^}]*?end:\s*([\d.]+)([^}]*)/g)) {
    const resto = m[4] || "";
    const acento = resto.match(/acento:\s*\{([^}]*)\}/);
    cenas.push({
      key: m[1],
      start: Number(m[2]),
      end: Number(m[3]),
      acento: acento ? acento[1] : null,
    });
  }
  const comAcento = cenas.filter((c) => c.acento);
  if (!comAcento.length) return;

  const dur = cenas.length ? cenas[cenas.length - 1].end - cenas[0].start : 0;
  const minutos = dur > 0 ? dur / 60 : 1;
  const teto = Math.max(3, Math.round(3 * minutos));
  if (comAcento.length > teto) {
    warnAdd(
      "acento-limite",
      `${comAcento.length} acentos de passagem em ${dur.toFixed(0)}s: o teto do sistema e 3 por minuto ` +
        `(${teto} nesta peca). Acento e quebra de monotonia; em excesso vira o proprio ritmo.`
    );
  }

  comAcento.forEach((c) => {
    const de = Number((c.acento.match(/de:\s*(\d+)/) || [])[1]);
    const ate = Number((c.acento.match(/ate:\s*(\d+)/) || [])[1]);
    if (Number.isFinite(de) && Number.isFinite(ate)) {
      const q = ate - de;
      if (q < 40 || q > 60) {
        warnAdd(
          "acento-limite",
          `cena "${c.key}": acento de ${q} quadros. A janela e 40 a 60: abaixo nao da tempo de ler, ` +
            `acima o trecho era sobre a plataforma e devia virar cena de interface.`
        );
      }
    }
  });

  // Dois acentos em cenas vizinhas: o segundo perde o efeito de surpresa.
  for (let i = 1; i < cenas.length; i++) {
    if (cenas[i].acento && cenas[i - 1].acento) {
      warnAdd(
        "acento-limite",
        `cenas "${cenas[i - 1].key}" e "${cenas[i].key}": acento em cenas vizinhas. ` +
          `O sistema pede pelo menos uma cena limpa entre um acento e o proximo.`
      );
    }
  }
}


/**
 * GATE (07/09/2026): palco que desloca na saida.
 *
 * Nas pecas aprovadas todo elemento tem `ownsMotion: true`, e o palco entao
 * aplica APENAS opacidade na saida (mais o DrawStyleContext na entrada). O
 * `applyChoreo` le `entry.dir`/`exit.dir` e vira translate: com ele ligado, a
 * cena inteira sobe na saida e passa POR CIMA do rosto. A direcao no spec e
 * metadado para o check de layout monotono, nunca movimento.
 *
 * Origem: ERRO #367, Reel da Kamila. O palco vinha do gerador com o
 * applyChoreo dentro, e ninguem percebeu ate o video ficar pronto.
 */

/**
 * GATE (07/09/2026): peca em linha que estoura a largura do palco.
 *
 * Molde com N itens lado a lado (cartao, no, coluna) precisa caber nos 904 do
 * palco. Quando nao cabe, o que acontece na tela e um destes dois: os itens se
 * cruzam, ou o rotulo e cortado pela borda. Foi o defeito do segundo 44 do Reel
 * da Kamila, com quatro cartoes de 200 mais gaps.
 *
 * O check le as constantes de largura e gap do molde e cobra a conta, sem
 * precisar renderizar.
 */
const LARGURA_DO_PALCO = 904;

function checkLarguraDaLinha(files) {
  const lerNumeros = (src) => {
    const n = {};
    for (const m of src.matchAll(/const\s+(\w+)\s*=\s*(\d+)\s*;/g)) n[m[1]] = Number(m[2]);
    return n;
  };

  for (const file of files) {
    if (!/\.tsx$/.test(file)) continue;
    if (!ehComponenteDeCena(file)) continue;
    const src = fs.readFileSync(file, "utf8");
    const rel = path.relative(COMP_DIR, file);

    // quantos itens esta CENA desenha em linha
    const n = (src.match(/\{\s*rotulo:/g) || []).length;
    if (n < 2) continue;

    // o molde de onde vem a geometria (a cena importa dele)
    let geo = lerNumeros(src);
    for (const imp of src.matchAll(/from\s+"\.\/(Molde\w+)"/g)) {
      const moldePath = path.join(path.dirname(file), `${imp[1]}.tsx`);
      if (fs.existsSync(moldePath)) geo = { ...lerNumeros(fs.readFileSync(moldePath, "utf8")), ...geo };
    }

    // largura por item: a cena pode declarar larguraCartao, senao vale a coluna do molde
    const larguraProp = src.match(/larguraCartao=\{(\d+)\}/);
    const denso = n >= 4;
    const coluna =
      (larguraProp && Number(larguraProp[1])) ||
      (denso ? geo.COLUNA_5 : undefined) ||
      geo.COLUNA ||
      geo.LADO_W ||
      geo.BLOCO_W ||
      geo.CIRCULO ||
      0;
    const gap =
      (denso ? geo.GAP_DENSO ?? geo.CONECTOR_5 : undefined) ??
      geo.GAP ??
      geo.VAO ??
      geo.CONECTOR_W ??
      0;
    if (!coluna) continue;

    const total = coluna * n + gap * (n - 1);
    if (total > LARGURA_DO_PALCO) {
      errAdd(
        "largura-da-linha",
        `${rel}: ${n} itens de ${coluna} com ${gap} de respiro somam ${total}, ` +
          `acima dos ${LARGURA_DO_PALCO} do palco. Na tela isso vira item cruzando o vizinho ou ` +
          `rotulo cortado (defeito do segundo 44, 07/09/2026). Aperte a coluna e o respiro, ` +
          `nunca o no e o icone.`
      );
    }
  }
}


/**
 * GATE (07/09/2026): buraco entre duas entradas da mesma cena.
 *
 * Quando um componente tem varios elementos com quadro proprio (linhas de um
 * lettering, itens de uma grade, nos de uma trilha), o intervalo entre uma
 * entrada e a seguinte e o tempo em que a tela fica PARADA, muitas vezes
 * mostrando a informacao pela metade. No Reel da Kamila a segunda linha do
 * gancho entrava 200 quadros depois da primeira: 3,3s com "POR ONDE COMECAR"
 * sozinho, que sem o complemento nao quer dizer nada.
 *
 * Teto: 120 quadros (2s) entre entradas consecutivas dentro do mesmo arquivo.
 */
const INTERVALO_MORTO = 120;

/** Componente de cena, aceitando barra ou contrabarra: no Windows o filtro
 *  por path.sep passava batido em parte dos caminhos. */
const ehComponenteDeCena = (file) =>
  String(file).split(path.sep).join("/").includes("/icons/");

function checkIntervaloMorto(files) {
  for (const file of files) {
    if (!/\.tsx$/.test(file)) continue;
    if (!ehComponenteDeCena(file)) continue;
    const src = fs.readFileSync(file, "utf8");
    const rel = path.relative(COMP_DIR, file);

    const frames = [...src.matchAll(/frame:\s*(\d+)/g)]
      .map((m) => Number(m[1]))
      .filter((n) => n < 5000)
      .sort((a, b) => a - b);
    if (frames.length < 2) continue;

    for (let i = 1; i < frames.length; i++) {
      const vao = frames[i] - frames[i - 1];
      if (vao > INTERVALO_MORTO) {
        warnAdd(
          "intervalo-morto",
          `${rel}: ${vao} quadros (${(vao / 60).toFixed(1)}s) entre a entrada do quadro ` +
            `${frames[i - 1]} e a do ${frames[i]}. Nesse intervalo a tela fica parada, e se o ` +
            `elemento que falta completa a frase, o espectador le informacao pela metade ` +
            `(defeito do gancho, 07/09/2026). Teto: ${INTERVALO_MORTO} quadros. Intervalo ditado pela fala e legitimo QUANDO a estrutura ja esta inteira na tela (trio, grade): ai a espera nao esconde informacao.`
        );
      }
    }
  }
}

function checkPalcoDesloca(spec, files) {
  const stagePath = files.find((f) => f.endsWith(`${path.sep}MotionStage.tsx`));
  if (!stagePath) return;
  const src = fs.readFileSync(stagePath, "utf8");
  const usaApplyChoreo = /applyChoreo\s*\(/.test(src);
  if (!usaApplyChoreo) return;

  const temOwnsMotion = (spec.scenes || []).some((c) =>
    (c.elements || []).some((el) => el.ownsMotion)
  );
  if (!temOwnsMotion) return;

  errAdd(
    "palco-desloca",
    `MotionStage.tsx chama applyChoreo com elementos que declaram ownsMotion. ` +
      `Isso transforma exit.dir em deslocamento e faz a cena SUBIR por cima do video na saida ` +
      `(ERRO #367). Nas pecas aprovadas o palco so aplica opacidade na saida: copie o bloco ` +
      `"if (element.ownsMotion)" do MotionStage de CarlosSemeReels.`
  );
}

/**
 * GATE (07/09/2026): anel de espectro sem forma propria.
 *
 * O AnelEspectro se posiciona com `inset: -espessura` sobre o elemento PAI: ele
 * nao desenha circulo nenhum. O `diametro` so escolhe a espessura pela tabela.
 * Passar uma conta (CIRCULO * 2, LADO / 3) significa que nao existe elemento
 * daquele tamanho, e o anel vai abracar o que estiver por perto, normalmente a
 * caixa de um texto.
 *
 * Origem: ERRO #366, o "21 dias" com o anel torto em volta do numero.
 */
function checkAnelSemForma(files) {
  for (const file of files) {
    if (!/\.tsx$/.test(file)) continue;
    const src = fs.readFileSync(file, "utf8");
    const rel = path.relative(COMP_DIR, file);
    for (const m of src.matchAll(/<AnelEspectro[^>]*diametro=\{([^}]+)\}/g)) {
      const expr = m[1].trim();
      if (/[*/+-]/.test(expr) && !/^\w+$/.test(expr)) {
        errAdd(
          "anel-sem-forma",
          `${rel}: <AnelEspectro diametro={${expr}}> usa uma conta. O anel contorna o ELEMENTO PAI, ` +
            `entao o diametro tem que ser a dimensao REAL de um elemento que existe na tela ` +
            `(ERRO #366). Alvo nao circular leva tambem raio={RAIO.painel} ou {RAIO.pill}.`
        );
      }
    }
  }
}

/**
 * GATE (07/09/2026): escala de circulo e icone fora da familia.
 *
 * A escala e fechada e vem das pecas aprovadas: atributo solo 180/80, trio
 * 148/64, frase com icone 120/56, passos 112 ou 124 com icone 48, comparacao
 * 200/88, mini-selo 44. Quando a quantidade de itens nao cabe, o que aperta e a
 * COLUNA e o CONECTOR, nunca o no e o icone.
 *
 * Origem: ERRO #366, moldes escritos do zero com proporcao inventada.
 */
const CIRCULOS_APROVADOS = [44, 76, 80, 96, 112, 120, 124, 132, 148, 168, 180, 200, 220];
const ICONES_APROVADOS = [24, 28, 32, 40, 44, 46, 48, 56, 64, 72, 80, 88];

function checkEscalaDeCirculo(files) {
  for (const file of files) {
    if (!/\.tsx$/.test(file)) continue;
    if (!ehComponenteDeCena(file)) continue;
    const src = fs.readFileSync(file, "utf8");
    const rel = path.relative(COMP_DIR, file);
    for (const m of src.matchAll(/const\s+(CIRCULO|NO_D|CIRCULO_\d+|NO_D_\d+)\w*\s*=\s*(\d+)\s*;/g)) {
      const v = Number(m[2]);
      if (!CIRCULOS_APROVADOS.includes(v)) {
        warnAdd(
          "escala-de-circulo",
          `${rel}: ${m[1]} = ${v} fora da escala das pecas aprovadas ` +
            `(${CIRCULOS_APROVADOS.join(", ")}). Se nao couber, aperte coluna e conector, nunca o no.`
        );
      }
    }
    for (const m of src.matchAll(/const\s+(ICONE\w*)\s*=\s*(\d+)\s*;/g)) {
      const v = Number(m[2]);
      if (!ICONES_APROVADOS.includes(v)) {
        warnAdd(
          "escala-de-circulo",
          `${rel}: ${m[1]} = ${v} fora da escala de icone das pecas aprovadas ` +
            `(${ICONES_APROVADOS.join(", ")}).`
        );
      }
    }
  }
}

function checkStageOverflow(spec, files) {
  const stagePath = files.find((f) => f.endsWith(`${path.sep}MotionStage.tsx`));
  const tokensPath = path.join(COMP_DIR, "tokens.ts");
  if (!stagePath || !fs.existsSync(tokensPath)) return; // composition sem palco: nao se aplica

  const tokensSrc = fs.readFileSync(tokensPath, "utf8");
  const safeBlock = tokensSrc.match(/STAGE_SAFE\s*=\s*\{([\s\S]*?)\}\s*as const/);
  if (!safeBlock) return; // composition ainda sem o token: check inativo (legado)
  const safe = {};
  for (const m of safeBlock[1].matchAll(/(\w+)\s*:\s*(\d+)/g)) safe[m[1]] = Number(m[2]);

  // stage declarado por cena, lido do SCENES de tokens.ts
  const stageByKey = {};
  const excecaoByKey = {}; // palcoExcecao declarada por cena (05/09/2026)
  const scenesBlock = tokensSrc.match(/SCENES\s*:\s*SceneDef\[\]\s*=\s*\[([\s\S]*?)\n\];/);
  if (scenesBlock) {
    for (const m of scenesBlock[1].matchAll(/key:\s*"([^"]+)"[^}]*?stage:\s*"(\w+)"/g)) {
      stageByKey[m[1]] = m[2];
    }
    for (const m of scenesBlock[1].matchAll(/key:\s*"([^"]+)"[^}]*?palcoExcecao:\s*"([^"]+)"/g)) {
      excecaoByKey[m[1]] = m[2];
    }
  }

  // mapa cena -> componente, lido do SCENE_COMPONENTS do MotionStage
  const stageSrc = fs.readFileSync(stagePath, "utf8");
  const mapBlock = stageSrc.match(/SCENE_COMPONENTS[^=]*=\s*\{([\s\S]*?)\n\};/);
  if (!mapBlock) return;
  const compByKey = {};
  for (const m of mapBlock[1].matchAll(/"?([\w-]+)"?\s*:\s*(\w+)\s*,/g)) compByKey[m[1]] = m[2];

  // CONTENT_H exportado por arquivo, e quais componentes cada arquivo exporta
  const contentH = {}; // nomeDoComponente -> { h, rel }
  for (const file of files) {
    if (!file.includes(`${path.sep}icons${path.sep}`)) continue;
    const src = fs.readFileSync(file, "utf8");
    // aceita literal (CONTENT_H = 320) ou referencia a constante numerica
    // do proprio arquivo (CONTENT_H = PHONE_H, com PHONE_H = 470 acima)
    let declaredH = null;
    const litMatch = src.match(/export const CONTENT_H\s*=\s*(\d+)/);
    if (litMatch) {
      declaredH = Number(litMatch[1]);
    } else {
      const refMatch = src.match(/export const CONTENT_H\s*=\s*(\w+)\s*;/);
      if (refMatch) {
        const constRe = new RegExp(`const ${refMatch[1]}\\s*=\\s*(\\d+(?:\\.\\d+)?)\\s*;`);
        const constMatch = src.match(constRe);
        if (constMatch) declaredH = Math.round(Number(constMatch[1]));
      }
    }
    const hMatch = declaredH === null ? null : [null, String(declaredH)];
    const rel = path.relative(COMP_DIR, file);
    for (const m of src.matchAll(/export const (\w+):\s*React\.FC/g)) {
      contentH[m[1]] = hMatch ? { h: Number(hMatch[1]), rel } : { h: null, rel };
    }
  }

  for (const scene of spec.scenes) {
    const compName = compByKey[scene.name];
    if (!compName) continue; // cena sem componente de palco (ex.: o fecho)
    const info = contentH[compName];
    if (!info) continue;
    if (info.h === null) {
      errAdd(
        "palco-overflow",
        `${info.rel}: componente de cena sem "export const CONTENT_H". A altura real e ` +
          `obrigatoria: sem ela o gate nao consegue comparar com a area util do palco, e ` +
          `colisao com a legenda passa batido (defeito real de 27/08/2026).`
      );
      continue;
    }
    const stage = stageByKey[scene.name] || "normal";
    const limit = safe[stage];
    if (limit && info.h > limit) {
      const excecao = excecaoByKey[scene.name];
      if (excecao) {
        warnAdd(
          "palco-overflow",
          `Cena "${scene.name}" (${info.rel}): CONTENT_H=${info.h}px passa ${info.h - limit}px da ` +
            `area util do palco "${stage}" (STAGE_SAFE.${stage}=${limit}px), com excecao declarada ` +
            `("${excecao}"). So aceita quando o excedente e recurso visual sem texto essencial pra ` +
            `ler (ordem do o dono do canal, 05/09/2026) — nao reprova, so avisa.`
        );
        continue;
      }
      errAdd(
        "palco-overflow",
        `Cena "${scene.name}" (${info.rel}): CONTENT_H=${info.h}px passa da area util do palco ` +
          `"${stage}" (STAGE_SAFE.${stage}=${limit}px). O excedente entra na faixa da legenda. ` +
          `Reduzir a altura do componente, trocar o stage da cena, ou declarar "palcoExcecao" em ` +
          `SCENES se o excedente for so recurso visual sem texto essencial pra ler.`
      );
    }
  }
}

/**
 * ritmo-de-cena: o gesto de uma cena nao pode terminar cedo demais e deixar
 * a tela parada por mais que o teto de leitura (achado do o dono do canal,
 * 05/09/2026: "a animacao foi muito rapida e ficou muito tempo na tela").
 *
 * Cada componente de cena PODE exportar `export const MOVIMENTO_ATE =
 * <quadro>` (mesmo padrao literal do CONTENT_H): o ultimo quadro LOCAL em
 * que ainda ha movimento real. `hold` = duracao da cena menos esse quadro.
 *
 * Cena SEM a declaracao so recebe aviso (nao reprova: peca legada, Hamilton
 * e ZeusTrafego e Bernardo nao tem isso ainda). Cena COM a declaracao e
 * hold acima do teto REPROVA (e o defeito real que ele achou). Hold abaixo
 * do piso so avisa: as vezes a cena e curta ou densa por causa de uma
 * ancora de fala real, e a fala sempre vence a regua (ERRO #330).
 */
function checkSceneRhythm(spec, files) {
  const stagePath = files.find((f) => f.endsWith(`${path.sep}MotionStage.tsx`));
  const tokensPath = path.join(COMP_DIR, "tokens.ts");
  if (!stagePath || !fs.existsSync(tokensPath)) return;

  const tokensSrc = fs.readFileSync(tokensPath, "utf8");
  const fpsMatch = tokensSrc.match(/export const FPS\s*=\s*(\d+)/);
  const fps = fpsMatch ? Number(fpsMatch[1]) : 60;

  const scenesBlock = tokensSrc.match(/SCENES\s*:\s*SceneDef\[\]\s*=\s*\[([\s\S]*?)\n\];/);
  if (!scenesBlock) return;
  const cenas = [];
  for (const m of scenesBlock[1].matchAll(/key:\s*"([^"]+)"[^}]*?start:\s*([\d.]+)[^}]*?end:\s*([\d.]+)/g)) {
    cenas.push({ key: m[1], start: Number(m[2]), end: Number(m[3]) });
  }

  const stageSrc = fs.readFileSync(stagePath, "utf8");
  const mapBlock = stageSrc.match(/SCENE_COMPONENTS[^=]*=\s*\{([\s\S]*?)\n\};/);
  if (!mapBlock) return;
  const compByKey = {};
  for (const m of mapBlock[1].matchAll(/"?([\w-]+)"?\s*:\s*(\w+)\s*,/g)) compByKey[m[1]] = m[2];

  // MOVIMENTO_ATE exportado por arquivo, mesmo padrao literal/referencia do CONTENT_H
  const movimentoAte = {};
  for (const file of files) {
    if (!file.includes(`${path.sep}icons${path.sep}`)) continue;
    const src = fs.readFileSync(file, "utf8");
    let valor = null;
    const litMatch = src.match(/export const MOVIMENTO_ATE\s*=\s*(\d+)/);
    if (litMatch) {
      valor = Number(litMatch[1]);
    } else {
      const refMatch = src.match(/export const MOVIMENTO_ATE\s*=\s*(\w+)\s*;/);
      if (refMatch) {
        const constRe = new RegExp(`const ${refMatch[1]}\\s*=\\s*(\\d+(?:\\.\\d+)?)\\s*;`);
        const constMatch = src.match(constRe);
        if (constMatch) valor = Math.round(Number(constMatch[1]));
      }
    }
    if (valor === null) continue;
    const rel = path.relative(COMP_DIR, file);
    for (const m of src.matchAll(/export const (\w+):\s*React\.FC/g)) {
      movimentoAte[m[1]] = { valor, rel };
    }
  }

  const HOLD_MIN = 60; // 1s a 60fps
  const HOLD_MAX = 150; // 2,5s a 60fps

  for (const cena of cenas) {
    const compName = compByKey[cena.key];
    if (!compName) continue;
    const duracaoFrames = Math.round((cena.end - cena.start) * fps);
    const info = movimentoAte[compName];
    if (!info) {
      warnAdd(
        "ritmo-de-cena",
        `Cena "${cena.key}" (${compName}): sem "export const MOVIMENTO_ATE". Sem essa declaracao o ` +
          `gate nao sabe se a animacao cobre o tempo da cena (nao reprova, so avisa: peca legada).`
      );
      continue;
    }
    const hold = duracaoFrames - info.valor;
    if (hold > HOLD_MAX) {
      errAdd(
        "ritmo-de-cena",
        `Cena "${cena.key}" (${info.rel}): sobram ${hold} quadros parados no fim (mais que o teto de ` +
          `${HOLD_MAX}, ~2,5s) — a animacao termina cedo e a tela fica morta esperando a proxima cena.`
      );
    } else if (hold < HOLD_MIN) {
      warnAdd(
        "ritmo-de-cena",
        `Cena "${cena.key}" (${info.rel}): so sobram ${hold} quadros parados no fim (menos que o piso ` +
          `de ${HOLD_MIN}, ~1s) — confirmar se e ancora de fala real antes de esticar mais.`
      );
    }
  }
}

/**
 * elemento-sem-tempo-de-leitura: elemento que entra e a cena acaba antes de
 * dar tempo de ver.
 *
 * ORIGEM (06/09/2026, ordem do o dono do canal vendo o CarlosSemeReels): o terceiro
 * no da sequencia de passos entrava em 14,70s e a cena acabava em 15,26s.
 * Meio segundo. Ele: "passa muito rapido... nao pode ter animacoes que a
 * gente nao consiga ver, tem que ver... talvez o dobro do tempo. Tem que
 * lembrar sempre que a pessoa tem que ver e conseguir entender".
 *
 * O gate de ritmo que ja existia mede o FIM do movimento contra o fim da
 * cena, e por isso nao pegava este caso: o movimento terminava dentro da
 * cena, so que sem sobrar tempo de leitura depois. Aqui a conta e outra:
 * cada ENTRADA de elemento (os frames do SFX_EVENTS, que sao os gestos de
 * verdade) precisa de tempo para assentar MAIS tempo para ser lida antes de
 * a cena virar.
 *
 * ASSENTAR = 40 quadros (entrada padrao dos moldes).
 * LER = 72 quadros (1,2s), o piso que ele chamou de "o dobro".
 */
function checkTempoDeLeitura(spec, files) {
  const ASSENTAR = 40;
  const LER = 72; // 1,2s: elemento NOVO precisa ser reconhecido e lido
  const DESTAQUE = 36; // 0,6s: enfase em elemento que ja esta na tela
  const stagePath = files.find((f) => f.endsWith(`${path.sep}MotionStage.tsx`));
  const tokensPath = path.join(COMP_DIR, "tokens.ts");
  if (!stagePath || !fs.existsSync(tokensPath)) return;

  const tokensSrc = fs.readFileSync(tokensPath, "utf8");
  const fpsMatch = tokensSrc.match(/export const FPS\s*=\s*(\d+)/);
  const fps = fpsMatch ? Number(fpsMatch[1]) : 60;
  const scenesBlock = tokensSrc.match(/SCENES\s*:\s*SceneDef\[\]\s*=\s*\[([\s\S]*?)\n\];/);
  if (!scenesBlock) return;
  const cenas = [];
  for (const m of scenesBlock[1].matchAll(
    /key:\s*"([^"]+)"[^}]*?start:\s*([\d.]+)[^}]*?end:\s*([\d.]+)/g
  )) {
    cenas.push({ key: m[1], start: Number(m[2]), end: Number(m[3]) });
  }

  const stageSrc = fs.readFileSync(stagePath, "utf8");
  const mapBlock = stageSrc.match(/SCENE_COMPONENTS[^=]*=\s*\{([\s\S]*?)\n\};/);
  if (!mapBlock) return;
  const compByKey = {};
  for (const m of mapBlock[1].matchAll(/"?([\w-]+)"?\s*:\s*(\w+)\s*,/g)) compByKey[m[1]] = m[2];

  const entradaTardia = {};
  for (const file of files) {
    if (!file.includes(`${path.sep}icons${path.sep}`)) continue;
    const src = fs.readFileSync(file, "utf8");
    const bloco = src.match(/export const SFX_EVENTS = \[([\s\S]*?)\]/);
    if (!bloco) continue;
    // Gestos que trazem um elemento NOVO para a tela pedem o piso cheio de
    // leitura. Gestos que so destacam algo que JA esta na tela (o anel, o
    // badge, o traco) pedem menos, porque o espectador nao precisa
    // reconhecer a forma de novo, so notar a enfase.
    const ENTRADA = /"(entrada|item|no|partida|chegada)"/;
    let maior = null;
    let maiorEhEntrada = false;
    for (const m of bloco[1].matchAll(/\{[^}]*frame:\s*(\d+)[^}]*\}/g)) {
      const f = Number(m[1]);
      if (maior === null || f > maior) {
        maior = f;
        maiorEhEntrada = ENTRADA.test(m[0]);
      }
    }
    if (maior === null) continue;
    const rel = path.relative(COMP_DIR, file);
    for (const m of src.matchAll(/export const (\w+):\s*React\.FC/g)) {
      entradaTardia[m[1]] = { frame: maior, rel, ehEntrada: maiorEhEntrada };
    }
  }

  for (const cena of cenas) {
    const compName = compByKey[cena.key];
    if (!compName) continue;
    const info = entradaTardia[compName];
    if (!info) continue;
    const duracaoFrames = Math.round((cena.end - cena.start) * fps);
    const piso = info.ehEntrada ? LER : DESTAQUE;
    const sobra = duracaoFrames - (info.frame + ASSENTAR);
    if (sobra < piso) {
      const msg =
        `Cena "${cena.key}" (${info.rel}): o ultimo elemento entra no quadro ${info.frame} e a cena ` +
        `dura ${duracaoFrames}. Depois de assentar sobram ${sobra} quadros ` +
        `(${(sobra / fps).toFixed(2)}s), menos que o piso de ${piso} para este gesto. ` +
        `Estique a cena ou antecipe o elemento.`;
      if (sobra < 24) errAdd("tempo-de-leitura", msg);
      else warnAdd("tempo-de-leitura", msg);
    }
  }
}

/**
 * traco-sem-compensacao: espessura declarada em unidade de viewBox rende
 * espessura DIFERENTE na tela quando o svg e exibido em escala != 1.
 *
 * Reclamacao literal do o dono do canal (27/08/2026): "as vezes um traco fica
 * fino, outro fica grosso, uma coisa mal feita, mal organizada". Medido:
 * VoicePlayer rendia ~1.0px e a moldura do chat ~3.4px com o MESMO token.
 *
 * Regra: em svg cujo width exibido difere do width do viewBox, toda
 * espessura passa por strokePx(token, escala) ou por uma divisao explicita.
 * Token cru (strokeWidth={STROKE.regular}) reprova.
 */
function checkStrokeScaleCompensation(files) {
  for (const file of files) {
    if (!file.includes(`${path.sep}icons${path.sep}`)) continue;
    const src = fs.readFileSync(file, "utf8");
    const rel = path.relative(COMP_DIR, file);

    // <svg width={N} ... viewBox="0 0 W H"> com N != W literal
    const svgRe = /<svg[^>]*width=\{(\d+)\}[^>]*viewBox="0 0 (\d+)[^"]*"/g;
    let scaled = false;
    for (const m of svgRe.exec(src) ? [svgRe.exec(src)] : []) {
      /* noop: substituido pelo laco abaixo */
    }
    svgRe.lastIndex = 0;
    let m;
    while ((m = svgRe.exec(src))) {
      if (Number(m[1]) !== Number(m[2])) scaled = true;
    }
    if (!scaled) continue;

    const lines = src.split("\n");
    lines.forEach((line, idx) => {
      if (line.includes("// escala-ok:")) return;
      const bad = /strokeWidth=\{(?:SW_\w+|STROKE\.\w+)\}/.test(line) && !line.includes("/");
      if (bad && /STROKE\.\w+/.test(line)) {
        errAdd(
          "traco-sem-compensacao",
          `${rel}:${idx + 1}: strokeWidth com token cru num SVG exibido em escala != 1. ` +
            `A espessura na tela sai diferente da dos outros componentes. Usar ` +
            `strokePx(STROKE.x, escalaDeExibicao) de drawUtils. Escape: "// escala-ok: <motivo>".`
        );
      }
    });
  }
}

/**
 * lacuna-antes-da-primeira-cena: defeito real de 27/08/2026 (8a rodada) —
 * "no primeiro segundo os cards deram um pulo". A primeira cena so
 * comecava na palavra-ancora (0.94s), e o LOOKUP de cena (sceneAtFrame/
 * sceneIndexAt em tokens.ts) tinha um fallback que devolvia a ULTIMA cena
 * pra frame ANTES da primeira. Como a penultima cena era "expanded", o
 * palco calculava a transicao errada nos frames orfaos e saltava de
 * tamanho no frame em que a primeira cena finalmente comecava.
 *
 * Este check e um AVISO (nao erro: pode ser intencional ter alguns frames
 * de tela limpa antes da fala comecar), mas obriga a checar que o lookup
 * trata esse intervalo explicitamente — nunca via fallback pra ultima cena.
 */
function checkGapBeforeFirstScene(spec, files) {
  const tokensPath = path.join(COMP_DIR, "tokens.ts");
  if (!fs.existsSync(tokensPath)) return;
  const tokensSrc = fs.readFileSync(tokensPath, "utf8");
  const scenesBlock = tokensSrc.match(/SCENES\s*:\s*SceneDef\[\]\s*=\s*\[([\s\S]*?)\n\];/);
  if (!scenesBlock) return;
  const firstStart = scenesBlock[1].match(/start:\s*([\d.]+)/);
  if (!firstStart || Number(firstStart[1]) <= 0) return; // sem lacuna, nada a checar

  const hasExplicitGuard =
    /if\s*\(\s*t\s*<\s*SCENES\[0\]\.start\s*\)/.test(tokensSrc);
  if (!hasExplicitGuard) {
    warnAdd(
      "lacuna-antes-da-primeira-cena",
      `tokens.ts: SCENES[0].start=${firstStart[1]}s (a primeira cena so comeca depois do frame 0), ` +
        `mas nenhum guard explicito "t < SCENES[0].start" foi achado em sceneAtFrame/sceneIndexAt. ` +
        `Sem isso, o fallback padrao devolve a ULTIMA cena pros frames orfaos, e se ela for "expanded" ` +
        `o palco pula de tamanho quando a primeira cena comeca (defeito real, 27/08/2026).`
    );
  }
}


/* ==================================================================
 * FISCAIS DO MANUAL DE MOTION v3.0 (08/09/2026)
 *
 * O checklist de aprovacao de cena (§12 do MOTION-MANUAL) vira gate. Os
 * tres primeiros leem o proprio choreography.ts, entao rodam sem montar
 * o bundle. Severidade depende do `motionVersion` do spec: peca que
 * declara 3 e REPROVADA; peca antiga (ausente ou 2) so recebe aviso,
 * porque mudar o movimento dela agora reescreveria video ja aprovado.
 * ================================================================== */

const STAGGER_CAP_V3 = 24;
const DESLOCAMENTO_MAX_V3 = 16;
const CURVAS_V3 = [
  "settleV3",
  "smoothV3",
  "settleSoftV3",
  "easyV3",
  "anticipate",
  "overshootMicro",
  "brake",
  "gravity",
  "lift",
  "linear",
];

const ehV3 = (spec) => spec.motionVersion === 3;
const addPorVersao = (spec, check, msg) => (ehV3(spec) ? errAdd(check, msg) : warnAdd(check, msg));

/** §5.2 — a cascata inteira nunca passa de 24 quadros. */
function checkTetoDeCascata(spec) {
  for (const cena of spec.scenes || []) {
    for (const el of cena.elements || []) {
      const n = el.children && el.children.count;
      const step = el.children && el.children.staggerF;
      if (!n || n <= 1 || !step) continue;
      const total = step * (n - 1);
      if (total > STAGGER_CAP_V3) {
        const sugerido = Math.max(1, Math.min(step, STAGGER_CAP_V3 / (n - 1)));
        addPorVersao(
          spec,
          "teto-de-cascata",
          `${cena.name}/${el.id}: cascata de ${total}q (${n} irmaos x passo ${step}q) acima do teto de ` +
            `${STAGGER_CAP_V3}q. A fala vai embora antes de a cascata acabar. Passo maximo aqui: ` +
            `${sugerido.toFixed(1)}q (use childDelayComTeto de core/choreo.ts).`,
        );
      }
    }
  }
}

/** §1 — deslocamento de entrada e saida ate 16px. Acima disso le como PowerPoint. */
function checkAmplitudeV3(spec) {
  for (const cena of spec.scenes || []) {
    for (const el of cena.elements || []) {
      for (const fase of ["entry", "exit"]) {
        const mov = el[fase];
        if (!mov || typeof mov.distance !== "number") continue;
        if (mov.distance > DESLOCAMENTO_MAX_V3) {
          addPorVersao(
            spec,
            "amplitude-v3",
            `${cena.name}/${el.id} (${fase}): deslocamento de ${mov.distance}px acima do teto de ` +
              `${DESLOCAMENTO_MAX_V3}px do manual v3. Amplitude pequena com a curva certa le como caro; ` +
              `amplitude grande le como PowerPoint.`,
          );
        }
      }
    }
  }
}

/** §2 — peca v3 escreve curva do vocabulario v3, nunca a de sensacao antiga. */
function checkVocabularioDeCurva(spec) {
  if (!ehV3(spec)) return;
  for (const cena of spec.scenes || []) {
    for (const el of cena.elements || []) {
      for (const fase of ["entry", "exit"]) {
        const mov = el[fase];
        if (!mov || !mov.ease) continue;
        if (!CURVAS_V3.includes(mov.ease)) {
          errAdd(
            "vocabulario-de-curva-v3",
            `${cena.name}/${el.id} (${fase}): curva "${mov.ease}" nao pertence ao vocabulario v3. ` +
              `Entra = settleV3 · troca de lugar = smoothV3 · revela = settleSoftV3 · sai = easyV3. ` +
              `Camada avancada so com intencao: ${CURVAS_V3.slice(4).join(", ")}.`,
          );
        }
      }
    }
  }
}

/**
 * §4 — sincronia pela silaba tonica. O manual proibe ancorar o gesto no
 * inicio da frase. Aqui o gate e de PROCESSO: peca v3 precisa ter o
 * arquivo de palavras alinhadas (narration/words) na propria pasta, senao
 * nao existe tonica pra ancorar e a cena vira chute.
 */
function checkSincroniaTonica(spec, files) {
  if (!ehV3(spec)) return;
  const temTiming = files.some((f) => /(words|narration|timing)[^\/]*\.json$/i.test(f));
  if (!temTiming) {
    errAdd(
      "sincronia-tonica",
      "peca declara motionVersion 3 mas nao tem arquivo de palavras alinhadas na pasta " +
        "(words/narration/timing .json). Sem a silaba tonica o gesto nao tem onde ancorar: " +
        "o fallback do manual e hold estatico, nunca chute.",
    );
  }
}

function main() {
  const choreographyPath = findChoreographyFile(COMP_DIR);
  if (!choreographyPath) {
    if (AS_JSON) {
      console.log(JSON.stringify({ composition: COMPOSITION, hasSpec: false, findings: [] }));
    } else {
      console.log(`[choreo-lint] ${COMPOSITION}: sem choreography.ts, nada a checar aqui.`);
    }
    process.exit(0);
  }

  let spec;
  try {
    spec = loadSpec(choreographyPath);
  } catch (e) {
    errAdd("spec-invalido", e.message);
    report();
    process.exit(1);
  }

  checkRepeatedHeroDirection(spec);
  checkMissingStagger(spec);
  checkHierarchyDelay(spec);
  checkMonotonousLayout(spec);
  checkTetoDeCascata(spec);
  checkAmplitudeV3(spec);
  checkVocabularioDeCurva(spec);

  const files = listSourceFiles(COMP_DIR);
  checkLinearContinuousMotion(files);
  checkDoubleMotion(spec, files);
  checkDeprecatedComponents(files);
  checkAnimationBeyondExit(spec, files);
  checkTinyIconText(files);
  checkMissingAccents(files);
  checkSquareStroke(files);
  checkRawInlineMotion(files);
  checkCoreImport(files);
  checkHardcodedColor(files);
  checkStageOverflow(spec, files);
  checkPalcoDesloca(spec, files);
  checkAnelSemForma(files);
  checkEscalaDeCirculo(files);
  checkLarguraDaLinha(files);
  checkIntervaloMorto(files);
  checkAcentoLimite();
  checkSceneRhythm(spec, files);
  checkTempoDeLeitura(spec, files);
  checkStrokeScaleCompensation(files);
  checkGapBeforeFirstScene(spec, files);
  checkSincroniaTonica(spec, files);
  checkSfx();
  // Gate 06/09/2026: compara a geometria implementada com a do build-registry
  // do design system 3.1. Cena sem o campo molde nao e checada (legado).
  try {
    const { checarBuildRegistry } = require("./checar-build-registry");
    checarBuildRegistry({
      compDir: COMP_DIR,
      composition: COMPOSITION,
      errAdd,
      warnAdd,
      infoAdd: (check, message) => findings.push({ level: "info", check, message }),
    });
  } catch (e) {
    warnAdd("build-registry", 'gate do design system nao rodou: ' + e.message);
  }

  report();
  const hasErrors = findings.some((f) => f.level === "error");
  process.exit(hasErrors ? 1 : 0);
}


/**
 * checkSfx — os gestos com som declarados batem com o codigo e com o catalogo.
 *
 * BLOQUEIA O RENDER de proposito: tudo que este check pega se corrige no
 * codigo, e sem render novo a correcao nao vale. O que se resolve so no audio
 * (densidade, nivel, cauda invadindo cena) NAO mora aqui, mora no mixer.
 *
 * Vem da produção do PauloRuizReels, 24 versoes, em que a mesma classe de erro
 * voltou tres vezes: som de categoria trocado entre duas aparicoes, serie com
 * som so no primeiro item, frame de gesto desencontrado do delay da animacao.
 */
function checkSfx() {
  const semSfx = require("./lib/legacy-allowlist.json").sfxEvents.allowed;
  if (semSfx.includes(COMPOSITION)) return;

  // Composition recém-criada pelo scaffold ainda não tem cenas montadas, então
  // não tem como ter mapa de som. Isso é peça em branco, não defeito: cobrar
  // som de quem ainda não tem cena reprova todo lote no primeiro passo.
  const fs2 = require("fs");
  const path2 = require("path");
  const stage = path2.join(__dirname, "..", "src", "compositions", COMPOSITION, "components", "MotionStage.tsx");
  if (!fs2.existsSync(stage)) {
    warnAdd("sfx", "composition ainda sem MotionStage.tsx: peca em branco, som sera cobrado quando as cenas existirem");
    return;
  }

  let r;
  try {
    r = require("./lib/sfx-mapa.js").validarParaLint(COMPOSITION);
  } catch (e) {
    warnAdd("sfx-mapa", `nao consegui montar o mapa de som: ${e.message}`);
    return;
  }
  for (const msg of r.erros) errAdd("sfx", msg);
  for (const msg of r.avisos) warnAdd("sfx", msg);
}

function report() {
  if (AS_JSON) {
    console.log(JSON.stringify({ composition: COMPOSITION, hasSpec: true, findings }, null, 2));
    return;
  }
  console.log(`\n[choreo-lint] ${COMPOSITION}`);
  if (findings.length === 0) {
    console.log("  OK — nenhum problema de composicao encontrado.");
    return;
  }
  for (const f of findings) {
    const tag = f.level === "error" ? "[ERRO]" : "[AVISO]";
    console.log(`  ${tag} (${f.check}) ${f.message}`);
  }
  const errors = findings.filter((f) => f.level === "error").length;
  const warns = findings.filter((f) => f.level === "warn").length;
  console.log(`  Total: ${errors} erro(s), ${warns} aviso(s).`);
}

main();
