/**
 * core/choreo-runtime.ts — execucao de coreografia dentro da composition
 * (reforma do motion design system, 19/08/2026)
 *
 * Separado de choreo.ts de proposito: choreo.ts define o FORMATO do spec
 * (dados puros, sem import de React/Remotion, pra o choreo-lint conseguir
 * ler qualquer choreography.ts com esbuild puro). Este arquivo executa o
 * spec de verdade — importa entryFrom/exitTo/mergeStyles de primitives.ts,
 * que dependem de Remotion — e so deve ser importado de DENTRO de uma
 * composition (MotionStage.tsx e equivalentes), nunca do validador Node.
 */

import type React from "react";
import { entryFrom, exitTo, mergeStyles } from "./primitives";
import type { SceneChoreo } from "./choreo";

/**
 * Combina a entrada e a saida de UM elemento dentro de UMA cena, a partir
 * do spec. O palco (ex.: MotionStage.tsx) so chama isto — nao decide mais
 * direcao/distancia/duracao no proprio componente React.
 *
 * localFrame: frame atual relativo ao INICIO DA CENA (mesma convencao que
 * o codigo ja usava: videoLocalFrame - startF).
 */
export const applyChoreo = (
  localFrame: number,
  scene: SceneChoreo,
  elementId: string
): React.CSSProperties => {
  const el = scene.elements.find((e) => e.id === elementId);
  if (!el) return {};

  const entryDelay = el.entry.delayF ?? 0;
  const entry = entryFrom(
    localFrame - entryDelay,
    el.entry.dir,
    el.entry.distance,
    el.entry.dur,
    el.entry.ease
  );

  let exit: React.CSSProperties = {};
  if (el.exit && scene.exitF != null) {
    exit = exitTo(localFrame, scene.exitF, el.exit.dir, el.exit.distance, el.exit.dur, el.exit.ease);
  }

  return mergeStyles(entry, exit);
};
