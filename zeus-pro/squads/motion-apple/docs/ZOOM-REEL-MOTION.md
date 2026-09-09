# Zoom > Reel com Motion: playbook da categoria

## STATUS: DOCUMENTO CANÔNICO. Criado 27/08/2026, extraído das 9 rodadas de correção do
## ZeusTrafegoReels (a call da Carol Paixão). Fonte da verdade pra qualquer pedido "transforma
## esse Zoom em Reel". Injetado pelo context-router quando o pedido bate com a categoria.

Este documento existe porque o ZeusTrafegoReels foi corrigido 9 vezes na mesma sessão, e cada
correção tinha um princípio reaproveitável por trás. A ideia é simples: o próximo vídeo desta
categoria não deveria pisar em nenhuma bola já resolvida aqui. Aprender o raciocínio, não o
resultado; reusar as heurísticas, não o vídeo exato; adaptar o conceito visual ao significado
de cada fala nova.

O vídeo aprovado (v36, `output/01-zeus-trafego/`) é a régua de qualidade da categoria.

---

## 1. O que é esta categoria

Origem horizontal (gravação de Zoom ou call, dois rostos), saída vertical 1080x1920 (Reel ou
Ad) com: speaker framing, legenda, motion graphics semântico, comportamento de movimento
profissional.

Squad: `squads/motion/`. Composition de referência: `src/compositions/ZeusTrafegoReels/`.

---

## 2. Protocolo de replicação (vídeo + música + nome do estilo)

Este é o caminho fechado que roda quando o pedido é "faz um vídeo no estilo X com esse vídeo e
essa música". A ordem foi definida pelo o dono do canal em 04/09/2026, com estas palavras: "primeiro
transcreve o novo vídeo, depois entende a lógica, o conceito, as tônicas, as ênfases e tudo, e
depois aplica todas as regras para replicar".

Antes de começar, abra o livro do estilo pedido. Ele traz os desvios, o catálogo de componentes
e a árvore de decisão daquele estilo:

| Estilo | Livro | Composition de referência |
|---|---|---|
| Popular | `docs/STYLE-POPULAR.md` | `ZeusTrafegoReels` |
| Depoimento | `docs/STYLE-DEPOIMENTO.md` | `BernardoDepoimentoReels` |
| Apple Conceitual | `docs/STYLE-APPLE-CONCEITUAL.md` | `HamiltonZeusReels` |

Entrada: o vídeo do Zoom, a música (opcional), o efeito de fecho (opcional), o nome do estilo, o
nome da composition nova e a pasta de saída.

| Passo | O que fazer | Artefato | Pronto quando |
|---|---|---|---|
| P0 Abrir | Copiar a pasta da composition de referência do estilo para `src/compositions/<Comp>/` e registrar em `src/Root.tsx`. PODA OBRIGATÓRIA: apagar todo componente de `components/icons/` que o `SCENE_COMPONENTS` do `MotionStage.tsx` não mapeia, e conferir o papel de cada chave do `BRAND.ts` de origem | pasta nova | contagem de ícones igual à do mapa; `npx tsc --noEmit` limpo |
| P0b Cortar a fala | Transcrever o BRUTO num arquivo de rascunho, rodar `node squads/motion/scripts/mapear-redundancia.js <narration.json>`, levar os candidatos ao o dono do canal e aplicar só o que ele aprovar com `node scripts/video/cortar-fala.js <zoom.mp4> --cortes <cortes.json> --narration <narration.json> --out <cortado.mp4> --ajustar-bordas --confirmar`. P1 a P3 rodam no vídeo CORTADO, nunca no bruto | `<cortado.mp4>` e a ficha `<cortado.mp4>.cortes.json` | os 5 gates do script verdes (duração, taxa de quadros, áudio presente, borda em pausa real medida no áudio, nenhuma borda dentro de palavra) e a emenda ouvida |
| P1 Rosto | `python scripts/video/face_track.py <zoom.mp4>`. Se a posição do rosto variar mais de 15% da largura entre o início, o meio e o fim, use `tile-com-track.py`; senão `reframe-zeus.py` | `public/<Comp>/tiles/` | rosto inteiro dentro do card em 3 frames (0%, 50%, 95%) |
| P2 Voz | ffmpeg loudnorm 2-pass (highpass 80hz, afftdn, loudnorm) | `public/<Comp>/audio-final.wav` | volume médio perto de -16 dB |
| P3 Transcrever | `python scripts/transcribe-words.py <audio> --out src/compositions/<Comp>/data/narration.json` (sempre com `--out`). No Estilo Popular, também `node scripts/extract-amplitude.js <Comp> 60` | `narration.json` | duração bate com o wav; ler o transcript INTEIRO |
| P4 Entender | Ler a fala por trecho (literal, contextual, conceitual, visual: seção 4) e escrever `SCENES` no `tokens.ts` com um comentário por cena dizendo a âncora, por que este texto e por que este elemento. Escolher o componente pela árvore de decisão do livro do estilo | `tokens.ts` comentado | todo `start` coincide com o início de uma palavra; sem buraco na cobertura |
| P5 Storyboard | `node scripts/storyboard.js <Comp>` e mandar a folha para o o dono do canal. NENHUM render antes do OK dele | `output/<Campanha>/<Comp>-storyboard-vNN.md` | aprovação dele, ou edições incorporadas e folha regerada |
| P6 Aplicar | `choreography.ts` com as curvas por papel do livro, componentes do catálogo, legenda conforme o estilo. Depois: `npx tsc --noEmit`, `node scripts/choreo-lint.js <Comp>`, `node scripts/pre-render-validate.js <Comp>` | código | os três gates verdes; mesma contagem de cenas em `SCENES`, `choreography.ts` e no mapa |
| P7 Rascunho | `node scripts/render.js <Comp> draft <Campanha>` e `node scripts/video/qa-beats.js <Comp>`. Prova de sincronia: para cada cena, abrir o frame em `âncora menos 3` (o elemento não pode estar lá) e em `âncora mais metade da entrada` | frames | nada aparece antes da âncora; nenhum defeito visível só no frame |
| P8 QA visual | `node scripts/qa-frames.js <Comp>`, olhar os PNGs, `node scripts/qa-approve.js <Comp> --scores F1=..,..,F7=..` | `approval.json` | todas as notas 8 ou mais |
| P9 Final | `node scripts/render.js <Comp> final <Campanha>` (um render por vez) | mp4 mudo | frames iguais ao `TOTAL_FRAMES` |
| P10 Áudio | Só voz: `node scripts/video/mixar-audio.js <mp4>`. Com trilha e efeito: `node scripts/video/mixar-trilha.js <mp4> --comp <Comp> --musica <arquivo> --efeito <arquivo>` | mp4 com áudio, mais o `.mix.json` da conferência | gates do script passam (duração, voz preservada, batida no frame, silêncio no fim) |
| P11 Entrega | Atualizar o LEIA-ME da pasta de saída, a tabela de instâncias do livro do estilo, o `STYLE-REGISTRY.md` e a ficha no Atlas. Mandar o arquivo | | arquivo existe e a duração bate com a declarada |

---

## 2b. Base comum de formato (os números que os três estilos herdam)

Os livros de estilo NÃO repetem esta tabela: eles registram só os desvios. Se um número muda para
um estilo, ele aparece lá, com o motivo.

| Item | Valor | Onde vive |
|---|---|---|
| Canvas | 1080 x 1920 | `tokens.ts LAYOUT.canvasW/canvasH` |
| Taxa de quadros | 60 fps, sobre fonte de 25 ou 30 fps (o vídeo repete frame, o motion ganha fluidez) | `tokens.ts FPS`, `src/Root.tsx` |
| Cards de vídeo | 940 x 400 cada, topo em 180, respiro de 16 entre eles | `tokens.ts LAYOUT.cardW/cardH/cardTop/cardGap` |
| Fundo do bloco de vídeo | 996 no modo normal, 787 no expandido | derivado de `cardTop` mais a altura, com `videoScaleExpanded` 780/940 e `videoShiftYExpanded` -70 |
| Eyebrow | topo 96, Inter 600, 18px, tracking 6 | `index.tsx` (componente Eyebrow) |
| Base do palco | 1632 (abaixo disso é a interface do Instagram) | `core/layout.ts SAFE.bottomDeadStart` |
| Sobreposição entre cenas | 10 frames, a cena morre por baixo da próxima nascendo | `choreography.ts OVERLAP` |
| Margem de saída | 30% da duração nominal, piso 24 e teto 40 frames | `choreography.ts ext()` |
| Protagonista | 1 elemento hero por cena, sem exceção | `choreography.ts` |
| Âncora | o `start` da cena é o frame exato da palavra que ela ilustra, nunca o início do bloco de fala | `tokens.ts SCENES` |
| Guard da primeira cena | frame antes da primeira cena pertence à PRIMEIRA cena, nunca à última | `tokens.ts sceneAtFrame` |
| Ordem dos gates | tsc, choreo-lint, pre-render-validate, render draft, qa-frames, qa-approve, render final | seção 2 |
| Rubrica | F1 a F7, sem média, nota abaixo de 8 em qualquer um reprova a peça | `scripts/qa-approve.js` |
| Trava do render final | só roda com `approval.json` cujo hash do código bate com o atual | `scripts/render.js` |
| Áudio | nunca dentro da composition; entra por ffmpeg depois do render, sempre com `apad` | `components/VideoCard.tsx`, ERRO #329 |
| Render | um por vez, o script tem trava contra render concorrente | `scripts/render.js`, ERRO #335 |

---

## 3. As leis da categoria (destiladas das 9 rodadas)

Cada lei é GLOBAL PROFISSIONAL (vale pra qualquer usuário ou marca), a menos que marcada.

1. Storyboard pela fala, 1 beat igual 1 protagonista. Nunca dois elementos disputando atenção
   no mesmo instante. Pergunta antes de qualquer coreografia: "qual é O elemento visual desta
   fala, e só um?" (rodada 4).
2. Sync exato por PALAVRA, nunca por bloco de fala. O `from` de uma cena ou marca é o frame da
   palavra ancora (`start x fps`, lido de `narration.json`), nunca o início da frase inteira. A
   cena anterior estende até essa âncora e segura parada (rodada 5). Armadilha: se a PRIMEIRA
   cena não começa em frame 0, o lookup de cena (`sceneAtFrame`/`sceneIndexAt`) precisa de
   guard explícito pro intervalo órfão do início; o fallback padrão nunca pode devolver a
   última cena (rodada 8, causou um pulo visual real).
3. Interpretação semântica, nunca palavra igual ícone automático. Palavra mais contexto mais
   intenção mais narrativa é que decide o visual. "Telegram" pode virar logo, mockup de chat,
   ou nada, dependendo do que a frase quer dizer naquele instante (rodadas 3 e 4).
3b. Objeto concreto citado na fala precisa PARECER aquele objeto, nunca virar forma geométrica
    genérica (círculo, quadrado, barra) só porque a forma captura alguma propriedade abstrata do
    conceito (tamanho, quantidade e outras). Objeto já pronto na biblioteca Exemplo
    (`src/modules/exemplo-icons/`, hoje só 10 glifos importados de um total de 300+ em
    `squads/iconografia/output/exemplo-icon-elegant.html`): puxar o glifo de lá (reforça a lei 11).
    Objeto sem glifo pronto: desenhar o traçado dele na hora, no mesmo estilo de linha da
    biblioteca (traço fino, silhueta simples, sem preenchimento sólido, espessura conforme o peso
    visual), nunca recuar pra forma abstrata só por ser mais rápido de codar. Abstração geométrica
    pura só vale quando a própria fala já é abstrata, sem substantivo concreto (caso real
    HamiltonZeusReels, 03/09/2026: fala citava "isca de baleia" e "isca de sardinha", motion virou
    dois círculos de traço, corrigido pelo o dono do canal pro desenho reconhecível dos dois animais).
4. Marca real citada vira vetor oficial, nunca desenho genérico de memória. Nasce no frame da
   palavra, fica o beat inteiro, nunca passa correndo. Biblioteca: `src/modules/brand-logos/`.
5. Nada se move enquanto outro elemento entra. Exceção única documentada: par
   protagonista mais apoio tardio (o símbolo assenta, e SÓ DEPOIS um apoio secundário surge por
   baixo dele: `components/icons/MarkWithVoice.tsx`, rodada 4).
6. Curva de entrada precisa ter CAUDA LONGA, não só duração maior. Medir a bezier em
   t=25/50/70/85%: curva que entrega mais de 90% do movimento na metade do tempo NÃO
   desacelera, ela PARA. Aumentar duração nisso só aumenta o tempo parado. Curvas certas do
   catálogo: `CURVES.settle` e `CURVES.settleSoft` (`core/curves.ts`), cauda de 20 a 23% aos
   60% do tempo (rodada 7, dobrou o movimento perceptível de 0,5s pra 1,0s).
7. Zero movimento linear, movimento de câmera nunca `easyEase` pura (lê como linear em
   deslocamento grande). `CURVES.smoothInOut` e `dramatic` pra câmera e saída de tela.
8. Área útil do palco é TOKEN, todo componente de cena declara `CONTENT_H`. O gate
   `palco-overflow` (choreo-lint) cruza os dois e reprova antes de renderizar: foi assim que a
   colisão legenda x elemento virou erro de build em vez de defeito só visível depois (rodada 6).
9. Traço em PIXEL DE TELA, sempre. `strokePx(token, escalaDeExibicao)`: o mesmo token
   `STROKE.regular` rende espessuras diferentes se dois componentes exibem o viewBox em escalas
   diferentes (rodada 6). Gate: `traco-sem-compensacao`.
10. Todo mockup nasce com GRID DERIVADO e CONTENÇÃO POR CONSTRUÇÃO. Toda coordenada sai de
    uma conta a partir da largura do contêiner; a altura do pai é calculada a partir do
    conteúdo do filho, nunca o contrário. Zero número mágico solto (rodada 6).
11. Família de ícones única. Glifo composto (xícara, gráfico, calendário) nasce da biblioteca
    estática elegante da Exemplo (`src/modules/exemplo-icons/`, 300 ícones oficiais, stroke 0.75,
    grid 24) ou é montado com os glifos dela, nunca desenhado solto (rodada 4).
12. Legenda word-by-word com blur é módulo central (`src/modules/text-system/Captions.tsx`):
    anti-reflow, LEAD_IN, duração adaptativa, início SEMPRE travado no timestamp real da fala
    (nunca atrasa o sync mesmo quando a cauda da animação alonga, rodada 7).
13. Waveform de áudio é sempre dado real. `data/amplitude.json` (amplitude real da voz), nunca
    senoide decorativa. Anatomia de player de voz: barras finas densas (28 ou mais), playhead
    animado revelando tocado e por tocar, botão play, duração; nunca gráfico de barras genérico
    nem "dashboard" solto competindo com o player (rodada 8).
14b. Fala repetida é gordura, e fala interrompida não entra no reel. Toda transcrição
    passa pelo mapa de redundância (P0b) antes de virar storyboard: reformulação que
    repete o que já foi dito ("ou, você citou, um X um pouco menor" logo depois de "tem
    um X") sai; a cauda em que outra pessoa interrompe sai; enumeração retórica ("ou A,
    ou B, ou C") FICA, porque repetir o verbo ali é o recurso, não o defeito. Quem aponta
    é o script, quem aprova é o dono da fala, e o corte é sempre por borda de palavra
    (caso real HamiltonZeusReels não tinha isso; nasceu no vídeo do Carlos Seme,
    05/09/2026).
15. F1 a F7 é o gate visual obrigatório (`scripts/qa-frames.js` FUNDAMENTAIS, sem média, nota
    abaixo de 8 em QUALQUER um reprova): hierarquia clara, entrada e saída sempre completa,
    eixo óptico alinhado, dentro da safe area, não parece slide congelado, legenda não cruza
    elemento, filho não vaza do contêiner.

---

## 4. Como pensar ANTES de gerar qualquer motion (obrigatório, nesta ordem)

1. Ler o transcript inteiro (`data/narration.json`). Entender do que o vídeo trata.
2. Identificar a ideia central e a progressão narrativa (não segmento a segmento ainda).
3. Pra cada trecho: significado LITERAL (o que foi dito), depois significado CONTEXTUAL (o que
   significa dentro da conversa), depois significado CONCEITUAL (a ideia maior por trás),
   depois possibilidades visuais, e só então a melhor representação (a que comunica mais claro
   sem competir com os falantes).
4. Só depois disso: escolher o motion. Nunca gerar a partir de palavra chave isolada. Escolher o
   motion inclui decidir entre glifo pronto da biblioteca, traçado novo no mesmo estilo dela, ou
   passthrough (rosto mais legenda); forma geométrica abstrata nunca é a escolha padrão quando
   existe objeto concreto citado na fala (lei 3b).

---

## 5. Escopo do aprendizado: o que transfere e o que não transfere

| Camada | O que mora aqui | Transfere pra outro usuário? |
|---|---|---|
| GLOBAL PROFISSIONAL | Seções 3 e 4 inteiras: hierarquia, semântica, curvas, gates, grid derivado, waveform real | SIM, sempre |
| FORMATO (Zoom vira Reel) | 1080x1920, 60fps sobre fonte 25 ou 30 fps, faixas de layout (STAGE_SAFE), pipeline mecânico (seção 2) | SIM, é o formato, não a marca |
| o dono do canal, MARCA ZEUS | `BRAND.ts`: paleta preto/cinza/branco Apple, Inter, `SPECTRUM_STOPS` do anel, textos "ZEUS · IA DE TRÁFEGO" / "ZEUS" / "IA PARA MENTORES", o lockup retângulo arredondado oficial como fecho | NÃO. Nunca replicar identidade de um usuário pra outro |
| SÓ ESTE VÍDEO | Os 14 beats específicos do ZeusTrafegoReels, os textos exatos da narração, os beats de café e Telegram | NÃO, cada vídeo tem seu próprio storyboard, vindo da SUA fala |

Replicabilidade, como um segundo usuário usa a mesma estrutura com outra identidade:
1. Copiar a pasta `ZeusTrafegoReels/` inteira com outro nome de composition.
2. Editar `BRAND.ts` (o único arquivo de identidade visual: cores, fonte, `SPECTRUM_STOPS`,
   textos de marca, caminho da logo). Nada de estrutura mora lá, ver o comentário do arquivo.
3. Trocar `data/narration.json` (nova transcrição) e rodar `extract-amplitude.js` de novo.
4. Trocar os tiles de vídeo e a imagem de logo em `public/<Comp>/`.
5. Recalcular `tokens.ts` SCENES e `choreography.ts` pelas NOVAS âncoras de palavra: isso é
   conteúdo, não estilo, nasce sempre da fala daquele vídeo específico (seção 4).
6. Rodar o pipeline da seção 2 do zero.

Replicar o MESMO vídeo do o dono do canal exatamente (pedido dele: "se eu pegar outro vídeo do Zoom e
pedir pra replicar, tem que replicar tudo, o mesmo final, a logo e a frase do Zeus"): não
trocar `BRAND.ts`, só os passos 3 a 6 acima (conteúdo novo, identidade igual).

---

## 5b. Variante DEPOIMENTO (comprovada 02/09/2026, Bernardo P. Küster/Mentoria VIP,
`BernardoDepoimentoReels`, primeira replicação real deste playbook)

Categoria diferente de conteúdo institucional (o ZeusTrafegoReels vende um recurso; um
depoimento prova algo através de uma pessoa). Regras próprias, todas GLOBAL PROFISSIONAL
(transferem pra qualquer usuário):

1. **O rosto de quem depõe é o protagonista.** Motion é apoio, nunca compete. Muito MENOS
   beats que num vídeo institucional: no caso real, 2 de 6 blocos de fala ganharam cena
   (`quote-estrutura`, `trophy-resultados`); os outros 4 ficaram `elements: []` (rosto +
   legenda, mesmo padrão do `zeus-seal`/passthrough).
2. **Nenhum dado inventado.** Painel, gráfico ou número só se a PESSOA disse o número. Um
   depoimento com métrica fabricada em tela é fraude visual, o valor da peça é a
   credibilidade de quem fala.
3. **O visual é a palavra dela.** Pull quote tipográfica (a frase forte, grande, na fonte da
   marca) é o beat principal da variante, ver `components/icons/PullQuote.tsx`. Glifo (da
   biblioteca elegante da Exemplo, `modules/exemplo-icons`) só quando a fala é literal e concreta
   (ex.: "resultados animadores" → troféu, `TrophyMoment.tsx`), nunca decorativo.
4. **Trecho sem beat é decisão, não vazio.** Ideia abstrata demais pra virar imagem sem
   inventar dado (ex.: "modelos que se encaixam... funcionar bem") fica só rosto + legenda.
5. **Nome na tela é etiqueta LOCAL ao card do falante, não ao grid do canvas inteiro.**
   `modules/lower-thirds/SpeakerLowerThird.tsx` posiciona pelo `SAFE.deadZoneCompensation`
   (288px do fundo dos 1920px do CANVAS INTEIRO), certo pra vídeo de tela cheia, errado pra
   um card de 940x400 dentro de tela dividida (o cálculo dá uma posição no terço superior do
   card, não "embaixo" dele). A variante depoimento escreve um componente pequeno próprio,
   posicionado `absolute` DENTRO de um wrapper `position: relative` do tamanho exato do card
   (ver `BernardoNameTag.tsx`). Regra: nome/cargo sobre vídeo em SPLIT SCREEN nunca reusa o
   módulo de tela cheia sem adaptar a base de posicionamento.
6. Sem cargo, a não ser que o usuário informe o cargo exato (nunca inventar credencial).

---

## 6. Onde ficam os detalhes técnicos completos

- Erros com causa raiz e a regra que nasceu de cada um: `squads/motion/MEMORY.md` (ERROS
  1 a 9 desta produção, não duplicar o corpo aqui, só referenciar).
- Referências de qualidade medidas (rubrica, princípios extraídos): `docs/referencias-oficiais.md`.
- Tradução de pedido em português pro código do núcleo: `docs/INTENT-MAP.md`.
- Fluxo obrigatório de qualquer composition nova: `docs/zeus-motion-design-system.md`.

---

## 7. Economia de tokens na próxima produção

Sessão nova por vídeo, com este playbook injetado (não redescutir arquitetura). Ler
`narration.json` inteiro é barato (é o insumo número 1, seção 4); NÃO reler frames antigos ou
o histórico de correção de vídeos anteriores, as heurísticas já estão destiladas aqui. Os
gates (`choreo-lint`, `pre-render-validate`, `qa-frames` mais medição por pixel) substituem
boa parte da revisão manual: rodar sempre, confiar no resultado, só investigar quando
reprovarem.
