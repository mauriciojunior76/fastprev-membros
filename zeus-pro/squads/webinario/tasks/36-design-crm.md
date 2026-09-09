# Task 36 - Desenhar Plano de CRM e Automacoes

> Agente responsavel: Fluxo (crm-operations-specialist)
> Fase: 7 - Operacao e Metricas
> Bloqueante: NAO

## Inputs
- Funil completo do webinario
- Segmentacao por comportamento
- Automacoes planejadas (emails, WhatsApp)

## Protocolo de Execucao

### STEP 1 - Configurar CRM com 9 segmentos
Criar 9 segmentos por comportamento no CRM: inscrito (nao confirmou), confirmado (nao assistiu), assistiu parcial (saiu antes do pitch), assistiu completo (nao clicou CTA), clicou CTA (nao comprou), iniciou checkout (nao finalizou), comprou, assistiu replay, nao abriu nenhum email.

### STEP 2 - Criar automacoes de comunicacao
Configurar automacoes para cada etapa critica: confirmacao de inscricao (imediata), lembretes pre-webinario (24h, 2h, 15min antes), replay (com delay), carrinho abandonado (30min, 2h, 24h), pos-compra (boas-vindas, onboarding), nutricao para nao-compradores (conteudo de valor por 7 dias).

### STEP 3 - Definir tags e pipeline
Criar sistema de tags que permite filtrar leads por qualquer combinacao de comportamento. Definir pipeline visual com estagios claros: novo lead, inscrito, confirmado, presente, engajado, oportunidade, negociacao, cliente, perdido.

### STEP 4 - Configurar regras de movimentacao
Documentar regras automaticas de movimentacao entre estagios: quando um lead abre o email de replay, move para "engajado". Quando clica no link de vendas, move para "oportunidade". Quando inicia checkout, move para "negociacao".

## Outputs
- `crm-plan-{project}.md` - Plano de CRM com segmentos, automacoes, tags e pipeline

## Checklist de Validacao
- [ ] 9 segmentos por comportamento criados
- [ ] Automacoes para cada etapa critica (inscricao, lembrete, replay, carrinho, pos-compra, nutricao)
- [ ] Tags definidas com logica de combinacao
- [ ] Pipeline visual com estagios claros
- [ ] Regras de movimentacao automatica documentadas
- [ ] Acentuacao perfeita em todo texto portugues
