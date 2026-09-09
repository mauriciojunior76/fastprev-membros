---
name: "Criar Carrossel"
order: 2
input: "Ângulo selecionado pelo usuário + notícia original"
output: "Carrossel completo: slides + legenda + hashtags"
format: instagram-feed
---

## Process

1. Ler o ângulo selecionado e o formato de carrossel sugerido
2. Estruturar 8 a 10 slides seguindo o flow do formato escolhido
3. Para cada slide, escrever:
   a. Headline (texto grande, bold): claim principal ou ponto do slide
   b. Supporting text (texto menor): dados, contexto ou elaboração
   c. Direção visual: foto/ilustração, cor de fundo, keywords de destaque
4. Garantir que cada slide tem entre 40 e 80 palavras total
5. Alternar cores de fundo: claro, escuro, accent
6. Escrever legenda completa:
   a. Hook (primeiros 125 caracteres que obrigue tap em "mais")
   b. Corpo (argumento expandido com quebras de linha)
   c. Pergunta final (provocativa, aberta)
   d. CTA claro
7. Criar 5 a 15 hashtags (mix nicho + médio + amplo)

## Output Format

```
=== FORMAT ===
[Nome do formato escolhido]

=== SLIDES ===
Slide 1 (Cover):
  Title: [máx 20 palavras]
  Photo: [direção visual]
  Background: [cor/tipo]

Slide 2 ([Papel]):
  Headline: [texto grande]
  Supporting text: [texto menor]
  Accent keywords: [palavras destacadas]
  Background: [light/dark/accent]

... (até 10 slides)

Slide N (CTA):
  Headline: [chamada final]
  CTA: [ação específica]

=== CAPTION ===
[Hook - 125 chars]

[Corpo]

[Pergunta final]

=== HASHTAGS ===
#tag1 #tag2 #tag3 ...
```

## Output Example

```
=== FORMAT ===
Editorial / Tese (10 slides)

=== SLIDES ===
Slide 1 (Cover):
  Title: 5 sinais de que a IA vai mudar sua mentoria em 2026
  Photo: mentor usando laptop com gráficos de IA na tela, ambiente profissional
  Background: dark gradient com overlay azul

Slide 2 (Contexto):
  Headline: 73% dos mentores com IA fecham o dobro de clientes
  Supporting text: Estudo recente com 1.200 mentores brasileiros revelou que quem usa inteligência artificial no processo de vendas e atendimento dobrou a taxa de conversão em apenas 6 meses. O dado é claro.
  Accent keywords: "73%", "dobro de clientes", "6 meses"
  Background: light

=== CAPTION ===
73% dos mentores que usam IA estão fechando o DOBRO de clientes. E você?

Esse dado não é achismo. Um estudo com 1.200 mentores brasileiros mostrou que automação de follow-up e personalização com IA reduziu o ciclo de vendas em 40%.

Mas não é sobre ter IA. É sobre saber COMO usar.

No carrossel de hoje, separei os 5 sinais de que a inteligência artificial vai transformar o mercado de mentoria. Se você é mentor, precisa ver isso.

Qual sinal mais te surpreendeu? Comenta aqui.

=== HASHTAGS ===
#mentoria #mentoriaonline #mentorderesultados #iaparamentores #inteligenciaartificial #marketingdigital #vendasonline #infoprodutos #empreendedorismo #automação
```

## Quality Criteria

- 8 a 10 slides completos
- Formato de carrossel explicitamente declarado
- Cover com título de máximo 20 palavras
- Cada slide com headline + supporting text (2 camadas)
- Cada slide entre 40 e 80 palavras
- Cores alternadas entre slides
- Legenda com hook nos primeiros 125 caracteres
- Legenda com pergunta final ou CTA
- 5 a 15 hashtags

## Veto Conditions

- Algum slide com menos de 40 palavras: expandir texto de suporte
- Algum slide com mais de 80 palavras: reduzir mantendo a essência
- Legenda sem hook claro nos primeiros 125 caracteres: reescrever abertura
