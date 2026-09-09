/**
 * core/OpticalBox.tsx — alinha o CENTRO OPTICO de um elemento (nao o canto
 * do bounding box) a um ponto do grid. Companheiro de placeAt/
 * placeAtOpticalCenter em layout.ts; existe em arquivo separado porque
 * layout.ts e puro (sem JSX) e este componente precisa de React.
 *
 * Uso tipico: dois icones SVG com viewBox diferente (um 520x260, outro
 * 620x200) precisam compartilhar o mesmo eixo vertical no palco. Cada um
 * declara o proprio centro visual uma unica vez; o OpticalBox faz o resto.
 */

import React from "react";
import { CANVAS, OPTICAL_CENTER_Y, zoneCenterY, type ZoneName } from "./layout";

export interface OpticalBoxProps {
  width: number;
  height: number;
  /** centro visual do conteudo, em px dentro do proprio width/height.
   * Default: centro geometrico da caixa (width/2, height/2). */
  visualCenter?: { x: number; y: number };
  /** zona nomeada (label/hero/support) ou "optical" (centro optico da tela,
   * default). */
  zone?: ZoneName | "optical";
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const OpticalBox: React.FC<OpticalBoxProps> = ({
  width,
  height,
  visualCenter,
  zone = "optical",
  children,
  style,
}) => {
  const cx = visualCenter?.x ?? width / 2;
  const cy = visualCenter?.y ?? height / 2;
  const targetY = zone === "optical" ? OPTICAL_CENTER_Y : zoneCenterY(zone);

  return (
    <div
      style={{
        position: "absolute",
        left: CANVAS.width / 2 - cx,
        top: targetY - cy,
        width,
        height,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
