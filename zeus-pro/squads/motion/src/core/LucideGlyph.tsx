/**
 * core/LucideGlyph.tsx — desenha um ícone Lucide com traço calculado pelo
 * tamanho de exibição, no formato do Design System v2.1 (05/09/2026).
 *
 * Por que não `lucide-react`: aquele pacote devolve um `<svg>` pronto, sem
 * acesso a cada `<path>` isolado — e o traçado por `strokeDasharray` +
 * `getTotalLength()` (a "gramática de traço", §9a do guia recebido) precisa
 * de cada path com seu próprio comprimento. O pacote `lucide` (sem o
 * `-react`) exporta o nó cru: `["svg", atributosDoSvg, filhos[]]`, cada
 * filho `[tag, atributos]`. Este componente percorre esse nó e desenha.
 *
 * Versão fixada em 0.452.0 (package.json), como o guia pede ("Lucide
 * 0.452"). Trocar de versão é decisão consciente, nunca `^`/`~` solto.
 *
 * GESTO INTERNO (06/09/2026, ver `core/gestoDoIcone.ts`): opcional e
 * aditivo. Sem a prop `gesto`, o desenho abaixo é BYTE A BYTE o mesmo de
 * antes — peça aprovada não muda porque nada aqui é automático.
 */
import React, { useMemo } from "react";
import { interpolate } from "remotion";
import type { GestoIcone } from "./gestoDoIcone";

export type LucideIconNode = readonly [string, Record<string, string | number>, ReadonlyArray<readonly [string, Record<string, string | number>]>?];

/**
 * Espessura de traço pelo tamanho de exibição (px do ícone na tela, não o
 * viewBox de 24). clamp(1.25, 2, 160/tamanho): a 80px ou menos o traço é 2
 * (o Lucide original); acima disso afina até o piso 1,25 (~140px+).
 * Equivalente ao `6.5 × 24 / tamanho` do CHANGELOG (mesmo resultado nos
 * pontos citados: 80→2, 116→1,4, 140+→1,25); a forma em `160/tamanho` casa
 * com a nossa constante de traço óptico já usada em `drawUtils.tsx`.
 */
export const strokeWidthPorTamanho = (tamanho: number): number =>
  Math.min(2, Math.max(1.25, 160 / tamanho));

export interface LucideGlyphProps {
  /** Nó do ícone, ex.: `import { Crown } from "lucide"`. */
  icone: LucideIconNode;
  /** Tamanho de exibição em px (lado do quadrado que contém o ícone). */
  tamanho: number;
  /** Progresso do desenho, 0 a 1. 1 = ícone completo (uso normal). */
  desenho?: number;
  cor?: string;
  style?: React.CSSProperties;
  /** Gesto interno opcional: anima a peça certa do ícone (ver
   *  `core/gestoDoIcone.ts`). Importado pelo MESMO nome do ícone, ex.
   *  `gesto={GESTOS.Clock}` junto de `import { Clock } from "lucide"`. */
  gesto?: GestoIcone;
  /** Frame LOCAL do gesto: 0 = início do movimento interno. Independente
   *  do delay de entrada do ícone (os dois podem ser diferentes). Só
   *  importa quando `gesto` é passado. */
  frameGesto?: number;
}

/**
 * Ícone Lucide, traço calculado pelo tamanho, com desenho progressivo
 * opcional (`desenho < 1`) via `strokeDasharray`. Cada `<path>`/`<circle>`/
 * `<line>`/`<polyline>`/`<rect>` do ícone recebe a MESMA fração de desenho:
 * é uma aproximação por comprimento nominal do viewBox 24×24 do Lucide
 * (não mede `getTotalLength` em tempo de render, que exigiria DOM real);
 * suficiente para o efeito de entrada, não para sincronismo fino por trecho.
 */
export const LucideGlyph: React.FC<LucideGlyphProps> = ({ icone, tamanho, desenho = 1, cor = "currentColor", style, gesto, frameGesto = 0 }) => {
  const [, , filhos = []] = icone;
  const sw = strokeWidthPorTamanho(tamanho);
  const dashFracBase = useMemo(() => interpolate(desenho, [0, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), [desenho]);

  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="none" stroke={cor} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={style}>
      {filhos.map(([tag, attrs], i) => {
        const Tag = tag as keyof React.JSX.IntrinsicElements;
        const g = gesto?.porFilho(i, frameGesto);
        // Comprimento nominal generoso (32) cobre qualquer path do
        // conjunto 24x24 do Lucide sem precisar medir no DOM.
        const dashFrac = g?.desenho !== undefined ? g.desenho : dashFracBase;
        const elProps: Record<string, unknown> = { ...attrs };
        if (dashFrac < 1) {
          elProps.strokeDasharray = 32;
          elProps.strokeDashoffset = 32 * (1 - dashFrac);
        }
        if (g?.opacidade !== undefined) elProps.opacity = g.opacidade;
        const el = <Tag {...elProps} />;
        return g?.transform ? (
          <g key={i} transform={g.transform}>
            {el}
          </g>
        ) : (
          <React.Fragment key={i}>{el}</React.Fragment>
        );
      })}
    </svg>
  );
};
