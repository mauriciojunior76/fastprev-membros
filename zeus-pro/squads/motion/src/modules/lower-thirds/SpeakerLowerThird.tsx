/**
 * modules/lower-thirds/SpeakerLowerThird.tsx — nome + cargo, para vídeo de
 * Zoom/call gravada (o caso de uso que motivou este módulo, ver
 * docs/zeus-motion-design-system.md seção 6: rosto > mensagem falada >
 * legenda > gráfico complementar. Este componente é o "gráfico
 * complementar" mais comum de todos, por isso nasce premium por padrão em
 * vez de reinventado ad-hoc a cada composition nova).
 */
import React from "react";
import { Easing } from "remotion";
import { ci, entryFrom, exitTo, mergeStyles } from "../../core/primitives";
import { MOTION } from "../../core/tokens";
import { SAFE } from "../../core/layout";
import { DEFAULT_THEME, LowerThirdTheme, LowerThirdTiming } from "./types";

export interface SpeakerLowerThirdProps extends LowerThirdTiming {
  name: string;
  role?: string;
  theme?: LowerThirdTheme;
}

export const SpeakerLowerThird: React.FC<SpeakerLowerThirdProps> = ({
  frame,
  startFrame,
  exitFrame,
  dir = "bottom",
  name,
  role,
  theme,
}) => {
  const t = { ...DEFAULT_THEME, ...theme };
  const local = frame - startFrame;

  const entry = entryFrom(local, dir, MOTION.distance.medium, MOTION.durations.medium);
  const exit =
    exitFrame != null
      ? exitTo(frame, exitFrame, dir, MOTION.distance.large, MOTION.durations.medium)
      : {};
  const style = mergeStyles(entry, exit);

  // linha de acento: desenha da esquerda pra direita nos primeiros frames da
  // entrada, nunca aparece seca (Mandamento 4: todo elemento que entra tem
  // blur; a linha usa scaleX em vez de blur, mais legível numa barra fina).
  const accentScale = ci(local, [0, MOTION.durations.fast], [0, 1], Easing.out(Easing.cubic));

  return (
    <div
      style={{
        ...style,
        position: "absolute",
        left: SAFE.marginX,
        bottom: SAFE.deadZoneCompensation,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        maxWidth: 640,
      }}
    >
      <div
        style={{
          width: 56,
          height: 4,
          borderRadius: 2,
          background: t.accent,
          transform: `scaleX(${accentScale})`,
          transformOrigin: "left center",
          marginBottom: 10,
        }}
      />
      <div
        style={{
          background: t.bg,
          borderRadius: 12,
          padding: "14px 22px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <span
          style={{
            fontFamily: "Inter, -apple-system, sans-serif",
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: -0.4,
            color: t.text,
            lineHeight: 1.15,
          }}
        >
          {name}
        </span>
        {role ? (
          <span
            style={{
              fontFamily: "Inter, -apple-system, sans-serif",
              fontSize: 20,
              fontWeight: 400,
              letterSpacing: 0.2,
              color: t.textMuted,
              lineHeight: 1.2,
            }}
          >
            {role}
          </span>
        ) : null}
      </div>
    </div>
  );
};
