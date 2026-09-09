# Task 16 - Escrever Sequencia Completa de Emails

> Agente responsavel: Caixa (email-specialist)
> Fase: 3 - Copy
> Bloqueante: NAO

## Inputs

- `promise-{project}.md` - Promessa aprovada
- `funnel-architecture-{project}.md` - Arquitetura do funil
- `master-plan-{project}.md` - Cronograma geral

## Protocolo de Execucao

### STEP 1 - Escrever email de confirmacao
Email disparado imediatamente apos inscricao. Conteudo: confirmar inscricao, reforcar promessa, informar data/horario, criar expectativa, pedir para salvar na agenda. Tom: caloroso e animado. Incluir assunto + preview text + corpo + CTA.

### STEP 2 - Escrever emails de lembrete
Sequencia de 4 lembretes:
- Lembrete -3 dias: conteudo de aquecimento, micro-ensino, gerar antecipacao
- Lembrete -1 dia: "amanha e o dia", reforcar promessa, depoimento rapido
- Lembrete -2 horas: "faltam 2 horas", instrucoes praticas (link, horario, bloco na agenda)
- Lembrete -15 minutos: "comeca agora", link direto, tom de urgencia
Cada email com assunto + preview + corpo + CTA.

### STEP 3 - Escrever emails de replay
Sequencia de 3 emails para quem nao compareceu ou saiu antes do final:
- Replay D+1: "voce perdeu algo importante", resumo do que foi ensinado, link do replay, deadline
- Replay D+2: "ultimas horas do replay", destaque de um insight especifico, prova social de quem assistiu
- Replay D+3: depoimento de quem comprou apos assistir, CTA final do replay

### STEP 4 - Escrever email de urgencia
Email no penultimo dia de carrinho aberto: "ultimas horas para [oferta]", recapitular bonus que expiram, reforcar garantia, contar historia curta de transformacao, CTA direto.

### STEP 5 - Escrever email de ultimo dia
Email final: "fecha hoje a meia-noite", tom de ultima chance, resumo completo da oferta, todos os bonus, garantia, preco, CTA multiplo (topo e fundo do email).

### STEP 6 - Escrever email pos-fechamento
Email para quem nao comprou: agradecimento por participar, conteudo de valor incluso (resumo do webinario), nutricao para proximo evento. Sem venda, so relacionamento.

## Outputs

- `emails-{project}.md` - Sequencia completa de emails com assunto, preview text, corpo e CTA para cada email

## Checklist de Validacao

- [ ] Email de confirmacao escrito com tom caloroso
- [ ] 4 emails de lembrete com timing correto (-3d, -1d, -2h, -15min)
- [ ] 3 emails de replay com deadline progressiva
- [ ] Email de urgencia com bonus expirando
- [ ] Email de ultimo dia com resumo completo
- [ ] Email pos-fechamento sem venda, so valor
- [ ] Cada email tem assunto + preview + corpo + CTA
- [ ] Assuntos com versao A e B para teste
- [ ] Acentuacao perfeita em todo texto
- [ ] Tom progressivo: caloroso no inicio, urgente no final
