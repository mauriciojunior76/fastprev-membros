---
task: writeEmails()
responsavel: "@email-specialist"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: copy-pagina-{project}.md
    tipo: markdown
    origem: Task LP-007
    obrigatorio: true
  - campo: ticket-strategy-{project}.md
    tipo: markdown
    origem: User Input
    obrigatorio: true
  - campo: bonus-plan-{project}.md
    tipo: markdown
    origem: User Input
    obrigatorio: false

Saida:
  - campo: emails-{project}.md
    tipo: markdown
    destino: File
    persistido: true

Checklist:
  - "[ ] Todas as fases do funil cobertas"
  - "[ ] Lembretes com beneficio (nao contagem regressiva)"
  - "[ ] Cada email com CTA claro"
  - "[ ] Sequencia pos-pitch com bonus escalonados"
  - "[ ] Downsell incluso (se aplicavel)"
---

# Task: Escrever Sequencias de Email

**Task ID:** LP-008
**Version:** 1.0.0
**Command:** `*emails`
**Agent:** Email Specialist (Inbox)
**Purpose:** Escrever todas as sequencias de email

---

## Inputs

| Campo | Tipo | Origem | Obrigatorio |
|-------|------|--------|-------------|
| copy-pagina-{project}.md | markdown | Task LP-007 | Sim |
| ticket-strategy-{project}.md | markdown | User Input | Sim |
| bonus-plan-{project}.md | markdown | User Input | Nao |

## Preconditions

- Copy da pagina completo (LP-007)
- Estrategia de ingressos definida (lotes, precos, bonus)
- Plano de bonus escalonados definido (se houver)
- Datas do evento e do carrinho definidas

## Execution Phases

### Fase 1: Welcome pos-compra do ingresso

1. Email de confirmacao imediata (entrega do ingresso)
2. Email de boas-vindas com proximos passos
3. Email de acesso ao grupo de WhatsApp
4. Tom: celebracao + expectativa + clareza logistica

### Fase 2: Lembretes pre-evento (inteligentes)

1. Lembrete 7 dias antes - foco em BENEFICIO (o que vai ganhar no evento)
2. Lembrete 3 dias antes - foco em PREPARACAO (o que fazer antes)
3. Lembrete 1 dia antes - foco em LOGISTICA (link, horario, material)
4. REGRA CRITICA: cada lembrete traz um BENEFICIO novo, NUNCA apenas contagem regressiva
5. Nunca escrever "faltam X dias" sem justificar por que isso importa

### Fase 3: Dia do evento

1. Email de bom dia com link de acesso (D1)
2. Email de bom dia com link de acesso (D2)
3. Email de intervalo com destaque do que vem (se aplicavel)
4. Tom: energia + foco + facilidade de acesso

### Fase 4: Pos-pitch (abertura do carrinho)

1. Email de abertura oficial do carrinho
2. Recapitular o que foi apresentado no evento
3. Detalhar a oferta completa (modulos, bonus, garantia)
4. CTA direto para pagina de vendas
5. Urgencia real (prazo do carrinho, vagas limitadas)

### Fase 5: Bonus escalonados

1. Email de bonus #1 liberado (primeiras 24h)
2. Email de bonus #2 liberado (48h)
3. Email de bonus #3 liberado (72h, se aplicavel)
4. Cada email foca no VALOR do bonus, nao apenas anuncia
5. CTA conectado com o bonus (aproveitar enquanto disponivel)

### Fase 6: Fechamento do carrinho

1. Email 48h antes do fechamento - recapitulacao + urgencia
2. Email 24h antes - depoimento forte + ultima chance
3. Email 12h antes - direto ao ponto (oferta fecha em X horas)
4. Email 3h antes - ultimas vagas (tom direto, sem melodrama)
5. Email final - carrinho fechado (para quem nao comprou, com abertura para lista de espera)

### Fase 7: Downsell (se aplicavel)

1. Email de downsell 24-48h apos fechamento
2. Oferta alternativa (parcelamento, produto menor, plano basico)
3. Tom: compreensao + nova oportunidade
4. CTA claro para a oferta de downsell

## Output Format

Arquivo `emails-{project}.md` contendo:

- Todas as sequencias organizadas por fase
- Cada email com: assunto, preview text, corpo completo, CTA
- Notas de timing (quando enviar cada email)
- Segmentacao sugerida (quem recebe o que)

## Quality Checklist

- [ ] Todas as fases do funil cobertas (welcome ate fechamento)
- [ ] Lembretes pre-evento com beneficio concreto (NUNCA so contagem regressiva)
- [ ] Cada email com CTA claro e unico
- [ ] Sequencia pos-pitch com bonus escalonados
- [ ] Downsell incluso quando aplicavel
- [ ] Assuntos de email com taxa de abertura otimizada
- [ ] Timing documentado para cada envio
