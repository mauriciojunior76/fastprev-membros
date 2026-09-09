# Task 34 - Configurar Dashboard de Metricas

> Agente responsavel: Painel (metrics-analyst)
> Fase: 7 - Operacao e Metricas
> Bloqueante: NAO

## Inputs
- Funil completo do webinario
- Benchmarks do modelo Tayoba
- Modelo de webinario escolhido (task 01)

## Protocolo de Execucao

### STEP 1 - Configurar dashboard com metricas do Tayoba
Criar estrutura de dashboard que acompanhe as metricas essenciais do funil de webinario: CPL (custo por lead), taxa de captura (visitantes para inscritos), taxa de comparecimento (inscritos que assistiram), taxa de retencao (quanto tempo ficaram), taxa de clique no CTA (assistiram e clicaram), taxa de conversao (clicaram e compraram), ROAS (retorno sobre investimento em ads), taxa de replay (inscreveram e assistiram replay), receita por inscrito.

### STEP 2 - Definir benchmarks por modelo
Estabelecer benchmarks de referencia para cada metrica com base no modelo de webinario escolhido. Os benchmarks variam conforme nicho, ticket e historico. Documentar a fonte de cada benchmark.

### STEP 3 - Criar template de relatorio diario
Desenhar template de relatorio que a equipe preenche diariamente durante o periodo de captacao e pos-webinario. O relatorio deve ter: metricas do dia, comparacao com benchmark, tendencia (subindo/descendo/estavel), acao necessaria.

### STEP 4 - Definir alertas
Configurar limiares de alerta: se uma metrica cair abaixo de 70% do benchmark por 2 dias consecutivos, acionar diagnostico automatico (task 40).

## Outputs
- `metrics-dashboard-{project}.md` - Dashboard de metricas com benchmarks, template diario e alertas

## Checklist de Validacao
- [ ] Todas as metricas Tayoba contempladas (CPL, captura, comparecimento, retencao, clique CTA, conversao, ROAS, replay, receita/inscrito)
- [ ] Benchmarks definidos por modelo com fonte documentada
- [ ] Template de relatorio diario funcional
- [ ] Alertas configurados com limiares claros
- [ ] Acentuacao perfeita em todo texto portugues
