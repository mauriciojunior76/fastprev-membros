---
task: planCreatives()
responsavel: "@creative-planner"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: ad-copy
    tipo: markdown
    origem: ad-copy-{project}.md
    obrigatorio: true
  - campo: headlines
    tipo: markdown
    origem: headlines-{project}.md
    obrigatorio: true
  - campo: promise
    tipo: markdown
    origem: promise-{project}.md
    obrigatorio: true

Saida:
  - campo: creative-plan-{project}.md
    tipo: markdown
    destino: File
    persistido: true

Checklist:
  - "[ ] 5 categorias (C0-C4) com briefings"
  - "[ ] Budget alocado por categoria"
  - "[ ] Calendario de criativos definido"
  - "[ ] CTR target 1%+ documentado"
---

# Task: Plano Tatico de Criativos C0-C4

**Task ID:** LP-015
**Version:** 1.0.0
**Command:** `*creatives-plan`
**Agent:** Creative Planner (Grid)
**Purpose:** Plano tatico de criativos por categoria C0 a C4 com budget e calendario

---

## Inputs

| Campo | Tipo | Origem | Obrigatorio |
|-------|------|--------|-------------|
| ad-copy | markdown | ad-copy-{project}.md | Sim |
| headlines | markdown | headlines-{project}.md | Sim |
| promise | markdown | promise-{project}.md | Sim |

## Preconditions

- Copy de anuncios redigido e validado
- Headlines testadas ou priorizadas
- Promessa central definida

## Execution Phases

### Fase 1: Briefing C0 - Viral

1. Definir objetivo: alcance maximo, baixo custo por visualizacao
2. Formatos priorizados (reels, carrossel, meme educativo)
3. Tom: entretenimento com valor, sem venda direta
4. Metricas de sucesso: compartilhamentos, alcance organico

### Fase 2: Briefing C1 - Oportunidade

1. Definir objetivo: despertar interesse, gerar clique
2. Formatos priorizados (video curto, imagem com headline forte)
3. Tom: oportunidade unica, problema reconhecido
4. Metricas de sucesso: CTR > 1%, custo por clique

### Fase 3: Briefing C2 - Objecao

1. Definir objetivo: quebrar objecoes antes da pagina
2. Formatos priorizados (depoimento, comparativo, FAQ visual)
3. Tom: empatia + prova, "eu sei o que voce esta pensando"
4. Metricas de sucesso: taxa de conversao pos-clique

### Fase 4: Briefing C3 - Prova

1. Definir objetivo: prova social e autoridade
2. Formatos priorizados (resultado de aluno, bastidores, numeros)
3. Tom: resultado concreto, sem exagero
4. Metricas de sucesso: engajamento, saves, CTR

### Fase 5: Briefing C4 - Remarketing

1. Definir objetivo: recuperar quem visitou e nao converteu
2. Formatos priorizados (lembrete curto, urgencia, bonus exclusivo)
3. Tom: direto, urgencia real, beneficio claro
4. Metricas de sucesso: custo por conversao, ROAS

### Fase 6: Alocacao de budget

1. Distribuir: 84% vendas (C1+C2+C3), 8.5% distribuicao (C0), 4.5% remarketing (C4), 3% outros
2. Definir budget diario por categoria
3. Planejar escala progressiva por fase do lancamento

### Fase 7: Calendario de criativos

1. Definir data de entrega de cada lote de criativos
2. Planejar rotacao (trocar criativos a cada X dias)
3. Agendar testes A/B por categoria
4. Sincronizar com timeline geral do lancamento

## Output Format

Arquivo markdown unico:

- `creative-plan-{project}.md` - Plano completo com briefings C0-C4, budget por categoria, calendario e metricas target

## Quality Checklist

- [ ] 5 categorias (C0-C4) com briefings claros e objetivos distintos
- [ ] Budget alocado conforme regra 84/8.5/4.5/3
- [ ] Calendario de criativos definido com datas
- [ ] CTR target 1%+ documentado como meta
- [ ] Formatos priorizados por categoria
- [ ] Metricas de sucesso definidas por categoria
