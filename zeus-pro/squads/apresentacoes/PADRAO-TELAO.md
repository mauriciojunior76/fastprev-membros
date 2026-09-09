# Padrão de palestra e aula ao vivo (telão)

Receita completa de um deck de palestra que funciona numa sala cheia, extraída de uma
apresentação real aprovada e usada numa imersão presencial.

Vale para palestra, aula ao vivo, workshop e qualquer apresentação projetada. NÃO vale para
deck de leitura (proposta, relatório enviado por e-mail): lá o texto é para ler de perto, aqui
o texto é para bater o olho de dez metros de distância.

## 1. O arco: a lógica que segura a plateia

Quatro atos numerados, com abertura antes e fecho depois. Os atos têm tamanhos diferentes de
propósito: o bloco que entrega as ferramentas é sempre o maior.

| Bloco | Slides | O que faz |
|---|---|---|
| Abertura | 4 | prova, desarme da objeção, contrato de expectativa |
| Ato 01 | 3 | o ganho: o que o assunto faz pela pessoa |
| Ato 02 | 6 | o conceito central, a regra que quase ninguém cumpre |
| Ato 03 | 8 | as ferramentas ou os passos, um por vez |
| Ato 04 | 3 | a condição que decide se funciona |
| Fecho | 2 | UMA ação, mais a entrega do material |

### As 5 leis da abertura

1. **Abra com prova pessoal em número, antes de qualquer teoria, e deixe o loop aberto.**
   No deck original: "Um vídeo meu já fez mais de 100 mil." seguido de "Eu nunca gravei esse
   vídeo." A plateia para de mexer no celular porque ficou uma pergunta no ar.
2. **O slide seguinte desarma a objeção que a prova acabou de criar.** Nunca deixe a plateia
   sozinha com o medo que você gerou: "Você continua sendo o rosto da empresa."
3. **Contrato de expectativa em um slide, cortando o que a pessoa NÃO vai receber.**
   "Você não sai daqui sabendo usar tudo. Sai sabendo onde usar." Promessa que você cumpre.
4. **O loop da abertura fecha no MEIO da palestra, não no fim**, e de preferência provando com
   o próprio material que está na tela: "Esta apresentação foi feita por IA."
5. **O fecho não resume: pede uma única ação e diz o que a pessoa não precisa fazer.**
   "Você não precisa usar todas. Precisa começar a documentar."

### Ritmo, com números

- Teto de cerca de **17 palavras por slide**, contando etiqueta, título e linha de apoio juntos.
  Nunca passe de 33.
- **Um único slide denso** de sistema ou fluxo na palestra inteira. Logo depois dele, sempre um
  slide de frase única com 6 a 13 palavras em corpo gigante, para a plateia respirar.
- No bloco de ferramentas, a etiqueta de cima é **sempre uma pergunta na segunda pessoa** e o
  título é a resposta: "Quer vídeo com o seu rosto, sem gravar?"
- Depois do título, no máximo **uma linha de apoio**, e que seja uma lista falada separada por
  vírgula ("Página, proposta, relatório, atendimento"), nunca marcadores empilhados.
- **Número só entra quando é a prova ou o índice do capítulo.** Zero gráfico, zero porcentagem,
  zero tabela num deck de palco.
- **Nome de marca não vai no telão**: sai da sua boca. A exceção é a ferramenta em que você quer
  que a plateia clique hoje mesmo.

## 2. O visual, com os valores que funcionam projetados

### Cor: tudo em variável, uma só cor de ação

```css
:root {
  --bg: #000000;        /* preto puro: no telão vira profundidade infinita */
  --bg-alt: #0a0a0a;    /* alterna slide a slide, marca a virada no canto do olho */
  --bg-card: #141414;
  --accent-1: <tom escuro da sua marca>;    /* só fecha gradiente e desenha seta */
  --accent-2: <tom vibrante da sua marca>;  /* ÚNICA cor de ação da tela */
  --accent-3: <tom claro da sua marca>;     /* só no meio do gradiente de texto */
  --text: #ffffff;
  --text-muted: rgba(255, 255, 255, 0.62);
  --border: rgba(<accent-2>, 0.30);
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
}
```

As três cores saem do seu Design System Central. Uma só cor de ação (etiqueta, ícone, contador,
borda) ensina a plateia onde olhar em menos de um segundo. O fundo alterna entre `--bg` nos
slides ímpares e `--bg-alt` nos pares, sem exceção: a troca sutil marca a virada mesmo quando o
conteúdo é parecido.

### Tipografia: duas famílias, papéis fixos, tracking invertido

Uma família de display para título e etiqueta, uma de corpo para o resto. A regra que mais muda
o resultado: **título grande sempre com espaçamento de letra NEGATIVO, etiqueta pequena em caixa
alta sempre POSITIVO** (0.16em a 0.17em). Título apertado vira uma mancha sólida que o olho
captura inteira de longe; etiqueta espaçada lê como rótulo e não compete.

| Papel | Tamanho | Espaçamento | Altura de linha |
|---|---|---|---|
| Frase de impacto / capa | `clamp(46px, 7vw, 124px)` | -0.025em | 1.05 |
| Número do capítulo | `clamp(96px, 15vw, 240px)` | -0.06em | 0.9 |
| Título de capítulo | `clamp(44px, 6.4vw, 112px)` | -0.03em | 1.06 |
| Título padrão | `clamp(40px, 5.4vw, 92px)` | -0.03em | 1.1 |
| Corpo | `clamp(19px, 1.85vw, 29px)` | 0 | 1.55 |
| Etiqueta em caixa alta | `clamp(13px, 1.3vw, 19px)` | +0.17em | |

Todo tamanho nasce em `clamp()` com `vw` no meio. É o que faz o mesmo arquivo abrir no seu
notebook e no telão do evento na mesma proporção. Nunca use pixel fixo em título.

### A regra do título em duas metades

Todo título quebra em duas partes, com a quebra decidida por você (`<br>`, nunca pelo
navegador): a primeira metade em branco é o setup, a segunda dentro de um `<span>` colorido é o
soco. O olho pula direto para a parte colorida e memoriza a metade que importa.

```html
<h1>O que a IA muda<br><span class="accent">na sua empresa</span></h1>
```

O texto em gradiente precisa do par anti-corte (`padding-right: 0.08em` e
`margin-right: -0.08em`), senão a última letra corta e o título parece defeituoso a dez metros.

Truque de ênfase que só funciona uma vez: **inverta a ordem do gradiente em um único slide da
palestra**, o da sua tese central. Isso marca aquele slide como o mais importante sem precisar
escrever "importante".

### Geometria e camadas

Slide de `100vw` por `100vh`, área segura de `56px` em cima e embaixo e `84px` nas laterais,
conteúdo travado em `1560px`, página que nunca rola. Uma camada de grão bem sutil por cima da
tela inteira quando o fundo é preto puro (o preto absoluto projetado fica "chapado" sem ela).

### Três papéis de imagem, e nunca misture

1. **Foto lateral em 4:5**, com brilho suave ao redor: para slide de conceito e de ferramenta.
2. **Foto de fundo escurecida** (véu preto em 68% de opacidade; 84% quando for só clima): para
   transição de capítulo.
3. **Nenhuma imagem**: no slide de sistema e no slide de frase-soco. O vazio é o efeito.

Repetir a mesma imagem de propósito em dois pontos é o callback visual: no deck original a
câmera aparece na prova da abertura e volta na ferramenta que explica aquela prova.

### Interação de palco

Grid ou fluxo com vários itens revela **um item por clique**: o atual em cor plena, os
anteriores esmaecidos e levemente desfocados, e o que ainda vem invisível. Depois do último
item, um clique extra reintegra tudo em cor plena com um brilho rápido. Voltar um slide sempre
reentra com ele inteiro revelado, nunca reanimando do zero (você vai voltar durante a pergunta
de alguém, e reanimar te faz perder o fio).

Mapeie o avanço para **seta direita, espaço e Page Down** juntos: é o que todo apresentador de
slides emite. Seta esquerda e Page Up voltam.

## 3. As imagens conceituais

Use a mesma receita de imagem conceitual em contraluz do resto do sistema (peça ao ZEUS a
receita de capa conceitual). O que muda para palestra: feche em **1280x720**, e mapeie cada
imagem pelo ASSUNTO do slide, nunca pelo número dele.

ATENÇÃO AO CUSTO: gerar imagem por IA custa dinheiro por peça. O ZEUS vai sempre perguntar antes,
dizendo quantas imagens e quanto custa, e esperar você aceitar. Um deck de palestra completo usa
de 15 a 20 imagens.

## 4. Depois da palestra, o deck vira outras coisas

Um deck bom não termina em si. O mesmo conteúdo vira material escrito para quem assistiu, vira
página de captura, e pode ser exportado slide a slide em imagem para o designer importar em
outra ferramenta sem retrabalho.

O último slide entrega o material por QR code, com a copy que tira o peso da plateia:
"Não precisa anotar nada. Aponte a câmera. Leve tudo com você." Ninguém presta atenção
enquanto está copiando slide.
