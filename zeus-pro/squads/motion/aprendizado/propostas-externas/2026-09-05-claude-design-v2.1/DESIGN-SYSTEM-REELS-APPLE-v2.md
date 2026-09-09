# Design system do Reels estilo Apple Conceitual — v2.1 (consolidado)

Versão 2.1 = v2 + revisão de auditoria. O documento v1 (uploads/) fica como
histórico; onde este texto divergir dele, vale este. Changelog em CHANGELOG.md.

Complementa o documento v1. Só o que mudou ou foi preenchido. Tokens em
`tokens/reels-tokens.css`; painel visual em `Zeus Reels Design System.dc.html`.

## 00. Onde procurar (roteador)

Antes de qualquer decisão, o código lê `design-router.json`:
1. **classify** — 6 perguntas em ordem que devolvem a família (interface,
   esquema/molde, destaque, gancho, lettering, só legenda) e a seção do guia +
   âncora do painel.
2. **triggers** — frases da fala → entrada do `moldes-index.json` (com
   alternativas). Cada entrada tem `where` (guia §, painel #), peças, gesto.
3. **pieces** — dicionário das 17 peças com guia §, tokens e spec resumida.
4. **gestures** — os 10 gestos com o movimento exato.
5. **always** — o que vale em toda cena (legenda, cor, foco, movimento,
   simetria, massa, traço, ícones, gabarito) e onde está.
6. **compose** — como montar quando nenhum trigger casa, e como registrar.
7. **budget** — limites por cena e por vídeo.

Âncoras do painel: #s01-cor · #s02-tokens · #s02b-icones · #s03-gabarito ·
#s04-moldes · #s04b-gancho · #s04c-esquemas · #s04d-enfase · #s04e-lettering ·
#s04f-simetria · #s04g-interfaces · #s05-movimento.

## 0. Como o sistema cresce (procedimento para vídeo novo)

O sistema é uma gramática, não um catálogo. Para um texto novo:
1. **Transcreva alinhado por palavra** (t de cada palavra, em quadros a 60fps).
2. **Divida em beats** (uma ideia por beat, 2–6s). Para cada beat, classifique
   a lógica da fala pela tabela de §6b (transformação, contraste, sequência,
   composição, certo/errado, afunilamento, ciclo, hierarquia, derivação) ou
   pela natureza (uso de app → §6b2; sensação sem objeto → só legenda).
3. **Decida o peso** (§6a): N3 / N2 / N1 / molde / legenda. Verifique o ritmo
   (nível → molde → nível; nunca dois N3 em 15s).
4. **Monte a partir das peças**, nunca do zero: nó, rótulo, conector, linha de
   item, painel, balão, barra, círculo-check, anel, traço. Uma peça nova só se
   nenhuma combinação das existentes nomeia a ideia — e então ela entra aqui
   com medidas, estados (foco / dito / fundo / futuro) e movimento.
5. **Escolha ícones por SEO** (icons-map.json) e registre (icons-log.json).
6. **Passe pelo verificador** (§6c e §10) antes de renderizar.
7. **Registre o que nasceu**: molde/variante nova → seção correspondente deste
   guia + specimen no painel. O guia é a fonte; o painel é a prova visual.

## 1. Colorido: um portador de espectro por quadro

Regra dura: **em cada quadro existe no máximo UM portador de cor viva**, e ele
é sempre uma destas três formas do mesmo espectro (`--z-spectrum`, 8 paradas,
opacidade 0,7–0,9):

| Forma | Onde | Espessura |
|---|---|---|
| **Anel** | em volta do elemento em foco: círculo, bloco, pill, ponto, botão de slider, avatar, célula | 3 até 48px de diâmetro · 4 de 49 a 100 · 6 acima de 100 |
| **Traço** | sob a palavra (N3, gancho) ou sob a palavra-chave de uma frase (headline) | 6 sob palavra grande · 4 sob frase |
| **Selo** | o próprio Zeus: selo de fecho (220) ou mini-selo (44) no cabeçalho de interfaces | anel 6 · anel 3 |

- O portador **migra**, nunca duplica: quando um item ganha anel, o mini-selo do
  cabeçalho perde o dele; quando o traço entra, nenhum anel está na cena.
- Cor de terceiro citada (anel do Instagram, logo oficial) **conta como o
  portador**: enquanto está na cena, o espectro espera.
- Cor semântica (`--z-ok` verde, `--z-error` vermelho) não é espectro: só em
  badge certo/errado, e pode coexistir com um portador de espectro.
- Área colorida ≤ 5% da tela. Gradiente nunca em preenchimento, texto ou fundo —
  em nenhum molde, nem no lettering. `--z-rainbow-text` fica por histórico.
- Tudo que não é o portador é cinza do sistema: conector, seta, divisória,
  barra, trilho, borda.

## 2. Regra do foco — presença × ênfase

Duas dimensões separadas:
- **Presença** (tempo): oculto · entrando · visível · saindo. "Futuro" = oculto.
- **Ênfase** (visual): neutro · foco · dito · fundo.

| Ênfase | Anel | Tinta | Opacidade | Blur | Quando |
|---|---|---|---|---|---|
| neutro | não | black | 1 | 0 | conjunto lido como um todo; estado inicial |
| foco | espectro | black | 1 | 0 | o que a fala descreve agora |
| dito | não | gray600 | .8 | ≤3 em ícone/imagem · 0 em texto | já falado; ainda se lê |
| fundo | não | gray400 | .6 | 0 | existe, não é o assunto |

Recuo é primeiro por **contraste**. Blur ≤3 é permitido em **ícone, imagem ou
bloco** (pista de profundidade) e proibido em **rótulo, número ou qualquer texto
que ainda precise ser lido**. Rótulos essenciais permanecem legíveis. Comparações: os dois lados
legíveis. Tudo nasce neutro; o recuo só vem com o anel e o acompanha (24q).
Contexto preexistente entra pronto (reveal); só a ação narrada acontece
diante do público. Item de presença "oculto" entra na palavra.

### Presença: o que já existe vs o que nasce
- Interface que já existia na história (o app aberto, a lista de leads):
  entra **pronta**, reveal 12–18q.
- Item que a narrativa cria (nova mensagem, novo lead, etapa concluída):
  **nasce** na palavra, com o gesto natural.
- Etapa prevista (passo 4 de um método): visível como fundo desde o início.
- Nova mensagem: oculta até a palavra.

(A tabela antiga "quatro estados" está substituída por esta.)

## 2-legado. Regra do foco — quatro estados (substituída)

O anel diz "é disto que a fala está falando"; o recuo tira o resto do caminho.
Os mesmos quatro estados valem para trio, grade, esquema e interface:

| Estado | Anel | Tinta | Filtro | Ícone | Quando |
|---|---|---|---|---|---|
| **Foco** | espectro | black | nenhum | 100% | o que a fala descreve agora |
| **Dito** | não | gray600 | blur 3 · opacity .75 | 60% | já foi falado; ainda se lê |
| **Fundo** | não | gray400 | blur 6 · opacity .45 | 45% | existe, mas não é o assunto |
| **Futuro** | não | — | — | — | **não existe ainda**; entra na palavra |
| Neutro | não | black | nenhum | 100% | a fala trata o conjunto como um todo |

- Tudo nasce **neutro** (nítido). O recuo só acontece quando um item ganha o
  anel — o recuo acompanha o anel, nunca vem antes. Sem anel, tudo nítido.
- Exceção **recuo sem blur**: quando todos precisam continuar legíveis
  (KPIs, cartões de público, tabela de comparação): só cor (gray50 + gray600).
- Troca de foco: 24q `smoothInOut`; o anel é um objeto só e **desliza** (x, y e
  tamanho interpolam). Blur e tinta trocam junto. Ícone do destino respira
  1,00 → 1,04 → 1,00 em 30q.
- Nunca dois itens em foco; nunca a cena inteira recuada.

## 3. Vidro sutil (novo)

Dois níveis, nunca vidro sobre vidro:

- `glass` (célula, pill, cartão de número): fill branco 70%, blur 12,
  borda 1px rgba(29,29,31,.08), sombra `0 1 2 /.04 + 0 8 24 /.05`.
- `glassCard` (cartão de vídeo): fill branco, mesma borda, sombra
  `0 2 6 /.05 + 0 24 48 /.09`, raio 32.

Célula preenchida (contagem) é `black` chapado, sem vidro.

## 3a. Legenda — gabarito

Papel: apoio para quem assiste sem som, não destaque. Faixa 904×122
(y 1039 → 1161, centro 1100; 57,3% da altura). Inter 58/700/−0,022em, black, caixa baixa, centrada.

- **Sem pontuação** (ponto, vírgula, exclamação, interrogação, aspas) — regra da
  legenda apenas; citação de depoimento e nome próprio de marca seguem a
  ortografia normal. Número em
  algarismo. Sem maiúscula inicial, nem em nome próprio. Sem emoji.
- Máx. 2 linhas, 3–6 palavras por linha, Δ entre linhas ≤ 30%, quebra em
  fronteira de sentido.
- Uma legenda = uma frase falada de 1,5–3,5s. Fala longa quebra em pausa natural.
- Palavra a palavra em sincronia com o áudio: cada palavra entra em t − 3q,
  settle 12q, y +8 → 0. Nada muda de cor (sem karaokê).
- Vícios de fala ("né", "tipo", "então") saem da legenda, não do áudio.

**Quando some:** cede o canal da fala quando o palco tem tipografia própria —
N2, N3, gancho, lettering, número grande, e a palavra do trio/grade quando é a
frase inteira. **Fica** em molde com ícone ou imagem (jornada, comparação, grade
com contagem, atributo solo), porque narra o que o objeto não diz.

**Timing:** sai 6q antes do destaque entrar (opacity 1→0, blur 0→6, y 0→−8,
easyEase 12q). Volta 10q depois do destaque assentar ou na próxima frase, o que
vier depois. Nunca sai e volta em < 1s. Nunca duas legendas no mesmo quadro:
uma sai, 4q de vazio, a outra entra.

## 3b. Ênfase na legenda — Playfair Display itálico

Legenda: Inter 58/700/−0,022em. A palavra enfatizada troca para **Playfair
Display itálico 400**, mesma cor black, corpo 62 (+8%, compensa a altura-x da
serifa). Nunca cor, peso, caixa alta ou sublinhado.

**Quando usar**
- A palavra que a voz enfatiza (volume/pausa) e que não ganhou destaque no palco.
- O contraste dentro da frase ("não vende aula, vende *transformação*") — só a
  segunda, nunca as duas.
- Palavra de valor ou emoção (liberdade, confiança, resultado); nunca verbo
  funcional ou conectivo.

**Quando não usar**
- Se a mesma palavra está no palco (N1/N2/N3) no mesmo instante.
- Em número, nome próprio, marca ou termo técnico (Instagram, ROI, tráfego pago).
- Em legenda de ≤ 3 palavras.
- Em legenda que aparece junto com N2/N3.

**Quanto:** máx. 1 palavra por legenda (2 só se forem o par de contraste); no
máximo 1 a cada 3 legendas seguidas.

**Como entra:** junto com a palavra, sem animação própria — a troca de fonte já
é o evento. Sem escala, cor ou brilho.

**Por quê:** cor está reservada, peso já é 700; a serifa itálica é a única
variável que resta e lê como voz humana — o equivalente tipográfico do traço
curvo à mão.

## 4. Raio (preenche lacuna #1)

Palco: `10 caixa · 18 balão · 24 célula/painel · 32 cartão de vídeo · 52 selo · pill`.
Dentro de painel (elementos menores): `8 miniatura · 14 controle/cartão interno · 18 balão`.
Filho dentro de pai com padding p usa raio(pai) − p. Fora destes valores não
existe raio.

## 5. Espaço (preenche lacuna #2)

Palco (escala 6): `6 · 12 · 18 · 24 · 44 · 88`.
Dentro de painel (escala 4): `4 · 8 · 12 · 16 · 20 · 24` — a interface é mais
densa que o palco; 24 é o padding do painel e o ponto onde as duas escalas se
encontram.

Rótulos (Inter 600, caixa alta): `30/0,08em` no palco · `24/0,08em` em esquema
denso · `22/0,06em` dentro de interface · `18/0,08em` metadado · `16/0,08em`
micro (só em interface). Sempre um destes cinco.

| Uso | Antes | Agora |
|---|---|---|
| Traço / anel | 6 | 6 |
| Respiro interno mínimo, ícone→rótulo em célula | — | 12 |
| Entre irmãos de grade | 18 | 18 |
| Padding de célula / pill lateral / elemento→rótulo | 26 / 28 / 24 | 24 |
| Entre canais / entre colunas do trio | 44 | 44 |
| Margem lateral | 88 | 88 |

## 6. Moldes redesenhados

**Palavra conceito** — Inter 900, −0,032em, tamanho pela largura, teto 140 (10 letras cabem em 904).
Traço **6**, largura **95% da palavra** (medida na caixa do texto), centrado,
**12px abaixo da linha de base**, pontas redondas. **Quase reto, com curva
discreta de risco à mão**: path `M 0 3 Q w/2 0 w 3` (sobe 3px no centro).
Nunca reto, nunca mais curvo que isso. Medidas conferidas no frame
"ESTRATÉGIA" de referência. Desenha da esquerda
para a direita (stroke-dashoffset), não do centro. Letras a 1,5q; traço
desenha em 24q após a última letra.

**Grade com contagem** — 4 colunas × 3 linhas, células 96, raio 24, respiro 18.
Vazias = glass; a contagem **preenche de black** uma célula a cada 4q,
sincronizada com o número (200/**900**/−0,04em, tabular). Rótulo 30/600/0,08em
gray600 a 12 abaixo do número, alinhado à esquerda. Sem cor.

**Trio de atributos** — recuo por contraste (gray400, opacity .6), sem blur em rótulo. Círculo 148, ícone 64 traço 2, pill 64 de altura,
padding 24, rótulo 30/600/0,08em. Colunas 264, 44 entre elas (880 ≤ 904), 24 entre
círculo e pill. Regra do foco se aplica.

**Grade de conceitos** — recuo por contraste, sem blur em rótulo. Blocos 280×158, raio 24, glass, respiro 18.
Ícone 40 traço 2, 12 até o rótulo 26/700/0,06em (máx. 2 linhas, quebra no
código). Regra do foco se aplica; entrada em cascata de 4q.

**Comparação certo e errado** — errado à esquerda, certo à direita, sempre.
Imagem 200: círculo só para foto de perfil; outras mídias em raio 24 na
proporção original. Anel do Instagram (`--z-ig-ring`, 6px) só quando a peça
fala do perfil. Badge 64 no canto inferior direito (−6/−6), miolo branco com
sombra glass, anel 3 em `#E02B2B` (X) ou `#1DB954` (check), ícone Lucide 30.
Pill 64 a 24 da imagem, rótulo 30/600/0,08em. Colunas 320, 88 entre elas.
Vale para qualquer par: foto, bio, legenda, thumbnail, gancho. Regra do foco
se aplica ao par; o badge nunca recua.

## 5b. Gancho inicial

Princípio (do gancho do Instagram): 1 palavra grande (máx. 2) + linha cinza
pequena 30/600/0,08em que completa a frase falada. Logo de terceiro só do
arquivo oficial, e então nenhuma outra cor no gancho.

- **A** palavra black + traço curvo (padrão)
- **C** mini-selo Zeus 120 (anel girando) + palavra black + linha cinza
- **B v2** palavra black + linha pequena com espectro (em avaliação;
  contraste baixo em 30px)
- **Reprovado:** palavra grande inteira colorida (1B v1). Não repetir.

## 5c. Lettering — a quebra de padrão (v2)

Pôster tipográfico vertical, preto, muitas palavras e muitas vozes, empilhado
e centrado. A cor entra uma vez só: o anel de espectro em pill ao redor da
tônica. **Máx. 1 por vídeo**, no clímax, nunca nos primeiros 5s. Ocupa o
palco expandido (y 1039 → 1536, 497 de altura): a legenda some. Nada mais.

**7 vozes, todas pretas** — cada linha uma voz, nunca a mesma em linhas
vizinhas; máx. 1 mono, máx. 2 Playfair:
Inter 400 (dito) · Inter 600 (firme) · Inter 900 caixa alta (afirmado) ·
Inter 600 caixa alta espaçada 0,24em gray600 (anunciado) · Playfair itálico
400 (sentido) · Playfair 700 caixa alta 0,06em (solene) · JetBrains Mono 500
0,1em gray600 (técnico).

- 14–22 palavras, 6–9 linhas, 1–4 palavras por linha; cada linha = unidade de
  sentido (pausa da fala).
- Corpos 26–72. Linha forte (900/tônica) 52–72; fraca (400, espaçada, mono)
  26–40. Alterna forte e fraca.
- **Tônica:** Inter 900 **preta** dentro de pill branca (padding 10/28) com
  anel de espectro 6 (opacidade 0,9) — o anel do trio, em volta da palavra.
  Única cor da cena. Corpo igual à linha forte vizinha (± 8); nunca a maior por
  > 12px. 1 por lettering. **Texto colorido não existe no sistema.**
- Régua 64×2 gray200 opcional divide a pilha em duas metades de sentido.
- Centrada em x; centro óptico em y (sobe 12); largura máx. 820; respiro 8.
- **Entrada palavra por palavra na fala, letra por letra no desenho:** cada
  palavra começa em t_palavra − 3q (transcrição alinhada por palavra). Letras em
  cascata de 1,5q; cada letra blur 12→0, y +8→0, opacity 0→1, settle 16q. Se a
  fala é mais rápida que a cascata, ela encurta (piso 1q) — nunca atrasa a
  próxima palavra. Só a linha atual se move. Tônica: mesma cascata; o anel
  desenha 0→360° (settleSoft 24q) a partir da última letra. Fica ≥ 3s após a
  última palavra. Sai junto (easyEase 24q).

## 6a. Escala de ênfase — 3 níveis = ritmo

Referência: PauloRuizReels 0:09 e 0:50 são nível 2 (hoje sem símbolo).

| Nível | O que carrega a ideia | Peças | Limite | Som |
|---|---|---|---|---|
| 3 · máximo | a **palavra** (conceito abstrato, sem desenho óbvio) | palavra 140/900 + traço 6 a 95%, 12 abaixo; sem ícone | 2–3 por vídeo | peso 10 |
| 2 · frase | a **frase** (2–4 palavras para a ideia existir) | círculo 120 + anel + ícone 56 **centralizado acima**; 20 até o apoio 30/600 gray600 caixa baixa; 8 até a frase 84/900/−0,032em em 2 linhas centradas | 3–4 por vídeo | peso 7 |
| 1 · média | o **símbolo** (algo que se desenha; a palavra só nomeia) | círculo 180, ícone 80, anel 6, pill 64 a 24 | ≥ 3s entre dois | peso 4 |

Entradas: N2 círculo (settle 24q) → apoio 12q depois → linhas palavra a palavra
(3q). N1 círculo scale .96→1 + blur 6→0 (settle 24q) → pill 12q depois.

### Como ler a transcrição e escolher o nível

**Pergunta 1 — o que carrega a ideia?**
Símbolo (coroa, medalha, relógio, cadeado) → N1. Palavra abstrata (estratégia,
autoridade, clareza) → N3. Frase de 2–4 palavras ("promessa específica", "isca
de sardinha") → N2.

**Pergunta 2 — qual é o peso na narrativa?**
Máximo = a palavra que a pessoa deve lembrar do vídeo (promessa do gancho, volta
no fecho). Médio = tese de um bloco (vem depois de "o problema é…", "a diferença
é…", "o segredo é…"). Leve = atributo, exemplo, passo. Se peso e pergunta 1
discordam, **o peso manda**: palavra abstrata com peso leve vira N1 com o ícone
mais próximo; símbolo com peso máximo vira N3 (palavra sozinha).

**Sinais indiretos** (a fala não diz "isto é importante"):
- Repetição: palavra dita 2+ vezes em 10s sobe um nível.
- Pausa > 0,5s antes/depois da palavra = ênfase de voz → pelo menos N1.
- Estrutura anunciada ("três coisas", "de um lado… do outro", "antes… depois",
  "primeiro… depois") → **molde** (trio, tabela, jornada, passos), não nível.
- Frase-moldura ("anota isso", "presta atenção", "o nome disso é", "isso se
  chama") → N3 na palavra seguinte.
- Definição ("X é quando…") → X em N2 ou N3; a definição fica na legenda.
- Lista falada sem número → itens de tabela/grade, cada um entra na sua palavra.
- Pergunta retórica → sem destaque; a resposta recebe o nível.

**Decisão rápida:** símbolo > palavra → N1 · palavra > símbolo → N3 · frase
2–4 palavras → N2 · estrutura anunciada → molde · sem peso → legenda. Ícone
sempre Lucide traço 2 e sempre nomeia a ideia; sem ícone óbvio = a palavra
manda (N3).

### Ritmo — alternância narrativa, nunca aleatória

Ordem visual segue a construção da mensagem:
gancho (N3 ou logo) → contexto (só legenda) → estrutura (molde) → tese (N2) →
prova/exemplo (comparação, N1) → fecho (N3 de volta + selo).

- Entre dois destaques do mesmo nível entra um molde ou um trecho só de legenda.
- Nunca dois N3 em 15s. Nunca o mesmo molde duas vezes seguidas.
- Fala corrida sem estrutura: 8–12s só com legenda e rostos é permitido e
  melhor — o silêncio visual dá valor ao próximo destaque.
- Dois blocos seguidos pedindo o mesmo molde: o segundo troca de peça
  (grade → trio, tabela → jornada) mantendo o conteúdo.

## 6b. Esquemas — da lógica da fala para o desenho

Gramática (a fala decide o esquema):

| A fala diz | Esquema | Foco |
|---|---|---|
| "de X para Y" (transformação) | Jornada: 2 nós + conector | vai de A para B |
| "X é isso, Y é aquilo" (contraste) | Tabela: 2 colunas, pill de título, linhas de item | coluna falada |
| "primeiro, depois, então" (sequência) | Passos: 3–5 nós numerados em linha + conectores | avança |
| "X tem A, B e C" (composição) | Trio / Grade de conceitos | item falado |
| "certo / errado" | Comparação | par; badge nunca recua |
| "muitos entram, poucos chegam" | Funil: 3 faixas 72 (520→380→240) raio 18 + número à direita | desce |
| "gera, que gera, que volta" | Ciclo: 3–4 nós 112 em loop, arcos 6 com seta | gira |
| "nível, estágio, básico→avançado" | Níveis: faixas 60 crescendo (220→520) raio 14, seta ao lado | sobe/desce |
| "um vira três" / "três causas" | Ramificação: raiz 128 + 3 ramos curvos sem seta + nós 80 | ramo falado |
| "pesa mais", "X ou Y" | Balança: travessão 6 + 2 pratos pill 200×64; inclina 6° | lado falado |
| "no dia 1… em 30 dias" | Linha do tempo: linha 6 + marcos 12; falado = ponto 14 + anel 3 | marco dito |
| "onde X encontra Y" | Venn: 2 círculos 260; interseção círculo 140 + anel; rótulos em pills 48 abaixo | meio |
| "muito/pouco × muito/pouco" | Matriz 2×2: eixos 4; quadrantes 220×120 raio 18 | quadrante |
| "frio, morno, quente" / "de 1 a 10" | Escala: trilho 12 (760) + botão 44 anel | botão desliza |
| "sem X × com X" | Espelho: 2 cartões 380×300 raio 24, 24 entre; sem seta | direita |
| "em cima disso" | Camadas: faixas 62 raio 16 estreitando para cima (660→360) | camada falada |
| "X mais Y é Z" | Equação: nós 112 + operadores Inter 300 64 gray200; resultado 128 + anel | resultado |
| "onde está × onde quer" | Lacuna: colunas 160 (90 e 220) a 120; conector 6 do topo da baixa ao topo da alta; pills 48 | coluna alta |
| "você, quem te segue, desconhecidos" | Concêntrico: anéis 300/190/80 à esquerda; rótulos em pills 48 à direita ligadas por linha 2 gray100 | anel falado |

Peças: **nó** (círculo 148 ou pill 64), **rótulo** (30/600/0,08em a 24 do nó),
**conector** (linha 6 gray200, ponta em seta chevron 18 quando há direção; **sempre cinza**),
**linha de item** (60 de altura, divisória 1px gray100). Seta só como ponta do conector,
nunca curva desenhada, nunca colorida. O nó "antes" não tem cor própria:
recua pela regra do foco (blur 6, gray400).

**Jornada A→B** — colunas 272, conector 216 cinza com seta, ao centro dos nós.
Linha do tempo (q = quadro, 60fps):
- q0 nó A entra: scale .98→1, blur 6→0, opacity 0→1, settle 24q
- q12 rótulo A: y +16→0, blur 12→0, settle 20q
- q24 conector desenha da esquerda (dashoffset 216→0), settleSoft 30q; chevron nos últimos 8q (opacity + scale .8→1)
- q48 nó B entra (igual a A), sem anel
- q60 rótulo B
- t("chega") − 6q: anel nasce em B (opacity 0→.7, scale .96→1, settleSoft 24q); simultâneo, A + rótulo recuam (blur 0→6, black→gray400, opacity 1→.7, smoothInOut 24q)
- saída: tudo junto, scale 1→1.02, blur 0→6, opacity→0, easyEase 24q

**Tabela comparativa** — colunas 400, 44 entre elas, pill 64 de título a 12 do
corpo; corpo em cartão glass raio 24, linhas de 60 com hairline gray100 entre
elas (sem grade completa: vira planilha). Item entra no instante da palavra. Máx. 5 itens por coluna, 2 palavras
por item. Anel desliza entre as pills quando a fala troca de coluna.

**Passos** — 3–5 nós numerados 112 (número 900), colunas 160, conector 72 com
seta, rótulo a 16. Conector à direita do ativo só desenha quando a fala avança.
**Funil** — nunca triângulo; o estreitamento das faixas é o funil. Próxima etapa
sem número até ser dita.
**Ciclo** — 3–4 nós 112 sobre círculo de raio 130; arcos no mesmo círculo, de
14 após a borda de um nó até 14 antes do próximo, seta na chegada; rótulos fora
do círculo (22/600). O arco que sai do nó falado desenha (settleSoft 30q) ao ir
ao próximo; na 2ª volta tudo nítido, só o anel gira.
**Níveis** — faixas separadas por 10, nunca triângulo preenchido; abaixo do
falado recuado, acima a 50%.
**Ramificação (mapa mental)** — ramos sem seta (derivação, não sequência);
3 → 1 espelha. Movimento: raiz entra (settle 24q), rótulo 12q; a cada item
falado o ramo cresce a partir da raiz (dashoffset, settleSoft 30q), o nó nasce na
ponta (scale .6→1, settle 12q), rótulo 6q depois, anel nasce com o nó; o ramo
anterior recua (24q) enquanto o novo cresce; raiz recua após o 1º ramo. Até 5
ramos alternando acima/abaixo; 2º nível (1→3→2) só se a fala aprofundar.

Sincronia com a fala (regra para o código):
1. Marque o quadro t_k de cada palavra-chave na transcrição.
2. A peça entra em t_k − 6q e assenta em t_k + 14q (20q, settle).
3. Foco vai para a peça mais recente; anteriores recuam em 24q (smoothInOut).
   O esquema entra vazio (nós/colunas) 24q antes da primeira palavra-chave.
4. Palavras-chave a menos de 12q se agrupam numa peça só.
5. O esquema sai inteiro, junto, 30% antes do fim da cena (easyEase).
6. Um portador de cor por quadro, e é sempre o anel. Conectores, setas e
   divisórias são sempre gray200.

## 6b2. Simulação de interface

**Foco: o desfoque não é o padrão, é direção de atenção.**
- Tudo nasce nítido: a interface entra inteira e limpa.
- Quando a fala aponta um elemento, ele recebe o anel e **só então** o resto
  recua (24q smoothInOut). O recuo acompanha o anel, nunca vem antes.
- Fala sai do elemento sem apontar outro → tudo volta a nítido (24q).
- Fala descreve a interface como um todo → nada recua, ninguém tem anel.
- Itens futuros (balão, etapa, ponto) não recuam: não existem ainda; entram na
  palavra.
- Dois degraus de recuo, só dois: já dito = blur 3 / 75%; fundo = blur 6 / 45%.
- Nunca mais de um elemento em foco; nunca a cena inteira recuada.
- Os specimens do painel mostram um instante do meio da fala — por isso têm
  itens recuados.

Para quando a fala descreve o uso de um app (chat Telegram/WhatsApp, DM,
notificação, e-mail, painel). Referência: ZeusTrafegoReels (carol) 0:08.

- **Reduz ao reconhecível**: só cabeçalho, balões e o controle em questão. Sem
  status bar, teclado, campo de digitar, ícones de canto.
- **Tudo em cinza do sistema**; o app real é colorido, a simulação não. Sem logo
  do app por padrão (a fala nomeia); se indispensável, oficial em 36px no canto.
- **Presença do Zeus = mini-selo** 44 com anel 3 — único portador de cor.
- Painel único glass raio 24, largura 640–760, centrado; altura pelo conteúdo,
  máx. 340. Padding 24, 16 entre blocos, 12 entre balões.
- Balões raio 18 com canto de 4 no lado de quem fala (sem cauda desenhada);
  usuário à direita em gray50, Zeus à esquerda em branco com borda gray100.
- Tipo: nome 26/700, corpo 24/400; **números e metadados em Inter 700 com
  algarismos tabulares** (−0,01em). A JetBrains Mono saiu das simulações
  (rústica demais); sobrevive só como voz "técnica" do lettering. Nunca Inter 900
  dentro da simulação.
- Áudio: play 44 black, 20 barras de 3px em alturas de tabela
  (10,18,26,14,30,22,12,28,16,24,8,20,26,14,18,30,12,22,16,10), tocadas black,
  restantes gray200.
- Foco: o balão falado nítido; anteriores blur 3 / 75%; futuros não existem.
- Movimento: painel entra vazio (settle 24q); balão entra na sua palavra
  (t − 6q, settle 20q, y +16→0). Playback das barras é linear em tempo real —
  única linear permitida. Sai tudo junto.
- Ondas/gráficos/medidores: barras de largura fixa em alturas de tabela; nunca
  curva ou ruído aleatório.

**Variante painel de configuração** (ref. ZeusTrafegoReels carol 0:17):
- Cabeçalho: mini-selo Zeus 44 + nome 26/700 + estado 20/600 gray600 à direita.
- Cada ajuste = linha: ícone Lucide 24 + rótulo 24/600/0,06em + valor em
  Inter 700 tabular 24 à direita + controle abaixo. Divisória hairline entre linhas.
- Controles: slider (trilho 6 gray100, preenchido black, botão 28 branco com
  borda); toggle 52×30 (ligado black); campo (linha 60, valor Inter 700 tabular); botão
  (pill 48 black, texto branco 22/600).
- Cor: quando o Zeus age num controle, o anel de espectro desce para ele (40,
  anel 4) e o selo do cabeçalho perde o anel — um portador por quadro.
- Foco: linha falada nítida; já dita blur 3/75%; futura blur 6/45%, sem valor
  legível.
- O ajuste acontece na fala: slider desliza (settle 30q) quando o número é dito;
  valor em Inter 700 tabular conta junto (settleSoft). Nunca aparece já ajustado.
- Legenda continua (é objeto, não texto). Sem pontuação.

**Variante gráfico** (crescimento, evolução, comparação; ref. 2 dos 3 vídeos):
gráfico é interface, não ilustração — sempre dentro do painel glass 700. A linha
solta com rótulos flutuando está reprovada.
- Cabeçalho: mini-selo Zeus 44 + título 26/700 + número-resultado em Inter 700 tabular 24 à
  direita (o gráfico existe para chegar nesse número).
- Área 652×230: só a linha de base gray200 (sem grade); eixo em Inter 700 tabular 16 gray400.
- Linha 3 black, curva do dado (sem dado real: subida monotônica em 3
  segmentos; nunca vale-e-pico decorativo). Pontos 14 branco/borda 3.
- Barras: 40 de largura, raio 8, gray200; a falada black. Pizza proibida.
- Máx. 4–5 pontos/barras; 1 série (2 séries = 2 painéis de 430 ou gray400 +
  black).
- Só o ponto em foco tem rótulo (22/600/0,08em black); o rótulo viaja com o
  anel. Pontos passados sem rótulo, borda gray400.
- Cor: anel de espectro 40 no ponto (ou pill-anel na barra) que a fala descreve;
  o selo do cabeçalho perde o anel enquanto um ponto o tem.
- Movimento: painel vazio com grade (settle 24q); a linha desenha da esquerda
  (dashoffset, settleSoft) até o ponto dito, para, e segue quando a fala avança.
  Ponto nasce (scale .6→1, settle 12q) quando a linha chega; rótulo 6q depois;
  número do cabeçalho conta (settleSoft) no último trecho. Barras crescem de
  baixo (scaleY, settle 24q), uma por palavra.

**Variante checklist mínimo** (ref. ZeusTrafegoReels carol 0:12):
- Painel 520, sem cabeçalho. Linha 60: círculo 36 + uma palavra 26/600. Texto
  real (o que a fala diz), nunca barras cinzas. 3–5 etapas.
- Feito = círculo black + check branco, texto gray600; agora = anel de espectro
  44, texto black; futuro = círculo vazio gray200, 45%.

**Variante checks puros** (a fala só conta; a legenda nomeia):
- 3–5 círculos de 64 em linha, 44 entre eles, direto no palco (sem painel).
- Feito = black + check branco; agora = anel 80; futuro = vazio a 60%.
- Movimento: anel migra ao próximo item (smoothInOut 24q); círculo preenche
  (scale .9→1, settle 16q); check desenha (dashoffset 12q); linha antiga recua;
  contador soma (settleSoft). Tudo na palavra da fala.

**Variante perfil do Instagram**
- Painel 700. Avatar 96 com anel do Instagram (citação; única cor de terceiro —
  por isso o Zeus não aparece no cabeçalho). 3 métricas em Inter 700 tabular 28 + rótulo
  16/600/0,08em gray400. Nome 24/700, bio 20 gray600 (1 linha). Faixa de 6
  miniaturas 96 raio 8 (uma linha); o post apontado é black com anel de espectro 4 — só
  depois que a fala sai do perfil.

**Variante post / reel**
- Painel 560. Avatar 40 + nome 22/700 + reticências. Criativo 150, raio 14,
  gray100 com a palavra CRIATIVO (nunca imagem de terceiro). Ações Lucide 26
  (heart, message-circle, send, bookmark); a ação falada recebe anel 56.
  Contagem em Inter 700 tabular 18 gray600. Sem legenda do post.

**Variante notificação**
- Cartões 600, raio 24, empilhados a 12, sem painel. Avatar 44 + nome 22/700 +
  hora Inter 600 tabular 16 gray400 + texto 20 (máx. 2 linhas). A lida tem selo com anel e
  texto black; outras selo cinza e texto gray700. Entra de cima (y −24→0,
  settle 24q), uma por frase; máx. 3 na pilha.

**Variante métricas (KPI)**
- Painel 700 com cabeçalho (Zeus + título + período Inter 700 tabular). 3 cartões raio 14
  gray50; rótulo 15/600/0,1em gray400 + valor Inter 700 tabular 34. O KPI citado: branco com
  borda + anel de espectro 6, valor black. Outros ficam legíveis (recuo só de
  cor, sem blur). Valor conta do zero (settleSoft 40q) quando é dito.

**Variante checks em lista**: 3–5 círculos de 48 em coluna, 18 entre eles, sem
painel; preenche um por palavra, anel desce.

**Variante destaques do Instagram**: painel 700; 4–5 círculos 104 (miolo gray100)
+ rótulo 18/600/0,06em; falado com anel e rótulo black; não citados 45%.

**Variante feed com capas**: painel 700, 4 colunas, quadrados raio 8 gray100 com
função da capa 13/700/0,06em; capa falada black + texto branco + anel 4; não
faladas 50%; entram uma por palavra (settle 16q, 4q entre).

**Variante cartão de público** (baleia × sardinha): 2 cartões 320 raio 24 no
palco; ícone fish em círculo 64 (escala 34 × 22 é o argumento); nome
22/700/0,08em + 2 linhas de perfil; falado branco + borda + anel 6; outro gray50
sem blur.

**Variante cartão de headline**: painel 700; sobretítulo 18/600/0,12em gray400;
frase 34/700 em 3 linhas equilibradas; palavra-chave com traço de espectro 4;
rodapé mini-selo cinza + ESCRITA COM O ZEUS.

**Variante chat em texto**: balões 22/400 (máx. 2 linhas, 440); lido black,
anteriores gray600 + blur 2; "digitando" = 3 pontos de 10 (meio 100%, outros
35%, pulso 1s easyEase); selo sem anel enquanto pulsa.

**Variante progresso / temporizador**: sparkles em círculo 72 com anel; título
24/600; tempo Inter 700 tabular 24; barra 8; barra e tempo em tempo real
(linear permitida); ao fechar, anel migra para um check.

**Variante calendário de consistência**: painel 700 com contador; 7 colunas × 2
semanas, quadrados raio 8: feito black + check 18; hoje branco borda black +
anel 4; futuro borda gray100. Um dia por batida (settle 12q, 3q entre).

**Variante cartão de depoimento**: avatar 56, nome 22/700, função 16/600/0,08em
gray400, badge-check em círculo 48 com anel; citação 26/400 com aspas curvas
(“ ”), 1 palavra Playfair itálico. **Citação obedece à ortografia normal**:
maiúscula inicial, vírgulas e ponto final antes do fecho das aspas — a regra de
caixa baixa sem pontuação é da legenda, não da fala de terceiro; texto real de
pessoa nunca é reescrito. Nunca estrelas. Único molde com texto corrido.

**Variante lista de leads**: painel 700 com contagem; linhas 56: avatar 40 + nome
22/600 + estado 16/600/0,08em; citado com anel no avatar; outros 55%; novo entra
pelo topo (y −16→0, settle 20q).

**Variante meta com progresso**: rótulo + meta gray400; valor atual Inter 700
tabular 64; barra 10 com botão-anel na ponta; rodapé 18 gray600; número conta do
zero (settleSoft 40q), barra cresce junto.

**Variante enquete / caixa de perguntas**: painel 600; pergunta 22/600 em caixa
18 gray50; opções em barras 48 raio 14 com preenchimento gray100 = %; citada com
contorno 3 e texto black; outra 55%; preenchimentos crescem (settle 30q).

**Variante busca / explorar**: painel 640; campo pill 56 gray50 + lupa 22 +
termo 22 (entra letra a letra, sem blur); 3 resultados em linhas 64 (avatar 40 +
nome 20/600 + meta 16 gray400); apontado com anel 3 no avatar; cascata 4q.

**Variante comentários**: painel 640 sem cabeçalho; avatar 36 + usuário 18/600
gray600 + comentário 21/400 (máx. 2 linhas) + coração 18 a 40%; lido com anel 3;
novo entra por baixo (y +16→0, settle 20q); máx. 3.

**Variante agenda / horários**: painel 640; mini-selo cinza + título 22/700 +
duração; grade 4 colunas de 52 raio 14: ocupado gray50 riscado; livre branco com
borda; escolhido black + anel 3; preenchem um a um (settle 12q, 3q).

**Variante confirmação** (venda, pagamento, inscrição): sem painel; círculo 96
black + check 36 + anel 4; rótulo 18/600/0,12em gray400; valor 64; linha 20
gray600; check desenha (12q), número conta (settleSoft 40q). Pode fechar bloco.

**+10 interfaces (referência)**: e-mail/relatório (640; remetente Zeus com anel; assunto 24/600; corpo 20 ×2) · oferta/checkout (600; preço 56; botão pill 60 black + contorno 3 — único botão preto grande permitido) · player de aula (640; área 170 + play 72 anel 4; barra 6 em tempo real) · videochamada (640; 2 câmeras 150 raio 14; contorno migra com o sujeito) · tabela de dados (640; ≤3 col × 4 linhas 48; linha falada com **ponto de espectro 10** — anel vira ponto quando não há contêiner) · ranking (640; posição em círculo 48; barra 8 proporcional) · formulário (560; campos 52 raio 14; cursor 2×26; digitação 1,5q) · toggles (640; 52×30; contorno 3 no que a fala liga) · teste A/B (640; 2 criativos 130; números contam juntos) · contagem regressiva (sem painel; número 72 em círculo 160 anel 6; tempo real; nunca vermelho, nunca pisca).

**Ajustes de revisão**
- Painel de configuração: máx. 2 ajustes por cena; cabeçalho só selo cinza +
  nome; anel 3 no botão do slider (34).
- Chat de áudio: a cor vai ao play do áudio que toca (anel 3); selo cinza.
- Destaques: rótulo em pill 44 (16/600), não solto.
- Feed com capas: ícone 26 no topo de cada capa (pelo mapa); capa falada branca
  com borda + anel (não preta).
- Calendário: dia feito = branco com borda black 2 + check black (não preto).
- Agenda: horário escolhido = branco com borda black 2 + anel 3.
- Perfil: miniatura apontada = branca com borda + anel.
- Confirmação: círculo 96 vazado (borda black 3, check black) + anel 4.
- Cartão de público: anel 4 no peixe + contorno 2 no cartão — **anel aninhado**
  (contêiner + seu ícone) conta como um portador.
- Perfil: avatar 88, bio 1 linha, faixa de 6 miniaturas 80.
- Headline: rodapé "SUGESTÃO DO ZEUS", selo cinza (a cor está no traço).

**Toda interface se move, pela sua natureza** — o código declara o gesto:
| Gesto | Onde | Movimento |
|---|---|---|
| range | meta, slider, enquete | botão/preenchimento desliza + número conta junto (settle 30q) |
| lista | leads, comentários, notificações | item novo entra por uma ponta (y ±16→0, settle 20q) e empurra |
| contador | checklist, calendário, agenda | preenche na palavra (scale .9→1, settle 16q), check desenha 12q |
| traçado | gráfico, jornada, ciclo | desenha até o ponto dito (settleSoft) e espera a fala |
| playback | áudio, progresso | tempo real, única linear |
| digitação | busca, chat em texto | letra a letra 1,5q, sem blur |
| confirmação | venda, etapa final | círculo preenche + check + número conta |
| foco-migra | perfil, post, destaques, cartões | anel desliza 24q smoothInOut; recuo acompanha |
Painel entra vazio (scale .98→1, blur 6→0, settle 24q); sai junto (easyEase 24q).
Nada aparece já pronto.

**Biblioteca combinável (moldes-index.json)**: cada molde/esquema/interface é
uma entrada {id, família, nível, tags, peças, gesto, combina-com}. Para um beat
novo: buscar por tags do trecho → maior score → se nenhuma cobre, **compor**
(painel de uma + gesto de outra + peças de terceira, sempre com as medidas
deste guia) → registrar a composição como entrada nova + specimen.

**Regras transversais novas**
- **Travessão e hífen de pausa nunca** (—, –, -) em citação, legenda, lettering
  ou rótulo. Pausa é vírgula ou quebra de linha. Aspas só em depoimento.
- Cor de terceiro (anel do Instagram, logo oficial) conta como portador: o anel
  de espectro espera enquanto ela está na cena.
- Recuo sem blur quando todos os itens precisam continuar legíveis (KPI,
  comparação de números): só cor. Blur é para o que não precisa ser lido agora.

## 6b3. Interfaces — versão motion (a que vai para o vídeo)

As variantes de §6b2 são a **versão completa** (landing, apresentação, site).
**No vídeo a interface é símbolo**: a pessoa tem 2s para associar; a legenda
diz o resto. Derivação mecânica da completa:
- texto → barra pill: título 10 gray600 a 60% da largura; corpo 8 gray200 a 40%;
  máx. 2 barras por bloco, 8 entre elas, alinhadas à esquerda.
- avatar → círculo gray100 · imagem → bloco gray100 · número → barra black 20.
- Fica em texto real **só o dado que a fala lê** (preço, meta, tempo, nome do
  app): uma palavra ou um número por cena.
- Painel, anel, estados de foco, gesto e medidas: idênticos à completa.
- Barras crescem da esquerda na entrada (scaleX 0→1, settle 20q, 4q entre) —
  lê como escrita acontecendo.
- Molde sem versão motion: aplicar a substituição e registrar `*-motion`.
Especímenes em #s04h-motion (31 + 6 no celular): chat texto, chat áudio, formulário, lista,
perfil, configurações, notificação, tabela, confirmação, aprovação×reprovação,
comparativo A×B, descrição, apontamento, checklist, métricas, gráfico, feed,
post, e-mail, busca, agenda, player, videochamada, checkout, enquete, progresso,
ranking, comentários, destaques, meta, cartão de público. Cada card do painel
documenta: o que é · como funciona · variações · comportamento.

**Comportamento padrão de toda variante motion:** painel entra vazio (settle
24q) → estrutura fixa em cascata (4q) → barras crescem da esquerda na fala
(scaleX, settle 20q) → portador de cor nasce no item falado e migra (smoothInOut
24q), nunca pisca → recuo acompanha o anel → gesto natural → saída junta
(easyEase 24q, scale 1→1,02, blur 0→6). Nada aparece pronto; nada em linha reta
exceto playback.

**Cor semântica × espectro:** aprovação/reprovação usa verde/vermelho em círculo
vazado e não leva anel — a cor semântica já é o evento.

**Formulário motion:** o que diz "formulário" é ícone clipboard-list + título,
mini-rótulo (barra 60×6) sobre cada campo, ícone do dado dentro do campo (user,
phone, mail) e botão pill black com barra + seta.

### Quando usar cada esquema (e quando não) — 25 lógicas, 23 esquemas próprios
(“certo/errado” e “X tem A, B, C” são atendidas pelos moldes da §6: Comparação e Trio/Grade.)
Regra de desempate: o esquema mais simples que ainda mostra a relação que a fala
afirma; entre dois, o de menos elementos; sem relação afirmada → destaque ou
legenda.
- **Jornada A→B** — a fala tem origem e destino ("sai de… chega em"). Não: quando não há movimento, só dois estados → Espelho.
- **Tabela comparativa** — dois lados com 2–5 atributos cada. Não: só um atributo por lado → Espelho.
- **Passos** — ordem importa e são 3–5. Não: sem ordem → Trio/Grade.
- **Funil** — quantidades diminuem por etapa. Não: sem noção de perda → Passos.
- **Ciclo** — o último gera o primeiro. Não: sequência que termina → Passos.
- **Níveis** — hierarquia de baixo para cima com nomes. Não: sem hierarquia → Grade.
- **Ramificação** — uma coisa se abre em 2–5. Não: as partes têm ordem → Passos.
- **Balança** — escolha entre dois pesos. Não: três ou mais opções → Grade.
- **Linha do tempo** — marcos com datas ou prazos. Não: sem tempo → Passos.
- **Venn** — a ideia está no encontro de duas. Não: sem interseção → Espelho.
- **Matriz 2×2** — dois critérios cruzados. Não: um critério só → Escala.
- **Escala** — grau de uma coisa (frio→quente). Não: categorias discretas → Níveis.
- **Espelho** — sem X vs com X, sem transformação. Não: há caminho entre eles → Jornada.
- **Camadas** — constrói de baixo para cima. Não: não há dependência → Grade.
- **Equação** — partes somam um resultado nomeado. Não: sem resultado → Trio.
- **Lacuna** — distância entre atual e desejado. Não: há etapas entre eles → Passos.
- **Concêntrico** — proximidade/alcance a partir do centro. Não: sem centro → Níveis.
- **Trio / Grade** — lista de 3 / 4–6 sem ordem. Não: com ordem → Passos.
- **Comparação** — certo × errado com imagem. Não: sem imagem → Espelho.
- **Gargalo** — a fala aponta UMA etapa que trava o resto. Não: a perda é gradual em cada etapa → Funil.
- **Causa e efeito** — "isso acontece porque"; há um mecanismo entre origem e consequência. Não: os eventos só se seguem no tempo → Linha do tempo.
- **Árvore de decisão** — uma condição abre dois caminhos ("se… se não"). Não: os caminhos não excluem um ao outro → Ramificação.
- **Filtro por critérios** — critérios explicam quem passa e quem fica fora. Não: só a quantidade diminui → Funil.
- **Evidência anotada** — há um material real (print, mensagem, tela) a mostrar. Não: não há material → Descrição ou N2.
- **Manual × automatizado** — duas trajetórias da mesma tarefa, com contagem de passos. Não: é atributo × atributo → Tabela comparativa.

## 6c. Simetria e equilíbrio — inteligência espacial

Antes de desenhar, **conte**: elementos, palavras, largura real de cada palavra.
Regra única: **nenhuma linha fica com menos da metade da linha mais cheia** —
para blocos, círculos, itens e palavras.

### Arranjo por contagem (elementos iguais)

| N | Arranjo | Nota |
|---|---|---|
| 2 | 1 linha | 88 entre |
| 3 | 1 linha | trio, colunas 264 |
| 4 | 2 + 2 | nunca 4 em linha (blocos) |
| 5 | 2 + 3 | incompleta em cima |
| 6 | 3 + 3 | padrão |
| 7 | 3 + 4 | incompleta em cima |
| 8 | 4 + 4 | células 96 |
| 9 | 3 + 3 + 3 | células 96 |
| 10 | 3 + 4 + 3 | centrado |
| 12 | 4 + 4 + 4 | contagem |

- Linha incompleta em cima, centrada (a base cheia ancora). Exceção: contagem,
  que preenche em ordem de leitura numa grade sempre completa.
- Máx. 3 blocos de 280 por linha (876 ≤ 904); máx. 4 células de 96. > 9 blocos
  vira lista/tabela; > 12 células, o número sozinho é o argumento.
- Toda linha centrada no palco; respiro entre linhas = entre colunas (18).
- Altura pelo pior caso; conteúdo ancorado no topo.

### Quebra de frase — algoritmo

1. Meça a largura real de cada palavra (fonte e corpo reais; não conte letras).
2. Linhas: 1 se cabe em 904; senão 2; 3 só em N2/lettering.
3. Teste todas as quebras; escolha a que minimiza Δ de largura entre linhas.
4. Descarte quebras que separam artigo/preposição/pronome/"não" da palavra
   seguinte, e linhas que terminam em conectivo (que, e, mas).
5. Se Δ > 30%, reduza o corpo 4px e repita (piso 50 legenda, 72 N2). Se não
   resolve, corte uma palavra da legenda ou quebre em duas legendas.
6. Palavra sozinha na última linha é defeito — exceto tônica de lettering ou 2ª
   linha de N2.

### Peso visual (elementos desiguais)

- Tabela com colunas desiguais: mesma altura de cartão; a curta recebe respiro
  embaixo. Nunca linha vazia, nunca item inventado.
- Jornada/comparação: nós do mesmo tamanho; diferença é foco, nunca tamanho.
- Ícone + texto: eixo no centro do ícone; ícones na mesma altura, texto cresce
  para baixo.
- Número + rótulo: rótulo ≤ largura do número; quebra em 2 linhas antes de
  encolher.
- Centro óptico: conjunto de 1 linha sobe 12 em relação ao centro do palco;
  2 linhas centram no geométrico.
- Caixa alta pesa ~15% mais: conte isso ao equilibrar linhas de lettering.

### Verificador antes de renderizar

A cena só renderiza se: (1) N contado e arranjo da tabela; (2) nenhuma linha
< metade da mais cheia; (3) Δ ≤ 30% e sem quebra proibida; (4) sem palavra
sozinha na última linha; (5) centrado em x e no centro óptico em y; (6) ≤ 904
de largura e ≤ 374 de altura.

## 7. Ícones — um estilo só

**Decisão: objeto 3D branco sai do sistema.** Renders (baleia/sardinha) misturam
linguagens, variam a cada geração e não aceitam anel, foco nem cinza. Todo
objeto no palco é ícone de traço, dentro de um contêiner. Comparação de tamanho
= dois círculos (180 e 100) com o mesmo ícone (80 e 40).

### Biblioteca (Lucide 0.452) — um significado por ícone, sempre o mesmo
lock cadeado/acesso · crown autoridade · pencil conteúdo · globe alcance ·
award medalha/resultado (substitui trophy) · target objetivo/público · users audiência · message-circle
conversa/DM · play vídeo/reel · image criativo · calendar rotina · clock tempo ·
trending-up crescimento · link conexão · lightbulb ideia · star destaque ·
rocket lançamento · megaphone tráfego/anúncio · fish isca/lead · route
método/caminho.

+40 (mentoria, Instagram, vendas, negociação): handshake acordo/negociação ·
badge-check credibilidade · gem premium · wallet dinheiro/preço · banknote
faturamento · percent conversão/desconto · shopping-cart compra · tag oferta ·
scale decisão · key acesso/segredo · map-pin posicionamento · compass
estratégia · flag meta · layers estrutura · puzzle solução · filter funil ·
mic fala/live · at-sign perfil · hash alcance · bell aviso · heart engajamento ·
bookmark salvar · send enviar/DM · smartphone mobile · book-open
conhecimento/curso · graduation-cap aluno · brain mentalidade/IA · sparkles
IA/Zeus · repeat consistência · zap rapidez/atalho · shield-check garantia ·
hourglass urgência · eye atenção · footprints jornada · door-open oportunidade ·
signal nível de consciência · anchor fundamento · gift bônus/isca · coins
investimento · chart-no-axes-column-increasing crescimento.
Conceito novo: procurar em lucide.dev/icons antes de desenhar.

### Escolha por SEO do conceito (icons-map.json) — nunca aleatória
Cada ícone tem 8–12 termos associados (palavra, expressão, sinônimo, gíria).
Algoritmo: normalizar o trecho da fala (minúsculas, sem acento, lema) → pontuar
cada ícone pelos termos que casam (expressão inteira > palavra > raiz) → maior
score vence → empate: menos usado nos 3 vídeos anteriores (icons-log) → empate:
significado fixo mais próximo do peso da fala. Score 0 = sem ícone: N3, ou
desenhar pela gramática e adicionar ao mapa. Um trio nasce de três trechos da
fala, cada um pelo ranking — nunca de "três ícones bonitos".

### Registro de uso (icons-log.json) — rotação, não proibição
Cada vídeo grava `{ video, segundo, molde, icone, conceito, assinatura }`.
Antes de escolher:
1. Ícone usado para o mesmo conceito em algum dos 3 vídeos anteriores → use o
   sinônimo visual (autoridade/valor: crown → award → badge-check → gem;
   objetivo/posicionamento: target → compass → flag → map-pin; dinheiro:
   wallet → banknote → coins → tag).
2. Conceito-assinatura do mentor (mesmo argumento em todo vídeo) → repetir é
   certo; marcar `assinatura: true`.
3. No mesmo vídeo, um ícone nunca aparece em dois moldes.
4. Sem sinônimo que nomeie a ideia → desenhar pela gramática e adicionar à
   biblioteca. Nunca trocar por ícone que não nomeia só para não repetir.
O mesmo ícone pode voltar a partir do 4º vídeo.

### Gramática do traço (para desenhar o que não existe)
- Caixa 24×24, área 20×20 (margem 2); nada toca a borda.
- Traço 2, único; sem preenchimento, sombra ou gradiente.
- Pontas e juntas round; retângulos raio 2.
- Geometria em inteiros/meios; arcos perfeitos; ângulos 45°/90°.
- Máx. 3 formas; o que não se lê a 40px sai. Sem textura, olho, perspectiva —
  silhueta plana, frontal ou de perfil.
- Traços paralelos a ≥ 2 de distância.
- Peso óptico igual ao de `lock`; comparar lado a lado antes de aprovar.
- Exportar SVG com stroke="currentColor" em `assets/icons/<nome>.svg` e
  registrar na tabela com o significado.

### Uso
- Tamanhos: 24 linha de painel · 40 célula · 56 N2 · 64 trio · 80 N1 · 116 selo ·
  140–180 objeto solo (nunca acima de 180).
- **Traço óptico constante (~6–7px na tela)**: o traço do SVG escala com o
  ícone, então em 140px o traço 2 vira 11,7px e pesa mais que o anel. Regra:
  `strokeWidth = clamp(1.25, 2, 160 / tamanho)` → até 80: 2 · 116: 1,4 ·
  140+: 1,25. Mesma biblioteca, valor calculado no render (lucide-react,
  `strokeWidth`); nunca via <img>. O verificador de traço checa ícones também.
- Sempre dentro de contêiner (círculo, célula, linha); ícone solto não existe.
- Cor: black em foco, gray400 recuado, branco só dentro de círculo black.
- Nunca: emoji, preenchido, outra biblioteca misturada, dois ícones no mesmo
  círculo, ícone sem palavra que ele nomeie.
- Sem ícone óbvio → N3 (a palavra manda).

## 8. Gabarito (preenche lacuna #5)

Ver seção 03 do painel. Cartões 940×400 em x70 / y180 e y596, raio 32.
Legenda centro 1106, faixa 134, largura 904. Palco 1162→**1536** (374), largura 904.
Zona morta inferior passa a 20% (384px): é onde o Reels desenha legenda, nome,
música e botões. Zona superior segue 160 — o Instagram recomenda ~14% (269),
mas o cartão de vídeo em 180 tem ficado limpo na prática; rever se a UI cobrir.
Elemento se centra no palco, não na tela.

## 9. Movimento (novo)

Lei única: **nenhuma propriedade muda em linha reta**. Todo movimento começa
parado, acelera e desacelera até assentar — Easy Ease nas duas pontas, sempre.
Vale para entrada, saída e troca de estado. `linear`, `ease-in` ou `ease-out`
sozinhos, corte seco de estado, overshoot e escala > 1,04 são defeito.

| Movimento | Propriedades | Curva | Quadros |
|---|---|---|---|
| Cena sai | scale 1→1,02 · blur 0→6 · opacity 1→0 | easyEase | 24 |
| Cena entra | scale 0,98→1 · blur 6→0 · opacity 0→1 · y ≤16 | settle | 24 (sobrepõe 10) |
| Anel troca de foco | x, y, tamanho deslizam; blur/tinta dos irmãos trocam junto | smoothInOut | 24 |
| Respiro do item em foco | scale 1→1,04→1 | easyEase | 30 |
| Célula preenche | scale 0,9→1 · opacity | settle | 16, 4 entre células |
| Número conta | valor interpolado ao longo da cascata | settleSoft | duração da cascata |
| Letra entra | y 16→0 · blur 12→0 · opacity | settle | 20, 1,5 entre letras |
| Traço desenha | dashoffset da esquerda para a direita, curva de 3 | settleSoft | 24, começa 6 após última letra |
| Cascata de blocos | igual a "cena entra" | settle | 4 entre irmãos |
| Comparação | errado entra, certo 12 depois; badges scale 0,8→1 após assentar | settle / settleSoft | 24 · 16 (X, check +8) |
| Interface entra | painel vazio scale 0,98→1 · blur 6→0 | settle | 24 |
| Item de interface entra | y ±16→0 · blur 6→0 · opacity (na palavra, t − 6) | settle | 20 |
| Anel desce a um controle | anel do selo → anel do controle (posição e tamanho) | smoothInOut | 24 |
| Progresso / playback | barra ou onda em tempo real | **linear** (única permitida) | duração real |
| Legenda sai / volta | opacity · blur 0→6 · y −8 | easyEase / settle | 12 / 12 |

## 9a. Contradições corrigidas na v2.1 (resumo)
- Um portador por quadro vale para cor citada: comparação com dois anéis do
  Instagram → só no lado descrito.
- Pontos sólidos de espectro (10/12) → mini-anel 14 vazado.
- Gancho 1B (texto colorido) → reprovado em qualquer versão.
- Live no player: indicador neutro vazado (vermelho é só erro).
- Anel aninhado (ícone + cartão) → um contorno só.
- Recuo: contraste primeiro; blur 6/45% deixou de ser padrão (§2).
- 04f: 6 itens = 3 colunas × 2 linhas; blocos de 280 → máx. 3 por linha.
- Barras de texto: máx. 3 por bloco (Descrição corrigida).
- Coração preenchido → contorno (nenhuma exceção de ícone preenchido).
- "Nada aparece pronto" → contexto entra pronto; só a ação narrada acontece.
- Preço fixo é revelado, não contado; contagem só quando a evolução é o argumento.
- Enquete 64 + 36 = 100. Ranking: barras proporcionais só com valores.
- Curva monotônica só em variante ilustrativa; dados reais preservam geometria.
- Onda gravada (forma fixa + playback) ≠ visualizador ao vivo (amplitude real).
- Progresso ≠ playback: avança por etapa; sem dado → indeterminado.
- Legenda 1039→1161 (122): não sobrepõe o palco (1162).
- Palavra: teto 140, medir largura real (painel dizia 160–220).
- Traço de ícone: alvo 6,5px; strokeWidth = clamp(1, 2, 6,5×24/tamanho).
- settle não "começa parado": é response (parte prontamente e desacelera);
  funções: response · transfer · reveal · exit.
- Rótulos: conteúdo em foco ≥ 22; 16/18 só detalhe.
- Sólido: limite por item (64) + por cena (≤3 sólidos, ≤1% da área);
  exceção formal: célula de contagem 96 em movimento.
- Itens: ≤5 itens de significado; células de contagem até 12; detalhes internos
  não contam; acima disso, dividir a cena.
- gesto foco-migra → foco (índice e roteador sincronizados).
- icons-log: IDs do índice, segundos obrigatórios, exceção de assinatura.
- Roteador: regras de relação, confiança, fallback, gancho como função.
- Presets de composição: dois vídeos + palco · um vídeo + palco maior · esquema
  em tela inteira · close de interface.

## 9b. Massa visual: sólido × vazado

Preto cheio pesa. A mesma forma preenchida lê ~5× mais pesada que vazada, e o
palco existe para a palavra, não para blocos.
- **Sólido permitido** só em elemento pequeno: até 64px de lado (check, ponto,
  botão de play, célula de contagem 96 quando está em movimento e o preenchimento
  é o argumento).
- **Acima de 64px, o elemento em foco é vazado**: branco com borda black 2 (ou
  3 em círculos grandes) + anel; ícone e texto black. Vale para capa de feed,
  dia de calendário, horário de agenda, miniatura de perfil, círculo de
  confirmação, cartão.
- Regra prática: área preta > 1% do palco (≈ 3.400px²) ou mais de 3 sólidos na
  mesma cena → vaze.
- O anel já é o evento; preencher de preto por cima dobra o peso sem informar.

## 9c. Peso de traço constante (heurística geral)

O olho quer a mesma espessura na tela, independente do tamanho do objeto:
- Ícone: strokeWidth = clamp(1,25, 2, 160/tamanho) — traço visual ≈ 6–7px.
- Anel: 3 até 48 · 4 até 100 · 6 acima.
- Traço da palavra: 6 sob palavra grande · 4 sob frase.
- Borda de foco: 2 até 100 · 3 acima.
Se um elemento cresce, seu traço em px de tela **não** cresce junto. Biblioteca
de ícones tem duas classes de uso: **s** (≤ 80, stroke 2) e **l** (> 80,
stroke calculado, piso 1,25). Mesmos arquivos; só o valor muda.

## 9d. Princípio da expectativa (movimento)

Todo movimento faz o que o olho já espera de uma interface:
- Coisa nova entra pelo lado de onde vem (lista: pelo topo ou pela base; balão:
  do lado de quem fala; ramo: a partir da raiz).
- Progresso anda para a direita; contagem cresce; tempo corre em tempo real.
- O anel migra pelo caminho mais curto; nunca teleporta.
- Blur é profundidade: o que recua fica "atrás"; o que entra vem "de trás"
  (blur → 0), nunca "de cima" (scale > 1,04).
- Nada aparece já pronto; nada some em corte; nada muda em linha reta (exceto
  playback/progresso).
- Toda transição CSS/Remotion do sistema é uma destas versões: entrar
  (settle), assentar (settleSoft), trocar (smoothInOut), sair (easyEase). Uma
  curva fora dessas quatro é defeito.

## 9e. Motion por natureza do elemento (v2.1)

O movimento é linguagem. Seis perguntas antes de animar: o que mudou · qual
objeto materializa · qual verbo visual (revelar, conectar, preencher, deslocar,
expandir, substituir, selecionar, confirmar, remover) · origem espacial e
causal · o que fica imóvel · qual estado final se lê. Sem mudança e sem atenção
a dirigir → parado. Sem respiração, rotação ou brilho como repouso.

Classes temporais (60fps, pontos de partida): feedback 6–10 · revelação 10–16 ·
transferência 16–24 · reorganização 20–32 · reenquadramento 24–36 · processo
mensurável = duração real. Curvas por função: response=settle ·
transfer=smoothInOut · reveal=settleSoft · exit=easyEase; linear só tempo
uniforme; overshoot desabilitado; objeto em movimento continua da velocidade
atual. Stagger round(i×1,5). Intervalos [início, fim).

Matriz de comportamento por elemento (24 elementos) e natureza do movimento
dos esquemas: painel #s05b-motion-semantico. Contrato motionSpec por objeto:
elementId, nature, semanticVerb, communicates, triggerEventId,
anchorElementId, primaryProperty, supportingProperties, coordinateSpace,
startFrame, durationFrames, easingToken, invariants, finalReadableState,
holdUntilEventId, exitReason, reducedMotionFallback. Foco com ownerId único.
Teste de subtração: remover blur/scale/stagger/rotação um a um.

Storyboards estáticos (não executados como animação): formulário preenchido e
enviado · trio com transferência de foco · causa e efeito.

## 9e2. Do After Effects para o Remotion (vocabulário técnico)

**Premissa:** nada é estático — todo objeto tem entrada, sustentação e saída
declaradas. "Parado" = *hold*, não ausência de animação. Intensidade mínima que
comunica: deslocamento ≤16px, escala ≤1,04, blur como profundidade.

| AE | Remotion | Regra Zeus |
|---|---|---|
| Comp 1080×1920 60fps | `<Composition fps={60}>` | duração em frames, sempre |
| Pre-comp | `<Sequence from durationInFrames>` | tempo local: `useCurrentFrame()` já descontado; não subtrair startFrame 2× |
| Keyframe + Easy Ease | `interpolate(frame,[f0,f1],[v0,v1],{easing, extrapolateLeft:'clamp', extrapolateRight:'clamp'})` | clamp = hold antes/depois |
| Graph Editor | `Easing.bezier()` | response (.1,.45,.75,1) · transfer (.45,0,.15,1) · reveal (.12,.4,.8,1) · exit (.33,0,.67,1); linear só tempo uniforme |
| Spring/overshoot | `spring({damping:200, stiffness:100})` ou `overshootClamping:true` | sem overshoot |
| Anchor point | `transformOrigin` | barra: left center · barra de gráfico: bottom center · painel: center |
| Parenting | wrapper com o transform do grupo | cartão move como grupo; filho sem stagger próprio |
| Trim Paths | `strokeDasharray=L` + `strokeDashoffset` interpolado | L = `getTotalLength()` medido |
| Track matte | `clip-path: inset()` / `mask-image` | anel = `mask-composite: exclude` (vazado) |
| Gaussian Blur | `filter: blur()` | entrada 6→0 (item), 12→0 (letra), 8→0 (linha de lettering); saída 0→6; dito ≤2 (nunca em rótulo); fundo 0 |
| Sequencing | `delay = Math.round(i*step)` | step 1,5 letra · 3 palavra · 4 bloco · 6 linha; arredondar uma vez |
| Time remap | continuar da posição e velocidade atuais | nunca reiniciar em zero |
| Motion blur | desligado | distâncias curtas + blur de profundidade na mesma cena = sujeira |

**Determinismo:** toda propriedade = f(inputs, frame); sem Date.now,
Math.random, setInterval, requestAnimationFrame ou estado incremental.

**Receita de cena (todo molde):** `[in]` contexto (opacity 0→1, scale .98→1,
blur 6→0, reveal 12–18q) → `[build]` estrutura em cascata (response 20q,
round(i×4)) → `[act]` a ação narrada, um gesto, em t−6q → `[focus]` anel único
interpolando x,y,w,h,r (transfer 20–24q) com o recuo no mesmo intervalo →
`[hold]` ≥60q imóvel e legível → `[out]` saída junta (opacity 1→0, scale
1→1,02, blur 0→6, exit 24q), overlap 10q, foco liberado no 1º frame da saída.

## 9f. Produção (handoff Remotion)
60fps; toda propriedade = f(inputs, frame); sem Date.now/Math.random/
setInterval; fontes carregadas antes de medir; assets com versão fixada;
intervalos [início, fim); arredondar uma vez por evento; overlap de cena 10q com
frame de liberação/aquisição do foco; CSS do painel é preview, não implementação.
Contrato BeatPlan/WordTiming/FocusEvent: ver CHANGELOG.md § handoff.

## 9g. Som por peso do gesto (sfx-map.json)

O som sai do **peso do gesto** (0–10), nunca da escolha de quem monta: dois
gestos iguais recebem sempre o mesmo som. O peso escolhe o arquivo e o volume
na biblioteca de SFX do squad.

| Peso | Som | dB | Onde |
|---|---|---|---|
| 0 | silêncio obrigatório | — | traço da palavra, contagem em curso, legenda, playback de áudio real |
| 1–2 | tick mínimo | −20 a −22 | repetição, detalhe, digitação, célula |
| 3–4 | tick/sweep/pop suave | −15 a −18 | cascata, anel migra, item de lista, conector, barra |
| 5–6 | médio/ding/click | −12 a −14 | nó, painel, check, badge, número que assenta, botão |
| 7–8 | grave/whoosh longo | −10 a −11 | N2, gargalo que libera, tônica do lettering |
| 9–10 | whoosh longo + grave | −9 | N3 e selo de fecho (máx. 2 por vídeo) |

Regras: 1 som a cada 2,5s no máximo · eventos a menos de 8q → corta o de menor
peso (não soma) · cascata ≥6 irmãos → soam 1º, meio e último · nunca dois ≥7 em
3s · saída de cena e entrada da próxima não soam juntas · ataque no 1º frame do
movimento (ding/click de conclusão, no frame em que ele para) · som ≥7 em pausa
da voz, senão −3 dB · pan pela origem espacial · soma de pesos de uma cena ≤22
(um esquema costuma ter 3 a 6 sons).

Exemplo (jornada A→B): nó A 4 · conector 4 · chevron 5 · anel nasce 5 = 18.
Exemplo (grade com contagem, 12 células): painel 5 · células 2 (só a 1ª, a 5ª e
a última) · número assenta 5 = 16.

## 10. Checklist antes de exportar

1. Um protagonista por beat; um portador de espectro por quadro; ≤ 5%.
2. O portador é anel, traço ou selo — e tem a espessura da tabela (§1).
3. Todo raio, espaço e rótulo está numa das escalas (§4, §5).
4. Nenhum vidro sobre vidro; nenhum gradiente em preenchimento ou texto.
5. Estados de foco só entre os quatro (§2); recuo só depois do anel; futuro não
   aparece antes da palavra.
6. Toda curva suaviza nas duas pontas; única linear é progresso/playback;
   escala ≤ 1,04; nenhum estado troca em corte.
7. Contagem e arranjo pela tabela (§6c); Δ de linha ≤ 30%; sem palavra sozinha.
8. Legenda: caixa baixa, sem pontuação, ≤ 2 linhas, some nos moldes com
   tipografia própria (§3a).
9. Ícones da biblioteca, escolhidos pelo mapa, registrados no log; sem repetição
   no mesmo vídeo.
10. Nada ultrapassa 904 × 374 (ou 904 × 497 no lettering).
11. Nenhum sólido preto acima de 64px; elemento em foco grande é vazado + anel.
12. Traço de ícone calculado pelo tamanho; anel e borda pela tabela de §9c.
13. Cada movimento tem peso de som declarado (§9g); densidade ≤1 som/2,5s;
    soma de pesos da cena ≤22; nenhum SFX sobre peso 0.
