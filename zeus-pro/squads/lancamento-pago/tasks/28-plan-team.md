---
task: planTeam()
responsavel: "@team-operations-planner"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: master-plan
    tipo: string
    origem: "master-plan-{project}.md"
    obrigatorio: true

Saida:
  - campo: team-ops
    tipo: string
    destino: "team-ops-{project}.md"
    persistido: true

Checklist:
  - "[ ] 9 funcoes definidas com responsabilidades"
  - "[ ] Ritual diario com 8 perguntas implementado"
  - "[ ] Template de post-mortem planejado"
  - "[ ] Responsavel designado por funcao"
---

# Task: Planejar Equipe e Operacao

**Task ID:** LP-028
**Version:** 1.0.0
**Command:** `*team`
**Agent:** Team Operations Planner (Ops)
**Purpose:** Planejar equipe, funcoes, rituais e operacao do lancamento

---

## Inputs

| Campo | Tipo | Origem | Obrigatorio |
|-------|------|--------|-------------|
| master-plan | string | master-plan-{project}.md | Sim |

## Preconditions

- Plano mestre do lancamento consolidado
- Escopo do evento definido
- Orcamento aprovado

## Execution Phases

### Fase 1 - Definir 9 funcoes
1. Estrategista - visao geral e decisoes criticas
2. Trafego - captacao e remarketing
3. Copy - textos de captacao, email, vendas
4. Designer - criativos, paginas, materiais visuais
5. Suporte - atendimento a leads e compradores
6. Moderador - gestao da comunidade e lives
7. Comercial - fechamento de vendas e follow-up
8. CRM - automacoes, segmentacao, pipeline
9. Metricas - dashboard, reports, alertas

### Fase 2 - Responsabilidades por funcao
- Escopo claro de cada funcao
- Entregas esperadas por fase (pre-captacao, evento, pos-pitch)
- Limites de autonomia (o que decide sozinho vs escala)
- Indicadores de performance por funcao

### Fase 3 - Ritual diario (8 perguntas)
1. Quantos leads captamos ontem?
2. Qual o CPA atual?
3. Quantos emails foram abertos?
4. Algum sinal amarelo nas metricas?
5. O que funciona melhor ate agora?
6. O que precisa ser ajustado hoje?
7. Algum problema tecnico pendente?
8. Qual a prioridade numero 1 do dia?

### Fase 4 - Template de post-mortem
- O que deu certo (replicar)
- O que deu errado (corrigir)
- O que surpreendeu (investigar)
- Metricas finais vs targets
- Licoes aprendidas
- Acoes para o proximo lancamento

## Output Format

Arquivo `team-ops-{project}.md` contendo:
- 9 funcoes com descricao e responsabilidades
- Matriz de entregas por funcao e fase
- Ritual diario com 8 perguntas
- Template de post-mortem
- Limites de autonomia por funcao

## Quality Checklist

- [ ] 9 funcoes definidas com responsabilidades claras
- [ ] Ritual diario com 8 perguntas implementado
- [ ] Template de post-mortem planejado e pronto
- [ ] Responsavel designado por funcao
- [ ] Entregas por fase mapeadas
- [ ] Limites de autonomia documentados
