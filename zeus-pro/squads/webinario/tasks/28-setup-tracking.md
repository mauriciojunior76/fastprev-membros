# Task 28 - Configurar Tracking e Dados de Trafego

> Agente responsavel: Pixel (traffic-data-planner)
> Fase: 5 - Criativos e Trafego
> Bloqueante: NAO
> Gate: criativos aprovados por Filtro

## Inputs
- Funil completo do webinario
- Stack tecnologica definida
- Paginas do funil (captura, obrigado, vendas)

## Protocolo de Execucao

### STEP 1 - Configurar pixel
Planejar a instalacao do pixel Meta e Google Ads em todas as paginas do funil. Definir onde cada pixel deve ser disparado e em qual condicao.

### STEP 2 - Definir eventos de conversao
Mapear os eventos de conversao em cada etapa: PageView (todas as paginas), Lead (formulario de inscricao), CompleteRegistration (pagina de obrigado), ViewContent (pagina de vendas), Purchase (confirmacao de compra). Incluir valores de conversao quando aplicavel.

### STEP 3 - Configurar API de conversao
Planejar a implementacao da API de conversao (CAPI) do Meta para garantir rastreamento server-side. Definir quais eventos serao enviados pela API alem do pixel do browser.

### STEP 4 - Definir UTMs por origem
Criar padrao de UTMs para cada combinacao de origem, campanha e criativo. Formato: utm_source (plataforma), utm_medium (tipo), utm_campaign (nome campanha), utm_content (criativo especifico), utm_term (angulo/variacao).

### STEP 5 - Validar tracking end-to-end
Documentar plano de teste para validar que cada evento esta sendo registrado corretamente desde o clique no anuncio ate a conversao final. Incluir checklist de verificacao.

## Outputs
- `traffic-data-plan-{project}.md` - Plano completo de tracking com eventos, UTMs e validacao

## Checklist de Validacao
- [ ] Pixel Meta e Google configurados em todas as paginas
- [ ] 5 eventos de conversao mapeados (PageView, Lead, CompleteRegistration, ViewContent, Purchase)
- [ ] API de conversao (CAPI) planejada
- [ ] Padrao de UTMs definido e documentado
- [ ] Plano de teste end-to-end criado
- [ ] Acentuacao perfeita em todo texto portugues
