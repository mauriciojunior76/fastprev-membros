---
task: designProductCurriculum()
responsavel: "@post-event-product-planner"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: offer-architecture
    tipo: string
    origem: "offer-architecture-{project}.md"
    obrigatorio: true
  - campo: pitch-scripts
    tipo: string
    origem: "pitch-scripts-{project}.md"
    obrigatorio: true

Saida:
  - campo: product-curriculum
    tipo: string
    destino: "product-curriculum-{project}.md"
    persistido: true

Checklist:
  - "[ ] Produto entrega o que o pitch prometeu"
  - "[ ] Cronograma semana a semana claro"
  - "[ ] Marcos de progresso definidos"
  - "[ ] Suporte planejado por fase"
  - "[ ] Entregas por marco documentadas"
---

# Task: Criar Cronograma do Produto Pos-Evento

**Task ID:** LP-029
**Version:** 1.0.0
**Command:** `*product`
**Agent:** Post-Event Product Planner (Trilha)
**Purpose:** Criar cronograma do produto vendido, garantindo alinhamento com a promessa do pitch

---

## Inputs

| Campo | Tipo | Origem | Obrigatorio |
|-------|------|--------|-------------|
| offer-architecture | string | offer-architecture-{project}.md | Sim |
| pitch-scripts | string | pitch-scripts-{project}.md | Sim |

## Preconditions

- Arquitetura de oferta validada
- Pitch desenhado com promessa clara
- Bonus e entregas definidos

## Execution Phases

### Fase 1 - Alinhar produto com promessa do pitch
- Extrair todas as promessas feitas no pitch
- Mapear cada promessa a uma entrega concreta
- Identificar gaps entre promessa e produto
- Ajustar produto para cobrir 100% das promessas

### Fase 2 - Curriculum semana a semana
- Definir modulos e temas por semana
- Ordem logica de progressao
- Carga horaria estimada por semana
- Formato de cada entrega (video, material, exercicio, ao vivo)

### Fase 3 - Marcos de progresso
- Quick win na semana 1 (resultado rapido)
- Marcos intermediarios a cada 2-3 semanas
- Marco final com resultado completo
- Celebracao e reconhecimento por marco

### Fase 4 - Suporte e implementacao
- Canal de suporte por fase
- Frequencia de encontros ao vivo
- Materiais de apoio por modulo
- Processo para duvidas e feedback

### Fase 5 - Entregas por marco
- Lista de entregas tangíveis por marco
- Criterios de conclusao por entrega
- Template de acompanhamento do aluno
- Metricas de engajamento e conclusao

## Output Format

Arquivo `product-curriculum-{project}.md` contendo:
- Mapa promessa-entrega (pitch vs produto)
- Cronograma semana a semana com formato
- Marcos de progresso com criterios
- Plano de suporte por fase
- Entregas tangiveis por marco

## Quality Checklist

- [ ] Produto entrega 100% do que o pitch prometeu
- [ ] Cronograma semana a semana claro e executavel
- [ ] Marcos de progresso definidos com criterios
- [ ] Suporte planejado por fase do produto
- [ ] Entregas tangiveis documentadas por marco
- [ ] Quick win na semana 1 garantido
