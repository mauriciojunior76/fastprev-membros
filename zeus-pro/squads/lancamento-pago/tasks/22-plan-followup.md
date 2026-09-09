---
task: planFollowup()
responsavel: "@followup-specialist"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: commercial-plan
    tipo: markdown
    origem: commercial-plan-{project}.md
    obrigatorio: true
  - campo: crm-plan
    tipo: markdown
    origem: crm-plan-{project}.md
    obrigatorio: true

Saida:
  - campo: followup-plan-{project}.md
    tipo: markdown
    destino: File
    persistido: true

Checklist:
  - "[ ] 6 perfis com scripts distintos"
  - "[ ] Tom firme mas respeitoso"
  - "[ ] Timing definido por perfil"
---

# Task: Plano de Follow-up por Perfil

**Task ID:** LP-022
**Version:** 1.0.0
**Command:** `*followup`
**Agent:** Followup Specialist (Pulso)
**Purpose:** Plano de follow-up segmentado por perfil com scripts e timing

---

## Inputs

| Campo | Tipo | Origem | Obrigatorio |
|-------|------|--------|-------------|
| commercial-plan | markdown | commercial-plan-{project}.md | Sim |
| crm-plan | markdown | crm-plan-{project}.md | Sim |

## Preconditions

- Plano comercial com 11 toques finalizado
- Plano de CRM com segmentacao de leads

## Execution Phases

### Fase 1: Perfil "sem resposta"

1. Definir quem se encaixa (lead que nao abriu/respondeu nenhum toque)
2. Criar sequencia de 3 tentativas com abordagens diferentes
3. Tom: curioso, nao agressivo ("percebi que voce nao viu isso")
4. Timing: tentativa 1 em 24h, tentativa 2 em 48h, tentativa 3 em 72h
5. Apos 3 tentativas sem resposta: mover para lista fria

### Fase 2: Perfil "agendou e faltou"

1. Definir quem se encaixa (agendou sessao/call e nao compareceu)
2. Criar mensagem de reagendamento sem julgamento
3. Tom: compreensivo mas direto ("acontece, vamos remarcar")
4. Oferecer novo horario com opcoes limitadas
5. Timing: 1h apos a falta, reforço em 24h

### Fase 3: Perfil "adiou"

1. Definir quem se encaixa (demonstrou interesse mas pediu tempo)
2. Criar sequencia que respeita o tempo mas mantem presenca
3. Tom: parceiro ("enquanto voce decide, olha o que aconteceu")
4. Compartilhar prova social ou resultado novo a cada contato
5. Timing: contato a cada 3-5 dias

### Fase 4: Perfil "agora nao"

1. Definir quem se encaixa (disse "nao" mas de forma temporaria)
2. Criar gatilho de reativacao (novo bonus, novo lote, novo evento)
3. Tom: respeitoso com porta aberta ("sem problema, quando fizer sentido")
4. Manter na lista para proximos lancamentos
5. Timing: reativacao em 7-14 dias com razao nova

### Fase 5: Perfil "assistiu nao aplicou"

1. Definir quem se encaixa (participou do evento mas nao comprou)
2. Criar sequencia focada em destravar a acao (nao em vender mais)
3. Tom: professor ("o que te travou? posso ajudar")
4. Oferecer mini-consultoria ou material complementar
5. Timing: contato em 24h pos-evento, reforço em 48h

### Fase 6: Perfil "comprou ingresso nao veio"

1. Definir quem se encaixa (pagou ingresso e nao compareceu)
2. Criar mensagem que valoriza o investimento ja feito
3. Tom: firme mas empático ("voce ja investiu, aproveita")
4. Oferecer replay com prazo limitado
5. Timing: durante o evento (mensagem ao vivo) + 24h apos

## Output Format

Arquivo markdown unico:

- `followup-plan-{project}.md` - Plano completo com 6 perfis, scripts, timing e regras de transicao entre perfis

## Quality Checklist

- [ ] 6 perfis com scripts distintos e adequados ao contexto
- [ ] Tom firme mas respeitoso em todos os scripts
- [ ] Timing definido por perfil com intervalos claros
- [ ] Regras de transicao (quando mover lead de um perfil para outro)
- [ ] Nenhum script generico - cada perfil tem abordagem unica
- [ ] Porta aberta para reativacao futura em todos os perfis
