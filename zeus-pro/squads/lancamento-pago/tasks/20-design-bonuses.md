---
task: designBonuses()
responsavel: "@bonus-architect"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: offer-architecture
    tipo: markdown
    origem: offer-architecture-{project}.md
    obrigatorio: true
  - campo: icp
    tipo: markdown
    origem: icp-{project}.md
    obrigatorio: true

Saida:
  - campo: bonus-plan-{project}.md
    tipo: markdown
    destino: File
    persistido: true

Checklist:
  - "[ ] Cada bonus responde objecao real"
  - "[ ] Escalonamento claro"
  - "[ ] Boleto parcelado com limite real"
---

# Task: Arquitetura de Bonus Escalonados

**Task ID:** LP-020
**Version:** 1.0.0
**Command:** `*bonuses`
**Agent:** Bonus Architect (Bonus)
**Purpose:** Arquitetura de bonus escalonados que respondem objecoes reais do ICP

---

## Inputs

| Campo | Tipo | Origem | Obrigatorio |
|-------|------|--------|-------------|
| offer-architecture | markdown | offer-architecture-{project}.md | Sim |
| icp | markdown | icp-{project}.md | Sim |

## Preconditions

- Arquitetura da oferta finalizada com produto e precos
- ICP com dores e objecoes documentadas

## Execution Phases

### Fase 1: Mapear objecoes reais do ICP

1. Listar todas as objecoes conhecidas do ICP
2. Classificar por frequencia (quais aparecem mais)
3. Classificar por gravidade (quais impedem a compra)
4. Priorizar as 5-7 objecoes mais criticas

### Fase 2: Criar bonus para cada objecao

1. Para cada objecao priorizada, criar 1 bonus que a neutraliza
2. Cada bonus deve ter valor percebido alto e custo de entrega baixo
3. Definir formato do bonus (template, aula, ferramenta, acesso, comunidade)
4. Ancorar valor monetario de cada bonus
5. Garantir que o bonus resolve a objecao de forma concreta

### Fase 3: Escalonar bonus

1. Definir bonus de abertura (primeiros compradores)
2. Definir bonus de 10 primeiros
3. Definir bonus de 30 primeiros
4. Definir bonus de 50 primeiros
5. Definir bonus de ultimo dia
6. Cada faixa com bonus exclusivo que justifica agir rapido

### Fase 4: Definir boleto parcelado limitado

1. Criar condicao especial de parcelamento via boleto
2. Limitar numero de vagas para boleto parcelado (escassez real)
3. Definir numero de parcelas e valor
4. Comunicar como privilegio, nao como desconto

### Fase 5: Planejar lives pos-pitch

1. Agendar 2-3 lives apos o pitch principal
2. Cada live com tema especifico (Q&A, bastidores, prova social)
3. Incluir bonus exclusivo por live (so quem participa ganha)
4. Lives como mecanismo de reengajamento de indecisos

## Output Format

Arquivo markdown unico:

- `bonus-plan-{project}.md` - Plano completo de bonus com mapeamento de objecoes, escalonamento e lives pos-pitch

## Quality Checklist

- [ ] Cada bonus responde diretamente uma objecao real do ICP
- [ ] Escalonamento claro com faixas definidas (1o, 10, 30, 50, ultimo dia)
- [ ] Boleto parcelado com limite real de vagas
- [ ] Valor percebido alto com custo de entrega baixo
- [ ] Lives pos-pitch agendadas com bonus exclusivo
- [ ] Nenhum bonus generico ou desconectado da oferta
