# Task 11 - Desenhar Arquitetura do Funil

> Agente responsavel: Portal (funnel-architect)
> Fase: 2 - Oferta e Funil
> Bloqueante: NAO

## Inputs

- `offer-architecture-{project}.md` - Arquitetura da oferta
- `master-plan-{project}.md` - Plano mestre com modelo definido
- `funnel-economics-{project}.md` - Economia do funil

## Protocolo de Execucao

### STEP 1 - Desenhar as 11 etapas do funil
Mapear o funil completo com todas as etapas:
1. Anuncio (criativo + copy)
2. Pagina de captura (LP + formulario)
3. Pagina de obrigado (confirmacao + proximo passo)
4. Sequencia de aquecimento (emails + WhatsApp)
5. Lembretes (email + WhatsApp + SMS)
6. Sala do webinario (plataforma + chat)
7. Webinario ao vivo (conteudo + pitch)
8. Pagina de vendas (pos-webinario)
9. Checkout (pagamento + order bump)
10. Upsell (oferta pos-compra)
11. Follow-up (replay + urgencia + carrinho aberto)

### STEP 2 - Definir metricas e benchmarks por etapa
Para cada etapa, definir: metrica principal, benchmark minimo aceitavel, benchmark alvo e benchmark excelente. Exemplo: Pagina de captura - taxa de conversao - minimo 20%, alvo 30%, excelente 40%.

### STEP 3 - Definir gates por etapa
Criar criterio de aprovacao para avancar entre etapas. Exemplo: "Pagina de captura so vai pro ar se taxa de conversao no teste A/B for acima de 25%". Gates evitam que etapas fracas contaminem o funil inteiro.

### STEP 4 - Mapear ferramentas
Para cada etapa, definir qual ferramenta sera usada (baseado na stack informada no briefing). Verificar integracao entre ferramentas. Sinalizar se alguma ferramenta esta faltando.

### STEP 5 - Definir automacoes
Listar todas as automacoes necessarias: disparo de emails, mensagens de WhatsApp, tags, segmentacao, pixel de rastreamento, remarketing. Definir gatilho, acao e timing de cada automacao.

## Outputs

- `funnel-architecture-{project}.md` - Arquitetura completa do funil com 11 etapas, metricas, benchmarks, gates, ferramentas e automacoes

## Checklist de Validacao

- [ ] 11 etapas do funil detalhadas
- [ ] Metricas e benchmarks definidos por etapa
- [ ] Gates de aprovacao por etapa
- [ ] Ferramentas mapeadas com integracao verificada
- [ ] Automacoes listadas com gatilho, acao e timing
- [ ] Funil coerente com o modelo escolhido (vivo/auto/hibrido)
- [ ] Nenhuma etapa sem ferramenta definida
