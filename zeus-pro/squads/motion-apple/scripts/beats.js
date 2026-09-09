#!/usr/bin/env node
/**
 * beats.js: da transcricao por palavra para a proposta de beats.
 *
 * O modelo NUNCA le a lista de palavras inteira (150 a 9 mil palavras). Ele le o
 * digest: uma linha por trecho, com o tempo, a pausa antes, a velocidade da fala e
 * os sinais que a maquina encontrou (numero, plataforma, gatilho lexical).
 *
 * Saidas em src/compositions/<Comp>/plan/:
 *   01-transcript-digest.md   o que o modelo le
 *   02-beats.draft.json       a proposta que o modelo edita e vira 02-beats.json
 *
 * Uso:
 *   node beats.js <Composition> [--pausa 0.35] [--max-beat 8]
 *   node beats.js <Composition> --validate
 *   node beats.js <Composition> --palavra "impossivel"
 *   node beats.js --narration <caminho.json> --out <pasta>
 */
const fs = require("fs");
const path = require("path");
const R = require("./lib/ds-registry");
const { paths, compDir, planDir, existe } = require("./lib/ds-root");

const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const valor = (n, p = null) => {
  const i = args.indexOf(n);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : p;
};

const FPS = 60;
const PAUSA_CANDIDATA = Number(valor("--pausa", 0.35));
const PAUSA_FORTE = 0.7;
// O teto de beat cai para 5s no vertical-mao: a peca de referencia trabalha
// com beats de 2 a 4s, e beat de 8s nesse formato vira cena parada (o proprio
// digest cobra de 9 a 12 beats por minuto).
const MAX_BEAT_S = Number(valor("--max-beat", args.includes("vertical-mao") ? 5 : 8));
const MIN_BEAT_S = 2.2;

/**
 * DIRECAO DINAMICA (08/09/2026). Formato do video: decide se os beats saem com
 * papel narrativo e estado de palco preenchidos. `reels-call` (o padrao) segue
 * como sempre foi: campos ficam nulos e quem decide e o R3. Ver
 * design-system/DIRECAO-DINAMICA.md.
 */
const FORMATO = valor("--formato", "reels-call");

const PLATAFORMAS = ["whatsapp", "instagram", "telegram", "email", "e-mail", "zoom", "google", "calendario", "crm", "site", "checkout", "youtube", "facebook"];
const FIM_DE_FRASE = /[.!?]$/;
const PAUSA_MEDIA = /[,;:]$/;

function lerNarration(p) {
  const d = JSON.parse(fs.readFileSync(p, "utf8"));
  if (!Array.isArray(d.words)) throw new Error(`${p} nao tem words[]`);
  return d;
}

function segundosParaFrame(s) {
  return Math.round(s * FPS);
}

function mmss(s) {
  const m = Math.floor(s / 60);
  const r = (s - m * 60).toFixed(1).padStart(4, "0");
  return `${String(m).padStart(2, "0")}:${r}`;
}

/** divide as palavras em blocos por pausa e por fim de frase, respeitando o teto */
function propor(words) {
  const blocos = [];
  let atual = [];
  const fechar = () => {
    if (atual.length) blocos.push(atual);
    atual = [];
  };
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    const prox = words[i + 1];
    atual.push(w);
    if (!prox) break;
    const pausa = prox.start - w.end;
    const dur = prox.start - atual[0].start;
    const fimFrase = FIM_DE_FRASE.test(w.text);
    const pausaMedia = PAUSA_MEDIA.test(w.text);
    if (dur >= MIN_BEAT_S && (pausa >= PAUSA_FORTE || (fimFrase && pausa >= 0.15) || (pausaMedia && pausa >= PAUSA_CANDIDATA) || dur >= MAX_BEAT_S)) {
      fechar();
    }
  }
  fechar();
  return blocos;
}

function sinaisDoBloco(texto, pausaAntes, dur, n) {
  const t = R.norm(texto);
  const trg = R.casarTriggers(texto)
    .map((a) => a.frase)
    .slice(0, 4);
  const plataforma = PLATAFORMAS.find((p) => t.includes(p)) || null;
  return {
    pausaAntesMs: Math.round(pausaAntes * 1000),
    ppm: Math.round((n / dur) * 60),
    temNumero: /\d/.test(texto) || /\b(um|dois|tres|quatro|cinco|seis|dez|doze|vinte|cem|mil|milhao)\b/.test(t),
    plataforma,
    gatilhos: trg,
  };
}

function montar(words, nome) {
  const blocos = propor(words);
  const beats = [];
  /**
   * Estado de palco proposto pelo papel do beat (DIRECAO-DINAMICA secao 3),
   * ja passado pela regra de alternancia da secao 2. Sugere, nunca decide: o
   * R3 confirma ou troca. Devolve null quando o formato nao usa estados.
   */
  const proporEstados = (lista) => {
    const regras = R.regrasDeAlternancia(FORMATO);
    if (!regras) return { estados: lista.map(() => null), avisos: [] };
    const avisos = [];
    const estados = [];
    let quadrosSemA = 0;
    lista.forEach((bt, i) => {
      const papel = R.papelNarrativo(bt.role);
      let estado = papel ? papel.estadoPadrao : "A";
      const dur = bt.endFrameExclusive - bt.startFrame;

      // primeiro beat abre em A; ultimo fecha em A (secao 2, leis 3 e 4)
      if (i === 0 || i === lista.length - 1) estado = regras.abreEm || "A";

      // nunca dois B seguidos com frases diferentes (lei 2)
      if (estado === "B" && estados[i - 1] === "B") {
        estado = papel && papel.estadoAlternativo !== "B" ? papel.estadoAlternativo : "A";
      }

      // O rosto volta em ate N quadros (lei 1). O limite vigia a SEQUENCIA de
      // beats fora de A, nunca um beat sozinho: se contasse o beat isolado,
      // qualquer cena de tela cheia mais longa que 8s viraria proibida e o
      // estado B deixaria de existir na pratica (medido em 08/09/2026 com
      // beats de 484q, que estouravam o teto por 4 quadros).
      if (estado !== "A" && quadrosSemA > 0 && quadrosSemA + dur > regras.rostoVoltaEmAteQuadros) {
        estado = "A";
        avisos.push(
          `${bt.id}: a sequencia passaria de ${regras.rostoVoltaEmAteQuadros}q sem o rosto na tela; forcado para o estado A`
        );
      }

      quadrosSemA = estado === "A" ? 0 : quadrosSemA + dur;
      estados.push(estado);
    });

    // Sem papel classificado nao existe estado: avisar a causa em vez de
    // reclamar do sintoma (percentual de tela cheia baixo).
    const semPapel = lista.filter((b) => !b.role).length;
    if (semPapel) {
      avisos.push(
        `${semPapel} de ${lista.length} beats sem papel narrativo: o estado deles caiu em A por falta de classificacao, nao por decisao. Classificar no R2 antes de julgar o ritmo.`
      );
    }

    // teto e piso de tela cheia (lei 5)
    const total = lista.reduce((a, b) => a + (b.endFrameExclusive - b.startFrame), 0);
    const cheia = lista.reduce(
      (a, b, i) => a + (estados[i] === "A" ? 0 : b.endFrameExclusive - b.startFrame),
      0
    );
    const pct = total ? Math.round((cheia / total) * 100) : 0;
    if (pct < regras.somaBCPercentualMin)
      avisos.push(
        `tela cheia em ${pct}% do tempo, abaixo do minimo de ${regras.somaBCPercentualMin}%: o video vira cabeca falante com apoio`
      );
    if (pct > regras.somaBCPercentualMax)
      avisos.push(
        `tela cheia em ${pct}% do tempo, acima do teto de ${regras.somaBCPercentualMax}%: a pessoa some e vira motion generico`
      );
    return { estados, avisos, percentualTelaCheia: pct };
  };

  const linhasDigest = [];
  blocos.forEach((b, i) => {
    const texto = b.map((w) => w.text).join(" ").replace(/\s+([,.!?;:])/g, "$1");
    const inicio = b[0].start;
    const fim = b[b.length - 1].end;
    const anterior = i > 0 ? blocos[i - 1] : null;
    const pausaAntes = anterior ? inicio - anterior[anterior.length - 1].end : 0;
    const sinais = sinaisDoBloco(texto, pausaAntes, Math.max(fim - inicio, 0.1), b.length);
    const id = `b${String(i + 1).padStart(2, "0")}`;
    beats.push({
      id,
      startFrame: segundosParaFrame(inicio),
      endFrameExclusive: segundosParaFrame(fim),
      words: { from: b[0].i, to: b[b.length - 1].i },
      text: texto,
      topic: null,
      idea: null,
      // DIRECAO DINAMICA: proposto pelo lexico da secao 3 quando o formato usa
      // estados de palco. Sem gatilho na fala, continua nulo e o R3 decide.
      role: R.regrasDeAlternancia(FORMATO) ? R.papelPelaFala(texto) : null,
      stageState: null,
      density: null,
      structures: [],
      anchorWord: { i: b[0].i, text: b[0].text, startFrame: segundosParaFrame(inicio) },
      signals: sinais,
      confidence: null,
    });
    const marca = sinais.pausaAntesMs >= 700 ? " »" : "";
    linhasDigest.push(
      `${id} ${mmss(inicio)}-${mmss(fim)} (${(fim - inicio).toFixed(1)}s, ${sinais.ppm}ppm, pausa ${sinais.pausaAntesMs}ms)${marca} ${texto.length > 96 ? texto.slice(0, 93) + "..." : texto}` +
        (sinais.gatilhos.length || sinais.plataforma || sinais.temNumero
          ? `\n      sinais: ${[sinais.temNumero ? "numero" : null, sinais.plataforma ? `plataforma:${sinais.plataforma}` : null, sinais.gatilhos.length ? `gatilho:${sinais.gatilhos.join("/")}` : null].filter(Boolean).join(" · ")}`
          : "")
    );
  });

  const durTotal = words[words.length - 1].end;
  const digest = [
    `# Digest da fala: ${nome}`,
    "",
    `${words.length} palavras · ${durTotal.toFixed(1)}s · ${Math.round((words.length / durTotal) * 60)} palavras por minuto · ${beats.length} trechos propostos`,
    `referencia de ritmo: um Reel de 60s costuma pedir de 9 a 12 cenas`,
    "",
    "Cada linha e um trecho candidato. O simbolo » marca pausa longa (mais de 0,7s), que quase",
    "sempre e troca de assunto. Junte ou separe por SIGNIFICADO, nao por tempo.",
    "",
    ...linhasDigest,
    "",
    "## O que fazer com isto",
    "",
    "1. Leia tudo e entenda o video inteiro antes de decidir qualquer coisa.",
    "2. Junte ou divida os trechos por significado e escreva topic, idea e role em cada beat.",
    "3. role: hook, context, problem, explanation, example, proof, climax, cta, breath, close.",
    "4. Grave em 02-beats.json e rode: node beats.js <Comp> --validate",
  ].join("\n");

  // DIRECAO DINAMICA: o estado de palco so pode ser proposto depois que todos
  // os beats existem, porque a regra de alternancia (secao 2) olha a sequencia
  // inteira, nunca um beat isolado.
  const palco = R.regrasDeAlternancia(FORMATO) ? proporEstados(beats) : null;
  if (palco) beats.forEach((b, i) => { b.stageState = palco.estados[i]; });

  return { beats, digest, durTotal, palco };
}

// ─── comandos ─────────────────────────────────────────────────────────────────

function comandoPalavra(words, alvo) {
  const t = R.norm(alvo);
  const achados = words.filter((w) => R.norm(w.text).includes(t));
  if (!achados.length) {
    console.log(`nao achei "${alvo}" na fala`);
    return;
  }
  achados.slice(0, 10).forEach((w) => console.log(`i=${w.i} "${w.text}" start=${w.start.toFixed(2)}s frame=${segundosParaFrame(w.start)}`));
}

function comandoValidate(comp, dir) {
  const p = path.join(dir, "02-beats.json");
  if (!existe(p)) {
    console.error(`nao existe ${path.relative(paths.repo, p)}`);
    process.exit(1);
  }
  const d = JSON.parse(fs.readFileSync(p, "utf8"));
  const nar = lerNarration(path.join(compDir(comp), "data", "narration.json"));
  const words = nar.words;
  const erros = [];
  const avisos = [];
  // Os 10 papeis historicos do squad (reels-call) mais os 13 refinados do
  // formato vertical-mao (DIRECAO-DINAMICA secao 3). Nao sao vocabularios
  // rivais: cada papel refinado declara `equivaleA` apontando para o antigo.
  const ROLES = [
    "hook", "context", "problem", "explanation", "example", "proof", "climax", "cta", "breath", "close",
    ...R.carregar().papeisNarrativos.map((p) => p.id),
  ];
  const estruturasValidas = new Set(R.estruturas());

  let ultimoFim = -1;
  (d.beats || []).forEach((b, i) => {
    if (!b.id) erros.push(`beat ${i} sem id`);
    if (b.startFrame == null || b.endFrameExclusive == null) erros.push(`${b.id}: faltam frames`);
    if (b.endFrameExclusive <= b.startFrame) erros.push(`${b.id}: fim antes do inicio`);
    if (ultimoFim >= 0 && b.startFrame < ultimoFim) erros.push(`${b.id}: comeca antes do fim do beat anterior`);
    ultimoFim = b.endFrameExclusive;
    // o fecho (selo) comeca depois da fala terminar: e a unica cena sem ancora em palavra
    if (b.role !== "close") {
      const w = words.find((x) => segundosParaFrame(x.start) === b.startFrame);
      if (!w) erros.push(`${b.id}: o inicio (frame ${b.startFrame}) nao cai no comeco de uma palavra real`);
    }
    if (!b.role) erros.push(`${b.id}: sem papel narrativo (role)`);
    else if (!ROLES.includes(b.role)) erros.push(`${b.id}: role "${b.role}" fora da lista`);
    if (!b.idea) avisos.push(`${b.id}: sem a ideia central escrita`);
    (b.structures || []).forEach((s) => {
      if (!estruturasValidas.has(s)) erros.push(`${b.id}: estrutura "${s}" nao existe no design system`);
    });
    const durS = (b.endFrameExclusive - b.startFrame) / FPS;
    if (durS > 12) avisos.push(`${b.id}: ${durS.toFixed(1)}s num beat so, provavel excesso`);
  });

  const durTotal = words[words.length - 1].end;
  const porMinuto = ((d.beats || []).length / durTotal) * 60;
  if (porMinuto < 8) avisos.push(`${porMinuto.toFixed(1)} beats por minuto: abaixo da referencia de 9 a 12, o video tende a ficar parado`);
  if (porMinuto > 16) avisos.push(`${porMinuto.toFixed(1)} beats por minuto: acima da referencia, risco de video picado`);

  console.log(`${(d.beats || []).length} beats · ${durTotal.toFixed(1)}s · ${porMinuto.toFixed(1)} por minuto`);
  avisos.forEach((a) => console.log(`  aviso: ${a}`));
  if (erros.length) {
    erros.forEach((e) => console.log(`  erro: ${e}`));
    process.exit(1);
  }
  console.log("OK: beats validos.");
}

function main() {
  const narrationFlag = valor("--narration");
  let comp = args.find((a) => !a.startsWith("--") && args[args.indexOf(a) - 1] !== "--narration" && args[args.indexOf(a) - 1] !== "--out" && args[args.indexOf(a) - 1] !== "--pausa" && args[args.indexOf(a) - 1] !== "--max-beat" && args[args.indexOf(a) - 1] !== "--palavra");
  let narPath;
  let dir;

  if (narrationFlag) {
    narPath = narrationFlag;
    dir = valor("--out", process.cwd());
    if (!existe(dir)) fs.mkdirSync(dir, { recursive: true });
  } else {
    if (!comp) {
      console.error('uso: node beats.js <Composition> [--validate] [--palavra "x"]');
      process.exit(1);
    }
    narPath = path.join(compDir(comp), "data", "narration.json");
    if (!existe(narPath)) {
      console.error(`nao achei ${path.relative(paths.repo, narPath)}. Rode a transcricao antes (transcribe-words.py).`);
      process.exit(1);
    }
    dir = planDir(comp, true);
  }

  const nar = lerNarration(narPath);

  if (flag("--palavra")) return comandoPalavra(nar.words, valor("--palavra"));
  if (flag("--validate")) return comandoValidate(comp, dir);

  const { beats, digest, durTotal, palco } = montar(nar.words, comp || path.basename(narPath));
  fs.writeFileSync(path.join(dir, "01-transcript-digest.md"), digest, "utf8");
  fs.writeFileSync(
    path.join(dir, "02-beats.draft.json"),
    JSON.stringify(
      {
        composition: comp || null,
        fps: FPS,
        source: path.relative(paths.repo, narPath).replace(/\\/g, "/"),
        durationSec: durTotal,
        proposta: "deterministic-proposal",
        video: { topic: null, audience: null, promise: null, ending: null },
        formato: FORMATO,
        palco: palco || null,
        beats,
      },
      null,
      2
    ),
    "utf8"
  );

  const kb = (digest.length / 1024).toFixed(1);
  console.log(`${beats.length} trechos propostos · ${durTotal.toFixed(1)}s · ${((beats.length / durTotal) * 60).toFixed(1)} por minuto`);
  console.log(`01-transcript-digest.md (${kb} KB, e so isto que o modelo le)`);
  console.log(`02-beats.draft.json`);
  if (palco) {
    console.log(`formato ${FORMATO} · tela cheia em ${palco.percentualTelaCheia}% do tempo`);
    palco.avisos.forEach((m) => console.log(`  aviso: ${m}`));
  }
  console.log(path.relative(paths.repo, dir));
}

main();
