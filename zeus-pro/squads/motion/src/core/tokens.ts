/**
 * core/tokens.ts — MOTION e SPRING (BRABO Motion OS v9.0)
 *
 * Migrado de src/motion-tokens.ts na reforma M1. O motion-tokens.ts virou
 * fachada que reexporta daqui, entao consumidores antigos nao quebram.
 *
 * Regras (padrao-aprovado-zeus-motion.md, parte 11):
 * - NUNCA numero magico de duracao/blur/distancia/escala/stagger: usar MOTION.*
 * - NUNCA spring sem config nomeada: usar SPRING.* (ou makeSpring de springs.ts)
 */

export const MOTION = {
  durations: { fast: 12, medium: 24, slow: 40, scene: 60 },
  distance: { tiny: 8, small: 16, medium: 28, large: 48 },
  scale: { subtleIn: 0.97, normalIn: 0.98, subtleOut: 0.985, cameraIn: 1.04 },
  blur: { none: 0, soft: 6, medium: 12, strong: 20, max: 30, line: 8 },
  stagger: { letter: 1.5, word: 3, line: 6, card: 4 }, // line 5->6 (v2.1, 05/09/2026); nada lia este campo ainda, sem peça a recalibrar

  /**
   * Do Design System v2.1 (05/09/2026), para PEÇA NOVA. `distance.medium` e
   * `distance.large` (28/48) e sobretudo `MOTION_LEGACY.entryDistance/
   * exitDistance` (80/1200) ficam só para peça antiga: o v2.1 fecha o
   * deslocamento de entrada em 16px sempre, e exige um trecho imóvel por
   * cena (hold) antes de sair. Nomes de duração por CLASSE (o que o
   * movimento FAZ), não por velocidade solta.
   */
  offsetMax: 16,
  holdMin: 60,
  duracaoPorClasse: {
    feedbackMin: 6, feedbackMax: 10,
    revelacaoMin: 10, revelacaoMax: 16,
    transferenciaMin: 16, transferenciaMax: 24,
    reorganizacaoMin: 20, reorganizacaoMax: 32,
    reenquadramentoMin: 24, reenquadramentoMax: 36,
  },
} as const;

/**
 * Teto absoluto de escala de entrada (BRABO: bounce amador proibido, ERRO14).
 * Qualquer move de entrada com scale interpola com destino <= este valor, entao
 * o check "scale de entrada > 1.04" do remotion-validate.js passa por construcao.
 */
export const ENTRY_SCALE_CEILING = MOTION.scale.cameraIn; // 1.04

export const SPRING = {
  text: { damping: 14, mass: 0.8 },
  card: { damping: 13, mass: 0.9 },
  badge: { damping: 12, mass: 0.7, stiffness: 120 },
  icon: { damping: 10, mass: 0.8, stiffness: 120 },
  snappy: { damping: 18, mass: 0.6, stiffness: 200 },
  bouncy: { damping: 8, mass: 0.8, stiffness: 150 },
  heavy: { damping: 16, mass: 1.2 },
} as const;

export type SpringPresetName = keyof typeof SPRING;
export type SpringConfig = { damping: number; mass: number; stiffness?: number };

/**
 * MOTION_LEGACY — os defaults de entryFrom/exitTo/wordEntry/iconPop em
 * primitives.ts eram numeros soltos direto na assinatura da funcao (o
 * proprio nucleo violava a regra "nunca numero magico: usar MOTION.*").
 * Nao encaixam nos grupos semanticos de MOTION acima porque nenhum valor
 * de MOTION.distance/durations/blur bate com eles (ex.: entryFrom usava
 * blur de pico 10, e MOTION.blur so tem soft=6/medium=12/strong=20). Em
 * vez de forcar um reaproveitamento que mudaria o numero (e o movimento de
 * tudo que ja usa essas funcoes), viram grupo proprio com os MESMOS
 * valores de sempre. Reforma do motion design system, 19/08/2026.
 */
export const MOTION_LEGACY = {
  entryDistance: 80,
  entryDuration: 22,
  entryBlurPeak: 10,
  exitDistance: 1200,
  exitDuration: 18,
  exitBlurPeak: 18,
  exitScaleTarget: 0.94,
  wordEntryDuration: 12,
  wordTranslateY: 22,
  wordScaleFrom: 0.94,
  iconPopDuration: 14,
  iconPopScaleFrom: 0.8,
} as const;

/* ==================================================================
 * MANUAL DE MOTION v3.0 (Claude Design, 07/09/2026)
 *
 * Os grupos abaixo sao a regra nova de TEMPO do sistema. Nao substituem
 * MOTION.durations (peca antiga continua lendo de la): acrescentam a
 * regra de que duracao nunca e escolhida no olho, e sim calculada por
 * classe do evento x massa do objeto x peso do gesto (§1, §3, §3b).
 * Quem consome isso pronto e core/motion-spec.ts (durationOf, cueFrom,
 * staggerStep, holdFrames). 60fps, unidade = quadro.
 * ================================================================== */

/** §3 — classes temporais. Base em quadros; a faixa e o limite aceito. */
export const CLASSES_TEMPORAIS = {
  feedback: { base: 8, min: 6, max: 10 },
  reveal: { base: 18, min: 14, max: 22 },
  transfer: { base: 26, min: 20, max: 30 },
  reorg: { base: 32, min: 26, max: 38 },
  reframe: { base: 36, min: 30, max: 42 },
  draw: { base: 34, min: 28, max: 40 },
  count: { base: 48, min: 40, max: 60 },
  hold: { base: 60, min: 60, max: 180 },
} as const;

export type ClasseTemporal = keyof typeof CLASSES_TEMPORAIS;

/** §3 (atalho): so a base de cada classe, no formato que o motion-spec usa. */
export const DUR_V3 = {
  feedback: 8,
  reveal: 18,
  transfer: 26,
  reorg: 32,
  reframe: 36,
  draw: 34,
  count: 48,
  hold: 60,
} as const;

/**
 * §1 Lei da massa — objeto grande sai mais devagar do repouso e leva mais
 * tempo pra parar. A duracao final multiplica por este fator.
 */
export const MASSA = [
  { atePx: 48, fator: 0.7 }, // ponto, check, icone pequeno
  { atePx: 120, fator: 0.85 }, // celula, badge, avatar
  { atePx: 320, fator: 1.0 }, // cartao, bloco, no
  { atePx: 700, fator: 1.2 }, // painel, grafico
  { atePx: Infinity, fator: 1.4 }, // cena inteira, palco
] as const;

/**
 * §3b Peso 0 a 10 — a MESMA escala do sfx-map.json: o numero que decide a
 * importancia do gesto e o mesmo que decide o arquivo e o volume do som.
 * Sem segunda tabela, sem traducao.
 */
export const PESO_PERFIL = {
  0: { classe: "silencio", amp: 0.5, dur: 0.8, holdExtra: 0, blur: 2, intensidade: "sutil" },
  2: { classe: "detalhe", amp: 0.6, dur: 0.85, holdExtra: 0, blur: 4, intensidade: "sutil" },
  4: { classe: "estrutura", amp: 0.8, dur: 1.0, holdExtra: 0, blur: 6, intensidade: "sutil" },
  6: { classe: "evento", amp: 1.0, dur: 1.1, holdExtra: 12, blur: 6, intensidade: "padrao" },
  8: { classe: "virada", amp: 1.25, dur: 1.25, holdExtra: 24, blur: 8, intensidade: "dramatico" },
  10: { classe: "assinatura", amp: 1.4, dur: 1.5, holdExtra: 36, blur: 12, intensidade: "dramatico" },
} as const;

/** §3b — teto de peso somado numa cena. Passou, algum gesto mente. */
export const PESO_MAX_CENA = 22;
/** §3b — quadros minimos entre dois gestos de peso 7 ou mais. */
export const PESO_PESADO_GAP_MIN = 180;
/** §3b — peso 9 ou 10 no video inteiro. O terceiro rebaixa todos. */
export const PESO_ASSINATURA_MAX_VIDEO = 2;

/** §7 — intensidades. Nao se escolhe: derivam do peso. */
export const INTENSIDADE = {
  sutil: { amp: 0.6, dur: 0.85, blur: 4, scaleMax: 1.02 },
  padrao: { amp: 1.0, dur: 1.0, blur: 6, scaleMax: 1.04 },
  dramatico: { amp: 1.4, dur: 1.25, blur: 10, scaleMax: 1.06 },
} as const;

export type Intensidade = keyof typeof INTENSIDADE;

/** §7 — dramatico no maximo 2x por video. Tres e nenhuma e dramatica. */
export const DRAMATICO_MAX_VIDEO = 2;

/**
 * §4 Sincronia com a fala — offset em quadros relativo ao onset da SILABA
 * TONICA (nunca ao inicio da frase). O olho chega antes do ouvido.
 */
export const SYNC_OFFSET = {
  act: -6, // gesto principal da cena
  context: -18, // entrada de contexto [in]
  build: -12, // primeiro item da cascata
  focus: -4, // migracao de foco, chega junto com a palavra
  confirm: +2, // confirmacao/check reage depois de dito
} as const;

/** §5.1 — passo base do stagger, por unidade que cascateia. */
export const STEP_V3 = {
  letter: 1.5,
  word: 3,
  item: 4,
  row: 6,
  block: 8,
  column: 4,
  scene: 10,
} as const;

/** §5.2 — a cascata inteira nunca passa disto, com quantos irmaos for. */
export const STAGGER_CAP = 24;

/** §9 — overlap entre cenas vizinhas. */
export const SCENE_OVERLAP = 10;

/** §3 regra do hold — texto na tela: 60q + 12q por palavra alem de 4. */
export const HOLD_BASE = 60;
export const HOLD_POR_PALAVRA_EXTRA = 12;

/** §1 consequencia pratica — amplitude que separa "caro" de "PowerPoint". */
export const AMPLITUDE_MAX = { deslocamentoPx: 16, scale: 1.04, scaleDramatico: 1.06 } as const;
