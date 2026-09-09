---
task: planRecordingVip()
responsavel: "@recording-vip-specialist"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: event-structure
    tipo: string
    origem: "event-structure-{project}.md"
    obrigatorio: true
  - campo: offer-architecture
    tipo: string
    origem: "offer-architecture-{project}.md"
    obrigatorio: true

Saida:
  - campo: recording-vip-plan
    tipo: string
    destino: "recording-vip-plan-{project}.md"
    persistido: true

Checklist:
  - "[ ] Gravacao posicionada como curso (NAO replay)"
  - "[ ] Modelo de liberacao claro (venda/bonus/VIP)"
  - "[ ] Precificacao da gravacao definida"
  - "[ ] Sala VIP com agenda completa"
  - "[ ] Ponte para proxima oferta mapeada"
---

# Task: Plano de Gravacao e Sala VIP

**Task ID:** LP-023
**Version:** 1.0.0
**Command:** `*recording-vip`
**Agent:** Recording VIP Specialist (Replay)
**Purpose:** Planejar gravacao como produto independente e Sala VIP pos-evento

---

## Inputs

| Campo | Tipo | Origem | Obrigatorio |
|-------|------|--------|-------------|
| event-structure | string | event-structure-{project}.md | Sim |
| offer-architecture | string | offer-architecture-{project}.md | Sim |

## Preconditions

- Estrutura do evento definida (LP-008 ou anterior)
- Arquitetura de oferta validada
- Ticket e modelo de monetizacao claros

## Execution Phases

### Fase 1 - Posicionar gravacao como curso
- A gravacao NUNCA e apresentada como replay
- Renomear e reposicionar como curso completo
- Definir nome, descricao e promessa propria
- Criar identidade separada do evento ao vivo

### Fase 2 - Definir modelo de liberacao
- Avaliar 3 opcoes: venda direta, bonus de compra, acesso VIP
- Escolher modelo conforme estrategia de monetizacao
- Documentar regras de acesso e prazo

### Fase 3 - Precificar gravacao
- Definir preco baseado no valor percebido como curso
- Ancoragem com valor do evento ao vivo
- Considerar uso como order bump ou upsell

### Fase 4 - Planejar Sala VIP
- Sala VIP acontece 1 semana apos o evento
- Definir formato (Zoom, plataforma, duracao)
- Criar roteiro da sessao VIP
- Definir criterios de acesso

### Fase 5 - Agenda VIP
- Tempo de tela com o especialista
- Planejamento individual por participante
- Sessao de novas vendas (proxima oferta)
- Fechamento com CTA para continuidade

## Output Format

Arquivo `recording-vip-plan-{project}.md` contendo:
- Posicionamento da gravacao (nome, promessa, diferencial)
- Modelo de liberacao escolhido com justificativa
- Precificacao e ancoragem
- Agenda completa da Sala VIP
- Ponte para proxima oferta

## Quality Checklist

- [ ] Gravacao posicionada como curso independente (NAO replay)
- [ ] Modelo de liberacao claro e documentado
- [ ] Precificacao coerente com ancoragem
- [ ] Sala VIP com agenda detalhada
- [ ] Ponte para proxima oferta definida
- [ ] Criterios de acesso VIP claros
