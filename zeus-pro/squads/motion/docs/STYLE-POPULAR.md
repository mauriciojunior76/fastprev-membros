# Motion Style: Popular (reel institucional que vende um recurso)

## 0. Cabeçalho

| Campo | Valor | Fonte |
|---|---|---|
| Nome do estilo | Popular | nome dado pelo o dono do canal; ainda NÃO consta em `docs/STYLE-REGISTRY.md` |
| Gatilhos de fala | "estilo popular", "igual o vídeo da Carol", "reel do Zeus", "transforma essa call em reel", "vídeo que apresenta um recurso", "vídeo institucional do Zeus" | proposto aqui; entra no registry e em `.claude/hooks/context-triggers.json` quando o o dono do canal aprovar |
| Composition | `ZeusTrafegoReels` | `src/compositions/ZeusTrafegoReels/index.tsx:220` |
| Origem do material | call da Carol Paixão, 19/08/2026 | `index.tsx:2` |
| Versão aprovada | v36, 27/08/2026 | `output/01-zeus-trafego/ZeusTrafegoReels-v36.mp4` (mtime 27/08 17:22) |
| Arquivo do vídeo | `squads/motion/output/01-zeus-trafego/ZeusTrafegoReels-v36.mp4` | listagem da pasta |
| Duração | 34,52 s medidos, 2072 frames a 60 fps | `tokens.ts VIDEO_FRAMES` e `tokens.ts:31` |
| Cartão de abertura | nenhum (`HOOK_FRAMES = 0`) | `tokens.ts HOOK_FRAMES` |
| Rodadas de correção até aprovar | 9 | `docs/ZOOM-REEL-MOTION.md:3` |

O que este livro NÃO cobre, e onde está:

| Assunto | Documento |
|---|---|
| As 14 leis da categoria "Zoom vira Reel", o pipeline mecânico e a variante Depoimento | `docs/ZOOM-REEL-MOTION.md` |
| Fluxo obrigatório de qualquer composition nova do squad, DNA ExemploMotion, gates | `docs/zeus-motion-design-system.md` |
| Tradução de pedido em português para o código do núcleo | `docs/INTENT-MAP.md` |
| Erros com causa raiz desta produção (ERROS #1 e #4 a #9) | `squads/motion/MEMORY.md` |

Regra de leitura: número sem fonte entre crases não vale. Se um número aparecer aqui sem
arquivo do lado, é porque ele não existe no código e está marcado como tal.

---

## 1. O que é e quando escolher

Definição em uma frase: é o reel institucional que pega um trecho de call em tela dividida e
usa o motion para MOSTRAR o recurso que a fala está vendendo, um elemento por ideia, terminando
no selo da marca.

Escolha este estilo, e não o Depoimento nem o Apple Conceitual, quando:

| Situação | Popular | Depoimento | Apple Conceitual |
|---|---|---|---|
| A fala vende um recurso ou explica como uma coisa funciona | sim | não | talvez |
| A fala é uma pessoa provando um resultado que ela viveu | não | sim (`docs/ZOOM-REEL-MOTION.md` seção 5b) | não |
| Quantidade de beats com motion | alta, quase toda ideia ganha cena (14 em 34,5 s, `tokens.ts SCENES`) | baixa, 2 de 6 blocos no caso real (`ZOOM-REEL-MOTION.md:172`) | média |
| Painel com número na tela | pode, o número é ilustração do recurso (`CampaignPanel.tsx`) | proibido se a pessoa não disse o número (`ZOOM-REEL-MOTION.md:175`) | evitar |
| Marca de terceiro citada (Meta, Telegram) | vira o vetor oficial e vira cena inteira (`BrandBeat.tsx`) | raro | raro |
| Fecho | selo da marca com anel colorido (`ZeusSealClose.tsx`) | sem selo obrigatório | livre |

Teste do sósia: se você congelar um frame do meio do vídeo e ele mostrar dois rostos empilhados
em cima, uma legenda grande no meio e UM desenho de traço preto sozinho embaixo, em fundo
branco, é este estilo. Se aparecer mais de um elemento se mexendo no mesmo frame, ou fundo
escuro, ou cor fora do anel do fecho, não é.

---

## 2. Base herdada e desvios

A base comum da categoria (canvas, fileira de cards, dead zone, overlap entre cenas, margem de
saída, gates obrigatórios) vive em `docs/ZOOM-REEL-MOTION.md` e não se repete aqui.

Observação honesta: o pedido citava a "seção 2b" do playbook. Essa seção não existe hoje: o
playbook vai da seção 1 à 7, com uma 5b (variante Depoimento). A base comum está espalhada nas
seções 2 e 3 dele.

Desvios deste estilo em relação à base comum:

| Item | Valor da base | Valor deste estilo | Motivo |
|---|---|---|---|
| Taxa de quadros | 30 fps é a convenção antiga do squad (`docs/STYLE-REGISTRY.md`, "Convenções globais") | 60 fps, `tokens.ts FPS` | o motion ganha fluidez mesmo com o vídeo fonte em 30, que só repete frame (`tokens.ts:11`). Todo frame deste livro é base 60 |
| Cartão de abertura com frase | existia até a 5ª rodada | zero, `tokens.ts HOOK_FRAMES` | ordem do o dono do canal: "acho que pode tirar a parte inicial, a frase, vamos direto pro video quando comeca a fala" (`tokens.ts:24`) |
| Consequência do item acima na mixagem | áudio entrava com `adelay` | áudio casa com o frame 0, sem `adelay` | `tokens.ts:26` |
| Fim do palco | número fixo 1620 | `GRID_SAFE.bottomDeadStart` (1632), `tokens.ts LAYOUT.stageBottomY` | o valor passou a derivar do grid oficial em vez de ser "quase certo" (`tokens.ts:83`) |
| Área útil do palco | não existia | token `STAGE_SAFE`, `tokens.ts STAGE_SAFE` | colisão com a legenda virou erro de build (`tokens.ts:108`) |
| Espessuras de traço | seis avulsas (1.5/2/2.5/3/4/5) | duas, `tokens.ts STROKE` | quatro espessuras no mesmo ícone leem como traço tremido (`tokens.ts:53`) |
| Curva padrão de entrada | `cinematic`/`premium`/`tech`/`organic` | `settle` e `settleSoft`, `core/curves.ts` | as antigas percorrem 95% do movimento na metade do tempo (`choreography.ts:25`) |
| Janela de desenho de traço | 52 frames | 72, `components/icons/drawUtils.tsx DRAW_DUR_DEFAULT` | "a linha assenta em vez de chegar" (`drawUtils.tsx:25`) |
| Identidade visual | espalhada pelos componentes | tudo em `BRAND.ts` | replicar com outra marca mexendo em um arquivo só (`BRAND.ts:4`) |

---

## 3. Identidade

Tudo desta seção vive em `src/compositions/ZeusTrafegoReels/BRAND.ts` e é reexportado por
`tokens.ts` para nenhum componente quebrar (`tokens.ts:36`).

### Cores (`BRAND.ts BRAND_COLORS`)

| Chave | Hex | Papel real no vídeo |
|---|---|---|
| `black` | `#1d1d1f` | traço de todo desenho, texto de valor, célula preenchida, playhead |
| `gray900` | `#2d2d2d` | reserva, sem consumidor nesta peça |
| `gray700` | `#424245` | cor das palavras já ditas na legenda (`index.tsx:174`) e nome do contato no chat |
| `gray600` | `#6e6e73` | eyebrow do topo, rótulo de ícone, assinatura do fecho |
| `gray500` | `#86868b` | duração do áudio no balão (`TelegramChat.tsx:202`) |
| `gray400` | `#a1a1a6` | vapor do café, linha de texto falso mais escura do checklist |
| `gray200` | `#d2d2d7` | barra ainda não tocada da waveform, trilho do painel, borda de card |
| `gray100` | `#e8e8ed` | divisória do cabeçalho do chat e do painel |
| `gray50` | `#f5f5f7` | fundo aceso da linha do painel e do chip de orçamento |
| `white` | `#fbfbfd` | reserva, sem consumidor nesta peça |
| `pureWhite` | `#ffffff` | fundo da composição inteira (`index.tsx:202`), miolo do anel do fecho, halo dos pontos do gráfico |
| `blue` | `#0071e3` | reserva, sem consumidor nesta peça |

### Espectro do anel do fecho (`BRAND.ts BRAND_SPECTRUM_STOPS`)

Único ponto de cor da peça inteira (`BRAND.ts:47`). Oito paradas, na ordem:

`{{marca.traco}} 0%`, `{{marca.espectro.2}} 14%`, `{{marca.espectro.3}} 28%`, `{{marca.espectro.4}} 42%`, `{{marca.espectro.5}} 56%`, `{{marca.espectro.6}} 70%`,
`{{marca.espectro.7}} 84%`, `{{marca.traco}} 100%`.

### Fontes (`BRAND.ts BRAND_FONT`, `BRAND_MONO`, `index.tsx:39`)

| Item | Valor | Fonte |
|---|---|---|
| Família de texto | `'Inter', -apple-system, sans-serif` | `BRAND.ts BRAND_FONT.family` |
| Pesos carregados de Inter | 400, 600, 700, 800, 900, subsets latin e latin-ext | `index.tsx:39` |
| Família mono | `'JetBrains Mono', ui-monospace, monospace` | `BRAND.ts BRAND_MONO` |
| Pesos carregados de mono | 500 e 700, subset latin | `index.tsx:45` |
| Tracking apertado | `-0.022em` | `BRAND_FONT.trackingTight` (sem consumidor nesta peça) |
| Tracking mais apertado | `-0.032em` | `BRAND_FONT.trackingTighter` (sem consumidor nesta peça) |

O mono só existe para DADO numérico dentro de painel, nunca para texto corrido
(`tokens.ts:46`).

### Tipografia de rótulo dentro de ícone

| Token | Valores | Fonte |
|---|---|---|
| `ICON_LABEL` | fontSize 30, fontWeight 600, letterSpacing `0.08em` | `tokens.ts ICON_LABEL` |
| `ICON_VALUE` | fontSize 38, fontWeight 800, letterSpacing `-0.01em` | `tokens.ts ICON_VALUE` |

### Traço

| Token | Valor | Uso |
|---|---|---|
| `STROKE.regular` | 3 | contorno do objeto principal |
| `STROKE.hairline` | 2 | apoio, detalhe, textura (linha de texto falso, vapor, eixo) |

Fonte: `tokens.ts STROKE`. Toda espessura passa por `strokePx(token, escalaDeExibicao)`
(`drawUtils.tsx strokePx`), porque `strokeWidth` no SVG é medido no viewBox, não em pixel de
tela.

### Textos de marca (`BRAND.ts BRAND_TEXT`)

| Chave | Texto | Onde aparece |
|---|---|---|
| `eyebrow` | `ZEUS · IA DE TRÁFEGO` | topo, o vídeo inteiro (`index.tsx:94`) |
| `sealWordmark` | `ZEUS` | fecho, abaixo do símbolo |
| `sealTagline` | `IA PARA MENTORES` | fecho, abaixo do wordmark |

### Logo

`ZeusTrafegoReels/img/zeus-zspark-v1.png`, em `BRAND.ts BRAND_LOGO_SRC`. É o símbolo dentro do
retângulo arredondado do fecho e dentro do `ZeusTile` da cena `zeus-ia`
(`BrandBeat.tsx SPARK`).

---

## 4. Grade da tela

Todos os valores em pixel, canvas retrato. Origem no canto superior esquerdo.

| Canal | Valor | Fonte |
|---|---|---|
| Eyebrow (topo) | `top: 96`, fontSize 18, peso 600, letterSpacing 6, centralizado | `index.tsx:83` |
| Fade de entrada da eyebrow | frames 0 a 46, curva `easyEase` | `index.tsx:66` |
| Fileira de vídeo, topo | `LAYOUT.cardTop` = 180 | `tokens.ts LAYOUT.cardTop` |
| Fileira de vídeo, lateral | `(1080 - 940) / 2` = 70 de cada lado | `index.tsx:147` |
| Card de vídeo | 940 x 400, dois cards, `gap` 16 | `tokens.ts LAYOUT` |
| Entrada dos cards | vem de cima, distância 30, duração 58 | `index.tsx:119` |
| Palco expandido, escala do card | `780 / 940` = 0,8298 | `tokens.ts LAYOUT.videoScaleExpanded` |
| Palco expandido, subida do card | `-70` | `tokens.ts LAYOUT.videoShiftYExpanded` |
| Legenda, distância do fundo | 780 | `tokens.ts LAYOUT.captionBottom` |
| Faixa ocupada pela legenda | y 1076 a 1140 | conta escrita em `tokens.ts:114` |
| Base do palco (dead zone) | 1632 | `tokens.ts LAYOUT.stageBottomY`, derivado de `core/layout.ts SAFE.bottomDeadStart` |
| Altura do palco normal | 360, logo o palco vai de y 1272 a 1632 | `tokens.ts LAYOUT.stageHeightNormal` |
| Altura do palco expandido | 620, logo o palco vai de y 1012 a 1632 | `tokens.ts LAYOUT.stageHeightExpanded` |
| Área útil, palco normal | `STAGE_SAFE.normal` = 360 | `tokens.ts STAGE_SAFE` |
| Área útil, palco expandido | `STAGE_SAFE.expanded` = 470 | `tokens.ts STAGE_SAFE` |
| Transição normal para expandido | 68 frames a partir do início da cena, curva `smoothInOut` | `index.tsx:61` |

Por que `STAGE_SAFE.expanded` é 470 e não 620 (a conta que ninguém tinha escrito, `tokens.ts:108`):

```
base da legenda .................... 1140
respiro mínimo texto x elemento ....   22
primeiro y livre abaixo da legenda . 1162
base do palco (dead zone) .......... 1632
área útil = 1632 - 1162 = 470
```

Em linguagem simples: o palco expandido é alto demais e os 130 pixels de cima dele nascem
debaixo da legenda. Sempre foi assim. Só doeu quando um conteúdo de 598 px de altura entrou e
encostou no texto. Por isso cada componente declara `CONTENT_H` e o gate `palco-overflow`
(`scripts/choreo-lint.js:602`) compara os dois antes de renderizar.

---

## 5. Legenda

Props literais, em `index.tsx:171`:

| Prop | Valor |
|---|---|
| `words` | `narrationJson.words` (transcrição palavra a palavra) |
| `accent` | `COLORS.black` |
| `color` | `COLORS.gray700` |
| `fontFamily` | `FONT.family` (Inter) |
| `fontSize` | 58 |
| `fontWeight` | 700 |
| `maxWordsPerBlock` | 4 |
| `bottom` | `LAYOUT.captionBottom` (780) |
| `mode` | não declarado, logo o default `exemplo` (`modules/text-system/Captions.tsx`) |

O modo `exemplo` significa: a palavra ocupa o layout desde o início do bloco com opacidade zero,
para não empurrar as vizinhas; acende no timestamp real da fala com opacidade, desfoque e
subida; tem 3 frames de antecipação (`LEAD_IN_F`) para ficar legível NO momento da fala
(`Captions.tsx:14`).

A legenda acompanha a subida dos cards no palco expandido (mesmo `translateY` de `-70`,
`index.tsx:165`).

Quando ela some: na cena do fecho. `CaptionsLayer` devolve `null` quando a cena é `zeus-seal`
(`index.tsx:167`). É a única regra de sumiço; nos outros 29,67 s ela nunca desaparece.

---

## 6. Storyboard de referência

Regra que rege a tabela inteira: o `start` de cada beat é o frame EXATO da palavra âncora
(segundo da palavra vezes 60), nunca o início do bloco de fala. O silêncio antes da palavra
fica com o beat anterior, que segura parado (`tokens.ts:149`).

As entradas e saídas abaixo saem de `choreography.ts`. As direções vêm de `alternateDir(i)`,
ciclo de quatro: bottom, left, top, right (`core/choreo.ts:128`).

| # | Cena | Âncora (palavra, s, frame) | Fala coberta | Componente | Legenda | Palco | Entrada (curva, frames) | Saída (curva, frames) | Duração nominal | Por quê |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `meta-trafego` | "TRÁFEGO", 0,94 s, f56 | "pra fazer o tráfego" | `MetaBeat` | sim | normal | `settle`, 52, de baixo | `dramatic`, 30, para a esquerda | 99 f | a marca que SIGNIFICA tráfego. Marca citada vira vetor oficial e nasce na palavra (`tokens.ts:170`, `choreography.ts:76`) |
| 2 | `zeus-ia` | "Zeus", 2,58 s, f155 | "com a nossa IA, que é o Zeus" | `ZeusBeat` | sim | normal | `settle`, 58, da esquerda | `dramatic`, 32, para a direita | 108 f | o selo da casa. A saída é para a direita, nunca para cima: sem `ownsMotion` o palco empurra 1200 px e o selo atravessaria o rosto da Carol (`choreography.ts:101`) |
| 3 | `telegram-abre` | "Telegram", 4,38 s, f263 | "você abre o Telegram" | `TelegramBeat` | sim | normal | `settle`, 38, de cima | `dramatic`, 24, para a direita | 66 f | beat curto de propósito: a marca só tem espaço para aparecer exatamente na palavra e segurar (`tokens.ts:174`) |
| 4 | `telegram-chat` | "como", 5,48 s, f329 | "como é que tá minhas campanhas hoje?" e a resposta | `TelegramChat` | sim | expandido | `settle`, 64, da direita, e o próprio desenho | `impact`, 40 (fade) | 218 f | cena única de chat: a pergunta e a resposta empilham na MESMA tela, em vez de trocar de cena (`tokens.ts:177`) |
| 5 | `ask-typing` | "pede", 9,12 s, f547 | "aí você pede pra ele: o que tem que fazer?" | `TypingBubble` | sim | normal | `settle`, 58, de baixo, e o próprio desenho | `premium`, 40 (fade) | 157 f | a tônica é VOCÊ PEDINDO, não áudio; os três pontinhos evitam repetir o player de voz que já é protagonista de outros dois beats (`TypingBubble.tsx:4`) |
| 6 | `checklist` | "isso,", 11,74 s, f704 | "tem que fazer isso, isso, isso" | `Checklist` | sim | normal | `settle`, 44, da esquerda, com 3 filhos em stagger de 14 f | `premium`, 24 (fade) | 78 f | a lista. Três itens, um por "isso" da fala (`tokens.ts:184`, `choreography.ts:177`) |
| 7 | `approve-check` | "bom,", 13,04 s, f782 | "tá bom, pode fazer" | `ApproveCheck` | sim | normal | `settle`, 50, de cima, e o próprio desenho | `impact`, 40 (fade) | 132 f | o aval. Um check grande sozinho, o beat mais direto da peça (`ApproveCheck.tsx:4`) |
| 8 | `campaign-panel` | "configura", 15,24 s, f914 | "ele vai lá, configura, 5 minutos, já tá feito" | `CampaignPanel` | sim | expandido | `settle`, 66, de baixo, e o próprio desenho | `impact`, 40 (fade) | 183 f | a máquina trabalhando. Beat longo porque comporta a construção em degrau do painel (`choreography.ts:198`) |
| 9 | `telegram-voice` | "Telegram,", 18,28 s, f1097 | "pelo Telegram, por áudio" | `TelegramVoice` | sim | normal | `settle`, 46, da esquerda, e o próprio desenho | `dramatic`, 36 (fade) | 121 f | segunda menção da marca; ela fica o beat inteiro e o player de voz surge abaixo quando a fala chega em "áudio" (`tokens.ts:190`) |
| 10 | `coffee-voice` | "café", 20,3 s, f1218 | "você tá tomando um café" | `CoffeeVoice` | sim | normal | `settleSoft`, 42, de cima, e o próprio desenho | `premium`, 24 (fade) | 73 f | a caneca em tamanho de protagonista, áudio surgindo abaixo. Nasce exatamente na palavra, não antes (`tokens.ts:193`) |
| 11 | `meta-otimiza` | "otimizando", 21,52 s, f1291 | "ele tá otimizando suas campanhas" | `MetaBeat` | sim | normal | `settle`, 38, da direita | `dramatic`, 24, para baixo | 65 f | otimizar campanha é Meta. Repete o componente do beat 1 de propósito: mesma ideia, mesmo símbolo (`tokens.ts:195`) |
| 12 | `trend-chart` | "baseado", 22,6 s, f1356 | "baseado em dados, resultados e análise real" | `TrendChart` | sim | normal | `settleSoft`, 90, de baixo, e o próprio desenho | `premium`, 40 (fade) | 256 f | a curva começa a se desenhar e os rótulos batem em "dados", "resultados" e "análise real" (`tokens.ts:197`) |
| 13 | `compare-calendar` | "gestor", 26,86 s, f1612 | "um gestor de tráfego não vai cuidar todos os dias" | `CompareCalendar` | sim | expandido | `dramatic`, 68, da esquerda, e o próprio desenho | `impact`, 40 (fade) | 168 f | o argumento que fecha. Única cena com curva dramática na entrada, exceção documentada (`choreography.ts:282`) |
| 14 | `zeus-seal` | "Esse", 29,66 s, f1780 | "esse é um recurso do Zeus, que é a nossa IA" | nenhum no palco, `ZeusSealClose` por fora | NÃO | normal | ver seção 9 | não sai, é o fim | 292 f | o fecho. Renderizado à parte, fora do palco de ícones (`choreography.ts:298`) |

### `dur` e `exitF` calculados de cada cena

`ext(nominal)` soma o overlap de 10 e deriva a margem de saída (30% do nominal, piso 24, teto 40),
em `choreography.ts:45`. Resultado:

| Cena | Nominal | `dur` | `exitF` (frame local em que a saída começa) |
|---|---|---|---|
| meta-trafego | 99 | 109 | 79 |
| zeus-ia | 108 | 118 | 86 |
| telegram-abre | 66 | 76 | 52 |
| telegram-chat | 218 | 228 | 188 |
| ask-typing | 157 | 167 | 127 |
| checklist | 78 | 88 | 64 |
| approve-check | 132 | 142 | 102 |
| campaign-panel | 183 | 193 | 153 |
| telegram-voice | 121 | 131 | 95 |
| coffee-voice | 73 | 83 | 59 |
| meta-otimiza | 65 | 75 | 51 |
| trend-chart | 256 | 266 | 226 |
| compare-calendar | 168 | 178 | 138 |
| zeus-seal | 292 | 292 | nenhum (é a última) |

### Eventos internos que importam (frame LOCAL de cada cena)

| Cena | Frame local | O que acontece | Fonte |
|---|---|---|---|
| telegram-chat | 0 | moldura da janela começa a se desenhar | `TelegramChat.tsx:212` |
| telegram-chat | 34 | logo e nome do contato aparecem | `TelegramChat.tsx:213` |
| telegram-chat | 52 | divisória do cabeçalho aparece | `TelegramChat.tsx:214` |
| telegram-chat | 66 | balão da minha mensagem começa a se desenhar (janela 44) | `TelegramChat.tsx:216` |
| telegram-chat | 92 | conteúdo do meu balão acende | `TelegramChat.tsx:217` |
| telegram-chat | 118 a 198 | playhead do meu áudio varre a onda | `TelegramChat.tsx:220` |
| telegram-chat | 108 | resposta do Zeus surge (é o frame 437 do vídeo, a palavra "Ele") | `TelegramChat.tsx RESPONSE_AT` |
| telegram-chat | 154 a 238 | playhead da resposta varre a onda | `TelegramChat.tsx:226` |
| ask-typing | 6 | balão começa a se desenhar | `TypingBubble.tsx:36` |
| ask-typing | 62 | traço fecha e só então os pontinhos começam a pulsar | `TypingBubble.tsx DRAW_DONE` |
| checklist | 10, 24, 38 | entrada de cada card (stagger 14 do spec mais 10 de base) | `Checklist.tsx:35` e `choreography.ts:177` |
| checklist | +30 a +70 de cada card | o check se desenha depois do card assentar | `Checklist.tsx:43` |
| approve-check | 0 | círculo se desenha | `ApproveCheck.tsx:29` |
| approve-check | 28 | check começa | `ApproveCheck.tsx:30` |
| approve-check | 74 | check fecha e dispara um pulso único de 6% em 40 frames | `ApproveCheck.tsx CHECK_DONE` |
| campaign-panel | 0 | contêiner se desenha | `CampaignPanel.tsx:125` |
| campaign-panel | 22 | três pontinhos da barra de título | `CampaignPanel.tsx:127` |
| campaign-panel | 50 | cabeçalho com o ponto pulsante e o título CAMPANHA | `CampaignPanel.tsx:128` |
| campaign-panel | 70 / 112 / 154 | linha 1, linha 2 e linha 3, em degrau | `CampaignPanel.tsx:183` |
| campaign-panel | 168 | chip de orçamento | `CampaignPanel.tsx:129` |
| telegram-voice | 35 | o player de voz surge abaixo da marca (a palavra "áudio", 1132 menos 1097) | `MarkWithVoice.tsx:74` |
| coffee-voice | 0 / 14 / 26 / 32 / 38 | xícara, alça, e os três risquinhos de vapor | `MarkWithVoice.tsx:102` |
| coffee-voice | 24 | o player de voz surge abaixo | `MarkWithVoice.tsx:111` |
| trend-chart | 0 | eixo se desenha | `TrendChart.tsx:74` |
| trend-chart | 24 | curva começa a se desenhar | `TrendChart.tsx:75` |
| trend-chart | 44 / 104 / 164 | rótulos DADOS, RESULTADOS e ANÁLISE REAL | `TrendChart.tsx LABELS` |
| compare-calendar | 0 | fileira GESTOR HUMANO | `CompareCalendar.tsx:85` |
| compare-calendar | 80 | fileira ZEUS | `CompareCalendar.tsx:86` |
| zeus-seal | ver seção 9 | | |

---

## 7. Catálogo de componentes

Mapa cena para componente: `components/MotionStage.tsx SCENE_COMPONENTS`.

### MetaBeat, ZeusBeat, TelegramBeat

| Campo | Valor |
|---|---|
| Arquivo | `components/icons/BrandBeat.tsx` |
| `CONTENT_H` | 320 (`BrandBeat.tsx CONTENT_H`), o maior dos três |
| O que mostra | o vetor oficial da marca, sozinho e parado |
| Tamanhos | Meta 320, Zeus (tile com espectro) 260, Telegram 280 (`BrandBeat.tsx:140`) |
| Timing interno | NENHUM, de propósito. Não declaram `ownsMotion`, quem move é o palco com as curvas da cena (`BrandBeat.tsx:122`) |
| Quando usar | a fala cita uma marca real e o beat é curto |
| Quando NÃO usar | a fala cita a marca de passagem sem que ela seja o assunto; aí o beat anterior segura |
| Erro que já cometeu | as marcas viviam numa camada paralela por cima do palco, então três coisas se mexiam ao mesmo tempo (ERRO #4 em `MEMORY.md`). E a saída para cima do `ZeusBeat` atravessava o rosto da Carol (ERRO #6) |

### TelegramChat

| Campo | Valor |
|---|---|
| Arquivo | `components/icons/TelegramChat.tsx` |
| `CONTENT_H` | 464, igual a `PANEL_H` (`TelegramChat.tsx:51`), abaixo do teto de 470 |
| O que mostra | a janela do Telegram com dois players de voz, pergunta à direita e resposta à esquerda |
| Grade | painel 640 x 464, raio 24, respiro interno 4,5% da largura, avatar 46, balão com raio 18 e cauda 12, faixa do player 72, balão meu com 66% da largura útil, balão do Zeus com 70% (`TelegramChat.tsx:50`) |
| Waveform | 28 barras, amostradas da amplitude REAL da narração no trecho que cada balão representa, com pico em janela de mais ou menos 2 frames (`TelegramChat.tsx:105`) |
| Timings internos | ver a tabela de eventos da seção 6 |
| Quando usar | a fala descreve uma CONVERSA com pergunta e resposta |
| Quando NÃO usar | a fala só cita o aplicativo (aí é `TelegramBeat`), ou só cita áudio sem conversa (aí é `MarkWithVoice`) |
| Erro que já cometeu | tinha um "dashboard" de 4 barrinhas com "92%" dentro do balão da resposta, e o conjunto vazava e colidia com a legenda. O dado real foi devolvido para as cenas feitas para isso (`TelegramChat.tsx:5`, ERRO #7) |

### TypingBubble

| Campo | Valor |
|---|---|
| Arquivo | `components/icons/TypingBubble.tsx` |
| `CONTENT_H` | 272 (`TypingBubble.tsx CONTENT_H`) |
| O que mostra | balão de mensagem com três pontinhos de "digitando" |
| Tamanhos | exibido 578 x 272 sobre viewBox 340 x 160; pontos em x 130, 170 e 210, cy 75, raio base 9 mais 3 de pulso |
| Timing interno | traço a partir do frame 6; o pulso só nasce no frame 62, com rampa de 34 frames |
| Quando usar | a fala é VOCÊ pedindo, perguntando ou escrevendo |
| Quando NÃO usar | quando o assunto é áudio; repetir o player de voz em três beats mata o dispositivo |
| Erro que já cometeu | nenhum registrado; ele nasceu justamente para não repetir o player de voz |

### Checklist

| Campo | Valor |
|---|---|
| Arquivo | `components/icons/Checklist.tsx` |
| `CONTENT_H` | 308 (`Checklist.tsx CONTENT_H`), três cards de 88 com 22 de intervalo |
| O que mostra | três cards com check circular e duas linhas de texto falso |
| Tamanhos | card 560 x 88, raio 16, borda `STROKE.hairline`, ícone 44, escala do check 1,3; linhas falsas de 8 px com 72% e 6 px com 48% |
| Timings internos | por card: opacidade em 34 f, subida de 34 px em 46 f, desfoque de 8 px em 34 f; círculo de 16 a 46; check de 30 a 70. Tudo na curva da cena, via `useSceneDraw` |
| Quando usar | a fala enumera itens ("isso, isso, isso") |
| Quando NÃO usar | item único; um card sozinho não lê como lista |
| Erro que já cometeu | era check solto mais risquinho, sem estrutura de card; virou anatomia de card do padrão Motion Rosa (`Checklist.tsx:4`) |

### ApproveCheck

| Campo | Valor |
|---|---|
| Arquivo | `components/icons/ApproveCheck.tsx` |
| `CONTENT_H` | 240 |
| O que mostra | um check grande dentro de um círculo que se desenha antes |
| Tamanhos | 240 x 240, escala do check `240 / 24 / 2.2` = 4,545, raio do círculo `120 - 3` |
| Timings internos | círculo no frame 0, check no 28, pulso único de 6% quando o check fecha no 74 |
| Quando usar | aprovação, aval, confirmação |
| Quando NÃO usar | como decoração de fim de lista; ele tem que carregar o beat sozinho |
| Erro que já cometeu | o check era traçado à mão; virou o glifo oficial Check da biblioteca elegante da Exemplo (`ApproveCheck.tsx:4`) |

### CampaignPanel

| Campo | Valor |
|---|---|
| Arquivo | `components/icons/CampaignPanel.tsx` |
| `CONTENT_H` | 360 (`CampaignPanel.tsx CONTENT_H`) |
| O que mostra | uma janela de sistema configurando uma campanha sozinha |
| Grade | svg 620 x 360; três pontinhos em cy 30; cabeçalho em y 70 a 100; chip 160 x 44 em x 432; linhas em y 140, 214 e 288; rótulo em cima e trilho 30 px abaixo (`LABEL_TO_TRACK`); trilho de 388 px de largura a partir de x 78; valor alinhado à direita em x 588 |
| Conteúdo fixo | ORÇAMENTO DIÁRIO "R$ 246" com 74% de preenchimento; PÚBLICO "18-45" com 45%; CRIATIVO CAMPEÃO "V.3" com 88%. Chip do orçamento conta de 180 a 340 |
| Timings internos | ver seção 6. O trilho de cada linha preenche de `delay+34` a `delay+118` |
| Quando usar | a fala descreve a máquina executando uma configuração |
| Quando NÃO usar | depoimento, ou qualquer peça em que o número não foi dito pela pessoa |
| Erro que já cometeu | "a tela da campanha ainda tá mal organizada, feia, simples demais": virou janela de sistema com pontinhos, ícone por linha, valor em mono e construção em degrau (`CampaignPanel.tsx:6`) |

### TelegramVoice e CoffeeVoice

| Campo | Valor |
|---|---|
| Arquivo | `components/icons/MarkWithVoice.tsx` |
| `CONTENT_H` | 348, o par maior (caneca 228 mais 22 de intervalo mais player 98) |
| O que mostra | o padrão símbolo em cima, áudio surgindo abaixo |
| Tamanhos | Telegram 200 com intervalo 30; caneca em escala 12 sobre a faixa y 3 a 22 do viewBox 24, com o vapor deslocado 2,6 unidades; player com 260 de largura |
| Timings internos | Telegram: player em 35, duração 48. Café: xícara 0, alça 14, vapores 26, 32 e 38; player em 24, duração 34 |
| Quando usar | "X enquanto Y", quando existe um protagonista e um apoio |
| Quando NÃO usar | quando as duas coisas têm o mesmo peso; aí escolha uma |
| Erro que já cometeu | é a exceção documentada da lei "nada se move enquanto outro elemento entra", nascida do pedido literal do o dono do canal: "no caso você tá tomando um café, aparece a caneca em tamanho legal e surge o áudio abaixo" (`MarkWithVoice.tsx:1`) |

### VoicePlayer (compartilhado)

| Campo | Valor |
|---|---|
| Arquivo | `components/icons/VoicePlayer.tsx` |
| O que mostra | botão de play com o glifo oficial e 13 barras de altura vinda da amplitude real |
| Tamanhos | viewBox 320 x 120, largura padrão 300 (aqui é usado com 260), círculo de raio 26 em x 42, barras a partir de x 92 com passo `216 / bars`, espessura 6 |
| Quando usar | sempre que precisar de player de voz. Ele existe porque o desenho estava copiado em três arquivos |
| Quando NÃO usar | dentro do chat: lá o player é outro, com playhead e duração (`TelegramChat.tsx:149`) |

### TrendChart

| Campo | Valor |
|---|---|
| Arquivo | `components/icons/TrendChart.tsx` |
| `CONTENT_H` | 320 |
| O que mostra | curva de tendência subindo, com três rótulos casados com a fala |
| Grade | svg 600 x 320; pontos em (30,236), (160,168), (280,190), (420,96) e (552,48); eixo em y 292; ponto com halo branco de raio 10 e núcleo preto de raio 6 |
| Curva | Catmull-Rom convertido em Bézier cúbica, passando por todos os pontos |
| Timings internos | eixo em 0, linha em 24, rótulos em 44, 104 e 164 com fade de 36 |
| Quando usar | a fala fala de dado, resultado, evolução |
| Quando NÃO usar | quando o número não existe; a curva aqui é conceito de tendência, não medição |
| Erro que já cometeu | "um gráfico todo perdido, sem proporção, sem alinhamento, sem conceito, linhas retas e quebradas e erros ortográficos". Virou curva suave, alinhamento por âncora e "ANÁLISE REAL" com acento (`TrendChart.tsx:5`) |

### CompareCalendar

| Campo | Valor |
|---|---|
| Arquivo | `components/icons/CompareCalendar.tsx` |
| `CONTENT_H` | 240 |
| O que mostra | duas fileiras de 7 dias: GESTOR HUMANO com 2 dias marcados, ZEUS com os 7 |
| Grade | célula 52, intervalo 14, raio 12, largura total `7 x 52 + 6 x 14` = 448; fileira 1 em y 44, fileira 2 em y 164; rótulo 16 px acima da fileira |
| Timings internos | fileira 1 no frame 0, fileira 2 no 80; cada célula entra em `delay + 12 + i x 6`, com 20 frames de opacidade |
| Quando usar | comparação de constância, antes e depois, humano contra automático |
| Quando NÃO usar | comparação de valor ou tamanho; isto compara FREQUÊNCIA |
| Erro que já cometeu | os rótulos tinham tipografia própria e traço fora da escala; passaram a consumir `ICON_LABEL` e `STROKE` |

---

## 8. Movimento e suavização

Bezier literal de cada curva usada, de `src/core/curves.ts`:

| Papel | Curva | Bezier | Onde aparece neste estilo | Regra do "quando" |
|---|---|---|---|---|
| Entrada de elemento | `settle` | `0.1, 0.45, 0.75, 1` | 10 das 13 cenas com elemento, durações de 38 a 66 f | padrão. Começa firme (46% do caminho no primeiro quarto) e ainda tem 20% do movimento depois de 60% do tempo: é aí que o olho VÊ desacelerar |
| Entrada de elemento grande | `settleSoft` | `0.12, 0.4, 0.8, 1` | `coffee-voice` (42 f) e `trend-chart` (90 f) | quando a chegada precisa respirar mais, cauda de 23% |
| Entrada com suspense | `dramatic` | `0.7, 0, 0.1, 1` | entrada de `compare-calendar` (68 f), exceção documentada em `choreography.ts:282` | segura e dispara. Única entrada que não é `settle` |
| Saída de marca | `dramatic` | `0.7, 0, 0.1, 1` | saídas de `meta-trafego` (30 f), `zeus-ia` (32 f), `telegram-abre` (24 f), `telegram-voice` (36 f), `meta-otimiza` (24 f) | saída que vai embora com energia |
| Saída seca | `impact` | `0.5, 0, 0.1, 1` | `telegram-chat`, `approve-check`, `campaign-panel`, `compare-calendar`, todas 40 f | cena de máquina ou de decisão freia seco |
| Saída calma | `premium` | `0.33, 0, 0.15, 1` | `ask-typing` (40 f), `checklist` (24 f), `coffee-voice` (24 f), `trend-chart` (40 f) | cena calma sai calma |
| Desenho de traço | curva da própria cena, injetada pelo `DrawStyleContext` | ver linha da entrada | todo componente com `ownsMotion` | a entrada dessas cenas É o desenho do traço, e ele obedece à curva declarada no spec (`MotionStage.tsx:106`) |
| Câmera (palco expandindo, cards encolhendo) | `smoothInOut` | `0.45, 0, 0.15, 1` | 68 frames a cada troca de modo de palco (`index.tsx:61`) | `easyEase` ainda lia como linear em deslocamento grande; foi reclamação real na v11 |
| Saída dos cards no fecho | `dramatic` | `0.7, 0, 0.1, 1` | 70 frames, 900 px para cima (`index.tsx:130`) | a leitura de câmera indo embora; o movimento antes era "linear grosseiro" no segundo 32 da v11 |
| Fade e apoios | `easyEase` | `0.33, 0, 0.67, 1` | eyebrow, `fadeInAt`, opacidade do fecho | default do sistema, suaviza as duas pontas |
| Assentar do selo | `settle` | `0.1, 0.45, 0.75, 1` | escala, desfoque e subida do fecho | ver seção 9 |

Fonte de todos os beziers: `core/curves.ts CURVES`. Fonte de cada duração: `choreography.ts`.

### Direções alternadas

`alternateDir(i)` roda o ciclo bottom, left, top, right, e cada cena usa o índice dela para a
entrada e o índice seguinte para a saída (`core/choreo.ts:128`, `choreography.ts:85`). Assim uma
cena nunca entra da mesma direção que a anterior nem que a de duas atrás, o que elimina por
construção o layout monótono.

Exceção documentada: a saída de `zeus-ia` deveria ser "top" pelo ciclo e foi trocada à mão para
"right" (`choreography.ts:101`). O motivo: a cena não tem `ownsMotion`, então o palco aplica o
deslocamento de verdade, com distância padrão de 1200 px. Entre o palco e a fileira de vídeo há
só uns 276 px, então uma saída para cima atravessa o rosto da Carol. Achado real em QA no
segundo 6,28.

### Números de tempo que valem para o estilo inteiro

| Constante | Valor | Fonte | Para que serve |
|---|---|---|---|
| `OVERLAP` | 10 frames | `choreography.ts:38` | a cena morre antes da próxima nascer. Durante o overlap duas cenas ficam montadas, uma saindo por baixo da outra |
| `ext(nominal)` | `dur = nominal + 10`, margem `min(40, max(24, round(nominal x 0,3)))` | `choreography.ts:45` | margem de saída proporcional ao tamanho do beat: piso 24 para o validador não acusar aperto, teto 40 para beat longo não começar a sair cedo demais |
| `DRAW_DUR_DEFAULT` | 72 frames (1,2 s) | `drawUtils.tsx DRAW_DUR_DEFAULT` | janela padrão de desenho de traço. Era 52 |
| `FADE_OUT_DUR` | 36 frames | `MotionStage.tsx FADE_OUT_DUR` | fallback do fade de saída de cena com `ownsMotion`, quando o spec não declara `exit.dur` |

### Acabamento do traço

`strokeLinecap` e `strokeLinejoin` são sempre "round", sem exceção (`drawUtils.tsx DrawPath`).
Antes eram "square" e "miter", ponta com quina e vértice em bico, e era a causa raiz do
"linhas quebradas, bruto, grosseiro". O gate `checkSquareStroke` do `choreo-lint.js:500`
reprova se voltarem.

---

## 9. Fecho

Componente `components/ZeusSealClose.tsx`, montado só quando a cena é `zeus-seal`
(`index.tsx:207`), com `startFrame` igual ao início da cena mais 16 frames.

| Item | Valor |
|---|---|
| Retângulo arredondado | 220 x 220, raio 52 (23,6% do lado, dentro da faixa oficial) |
| Espessura do anel | inset 11 (era 6 na v6) |
| Símbolo dentro | 116 px, 52,7% do lado |
| Giro do anel | uma volta completa a cada 3 segundos, feito pelo ângulo do `conic-gradient` e nunca por rotação do elemento (giraria o desfoque e o recorte junto), com desfoque de 1 px e opacidade 0,7 |
| Wordmark ZEUS | Inter 700, 40 px, letterSpacing `0.04em`, 26 px abaixo do retângulo |
| Assinatura | Inter 600, 17 px, letterSpacing `0.16em`, cor `gray600`, 8 px abaixo do wordmark |

Sequência, em frames locais ao fecho (0 = início da cena mais 16):

| Frames | O que acontece |
|---|---|
| 0 a 84 | o retângulo assenta: opacidade por spring `s100d14m09` e escala de 0,9 para 1 na curva `settle` |
| 72 a 126 | "ZEUS" surge (opacidade `easyEase`, desfoque de 10 px a 0 na `settle`) |
| 72 a 138 | "ZEUS" sobe 18 px |
| 118 a 174 | assinatura surge (opacidade e desfoque de 8 px) |
| 118 a 186 | assinatura sobe 14 px |

Saída dos cards de vídeo no fecho:

| Item | Valor | Fonte |
|---|---|---|
| Começa | 20 frames depois do início da cena do fecho | `index.tsx:130` |
| Direção e distância | para cima, 900 px | `index.tsx:130` |
| Duração | 70 frames (`CLOSE_EXIT_DUR`, era 52) | `index.tsx:101` |
| Curva | `dramatic` | `index.tsx:130` |
| Desmonte do vídeo | frame do fecho mais 20 mais 70 | `index.tsx VIDEO_UNMOUNT_F` |

Por que o desmonte existe: os arquivos de vídeo têm 34,36 s e a composição tem 34,53 s. Manter
o vídeo montado até o fim faz o Remotion pedir um frame que não existe no arquivo e o render
quebra com "No frame found at position" (`index.tsx:104`, ERRO #11 em `MEMORY.md`). O desmonte
precisa acontecer DEPOIS que a animação de saída termina, senão o card some por corte seco no
meio do movimento.

A eyebrow do topo também sai no fecho, para não duplicar o mesmo texto em dois lugares: some
entre os frames 20 e 76 depois do início da cena (`index.tsx:70`).

Pendência registrada no próprio arquivo: o o dono do canal disse que, depois de aprovar este fundo,
todo vídeo que falar do Zeus vai manter o mesmo final. Enquanto ele não confirmar, o fecho é
desta peça, não do squad (`ZeusSealClose.tsx:26`).

---

## 10. Áudio

Este estilo usa SÓ voz. Não tem música de fundo na v36.

Pipeline, na ordem (`index.tsx:7` e `docs/ZOOM-REEL-MOTION.md` seção 2):

1. `python squads/reels-zoom/scripts/reframe-zeus.py <zoom.mp4> --outdir tiles/`, o recorte de
   rosto já calibrado.
2. `ffmpeg` com loudnorm em 2 passes, mais highpass em 80 Hz e afftdn, gerando `audio-final.wav`.
3. `python scripts/transcribe-words.py <audio-final.wav> --out data/narration.json`.
4. `node scripts/extract-amplitude.js <Composition> 60` para gerar `data/amplitude.json`. Este
   passo é obrigatório aqui porque a peça tem waveform real em três lugares.

Mixagem final, comando único:

```
node scripts/video/mixar-audio.js squads/motion/output/01-zeus-trafego/ZeusTrafegoReels-vNN.mp4
```

O script encontra `public/<Composition>/audio-final.wav` sozinho pelo nome do arquivo de vídeo,
usa `apad` obrigatório e confere a duração no fim (`scripts/video/mixar-audio.js`).

Por que o `apad` não é opcional: nesta peça o vídeo é mais LONGO que a fala, porque o fecho é
imagem sem voz. Sem o `apad`, o `-shortest` corta o vídeo na última palavra e come o selo
inteiro. Foi o ERRO #329, que engoliu 3,9 segundos de um reel e passou despercebido porque o
arquivo abre, toca e parece certo. Hoje o script REPROVA e não grava nada se a duração final
divergir mais de 0,2 s da entrada.

Bitrate do áudio no script: 192k. O playbook da categoria recomenda 256k
(`docs/ZOOM-REEL-MOTION.md:44`); os dois números estão no código, divergentes.

---

## 11. Erros cometidos neste estilo

| Erro | Rodada / versão | O que o o dono do canal disse | Regra que nasceu | Onde o gate pega hoje |
|---|---|---|---|---|
| Ponta de traço quadrada e vértice em bico | 3ª reprovação | "linhas quebradas, bruto, grosseiro" | todo traço é `round` no cap e no join, sem exceção | `checkSquareStroke` em `choreo-lint.js:500` |
| Traço fino num ícone e grosso em outro com o mesmo token | 6ª rodada | "às vezes um traço fica fino, outro fica grosso, uma coisa mal feita, mal organizada" | espessura sempre por `strokePx(token, escalaDeExibicao)`, em pixel de tela | `checkStrokeScaleCompensation` em `choreo-lint.js:694`, check `traco-sem-compensacao` |
| Suavização curta demais, mesmo depois de aumentar as durações | 5ª e 7ª rodadas | "ainda tá muito rápida, o tempo da desaceleração de todos os elementos tem que ser maior" | "mais lento" se resolve na CURVA antes da duração: medir a bezier em 25, 50, 70 e 85% do tempo; cauda abaixo de 10% significa que a curva PARA, não desacelera | ERRO #8 em `MEMORY.md`; curvas `settle` e `settleSoft` em `core/curves.ts` |
| Camada dupla de motion, movimento sem sentido | 4ª rodada | "alguns movimentos estão sendo aleatórios, muito movimento, os elementos se movem sem sentido" | uma linha do tempo só: a marca vira CENA do storyboard, nunca camada por cima. Um protagonista por beat | ERRO #4 em `MEMORY.md`; `checkDoubleMotion` e `checkMonotonousLayout` no `choreo-lint.js` |
| Gráfico sem conceito | 3ª reprovação | "um gráfico todo perdido, sem proporção, sem alinhamento, sem conceito, linhas retas e quebradas e erros ortográficos" | curva de tendência de verdade (Catmull-Rom para Bézier), rótulo com âncora consistente, tipografia do token, acento correto | `TrendChart.tsx:5`; `checkMissingAccents` em `choreo-lint.js:463` |
| Painel de campanha mal organizado | 5ª rodada | "a tela da campanha ainda tá mal organizada, feia, simples demais, poderia melhorar o layout, deixar mais profissional" | janela de sistema com barra de título, ícone por linha, valor em mono, construção em degrau, rótulo e trilho em alturas diferentes | `CampaignPanel.tsx:6` |
| Áudio feio, sem anatomia | 8ª rodada | "os áudios ficaram bem feios, o gráfico ficou feio, falta layout, falta planejamento, falta conceito, a resposta teria que ser um áudio se movimentando com animação" | player de voz com anatomia real: 28 barras finas de amplitude REAL, playhead animado, botão play, duração. Nunca senoide decorativa | `TelegramChat.tsx:5`; lei 13 do playbook |
| Legenda atravessada pelo topo do celular | 6ª rodada, segundo 8 | "tem alguma coisa que deixa o squad cego, ele não vê o que tá fazendo, tem que entender porque deu essa cagada, mapear isso e criar um código pra jamais se repetir esses erros grosseiros" | área útil do palco vira TOKEN (`STAGE_SAFE`), todo componente declara `CONTENT_H`, e o cruzamento vira erro de build | `checkStageOverflow` em `choreo-lint.js:602`, check `palco-overflow`; F6 e F7 no `qa-approve` |
| Pulo dos cards no primeiro segundo | 8ª rodada | "no primeiro segundo os cards deram um pulo, isso jamais deve ser aceito, não tinha em nenhuma das versões anteriores" | todo lookup de cena por tempo precisa de 3 ramos: antes da primeira, dentro de alguma, depois da última. Nunca fallback genérico para o extremo errado | `tokens.ts sceneAtFrame` e `sceneIndexAt`; `checkGapBeforeFirstScene` em `choreo-lint.js:742` |
| Selo saindo em cima do rosto | 5ª rodada, achado em QA no segundo 6,28 | achado interno, sem citação | elemento grande sem `ownsMotion` nunca sai para cima nem para baixo perto da dead zone; só esquerda ou direita, a menos que a distância seja reduzida de propósito | ERRO #6 em `MEMORY.md`; `choreography.ts:101` |
| Legenda sem blur, palavra futura invisível em fundo branco | 3ª reprovação | "na legenda era pra ter um blur rápido e surgir palavra por palavra, tem problemas lá no código central do SQUAD, e eu já mandei consertar e não foi consertado" | a palavra ocupa o layout desde o início do bloco com opacidade zero e acende com desfoque no timestamp da fala | ERRO #1 em `MEMORY.md`; `modules/text-system/Captions.tsx` |

---

## 12. Heurísticas de decisão

Antes de qualquer coreografia, leia o transcript inteiro e responda: qual é O elemento visual
desta fala, e só um? (lei 1 do playbook). Depois use a árvore:

| O trecho de fala é | Vira | Exemplo real |
|---|---|---|
| Uma marca real citada | o vetor oficial da biblioteca `src/modules/brand-logos/`, sozinho, nascendo no frame da palavra e segurando o beat inteiro | Meta em "tráfego", Telegram em "Telegram" |
| A mesma marca citada de novo com outro sentido | o MESMO componente, sem inventar variação | `meta-trafego` e `meta-otimiza` usam `MetaBeat` |
| Um objeto concreto | o glifo oficial da biblioteca elegante da Exemplo (`src/modules/exemplo-icons/`), ou um traçado novo no mesmo estilo de linha. Nunca forma geométrica genérica | café vira a xícara |
| Uma ação de sistema (configurar, executar, processar) | um mockup de janela com construção em degrau | `CampaignPanel` |
| Uma conversa (pergunta e resposta) | uma tela de chat única, com as mensagens empilhando sem trocar de cena | `TelegramChat` |
| Um pedido ou pergunta SUA | balão de digitando, não player de voz | `TypingBubble` |
| Uma enumeração ("isso, isso, isso") | lista de cards com stagger | `Checklist` |
| Uma aprovação | um símbolo grande sozinho | `ApproveCheck` |
| Um dado, resultado ou evolução | curva de tendência com rótulos casados palavra a palavra | `TrendChart` |
| Uma comparação de frequência ou constância | duas fileiras iguais com preenchimento diferente | `CompareCalendar` |
| Um par "X enquanto Y" | protagonista entra, assenta, e SÓ DEPOIS o apoio surge por baixo | `MarkWithVoice` |
| Uma ideia abstrata sem substantivo concreto | nada. Rosto mais legenda, e a cena fica com `elements: []` | o fecho |

Quando expandir o palco (de 360 para 620 px):

| Regra | Detalhe |
|---|---|
| Só quando o conteúdo passa de 360 px de altura | 3 das 14 cenas expandem: `telegram-chat` (464), `campaign-panel` (360) e `compare-calendar` (240), em `tokens.ts SCENES` |
| Teto absoluto | 470 px de conteúdo (`STAGE_SAFE.expanded`), senão colide com a legenda |
| Custo | expandir move os cards de vídeo (encolhem 17% e sobem 70 px) e move a legenda junto. É movimento de câmera, cobra atenção. Não expanda por conforto |
| Observação | `campaign-panel` e `compare-calendar` cabem no palco normal pela altura, mas expandem porque o conteúdo é largo e precisa do ar. É decisão de composição, não de altura |

Densidade de beats: 14 beats em 34,52 s, ou seja um beat a cada 2,5 s em média. O mais curto
tem 65 frames (1,08 s) e o mais longo, sem contar o fecho, tem 256 frames (4,27 s). Beat abaixo
de 1 s não existe nesta peça: se a palavra âncora está colada na próxima, o beat anterior
segura e a ideia não ganha cena.

---

## 13. Deltas deste estilo no protocolo

O protocolo de 12 passos vive em `docs/ZOOM-REEL-MOTION.md` seção 2. O pedido chamou os passos
de P0 a P11; no documento eles estão numerados de 1 a 12. Só o que MUDA neste estilo:

| Passo | Delta |
|---|---|
| 2, mixagem do áudio | não leva `adelay`, porque não existe cartão de abertura (`HOOK_FRAMES = 0`) |
| 4, `extract-amplitude.js` | OBRIGATÓRIO neste estilo, não opcional: três elementos consomem amplitude real (os dois balões do chat e o `VoicePlayer` dos beats de Telegram e café) |
| 5, montar SCENES | 60 fps: frame da âncora é `segundo x 60`, nunca `x 30`. Toda constante de frame no código está em base 60 |
| 5, primeira cena | a primeira âncora NÃO é o frame 0 (é o 56), então o lookup de cena precisa do ramo explícito para o intervalo órfão |
| 6, choreography | entradas em `settle` ou `settleSoft`; `dramatic` só na entrada de `compare-calendar`, e isso está escrito no comentário da cena |
| 6, choreography | cena sem `ownsMotion` não sai para cima nem para baixo: o palco empurra 1200 px e atravessa a fileira de vídeo |
| 8, render de rascunho | conferir os frames 0 a 56 antes de qualquer outra coisa: é o intervalo que já produziu o pulo dos cards |
| 12, mixagem | usar `scripts/video/mixar-audio.js`, nunca digitar o ffmpeg à mão. Sem música de fundo neste estilo |

---

## 14. Checklist final de replicação

Cada item abaixo é verificável por comando ou por frame. Nenhum depende de gosto.

| # | Item | Como verificar |
|---|---|---|
| 1 | Tipos limpos | `npx tsc --noEmit` na pasta do squad, zero erros |
| 2 | Coreografia válida | `node scripts/choreo-lint.js <Composition>`, zero reprovações |
| 3 | Pré-render | `node scripts/pre-render-validate.js <Composition>` |
| 4 | Todo componente de cena declara `CONTENT_H` | o check `palco-overflow` do lint reprova quem não declarar |
| 5 | Nenhum `CONTENT_H` acima de 470 em cena expandida, nem acima de 360 em cena normal | mesmo check |
| 6 | Nenhum `strokeLinecap="square"` nem `strokeLinejoin="miter"` | check `checkSquareStroke` do lint |
| 7 | Nenhuma espessura de token cru em SVG com escala diferente de 1 | check `traco-sem-compensacao` |
| 8 | Cada `from` de cena bate com `round(start x 60)` de `tokens.ts SCENES` | comparar `choreography.ts:52` com `tokens.ts SCENES` linha a linha |
| 9 | O lookup de cena tem o ramo `t < SCENES[0].start` | `tokens.ts sceneAtFrame` e `sceneIndexAt`; check `lacuna-antes-da-primeira-cena` |
| 10 | Cards não pulam no primeiro segundo | abrir os frames 0, 28 e 56 do render e comparar a escala do card: tem que ser 1 nos três |
| 11 | Legenda não cruza elemento | abrir o frame 500 (meio da cena do chat) e conferir a faixa y 1076 a 1140 |
| 12 | Selo não atravessa o rosto | a saída de `zeus-ia` roda do frame 241 ao 273 (início 155 mais `exitF` 86, até 155 mais `dur` 118). Abrir os frames 250 e 265 e conferir se nada borrado cruza os cards de vídeo |
| 13 | Fecho inteiro presente | abrir o último frame (2071) e conferir símbolo, ZEUS e IA PARA MENTORES visíveis |
| 14 | Áudio com a duração certa | `node scripts/video/mixar-audio.js <video.mp4>` imprime "OK" com diferença abaixo de 0,2 s; se reprovar, não gravou nada |
| 15 | Nota visual | `node scripts/qa-frames.js` e `node scripts/qa-approve.js --scores F1..F7`, nota 8 ou mais em CADA um dos sete |
| 16 | Duração final | `ffprobe` no mp4 tem que dar 34,52 s |

---

## 15. Instâncias

| Composition | Versão | Data | Status |
|---|---|---|---|
| `ZeusTrafegoReels` | v36 | 27/08/2026 | aprovada, é a régua deste estilo |
| `ZeusTrafegoReels` | v01 a v35 | 19/08 a 27/08/2026 | histórico das 9 rodadas, em `output/01-zeus-trafego/` |
| `BernardoDepoimentoReels` | primeira replicação real do playbook | 02/09/2026 | variante Depoimento, NÃO é este estilo (`docs/ZOOM-REEL-MOTION.md` seção 5b) |

---

## Divergências encontradas no código (para corrigir, não para copiar)

Achadas ao escrever este livro. São contradições reais entre comentário e conta:

| Onde | O que o código diz | O que a conta dá |
|---|---|---|
| `CompareCalendar.tsx:9` | "a fileira ZEUS termina de preencher no frame 140, antes do `exitF=152`" | `ext(168)` dá `exitF = 138`, e a última célula da fileira ZEUS só termina no frame 148. Ou seja, a saída começa ANTES do preenchimento acabar |
| `CampaignPanel.tsx` | eventos internos em 168, 176 a 254, 188, 216 e 258 | a cena tem `dur = 193` e `exitF = 153`. Tudo depois de 193 nunca acontece: o contador de orçamento não chega em 340 e o selo de confirmação (`BADGE_DONE = 258`) nunca fecha |
| `TelegramChat.tsx:226` | playhead da resposta varre até o frame 238 | a cena tem `dur = 228`; os últimos 10 frames ficam fora |
| `index.tsx:4` e `index.tsx:58` | comentários dizem "30fps" e "48f @60fps" | a composição roda a 60 fps (`tokens.ts FPS`) e a transição de palco é de 68 frames (`index.tsx:61`). Comentários velhos |
| `scripts/video/mixar-audio.js` | áudio em 192k | o playbook manda 256k (`docs/ZOOM-REEL-MOTION.md:44`) |
