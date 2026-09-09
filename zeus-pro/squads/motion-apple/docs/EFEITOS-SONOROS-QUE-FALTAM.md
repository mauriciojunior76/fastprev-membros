# Efeitos sonoros que faltam no banco

Levantamento de 06/09/2026, feito lendo as 13 cenas do reel do Carlos Seme contra o
`public/_sfx/catalogo.json`. Serve de lista de produção: são os sons genéricos que
voltam em QUALQUER peça, não os de uma peça só.

## O diagnóstico em uma frase

O banco tem 7 arquivos e 5 deles são whoosh. Ou seja: o vocabulário atual descreve
MOVIMENTO (algo entrou, algo passou) e não descreve SIGNIFICADO (deu certo, deu
errado, vai acontecer algo, isso é dinheiro). Por isso toda cena soa parecida, e por
isso a cena da compra ficou muda até a caixa registradora entrar: não existia som
para o gesto "aconteceu uma venda".

Som de movimento responde "o que se mexeu". Som semântico responde "o que isso
significa". A dopamina mora no segundo.

## Os 12 que faltam, por prioridade

Prioridade 1 e 2 são os que se repetem em toda peça. 3 é refinamento.

| # | Nome | Onde entra | Duração | Como tem que soar | Prioridade |
|---|---|---|---|---|---|
| 1 | CHECK, certo | badge de aprovado, item validado, resposta correta | 250 a 400 ms | tom claro subindo, ataque imediato, cauda curta com brilho. Nada de sino de igreja | 1 |
| 2 | ERRO, X | badge de errado, opção descartada, "não é isso" | 200 a 300 ms | grave e seco, um golpe só, sem cauda. NUNCA cômico ou de desenho animado | 1 |
| 3 | LUZ ASCENDENTE, build | 1 a 2 s ANTES de uma revelação, palavra grande ou virada | 900 a 1800 ms | subida contínua de tom e volume, terminando em silêncio (o impacto vem depois, de outro som) | 1 |
| 4 | IMPACTO, veredito | o quadro exato da conclusão, palavra final, número que fecha | 350 a 600 ms | batida seca e cheia, corpo grave com estalo em cima. Casa com o build do #3 | 1 |
| 5 | DESDOBRAMENTO, cascata (jogo de 4) | 3 a 5 itens entrando em sequência, etapas, ramificação | 150 ms cada | QUATRO arquivos do mesmo som, cada um meio tom acima. Hoje repete o mesmo e soa robótico | 1 |
| 6 | TRAVA, lock | elemento que chega e se fixa, marcador que crava, rótulo que assenta | 100 a 160 ms | clique mecânico curtíssimo, sem tom musical | 2 |
| 7 | ABRIR, expandir | painel que abre, cartão que cresce, lista que se revela | 400 a 700 ms | sopro com tom SUBINDO no fim | 2 |
| 8 | FECHAR, colapsar | recuo, elemento que sai, bloco que se fecha | 300 a 500 ms | o mesmo de #7 com o tom DESCENDO | 2 |
| 9 | DINHEIRO SUBINDO | escala de faturamento, gráfico de receita, range que cresce | 800 a 1500 ms | contínuo e ascendente, com textura de moeda ao fundo. Diferente da registradora, que é evento pontual | 2 |
| 10 | CONTAGEM, tick de número | número correndo, contador, porcentagem que sobe | 60 ms por tick | tique seco e neutro, para tocar repetido sem cansar | 2 |
| 11 | ALERTA, atenção | a fala aponta um risco, um erro comum, uma perda | 400 a 700 ms | duas notas graves iguais, tensão sem susto. Não é alarme | 3 |
| 12 | TRANSIÇÃO DE ATO | virada de bloco narrativo, mudança de assunto | 700 a 1200 ms | passagem larga com cauda, o único som longo do banco | 3 |

## Recebidos e catalogados em 06/09/2026

Três arquivos enviados pelo o dono do canal, medidos, preparados e catalogados. Os três
tinham lixo no bruto (silêncio na frente ou cauda morta) e nenhum entrou como veio.

| Arquivo no banco | Cobre | Bruto | Preparado |
|---|---|---|---|
| `peso-09-shimmer-revelacao.wav` | #3, mas não como eu tinha escrito | 6,45 s, 370 ms de silêncio na frente | 3,75 s |
| `peso-04-ping-confirmacao.wav` | #1, check e confirmação | 1,81 s, 1,66 s de silêncio morto no fim | 0,55 s |
| `peso-06-sweep-transicao.wav` | #7 e #12 | 2,77 s, 150 ms de frente e cauda longa | 1,30 s |

### O shimmer não é o build que eu descrevi

Medindo a curva em oitavos: sobe em meio segundo, sustenta PLANO por 2,8 s e sai.
Não tem clímax no fim. Então o uso correto não é "toca antes e o impacto vem depois":
ele COMEÇA JUNTO com a cena importante e roda por baixo dela inteira. Ele se basta,
e não pede impacto nenhum na sequência.

O teto de 2 por peça que o o dono do canal deu é uma regra de significado, não de estética:
usado três vezes, deixa de marcar importância e vira textura de fundo.

### Lição de preparo: normalização por pico, nunca loudnorm

A primeira tentativa passou os três por `loudnorm I=-18 LRA=11`. O shimmer saiu com
os quatro quartos no mesmo nível: a compressão comeu a subida, que era a coisa toda.
Som de efeito se normaliza por PICO (`volume` mais `alimiter`), porque a dinâmica é a
informação. Loudnorm serve para voz, não para efeito.

### O que ainda falta depois destes três

Continuam abertos, por prioridade: #2 erro, #4 impacto de veredito, #5 cascata de
quatro, #6 trava, #9 dinheiro subindo, #10 tique de contagem, #11 alerta.

## Regras de produção que valem para os 12

1. MONO, 48 kHz, wav 24 bits. O mixador compensa mono para estéreo sozinho.
2. O pico tem que estar nos primeiros 120 ms. Som com ataque lento não crava no
   quadro da palavra e sempre soa atrasado.
3. Silêncio absoluto no começo do arquivo. Um milissegundo de folga já desloca.
4. Cauda até menos 30 dB em no máximo 1,5 s, com exceção do #3 e do #12.
5. Sem música por baixo, sem reverb longo, sem estéreo largo.
6. Nada de voz humana, nem respiração.

## Como entram no sistema

Cada arquivo novo vira uma linha em `public/_sfx/catalogo.json` dentro de `sons`,
com `peso`, `familia`, `origem` e a licença. Depois a categoria declara o gesto
apontando a FAMÍLIA, nunca só o peso:

```json
"venda-acontece": { "gestos": { "vende": { "peso": 5, "familia": "registradora" } } }
```

Declarar só o peso devolve o whoosh genérico da tabela de peso. Foi exatamente esse
o erro que deixou a caixa registradora de fora da primeira mixagem, em 06/09/2026.

## Onde faltou nas cenas deste vídeo

| Cena | Gesto que existe hoje | O que ganharia com som próprio |
|---|---|---|
| comparacao-faculdade | badge (carimbo) 2x | #1 no certo e #2 no errado, em vez do mesmo carimbo nos dois |
| escala-faturamento | entrada e marco | #9 durante a subida, #6 quando o marcador crava |
| palavra-tempo (fecho) | entrada e traço | #3 antes da palavra e #4 no quadro dela |
| ramificacao-aprender | item repetido | #5, o jogo de quatro em cascata |
| passos-medico | partida e chegada | #5 nas etapas, #4 na chegada |
| balanca | entrada e badge | #4 quando o eixo assenta no business |
