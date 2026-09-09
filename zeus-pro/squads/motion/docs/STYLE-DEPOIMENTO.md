# Estilo DEPOIMENTO: livro de estilo

## 0. Cabeçalho

| Campo | Valor | Fonte |
|---|---|---|
| Nome do estilo | Depoimento (variante da categoria "Zoom vira Reel com motion") | `docs/ZOOM-REEL-MOTION.md` seção 5b |
| Gatilhos de fala | "depoimento do fulano", "prova social em vídeo", "o mentorado falou da mentoria", "transforma esse depoimento em reel", "vídeo de depoimento" | uso real, 02 e 03/09/2026 |
| Composition de referência | `BernardoDepoimentoReels` | `src/compositions/BernardoDepoimentoReels/index.tsx:177` |
| Depoente | Bernardo P. Küster, Mentoria VIP, call de 02/09/2026 | `components/BernardoNameTag.tsx` (texto do componente) |
| Versão aprovada | v10 | `output/02-depoimento-bernardo/LEIA-ME.md` ("Versão boa") |
| Caminho do mp4 | `squads/motion/output/02-depoimento-bernardo/BernardoDepoimentoReels-v10.mp4` | `ls` da pasta, arquivo de 10.336.765 bytes |
| Duração | 32,90s, 1974 frames, 1080x1920, 60 fps | `ffprobe` no v10: `duration=32.900000`, `nb_frames=1974`, `r_frame_rate=60/1`; código: `tokens.ts VIDEO_FRAMES = 1974` |
| Identidade | Exemplo (fundo escuro, rose gold), NÃO Zeus | `BRAND.ts` cabeçalho e `BRAND_COLORS` |

O que este livro NÃO cobre, e onde está:

| Assunto | Onde ler |
|---|---|
| Pipeline mecânico do formato (reframe, loudnorm, transcrição, gates, render) | `docs/ZOOM-REEL-MOTION.md` seção 2 |
| As 14 leis globais da categoria (hierarquia, sync por palavra, semântica, curvas, gates F1 a F7) | `docs/ZOOM-REEL-MOTION.md` seção 3 |
| Como pensar antes de gerar motion (4 passos obrigatórios) | `docs/ZOOM-REEL-MOTION.md` seção 4 |
| As 6 regras canônicas desta variante, em forma de lei | `docs/ZOOM-REEL-MOTION.md` seção 5b |
| Estilo institucional irmão (Zeus, fundo claro) | `src/compositions/ZeusTrafegoReels/` |
| Estilo Popular / Reels 2 (objeto 3D, vidro) | `memory/zeus-reels-2-padrao-visual.md` |
| Estilo Neo-Analógica | `docs/STYLE-NEOANALOGIACA.md` |
| Catálogo completo de curvas | `src/core/curves.ts` |

---

## 1. O que é e quando escolher

Uma frase: é o reel em que uma pessoa real prova alguma coisa falando, o rosto dela carrega a peça inteira, e o motion só aparece onde a fala tem imagem concreta.

Quando escolher este e não outro:

| Situação | Estilo certo | Por quê |
|---|---|---|
| Uma pessoa depõe sobre uma experiência que teve (mentoria, produto, serviço) | DEPOIMENTO | A credibilidade está no rosto e na voz dela; motion demais rouba a prova. `ZOOM-REEL-MOTION.md` seção 5b regra 1 |
| Nós explicamos um recurso, um sistema, um número nosso | Institucional (`ZeusTrafegoReels`) | Ali o produto é o protagonista, não o rosto; cabem 14 beats de motion |
| Peça de venda com objeto 3D, vidro, palavra gigante com traço de espectro | Popular / Reels 2 | Outro vocabulário visual; e frase solta no palco é PROIBIDA lá (`memory/zeus-reels-2-padrao-visual.md:75`) |
| Peça conceitual com fundo preto, grain, acento neon, 30 fps | Apple Conceitual / Neo-Analógica | Outro formato e outro público (`docs/STYLE-NEOANALOGIACA.md` seção 1) |
| Vídeo com número, gráfico ou painel de resultado que a pessoa não falou | Nenhum destes: o número não entra | `ZOOM-REEL-MOTION.md` seção 5b regra 2 |

Teste do sósia: congele um frame qualquer e reduza a uma silhueta de 200px. Se aparecer duas caixas de rosto empilhadas em cima e uma frase de texto grande embaixo, sobre fundo quase preto, é este estilo. Se aparecer objeto 3D flutuando, gráfico, painel ou qualquer coisa que não seja rosto e palavra, saiu do estilo.

---

## 2. Base herdada e desvios

A base comum do formato (1080x1920, 60 fps sobre fonte a 25 ou 30 fps, tela dividida em dois cards, palco de motion abaixo, selo de fecho, pipeline e gates) NÃO é repetida aqui. Ela vive em `docs/ZOOM-REEL-MOTION.md` seções 2, 3 e 5, e a estrutura é literalmente a mesma pasta copiada do `ZeusTrafegoReels` (o cabeçalho do `BRAND.ts` diz que só esse arquivo muda).

Só os desvios desta variante:

| Item | Base comum | Aqui | Por quê | Fonte |
|---|---|---|---|---|
| Altura do palco normal | 360 px | 480 px | Sem legenda, a faixa entre a base dos cards (996) e o topo do palco ficou livre; o texto virou o único conteúdo da tela, então ganhou área. Sobram 156px de respiro abaixo dos cards | `tokens.ts LAYOUT.stageHeightNormal` e o comentário acima dele |
| Área útil declarada | acompanha o palco | normal 480, expanded 600 | Sem legenda competindo pela faixa de baixo | `tokens.ts STAGE_SAFE` |
| Cenas expandidas | usadas quando o beat é grande | NENHUMA: todas as 7 cenas são `stage: "normal"` | Menos beats e blocos de texto que cabem inteiros no palco de 480 | `tokens.ts SCENES` (7 entradas, todas `stage: "normal"`) |
| Fundo | claro (tema Zeus) | escuro `#0a0806` | Identidade Exemplo | `BRAND.ts BRAND_COLORS.white` e `pureWhite` |
| Legenda palavra por palavra | obrigatória (lei 12 da base) | REMOVIDA por inteiro | Ordem do o dono do canal em 02/09/2026, ver seção 5 | `tokens.ts LAYOUT.captionBottom` e o comentário acima dele |
| Selo de fecho | lockup com moldura (retângulo Zeus) e anel girando | logo sozinha, sem nenhuma moldura e sem anel | Ordem do o dono do canal em 03/09/2026, ver seção 9 | `components/ExemploSealClose.tsx` cabeçalho |
| Cartão de abertura | pode existir | não existe, começa no frame 0 da fala | Regra 5 da categoria | `tokens.ts HOOK_FRAMES = 0` |
| Amplitude de áudio (`extract-amplitude.js`) | passo 4 do pipeline | não roda: não há waveform nem player nesta peça | Nenhum componente consome `amplitude.json` | pipeline em `index.tsx:10-16`, que lista os 4 passos usados, sem o de amplitude |

---

## 3. Identidade

ATENÇÃO CRÍTICA, leia antes de copiar qualquer componente daqui: neste estilo o PAPEL dos tokens de cor está INVERTIDO em relação ao estilo institucional. As chaves são as mesmas de propósito (é o contrato de replicabilidade: quem consome `COLORS.black` continua funcionando), mas o valor muda de lado. Copiar nome de token sem conferir o valor foi a causa do ERRO #332 (seção 11).

| Chave | Hex | Papel real aqui | Papel no estilo Zeus |
|---|---|---|---|
| `black` | `#f3e9e0` | tinta principal, quase branca | era preto de verdade |
| `gray900` | `#e4d2c4` | tinta secundária clara | cinza escuro |
| `gray700` | `#cbb1a0` | tinta de apoio | cinza |
| `gray600` | `#a6897a` | texto discreto: eyebrow e assinatura do selo | cinza médio |
| `gray500` | `#8a6f61` | tinta fraca | cinza claro |
| `gray400` | `#6b564a` | tinta muito fraca | cinza claríssimo |
| `gray200` | `#3c2f27` | superfície escura | quase branco |
| `gray100` | `#251d18` | bordas e preenchimentos sutis, escuro sobre escuro (borda do card de vídeo) | borda clara |
| `gray50` | `#171310` | superfície mais escura | quase branco |
| `white` | `#0a0806` | fundo do canvas, quase preto dourado | era branco |
| `pureWhite` | `#0a0806` | fundo do canvas (é o que `index.tsx` usa no `AbsoluteFill`) | era branco puro |
| `blue` | `#d4a08a` | ACENTO rose gold, único acento vivo da peça | era azul |

Fonte de todos: `BRAND.ts BRAND_COLORS`. A paleta vem de `templates/design-tokens/brands/exemplo-1.json` via `src/core/themes/generated/design-core-brands.ts` (`BRAND_EXEMPLO_1`), conforme o cabeçalho do `BRAND.ts`.

Espectro rose gold, 6 paradas cíclicas (primeira e última iguais para o giro por conic-gradient não ter costura):

| Parada | Cor | Posição |
|---|---|---|
| 1 | `#d4a08a` | 0% |
| 2 | `#f0c8b0` | 20% |
| 3 | `#e0ac8e` | 40% |
| 4 | `#b8887a` | 60% |
| 5 | `#8a6a58` | 80% |
| 6 | `#d4a08a` | 100% |

Fonte: `BRAND.ts BRAND_SPECTRUM_STOPS`. FORA DE USO nesta composition desde que o anel do fecho saiu (03/09/2026): o `ExemploSealClose.tsx` registra que o espectro e o giro por conic-gradient saíram de uso nesta peça, e ficaram guardados no módulo core para quem quiser o anel de volta. O espectro segue no arquivo de marca de propósito.

Tipografia:

| Item | Valor | Fonte |
|---|---|---|
| Família display | `'Inter', -apple-system, sans-serif` | `BRAND.ts BRAND_FONT.family` |
| Tracking apertado | `-0.022em` | `BRAND.ts BRAND_FONT.trackingTight` |
| Tracking mais apertado | `-0.03em` | `BRAND.ts BRAND_FONT.trackingTighter` |
| Família mono | `'JetBrains Mono', monospace` | `BRAND.ts BRAND_MONO.family`, carregada em `index.tsx:45`, sem uso visível na v10 |
| Pesos de Inter carregados | 400, 600, 700, 800, 900 | `index.tsx:42` |

Textos de marca:

| Slot | Texto | Fonte |
|---|---|---|
| Eyebrow (topo) | `EXEMPLO · MENTORIA VIP` | `BRAND.ts BRAND_TEXT.eyebrow` |
| Wordmark do selo | `EXEMPLO` | `BRAND.ts BRAND_TEXT.sealWordmark` |
| Assinatura do selo | `MENTORIA VIP` | `BRAND.ts BRAND_TEXT.sealSignature` |
| Etiqueta de nome | `Bernardo P. Küster` | `components/BernardoNameTag.tsx` (texto literal do componente) |

Logo oficial: `BernardoDepoimentoReels/img/exemplo-logo-rosegold.png` (`BRAND.ts BRAND_LOGO_SRC`), símbolo puro (escudo, M e tridente), sem texto. REGRA MARCIAL: jamais recriar a logo em código (`docs/rules-on-demand/exemplo-logo-rule.md`, citada dentro do próprio `BRAND.ts`). O wordmark "EXEMPLO" abaixo dela é tipografia em código, não faz parte do arquivo de imagem.

---

## 4. Grade da tela

Canvas de 1080 x 1920 (`tokens.ts LAYOUT.canvasW` e `canvasH`). Canais verticais, de cima para baixo:

| Faixa (px) | O que ocupa | Conta e fonte |
|---|---|---|
| 0 a 160 | zona morta do topo (câmera, notificações do app) | `src/core/layout.ts SAFE.topDeadEnd = 160` |
| 96 | eyebrow "EXEMPLO · MENTORIA VIP" | `index.tsx:74` (`top: 96`). Observação registrada: este valor fica ACIMA do `topDeadEnd = 160` da grade global; foi aprovado assim na v10, não mexer sem ordem |
| 180 a 580 | card de vídeo do o dono do canal | `LAYOUT.cardTop = 180`, `cardH = 400` |
| 580 a 596 | respiro entre os cards | `LAYOUT.cardGap = 16` |
| 596 a 996 | card de vídeo do Bernardo, com a etiqueta de nome dentro | `cardTop + cardH + cardGap = 596`, mais `cardH = 400` |
| 996 a 1152 | respiro vazio, 156 px | `1152 - 996`, conta escrita no comentário de `LAYOUT.stageHeightNormal` |
| 1152 a 1632 | PALCO de motion, 480 px de altura | `top = stageBottomY - height = 1632 - 480` (`index.tsx:152`) |
| 1632 a 1920 | zona morta da base (UI do Instagram e TikTok) | `src/core/layout.ts SAFE.bottomDeadStart = 1632`, usado em `LAYOUT.stageBottomY` |

Horizontal: os cards têm 940 px de largura (`LAYOUT.cardW`) e ficam centrados, ou seja, começam em 70 px, conta `(1080 - 940) / 2` feita em `index.tsx:127`. A faixa horizontal útil da grade global é 88 a 992 (`layout.ts SAFE.marginX = 88`).

Palco expandido: existe no código (`stageHeightExpanded = 620`, `STAGE_SAFE.expanded = 600`, `videoShiftYExpanded = -70`, `videoScaleExpanded = 780 / 940`), com a transição em 68 frames pela curva `smoothInOut` (`index.tsx:58`). NUNCA dispara nesta peça, porque as 7 cenas são todas `normal`. É código herdado, mantido de propósito para replicabilidade: não apagar, não usar sem decidir.

---

## 5. Legenda

Não existe legenda nesta peça. Foi removida por inteiro em 02/09/2026, por ordem do o dono do canal. A citação está no próprio código, no comentário acima do token que sobrou:

> "a legenda palavra-por-palavra SAIU da peça (ordem do o dono do canal: as frases em destaque carregam o texto sozinhas)"
> (`tokens.ts`, comentário de `LAYOUT.captionBottom`)

Consequências, em ordem:

1. As frases em destaque no palco passaram a ser o único texto da tela. Por isso o palco cresceu de 360 para 480 (seção 2) e por isso todo bloco de fala virou um bloco de texto próprio (seção 6).
2. O módulo central de legenda (`src/modules/text-system/Captions.tsx`, lei 12 da base) não é importado em lugar nenhum desta composition.
3. Registro morto: `LAYOUT.captionBottom = 780` continua no arquivo, sem nenhum consumidor. Ele fica ali só como registro de onde a legenda ficava. Não usar como referência de posição para nada novo.

Regra que nasce daqui, e que o estilo Popular confirma do outro lado: frase grande e legenda nunca dividem a mesma tela. No Popular a frase cala a legenda naquele beat (`memory/zeus-reels-2-padrao-visual.md`); aqui a frase calou a legenda no vídeo inteiro.

---

## 6. Storyboard de referência

Sete cenas. A âncora é sempre o frame da PALAVRA, nunca o início do bloco de fala (lei 2 da base). "Nominal" é a distância em frames até a próxima âncora, e é o número que alimenta `ext()` em `choreography.ts:23`.

Transcrição completa da fala (`tokens.ts`, comentário do bloco `SCENES`, vinda de `data/narration.json`): "As escolhas principais foram sanadas, eu entrei achando que era muito mais complicado, muito mais difícil. Porém, a estrutura é viável, é executável em um prazo bom para mim. E são modelos que se encaixam muito na minha estrutura e acredito que podem funcionar muito bem. E os resultados também parecem ser animadores. E agradecer o o dono do canal. Muito obrigado." São 59 palavras e a fala termina em 29,99s (frame 1799).

| # | Cena | Âncora | Fala coberta | Componente | Palco | Entrada | Saída | Nominal | Por quê |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `opening-sanadas` | frame 0, 0,00s | "As dúvidas principais foram sanadas" (i0 a i4) | `SanadasQuote` | normal | `settleSoft`, 60f, vem de baixo | `premium`, 40f, sai pela esquerda, começa no frame local 340 | 370 | Bloco completo desde o primeiro frame, nada de linha solta esperando a próxima (`choreography.ts:48-49`) |
| 2 | `opening-dificil` | palavra "muito", i13, 6,22s, frame 373 (a cena começa em 370) | "eu entrei achando que era muito mais difícil" | `OpeningContrast` | normal | `settleSoft`, 60f, vem de cima | `premium`, 40f, sai pela direita, frame local 229 | 259 | A virada de expectativa; o bloco inteiro entra montado de uma vez (`choreography.ts:64-66`) |
| 3 | `quote-estrutura` | palavra "a", i17, 10,48s, frame 629 | "a estrutura é viável, executável em um prazo bom pra mim" | `PullQuote` | normal | `settleSoft`, 90f, vem de baixo | `premium`, 50f, sai pela esquerda, frame local 497 | 527 | É "a virada da fala, a frase que resume o depoimento inteiro", e vira pull quote tipográfica (`choreography.ts:80-82`) |
| 4 | `pass-modelos` | palavra "E", i29, 19,27s, frame 1156 | "E são modelos que se encaixam muito na minha estrutura e acredito que podem funcionar muito bem" | `ModelosQuote` | normal | `settleSoft`, 80f, vem de cima | `premium`, 44f, sai pela direita, frame local 353 | 383 | Trecho abstrato: vira palavra, nunca gráfico. Ver a nota de passthrough abaixo |
| 5 | `trophy-resultados` | palavra "resultados", i48, 25,65s, frame 1539 | "os resultados também parecem ser animadores" | `TrophyMoment` | normal | `settleSoft`, 70f, vem de baixo | `dramatic`, 36f, sai pela esquerda, frame local 134 | 164 | Prova social concreta, vira troféu (`choreography.ts:114-115`); é a única fala com imagem literal |
| 6 | `closing-thanks` | palavra "E", i53, 28,39s, frame 1703 | "E agradecer o o dono do canal. Muito obrigado." | `ThanksQuote` | normal | `settleSoft`, 50f, vem de cima | `dramatic`, 30f, sai pela direita, frame local 95 (absoluto 1798) | 121 | Fecho da fala; sai no frame 1798, logo antes de a fala terminar de verdade em 1799 |
| 7 | `exemplo-seal` | frame 1824, 30,40s | nenhuma (silêncio) | nenhum no palco; `ExemploSealClose` é renderizado à parte | normal | ver seção 9 | não tem saída (`isLast`) | 150 | PASSTHROUGH de palco: o selo de marca ocupa a tela inteira, fora do palco de ícones, mesmo padrão do `ZeusSealClose` (`choreography.ts:146-147`) |

Fontes das colunas: âncora, fala e palco em `tokens.ts SCENES` (linhas 120 a 140); componente em `components/MotionStage.tsx SCENE_COMPONENTS`; entrada, saída e nominal em `choreography.ts:30-40` e nos blocos de cena de `choreography.ts:46-154`. Os frames locais de saída saem da função `ext()` (`choreography.ts:23-27`): `dur = nominal + 10` de sobreposição, e `exitF = dur - margem`, com `margem = min(40, max(24, round(nominal * 0,3)))`.

Passthrough é decisão, não vazio:

- Na v10 só UMA cena é passthrough de palco: `exemplo-seal` (`elements: []` em `choreography.ts:152`). Ela não é vazio: a tela inteira é o selo de marca, renderizado fora do palco por `index.tsx:170-172`.
- A cena 4 (`pass-modelos`) mantém o nome "pass" por herança da versão anterior, mas HOJE TEM ELEMENTO (`ModelosQuote`). O nome ficou; o comportamento mudou. Não confiar no nome, conferir `choreography.ts`.
- O princípio continua valendo e é o coração da variante (regra 4 da seção 5b): trecho abstrato demais para virar imagem sem inventar dado NÃO ganha gráfico, painel nem número. Aqui a saída escolhida foi virar palavra dele em tipografia, que é o único dispositivo que não inventa nada.

Comentários DEFASADOS encontrados no código, registrados para não enganar quem ler depois:

| Onde | O que o comentário diz | O que o código faz |
|---|---|---|
| `tokens.ts` linhas 25 a 31 | que a duração usada é 2240 frames (37,33s) | `VIDEO_FRAMES = 1974` (32,90s), confirmado no `ffprobe` do v10 |
| `tokens.ts` linhas 9 a 14, e os comentários de `PullQuote.CONTENT_H` e de `TrophyMoment.CONTENT_H` | palco normal de 360px | `LAYOUT.stageHeightNormal = 480` e `STAGE_SAFE.normal = 480` |
| `tokens.ts` linhas 111 a 118 | que dos 4 blocos de ideia, só 2 ganham cena | 6 das 7 cenas têm elemento (`MotionStage.tsx SCENE_COMPONENTS` tem 6 entradas) |
| `choreography.ts` linhas 4 a 7 e `MotionStage.tsx` linhas 1 a 5 | que só 2 das 6 cenas têm elemento, e as outras 4 são passthrough | 7 cenas, 6 com elemento, 1 passthrough |
| `index.tsx` linhas 94 a 96 | que `VIDEO_FRAMES` vale 2240 | vale 1974 |

Todos esses comentários são de 02/09/2026 e ficaram para trás na reforma de 03/09, quando a abertura virou dois blocos e o fecho encurtou. O CÓDIGO vence o comentário, sempre.

---

## 7. Catálogo de componentes

### Regra comum a todos os componentes de palco

Nenhum deles usa `ownsMotion`. Nenhum tem timing dentro de si, de propósito: quem anima entrada e saída é o palco, via `applyChoreo` (`components/MotionStage.tsx`, e o cabeçalho do `PullQuote.tsx` diz isso literalmente). Todo componente exporta `CONTENT_H`, que o gate `palco-overflow` do `choreo-lint` cruza contra o `STAGE_SAFE` (lei 8 da base).

### PullQuote (a assinatura do estilo)

Arquivo: `components/icons/PullQuote.tsx`. `CONTENT_H = 400`.

Anatomia, camada por camada:

| Camada | Valor | Fonte |
|---|---|---|
| Marca de aspas | tamanho 92, peso 800, cor `COLORS.blue` (rose gold), entrelinha 1, margem de 8 abaixo | `PullQuote.tsx`, bloco das aspas |
| Corpo da frase | tamanho 68, peso 700, tracking `-0.022em` (`FONT.trackingTight`), entrelinha 1,14, cor `COLORS.black` (tinta clara), centralizado | `PullQuote.tsx`, bloco do corpo |
| Largura do bloco | 84% do palco. O `PullQuote` usa 88%, os irmãos usam 84% | `PullQuote.tsx` (`width: "88%"`); `SanadasQuote`, `ModelosQuote` e `ThanksQuote` (`width: "84%"`) |
| Ênfase | UMA palavra em rose gold dentro da frase, nunca mais de uma | `PullQuote.tsx`: "viável" em `COLORS.blue` |
| Quebra de linha | manual, com `<br>`, três linhas equilibradas | `PullQuote.tsx` |

Texto na v10: "A estrutura é viável, / executável num prazo / bom pra mim."

Por que este dispositivo existe: regra 3 da seção 5b, o visual é a palavra dela. Sem gráfico e sem ícone, a fala carrega a cena sozinha, e não há como inventar dado numa frase que a pessoa disse.

Quando usar: na frase que resume o depoimento inteiro. Quando NÃO usar: fora desta variante. Pull quote é dispositivo do DEPOIMENTO e de nenhuma outra, conforme `memory/zeus-reels-2-padrao-visual.md:75`, que registra a frase solta ocupando o palco como dispositivo da variante DEPOIMENTO (`BernardoDepoimentoReels`), nunca do padrão institucional.

### SanadasQuote

Arquivo: `components/icons/SanadasQuote.tsx`. `CONTENT_H = 380`. Mesma anatomia do `PullQuote` (aspas 92/800 rose, corpo 68/700, tracking `-0.022em`, entrelinha 1,14, largura 84%), duas linhas, com "sanadas" em rose gold. Texto: "as dúvidas principais / foram sanadas."

Criado em 03/09/2026 para acabar com a frase perdida (seção 11). Usar quando a primeira frase da fala já for uma afirmação fechada.

### OpeningContrast

Arquivo: `components/icons/OpeningContrast.tsx`. `CONTENT_H = 380`. É o único bloco com TRÊS camadas de texto:

| Camada | Valor |
|---|---|
| Aspas | 92, peso 800, rose gold |
| Linha de contexto | tamanho 40, peso 600, tracking `0.01em`, cor `COLORS.gray600`, margem 10 abaixo: "eu entrei achando que era" |
| Frase grande | tamanho 76, peso 800, tracking `-0.022em`, entrelinha 1,14: "muito mais" em tinta clara, "difícil." em rose gold |

Por que a linha de contexto existe e não pode sair: a auditoria adversarial de 02/09/2026 reprovou isolar "muito mais difícil", porque sozinha a frase lê como veredito sobre a mentoria, e não como o que ele ACHAVA antes de entrar. A linha pequena acima protege o sentido (cabeçalho do próprio arquivo). Regra que fica: em depoimento, frase recortada que muda de sentido fora de contexto SEMPRE carrega a linha de contexto junto.

### ModelosQuote

Arquivo: `components/icons/ModelosQuote.tsx`. `CONTENT_H = 380`. Mesma anatomia do `PullQuote`: corpo 68/700, largura 84%, duas linhas, "estrutura" em rose gold. Texto: "se encaixam muito / na minha estrutura."

### ThanksQuote

Arquivo: `components/icons/ThanksQuote.tsx`. `CONTENT_H = 400`. Corpo em tamanho 84, o maior da peça, porque são só duas palavras; peso 700, largura 84%. "Muito" em tinta clara, "obrigado." em rose gold.

Registro do cabeçalho do arquivo: o peso do corpo foi ajustado para 700 porque a auditoria pegou 800 como desvio do padrão de referência (ver seção 11).

### TrophyMoment (o único glifo da peça)

Arquivo: `components/icons/TrophyMoment.tsx`. `CONTENT_H = 300`.

| Item | Valor | Conta |
|---|---|---|
| Glifo | `EXEMPLO_TROFEU`, glifo oficial nº 11 da biblioteca elegante da Exemplo (`src/modules/exemplo-icons`) | import do arquivo |
| Escala | `GLYPH_SCALE = 7.2` | `TrophyMoment.tsx` |
| Tamanho na tela | 172,8 x 158,4 px | `24 * 7,2` por `22 * 7,2`, viewBox `0 -1 24 22` |
| Compensação de traço | `strokeWidth = STROKE.regular / GLYPH_SCALE`, ou seja `3 / 7,2 = 0,4167` em unidades de viewBox | `TrophyMoment.tsx`, e `STROKE.regular = 3` em `tokens.ts` |
| Traço na tela | 3 px reais, porque a divisão cancela a escala | lei 9 da base: traço em pixel de tela, sempre |
| Cor do traço | `COLORS.blue` (rose gold), sem preenchimento (`fill="none"`) | `TrophyMoment.tsx` |
| Rótulo | "Resultados animadores.", tamanho 44, peso 700, tracking `0.02em`, tinta clara, gap de 24 acima | `TrophyMoment.tsx` |

Por que o glifo entra aqui e em nenhum outro lugar: "resultados animadores" é a única fala com imagem literal e concreta. Regra 3 da seção 5b: glifo só quando a fala é literal, nunca decorativo. E ele vem da biblioteca oficial, nunca desenhado solto (lei 11 da base).

### BernardoNameTag (a etiqueta de nome)

Arquivo: `components/BernardoNameTag.tsx`.

| Item | Valor |
|---|---|
| Entra no frame | 14 (`START_F = 14`) |
| Duração da entrada | 32 frames, vindo da esquerda, distância 60 px |
| Sai no frame | 194 (`EXIT_F = 194`), saída pela esquerda, 60 px, 28 frames |
| Tempo em tela | cerca de 3 segundos de leitura, 180 frames entre entrada e saída (comentário do próprio arquivo) |
| Traço de acento | 40 x 3 px, raio 2, cor `COLORS.blue`, cresce por `scaleX` de 0 a 1 nos 20 primeiros frames locais, com origem na esquerda |
| Caixa do nome | fundo `rgba(10,8,6,0.72)`, raio 10, padding 8 por 16, texto tamanho 24, peso 700, tracking -0,2, tinta clara |
| Posição | `absolute`, 20 px da esquerda e 20 px do fundo DO CARD |

Por que é local ao card e não do canvas: o módulo de tela cheia (`src/modules/lower-thirds/SpeakerLowerThird.tsx`) posiciona pelo grid do canvas inteiro, a 288 px do fundo dos 1920 px (`SAFE.deadZoneCompensation`). Num card de 940 x 400 dentro de tela dividida, essa conta cai no terço SUPERIOR do card, não embaixo dele. Por isso o card do Bernardo é embrulhado num `div` com `position: relative` do tamanho exato do card (`index.tsx:141`) e a etiqueta se posiciona dentro dele. É a regra 5 da seção 5b, virada em código.

Sem cargo, de propósito: decisão do o dono do canal em 02/09/2026 (cabeçalho do arquivo) e regra 6 da seção 5b, que proíbe inventar credencial.

### VideoCard

Arquivo: `components/VideoCard.tsx`. Tile mudo (`OffthreadVideo` com `muted`), raio 24, sombra `0 8px 28px rgba(0,0,0,0.10)`, borda de 1 px em `COLORS.gray100` (`#251d18`, escuro sobre escuro), `objectFit: cover`.

Lei do squad registrada no arquivo: a trilha entra por ffmpeg DEPOIS do render, nunca pelo componente de áudio do Remotion dentro da composition.

Entrada da fileira de cards: vem de cima, 30 px de distância, 58 frames (`index.tsx:105`). Desmonta no frame 1914 (`VIDEO_UNMOUNT_F = 1824 + 20 + 70`, `index.tsx:97`).

### Eyebrow

Renderizado em `index.tsx:61-90`. Tamanho 18, peso 600, tracking 6, cor `COLORS.gray600`, centralizado, `top: 96`. Aparece com fade de 0 a 46 frames (`easyEase`) e some entre os frames 1844 e 1900 (`sealStartF + 20` a `sealStartF + 76`), ou seja, sai junto com os cards, deixando a tela só para o selo.

---

## 8. Movimento e suavização

Curva por papel. Todo bezier é literal, tirado de `src/core/curves.ts`:

| Papel | Curva | Bezier | Onde e com quantos frames |
|---|---|---|---|
| Entrada de qualquer bloco no palco | `settleSoft` | `cubic-bezier(0.12, 0.4, 0.8, 1)` | as 6 cenas com elemento, entre 50 e 90 frames: 60, 60, 90, 80, 70, 50 (`choreography.ts` linhas 58, 74, 91, 108, 124, 140) |
| Saída de bloco de texto | `premium` | `cubic-bezier(0.33, 0, 0.15, 1)` | cenas 1 a 4, entre 40 e 50 frames: 40, 40, 50, 44 |
| Saída dos dois últimos blocos, e a saída dos cards | `dramatic` | `cubic-bezier(0.7, 0, 0.1, 1)` | cenas 5 e 6, com 36 e 30 frames; card de vídeo, 70 frames (`index.tsx:112`) |
| Fade de opacidade e transições simples | `easyEase` | `cubic-bezier(0.33, 0, 0.67, 1)` | eyebrow, traço da etiqueta de nome, opacidade do wordmark e da assinatura do selo |
| Expansão de palco | `smoothInOut` | `cubic-bezier(0.45, 0, 0.15, 1)` | `index.tsx:58`, 68 frames. Nunca dispara nesta peça |
| Selo de fecho | `cinematic` | `cubic-bezier(0.16, 1, 0.3, 1)` | escala da logo, e o desfoque e o deslocamento do wordmark e da assinatura (`ExemploSealClose.tsx`) |

Por que `settleSoft` na entrada, em linguagem simples: as curvas antigas percorriam mais de 90% do caminho na metade do tempo, então o movimento não desacelerava, ele PARAVA e ficava o resto do tempo esperando. Aumentar a duração só aumentava o tempo parado. A `settleSoft` ainda tem 23,4% do movimento para fazer depois de 60% do tempo, e é aí que o olho VÊ a chegada suave (`core/curves.ts`, comentário das curvas `settle` e `settleSoft`; lei 6 da base).

Por que as entradas aqui são MAIS longas que no institucional: beats de depoimento são mais longos porque há menos elementos disputando o mesmo tempo, então a entrada pode respirar mais. São 90 frames na frase principal, que fica 8,8 segundos em tela (`choreography.ts`, cabeçalho, linhas 12 a 15).

Direção de entrada e saída: vem de `alternateDir(i)`, que percorre o ciclo `["bottom", "left", "top", "right"]` (`src/core/choreo.ts:134`). Os índices usados são 0 a 11, em ordem, então as direções reais são:

| Cena | Entrada real | Saída real |
|---|---|---|
| 1 `opening-sanadas` | de baixo (índice 0) | pela esquerda (1) |
| 2 `opening-dificil` | de cima (2) | pela direita (3) |
| 3 `quote-estrutura` | de baixo (4) | pela esquerda (5) |
| 4 `pass-modelos` | de cima (6) | pela direita (7) |
| 5 `trophy-resultados` | de baixo (8) | pela esquerda (9) |
| 6 `closing-thanks` | de cima (10) | pela direita (11) |

DEFASAGEM registrada: os comentários de `choreography.ts:91`, `:92`, `:124` e `:125` dizem "top" e "right" para os índices 4, 5, 8 e 9, mas o ciclo devolve "bottom" e "left" nesses índices. O comportamento na v10 é o da tabela acima; o comentário é que está errado.

Distâncias: nenhum elemento de palco declara `distance`, então valem os padrões de `MOTION_LEGACY` (`src/core/tokens.ts`): entrada de 80 px, saída de 1200 px, pico de desfoque de 10 px na entrada e 18 px na saída, e escala final de 0,94 na saída (`src/core/primitives.ts:48-81`).

Sobreposição entre cenas: cada cena dura o nominal mais 10 frames (`OVERLAP = 10`, `choreography.ts:21`). É esse encavalamento que faz o bloco de saída ainda estar saindo quando o próximo já começa a entrar, sem tela vazia entre eles.

DESVIO CONHECIDO, aprovado assim: o `ExemploSealClose` ainda usa `cinematic` (`cubic-bezier(0.16, 1, 0.3, 1)`), que é justamente a curva de cauda curta reprovada no estilo Popular por não desacelerar de verdade. Foi aprovada assim na v10. NÃO MEXER sem ordem explícita do o dono do canal: mudar a curva do fecho muda a sensação do último segundo da peça, que é o que fica na cabeça de quem assiste.

---

## 9. Fecho

Componente: `components/ExemploSealClose.tsx`, renderizado FORA do palco, direto em `index.tsx:170-172`, com `startFrame = 1824 + 8 = 1832`.

Tamanho da logo: `SEAL_SIZE = 156` px de largura, altura automática. O comentário do arquivo dá o motivo: sem moldura ao redor, a logo cresce um pouco para manter presença.

Sequência em frames locais (some 1832 para chegar ao frame absoluto):

| Momento | Frames locais | Absolutos | O que acontece |
|---|---|---|---|
| Logo aparece | 0 a 50 | 1832 a 1882 | opacidade por mola (`makeLegacySpring`, perfil `s100d14m09`, 50 frames) e escala de 0,9 para 1 com `cinematic` |
| Wordmark "EXEMPLO" | 43 a 76 (opacidade e desfoque), 43 a 83 (deslocamento) | 1875 a 1915 | opacidade 0 a 1, desfoque de 10 px a 0, sobe 18 px. Tamanho 40, peso 700, tracking `0.04em`, tinta clara, margem 26 abaixo da logo |
| Assinatura "MENTORIA VIP" | 71 a 105 (opacidade e desfoque), 71 a 112 (deslocamento) | 1903 a 1944 | opacidade 0 a 1, desfoque de 8 px a 0, sobe 14 px. Tamanho 17, peso 600, tracking `0.16em`, cor `gray600`, margem 8 abaixo do wordmark |
| Leitura limpa | 112 a 142 | 1944 a 1974 | 30 frames (0,5s) com tudo parado, antes do corte |

Em paralelo, os cards de vídeo saem para cima entre os frames 1844 e 1914 (`exitTo` com 900 px e curva `dramatic`, `index.tsx:112`) e o eyebrow some entre 1844 e 1900. Ou seja: quando o wordmark aparece, a tela já está limpa.

Histórico do fecho, com as citações (cabeçalho do `ExemploSealClose.tsx`):

| Data | O que era | O que virou | Citação |
|---|---|---|---|
| 27/08/2026 | nasceu com retângulo arredondado, padrão Zeus | | herdado do `ZeusSealClose` |
| 02/09/2026 | retângulo | anel CIRCULAR girando | "o o dono do canal pediu pra tirar o quadrado" |
| 03/09/2026 | anel circular | nada: só a logo, o wordmark e a assinatura | "no final tem que tirar o circulo ao redor da logo" |

Efeito colateral registrado: com o anel fora, o espectro rose gold e o giro por conic-gradient saíram de uso nesta composition, e ficaram guardados no módulo core para quem quiser o anel de volta.

Por que o fecho encurtou: em 02/09 o selo tinha 390 frames (6,5s). Passou para 150 frames porque a revelação inteira leva 112 frames, e sobrava tempo demais de tela parada. A peça fecha logo depois do "obrigado" (`choreography.ts:35-38`).

---

## 10. Áudio

Só voz. Sem música de fundo na v10.

| Item | Valor | Fonte |
|---|---|---|
| Como entra | por ffmpeg, DEPOIS do render, nunca pelo componente de áudio do Remotion | cabeçalho de `components/VideoCard.tsx` |
| Script obrigatório | `node scripts/video/mixar-audio.js <video.mp4> [audio.wav]` | `scripts/video/mixar-audio.js` |
| Arquivo de voz | `public/<Composition>/audio-final.wav`, achado pelo nome do vídeo se não for passado | mesmo script |
| `apad` | OBRIGATÓRIO, não é opcional | mesmo script |
| Conferência | o script compara a duração final com a do vídeo de entrada e REPROVA se não bater, com tolerância de 0,2s | `TOLERANCIA_S = 0.2` |
| Bitrate da voz | 256k AAC, nunca o padrão de cerca de 128k | `docs/ZOOM-REEL-MOTION.md` seção 2, passo 12 |
| Preparo da voz | ffmpeg loudnorm em 2 passagens (highpass 80hz, afftdn, loudnorm) | `index.tsx:12` e `ZOOM-REEL-MOTION.md` seção 2 |

Por que o `apad` é lei: sem ele, o `-shortest` corta o vídeo no fim da FALA, não no fim do vídeo. Nestas peças o vídeo é mais longo que a fala, porque o fecho é imagem sem voz, então o corte come o selo inteiro. Já aconteceu: comeu 3,9 segundos de um reel, e o defeito é silencioso, porque o arquivo abre, toca e parece certo (ERRO #329, 03/09/2026, documentado no cabeçalho do próprio script).

Nesta peça o risco é concreto: a fala termina no frame 1799 e o vídeo vai até 1974. São 175 frames, 2,9 segundos de imagem sem voz. Sem `apad`, o fecho inteiro morre.

---

## 11. Erros cometidos

| Erro | O que aconteceu | Citação | Correção | Regra que ficou |
|---|---|---|---|---|
| Frase perdida | A abertura era uma cena só: uma linha pequena ("eu entrei achando que era") ficava sozinha no meio do nada por cerca de 6 segundos, esperando a frase grande chegar | "Na tela isso lia como frase perdida, fora do padrão dos outros blocos (fala do o dono do canal)" (`components/icons/OpeningContrast.tsx`, cabeçalho) | Em 03/09/2026 a abertura virou DOIS blocos completos: `SanadasQuote` (frame 0) e `OpeningContrast` (frame 370). A revelação em estágios saiu, e quem anima a entrada passou a ser o palco, como em todos os outros blocos | Cada trecho da fala tem bloco próprio, completo, montado, entrando de uma vez. Nunca uma linha órfã pendurada esperando o resto |
| Peso 800 fora do padrão | O corpo do `ThanksQuote` estava com peso 800, e o componente de referência (`PullQuote`) usa 700 | o cabeçalho do `ThanksQuote.tsx` registra que a auditoria pegou o 800 como desvio do padrão de referência | Peso do corpo ajustado para 700, igual ao irmão | Bloco de texto novo COPIA a escala do componente de referência da peça, não inventa peso próprio. Auditoria adversarial roda antes de aprovar |
| ERRO #332 (nasceu deste estilo, machucou outro) | O reel do Hamilton foi reprovado com cinco motivos ao mesmo tempo, entre eles "uma letra azul que ele nunca pediu" e "o estilo do Bernardo (frases soltas na tela)" quando ele tinha pedido o estilo da Carol | "naquela variante, o slot de cor é rosegold sobre fundo escuro, então nunca aparece azul; na nossa, o mesmo slot vale azul sobre fundo branco. Um token que estava morto no vídeo aprovado acordou no nosso sem ninguém decidir isso" (`memory/erros-aprendidos.md:1622`) | Os três componentes de frase solta foram arquivados, o azul saiu, e o estilo Popular virou documento próprio (`memory/zeus-reels-2-padrao-visual.md`) | Componente copiado de outra variante da mesma família só entra depois de comparar os DOIS arquivos de marca lado a lado, token por token. E dispositivo característico de uma variante, como a frase solta desta, não atravessa para outra sem ordem explícita |

O ERRO #332 é a razão de a seção 3 deste livro trazer hex E papel de cada chave: aqui `blue` não é azul, é rose gold, e `black` não é preto, é tinta clara.

---

## 12. Heurísticas de decisão

Árvore, na ordem. Rodar para CADA bloco de ideia da fala, nunca para palavra solta:

1. A fala cita um objeto concreto e literal, como troféu, calendário ou xícara? Então GLIFO da biblioteca oficial da Exemplo (`src/modules/exemplo-icons`), com compensação de traço. Se não existir glifo pronto, desenhar o traçado no mesmo estilo de linha da biblioteca. Nunca forma geométrica abstrata no lugar de objeto concreto (lei 3b da base).
2. Não é objeto, mas a frase é forte e resume alguma coisa? Então PULL QUOTE: as palavras dele, grandes, com UMA palavra em rose gold.
3. A frase recortada muda de sentido fora do contexto? Então carregar a linha de contexto pequena acima, como no `OpeningContrast`. Nunca isolar um pedaço que vira outro significado.
4. É abstrato e não dá para virar imagem sem inventar dado? Então PASSTHROUGH: rosto e nada mais no palco. Isso é decisão, não vazio (regra 4 da seção 5b).
5. Em qualquer ponto: a pessoa disse esse número? Se não disse, o número NÃO ENTRA. Nem painel, nem gráfico, nem porcentagem, nem valor em dinheiro. Depoimento com métrica fabricada em tela é fraude visual, e o valor da peça é a credibilidade de quem fala (regra 2 da seção 5b).
6. Nunca dois elementos disputando atenção no mesmo instante: um beat, um protagonista (lei 1 da base).

Densidade de referência, medida na v10:

| Métrica | Valor |
|---|---|
| Duração | 32,90s |
| Cenas | 7 |
| Cenas com elemento no palco | 6 |
| Cenas passthrough de palco | 1 (`exemplo-seal`, que na prática é o selo em tela cheia) |
| Glifos usados | 1 (troféu) |
| Blocos de texto | 5 |
| Palavras da fala | 59 |
| Média de tempo por cena | cerca de 4,7s |

Regra de bolso: num depoimento de cerca de 30 segundos, entre 5 e 7 beats, no máximo 1 glifo, e o resto é a palavra dele. Mais beats que isso, o rosto deixa de ser o protagonista e a prova social se perde.

---

## 13. Deltas no protocolo

O protocolo P0 a P11 é o da seção 2 de `docs/ZOOM-REEL-MOTION.md`. Só o que MUDA neste estilo:

| Passo | Base | Delta desta variante |
|---|---|---|
| P0 (preparo, antes de tudo) | copiar a pasta da composition e trocar `BRAND.ts` | ATENÇÃO REDOBRADA: neste estilo o papel dos tokens de cor está invertido (`black` é tinta clara, `blue` é rose gold, `white` é fundo escuro). Antes de reaproveitar QUALQUER componente daqui, ou daqui para fora, rodar `grep` pelo nome dos tokens de cor nos dois arquivos de marca e confirmar que significam a mesma coisa nos dois contextos. É o `How to apply` do ERRO #332 |
| P1 reframe | igual | igual: `reframe-zeus.py`, calibração não se mexe sem ordem |
| P2 loudnorm | igual | igual |
| P3 transcrição | igual | igual, com conferência palavra por palavra (aqui "Alisson" virou "o dono do canal", `index.tsx:13`) |
| P4 `extract-amplitude.js` | obrigatório | NÃO RODA. Não há waveform nem player de áudio nesta variante, então não há consumidor de `data/amplitude.json` |
| P5 montar `SCENES` | 1 beat por ideia | menos beats: entre 5 e 7 numa peça de 30s, e todos em palco `normal` |
| P6 `choreography.ts` | 1 elemento hero por cena, curvas `settle` ou `settleSoft` | igual, com entradas MAIS longas, de 50 a 90 frames. E SEM LEGENDA: não importar `modules/text-system/Captions.tsx`, não posicionar nada pelo `captionBottom` |
| P7 gates | `tsc --noEmit`, `choreo-lint.js`, `pre-render-validate.js`, nesta ordem | igual. O `palco-overflow` compara `CONTENT_H` contra `STAGE_SAFE.normal = 480`, não 360 |
| P8 render rascunho | igual | `node scripts/render.js BernardoDepoimentoReels draft 02-depoimento-bernardo` |
| P9 frames de verificação por medição | igual | igual |
| P10 `qa-frames.js` e `qa-approve.js`, F1 a F7 | igual | F6 (legenda não cruza elemento) não se aplica: não há legenda |
| P11 render final | igual | `node scripts/render.js BernardoDepoimentoReels final 02-depoimento-bernardo` (`output/02-depoimento-bernardo/LEIA-ME.md`) |
| P12 mixagem | voz 256k, música opcional | só voz, via `node scripts/video/mixar-audio.js`, com `apad` e conferência de duração (seção 10) |

---

## 14. Checklist final

Antes de chamar qualquer peça deste estilo de pronta, cada item tem que ser verificável, não achismo:

1. `tsc --noEmit` passou, `choreo-lint.js` passou, `pre-render-validate.js` passou.
2. Todo componente de palco exporta `CONTENT_H`, e nenhum passa de `STAGE_SAFE.normal = 480`.
3. Nenhum número, porcentagem, valor em dinheiro ou gráfico apareceu na tela sem que a pessoa tenha dito aquilo na fala. Conferir contra `data/narration.json`.
4. Nenhum cargo nem credencial na etiqueta de nome, a não ser que o próprio depoente ou o o dono do canal tenha informado o cargo exato.
5. A etiqueta de nome está DENTRO do card do falante, em wrapper `position: relative` do tamanho do card, não a 288 px do fundo do canvas.
6. Toda entrada de palco usa `settleSoft`, entre 50 e 90 frames. Nenhuma entrada com `cinematic` nem com curva de cauda curta.
7. Nenhuma frase recortada mudou de sentido: as que mudariam carregam linha de contexto acima.
8. Todos os blocos de texto usam a mesma escala do componente de referência da peça (aspas 92/800 rose, corpo de 68 a 84, peso 700, tracking `-0.022em`, entrelinha 1,14), com UMA palavra em rose gold cada.
9. Nenhuma linha de texto solta esperando outra chegar: cada bloco entra montado e completo.
10. O fecho: cards saíram, eyebrow sumiu, logo sem moldura e sem anel, wordmark e assinatura revelados, e sobra folga parada antes do corte.
11. A mixagem passou pelo `mixar-audio.js` e a duração final bateu com a do vídeo (o script reprova sozinho se não bater).
12. O mp4 final abriu e foi conferido pelo `ffprobe`: duração, contagem de frames, 1080x1920 e 60 fps batendo com `TOTAL_FRAMES`.
13. Teste do sósia: a silhueta de 200px mostra dois rostos empilhados e uma frase grande embaixo, sobre fundo escuro.
14. Nada da identidade Exemplo vazou para outra composition, e nada de outra variante entrou aqui sem os dois arquivos de marca comparados lado a lado.

---

## 15. Instâncias

| # | Composition | Depoente e contexto | Versão aprovada | Duração | Data | Caminho |
|---|---|---|---|---|---|---|
| 1 | `BernardoDepoimentoReels` | Bernardo P. Küster, Mentoria VIP, call de 02/09/2026 | v10 | 32,90s, 1974 frames | aprovada em 03/09/2026 | `squads/motion/output/02-depoimento-bernardo/BernardoDepoimentoReels-v10.mp4` |

Única instância do estilo até 04/09/2026. Foi também a primeira replicação real do playbook `docs/ZOOM-REEL-MOTION.md` (`index.tsx:2-8`), o que quer dizer que ela é ao mesmo tempo a régua deste estilo e a prova de que o playbook replica.

Instância nova entra nesta tabela na mesma sessão em que for aprovada, e qualquer desvio dela em relação a este livro vira linha nova na seção 2 ou na seção 11, nunca uma exceção não escrita.
