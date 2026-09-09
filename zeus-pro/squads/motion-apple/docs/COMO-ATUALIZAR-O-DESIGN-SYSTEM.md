# Como incorporar melhoria de fora no design system

O o dono do canal vai levar `DESIGN-SYSTEM-REELS-APPLE.md` para o Claude Design, trazer a
proposta de volta e pedir para atualizar. Este documento diz como fazer isso sem perder
o que custou rodada de correção para descobrir.

## O problema que esta regra evita

Uma proposta externa chega bonita e completa. É tentador substituir o arquivo inteiro.
Só que metade do que está lá não é preferência de design: é cicatriz. A regra de "cor
só em dois lugares" existe porque uma versão foi reprovada por excesso de cor. O teto
de escala 1,04 existe porque quique amador já foi reprovado. Uma proposta que não
conhece essas rodadas vai, de boa fé, sugerir o que já foi rejeitado.

## As três camadas, e o que cada uma aceita

**Camada 1: decisão provada. Não muda por sugestão.**

O que está na seção "O que já foi reprovado, e por quê", mais a regra de uma coisa por
vez, a regra de cor em dois pontos, o teto de escala e as duas espessuras de traço.
Cada um desses saiu de uma reprovação registrada em `aprendizado/licoes.json`.

Proposta que contraria um destes só entra se o o dono do canal disser explicitamente que mudou
de ideia. Não basta a proposta ser boa: ele já viu o outro jeito e reprovou.

**Camada 2: lacuna declarada. Aceita proposta inteira.**

A seção "Onde o sistema está incompleto" lista cinco. Escala de raio de canto, escala
de espaçamento, paleta duplicada em três arquivos, régua de hierarquia visual e
ausência de wireframe. Aqui não existe decisão anterior para contrariar: proposta boa
entra direto.

**Camada 3: valor medido. Muda só com medida nova.**

Os números que vieram do código: 88 de margem, 1632 de zona morta, 470 de palco
expandido, as curvas em cubic-bezier, as durações. Se a proposta sugerir outro número,
ele tem que vir com o motivo, e o código muda junto. Documento e código divergindo é
pior do que documento errado sozinho.

## O caminho, quando o material chegar

1. Guardar o material recebido em `aprendizado/propostas-externas/AAAA-MM-DD-<origem>/`,
   sem editar. É a evidência do que foi proposto, separada do que foi aceito.
2. Versionar o design system atual antes de tocar nele:
   `node ../../scripts/fullsafe.js backup squads/motion/docs/DESIGN-SYSTEM-REELS-APPLE.md`
3. Classificar cada mudança proposta em camada 1, 2 ou 3.
4. As de camada 1 vão para uma lista de "propostas que contrariam decisão provada", com
   o motivo, e vão para ele decidir. Nunca aplicar por conta própria.
5. As de camada 2 e 3 entram, e cada uma ganha uma linha dizendo de onde veio.
6. Se a mudança tocar valor que vive no código (cor, espessura, respiro, curva), mudar o
   código na mesma sessão. Documento que descreve um mundo que não existe é pior do que
   documento nenhum.
7. Rodar `node scripts/aprendizado.js --revisar <Composition>` numa peça aprovada. Se
   uma peça que ele aprovou passar a reprovar, a régua nova está errada, não a peça.
8. Registrar em `memory/erros-aprendidos.md` o que foi aceito e o que foi recusado, com
   o porquê de cada recusa.

## O teste que decide, quando bater dúvida

Rodar a proposta contra as quatro peças aprovadas. Se ela reprovaria alguma delas, ou a
proposta está errada, ou ele mudou de gosto. Perguntar, nunca supor: é a peça aprovada
que define o certo, não o documento.
