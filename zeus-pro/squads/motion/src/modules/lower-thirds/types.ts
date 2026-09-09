/**
 * modules/lower-thirds/types.ts — tipos compartilhados das 3 variantes.
 *
 * Primeiro módulo do squad construído "premium por padrão" desde o primeiro
 * commit: sobre core/layout.ts (safe area), core/primitives.ts (entryFrom/
 * exitTo, nunca entrada seca) e core/springs.ts (SPRING.*, nunca config
 * inline). Reforma do motion design system, 20/08/2026.
 */
import type { Direction } from "../../core/primitives";

/** Tema de cor: todo módulo aceita override, nunca hardcoda a paleta de um
 * projeto específico (Zeus branco, Exemplo rosegold, Apple preto...). Default
 * é neutro (Apple-like) pra funcionar sem nenhuma prop extra. */
export interface LowerThirdTheme {
  bg?: string;
  text?: string;
  textMuted?: string;
  accent?: string;
}

export const DEFAULT_THEME: Required<LowerThirdTheme> = {
  bg: "rgba(10,10,12,0.86)",
  text: "#FFFFFF",
  textMuted: "rgba(255,255,255,0.62)",
  accent: "#0071E3",
};

/** Toda variante aceita a mesma janela de tempo: entra em startFrame, some em
 * exitFrame (se ausente, fica na tela até o fim da composition/sequence). */
export interface LowerThirdTiming {
  frame: number;
  startFrame: number;
  exitFrame?: number;
  /** direção de entrada e saída, ver core/choreo alternateDir pra escolher
   * sem repetir a direção do elemento anterior na mesma composition. */
  dir?: Direction;
}
