/**
 * core/scales.ts — raio, espaço e rótulo como escala fechada (Design System
 * v2.1 do Claude Design, 05/09/2026)
 *
 * Preenche 3 das 5 lacunas que `docs/DESIGN-SYSTEM-REELS-APPLE.md` já
 * declarava abertas: escala de raio, escala de espaçamento e régua de
 * hierarquia (tamanho de rótulo). Nasce em `core/` porque vale pra peça
 * nova de qualquer composition, não só o Paulo.
 *
 * Regra: todo raio, todo espaço e todo tamanho de rótulo de peça NOVA sai
 * de um destes valores. Fora da escala é defeito (checklist §10 item 3 do
 * guia recebido). Peça já aprovada não recalibra por isto sozinha.
 */

/** Raio de canto no palco (a cena em si). */
export const RAIO = {
  caixa: 10,
  balao: 18,
  celula: 24,
  painel: 24,
  cartaoVideo: 32,
  selo: 52,
  pill: 999,
} as const;

/** Raio de canto DENTRO de um painel de interface (um nível a menos). */
export const RAIO_UI = {
  miniatura: 8,
  controle: 14,
  balao: 18,
} as const;

/** Espaço no palco (a cena em si). Base 6. */
export const ESPACO = {
  s1: 6,
  s2: 12,
  s3: 18,
  s4: 24,
  s5: 44,
  s6: 88,
} as const;

/** Espaço DENTRO de um painel de interface. Base 4, encontra o palco em 24. */
export const ESPACO_UI = {
  s1: 4,
  s2: 8,
  s3: 12,
  s4: 16,
  s5: 20,
  s6: 24,
} as const;

/** Tamanho de rótulo por papel (peso 600, letter-spacing 0,06 a 0,08em). */
export const ROTULO = {
  palco: 30, // rótulo grande de molde no palco
  esquemaDenso: 24, // esquema com muitos nós (jornada, funil)
  interface: 22, // dentro de painel/interface
  meta: 18, // metadado pequeno (data, contador)
  micro: 16, // menor tamanho aceito
} as const;

/** Sólido preto sem vazado só até este lado, em qualquer eixo. Acima disso o
 * elemento em foco tem que ser vazado + anel (exceção formal: célula de
 * contagem em movimento, marcada onde usada). */
export const SOLIDO_MAXIMO = 64;

/** Conteúdo em foco (número, palavra, ícone que carrega a cena) nunca abaixo
 * disto — piso de legibilidade a 1080px de largura de canvas. */
export const CONTEUDO_FOCO_MINIMO = 22;
