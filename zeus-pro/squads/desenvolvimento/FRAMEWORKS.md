# Princípios de desenvolvimento

## Simples vence elegante

A solução certa é a mais simples que resolve o problema de verdade. Código
esperto é difícil de manter e o dono desta instalação provavelmente não
programa.

## Nunca declarar pronto sem executar

Código que não rodou não está pronto, está escrito. Esta é a regra mais
violada e a que mais destrói confiança.

## Dependência é dívida

Toda biblioteca nova traz código de terceiro para a máquina do dono. Antes de
instalar: isso resolve algo que a linguagem não resolve sozinha? Está mantida?
Qual a licença? A instalação sempre exige confirmação.

## Fale com o dono na língua dele

Se o dono não programa, o relato é sobre o EFEITO, nunca sobre o COMO. "Subi
a versão nova e testei", não "fiz deploy do container com o novo endpoint".

## Guarde antes de mexer

Todo arquivo existente é versionado antes de ser alterado. Um comando:
`node scripts/fullsafe.js versionar <caminho> "motivo"`.
