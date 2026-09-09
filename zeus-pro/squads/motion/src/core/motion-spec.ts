/**
 * core/motion-spec.ts — implementacao do MANUAL DE MOTION v3.0
 *
 * Port do `motion.ts` de referencia que veio no pacote APPLE MOTION 6
 * (Claude Design, 07/09/2026). O original esta preservado em
 * `squads/motion-apple/design-system/motion/motion.referencia.ts`;
 * aqui ele vira modulo do motor compartilhado, lendo curva de
 * `core/curves.ts` e tempo/peso de `core/tokens.ts` em vez de repetir os
 * numeros (fonte unica, regra do design-core).
 *
 * O que este arquivo garante, e que antes so existia em prosa:
 *   - duracao NUNCA escolhida no olho: classe x massa x peso (§1, §3, §3b);
 *   - gesto ancorado na SILABA TONICA, nao no inicio da frase (§4);
 *   - cascata com teto de 24q, com quantos irmaos for (§5.2);
 *   - hold legivel: 60q + 12q por palavra alem de 4 (§3);
 *   - peso 0 a 10 e a mesma escala do som (§3b, §3c);
 *   - validacao de cena e de video antes do render (§12).
 *
 * Determinismo (§11): tudo aqui e f(inputs, frame). Sem Date.now, sem
 * Math.random, sem estado.
 */

import { interpolate, spring } from "remotion";
import { CURVES, type EaseFn } from "./curves";
import {
  AMPLITUDE_MAX,
  DUR_V3,
  HOLD_BASE,
  HOLD_POR_PALAVRA_EXTRA,
  INTENSIDADE,
  MASSA,
  PESO_ASSINATURA_MAX_VIDEO,
  PESO_MAX_CENA,
  PESO_PESADO_GAP_MIN,
  SCENE_OVERLAP,
  STAGGER_CAP,
  STEP_V3,
  SYNC_OFFSET,
  type Intensidade,
} from "./tokens";

export const FPS = 60;

/* ── §2 CURVAS ─────────────────────────────────────────────── */

/**
 * Vocabulario do manual v3.0. Os quatro do nucleo apontam para os tokens
 * V3 de curves.ts (bezier do manual), nao para os homonimos antigos do
 * squad — ver a nota de conflito em curves.ts.
 */
export const EASE = {
  settle: CURVES.settleV3,
  smooth: CURVES.smoothV3,
  settleSoft: CURVES.settleSoftV3,
  easy: CURVES.easyV3,
  anticipate: CURVES.anticipate,
  overshootMicro: CURVES.overshootMicro,
  brake: CURVES.brake,
  gravity: CURVES.gravity,
  lift: CURVES.lift,
  linear: CURVES.linear,
} as const satisfies Record<string, EaseFn>;

export type EaseToken = keyof typeof EASE;

/** §2.2 — as duas curvas que sao spring, nao bezier. */
export const SPRING_V3 = {
  /** materializacao: algo que nasce (selo, icone-chave). Max 1 por cena. */
  elasticSoft: { damping: 22, stiffness: 170, mass: 1 },
  /** continuacao: scroll, carrossel, lista que empurra vizinhos. */
  inertia: { damping: 40, stiffness: 80, mass: 1.2 },
} as const;

export type SpringToken = keyof typeof SPRING_V3;

/* ── §1 MASSA · §3 CLASSES · §3b PESO ──────────────────────── */

export const DUR = DUR_V3;
export type DurClass = keyof typeof DUR;

/** §1 — fator de massa pelo tamanho do objeto na tela. */
export const massFactor = (sizePx: number): number =>
  MASSA.find((m) => sizePx <= m.atePx)!.fator;

export type Weight = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

/** §3b — perfil do peso: amplitude, duracao, hold extra, blur, intensidade. */
export const weightProfile = (w: Weight) =>
  w === 0
    ? { cls: "silencio", amp: 0.5, dur: 0.8, holdExtra: 0, blur: 2, intensity: "sutil" as Intensidade }
    : w <= 2
      ? { cls: "detalhe", amp: 0.6, dur: 0.85, holdExtra: 0, blur: 4, intensity: "sutil" as Intensidade }
      : w <= 4
        ? { cls: "estrutura", amp: 0.8, dur: 1.0, holdExtra: 0, blur: 6, intensity: "sutil" as Intensidade }
        : w <= 6
          ? { cls: "evento", amp: 1.0, dur: 1.1, holdExtra: 12, blur: 6, intensity: "padrao" as Intensidade }
          : w <= 8
            ? { cls: "virada", amp: 1.25, dur: 1.25, holdExtra: 24, blur: 8, intensity: "dramatico" as Intensidade }
            : { cls: "assinatura", amp: 1.4, dur: 1.5, holdExtra: 36, blur: 12, intensity: "dramatico" as Intensidade };

export const SCENE_WEIGHT_MAX = PESO_MAX_CENA;
export const HEAVY_MIN_GAP = PESO_PESADO_GAP_MIN;
export const SIGNATURE_MAX_PER_VIDEO = PESO_ASSINATURA_MAX_VIDEO;

/** §7 — intensidade nao se escolhe: vem do peso. */
export const INTENSITY = INTENSIDADE;
export type Intensity = Intensidade;

/** §3 — duracao final de um evento. Arredonda UMA vez, nunca por propriedade. */
export const durationOf = (cls: DurClass, sizePx = 200, weight: Weight = 4): number =>
  Math.round(DUR[cls] * massFactor(sizePx) * weightProfile(weight).dur);

/* ── §4 SINCRONIA COM A FALA ───────────────────────────────── */

export { SYNC_OFFSET };

/** §4 — startFrame de um evento a partir do onset da silaba tonica. */
export const cueFrom = (tonicFrame: number, kind: keyof typeof SYNC_OFFSET = "act"): number =>
  Math.round(tonicFrame + SYNC_OFFSET[kind]);

/* ── §5 STAGGER COM TETO ───────────────────────────────────── */

export const STEP = STEP_V3;
export { STAGGER_CAP, SCENE_OVERLAP, AMPLITUDE_MAX };

/** §5.2 — passo efetivo: a cascata inteira nunca passa de 24q. */
export const staggerStep = (base: number, n: number): number =>
  n <= 1 ? 0 : Math.max(1, Math.min(base, STAGGER_CAP / (n - 1)));

export const staggerDelay = (i: number, base: number, n: number): number =>
  Math.round(i * staggerStep(base, n));

/** §3 — hold legivel: 60q + 12q por palavra alem de 4. */
export const holdFrames = (text: string): number =>
  HOLD_BASE + Math.max(0, text.trim().split(/\s+/).length - 4) * HOLD_POR_PALAVRA_EXTRA;

/* ── TWEEN ─────────────────────────────────────────────────── */

export type Tween = {
  frame: number;
  start: number;
  duration: number;
  from: number;
  to: number;
  ease?: EaseToken;
};

/** §11 — intervalo com clamp nas duas pontas (clamp e o hold antes e depois). */
export const tween = ({ frame, start, duration, from, to, ease = "settle" }: Tween): number =>
  interpolate(frame, [start, start + duration], [from, to], {
    easing: EASE[ease],
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

/** Spring deterministico, com clamp de overshoot opcional. */
export const springAt = (frame: number, start: number, token: SpringToken, clampOvershoot = false): number =>
  spring({
    frame: frame - start,
    fps: FPS,
    config: { ...SPRING_V3[token], overshootClamping: clampOvershoot },
  });

/** §1 Lei 2 (continuidade) — retoma de onde esta, nunca reinicia em zero. */
export const inertiaFrom = (
  frame: number,
  start: number,
  current: number,
  target: number,
  duration: number,
): number => tween({ frame, start, duration, from: current, to: target, ease: "smooth" });

/* ── §9 FASES DE CENA ──────────────────────────────────────── */

export type Phase = "in" | "build" | "act" | "focus" | "hold" | "out";

/** [in] — entrada de contexto: opacity, scale e blur juntos. */
export const enter = (frame: number, start: number, d = 16, intensity: Intensity = "padrao") => {
  const p = tween({ frame, start, duration: d, from: 0, to: 1, ease: "settleSoft" });
  return {
    opacity: p,
    transform: `scale(${0.98 + 0.02 * p})`,
    filter: `blur(${(1 - p) * INTENSITY[intensity].blur}px)`,
  };
};

/** [out] — saida simples de cena. */
export const exit = (frame: number, start: number, d = 24) => {
  const p = tween({ frame, start, duration: d, from: 0, to: 1, ease: "easy" });
  return {
    opacity: 1 - p,
    transform: `scale(${1 + 0.02 * p})`,
    filter: `blur(${p * 6}px)`,
  };
};

/** §8d — saida canonica: blur e scale nos 24q, opacity so a partir de 30%. */
export const exitStaged = (frame: number, start: number, d = 24, blurMax = 6) => {
  const p = tween({ frame, start, duration: d, from: 0, to: 1, ease: "easy" });
  const o = tween({
    frame,
    start: start + Math.round(d * 0.3),
    duration: Math.round(d * 0.7),
    from: 1,
    to: 0,
    ease: "easy",
  });
  return { opacity: o, transform: `scale(${1 + 0.02 * p})`, filter: `blur(${blurMax * p}px)` };
};

/** §8d — entrada canonica: presente em 60%, nitida so em 100% (lente). */
export const enterStaged = (frame: number, start: number, d = 24, blurMax = 6) => {
  const p = tween({ frame, start, duration: d, from: 0, to: 1, ease: "settleSoft" });
  const o = tween({ frame, start, duration: Math.round(d * 0.6), from: 0, to: 1, ease: "settleSoft" });
  return { opacity: o, transform: `scale(${0.98 + 0.02 * p})`, filter: `blur(${blurMax * (1 - p)}px)` };
};

/** §8d — passagem cena para cena: o [in] comeca no 14o quadro do [out]. */
export const sceneHandoff = (frame: number, outStart: number) => ({
  out: exitStaged(frame, outStart, 24),
  in: enterStaged(frame, outStart + 24 - SCENE_OVERLAP, 24),
});

/** §8d — foco A para B: A recua, B acorda, no mesmo intervalo. A nunca some. */
export const focusHandoff = (frame: number, start: number, d = 20) => {
  const p = tween({ frame, start, duration: d, from: 0, to: 1, ease: "smooth" });
  return {
    a: { opacity: 1 - 0.55 * p, filter: `blur(${4 * p}px)` },
    b: { opacity: 0.45 + 0.55 * p, filter: `blur(${4 * (1 - p)}px)` },
  };
};

/** §8d — substituicao no lugar: out 10q sobe 6px, in 14q vem de baixo. */
export const swapInPlace = (frame: number, start: number, dir: 1 | -1 = 1) => {
  const po = tween({ frame, start, duration: 10, from: 0, to: 1, ease: "easy" });
  const pi = tween({ frame, start: start + 4, duration: 14, from: 0, to: 1, ease: "settle" });
  return {
    out: { opacity: 1 - po, transform: `translateY(${-6 * dir * po}px)`, filter: `blur(${4 * po}px)` },
    in: { opacity: pi, transform: `translateY(${6 * dir * (1 - pi)}px)`, filter: `blur(${6 * (1 - pi)}px)` },
  };
};

/** §8c — destaque: quatro gestos silenciosos no mesmo intervalo. Nao pula. */
export const highlight = (frame: number, tonicFrame: number, d = 20) => {
  const start = cueFrom(tonicFrame, "focus");
  const ring = tween({ frame, start, duration: d, from: 0, to: 1, ease: "settleSoft" });
  const recede = tween({ frame, start, duration: d, from: 0, to: 1, ease: "smooth" });
  return {
    ring: { opacity: ring, transform: `scale(${0.96 + 0.04 * ring})` },
    item: { transform: `scale(${1 + 0.02 * ring})` },
    other: { opacity: 1 - 0.55 * recede, filter: `blur(${6 * recede}px)` },
  };
};

/** §8 (22) — anel de foco: um dono so, interpola x, y, w, h, r. */
export type Rect = { x: number; y: number; w: number; h: number; r: number };

export const focusRect = (frame: number, start: number, a: Rect, b: Rect, d: number = DUR.transfer): Rect => {
  const p = tween({ frame, start, duration: d, from: 0, to: 1, ease: "smooth" });
  const lerp = (u: number, v: number) => u + (v - u) * p;
  return { x: lerp(a.x, b.x), y: lerp(a.y, b.y), w: lerp(a.w, b.w), h: lerp(a.h, b.h), r: lerp(a.r, b.r) };
};

/** §8 (4, 17) — trim path: strokeDashoffset de L a 0. Medir L com getTotalLength(). */
export const draw = (frame: number, start: number, length: number, d: number = DUR.draw) => ({
  strokeDasharray: length,
  strokeDashoffset: tween({ frame, start, duration: d, from: length, to: 0, ease: "settleSoft" }),
});

/* ── §8e NUMEROS ───────────────────────────────────────────── */

export const counterDuration = (
  from: number,
  to: number,
  kind: "money" | "count" | "year" | "percent" = "count",
): number =>
  kind === "year" ? 40 : Math.abs(to - from) >= 1000 ? 48 : Math.abs(to - from) >= 100 ? 40 : 24;

/** Contador simples: acelera e freia. Ano nunca parte de zero. */
export const counter = (frame: number, start: number, to: number, d: number = DUR.count, from = 0): number =>
  Math.round(tween({ frame, start, duration: d, from, to, ease: "brake" }));

/**
 * §8e — contador estilo After Effects. Duas fases: cabeca (acelera e
 * desacelera ate to menos K) e cauda (os K ultimos valores aparecem um a
 * um, cada passo mais lento, ate travar). A cauda e mais de metade do tempo.
 */
export const counterAE = (frame: number, start: number, to: number, from = 0, dur?: number): number => {
  const dir = to >= from ? 1 : -1;
  const dist = Math.abs(to - from);
  const d = dur ?? (dist >= 1000 ? 90 : dist >= 100 ? 72 : 48);
  const K = Math.min(18, dist);
  const gaps: number[] = [];
  let tail = 0;
  for (let i = 0; i < K; i++) {
    const g = Math.round(1 + i * 0.45);
    gaps.push(g);
    tail += g;
  }
  const head = Math.max(8, d - tail);
  const headTarget = to - dir * K;
  const rel = Math.floor(frame) - start;
  if (rel <= 0) return from;
  if (rel < head) {
    const x = rel / head;
    const e = x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    return Math.round(from + (headTarget - from) * e);
  }
  let v = headTarget;
  let acc = head;
  for (let i = 0; i < K; i++) {
    acc += gaps[i];
    if (rel >= acc) v = headTarget + dir * (i + 1);
    else break;
  }
  return v;
};

/** Duracao real do counterAE (para o ding e o hold). */
export const counterAEDuration = (from: number, to: number, dur?: number): number => {
  const dist = Math.abs(to - from);
  const d = dur ?? (dist >= 1000 ? 90 : dist >= 100 ? 72 : 48);
  const K = Math.min(18, dist);
  let tail = 0;
  for (let i = 0; i < K; i++) tail += Math.round(1 + i * 0.45);
  return Math.max(8, d - tail) + tail;
};

/** Quadro em que o contador trava: e onde o ding (peso 5) toca. */
export const counterSettleFrame = (start: number, d: number): number => start + d;

export const fmtBRL = (n: number): string => "R$ " + n.toLocaleString("pt-BR");

/* ── §12c HORIZONTAL 16:9 · TRANSFORMAR ────────────────────── */

export type Orientation = "portrait" | "landscape";
export type FaceBox = { x: number; y: number; w: number; h: number };
export type StageSide = "left" | "right";

/** §12c — lado do rosto: onde ele ja esta; centrado vai pra esquerda. */
export const faceSide = (face: FaceBox, W = 1920): StageSide =>
  face.x + face.w / 2 > W * 0.55 ? "right" : "left";

/**
 * §12c — Transformar: mascara, camera e veu no MESMO intervalo (smooth
 * 30q, start = tonica menos 18). A pessoa cede espaco, nao sai de cena.
 */
export const transformStage = (
  frame: number,
  tonicFrame: number,
  face: FaceBox,
  opts: { W?: number; H?: number; zoom?: number; d?: number; reverse?: boolean } = {},
) => {
  const { W = 1920, H = 1080, zoom = 1.12, d = DUR.reframe, reverse = false } = opts;
  const start = cueFrom(tonicFrame, "context");
  let p = tween({ frame, start, duration: d, from: 0, to: 1, ease: "smooth" });
  if (reverse) p = 1 - tween({ frame, start, duration: 24, from: 0, to: 1, ease: "easy" });
  const side = faceSide(face, W);
  const faceW = W * 0.4;
  const gutter = W * 0.06;
  const targetLeft = side === "left" ? gutter : W - gutter - faceW;
  const t = { top: H * 0.1, bottom: H * 0.1, left: targetLeft, right: W - targetLeft - faceW };
  const L = (v: number) => v * p;
  const r = 28 * p;
  const cx = face.x + face.w / 2;
  const cy = face.y + face.h / 2;
  const colCx = targetLeft + faceW / 2;
  const colCy = H * 0.5;
  const tx = (colCx - cx) * p;
  const ty = (colCy - cy) * p * 0.6;
  return {
    side,
    moldFrame: start + 20,
    mask: { clipPath: `inset(${L(t.top)}px ${L(t.right)}px ${L(t.bottom)}px ${L(t.left)}px round ${r}px)` },
    camera: {
      transformOrigin: `${cx}px ${cy}px`,
      transform: `translate(${tx}px, ${ty}px) scale(${1 + (zoom - 1) * p})`,
    },
    veil: { opacity: p, background: "#f5f5f7" },
    moldSlot:
      side === "left"
        ? { left: gutter + faceW + gutter, width: W - (gutter + faceW + gutter) - gutter, top: H * 0.1, height: H * 0.8 }
        : { left: gutter, width: W - (gutter + faceW + gutter) - gutter, top: H * 0.1, height: H * 0.8 },
  };
};

/** §12c — N3 em 16:9 nao recorta: veu escuro .6 em smooth 24q. */
export const darkenStage = (frame: number, tonicFrame: number) => ({
  opacity: 0.6 * tween({ frame, start: cueFrom(tonicFrame, "context"), duration: 24, from: 0, to: 1, ease: "smooth" }),
  background: "#1d1d1f",
});

/* ── §6 INTENCAO PARA MOTION ───────────────────────────────── */

export type Verb =
  | "revelar"
  | "construir"
  | "conectar"
  | "preencher"
  | "deslocar"
  | "comparar"
  | "acumular"
  | "crescer"
  | "cair"
  | "romper"
  | "substituir"
  | "selecionar"
  | "confirmar"
  | "medir"
  | "esperar"
  | "enviar"
  | "escrever"
  | "expandir"
  | "remover"
  | "alertar"
  | "nascer"
  | "continuar";

export type GestureSpec = {
  gesture: string;
  prop: string;
  ease: EaseToken | SpringToken;
  dur: DurClass | number;
  /** peso 0 a 10 = importancia visual = peso do som (sfx-map.json) */
  weight: Weight;
};

/** §6 — a tabela obrigatoria. O verbo da fala decide o gesto, nao o gosto. */
export const INTENT: Record<Verb, GestureSpec> = {
  revelar: { gesture: "reveal", prop: "opacity+blur", ease: "settleSoft", dur: "reveal", weight: 6 },
  construir: { gesture: "cascata", prop: "opacity+scale", ease: "settle", dur: "transfer", weight: 3 },
  conectar: { gesture: "tracado", prop: "strokeDashoffset", ease: "settleSoft", dur: "draw", weight: 4 },
  preencher: { gesture: "preenche", prop: "clip-path", ease: "settle", dur: "transfer", weight: 3 },
  deslocar: { gesture: "desloca", prop: "x/y", ease: "smooth", dur: "transfer", weight: 2 },
  comparar: { gesture: "confronto", prop: "foco alternado", ease: "smooth", dur: 16, weight: 3 },
  acumular: { gesture: "empilha", prop: "y da pilha", ease: "inertia", dur: 22, weight: 3 },
  crescer: { gesture: "sobe", prop: "scaleY bottom", ease: "lift", dur: "reorg", weight: 4 },
  cair: { gesture: "desaba", prop: "y+scaleY", ease: "gravity", dur: 18, weight: 5 },
  romper: { gesture: "quebra", prop: "recuo+avanco", ease: "anticipate", dur: 16, weight: 7 },
  substituir: { gesture: "troca", prop: "out e in com overlap 6q", ease: "smooth", dur: "transfer", weight: 3 },
  selecionar: { gesture: "foco", prop: "x,y,w,h,r do anel", ease: "smooth", dur: "transfer", weight: 3 },
  confirmar: { gesture: "confirmacao", prop: "fill+draw do check", ease: "overshootMicro", dur: 16, weight: 6 },
  medir: { gesture: "contador", prop: "valor", ease: "brake", dur: "count", weight: 5 },
  esperar: { gesture: "processo", prop: "progresso real", ease: "linear", dur: "count", weight: 0 },
  enviar: { gesture: "envio", prop: "trajeto", ease: "anticipate", dur: 18, weight: 6 },
  escrever: { gesture: "digitacao", prop: "largura/caret", ease: "linear", dur: "feedback", weight: 2 },
  expandir: { gesture: "expande", prop: "height+opacity", ease: "settleSoft", dur: 22, weight: 3 },
  remover: { gesture: "remove", prop: "opacity+colapso", ease: "easy", dur: "reveal", weight: 4 },
  alertar: { gesture: "alerta", prop: "cor+anel", ease: "settle", dur: "reveal", weight: 7 },
  nascer: { gesture: "materializa", prop: "scale+blur", ease: "elasticSoft", dur: "reorg", weight: 6 },
  continuar: { gesture: "rolagem", prop: "translateY", ease: "inertia", dur: "reorg", weight: 1 },
};

/* ── §3c SOM DERIVADO DO PESO ──────────────────────────────── */

export type SfxCue = {
  frame: number;
  weight: Weight;
  sfxId: string;
  gainDb: number;
  duck?: { fromFrame: number; toFrame: number; db: number };
};

/** §3b/§3c — volume pelo peso. Peso 0 e silencio obrigatorio. */
export const gainForWeight = (w: Weight): number =>
  w === 0 ? -Infinity : w <= 2 ? -21 : w <= 4 ? -16 : w <= 6 ? -13 : w <= 8 ? -10.5 : -9;

/**
 * §3c — cue de SFX derivado do spec, nunca escrito a mao. Dispara no
 * quadro em que o gesto ASSENTA (fim da cauda), menos quebra e entrada,
 * que soam no start.
 */
export const sfxCueFor = (s: MotionSpec, sfxId: string): SfxCue | null => {
  if (s.weight === 0) return null;
  const atStart = s.verb === "romper" || s.verb === "revelar" || s.verb === "nascer";
  const frame = atStart ? s.startFrame : s.startFrame + s.durationFrames;
  const cue: SfxCue = { frame, weight: s.weight, sfxId, gainDb: gainForWeight(s.weight) };
  if (s.weight >= 7) {
    cue.duck = {
      fromFrame: s.startFrame,
      toFrame: s.startFrame + (s.weight >= 9 ? 60 : 40),
      db: s.weight >= 9 ? -10 : -6,
    };
  }
  return cue;
};

/** §3c — nivel da trilha na cena, pelo peso maximo. */
export const musicLevelForScene = (specs: MotionSpec[]): number => {
  const max = Math.max(0, ...specs.map((s) => s.weight)) as Weight;
  return max <= 4 ? -18 : -16; // de 7 pra cima quem cuida e o ducking
};

/* ── §12b PIPELINE: FALA PARA VERBO ────────────────────────── */

export type WordTiming = { word: string; start: number; end: number; tonic: number; isStressed?: boolean };
export type Beat = { id: string; words: WordTiming[]; start: number; end: number; text: string };

/** §12b — lexico. A ordem e a prioridade: adversativa, numero, esquema, lista. */
export const LEXICON: Array<{ re: RegExp; verb: Verb }> = [
  { re: /\b(mas|porém|só que|o problema é|contudo)\b/i, verb: "romper" },
  { re: /(\bR\$|\d|por cento|\bvezes\b|\bem \w+ minutos?\b|\bmil\b|\bcem\b)/i, verb: "medir" },
  { re: /\b(porque|então|leva a|gera|resulta em|por isso)\b/i, verb: "conectar" },
  { re: /\b(ou|versus|em vez de|ao contrário de|enquanto)\b/i, verb: "comparar" },
  { re: /\b(primeiro|depois|por fim|etapa|passo|segundo|terceiro)\b/i, verb: "construir" },
  { re: /\b(se divide|caminhos|tipos de|ramos)\b/i, verb: "construir" },
  { re: /\b(poucos passam|filtra|só quem|cai|perde|desaba|some)\b/i, verb: "cair" },
  { re: /\b(cresce|sobe|aumenta|escala|dobra)\b/i, verb: "crescer" },
  { re: /\b(envia|manda|publica|clica|dispara)\b/i, verb: "enviar" },
  { re: /\b(pronto|feito|aprovado|confirmado|concluído)\b/i, verb: "confirmar" },
  { re: /\b(contém|dentro de|faz parte)\b/i, verb: "expandir" },
  { re: /\b(imagina|olha isso|por exemplo|repara)\b/i, verb: "revelar" },
];

export const classifyVerb = (text: string, fallback: Verb = "revelar"): Verb =>
  LEXICON.find((l) => l.re.test(text))?.verb ?? fallback;

/** §12b — agrupa palavras em beats: corta em conjuncao, pausa de 20q ou 300q. */
export function beatsFromWords(words: WordTiming[]): Beat[] {
  const beats: Beat[] = [];
  let cur: WordTiming[] = [];
  const flush = () => {
    if (cur.length) {
      beats.push({
        id: "B" + (beats.length + 1),
        words: cur,
        start: cur[0].start,
        end: cur[cur.length - 1].end,
        text: cur.map((w) => w.word).join(" "),
      });
      cur = [];
    }
  };
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    const prev = words[i - 1];
    const cut =
      prev &&
      (w.start - prev.end >= 20 ||
        /^(mas|porém|então|ou|depois)$/i.test(w.word) ||
        (cur.length > 0 && w.end - cur[0].start > 300));
    if (cut) flush();
    cur.push(w);
  }
  flush();
  for (let i = beats.length - 1; i > 0; i--) {
    if (beats[i].end - beats[i].start < 90) {
      const a = beats[i - 1];
      const b = beats[i];
      a.words.push(...b.words);
      a.end = b.end;
      a.text += " " + b.text;
      beats.splice(i, 1);
    }
  }
  return beats;
}

/** §12b — palavra tonica do beat: a ultima marcada, senao a mais longa. */
export const tonicWord = (b: Beat): WordTiming =>
  [...b.words].reverse().find((w) => w.isStressed) ??
  b.words.reduce((m, w) => (w.end - w.start > m.end - m.start ? w : m));

/* ── §8 A NATUREZA VENCE O GESTO ───────────────────────────── */

export type Nature =
  | "tempo-real"
  | "quantidade"
  | "dado-baseline"
  | "trajetoria"
  | "proporcao"
  | "direcao"
  | "fala"
  | "fila"
  | "grade"
  | "acao"
  | "estado-binario"
  | "veredito"
  | "interrupcao"
  | "identidade"
  | "relacao"
  | "estrutura"
  | "progressao"
  | "objeto"
  | "contexto"
  | "atencao"
  | "leitura"
  | "simbolo"
  | "evidencia"
  | "assinatura"
  | "ajuste"
  | "colecao";

/** §8 — quando natureza e gesto brigam, a natureza vence. */
export const NATURE_OVERRIDE: Partial<
  Record<Nature, Partial<GestureSpec> & { origin?: string; forbid?: string[] }>
> = {
  "tempo-real": { ease: "linear", forbid: ["acelerar", "girar sem prazo"] },
  quantidade: { ease: "brake", forbid: ["passar do valor"] },
  "dado-baseline": { ease: "lift", origin: "bottom center", forbid: ["crescer do centro"] },
  trajetoria: { ease: "settleSoft", origin: "left", forbid: ["aparecer inteira"] },
  fala: { ease: "settle", origin: "rabo do balao", forbid: ["entrar de cima"] },
  fila: { ease: "inertia", forbid: ["vizinho teleportar"] },
  atencao: { ease: "smooth", forbid: ["teleportar", "dois aneis"] },
  leitura: { ease: "settleSoft", forbid: ["blur em rotulo", "sair antes de lido"] },
  identidade: { ease: "settleSoft", forbid: ["respirar", "girar"] },
  assinatura: { ease: "elasticSoft", forbid: ["repetir no mesmo video"] },
};

/* ── §12 VALIDACAO ANTES DO RENDER ─────────────────────────── */

export type MotionSpec = {
  elementId: string;
  nature: Nature;
  verb: Verb;
  sizePx: number;
  startFrame: number;
  durationFrames: number;
  ease: EaseToken | SpringToken;
  weight: Weight;
  siblings?: number;
  ownerOfFocus?: boolean;
  holdFrames?: number;
  text?: string;
  orientation?: Orientation;
  stageState?: "full" | "face-mold" | "face-small" | "darkened";
};

/** §3b — no maximo dois gestos de peso 9 ou 10 no video inteiro. */
export function validateVideo(scenes: MotionSpec[][]): string[] {
  const sig = scenes.flat().filter((s) => s.weight >= 9);
  return sig.length > SIGNATURE_MAX_PER_VIDEO
    ? [
        `${sig.length} gestos de peso 9 ou 10 no video (maximo ${SIGNATURE_MAX_PER_VIDEO}): ` +
          sig.map((s) => s.elementId).join(", "),
      ]
    : [];
}

/** §12 — checklist de aprovacao de cena, em codigo. */
export function validateScene(specs: MotionSpec[], prevSceneVerb?: Verb): string[] {
  const errs: string[] = [];
  const owners = specs.filter((s) => s.ownerOfFocus);
  if (owners.length > 1) errs.push("Mais de um dono de foco: " + owners.map((o) => o.elementId).join(", "));

  let elastic = 0;
  for (const s of specs) {
    if (s.ease === "elasticSoft") elastic++;
    if (s.ease === "overshootMicro" && !(s.verb === "confirmar" && s.sizePx <= 48))
      errs.push(`${s.elementId}: overshootMicro so em confirmacao ate 48px — destaque nunca pula`);
    if ((s.ease === "overshootMicro" || s.ease === "elasticSoft") && s.sizePx > 120)
      errs.push(`${s.elementId}: overshoot so em objeto ate 120px (tem ${s.sizePx}px)`);
    const nat = NATURE_OVERRIDE[s.nature];
    if (nat?.ease && nat.ease !== s.ease)
      errs.push(`${s.elementId}: natureza "${s.nature}" exige ease "${nat.ease}", veio "${s.ease}"`);
    if (s.text && (s.holdFrames ?? 0) < holdFrames(s.text))
      errs.push(`${s.elementId}: hold ${s.holdFrames}q abaixo do minimo legivel ${holdFrames(s.text)}q`);
    if (s.siblings && s.siblings > 1) {
      const total = staggerStep(STEP.item, s.siblings) * (s.siblings - 1);
      if (total > STAGGER_CAP) errs.push(`${s.elementId}: cascata ${total}q acima do teto ${STAGGER_CAP}q`);
    }
  }
  if (elastic > 1) errs.push("Mais de um elasticSoft na cena");

  const sum = specs.reduce((a, s) => a + s.weight, 0);
  if (sum > SCENE_WEIGHT_MAX)
    errs.push(`Soma dos pesos ${sum} acima de ${SCENE_WEIGHT_MAX}: algum gesto mente sobre a propria importancia`);

  const heavy = specs.filter((s) => s.weight >= 7).sort((a, b) => a.startFrame - b.startFrame);
  for (let i = 1; i < heavy.length; i++) {
    if (heavy[i].startFrame - heavy[i - 1].startFrame < HEAVY_MIN_GAP)
      errs.push(
        `${heavy[i - 1].elementId} e ${heavy[i].elementId}: dois gestos de peso 7 ou mais a menos de ${HEAVY_MIN_GAP}q`,
      );
  }

  for (const s of specs) {
    if (s.nature === "leitura" && s.verb === "conectar" && s.weight !== 0)
      errs.push(`${s.elementId}: traco da palavra e peso 0 obrigatorio`);
    if (s.verb === "esperar" && s.weight !== 0) errs.push(`${s.elementId}: progresso em curso e peso 0`);
  }

  const main = specs.find((s) => s.ownerOfFocus) ?? specs[0];
  if (main && prevSceneVerb && main.verb === prevSceneVerb)
    errs.push(`Gesto principal "${main.verb}" repete a cena anterior (regra anti-repeticao §6.1)`);

  return errs;
}
