# Task 08 - Projetar Economia do Funil

> Agente responsavel: Calculo (financial-planner)
> Fase: 1 - Pesquisa e Estrategia
> Bloqueante: NAO

## Inputs

- `research-{project}.md` - Pesquisa de mercado
- `webinar-brief-{project}.md` - Briefing com ticket e orcamento

## Protocolo de Execucao

### STEP 1 - Projetar CPL
Estimar o custo por lead com base no nicho, plataforma de trafego e historico disponivel. Considerar faixas: CPL otimista (nicho facil, criativo forte), CPL moderado (benchmark do mercado), CPL conservador (nicho competitivo). Usar dados reais quando disponiveis.

### STEP 2 - Projetar taxas de conversao
Estimar cada etapa do funil:
- Taxa de captura (clique para lead): benchmark 25-40%
- Taxa de comparecimento (lead para presente): benchmark 20-35%
- Taxa de permanencia (presente ate o pitch): benchmark 40-60%
- Taxa de conversao (presente para comprador): benchmark 3-10% (varia por ticket)

### STEP 3 - Calcular break-even
Com o ticket do produto e as taxas estimadas, calcular quantos leads sao necessarios para cobrir o investimento em trafego. Definir o ponto exato de break-even e quantos dias/semanas para atingi-lo.

### STEP 4 - Simular 3 cenarios
Criar projecao completa para cada cenario:
- Conservador: CPL alto, taxas baixas, sem upsell
- Moderado: CPL medio, taxas medianas, upsell basico
- Otimista: CPL baixo, taxas altas, upsell + order bump
Cada cenario com: investimento, leads, presentes, compradores, faturamento, lucro, ROAS.

### STEP 5 - Identificar alavancas
Mapear quais metricas tem maior impacto no resultado final. Priorizar: (1) taxa de conversao no pitch, (2) taxa de comparecimento, (3) CPL, (4) ticket medio com upsell. Calcular o impacto de melhorar cada metrica em 10%.

## Outputs

- `funnel-economics-{project}.md` - Projecao financeira completa com 3 cenarios, break-even, alavancas e sensibilidade por metrica

## Checklist de Validacao

- [ ] CPL estimado com base em dados do nicho
- [ ] Todas as taxas de conversao projetadas com benchmarks
- [ ] Break-even calculado com clareza
- [ ] 3 cenarios completos (conservador, moderado, otimista)
- [ ] Alavancas priorizadas por impacto
- [ ] Numeros coerentes entre si (sem erro de calculo)
- [ ] Projecao realista para o orcamento informado
