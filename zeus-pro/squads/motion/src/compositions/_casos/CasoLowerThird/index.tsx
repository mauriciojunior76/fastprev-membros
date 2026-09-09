/**
 * CasoLowerThird — fixture de regressao (fase 6). Ver choreography.ts.
 */
import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { SpeakerLowerThird, ContextTag } from "../../../modules/lower-thirds";

export const TOTAL_FRAMES_CASO_LOWER_THIRD = 130;

export const CasoLowerThird: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#F5F5F7" }}>
      <Sequence from={0} durationInFrames={78} layout="none">
        <SpeakerLowerThird
          frame={frame}
          startFrame={0}
          exitFrame={56}
          name="Carol Paixão"
          role="Mentora, Fábrica de Mentores"
        />
      </Sequence>
      <Sequence from={70} durationInFrames={60} layout="none">
        <ContextTag frame={frame} startFrame={70} label="AO VIVO" pulseDot position="top-left" />
      </Sequence>
    </AbsoluteFill>
  );
};
