/**
 * core/gestoDoIcone.ts — a peça certa do ícone se move, nunca o ícone
 * inteiro.
 *
 * NASCE de um piloto contra a função Animation do Claude Design
 * (06/09/2026): o ícone gerado por ela tem vida por dentro (o ponteiro
 * gira, a barra acende, o elo encaixa); o nosso `LucideGlyph` desenha o
 * traço e fica parado. A regra que evita o ícone genérico já existia,
 * escrita antes de qualquer ícone nosso se mover:
 *
 *   `.claude/skills/icon-director/SKILL.md`, Passo 4: "Nunca animar o svg
 *   inteiro por padrão. Antes de escrever CSS, descobrir: o que se move de
 *   verdade nesse objeto, o que fica parado, onde fica o pivô físico."
 *   E, sobre Lottie: "só quando já existe um recurso pronto vindo do After
 *   Effects" — ou seja, baixar Lottie de biblioteca (IconScout,
 *   LottieFiles, Magnific) NÃO é o caminho aqui. O caminho é animar o
 *   Lucide que já usamos, por dentro, com o mesmo rigor de pivô.
 *
 * Um `GestoIcone` é opcional e por ÍCONE, escolhido por QUEM CHAMA
 * `LucideGlyph` (import o mesmo nome do ícone, ex.: `GESTOS.Clock` junto
 * de `import { Clock } from "lucide"`). Sem `gesto`, `LucideGlyph` desenha
 * exatamente como antes: peça aprovada não muda porque nada aqui é
 * automático.
 *
 * `porFilho(indice, frame)` recebe o índice do filho na ordem em que o
 * Lucide exporta (`node[2]`, ver `LucideGlyph.tsx`) e o frame LOCAL do
 * gesto (0 = início do movimento interno, não o início da entrada do
 * ícone inteiro — os dois podem ter delays diferentes). Filho sem
 * retorno usa o comportamento padrão.
 *
 * Cada transform é construído como atributo SVG (`rotate(a,cx,cy)`,
 * `translate(x,y)`), nunca CSS `transform-origin`: é a mesma técnica já
 * usada em `JornadaSeta.tsx` para girar o chevron pela tangente real, e
 * evita a ambiguidade de origem de transformação CSS dentro de um SVG.
 * Teto de escala do sistema (§9 do guia): nenhum gesto passa de 1,04.
 */
import { ci } from "./primitives";
import { CURVES } from "./curves";

export type GestoFilho = {
  /** atributo SVG `transform`, ex. "rotate(15,12,12)". */
  transform?: string;
  opacidade?: number;
  /** substitui o `desenho` (0 a 1) SÓ deste filho — usado quando as
   *  partes do ícone traçam em sequência, não juntas (ex.: ShieldCheck). */
  desenho?: number;
};

export type GestoIcone = {
  /** nome do ícone Lucide, só para comentário e depuração. */
  nome: string;
  porFilho: (indice: number, frame: number) => GestoFilho | undefined;
};

/**
 * Clock (`circle`, `polyline`): o mostrador (índice 0) não se move, é a
 * peça fixa. O ponteiro (índice 1, o `polyline "12 6 12 12 16 14"`) gira
 * 15° em torno do centro (12,12) — o pivô físico real do relógio.
 */
const Clock: GestoIcone = {
  nome: "Clock",
  porFilho: (i, f) => {
    if (i !== 1) return undefined;
    const ang = ci(f, [0, 20], [0, 15], CURVES.settleSoft);
    return { transform: `rotate(${ang},12,12)` };
  },
};

/**
 * Signal (5 `path`, barras de altura crescente, todas nascendo em y=20):
 * cada barra acende na sua vez, stagger de 4 quadros, opacidade e uma
 * leve subida de 3px (nunca escala: escalar uma linha traçada distorce
 * a espessura do traço, que é o defeito que a icon-director existe para
 * evitar).
 */
const Signal: GestoIcone = {
  nome: "Signal",
  porFilho: (i, f) => {
    const delay = i * 4;
    const op = ci(f, [delay, delay + 14], [0, 1], CURVES.easyEase);
    const dy = ci(f, [delay, delay + 16], [3, 0], CURVES.smoothInOut);
    return { transform: `translate(0,${dy})`, opacidade: op };
  },
};

/**
 * Link (2 `path`, os dois elos): cada elo nasce com um leve deslocamento
 * na direção oposta ao outro e converge para a posição final — o "encaixe"
 * — em vez de aparecer já unido.
 */
const Link: GestoIcone = {
  nome: "Link",
  porFilho: (i, f) => {
    const t = ci(f, [0, 18], [1, 0], CURVES.settleSoft);
    const sinal = i === 0 ? -1 : 1;
    return { transform: `translate(${sinal * 2 * t},${sinal * 2 * t})` };
  },
};

/**
 * Crown (`path` da coroa, `path` da base): a base (índice 1) fica fixa,
 * é o que ela repousa em cima. A coroa (índice 0) desce e assenta, como
 * se pousasse — settle, nunca bounce (teto do sistema: sem quique
 * amador, decisão provada em `docs/DESIGN-SYSTEM-REELS-APPLE.md`).
 */
const Crown: GestoIcone = {
  nome: "Crown",
  porFilho: (i, f) => {
    if (i !== 0) return undefined;
    const dy = ci(f, [0, 20], [-3, 0], CURVES.settle);
    return { transform: `translate(0,${dy})` };
  },
};

/**
 * Users (`path`+`circle` da primeira pessoa, dois `path` da segunda):
 * a primeira pessoa (índices 0 e 1) já existe pronta (regra de presença,
 * §2: contexto preexistente entra pronto). A segunda (2 e 3) é quem a
 * fala está apresentando: nasce com um delay, opacidade e leve chegada
 * pela direita.
 */
const Users: GestoIcone = {
  nome: "Users",
  porFilho: (i, f) => {
    if (i < 2) return undefined;
    const op = ci(f, [10, 26], [0, 1], CURVES.easyEase);
    const dx = ci(f, [10, 28], [4, 0], CURVES.smoothInOut);
    return { transform: `translate(${dx},0)`, opacidade: op };
  },
};

/**
 * BookOpen (`path` da lombada, `path` das duas páginas como UM contorno
 * só): o Lucide desenha as duas páginas abertas como um único caminho
 * contínuo, não como duas folhas separadas — não dá para "abrir" cada
 * página sem recortar o path à mão, e recortar à mão é o tipo de invenção
 * sem medir que este arquivo existe para evitar. O gesto honesto aqui é
 * a lombada (índice 0, a linha vertical central) crescer a partir do
 * meio, como se o livro estivesse se firmando no centro antes das
 * páginas se revelarem.
 */
const BookOpen: GestoIcone = {
  nome: "BookOpen",
  porFilho: (i, f) => {
    if (i !== 0) return undefined;
    const s = ci(f, [0, 16], [0, 1], CURVES.settleSoft);
    // escala vertical em torno do centro da lombada (y=14, entre 7 e 21):
    // translate ao centro, escala, translate de volta — lista de
    // transform SVG, não CSS transform-origin.
    return { transform: `translate(12,14) scale(1,${s}) translate(-12,-14)` };
  },
};

/**
 * ShieldCheck (`path` do escudo, `path` do check): o check traça DEPOIS
 * do escudo fechar, nunca junto — usa `desenho` por filho em vez do
 * `desenho` único do ícone, porque as duas peças têm tempo próprio.
 */
const ShieldCheck: GestoIcone = {
  nome: "ShieldCheck",
  porFilho: (i, f) => {
    if (i === 0) return { desenho: ci(f, [0, 30], [0, 1], CURVES.settleSoft) };
    if (i === 1) return { desenho: ci(f, [30, 50], [0, 1], CURVES.easyEase) };
    return undefined;
  },
};

/**
 * Check (1 `path` só) fica de fora deste mapa de propósito: o ícone
 * inteiro É o traço, o desenho progressivo que `LucideGlyph` já faz por
 * padrão (`desenho` 0 a 1) já é o movimento certo. Um gesto aqui seria
 * animar por animar.
 */

export const GESTOS: Record<string, GestoIcone> = {
  Clock,
  Signal,
  Link,
  Crown,
  Users,
  BookOpen,
  ShieldCheck,
};
