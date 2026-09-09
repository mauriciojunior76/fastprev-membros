---
name: diario-de-bordo
description: Registra o que aconteceu, o que foi decidido e o que ficou em aberto, alimentando a memória histórica do ZEUS. Use quando o dono disser "fecha o dia", "diário de bordo", "resume o que rolou", ou no fim de uma sessão em que houve decisão relevante.
---

# Diário de bordo

## Por que existe

Sem registro datado, o sistema não consegue responder as perguntas que mais
importam depois: isso já aconteceu antes? o que a gente decidiu e por quê?
aquela hipótese se confirmou? aquele projeto morreu ou só parou?

## Quando escrever

ESCREVA quando o dia tiver: decisão relevante, resultado que chegou, problema
novo, mudança de rumo, ou informação que muda o que o sistema sabe.

NÃO ESCREVA quando o dia foi execução comum sem nada novo. Diário obrigatório
diário vira ritual vazio e ninguém lê depois.

## Pipeline

### ETAPA 1: reunir
Recupere o que aconteceu na conversa e o que o dono contou. Não invente
nada, e não preencha campo com suposição.

### ETAPA 2: separar fato de hipótese
O que é número medido é fato, com a fonte. O que é impressão é hipótese, e vai
marcado como hipótese. Essa separação é o que impede uma suposição de virar
"o que a gente sabe" três meses depois.

### ETAPA 3: escrever
Copie `memory/_templates/diario-continuo.md` para
`memory/diarios/AAAA-MM-DD.md` e preencha. Use as seções que fizerem sentido
para o dia. A seção TENSÃO EM ABERTO é obrigatória, mesmo que a resposta seja
"nada".

Escreva a `descrição` do frontmatter como resumo executivo do dia: é ela que
aparece no índice e é por ela que você vai achar o dia certo depois.

### ETAPA 4: propagar
Toda mudança registrada no diário exige atualizar a memória correspondente:

| Mudou | Atualize |
|---|---|
| Produto, preço, oferta | `memory/produtos/` |
| Meta ou prioridade | `memory/objetivos.md` |
| Processo | a memória operacional |
| Estrutura ou time | `memory/empresa.md` |
| Decisão relevante | registro de decisão, com data de revisão |

Diário sem propagação vira histórico bonito e memória desatualizada.

### ETAPA 5: comparar
Quando fizer sentido, olhe os diários anteriores e diga em uma linha se algo
está se repetindo: o mesmo problema voltando, uma decisão contradizendo outra,
um projeto parado há tempo demais, uma meta abandonada em silêncio.

Essa comparação é o que transforma o diário de registro em inteligência.

### ETAPA 6: fechar
- Atualizar `memory/INDICE.md`.
- Rodar `node scripts/obsidian-mirror.js`.
