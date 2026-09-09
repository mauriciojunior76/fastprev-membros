/**
 * Root.tsx — ponto de entrada do Remotion.
 *
 * Este arquivo não veio no pacote do Zeus Pro (a distribuição trouxe as
 * primitivas de src/core/ e alguns exemplos em _casos/, mas não o Root que
 * registra compositions). Criado em 2026-09-09 para poder efetivamente
 * renderizar com o Zeus Motion, registrando por enquanto só o necessário
 * para a pauta de conteúdo da FastPrev.
 */
import React from "react";
import { Composition } from "remotion";
import { CapaFastPrev, capaFastPrevDefaults, TOTAL_FRAMES_CAPA_FASTPREV } from "./compositions/CapaFastPrev";
import { FORMATS } from "./brand/formats";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CapaFastPrev"
        component={CapaFastPrev}
        durationInFrames={TOTAL_FRAMES_CAPA_FASTPREV}
        fps={FORMATS.VERTICAL.fps}
        width={FORMATS.VERTICAL.width}
        height={FORMATS.VERTICAL.height}
        defaultProps={capaFastPrevDefaults}
      />
    </>
  );
};
