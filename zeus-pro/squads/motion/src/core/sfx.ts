/**
 * sfx.ts — o contrato entre a animacao e o som.
 *
 * Cada componente de cena declara os gestos que levam som, e o proprio
 * componente consome esses numeros nos delays das animacoes. Assim o mesmo
 * literal move a imagem e posiciona o efeito: nao existe copia para
 * divergir.
 *
 * O componente declara APENAS `frame`, `categoria` e `gesto`. Nunca som,
 * nunca peso, nunca volume. Quem decide o som e o volume e o catalogo
 * (`public/_sfx/catalogo.json`), a partir do par categoria mais gesto. Essa
 * separacao e o que torna a lei da categoria impossivel de quebrar: duas
 * aparicoes da mesma categoria nao tem como receber sons diferentes, porque
 * o som nunca e escolhido por aparicao.
 *
 * REGRAS DE ESCRITA (o choreo-lint reprova o que fugir):
 *   - um evento por linha, chaves na ordem frame, categoria, gesto, etapa;
 *   - so literal: nada de expressao, nada de map, nada de constante;
 *   - todo `frame` precisa aparecer como delay no mesmo arquivo, ou levar o
 *     escape `// sfx-frame-ok: <motivo>` quando for um valor derivado (o fim
 *     de uma contagem, por exemplo);
 *   - serie usa `etapa` numerada a partir de 1, nunca uma marca booleana;
 *   - componente sem gesto declara a lista vazia, explicitamente.
 *
 * Leitura: scripts/lib/sfx-mapa.js, por texto, sem executar TypeScript.
 */

/** Um gesto que leva som. */
export type SfxEvent = {
  /** quadro LOCAL da cena em que o gesto acontece */
  frame: number;
  /** categoria do catalogo, vocabulario fechado */
  categoria: string;
  /** gesto dentro da categoria, vocabulario fechado */
  gesto: string;
  /** posicao na serie, a partir de 1. So em categoria de serie */
  etapa?: number;
};

/**
 * Transforma a lista de eventos num objeto por gesto, para o componente
 * consumir o quadro sem indexar por numero.
 *
 * Em serie, o gesto se repete: vence a primeira etapa, que e a unica que o
 * componente costuma precisar. Os demais quadros continuam na lista, que e
 * o que o mapa de som le.
 */
export const sfxPorGesto = <T extends readonly SfxEvent[]>(
  eventos: T
): Record<string, number> => {
  const mapa: Record<string, number> = {};
  for (const e of eventos) {
    if (mapa[e.gesto] === undefined) mapa[e.gesto] = e.frame;
  }
  return mapa;
};
