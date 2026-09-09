#!/usr/bin/env node
/**
 * storyboard.js, a folha de storyboard conceitual de uma composition.
 *
 * POR QUE ESTE SCRIPT EXISTE: ate agora o dono so conseguia opinar sobre um
 * reel depois do video pronto, e cada correcao custava cerca de 15 minutos de
 * render. Numa unica semana foram 7 rodadas de render so pra ajustar decisao
 * de direcao (qual cena entra em qual palavra, quanto tempo cada beat segura,
 * qual objeto e o protagonista). Nada disso precisa de pixel: ja esta escrito
 * no codigo da composition. Este script le esse codigo e monta uma FOLHA
 * LEGIVEL, pra aprovar o roteiro ANTES de qualquer render.
 *
 * O dado mais valioso da folha nao e a tabela, e a secao "Por que, cena a
 * cena": o comentario que fica logo acima de cada entrada de SCENES, onde
 * mora a decisao de direcao ("esta cena entra na palavra X porque...").
 *
 * O que ele le (tudo por leitura de texto, nunca importando TypeScript):
 *   1. tokens.ts        SCENES (chave, start, end, stage, caption) e o
 *                       comentario imediatamente acima de cada entrada,
 *                       mais FPS, TOTAL_FRAMES e STAGE_SAFE.
 *                       Mesmo metodo do scripts/video/qa-beats.js.
 *   2. choreography.ts  via lib/load-choreography.js (from, dur, exitF,
 *                       entry, exit, children).
 *   3. MotionStage.tsx  o mapa SCENE_COMPONENTS e os imports de cada
 *                       componente.
 *   4. componentes      o valor de `export const CONTENT_H`.
 *   5. narration.json   as palavras com start e end (ancora e fala coberta).
 *
 * Uso:
 *   node scripts/storyboard.js <Composition> [--out <caminho>] [--json]
 *   node scripts/storyboard.js HamiltonZeusReels
 *
 * Saida: output/<Campanha>/<Composition>-storyboard-vNN.md, com
 * auto-incremento de versao (mesma regra dos mp4). A campanha vem do --out
 * ou, na falta dele, da pasta de output que ja tem mp4 desta composition.
 *
 * Sobre o "hold": e o tempo em que a cena fica PARADA na tela, ou seja, do
 * fim da entrada ate o comeco da saida (exitF menos entry.dur). Nao se mede
 * pela duracao nominal do beat porque a janela real da cena ja inclui o
 * overlap que ela empresta pra cena seguinte; descontar o overlap daria hold
 * negativo em cena curta que esta perfeitamente correta.
 *
 * Este arquivo NAO usa Date.now() nem new Date(): a folha precisa sair
 * identica pra mesma entrada, pra dar pra comparar duas versoes.
 */

const fs = require("fs");
const path = require("path");

const MOTION = path.resolve(__dirname, "..");
const COMPOSITIONS_DIR = path.join(MOTION, "src", "compositions");
const OUTPUT_DIR = path.join(MOTION, "output");

const { resolveCompDir } = require("./lib/resolve-comp-dir.js");
const { loadSpec, findChoreographyFile } = require("./lib/load-choreography.js");
// leitura por texto compartilhada com o mapa de som (scripts/lib/sfx-mapa.js):
// duas leituras diferentes do mesmo arquivo viram duas fontes da verdade.
const LC = require("./lib/ler-composition.js");

/** teto do aviso de cena longa, em segundos (nunca reprova, ver ERRO #330). */
const HOLD_AVISO_S = 8;
/** tolerancia de casamento entre cena e palavra: 1 frame. */
const TOLERANCIA_FRAMES = 1;
/** teto do trecho de fala mostrado na tabela. */
const FALA_MAX_CHARS = 90;

function sair(msg) {
  console.error("Erro: " + msg);
  process.exit(1);
}

/* ------------------------------------------------------------------ *
 * 1 e 2. tokens.ts, MotionStage.tsx e os componentes
 *
 * A leitura por texto vive em scripts/lib/ler-composition.js, compartilhada
 * com o mapa de som. `lerCenas` recebe `sair` para manter o comportamento
 * antigo: a folha nao sai pela metade.
 * ------------------------------------------------------------------ */

const { blocoDeArray, blocoDeObjeto, numeroDaConst, lerStageSafe, lerTotalFrames,
        lerMapaDeCenas, lerImports, lerContentH } = LC;
const lerCenas = (src, caminho) => LC.lerCenas(src, caminho, sair);

/* ------------------------------------------------------------------ *
 * 3. narration.json
 * ------------------------------------------------------------------ */

function lerPalavras(compDir) {
  const p = path.join(compDir, "data", "narration.json");
  if (!fs.existsSync(p)) return [];
  const dados = JSON.parse(fs.readFileSync(p, "utf8"));
  return Array.isArray(dados.words) ? dados.words : [];
}

/* ------------------------------------------------------------------ *
 * 4. destino e versao
 * ------------------------------------------------------------------ */

/** pasta de output onde ja existem mp4 desta composition. */
function acharCampanha(composition) {
  if (!fs.existsSync(OUTPUT_DIR)) return null;
  const re = new RegExp(`^${composition}-.*\\.mp4$`);
  for (const nome of fs.readdirSync(OUTPUT_DIR)) {
    const dir = path.join(OUTPUT_DIR, nome);
    if (!fs.statSync(dir).isDirectory()) continue;
    if (fs.readdirSync(dir).some((f) => re.test(f))) return dir;
  }
  return null;
}

/** proxima versao livre de <Comp>-storyboard-vNN.md dentro de uma pasta. */
function proximaVersao(dir, composition) {
  let maior = 0;
  if (fs.existsSync(dir)) {
    const re = new RegExp(`^${composition}-storyboard-v(\\d+)\\.md$`);
    for (const f of fs.readdirSync(dir)) {
      const m = f.match(re);
      if (m) maior = Math.max(maior, parseInt(m[1], 10));
    }
  }
  return maior + 1;
}

/* ------------------------------------------------------------------ *
 * 5. montagem
 * ------------------------------------------------------------------ */

const s2 = (v) => v.toFixed(2);

function truncar(txt, max) {
  if (txt.length <= max) return txt;
  return txt.slice(0, max - 3).trimEnd() + "...";
}

function montar(composition) {
  const compDir = resolveCompDir(COMPOSITIONS_DIR, composition);
  if (!fs.existsSync(compDir)) sair(`nao achei a composition ${composition} em ${COMPOSITIONS_DIR}`);

  const tokensPath = path.join(compDir, "tokens.ts");
  if (!fs.existsSync(tokensPath)) sair(`nao achei ${tokensPath}`);
  const tokensSrc = fs.readFileSync(tokensPath, "utf8");

  const fps = numeroDaConst(tokensSrc, "FPS") || 60;
  const totalFrames = lerTotalFrames(tokensSrc);
  const stageSafe = lerStageSafe(tokensSrc);
  const cenas = lerCenas(tokensSrc, tokensPath);
  const temCaption = cenas.some((c) => c.caption !== null);

  const choreoPath = findChoreographyFile(compDir);
  if (!choreoPath) sair(`nao achei choreography.ts em ${compDir}`);
  let spec;
  try {
    spec = loadSpec(choreoPath);
  } catch (e) {
    sair(`nao consegui ler a coreografia: ${e.message}`);
  }

  const stagePath = path.join(compDir, "components", "MotionStage.tsx");
  let mapaCenas = {};
  let importados = {};
  if (fs.existsSync(stagePath)) {
    const stageSrc = fs.readFileSync(stagePath, "utf8");
    mapaCenas = lerMapaDeCenas(stageSrc);
    importados = lerImports(stageSrc, path.dirname(stagePath));
  }

  const palavras = lerPalavras(compDir);

  const problemas = [];
  const avisos = [];

  if (spec.scenes.length !== cenas.length) {
    problemas.push(
      `contagem de cenas diferente: tokens.ts tem ${cenas.length}, choreography.ts tem ${spec.scenes.length}`
    );
  }

  const linhas = cenas.map((cena, i) => {
    const co = spec.scenes.find((s) => s.name === cena.key) || null;
    const el = co && co.elements && co.elements.length ? co.elements[0] : null;
    const proximo = spec.scenes[spec.scenes.indexOf(co) + 1];
    const nominal = co ? (proximo ? proximo.from - co.from : co.dur) : null;
    const entryDur = el && el.entry ? el.entry.dur || 0 : 0;
    const margemSaida = co && co.exitF != null ? co.dur - co.exitF : 0;
    const hold = co ? (co.exitF != null ? co.exitF : co.dur) - entryDur : null;

    const componente = mapaCenas[cena.key] || null;
    const contentH = componente ? lerContentH(importados[componente]) : null;

    const ancora = palavras.find(
      (p) => Math.abs(p.start - cena.start) <= TOLERANCIA_FRAMES / fps
    );
    const cobertas = palavras.filter((p) => p.start >= cena.start - 1e-6 && p.start < cena.end);
    const fala = cobertas.map((p) => p.text).join(" ").replace(/\s+/g, " ").trim();

    /* gates ------------------------------------------------------- */
    if (!cena.porque) problemas.push(`cena ${i + 1} "${cena.key}": sem comentario explicativo acima dela`);

    const primeira = i === 0;
    const ultima = i === cenas.length - 1;
    if (!primeira && !ultima && palavras.length && !ancora) {
      // Escape declarado, mesma filosofia do "// linear-ok:" do choreo-lint.
      // Cena que entra de proposito alguns frames ANTES da palavra (para a
      // entrada terminar de montar junto com a fala) declara isso no proprio
      // comentario com "ancora-antecipada: <motivo>". Sem a marca, reprova.
      const declarouAntecipacao = /ancora-antecipada/i.test(cena.porque || "");
      if (declarouAntecipacao) {
        avisos.push(
          `cena ${i + 1} "${cena.key}": entra ${s2(cena.start)}s, antes da palavra ancora, com antecipacao declarada no comentario`
        );
      } else {
        problemas.push(
          `cena ${i + 1} "${cena.key}": start ${s2(cena.start)}s nao coincide com o start de nenhuma palavra da fala`
        );
      }
    }
    if (i > 0) {
      const anterior = cenas[i - 1];
      const delta = cena.start - anterior.end;
      if (Math.abs(delta) > 1e-6) {
        problemas.push(
          delta > 0
            ? `buraco de ${s2(delta)}s entre "${anterior.key}" (fim ${s2(anterior.end)}s) e "${cena.key}" (inicio ${s2(cena.start)}s)`
            : `sobreposicao de ${s2(-delta)}s entre "${anterior.key}" (fim ${s2(anterior.end)}s) e "${cena.key}" (inicio ${s2(cena.start)}s)`
        );
      }
    }
    if (componente && contentH === null) {
      problemas.push(`cena ${i + 1} "${cena.key}": componente ${componente} nao exporta CONTENT_H`);
    }
    if (contentH !== null && stageSafe[cena.stage] != null && contentH > stageSafe[cena.stage]) {
      problemas.push(
        `cena ${i + 1} "${cena.key}": CONTENT_H ${contentH} passa do STAGE_SAFE.${cena.stage} (${stageSafe[cena.stage]})`
      );
    }
    if (!co) {
      problemas.push(`cena ${i + 1} "${cena.key}": nao existe em choreography.ts`);
    }
    if (hold !== null && hold < 0) {
      problemas.push(
        `cena ${i + 1} "${cena.key}": hold negativo (${hold}f), a cena comeca a sair antes de a entrada terminar`
      );
    }
    if (hold !== null && hold > HOLD_AVISO_S * fps) {
      avisos.push(
        `cena ${i + 1} "${cena.key}": hold de ${s2(hold / fps)}s, acima de ${HOLD_AVISO_S}s. Se a cena tem evento interno casado com a fala, esta certo assim (a ancora na fala vence a regua de duracao).`
      );
    }

    return {
      n: i + 1,
      key: cena.key,
      start: cena.start,
      startFrame: Math.round(cena.start * fps),
      end: cena.end,
      endFrame: Math.round(cena.end * fps),
      ancora: ancora ? { texto: ancora.text, i: ancora.i, start: ancora.start } : null,
      fala,
      componente,
      contentH,
      caption: temCaption ? cena.caption || "on" : null,
      stage: cena.stage,
      entrada: el && el.entry ? { ease: el.entry.ease || "-", dur: el.entry.dur || 0, dir: el.entry.dir || "-" } : null,
      saida: el && el.exit ? { ease: el.exit.ease || "-", dur: el.exit.dur || 0, dir: el.exit.dir || "-" } : null,
      children: el && el.children ? el.children : null,
      nominal,
      margemSaida,
      hold,
      porque: cena.porque,
    };
  });

  const comComponente = linhas.filter((l) => l.componente).length;
  const fimDaFala = palavras.length ? palavras[palavras.length - 1].end : null;
  const inicioUltimaCena = cenas[cenas.length - 1].start;

  return {
    composition,
    fps,
    totalFrames,
    duracaoSeg: totalFrames != null ? totalFrames / fps : null,
    stageSafe,
    temCaption,
    cenas: linhas,
    resumo: {
      totalCenas: linhas.length,
      comComponente,
      passthrough: linhas.length - comComponente,
      fimDaFala,
      inicioUltimaCena,
      folga: fimDaFala != null ? inicioUltimaCena - fimDaFala : null,
    },
    problemas,
    avisos,
  };
}

/* ------------------------------------------------------------------ *
 * 6. markdown
 * ------------------------------------------------------------------ */

function markdown(d) {
  const out = [];
  out.push(`# Storyboard conceitual, ${d.composition}`);
  out.push("");
  out.push("Folha gerada do proprio codigo da composition, pra aprovar a direcao ANTES do render.");
  out.push("");
  out.push(`- Composition: \`${d.composition}\``);
  out.push(`- FPS: ${d.fps}`);
  out.push(
    `- Total: ${d.totalFrames != null ? d.totalFrames : "?"} frames` +
      (d.duracaoSeg != null ? ` (${s2(d.duracaoSeg)}s)` : "")
  );
  out.push(
    `- Palco util: ` +
      Object.keys(d.stageSafe).map((k) => `${k} ${d.stageSafe[k]}px`).join(", ")
  );
  out.push("");

  out.push("## Cena a cena");
  out.push("");
  out.push(
    "| # | cena | inicio | fim | ancora | fala coberta | componente | CONTENT_H | legenda | palco | entrada | saida | nominal | hold |"
  );
  out.push("|---|---|---|---|---|---|---|---|---|---|---|---|---|---|");
  for (const c of d.cenas) {
    const ancora = c.ancora
      ? `"${c.ancora.texto}" (i${c.ancora.i}, ${s2(c.ancora.start)}s)`
      : "sem ancora";
    const entrada = c.entrada ? `${c.entrada.ease} ${c.entrada.dur}f` : "-";
    const saida = c.saida ? `${c.saida.ease} ${c.saida.dur}f` : "-";
    const filhos = c.children ? ` +${c.children.count} filhos` : "";
    out.push(
      `| ${c.n} | \`${c.key}\` | ${s2(c.start)}s (f${c.startFrame}) | ${s2(c.end)}s (f${c.endFrame}) | ${ancora} | ${
        c.fala ? truncar(c.fala, FALA_MAX_CHARS) : "-"
      } | ${c.componente ? c.componente + filhos : "passthrough"} | ${
        c.contentH != null ? c.contentH : "-"
      } | ${c.caption || "sem legenda"} | ${c.stage} | ${entrada} | ${saida} | ${
        c.nominal != null ? c.nominal + "f" : "-"
      } | ${c.hold != null ? c.hold + "f (" + s2(c.hold / d.fps) + "s)" : "-"} |`
    );
  }
  out.push("");

  out.push("## Por que, cena a cena");
  out.push("");
  out.push("A decisao de direcao mora aqui. Se alguma linha nao explicar a escolha, o storyboard ainda nao esta pronto.");
  out.push("");
  for (const c of d.cenas) {
    out.push(`### ${c.n}. \`${c.key}\` (${s2(c.start)}s a ${s2(c.end)}s)`);
    out.push("");
    out.push(c.porque ? c.porque : "_sem comentario explicativo no tokens.ts_");
    out.push("");
  }

  const r = d.resumo;
  out.push("## Fechamento");
  out.push("");
  out.push(`- Total de cenas: ${r.totalCenas}`);
  out.push(`- Com componente proprio: ${r.comComponente}`);
  out.push(`- Passthrough (so rosto e legenda): ${r.passthrough}`);
  out.push(`- Fim da fala: ${r.fimDaFala != null ? s2(r.fimDaFala) + "s" : "sem narration.json"}`);
  out.push(`- Inicio da ultima cena: ${s2(r.inicioUltimaCena)}s`);
  out.push(
    `- Folga entre o fim da fala e a ultima cena: ${
      r.folga != null ? s2(r.folga) + "s" : "-"
    }`
  );
  out.push("");

  if (d.avisos.length) {
    out.push("## Avisos (nao reprovam)");
    out.push("");
    for (const a of d.avisos) out.push(`- ${a}`);
    out.push("");
  }
  if (d.problemas.length) {
    out.push("## Problemas encontrados");
    out.push("");
    for (const p of d.problemas) out.push(`- ${p}`);
    out.push("");
  }

  return out.join("\n") + "\n";
}

/* ------------------------------------------------------------------ *
 * 7. main
 * ------------------------------------------------------------------ */

function main() {
  const argv = process.argv.slice(2);
  const composition = argv.find((a) => !a.startsWith("--"));
  if (!composition) {
    sair("uso: node scripts/storyboard.js <Composition> [--out <caminho>] [--json]");
  }
  const json = argv.includes("--json");
  const iOut = argv.indexOf("--out");
  const out = iOut !== -1 ? argv[iOut + 1] : null;
  if (iOut !== -1 && !out) sair("--out precisa de um caminho depois dele");

  const dados = montar(composition);

  if (json) {
    console.log(JSON.stringify(dados, null, 2));
  } else {
    let destino;
    if (out && out.toLowerCase().endsWith(".md")) {
      destino = path.resolve(out);
      fs.mkdirSync(path.dirname(destino), { recursive: true });
    } else {
      const dir = out
        ? path.resolve(out)
        : acharCampanha(composition) || path.join(OUTPUT_DIR, "_storyboard");
      fs.mkdirSync(dir, { recursive: true });
      const v = String(proximaVersao(dir, composition)).padStart(2, "0");
      destino = path.join(dir, `${composition}-storyboard-v${v}.md`);
    }
    fs.writeFileSync(destino, markdown(dados), "utf8");
    console.log(`${composition}: ${dados.resumo.totalCenas} cenas, ${dados.resumo.comComponente} com componente, ${dados.resumo.passthrough} passthrough`);
    console.log(`Folha: ${destino}`);
  }

  for (const a of dados.avisos) console.log(`AVISO: ${a}`);
  if (dados.problemas.length) {
    console.error("");
    for (const p of dados.problemas) console.error(`PROBLEMA: ${p}`);
    console.error(`\n${dados.problemas.length} problema(s). O storyboard nao esta aprovado.`);
    process.exit(1);
  }
  if (!json) console.log("Sem problemas. Da pra aprovar antes de renderizar.");
}

main();
