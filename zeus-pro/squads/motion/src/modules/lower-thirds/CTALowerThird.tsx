/**
 * modules/lower-thirds/CTALowerThird.tsx — chamada de ação ancorada na base,
 * texto curto + seta desenhada. Pulso de chamada é sutil e contínuo (idle
 * motion), nunca bounce/wiggle (proibições absolutas do padrão, ver
 * padrao-aprovado-zeus-motion.md PARTE 10.3).
 */
import React from "react";
import { entryFrom, exitTo, mergeStyles } from "../../core/primitives";
import { MOTION } from "../../core/tokens";
import { SAFE } from "../../core/layout";
import { DEFAULT_THEME, LowerThirdTheme, LowerThirdTiming } from "./types";

export interface CTALowerThirdProps extends LowerThirdTiming {
  text: string;
  theme?: LowerThirdTheme;
}

export const CTALowerThird: React.FC<CTALowerThirdProps> = ({
  frame,
  startFrame,
  exitFrame,
  dir = "bottom",
  text,
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

  // seta: leve respiração vertical contínua (idle motion senoidal, DNA
  // MagnaMotion). Amplitude pequena o bastante pra nunca virar bounce.
  const arrowY = Math.sin(frame * 0.15) * 3;

  return (
    <div
      style={{
        ...style,
        position: "absolute",
        left: SAFE.marginX,
        right: SAFE.marginX,
        bottom: SAFE.deadZoneCompensation,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        background: t.accent,
        borderRadius: 999,
        padding: "16px 28px",
      }}
    >
      <span
        style={{
          fontFamily: "Inter, -apple-system, sans-serif",
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: -0.2,
          color: t.text,
        }}
      >
        {text}
      </span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        style={{ transform: `translateY(${arrowY}px)` }}
      >
        <path
          d="M4 8 L10 14 L16 8"
          fill="none"
          stroke={t.text}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
