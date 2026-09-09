# Estilo Apple Conceitual: livro de replicação

## 0. Cabeçalho

| Campo | Valor | Fonte |
|---|---|---|
| Nome do estilo | Apple Conceitual (fundo branco, objeto 3D, tipografia integrada) | `memory/zeus-reels-2-padrao-visual.md` linha 1 |
| Composition de referência | `HamiltonZeusReels` | `src/compositions/HamiltonZeusReels/index.tsx` |
| Vídeo aprovado | `output/03-isca-hamilton/HamiltonZeusReels-v18.mp4` | `output/03-isca-hamilton/LEIA-ME.md` |
| Duração | 63,00s, 3780 frames | `tokens.ts VIDEO_FRAMES` e `tokens.ts TOTAL_FRAMES` |
| Formato | 1080x1920, 60 fps | `tokens.ts LAYOUT.canvasW`, `LAYOUT.canvasH`, `tokens.ts FPS` |
| Origem do material | Call "Mentoria VIP, Hamilton Mendonça e um mentor de referencia", 03/09/2026, monólogo do o dono do canal sobre isca de baleia contra isca de sardinha | `tokens.ts` cabeçalho, linhas 9 a 12 |
| Rodadas até a aprovação | 18 versões, 8 delas na semana de 03 e 04/09/2026 | `output/03-isca-hamilton/` (v01 a v18) |
| Lei visual do estilo | `memory/zeus-reels-2-padrao-visual.md` | ela mesma |
| Base comum da categoria | `docs/ZOOM-REEL-MOTION.md`, seção 2 (protocolo de replicação) e 2b (números herdados) | não repetida aqui |

Este documento passa a ocupar o papel do `ZEUS-REELS-2-PROTOCOLO.md` citado na linha 3 do
`memory/zeus-reels-2-padrao-visual.md`, arquivo que nunca chegou a existir. A memória continua
sendo a LEI de estilo (o que pode e o que não pode); este livro é o COMO, com número e fonte.

Quem lê isto: o Zeus do futuro, que vai replicar o estilo em outra call, e o o dono do canal, que não é
programador. Toda explicação vem em linguagem simples, com o número ao lado como prova.

---

## 1. O que é e quando escolher

O Apple Conceitual é o estilo institucional do Zeus: fundo branco puro, a pessoa aparecendo em
dois cartões de vídeo no topo, a fala virando legenda no meio da tela, e embaixo um palco onde
entra UM elemento por ideia. Esse elemento é quase sempre um objeto 3D branco (a baleia, o
anzol, a carteira), uma palavra grande, ou um número dentro de um cartão de vidro.

A sensação que ele passa é de autoridade calma: nada pisca, nada quica, tudo desacelera antes de
parar. O arquétipo declarado é AUTORIDADE e SÁBIO, com movimento estável e simétrico
(`memory/zeus-reels-2-padrao-visual.md` seção Movimento).

**Escolha este estilo quando:**

| Situação | Por quê |
|---|---|
| Corte de call ou Zoom em que o Zeus, ou o o dono do canal, explica um conceito | O estilo nasceu exatamente disso (`tokens.ts` cabeçalho) |
| A peça é institucional, sem venda direta na tela | O único ponto de cor é o anel do fecho (`BRAND.ts BRAND_SPECTRUM_STOPS`) |
| A fala cita objetos concretos que podem virar imagem | O padrão manda o objeto PARECER o objeto (`ZOOM-REEL-MOTION.md` lei 3b) |
| O assunto tem número forte (100 mil, 15%, 20%) | O número protagonista é um dos cinco dispositivos aprovados |

**Não escolha quando:** a peça é depoimento com frase solta na tela (isso é a variante
`BernardoDepoimentoReels`, ver `memory/zeus-reels-2-padrao-visual.md` seção "O que NÃO fazer"),
ou quando a marca do cliente pede cor forte. Aqui a peça inteira é preta, cinza e branca.

---

## 2. Base herdada e desvios

A parte mecânica (recorte de rosto, normalização de voz, transcrição por palavra, ordem dos
gates, comando de render) está no protocolo de replicação, `docs/ZOOM-REEL-MOTION.md` seção 2.
Os números que os três estilos herdam (canvas, cards de vídeo, eyebrow, base do palco,
sobreposição entre cenas, margem de saída, rubrica, travas) estão na seção 2b do mesmo
documento. Nenhum dos dois está repetido aqui de propósito: abaixo ficam só os DESVIOS.

O que este estilo MUDA em relação à base:

| Ponto da base | O que o Apple Conceitual faz diferente | Fonte |
|---|---|---|
| Traço preto que se desenha era o protagonista | O traço vira anotação (régua, corte, marca embaixo da palavra). O protagonista é um objeto 3D | `memory/zeus-reels-2-padrao-visual.md` seção "O que muda" |
| Legenda em modo `medido` (corte seco) | Modo `medido-suave`: mesma blocagem curta, mas com entrada animada palavra a palavra | `Captions.tsx:9` a `:12` |
| Palco como caixa de base fixa em 1632 com conteúdo centralizado | Três canais fixos e âncora dupla, conteúdo colado no topo | `tokens.ts:115` a `:129`, `MotionStage.tsx:56` a `:70` |
| Ênfase de legenda por cor | Ênfase por troca de fonte (Playfair itálico), nunca por cor | `index.tsx:190` a `:198` |
| Saída de vídeo no fecho com 70 frames | 39 frames, porque a filmagem real acaba junto com a fala | `index.tsx:106 CLOSE_EXIT_DUR` |
| Mixagem só de voz e música ambiente | Voz, trilha com abaixamento automático, e efeito sonoro casado com o selo | seção 10 deste livro |

---

## 3. Identidade

Tudo que é identidade vive em um arquivo só, `BRAND.ts`. Trocar de marca é trocar esse arquivo,
sem tocar em layout, tempo ou comportamento (`BRAND.ts` cabeçalho, linhas 1 a 31).

### Cores

| Token | Valor | Onde aparece |
|---|---|---|
| `black` | `#1d1d1f` | toda tipografia principal e traço (`BRAND.ts BRAND_COLORS`) |
| `gray600` | `#6e6e73` | rótulos, linha de apoio do lettering, eyebrow (`BRAND.ts`) |
| `gray400` | `#a1a1a6` | detalhe fino dentro do feed do celular (`PhoneFeed3D.tsx`) |
| `gray200` | `#d2d2d7` | réguas e eixos (`WhaleSardine3D.tsx`, `MoneyGrowth.tsx`) |
| `pureWhite` | `#ffffff` | fundo da peça inteira (`index.tsx:237`) |
| espectro | 8 paradas, de `{{marca.traco}} 0%` a `{{marca.traco}} 100%` | anel do fecho e marca embaixo da palavra (`BRAND.ts BRAND_SPECTRUM_STOPS`) |

Regra dura: cor viva só existe em dois lugares, o anel do selo e o traço embaixo da palavra
destacada. Qualquer outra cor é defeito (foi o que reprovou a v08, `ERRO #332`).

### Fontes

| Papel | Fonte e peso | Fonte do número |
|---|---|---|
| Corpo, headline, legenda | Inter, pesos 400, 600, 700, 800, 900 | `index.tsx:42` a `:45` |
| Dado dentro de painel | JetBrains Mono, 500 e 700 | `index.tsx:46`, `BRAND.ts BRAND_MONO` |
| Palavra enfatizada na legenda | Playfair Display itálico 500 | `index.tsx:49`, `index.tsx:198` |
| Tracking apertado | `-0.022em` normal, `-0.032em` nas palavras grandes | `BRAND.ts BRAND_FONT` |

### Textos fixos de marca

| Texto | Valor | Onde |
|---|---|---|
| Eyebrow do topo | `ZEUS · IA DE TRÁFEGO` | `BRAND.ts BRAND_TEXT.eyebrow`, desenhado em `index.tsx:65` a `:94` |
| Wordmark do fecho | `ZEUS` | `BRAND.ts BRAND_TEXT.sealWordmark` |
| Assinatura do fecho | `IA PARA MENTORES` | `BRAND.ts BRAND_TEXT.sealTagline` |
| Símbolo | `ZeusTrafegoReels/img/zeus-zspark-v1.png` | `BRAND.ts BRAND_LOGO_SRC` |

### Espessura de traço

`STROKE.regular` 3 e `STROKE.hairline` 2 (`tokens.ts:47` a `:50`). Espessura é medida em unidades
do desenho, não em pixel de tela: quando o desenho é exibido em escala diferente de 1, usar
`strokePx(token, escala)` (`drawUtils.tsx:53`). Ponta e vértice sempre arredondados
(`drawUtils.tsx:101` e `:102`); quina viva foi a causa do "linhas quebradas, bruto, grosseiro"
apontado em 27/08/2026 (`drawUtils.tsx:3` a `:9`).

---

## 4. Grade da tela: os três canais fixos e a âncora dupla

Esta é a invenção deste estilo, e é o que o separa de tudo que veio antes no squad.

### A ideia em uma frase

A tela tem três faixas horizontais que nunca mudam de altura durante o vídeo: em cima o VÍDEO,
no meio a FALA, embaixo o PALCO. Nada nunca invade a faixa do vizinho, então nada nunca colide.

### Canal 1: vídeo

As medidas dos cartões e as duas bases (996 no normal, 787 no expandido) são herdadas da base
comum, `docs/ZOOM-REEL-MOTION.md` seção 2b, e não se repetem aqui. O que interessa a este estilo
é que essas duas bases viraram FUNÇÃO, `tokens.ts videoBottomAt(e)`, com `e` indo de 0 a 1: é
dela que saem, por cascata, o canal da fala e as duas âncoras do palco. Antes disso o número era
digitado solto em cada lugar.

| Medida deste estilo | Valor | Fonte |
|---|---|---|
| Altura natural do bloco de vídeo | 816 (400 x 2 + 16) | `tokens.ts VIDEO_BLOCK_H` |
| Base do bloco em função do estado | `videoBottomAt(0)` = 996, `videoBottomAt(1)` = 787 | `tokens.ts:88` a `:91` |
| Transição entre os dois estados | 68 frames, curva `smoothInOut` | `index.tsx:62` |
| Quem manda no estado | campo `stage` de cada cena, `normal` ou `expanded` | `tokens.ts SceneDef`, `tokens.ts SCENES` |

Em linguagem simples: quando a cena precisa de mais espaço embaixo, o bloco de vídeo encolhe um
pouco e sobe 70 pixels, liberando 209 pixels de altura (996 menos 787). E como tudo abaixo dele é
calculado a partir dessa base, a fala e o palco sobem junto, na mesma curva, sem ninguém precisar
recalcular nada na mão.

### Canal 2: fala

| Medida | Valor | Fonte |
|---|---|---|
| Centro do canal | 1106 (0,576 da altura) | `tokens.ts CAPTION_CENTER_Y`, `index.tsx:209` |
| Altura reservada | 134 | `tokens.ts CAPTION_BAND_H` |
| Topo, estado normal | 1039 | `tokens.ts captionTopAt(0)` |
| Base, estado normal | 1173 | `tokens.ts captionBottomAt(0)` |
| Topo, estado expandido | 969 | `tokens.ts captionTopAt(1)` |
| Base, estado expandido | 1103 | `tokens.ts captionBottomAt(1)` |

**Por que 134 e não 70.** A faixa da fala não é dimensionada pela linha comum, e sim pelo PIOR
caso: o bloco de uma palavra enfatizada usa corpo 2,1 vezes maior, ou seja `round(66 x 2,1) = 139`,
e com entrelinha 0,96 isso ocupa 133,4 px, arredondado para 134
(`tokens.ts:96` a `:103`, com `Captions.tsx MED_ENFASE` = 2.1 e `Captions.tsx:343` lineHeight 0.96).
Se a faixa fosse dimensionada pela linha normal de 70 px, a palavra "mentoria" cresceria para
fora da faixa e cruzaria o palco. Reservar o pior caso custa 64 px de espaço e compra a garantia
de que legenda e elemento NUNCA se encostam.

**Por que 0,576 e não 0,696.** A régua medida do estilo de legenda manda o centro em 0,696 da
altura, ou seja y=1336. Só que essa medição veio de vídeo com a tela toda livre. Aqui existe
palco embaixo, e 1336 cairia dentro dele. Foi mantida a posição já aprovada do formato: base da
legenda em 1140, centro em 1106 (`index.tsx:203` a `:209`). A lição vale como método: extrai-se o
PRINCÍPIO de uma referência (bloco único, alto, com folga em volta), nunca a medida crua.

### Canal 3: palco, e a âncora dupla

O respiro entre um canal e o outro é `STAGE_GAP` = 44, que é metade da margem lateral do grid
(`tokens.ts:111` a `:113`, com `core/layout.ts SAFE.marginX` = 88). A regra por trás: margem
externa sempre maior que a goteira interna.

O palco tem DUAS âncoras possíveis, e cada cena escolhe a sua:

| Âncora | Fórmula | Valor normal | Valor expandido | Quando |
|---|---|---|---|---|
| `stageTopWithCaption` | base da fala + 44 | 1217 | 1147 | cena com legenda ligada |
| `stageTopMuted` | topo do canal da fala | 1039 | 969 | cena que cala a legenda |

Fonte: `tokens.ts:128` e `:129`, montadas em `index.tsx:221` a `:230`.

Em linguagem simples: quando a legenda está ligada, o palco fica ABAIXO dela. Quando a cena cala
a legenda (porque a própria cena já é uma frase grande, ou um número grande), o conteúdo sobe e
OCUPA o lugar da legenda, porque aquele lugar está vago. Nunca existem dois textos disputando o
mesmo espaço, e nunca sobra branco onde a legenda estaria.

O orçamento de altura do palco é o que sobra até a zona morta da base, que começa em 1632
(`core/layout.ts SAFE.bottomDeadStart`):

| Estado | Orçamento | Conta |
|---|---|---|
| normal | 415 | 1632 - 1217 |
| expandido | 485 | 1632 - 1147 |

Fonte: `tokens.ts STAGE_SAFE`. O `choreo-lint` compara esse orçamento com o `CONTENT_H` declarado
por cada componente.

### As duas regras que mataram os 475 px de espaço morto

1. **O conteúdo ancora no TOPO, não no centro.** `alignItems: "flex-start"`
   (`MotionStage.tsx:88`). Centralizar um conteúdo de 260 px dentro de uma caixa de 620 px deixa
   180 px de sobra em cima e mais 180 embaixo (`MotionStage.tsx:64` a `:67`).
2. **`CONTENT_H` é a tinta REAL, nunca uma caixa inflada.** Cada componente declara a altura do
   que ele de fato desenha. Dois exemplos medidos: o `WhaleSardine3D` declarava 420 e passou para
   146, porque 176 px daquilo era respiro interno virando espaço morto
   (`WhaleSardine3D.tsx:32` a `:34`); o `HighTicketWord` declarava 260 e passou para 120
   (`HighTicketWord.tsx:26` a `:28`).

Foi a soma dos dois defeitos que gerou até 475 px de branco entre o vídeo e a frase, o "espaço
morto acima" que o o dono do canal reprovou na v11 (`tokens.ts:124` a `:126`).

Detalhe técnico obrigatório: cada cena monta a SUA caixa, com `overflow: visible`, porque sombra
de objeto 3D e traço da marca desenham para fora da caixa declarada (`MotionStage.tsx:71` a
`:73`, `MotionStage.tsx:85`). Caixa por cena também impede que a cena saindo escorregue quando a
seguinte tem outro estado de legenda: o que acontece é cruzamento por transparência, nunca
deslocamento (`MotionStage.tsx:57` a `:62`).

---

## 5. Legenda

### Propriedades literais

| Prop | Valor | Fonte |
|---|---|---|
| `mode` | `medido-suave` | `index.tsx:187` |
| `color` | `COLORS.black` | `index.tsx:188` |
| `fontFamily` | Inter | `index.tsx:189` |
| `fontSize` | 66 | `index.tsx:190` |
| `fontWeight` | 700 | `index.tsx:191` |
| `emphasis` | `["mentoria"]`, uma única palavra no clipe inteiro | `index.tsx:197` |
| `emphasisFontFamily` | `'Playfair Display', Georgia, serif` | `index.tsx:198` |
| `mute` | derivado do campo `caption` de cada cena | `index.tsx:173` a `:175`, `index.tsx:202` |
| `centerY` | 0,576 | `index.tsx:209` |

Valores que o componente aplica por padrão e que este estilo aceita: `entryFrames` 13,
`entryBlurPx` 10, `entryRisePx` 16 (`Captions.tsx:217` a `:219`), atraso entre palavras
`STAGGER` = 3 frames (`Captions.tsx:310`), largura máxima do bloco 48% da tela
(`Captions.tsx MED_MAXW`), no máximo 3 palavras por bloco (`Captions.tsx MED_MAXPAL`).

### Blocagem

O bloco fecha quando acontece qualquer uma destas coisas: a palavra é de ênfase (e aí ela fica
sozinha), tem pontuação de fim de frase, a pausa até a próxima palavra passa de 0,34s
(`MED_PAUSA`), chega a 3 palavras, ou a duração alvo de 0,33s é atingida (`MED_ALVO`)
(`Captions.tsx:144` a `:176`). Bloco de uma palavra fraca sozinha (conjunção, artigo) é grudado
no vizinho, porque conjunção sozinha na tela lê como erro de corte
(`Captions.tsx:179` a `:196`, lista em `Captions.tsx MED_FRACAS`).

### Entrada palavra a palavra

Cada palavra do bloco entra com opacidade, subida e desfoque, e a palavra seguinte começa 3
frames depois (`Captions.tsx:311` a `:322`):

| Propriedade | De, até | Janela | Curva |
|---|---|---|---|
| opacidade | 0 para 1 | 13 frames | `easyEase` |
| subida | 16 px para 0 | 13 frames | `settleSoft` |
| desfoque | 10 px para 0 | 10,4 frames (13 x 0,8) | `easyEase` |

**Por que voltou assim.** A primeira versão da legenda tinha desfoque e um movimento curto que o
o dono do canal aprovou. Ao encurtar a janela para 7 frames em bloco único, o texto passou a
simplesmente aparecer, sem movimento perceptível, e ele reclamou ("tu tirou isso nas próximas
versões", `memory/zeus-reels-2-padrao-visual.md` linha 102). Janela maior mais o atraso por
palavra devolvem o gesto sem atrasar a leitura, porque cada palavra ainda entra em menos de um
quarto de segundo (`Captions.tsx:299` a `:309`). Legenda que aparece pronta é output defeituoso.

### Ênfase troca de fonte, nunca de cor

A palavra enfatizada ganha bloco só para ela, corpo 2,1 vezes maior, fonte Playfair itálica peso
500 (`Captions.tsx:283` a `:291`). O motivo é duplo: na referência medida, 94% das linhas ficam na
cor base, e pintar a palavra-chave mata o dispositivo; e a identidade Zeus não tem cor solta, só o
anel do fecho (`Captions.tsx:285` a `:288`, `index.tsx:190` a `:196`). Foi exatamente a "letra
azul do nada" que reprovou a v08 (`ERRO #332`).

### Vírgula é removida

O texto exibido perde as vírgulas: `w.text.replace(/,/g, "")` (`Captions.tsx:353`). A fala
continua a mesma, só a leitura na tela fica limpa. Pontuação no meio da tela atrapalha a leitura
em bloco curto (`memory/zeus-reels-2-padrao-visual.md` linha 122).

### Quando a legenda cala

A mudez é declarada por cena, no campo `caption` (`tokens.ts CaptionMode` e `SceneDef`), e nunca
deduzida do nome. O motivo é duro: a POSIÇÃO do palco também depende da mudez, e duas leituras
separadas poderiam divergir e pôr frase e legenda no mesmo lugar (`index.tsx:162` a `:171`,
`tokens.ts:145` a `:149`).

| Situação | Legenda | Por quê |
|---|---|---|
| Frase grande na tela (lettering) | CALA | A frase é a legenda ali. Dois textos brigam |
| Número protagonista (100 mil, 15%) | CALA | O número é o assunto e ocupa o centro |
| Palavra única com marca (HIGH TICKET) | CALA | Mesma razão da frase grande |
| Objeto 3D no palco | LIGADA | O objeto não é texto, os canais fixos já impedem colisão. E o objeto não leva rótulo, porque a legenda já narra |
| Cena de fecho (selo) | Não existe legenda, a camada inteira desmonta | `index.tsx:181` |

Fontes: `tokens.ts SCENES` (campo `caption` cena a cena) e
`memory/zeus-reels-2-padrao-visual.md` linhas 89 a 93.

---

## 6. Storyboard de referência

### As 14 cenas

Frame de início = `start` x 60. Nominal = frame da próxima âncora menos o frame desta.
Entrada e saída vêm de `choreography.ts`; `dur` e `exitF` são calculados pela função `ext()`
(`choreography.ts:13` a `:18`): `dur` = nominal + 10 de sobreposição, e a margem de saída é
`min(40, max(24, round(nominal x 0,3)))`.

| # | Cena | Âncora na fala | Segundo | Frame | Componente | Legenda | Palco | Nominal | dur | exitF | Entrada | Saída |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `lettering-hook` | início | 0 | 0 | `LetteringHook` | muted | expandido | 97 | 107 | 78 | `settleSoft` 44 | `premium` 26 |
| 2 | `people-row` | "que" | 1,617 | 97 | `PeopleRow3D` | on | normal | 69 | 79 | 55 | `settleSoft` 50 | `premium` 30 |
| 3 | `hook-miss` | "erra" | 2,76 | 166 | `HookMiss3D` | on | normal | 61 | 71 | 47 | `settleSoft` 44 | `premium` 30 |
| 4 | `concept-reveal` | "isca," | 3,78 | 227 | `WhaleSardine3D` | on | expandido | 329 | 339 | 299 | `settleSoft` 70 | `premium` 40 |
| 5 | `explain-internet` | "internet" | 9,26 | 556 | `PhoneFeed3D` | on | normal | 282 | 292 | 252 | `settleSoft` 60 | `premium` 36 |
| 6 | `quote-highticket` | "vender" | 13,96 | 838 | `HighTicketWord` | muted | expandido | 321 | 331 | 291 | `settleSoft` 60 | `premium` 40 |
| 7 | `lettering-exemplo` | "aqui" | 19,317 | 1159 | `LetteringExemplo` | muted | expandido | 184 | 194 | 154 | `settleSoft` 52 | `premium` 34 |
| 8 | `quote-sardinha` | "se" | 22,38 | 1343 | `WalletSplit3D` | on | expandido | 308 | 318 | 278 | `settleSoft` 60 | `premium` 40 |
| 9 | `money-growth` | "vai" | 27,52 | 1651 | `MoneyGrowth` | on | normal | 534 | 544 | 504 | `settleSoft` 90 | `premium` 40 |
| 10 | `quote-baleia` | "se" | 36,42 | 2185 | `HundredK` | muted | expandido | 520 | 530 | 490 | `settleSoft` 60 | `premium` 40 |
| 11 | `baleia-numbers` | "15" | 45,083 | 2705 | `ReturnTable` | muted | expandido | 301 | 311 | 271 | `settle` 66 | `impact` 40 |
| 12 | `lettering-renda` | "você" | 50,1 | 3006 | `LetteringRenda` | muted | expandido | 259 | 269 | 229 | `settleSoft` 52 | `premium` 34 |
| 13 | `recap-baitscale` | "então" | 54,42 | 3265 | `WhaleSardine3D` | on | expandido | 281 | 291 | 251 | `dramatic` 68 | `impact` 40 |
| 14 | `zeus-seal` | fim da fala | 59,1 | 3546 | selo (sem elemento de palco) | muted | normal | 234 | 234 | nenhum | ver seção 9 | fim |

Fontes: `tokens.ts SCENES` (âncora, segundo, palco, legenda), `choreography.ts` linhas 20 a 34
(nominais) e blocos por cena (entrada e saída), `MotionStage.tsx SCENE_COMPONENTS` (componente).
`dur` e `exitF` são derivados da função `ext()` de `choreography.ts`.

### Por que cada cena existe

| Cena | Motivo declarado |
|---|---|
| `lettering-hook` | Abre sem cartão de abertura, direto na fala (`tokens.ts HOOK_FRAMES` = 0). A frase inteira "A MAIOR PARTE DAS PESSOAS" precisa terminar antes do corte |
| `people-row` | "as pessoas" vira gente: três manequins, um asset repetido com propósito |
| `hook-miss` | "erra na isca": o anzol e o corte por cima. Objeto concreto citado tem que parecer aquele objeto |
| `concept-reveal` | Os dois animais, sem rótulo. O tamanho da baleia contra a sardinha JÁ é o argumento de ticket alto contra ticket baixo |
| `explain-internet` | "se comunicar na internet": o celular com feed rolando |
| `quote-highticket` | A palavra HIGH TICKET sozinha, com a marca do espectro embaixo |
| `lettering-exemplo` | Onde não há objeto, a frase vira a composição. Tela nunca fica vazia |
| `quote-sardinha` | "carteira de investimentos": a carteira entra pela lateral, um gesto só |
| `money-growth` | A curva quase plana que sobe no fim, com dois rótulos casados com a fala |
| `quote-baleia` | O número 100 mil como protagonista, dentro do cartão de vidro |
| `baleia-numbers` | O percentual de retorno, 15 virando 20 no mesmo lugar |
| `lettering-renda` | Trecho abstrato: a frase vira a composição de novo |
| `recap-baitscale` | Bookend: os mesmos dois animais do início fecham o argumento |
| `zeus-seal` | A assinatura da peça |

Fontes: `tokens.ts SCENES` (comentário de cada linha), `WhaleSardine3D.tsx` cabeçalho,
`LetteringHook.tsx` cabeçalho, `HighTicketWord.tsx` cabeçalho.

### A correção de sincronia da semana

O defeito mais grave da v11 não era layout, era tempo: o visual estava adiantado em relação à
fala. Toda janela foi conferida palavra a palavra contra `data/narration.json`
(`tokens.ts:169` a `:177`). Quando régua e fala brigam, a fala vence.

| Cena | Estava | Passou a entrar em | Adiantamento corrigido | Fonte |
|---|---|---|---|---|
| `baleia-numbers` | 42,02s | 45,083s (logo antes de ele dizer "15") | 3,3s. O número aparecia antes da fala | `tokens.ts:204` a `:206` |
| `lettering-renda` | ~47,8s | 50,1s (na palavra "você") | 2,3s. Entrava por cima de "estou trazendo números hipotéticos" | `tokens.ts:207` a `:209` |
| `lettering-exemplo` | ~17,7s | 19,317s (na palavra "aqui") | 1,6s. Entrava enquanto ele ainda falava de isca de sardinha | `tokens.ts:194` a `:196` |
| `lettering-hook` | terminava em 1,16s | termina em 1,617s | A frase era cortada exatamente na palavra "pessoas" | `tokens.ts:179` a `:182` |
| `quote-baleia` | saía antes | fica até 45,083s | Ele REPETE "carteira de 100 mil" em 44,36s; o card sai quando o assunto sai | `tokens.ts:201` a `:203` |

### Eventos internos, com frame local

Frame local é contado a partir do início da própria cena.

| Cena | Evento | Frame local | Duração | Curva | Casa com |
|---|---|---|---|---|---|
| `quote-baleia` | cartão de vidro entra | 80 | 28 (opacidade), 40 (subida) | `easyEase` e `settleSoft` | fica atrás, só profundidade (`HundredK.tsx:45`, `GlassCard.tsx:41` e `:42`) |
| `quote-baleia` | número aparece | 88 | 24 opacidade, 30 subida, 22 desfoque | `easyEase` e `settleSoft` | `HundredK.tsx:34` a `:36` |
| `quote-baleia` | contador de 0 a 100 | delay 92 | 86 | `smoothInOut` | ele diz "100" no frame local 138 e "mil" no 164; o número fecha junto com a palavra (`HundredK.tsx:31` a `:38`) |
| `quote-baleia` | rótulo "JÁ GUARDADOS" | 176 | 24 | `easyEase` | `HundredK.tsx:40` |
| `baleia-numbers` | número entra | 4 | 24 opacidade, 30 subida, 22 desfoque | `easyEase` e `settleSoft` | `ReturnTable.tsx:37` a `:39` |
| `baleia-numbers` | contador de 0 a 15 | delay 4 | 62 | `smoothInOut` | ele diz "15" no frame local 30 (`ReturnTable.tsx:15` a `:17`, `:43`) |
| `baleia-numbers` | rótulo "RETORNO AO ANO" | 56 | 22 | `easyEase` | `ReturnTable.tsx:40` |
| `baleia-numbers` | troca de 15 para 20 | 122 | 36 | `smoothInOut` | ele diz "20%" no frame local 145; a troca acontece no MESMO elemento (`ReturnTable.tsx:32`, `:44`, `:45`) |
| `quote-highticket` | letras de HIGH TICKET | começa em 14, 2 frames entre letras | 22 opacidade, 26 subida, 18 desfoque | `easyEase` e `smoothInOut` | `HighTicketWord.tsx:73` a `:76` |
| `quote-highticket` | traço do espectro | delay 46 | 72 | `settleSoft` | começa depois da palavra assentar, nunca junto (`HighTicketWord.tsx:110` a `:117`) |
| `quote-sardinha` | carteira desliza | 160 | 72 (deslocamento), 30 (opacidade), 40 (desfoque) | `smoothInOut` e `easyEase` | ele diz "carteira" no frame local 194 e "investimentos" no 232: o objeto chega enquanto ele diz a palavra (`WalletSplit3D.tsx:13` a `:18`, `:32`, `:39` a `:41`) |
| `money-growth` | eixo se desenha | 0 | 30 | curva da cena | `MoneyGrowth.tsx:62` |
| `money-growth` | linha se desenha | 24 | 380 | curva da cena | o desenho acompanha o beat inteiro, plano enquanto ele fala do passado (`MoneyGrowth.tsx:64`) |
| `money-growth` | rótulo "NUNCA SOBROU" | 200 | 36 | `easyEase` | `MoneyGrowth.tsx:52` |
| `money-growth` | rótulo "SOBRANDO AGORA" | 340 | 36 | `easyEase` | `MoneyGrowth.tsx:53` |
| `hook-miss` | corte diagonal | 6 | 30 | curva da cena | fecha em 36, antes do `exitF` 47 (`HookMiss3D.tsx:28` a `:32`) |
| `concept-reveal` | régua de chão | 4 | 44 | curva da cena | `WhaleSardine3D.tsx:40` |
| `concept-reveal` | baleia entra | 16 | 46 (pouso padrão) | `settleSoft` | `WhaleSardine3D.tsx:53`, `Object3D.tsx:59` |
| `concept-reveal` | sardinha entra | 40 | 46 | `settleSoft` | entra depois e pequena, na mesma linha de base (`WhaleSardine3D.tsx:56`) |
| `explain-internet` | feed começa a rolar | 54 | 26 de aparição | `easyEase` | `PhoneFeed3D.tsx:37` e `:38` |

---

## 7. Catálogo de componentes

### Os cinco dispositivos aprovados por escrito

Estes cinco estão em `memory/zeus-reels-2-padrao-visual.md`, seção "Aprovado pelo o dono do canal em
04/09/2026", e são lei de estilo, não sugestão.

| Dispositivo | Regra | Exemplo na peça |
|---|---|---|
| Frase grande letra a letra | Toda palavra protagonista revela letra a letra, com desfoque, subida e opacidade, atraso curto entre uma letra e outra. Motion de editor de reels, mas suavizado | EXEMPLO aos 22s |
| Palavra com marca do espectro | Palavra sozinha, peso 900, tracking apertado, traço embaixo com o espectro INTEIRO em gradiente, desenhado em 72 frames com curva de assentamento | HIGH TICKET aos 17s |
| Objeto 3D sem rótulo, gesto único | Um movimento simples casado com a palavra que nomeia o objeto, com desaceleração no fim. Coreografia com várias partes animando foi reprovada | A carteira aos 25s |
| Número protagonista contando | O número fica sozinho no cartão de vidro, no centro, e cala a legenda. Sobe do zero até o alvo, acelerando e desacelerando nos últimos dígitos | 100 mil aos 38s, 15% e 20% aos 45s |
| Fecho com selo | O lockup oficial, único ponto de cor da peça | Seção 9 |

### Bloco por componente

Todos declaram `ownsMotion: true` no `choreography.ts`, o que significa: o palco não aplica
entrada neles, o movimento de entrada é o que o próprio componente faz. O palco só cuida do
desaparecimento no fim da cena (`MotionStage.tsx:92` a `:111`).

#### `LetteringHook` (cena 1)

| Campo | Valor | Fonte |
|---|---|---|
| `CONTENT_H` | 202 (duas linhas de 96 com entrelinha 1, mais 10 de respiro) | `LetteringHook.tsx:20` |
| Texto | `A MAIOR PARTE\nDAS PESSOAS`, quebra declarada na mão | `LetteringHook.tsx:34` |
| Tamanho do destaque | 96 | `LetteringHook.tsx:44` |
| Delay do destaque | 16, com 1 frame entre letras | `LetteringHook.tsx:39` e `:41` |
| Largura da caixa | 720 | `LetteringHook.tsx:26` |

Gesto: cada letra entra com opacidade (janela 18,2 frames, `easyEase`), subida de 14 px (janela 26,
`smoothInOut`) e desfoque de 8 px (janela 15,6, `easyEase`) (`Lettering.tsx:48`, `:49`, `:81` a
`:92`, com `entryDur` padrão 26 em `Lettering.tsx:63`).

Por que a quebra é declarada e não automática: a frase de destaque tem `whiteSpace: nowrap`, então
frase longa estouraria a margem em silêncio. Quem escreve a cena decide onde quebra, e as duas
linhas têm que sair de tamanho parecido, sem palavra órfã na última (`Lettering.tsx:68` a `:73`).

#### `PeopleRow3D` (cena 2)

| Campo | Valor | Fonte |
|---|---|---|
| `CONTENT_H` | 320 (o manequim central, que é o mais alto) | `PeopleRow3D.tsx:15` |
| Figuras | 3, nas posições x 170, 320 e 470 | `PeopleRow3D.tsx FIGURAS` |
| Escalas | 0,86 nas laterais, 1,0 no centro | `PeopleRow3D.tsx FIGURAS` |
| Delays | 0, 12 e 24 | `PeopleRow3D.tsx FIGURAS` |
| Papel | `hero` no central, `dado` nas laterais (sombra diferente) | `PeopleRow3D.tsx:32` |

Um asset só, repetido três vezes com escala e deslocamento, para sugerir "gente" sem gerar três
objetos diferentes. A terceira figura, a que erra, entra por último.

#### `HookMiss3D` (cena 3)

| Campo | Valor | Fonte |
|---|---|---|
| `CONTENT_H` | 222 (anzol de 200 mais o corte, que desce até 220) | `HookMiss3D.tsx:16` |
| Anzol | 220 x 200, delay 0, papel `hero` | `HookMiss3D.tsx:37` a `:43` |
| Corte | `M180 220 L460 20`, delay 6, duração 30 | `HookMiss3D.tsx:19`, `:28` |

O objeto é 3D; o traço por cima é ANOTAÇÃO. A cena é curta de propósito (61 frames nominais), então
o corte entra cedo e fecha em 36, antes da saída em 47. Antes fechava em 88 e o traço mal aparecia,
defeito pego pelo `choreo-lint`, verificação "animacao-alem-da-saida".

#### `WhaleSardine3D` (cenas 4 e 13)

| Campo | Valor | Fonte |
|---|---|---|
| `CONTENT_H` | 146 (antes 420, com 176 px virando espaço morto) | `WhaleSardine3D.tsx:30` a `:32` |
| Régua de chão | `M40 144 H600`, `hairline` cinza, delay 4, duração 44 | `WhaleSardine3D.tsx:27`, `:37`, `:46` |
| Baleia | 360 x 130, delay 16, papel `hero`, em x=8 | `WhaleSardine3D.tsx:53` |
| Sardinha | 132 x 42, delay 40, papel `dado`, em x=452, y=88 | `WhaleSardine3D.tsx:56` |

Cena com objeto NÃO leva rótulo. A versão anterior mostrava duas iscas com quatro textos
empilhados (ISCA DE BALEIA, TICKET ALTO, ISCA DE SARDINHA, TICKET BAIXO) e foi reprovada por dois
motivos, os dois corretos: a isca não se explica sozinha, e o peso de leitura ficou pesado. A
diferença de tamanho entre os dois animais comunica ticket alto e baixo sem uma palavra
(`WhaleSardine3D.tsx:1` a `:22`).

#### `PhoneFeed3D` (cena 5)

| Campo | Valor | Fonte |
|---|---|---|
| `CONTENT_H` | 340 | `PhoneFeed3D.tsx:22` |
| Celular | 190 x 340, delay 0, papel `hero` | `PhoneFeed3D.tsx:31` a `:38` |
| Tela recortada | 130 x 264 em x=255, y=38 | `PhoneFeed3D.tsx:47` |
| Cartões | 5, altura 74, espaçados 92 | `PhoneFeed3D.tsx:24` a `:26` |
| Rolagem | 0,4 px por frame, a partir do frame 54 | `PhoneFeed3D.tsx:38` |

#### `HighTicketWord` (cena 6)

| Campo | Valor | Fonte |
|---|---|---|
| `CONTENT_H` | 120 (palavra de 108 mais o traço, que fecha em 119). Antes 260 | `HighTicketWord.tsx:26` a `:28` |
| Palavra | `HIGH TICKET`, Inter 104, peso 900, tracking `-0.032em`, entrelinha 1, sem quebra | `HighTicketWord.tsx:57` a `:66` |
| Letra a letra | começa em 14, 2 frames entre letras | `HighTicketWord.tsx:73` |
| Marca | tipo `linha`, espessura 6, delay 46, duração 72, curva `settleSoft`, gradiente com as 8 paradas | `HighTicketWord.tsx:110` a `:117` |

Duas lições registradas no próprio arquivo. Primeira: o cubo de vidro que estava junto saiu porque
não SIGNIFICAVA nada da fala, era decoração bonita. Objeto que não diz a frase não entra, mesmo
bonito (`HighTicketWord.tsx:12` a `:14`). Segunda: o traço carrega o espectro INTEIRO. Antes pedia
uma parada só e saía azul chapado, exatamente o que foi reprovado ("era pra ser nas cores do Zeus,
várias cores, igual o traçado da logo no final", `HighTicketWord.tsx:101` a `:108`).

O bloco pai não anima mais nada, senão o desfoque entraria duas vezes
(`HighTicketWord.tsx:36` a `:40`).

#### `LetteringExemplo` (cena 7)

| Campo | Valor | Fonte |
|---|---|---|
| `CONTENT_H` | 170 (apoio 40 com caixa de ~48, mais 10 de respiro, mais destaque 112) | `LetteringExemplo.tsx:17` |
| Apoio | `aqui entra um`, 40, cinza 600, delay 6 | `LetteringExemplo.tsx:30`, `:35`, `:37` |
| Destaque | `EXEMPLO`, 112, delay 16, 2 frames entre letras | `LetteringExemplo.tsx:31` a `:38` |

#### `WalletSplit3D` (cena 8)

| Campo | Valor | Fonte |
|---|---|---|
| `CONTENT_H` | 120 (o PNG é 815x375, então 260 de largura renderiza 120 de altura) | `WalletSplit3D.tsx:27` a `:29` |
| Largura | 260 | `WalletSplit3D.tsx:31` |
| Entrada | frame local 160 | `WalletSplit3D.tsx:32` |
| Deslocamento | de -260 px para 0, em 72 frames, `smoothInOut` | `WalletSplit3D.tsx:39` |
| Opacidade | 30 frames, `easyEase` | `WalletSplit3D.tsx:40` |
| Desfoque | 10 px para 0, em 40 frames, `easyEase` | `WalletSplit3D.tsx:41` |

Reescrito por ordem direta: "o design da carteira ficou ruim, tire o movimento das 3 barras
laterais e faça apenas um movimento simples, quando eu falo a palavra carteira de investimentos tu
faz a carteira se movimentar da lateral com aquela desaceleração, centralizada"
(`WalletSplit3D.tsx:4` a `:7`). Saíram as três fatias de alocação, o eixo e o desenho de traço.

#### `MoneyGrowth` (cena 9)

| Campo | Valor | Fonte |
|---|---|---|
| `CONTENT_H` | 300 (do rótulo de cima, y=26, até o eixo, y=292) | `MoneyGrowth.tsx:57` e `:58` |
| Série | 5 pontos, quase plana até ~70% e subindo no fim | `MoneyGrowth.tsx PTS` |
| Traçado | Catmull-Rom convertido em Bezier suave | `MoneyGrowth.tsx:29` a `:44` |
| Eixo | `M20 292 H600`, delay 0, duração 30, `hairline` | `MoneyGrowth.tsx:47`, `:62`, `:68` |
| Linha | delay 24, duração 380 | `MoneyGrowth.tsx:64` |
| Ponto duplo | aparece só quando a curva já passou do ponto (34% e 96%) | `MoneyGrowth.tsx:73` |

#### `HundredK` (cena 10)

| Campo | Valor | Fonte |
|---|---|---|
| `CONTENT_H` | 230 (o cartão de vidro) | `HundredK.tsx:26` |
| Cartão | 520 x 230, delay 80, em x=60 | `HundredK.tsx:45` |
| Número | Inter 132, peso 900, tracking `-0.032em`, entrelinha 1 | `HundredK.tsx:63` a `:68` |
| Contador | delay 92, duração 86, de 0 a 100 | `HundredK.tsx:38` |
| Rótulo | `JÁ GUARDADOS`, 30, peso 600, tracking `0.08em`, cinza 600, em y=178 | `HundredK.tsx:75` a `:90`, `tokens.ts ICON_LABEL` |

O que estava errado na versão anterior era a hierarquia: o número dividia espaço com um maço de
notas e com um rótulo, então nada era protagonista. Aqui o número É a cena, e o cartão de vidro
fica atrás só como profundidade (`HundredK.tsx:8` a `:13`).

#### `ReturnTable` (cena 11)

| Campo | Valor | Fonte |
|---|---|---|
| `CONTENT_H` | 230, idêntico ao da cena do 100 mil: os dois números são irmãos visuais | `ReturnTable.tsx:29` e `:30` |
| Cartão | 520 x 230, delay 0, em x=60 | `ReturnTable.tsx:49` |
| Contador 1 | delay 4, duração 62, de 0 a 15 | `ReturnTable.tsx:43` |
| Troca | frame 122, duração 36, de 15 para 20 | `ReturnTable.tsx:32` e `:44` |
| Rótulo | `RETORNO AO ANO`, delay 56 | `ReturnTable.tsx:40`, `:94` |

Ordem literal: "no caso do 15 ele fica central, quando eu falo 20% ele troca no mesmo elemento, vai
trocando número por número até parar no 20%" (`ReturnTable.tsx:6` a `:8`). A tabela de duas células
lado a lado saiu.

#### `LetteringRenda` (cena 12)

| Campo | Valor | Fonte |
|---|---|---|
| `CONTENT_H` | 150 | `LetteringRenda.tsx:18` |
| Apoio | `você já fala com quem`, 40, delay 6 | `LetteringRenda.tsx:30`, `:34`, `:37` |
| Destaque | `JÁ TEM RENDA`, 92, delay 16, 2 frames entre letras | `LetteringRenda.tsx:31` a `:38` |

#### Helpers

| Helper | O que faz | Fonte |
|---|---|---|
| `useContador(delay, dur, ate, de)` | número que sobe ou troca, arredondado a cada frame, curva `smoothInOut` | `contador.ts:21` a `:29` |
| `useDrawProgress(delay, dur, ease)` | progresso 0 a 1 do desenho de um traço; sem `dur` e `ease` herda o que a cena declarou | `drawUtils.tsx:72` a `:77` |
| `DrawPath` | desenha o caminho com comprimento MEDIDO pelo `evolvePath`, ponta e vértice arredondados | `drawUtils.tsx:84` a `:107` |
| `fadeInAt(frame, start, dur)` | aparição com desfoque de 6 px, para o que entra DEPOIS do traço | `drawUtils.tsx:110` a `:113` |
| `strokePx(token, escala)` | espessura de traço em pixel de tela, não em unidade de desenho | `drawUtils.tsx:53` |
| `Object3D` | pousa o objeto, dá respiração de rotação falsa e aplica a sombra do papel. Nunca desenha texto | `Object3D.tsx` |
| `GlassCard` | cartão de vidro fosco, frost travado entre 0,10 e 0,25, desfoque de fundo NUNCA animado | `GlassCard.tsx:35`, `:43`, `:58` a `:60` |
| `WordMark` | marca desenhada embaixo da palavra, comprimento medido, gradiente do espectro | `WordMark.tsx` |
| `Lettering` | apoio mais palavra protagonista, com quebra declarada e revelação letra a letra | `Lettering.tsx` |

Detalhes do `Object3D` que valem como padrão: pouso com subida de 22 px em 46 frames
(`settleSoft`), escala de 0,97 a 1 (teto de escala 1,04 do squad), opacidade em 26 frames, e
respiração de rotação de 3,5 graus em Y e 2 em X depois do frame 46
(`Object3D.tsx:57` a `:66`). Sombra por papel: `hero` `0 24px 40px rgba(0,0,0,0.18)`, `dado`
`0 12px 24px rgba(0,0,0,0.10)`, `rotulo` nenhuma (`Object3D.tsx SOMBRA`). O objeto é tratado em
preto e branco puro, `grayscale(1) contrast(1.05)` (`Object3D.tsx:43`).

Detalhe do `WordMark` que já quebrou uma vez: o identificador do gradiente é gerado por instância
e limpo de tudo que não é letra ou número, porque o `useId` do React devolve delimitadores
ilegais dentro de `url(#...)` e o traço sairia preto (`WordMark.tsx:95` a `:99`). E o gradiente usa
`gradientUnits="userSpaceOnUse"` com `x2` igual à largura, para as cores correrem AO LONGO da
linha; no modo padrão um traço fininho pegaria uma fatia quase chapada e voltaria a parecer cor
única (`WordMark.tsx:106` a `:108`).

---

## 8. Movimento e suavização

### A lei

Ordem literal do o dono do canal, 04/09/2026: "a regra de qualquer movimento, animação, tudo tem que ter
suavização como se tivesse sido feito no After Effects: suaviza, depois acelera, e no final
suaviza" (`contador.ts:8` a `:12`, `memory/zeus-reels-2-padrao-visual.md` linhas 111 a 115).

A curva de referência é `smoothInOut`, `cubic-bezier(0.45, 0, 0.15, 1)` (`core/curves.ts:33`).

**A exceção única:** curva que parte rápido (`settleSoft`) só serve para objeto que ENTRA e
assenta. Nunca para número que conta, nunca para deslocamento longo
(`memory/zeus-reels-2-padrao-visual.md` linhas 114 e 115).

### Curva por papel

| Papel | Curva | Bezier | Faixa de frames real na peça | Fonte |
|---|---|---|---|---|
| Objeto 3D que pousa | `settleSoft` | `0.12, 0.4, 0.8, 1` | 46 frames de subida e escala | `Object3D.tsx:59` e `:60`, `core/curves.ts:86` |
| Cartão de vidro que entra | `settleSoft` | `0.12, 0.4, 0.8, 1` | 40 frames de subida | `GlassCard.tsx:42` |
| Número que conta | `smoothInOut` | `0.45, 0, 0.15, 1` | 86 (100 mil), 62 (15), 36 (troca) | `contador.ts:28`, `HundredK.tsx:38`, `ReturnTable.tsx:43` e `:44` |
| Deslocamento longo de objeto | `smoothInOut` | `0.45, 0, 0.15, 1` | 72 (carteira) | `WalletSplit3D.tsx:39` |
| Subida de letra em palavra grande | `smoothInOut` | `0.45, 0, 0.15, 1` | 26 | `HighTicketWord.tsx:75`, `Lettering.tsx:85` |
| Opacidade e desfoque de texto | `easyEase` | `0.33, 0, 0.67, 1` | 18 a 26 | `Lettering.tsx:83` e `:86`, `HighTicketWord.tsx:74` e `:76` |
| Subida da palavra na legenda | `settleSoft` | `0.12, 0.4, 0.8, 1` | 13 | `Captions.tsx:315` |
| Traço que se desenha, padrão | curva da cena, quase sempre `settleSoft` | conforme a cena | 72 frames de padrão | `drawUtils.tsx:29`, `MotionStage.tsx:100` a `:105` |
| Marca embaixo da palavra | `settleSoft` | `0.12, 0.4, 0.8, 1` | 72 | `HighTicketWord.tsx:116` |
| Expansão e recolhimento do bloco de vídeo | `smoothInOut` | `0.45, 0, 0.15, 1` | 68 | `index.tsx:62` |
| Saída de cena (desaparecimento) | `premium` na maioria, `impact` nas duas últimas | `0.33, 0, 0.15, 1` e `0.5, 0, 0.1, 1` | 26 a 40 | `choreography.ts` por cena, `core/curves.ts:45` e `:51` |
| Saída do bloco de vídeo no fecho | `impact` | `0.5, 0, 0.1, 1` | 39 | `index.tsx:106` e `:131` |
| Entrada da cena de recapitulação | `dramatic` | `0.7, 0, 0.1, 1` | 68 | `choreography.ts` cena `recap-baitscale` |

### Por que o contador trocou de `settleSoft` para `smoothInOut`

Ordem do o dono do canal em 04/09/2026, citada literalmente no cabeçalho do arquivo: "a regra de qualquer
movimento, tudo tem que ter suavização como se tivesse sido feito no After Effects, suaviza depois
acelera e no final suaviza". O diagnóstico técnico está na mesma linha: a `settleSoft` anterior
partia rápido demais e o começo do contador lia como corte, não como movimento
(`contador.ts:8` a `:13`).

Em linguagem simples: o número saltava do zero em vez de começar a andar. Com a curva nova ele
sai devagar, ganha velocidade no meio e freia nos últimos dígitos, que é o gesto que ele pediu.

### Por que a janela de desenho é 72 e não 52

Reclamação de 27/08/2026, sétima rodada: "ainda tá muito rápida, o tempo da suavização tem que ser
um pouco maior, o tempo da desaceleração de todos os elementos". 72 frames a 60 fps é 1,2s de
desenho: a linha ASSENTA em vez de chegar (`drawUtils.tsx:21` a `:28`). O valor está espelhado na
constante `DRAW_PROGRESS_WINDOW` do `scripts/choreo-lint.js`; mudar num lugar exige mudar no outro.

### Por que a curva `settle` existe

Aumentar a duração não estava resolvendo, porque a curva `cinematic` percorre 97% do movimento na
METADE do tempo: aos 60% do tempo faltava só 1,2% do caminho, e o resto da janela era movimento
invisível. A `settle` começa firme (46% do caminho no primeiro quarto) e ainda tem 20% do movimento
para fazer depois de 60% do tempo, que é onde o olho VÊ a desaceleração
(`core/curves.ts:61` a `:82`). A `settleSoft` é a mesma ideia com cauda ainda maior, 23,4%
(`core/curves.ts:84` a `:86`).

### Sobreposição entre cenas

Cada cena dura 10 frames a mais que o nominal (`choreography.ts OVERLAP`), e a saída começa no
`exitF`, que é `dur` menos a margem. Assim a cena que sai e a que entra se cruzam por
transparência, sem buraco branco no meio. Quem aplica isso é o `MotionStage`, que calcula o
desaparecimento com a curva de saída declarada pela própria cena
(`MotionStage.tsx:93` a `:99`).

---

## 9. Fecho

O fecho é o lockup oficial: retângulo arredondado com anel colorido girando, símbolo no meio,
`ZEUS` embaixo e `IA PARA MENTORES` abaixo dele.

| Elemento | Valor | Fonte |
|---|---|---|
| Retângulo | 220 x 220, raio 52 (23,6% do lado, squircle, nunca círculo) | `ZeusSealClose.tsx:41` a `:44` |
| Espessura do anel | 11 de recuo do miolo branco | `ZeusSealClose.tsx:46` |
| Símbolo | 116, ou 52,7% do lado | `ZeusSealClose.tsx:47` |
| Giro do anel | volta completa em 3s, por ângulo do gradiente cônico, opacidade 0,7 | `ZeusSealClose.tsx:62`, `:99` a `:105` |
| Aparição do tile | 84 frames | `ZeusSealClose.tsx:59` e `:60` |
| `ZEUS` | Inter 700, 40, tracking `0.04em`. Opacidade de 72 a 126, desfoque de 10 px na mesma janela, subida de 18 px de 72 a 138 | `ZeusSealClose.tsx:65` a `:67`, `:112` a `:124` |
| Assinatura | Inter 600, 17, tracking `0.16em`, cinza 600. Opacidade de 118 a 174, desfoque de 8 px, subida de 14 px de 118 a 186 | `ZeusSealClose.tsx:69` a `:71`, `:129` a `:143` |

O giro é feito pelo ÂNGULO do gradiente, nunca por rotação do elemento: rodar o elemento giraria o
desfoque e o recorte junto (`ZeusSealClose.tsx:61` e `:62`).

### Tempos do fecho na peça

| Momento | Frame absoluto | Segundo | Fonte |
|---|---|---|---|
| Cena `zeus-seal` começa | 3546 | 59,10 | `tokens.ts SCENES` |
| Selo começa a aparecer | 3562 (3546 + 16) | 59,37 | `index.tsx:243` |
| Bloco de vídeo desmonta | 3585 (3546 + 39) | 59,75 | `index.tsx:106` e `:114` |
| Eyebrow some | de 3566 a 3622 | 59,43 a 60,37 | `index.tsx:68` a `:70` |
| Selo assenta | 3646 (3562 + 84) | 60,77 | `ZeusSealClose.tsx:59` |
| `ZEUS` completo | 3688 | 61,47 | `ZeusSealClose.tsx:65` |
| Assinatura completa | 3736 | 62,27 | `ZeusSealClose.tsx:69` |
| Fim do vídeo | 3780 | 63,00 | `tokens.ts VIDEO_FRAMES` |

### Por que a saída do vídeo é de 39 frames e não de 70

O tile real desta call tem 60,48s e a fala vai até 60,63s, ou seja a filmagem acaba praticamente
junto com a fala, sem a folga de cerca de 5s que existia na peça anterior do padrão. Então a cena
de fecho começa na própria âncora e o vídeo precisa desmontar rápido, dentro do que a filmagem
realmente cobre. Pedir frame além disso quebra o render com "No frame found at position"
(`index.tsx:96` a `:114`, `tokens.ts:24` a `:37`).

O fecho foi ANTECIPADO na v15: começa no instante em que a fala termina ("observar," fecha em
59,10s) e não mais na palavra "mas", que agora fica muda. Isso casa com a virada da trilha, que
quebra em 57,8s e resolve num impacto em 58,6s, deixando o campo livre para o selo. A frase final
"mas existem vários outros" toca só em áudio, sem legenda, por baixo do selo
(`tokens.ts:212` a `:219`, `tokens.ts:28` a `:33`).

Observação de status: RESOLVIDA em 06/09/2026. O cabeçalho do `ZeusSealClose.tsx` dizia "PENDENTE
DE APROVAÇÃO" desde 27/08/2026, e o o dono do canal aprovou o fecho olhando a Fernanda v10.

### O ritmo do fecho: três instantes, não um (aprovado em 06/09/2026)

A frase dele, que é a regra: "gostei do final, manteve a minha fala mas a cena entrou na hora certa
da vinheta, gostei muito, esse pode ser o padrão: às vezes a fala continua mas a cena vai para o
acabamento".

O que confundiu todo mundo até aqui foi tratar isso como um instante só. São três, e cada um tem
âncora própria:

| Instante | Âncora | Onde vive |
|---|---|---|
| 1. A cena de fecho entra | âncora VISUAL da cena, pode cair no meio da última frase | `SCENES` do `tokens.ts` |
| 2. A locução continua por baixo | sem legenda e sem os cards de vídeo | `CaptionsLayer` devolve `null`; `VIDEO_UNMOUNT_F` |
| 3. A vinheta falada entra | fim REAL da fala mais 0,4s de respiro | `scripts/lib/sfx-mapa.js` |

A regra do instante 3 em código: a vinheta entra no MAIOR valor entre o frame do selo e o fim da
última palavra do `narration.json` mais 0,4s. O mapa grava qual dos dois venceu, no campo
`ancoradaEm`. Ancorada só no selo, ela tocava por cima da voz e a palavra "Zeus" sumia: foi assim
que o defeito apareceu na Fernanda, e o `mixar-final.js` hoje reprova essa sobreposição.

### Onde cada peça está, medido contra o `narration.json`

| Peça | Cena de fecho entra | Fim da fala | Diferença | Vinheta ancorada em |
|---|---|---|---|---|
| ZeusTrafegoReels | 29,67s | 33,52s | 3,85s ANTES | fim da fala |
| HamiltonZeusReels | 59,10s | 60,63s | 1,53s ANTES | fim da fala |
| FernandaEsteiraReels | 46,72s | 48,80s | 2,08s ANTES | fim da fala |
| PauloRuizReels | 56,20s | 55,74s | 0,46s depois | frame do selo |
| CarlosSemeReels | 51,45s | 51,30s (som real) | 0,15s depois | frame do selo |
| AlineZeusReels | 60,20s | 56,70s | 3,50s depois | frame do selo |

As três primeiras seguem o padrão. As três últimas ficaram do outro lado porque a regra nunca
tinha sido escrita, e cada uma inventou uma justificativa local plausível. O o dono do canal decidiu em
06/09/2026 realinhar as três.

### Duas regras concorrentes, e quem vence

1. **A régua do lettering** ("o pôster fica ao menos 3s depois da última palavra") é o que empurrou
   o selo do Aline para 3,5s depois da fala. Ela continua valendo para o pôster, não para o selo:
   o lettering pede seu tempo de leitura, o selo entra assim que o lettering cumpre o dele.
2. **A transcrição fecha a palavra antes do som terminar.** No Carlos a última palavra fecha em
   51,06s e o som só cala em 51,30s. Como a âncora da vinheta usa o `narration.json` cru, o respiro
   de 0,4s pode virar 0,16s efetivos. Quando a diferença importar, medir o silêncio real com
   `silencedetect` antes de cravar a âncora.

---

## 10. Áudio

Esta é a única parte do estilo que não existia em nenhum outro lugar do repositório. A receita
nasceu na mão, nas versões v16 a v18 (04/09/2026), e virou script executável em
`scripts/video/mixar-trilha.js`. Cada número dele foi pago com um defeito real
(`mixar-trilha.js:6` a `:23`).

Regra mãe da casa, que continua valendo: nunca usar componente de áudio dentro da composition;
todo áudio entra por ffmpeg depois do render (`docs/audio-pipeline.md` linha 4).

### Arquivos

| Arquivo | Caminho |
|---|---|
| Voz normalizada | `public/HamiltonZeusReels/audio-final.wav` |
| Trilha | `public/HamiltonZeusReels/audio/trilha-black-banner-ascend.mp3` |
| Efeito do fecho | `public/HamiltonZeusReels/audio/efeito-zeus-apple.mp3` |

Verificado em disco em 04/09/2026. O caminho da voz é derivado sozinho a partir do nome da
composition (`mixar-trilha.js:228`).

### A receita, passo a passo

| Passo | O que faz | Valor | Fonte |
|---|---|---|---|
| 1 | Voz é compensada em +3 dB | a conversão de mono para estéreo derruba 3 dB; sem isso a voz sai por baixo da trilha e ninguém percebe olhando o arquivo, só ouvindo | `mixar-trilha.js:11` a `:13`, `:297` |
| 2 | Voz recebe um sumiço curto no fim da fala | `afade` de saída de 0,4s, começando em `fim da fala - 0,4` | `mixar-trilha.js PADROES.vozFade`, `:286`, `:298` |
| 3 | Voz é duplicada com `asplit` | no ffmpeg um rótulo de saída só pode ser consumido UMA vez, e a voz é usada duas (na mixagem e como cadeia lateral do abaixamento). Sem isso o arquivo sai e a voz fica enterrada, defeito silencioso | `mixar-trilha.js:14` a `:17`, `:299` |
| 4 | Trilha entra abaixo da voz | -11 dB, com aparição de 0,35s no começo | `mixar-trilha.js PADROES.musicaDb`, `:302` a `:305` |
| 5 | Trilha abaixa sozinha quando a voz fala | `sidechaincompress`, limiar 0.25, proporção 3, ataque 20 ms, alívio 350 ms | `mixar-trilha.js PADROES`, `:307` a `:310` |
| 6 | Trilha SAI no instante em que o selo entra | `afade` de saída de 0,35s começando em 59,10s (o `start` da última cena do `SCENES`) | `mixar-trilha.js PADROES.musicaFade`, `:304`, `:188` a `:201` |
| 7 | Efeito do Zeus cortado no ponto limpo | `atrim` em 8,90s | `mixar-trilha.js PADROES.efeitoCorte`, `:314` |
| 8 | Efeito posicionado de trás para frente | atraso = instante em que o selo assenta menos (10,21 menos 8,90), ou seja 60,767 menos 1,31 = 59,457s | `mixar-trilha.js:274` a `:284` |
| 9 | Silêncio preenche o fim, na voz e na trilha | `apad` nas duas | `mixar-trilha.js:18` a `:20`, `:299`, `:305`, `ERRO #329` |

Em linguagem simples: a música toca por baixo da fala e se abaixa sozinha toda vez que ele fala.
Quando a animação do fecho entra, a música some em pouco mais de um terço de segundo e sobra só o
efeito sonoro do Zeus, com a pancada dele caindo exatamente no frame em que o selo para de se
mexer.

**Leitura do gráfico da música.** Para achar onde a trilha quebra e onde ela resolve, o desenho da
onda foi lido primeiro com envelope de 0,5s (para ver a forma grande) e depois com 0,2s (para
cravar a batida). Nesta trilha a quebra caiu em 57,8s e o impacto em 58,6s, o que foi o motivo de
antecipar o fecho na v15. Isso é procedimento manual, **medido no v18**, não está em código.

### Como os instantes são derivados

Nenhum instante é digitado na mão (`mixar-trilha.js:32` a `:34`):

| Instante | De onde sai | Valor no v18 |
|---|---|---|
| Fim da fala | última palavra do `data/narration.json` | manda no `afade` da voz (`mixar-trilha.js:164` a `:182`) |
| Início do selo | `start` da última cena do `SCENES` do `tokens.ts`, lido por texto | 59,10s (`mixar-trilha.js:188` a `:201`) |
| Selo assenta | início do selo mais (16 + 84) / 60 | 60,767s (`mixar-trilha.js:45` a `:49`, `:259` a `:262`) |

Os números 16 e 84 são o mesmo par do código do fecho: 16 é o atraso com que o selo é montado
(`index.tsx:243`) e 84 é a mola de entrada dele (`ZeusSealClose.tsx:59`).

### Interface do script

```
node scripts/video/mixar-trilha.js <video.mp4> --comp <Composition> \
     --musica <arquivo> [--efeito <arquivo>] [--confirmar]
```

| Argumento | O que é |
|---|---|
| primeiro argumento livre | o vídeo renderizado, `.mp4` |
| `--comp` | composition, para achar `public/<Comp>/audio-final.wav`, o `narration.json` e o `tokens.ts` |
| `--musica` | caminho da trilha |
| `--efeito` | caminho do efeito do fecho (opcional) |
| `--confirmar` | SEM ele o script roda em simulação: imprime os instantes derivados e o comando, e não toca em arquivo nenhum |

Fonte: `mixar-trilha.js:25` a `:35`, `:370` a `:381`. Todos os valores da receita aceitam
sobrescrita por opção (`--musica-db`, `--threshold`, `--efeito-hit` e as demais), mas o padrão é
a receita aprovada.

### Os cinco gates de conferência

| # | Gate | Régua | Fonte |
|---|---|---|---|
| 1 | Duração | diferença entre o vídeo de entrada e a mixagem no máximo 0,2s | `mixar-trilha.js PADROES.tolerancia`, `:435` a `:443` |
| 2 | Voz preservada | compara a mixagem com uma versão só da voz, no trecho da fala: a diferença tem que ficar entre 0 e +1,5 dB. A mixagem pode SOMAR um pouco de trilha, nunca tirar | `mixar-trilha.js:67` a `:69`, `:445` a `:466` |
| 3 | Batida no lugar | procura o pico numa faixa de 0,3s em volta do instante em que o selo assenta, em janelas de 0,04s; ele tem que cair a no máximo 2 frames mais meia janela (0,053s) | `mixar-trilha.js:70` a `:73`, `:468` a `:493` |
| 4 | Silêncio no fim | os últimos 0,15s com média abaixo de -50 dB | `mixar-trilha.js:74` a `:85`, `:498` a `:517` |
| 5 | Trilha saiu | entre 0,4s depois do selo entrar e 0,1s antes de ele assentar, média abaixo de -45 dB. O gate se anula sozinho se o efeito ou a voz ainda soarem nessa janela | `mixar-trilha.js:86` a `:87`, `:519` a `:552` |

Reprovou: nada é gravado por cima do vídeo, e a ficha da conferência sai mesmo assim em
`<video>.mix.json` (`mixar-trilha.js:586` a `:599`).

Duas lições de régua que valem além deste script. O gate 4 mede a MÉDIA e não o pico, porque a
cauda de reverb do efeito ainda decai quando o vídeo acaba e marca cerca de -44 dB de pico tanto
na mixagem nova quanto no v18 aprovado. Um teto de -50 dB no pico reprovaria a própria versão que
deu origem à receita, o que é régua impossível e proteção falsa (`mixar-trilha.js:74` a `:83`,
lei 3 do `.claude/rules/anti-cascata-diagnostico.md`). E o gate 5 prefere se declarar "não se
aplica" a dar um veredito que a medição não sustenta.

O `ERRO #329` explica por que nada disso é burocracia: o defeito é silencioso. O arquivo abre,
toca, tem som e parece certo. Só quem conhece a peça percebe que os últimos 3,9 segundos sumiram,
e num reel o fim é a assinatura.

---

## 11. Erros cometidos

### Os desta semana, com a fala do dono

| # | Defeito | Fala dele ou registro | Correção | Fonte |
|---|---|---|---|---|
| 1 | Visual adiantado em relação à fala | Números apareciam 3,3s antes de serem ditos | Toda janela reconferida palavra a palavra. Quando régua e fala brigam, a fala vence | `tokens.ts:169` a `:177`, `:204` a `:209` |
| 2 | Espaço morto por centralização | "espaço morto acima", até 475 px de branco entre o vídeo e a frase | Âncora dupla, conteúdo colado no topo, `CONTENT_H` igual à tinta real | `tokens.ts:124` a `:126`, `MotionStage.tsx:56` a `:70` |
| 3 | Cor única no traçado | "era pra ser nas cores do Zeus, várias cores, igual o traçado da logo no final" | O traço passou a carregar as 8 paradas do espectro, com `userSpaceOnUse` | `HighTicketWord.tsx:101` a `:108`, `WordMark.tsx:45` a `:55` |
| 4 | Movimento linear no traçado | O desenho lia como movimento linear | De 46 frames com `easyEase` para 72 frames com `settleSoft` | `HighTicketWord.tsx:106` a `:108` |
| 5 | Legenda sem movimento | "tu tirou isso nas próximas versões" | Entrada palavra a palavra com desfoque, subida e opacidade, 3 frames entre palavras | `Captions.tsx:299` a `:322` |
| 6 | Carteira com coreografia demais | "tire o movimento das 3 barras laterais e faça apenas um movimento simples" | Um gesto só: entra pela lateral e assenta no centro | `WalletSplit3D.tsx:4` a `:11` |
| 7 | Frase cortada no meio | A cena de abertura terminava em 1,16s, exatamente na palavra "pessoas" | A cena passou a terminar em 1,617s e a frase ficou inteira, em duas linhas parecidas | `tokens.ts:179` a `:182`, `LetteringHook.tsx:32` a `:35` |
| 8 | Cubo de vidro decorativo | "no segundo 15 aparece um cubo mágico, horrível, totalmente fora do padrão" | O objeto saiu. Objeto que não diz a frase não entra, mesmo bonito | `HighTicketWord.tsx:8` a `:14` |
| 9 | Número mal feito | "aquela letra do 100 mil ficou mal feita, não está no nosso padrão" | O número virou protagonista sozinho no cartão de vidro | `HundredK.tsx:8` a `:13` |
| 10 | Rótulo brigando com a legenda | Quatro textos empilhados numa cena com objeto, "ficou pesado, ficou uma leitura desagradável" | Cena com objeto não leva rótulo. A diferença de tamanho comunica | `WhaleSardine3D.tsx:9` a `:19` |

### Os catalogados

| Erro | Lição de uma linha | Como isso vive neste estilo |
|---|---|---|
| `#329` (apad) | Neste formato o vídeo é SEMPRE mais longo que a fala. Atenção à justificativa, que estava errada
até 06/09/2026: não é porque "o fecho é imagem sem voz". Em metade das peças o fecho TEM a locução
original por baixo, e em todas ele termina com a vinheta falada. O vídeo é mais longo porque
precisa comportar a vinheta inteira depois do fim da fala. A conclusão prática (usar `apad`) não
muda. Toda mixagem usa `apad`, e a conferência é a duração final contra a declarada | Gate 1 da seção 10; implementado em `scripts/video/mixar-audio.js` |
| `#330` (âncora vence régua de duração) | Antes de encurtar cena: ela tem evento interno com tempo próprio? A fala que ela ilustra termina antes do novo fim? Se qualquer resposta for não, a âncora na palavra vence | É por isso que `money-growth` tem 534 frames nominais, com dois eventos internos dentro (frames locais 200 e 340) |
| `#332` (contaminação entre variantes) | Componente copiado de outra variante da mesma família só entra depois de comparar os dois arquivos de marca. Um token morto no vídeo aprovado acordou no nosso sem ninguém decidir | Por isso a ênfase da legenda troca de FONTE, nunca de cor, e por isso `BRAND.ts` é o único lugar de identidade |
| `#334` (defeito só visível no frame) | Container com texto declara proibição de quebra de linha e nasce com folga real. Material translúcido nunca é estrutura sobre fundo da mesma luminância. Nenhuma peça é dada como pronta sem olhar um frame de cada beat | Por isso o número tem `whiteSpace` controlado e entrelinha 1, e por isso a placa de vidro virou régua em traço em `WhaleSardine3D` |

Verificação obrigatória de frame: `node scripts/video/qa-beats.js <Composition>`, que extrai um
frame por beat direto do storyboard, sem escolher tempo na mão (`ERRO #334`).

---

## 12. Heurísticas de decisão

### A árvore, por trecho de fala

Para cada pedaço da fala, a pergunta é sempre a mesma: qual é O elemento visual desta fala, e só
um? (`ZOOM-REEL-MOTION.md` lei 1).

| O que a fala traz | O que entra no palco | Legenda | Exemplo |
|---|---|---|---|
| OBJETO CONCRETO (anzol, celular, carteira, baleia, manequim) | Objeto 3D branco de estúdio, sem rótulo, com UM gesto casado com a palavra | LIGADA | `WalletSplit3D`, `HookMiss3D` |
| CONCEITO nomeado (high ticket) | A palavra sozinha, peso 900, com a marca do espectro embaixo | CALA | `HighTicketWord` |
| FRASE FORTE que carrega a ideia | Lettering: apoio pequeno em cima, palavra grande embaixo, letra a letra | CALA | `LetteringExemplo`, `LetteringRenda` |
| NÚMERO ou percentual | Número sozinho no cartão de vidro, contando do zero até o alvo | CALA | `HundredK`, `ReturnTable` |
| ABSTRATO, ou recapitulação verbal do que a tela já mostrou | Nada. Só rosto e legenda | LIGADA | decisão declarada, não vazio (`tokens.ts:164` a `:166`) |

### A regra de exclusividade

**Uma coisa manda por vez, e quem manda cala a legenda.** Se a cena tem tipografia grande própria,
ou um número grande, a frase ocupa o canal da fala e a legenda some. Se a cena tem objeto, o
objeto não leva rótulo, porque a legenda já narra. Nunca os dois
(`tokens.ts:115` a `:129`, `memory/zeus-reels-2-padrao-visual.md` linhas 89 a 93).

### Outras decisões que já estão fechadas

| Pergunta | Resposta | Fonte |
|---|---|---|
| Onde é o `start` de uma cena? | No frame da PALAVRA ÂNCORA, nunca no início do bloco de fala | `tokens.ts:160` a `:163` |
| Posso encurtar uma cena que está longa? | Só se ela não tiver evento interno com tempo próprio e a fala que ela ilustra terminar antes do novo fim | `ERRO #330` |
| Duas cenas podem usar o mesmo componente? | Sim, quando é bookend do argumento (abre e fecha com a mesma imagem) | `MotionStage.tsx:33` a `:35` |
| Quantas marcas de espectro por vídeo? | 2 ou 3. Marca em toda palavra deixa de ser marca | `WordMark.tsx:21` |
| Objeto bonito mas que não significa a fala? | Não entra | `HighTicketWord.tsx:12` a `:14` |
| Trecho sem elemento visual óbvio? | Vira lettering. Tela vazia é defeito | `Lettering.tsx:1` a `:10` |
| A cena precisa de mais espaço embaixo? | `stage: "expanded"`, que libera 209 px encolhendo e subindo o bloco de vídeo | `tokens.ts videoBottomAt` |
| A fala termina interrompida, ou no meio da frase? | A última palavra que carrega o CONCEITO vira palavra protagonista com a marca do espectro (o dispositivo N3), a legenda cala, o resto da frase toca só em áudio, e o selo entra logo depois dela. A cauda em que a outra pessoa fala é cortada no P0b | ordem do o dono do canal, 05/09/2026, vídeo da call com o Carlos Seme ("a palavra tempo teria que ser destacada na tela com uma hierarquia do padrão conceitual de edição") |
| Qual palavra do fim vira o destaque? | A abstrata que carrega a ideia, nunca o quantificador que só a complementa: em "aprender com o TEMPO que leva muitos anos", o destaque é `tempo`, não `anos`. Escolha PENSADA, o script de mapeamento só lista as candidatas com a duração de cada uma | `docs/design-system-v2/DESIGN-SYSTEM-REELS-APPLE-v2.md` seção 6a, `scripts/mapear-redundancia.js` heurística (e) |

---

## 13. Deltas no protocolo

O que este estilo acrescenta ou muda em relação ao que já estava escrito.

| Delta | O que muda | Onde passa a valer |
|---|---|---|
| Três canais fixos e âncora dupla | Substitui a caixa de palco com base fixa e conteúdo centralizado | `tokens.ts:115` a `:141`, `MotionStage.tsx` |
| `CONTENT_H` é tinta real | Componente novo declara a altura do que DESENHA, nunca uma caixa com respiro embutido | todos os componentes de `components/icons/` |
| Mudez declarada por cena | Campo `caption` em `SceneDef`, nunca deduzido por prefixo de nome | `tokens.ts SceneDef` e `isCaptionMuted` |
| Modo `medido-suave` de legenda | Modo novo no `Captions.tsx`, sem mudar o comportamento de nenhum consumidor antigo | `Captions.tsx:9` a `:12` |
| Ênfase por registro tipográfico | Troca de fonte no lugar de troca de cor, em qualquer peça de identidade que proíbe cor solta | `Captions.tsx:285` a `:291` |
| Legenda sem vírgula | Regra nova do estilo | `Captions.tsx:353` |
| Todo número entra contando | Regra geral, sem exceção, com helper próprio | `contador.ts`, `memory/zeus-reels-2-padrao-visual.md` linhas 95 a 98 |
| Suavização nas duas pontas em tudo | `smoothInOut` vira a curva padrão de movimento; `settleSoft` fica restrita a objeto que pousa | `contador.ts:8` a `:13` |
| Palavra grande letra a letra | Dispositivo obrigatório em toda palavra protagonista | `Lettering.tsx`, `HighTicketWord.tsx:73` a `:76` |
| Trilha sai quando o selo entra | Receita de áudio própria, seção 10 | `memory/zeus-reels-2-padrao-visual.md` linhas 108 e 109 |
| Mixagem com trilha vira script | `scripts/video/mixar-trilha.js`, com instantes derivados do projeto, trava de simulação e cinco gates | o script, nascido das versões v16 a v18 |
| Este documento | Passa a ocupar o papel do `ZEUS-REELS-2-PROTOCOLO.md` citado e nunca criado | `memory/zeus-reels-2-padrao-visual.md` linha 3 |

Para o `STYLE-REGISTRY.md`: este estilo entra na tabela de estáveis, com gatilhos "reels 2",
"padrão zeus de reels", "objeto 3d", "vidro", "cubo de vidro", "tipografia integrada", "apple
conceitual" (`memory/zeus-reels-2-padrao-visual.md` seção Gatilhos de fala), doc
`STYLE-APPLE-CONCEITUAL.md`, base aprovada `HamiltonZeusReels-v18`.

---

## 14. Checklist final

Antes de entregar qualquer peça neste estilo, os 18 itens. Falhar em um só significa entrega
incompleta.

### Sincronia

1. Todo `start` de cena é o frame de uma PALAVRA da transcrição, não o início do bloco de fala.
2. Nenhum elemento visual aparece antes da fala que ele ilustra.
3. Nenhuma frase de lettering é cortada no meio pela troca de cena.
4. Evento interno de número ou rótulo cai no frame da palavra correspondente.

### Layout

5. Cada componente declara `CONTENT_H` igual à tinta real, sem respiro embutido.
6. Todo `CONTENT_H` cabe no orçamento do palco: 415 no normal, 485 no expandido.
7. Nenhuma cena tem branco grande entre o bloco de vídeo e o conteúdo.
8. Nada desce abaixo de 1632.
9. Headline de duas linhas tem linhas de tamanho parecido, sem palavra órfã na última.

### Legenda

10. O campo `caption` de cada cena bate com o que a cena mostra: frase grande e número calam,
    objeto não cala.
11. A legenda tem movimento palavra a palavra, nunca aparece pronta.
12. Nenhuma vírgula aparece na tela.
13. Nenhuma ênfase por cor. Ênfase é troca de fonte.

### Movimento

14. Todo movimento suaviza nas duas pontas. `settleSoft` só em objeto que pousa.
15. Todo número entra contando, e troca de valor acontece no mesmo elemento.
16. Cena com objeto não tem rótulo junto.

### Entrega

17. Um frame de cada beat foi olhado (`node scripts/video/qa-beats.js <Composition>`).
18. O áudio passou nos cinco gates do `mixar-trilha.js`: duração, voz preservada, batida no lugar,
    silêncio no fim, trilha saiu.

Gates automáticos que rodam antes disso, nesta ordem: `tsc --noEmit`, `choreo-lint.js`,
`pre-render-validate.js` (`docs/ZOOM-REEL-MOTION.md` seção 2, passo P6).

---

## 15. Instâncias

| Instância | Composition | Vídeo aprovado | Duração | Data | Observação |
|---|---|---|---|---|---|
| Isca de baleia contra isca de sardinha (call com o Hamilton) | `HamiltonZeusReels` | `output/03-isca-hamilton/HamiltonZeusReels-v18.mp4` | 63,00s, 3780 frames | 03 e 04/09/2026 | Instância fundadora do estilo. 18 versões |

### Histórico das versões que ensinaram alguma coisa

| Versão | O que aconteceu | Fonte |
|---|---|---|
| v08 | Reprovada com cinco motivos ao mesmo tempo, entre eles a letra azul e o estilo de outra variante | `ERRO #332` |
| v09 | Primeira aplicação do padrão Zeus Reels 2. Reprovada por espaço morto e texto duplo | `memory/zeus-reels-2-padrao-visual.md` linha 3, `output/03-isca-hamilton/LEIA-ME.md` |
| v10 | Reedição: tela nunca vazia (entraram as três cenas de lettering) e cenas com objeto perderam os rótulos | `choreography.ts:3` a `:8` |
| v11 | Reprovada pelo espaço morto acima e pelo visual adiantado em relação à fala | `tokens.ts:124` a `:126`, `:169` a `:173` |
| v12 | Reforma do layout: três canais, âncora dupla, conteúdo no topo, sincronia refeita | `tokens.ts:115` a `:129` |
| v15 | Fecho antecipado para o instante em que a fala termina, casando com a virada da trilha | `tokens.ts:212` a `:219` |
| v16 | Entrou a trilha | `output/03-isca-hamilton/LEIA-ME.md` |
| v17 | Aprovados por escrito os cinco dispositivos do estilo | `memory/zeus-reels-2-padrao-visual.md` linha 81 |
| v18 | Versão boa | `output/03-isca-hamilton/LEIA-ME.md` |

### Como replicar em outra call

1. Copiar a pasta da composition inteira com outro nome.
2. Editar só o `BRAND.ts` se a identidade mudar (cor, fonte, textos, logo).
3. Trocar `data/narration.json` (transcrição nova) e os tiles em `public/<Comp>/tiles/`.
4. Recalcular `SCENES` no `tokens.ts` e os frames no `choreography.ts` pelas novas âncoras de
   palavra. Isso não é troca de estilo, é conteúdo novo: o storyboard sempre nasce da fala de
   CADA vídeo.
5. Escolher o componente de cada beat pela árvore da seção 12.
6. Rodar os gates, o rascunho, os frames por beat, e só então o final.

Fonte do procedimento: `BRAND.ts` linhas 21 a 31, `docs/ZOOM-REEL-MOTION.md` seção 2 e 5.

---

## 16. O que a produção do PauloRuizReels acrescentou (04/09/2026)

Esta seção é o ponteiro. O detalhe vive nos documentos próprios, para este livro não inchar.

### Documentos que nasceram dessa produção

| Documento | O que resolve |
|---|---|
| `HEURISTICAS-E-FRAMEWORKS.md` | O método: três frameworks e sete heurísticas, com o gate de dez perguntas antes de entregar |
| `BIBLIOTECA-DE-MOLDES.md` | Os oito moldes de cena reaproveitáveis, com o que muda e o que permanece |
| `CATALOGO-DE-ERROS-VISUAIS.md` | Os 14 defeitos da jornada, agrupados nas cinco causas raiz |
| `PROCESSO-REEL-ZOOM.md` | Cada etapa classificada em automático, padrão ou pensado |
| `BIBLIOTECA-SFX.md` e `LOGICA-EFEITOS-SONOROS.md` | Qual som para qual movimento, com a conta de posicionamento |

### Design system de respiro, agora com número

| Situação | Número |
|---|---|
| Texto dentro de pill | 28px de padding lateral |
| Texto dentro de célula de grade | 26px em todos os lados |
| Entre blocos irmãos de grade | 18px |
| Entre círculos irmãos de raio 110 | 320px de centro a centro |
| Entre logo e selo na mesma linha | 26px |
| Entre elemento e o rótulo que o nomeia | 24px |

Altura de célula se calcula pelo PIOR caso de texto. Em grade com textos de tamanhos diferentes, o conteúdo se ancora no topo, nunca centralizado, senão os ícones deixam de dividir a mesma linha.

### Regras novas, todas com erro registrado

1. **Unicidade entre produções** (`ERRO #339`): molde se reaproveita, conteúdo nunca.
2. **Logo de terceiro nunca é desenhado** (`ERRO #340`): sempre a fonte oficial, vetorizada.
3. **Transform assado antes de gradiente** (`ERRO #341`): vetor de várias partes reinicia a cor a cada transform, e máscara lava a borda.
4. **Cor tem contexto de área** (`ERRO #342`): pastel funciona em traço fino e morre em texto cheio.
5. **Print de cada cena antes de entregar** (`ERRO #343`): existe o agente `revisor-visual-motion`, e ele é obrigatório.
6. **Lei da série** (`ERRO #344`): elemento que entra por etapas leva o mesmo tratamento visual e sonoro em todas.
7. **Volume se mede, não se ouve** (`ERRO #345`): trecho de destaque no máximo 2 a 3 decibéis acima da fala.

### O revisor obrigatório

`.claude/agents/revisor-visual-motion.md`. Renderiza um print por cena, olha todos, amplia o suspeito e reprova antes da entrega. Não existe aprovado com ressalva: ou a peça sai limpa, ou volta para conserto.
