# LAYOUT: grade, espaçamento, ritmo e composição

STATUS: conhecimento sob demanda. Este módulo é lido quando o assunto aparece (montar página, apresentação, painel, qualquer peça em que a posição das coisas importa), não em toda tarefa. O mapa geral dos módulos está em `templates/inteligencia-visual/INDEX.md`.

## Interface profissional não nasce de componente bonito isolado

Nasce de proporção, espaçamento, hierarquia, alinhamento, ritmo e repetição entre os elementos. Um card lindo dentro de uma página mal espaçada continua parecendo amador.

Por que isso importa na prática: quando alguém abre a sua página e sente que "tem algo estranho" sem saber apontar o quê, quase nunca é o desenho do botão. É a distância entre as coisas. O olho percebe proporção antes de perceber detalhe.

## Grade de espaçamento: múltiplos de 8, com subdivisão de 4

Existe uma hierarquia de espaço, e ela vale sempre nesta ordem crescente:

espaço interno do componente < espaço entre componentes < espaço entre seções.

Traduzindo: o ar dentro de um card é sempre menor que o ar entre dois cards, que por sua vez é sempre menor que o ar entre dois blocos da página. Quando essa ordem se inverte em algum ponto, o leitor deixa de entender o que pertence a quê, e o material perde a leitura natural de cima para baixo.

Espaçamento arbitrário (13px aqui, 37px ali, sem relação nenhuma com uma escala) é um dos sinais mais fortes de material gerado sem critério. A lista completa desses sinais está em `templates/inteligencia-visual/BLACKLIST.md`.

Valores canônicos de respiro:

| Onde | Desktop | Celular |
|---|---|---|
| Respiro vertical de seção | 80px | 56px |
| Margem lateral do conteúdo | 24px | 16px |

Registre esses valores uma única vez no bloco `espacamento` de `templates/design-tokens/core.json` (base de 8px) e rode `node templates/design-tokens/build.js` para gerar as variáveis. Depois disso, use sempre o valor gerado, nunca invente um recuo novo para cada seção. É essa disciplina chata que faz uma página de 12 blocos parecer uma peça só, e não 12 pedaços colados.

## Tamanhos de tela canônicos: não reinventar

375px para celular, 768px para tablet, 1280px para computador. Se o material for apresentação em tela cheia, some 1281px ou mais como faixa de exibição ampliada.

Toda verificação visual acontece nesses três tamanhos, sempre nos três, nunca só naquele em que você está trabalhando. A maioria dos defeitos que chegam ao cliente final nasce de alguém ter conferido apenas no computador.

## Alvo de toque e áreas interativas

Mínimo de 44px de alvo de toque em qualquer elemento clicável: botão, item de menu, caixa de seleção, ícone que abre alguma coisa.

Isso vale mesmo quando o elemento visual é menor que 44px. Nesse caso, complete a área com recuo interno invisível, mantendo o desenho pequeno e a área de toque grande. O motivo é físico: o dedo é maior que o cursor do mouse. Alvo pequeno demais gera aquele efeito de "cliquei e não abriu", que o visitante interpreta como site quebrado, e não como alvo apertado.

## Assimetria intencional: fuja da centralização automática

Tudo centralizado, com a mesma grade de três colunas repetida a cada seção, é o segundo sinal mais forte de material gerado sem critério, perdendo apenas para o gradiente roxo genérico (ver `templates/inteligencia-visual/BLACKLIST.md`).

Alternativas que resolvem:

- Grade assimétrica com um único ponto focal por tela, e um elemento que extrapola a grade de propósito.
- Variar o tratamento visual de seção para seção conforme se desce a página. Nem toda seção precisa da mesma estrutura de título, texto e botão.
- Espaço vazio usado como elemento de composição, e não como sobra que "faltou preencher".

O critério por trás: repetição idêntica sinaliza automação. Variação controlada sinaliza que alguém pensou naquilo. O cliente não sabe nomear a diferença, mas paga preços diferentes por ela.

## Densidade por contexto

A quantidade certa de informação por tela muda conforme o tipo de peça:

- Página de venda e apresentação: densidade baixa, espaço generoso, uma ideia por tela ou por seção. Quem está sendo convencido precisa de tempo entre um argumento e outro. Ver a seção de fronteira em `templates/inteligencia-visual/FOUNDATIONS.md`.
- Painel de controle e área de membros: densidade alta, muita informação por área de tela. Quem já é cliente quer encontrar rápido, não quer rolar a tela. Ver `templates/inteligencia-visual/APPS-DASHBOARDS.md`.

Aplicar a régua errada é um erro comum e caro: painel arejado demais vira trabalho para o usuário, e página de venda apertada vira parede de texto que ninguém lê.

## Alinhamento óptico

Elemento redondo (ícone, avatar, marcador de lista) ao lado de elemento reto parece desalinhado mesmo quando a coordenada matemática é exatamente a mesma. Compense com 1 ou 2px de ajuste visual, confiando no olho e não no número.

Este é o tipo de detalhe que separa peça artesanal de peça gerada em série, justamente porque é um ajuste que quase nunca acontece sozinho. Quem revisa material bom procura por isso.

## Estrutura de página de venda: a ordem canônica de 15 blocos

A ordem validada, de cima para baixo:

1. Barra de aviso
2. Navegação
3. Herói (a promessa principal)
4. Dor
5. Quebra de crença
6. Mecanismo
7. Como funciona
8. O que a pessoa recebe
9. Benefícios
10. Prova social
11. Autoridade de quem entrega
12. Oferta
13. Garantia
14. Fechamento
15. Rodapé

Esta lista define a ORDEM dos blocos. Este módulo cuida do espaçamento e do ritmo DENTRO de cada bloco. As duas coisas são independentes: dá para ter a ordem certa e o ritmo errado, e o resultado ainda assim não converte.

Regras de marca que atravessam todos os blocos (cor, fonte, forma) ficam em `templates/DESIGN-SYSTEM-CENTRAL.md`.

## Antes de dar a peça por pronta

- O ar dentro dos componentes é menor que o ar entre eles, e menor ainda que o ar entre seções?
- Todo recuo usado vem da escala de espaçamento, sem número solto e sem exceção improvisada?
- A peça foi conferida nos três tamanhos de tela, e não só naquele em que foi feita?
- Todo elemento clicável tem pelo menos 44px de área de toque?
- Existe pelo menos uma quebra de simetria intencional, ou a página inteira é a mesma grade centralizada repetida?
- A densidade combina com o tipo da peça (arejada para convencer, densa para operar)?
- Cada chamada em duas linhas ficou com as linhas de tamanho parecido, sem uma palavra sozinha na última linha?

Falhar em qualquer um destes pontos significa que a peça ainda não está pronta, mesmo que ela já pareça bonita na tela em que você está olhando.
