#!/usr/bin/env node
/**
 * render.js v5 — gate visual obrigatorio pra composicao com spec (reforma
 * do motion design system, 19/08/2026)
 *
 * Historico: v4 (reforma M0) trouxe bundle unico via @remotion/renderer,
 * output no OUTPUT-PROTOCOL, sem Date.now, pre-render-validate antes.
 *
 * O QUE MUDOU NA v5: depois do pre-render-validate passar, TODO render
 * (draft e final) roda scripts/qa-frames.js e imprime o caminho do
 * checklist — evidencia visual sempre gerada, mesmo pra composicao legada.
 * Render FINAL de composicao COM choreography.ts (nao-legada) exige mais:
 * output/_qa/<Comp>/approval.json com hash de src/ batendo o atual e as 5
 * notas fundamentais >= 8 (gravado por scripts/qa-approve.js depois de um
 * agente inspecionar os frames). Sem isso, aborta ANTES de gastar o render
 * final. Composicao legada (allowlist) fica isenta dessa exigencia — ela
 * so gera a evidencia, nunca bloqueia.
 *
 * Uso:
 *   node scripts/render.js <Composition> [draft|final] [Campanha]
 *   node scripts/render.js <Composition> --mode [draft|final] [Campanha]  (aceito desde v6, mesmo resultado)
 *   node scripts/render.js --list            # lista as comps registradas
 *
 * Exemplos:
 *   node scripts/render.js GroovyMotion draft
 *   node scripts/render.js ExemploCaptura final ExemploJulho
 *   node scripts/render.js ExemploCaptura --mode final ExemploJulho
 */

const path = require("path");
const fs = require("fs");
const { execFileSync } = require("child_process");
const { hashSrc } = require("./lib/get-compositions");
const { findChoreographyFile } = require("./lib/load-choreography");

const ROOT = path.resolve(__dirname, ".."); // squads/motion
/**
 * Entrada do bundle.
 *
 * Por padrao e o `src/index.ts`, que registra as 47 compositions. Quando
 * existe um `src/_root-<slug>.tsx` para a composition pedida, ele vence.
 *
 * Motivo (06/09/2026): o bundler compila TUDO que o Root importa, entao uma
 * peca em edicao por outra sessao derruba o render de qualquer outra. Isso
 * aconteceu tres vezes em poucos minutos (arquivo faltando no
 * AlineZeusReels, narration.json ausente no ClodoaldoZeusReels). Com a
 * entrada isolada, o bundle depende so do que a peca importa.
 */
const slugDoEntry = (nome) =>
  nome.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const entryIsolado = (nome) =>
  path.join(ROOT, "src", `_root-${slugDoEntry(nome)}.tsx`);
const OUTPUT_BASE = path.join(ROOT, "output");
const QA_BASE = path.join(ROOT, "output", "_qa");
const COMPOSITIONS_DIR = path.join(ROOT, "src", "compositions");
const ALLOWLIST = JSON.parse(fs.readFileSync(path.join(__dirname, "lib", "legacy-allowlist.json"), "utf8"));

function fail(msg) {
  console.error("Erro: " + msg);
  process.exit(1);
}

/** Próximo caminho de saída vNN (auto-incremento) conforme OUTPUT-PROTOCOL.md. */
function nextOutputPath(campanha, comp) {
  const dir = path.join(OUTPUT_BASE, campanha);
  fs.mkdirSync(dir, { recursive: true });
  const re = new RegExp(`^${comp}-v(\\d+)\\.mp4$`);
  let maxN = 0;
  for (const f of fs.readdirSync(dir)) {
    const m = f.match(re);
    if (m) maxN = Math.max(maxN, parseInt(m[1], 10));
  }
  const vNN = String(maxN + 1).padStart(2, "0");
  return path.join(dir, `${comp}-v${vNN}.mp4`);
}

/**
 * Aviso (nunca bloqueia): se a composition tem um audio-final.wav processado
 * em public/<Comp>/ (convencao usada quando ha narracao/voz real gravada,
 * ver docs/zeus-motion-design-system.md), mas o video renderizado saiu quase
 * mudo, avisa. renderMedia() NUNCA mixa esse audio sozinho — Audio component
 * e proibido dentro da composition (regra do squad), a mixagem e sempre um
 * passo de ffmpeg SEPARADO, manual, depois do render. Erro real cometido
 * nesta sessao (20/08/2026): renderizei ZeusTrafegoReels de novo, esqueci
 * desse passo, entreguei um video sem a voz das pessoas. So achei porque o
 * o dono do canal reportou "nao saiu o som".
 */
function warnIfAudioMissing(composition, outputFile) {
  const audioFinalPath = path.join(ROOT, "public", composition, "audio-final.wav");
  if (!fs.existsSync(audioFinalPath)) return;

  // ffmpeg com "-f null -" tipicamente TERMINA COM SUCESSO (exit 0) e
  // escreve o volumedetect no stderr independente do exit code — nunca
  // depender de try/catch pra capturar isso, ler o stderr direto.
  const { spawnSync } = require("child_process");
  const result = spawnSync("ffmpeg", ["-i", outputFile, "-af", "volumedetect", "-f", "null", "-"], {
    encoding: "utf8",
  });
  const out = (result.stderr || "") + (result.stdout || "");
  const m = out.match(/mean_volume:\s*(-?\d+(\.\d+)?)\s*dB/);
  const meanDb = m ? parseFloat(m[1]) : null;
  if (meanDb !== null && meanDb < -50) {
    console.log(
      `\n[AVISO AUDIO] ${composition} tem public/${composition}/audio-final.wav (audio processado ` +
        `de voz/narracao real), mas o video renderizado esta quase mudo (mean_volume ${meanDb}dB). ` +
        `Falta mixar: ver secao "Audio" da memoria do projeto ou a nota tecnica deste arquivo. ` +
        `Comando tipico: ffmpeg -i ${path.basename(outputFile)} -i public/${composition}/audio-final.wav ` +
        `-filter_complex "[1:a]adelay=<HOOK_MS>|<HOOK_MS>,apad[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -shortest <saida>.mp4` +
        `\n[AVISO AUDIO] O 'apad' nao e opcional: nestas pecas o video e mais LONGO que a fala ` +
        `(o fecho e imagem sem voz). Sem ele, o -shortest corta o video no fim da ultima palavra e ` +
        `come o fecho inteiro, num defeito silencioso: o arquivo abre, toca e parece certo. ` +
        `Depois de mixar, CONFERIR a duracao do arquivo contra a duracao da composicao ` +
        `(diferenca acima de 0,2s reprova). Origem: ERRO #329 em memory/erros-aprendidos.md.`
    );
  }
}

/**
 * TRAVA CONTRA RENDER CONCORRENTE (ERRO #335, 03/09/2026).
 * Dois renders da mesma peca ao mesmo tempo brigam pela mesma pasta de saida
 * e pelo Chrome headless: o gate de frames morre no meio com um erro de fluxo
 * de dados que nao diz nada sobre a causa real, e se perde tempo procurando
 * defeito na peca. A trava e um arquivo com o PID e a hora; ela some sozinha
 * no fim do render, inclusive quando ele falha.
 */
const LOCK_DIR = path.join(ROOT, "output", "_locks");

function caminhoTrava(composition) {
  return path.join(LOCK_DIR, `${composition}.lock`);
}

function travar(composition) {
  fs.mkdirSync(LOCK_DIR, { recursive: true });
  const lock = caminhoTrava(composition);
  if (fs.existsSync(lock)) {
    let info = {};
    try {
      info = JSON.parse(fs.readFileSync(lock, "utf8"));
    } catch (e) {
      info = {};
    }
    const vivo = info.pid && processoVivo(info.pid);
    if (vivo) {
      const desde = info.inicio ? Math.round((Date.now() - info.inicio) / 1000) : "?";
      fail(
        `ja existe um render de ${composition} rodando (pid ${info.pid}, comecou ha ${desde}s). ` +
          `  Espere ele terminar. Se tiver certeza que morreu, apague: ${lock}`
      );
    }
    // trava orfa (processo morreu sem limpar): pode seguir
    fs.unlinkSync(lock);
  }
  fs.writeFileSync(lock, JSON.stringify({ pid: process.pid, inicio: Date.now(), composition }));
  const soltar = () => {
    try {
      if (fs.existsSync(lock)) fs.unlinkSync(lock);
    } catch (e) {
      /* nada a fazer */
    }
  };
  process.on("exit", soltar);
  process.on("SIGINT", () => {
    soltar();
    process.exit(130);
  });
  process.on("uncaughtException", (err) => {
    soltar();
    console.error("Erro ao renderizar: " + err.message);
    process.exit(1);
  });
}

function processoVivo(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (e) {
    return false;
  }
}

async function main() {
  const args = process.argv.slice(2);

  const { bundle } = require("@remotion/bundler");
  const { selectComposition, renderMedia, getCompositions } = require("@remotion/renderer");

  console.log("Empacotando o projeto (bundle)...");
  // o nome vem direto do argumento: a variavel `composition` so nasce
  // depois, e o bundle acontece antes dela
  const isolado = entryIsolado(args[0] || "");
  const usarIsolado = fs.existsSync(isolado);
  if (usarIsolado) {
    console.log(`  usando a entrada isolada ${path.basename(isolado)} (bundle so desta peca)`);
  }
  const serveUrl = await bundle({
    entryPoint: usarIsolado ? isolado : path.join(ROOT, "src", "index.ts"),
  });

  if (args.includes("--list") || args.length === 0) {
    const comps = await getCompositions(serveUrl);
    console.log(`\n${comps.length} compositions registradas:`);
    for (const c of comps) {
      console.log(`  ${c.id.padEnd(28)} ${c.durationInFrames}f  ${c.width}x${c.height}`);
    }
    console.log("\nUso: node scripts/render.js <Composition> [draft|final] [Campanha]");
    return;
  }

  // "final"/"draft" e sempre posicional (args[1]), mas "--mode final" e um
  // erro de digitacao facil de cometer (o proprio autor deste script errou
  // assim em 20/08/2026: o render "final" caiu silenciosamente em modo
  // draft, sem approval.json checado, porque args[1] virou "--mode" em vez
  // de "final"). Aceita as duas formas: se "--mode" aparecer em qualquer
  // posicao, remove ele e o valor seguinte da lista antes de interpretar o
  // resto como posicional, pra nunca mais falhar calado desse jeito.
  const modeFlagIdx = args.indexOf("--mode");
  const usedModeFlag = modeFlagIdx !== -1;
  let positionalArgs = args;
  let modeFromFlag = null;
  if (usedModeFlag) {
    modeFromFlag = args[modeFlagIdx + 1];
    // remove "--mode X" da lista: o que sobra e so [composition, campanha?]
    positionalArgs = [...args.slice(0, modeFlagIdx), ...args.slice(modeFlagIdx + 2)];
  }

  const composition = positionalArgs[0];
  // sem --mode: uso classico [Composition, draft|final, Campanha?] — mode
  // ocupa positionalArgs[1] e campanha vem depois, em [2].
  // com --mode: mode ja saiu da lista — campanha vira positionalArgs[1].
  const mode = (usedModeFlag ? modeFromFlag : positionalArgs[1]) === "final" ? "final" : "draft";
  const campanha = (usedModeFlag ? positionalArgs[1] : positionalArgs[2]) || composition;

  // Trava antes de qualquer trabalho pesado: dois renders da mesma peca
  // brigam pela pasta de saida e pelo Chrome headless (ERRO #335).
  travar(composition);

  // Valida a composition contra o bundle REAL (nunca mapa manual)
  const comps = await getCompositions(serveUrl);
  const meta = comps.find((c) => c.id === composition);
  if (!meta) {
    console.error(`Composition "${composition}" nao registrada.`);
    console.error(`Disponiveis (${comps.length}): ${comps.map((c) => c.id).join(", ")}`);
    process.exit(1);
  }

  // Gate de marca: no pacote licenciado, o vídeo só sai com a marca de quem
  // está usando. No repositório de origem este gate apenas avisa.
  try {
    execFileSync("node", [path.join(__dirname, "marca-check.js")], {
      stdio: "inherit",
      cwd: ROOT,
    });
  } catch (e) {
    fail("A marca do vídeo ainda não foi configurada. Rode o passo Marca no vídeo antes de renderizar.");
  }

  // Gate obrigatório: pre-render-validate (aborta em exit != 0, exceto avisos)
  console.log(`\nRodando pre-render-validate para ${composition}...`);
  try {
    execFileSync("node", [path.join(__dirname, "pre-render-validate.js"), composition], {
      stdio: "inherit",
      cwd: ROOT,
    });
  } catch (e) {
    fail("pre-render-validate REPROVOU. Corrija os erros antes de renderizar.");
  }

  // Gate visual: SEMPRE gera evidencia (draft e final). Composicao COM
  // choreography.ts (nao-legada) precisa, alem disso, de approval.json
  // valido antes do render FINAL (regra: nota < 8 em fundamental reprova).
  console.log(`\nRodando qa-frames para ${composition}...`);
  try {
    execFileSync("node", [path.join(__dirname, "qa-frames.js"), composition], {
      stdio: "inherit",
      cwd: ROOT,
    });
  } catch (e) {
    fail("qa-frames falhou ao gerar os frames de evidencia.");
  }

  const compDir = path.join(COMPOSITIONS_DIR, composition);
  const hasSpec = Boolean(findChoreographyFile(compDir));
  const isLegacy = ALLOWLIST.noSpec.includes(composition);

  if (mode === "final" && hasSpec && !isLegacy) {
    const approvalPath = path.join(QA_BASE, composition, "approval.json");
    if (!fs.existsSync(approvalPath)) {
      fail(
        `render FINAL de "${composition}" exige aprovacao visual registrada. ` +
          `Inspecionar os frames em output/_qa/${composition}/ e rodar: ` +
          `node scripts/qa-approve.js ${composition} --scores F1=..,F2=..,F3=..,F4=..,F5=..`
      );
    }
    const approval = JSON.parse(fs.readFileSync(approvalPath, "utf8"));
    const currentHash = hashSrc(composition);
    if (approval.srcHash !== currentHash) {
      fail(
        `aprovacao visual de "${composition}" esta DESATUALIZADA (o codigo mudou desde a ` +
          `aprovacao). Rodar qa-frames + qa-approve de novo antes do render final.`
      );
    }
    if (approval.verdict !== "aprovado") {
      fail(
        `aprovacao visual de "${composition}" registrada como REPROVADA (falhou em: ` +
          `${(approval.failing || []).join(", ")}). Corrigir e aprovar de novo.`
      );
    }
    console.log(`Aprovacao visual OK (${approval.approvedAt}): ${JSON.stringify(approval.scores)}`);
  } else if (mode === "final" && isLegacy) {
    // Politica de migracao no toque (Fase 6 da auditoria audiovisual, 27/08/2026):
    // legada so migra quando re-renderizada por demanda real. Este e o momento exato
    // disso acontecer, entao avisa uma vez, nao bloqueia.
    console.log(
      `[AVISO] "${composition}" e legada, renderizando SEM gate de aprovacao. Se este ` +
        `video vai ao ar, considerar migrar pra choreography.ts (ver zeus-motion-design-system.md).`
    );
  }

  const outputFile = nextOutputPath(campanha, composition);
  const scale = mode === "draft" ? 0.5 : 1;
  const jpegQuality = mode === "draft" ? 80 : 95;

  console.log(`\nRenderizando ${composition} (modo ${mode}, scale ${scale})`);
  console.log(`Saida: ${outputFile}`);

  const selected = await selectComposition({ serveUrl, id: composition });

  // REMOTION_CONCURRENCY (opcional, env var): contorna flakiness real de
  // "Compositor error: No frame found at position X" / proxy 500 sob
  // muitas tabs paralelas disputando o servidor local (visto em
  // HamiltonZeusReels, 3 falhas seguidas em posicoes/tempos diferentes,
  // sempre nos primeiros segundos do video, nunca perto de um limite real
  // de frame). Sem a env var, comportamento identico ao de sempre
  // (concurrency default do Remotion).
  const concurrencyOverride = process.env.REMOTION_CONCURRENCY
    ? Number(process.env.REMOTION_CONCURRENCY)
    : undefined;

  // Tento anterior (03/09/2026, HamiltonZeusReels) mostrou que baixar so a
  // concurrency nao bastava com a maquina critica de RAM (visto 1-3GB
  // livres de 32GB durante a producao): o cache padrao de video do
  // compositor (centenas de MB por instancia) e a causa mais provavel do
  // "Compositor error: No frame found at position X" / proxy 500 sob
  // pressao real de memoria, nao so contencao entre tabs paralelas. Cache
  // e threads de decodificacao menores por padrao (SEM precisar de env
  // var), pra qualquer render futuro nessa mesma condicao.
  await renderMedia({
    serveUrl,
    composition: selected,
    codec: "h264",
    outputLocation: outputFile,
    scale,
    jpegQuality,
    offthreadVideoCacheSizeInBytes: 128 * 1024 * 1024,
    offthreadVideoThreads: 1,
    ...(concurrencyOverride ? { concurrency: concurrencyOverride } : {}),
    onProgress: ({ progress }) => {
      process.stdout.write(`\r  ${Math.round(progress * 100)}%   `);
    },
  });

  // Verificação de entrega (OUTPUT-PROTOCOL.md): existe e tem tamanho real
  process.stdout.write("\n");
  if (!fs.existsSync(outputFile)) fail("render terminou mas o arquivo nao existe.");
  const sizeKB = Math.round(fs.statSync(outputFile).size / 1024);
  if (sizeKB < 100) fail(`arquivo suspeito (${sizeKB}KB < 100KB). Investigar.`);

  warnIfAudioMissing(composition, outputFile);

  console.log(`\nPronto. Video em: ${outputFile} (${sizeKB}KB)`);

  // Indexação no Zeus Atlas (Fase 3 da auditoria audiovisual, 27/08/2026).
  // Roda DEPOIS da entrega verificada e só em final. Avisa e segue em qualquer falha:
  // o vídeo já existe, e Atlas fora do ar não pode transformar entrega boa em erro.
  if (mode === "final") {
    try {
      const { registrarRender } = require("./lib/atlas-register");
      const r = registrarRender({
        composition,
        arquivo: outputFile,
        campanha,
        srcHash: hashSrc(composition),
      });
      if (r.ok && r.acao === "criada") {
        console.log(`Atlas: ficha criada em ${r.ficha}`);
        console.log(`  RASCUNHO: falta as frases que voce usa pra pedir essa peca. Rode:`);
        console.log(`  node scripts/atlas/catalog.js --alias "a frase dele" --to ${r.slug}`);
      } else if (r.ok) {
        console.log(`Atlas: ficha ${r.acao} (${r.ficha})`);
      } else {
        console.log(`Atlas: nao indexado (${r.aviso}). O video esta entregue; so a ficha faltou.`);
      }
    } catch (e) {
      console.log(`Atlas: nao indexado (${e.message}). O video esta entregue.`);
    }
  }
}

main().catch((e) => {
  console.error("\nErro ao renderizar:", e.message);
  process.exit(1);
});
