---
task: buildChecklists()
responsavel: "@checklist-manager"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: all-previous-outputs
    tipo: string
    origem: "Todos os outputs anteriores do squad"
    obrigatorio: true

Saida:
  - campo: checklists
    tipo: string
    destino: "checklists-{project}.md"
    persistido: true

Checklist:
  - "[ ] Checklist pre-captacao com 10 itens"
  - "[ ] Checklist pre-evento com 10 itens"
  - "[ ] Checklist pos-pitch com 10 itens"
  - "[ ] SOP operacional diario definido"
  - "[ ] Responsaveis designados por item"
  - "[ ] Gates de aprovacao definidos"
---

# Task: Compilar 3 Checklists Criticos + SOP

**Task ID:** LP-026
**Version:** 1.0.0
**Command:** `*checklists`
**Agent:** Checklist Manager (Check)
**Purpose:** Compilar 3 checklists criticos e SOP operacional para execucao segura do lancamento

---

## Inputs

| Campo | Tipo | Origem | Obrigatorio |
|-------|------|--------|-------------|
| all-previous-outputs | string | Todos os outputs anteriores do squad | Sim |

## Preconditions

- Todas as tasks anteriores concluidas (LP-001 a LP-025)
- Plano mestre consolidado
- Equipe e funcoes definidas

## Execution Phases

### Fase 1 - Checklist pre-captacao (10 itens)
- Pagina de captacao no ar e testada
- Pixel e tracking configurados
- Emails de boas-vindas prontos
- Criativos de trafego aprovados
- Integracao formulario-CRM funcionando
- Segmentacao de publico definida
- Orcamento de trafego aprovado
- Testes A/B configurados
- Equipe de suporte briefada
- Data de inicio confirmada

### Fase 2 - Checklist pre-evento (10 itens)
- Plataforma de transmissao testada
- Slides e materiais de apoio prontos
- Pitch ensaiado e cronometrado
- Pagina de vendas no ar
- Gateway de pagamento testado
- Equipe de moderacao escalada
- Emails de lembrete agendados
- Bonus visuais preparados
- Plano B para problemas tecnicos
- Roteiro do evento aprovado

### Fase 3 - Checklist pos-pitch (10 itens)
- Sequencia de emails pos-pitch ativa
- Lives pos-pitch agendadas
- Bonus escalonados configurados
- Equipe comercial com scripts
- Dashboard de metricas alimentado
- Remarketing ativo
- Prova social coletada e publicada
- FAQ atualizado com objecoes
- Recuperacao de boletos/PIX ativa
- Ritual diario de revisao implementado

### Fase 4 - SOP operacional diario
- Horario de check-in da equipe
- 8 perguntas do ritual diario
- Responsavel por alimentar metricas
- Processo de escalonamento de problemas
- Template de report diario

## Output Format

Arquivo `checklists-{project}.md` contendo:
- Checklist pre-captacao (10 itens com responsavel e gate)
- Checklist pre-evento (10 itens com responsavel e gate)
- Checklist pos-pitch (10 itens com responsavel e gate)
- SOP operacional diario completo

## Quality Checklist

- [ ] Checklist pre-captacao com 10 itens completos
- [ ] Checklist pre-evento com 10 itens completos
- [ ] Checklist pos-pitch com 10 itens completos
- [ ] SOP operacional diario definido e pratico
- [ ] Responsaveis designados por item
- [ ] Gates de aprovacao definidos por fase
