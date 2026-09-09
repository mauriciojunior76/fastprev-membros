---
name: criar-squad
description: Cria um squad novo e especializado quando o ZEUS percebe que a arquitetura atual não cobre uma necessidade recorrente do dono. Use quando ele pedir "cria um time pra isso", quando um tipo de tarefa se repetir pela terceira vez sem squad dedicado, ou quando a profissão dele exigir capacidade que os 12 squads genéricos não têm.
---

# Criar um squad novo

## Quando criar (e quando não)

CRIE quando: a mesma classe de tarefa apareceu 3 vezes ou mais sem squad
dedicado; a profissão do dono tem um domínio próprio que os genéricos não
cobrem; ou ele pediu explicitamente.

NÃO CRIE quando: aconteceu uma vez; um squad existente resolveria com um
agente a mais; ou você acha que "seria legal ter". Squad que ninguém usa é
peso morto que aparece em toda decisão de roteamento.

## Pipeline

### ETAPA 1: confirmar a lacuna
Leia `memory/LACUNAS-DE-CONHECIMENTO.md` e a lista de squads existentes.
Responda por escrito: qual necessidade não é atendida hoje, e por que nenhum
squad atual resolve. Se você não conseguir responder em duas frases, a lacuna
não está clara o suficiente para justificar um squad.

### ETAPA 2: explicar e pedir autorização
Diga ao dono: qual a lacuna, o que o squad novo faria, quais agentes teria, e
o que ele passaria a conseguir pedir. Espere o "pode". Squad criado sem
autorização é bagunça que ninguém pediu.

### ETAPA 3: definir capacidades e limites
- O que este squad faz.
- O que ele explicitamente NÃO faz.
- Quais fontes de verdade ele consulta. Em área regulada, fonte primária
  oficial acima de tudo.
- Que ações dele sempre exigem confirmação.
- Que limites éticos ou legais existem naquela área.

### ETAPA 4: pesquisar ferramenta, se precisar
Se o squad depender de ferramenta que não existe no sistema, use a skill
`pesquisar-ferramenta`. Nenhuma dependência é instalada sem autorização
explícita, e toda dependência aprovada é registrada em
`docs/DEPENDENCIAS-E-FONTES.md`.

### ETAPA 5: criar a partir do template
Copie `squads/_template/` para `squads/{id}/` e preencha:

- `squad.yaml` com identidade, gatilhos, elenco, limites e qualidade.
- `MEMORY.md` vazio, no formato padrão.
- `CHECKLIST.md` com os critérios daquele domínio.
- `agentes/` com o lead mais 3 a 6 especialistas. Não mais que isso.
- `FRAMEWORKS.md`, se o domínio tiver método que valha documentar.

Regra do elenco: cada agente precisa de uma razão específica para existir. Se
dois agentes fazem quase a mesma coisa, são um só.

### ETAPA 6: registrar
- Adicione o squad em `docs/SQUADS.md`.
- Adicione os gatilhos em `.claude/hooks/context-triggers.json`.
- Documente na Vault, pasta `12-SQUADS`.

### ETAPA 7: testar antes de confiar
Rode uma tarefa real pelo squad novo e mostre o resultado ao dono. Squad que
nunca foi testado não está pronto, está escrito.

## Fronteiras

- Nunca crie squad para replicar conhecimento que você não tem. Um squad
  jurídico sem as fontes jurídicas certas é pior que nenhum squad: ele produz
  com confiança e erra.
- Nunca crie squad que precise de dado que o dono não forneceu.
- Nunca crie mais de um squad por vez.
