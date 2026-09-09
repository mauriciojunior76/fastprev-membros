# Skills

## O que é uma skill

Um procedimento passo a passo para um tipo específico de trabalho. Squad é
QUEM faz; skill é COMO se faz.

## As que vêm de fábrica

| Skill | Para quê | Ativa quando você diz |
|---|---|---|
| boot-inteligencia | A entrevista inicial | "boot", "você não me conhece", "vamos começar" |
| diario-de-bordo | Registrar o dia | "fecha o dia", "diário", "resume o que rolou" |
| criar-squad | Criar time especializado | "cria um time pra isso" |
| pesquisar-ferramenta | Achar e auditar ferramenta | "existe alguma ferramenta pra" |
| ingerir-conhecimento | Material externo vira conhecimento | "estuda isso", "organiza esse material" |

## Formato

```markdown
---
name: nome-da-skill
description: O que faz, quando usar, e os gatilhos literais de ativação.
---

# Título

## Objetivo
## Antes de começar
## Pipeline (etapas numeradas, com comando quando houver)
## Fronteiras (onde NÃO vale, apontando a alternativa certa)
## Critério de saída
```

A `description` é o que faz a skill ser encontrada. Escreva os gatilhos
como a pessoa realmente fala, não como um manual diria.

## Criar uma skill

1. Confira se já não existe uma parecida. Duplicata é erro.
2. Escreva o rascunho em `.claude/skills-rascunho/`.
3. Teste em três pedidos reais diferentes.
4. Ajuste com base no que falhou.
5. Só então mova para `.claude/skills/`.

Skill nasce em rascunho de propósito: skill não testada na lista viva polui o
roteamento e é acionada na hora errada.

## Manter as skills vivas

Se você corrigir um resultado que veio de uma skill, o ZEUS atualiza a skill
no mesmo momento, versionando antes. Aprendizado que fica só no log de erros
não muda o comportamento.
