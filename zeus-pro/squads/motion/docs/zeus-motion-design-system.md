# Zeus Motion Design System

> Status: DOCUMENTO CANÔNICO, porta de entrada obrigatória.
> Criado: 20/08/2026, reforma do motion design system (raiz: vídeo "Zeus pelo
> Telegram" reprovado por motion bruto, amador, sem direção de arte).
> Leitura obrigatória: TODO agente do squad, ANTES de escrever choreography.ts
> ou qualquer .tsx de composition nova.

Este documento é o mapa. Ele não repete o conteúdo de `padrao-aprovado-zeus-motion.md`
(filosofias visuais, identidades por projeto, exemplos código a código) nem de
`remotion-animation-standards.md` (regra Tier 0 autocontida). Ele existe pra responder
uma pergunta que nenhum dos dois respondia: como o sistema GARANTE, em código, que a
próxima composition não repete o erro do ZeusTrafegoReels.

---

## 1. Por que este documento existe (o caso ZeusTrafegoReels)

O squad tinha um design system de API de motion (`src/core/`: tokens, curvas, springs,
primitivas) quase ÓRFÃO: 1 de 58 módulos importava o núcleo, e não existia design
system de COMPOSIÇÃO. O grid oficial 1080x1920 vivia como arte ASCII em um agente
markdown, não existia contrato de coreografia legível por máquina, e o validador
aprovava composição sem config de cena com exit 0. Toda a direção de arte era prosa em
49 agentes, sem nenhum enforcement.

O ZeusTrafegoReels (Reels "Zeus pelo Telegram") mostrou 3 defeitos reais, exatos:

1. **Layout monótono**: `MotionStage.tsx` aplicava a MESMA entrada/saída (bottom/top)
   aos 8 ícones do palco, sem nenhuma variação entre cenas.
2. **Duplo movimento**: `AskBubble` e `ResponseBubble` tinham `entryFrom` PRÓPRIO,
   somado ao `entryFrom` que o palco já aplicava no wrapper.
3. **Rotação linear contínua**: `CupAndGear` girava a engrenagem com
   `ci(frame,[40,400],[0,300])`, 360 frames sem nenhum easing.

Nenhum desses 3 defeitos era pego por `pre-render-validate.js` (que só checava timing).
Cada um deles é, hoje, um check determinístico ou heurístico em `choreo-lint.js`. A
prova está registrada: rodar o lint contra uma reconstrução do estado anterior reprova
com 7 erros (os 3 defeitos reais, mais a direção repetida em cada cena subsequente);
rodar contra o estado atual passa limpo.

O princípio que rege toda a reforma: **se uma regra é estrutural, ela vira código, não
mais um parágrafo de prompt**. O o dono do canal pediu isso explicitamente. Este documento e o
sistema em `src/core/` são a resposta.

---

## 2. Mapa do sistema (`src/core/`)

```
core/layout.ts        grid 1080x1920 em código: CANVAS, SAFE, ZONES, OPTICAL_CENTER_Y,
                       safeStage(), placeAt(), placeAtOpticalCenter()
core/OpticalBox.tsx    alinha o centro óptico de um SVG (viewBox próprio) a uma zona do
                       grid ou ao centro óptico da tela, sem tocar em nenhum path
core/choreo.ts         contrato de coreografia: tipos (Dir, ElementRole, ElementChoreo,
                       SceneChoreo, SceneSpec), defineSpec(), alternateDir(i), childDelay().
                       Zero import de valor de React/Remotion (só dados e funções puras),
                       de propósito: choreo-lint.js avalia o spec sem montar o bundle
                       inteiro do Remotion
core/choreo-runtime.ts applyChoreo(frame, scene, elementId): a contraparte que PRECISA de
                       Remotion (entryFrom/exitTo/mergeStyles de primitives.ts). Importada
                       de dentro da composition, nunca do choreography.ts
core/tokens.ts         MOTION (tokens semânticos novos) + MOTION_LEGACY (defaults
                       numéricos byte-idênticos aos valores soltos de antes da reforma,
                       só nomeados)
core/springs.ts        SPRING (presets semânticos novos) + SPRING_LEGACY (9 presets
                       byte-idênticos às 22 chamadas inline encontradas em src/modules) +
                       makeLegacySpring(frame, fps, key, opts?), que NUNCA mistura com um
                       preset semântico (vazaria campo como mass e mudaria o movimento)
core/primitives.ts     entryFrom, exitTo, exitToNB, wordEntry, blurIn, iconPop: agora com
                       defaults vindos de MOTION_LEGACY.*, mesmo comportamento numérico
core/curves.ts         16 curvas de easing nomeadas
core/moves.ts          14 moves parametrizados
```

Cada composition nova consome este núcleo. Composition legada (allowlist) continua
consumindo exatamente o que consumia, sem nenhuma mudança de comportamento.

**Política de migração das 29 composições legadas (decidida em 27/08/2026, Fase 6 da
auditoria audiovisual): migração NO TOQUE, nunca em massa.** Composição legada só ganha
`choreography.ts` (e sai de `noSpec`) quando for RE-RENDERIZADA por demanda real do
o dono do canal. Nunca renderizou de novo, fica como está para sempre: o custo de migrar as 29
de uma vez é alto e a maioria não volta a ser tocada. `render.js` avisa (não bloqueia)
toda vez que uma legada renderiza em modo final. O padrão "`ci()` copiado por valor"
presente nelas é intocado; é proibido só em composição NOVA (o lint já cobre isso).

---

## 3. O contrato de coreografia (`choreography.ts`)

Toda composition nova, fora da allowlist congelada de legado
(`squads/motion/scripts/lib/legacy-allowlist.json`, campo `noSpec`), exporta um
`SceneSpec` de um arquivo `choreography.ts` na sua própria pasta:

```typescript
import { defineSpec, alternateDir } from "../../core/choreo";

export default defineSpec({
  composition: "NomeDaComposition",
  fps: 30,
  scenes: [
    {
      name: "cena-1",
      from: 0,
      dur: 150,
      exitF: 128,
      elements: [
        { id: "hero-1", role: "hero", entry: { dir: alternateDir(0) }, exit: { dir: alternateDir(1) } },
      ],
    },
    // ...
  ],
});
```

Regras do arquivo, não negociáveis (viabilizam o resto do pipeline):

- Só dados literais e imports de `core/choreo` (tipos, `defineSpec`, `alternateDir`,
  `childDelay`). Nunca `import ... from "react"` nem `"remotion"` como valor (só como
  `import type`, que o TypeScript apaga). `scripts/lib/load-choreography.js` transpila
  com esbuild e roda num `vm` isolado com um stub, exatamente por isso: consegue ler
  coreografia sem montar o bundle Remotion inteiro.
- `ownsMotion: true` num elemento diz ao palco "não me aplique entrada/saída de
  posição, eu me animo sozinho" (idle motion, drift, desenho progressivo de SVG). É o
  campo que existe especificamente para nunca mais repetir o bug AskBubble/ResponseBubble:
  elemento com `ownsMotion` ausente ou falso que AINDA importa `entryFrom`/`exitTo`/
  `wordEntry` no próprio código é erro de lint (duplo movimento).
- `children: { count, staggerF }`: staggerF é obrigatório quando count > 1. Elimina por
  construção o bug do Checklist (3 itens com 22f hardcoded dentro do componente, sem
  nenhum lugar pra declarar isso fora dele).
- `alternateDir(i)` (ciclo bottom, left, top, right) elimina por construção o layout
  monótono: cada índice de cena usa a próxima direção do ciclo.

A composition consome o MESMO objeto via `applyChoreo()` de `core/choreo-runtime.ts`. O
palco vira burro: só executa o que o spec manda. Fonte única, sem drift entre o que a
composition faz e o que o validador acha que ela faz.

---

## 4. Fluxo obrigatório (composition nova)

```
0. Reler o aprendido    ERROS-REMOTION.md (10 erros catalogados) + MEMORY.md do squad,
                         ANTES de qualquer outro passo. Pedido em linguagem natural
                         ("suaviza", "blur", "estilo After Effects")? Traduzir pela
                         tabela de docs/INTENT-MAP.md antes de escrever código.
1. Motion brief         que produto, que emoção, que hierarquia (rosto/mensagem/
                         legenda/gráfico se for Zoom, ver secão 6)
2. Direção de arte       LER docs/referencias-oficiais.md (as 3 peças que o o dono do canal apontou
                         como referência, com nota medida na rubrica e princípios extraídos:
                         AgenteArquiteto = minimalismo profissional, Motion Rosa = estilo e
                         efeitos, e a regra de qual linguagem cabe em qual conteúdo).
                         Depois, filosofia visual (padrao-aprovado-zeus-motion.md PARTE 2),
                         identidade definida ANTES de codar
3. Scaffold              composition NOVA nasce de
                         node scripts/new-composition.js NomeDaComp --estilo <brand>,
                         NUNCA de copiar um arquivo de composition existente (gera
                         choreography.ts + tokens.ts + index.tsx já importando do
                         núcleo, com a paleta certa vinda de design-core-brands.ts)
4. choreography.ts       spec de coreografia: cenas, direções alternadas, roles,
                         stagger, ownsMotion
5. Código (.tsx)         componentes consomem applyChoreo(), core/layout.ts,
                         core/springs.ts (SPRING.*, nunca config inline)
6. choreo-lint.js        node scripts/choreo-lint.js <Comp>
                         determinístico: direção repetida, stagger ausente, delay
                         hierárquico invertido, layout monótono
                         heurístico: rotação/translação linear sem easing, duplo
                         movimento, componente aposentado (FadeIn/SlideIn/ScaleIn)
                         entrada crua (reforma 26/08/2026): spring()/interpolate()
                         direto do Remotion em vez de makeSpring/makeLegacySpring/ci
                         do núcleo, e composition sem nenhum import de core/ (direto
                         ou via módulo compartilhado em src/modules/)
7. pre-render-validate.js roda choreo-lint sozinho quando há spec; REPROVA (exit 1)
                         composition nova sem choreography.ts
8. qa-frames.js          node scripts/qa-frames.js <Comp>
                         renderMedia (baixa qualidade) + extração de frames-chave via
                         ffmpeg (nunca renderStill isolado, ver secão 8) + checklist.md
9. Avaliação visual      um agente (ou o o dono do canal) lê os frames, pontua os 5
                         fundamentais 0-10, SEM MÉDIA
10. qa-approve.js         node scripts/qa-approve.js <Comp> --scores F1=..,F2=..,...
                         só grava aprovado se TODAS as notas >= 8
11. render.js --mode final render final EXIGE approval.json com hash de src/ batendo
                         e veredicto aprovado, pra composition com spec fora da
                         allowlist. Sem isso, aborta antes de renderMedia.
12. Registrar            erro corrigido ou padrão novo aprovado vira entrada em
                         MEMORY.md do squad (formato memoria-squad-v1), na mesma
                         sessão. Sem isso o próximo pedido repete o mesmo erro.
```

Pular qualquer passo de 6 a 10 não é mais possível por vontade própria: o passo 7 e o
passo 11 são gates em código.

---

## 5. O teste dos 5 fundamentais (rubrica do gate visual)

Sem média. Nota abaixo de 8 em QUALQUER fundamental reprova a composition inteira,
mesmo que os outros estejam em 10.

```
F1  Hierarquia clara no frame congelado (um elemento manda, o resto apoia)
F2  Nenhuma entrada/saída seca (sempre opacity + blur + posição juntos)
F3  Eixo óptico dos elementos alinhado (não parecem soltos, flutuando)
F4  Dentro da safe area (nada cortado nas bordas, nada na dead zone da base)
F5  Isto pareceria um slide de PowerPoint se eu mostrasse parado?
```

F1 e F5 são o "teste do frame congelado": pausar a composition em qualquer instante e
perguntar se ainda parece intencional. Se parecer um slide estático com um enfeite,
reprovado, mesmo que o vídeo rodando pareça aceitável.

---

## 6. Regras específicas de vídeo de Zoom / call gravada

Casos como o ZeusTrafegoReels (reframe de gravação de call, dois participantes,
gráfico de apoio) seguem uma hierarquia visual fixa, do mais para o menos importante:

```
1. Rosto (o vídeo real das pessoas falando)
2. Mensagem falada (o que está sendo dito, via legenda)
3. Legenda (o texto em si: precisa estar nítido e legível ANTES de qualquer outra coisa)
4. Gráfico complementar (ícone, diagrama, elemento de apoio)
```

O motion graphics SUPORTA a narrativa. Nunca compete com ela. Na prática:

- A legenda nunca fica borrada ou ilegível enquanto um ícone já está 100% formado. Se
  isso acontecer, a hierarquia está invertida (foi exatamente o bug encontrado na
  auditoria visual da fase 4: em um frame do estado anterior a palavra "como" saía com
  blur pesado e ilegível enquanto a bolha de fala já estava com o traço 100% desenhado).
- O elemento gráfico entra DEPOIS da legenda ficar legível, nunca simultâneo disputando
  atenção.
- **Interpretar a fala semanticamente antes de escolher o que desenhar.** Nunca
  correspondência literal de palavra-chave (a pessoa fala "campanha" não significa
  desenhar a palavra "campanha", significa entender que o contexto pede um painel de
  configuração de campanha, ou um gráfico de resultado, dependendo do que a frase INTEIRA
  está comunicando).
- Motion graphics em vídeo de Zoom é sempre fundo neutro (branco ou a cor de fundo do
  projeto) com elementos de apoio simples: nunca compete visualmente com os tiles de
  vídeo real, que são o elemento mais importante da tela.

---

## 7. DNA do "Motion Rosa" e do ExemploMotion (as 2 referências de mais alta qualidade)

Correção de 20/08/2026, registrada aqui porque a primeira versão desta seção errou o
alvo: o squad tem DUAS referências de qualidade, não uma, e não são a mesma peça.

**"Motion Rosa" é `MaquinaNeoanalogiaca2`.** Achado direto em `src/Root.tsx`: o próprio
código chama essa composition de "Motion Rosa" em 3 comentários, ao registrar
`TrafegoIA`, `RaioXLucroAzul` e `MotionMassofy` (este último uma das 4 sentinelas de
baseline desta própria reforma) como derivados dela. É nomenclatura de produção real,
usada em 4 entregas, mais forte que a hipótese anterior (que apontava pro ExemploMotion,
só por causa de uma aprovação isolada de 10/06). Confirmado visualmente via
`node scripts/qa-frames.js MaquinaNeoanalogiaca2`: estética brutalista tech, fundo quase
preto, glow neon rosa comedido, hierarquia limpa em todo frame congelado, 14 rodadas de
refinamento (`_versions/index.v1.tsx` a `v14.tsx`, sinal de polimento acima da média do
squad). Tecnicamente, o `entryFrom`/`exitTo` locais desse arquivo são quase byte
idênticos ao que hoje vive em `core/primitives.ts`: não é uma técnica nova, é a mesma
família BRABO já documentada nas Regras 1 a 9 de `remotion-animation-standards.md`,
executada com QUALIDADE e um tratamento visual próprio (chromatic aberration sutil,
grid mais grain, springs nomeados por intenção: `SPRING_PUNCH`, `SPRING_TEXT`,
`SPRING_COLOS`, `SPRING_SNAP`).

**ExemploMotion continua sendo referência válida, só que de outra filosofia.** Padrão
Exemplo rosegold, aprovado pelo o dono do canal em 10/06/2026, mas SEM o apelido "motion rosa" no
código real (não confundir as duas). É a peça de onde vem o DNA de texto cinemático
abaixo, mais elaborado que a família Motion Rosa: `Captions.tsx` e `timeline.ts` tratam
timing de palavra, LEAD_IN e validação de forma que a família Motion Rosa não tem.
`ExemploMotion/data/palette.ts` precisa estar com `ACTIVE_PALETTE = "rosegold"`
(restaurado na fase 0 da reforma, é a única edição feita nesse arquivo em toda a
reforma). Ambas as fichas estão registradas no Zeus Atlas, separadas, pra nunca mais
confundir com o anúncio Meta pausado de nome parecido ("Motion Rosa Mentira").

DNA extraído do ExemploMotion, virado regra do sistema:

```
Duração de entrada de palavra        adaptativa, 6 a 18 frames, derivada da fala:
                                      clamp(round((fim - início) * fps * 1.5), 6, 18)
LEAD_IN                              3 frames (a palavra fica legível no instante em
                                      que é dita, não depois)
OVERLAP entre cenas                  7 frames (ExemploMotion) / 8 frames (ZeusTrafegoReels)
                                      a saída de uma cena acontece POR BAIXO da entrada
                                      da próxima, nunca corte seco
Saída quádrupla                      posição + blur + opacity + scale sempre juntos;
                                      opacity só começa a cair aos 35% da duração da saída
Blur                                 só renderiza acima de 0,1px (evita filter:blur(0px)
                                      gerando custo de composição à toa)
Anti-reflow                          palavras ocupam o layout final desde o frame 0 com
                                      opacity 0; o texto ACENDE no lugar, nunca empurra
                                      layout ao entrar
Idle motion                          fundo nunca congela: aurora com drift + glow
                                      pulsante contínuo
Staggers                             dirigidos pelo timestamp real da fala, nunca por um
                                      número fixo arbitrário
Delays hierárquicos                  ícone entra +2f, rótulo entra +8f depois do número/
                                      elemento principal (nunca o rótulo entra antes)
Transição alternada                  left/up por índice de cena (mesmo princípio de
                                      alternateDir do core/choreo.ts)
Giro de câmera                       easeInOut, 26 frames, a cena seguinte HERDA o giro
                                      em vez de resetar a câmera
Balanceador de linhas                nunca deixa palavra órfã sozinha na última linha de
                                      um bloco de texto quebrado
timeline.ts                          validações que LANÇAM ERRO em tempo de build: cena
                                      curta demais, range sobreposto, tag fora do
                                      vocabulário esperado (list/grid)
```

`core/choreo.ts` e `choreo-lint.js` codificam a parte deste DNA que é genérica o
suficiente pra qualquer composition (overlap, alternância de direção, stagger
obrigatório, delay hierárquico). A parte específica de texto/legenda cinemático
(duração adaptativa por palavra, LEAD_IN, balanceador de linhas) vive em
`Captions.tsx` (componente A, consolidado, não tocado pela reforma).

---

## 8. Notas técnicas de ferramental (armadilhas já encontradas)

**`renderStill()` não é confiável pra QA de composition com `<Sequence>` sobrepostos.**
Chamadas isoladas repetidas de `renderStill()` no mesmo processo, contra frames de
cenas com Sequences sobrepostos (overlap), produziam frame ERRADO (mostrando a cena
anterior), mesmo com o vídeo final renderizado correto no mesmo timestamp (confirmado
byte a byte via ffmpeg). `qa-frames.js` por isso renderiza um `renderMedia()` real
(baixa qualidade, rápido) e extrai os frames-alvo dele via ffmpeg: o mesmo pipeline que
já prova estar correto, nunca `renderStill` isolado.

**`SceneSpec.frameOffset`.** Quando o `choreography.ts` de uma composition usa frames
relativos ao INÍCIO DO CONTEÚDO (por exemplo, depois de um card de abertura/hook fixo),
declarar `frameOffset` no spec com o tamanho desse trecho inicial. `qa-frames.js` soma
esse valor ao converter frame do spec para timestamp do vídeo renderizado; sem isso, o
frame extraído cai sistematicamente na cena anterior à esperada.

**Nested `<Sequence>` é relativo ao pai.** O `from` de um `<Sequence>` filho é relativo
ao início do `<Sequence>` pai mais próximo, não ao frame absoluto da composition. Vale
tanto para o próprio palco de cenas quanto para qualquer ferramenta externa (como
qa-frames.js) que precise traduzir frame de cena para frame absoluto.

---

## 9. Anti-padrões (bloqueados por `choreo-lint.js` ou por revisão visual)

```
Linear sem justificativa     ci() de mais de 45 frames sem easing alimentando rotate()
                              ou translate(), sem comentário "// linear-ok: <motivo>"
Entrada seca                 elemento aparece sem opacity+blur+posição juntos
PowerPoint                   frame congelado parece slide estático (teste F5)
UI falsa                     mockup de interface sem contexto real de uso
Efeito pelo efeito           movimento sem propósito narrativo, decorativo puro
Timing igual pra todos       mesmo par entrada/saída repetido em cenas consecutivas
                              (layout monótono, checkMonotonousLayout)
Duplo movimento              componente com ownsMotion ausente/false que também
                              anima a si mesmo (checkDoubleMotion)
Stagger ausente               filhos (children.count > 1) entrando juntos, sem staggerF
Componente aposentado        FadeIn/SlideIn/ScaleIn de motion-primitives (@deprecated,
                              usar entryFrom/exitTo do núcleo)
```

Os primeiros dois (determinísticos e heurísticos de spec/código) são pegos por
`choreo-lint.js` antes do render. PowerPoint, UI falsa e efeito pelo efeito são pegos
na avaliação visual da secão 5, porque dependem de julgamento de composição.

---

## 10. Onde ir a partir daqui

```
Este documento                            mapa, contrato, fluxo, DNA extraído
benchmark-externo-2026-08-27.md           13 repos externos auditados + pesquisa em 4 gaps
                                           (motion blur, legenda, diarização, indexação);
                                           nada foi importado, só técnicas a prototipar
referencias-oficiais.md                   as 3 peças de referência do o dono do canal, com nota
                                           medida na rubrica dos 5 fundamentais e os
                                           princípios extraídos de cada uma (insumo
                                           obrigatório do passo 2, direção de arte)
padrao-aprovado-zeus-motion.md            filosofias visuais, identidade por projeto,
                                           exemplos código a código, timing por formato
remotion-animation-standards.md           regra Tier 0 autocontida (o que sempre
                                           carrega, mesmo sem ler nada mais)
brabo-motion-os-v9.md                     os 10 mandamentos originais do motion
src/core/*.ts                             a implementação: ler o código é a fonte
                                           de verdade final quando este doc e o
                                           código divergirem
src/compositions/ZeusTrafegoReels/        caso de estudo completo: choreography.ts
                                           comentado linha a linha com o porquê de
                                           cada escolha, componentes com o comentário
                                           do bug original e da correção
src/compositions/_casos/                  fixture de regressão: 6 composições curtas
                                           cobrindo lower third, explicação de
                                           conceito, Zoom com 2 pessoas, estatística,
                                           fluxo visual, texto de impacto
src/modules/lower-thirds/                 primeiro módulo "nasce premium por padrão":
                                           construído sobre core/layout + core/choreo +
                                           core/springs desde o primeiro commit
```

Se este documento e o código divergirem, o código vence, e este documento ganha
correção na mesma sessão que a divergência for encontrada (mesmo princípio do gate de
documentação canônica do projeto).
