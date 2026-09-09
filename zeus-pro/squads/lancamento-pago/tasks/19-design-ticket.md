---
task: designTicket()
responsavel: "@ticket-strategist"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: offer-architecture
    tipo: markdown
    origem: offer-architecture-{project}.md
    obrigatorio: true
  - campo: research
    tipo: markdown
    origem: research-{project}.md
    obrigatorio: true

Saida:
  - campo: ticket-strategy-{project}.md
    tipo: markdown
    destino: File
    persistido: true

Checklist:
  - "[ ] Preco na faixa R$19-49"
  - "[ ] Lotes com urgencia progressiva"
  - "[ ] Ingresso como qualificador, nao lucro"
---

# Task: Estrategia de Ingresso e Lotes

**Task ID:** LP-019
**Version:** 1.0.0
**Command:** `*ticket`
**Agent:** Ticket Strategist (Lote)
**Purpose:** Estrategia de ingresso e lotes com urgencia progressiva

---

## Inputs

| Campo | Tipo | Origem | Obrigatorio |
|-------|------|--------|-------------|
| offer-architecture | markdown | offer-architecture-{project}.md | Sim |
| research | markdown | research-{project}.md | Sim |

## Preconditions

- Arquitetura da oferta finalizada
- Pesquisa de mercado com faixa de preco do publico

## Execution Phases

### Fase 1: Definir preco

1. Estabelecer preco na faixa R$19 a R$49
2. Justificar o preco como filtro de comprometimento (nao fonte de receita)
3. Analisar poder de compra do ICP para definir ponto exato
4. Considerar split test entre 2 faixas de preco

### Fase 2: Estrutura de lotes

1. Definir numero de lotes (recomendado: 3-5)
2. Criar progressao de urgencia entre lotes (preco ou vagas)
3. Cada lote com nome, preco e quantidade de vagas
4. Primeiro lote com desconto significativo (ancora)
5. Ultimo lote com preco cheio e escassez real

### Fase 3: Timing de viradas

1. Definir data e hora exata de virada de cada lote
2. Planejar comunicacao pre-virada (24h, 12h, 3h, 1h antes)
3. Garantir que viradas coincidem com picos de atencao
4. Criar mecanismo de virada automatica (nao manual)

### Fase 4: Comunicacao por lote

1. Criar mensagem de abertura de cada lote
2. Criar mensagem de encerramento de cada lote
3. Definir tom por lote (inicio: oportunidade, fim: urgencia)
4. Scripts para email, WhatsApp e anuncios por lote

### Fase 5: Upgrades de ingresso

1. Definir se ha versao VIP do ingresso
2. Criar beneficios exclusivos do upgrade (lugar na frente, acesso ao expert, material extra)
3. Precificar upgrade como percentual do ingresso base
4. Posicionar upgrade como order bump no checkout

## Output Format

Arquivo markdown unico:

- `ticket-strategy-{project}.md` - Estrategia completa com precos, lotes, timing, comunicacao e upgrades

## Quality Checklist

- [ ] Preco na faixa R$19-49 (qualificador, nao lucro)
- [ ] Lotes com urgencia progressiva clara
- [ ] Ingresso funciona como qualificador de comprometimento
- [ ] Timing de viradas definido com comunicacao pre-agendada
- [ ] Comunicacao especifica por lote com tom adequado
- [ ] Upgrade de ingresso definido como opcao
