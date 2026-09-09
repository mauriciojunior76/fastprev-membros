---
name: "Gerar Ângulos"
order: 1
input: "Notícia selecionada pelo usuário no checkpoint"
output: "5 ângulos emocionais distintos para a mesma notícia"
---

## Process

1. Ler a notícia selecionada pelo usuário (título, resumo, dados-chave)
2. Gerar 5 ângulos emocionais distintos para a mesma notícia:
   a. Medo/Urgência: perspectiva de risco se não agir
   b. Oportunidade: perspectiva de ganho para quem agir primeiro
   c. Educacional: perspectiva de ensino com dados e explicação
   d. Contrário: perspectiva que desafia a narrativa óbvia
   e. Inspiracional: perspectiva motivadora de possibilidade
3. Para cada ângulo, escrever: emoji + nome + headline de impacto (máx 15 palavras) + descrição de 2 linhas
4. Indicar qual formato de carrossel combina melhor com cada ângulo

## Output Format

```yaml
angles:
  - id: 1
    type: "medo"
    emoji: "🔴"
    headline: "Headline de impacto do ângulo"
    description: "Descrição de 2 linhas explicando a abordagem"
    suggested_format: "Editorial"
```

## Output Example

```yaml
source_news:
  title: "73% dos mentores que usam IA fecham 2x mais clientes"

angles:
  - id: 1
    type: "medo"
    emoji: "🔴"
    headline: "Em 12 meses, mentores sem IA serão invisíveis"
    description: "Foca no risco de ficar para trás enquanto concorrentes automatizam. Dados de mercado como prova de que a janela está fechando."
    suggested_format: "Editorial"
  - id: 2
    type: "oportunidade"
    emoji: "🟢"
    headline: "A janela de 6 meses que pode dobrar seus clientes"
    description: "Foca na vantagem competitiva de adotar IA agora, antes da maioria. Dados de conversão como prova de resultado."
    suggested_format: "Problema/Solução"
  - id: 3
    type: "educacional"
    emoji: "📚"
    headline: "O estudo que prova: IA dobra vendas de mentoria"
    description: "Explica o estudo metodicamente com dados, contexto e aplicação prática para mentores. Tom de análise."
    suggested_format: "Listicle"
  - id: 4
    type: "contrário"
    emoji: "↔️"
    headline: "Por que 27% dos mentores com IA ainda não viram resultado"
    description: "Desafia o hype mostrando que IA sem estratégia não funciona. Inverte a narrativa para gerar debate."
    suggested_format: "Mito vs Realidade"
  - id: 5
    type: "inspiracional"
    emoji: "⭐"
    headline: "Imagine 10 agentes IA trabalhando enquanto você dorme"
    description: "Pinta o futuro possível para mentores que adotam IA. Tom visionário com base em dados reais."
    suggested_format: "Storytelling"
```

## Quality Criteria

- Exatamente 5 ângulos distintos
- Cada ângulo com tipo emocional diferente
- Headlines com máximo 15 palavras, impactantes
- Descrição com 2 linhas que explica a abordagem
- Formato de carrossel sugerido e adequado ao tipo

## Veto Conditions

- Menos de 5 ângulos: completar até 5
- Dois ângulos com abordagem muito similar: reescrever um deles com perspectiva diferente
