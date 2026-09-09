/**
 * AcentoDePassagem — a nota que não pertence à escala.
 *
 * O QUE É: quando a fala TOCA numa plataforma (WhatsApp, e-mail, perfil,
 * notificação) sem que o assunto do trecho seja aquilo, a variante de
 * interface entra PEQUENA, POR CIMA da cena que já está no palco, no canto
 * direito, e sai. Não troca o molde principal, não troca a legenda e não
 * pega o portador de cor.
 *
 * POR QUE EXISTE (Design System 3.3, recebido em 06/09/2026): as variantes
 * de interface só eram recrutadas quando a cena INTEIRA era sobre o
 * aplicativo, porque a regra mandava "menção vira mini-selo, sem painel".
 * Como a maioria das falas apenas MENCIONA, elas quase nunca apareciam. O
 * acento é a peça que faltava, e de quebra é remédio de ritmo: uma cena de
 * densidade 3 com acento lê como 3, 1, 3, e quebra a monotonia sem trocar
 * o palco.
 *
 * A SPEC (interface-registry.json → acento_de_passagem):
 *   densidade 1 · 40 a 60 quadros · escala 0,55 a 0,7 · canto direito com
 *   24 de margem, nunca o centro (o centro é do molde principal) ·
 *   entrada reveal 12q com y de -16 a 0 · saída exit 12q com y de 0 a -12 ·
 *   o acento NÃO leva o portador de cor.
 *
 * LIMITES (o gate `acento-limite` do choreo-lint cobra):
 *   um por cena · nunca em cena de densidade 4 ou 5 · nunca dois em cenas
 *   vizinhas · máximo 3 por minuto · se precisa de mais de 60 quadros para
 *   ser entendido, o trecho era sobre a plataforma e vira cena de interface.
 *
 * COMO USAR: envolve uma variante de interface que JÁ EXISTE na peça. Esta
 * peça não desenha nada por conta própria: ela só posiciona, escala, e faz
 * entrar e sair. Quem desenha é o filho.
 *
 *   <AcentoDePassagem de={120} ate={172} larguraDoPalco={904}>
 *     <MeuPainelDeChat />
 *   </AcentoDePassagem>
 *
 * NÃO tem `CONTENT_H`: o acento não ocupa o palco, ele passa por cima. E
 * não tem `SFX_EVENTS`: densidade 1 não leva som próprio (o som da cena
 * continua sendo o do molde principal).
 */
import React from "react";
import { useCurrentFrame } from "remotion";
import { ci } from "./primitives";
import { CURVES } from "./curves";

/** Janela que a spec permite. Fora dela o gate reprova. */
export const ACENTO_DUR_MIN = 40;
export const ACENTO_DUR_MAX = 60;

/** Entrada e saída, em quadros (reveal 12q / exit 12q). */
const ENTRA = 12;
const SAI = 12;

/** Margem do canto, pela spec. */
const MARGEM = 24;

export type AcentoProps = {
  /** quadro LOCAL da cena em que o acento entra */
  de: number;
  /** quadro LOCAL em que termina de sair */
  ate: number;
  /** largura útil do palco, para ancorar no canto direito */
  larguraDoPalco: number;
  /** largura natural do filho, antes da escala */
  larguraDoFilho: number;
  /** 0,55 a 0,7 pela spec; fora disso o gate reprova */
  escala?: number;
  /** canto vertical: o de cima é o padrão (não briga com a legenda) */
  canto?: "superior" | "inferior";
  /** altura útil do palco, necessária só para o canto inferior */
  alturaDoPalco?: number;
  children: React.ReactNode;
};

export const AcentoDePassagem: React.FC<AcentoProps> = ({
  de,
  ate,
  larguraDoPalco,
  larguraDoFilho,
  escala = 0.62,
  canto = "superior",
  alturaDoPalco = 0,
  children,
}) => {
  const frame = useCurrentFrame();

  // Fora da janela o acento não existe no DOM: não é opacidade zero, é
  // ausência. Elemento invisível ainda ocupa camada e ainda aparece em
  // captura de quadro, e o acento tem que sumir de verdade.
  if (frame < de - 1 || frame > ate + 1) return null;

  const op = Math.min(
    ci(frame, [de, de + ENTRA], [0, 1], CURVES.settleSoft),
    ci(frame, [ate - SAI, ate], [1, 0], CURVES.easyEase)
  );
  if (op <= 0.01) return null;

  // y: entra de -16 e sai para -12, sempre por cima (nunca subindo do fundo,
  // que leria como elemento nascendo na cena).
  const yEntrada = ci(frame, [de, de + ENTRA], [-16, 0], CURVES.settleSoft);
  const ySaida = ci(frame, [ate - SAI, ate], [0, -12], CURVES.easyEase);
  const y = frame >= ate - SAI ? ySaida : yEntrada;

  const larguraEscalada = larguraDoFilho * escala;
  const left = larguraDoPalco - larguraEscalada - MARGEM;

  return (
    <div
      style={{
        position: "absolute",
        left,
        top: canto === "superior" ? MARGEM : undefined,
        bottom: canto === "inferior" ? MARGEM : undefined,
        width: larguraDoFilho,
        transform: `scale(${escala}) translateY(${y}px)`,
        transformOrigin: canto === "superior" ? "top right" : "bottom right",
        opacity: op,
        pointerEvents: "none",
      }}
    >
      {children}
    </div>
  );
};

/**
 * A conta que o gate usa e que o plano de cenas deve respeitar. Exportada
 * para o verificador não reimplementar a régra por fora: uma régua que vive
 * em dois lugares diverge no dia em que alguém muda um dos dois.
 */
export const acentoValido = (de: number, ate: number, escala = 0.62): { ok: boolean; motivo: string } => {
  const dur = ate - de;
  if (dur < ACENTO_DUR_MIN || dur > ACENTO_DUR_MAX) {
    return {
      ok: false,
      motivo: `acento de ${dur}q: a janela e ${ACENTO_DUR_MIN} a ${ACENTO_DUR_MAX}. Abaixo nao da tempo de ler; acima o trecho era sobre a plataforma e vira cena de interface`,
    };
  }
  if (escala < 0.55 || escala > 0.7) {
    return { ok: false, motivo: `escala ${escala}: a spec pede 0,55 a 0,7 (menor nao se le, maior compete com o molde principal)` };
  }
  return { ok: true, motivo: "" };
};
