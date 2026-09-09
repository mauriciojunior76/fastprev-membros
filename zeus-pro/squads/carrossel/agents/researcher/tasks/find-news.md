---
name: "Encontrar Notícias"
order: 1
input: "Tema/foco de pesquisa definido pelo usuário no checkpoint"
output: "Lista de 8-12 notícias com título, fonte, data, resumo e dados-chave"
---

## Process

1. Ler o arquivo de foco de pesquisa (inputFile) para extrair tema e período
2. Executar 4 a 6 buscas web com variações de keywords em português e inglês
3. Para cada resultado relevante, extrair: título, fonte, data de publicação, URL, resumo de 2 linhas
4. Buscar dados quantitativos mencionados (números, porcentagens, estudos citados)
5. Filtrar apenas notícias relevantes para mentores, especialistas e infoprodutores
6. Compilar lista de 8 a 12 notícias em formato estruturado

## Output Format

```yaml
news_items:
  - title: "Título da notícia"
    source: "Nome da fonte"
    url: "URL completa"
    date: "YYYY-MM-DD"
    summary: "Resumo de 2 linhas"
    key_data: ["dado 1", "dado 2"]
    relevance: "Por que importa para mentores"
```

## Output Example

```yaml
news_items:
  - title: "Anthropic lança Claude 4 com 1.2M tokens de contexto"
    source: "TechCrunch"
    url: "https://techcrunch.com/2026/03/15/claude-4-launch"
    date: "2026-03-15"
    summary: "Nova versão supera GPT-4o em benchmarks de código e raciocínio. Empresas de automação já migrando workflows."
    key_data: ["23% superior em coding", "1.2M tokens", "89% precisão em tasks"]
    relevance: "Mentores que usam IA para criar conteúdo e automatizar atendimento ganham ferramenta mais poderosa"
  - title: "Mercado de mentorias online cresce 34% no Brasil em 2025"
    source: "Exame"
    url: "https://exame.com/negocios/mentoria-online-2025"
    date: "2026-03-12"
    summary: "Pesquisa da ABStartups mostra crescimento acelerado do segmento. Ticket médio subiu para R$3.200."
    key_data: ["34% crescimento", "ticket médio R$3.200", "47% usam IA"]
    relevance: "Valida o mercado dos mentores e mostra oportunidade de diferenciação com IA"
```

## Quality Criteria

- Mínimo 8 notícias coletadas
- Todas com data de publicação válida
- Pelo menos 50% com dados quantitativos
- Fontes variadas (mínimo 4 fontes diferentes)
- Relevância explícita para público de mentoria/especialistas

## Veto Conditions

- Menos de 6 notícias coletadas: refazer busca com keywords diferentes
- Nenhuma notícia com dados quantitativos: refazer incluindo "estudo", "pesquisa", "dados"
