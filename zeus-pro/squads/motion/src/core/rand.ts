/**
 * core/rand.ts — aleatoriedade DETERMINÍSTICA por seed (M1)
 *
 * Nada de Math.random nem Date.now: tudo deriva de seed + frame, entao preview e
 * render batem byte a byte e dois renders do mesmo trecho sao idênticos.
 *
 * wiggle usa @remotion/noise (simplex determinístico) como base de handheld,
 * flutuação e efeitos com variação orgânica.
 */

import { noise2D, noise3D } from "@remotion/noise";

/** Hash FNV-1a: string/number -> uint32 estável (mesma entrada, mesma saída). */
export const hashSeed = (seed: string | number): number => {
  const s = String(seed);
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
};

/** PRNG mulberry32: retorna uma função () => [0,1) determinística pela seed. */
export const seededRandom = (seed: string | number): (() => number) => {
  let a = hashSeed(seed);
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

/** Número em [min, max) a partir de um gerador. */
export const randRange = (rng: () => number, min: number, max: number): number =>
  min + rng() * (max - min);

/** Escolhe um item do array de forma determinística. */
export const pick = <T>(rng: () => number, arr: readonly T[]): T =>
  arr[Math.floor(rng() * arr.length)];

export interface WiggleParams {
  seed: string | number;
  /** ciclos por segundo (frequência do movimento) */
  freqPerSecond?: number;
  /** amplitude do deslocamento (nas mesmas unidades do consumidor: px, deg...) */
  amplitude: number;
  /** camadas de ruído somadas (detalhe); default 1 */
  octaves?: number;
}

/**
 * Deslocamento contínuo por frame (ruído simplex determinístico).
 * A seed em número vira coordenada Y fixa, separando canais (ex: x vs y vs rot).
 */
export const wiggle = (frame: number, fps: number, p: WiggleParams): number => {
  const { seed, freqPerSecond = 1.5, amplitude, octaves = 1 } = p;
  const seedNum = hashSeed(seed) % 100000;
  const t = (frame / fps) * freqPerSecond;
  let value = 0;
  let amp = 1;
  let freq = 1;
  let norm = 0;
  for (let o = 0; o < octaves; o++) {
    value += noise2D(seedNum, t * freq, seedNum * 0.001) * amp;
    norm += amp;
    amp *= 0.5;
    freq *= 2;
  }
  return (value / norm) * amplitude;
};

/** Ruído 2D/3D determinístico reexportado para efeitos avançados (displacement etc). */
export { noise2D, noise3D };
