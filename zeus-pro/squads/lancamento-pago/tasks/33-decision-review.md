---
task: decisionReview()
responsavel: "@decision-notebook-specialist"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: metricas-do-dia
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: contexto-operacional
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: decision-notebook
    tipo: string
    destino: "decision-notebook-{project}.md"
    persistido: true

Checklist:
  - "[ ] 5 perguntas respondidas com dados"
  - "[ ] Cada resposta gera decisao com 4 campos"
  - "[ ] Sinais interpretados corretamente"
  - "[ ] Registro completo (decisao, responsavel, prazo, metrica)"
---

# Task: Revisao Diaria com 5 Perguntas

**Task ID:** LP-033
**Version:** 1.0.0
**Command:** `*daily-review`
**Agent:** Decision Notebook Specialist (Diario)
**Purpose:** Revisao diaria estruturada com 5 perguntas que geram decisoes acionaveis

---

## Inputs

| Campo | Tipo | Origem | Obrigatorio |
|-------|------|--------|-------------|
| metricas-do-dia | string | User Input | Sim |
| contexto-operacional | string | User Input | Sim |

## Preconditions

- Lancamento em andamento
- Dashboard de metricas alimentado
- Equipe operacional ativa

## Execution Phases

### Fase 1 - Apresentar 5 perguntas
1. O que os numeros de hoje estao dizendo?
2. O que funcionou melhor hoje e por que?
3. O que nao funcionou e qual a causa provavel?
4. O que precisa mudar amanha com base no que vimos hoje?
5. Qual a unica coisa mais importante para fazer nas proximas 24 horas?

### Fase 2 - Coletar dados
- Metricas quantitativas do dia (leads, vendas, CPA, ROAS)
- Observacoes qualitativas (feedback, comportamento, engajamento)
- Comparativo com dia anterior e com meta
- Eventos relevantes do dia

### Fase 3 - Interpretar sinais
- Tendencia positiva: manter e escalar
- Tendencia negativa: diagnosticar e corrigir
- Estagnacao: testar variacao
- Anomalia: investigar causa
- Sinal fraco: monitorar com atencao

### Fase 4 - Tomar decisao
- Cada pergunta gera pelo menos 1 decisao
- Decisao e especifica e acionavel
- Decisao tem dono e prazo
- Decisao tem metrica de verificacao

### Fase 5 - Registrar no caderno de decisoes
Cada registro contem 4 campos obrigatorios:
1. Decisao: o que sera feito (acao especifica)
2. Responsavel: quem executa
3. Prazo: ate quando
4. Metrica: como saber se funcionou

## Output Format

Arquivo `decision-notebook-{project}.md` contendo:
- Data do registro
- Respostas as 5 perguntas com dados
- Interpretacao dos sinais
- Lista de decisoes com 4 campos cada
- Historico acumulado (append por dia)

## Quality Checklist

- [ ] 5 perguntas respondidas com dados concretos
- [ ] Cada resposta gera decisao com 4 campos (decisao, responsavel, prazo, metrica)
- [ ] Sinais interpretados corretamente com base em evidencia
- [ ] Registro completo e acionavel
- [ ] Historico acumulado para comparativo entre dias
- [ ] Nenhuma decisao sem responsavel ou prazo
