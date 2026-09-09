/**
 * CasoFluxoVisual — fixture de regressao (fase 6). Ver choreography.ts.
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { childDelay } from "../../../core/choreo";
import { ci } from "../../../core/primitives";
import spec from "./choreography";

const SCENE = spec.scenes[0];
const NODE_EL = SCENE.elements[0];
const LABELS = ["Ideia", "Spec", "Código"];

const Node: React.FC<{ index: number; x: number }> = ({ index, x }) => {
  const frame = useCurrentFrame();
  const delay = childDelay(NODE_EL, index);
  const local = frame - delay;
  const pop = ci(local, [0, 16], [0, 1]);
  const draw = ci(local, [4, 20], [0, 1]);
  const dash = 2 * Math.PI * 34;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: 860,
        transform: `translate(-50%, -50%) scale(${pop})`,
        opacity: pop,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle
          cx="40"
          cy="40"
          r="34"
          fill="none"
          stroke="#1d1d1f"
          strokeWidth="3"
          strokeDasharray={dash}
          strokeDashoffset={dash * (1 - draw)}
          transform="rotate(-90 40 40)"
        />
        <text x="40" y="47" textAnchor="middle" fontSize="22" fontWeight={700} fill="#1d1d1f">
          {index + 1}
        </text>
      </svg>
      <span style={{ fontFamily: "Inter, -apple-system, sans-serif", fontSize: 20, fontWeight: 600, color: "#424245" }}>
        {LABELS[index]}
      </span>
    </div>
  );
};

const Connector: React.FC<{ index: number; x1: number; x2: number }> = ({ index, x1, x2 }) => {
  const frame = useCurrentFrame();
  // conecta depois que os 2 nos vizinhos ja comecaram a entrar.
  const delay = childDelay(NODE_EL, index) + 10;
  const draw = ci(frame - delay, [0, 16], [0, 1]);
  return (
    <svg
      style={{ position: "absolute", left: x1, top: 860, transform: "translateY(-50%)" }}
      width={x2 - x1}
      height="4"
    >
      <line x1="0" y1="2" x2={x2 - x1} y2="2" stroke="#d2d2d7" strokeWidth="3" />
      <line
        x1="0"
        y1="2"
        x2={(x2 - x1) * draw}
        y2="2"
        stroke="#1d1d1f"
        strokeWidth="3"
      />
    </svg>
  );
};

export const TOTAL_FRAMES_CASO_FLUXO_VISUAL = 100;

export const CasoFluxoVisual: React.FC = () => {
  const positions = [260, 540, 820];
  return (
    <AbsoluteFill style={{ background: "#FFFFFF" }}>
      <div
        style={{
          position: "absolute",
          top: 380,
          left: 88,
          right: 88,
          textAlign: "center",
          fontFamily: "Inter, -apple-system, sans-serif",
          fontSize: 44,
          fontWeight: 700,
          color: "#1d1d1f",
        }}
      >
        Como uma regra vira código
      </div>
      <Connector index={0} x1={positions[0]} x2={positions[1]} />
      <Connector index={1} x1={positions[1]} x2={positions[2]} />
      {positions.map((x, i) => (
        <Node key={i} index={i} x={x} />
      ))}
    </AbsoluteFill>
  );
};
