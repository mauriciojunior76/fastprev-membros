/**
 * core/curves.ts — catálogo de curvas de movimento nomeadas (M1)
 *
 * 14 famílias pedidas no prompt mestre, cada uma uma função de easing (t -> t').
 * Base: Easing.bezier do Remotion (cubic-bezier determinístico). fromCssBezier
 * conecta os easings do design-core (que vêm como string "cubic-bezier(...)").
 *
 * Uso: passar a função ao ci()/interpolate como easing, ou resolver por nome
 * via resolveCurve("cinematic").
 */

import { Easing } from "remotion";

export type EaseFn = (t: number) => number;

/** cubic-bezier -> EaseFn. Aceita "cubic-bezier(a,b,c,d)" ou "a,b,c,d". */
export const fromCssBezier = (css: string): EaseFn => {
  const m = css.match(/-?\d*\.?\d+/g);
  if (!m || m.length < 4) return Easing.linear;
  const [x1, y1, x2, y2] = m.slice(0, 4).map(Number);
  return Easing.bezier(x1, y1, x2, y2);
};

export const CURVES = {
  // Easy Ease do After Effects (influencia 33% nas duas pontas). Default do
  // sistema a partir de 20/08/2026: suaviza comeco E fim de todo movimento,
  // pedido explicito do o dono do canal apos o Reels do Telegram sair com metade
  // dos movimentos lineares e a outra metade suave so numa ponta.
  easyEase: Easing.bezier(0.33, 0, 0.67, 1),
  // entrada e saída suave (padrão universal)
  smoothIn: Easing.bezier(0.4, 0, 1, 1),
  smoothOut: Easing.bezier(0, 0, 0.2, 1),
  smoothInOut: Easing.bezier(0.45, 0, 0.15, 1),
  // overshoot leve (passa do alvo e volta) — cuidado: só onde bounce é aceitável
  overshoot: Easing.bezier(0.34, 1.56, 0.64, 1),
  // bounce controlado (nunca estoura muito)
  bounceSoft: Easing.bezier(0.22, 1.2, 0.36, 1),
  // cinematográfico: a curva "Exemplo" (entra rápido, assenta devagar)
  cinematic: Easing.bezier(0.16, 1, 0.3, 1),
  // editorial: elegante, desaceleração longa
  editorial: Easing.bezier(0.25, 1, 0.5, 1),
  // tecnológico: preciso, quase mecânico mas com respiro
  tech: Easing.bezier(0.4, 0, 0.1, 1),
  // premium: suave dos dois lados, luxuoso
  premium: Easing.bezier(0.33, 0, 0.15, 1),
  // orgânico: aceleração e desaceleração naturais
  organic: Easing.bezier(0.37, 0, 0.28, 1),
  // dramático: segura e dispara
  dramatic: Easing.bezier(0.7, 0, 0.1, 1),
  // impacto: chega forte, freia seco
  impact: Easing.bezier(0.5, 0, 0.1, 1),
  // peso: começa lento (massa), ganha inércia
  weight: Easing.bezier(0.6, 0, 0.4, 1),
  // flutuante: leve dos dois lados
  floaty: Easing.bezier(0.3, 0.1, 0.3, 1),
  // interface: rápido e responsivo (UI motion)
  interface: Easing.bezier(0.2, 0, 0, 1),
  // tipográfico: entrada de texto refinada
  typographic: Easing.bezier(0.2, 0.8, 0.2, 1),

  /**
   * SETTLE: desaceleração LONGA e visível. Criada 27/08/2026 (7a rodada)
   * depois do pedido "ainda tá muito rápida, o tempo da desaceleração de
   * todos os elementos tem que ser maior".
   *
   * O diagnóstico que levou a ela: aumentar a DURAÇÃO não estava
   * resolvendo, porque a `cinematic` (a curva usada nas entradas) percorre
   * 97% do movimento na METADE do tempo. Medido: aos 60% do tempo faltava
   * só 1,2% do caminho. O resto da janela era movimento invisível, então
   * dobrar a duração só aumentava o tempo parado.
   *
   * Medições comparadas (progresso em cada fração do tempo):
   *   cinematic  25%->83%  50%->97%  70%->100%   (cauda 1,2%)
   *   settle     25%->46%  50%->72%  70%->87%    (cauda 19,8%)
   *   easyEase   25%->16%  50%->50%  78%->78%    (cauda 35,3%, mas começa lenta)
   *
   * settle começa firme (46% do caminho no primeiro quarto, não parece
   * preguiçosa) e ainda tem 20% do movimento pra fazer depois de 60% do
   * tempo: é aí que o olho VÊ a desaceleração. É a curva padrão de
   * entrada de elemento a partir desta rodada.
   */
  settle: Easing.bezier(0.1, 0.45, 0.75, 1),

  /** SETTLE mais longa ainda (cauda 23,4%), pra elemento grande e fecho:
   * onde a chegada tem que respirar mais. */
  settleSoft: Easing.bezier(0.12, 0.4, 0.8, 1),

  /**
   * Apelidos por FUNÇÃO, do Design System v2.1 do Claude Design (05/09/2026).
   * O painel deles batizou por papel na cena (resposta a um toque, troca de
   * estado, revelação de algo novo, saída) em vez de por sensação. Os quatro
   * cubic-bezier vieram BIT A BIT iguais aos nossos: não é curva nova, é
   * nome novo para as mesmas quatro. Mantidos os dois nomes porque código
   * existente já usa o de sensação; peça nova pode escrever o de função.
   */
  response: Easing.bezier(0.1, 0.45, 0.75, 1), // = settle
  transfer: Easing.bezier(0.45, 0, 0.15, 1), // = smoothInOut
  reveal: Easing.bezier(0.12, 0.4, 0.8, 1), // = settleSoft
  exit: Easing.bezier(0.33, 0, 0.67, 1), // = easyEase

  /* ================================================================
   * MANUAL DE MOTION v3.0 (Claude Design, 07/09/2026) — §2
   *
   * A assinatura do sistema virou CAUDA LONGA: ~90% da distancia nos
   * primeiros 40% do tempo, os 60% restantes so pra assentar. As quatro
   * do nucleo (settle, smooth, settleSoft, easy) vieram com bezier
   * DIFERENTE dos nossos homonimos de 27/08 e 05/09. Por isso entram com
   * sufixo V3, e nao por cima: peca ja aprovada (Carlos, Aline,
   * Clodoaldo, Fernanda, Hamilton, Paulo Ruiz) renderiza com o valor
   * antigo, e trocar o valor de `settle` no lugar mudaria o movimento
   * dessas pecas no proximo render, sem ninguem ver. Peca NOVA escreve
   * o token V3 (ou importa EASE de motion-spec.ts, que aponta pra ca).
   * Conflito registrado em design-system/motion/CONFLITOS-v3.md.
   * ================================================================ */

  /** v3 §2.1 — algo ENTRA e precisa assentar (item, cartao, balao). */
  settleV3: Easing.bezier(0.05, 0.7, 0.1, 1),
  /** v3 §2.1 — algo TROCA de lugar (foco, reposicao, swap). */
  smoothV3: Easing.bezier(0.6, 0, 0.05, 1),
  /** v3 §2.1 — algo e REVELADO (traco, painel, contexto, numero). */
  settleSoftV3: Easing.bezier(0.16, 0.84, 0.14, 1),
  /** v3 §2.1 — algo SAI (fade, recuo, blur out). */
  easyV3: Easing.bezier(0.4, 0, 0.2, 1),

  /* Camada avancada v3 §2.2 — cada uma tem UMA intencao. Usar fora dela
   * e defeito. Nao existiam no squad: entram com o nome do manual. */

  /** forca/decisao: recua ~4% antes de ir (botao que envia, virada). */
  anticipate: Easing.bezier(0.7, -0.2, 0.1, 1),
  /** chegada de item leve <=120px (check, badge, pin). Passa 1,5 a 2% e
   * volta. Nunca em painel, nunca em texto, nunca em destaque. */
  overshootMicro: Easing.bezier(0.16, 1.02, 0.2, 1),
  /** parada exata: contador que trava no numero, foco que crava. */
  brake: Easing.bezier(0, 0.9, 0.08, 1),
  /** queda/entrega: acelera ate o fim (download, valor que desaba). */
  gravity: Easing.bezier(0.32, 0, 0.88, 0.42),
  /** subida/aprovacao: sai rapido, sobe leve (valor que cresce). */
  lift: Easing.bezier(0.1, 0.9, 0.1, 1),
  /** tempo real APENAS: playback, cronometro, progresso medido. */
  linear: Easing.linear,
} as const satisfies Record<string, EaseFn>;

/** Nucleo v3 (§2.1): 90% das cenas novas usam so estas quatro. */
export const CURVAS_V3_NUCLEO = ["settleV3", "smoothV3", "settleSoftV3", "easyV3"] as const;

/** Camada avancada v3 (§2.2): uma intencao cada, uso justificado. */
export const CURVAS_V3_AVANCADAS = [
  "anticipate",
  "overshootMicro",
  "brake",
  "gravity",
  "lift",
  "linear",
] as const;

/**
 * Curvas de fora do vocabulário v2.1 ("uma curva fora de response/transfer/
 * reveal/exit é defeito", §9d). Não apagadas — Exemplo e peça antiga ainda
 * usam `cinematic`; ficam como legado, fora da lista que peça NOVA pode
 * escolher. Ver `legacy-allowlist.json` para quem ainda tem permissão.
 */
export type CurveName = keyof typeof CURVES;

export const CURVES_LEGADO: ReadonlyArray<CurveName> = [
  "cinematic",
  "dramatic",
  "overshoot",
  "bounceSoft",
];

/** Resolve nome de curva OU função direta OU string cubic-bezier -> EaseFn.
 * Fallback e easyEase (nao smoothOut): o default do sistema suaviza as DUAS
 * pontas, nunca so uma. */
export const resolveCurve = (c?: CurveName | EaseFn | string): EaseFn => {
  if (!c) return CURVES.easyEase;
  if (typeof c === "function") return c;
  if (c in CURVES) return CURVES[c as CurveName];
  if (typeof c === "string" && c.includes("bezier")) return fromCssBezier(c);
  return CURVES.easyEase;
};
