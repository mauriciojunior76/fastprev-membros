# Aprendizado: cada sessão termina mais inteligente

## STATUS: SEMPRE ATIVO. Cada erro vira causa raiz, cada causa raiz vira regra, cada regra repetida vira trava.

## Quando o usuário corrige você

1. PARAR. Não emendar um remendo por cima do erro.
2. Diagnosticar a CAUSA RAIZ, não o sintoma. "Errei o preço" é sintoma. "Li
   um arquivo desatualizado porque não conferi a data" é causa raiz.
3. Corrigir de verdade.
4. Registrar em `memory/APRENDIZADOS.md`.
5. Se a causa raiz se repetir, criar ou atualizar a regra correspondente.
6. Confirmar em uma linha o que você aprendeu.

## Formato do registro

```markdown
## ERRO #{N} - AAAA-MM-DD - título curto

PROBLEMA: o que aconteceu, do ponto de vista de quem viu.
CAUSA RAIZ: por que aconteceu, no nível estrutural.
CORRECAO: o que foi mudado de verdade.
REGRA: a lei que nasce disso, escrita como ordem reutilizável.
CATEGORIA: área / natureza.
OCORRENCIA: primeira vez, ou N-ésima com a mesma causa.
```

Acertos também entram, no mesmo arquivo:

```markdown
## ACERTO #{N} - AAAA-MM-DD

ASSUNTO: o que era.
O_QUE_FUNCIONOU: o que deu certo.
POR_QUE: a razão, não a coincidência.
PADRAO: o que replicar da próxima vez.
```

## Escalada por reincidência

- 1ª vez: registra e corrige.
- 2ª vez com a MESMA causa raiz: vira regra dedicada em `.claude/rules/` ou em
  `docs/rules-on-demand/`, e um item de checklist antes daquele tipo de ação.
- 3ª vez: vira gate em código, um hook que impede a ação sem verificação.
  Regra escrita não segurou duas vezes, então escrever de novo não vai segurar.

## Checklist antes de agir em assunto que já deu errado

1. Existe regra sobre isso? Ler antes.
2. Já errei nisso antes? Conferir o checklist da categoria.
3. Existe referência aprovada pelo usuário? Usar, não inventar.
4. Já falhei nesta sessão nesse ponto? Mudar de abordagem, não repetir.
5. O que estou entregando responde exatamente o que foi pedido?

## Descoberta por repetição

Quando você resolve "na mão" um tipo de tarefa que não tem skill nem squad
dedicado, registre a ocorrência em `memory/LACUNAS-DE-CONHECIMENTO.md`.

- 3ª ocorrência do mesmo tipo: PARE e ofereça criar a skill ou o squad.
- 4ª ou mais: recomende ativamente a criação, junto com o atendimento do pedido.

O sistema cresce a partir de uso medido, nunca de palpite.

## Quando uma skill for corrigida

Se a correção do usuário atingiu o resultado de uma skill, atualize a skill no
MESMO turno (versionando antes) e avise em uma linha o que mudou. Aprendizado
que morre no log não é aprendizado.
