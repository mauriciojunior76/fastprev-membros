---
name: boot-inteligencia
description: Conduz a entrevista inicial que ensina o ZEUS quem é o dono desta instalação, o que ele vende, para quem e como fala, transformando as respostas em memória estruturada. Use quando o sistema ainda não conhece o usuário, ou quando ele disser "boot da inteligência", "vamos começar", "você não me conhece", "configurar o zeus".
---

# Boot da Inteligência

## Objetivo

Sair de "não sei nada sobre você" para "sei quem você é, o que você vende,
para quem, e como você fala". É o que separa um assistente genérico de um
assistente pessoal.

## Antes de começar

1. Confira se `memory/PERFIL.md` já existe. Se existir, o boot já rodou:
   pergunte se ele quer ATUALIZAR (recomendado) ou REFAZER do zero. Refazer
   versiona os arquivos antigos, nunca apaga.
2. Leia `onboarding/boot-da-inteligencia.md`. É o roteiro completo dos 8
   blocos, e este documento não o substitui.
3. Leia `core/memoria-schema/FRONTMATTER.md`. Todo arquivo que você criar
   obedece àquele esquema.

## Pipeline

### ETAPA 1: abertura
Explique em três frases o que vai acontecer e quanto tempo leva. Pergunte só
como ele quer ser chamado. Não faça mais nenhuma pergunta nesta etapa.

### ETAPA 2: os 8 blocos, um por vez
Siga `onboarding/boot-da-inteligencia.md`. Regras que valem em todos:

- Uma pergunta ou um grupo pequeno por vez. Nunca o bloco inteiro de uma vez.
- Aprofunde quando a resposta abrir porta.
- Se ele der um link (site, rede social, documento), LEIA antes de perguntar o
  que está lá. Volte com o que entendeu e peça correção.
- Ao fechar cada bloco, escreva o arquivo correspondente ANTES de seguir. Se a
  conversa cair, o que já foi respondido está salvo.

### ETAPA 3: o bloco de produtos não fecha na primeira volta
Depois de mapear os produtos, pergunte: "tem mais algum produto ou serviço que
a gente não falou?". Repita até a resposta ser não. Um produto esquecido é uma
fonte de erro permanente em toda copy e toda estratégia depois.

### ETAPA 4: retrato e correção
Resuma em 10 linhas quem ele é, o que vende, para quem e como fala. Peça
correção explicitamente. As correções são a informação mais valiosa da
entrevista inteira, porque mostram onde você entendeu errado.

### ETAPA 5: plano por profissão
Leia o arquivo correspondente em `onboarding/planos-por-profissao/`. Se a
profissão dele não tiver arquivo, use `generico.md` e proponha criar o plano
específico. Grave o resultado em `memory/plano-de-inteligencia.md`.

### ETAPA 6: identidade visual
- Já tem marca: peça manual, logo, cores e fontes, e preencha
  `templates/DESIGN-SYSTEM-CENTRAL.md` a partir do material real.
- Não tem: registre como lacuna de prioridade alta e ofereça construir depois.
Nunca invente cor nem fonte para a marca de alguém.

### ETAPA 7: ligar os gatilhos
Adicione em `.claude/hooks/context-triggers.json` os termos que ELE usa: nome
dos produtos, nome dos projetos, jeito próprio de pedir as coisas. Isso é o
que faz o contexto certo chegar sozinho nas próximas conversas.

### ETAPA 8: fechar
- `node scripts/memory-index.js`
- `node scripts/obsidian-mirror.js`
- Preencher `memory/DIARIO-DE-BORDO-INICIAL.md`
- Preencher `memory/LACUNAS-DE-CONHECIMENTO.md`
- Escrever `memory/INDICE.md` com uma linha por memória criada
- Dizer, em três linhas, o que você passou a saber, o que ainda não sabe, e o
  que ele já pode te pedir

## Fronteiras

- Não invente nenhum dado sobre o usuário. Vazio é melhor que errado.
- Não transforme inferência sua em regra sem confirmação explícita.
- Não peça credencial, senha nem dado bancário. O boot é sobre o trabalho
  dele, não sobre acesso a contas.
- Não julgue as escolhas de negócio dele durante a entrevista. Isso é coleta.
  Opinião vem depois, quando ele pedir estratégia.

## Critério de saída

O boot terminou quando: `memory/PERFIL.md` existe, todo produto tem arquivo,
público e comunicação estão registrados, o índice está escrito, e o usuário
confirmou o retrato que você devolveu.
