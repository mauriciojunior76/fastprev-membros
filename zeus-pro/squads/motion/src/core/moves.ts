/**
 * core/moves.ts — catálogo de movimentos parametrizados (M1), o coração da lib
 *
 * Cada MOVE é uma função (frame, fps, params) -> CSSProperties. Os params dão o
 * controle pedido no prompt mestre: intensity, duration, delay, direction,
 * distance, damping/mass/stiffness, blur, curve, seed.
 *
 * Regra embutida (BRABO ERRO14): entradas com scale têm teto ENTRY_SCALE_CEILING
 * (1.04). O check "scale de entrada > 1.04" do remotion-validate.js passa sempre.
 */

import React from "react";
import { ci, Direction } from "./primitives";
import { MOTION, ENTRY_SCALE_CEILING } from "./tokens";
import { resolveCurve, CurveName, EaseFn } from "./curves";
import { makeSpring } from "./springs";
import { wiggle } from "./rand";

export interface MoveParams {
  /** 0..1: escala distância, blur e amplitude juntos (default 0.6) */
  intensity?: number;
  durationInFrames?: number;
  delay?: number;
  direction?: Direction;
  /** px; sobrepõe o derivado de intensity */
  distance?: number;
  /** amplitude para loops (float, pulse) */
  amplitude?: number;
  damping?: number;
  mass?: number;
  stiffness?: number;
  /** px máximo de blur da transição */
  blur?: number;
  curve?: CurveName | EaseFn;
  /** exigido pelos moves com variação (handheld, shake) */
  seed?: string | number;
}

export type MoveStyle = (frame: number, fps: number, p?: MoveParams) => React.CSSProperties;

const SIGN: Record<Direction, [string, number]> = {
  left: ["X", -1],
  right: ["X", 1],
  top: ["Y", -1],
  bottom: ["Y", 1],
};

const dist = (p: MoveParams, base: number): number =>
  p.distance ?? base * (p.intensity ?? 0.6);

const blurOf = (p: MoveParams, base: number = MOTION.blur.medium): number =>
  p.blur ?? base * (p.intensity ?? 0.6);

// ─── ENTRADAS ────────────────────────────────────────────────────────────────

const fadeAxis = (axis: "X" | "Y", sign: number): MoveStyle => (frame, fps, p = {}) => {
  const d = p.delay ?? 0;
  const dur = p.durationInFrames ?? MOTION.durations.medium;
  const ease = resolveCurve(p.curve ?? "cinematic");
  const t = frame - d;
  const move = dist(p, 60);
  return {
    opacity: ci(t, [0, dur * 0.55], [0, 1], ease),
    filter: `blur(${ci(t, [0, dur * 0.5], [blurOf(p), 0], ease)}px)`,
    transform: `translate${axis}(${ci(t, [0, dur], [move * sign, 0], ease)}px)`,
  };
};

const fadeUp = fadeAxis("Y", 1);
const fadeDown = fadeAxis("Y", -1);

/** entrada com blur forte + leve movimento (padrão premium). */
const slideBlurIn: MoveStyle = (frame, fps, p = {}) => {
  const d = p.delay ?? 0;
  const dur = p.durationInFrames ?? MOTION.durations.medium;
  const [axis, sign] = SIGN[p.direction ?? "bottom"];
  const ease = resolveCurve(p.curve ?? "premium");
  const t = frame - d;
  return {
    opacity: ci(t, [0, dur * 0.5], [0, 1], ease),
    filter: `blur(${ci(t, [0, dur * 0.55], [blurOf(p, MOTION.blur.strong), 0], ease)}px)`,
    transform: `translate${axis}(${ci(t, [0, dur], [dist(p, 48) * sign, 0], ease)}px)`,
  };
};

/** overshoot de entrada com scale CLAMPADO no teto (nunca vira bounce amador). */
const overshootIn: MoveStyle = (frame, fps, p = {}) => {
  const d = p.delay ?? 0;
  const dur = p.durationInFrames ?? MOTION.durations.medium;
  const t = frame - d;
  const s = makeSpring(frame, fps, {
    preset: "snappy",
    delay: d,
    durationInFrames: dur,
    config: { damping: p.damping, mass: p.mass, stiffness: p.stiffness },
    from: 0.9,
    to: 1,
  });
  return {
    opacity: ci(t, [0, dur * 0.5], [0, 1], resolveCurve(p.curve ?? "overshoot")),
    transform: `scale(${Math.min(s, ENTRY_SCALE_CEILING)})`,
  };
};

/** peso: massa alta, distância curta, assenta com inércia. */
const riseHeavy: MoveStyle = (frame, fps, p = {}) => {
  const d = p.delay ?? 0;
  const dur = p.durationInFrames ?? MOTION.durations.slow;
  const ease = resolveCurve(p.curve ?? "weight");
  const t = frame - d;
  return {
    opacity: ci(t, [0, dur * 0.4], [0, 1], ease),
    transform: `translateY(${ci(t, [0, dur], [dist(p, 40), 0], ease)}px)`,
  };
};

/** flutuante: entrada leve dos dois lados. */
const floatIn: MoveStyle = (frame, fps, p = {}) => {
  const d = p.delay ?? 0;
  const dur = p.durationInFrames ?? MOTION.durations.slow;
  const ease = resolveCurve(p.curve ?? "floaty");
  const t = frame - d;
  return {
    opacity: ci(t, [0, dur * 0.6], [0, 1], ease),
    filter: `blur(${ci(t, [0, dur * 0.5], [blurOf(p, MOTION.blur.soft), 0], ease)}px)`,
    transform: `translateY(${ci(t, [0, dur], [dist(p, 24), 0], ease)}px)`,
  };
};

/** tipográfico: letter-spacing abre + blur some (entrada de título). */
const typeIn: MoveStyle = (frame, fps, p = {}) => {
  const d = p.delay ?? 0;
  const dur = p.durationInFrames ?? MOTION.durations.medium;
  const ease = resolveCurve(p.curve ?? "typographic");
  const t = frame - d;
  const track = ci(t, [0, dur], [(p.intensity ?? 0.6) * 14, 0], ease);
  return {
    opacity: ci(t, [0, dur * 0.55], [0, 1], ease),
    filter: `blur(${ci(t, [0, dur * 0.5], [blurOf(p, MOTION.blur.soft), 0], ease)}px)`,
    letterSpacing: `${track}px`,
  };
};

// ─── SAÍDAS ──────────────────────────────────────────────────────────────────

const exitQuadFactory = (withBlur: boolean): MoveStyle => (frame, fps, p = {}) => {
  const start = p.delay ?? 0;
  const dur = p.durationInFrames ?? MOTION.durations.fast + 6;
  const [axis, sign] = SIGN[p.direction ?? "top"];
  const ease = resolveCurve(p.curve ?? "impact");
  const move = p.distance ?? 1200;
  const base: React.CSSProperties = {
    opacity: ci(frame, [start + dur * 0.35, start + dur], [1, 0], ease),
    transform: `translate${axis}(${ci(frame, [start, start + dur], [0, move * sign], ease)}px) scale(${ci(frame, [start, start + dur], [1, 0.94], ease)})`,
  };
  if (withBlur) base.filter = `blur(${ci(frame, [start, start + dur], [0, MOTION.blur.strong], ease)}px)`;
  return base;
};

const exitQuad = exitQuadFactory(true);
const exitQuadNB = exitQuadFactory(false);

/** saída só com scale + fade (sem deslocamento), pra cortes suaves. */
const exitScaleFade: MoveStyle = (frame, fps, p = {}) => {
  const start = p.delay ?? 0;
  const dur = p.durationInFrames ?? MOTION.durations.fast;
  const ease = resolveCurve(p.curve ?? "premium");
  return {
    opacity: ci(frame, [start, start + dur], [1, 0], ease),
    transform: `scale(${ci(frame, [start, start + dur], [1, 0.96], ease)})`,
    filter: `blur(${ci(frame, [start, start + dur], [0, MOTION.blur.soft], ease)}px)`,
  };
};

// ─── ÊNFASE E LOOPS (determinísticos por frame/seed) ─────────────────────────

/** pulso de escala (respira uma vez). */
const pulse: MoveStyle = (frame, fps, p = {}) => {
  const start = p.delay ?? 0;
  const dur = p.durationInFrames ?? MOTION.durations.medium;
  const amp = p.amplitude ?? 0.04 * (p.intensity ?? 1);
  const t = ci(frame, [start, start + dur], [0, Math.PI]);
  return { transform: `scale(${1 + Math.sin(t) * amp})` };
};

/** respiração contínua (loop suave, determinístico). */
const breathe: MoveStyle = (frame, fps, p = {}) => {
  const amp = p.amplitude ?? 0.022;
  const speed = (p.intensity ?? 0.6) * 0.12;
  return { transform: `scale(${1 + Math.sin(frame * speed) * amp})` };
};

/** flutuação contínua vertical (loop). */
const floatLoop: MoveStyle = (frame, fps, p = {}) => {
  const amp = p.amplitude ?? 8;
  const speed = (p.intensity ?? 0.5) * 0.08;
  return { transform: `translateY(${Math.sin(frame * speed) * amp}px)` };
};

/** tremor de impacto por ruído determinístico (precisa de seed). */
const shakeImpact: MoveStyle = (frame, fps, p = {}) => {
  const start = p.delay ?? 0;
  const dur = p.durationInFrames ?? MOTION.durations.fast;
  const decay = ci(frame, [start, start + dur], [1, 0]);
  const amp = (p.amplitude ?? 12) * decay * (p.intensity ?? 1);
  const seed = p.seed ?? "shake";
  const x = wiggle(frame, fps, { seed: `${seed}-x`, freqPerSecond: 18, amplitude: amp });
  const y = wiggle(frame, fps, { seed: `${seed}-y`, freqPerSecond: 18, amplitude: amp });
  return { transform: `translate(${x}px, ${y}px)` };
};

export const MOVES = {
  fadeUp,
  fadeDown,
  slideBlurIn,
  overshootIn,
  riseHeavy,
  floatIn,
  typeIn,
  exitQuad,
  exitQuadNB,
  exitScaleFade,
  pulse,
  breathe,
  floatLoop,
  shakeImpact,
} as const satisfies Record<string, MoveStyle>;

export type MoveName = keyof typeof MOVES;

/** aplica um move pelo nome. */
export const applyMove = (
  name: MoveName,
  frame: number,
  fps: number,
  p?: MoveParams
): React.CSSProperties => MOVES[name](frame, fps, p);

/** compõe vários estilos (multiplica opacity, concatena transform/filter). */
export const composeMoves = (...styles: React.CSSProperties[]): React.CSSProperties => {
  const out: React.CSSProperties = {};
  let opacity = 1;
  const transforms: string[] = [];
  const filters: string[] = [];
  for (const s of styles) {
    if (s.opacity != null) opacity *= s.opacity as number;
    if (s.transform) transforms.push(s.transform);
    if (s.filter) filters.push(s.filter);
    Object.assign(out, s);
  }
  out.opacity = opacity;
  if (transforms.length) out.transform = transforms.join(" ");
  if (filters.length) out.filter = filters.join(" ");
  return out;
};
