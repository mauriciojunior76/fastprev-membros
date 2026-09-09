/**
 * core/springs.ts — springs parametrizados (M1)
 *
 * Os 7 presets de SPRING ficam intactos em tokens.ts. Aqui adicionamos
 * makeSpring: um wrapper sobre spring() do Remotion que aceita preset + overrides,
 * delay e mapeamento pra duracao em frames. Determinístico (função de frame).
 */

import { spring } from "remotion";
import { SPRING, SpringPresetName, SpringConfig } from "./tokens";

export { SPRING };
export type { SpringPresetName, SpringConfig };

export interface SpringOpts {
  preset?: SpringPresetName;
  config?: Partial<SpringConfig>;
  delay?: number;
  durationInFrames?: number;
  reverse?: boolean;
  from?: number;
  to?: number;
}

/**
 * Valor de spring [from..to] (default 0..1) no frame atual.
 * Combina um preset nomeado com overrides pontuais. Nunca usa relógio real.
 */
export const makeSpring = (
  frame: number,
  fps: number,
  opts: SpringOpts = {}
): number => {
  const { preset = "text", config, delay = 0, durationInFrames, reverse = false, from = 0, to = 1 } = opts;
  const base = SPRING[preset];
  return spring({
    frame,
    fps,
    delay,
    durationInFrames,
    reverse,
    from,
    to,
    config: { ...base, ...config },
  });
};

/**
 * SPRING_LEGACY — as 9 combinacoes EXATAS de config inline encontradas nas
 * 22 chamadas spring() de src/modules (reforma do motion design system,
 * 19/08/2026). Nome nunca semantico de proposito: sXXdYY[mZZ] = stiffness,
 * damping, mass. Migrar um modulo pra makeLegacySpring() com a chave certa
 * NAO MUDA o movimento de nenhum video ja renderizado (prova: diff-frames.py
 * nas sentinelas de baseline). Nunca aproximar por um preset SEMANTICO
 * (SPRING.card etc): isso mudaria damping/mass e mudaria o movimento.
 * Evolucao pra um preset com intencao so acontece em consumo NOVO,
 * nunca retroativo — ver docs/zeus-motion-design-system.md.
 */
export const SPRING_LEGACY = {
  s80d18: { stiffness: 80, damping: 18 },
  s60d18: { stiffness: 60, damping: 18 },
  s100d20: { stiffness: 100, damping: 20 },
  s200d15: { stiffness: 200, damping: 15 },
  s200d20: { stiffness: 200, damping: 20 },
  s300d20: { stiffness: 300, damping: 20 },
  s300d10m05: { stiffness: 300, damping: 10, mass: 0.5 },
  s120d22m09: { stiffness: 120, damping: 22, mass: 0.9 },
  s160d22m08: { stiffness: 160, damping: 22, mass: 0.8 },
  // Migrado de ZeusSealClose.tsx (spring cru, pego pelo choreo-lint check
  // "spring-cru" em 26/08/2026): a chamada só sobrescrevia damping e mass,
  // então stiffness ficou no default do Remotion (100, ver
  // node_modules/remotion/dist/cjs/spring/spring-utils.js). Byte a byte
  // idêntico ao original: spring({config:{damping:14,mass:0.9}}).
  s100d14m09: { stiffness: 100, damping: 14, mass: 0.9 },
} as const;

export type SpringLegacyKey = keyof typeof SPRING_LEGACY;

export interface LegacySpringOpts {
  delay?: number;
  durationInFrames?: number;
  reverse?: boolean;
  from?: number;
  to?: number;
}

/**
 * Igual a makeSpring, mas SEM merge com nenhum preset base: o config vem
 * INTEIRO de SPRING_LEGACY, byte a byte. makeSpring faz `{...base, ...config}`
 * com base=SPRING["text"] por default: se o override nao redeclarar TODO
 * campo do preset base (ex.: "mass"), o valor do preset vaza pro resultado
 * final e o spring passa a se comportar diferente do original. Para
 * migracao de identidade (fase 3 da reforma), usar sempre esta funcao.
 */
export const makeLegacySpring = (
  frame: number,
  fps: number,
  key: SpringLegacyKey,
  opts: LegacySpringOpts = {}
): number => {
  const { delay = 0, durationInFrames, reverse = false, from = 0, to = 1 } = opts;
  return spring({
    frame,
    fps,
    delay,
    durationInFrames,
    reverse,
    from,
    to,
    config: SPRING_LEGACY[key],
  });
};
