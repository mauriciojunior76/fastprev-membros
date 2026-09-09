# Task 46 — Plano Completo de Anúncios

## Objetivo
Criar plano completo de Meta Ads para o webinário: estrutura de campanhas em 3 fases, públicos por temperatura, brief de criativos em 4 lotes e orçamento calculado.

## Quando Usar
Após briefing completo, promessa central definida e cronograma de datas gerado.

## Agentes Envolvidos
- `ads-campaign-architect` (Campanha) — estrutura e orçamento
- `audience-builder` (Alvo) — públicos e segmentações
- `creative-brief-complete` (Grid v2) — brief dos criativos

## Fase 1 — Captação (D-21 a D-7)
Objetivo: inscrições no webinário
- Campanha de leads com formulário nativo OU tráfego para LP
- Públicos frios: interesse direto + interesses adjacentes + comportamento
- Orçamento: 60% do total
- KPI: CPL dentro do benchmark do nicho

## Fase 2 — Remarketing (D-7 a D-1)
Objetivo: converter inscritos indecisos + recuperar quem viu a LP
- Públicos: visitantes da LP sem inscrição + engajamento com perfil
- Mensagem: prova social + urgência de vagas
- Orçamento: 25% do total

## Fase 3 — Carrinho (D+1 a D+7)
Objetivo: converter quem assistiu mas não comprou
- Públicos: inscritos que compareceram + leads da captação
- Mensagem: replay + bônus + prazo do carrinho
- Orçamento: 15% do total

## Públicos por Camada
- **Fria**: interesses diretos (nível 1) + adjacentes (nível 2) + comportamentos (nível 3)
- **Morna**: engajamento perfil + visualizações de vídeo + visitantes do site
- **Quente**: lista de clientes + lista de leads + lookalike 1-3%
- **Exclusões obrigatórias**: compradores existentes fora da fase de remarketing

## Faixas Etárias por Perfil (automático)
- Empreendedores B2B: 28-55
- CLT profissional: 25-45
- Mãe de família: 27-42
- Saúde e bem-estar: 22-50
- Coaching/desenvolvimento pessoal: 24-48

## Lotes de Criativos
1. **Captação** (7 criativos): 3 formatos vídeo (15-30s) + 2 carrossel + 2 imagem
2. **Aquecimento** (4 criativos): cases + depoimentos + bastidores
3. **Remarketing** (3 criativos): prova social + urgência de vagas
4. **Pós-evento** (3 criativos): replay disponível + prazo carrinho + última chamada

## Calculadora de Orçamento
```
Orçamento base = Meta de inscritos × CPL projetado
Distribuição: Fase 1 (60%) + Fase 2 (25%) + Fase 3 (15%)
Escala: se CPL < benchmark em D-14 → duplicar orçamento vencedor
Kill rule: se CTR < 0,5% em 3 dias → pausar criativo
```

## CPL Benchmarks por Nicho
- Negócios / Empreendedorismo: R$8-18
- Saúde e Bem-estar: R$6-15
- Finanças Pessoais: R$12-25
- Carreira / Profissional: R$10-22
- Relacionamentos: R$8-20
- Espiritualidade: R$5-12

## Output
- Estrutura completa de campanhas (nomes, objetivos, orçamentos)
- Lista de públicos por fase com configurações específicas
- Brief completo de cada criativo (4 lotes)
- Calendário de ativação e desativação por fase

## Feeds Into
- `calendar-intelligence` (datas de ativação/desativação)
- `webinar-master-planner` (Cap 14)
