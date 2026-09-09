---
task: writeHeadlines()
responsavel: "@headline-specialist"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: promise-{project}.md
    tipo: markdown
    origem: Task LP-002
    obrigatorio: true
  - campo: big-idea-{project}.md
    tipo: markdown
    origem: Task LP-003
    obrigatorio: true
  - campo: icp-{project}.md
    tipo: markdown
    origem: Task LP-001
    obrigatorio: true

Saida:
  - campo: headlines-{project}.md
    tipo: markdown
    destino: File
    persistido: true

Checklist:
  - "[ ] 10+ variacoes geradas"
  - "[ ] Todas passam no teste de 4 perguntas"
  - "[ ] 0 verbos proibidos"
  - "[ ] Linguagem de execucao em todas"
  - "[ ] Ranking por forca documentado"
---

# Task: Escrever Headlines

**Task ID:** LP-006
**Version:** 1.0.0
**Command:** `*headlines`
**Agent:** Headline Specialist (H1)
**Purpose:** Escrever headlines que passam no teste de 4 perguntas

---

## Inputs

| Campo | Tipo | Origem | Obrigatorio |
|-------|------|--------|-------------|
| promise-{project}.md | markdown | Task LP-002 | Sim |
| big-idea-{project}.md | markdown | Task LP-003 | Sim |
| icp-{project}.md | markdown | Task LP-001 | Sim |

## Preconditions

- Promessa central aprovada (LP-002)
- Big Idea definida com mecanismo (LP-003)
- ICP com linguagem real mapeada (LP-001)

## Execution Phases

### Fase 1: Extrair promessa e Big Idea

1. Ler promise-{project}.md e identificar a variacao escolhida
2. Ler big-idea-{project}.md e extrair o mecanismo
3. Ler icp-{project}.md e mapear a linguagem do publico
4. Definir os elementos obrigatorios de cada headline (promessa + diferencial)

### Fase 2: Gerar 10+ variacoes

1. Headlines diretas (promessa clara, sem rodeio)
2. Headlines com mecanismo (como funciona)
3. Headlines com contradicao (oposto do esperado)
4. Headlines com especificidade (numeros, tempo, resultado exato)
5. Headlines com identidade (voce que e X)
6. Headlines com urgencia (janela, momento, oportunidade)
7. Headlines com prova (resultado comprovado)
8. Headlines com curiosidade (lacuna de informacao)
9. Headlines com dor (problema agudo que o publico reconhece)
10. Headlines com transformacao (antes vs depois claro)

### Fase 3: Pontuar contra 4 perguntas

1. Para cada headline, responder:
   - O QUE e isso? (clareza do que esta sendo oferecido)
   - EM QUANTO TEMPO? (prazo do resultado)
   - QUAL O RESULTADO? (entrega tangivel)
   - POR QUE AGORA? (urgencia ou oportunidade)
2. Pontuar de 0 a 4 (1 ponto por pergunta respondida)
3. Headlines com score 3 ou 4 avancam
4. Headlines com score 0-2 sao descartadas ou reescritas

### Fase 4: Filtrar verbos proibidos

1. Verificar TODAS as headlines contra a lista de verbos proibidos
2. Verbos BANIDOS: aprender, descobrir, faturar, desbloquear, conquistar, segredos
3. Substituir por verbos de execucao (implementar, montar, criar, aplicar, instalar, configurar)
4. Revalidar o score apos substituicao
5. Confirmar 0 verbos proibidos no output final

### Fase 5: Ranquear por forca

1. Ordenar headlines por score (4 perguntas)
2. Em caso de empate, priorizar clareza sobre criatividade
3. Destacar as top 3 recomendadas
4. Justificar o ranking
5. Indicar uso sugerido (pagina, anuncio, email)

## Output Format

Arquivo `headlines-{project}.md` contendo:

- 10+ headlines com score individual (0-4)
- Filtro de verbos proibidos aplicado
- Ranking por forca com justificativa
- Top 3 recomendadas com uso sugerido
- Headlines descartadas (com motivo)

## Quality Checklist

- [ ] 10+ variacoes geradas com angulos distintos
- [ ] Todas passam no teste de 4 perguntas (score 3 ou 4)
- [ ] 0 verbos proibidos em nenhuma headline
- [ ] Linguagem de execucao em todas (nao linguagem passiva)
- [ ] Ranking por forca documentado com justificativa
- [ ] Top 3 com uso sugerido (pagina, anuncio, email)
