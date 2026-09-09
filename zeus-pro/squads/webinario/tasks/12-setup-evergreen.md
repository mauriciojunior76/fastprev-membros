# Task 12 - Configurar Componente Evergreen

> Agente responsavel: Automate (evergreen-specialist)
> Fase: 2 - Oferta e Funil
> Bloqueante: NAO

## Inputs

- `webinar-brief-{project}.md` - Briefing com modelo definido
- `funnel-architecture-{project}.md` - Arquitetura do funil

## Protocolo de Execucao

Nota: esta task so executa se o modelo definido no briefing inclui componente automatizado (automatizado ou hibrido). Se o modelo for exclusivamente ao vivo, registrar como "nao aplicavel" e encerrar.

### STEP 1 - Selecionar plataforma de automacao
Avaliar plataforma ideal para o webinario automatizado (EverWebinar, WebinarJam, Demio, plataforma propria). Considerar: recursos necessarios, custo, integracao com stack existente, qualidade da experiencia do participante.

### STEP 2 - Configurar webinario automatizado
Definir configuracao completa: horarios disponiveis (just-in-time ou agendado), simulacao de chat ao vivo, contagem regressiva, bloqueio de avancar/retroceder, integracao com pixel de rastreamento, redirecionamento apos o evento.

### STEP 3 - Programar CTAs no video
Mapear todos os momentos de CTA durante o webinario automatizado: botao de oferta (quando aparece, quando some), pop-ups de escassez, contagem de vagas, timer de encerramento. Cada CTA com timing exato em minutos.

### STEP 4 - Configurar chatbot
Definir respostas automatizadas para perguntas frequentes no chat durante o webinario: duvidas sobre o conteudo, duvidas sobre a oferta, objecoes comuns, link de pagamento. O chatbot deve parecer humano e nao robotico.

### STEP 5 - Definir ciclo de atualizacao
Planejar frequencia de atualizacao do webinario automatizado: quando regravar (metricas caindo), quando atualizar depoimentos, quando trocar bonus, quando ajustar preco. Definir criterios de decisao para cada atualizacao.

## Outputs

- `evergreen-setup-{project}.md` - Configuracao completa do componente evergreen com plataforma, CTAs programados, chatbot e ciclo de atualizacao

## Checklist de Validacao

- [ ] Modelo confirmado como automatizado ou hibrido (se nao, task nao aplicavel)
- [ ] Plataforma selecionada e justificada
- [ ] Horarios e formato de exibicao definidos
- [ ] CTAs programados com timing exato
- [ ] Chatbot configurado com respostas para perguntas frequentes
- [ ] Ciclo de atualizacao planejado com criterios
- [ ] Integracao com stack existente verificada
