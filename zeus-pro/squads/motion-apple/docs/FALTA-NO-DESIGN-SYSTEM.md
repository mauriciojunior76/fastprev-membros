# O que faltou no design system para este tipo de conteúdo

Levantado em 06/09/2026, durante a produção do reel da call com o Carlos Seme (mentoria, alto ticket, fala de argumentação). Escrito a pedido do o dono do canal, para ele levar ao Claude Design e mandar criar o que falta.

O guia atual resolve muito bem conteúdo de INTERFACE (perfil, feed, chat, notificação, KPI) e conteúdo de ESTRUTURA SIMPLES (passos, comparação, trio, grade). Onde ele me deixou na mão foi em conteúdo de ARGUMENTAÇÃO: uma pessoa construindo um raciocínio, sem tela de app para mostrar e sem número para exibir.

## 1. O buraco maior: esquemas para argumento, não para dado

Quase todo esquema do guia pressupõe que existe DADO (valores, etapas, itens, métricas). Numa call de mentoria a fala é quase toda argumento: o que a pessoa acha, o que ela deveria achar, por que uma coisa leva à outra. Faltam peças para isso.

**Crença contra realidade.** Foi o que abre este vídeo: "ele acha que vai precisar dar mentoria da parte técnica, mas na verdade a mentoria que vende é outra". É o gesto mais comum de qualquer conteúdo de autoridade. Resolvi com o espelho (dois cartões), mas espelho é para dois ESTADOS, não para uma crença sendo derrubada. Falta uma peça que mostre "isto que você pensa" e depois vire "isto é o que é", com o primeiro perdendo força na tela em vez de só ficar cinza ao lado.

**Consequência em cadeia.** "Elas querem o business, que é o que vai te dar escala, porque hoje você tem resultado." A fala encadeia causa e efeito em corrente, e o guia só tem passos (que implicam ordem no tempo) e ramificação (que implica saídas paralelas). Falta a corrente de causa: A leva a B que leva a C, com a seta significando "portanto", não "depois".

**Objeção e resposta.** Não apareceu nesta call, mas aparece em quase toda venda: "você deve estar pensando X, só que Y". Merece peça própria, porque hoje viraria comparação certo e errado, que é julgamento moral e não é a mesma coisa.

## 2. Falta peça para PESSOA como sujeito

O guia tem avatar dentro de interface (perfil do Instagram, depoimento, lista de leads), mas não tem pessoa como sujeito de uma frase. Quando a fala diz "as pessoas que vão comprar", "os profissionais que estão abaixo", "quem já fez", não existe recurso: eu tentei anéis concêntricos e o o dono do canal reprovou com razão.

Faltam, em família visual coerente com o resto:

- **Grupo genérico:** três a cinco figuras, uma delas em foco. Fiz na mão como trio de círculos com ícone, funcionou, mas devia ser peça oficial com medida definida.
- **Um contra muitos:** a figura destacada de um lado e o grupo do outro. É o desenho de "você está acima da média" e de "quem já fez contra quem ainda não fez".
- **Antes e depois da mesma pessoa:** a jornada existe para conceitos, mas quando o sujeito é a MESMA pessoa em dois momentos, dois nós iguais não comunicam. Aqui virou a sequência de passos com ícones diferentes, o que funcionou, mas foi solução minha, não do guia.

## 3. A escala existe, mas com uma peça só

A escala de intensidade salvou a cena do faturamento, e é o melhor recurso do guia para mostrar MOVIMENTO. Só que ela vem em uma versão só: trilho horizontal com um botão. Faltam variações do mesmo princípio:

- Escala com DOIS marcadores (você e a média, ou antes e depois) no mesmo trilho.
- Escala vertical, para quando a fala é sobre subir ou descer de patamar.
- Escala com zona nomeada (a faixa em que a maioria está, e a faixa em que quem se destaca está).

## 4. Falta régua de TEMPO por peça

Esta é a que mais me custou nesta produção. Cada molde diz a geometria e o gesto, mas não diz quanto tempo aquele gesto precisa para ser entendido. Resultado: o mini hospital ficou 0,56s na tela e o o dono do canal pegou na hora.

Cada peça deveria trazer três números junto com a medida:
- tempo mínimo para o gesto acontecer;
- tempo mínimo de leitura depois de assentar;
- tempo máximo antes de a peça virar tela parada.

Sem isso, quem monta o roteiro chuta, e chuta errado quando a cena é curta.

## 5. Falta a regra de convivência entre legenda e palco

O guia diz quando a legenda cala ("cede o canal quando o palco tem tipografia própria"), mas essa regra é vaga demais na prática: dois rótulos de esquema são tipografia própria? Uma pill de duas palavras é? Eu errei nos dois casos, e a régua só ficou clara depois que o o dono do canal apontou. Isso já está escrito no nosso squad agora, mas devia nascer no guia, com a régua objetiva: corpo do texto, quantidade de rótulos e repetição de palavra.

## 6. Falta a família de "estado da estrutura"

Descobri na marra que uma cena tem duas camadas: a ESTRUTURA (a forma que precisa nascer inteira, senão a pessoa não reconhece o que está vendo) e o DESTAQUE (o que entra na palavra). O guia trata tudo como um evento só, casado com a fala, e por isso eu deixei a balança com um prato só por seis segundos.

Cada molde deveria declarar o que é estrutura e o que é destaque. É uma linha por peça e mata uma classe inteira de defeito.

## 7. O que NÃO faltou, e vale dizer

A gramática de escolha (§6b, a tabela "a fala diz isto, use aquilo") é excelente e foi o que mais me guiou. O sistema de foco em quatro estados é claro. As medidas de respiro e raio resolvem sozinhas. O problema não foi falta de qualidade no que existe, foi falta de cobertura para fala argumentativa e falta de tempo declarado por peça.

## Resumo em uma linha para o Claude Design

Precisamos de uma família de esquemas de ARGUMENTO (crença contra realidade, corrente de causa, objeção e resposta), uma família de PESSOA como sujeito (grupo, um contra muitos, a mesma pessoa em dois momentos), variações da escala de intensidade, e, em toda peça existente, dois campos novos: quanto tempo o gesto precisa e o que nela é estrutura contra o que é destaque.

---

## O que a versão 3.2 respondeu (06/09/2026)

Resolvido, ou quase:

- **Consequência em cadeia** e **crença contra realidade**: os três esquemas novos (ponte,
  alavanca, troca) cobrem parte disso. A troca é exatamente "isto que você pensa" virando "isto é
  o que é", no mesmo lugar da tela, que era o que faltava para não usar o espelho torto.
- **Régua de tempo por peça**: cada molde agora traz `quadroCompleto` no `build-registry.json`, e
  a matriz de cenas traz a regra dura (abaixo de 240 quadros, nada acima de 48 de montagem). Ainda
  não é a régua completa de três números que pedimos (tempo de gesto, de leitura e teto de tela
  parada), mas resolve o caso que doeu: peça que aparece depois que a fala passou.
- **Convivência entre legenda e palco**: continua vaga no guia, mas agora existe gate mecânico do
  nosso lado (`checar-texto-duplicado.js`, ligado à revisão automática em 06/09).

Continua aberto, e vale levar na próxima ida ao Claude Design:

- **Pessoa como sujeito da frase**: grupo genérico, um contra muitos, e a mesma pessoa em dois
  momentos. Nada disso existe ainda.
- **Escala com dois marcadores**, escala vertical e escala com zona nomeada.
- **Objeção e resposta** ("você deve estar pensando X, só que Y") como peça própria. A troca
  chega perto, mas ela é substituição, não réplica.
