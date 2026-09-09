---
task: setupMetrics()
responsavel: "@metrics-analyst"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: ticket-strategy
    tipo: string
    origem: "ticket-strategy-{project}.md"
    obrigatorio: true
  - campo: offer-architecture
    tipo: string
    origem: "offer-architecture-{project}.md"
    obrigatorio: true
  - campo: traffic-data-plan
    tipo: string
    origem: "traffic-data-plan-{project}.md"
    obrigatorio: true

Saida:
  - campo: metrics-dashboard
    tipo: string
    destino: "metrics-dashboard-{project}.md"
    persistido: true

Checklist:
  - "[ ] 3 indicadores maiores definidos"
  - "[ ] Benchmarks com referencia de mercado"
  - "[ ] Dashboard de saude operacional pronto"
  - "[ ] Alertas de sinal amarelo configurados"
  - "[ ] Conversao por ticket mapeada"
---

# Task: Configurar Dashboard de Metricas

**Task ID:** LP-025
**Version:** 1.0.0
**Command:** `*metrics`
**Agent:** Metrics Analyst (KPI)
**Purpose:** Configurar dashboard de metricas com indicadores criticos e benchmarks do lancamento

---

## Inputs

| Campo | Tipo | Origem | Obrigatorio |
|-------|------|--------|-------------|
| ticket-strategy | string | ticket-strategy-{project}.md | Sim |
| offer-architecture | string | offer-architecture-{project}.md | Sim |
| traffic-data-plan | string | traffic-data-plan-{project}.md | Sim |

## Preconditions

- Estrategia de ticket definida
- Arquitetura de oferta validada
- Plano de trafego com metas de captacao

## Execution Phases

### Fase 1 - Definir 3 indicadores maiores
- Pessoas ao vivo (presenca real no evento)
- Conversao (percentual de compradores sobre presentes)
- Ticket medio (valor medio por transacao)

### Fase 2 - Targets por metrica
- Comparecimento: 50-70% dos inscritos
- CTR: minimo 1%
- CPA: maximo R$70
- ROAS: minimo 5x
- Definir faixas verde/amarelo/vermelho por metrica

### Fase 3 - Benchmarks de monetizacao
- R$300k por 1000 pessoas ao vivo = bom
- R$400k por 1000 pessoas ao vivo = excelente
- Benchmarks de mercado por nicho
- Comparativo com lancamentos anteriores (se houver)

### Fase 4 - Conversao por ticket
- Mapear conversao esperada por faixa de ticket
- Ticket baixo: conversao maior, volume maior
- Ticket alto: conversao menor, receita por venda maior
- Ponto de equilibrio por cenario

### Fase 5 - Dashboard de saude operacional
- Painel unificado com todos os KPIs
- Sinais de alerta (sinal amarelo) com gatilhos
- Frequencia de atualizacao (diaria durante lancamento)
- Responsavel por alimentar cada metrica

## Output Format

Arquivo `metrics-dashboard-{project}.md` contendo:
- 3 indicadores maiores com targets
- Benchmarks de monetizacao
- Tabela de conversao por ticket
- Dashboard com faixas verde/amarelo/vermelho
- Alertas e gatilhos de acao

## Quality Checklist

- [ ] 3 indicadores maiores definidos com targets claros
- [ ] Benchmarks com referencia de mercado documentados
- [ ] Dashboard de saude operacional pronto para uso
- [ ] Alertas de sinal amarelo com gatilhos de acao
- [ ] Conversao por ticket mapeada por cenario
- [ ] Faixas verde/amarelo/vermelho por metrica
