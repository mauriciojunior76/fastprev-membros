# Design system do Reels estilo Apple Conceitual

Sistema de design de vídeo vertical do Zeus, em Remotion. Este documento é
autossuficiente: todos os valores estão aqui dentro, não só o caminho deles.

Peças que seguem este sistema, todas aprovadas:

| Peça | Assunto | Duração | Estado |
|---|---|---|---|
| `PauloRuizReels` | o Instagram do mentor | 64,5s | aprovada, referência do sistema |
| `HamiltonZeusReels` | isca de baleia e isca de sardinha | 67,5s | aprovada |
| `ZeusTrafegoReels` | tráfego com a IA | 38,1s | aprovada, variante Popular |
| `BernardoDepoimentoReels` | depoimento de aluno | 32,9s | aprovada, variante Depoimento |

Formato: 1080 por 1920, 60 quadros por segundo.

---

## 1. O conceito

O estilo institucional do Zeus. Fundo branco puro, a pessoa aparecendo em dois
cartões de vídeo no topo, a fala virando legenda no meio da tela, e embaixo um
palco onde entra UM elemento por ideia. Esse elemento é quase sempre um objeto
3D branco, uma palavra grande, ou um número dentro de um cartão de vidro.

A sensação que ele passa é de autoridade calma: nada pisca, nada quica, tudo
desacelera antes de parar.

### A regra que governa tudo: uma coisa manda por vez

Se a cena tem tipografia grande própria, ou um número grande, a frase ocupa o
canal da fala e a legenda some. Se a cena tem objeto, o objeto não leva rótulo,
porque a legenda já narra. Nunca os dois.

Formulada de outro jeito nos documentos irmãos: "um beat, um protagonista.
Nunca dois elementos disputando atenção no mesmo instante."

### O teste do sósia

Congele um quadro do meio do vídeo e reduza a uma silhueta de 200px. Se aparecer
dois rostos empilhados em cima, uma legenda grande no meio e UM desenho de traço
preto sozinho embaixo, em fundo branco, é este estilo.

Se aparecer mais de um elemento se mexendo no mesmo quadro, ou fundo escuro, ou
cor fora do anel do fecho, não é.

---

## 2. O fundo

Cor chapada, sem camada nenhuma por cima. Sem textura, sem grão, sem vinheta,
sem gradiente. Fixo do primeiro ao último quadro: nenhuma cena troca o fundo.

| Variante | Fundo |
|---|---|
| Apple Conceitual e Popular | `#ffffff` |
| Depoimento (identidade Exemplo) | `#0a0806` |

Isso é decisão, não descuido. O grão existe em outros estilos da casa
(NeoAnalógica usa `feTurbulence` com opacidade 0,035 em modo overlay sobre
`#050505`), e foi deliberadamente deixado de fora daqui: o branco puro é o que
faz o objeto preto de traço ler como desenho técnico, não como ilustração.

---

## 3. As cores

A peça inteira é preta, cinza e branca. Toda a paleta:

| Token | Valor | Uso |
|---|---|---|
| `black` | `#1d1d1f` | tinta principal, traço de objeto, palavra grande |
| `gray900` | `#2d2d2d` | |
| `gray700` | `#424245` | |
| `gray600` | `#6e6e73` | assinatura do selo, rótulo secundário |
| `gray500` | `#86868b` | |
| `gray400` | `#a1a1a6` | ponto de partida numa jornada, estado "antes" |
| `gray200` | `#d2d2d7` | |
| `gray100` | `#e8e8ed` | |
| `gray50` | `#f5f5f7` | fundo de cartão de vidro |
| `white` | `#fbfbfd` | |
| `pureWhite` | `#ffffff` | fundo da peça inteira |
| `blue` | `#0071e3` | reservado, praticamente sem uso |

Paleta da variante Depoimento (papel invertido, identidade Exemplo): `black`
`#f3e9e0` (tinta quase branca), `gray600` `#a6897a`, `pureWhite` `#0a0806`
(fundo), acento `#d4a08a` rose gold.

### As duas exceções de cor semântica

| Cor | Valor | Por quê |
|---|---|---|
| Check aprovado | `#1DB954` | verde que qualquer pessoa já reconhece como confirmado |
| Veredito negativo | `#E02B2B` | vermelho de erro, no par de comparação certo e errado |

Não são decoração: são código de cor universal, e só aparecem em elemento cuja
função é dizer "isto está certo" ou "isto está errado".

---

## 4. O colorido

Aqui está a decisão mais importante do sistema, e a que mais custou a acertar.

Regra dura: **cor viva só existe em dois lugares, o anel do selo de fecho e o
traço embaixo da palavra destacada. Qualquer outra cor é defeito.**

Consequência prática: nenhuma ênfase por cor. Ênfase é troca de fonte. A legenda
enfatiza trocando para Playfair itálico, nunca pintando a palavra.

### Os três gradientes, e quando cada um vale

O espectro do anel do selo, 8 paradas, fecha em loop porque o anel gira:

```
{{marca.traco}} 0%   {{marca.espectro.2}} 14%   {{marca.espectro.3}} 28%   {{marca.espectro.4}} 42%
{{marca.espectro.5}} 56%  {{marca.espectro.6}} 70%   {{marca.espectro.7}} 84%   {{marca.traco}} 100%
```

O arco-íris de texto, 7 paradas, aberto porque texto é reto e não gira. As sete
cores entram uma vez só, do vermelho ao violeta:

```
#f01b1b 0%   #ff7a00 17%   #ffc400 33%   #00b341 50%
#0090ff 67%  #4a2ee0 84%   #a51fd0 100%
```

O anel de story do Instagram, citação literal da interface deles, usado só
quando a peça mostra um perfil do Instagram:

```
conic-gradient(from 0deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888, #f09433)
```

### Duas leis aprendidas na prática, cada uma custou uma reprovação

**Cor tem contexto de área.** Pastel funciona em traço fino de 6px e morre em
texto cheio. Por isso existem dois gradientes diferentes: o espectro suave para
o traço, o arco-íris saturado para letra grande.

**Marca em toda palavra deixa de ser marca.** Máximo de 2 ou 3 palavras com
traço de espectro por vídeo inteiro.

### Geometria do anel do selo

Retângulo arredondado de 220 por 220, raio 52 (23,6% do lado, nunca círculo).
Miolo branco com recuo de 11. Símbolo a 116 (52,7% do lado). Volta completa do
gradiente em 3 segundos, por ângulo do gradiente cônico, opacidade 0,7. Nunca
rotacionar o elemento: giraria o desfoque e o recorte junto.

Wordmark "ZEUS" em Inter 700, tamanho 40, espaçamento entre letras 0,04em.
Assinatura embaixo em 17, peso 600, espaçamento 0,16em.

---

## 5. Os elementos

### O palco: onde o elemento vive

A tela se divide em três canais fixos, de cima para baixo: os dois cartões de
vídeo, a legenda, e o palco. O elemento entra sempre no palco, nunca sobre o
vídeo nem sobre a legenda.

### Espessura de traço: duas, e só duas

| Token | Valor | Uso |
|---|---|---|
| `regular` | 3 | desenho principal, contorno do objeto |
| `hairline` | 2 | apoio, detalhe, textura |

Antes havia seis espessuras convivendo, às vezes quatro no mesmo ícone. A olho
isso lê como traço trêmulo, não como hierarquia. A Apple usa duas.

Detalhe técnico que sempre morde: `strokeWidth` no SVG é medido no espaço do
viewBox, não em pixel de tela. Toda espessura passa por uma função que compensa
a escala de exibição, e existe um verificador automático que barra quem esquecer.

### Tipografia dentro de elemento

| Token | Valores |
|---|---|
| Rótulo | tamanho 30, peso 600, espaçamento 0,08em |
| Valor numérico | tamanho 38, peso 800, espaçamento −0,01em |

### Os oito moldes prontos

Molde é a estrutura: a geometria, o ritmo de entrada, as proporções. O molde
pode e deve ser reaproveitado. Conteúdo é o que aparece dentro dele, e conteúdo
nunca se repete entre vídeos. Copiar a grade de seis blocos é certo; copiar os
seis ícones que estavam dentro dela é errado.

| Molde | Quando usar | Geometria que permanece |
|---|---|---|
| Gancho com logo de marca | abre citando uma plataforma | logo entra sozinho em 30 quadros, apoio 10 depois |
| Comparação certo e errado | a fala contrasta duas coisas | duas fotos lado a lado, badge X vermelho e check verde |
| Selo de resultado | fecha um ciclo, algo ficou pronto | logo e check na mesma linha, respiro 26 entre eles |
| Trio de atributos | a fala lista exatamente três coisas | círculos de raio 62, centros a 290, ícone 3px acima do centro |
| Grade com contagem | a quantidade é o argumento | três colunas, células de 66, respiro 12, número contando do zero |
| Grade de conceitos | a fala lista de quatro a seis conceitos | blocos de 280 por 158, respiro 18, ícone no topo |
| Jornada de A para B | promessa de transformação | letra A cinza e letra B preta, seta curva ligando |
| Palavra conceito com traço | a palavra sustenta o argumento | letra por letra em peso 900, traço de espectro embaixo |

### Raio de canto

Não existe token global de raio neste sistema; os valores vivem por componente:
painel 24, balão 18 com cauda 12, caixa de nome 10, selo 52. O design-core da
casa (usado nas páginas web, não aqui) define 14 e 8.

Isto é uma lacuna real do sistema, não uma decisão.

---

## 6. O espaçamento

### A tela e as zonas mortas

| Medida | Valor | O que é |
|---|---|---|
| Canvas | 1080 por 1920 | |
| Margem lateral | 88 | a faixa útil é de 88 a 992 |
| Zona morta de cima | até 160 | câmera e notificações do aparelho |
| Zona morta de baixo | a partir de 1632 | botões do Instagram e TikTok |
| Compensação de zona morta | 288 | sobe o conteúdo, 15% da altura |
| Centro geométrico | 960 | não é o centro que parece centro |
| Centro óptico | 816 | fórmula: (1920 menos 288) dividido por 2 |

### A grade da peça

| Medida | Valor |
|---|---|
| Cartão de vídeo | 940 por 400 |
| Distância entre os dois cartões | 16 |
| Topo do primeiro cartão | 180 |
| Bloco de vídeo inteiro | 816 (400 mais 400 mais 16) |
| Centro da faixa de legenda | 1106 (57,6% da altura) |
| Altura da faixa de legenda | 134 |
| Palco, altura normal | 360 |
| Palco, altura expandida | 470 |
| Respiro entre canais | 44 (metade da margem lateral) |

A conta da altura do palco expandido, que vale a pena entender porque é o
raciocínio do sistema inteiro:

```
base da legenda .................... 1140
respiro mínimo entre texto e elemento  22
primeiro y livre abaixo da legenda . 1162
base do palco (zona morta) ......... 1632
área útil = 1632 menos 1162 ........  470
```

### A tabela de respiro

| Situação | Respiro |
|---|---|
| Texto dentro de pill | 28 de padding lateral |
| Texto dentro de célula de grade | 26 em todos os lados |
| Entre blocos irmãos de grade | 18 |
| Entre círculos irmãos de raio 110 | 320 de centro a centro |
| Entre logo e selo na mesma linha | 26 |
| Entre elemento e o rótulo que o nomeia | 24 |

Duas regras que acompanham a tabela:

Altura de célula se calcula pelo pior caso de texto. Em grade com textos de
tamanhos diferentes, o conteúdo se ancora no topo, nunca centralizado, senão os
ícones deixam de dividir a mesma linha.

Cada componente declara a altura do que ele DESENHA, sem respiro embutido. O
respiro é do palco, não do componente. Um componente que declarava 420 quando a
tinta real eram 146 gerava 176px de espaço morto que ninguém via no código.

Não existe escala de espaçamento base 4 ou base 8 declarada. Os números da
tabela acima são o que há.

---

## 7. A tipografia

Inter, pesos 400, 600, 700, 800 e 900. JetBrains Mono só para valor numérico
dentro de painel, nunca para texto corrido.

| Elemento | Tamanho | Peso | Espaçamento |
|---|---|---|---|
| Sobretítulo | 18 | 600 | 6 |
| Legenda | 58 | 700 | −0,022em |
| Palavra conceito | grande | 900 | −0,032em |
| Rótulo de ícone | 30 | 600 | 0,08em |
| Valor numérico | 38 | 800 | −0,01em |
| Wordmark do selo | 40 | 700 | 0,04em |
| Assinatura do selo | 17 | 600 | 0,16em |

Ênfase na legenda troca para Playfair itálico. Nunca cor.

### Equilíbrio de linha

Toda frase de destaque que ocupa duas ou mais linhas precisa de linhas de
tamanho parecido. Uma palavra sozinha na última linha é defeito. A quebra é
controlada no código, nunca deixada para o navegador, e cai em fronteira de
sentido: nunca separar artigo ou preposição do nome que ele acompanha.

Régua: diferença de comprimento entre linhas até 30%. Existe verificador
automático que mede isso nos três tamanhos de tela.

---

## 8. O movimento

Curvas em uso, em cubic-bezier:

| Nome | Valores | Quando |
|---|---|---|
| `settle` | 0.1, 0.45, 0.75, 1 | entrada padrão do sistema; cauda de 19,8% |
| `settleSoft` | 0.12, 0.4, 0.8, 1 | elemento grande e fecho; cauda de 23,4% |
| `easyEase` | 0.33, 0, 0.67, 1 | o Easy Ease do After Effects; suaviza as duas pontas |
| `smoothInOut` | 0.45, 0, 0.15, 1 | transição de estado |
| `cinematic` | 0.16, 1, 0.3, 1 | a curva Exemplo, cauda de 1,2% |
| `dramatic` | 0.7, 0, 0.1, 1 | saída de peso |

O que "cauda" significa aqui: quanto do tempo o movimento gasta nos últimos 3%
da distância. Cauda longa é o que faz o elemento parecer que desacelera e
assenta, em vez de chegar e parar seco. É a assinatura do estilo.

| Medida | Valor |
|---|---|
| Duração rápida | 12 quadros |
| Duração média | 24 |
| Duração lenta | 40 |
| Duração de cena | 60 |
| Distância de entrada | 8 (mínima), 16, 28, 48 (máxima) |
| Escala de entrada | teto absoluto 1,04 |
| Desfoque de entrada | 6 (suave), 12, 20, 30 (máximo) |
| Intervalo entre letras | 1,5 quadro |
| Intervalo entre palavras | 3 |
| Intervalo entre cartões | 4 |
| Desenho de traço | 72 quadros |

Proibições que viraram regra depois de reprovação: nada de quique amador (o teto
de escala 1,04 existe por isso), nada de piscar, e o elemento sempre desacelera
antes de parar.

### Entrada e saída de cena

As cenas se sobrepõem em 10 quadros: a cena morre depois que a próxima já
nasceu, senão aparece um buraco branco entre elas.

A margem de saída se calcula: 30% da duração nominal, com piso de 24 e teto de
40 quadros.

---

## 9. O que já foi reprovado, e por quê

Cada linha aqui custou uma rodada de correção. São os limites do sistema.

| O que aconteceu | Por que é errado |
|---|---|
| Cor fora dos dois pontos permitidos | vira ruído e mata a hierarquia do preto e branco |
| Pastel usado em texto grande | cor tem contexto de área: some quando o traço engorda |
| Logo de marca de terceiro desenhado à mão | logo se copia do arquivo oficial, nunca se redesenha |
| Máscara ou opacidade em cor de marca | máscara em SVG trabalha por luminância e lava a cor |
| Gradiente em espaço de usuário sobre desenho com deslocamento | cada letra reinicia o gradiente |
| Mesma imagem em duas peças | conceito e estilo se repetem; imagem nunca |
| Dois elementos disputando o mesmo quadro | quebra a regra de um protagonista por beat |
| Elemento com respiro embutido na própria altura | gera espaço morto invisível no código |
| Seis espessuras de traço no mesmo desenho | lê como traço trêmulo, não como hierarquia |
| Foto recortada pelo centro geométrico | corta o queixo; enquadramento sai do rosto |

---

## 10. O som, em uma página

Não é design visual, mas anda junto: cada movimento com peso visual leva som, e
o som sai do peso do gesto, nunca da escolha de quem monta.

O componente declara o que acontece e quando (categoria e gesto). O som e o
volume vêm de uma tabela: peso 10 leva o whoosh longo a menos 9 dB, peso 7 o
grave a menos 11, peso 6 o forte a menos 13, peso 4 o médio a menos 15, peso 3 o
ding a menos 18.

Consequência: duas aparições do mesmo tipo de elemento não têm como receber sons
diferentes, porque o som nunca é escolhido por aparição.

Densidade máxima: um som a cada 2,5 segundos neste estilo. Acima disso o vídeo
cansa mesmo com cada som certo no lugar certo.

---

## 11. Onde o sistema está incompleto

Honestidade sobre o que falta, porque isto é o que mais interessa a quem vai
melhorar o sistema:

1. ~~**Raio de canto não tem token.**~~ Preenchido em 05/09/2026, ver seção 12.
2. ~~**Espaçamento não tem escala declarada.**~~ Preenchido em 05/09/2026, ver
   seção 12.
3. **A paleta está duplicada em três arquivos.** Trocar uma cor hoje exige
   editar três lugares. Ainda aberto.
4. ~~**Hierarquia visual não tem régua.**~~ Parcial: `core/scales.ts` traz a
   escala de rótulo (30, 24, 22, 18, 16). "O que o olho vê primeiro" continua
   sendo julgamento humano, sem algoritmo.
5. **Não existe wireframe nem layout de referência.** Cada peça nasce da
   leitura dos documentos, não de um gabarito visual. Ainda aberto.

O ponto 3 é onde um sistema de design maduro ajudaria mais agora.

## 12. Recebido do Claude Design v2.1 (05/09/2026): o que entrou, o que não, e por quê

O o dono do canal levou este documento ao Claude Design, que devolveu uma v2.1
(guia, tokens, índice de moldes, roteador por fala, mapa de ícones Lucide,
mapa de som). Material completo, sem editar, em
`aprendizado/propostas-externas/2026-09-05-claude-design-v2.1/`. Aplicado
primeiro no reel do Paulo (`PauloRuizReels`), seguindo
`COMO-ATUALIZAR-O-DESIGN-SYSTEM.md`.

### Entrou (código já reflete)

- **Raio e espaço em escala** (`core/scales.ts`): raio 10, 18, 24, 32, 52,
  pill; espaço palco 6, 12, 18, 24, 44, 88; rótulo 30, 24, 22, 18, 16.
- **Biblioteca de ícones Lucide** (`core/LucideGlyph.tsx`), escolhida por
  `public/_icones/icons-map.json` e registrada em `icons-log.json`, com
  `scripts/escolher-icone.js` e `scripts/registrar-icone.js`. Troféu virou
  `award` (deprecação do pacote recebido).
- **Molde N2 "frase-com-icone"**: círculo mais anel de espectro mais ícone
  mais apoio mais frase (usado em `LetteringPromessa`, `LetteringLiberdade`).
- **Quatro apelidos de curva por função** (`response`, `transfer`, `reveal`,
  `exit`, em `core/curves.ts`), bit a bit iguais às nossas `settle`,
  `smoothInOut`, `settleSoft`, `easyEase`: nome novo, curva idêntica.
- **Dado fixo é revelado, não contado** (`CinquentaMil`): meta, preço ou data
  usa reveal (opacidade), contagem do zero só quando a evolução é o
  argumento.
- **Regra do ritmo**: segundo bloco pedindo o mesmo molde troca de peça
  (`recap-doze` deixou de reusar `InstagramGrid`, virou `FeedCapas`).
- **Categoria de som nova, aditiva**: `conceito-com-icone` (peso 7, mesmo som
  de `frase-grande`) em `public/_sfx/catalogo.json`.

### Não entrou, e por quê (camada 1, decisão provada)

- **Texto colorido continua proibido**, exceto o gancho do Paulo
  (`LetteringHook`, wordmark do Instagram em arco-íris): exceção pessoal do
  o dono do canal, reafirmada em 05/09/2026 mesmo sabendo que o v2.1 reprova.
  Marcada em código (`SceneDef.corExcecao = "gancho-arco-iris"`).
- **Objetos 3D** (Hamilton, isca de baleia) ficam: o v2.1 queria tirá-los
  ("objeto 3D branco sai do sistema"), mas Hamilton já está aprovado e este
  plano não toca nele.
- **Zona morta inferior fica 1632** (nossa, medida), não 1536 (deles, "preset
  declarado, não verificado" no changelog recebido).
- **Som calibrado nas 3 peças aprovadas não muda**: o mapa de som deles
  inverte o peso do traço da palavra (nosso peso máximo vira silêncio) e
  sobe o peso de check e selo, mexendo em calibração já aprovada de ouvido.
  Recusa detalhada em `LOGICA-EFEITOS-SONOROS.md`.
- **Nós da jornada, A e B**: o v2.1 pedia círculo com a letra dentro, formato
  que já tinha sido reprovado 4 vezes antes de chegar na letra solta e
  grande. Perguntado, o o dono do canal decidiu aplicar mesmo assim, ver comentário
  em `JornadaSeta.tsx`. É a única vez que uma proposta de camada 1 entrou,
  por ordem explícita dele, não por decisão automática do sistema.

### Achados do revisor, corrigidos na mesma rodada

Blur em texto (rótulo, palavra, número) em 6 componentes: a régua do v2.1
proíbe desfoque fora de ícone e imagem, e a implementação inicial replicou o
padrão antigo por hábito. Corrigido em `LetteringHook`, `PalavraAutoridade`,
`PalavraEstrategia`, `LetteringPromessa`, `LetteringLiberdade` e
`CinquentaMil`. O selo de fechamento (`ZeusSealClose.tsx`) tem o mesmo
problema, mas é replicado em Hamilton e ZeusTrafego (aprovados): não mexido
sem decisão do o dono do canal.

Legenda duplicando a frase grande em `lettering-promessa` e
`lettering-liberdade`: a regra geral do v2.1 ("molde com ícone mantém
legenda") não vale quando a frase grande já é a fala inteira do trecho.
Revertido para `caption: "muted"` nessas duas, mantido "on" em `destaques` e
`propositos`, onde o rótulo curto não repete a fala.

## 13. Recebido do Claude Design 3.2 (06/09/2026): o que entrou, o que não, e por quê

O pacote 3.2 chegou grande: guia, painel, e uma camada nova de arquivos que o
código consegue ler (`registry/`, `moldes-specs.json`, `escalas.json`,
`build-registry.json`). O material vivo está em `design-system/`, e a evidência
do que chegou fica em `aprendizado/propostas-externas/2026-09-06-claude-design-v3.2/`.

### O que entrou

**Quantas cenas a fala pede.** `MATRIZ-DE-CENAS.md` responde uma pergunta que
antes era chute: fala lenta (5 a 8 afirmações por minuto) pede 7 a 9 cenas,
fala rápida (14 a 20) pede 14 a 16. Junto veio a regra dura: cena abaixo de 240
quadros não recebe molde que leva mais de 48 quadros para se montar, porque a
peça termina de aparecer depois que a fala já passou. O `quadroCompleto` de cada
molde está no `build-registry.json` e o fiscal de ritmo cobra sozinho.

**Acento de passagem.** A peça que faltava para as variantes de interface
saírem do armário. Quando a fala TOCA numa plataforma sem que o trecho seja
sobre ela, a variante entra pequena, por cima da cena, no canto direito, por 40
a 60 quadros, e sai. Não troca o molde, não troca a legenda, não pega a cor.
Teto de 3 por minuto. Antes disso a regra mandava "menção vira mini-selo, sem
painel", e como quase toda fala apenas menciona, as 31 variantes de interface
nunca eram recrutadas. Peça no motor: `src/core/AcentoDePassagem.tsx`. Gate:
`acento-limite` no `choreo-lint.js`.

**Três esquemas de argumento.** Ponte (o meio que atravessa o vão), alavanca
(desproporção entre esforço e resultado) e troca (substituição no mesmo lugar).
Nascem no catálogo, viram componente quando uma fala pedir. Vieram refeitos com
o vocabulário que já existe (nó 148, conector de traço 6, chevron 18, pill 48),
depois de duas rodadas em que o próprio pacote tinha inventado peças novas.

**Duas peças na mesma cena.** `composition-rules.json` traz os pares que podem
dividir uma cena e os que não podem, com o motivo. O critério é o invariante:
algo que NÃO muda entre a primeira e a segunda. Sem invariante são duas cenas, e
o palco não precisa fingir metamorfose. O fiscal de uso cobra.

**Ponte de som.** `registry/sound-bridge.json` traduz os 67 gestos do pacote nos
pares do nosso catálogo. Consulta por `ds-som.js`. Gesto que não está na ponte
não vira som inventado: ou usa par existente, ou fica em silêncio declarado.

**Nomes migrados.** `foco-migra` virou `foco`, `trophy` virou `award`, "quatro
estados" virou "presença × ênfase", `chart.candles` virou `chart.columns`.

### O que não entrou, e por quê

**As duas caixas de palco (374 para texto, 429 para geometria).** O pacote
propôs separar a área de texto da área de desenho. Decisão do o dono do canal em
06/09: fica 429 para tudo, texto e geometria, até existir medição real no
aparelho. Os dois lados partem de premissa não medida, e inventar uma terceira
régua sem medir só aumenta a confusão.

**Os pesos de som do pacote.** O mapa recebido inverte o peso do traço da
palavra (nosso peso máximo viraria silêncio) e sobe check e selo. Isso mexe em
calibragem feita de ouvido em três peças aprovadas. Do mapa aproveitamos as
regras (densidade, soma por cena, peso 0 obrigatório), nunca os pesos.

**A zona morta em 1536.** Continua 1632, que é medida no código. O valor deles é
preset declarado, não verificado, conforme o próprio changelog admite.

### O que continua faltando

Os três esquemas novos ajudam em argumento, mas o buraco levantado em
`FALTA-NO-DESIGN-SYSTEM.md` continua aberto em três pontos: pessoa como sujeito
da frase, escala com dois marcadores, e objeção com resposta. Vale levar na
próxima ida ao Claude Design.
