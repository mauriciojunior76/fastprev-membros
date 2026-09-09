/**
 * CasoConceito — fixture de regressao (fase 6). Ver choreography.ts.
 */
import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { applyChoreo } from "../../../core/choreo-runtime";
import { ci } from "../../../core/primitives";
import spec from "./choreography";

const SETUP = spec.scenes[0];
const EXPLICACAO = spec.scenes[1];

const SceneSetup: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = ci(frame, [0, 22], [0, 1]);
  const dash = 2 * Math.PI * 60;
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
        <div style={applyChoreo(frame, SETUP, "icon-concept")}>
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle
              cx="70"
              cy="70"
              r="60"
              fill="none"
              stroke="#1d1d1f"
              strokeWidth="3"
              strokeDasharray={dash}
              strokeDashoffset={dash * (1 - draw)}
              strokeLinecap="round"
              transform="rotate(-90 70 70)"
            />
            <path
              d="M46 72 L64 90 L96 52"
              fill="none"
              stroke="#1d1d1f"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={70}
              strokeDashoffset={70 * (1 - ci(frame, [14, 30], [0, 1]))}
            />
          </svg>
        </div>
        <div
          style={{
            ...applyChoreo(frame, SETUP, "label-concept"),
            fontFamily: "Inter, -apple-system, sans-serif",
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#6e6e73",
          }}
        >
          Conceito validado
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneExplicacao: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: "0 88px" }}>
      <div
        style={{
          ...applyChoreo(frame, EXPLICACAO, "texto-explicacao"),
          fontFamily: "Inter, -apple-system, sans-serif",
          fontSize: 44,
          fontWeight: 700,
          letterSpacing: -0.6,
          textAlign: "center",
          color: "#1d1d1f",
          lineHeight: 1.15,
        }}
      >
        Cada ideia vira um passo verificável antes de virar código.
      </div>
    </AbsoluteFill>
  );
};

export const TOTAL_FRAMES_CASO_CONCEITO = 135;

export const CasoConceito: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#FFFFFF" }}>
      <Sequence from={SETUP.from} durationInFrames={SETUP.dur} layout="none">
        <SceneSetup />
      </Sequence>
      <Sequence from={EXPLICACAO.from} durationInFrames={EXPLICACAO.dur} layout="none">
        <SceneExplicacao />
      </Sequence>
    </AbsoluteFill>
  );
};
