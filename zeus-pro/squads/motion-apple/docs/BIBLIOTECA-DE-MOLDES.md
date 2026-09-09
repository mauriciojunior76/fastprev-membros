# Biblioteca de moldes: o que dá para reaproveitar em vídeo novo

Este documento existe para responder uma pergunta em vídeo novo: já existe uma cena parecida com a que eu preciso? Se existir, o trabalho vira adaptação de meia hora em vez de criação de um dia.

## A regra que governa o reaproveitamento

Existe uma diferença que precisa ficar clara antes de qualquer coisa:

- **Molde** é a estrutura: geometria, respiro, ordem de entrada, curva de movimento, tamanho relativo entre as partes. O molde PODE e DEVE ser reaproveitado.
- **Conteúdo** é a peça que aparece dentro do molde: a foto, o ícone, o número, a palavra, a marca. O conteúdo NUNCA se repete entre vídeos diferentes.

Essa regra nasceu de um erro real. Um reel usou a mesma imagem de celular que já tinha aparecido em outro, e a resposta dele foi direta: cada vídeo é único, cada cena é única, o conceito e o estilo seguem iguais, mas as imagens não podem ser iguais.

Ou seja: copiar a grade de seis blocos é certo. Copiar os seis ícones que estavam dentro dela é errado.

## Como usar um molde

1. Ache na tabela abaixo o molde que serve para a fala que você está ilustrando.
2. Copie o arquivo de referência para a pasta de componentes da composição nova.
3. Troque tudo o que está na coluna "o que muda sempre".
4. Não toque em nada que está na coluna "o que permanece". Esses números foram pagos com rodada de correção.
5. Ajuste apenas os atrasos de entrada, para casar com a fala nova. O atraso é sempre conteúdo, nunca molde.

---

## Os oito moldes

### 1. Gancho com logo de marca

**Arquivo:** `src/compositions/PauloRuizReels/components/icons/LetteringHook.tsx`

**Quando usar:** o vídeo abre citando uma plataforma ou marca conhecida, e essa marca é o assunto de maior tração dos primeiros três segundos.

| O que muda sempre | O que permanece |
|---|---|
| A marca citada e o arquivo de logo | O logo vem sempre da fonte oficial, vetorizado, nunca desenhado à mão |
| O texto de apoio embaixo | O logo entra sozinho em 30 quadros, com subida e desfoque; o apoio entra 10 quadros depois |
| A largura do logo, conforme o comprimento da marca | O gradiente é o do espectro da peça, aplicado direto no traço, sem máscara |

**Armadilha conhecida:** vetorizador entrega cada letra com deslocamento próprio, e isso reinicia o gradiente em cada letra. O deslocamento precisa ser embutido nas coordenadas antes de aplicar cor.

**Custo de adaptação:** baixo, cerca de 20 minutos, mais o tempo de conseguir o logo oficial.

---

### 2. Comparação certo e errado

**Arquivo:** `src/compositions/PauloRuizReels/components/icons/FotoComparacao.tsx`

**Quando usar:** a fala diz que uma coisa está certa e outra errada, e a diferença é visual, não conceitual.

| O que muda sempre | O que permanece |
|---|---|
| As duas fotos | Dois círculos de raio 110, centros a 320 de distância |
| Os dois rótulos, sempre em uma linha só | Anel de story colorido em volta dos dois |
| O ajuste de recorte de cada foto | Badge vermelho com X no errado e verde com check no certo, sempre em par |

**Armadilha conhecida:** marcação de erro por cima da foto esconde justamente o que a cena precisa mostrar. O X vive ao lado, em badge, nunca atravessado.

**Custo de adaptação:** médio, porque exige duas fotos novas com enquadramento definido por número.

---

### 3. Selo de resultado

**Arquivo:** `src/compositions/PauloRuizReels/components/icons/PerfilPronto.tsx`

**Quando usar:** a fala fecha um ciclo dizendo que algo está pronto, resolvido ou conquistado.

| O que muda sempre | O que permanece |
|---|---|
| A marca ou o elemento que está pronto | Logo e check na mesma linha, com respiro de 26px entre eles |
| O rótulo embaixo | O check entra depois que o logo já assentou, com um leve pulo de escala |
| | O conjunto inteiro fica centralizado, nunca só o logo |

**Armadilha conhecida:** check posicionado por cima do logo cobre a última letra. Ele fica ao lado, no fluxo.

**Custo de adaptação:** baixo, cerca de 15 minutos.

---

### 4. Trio de atributos

**Arquivo:** `src/compositions/PauloRuizReels/components/icons/DestaquesCircles.tsx`

**Quando usar:** a fala lista exatamente três coisas do mesmo tipo, uma depois da outra.

| O que muda sempre | O que permanece |
|---|---|
| Os três ícones | Círculo de raio 62, centros a 290 de distância |
| Os três rótulos | Ícone centrado no círculo, com correção de 3px para cima |
| Os atrasos, casados com as três palavras | Pill com borda, padding lateral de 28px e texto que nunca quebra linha |

**Armadilha conhecida:** rótulo com corpo grande demais estoura a pill. O corpo do texto se recalcula quando a palavra é longa, a pill não estica sozinha.

**Custo de adaptação:** baixo, cerca de 20 minutos.

---

### 5. Grade com contagem

**Arquivo:** `src/compositions/PauloRuizReels/components/icons/InstagramGrid.tsx`

**Quando usar:** a fala cita uma quantidade e a quantidade é o argumento.

| O que muda sempre | O que permanece |
|---|---|
| A quantidade de células e o número final | Grade de três colunas, célula de 66 com respiro de 12 |
| O rótulo do número | O número conta do zero até o alvo, nunca aparece pronto |
| | A contagem chega ao valor final depois da palavra ser dita, nunca antes |

**Armadilha conhecida:** cena que mostra o número por escrito não pode ter legenda ligada, senão o texto aparece duas vezes.

**Custo de adaptação:** baixo.

---

### 6. Grade de conceitos

**Arquivo:** `src/compositions/PauloRuizReels/components/icons/PropositosLista.tsx`

**Quando usar:** a fala lista de quatro a seis conceitos abstratos.

| O que muda sempre | O que permanece |
|---|---|
| Os itens e seus ícones | Seis blocos iguais de 280 por 158, respiro de 18 entre eles |
| Os atrasos de cada item | Ícone ancorado no topo da célula, nunca centralizado com o texto |
| | Se a fala tem cinco itens, o sexto é preenchido mesmo assim: bloco vazio na grade lê como erro |

**Armadilha conhecida:** conteúdo centralizado verticalmente faz o ícone subir nas células de texto curto e descer nas de texto longo, e os ícones deixam de dividir a mesma linha.

**Custo de adaptação:** médio, porque exige escolher ícones que não se repitam com outra cena da mesma peça.

---

### 7. Jornada de A para B

**Arquivo:** `src/compositions/PauloRuizReels/components/icons/JornadaSeta.tsx`

**Quando usar:** a fala descreve uma promessa de transformação, de um estado para outro.

| O que muda sempre | O que permanece |
|---|---|
| Os dois rótulos | Letra A com corpo 120 em cinza, letra B com corpo 168 em preto |
| | A letra é a protagonista, nunca um ponto com letra dentro |
| | A ponta da seta aponta na tangente final da curva, calculada, nunca estimada |
| | A régua de chão só ocupa o vão entre as letras, sem cortar o pé delas |

**Armadilha conhecida:** ponta de seta desenhada no olho chega torta e o defeito só aparece no quadro ampliado. A tangente final de uma curva Bézier cúbica é o vetor do último ponto de controle até o ponto final.

**Custo de adaptação:** baixo.

---

### 8. Palavra conceito com traço

**Arquivo:** `src/compositions/PauloRuizReels/components/icons/PalavraAutoridade.tsx`

**Quando usar:** a fala nomeia um conceito que é pilar do argumento.

| O que muda sempre | O que permanece |
|---|---|
| A palavra | Entrada letra por letra, peso 900 |
| | Traço do espectro embaixo, com atraso 46 e duração 72 |
| | Máximo de dois ou três usos por vídeo: marca em toda palavra deixa de ser marca |
| | A cena cala a legenda, porque a palavra na tela já é o texto |

**Custo de adaptação:** muito baixo, é troca de palavra.

---

## Módulos genéricos, já compartilhados entre composições

Esses não são moldes de cena, são peças de sistema. Servem a qualquer produção sem adaptação.

| Módulo | O que oferece |
|---|---|
| `src/modules/brand-logos/` | Logo de marca de terceiro, vetor fiel. O do Instagram aceita gradiente por parâmetro |
| `src/modules/exemplo-icons/` | Os glifos da biblioteca oficial, hoje 19, incluindo os oito acrescentados nesta produção |
| `src/modules/shapes/WordMark.tsx` | O traço do espectro embaixo de palavra |
| `src/modules/text-system/` | Legenda medida palavra a palavra e o lettering |
| `.../icons/drawUtils.tsx` | Desenho progressivo de traço, com espessura corrigida por escala |
| `public/_sfx/` e `public/sounds/` | Os efeitos sonoros aprovados e a biblioteca funcional |

## O que NÃO é reaproveitável

- Qualquer foto ou imagem gerada, mesmo que o molde seja o mesmo.
- Os ícones específicos escolhidos para uma cena, quando a nova produção tem o mesmo assunto.
- Os atrasos de entrada, que vivem colados na fala de cada call.
- A duração das cenas, que vem do áudio editado.
