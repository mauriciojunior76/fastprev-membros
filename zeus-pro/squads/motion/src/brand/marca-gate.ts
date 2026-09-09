/**
 * marca-gate.ts — a marca da peça é de quem está usando o pacote.
 *
 * O método de vídeo viaja inteiro no Zeus Pro; a identidade visual de origem,
 * não. Este módulo é a versão em TypeScript do gate: ele responde se a paleta
 * escolhida é própria ou se ainda é a assinatura da marca de origem.
 *
 * O gate de linha de comando (scripts/marca-check.js) é quem bloqueia o render.
 * Aqui ficam as regras puras, para o código do palco também poder consultar.
 */

/**
 * Assinatura de cor da marca de origem: não é licenciada, só o método é.
 *
 * Guardada em componentes de cor, e não como texto de cor, de propósito: o
 * arquivo que confere a cópia não pode ser, ele mesmo, a receita para copiar.
 */
const ASSINATURA_ORIGEM_RGB: ReadonlyArray<readonly [number, number, number]> = [
  [255, 107, 107],
  [255, 159, 67],
  [254, 202, 87],
  [72, 219, 251],
  [10, 189, 227],
  [162, 155, 254],
  [253, 121, 168],
];

export const ASSINATURA_ORIGEM: string[] = ASSINATURA_ORIGEM_RGB.map(
  (c) => "#" + c.map((n) => n.toString(16).padStart(2, "0")).join("")
);

/** Distância de cor abaixo disso conta como sendo a mesma cor. */
export const TOLERANCIA = 40;

export type EstiloDeTraco = "apple-conceitual" | "classico" | "proprio";

export interface MarcaDoUsuario {
  nome?: string;
  paleta: string[];
  estilo: EstiloDeTraco;
  tipografia?: { titulo?: string; corpo?: string };
  selo?: string;
}

function hexParaRgb(hex: string): [number, number, number] | null {
  const h = String(hex || "").trim().replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(h)) return null;
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

export function distanciaDeCor(a: string, b: string): number {
  const x = hexParaRgb(a);
  const y = hexParaRgb(b);
  if (!x || !y) return Infinity;
  return Math.sqrt(
    (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2
  );
}

/** A cor é praticamente uma das cores da assinatura de origem? */
export function pareceComAOrigem(cor: string): boolean {
  return ASSINATURA_ORIGEM.some((ref) => distanciaDeCor(cor, ref) < TOLERANCIA);
}

export interface ResultadoDoGate {
  ok: boolean;
  problemas: string[];
}

/**
 * Confere a marca da pessoa. Três ou mais cores iguais às da origem reprovam:
 * é o ponto em que o vídeo passa a parecer de outro dono.
 */
export function conferirMarca(marca: MarcaDoUsuario | null): ResultadoDoGate {
  const problemas: string[] = [];

  if (!marca) {
    return {
      ok: false,
      problemas: [
        "A sua marca ainda não foi configurada. Rode o passo Marca no vídeo do boot da inteligência.",
      ],
    };
  }

  const paleta = (marca.paleta || []).filter(Boolean);
  if (paleta.length < 3) {
    problemas.push("A sua paleta precisa de pelo menos três cores.");
  }
  if (!marca.estilo) {
    problemas.push("Falta escolher o estilo do traço.");
  }

  const iguais = paleta.filter(pareceComAOrigem);
  if (iguais.length >= 3) {
    problemas.push(
      `Três ou mais cores da sua paleta são as da marca de origem (${iguais.join(", ")}). ` +
        "A identidade visual de origem não é licenciada: o método é seu, a cara não."
    );
  }

  return { ok: problemas.length === 0, problemas };
}
