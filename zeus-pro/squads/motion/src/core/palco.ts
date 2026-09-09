/**
 * core/palco.ts — os estados de palco da direcao dinamica (formato vertical-mao)
 *
 * A ponte entre a regra escrita e o codigo que renderiza. A regra mora em
 * `squads/motion-apple/design-system/DIRECAO-DINAMICA.md` e em
 * `design-system/registry/stage-states.json`; os numeros abaixo sao a copia
 * fiel dela para dentro do motor, porque o Remotion nao le JSON do design
 * system em tempo de render (o bundle nao alcanca aquela pasta).
 *
 * Quem mantiver: mudou o registry, muda aqui, e o teste
 * `scripts/testes/testa-palco.js` compara os dois e reprova divergencia. Nunca
 * ajustar so um dos lados.
 *
 * Este arquivo e PURO de proposito: nao importa "remotion" nem "react", nem
 * como tipo. Assim o choreo-lint e os scripts conseguem calcular geometria e
 * alternancia sem montar o bundle, do mesmo jeito que fazem com choreo.ts.
 */

/** Tipo de peca. Decide onde o rosto mora e quais estados existem. */
export type FormatoDeVideo = "reels-call" | "vertical-mao" | "aula";

/** Orientacao. Vertical e o padrao; horizontal so quando o objetivo pede. */
export type Orientacao = "vertical" | "horizontal";

/**
 * Os tres estados do vertical-mao.
 *   A = dividido (esquema em cima, rosto embaixo, legenda na costura)
 *   B = heroi (tela cheia escura, palavra-conceito)
 *   C = cinetico (tela cheia clara, frase palavra a palavra)
 */
export type EstadoDePalco = "A" | "B" | "C";

/** Os treze papeis narrativos do arco (DIRECAO-DINAMICA secao 3). */
export type PapelNarrativo =
  | "gancho"
  | "tensao"
  | "experimento"
  | "dor"
  | "epifania"
  | "tese"
  | "mecanismo"
  | "implicacao"
  | "reenquadramento"
  | "contraste"
  | "habilidade"
  | "prova"
  | "cta";

export type Faixa = { y: number; h: number };

export const CANVAS_VERTICAL = { width: 1080, height: 1920 } as const;

/**
 * Geometria do estado A em 1080x1920 (DIRECAO-DINAMICA secao 1.1).
 *
 * A costura reaproveita a MESMA faixa de legenda do reels-call (y 1039, 122px
 * de altura): nao e coincidencia nem preguica. A faixa ja esta calibrada para
 * legibilidade e ja tem componente que a respeita; mudar a altura aqui criaria
 * dois padroes de legenda no mesmo squad.
 */
export const PALCO_A = {
  esquema: { y: 0, h: 1039 } as Faixa,
  titulo: { y: 96, h: 104 } as Faixa,
  costura: { y: 1039, h: 122 } as Faixa,
  rosto: { y: 1161, h: 759 } as Faixa,
} as const;

/** O que cada estado tem na tela. O que nao esta aqui, nao entra. */
export const ESTADOS: Record<
  EstadoDePalco,
  {
    nome: string;
    temRosto: boolean;
    temLegenda: boolean;
    temTitulo: boolean;
    telaCheia: boolean;
    tema: "claro" | "escuro";
    pesoFaixa: [number, number];
  }
> = {
  A: { nome: "dividido", temRosto: true, temLegenda: true, temTitulo: true, telaCheia: false, tema: "claro", pesoFaixa: [2, 6] },
  B: { nome: "heroi", temRosto: false, temLegenda: false, temTitulo: false, telaCheia: true, tema: "escuro", pesoFaixa: [7, 10] },
  C: { nome: "cinetico", temRosto: false, temLegenda: false, temTitulo: false, telaCheia: true, tema: "claro", pesoFaixa: [5, 8] },
};

/** Estado padrao de cada papel narrativo (tabela da secao 3). */
export const ESTADO_POR_PAPEL: Record<PapelNarrativo, EstadoDePalco> = {
  gancho: "A",
  tensao: "B",
  experimento: "A",
  dor: "A",
  epifania: "B",
  tese: "C",
  mecanismo: "A",
  implicacao: "C",
  reenquadramento: "C",
  contraste: "A",
  habilidade: "A",
  prova: "A",
  cta: "A",
};

/** Estado alternativo, usado quando a regra de alternancia veta o padrao. */
export const ESTADO_ALTERNATIVO: Record<PapelNarrativo, EstadoDePalco> = {
  gancho: "A",
  tensao: "C",
  experimento: "A",
  dor: "B",
  epifania: "B",
  tese: "B",
  mecanismo: "C",
  implicacao: "B",
  reenquadramento: "B",
  contraste: "A",
  habilidade: "C",
  prova: "A",
  cta: "A",
};

/** As constantes da regra de alternancia (secao 2). */
export const ALTERNANCIA = {
  /** o rosto volta em ate isto, contando a SEQUENCIA fora de A, nunca um beat so */
  rostoVoltaEmAteQuadros: 480,
  abreEm: "A" as EstadoDePalco,
  fechaEm: "A" as EstadoDePalco,
  telaCheiaPercentualMin: 30,
  telaCheiaPercentualMax: 45,
  maxTitulosPorEsquema: 3,
} as const;

/** Estado que um papel pede, sem olhar a sequencia. */
export const estadoDoPapel = (papel: PapelNarrativo): EstadoDePalco => ESTADO_POR_PAPEL[papel];

export type BeatDePalco = {
  id: string;
  papel: PapelNarrativo | null;
  startFrame: number;
  endFrameExclusive: number;
  /** true quando o beat continua a frase do anterior (autoriza dois B seguidos) */
  continuaFrase?: boolean;
};

export type ResultadoDeAlternancia = {
  estados: EstadoDePalco[];
  percentualTelaCheia: number;
  avisos: string[];
};

/**
 * Aplica a regra de alternancia (secao 2) numa sequencia de beats.
 *
 * Mesma logica do `beats.js` do motion-apple, aqui em TypeScript para a
 * composition conseguir decidir sozinha quando o plano nao trouxe o estado
 * pronto. As duas implementacoes tem que dar o mesmo resultado: o teste
 * `scripts/testes/testa-palco.js` roda as duas na mesma fixture e compara.
 */
export const regraDeAlternancia = (beats: BeatDePalco[]): ResultadoDeAlternancia => {
  const avisos: string[] = [];
  const estados: EstadoDePalco[] = [];
  let quadrosSemA = 0;

  beats.forEach((b, i) => {
    let estado: EstadoDePalco = b.papel ? ESTADO_POR_PAPEL[b.papel] : "A";
    const dur = b.endFrameExclusive - b.startFrame;

    // leis 3 e 4: abre e fecha no estado A
    if (i === 0) estado = ALTERNANCIA.abreEm;
    if (i === beats.length - 1) estado = ALTERNANCIA.fechaEm;

    // lei 2: nunca dois B seguidos, salvo continuacao da mesma frase
    if (estado === "B" && estados[i - 1] === "B" && !b.continuaFrase) {
      estado = b.papel && ESTADO_ALTERNATIVO[b.papel] !== "B" ? ESTADO_ALTERNATIVO[b.papel] : "A";
    }

    // lei 1: vigia a SEQUENCIA fora de A, nunca um beat isolado (senao
    // qualquer cena de tela cheia acima de 8s ficaria proibida)
    if (estado !== "A" && quadrosSemA > 0 && quadrosSemA + dur > ALTERNANCIA.rostoVoltaEmAteQuadros) {
      estado = "A";
      avisos.push(`${b.id}: a sequencia passaria de ${ALTERNANCIA.rostoVoltaEmAteQuadros}q sem o rosto; forcado para A`);
    }

    quadrosSemA = estado === "A" ? 0 : quadrosSemA + dur;
    estados.push(estado);
  });

  const total = beats.reduce((a, b) => a + (b.endFrameExclusive - b.startFrame), 0);
  const cheia = beats.reduce(
    (a, b, i) => a + (estados[i] === "A" ? 0 : b.endFrameExclusive - b.startFrame),
    0
  );
  const percentualTelaCheia = total ? Math.round((cheia / total) * 100) : 0;

  if (percentualTelaCheia < ALTERNANCIA.telaCheiaPercentualMin) {
    avisos.push(`tela cheia em ${percentualTelaCheia}%: abaixo do minimo de ${ALTERNANCIA.telaCheiaPercentualMin}%, o video vira cabeca falante com apoio`);
  }
  if (percentualTelaCheia > ALTERNANCIA.telaCheiaPercentualMax) {
    avisos.push(`tela cheia em ${percentualTelaCheia}%: acima do teto de ${ALTERNANCIA.telaCheiaPercentualMax}%, a pessoa some e vira motion generico`);
  }

  return { estados, percentualTelaCheia, avisos };
};

/**
 * Geometria das duas colunas em 16:9 (secao 1.4). O estado A gira: o rosto vai
 * para um lado e o esquema para o outro. Reaproveita as proporcoes de
 * `core/layout.ts` (WIDE), que ja vieram do MOTION-MANUAL secao 12c.
 */
export const palcoHorizontal = (lado: "left" | "right", W = 1920, H = 1080) => {
  const gutter = W * 0.06;
  const rostoW = W * 0.4;
  const moldeW = W - rostoW - gutter * 3;
  const top = H * 0.1;
  const height = H * 0.8;
  return lado === "left"
    ? {
        rosto: { left: gutter, width: rostoW, top, height },
        esquema: { left: gutter * 2 + rostoW, width: moldeW, top, height },
      }
    : {
        rosto: { left: W - gutter - rostoW, width: rostoW, top, height },
        esquema: { left: gutter, width: moldeW, top, height },
      };
};

/**
 * Titulo persistente (secao 4): beats vizinhos com o mesmo assunto mantem o
 * esquema e trocam so a frase de cima. Devolve, por beat, se ele reaproveita o
 * esquema do anterior e qual a posicao dele na sequencia de titulos.
 */
export const titulosPersistentes = (
  beats: Array<{ id: string; topic?: string | null }>
): Array<{ id: string; reaproveitaEsquema: boolean; posicaoNoEsquema: number }> => {
  const saida: Array<{ id: string; reaproveitaEsquema: boolean; posicaoNoEsquema: number }> = [];
  let posicao = 0;
  beats.forEach((b, i) => {
    const anterior = beats[i - 1];
    const mesmoAssunto = !!(b.topic && anterior && anterior.topic === b.topic);
    // o teto de 3 titulos por esquema existe pra cena nao virar slide parado
    if (mesmoAssunto && posicao + 1 < ALTERNANCIA.maxTitulosPorEsquema) {
      posicao += 1;
      saida.push({ id: b.id, reaproveitaEsquema: true, posicaoNoEsquema: posicao });
    } else {
      posicao = 0;
      saida.push({ id: b.id, reaproveitaEsquema: false, posicaoNoEsquema: 0 });
    }
  });
  return saida;
};
