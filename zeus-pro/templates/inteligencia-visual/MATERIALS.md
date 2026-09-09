# MATERIALS: inteligência de material (quando usar vidro fosco, desfoque, textura e sombra)

STATUS: conhecimento sob demanda. Este módulo é lido quando o assunto aparece (vidro fosco, blur, textura, sombra, camadas, profundidade), não em toda sessão. O mapa geral dos módulos está em `templates/inteligencia-visual/INDEX.md`.

Fonte: princípios de material translúcido de interface (padrão Apple Liquid Glass, 2025 em diante) adaptados para web, levantamento feito em agosto/2026. Extraído para PRINCÍPIO, nunca para clonar o visual do iOS.

## O modelo de 3 camadas

Toda interface com profundidade tem no máximo 3 camadas: **Vidro** (flutua acima, funcional), **Conteúdo** (o meio, nunca leva vidro), **Fundo** (atrás, estático).

Algo só flutua quando está funcionalmente ACIMA de outra coisa: navegação fixa, barra de ferramentas, popover, menu, busca sobreposta, modal. Card de conteúdo no fluxo normal da página NÃO flutua: não leva desfoque, leva sombra mínima ou nenhuma.

Por que isso importa na prática: o efeito de vidro é uma promessa visual de que existe algo por baixo. Quando você usa vidro num card que está no meio do texto, a promessa é falsa, e a página inteira passa a sensação de que foi montada sem critério.

## Quando usar vidro fosco e desfoque (propósito real)

- Separar navegação fixa do conteúdo que rola por baixo.
- Indicar que um elemento está numa camada acima de outra (modal, menu suspenso, dica flutuante).
- Manter contexto visual: a pessoa ainda vê o que está atrás, borrado, sem perder a referência de onde estava.
- Destacar um controle flutuante (busca, ação rápida) sem esconder o resto da tela.

## Quando NUNCA usar (proibido)

- Desfoque em card estático de conteúdo (lista, item de grade, seção de texto).
- Desfoque atrás de texto longo: prejudica a leitura, sem ganho nenhum.
- Desfoque em todos os cards da página. É o sintoma número 1 de página com cara de feita por inteligência artificial (ver `templates/inteligencia-visual/BLACKLIST.md`).
- Vidro sobre vidro: o efeito não consegue amostrar outro vidro, e o resultado vira uma mancha leitosa.
- Misturar a variante mais opaca e a variante mais transparente de vidro na mesma interface. Escolha uma e mantenha.
- Desfoque em excesso no celular: o custo de processamento é o mesmo ou pior que no computador, e a tela é menor para o efeito compensar (ver o limite de desempenho abaixo).

## Receita técnica (a que já vem configurada, ratificada pela pesquisa)

```css
.glass-nav {
  backdrop-filter: blur(20px) saturate(180%);
  background: rgba(5, 2, 1, 0.72); /* semitransparente, nunca sólido nem 100% líquido */
  border-top: 1px solid rgba(255, 255, 255, 0.4); /* aresta que pega luz */
}
```

Opacidade do vidro entre 10% e 25%. Acima de aproximadamente 30% o material perde a translucidez e vira plástico leitoso, não vidro.

Isso bate com a navegação padrão do design system central (`background: rgba(5,2,1,0.85)` com `backdrop-filter: blur(12px)`, ver `templates/DESIGN-SYSTEM-CENTRAL.md`). A receita que já está no pacote está dentro do princípio, então não precisa mudar: precisa apenas ser justificada quando alguém perguntar por quê.

## Custo de desempenho (limite técnico, não estético)

`backdrop-filter` é o efeito mais caro que existe em CSS. O navegador captura os pixels que estão atrás do elemento numa textura e reaplica o filtro toda vez que aquela região muda. Qualquer desfoque (inclusive `box-shadow` grande e `drop-shadow`) precisa olhar os pixels vizinhos e custa muito mais tempo de desenho do que uma cor sólida.

- NUNCA animar o raio do desfoque. Ele é recalculado a cada quadro e derruba a fluidez fora de máquina topo de linha.
- Animar só `transform` e `opacity`, deixando o desfoque parado.
- Limitar a ÁREA afetada: uma navegação fixa de 64px de altura, nunca a tela inteira.
- Alternativa obrigatória para quem precisa: `prefers-reduced-transparency` e `prefers-contrast` trocam o vidro por superfície sólida. Sem isso, quem configurou o aparelho para reduzir transparência recebe uma tela ilegível.

## Outros materiais

- **Textura de ruído (grain)**: já vem no pacote em `templates/design-tokens/core.json`, bloco `grain`, com opacidade 0.04 no SVG e 0.4 a 0.45 na camada de sobreposição. Propósito: quebrar o aspecto digital demais do fundo liso. Usar com moderação, nunca por cima de texto pequeno. Para regerar o CSS depois de mexer nos valores: `node templates/design-tokens/build.js`.
- **Sombra**: profundidade se cria PRIMEIRO com espaço, DEPOIS com uma leve variação de fundo (3 a 5% mais claro ou mais escuro). A sombra é o último recurso, nunca o primeiro. Sombra pesada e igual em todo card é antipadrão (ver `templates/inteligencia-visual/BLACKLIST.md`).
- **Borda**: só quando tem significado, como separar uma seção ou indicar o limite de um card clicável. Borda cinza de 1px em tudo, por hábito de framework, é antipadrão.

## Verificação antes de dar por pronto

- Conferir o contraste do texto que está em cima do vidro nos 3 tamanhos de tela (celular, tablet e computador). Vidro escurece e clareia conforme o que passa por baixo: o texto tem que continuar legível no pior caso, com o conteúdo mais claro possível rolando atrás.
- Rolar a página até o fim com a navegação fixa no lugar, olhando se em algum ponto o vidro encosta em outro elemento com vidro.
- Se a página tiver uma chamada de destaque em duas linhas dentro de uma área com vidro, conferir o equilíbrio das duas linhas: elas precisam ter comprimento parecido, sem deixar uma palavra sozinha na última linha.
- Testar com a opção de reduzir transparência ligada no sistema e confirmar que a superfície sólida assume o lugar do vidro.
