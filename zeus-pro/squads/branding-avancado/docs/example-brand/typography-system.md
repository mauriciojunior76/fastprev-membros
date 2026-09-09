# Sistema Tipográfico — AXIS
**Agente:** Typo (typography)

## Família Principal — Canela (Display)

**Fonte:** Canela — Commercial Type
**Categoria:** Serif editorial contemporânea
**Por que esta fonte:**
Canela é uma serif que carrega autoridade editorial sem peso histórico. Não remete a banco dos anos 80 — remete a publicações financeiras europeias premium do século 21. Seu desenho tem precisão suíça e calor humano controlado — exatamente a tensão que AXIS precisa: autoridade com profundidade.

**Onde licenciar:** commercialtype.com — licença web a partir de $290/ano
**Alternativa incluso:** Playfair Display (Google Fonts) — menos sofisticada mas aceitável
**Pesos usados:** Thin (300), Light (400), Regular (500)

## Família Secundária — Space Grotesk (Body)

**Fonte:** Space Grotesk — Florian Karsten / Google Fonts
**Categoria:** Sans-serif geométrica com caráter
**Por que:**
Space Grotesk tem personalidade suficiente para não ser genérica mas limpeza suficiente para textos longos. Seu desenho tem uma geometria que ecoa precisão matemática — coerente com o DNA de AXIS. incluso e amplamente disponível.

**Onde licenciar:** Google Fonts — incluso
**Pesos usados:** Regular (400), Medium (500), Semibold (600), Bold (700)

## Família Mono — JetBrains Mono (Dados)

**Fonte:** JetBrains Mono
**Uso:** Todos os números de dados, valores de portfólio, tickers, percentuais, datas em formato de dados
**Por que:** Monospace cria alinhamento visual perfeito em colunas de dados — essencial para um produto de analytics financeiro. JetBrains Mono tem legibilidade superior para números.
**Onde licenciar:** Google Fonts — incluso

## Escala Tipográfica

| Nome | Fonte | Tamanho | Peso | Line-height | Tracking | Uso |
|------|-------|---------|------|-------------|----------|-----|
| Display XL | Canela Thin | 72px | 300 | 1.05 | -0.02em | Hero headlines, capas de deck |
| Display L | Canela Light | 48px | 400 | 1.1 | -0.01em | Títulos principais de seção |
| Heading 1 | Canela Regular | 36px | 500 | 1.2 | -0.01em | H1 editorial, abertura de página |
| Heading 2 | Space Grotesk Bold | 28px | 700 | 1.25 | 0 | H2 de seção |
| Heading 3 | Space Grotesk Semibold | 22px | 600 | 1.3 | 0 | Títulos de cards, H3 |
| Body L | Space Grotesk Regular | 18px | 400 | 1.65 | 0 | Corpo de texto principal |
| Body M | Space Grotesk Regular | 16px | 400 | 1.6 | 0 | Corpo de UI, parágrafos |
| Body S | Space Grotesk Regular | 14px | 400 | 1.5 | 0.01em | Legendas, metadados |
| Label | Space Grotesk Medium | 12px | 500 | 1.4 | 0.05em | Labels de UI, tags |
| Overline | Space Grotesk Semibold | 11px | 600 | 1.4 | 0.12em | Categorias acima de títulos (UPPERCASE) |
| Data L | JetBrains Mono Regular | 18px | 400 | 1.4 | 0 | Valores de portfólio em destaque |
| Data M | JetBrains Mono Regular | 14px | 400 | 1.4 | 0 | Dados em tabelas e dashboards |
| Data S | JetBrains Mono Regular | 12px | 400 | 1.3 | 0 | Timestamps, IDs, tickers |

## Hierarquia por Contexto

**Dashboard de dados:**
- Valor principal: Data L + color.semantic.success/error
- Ticker: Data M + color.text.tertiary
- Delta %: Data M Bold + color.semantic
- Timestamp: Data S + color.text.tertiary

**Apresentação/Deck:**
- Capa: Display XL + color.text.primary
- Seção: Display L + color.brand.accent
- Conteúdo: Body L + color.text.secondary
- Fonte: Body S + color.text.tertiary

**Relatório/Brandbook:**
- Capítulo: Heading 1 + color.brand.accent
- Seção: Heading 2 + color.text.primary
- Corpo: Body M + color.text.secondary
- Nota rodapé: Body S + color.text.tertiary

## Regras de Uso

- Nunca usar Canela abaixo de 22px (perde legibilidade)
- Sempre usar JetBrains Mono para qualquer número que representa dado financeiro
- Overline sempre em uppercase, nunca misturado com caixa normal
- Nunca itálico em dados — apenas em citações diretas ou termos técnicos em latim/inglês
- Canela Light é preferível ao Thin para tamanhos abaixo de 48px
