/**
 * core/choreo.ts — contrato de coreografia (reforma do motion design
 * system, 19/08/2026)
 *
 * Ate aqui, coreografia (quem entra de onde, quando, em relacao a quem)
 * morava em prosa nos agentes markdown (motion-choreographer.md,
 * pre-render-gate.md) e nunca era lida por maquina nenhuma. O
 * MotionStage.tsx do ZeusTrafegoReels aplicava UMA UNICA entrada/saida
 * identica a 8 elementos diferentes porque nao havia onde declarar o
 * contrario. Este arquivo e esse "onde": cada composition nova exporta um
 * SceneSpec de um arquivo choreography.ts, e:
 *   1. a propria composition consome via applyChoreo() de choreo-runtime.ts
 *      (o palco vira burro, so executa o que o spec manda);
 *   2. scripts/choreo-lint.js le o MESMO objeto pra checar direcao
 *      repetida, stagger ausente, duplo movimento etc, ANTES do render.
 *
 * Regra dura que viabiliza o passo 2: um arquivo choreography.ts so pode
 * ter dados literais e imports de TIPOS/HELPERS PUROS daqui (Dir,
 * ElementChoreo, SceneChoreo, SceneSpec, defineSpec, alternateDir).
 * Por isso este arquivo, de proposito, NAO importa "remotion" nem "react"
 * como valor (so como `import type`, que o TypeScript apaga na
 * transpilacao) — o choreo-lint consegue avaliar o spec com esbuild puro,
 * sem montar o bundle inteiro do Remotion so pra ler coreografia. Quem
 * precisa de entryFrom/exitTo de verdade (runtime, dentro da composition)
 * importa de choreo-runtime.ts, nunca daqui. Este arquivo, de proposito,
 * nao importa React nem Remotion, nem como tipo: zero motivo pra crescer
 * essa dependencia de volta.
 */

import { STAGGER_CAP } from "./tokens";

export type Dir = "left" | "right" | "top" | "bottom";

/**
 * Nomes de curva disponiveis em core/curves.ts, REPLICADOS aqui como union
 * de string em vez de importados (`CurveName` de curves.ts) de proposito:
 * curves.ts importa `Easing` de "remotion" como VALOR, e este arquivo nao
 * pode ganhar essa dependencia nem por tipo (ver nota do cabecalho). Se
 * curves.ts ganhar uma curva nova, replicar o nome aqui tambem —
 * choreo-runtime.ts faz o de-para de nome pra funcao de verdade.
 */
export type EaseName =
  | "easyEase"
  | "smoothIn"
  | "smoothOut"
  | "smoothInOut"
  | "overshoot"
  | "bounceSoft"
  | "cinematic"
  | "editorial"
  | "tech"
  | "premium"
  | "organic"
  | "dramatic"
  | "impact"
  | "weight"
  | "floaty"
  | "interface"
  | "typographic"
  // desaceleracao longa e visivel (7a rodada 27/08/2026, ver core/curves.ts)
  | "settle"
  | "settleSoft"
  // MANUAL DE MOTION v3.0 (08/09/2026). Nucleo de cauda longa (com sufixo
  // V3 porque o bezier difere dos homonimos acima) e a camada avancada,
  // que nao existia no squad. Ver core/curves.ts.
  | "settleV3"
  | "smoothV3"
  | "settleSoftV3"
  | "easyV3"
  | "anticipate"
  | "overshootMicro"
  | "brake"
  | "gravity"
  | "lift"
  | "linear";

/** hierarquia visual do elemento dentro da cena — usada pelo choreo-lint
 * pra checar delay (support nunca pode entrar antes do hero da mesma cena,
 * DNA ExemploMotion: rotulo sempre depois do numero). */
export type ElementRole = "hero" | "support" | "label" | "accent";

export interface ElementChoreo {
  id: string;
  role: ElementRole;
  /** entrada: direcao de origem, distancia (px), duracao (frames), delay
   * relativo ao inicio da cena e curva (ausente = easyEase, o default do
   * sistema desde 20/08/2026: suaviza comeco E fim, nunca so uma ponta). */
  entry: { dir: Dir; distance?: number; dur?: number; delayF?: number; ease?: EaseName };
  /** saida (opcional: elemento pode nao ter saida propria, ex.: fica ate a
   * cena acabar via corte). */
  exit?: { dir: Dir; distance?: number; dur?: number; ease?: EaseName };
  /**
   * true = o proprio componente anima a si mesmo (idle motion, drift,
   * pulse) e o palco NAO deve aplicar entry/exit nele. false ou ausente =
   * o palco e o unico responsavel pelo movimento. Existe pra impedir o bug
   * do AskBubble/ResponseBubble do ZeusTrafegoReels: entryFrom dentro do
   * componente SOMADO ao entryFrom do palco (duplo movimento). O
   * choreo-lint reprova componente com ownsMotion ausente/false que
   * importa entryFrom/exitTo/wordEntry.
   */
  ownsMotion?: boolean;
  /** filhos que precisam de escalonamento entre si (ex.: 3 itens de uma
   * lista). staggerF > 0 e obrigatorio quando count > 1 — o choreo-lint
   * reprova irmao sem stagger (o bug do Checklist com 22f inventado). */
  children?: { count: number; staggerF: number };
}

export interface SceneChoreo {
  name: string;
  /** inicio da cena em frames, relativo ao inicio do video/sequence. */
  from: number;
  /** duracao da cena em frames. */
  dur: number;
  /** frame (relativo ao inicio da cena) onde a saida comeca. null = a cena
   * nao tem saida propria (corta direto pra proxima). */
  exitF: number | null;
  elements: ElementChoreo[];
}

export interface SceneSpec {
  composition: string;
  fps: number;
  scenes: SceneChoreo[];
  /**
   * Frames entre o INICIO REAL DA COMPOSICAO (frame 0 do bundle) e o frame
   * 0 usado pelos `from` das cenas abaixo. Existe porque MotionStage.tsx
   * (ou equivalente) pode montar os Sequences das cenas DENTRO de um
   * Sequence pai que ja tem seu proprio offset (ex.: ZeusTrafegoReels tem
   * um HookCard de 60 frames antes do conteudo principal, e o
   * choreography.ts usa frames relativos ao INICIO DO CONTEUDO, nao da
   * composicao). Scripts que leem o spec SEM montar o Remotion (qa-frames.js
   * extraindo frame de um video ja renderizado) precisam somar isso antes
   * de converter frame -> timestamp. Ausente ou 0 = sem offset (a maioria
   * das composicoes, sem intro separada).
   */
  frameOffset?: number;
  /**
   * Versao do sistema de motion que esta peca segue. Ausente ou 2 = o
   * sistema antigo (as pecas ja aprovadas). 3 = MANUAL DE MOTION v3.0:
   * o choreo-lint passa a REPROVAR (e nao so avisar) teto de cascata
   * estourado, deslocamento acima de 16px e curva fora do vocabulario
   * v3. Peca nova nasce com 3.
   */
  motionVersion?: 2 | 3;
}

/** identity function tipada: só existe pra dar autocomplete e erro de tipo
 * cedo ao escrever um choreography.ts. */
export const defineSpec = (s: SceneSpec): SceneSpec => s;

/**
 * Direcao alternada por indice de cena, ciclo de 4 (nunca repete a direcao
 * anterior nem a de 2 cenas atras): bottom, left, top, right, bottom...
 * DNA ExemploMotion (timeline.ts): alternancia automatica de transicao.
 * Elimina por construcao o "layout monotono" do MotionStage original.
 */
const ALTERNATE_CYCLE: Dir[] = ["bottom", "left", "top", "right"];
export const alternateDir = (i: number): Dir => ALTERNATE_CYCLE[i % ALTERNATE_CYCLE.length];

/** delay do N-esimo filho de um elemento com children.staggerF definido
 * (0-indexado). Uso: Checklist com 3 itens, staggerF vindo do spec em vez
 * de um numero hardcoded no componente. Funcao pura (sem React), por isso
 * mora aqui e nao em choreo-runtime.ts. */
export const childDelay = (el: ElementChoreo, childIndex: number): number => {
  const base = el.entry.delayF ?? 0;
  const stagger = el.children?.staggerF ?? 0;
  return base + stagger * childIndex;
};

/* ==================================================================
 * TETO DE CASCATA — MANUAL DE MOTION v3.0 §5.2
 *
 * A cascata INTEIRA nunca passa de 24 quadros, com quantos irmaos for.
 * 12 itens com passo 4 dao 44q de cascata: a cena parece lenta e a fala
 * ja foi embora. Com o teto, o passo vira 2,2q.
 *
 * Funcoes puras, sem remotion, pra o choreo-lint conseguir avaliar sem
 * montar o bundle. `childDelay` acima fica INTACTO de proposito: aplicar
 * o teto nele mudaria o movimento das pecas ja aprovadas no proximo
 * render. Peca nova usa `childDelayComTeto`; o lint avisa quem passou.
 * ================================================================== */

/** §5.2 — teto absoluto da cascata, em quadros. Reexportado de tokens.ts
 * (fonte unica): tokens.ts nao importa remotion nem react, entao entrar
 * aqui nao quebra a regra de dependencia do cabecalho deste arquivo. */
export { STAGGER_CAP };

/** §5.2 — passo efetivo: nunca deixa a cascata inteira passar do teto. */
export const staggerComTeto = (stepBase: number, n: number): number =>
  n <= 1 ? 0 : Math.max(1, Math.min(stepBase, STAGGER_CAP / (n - 1)));

/** §5.2 — duracao total da cascata com um passo e um numero de irmaos. */
export const duracaoDaCascata = (stepBase: number, n: number): number =>
  n <= 1 ? 0 : staggerComTeto(stepBase, n) * (n - 1);

/** §5.2 — delay do N-esimo filho ja com o teto aplicado (peca nova). */
export const childDelayComTeto = (el: ElementChoreo, childIndex: number): number => {
  const base = el.entry.delayF ?? 0;
  const n = el.children?.count ?? 1;
  const stepBase = el.children?.staggerF ?? 0;
  return Math.round(base + staggerComTeto(stepBase, n) * childIndex);
};
