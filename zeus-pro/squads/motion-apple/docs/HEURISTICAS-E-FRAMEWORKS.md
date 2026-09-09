# Heurísticas e frameworks do zeus-motion

Este documento não é lista de casos. É o método por trás deles. Cada bloco abaixo nasceu de uma correção real que custou uma rodada, e está escrito para ser aplicado em vídeo que ainda nem existe.

A ordem importa: os três primeiros são frameworks, que você aplica de propósito no começo do trabalho. Os sete seguintes são heurísticas, que você usa como filtro antes de dar qualquer coisa por pronta.

---

## Framework 1: a decisão visual por trecho de fala

Para cada pedaço da fala, a pergunta é sempre a mesma: qual é O elemento visual deste trecho, e só um?

| O que a fala traz | O que entra na tela | Legenda |
|---|---|---|
| Objeto concreto e reconhecível | O objeto, sem rótulo, com um gesto casado com a palavra | ligada |
| Conceito nomeado (autoridade, estratégia) | A palavra sozinha, com o traço do espectro embaixo | cala |
| Frase forte que carrega a ideia | Lettering: apoio pequeno em cima, palavra grande embaixo | cala |
| Número ou quantidade | O número contando do zero, sozinho | cala |
| Lista de três a seis itens do mesmo tipo | Trio de círculos ou grade de blocos | cala |
| Comparação entre certo e errado | Dois círculos com badge de veredito | ligada |
| Transformação de um estado para outro | Letras A e B grandes com seta | ligada |
| Abstrato, ou recapitulação do que a tela já mostrou | Nada. Só rosto e legenda | ligada |

**A regra de exclusividade:** uma coisa manda por vez, e quem manda cala a legenda. Se a cena tem tipografia grande própria ou número grande, a legenda some. Se a cena tem objeto, o objeto não leva rótulo, porque a legenda já narra.

**Pergunta de aplicação:** este trecho já tem um texto desenhado na tela? Se tem, a legenda cala.

---

## Framework 2: o peso sonoro

O peso de um efeito não é gosto, é medida. O modelo abaixo foi calibrado nos cinco sons aprovados pelo dono e reproduz a percepção dele com erro médio de 0,4 ponto:

```
peso = 52,82 x (ataque + cauda) - 84,88 x ataque + 27,37 x (fração de grave) - 25,95
```

Em português: o que mais pesa é o tamanho do som audível. Ataque muito longo por si só ALIVIA o peso, porque o som vira aproximação suave em vez de golpe. E quanto mais grave, mais peso.

**A conta de posicionamento, que vale para todo efeito:**

```
início do som = instante do movimento - instante do pico dentro do arquivo
```

O instante do pico está medido na ficha de cada som, campo `pico_s`, gerada por `scripts/analisar-sfx.py`. Nunca estime a olho.

**A lei da série:** elemento da mesma família que entra por etapas leva o mesmo som em cada etapa, com o volume caindo 1 decibel a cada repetição. Som só no primeiro item faz a cena mentir sobre a própria hierarquia.

**Pergunta de aplicação:** este movimento dura menos de 0,6 segundo e é protagonista? Se não, provavelmente não leva som.

Detalhe completo em `BIBLIOTECA-SFX.md` e `LOGICA-EFEITOS-SONOROS.md`.

---

## Framework 3: o respiro

Os números abaixo passaram a valer depois de três rodadas de correção de espaçamento. Eles não são preferência, são o mínimo para o olho não ler aperto.

| Situação | Número | Razão |
|---|---|---|
| Texto dentro de pill | 28px de padding lateral | Abaixo disso o texto encosta na borda curva |
| Texto dentro de célula de grade | 26px em todos os lados | O canto arredondado come respiro visual que o número não mostra |
| Entre blocos irmãos de uma grade | 18px | Menos que isso e a grade lê como tabela apertada |
| Entre dois círculos irmãos | 320px de centro a centro, para raio 110 | Com menos, os rótulos embaixo se tocam |
| Entre logo e selo na mesma linha | 26px | O selo encostado lê como erro de composição |
| Entre elemento e o rótulo que o nomeia | 24px | Menos que isso e o rótulo parece parte do desenho |

**A regra de altura de célula:** a altura se calcula pelo PIOR caso de texto, não pelo caso comum. Se um dos itens quebra em duas linhas, todas as células têm a altura de duas linhas.

**A regra de ancoragem:** em grade com itens de tamanhos diferentes de texto, o conteúdo se ancora no topo da célula, nunca centralizado. Centralizado, o ícone sobe nas células curtas e desce nas longas, e a fileira perde o alinhamento.

**Pergunta de aplicação:** se o texto mais longo desta grade ganhasse mais uma palavra, alguma coisa quebraria?

---

## Heurística 4: número calibrado num contexto morre em outro

O espectro pastel da marca funciona num traço de 6 pixels e desaparece num texto grande preenchido. A caixa calibrada para uma palavra curta estoura com uma palavra longa.

Cor tem contexto de ÁREA. Caixa tem contexto de COMPRIMENTO. Traço tem contexto de ESCALA.

**Aplicação:** ao mudar de escala, de área ou de quantidade de texto, o número se recalcula. Herdar número de outro contexto é a origem silenciosa da maioria dos defeitos de acabamento.

---

## Heurística 5: a ferramenta decide sozinha quando você não decide

Três casos reais, mesma raiz:

- O vetorizador entrega cada letra com deslocamento próprio, e isso reinicia o gradiente em cada letra.
- A máscara em SVG trabalha por brilho, e a borda suavizada entra em cinza, o que lava a cor.
- A foto sem recorte definido se encaixa como o padrão do navegador quiser, e vira barra branca dentro do círculo.

Nos três, o código estava certo e a tela estava errada.

**Aplicação:** toda etapa automática que transforma imagem termina com um número escolhido por nós. Recorte, gradiente, escala e alinhamento nunca ficam no padrão da ferramenta.

---

## Heurística 6: o print revela o que o código esconde

Existe uma classe inteira de defeito que nenhum verificador automático pega, porque só existe no quadro renderizado:

- Texto que encosta na borda do container.
- Ícones que deveriam dividir a mesma linha e não dividem.
- Marcação cobrindo a informação.
- Seta com a ponta fora do eixo da curva.
- Cor que parece lavada em área grande.
- Foto com barra vazia dentro da moldura.

**Aplicação:** antes de renderizar o vídeo inteiro, renderize um print de cada cena e olhe. Cada rodada de correção desta produção começou num print, nunca numa leitura de código. O comando é `node scripts/_frame-unico.js <Composition> <quadro> <saida.png>`, e existe um agente dedicado a isso, o `revisor-visual-motion`.

---

## Heurística 7: marcação nunca esconde a informação

Um X gigante riscado por cima da foto errada cobria justamente o que a cena precisava mostrar. E o lado certo não tinha marcação nenhuma, o que deixava a comparação torta.

**Aplicação:** marcação de veredito vive AO LADO do conteúdo, em badge, nunca atravessada. E veredito nunca aparece sozinho: se um lado leva X, o outro leva check.

---

## Heurística 8: o que entra por etapas recebe o mesmo tratamento em todas

Vale para o visual e para o som. Três círculos que entram um a um usam o mesmo desenho, o mesmo tempo de entrada e o mesmo efeito sonoro. Cinco blocos de grade idem.

**Aplicação:** se você deu tratamento especial ao primeiro item de uma série, ou você dá aos outros também, ou tira do primeiro.

**Corolário:** grade com célula vazia lê como erro. Se a fala nomeia cinco itens e a grade tem seis lugares, o sexto se preenche com um item coerente, mesmo sem estar na fala.

---

## Heurística 9: o som pede o movimento que o justifica

Som grave sustentado no fecho, com a tela parada, soa descolado. O mesmo som, com a peça aproximando 6 por cento ao longo do estrondo, soa como parte da cena.

Grave é massa chegando perto. Agudo é coisa leve passando. Se o som diz uma coisa e a tela não diz nada, o ouvido percebe a falta antes da cabeça entender.

**Aplicação:** todo efeito de peso alto ganha um par visual, mesmo mínimo: aproximação, brilho, pulso. Sem par, ou tira o som, ou cria o movimento.

---

## Heurística 10: volume se resolve medindo, não ouvindo

A vinheta final estava 6 decibéis acima da fala do vídeo, e o estrondo dela 10 acima. Ninguém acerta isso no ouvido em cima de um arquivo que já está mixado.

**Aplicação:** meça os dois trechos com `ffmpeg -af volumedetect`, compare as médias, e corrija pela diferença. Alvo prático: um trecho de destaque fica no máximo 2 a 3 decibéis acima da fala normal. Depois de corrigir, meça de novo e mostre o número.

---

## O gate final, antes de qualquer entrega

Responda tudo com sim antes de mandar um vídeo:

1. Renderizei um print de cada cena e olhei todos?
2. Todo texto tem folga visível do container que o cerca?
3. Todos os elementos que deveriam dividir uma linha estão dividindo?
4. Nenhuma marcação está cobrindo a informação que a cena mostra?
5. Nenhuma cena repete imagem de outra produção?
6. Cada série tem o mesmo tratamento em todas as etapas, no visual e no som?
7. Medi o volume dos trechos de destaque contra a fala normal?
8. Cada efeito sonoro tem o pico casado com o quadro do movimento?
9. Cena com texto desenhado na tela está com a legenda calada?
10. Se um defeito passar, sei dizer qual gate deveria ter pego?

## H-BLOCO: bloco unico, nunca faixa esticada (07/09/2026)

Ordem literal do o dono do canal, olhando o Reel da Kamila: "tudo tem que ficar mais
proximo ao meio, deslocado um pouco para cima; nunca pode ter espaco vazio no
meio, como acima do texto do gancho e abaixo do video. O espaco morto do Reels
e embaixo".

O erro que ele estava vendo nao era de tamanho de peca, era de MODELO. A tela
do formato nasceu com tres faixas ancoradas em numeros absolutos, com o palco
esticado ate a zona morta (1632) e o conteudo centralizado dentro dessa faixa.
Com dois rostos empilhados isso fechava; com UM rosto o palco continuava
ancorado la embaixo, e sobravam de 380 a 483 pontos de branco entre o rosto e o
conteudo. Subir os numeros das faixas duas vezes nao resolveu, porque o defeito
estava na regua, nao no valor.

A regra que passa a valer:

  alturaDoGrupo = video + (legenda ? gap + banda : 0) + gap + altura do palco
  topoDoGrupo   = OPTICAL_CENTER_Y - alturaDoGrupo / 2

`OPTICAL_CENTER_Y` (816) ja existia em `src/core/layout.ts` e nunca tinha sido
usado por composition nenhuma. O grupo inteiro flutua: cena com palco alto
empurra o rosto para cima, cena com palco baixo o traz para baixo. A sobra vai
toda para o rodape, que e onde o Instagram cobre com a propria interface.

Tres consequencias que so aparecem quando se implementa:

1. A altura do palco precisa existir EM TEMPO DE RENDER. Antes o `CONTENT_H` de
   cada cena so era lido por expressao regular no fiscal. Agora o `MotionStage`
   importa e exporta o mapa `STAGE_H`, e o gerador `scene-plan-to-tokens.js`
   emite esse mapa sozinho.
2. Cada cena tem um topo proprio, entao o rosto SALTA na virada se nao houver
   interpolacao. Usar a mesma janela e curva do expandido (68 quadros,
   smoothInOut).
3. Altura declarada acima da tinta real vira vao branco na tela. Frase de uma
   linha e frase de duas linhas nao podem declarar a mesma altura, e o palco
   ancora no TOPO da tinta, nunca centralizado.

Gate mecanico: depois de renderizar o rascunho, medir nos frames a distancia
entre o fim do video e o inicio do conteudo seguinte. Alvo de 40 a 75 pontos.
Acima de 120 e vao branco e reprova.

## H-MOLDE: molde novo nasce de molde aprovado (07/09/2026)

Escrever componente de cena do zero foi a causa de tres reprovacoes seguidas no
Reel da Kamila: escala inventada, anel sem forma e linha estourando o palco.
Cada numero isolado parecia razoavel; junto, a peca saiu da familia visual das
outras.

Antes da primeira linha de um componente de cena, abrir o molde equivalente
numa peca aprovada e copiar a geometria: circulo, icone, coluna, pill, desfoque
de entrada e o gesto de foco. A escala e fechada: atributo solo 180 com icone
80, trio 148 com 64 e coluna 264, frase com icone 120 com 56, passos 112 (124
na Fernanda) com 48, comparacao 200 com 88.

Quando a quantidade de itens nao couber na largura do palco, o que aperta e a
COLUNA e o CONECTOR. O no e o icone nunca encolhem: e eles que dizem de que
familia a peca e.

Quatro gates em `squads/motion/scripts/choreo-lint.js` cobram isso sozinhos
(`palco-desloca`, `anel-sem-forma`, `escala-de-circulo`, `largura-da-linha`).
