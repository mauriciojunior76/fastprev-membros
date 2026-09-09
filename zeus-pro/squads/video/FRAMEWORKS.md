# Princípios de vídeo

## Os primeiros segundos

Em vídeo curto, a pessoa decide continuar antes do que você imagina. O começo
precisa entregar tensão, promessa ou surpresa, nunca apresentação.

## Ritmo por formato

| Formato | Duração típica | Ritmo |
|---|---|---|
| Vertical curto | 15 a 60 segundos | Corte rápido, uma ideia só |
| Horizontal médio | 3 a 10 minutos | Uma ideia principal com desdobramentos |
| Longo | acima de 10 minutos | Capítulos claros, com marcação |

## Roteiro tem tempo, não só texto

Todo roteiro entregue por este squad tem marcação de tempo por bloco. Sem
isso o editor adivinha, e o ritmo se perde.

## Legenda é obrigatória

Boa parte assiste sem som. Legenda não é acessório, é parte do conteúdo.

## Uma ideia por vídeo

Vídeo que tenta ensinar três coisas não ensina nenhuma. Se sobrou conteúdo,
virou o próximo vídeo.

# Edição de vídeo gravado

Existem dois materiais que praticamente todo mundo já tem parado no
computador: gravação de reunião online e vídeo gravado no celular. Os dois
viram conteúdo publicável, mas o trabalho é diferente em cada caso.

## Os dois casos

Gravação de chamada online, com mais de uma pessoa na tela. O arquivo nasce
deitado (formato de televisão) e com as pessoas em quadradinhos. Para virar
vídeo vertical, precisa de reenquadramento: recortar o rosto de cada pessoa e
empilhar na tela, uma em cima e outra embaixo, seguindo quem está falando. O
áudio já costuma ser bom, a imagem é que precisa de trabalho.

Vídeo vertical do celular, uma pessoa só. Já está no formato certo, então não
se reenquadra nada. O trabalho aqui é outro: escolher o trecho que vale,
cortar silêncio e enrolação, dar ritmo e colocar apoio visual por cima
(legenda, palavra em destaque, número que aparece na tela).

## O processo, em etapas

1. Transcrever. Antes de cortar qualquer coisa, transformar a fala em texto
   com marcação de tempo. É muito mais rápido escolher o trecho lendo do que
   assistindo tudo de novo.
2. Escolher o trecho. Ler a transcrição procurando a frase mais forte, a que
   tem número concreto, afirmação firme ou algo que contraria o senso comum.
   Essa frase vira o começo, mesmo que no original apareça no meio ou no fim.
3. Montar a ordem. O corte publicável quase nunca é um pedaço contínuo. É
   começo forte, contexto curto, desenvolvimento e fecho. Se a frase de
   abertura veio do fim, a emenda com o trecho seguinte precisa fazer sentido
   de ouvido, não só no papel.
4. Cortar silêncio e repetição. Fora pausas longas, vícios de fala e qualquer
   ideia dita duas vezes. Se a mesma coisa aparece duas vezes, fica a versão
   mais forte.
5. Reenquadrar (só no caso da chamada). Recortar o rosto com folga em volta,
   nunca justo demais. Olhos e boca sempre visíveis. Um pouco do alto da
   cabeça pode ser cortado, os olhos nunca. Sem tarja preta nas bordas.
6. Legendar. Blocos curtos, poucas palavras por vez, sempre sincronizados com
   a fala. Legenda nunca por cima do rosto.
7. Revisar. Antes de publicar: começo forte nos primeiros segundos, sem
   repetição, sem corte que soe abrupto, acentuação impecável na legenda,
   proporção correta e áudio sem estouro.

## Réguas práticas (números apenas como exemplo, ajuste ao seu caso)

| Item | Referência de exemplo |
|---|---|
| Duração de corte vertical | 30 a 90 segundos |
| Abertura forte | primeiros 3 segundos |
| Palavras por bloco de legenda | 1 a 3 |
| Pausa que merece corte | acima de 1,5 segundo |
| Destaques visuais por vídeo | no máximo 3 |

## Comandos úteis de ffmpeg

O ffmpeg é o programa que faz o trabalho pesado de vídeo por linha de comando.
Você não precisa decorar nada: o Zeus monta e roda o comando. Os blocos abaixo
ficam aqui para quem quiser entender ou repetir na mão.

```bash
ffprobe -v error -show_entries format=duration,size -show_streams entrada.mp4
```
Mostra a ficha técnica do arquivo: duração, tamanho, resolução e áudio.

```bash
ffmpeg -i entrada.mp4 -ss 00:01:12 -to 00:01:47 -c copy trecho.mp4
```
Recorta um pedaço pelo relógio, sem reprocessar a imagem, então sai quase
instantâneo.

```bash
ffmpeg -i entrada.mp4 -vf "crop=608:1080:656:0,scale=1080:-2" vertical.mp4
```
Recorta uma janela vertical de dentro do vídeo deitado e amplia para a largura
final. Os números são a largura, a altura e a posição do recorte.

```bash
ffmpeg -i cima.mp4 -i baixo.mp4 -filter_complex "[0:v][1:v]vstack=inputs=2" empilhado.mp4
```
Empilha duas imagens, uma em cima da outra: é assim que a chamada com duas
pessoas vira vertical.

```bash
ffmpeg -f concat -safe 0 -i lista.txt -c copy montagem.mp4
```
Junta vários trechos já recortados, na ordem definida em um arquivo de lista.

```bash
ffmpeg -i entrada.mp4 -vf "subtitles=legenda.ass" legendado.mp4
```
Grava a legenda dentro da imagem, para aparecer em qualquer aparelho sem
depender da configuração de quem assiste.

```bash
ffmpeg -i entrada.mp4 -af "loudnorm=I=-16:TP=-1.5:LRA=11" audio-normalizado.mp4
```
Equaliza o volume geral, tirando o efeito de trecho baixo demais seguido de
trecho estourado.

```bash
ffmpeg -i entrada.mp4 -af silencedetect=noise=-30dB:d=1.2 -f null -
```
Lista onde estão os silêncios longos, para você saber o que cortar.

```bash
ffmpeg -i entrada.mp4 -vf scale=720:-2 -crf 28 previa.mp4
```
Gera uma prévia leve e rápida para aprovação, antes de renderizar a versão
final em qualidade alta.

## Erros que estragam o corte

- Reenquadrar no olho, sem conferir: rosto descentralizado o vídeo inteiro.
- Esticar a imagem para caber: a pessoa fica achatada ou alongada.
- Legenda dessincronizada porque o corte foi feito depois de legendar.
- Cortar tão rente que o áudio perde a primeira sílaba da frase.
- Começar com "oi, tudo bem, hoje eu vim falar sobre": isso nunca é abertura.

# Motion design nas suas cores

Animação programada é vídeo feito por código em vez de linha do tempo de
editor. Você descreve a cena uma vez, e o computador desenha cada quadro. A
vantagem prática é repetição barata: trocar o texto, a cor ou o número e gerar
outra versão custa segundos, não outra diária de edição.

## Quando vale a pena

Vale quando o vídeo é feito de texto, número, forma e marca: vinheta de
abertura e de fechamento, peça de anúncio sem rosto, explicação com setas e
etapas, revelação de preço, gráfico de resultado, prova em números, demonstração
de tela dentro de um celular desenhado.

Não vale quando o valor está no rosto e na fala da pessoa. Depoimento, aula e
bastidor pedem gravação de verdade, com animação só de apoio.

Regra de bolso: se você vai precisar de dez versões parecidas, animação
programada ganha. Se é uma peça única e muito artística, editor tradicional
resolve mais rápido.

## Como a sua identidade entra

A identidade visual fica guardada em um lugar só, como uma ficha da sua marca,
e todas as peças leem dessa ficha. Trocar a cor principal muda todas as
animações de uma vez, sem ninguém sair caçando arquivo.

A ficha guarda quatro coisas:

- Cores: a principal, a secundária, o fundo, a do texto e a de destaque. Junto
  com elas, as cores de significado: uma para positivo, uma para negativo, uma
  para alerta.
- Tipografia: a fonte dos títulos, a fonte dos textos e o peso de cada uma.
  Duas famílias resolvem quase tudo; três já viram bagunça.
- Ritmo: o jeito como as coisas entram e saem. Ritmo calmo passa seriedade,
  ritmo rápido passa energia, ritmo seco passa impacto. Esse ajuste é uma
  escolha só, aplicada ao vídeo inteiro.
- Traço: ícones e formas no mesmo estilo, com a mesma espessura de linha.
  Misturar ícone fino com ícone cheio denuncia amadorismo mais rápido do que
  cor errada.

Peça nova nasce lendo essa ficha, nunca escrevendo cor solta dentro da cena.

## Princípios de boa animação

1. Uma ideia por cena. Se a cena tem duas mensagens, são duas cenas. Quem
   assiste não consegue ler uma coisa e ouvir outra ao mesmo tempo.
2. Entrada e saída suaves. Nada aparece e some seco. O elemento entra ganhando
   forma e sai devolvendo o espaço, com aceleração natural, como objeto de
   verdade, que tem peso.
3. Tempo de leitura respeitado. O texto fica na tela pelo tempo de ser lido em
   voz alta com calma, e ainda sobra um respiro. Texto que some antes da
   leitura é pior do que texto nenhum, porque irrita.
4. Nada piscando. Piscada rápida e cor vibrando cansam, passam mal a quem tem
   sensibilidade e fazem a peça parecer barata.
5. Movimento com motivo. Cada elemento se move porque está chamando atenção
   para algo. Movimento decorativo compete com a mensagem, e ganha.
6. Contraste antes de enfeite. Texto claro em fundo escuro, ou o contrário. Se
   você aperta os olhos na prévia, o problema é o contraste, não o tamanho.
7. No máximo um destaque por vez. Se tudo brilha, nada brilha.
8. Silêncio visual entre blocos. Um instante de tela limpa entre uma ideia e
   outra vale mais que uma transição elaborada.

## Vinheta e abertura

Vinheta é curta por definição: uns poucos segundos, uma aparição da marca, uma
saída limpa. Ela abre e fecha o vídeo, e é sempre a mesma. Vinheta que muda a
cada vídeo não constrói reconhecimento, que é justamente para o que ela serve.

Abertura de conteúdo é outra coisa: entra a promessa do vídeo, em texto grande
e curto, e sai. Nunca gaste os primeiros segundos com marca girando na tela:
eles são o espaço mais caro do vídeo inteiro.

## Antes de exportar

- Assista uma vez sem som: a mensagem se sustenta?
- Assista no celular: o texto menor ainda é legível?
- Conte os destaques: tem mais de um brilhando ao mesmo tempo?
- Confira a acentuação de cada palavra que aparece na tela, uma a uma.
- Gere uma prévia leve para aprovar antes de renderizar em qualidade final.
