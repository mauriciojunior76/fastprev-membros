# Webinar Infalível Squad v2 — Metodologia Tayoba

Squad de 70 agentes especializados no método Webinário Infalível.

O cliente explica o produto, o público e o preço — o squad planeja tudo sozinho:
big idea, copy, narrativa, pitch, conceito visual, página, oferta, anúncios, datas, emails, WhatsApp.

## Ativação

```
@webinar-infalivel           # Ativa o webinar-chief (orquestrador)
@webinar-infalivel:agente    # Ativa agente específico
```

## Pipeline Completo (ordem de execução)

```
1. Briefing (webinar-intake-master)
     ↓
2. Decodificação do produto (product-decoder)
     ↓
3. Pesquisa, Promessa, Big Idea, Narrativa (tier 1A)
     ↓
4. Conceito Visual do Evento (webinar-visual-chief → 4 especialistas)
     ↓
5. Oferta + Bônus (offer-architect + bonus-architect)
     ↓
6. Página do Evento (event-page-builder → PAGE-FORGE)
     ↓
7. Formulário de Aplicação (se alto ticket) (application-form-designer)
     ↓
8. Roteiro do Webinário (webinar-scripter)
     ↓
9. Pitch de Vendas ou Aplicação (pitch-architect OU application-pitch-designer)
     ↓
10. Emails D-7 a D+7 (email-scheduler → Brevo)
      ↓
11. WhatsApp D-21 a D+7 (whatsapp-formatter + whatsapp-scheduler)
      ↓
12. Plano de Anúncios (ads-campaign-architect + audience-builder + creative-brief-complete)
      ↓
13. Cronograma com Datas Reais (calendar-intelligence + date-optimizer)
      ↓
14. Plano Mestre Completo (webinar-master-planner → 16 capítulos)
```

## Comandos

```
*start-webinar    Inicia pipeline completo
*status           Status atual do projeto e fase ativa
*diagnose         Diagnostica problemas por etapa do funil
*daily-review     Revisão diária com 5 perguntas
*pre-check        Checklist pré-webinário
*review-copy      Ciclo de revisão de copy
*calendário [data]  Gera cronograma completo D-21 a D+10
*timing           Análise de riscos e otimizações do cronograma
```

## Estrutura de Tiers

| Tier | Nome | Agentes | Função |
|------|------|---------|--------|
| 0 | Comando Central | 7 | Orquestração, briefing, decodificação, quality gate, plano mestre |
| 1A | Estratégia e Promessa | 6 | Pesquisa, promessa, Big Idea, narrativa, economia do funil |
| 1B | Copy e Linguagem | 6 | Páginas, emails v2, WhatsApp v2+scheduler, anúncios, revisão |
| 1C | Webinário e Conteúdo | 7 | 14 blocos, roteiro, pitch, aplicação, LP do evento, formulário |
| 1D | Tráfego e Criativos | 7 | Campanhas, públicos, criativos completos, remarketing, tracking |
| 1E | Pós-Webinário e Follow-up | 7 | Replay, escassez, follow-up, downsell, comercial, objeções |
| 1F | Oferta e Bônus | 5 | Oferta, bônus, preço, garantia, ancoragem |
| 1G | Visual e Página | 7 | Arquétipo, paleta, tipografia, conceito visual, LP, formulário |
| 2 | Qualidade e Diagnóstico | 8 | Review, diagnóstico, qualidade, compliance, métricas |
| Bloco 8 | Inteligência de Datas | 2 | Calendário inteligente, otimizador de timing |

**Total: 70 agentes**

## Agentes Novos (v2)

### Bloco Visual (1G)
- `webinar-visual-chief` — Palco Visual (orquestra os 4 especialistas visuais)
- `webinar-archetype-mapper` — Alma (mapeia arquétipo visual do evento)
- `webinar-color-palette` — Prism (sistema de 6 cores + WCAG)
- `webinar-typography-selector` — Fonte (Google Fonts + escala tipográfica)
- `webinar-visual-concept` — Veda Event (síntese em visual-do-evento.md)

### Bloco Pitch e Página (1C expandido)
- `pitch-architect` — Palco (14 blocos de pitch de vendas)
- `application-pitch-designer` — Filtro (funil de aplicação alto ticket)
- `event-page-builder` — Palco Web (brief da LP para PAGE-FORGE)
- `application-form-designer` — Portão (formulário de 12 campos + qualificação)

### Bloco Tráfego (1D expandido)
- `ads-campaign-architect` — Campanha (3 fases + orçamento calculado)
- `audience-builder` — Alvo (públicos frio/morno/quente + lookalike)
- `creative-brief-complete` — Grid v2 (4 lotes de criativos com brief completo)

### Bloco Comunicação (1B expandido)
- `email-scheduler` — Caixa v2 (13 emails com horários + setup Brevo)
- `whatsapp-formatter` — Zap v2 (18 mensagens com formatação nativa WA)
- `whatsapp-scheduler` — Zaptime (script Node.js + deploy PM2 na VPS)

### Bloco Datas (Tier 8)
- `calendar-intelligence` — Calendário (feriados, pagamentos, virada cartão, janelas 2026)
- `date-optimizer` — Timing (análise de riscos + otimizações proativas)

## Arquivos de Dados

| Arquivo | Conteúdo |
|---------|----------|
| `data/free-email-tools.md` | Brevo, MailerLite, Mailchimp — configuração e limites |
| `data/whatsapp-format-guide.md` | Formatação nativa WA + templates validados + Evolution API |
| `data/meta-ads-audience-templates.md` | Públicos por nicho + naming convention + orçamentos |
| `data/event-visual-concepts.md` | 8 arquétipos visuais + paletas + fontes Google |
| `data/benchmark-tables.md` | CPL, comparecimento, conversão por nicho |
| `data/methodology-rules.md` | Regras do método Webinário Infalível |
| `data/objection-matrix-template.md` | Objeções + respostas por perfil |

## Tasks (48 tarefas)

| Range | Área |
|-------|------|
| 01-15 | Estratégia, pesquisa, promessa |
| 16-30 | Copy, roteiro, criativos |
| 31-41 | Comercial, pós-evento, diagnóstico |
| 42 | Conceito visual do evento |
| 43 | Página do evento |
| 44 | Formulário de aplicação |
| 45 | Pitch de vendas ou aplicação |
| 46 | Plano completo de anúncios |
| 47 | Sequência de emails |
| 48 | Agendamento WhatsApp |

## Integração com Outros Squads

| Squad | Quando |
|-------|--------|
| `page-forge-squad` | Construção da LP após brief do event-page-builder |
| `brand-squad` | Se o evento precisar de identidade visual mais profunda |
| `copy-squad` | Para revisão de pitch e sales letter completa |

## Referências Externas

| Serviço | Uso | Plano incluso |
|---------|-----|---------------|
| Brevo | Envio de emails | 300/dia incluso |
| Evolution API | WhatsApp (VPS próprio) | Configure com suas credenciais |
| Meta Ads | Anúncios | Pago por resultado |
| Google Fonts | Tipografia do evento | 100% incluso |
| PM2 | Scheduler WA na VPS | de instalacao propria |
