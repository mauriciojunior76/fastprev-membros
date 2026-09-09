/**
 * core/primitives.ts — primitivas base BRABO (M1)
 *
 * Migradas de src/motion-tokens.ts. Mesmas assinaturas (byte-compatíveis com o
 * consumidor atual Captions.tsx, que importa via a fachada motion-tokens.ts).
 * Aditivos: wordEntry, blurIn, iconPop (consolidados do ExemploMotion/effects.ts).
 *
 * Easy Ease (20/08/2026): todo movimento aqui suaviza as DUAS pontas por
 * padrão (CURVES.easyEase), inclusive opacidade (antes linear em toda
 * função). Cada função aceita `ease?` pra sobrescrever quando justificado.
 * Byte-compatibilidade preservada pra quem já usava o default: duração e
 * distância não mudam, só a curva; consumidores atuais (ZeusTrafegoReels,
 * CasoLowerThird, CasoTextoImpacto — todos desta reforma, nenhum vídeo
 * legado consome este arquivo, ver core/springs.ts sobre a mesma doutrina
 * de identidade).
 */

import React from "react";
import { interpolate } from "remotion";
import { MOTION, MOTION_LEGACY } from "./tokens";
import { resolveCurve } from "./curves";
import type { EaseFn, CurveName } from "./curves";

export type Ease = CurveName | EaseFn;

/** clamped interpolate — NUNCA usar interpolate cru (ci é lei BRABO). */
export const ci = (
  frame: number,
  [f0, f1]: [number, number],
  [v0, v1]: [number, number],
  ease?: EaseFn
): number =>
  interpolate(frame, [f0, f1], [v0, v1], {
    easing: ease,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export type Direction = "left" | "right" | "top" | "bottom";
const SIGN_MAP: Record<Direction, [string, number]> = {
  left: ["X", -1],
  right: ["X", 1],
  top: ["Y", -1],
  bottom: ["Y", 1],
};

/** entrada profissional: opacity + blur + movimento (zero entrada seca). */
export const entryFrom = (
  frame: number,
  dir: Direction,
  distance: number = MOTION_LEGACY.entryDistance,
  dur: number = MOTION_LEGACY.entryDuration,
  ease?: Ease
): React.CSSProperties => {
  const [axis, sign] = SIGN_MAP[dir];
  const fn = resolveCurve(ease);
  const pos = ci(frame, [0, dur], [distance * sign, 0], fn);
  return {
    opacity: ci(frame, [0, Math.round(dur * 0.55)], [0, 1], fn),
    transform: `translate${axis}(${pos}px)`,
    filter: `blur(${ci(frame, [0, Math.round(dur * 0.45)], [MOTION_LEGACY.entryBlurPeak, 0], fn)}px)`,
  };
};

/** Saída Quadrupla: posição + blur + opacity + scale (Mandamento 9). */
export const exitTo = (
  frame: number,
  start: number,
  dir: Direction,
  distance: number = MOTION_LEGACY.exitDistance,
  dur: number = MOTION_LEGACY.exitDuration,
  ease?: Ease
): React.CSSProperties => {
  const [axis, sign] = SIGN_MAP[dir];
  const fn = resolveCurve(ease);
  return {
    opacity: ci(frame, [start + dur * 0.35, start + dur], [1, 0], fn),
    transform: `translate${axis}(${ci(frame, [start, start + dur], [0, distance * sign], fn)}px) scale(${ci(frame, [start, start + dur], [1, MOTION_LEGACY.exitScaleTarget], fn)})`,
    filter: `blur(${ci(frame, [start, start + dur], [0, MOTION_LEGACY.exitBlurPeak], fn)}px)`,
  };
};

/** NB = No Blur — para container pai de gradient text (ERRO1/ERRO3). */
export const exitToNB = (
  frame: number,
  start: number,
  dir: Direction,
  distance: number = MOTION_LEGACY.exitDistance,
  dur: number = MOTION_LEGACY.exitDuration,
  ease?: Ease
): React.CSSProperties => {
  const [axis, sign] = SIGN_MAP[dir];
  const fn = resolveCurve(ease);
  return {
    opacity: ci(frame, [start + dur * 0.35, start + dur], [1, 0], fn),
    transform: `translate${axis}(${ci(frame, [start, start + dur], [0, distance * sign], fn)}px) scale(${ci(frame, [start, start + dur], [1, MOTION_LEGACY.exitScaleTarget], fn)})`,
  };
};

/** combina CSSProperties de entrada + saída sem sobrescrever transform/filter/opacity. */
export const mergeStyles = (
  entry: React.CSSProperties,
  exit: React.CSSProperties
): React.CSSProperties => ({
  ...entry,
  ...exit,
  opacity: ((entry.opacity as number) ?? 1) * ((exit.opacity as number) ?? 1),
  transform: [entry.transform, exit.transform].filter(Boolean).join(" "),
  filter: [entry.filter, exit.filter].filter(Boolean).join(" "),
});

// ─── Aditivos consolidados (ExemploMotion/effects.ts) ──────────────────────────

/** entrada de palavra: opacity + blur + translateY + scale (word-sync). */
export const wordEntry = (
  frame: number,
  startFrame: number,
  entryDur: number = MOTION_LEGACY.wordEntryDuration,
  ease?: Ease
): React.CSSProperties => {
  const t = frame - startFrame;
  const fn = resolveCurve(ease);
  return {
    opacity: ci(t, [0, entryDur * 0.6], [0, 1], fn),
    filter: `blur(${ci(t, [0, entryDur * 0.5], [MOTION.blur.medium, 0], fn)}px)`,
    transform: `translateY(${ci(t, [0, entryDur], [MOTION_LEGACY.wordTranslateY, 0], fn)}px) scale(${ci(t, [0, entryDur], [MOTION_LEGACY.wordScaleFrom, 1], fn)})`,
  };
};

/** só o blur de entrada (proporcional à velocidade). */
export const blurIn = (
  frame: number,
  startFrame: number,
  dur: number = MOTION_LEGACY.wordEntryDuration,
  maxBlur: number = MOTION.blur.medium,
  ease?: Ease
): number => ci(frame - startFrame, [0, dur], [maxBlur, 0], resolveCurve(ease));

/** pop de ícone: escala com leve overshoot CLAMPADO no teto (sem bounce amador). */
export const iconPop = (
  frame: number,
  startFrame: number,
  dur: number = MOTION_LEGACY.iconPopDuration,
  ease?: Ease
): React.CSSProperties => {
  const t = frame - startFrame;
  const fn = resolveCurve(ease);
  const s = ci(t, [0, dur], [MOTION_LEGACY.iconPopScaleFrom, 1], fn);
  return {
    opacity: ci(t, [0, dur * 0.5], [0, 1], fn),
    transform: `scale(${Math.min(s, MOTION.scale.cameraIn)})`,
  };
};
