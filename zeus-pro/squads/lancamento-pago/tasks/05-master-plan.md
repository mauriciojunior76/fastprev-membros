---
task: masterPlan()
responsavel: "@strategic-planner"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: todos-outputs-fase-0-1
    tipo: markdown
    origem: Tasks LP-001 a LP-004
    obrigatorio: true

Saida:
  - campo: master-plan-{project}.md
    tipo: markdown
    destino: File
    persistido: true
  - campo: calendar-macro-{project}.md
    tipo: markdown
    destino: File
    persistido: true

Checklist:
  - "[ ] Todas as fases com datas definidas"
  - "[ ] Dependencias entre tiers mapeadas"
  - "[ ] Equipe alocada por fase"
  - "[ ] Gates de aprovacao definidos"
  - "[ ] Marcos criticos identificados"
---

# Task: Plano Mestre

**Task ID:** LP-005
**Version:** 1.0.0
**Command:** `*master-plan`
**Agent:** Strategic Planner (Mapa)
**Purpose:** Criar plano mestre com calendario macro

---

## Inputs

| Campo | Tipo | Origem | Obrigatorio |
|-------|------|--------|-------------|
| research-{project}.md | markdown | Task LP-001 | Sim |
| promise-{project}.md | markdown | Task LP-002 | Sim |
| big-idea-{project}.md | markdown | Task LP-003 | Sim |
| narrative-arc-{project}.md | markdown | Task LP-004 | Sim |

## Preconditions

- Todas as tasks da Fase 0-1 concluidas (LP-001 a LP-004)
- Data do evento definida ou estimada
- Equipe disponivel identificada

## Execution Phases

### Fase 1: Definir datas

1. Fixar data do evento (D-Day)
2. Calcular data de inicio da captacao (30 dias antes)
3. Calcular data de abertura do pos-pitch (dia do evento)
4. Calcular data de fechamento do carrinho (3-7 dias apos evento)
5. Documentar todas as datas-chave no calendario

### Fase 2: Calendario macro

1. Bloco 30-21 dias antes: Preparacao (copy, pagina, criativos, sequencias)
2. Bloco 20-14 dias antes: Lancamento da captacao (anuncios ao vivo, pagina no ar)
3. Bloco 13-7 dias antes: Aceleracao (escala de anuncios, warmup do grupo)
4. Bloco 6-2 dias antes: Aquecimento final (contagem regressiva, conteudo pre-evento)
5. Bloco 1 dia antes: Logistica final (emails, WhatsApp, checklist tecnico)
6. Bloco evento: Execucao dos 2 dias (conteudo + pitches)
7. Bloco 1-3 dias depois: Pos-pitch (carrinho aberto, comercial, follow-up)

### Fase 3: Dependencias entre tiers

1. Mapear quais tasks dependem de quais outputs
2. Identificar caminhos criticos (tasks que bloqueiam outras)
3. Definir ordem de execucao obrigatoria
4. Identificar tasks que podem rodar em paralelo
5. Documentar dependencias em formato visual

### Fase 4: Alocacao de recursos

1. Listar todos os agentes/roles necessarios por fase
2. Alocar responsavel principal para cada bloco
3. Identificar gargalos de capacidade
4. Planejar contingencias para atrasos
5. Definir backup para tasks criticas

### Fase 5: Marcos e gates

1. Definir marcos de aprovacao (gates) entre blocos
2. Gate 1: Estrategia aprovada (pos Fase 0-1)
3. Gate 2: Copy e pagina aprovados (pos producao)
4. Gate 3: Criativos aprovados (antes de subir anuncios)
5. Gate 4: Evento estruturado (antes do D-Day)
6. Gate 5: Pos-pitch validado (antes de abrir carrinho)

## Output Format

Dois arquivos markdown:

- `master-plan-{project}.md` - Plano completo com fases, dependencias, alocacao e gates
- `calendar-macro-{project}.md` - Calendario visual com todos os blocos, datas e responsaveis

## Quality Checklist

- [ ] Todas as fases com datas definidas e realistas
- [ ] Dependencias entre tiers mapeadas sem conflitos
- [ ] Equipe alocada por fase com responsavel claro
- [ ] Gates de aprovacao definidos entre blocos
- [ ] Marcos criticos identificados com datas
- [ ] Caminho critico documentado
- [ ] Contingencias planejadas para atrasos
