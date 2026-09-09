/**
 * modules/lower-thirds/ContextTag.tsx — rótulo curto de contexto (categoria,
 * "AO VIVO", timestamp). Suporta um indicador pulsante opcional (idle
 * motion: DNA do MagnaMotion, ver docs/zeus-motion-design-system.md seção 7,
 * a tela nunca deve congelar completamente enquanto o elemento está visível).
 */
import React from "react";
import { entryFrom, exitTo, mergeStyles } from "../../core/primitives";
import { MOTION } from "../../core/tokens";
import { SAFE } from "../../core/layout";
import { DEFAULT_THEME, LowerThirdTheme, LowerThirdTiming } from "./types";

export interface ContextTagProps extends LowerThirdTiming {
  label: string;
  pulseDot?: boolean;
  position?: "top-left" | "bottom-left";
  theme?: LowerThirdTheme;
}

export const ContextTag: React.FC<ContextTagProps> = ({
  frame,
  startFrame,
  exitFrame,
  dir = "left",
  label,
  pulseDot = false,
  position = "top-left",
  theme,
}) => {
  const t = { ...DEFAULT_THEME, ...theme };
  const local = frame - startFrame;

  const entry = entryFrom(local, dir, MOTION.distance.small, MOTION.durations.fast);
  const exit =
    exitFrame != null ? exitTo(frame, exitFrame, dir, MOTION.distance.medium, MOTION.durations.fast) : {};
  const style = mergeStyles(entry, exit);

  // idle motion do dot: pulso contínuo e sutil (nunca pisca forte, nunca para).
  const pulse = 0.6 + 0.4 * (0.5 + 0.5 * Math.sin(frame * 0.12));

  const anchor =
    position === "top-left"
      ? { top: SAFE.topDeadEnd, left: SAFE.marginX }
      : { bottom: SAFE.deadZoneCompensation, left: SAFE.marginX };

  return (
    <div
      style={{
        ...style,
        position: "absolute",
        ...anchor,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: t.bg,
        borderRadius: 999,
        padding: "8px 16px",
      }}
    >
      {pulseDot ? (
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: t.accent,
            opacity: pulse,
            flexShrink: 0,
          }}
        />
      ) : null}
      <span
        style={{
          fontFamily: "Inter, -apple-system, sans-serif",
          fontSize: 16,
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: t.text,
        }}
      >
        {label}
      </span>
    </div>
  );
};
