---
name: "Rankear Histórias"
order: 2
input: "Lista de 8-12 notícias da task anterior"
output: "Top 5 notícias rankeadas com score e justificativa"
---

## Process

1. Receber a lista de notícias da task find-news
2. Avaliar cada notícia em 3 dimensões (nota 1-5):
   a. Relevância para público de mentoria/especialistas
   b. Potencial de engajamento no Instagram (compartilhável, salvável)
   c. Disponibilidade de dados concretos para fundamentar o conteúdo
3. Calcular score total (soma das 3 notas, máx 15)
4. Ordenar por score decrescente
5. Selecionar as top 5 com justificativa de ranking

## Output Format

```yaml
ranked_stories:
  - rank: 1
    title: "Título"
    source: "Fonte"
    date: "YYYY-MM-DD"
    summary: "Resumo curto"
    key_data: ["dado 1", "dado 2"]
    scores:
      relevance: 5
      engagement_potential: 5
      data_quality: 4
      total: 14
    justification: "Por que está em primeiro"
```

## Output Example

```yaml
ranked_stories:
  - rank: 1
    title: "73% dos mentores que usam IA fecham 2x mais clientes"
    source: "Forbes Brasil"
    date: "2026-03-14"
    summary: "Estudo com 1.200 mentores mostra correlação direta entre uso de IA e taxa de conversão."
    key_data: ["73% dos mentores", "2x mais clientes", "1.200 entrevistados"]
    scores:
      relevance: 5
      engagement_potential: 5
      data_quality: 5
      total: 15
    justification: "Dado impactante, diretamente relevante para mentores, alto potencial de save/share por ser contra-intuitivo"
  - rank: 2
    title: "Mercado de mentorias online cresce 34% no Brasil"
    source: "Exame"
    date: "2026-03-12"
    summary: "ABStartups confirma crescimento acelerado com ticket médio de R$3.200."
    key_data: ["34% crescimento", "R$3.200 ticket médio"]
    scores:
      relevance: 5
      engagement_potential: 4
      data_quality: 4
      total: 13
    justification: "Valida mercado, bom para carrossel tipo 'oportunidade', dados sólidos"
```

## Quality Criteria

- Exatamente 5 notícias no ranking final
- Score justificado para cada dimensão
- Justificativa de ranking com pelo menos 1 frase
- Notícias ordenadas por score decrescente
- Dados-chave preservados da coleta original

## Veto Conditions

- Menos de 3 notícias no ranking: pesquisa insuficiente, voltar ao find-news
- Todas as notícias com score total abaixo de 9: qualidade baixa, refazer pesquisa
