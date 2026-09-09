/**
 * CasoEstatistica — fixture de regressao (fase 6). Ver choreography.ts.
 */
import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { applyChoreo } from "../../../core/choreo-runtime";
import { ci } from "../../../core/primitives";
import spec from "./choreography";

const NUMERO = spec.scenes[0];
const CONTEXTO = spec.scenes[1];

const SceneNumero: React.FC = () => {
  const frame = useCurrentFrame();
  const value = Math.round(ci(frame, [10, 46], [0, 82]));
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            ...applyChoreo(frame, NUMERO, "numero-hero"),
            fontFamily: "Inter, -apple-system, sans-serif",
            fontSize: 160,
            fontWeight: 800,
            letterSpacing: -4,
            color: "#1d1d1f",
            lineHeight: 1,
          }}
        >
          {value}%
        </div>
        <div
          style={{
            ...applyChoreo(frame, NUMERO, "label-numero"),
            marginTop: 12,
            fontFamily: "Inter, -apple-system, sans-serif",
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#6e6e73",
          }}
        >
          Taxa de aprovação
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneContexto: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: "0 88px" }}>
      <div
        style={{
          ...applyChoreo(frame, CONTEXTO, "texto-contexto"),
          fontFamily: "Inter, -apple-system, sans-serif",
          fontSize: 36,
          fontWeight: 500,
          textAlign: "center",
          color: "#1d1d1f",
          lineHeight: 1.25,
        }}
      >
        Medido nas últimas 30 composições que passaram pelo gate visual.
      </div>
    </AbsoluteFill>
  );
};

export const TOTAL_FRAMES_CASO_ESTATISTICA = 132; // numero(80) overlap-anchored em contexto(from72+dur60=132)

export const CasoEstatistica: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#FFFFFF" }}>
      <Sequence from={NUMERO.from} durationInFrames={NUMERO.dur} layout="none">
        <SceneNumero />
      </Sequence>
      <Sequence from={CONTEXTO.from} durationInFrames={CONTEXTO.dur} layout="none">
        <SceneContexto />
      </Sequence>
    </AbsoluteFill>
  );
};
