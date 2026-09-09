---
task: designCrm()
responsavel: "@crm-operations-specialist"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: commercial-plan
    tipo: string
    origem: "commercial-plan-{project}.md"
    obrigatorio: true
  - campo: traffic-data-plan
    tipo: string
    origem: "traffic-data-plan-{project}.md"
    obrigatorio: true

Saida:
  - campo: crm-plan
    tipo: string
    destino: "crm-plan-{project}.md"
    persistido: true

Checklist:
  - "[ ] Pipeline com fases claras"
  - "[ ] Segmentacao por comportamento ativa"
  - "[ ] Automacoes configuradas"
  - "[ ] Handoff marketing-comercial definido"
  - "[ ] Formularios de qualificacao prontos"
---

# Task: Plano de CRM e Automacoes

**Task ID:** LP-027
**Version:** 1.0.0
**Command:** `*crm`
**Agent:** CRM Operations Specialist (Fluxo)
**Purpose:** Desenhar pipeline de CRM com automacoes e handoff entre marketing e comercial

---

## Inputs

| Campo | Tipo | Origem | Obrigatorio |
|-------|------|--------|-------------|
| commercial-plan | string | commercial-plan-{project}.md | Sim |
| traffic-data-plan | string | traffic-data-plan-{project}.md | Sim |

## Preconditions

- Plano comercial com janela de vendas definida
- Plano de trafego com fontes e volumes
- Oferta e ticket definidos

## Execution Phases

### Fase 1 - Pipeline de funil
- Captacao: lead entra no sistema
- Nutricao: sequencia de aquecimento
- Abertura: carrinho aberto, lead qualificado
- Recuperacao: nao comprou, reengajamento
- Definir criterios de transicao entre fases

### Fase 2 - Segmentacao por comportamento
- Abriu email vs nao abriu
- Assistiu ao vivo vs nao assistiu
- Clicou na pagina de vendas vs nao clicou
- Iniciou compra vs abandonou
- Tags automaticas por comportamento

### Fase 3 - Formularios de qualificacao
- Perguntas de qualificacao na captacao
- Score de lead baseado em respostas
- Campos obrigatorios vs opcionais
- Integracao com CRM

### Fase 4 - Automacoes
- Welcome: boas-vindas imediatas apos inscricao
- Lembrete: D-3, D-1, D-0, 1h antes do evento
- Pos-pitch: sequencia de vendas apos abertura
- Bonus: notificacao de bonus escalonados
- Recuperacao: boleto/PIX nao confirmado

### Fase 5 - Handoff marketing-comercial
- Quando o lead passa de marketing para comercial
- Criterios de qualificacao para handoff
- Informacoes transferidas (score, comportamento, historico)
- SLA de resposta do comercial
- Feedback loop comercial para marketing

## Output Format

Arquivo `crm-plan-{project}.md` contendo:
- Pipeline completo com fases e criterios de transicao
- Mapa de segmentacao por comportamento
- Formularios de qualificacao com campos
- Lista de automacoes com gatilhos e conteudo
- Protocolo de handoff marketing-comercial

## Quality Checklist

- [ ] Pipeline com fases claras e criterios de transicao
- [ ] Segmentacao por comportamento ativa com tags
- [ ] Automacoes configuradas com gatilhos definidos
- [ ] Handoff marketing-comercial com SLA
- [ ] Formularios de qualificacao prontos
- [ ] Feedback loop comercial documentado
