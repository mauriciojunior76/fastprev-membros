# Piloto: a função Animation do Claude Design contra o nosso motor

Criado em 06/09/2026, a partir de um vídeo do YouTube que o o dono do canal trouxe (criador que gera
motion graphics pela função Animation do claude.ai/design e edita no Premiere). O objetivo do
piloto é medir, com a MESMA cena, o que a ferramenta faz melhor que o nosso Remotion, e trazer
para o motor só o que for melhor de verdade. Nada entra por impressão: entra por comparação
lado a lado, quadro a quadro.

## A cena escolhida

Grade de conceitos do reel do Paulo Ruiz (34,98s a 44,48s do vídeo, 9,5 segundos). Seis
propósitos de conteúdo, cada um entrando na palavra que o nomeia, com um anel colorido único
que migra de bloco em bloco. É a cena com mais movimento da peça e a que mais passou por
correção, então o o dono do canal conhece cada detalhe dela.

A fala do trecho, palavra por palavra:

> "Então, um exemplo, um conteúdo vai ser para passar autoridade, outro para gerar
> relacionamento, outro para educar o público, outro para elevar o nível de consciência, outro
> para mostrar quem você é e gerar conexão."

Os seis blocos, na ordem em que a fala os nomeia, com o ícone que o mapa oficial escolheu:

| Ordem | Rótulo | Ícone Lucide | Entra em (segundos da cena) |
|---|---|---|---|
| 1 | AUTORIDADE | crown | 0,00 |
| 2 | RELACIONAMENTO | link | 1,42 |
| 3 | EDUCAR O PÚBLICO | book-open | 2,70 |
| 4 | NÍVEL DE CONSCIÊNCIA | signal | 4,70 |
| 5 | CONEXÃO | users | 7,93 |
| 6 | QUEBRA DE OBJEÇÃO | shield-check | 8,80 (não é falado; fecha a grade) |

## Como rodar (o o dono do canal, na interface web do Claude Design)

1. Abrir o projeto do design system dos Reels Apple no claude.ai/design (o mesmo em que o
   manual foi gerado), para a ferramenta ter Inter, Lucide, a escala e a regra de cor à mão.
2. Escolher a função Animation.
3. Rodar o PROMPT A abaixo. Se a ferramenta fizer perguntas: formato vertical 1080x1920, duração
   10 segundos, fundo branco, sem música.
4. Exportar o vídeo. Nomear `piloto-A-com-sistema.mp4`.
5. Numa conversa nova, rodar o PROMPT B (a versão "decide por mim"). Exportar como
   `piloto-B-decide-por-mim.mp4`.
6. Mandar os dois arquivos para o Zeus na conversa.

## PROMPT A (com o design system)

```
Crie uma animação vertical de 1080 por 1920, com 10 segundos, fundo branco, sem música,
seguindo o design system deste projeto (Inter, ícones Lucide, um único portador de cor por
quadro, vidro sutil, escala fechada de espaço e raio).

É a cena "grade de conceitos" de um vídeo em que o locutor lista seis propósitos de conteúdo
para o Instagram de um mentor. A fala do trecho é:

"Então, um exemplo, um conteúdo vai ser para passar autoridade, outro para gerar
relacionamento, outro para educar o público, outro para elevar o nível de consciência, outro
para mostrar quem você é e gerar conexão."

Seis blocos de 280 por 158, raio 24, em duas linhas de três. Cada bloco tem um ícone Lucide de
40 no topo e um rótulo de 26 em caixa alta, peso 700, abaixo. Os blocos e ícones, na ordem:
AUTORIDADE (crown), RELACIONAMENTO (link), EDUCAR O PÚBLICO (book-open), NÍVEL DE
CONSCIÊNCIA (signal), CONEXÃO (users), QUEBRA DE OBJEÇÃO (shield-check).

Cada bloco entra na palavra que o nomeia: 0,0s, 1,4s, 2,7s, 4,7s, 7,9s e 8,8s. Ao entrar, o
bloco ganha um anel colorido de espectro (gradiente cônico) de 6 pixels ao redor; quando o
próximo bloco entra, o anel migra para ele em 24 quadros e o bloco anterior recua para cinza,
opacidade 0,8. Nunca dois anéis ao mesmo tempo. O ícone pode ter movimento interno discreto ao
entrar (a peça certa do ícone se move, nunca o ícone inteiro girando).

Mostre a animação completa e depois deixe a grade parada por 1 segundo no fim.
```

## PROMPT B (decide por mim)

```
Crie uma animação vertical de 1080 por 1920, com 10 segundos, fundo branco, ilustrando esta
fala de um locutor: "Então, um exemplo, um conteúdo vai ser para passar autoridade, outro para
gerar relacionamento, outro para educar o público, outro para elevar o nível de consciência,
outro para mostrar quem você é e gerar conexão." Decida por mim o visual, o movimento e o ritmo.
```

## O que o Zeus faz com os dois vídeos

1. Extrai quadros nos mesmos instantes dos três vídeos (o nosso render da cena e os dois do
   Claude Design): 0,3s (entrada do primeiro), 1,6s (migração do anel), 4,9s (meio da cena),
   9,5s (hold final). Monta um único PNG lado a lado por instante.
2. Lista, por instante, o que difere: curva de entrada, duração do movimento, deslocamento,
   como o ícone se move, como o recuo é feito, o que a ferramenta inventou que não estava no
   prompt.
3. O que for melhor vira NÚMERO no motor (curva em `core/curves.ts`, duração em
   `core/tokens.ts`, regra em `design-system/local-overrides.json`), sempre com a origem escrita:
   "medido no piloto Animation de 06/09/2026". O que não for melhor fica registrado como visto e
   recusado, com o motivo, na seção 14 de `docs/DESIGN-SYSTEM-REELS-APPLE.md`.
4. Decisão sobre o passo na esteira: se a ferramenta gerou a cena em menos de 10 minutos e o
   resultado serve como prévia, a esteira ganha um passo opcional de "cena mexendo para
   aprovação" antes do render. Se não, o piloto fecha sem mudar o processo.

## O que o piloto NÃO decide

- Não decide trocar a fonte. Inter é a fonte de quatro peças aprovadas e do sistema inteiro.
- Não decide instalar Lottie de biblioteca. A regra da skill icon-director continua: ícone se
  anima pela peça certa, com pivô físico, nunca girando inteiro; Lottie só quando já existe
  recurso pronto vindo do After Effects.
- Não substitui o motor. A Animation não tem legenda por palavra, som por peso nem os gates.
