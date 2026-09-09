---
task: writeWhatsapp()
responsavel: "@whatsapp-specialist"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: copy-pagina-{project}.md
    tipo: markdown
    origem: Task LP-007
    obrigatorio: true
  - campo: event-structure-{project}.md
    tipo: markdown
    origem: Task LP-011
    obrigatorio: true
  - campo: bonus-plan-{project}.md
    tipo: markdown
    origem: User Input
    obrigatorio: false

Saida:
  - campo: whatsapp-scripts-{project}.md
    tipo: markdown
    destino: File
    persistido: true

Checklist:
  - "[ ] 11 toques com razao nova cada"
  - "[ ] Mensagens curtas e diretas"
  - "[ ] Segmentado por fase do funil"
  - "[ ] Welcome do grupo configurado"
  - "[ ] Follow-up comercial completo (11 toques)"
---

# Task: Escrever Scripts de WhatsApp

**Task ID:** LP-009
**Version:** 1.0.0
**Command:** `*whatsapp`
**Agent:** WhatsApp Specialist (Zap)
**Purpose:** Escrever scripts de WhatsApp para grupo e comercial

---

## Inputs

| Campo | Tipo | Origem | Obrigatorio |
|-------|------|--------|-------------|
| copy-pagina-{project}.md | markdown | Task LP-007 | Sim |
| event-structure-{project}.md | markdown | Task LP-011 | Sim |
| bonus-plan-{project}.md | markdown | User Input | Nao |

## Preconditions

- Copy da pagina completo (LP-007)
- Estrutura do evento definida (LP-011)
- Plano de bonus definido (se houver)
- Grupo de WhatsApp criado

## Execution Phases

### Fase 1: Welcome do grupo

1. Mensagem de boas-vindas automatica ao entrar no grupo
2. Regras do grupo (curtas, 3-5 itens)
3. O que esperar nos proximos dias
4. Primeiro conteudo de valor (micro-win imediato)

### Fase 2: Warmup pre-evento

1. Conteudo de valor 1 - micro-insight relacionado ao tema
2. Conteudo de valor 2 - case rapido ou resultado
3. Conteudo de valor 3 - pergunta engajadora
4. Cada mensagem GERA valor, nunca e apenas aviso
5. Frequencia: 1 mensagem/dia nos 7 dias antes do evento

### Fase 3: Lembretes (beneficio)

1. Lembrete 3 dias antes - beneficio principal do evento
2. Lembrete 1 dia antes - o que preparar + beneficio
3. Lembrete no dia - link de acesso + energia
4. REGRA: cada lembrete traz BENEFICIO, nao contagem vazia

### Fase 4: Logistica dia do evento

1. Mensagem de abertura D1 (link + horario + bom dia)
2. Mensagem de intervalo (destaque + proximo bloco)
3. Mensagem de encerramento D1 (resumo + expectativa D2)
4. Mensagem de abertura D2 (link + energia)
5. Mensagem apos pitch (CTA + link de compra)

### Fase 5: Pos-evento reengajamento

1. Mensagem de agradecimento geral
2. Resumo dos principais aprendizados do evento
3. Depoimentos ao vivo de quem ja comprou
4. CTA para quem ainda nao decidiu

### Fase 6: Follow-up comercial (11 toques)

1. Toque 1 - Agradecimento + recapitulacao da oferta
2. Toque 2 - Depoimento especifico + CTA
3. Toque 3 - Bonus exclusivo revelado
4. Toque 4 - Objecao #1 respondida + CTA
5. Toque 5 - Resultado rapido de quem ja esta dentro
6. Toque 6 - Objecao #2 respondida + CTA
7. Toque 7 - Urgencia (prazo/vagas) + CTA
8. Toque 8 - Audio pessoal do expert
9. Toque 9 - Ultima chance com motivo real
10. Toque 10 - Carrinho fechando em X horas
11. Toque 11 - Encerramento (porta fechou, lista de espera)
12. REGRA: cada toque tem uma RAZAO NOVA (nunca repetir argumento)

### Fase 7: Fechamento

1. Mensagem final de encerramento do grupo
2. Agradecimento geral
3. Direcionamento para proximos passos (quem comprou vs quem nao comprou)

## Output Format

Arquivo `whatsapp-scripts-{project}.md` contendo:

- Scripts organizados por fase (grupo e comercial separados)
- Cada mensagem com: timing, canal (grupo/individual), texto completo
- Indicacao de midia (quando incluir imagem, audio, video)
- Notas de segmentacao (quem recebe o que)

## Quality Checklist

- [ ] 11 toques comerciais com razao nova em cada um
- [ ] Mensagens curtas e diretas (max 3-4 linhas por mensagem no grupo)
- [ ] Segmentado por fase do funil (pre-evento, evento, pos-evento, comercial)
- [ ] Welcome do grupo configurado com regras e primeiro valor
- [ ] Follow-up comercial completo com 11 toques distintos
- [ ] Nenhum toque repete argumento do anterior
- [ ] Cada mensagem com timing definido
