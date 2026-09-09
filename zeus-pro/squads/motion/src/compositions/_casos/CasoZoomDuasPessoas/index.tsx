/**
 * CasoZoomDuasPessoas — fixture de regressao (fase 6). Ver choreography.ts.
 * Tiles de pessoa sao placeholder (gradiente), nunca video real: o objetivo
 * do fixture e provar a hierarquia de camadas, nao simular a call.
 */
import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { applyChoreo } from "../../../core/choreo-runtime";
import spec from "./choreography";

const FALA1 = spec.scenes[0];
const FALA2 = spec.scenes[1];

const PersonTile: React.FC<{ gradient: string }> = ({ gradient }) => (
  <div
    style={{
      width: "100%",
      height: 260,
      borderRadius: 16,
      background: gradient,
    }}
  />
);

const SceneFala1: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <>
      <div
        style={{
          ...applyChoreo(frame, FALA1, "legenda-1"),
          position: "absolute",
          left: 88,
          right: 88,
          top: 640,
          fontFamily: "Inter, -apple-system, sans-serif",
          fontSize: 40,
          fontWeight: 700,
          color: "#1d1d1f",
          textAlign: "center",
        }}
      >
        então como você faz isso
      </div>
      <div
        style={{
          ...applyChoreo(frame, FALA1, "grafico-apoio-1"),
          position: "absolute",
          left: "50%",
          top: 760,
          transform: "translateX(-50%)",
        }}
      >
        <svg width="72" height="72" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r="30" fill="none" stroke="#1d1d1f" strokeWidth="2.5" />
          <path d="M24 36 L34 46 L50 26" fill="none" stroke="#1d1d1f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </>
  );
};

const SceneFala2: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        ...applyChoreo(frame, FALA2, "legenda-2"),
        position: "absolute",
        left: 88,
        right: 88,
        top: 640,
        fontFamily: "Inter, -apple-system, sans-serif",
        fontSize: 40,
        fontWeight: 700,
        color: "#1d1d1f",
        textAlign: "center",
      }}
    >
      pergunta pro Zeus e ele resolve
    </div>
  );
};

export const TOTAL_FRAMES_CASO_ZOOM_2P = 135;

export const CasoZoomDuasPessoas: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#FFFFFF", padding: "160px 88px 0" }}>
      <PersonTile gradient="linear-gradient(135deg,#2c2c2e,#1c1c1e)" />
      <div style={{ height: 16 }} />
      <PersonTile gradient="linear-gradient(135deg,#c7c7cc,#aeaeb2)" />

      <Sequence from={FALA1.from} durationInFrames={FALA1.dur} layout="none">
        <SceneFala1 />
      </Sequence>
      <Sequence from={FALA2.from} durationInFrames={FALA2.dur} layout="none">
        <SceneFala2 />
      </Sequence>
    </AbsoluteFill>
  );
};
