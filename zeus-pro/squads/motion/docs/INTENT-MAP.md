# INTENT-MAP: do pedido em linguagem natural pro código certo

## STATUS: on demand, carregado por gatilho. Existe pra resolver a reclamação de 26/08/2026: pedido tipo "suaviza", "blur", "estilo After Effects" ficava por conta do modelo improvisar, sem tradução fixa pro núcleo (core/). Este arquivo é essa tradução.

Pedido do tipo "transforma esse vídeo do Zoom em Reel" (gravação horizontal de call, dois
rostos, vira vertical com motion): ler `docs/ZOOM-REEL-MOTION.md` primeiro, é o playbook
inteiro da categoria (pipeline, 14 leis, protocolo de interpretação semântica, escopo de
replicabilidade). Este documento aqui continua valendo por baixo dele pra tradução de pedido
solto ("suaviza isso") em chamada de núcleo.

Antes de codar qualquer coisa, ler `docs/zeus-motion-design-system.md` seção 4 (fluxo
obrigatório) e `ERROS-REMOTION.md`. Este arquivo aqui é o passo seguinte: uma vez que se sabe
que vai mexer em motion, o que exatamente o pedido em português vira em código.

## Tabela de tradução

| A pessoa fala | Significa | Código exato |
|---|---|---|
| "suaviza", "mais suave", "tá duro", "brusco" | Movimento sem clamp e sem easing, típico de `interpolate()` cru | Trocar por `ci()` de `core/primitives` com `CURVES.easyEase` (o default do sistema desde 20/08/2026, suaviza começo E fim) |
| "efeito de mola", "com bounce", "salto" | Física de mola, não interpolação linear | `makeSpring()` de `core/springs` com um dos 7 presets nomeados (`SPRING.text`, `SPRING.card`...). NUNCA `spring()` cru do Remotion: `choreo-lint.js` reprova (check `spring-cru`) |
| "blur", "desfoque", "borrado" | Entrada/saída com blur controlado | `entryFrom`/`exitTo`/`blurIn` de `core/primitives`. Regra do ERRO CRÍTICO 1 (`ERROS-REMOTION.md`): `filter: blur()` no CONTAINER PAI de texto com `background-clip: text` quebra o compositing do Chromium; usar `exitToNB` (No Blur) nesse caso específico |
| "estilo After Effects", "mais moderno", "profissional", "cinematográfico" | Vocabulário do agente `after-effects-technician.md`: orbit, dolly, crane, parallax, blur expand | Mapear pra `moves.ts` (`fadeUp`, `slideBlurIn`, `breathe`, `exitQuad`) + curva `CURVES.cinematic`/`CURVES.dramatic`/`CURVES.premium` (nomes semânticos em `core/curves.ts`) |
| "palavra por palavra", "sincronizado com a fala", "estilo legenda" | Word-sync no padrão ExemploMotion | `wordEntry()` de `core/primitives`, duração adaptativa `clamp(round((fim-início)*fps*1.5), 6, 18)`. Ver `src/compositions/ExemploMotion/timeline.ts` |
| "escalona", "um de cada vez", "em sequência" | Stagger entre elementos irmãos | `children: { count, staggerF }` no `choreography.ts` + `childDelay()` de `core/choreo`. Nunca hardcodar delay solto no componente: `choreo-lint` reprova stagger ausente |
| "gira", "rotaciona", "roda" | Rotação contínua | `ci()` com `CURVES` de easing, NUNCA `ci()` de mais de 45 frames sem 4º argumento alimentando `rotate()` (`choreo-lint` reprova como `rotacao-linear`, caso real do CupAndGear) |
| "entra de cima/baixo/lado" | Direção de entrada | `entry.dir` no spec (`"top"`, `"bottom"`, `"left"`, `"right"`), nunca 2 cenas seguidas com a mesma direção no hero: usar `alternateDir(índice)` |
| "some devagar", "esmaece", "fade out" | Saída (exit) | `exit.dir` + `exitF` no spec da cena. Saída Quádrupla é o padrão: posição + blur + opacity + scale juntos (`exitTo` já faz isso) |
| "ícone se desenhando", "traço aparecendo" | Progresso de stroke SVG | `useDrawProgress`/`DrawPath` de `evolvePath` (`@remotion/paths`), NUNCA `spring()` pra isso: correção de 20/08/2026 trocou por `ci()` com janela fixa de 26 frames, evita oscilação subamortecida |
| "cor de acordo com a marca X" | Paleta/tokens de marca | `COLORS`/`FONT` do `tokens.ts` da composition, vindos de `design-core-brands.ts` (gerado por `a ferramenta de sincronizacao de marca (nao incluida: o arquivo ja vem pronto)` a partir de `templates/design-tokens/brands/*.json`). Nunca hex solto no componente |
| A fala cita FERRAMENTA/CONCEITO reconhecível pelo nome ("Telegram", "Meta", "Zeus", "áudio"...) | MOMENTO DE MARCA (ordem direta do o dono do canal, 27/08/2026): a marca entra grande, acelera e desacelera ao chegar, segura o tempo de leitura, sai acelerando. A marca É UMA CENA do storyboard (spec 5ª rodada, 27/08/2026, corrige a versão anterior deste item, que usava uma camada paralela por cima do palco): o `from` da cena é o frame exato da palavra falada, nunca antes. Um protagonista por vez, frame SEMPRE tirado da narração real (`data/narration.json`), nunca estimado | Cena normal em `choreography.ts` + `tokens.ts` SCENES, componente em `components/icons/BrandBeat.tsx`. Vetor da marca vem de `src/modules/brand-logos/` (SVG oficial fiel, ou `ZeusTile` pro selo do Zeus, o retângulo arredondado com o anel colorido da página zeus-personal). O módulo `src/modules/brand-moments/` (camada paralela com `useStageShift`) fica no repo como padrão OPCIONAL pra quando a cena realmente precisar dividir a tela; não é mais o caminho padrão |
| A marca precisa nascer NO INSTANTE da palavra falada, nem antes nem no início do bloco de fala | Sync exato por palavra (5ª rodada, 27/08/2026, defeito real: "quando fala pra fazer o tráfego, a logo da Meta tem que aparecer EXATAMENTE... quando eu falo Telegram, a logo aparece antes da fala, errado") | O `start`/`from` da cena de marca é o frame da PALAVRA (`start_da_palavra x fps`), lido de `data/narration.json`, nunca o início do bloco de fala. A cena ANTERIOR estende até essa âncora e segura parada, nunca some cedo |
| Exit de elemento GRANDE cujo componente NÃO tem `ownsMotion` (o palco controla 100% via `applyChoreo`) | O `exitTo` de `core/primitives.ts` usa `distance` default de 1200px. Se a cena vive perto de outra faixa (o palco de ícones fica logo abaixo da fileira de vídeo, so ~276px de vão), um exit `dir:"top"` atravessa essa faixa antes de sumir: achado real em QA, 5ª rodada, selo saindo por cima do rosto no vídeo | Nunca usar `dir:"top"` (nem `"bottom"` perto da dead zone) pra elemento grande sem `ownsMotion`; preferir `"left"`/`"right"`, que ficam dentro da própria faixa horizontal do palco o tempo todo |
| A fala é sobre MANDAR/OUVIR ÁUDIO ("fala o seguinte", "por áudio", "manda um áudio") | Mockup de mensagem de voz de verdade: play, waveform com playhead varrendo, cauda do balão, check de enviado. Nunca balão genérico com barras soltas | Referência viva: `ZeusTrafegoReels/components/icons/AskBubble.tsx` (o padrão aprovado). No conceito traço-no-branco: contorno `STROKE.regular`, waveform tocada em preto e futura em cinza |
| A fala é sobre CHAT/CONVERSA/APLICATIVO ("abre o app", "manda mensagem") | Mockup visual do chat: linhas falsas de texto (nunca texto real), logo do app no topo, mensagem de áudio ou balão. O sistema INTERPRETA o contexto da fala e escolhe o elemento, nunca ilustração literal de palavra | Referência viva: `ZeusTrafegoReels/components/icons/PhoneChat.tsx` |
| Movimento de CÂMERA (palco expandindo, cards saindo, zoom) | NUNCA easyEase pura em movimento grande: em deslocamento longo ela lê como linear (reclamação real do o dono do canal, fecho da v11). Sempre curva pronunciada | `CURVES.smoothInOut` pra transição de palco, `CURVES.dramatic` pra saída de tela ("segura e dispara"). Regra absoluta: nenhum movimento linear pra NADA, todo movimento tem aceleração e desaceleração |
| "mais fluido", "parece travado" | Motion graphics a 30fps sobre vídeo 30fps | Renderizar a composição em 60fps (o vídeo-fonte repete frame, o motion ganha fluidez). Ver ZeusTrafegoReels: `fps={60}` no Root, todos os frames internos em base 60 |
| "se move conforme a minha voz", "acompanha a fala" (waveform, gráfico de áudio) | Animação dirigida pela AMPLITUDE REAL do áudio, não senoide decorativa | `scripts/extract-amplitude.js <Comp>` gera `data/amplitude.json` (RMS por frame, normalizado, média móvel de 5f) a partir de `public/<Comp>/audio-final.wav`. Ler com `ampAt`/`waveBar` (ver `ZeusTrafegoReels/data/amplitude.ts`) |
| Texto e elemento (linha, trilho, barra) NUNCA na mesma altura | Causa raiz de "linha em cima do texto" (defeito real, 3ª revisão): rótulo longo ultrapassa o x onde o elemento começa, na mesma linha de base | Toda linha de UI vira DUAS alturas: rótulo em cima, elemento gráfico embaixo, respiro mínimo de 16-30px. Nunca dividir a mesma coordenada Y entre `<text>` e `<line>`/`<rect>` |

## Fluxo de ALTERAÇÃO (quando o pedido é "atualiza o vídeo X", não composition nova)

1. Achar a composition em `src/compositions/` (ou `_casos/` se for fixture de teste).
2. FULLSAFE antes de editar (`node scripts/fullsafe.js backup <arquivos>`).
3. Traduzir o pedido pela tabela acima. Se o pedido aponta pra `choreography.ts` (direção,
   timing, stagger), editar SÓ o spec. Se aponta pro visual dentro da cena (cor, fonte, blur
   extra), editar `tokens.ts`/`index.tsx`, sempre importando de `core/`.
4. NUNCA reescrever a composition inteira quando o pedido é um ajuste pontual: editar só o
   trecho, igual qualquer outra edição no repositório.
5. Rodar `node scripts/choreo-lint.js <Composition>` e `node scripts/pre-render-validate.js
   <Composition>` antes de renderizar de novo.
6. Se o ajuste corrigiu algo que já tinha acontecido antes (2ª vez ou mais), registrar em
   `MEMORY.md` do squad (formato `memoria-squad-v1`, seção ERROS ou ACERTOS).

## Composition NOVA (quando o pedido é "cria um vídeo/motion do zero")

Nunca copiar um arquivo de composition existente. Usar o scaffold:

```
node scripts/new-composition.js NomeDaComposition --estilo exemplo-1|exemplo-2|zeus
```

Gera `choreography.ts` + `tokens.ts` + `index.tsx` já importando do núcleo, com paleta da marca
certa. Editar timing e texto, nunca trocar `applyChoreo`/`ci` por `spring()`/`interpolate()`
cru do Remotion (os checks `spring-cru`, `interpolate-cru` e `sem-import-do-nucleo` do
`choreo-lint.js` reprovam isso antes do render).

## Quando o pedido é por comparação ("faz igual ao...", "estilo profissional", "minimalista")

| O o dono do canal diz | O que ele quer dizer | Onde está |
|---|---|---|
| "minimalista profissional" | os 8 princípios do AgenteArquiteto: 1 protagonista 3 a 4x maior, 3 níveis tipográficos, terço superior, máx 5 elementos, eixo único, contraste em degraus | `docs/referencias-oficiais.md` seção 1 |
| "profissional", "gostei dos efeitos" | os 8 princípios do Motion Rosa: 1 acento saturado, brilho no objeto, halo e vinheta, número em branco puro, mono só em dado, card de borda 1px, densidade em degrau, saída desfocada | `docs/referencias-oficiais.md` seção 2 |
| "igual ao Agente Arquiteto" | o baseline v01 (`output/_baseline/`), NUNCA o `renders/AgenteArquiteto-v1.mp4`, que é a versão antiga e mais fraca | `docs/referencias-oficiais.md` seção 3 |
| "motion rosa" | a composition `MaquinaNeoanalogiaca2` (o apelido está no código, em `Root.tsx`); não confundir com o anúncio Meta pausado de nome parecido | `docs/referencias-oficiais.md` seção 2 |

Regra de escolha entre as duas linguagens: cena com número, etapa ou lista pede a linguagem
densa; cena com uma ideia só pede a minimalista. Misturar as duas na mesma peça é o erro que
faz o vídeo parecer indeciso.

## Onde cavar mais fundo

Referências oficiais com nota medida e princípios extraídos: `docs/referencias-oficiais.md`.
Estilo visual completo por filosofia (Apple Minimalista, Exemplo B&W, Dark Luxury...):
`docs/rules-on-demand/video-router.md`. Curvas nomeadas com o "feeling" de cada uma:
`src/core/curves.ts`. Moves prontos: `src/core/moves.ts`. Erros catalogados: `MEMORY.md` deste
squad (vivo) e `ERROS-REMOTION.md` (histórico congelado desde 15/05/2026). Exemplos completos e
funcionando: `src/compositions/_casos/`.
