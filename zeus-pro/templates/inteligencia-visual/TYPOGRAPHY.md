# TIPOGRAFIA: hierarquia, escala e pareamento de fonte

## STATUS: conhecimento sob demanda. Leia quando o assunto for tamanho de texto, título, escolha de fonte ou hierarquia de leitura em qualquer material visual. O mapa geral dos módulos está em `templates/inteligencia-visual/INDEX.md`.

---

## 1. O princípio: hierarquia nasce do peso, não do enfeite

Levantamento de agosto de 2026 sobre as marcas de referência do mercado (Apple
como caso mais estudado): a diferença entre um título e um subtítulo se cria
por PESO da fonte e por salto deliberado de tamanho. Nunca por cor diferente,
sombra, contorno ou decoração aplicada em cima da letra.

Por que isso importa na prática: cor e efeito são a primeira coisa que o olho
cansa de ver e a primeira coisa que quebra quando o material muda de fundo, de
tela ou vai para impressão. Peso e tamanho continuam funcionando em qualquer
lugar, inclusive impressos em preto e branco.

Uma família de fonte por peça, no máximo duas: uma para título (display) e uma
para o corpo do texto. Fonte de largura fixa (mono) entra só quando existir
código ou dado alinhado em coluna. Uma terceira fonte display escolhida
"porque ficou bonita" não é padrão de produto sério, é enfeite, e é o sinal
mais comum de material feito sem critério.

Regras finas que fazem a diferença visível:

- Tracking (espaço entre letras) apertado em título grande, algo como
  `-0.02em`. Zero no corpo do texto. Título grande com espaçamento normal
  parece frouxo; corpo apertado fica desconfortável de ler.
- Leading (altura da linha) de 1.05 em título grande e 1.5 ou mais no corpo.
  Linha mais alta no corpo é o que faz um parágrafo longo ficar fácil de ler.
- Corpo de texto nunca abaixo de 16px. Esse é o piso de legibilidade. A
  referência da Apple trabalha com cerca de 17px como base do corpo.

## 2. A escala já está calculada, não reinvente por peça

O arquivo `templates/design-tokens/core.json`, no bloco `escala_tipografica`,
já define a escala inteira: base entre 16px e 18px, razão entre 1.2 e 1.25,
crescendo de forma fluida entre telas de 360px e 1440px, em sete degraus
(de `-1` até `5`).

Rodando `node templates/design-tokens/build.js`, isso vira um conjunto de
variáveis de CSS prontas: `--texto-menor1` para legenda e nota, `--texto-t0`
para o corpo, e daí para cima até `--texto-t5` para o título de capa. As
famílias saem junto, como `--fonte-titulo`, `--fonte-texto` e `--fonte-apoio`.

Toda página, apresentação ou material novo consome essas variáveis. Escrever
tamanho solto seção por seção é o que produz aquele resultado em que cada
bloco da página parece ter sido feito por uma pessoa diferente, e é o defeito
mais caro de consertar depois, porque não existe um lugar único para corrigir.

## 3. Pareamento por perfil

Escolha o perfil mais próximo do que a marca precisa transmitir e siga a
combinação. Estas duplas já foram testadas e funcionam juntas:

| Perfil | Título (display) | Corpo | Peso do título |
|---|---|---|---|
| Feminino premium | Cormorant Garamond | DM Sans | 300, itálico no destaque |
| Masculino ou neutro | Inter | DM Sans | 700 a 800 |
| Tecnologia e software | Inter | Inter | 800, caixa alta |
| Jurídico e autoridade | Playfair Display | Inter | 400, com serifa |
| Editorial (ver `templates/inteligencia-visual/FOUNDATIONS.md`) | Fraunces ou Playfair em tamanho grande | Inter ou DM Sans | serifa como protagonista, corpo neutro |

Não invente uma dupla nova sem necessidade real. Quando o resultado não ficou
como esperado, o ajuste correto quase sempre é mudar o PESO dentro do perfil
escolhido, não trocar a família inteira. Trocar fonte é a solução que parece
óbvia e quase nunca é a causa do problema.

Enquanto o dono da instalação ainda não definiu as fontes da marca, o
`core.json` traz dois perfis neutros de partida, `sobrio` e `moderno`, montados
com fontes que já existem em qualquer computador. Eles servem para o material
sair correto desde o primeiro dia, sem ficar amarrado a nenhuma identidade. No
momento em que as fontes reais forem escolhidas, elas entram na seção 3 do
`templates/DESIGN-SYSTEM-CENTRAL.md`, que passa a ser a fonte única da decisão.

## 4. Números: use tabular quando o valor muda

Painel, métrica, preço, placar e contador animado usam
`font-variant-numeric: tabular-nums`.

O motivo é simples de ver: na maioria das fontes, o algarismo 1 é mais estreito
que o 8. Sem essa configuração, um número que muda de valor faz a linha inteira
"dançar" de largura na tela, e uma coluna de valores nunca alinha de verdade.
Com ela, todo algarismo ocupa a mesma largura. É crítico em contador que sobe
na frente da pessoa e em qualquer tabela de números.

## 5. Antipadrões (lista completa em `templates/inteligencia-visual/BLACKLIST.md`)

O que denuncia material feito sem critério tipográfico:

1. Inter, Roboto ou Poppins em tudo, sem intenção nenhuma, só porque é o
   default do momento.
2. Tamanho arbitrário fora da escala, tipo 13px aqui e 37px ali.
3. Peso padrão da ferramenta em todos os textos, sem hierarquia real entre
   título, subtítulo e corpo.
4. Tracking e altura de linha no valor padrão em todos os tamanhos, do título
   de capa à legenda.

O caminho oposto, o que as referências fortes fazem, é usar a tipografia como
protagonista: uma headline confiante, bem dimensionada, carregando a página
sozinha, em vez de depender de gradiente, brilho ou efeito para chamar
atenção.

## 6. Título de duas ou mais linhas

Este módulo cuida de hierarquia, escala e escolha de fonte. A quebra de linha
tem regra própria, e ela é simples: as linhas de um título quebrado precisam
ter tamanho parecido, e uma palavra sozinha na última linha é defeito.

Quando desequilibrar, a correção é cortar palavras da linha maior ou forçar a
quebra no ponto certo, não diminuir a fonte. A regra completa está na seção 9
do `templates/DESIGN-SYSTEM-CENTRAL.md`.

## 7. Conferência antes de entregar

Não é burocracia: é o que separa material que parece profissional de material
que quase parece.

1. Abrir a peça nos três tamanhos de tela (celular, tablet e computador) e
   conferir se a hierarquia continua clara e se o texto tem contraste
   suficiente contra o fundo em todos eles.
2. Conferir o equilíbrio de toda chamada que ocupa duas linhas ou mais, na
   tela real, nunca só no arquivo de origem. Em vídeo, conferir no quadro
   congelado.
3. Confirmar que nenhum tamanho de texto foi escrito solto fora da escala.
4. Confirmar que existem no máximo duas famílias de fonte na peça inteira.
