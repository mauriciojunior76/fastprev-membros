---
task: designUpgrades()
responsavel: "@upgrade-designer"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: ticket-strategy
    tipo: string
    origem: "ticket-strategy-{project}.md"
    obrigatorio: true
  - campo: event-structure
    tipo: string
    origem: "event-structure-{project}.md"
    obrigatorio: true

Saida:
  - campo: upgrade-plan
    tipo: string
    destino: "upgrade-plan-{project}.md"
    persistido: true

Checklist:
  - "[ ] Upgrades ampliam base sem competir com premium"
  - "[ ] Precificacao coerente por upgrade"
  - "[ ] Valor percebido alto em cada upgrade"
  - "[ ] Ancoragem de valor documentada"
---

# Task: Desenhar Upgrades de Ingresso

**Task ID:** LP-030
**Version:** 1.0.0
**Command:** `*upgrades`
**Agent:** Upgrade Designer (Plus)
**Purpose:** Desenhar upgrades de ingresso que aumentam ticket medio sem competir com a oferta premium

---

## Inputs

| Campo | Tipo | Origem | Obrigatorio |
|-------|------|--------|-------------|
| ticket-strategy | string | ticket-strategy-{project}.md | Sim |
| event-structure | string | event-structure-{project}.md | Sim |

## Preconditions

- Estrategia de ticket definida
- Estrutura do evento clara
- Oferta premium ja desenhada

## Execution Phases

### Fase 1 - Listar tipos de upgrade
- Gravacao do evento (acesso posterior)
- Templates e materiais exclusivos
- Workbooks e guias de implementacao
- Grupo de networking ou comunidade
- Acesso antecipado ou lugar reservado
- Certificado de participacao
- Sessao extra de perguntas e respostas

### Fase 2 - Precificar cada upgrade
- Preco individual por upgrade
- Combos de upgrades com desconto
- Order bump no checkout
- Upsell pos-compra
- Preco que nao canibalize a oferta premium

### Fase 3 - Posicionar sem competir com oferta premium
- Upgrades complementam, NAO substituem o produto principal
- Deixar claro o que e upgrade de ingresso vs oferta premium
- Upgrade resolve necessidade imediata
- Oferta premium resolve transformacao completa
- Gap de valor perceptivel entre upgrade e premium

### Fase 4 - Ancoragem de valor
- Valor real de cada upgrade isolado
- Valor empilhado dos combos
- Comparativo com alternativas de mercado
- Percentual de desconto sobre valor real
- Framing de investimento (nao custo)

## Output Format

Arquivo `upgrade-plan-{project}.md` contendo:
- Lista de upgrades disponiveis com descricao
- Precificacao individual e combos
- Posicionamento vs oferta premium
- Ancoragem de valor por upgrade
- Estrategia de order bump e upsell

## Quality Checklist

- [ ] Upgrades ampliam base sem competir com premium
- [ ] Precificacao coerente e atrativa por upgrade
- [ ] Valor percebido alto em cada upgrade
- [ ] Ancoragem de valor documentada e convincente
- [ ] Gap claro entre upgrade e oferta premium
- [ ] Estrategia de order bump e upsell definida
