/**
 * core/layout.ts — grid oficial 1080x1920 como codigo (reforma do motion
 * design system, 19/08/2026)
 *
 * Ate aqui o grid so existia como arte ASCII em agents/layout-engineer.md.
 * Cada composition inventava suas proprias posicoes (o ZeusTrafegoReels
 * tinha stageBottomY:1620 em vez do 1632 oficial, sem a margem de 88px).
 * Este arquivo e a fonte de verdade; layout-engineer.md passa a apontar
 * pra ca. Os numeros abaixo sao os MESMOS do documento, so viraram
 * constante em vez de prosa.
 */

import type React from "react";

export const CANVAS = { width: 1080, height: 1920, fps: 60 } as const; // corrigido 05/09/2026: nada le este campo, mas 30 era bug latente contra o FPS=60 real das compositions (achado na leitura do Design System v2.1)

/** Zonas mortas e margens do grid oficial (agents/layout-engineer.md). */
export const SAFE = {
  marginX: 88, // 88..992 e a faixa horizontal util
  topDeadEnd: 160, // acima disso: camera, notificacoes, nunca usar
  bottomDeadStart: 1632, // abaixo disso: UI do Instagram/TikTok, nunca usar
  /**
   * DUAS CAIXAS, nao uma (06/09/2026).
   *
   * O pacote de design system chegou dizendo que o limite inferior e 1536
   * (20% da altura), e o motor sempre usou 1632 (15%). As duas contas estao
   * certas: partem de premissas diferentes, e NENHUMA das duas mediu o
   * aparelho. Os 96px em disputa sao justamente onde o Instagram desenha
   * legenda do post, arroba do autor, audio e botoes: conteudo ali nao
   * some, fica coberto de um jeito imprevisivel, porque a altura da UI
   * muda com o tamanho da legenda e com o aparelho.
   *
   * Em vez de escolher no chute, o sistema declara as duas:
   *   textoSeguroAte   1536  o que precisa ser LIDO para aqui
   *   bottomDeadStart  1632  o que so precisa ser DESENHADO pode ir ate aqui
   *
   * Assim a medida deixa de bloquear: texto usa o limite conservador, que
   * e seguro sob as duas hipoteses. Quem medir o aparelho (abrir um Reels
   * no celular mais estreito da audiencia, com legenda de duas linhas, e
   * ver em que Y comeca a area coberta) muda o numero AQUI, num lugar so.
   *
   * PREMISSA DECLARADA, NAO MEDIDA. O proprio pacote registra isso como
   * pendencia desde a v2.1: "areas seguras do Reels: preset declarado, nao
   * verificado contra a UI atual do app".
   */
  textoSeguroAte: 1536,
  /** paddingBottom que desloca o conteudo pra cima e compensa a dead zone
   * da base (documento chama de "15%" de 1920, que e este valor). */
  deadZoneCompensation: 288,
} as const;

/** Zonas verticais nomeadas, com os limites exatos do grid oficial. */
export const ZONES = {
  label: { y0: 160, y1: 280 },
  hero: { y0: 380, y1: 1100 },
  support: { y0: 1200, y1: 1450 },
} as const;

export type ZoneName = keyof typeof ZONES;

export const zoneCenterY = (zone: ZoneName): number => {
  const { y0, y1 } = ZONES[zone];
  return (y0 + y1) / 2;
};

/** Centro geometrico da tela (1920 / 2). Nao e o centro que PARECE centro. */
export const GEOMETRIC_CENTER_Y = CANVAS.height / 2;

/**
 * Centro optico: com o paddingBottom de compensacao aplicado, a area que o
 * olho le como "centralizada" e do topo ate (altura - compensacao), nao a
 * tela inteira. Formula, nao numero solto: (1920 - 288) / 2 = 816.
 */
export const OPTICAL_CENTER_Y = (CANVAS.height - SAFE.deadZoneCompensation) / 2;

/**
 * Estilo do container principal de uma cena: respeita a safe zone horizontal
 * (88px) e, por padrao, compensa a dead zone da base (paddingBottom). E a
 * traducao direta do "Layout Padrao: Cena Centrada" do layout-engineer.md.
 */
export const safeStage = (opts?: { compensateDeadZone?: boolean }): React.CSSProperties => ({
  justifyContent: "center",
  alignItems: "center",
  paddingLeft: SAFE.marginX,
  paddingRight: SAFE.marginX,
  paddingTop: 0,
  paddingBottom: opts?.compensateDeadZone === false ? 0 : SAFE.deadZoneCompensation,
});

/**
 * Posiciona um elemento pelo seu CENTRO OPTICO dentro de uma zona nomeada,
 * nao pelo canto do bounding box. Resolve o problema classico de dois
 * elementos com viewBox/tamanho diferentes "flutuando" em eixos distintos:
 * cada um declara o proprio visualCenter (em px, dentro do proprio
 * width/height) uma unica vez, e o layout alinha esse ponto ao eixo da zona.
 */
export const placeAt = (
  zone: ZoneName,
  size: { w: number; h: number },
  visualCenter?: { x: number; y: number }
): React.CSSProperties => {
  const cx = visualCenter?.x ?? size.w / 2;
  const cy = visualCenter?.y ?? size.h / 2;
  const targetY = zoneCenterY(zone);
  return {
    position: "absolute",
    left: CANVAS.width / 2 - cx,
    top: targetY - cy,
    width: size.w,
    height: size.h,
  };
};

/**
 * Igual a placeAt, mas mira o CENTRO OPTICO da tela (OPTICAL_CENTER_Y) em
 * vez de uma zona fixa. Uso tipico: palco de motion que ocupa uma faixa
 * livre de altura variavel (a reforma do ZeusTrafegoReels usa isto).
 */
export const placeAtOpticalCenter = (
  size: { w: number; h: number },
  visualCenter?: { x: number; y: number }
): React.CSSProperties => {
  const cx = visualCenter?.x ?? size.w / 2;
  const cy = visualCenter?.y ?? size.h / 2;
  return {
    position: "absolute",
    left: CANVAS.width / 2 - cx,
    top: OPTICAL_CENTER_Y - cy,
    width: size.w,
    height: size.h,
  };
};

/**
 * Gabarito do palco derivado da legenda da propria peca (06/09/2026).
 *
 * POR QUE EXISTE: cada composition escrevia STAGE_SAFE na mao, e o resultado
 * foi quatro pecas com quatro gabaritos diferentes, todas partindo do mesmo
 * 1632 mas com legendas distintas (Fernanda 1106/134 -> 415/485; Paulo
 * 1100/122 -> 427/497; ZeusTrafego 360/470; Bernardo 480/600). Foi essa
 * divergencia que fez a comparacao com o pacote de design system nao fechar:
 * o documento de arbitragem leu o gabarito do Paulo achando que era do motor.
 *
 * O numero de cada peca nao muda ao adotar isto; muda a ORIGEM: passa a ser
 * conta, nao digitacao. Peca ja aprovada nao recalibra sozinha (mesma regra
 * de core/scales.ts): migra quando for re-renderizada por demanda real.
 */
export type GabaritoDoPalco = {
  /** onde o palco comeca, ja considerando legenda ligada ou calada */
  topo: number;
  /** altura para o que precisa ser LIDO (texto, numero, rotulo) */
  seguro: number;
  /** altura para o que so precisa ser DESENHADO (trilho, conector, celula) */
  desenhavel: number;
};

export const gabaritoDoPalco = (opts: {
  /** centro vertical da faixa de legenda da peca */
  captionCenterY: number;
  /** altura da faixa de legenda da peca */
  captionBandH: number;
  /** deslocamento vertical do bloco de video no modo expandido (negativo) */
  shiftY?: number;
  /** cena que cala a legenda herda o canal dela e ganha altura */
  captionMuted?: boolean;
  /** respiro entre o canal da fala e o palco */
  gap?: number;
}): GabaritoDoPalco => {
  const shift = opts.shiftY ?? 0;
  const gap = opts.gap ?? SAFE.marginX / 2;
  const meia = opts.captionBandH / 2;
  const topoDaLegenda = opts.captionCenterY - meia + shift;
  const baseDaLegenda = opts.captionCenterY + meia + shift;
  const topo = opts.captionMuted ? topoDaLegenda : baseDaLegenda + gap;
  return {
    topo,
    seguro: Math.max(0, Math.round(SAFE.textoSeguroAte - topo)),
    desenhavel: Math.max(0, Math.round(SAFE.bottomDeadStart - topo)),
  };
};

/* ==================================================================
 * PALCO HORIZONTAL 16:9 — MANUAL DE MOTION v3.0 §12c
 *
 * No vertical o molde cobre a pessoa. No 16:9 a tela e larga: quando o
 * motion entra, a imagem se TRANSFORMA. Recorta ate o rosto, desliza pra
 * um lado, e o molde ocupa o outro. A pessoa cede espaco, nunca sai de
 * cena. Um movimento so (o "Transformar" do OBS), com a curva, a massa e
 * o tempo do sistema.
 *
 * O movimento em si (mascara, camera e veu no mesmo intervalo) mora em
 * core/motion-spec.ts, funcao transformStage(). Aqui ficam so as
 * PROPORCOES, que sao layout e nao movimento.
 * ================================================================== */

export const CANVAS_WIDE = { width: 1920, height: 1080, fps: 60 } as const;

/** §12c — as proporcoes do palco horizontal, em fracao da largura. */
export const WIDE = {
  /** coluna do rosto: 36% a 42% da largura, alvo 40%. */
  rostoMin: 0.36,
  rostoAlvo: 0.4,
  rostoMax: 0.42,
  /** coluna do molde: 46% a 52% da largura. */
  moldeMin: 0.46,
  moldeMax: 0.52,
  /** respiro entre as colunas e nas bordas. */
  gutter: 0.06,
  /** margem vertical do recorte, em fracao da altura. */
  margemVertical: 0.1,
  /** raio do recorte do rosto, em px. */
  raio: 28,
  /** o rosto nunca fica abaixo disto, em px de altura. */
  rostoAlturaMinPx: 640,
  /** zoom da camera durante o Transformar. */
  zoomMin: 1.08,
  zoomMax: 1.14,
} as const;

/** §12c — os quatro estados do palco horizontal, com o peso de cada um. */
export const ESTADOS_WIDE = {
  /** plano inteiro, legenda embaixo. */
  "palco-cheio": { rostoFracao: 1, moldeFracao: 0, peso: 4 },
  /** recorte do rosto num lado, molde no outro. O estado de trabalho. */
  "rosto-e-molde": { rostoFracao: WIDE.rostoAlvo, moldeFracao: 0.5, peso: 5 },
  /** rosto pequeno num canto (1:1, raio 24), molde ocupa 70%. */
  "rosto-pequeno": { rostoFracao: 0.22, moldeFracao: 0.7, peso: 4 },
  /** N3 e numero-heroi: NAO recorta, escurece com veu .6 e a palavra materializa. */
  escurecido: { rostoFracao: 1, moldeFracao: 0, peso: 10 },
} as const;

export type EstadoWide = keyof typeof ESTADOS_WIDE;

/**
 * §12c — geometria das duas colunas do palco horizontal, em px.
 * `lado` e o lado do ROSTO; o molde vai sempre no oposto. Quem decide o
 * lado e faceSide() de motion-spec.ts: o rosto vai pra onde ja esta, e
 * centrado vai pra esquerda (sentido da leitura).
 */
export const colunasWide = (
  lado: "left" | "right",
  opts?: { W?: number; H?: number; rostoFracao?: number },
) => {
  const W = opts?.W ?? CANVAS_WIDE.width;
  const H = opts?.H ?? CANVAS_WIDE.height;
  const gutter = W * WIDE.gutter;
  const rostoW = W * (opts?.rostoFracao ?? WIDE.rostoAlvo);
  const moldeW = W - rostoW - gutter * 3;
  const top = H * WIDE.margemVertical;
  const height = H * (1 - WIDE.margemVertical * 2);
  return lado === "left"
    ? {
        rosto: { left: gutter, width: rostoW, top, height },
        molde: { left: gutter * 2 + rostoW, width: moldeW, top, height },
      }
    : {
        rosto: { left: W - gutter - rostoW, width: rostoW, top, height },
        molde: { left: gutter, width: moldeW, top, height },
      };
};
