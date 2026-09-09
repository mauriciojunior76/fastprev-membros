/**
 * CapaFastPrev — capa de Reels da Academia FastPrev, um hook por peça.
 *
 * Reaproveita as primitivas reais do Zeus Motion (ci, wordEntry de
 * core/primitives.ts) em vez de reinventar a entrada de texto. Composition
 * pensada para render de FRAME ÚNICO (still): a palavra final assentada
 * fica em repouso a partir de ~frame 45, então uma still nesse frame mostra
 * o hook inteiro, legível, sem nenhuma palavra ainda em transição.
 *
 * Marca vem de loadBrand("fastprev") — nunca cor solta no componente.
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame, staticFile } from "remotion";
import { ci, wordEntry } from "../../core/primitives";
import { MOTION } from "../../core/tokens";
import { loadBrand } from "../../brand/loader";
import { FORMATS } from "../../brand/formats";

/**
 * Inter local, servida de public/fonts/ em vez de @remotion/google-fonts:
 * o Chrome headless deste ambiente não confia no bundle de CA do proxy de
 * saída, então buscar a fonte direto do Google no momento do render falha
 * (net::ERR_CERT_AUTHORITY_INVALID). O arquivo já foi baixado uma vez via
 * curl (que confia no bundle) e vive local — zero rede no render.
 */
const INTER = "Inter-FastPrev";
const FONT_FACE = `
@font-face {
  font-family: '${INTER}';
  font-style: normal;
  font-weight: 500 800;
  font-display: block;
  src: url('${staticFile("fonts/Inter-latin.woff2")}') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}`;

const SAFE = FORMATS.VERTICAL.safeZone;

export interface CapaFastPrevProps {
  tema: string;
  hook: string;
  assinatura: string;
}

export const capaFastPrevDefaults: CapaFastPrevProps = {
  tema: "Regularização",
  hook: "Isso aqui pode estar acontecendo com o SEU imóvel agora",
  assinatura: "@mauricio_fastprev",
};

export const CapaFastPrev: React.FC<CapaFastPrevProps> = ({
  tema = capaFastPrevDefaults.tema,
  hook = capaFastPrevDefaults.hook,
  assinatura = capaFastPrevDefaults.assinatura,
}) => {
  const b = loadBrand("fastprev");
  const frame = useCurrentFrame();
  const words = hook.split(" ");

  // badge: entra rápido e cedo (feedback), assentado bem antes do hook
  const badgeOpacity = ci(frame, [0, 10], [0, 1]);
  const badgeY = ci(frame, [0, 10], [10, 0]);

  // assinatura: entra por último, depois da última palavra do hook assentar
  const lastWordStart = (words.length - 1) * MOTION.stagger.word * 2;
  const assinaturaStart = lastWordStart + 20;
  const assinaturaOpacity = ci(frame, [assinaturaStart, assinaturaStart + 14], [0, 1]);

  return (
    <AbsoluteFill style={{ background: b.colors.bg }}>
      <style>{FONT_FACE}</style>
      {/* glow de fundo, mesma assinatura visual do hero do site real (radial verde sutil) */}
      <div
        style={{
          position: "absolute",
          right: -260,
          top: -220,
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${b.colors.primary}22 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -220,
          bottom: -260,
          width: 760,
          height: 760,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${b.colors.accent}14 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill
        style={{
          padding: `${FORMATS.VERTICAL.height * SAFE.top}px ${FORMATS.VERTICAL.width * (1 - SAFE.right)}px`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* badge do tema */}
        <div
          style={{
            opacity: badgeOpacity,
            transform: `translateY(${badgeY}px)`,
            alignSelf: "flex-start",
            fontFamily: INTER,
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "0.09em",
            textTransform: "uppercase",
            color: b.colors.primary,
            background: `${b.colors.primary}1a`,
            border: `2px solid ${b.colors.primary}40`,
            borderRadius: 999,
            padding: "14px 32px",
          }}
        >
          {tema}
        </div>

        {/* hook, palavra por palavra */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            gap: "0 20px",
            rowGap: 14,
          }}
        >
          {words.map((word, wi) => {
            const startFrame = wi * MOTION.stagger.word * 2;
            return (
              <span
                key={`${word}-${wi}`}
                style={{
                  ...wordEntry(frame, startFrame),
                  fontFamily: INTER,
                  fontWeight: b.typography.weight_display,
                  fontSize: 96,
                  lineHeight: 1.08,
                  letterSpacing: "-1.5px",
                  color: b.colors.text,
                }}
              >
                {word}
              </span>
            );
          })}
        </div>

        {/* assinatura */}
        <div
          style={{
            opacity: assinaturaOpacity,
            fontFamily: INTER,
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: "0.04em",
            color: b.colors.text_secondary,
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: b.colors.primary }} />
          {assinatura}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const TOTAL_FRAMES_CAPA_FASTPREV = 150;
