/**
 * CasoTextoImpacto — fixture de regressao (fase 6). Ver choreography.ts.
 */
import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { applyChoreo } from "../../../core/choreo-runtime";
import { ci, wordEntry } from "../../../core/primitives";
import { MOTION } from "../../../core/tokens";
import spec from "./choreography";

const FRASE = spec.scenes[0];
const ASSINATURA = spec.scenes[1];
const WORDS = ["Regra", "estrutural", "vira", "estrutura."];

const SceneFrase: React.FC = () => {
  // frame local: dentro do <Sequence from={FRASE.from}>, useCurrentFrame()
  // ja vem relativo ao inicio desta cena (0 no primeiro frame da cena) —
  // mesma convencao de FRASE.exitF, que tambem e relativo ao inicio da cena.
  const frame = useCurrentFrame();
  const exitOpacity = FRASE.exitF != null ? ci(frame, [FRASE.exitF, FRASE.exitF + 18], [1, 0]) : 1;
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: "0 88px" }}>
      <div style={{ opacity: exitOpacity, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 }}>
        {WORDS.map((word, wi) => {
          const startFrame = wi * MOTION.stagger.word * 2;
          return (
            <span
              key={word}
              style={{
                ...wordEntry(frame, startFrame),
                fontFamily: "Inter, -apple-system, sans-serif",
                fontSize: 72,
                fontWeight: 800,
                letterSpacing: -1.5,
                color: "#1d1d1f",
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const SceneAssinatura: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          ...applyChoreo(frame, ASSINATURA, "assinatura"),
          fontFamily: "Inter, -apple-system, sans-serif",
          fontSize: 28,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#6e6e73",
        }}
      >
        Zeus Motion Design System
      </div>
    </AbsoluteFill>
  );
};

export const TOTAL_FRAMES_CASO_TEXTO_IMPACTO = 132;

export const CasoTextoImpacto: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#FFFFFF" }}>
      <Sequence from={FRASE.from} durationInFrames={FRASE.dur} layout="none">
        <SceneFrase />
      </Sequence>
      <Sequence from={ASSINATURA.from} durationInFrames={ASSINATURA.dur} layout="none">
        <SceneAssinatura />
      </Sequence>
    </AbsoluteFill>
  );
};
