# Gabarito do palco: 374/790 (pacote) contra 429/499 (motor)

## Veredito

**A conta do motor vale para o que pode ser DESENHADO. A conta do pacote vale
para o que precisa ser LIDO.** As duas estão aritmeticamente certas: elas partem
de limites inferiores diferentes, e nenhuma das duas mediu o aparelho.

Não é empate por diplomacia. É o que os números mostram:

## Derivação do pacote (374)

Do gabarito, em px de um canvas de 1080x1920:

    video 1        y 180  → 580     (940x400, x 70)
    video 2        y 596  → 996     (940x400, x 70)
    legenda        y 1039 → 1161    (904x122, centro 1100, 2 linhas de 58 a 1,05)
    palco          y 1162 → 1536    (904x374)
    limite inferior       1536      = 1920 x 0,8

O 374 é uma subtração: 1536 - 1162. O 1536 é a única premissa, e ela é
**declarada, não medida**: "os 20% inferiores são da UI do Reels". O CHANGELOG
do pacote já registra isso como pendência desde a v2.1 ("áreas seguras do Reels:
preset declarado, não verificado contra a UI atual do app").

Expandido (790): com um vídeo só, o palco sobe até 620 (580 do vídeo + 40 de
respiro): 1536 - 620 = 916, arredondado para baixo em 790 para deixar 126 de
folga acima da faixa da legenda quando ela aparece. **Essa folga foi arbitrada,
não derivada** — é o número mais fraco dos dois.

## Derivação do motor (429)

    legenda        centro 1100, altura 117 → 1041,5 → 1158,5
    respiro                                  44 (escala de espaço)
    palco          y 1202,5 → 1632
    zona morta            1632

429 = 1632 - 1203. Fecha. A diferença inteira está no limite inferior:
**1632 contra 1536, 96px**. O motor também é 5px mais generoso no topo, porque
usa faixa de legenda de 117 em vez de 122.

## Qual usar

O 1632 é 1920 - 288 (15% inferior). O 1536 é 1920 - 384 (20%). Quem mediu o
aparelho decide, e **nenhum dos dois mediu**. Enquanto isso:

- Os 96px em disputa ficam exatamente onde o Instagram sobrepõe legenda, @ do
  autor, áudio e botões. Conteúdo ali não desaparece: fica **parcialmente
  coberto de forma imprevisível**, porque a altura da UI muda com o tamanho da
  legenda do post e com o aparelho.
- Logo: **rótulo, número e qualquer coisa que precise ser lida ficam nos 374**.
  Teia, trilho, conector, célula vazia e folga de anel podem ocupar os 429.

Proposta, e é o que corrige o motor sem quebrar o pacote: declarar **duas caixas**
em vez de uma.

    palco.seguro     904 x 374   (y 1162 → 1536)  conteúdo legível
    palco.desenhavel 904 x 429   (y 1203 → 1632)  geometria sem texto

O check `cabe-no-palco` do build-registry passa a validar contra a caixa
desenhável, e um check novo (`texto-na-caixa-segura`) valida que todo nó com
corpo de texto está dentro dos 374. Nenhum molde precisa mudar.

## Expandido: 790 do pacote é insustentável

Aqui o motor está certo e o pacote está errado. Repetindo a conta do motor com
um vídeo só (o vídeo 2 sai, a legenda sobe para o lugar dele):

    video 1        y 180 → 580
    respiro                44
    legenda        y 624 → 741      (117)
    respiro                44
    palco          y 785 → 1632
    altura                 847

O motor declara 499 — que é o que sobra se a legenda **permanece embaixo**, no
lugar canônico (1203 → 1632 = 429) mais os 70 que a caixa ganha ao subir o
palco para 1133. Os 790 do pacote só existem se a legenda for desligada e o
limite for 1536, uma combinação que o pacote nunca declarou.

**Adote 499** como expandido com legenda ligada, e **847** como expandido com
legenda no topo (o preset `esquema-tela-inteira` que o pacote já tem, hoje
descrito como 1254 — outro número a corrigir: 1632 - 282 = 1350, e com a
legenda no topo em 160 → 282, o palco vai de 326 a 1632, ou seja 1306).

## Moldes que não cabem em 499

| Molde | Altura declarada | Veredito |
|---|---|---|
| `matrix.quadrants.v1` | 600 | **Reduz.** Quadrante de 290 → 235, vão 20: 2x235+20 = 490. Rótulo de eixo 24 fica fora dos 490 e vai para a caixa desenhável (não é texto de leitura contínua, é eixo). Se o rótulo precisar dos 24 dentro do seguro, vai para **tela cheia**. |
| `chart.radar.v1` | 560 | **Reduz.** Raio 210 → 175: teia 350 + rótulos a 42 dos dois lados = 434, e o anel de foco cabe. Em tela cheia mantém 210. |
| `flow.bottleneck.v1` | 420 | **Cabe.** 420 ≤ 499. Nada muda. |
| `flow.filter.v1` | 420 | **Cabe.** 420 ≤ 499. Nada muda. |

Nenhum molde sai do catálogo. Os dois que reduzem ganham a variante de tela
cheia como alternativa declarada, não como conserto.

## O que eu preciso de você

Uma medida, e a discussão morre: abra um Reels seu no aparelho mais estreito da
audiência, com legenda de duas linhas, e diga em que Y começa a área coberta.
Se for 1632, o pacote corrige o 1536 e o 790. Se for 1536, o motor corrige o
1632 e nós dois já sabemos que o 790 estava errado de qualquer jeito.
