# CSS moderno: o que é seguro usar em produção hoje

STATUS: conhecimento sob demanda. Este módulo é lido quando o assunto aparece (escolher um recurso
visual novo, decidir se dá pra usar um efeito, resolver algo que quebrou em um navegador só). O mapa
geral de todos os módulos está em `templates/inteligencia-visual/INDEX.md`.

## Por que este módulo existe

Todo ano a linguagem visual da web ganha recursos novos. Alguns já funcionam em qualquer celular ou
computador do seu público. Outros funcionam bem em três navegadores e simplesmente somem no quarto.
A diferença entre os dois grupos é a diferença entre uma página que impressiona e uma página que
aparece quebrada justo na tela do cliente que ia comprar.

Este módulo separa os recursos em três níveis de confiança, com base em pesquisa feita em agosto de
2026 nas fontes de referência do setor (MDN, caniuse e Baseline).

Legenda dos três níveis:

- **SEGURA**: usa direto, sem plano B. O recurso já está estabelecido.
- **FALLBACK**: usa, mas com degradação planejada, normalmente com `@supports`. Nunca deixe esse
  recurso ser a única forma de fazer algo essencial da página funcionar.
- **EXPERIMENTAL**: só como enfeite opcional. Se sumir, ninguém sente falta.

O critério de corte não é "existe suporte em todo lugar". É "quebra alguma coisa quando não tem
suporte". Um recurso que, faltando, apenas deixa a página menos bonita, é seguro. Um recurso que,
faltando, esconde um botão ou embaralha o layout, não é.

## Produção segura (usar sem medo)

| Recurso | Caso de uso prático |
|---|---|
| `backdrop-filter` | Efeito de vidro em barra de navegação ou barra fixa, ver `templates/inteligencia-visual/MATERIALS.md`. Manter o prefixo `-webkit-` |
| `color-mix()` | Gerar tom de hover, borda e variação a partir de uma cor só, o que reduz cor escrita na mão espalhada pelo projeto |
| `oklch()` | Paleta com variação de tom perceptualmente uniforme, útil ao criar a variação de uma marca nova |
| CSS nesting (aninhamento) | Aninhar seletor sem precisar de ferramenta extra de compilação |
| `@layer` | Ordenar reset, tema e componente sem a briga de qual regra vence qual |
| Container queries (por tamanho) | Componente que se adapta ao espaço do próprio bloco onde está, não ao tamanho da tela inteira |
| `subgrid` | Alinhar o conteúdo interno de um card com a grade do bloco pai (layout tipo bento, comparação de planos) |
| `clamp()` / `min()` / `max()` | Já é a base da escala de tamanho de texto fluida definida em `templates/design-tokens/core.json` |
| `aspect-ratio` | Fixar a proporção de imagem e vídeo sem gambiarra de espaçamento |
| `content-visibility` | Pular a renderização de seção que está fora da tela em página longa (apresentação, ebook) |
| `contain` | Isolar cálculo de layout e pintura em lista grande (painel, feed) |
| `:has()` | Estilizar o elemento pai conforme o que ele tem dentro (formulário com erro, card que tem imagem) |
| `popover` | Menu e balão de dica na camada de cima, que fecha sozinho, sem precisar de código de posicionamento |
| `mask` / `clip-path` | Recorte, desvanecer com gradiente, revelação em forma geométrica |
| `mix-blend-mode` | Sobreposição de texto com imagem, efeito duotone |
| Gradiente `conic` e interpolação em `oklch` | Gradiente vivo, sem aquela faixa acinzentada no meio da transição |
| Fontes variáveis | Um arquivo só cobre todos os pesos da fonte, o que significa menos coisa pra baixar e página mais rápida |
| `text-wrap: balance` | Título sem palavra sozinha na última linha. Complementa, mas não substitui, a conferência do equilíbrio da chamada em duas linhas antes de publicar |
| Propriedades lógicas | `margin-inline` e `padding-block`, prontos pra qualquer direção de leitura do texto |
| `prefers-reduced-motion` | Obrigatório, respeita quem pediu menos animação no sistema, ver `templates/inteligencia-visual/MOTION.md` |
| `prefers-color-scheme` | Tema claro e escuro automáticos quando a peça precisa dos dois |
| `forced-colors` | Ajuste pro modo de alto contraste do Windows, nunca quebra nada nos demais navegadores |
| `@property` | Registrar o tipo de uma variável de cor ou ângulo, o que permite animar gradiente com transição suave |

## Produção com fallback (usar, mas com plano B)

| Recurso | Situação | Plano B |
|---|---|---|
| Style queries | Entrou na linha de base muito recentemente (maio/2026) | Embrulhar em `@supports` e manter uma versão padrão que funciona sem a consulta |
| Anchor positioning (posicionamento ancorado) | Linha de base recente (2026), o Safari só ficou completo na versão 26 | `@supports` mais biblioteca de compatibilidade OddBird quando o posicionamento for crítico |
| View Transitions (transições de tela) | Dentro da mesma página já está na linha de base, entre páginas diferentes ainda falta o Firefox | Testar se `document.startViewTransition` existe. Onde não existe, a navegação acontece normalmente, só sem o efeito |
| Animações comandadas pela rolagem | Firefox ainda não tem suporte completo | O efeito de rolagem fica parado, sem quebrar o layout |
| `text-wrap: pretty` | Firefox ainda não tem | Cai pra quebra de linha normal, sem prejuízo visível |
| `field-sizing` | Entrou na linha de base muito recentemente (jun/2026) | A caixa de texto simplesmente não cresce sozinha conforme a pessoa digita, e nada mais quebra |
| `text-box-trim` | Novíssimo na linha de base (ago/2026) | Fica aquele espaço fantasma de sempre acima e abaixo do título |

## Experimental (não depender disso)

| Recurso | Situação |
|---|---|
| Scroll-state queries (consultas de estado da rolagem) | Só Chrome e Edge, sem Firefox e sem Safari. Usar apenas como enfeite opcional, por exemplo detectar que um elemento fixo grudou no topo sem precisar de código extra. Nunca deve ser a única forma de fazer algo importante acontecer |

## Nada nesta lista está classificado como EVITAR

Todos os recursos avaliados têm um caminho de degradação limpa: quando o navegador não entende, a
página continua de pé. Vale repetir o critério, porque ele é a regra que decide tudo aqui: não é
"existe suporte total", é "quebra alguma coisa quando não suportado". Se quebra, o recurso é
FALLBACK ou EXPERIMENTAL, e nunca pode ser a única via de algo crítico do fluxo.

## Como aplicar na prática

1. Antes de usar um recurso novo, ache ele nas tabelas acima. Não está listado? Trate como
   experimental até provar o contrário.
2. Está na tabela de fallback? Escreva primeiro a versão que funciona sem ele, e só depois adicione
   a melhoria dentro de `@supports`.
3. Depois de montar a página, confira o contraste nos três tamanhos de tela (celular, tablet e
   computador) e confira o equilíbrio da chamada principal quando ela ocupa duas linhas.
4. Regra de bolso na dúvida: se o recurso some e a pessoa ainda consegue ler, clicar e comprar,
   pode usar. Se some e ela trava, não pode.
