# UI Guidelines — AXIS
**Agente:** Rio (ui-standards) + Vex (page-visual-specialist) + Breeze (responsive-guard)
**Nível:** N1 — ESSÊNCIA
**Output:** Princípios UI, Grid, Spacing, Componentes, Tokens, Estados

---

## 4 Princípios de UI

### Princípio 1 — Informação Antes de Forma
**Definição:** Toda decisão visual começa com a pergunta: "O dado fica mais legível?" Estética serve a legibilidade, nunca o contrário.

**Exemplo correto:** Tabela de dados com tipografia monoespaçada alinhada à direita para colunas numéricas, sem cell padding excessivo que reduza densidade de informação visível.

**Violação:** Gráfico de pizza com cores saturadas e animação de entrada para "mostrar dinamismo" — o dado fica mais difícil de comparar, não mais claro.

---

### Princípio 2 — Hierarquia Sem Ruído
**Definição:** Cada tela tem exatamente um foco primário. Elementos secundários recuam — não somem, mas não competem.

**Exemplo correto:** Dashboard com um KPI primário em Canela 48px off-white, quatro KPIs secundários em Space Grotesk 22px cinza-secundário. Hierarquia clara sem linha separadora ou box.

**Violação:** Cinco KPIs no mesmo tamanho e cor. O olho não sabe onde ir. O sistema "ajuda" adicionando ícones coloridos — o ruído aumenta.

---

### Princípio 3 — Densidade Intencional
**Definição:** AXIS é denso por design — gestores de fundo querem ver muito dado, sem scroll. A densidade é controlada por espaçamento preciso, não reduzida.

**Exemplo correto:** Tabela em modo compact (32px row height) para telas de monitoramento onde o gestor precisa ver 20 posições sem scroll. Modo comfortable (48px) para revisão individual de ativo.

**Violação:** Tabela com padding generoso "para respirar melhor" que força scroll para ver 8 posições em uma tela de 1440px. O gestor perde contexto.

---

### Princípio 4 — Estado Como Comunicação
**Definição:** Cada estado de componente (hover, focus, loading, error) carrega informação precisa. Estados não existem apenas para feedback visual — existem para comunicar o que o sistema está fazendo.

**Exemplo correto:** Loading state de card de dados usa skeleton progressivo que revela a estrutura antes do dado — o gestor sabe o que vai aparecer antes de aparecer.

**Violação:** Spinner genérico no centro da tela. O gestor não sabe se o sistema está carregando dados de mercado, calculando risco ou simplesmente falhando silenciosamente.

---

## Grid System

### Desktop — 12 Colunas

```
Container max-width:  1440px
Colunas:              12
Gutter (gap):         24px
Margem lateral:       48px (mínimo) → 80px (1440px+)
Coluna width:         calc((100% - 48px × 11 - 96px) / 12)

Breakpoints:
  xl:  ≥ 1440px  (full layout — dashboard, multi-panel)
  lg:  ≥ 1280px  (padrão — 12 col ativo)
  md:  ≥ 1024px  (transição — layout simplifica)
```

**Uso padrão no dashboard:**
- Sidebar: 2 cols fixas (240px)
- Main content: 7 cols
- Right panel (watchlist/alerts): 3 cols

**Uso em landing page:**
- Hero: 12 cols (full bleed background, content 8 cols centrado)
- Features: grid 4+4+4 (3 cards)
- CTA: 6 cols centrado

---

### Tablet — 8 Colunas

```
Container max-width:  1024px
Colunas:              8
Gutter (gap):         20px
Margem lateral:       32px
Breakpoint:           768px – 1023px
```

**Comportamento:**
- Sidebar colapsa em hamburger overlay
- Painéis side-by-side viram stack (2 cols → full width)
- Tabela de dados mantém density compact com scroll horizontal

---

### Mobile — 4 Colunas

```
Container max-width:  100%
Colunas:              4
Gutter (gap):         16px
Margem lateral:       20px
Breakpoint:           < 768px
```

**Comportamento:**
- Dashboard AXIS não é projetado para entrada de dados em mobile
- Mobile exibe modo leitura: portfolio summary, alertas, KPIs críticos
- Tabelas viram cards de linha única com dado principal destacado
- Ações destrutivas bloqueadas em mobile (requer desktop)

---

## Spacing Scale — Base 4px

| Token | Value | Uso Primário |
|-------|-------|-------------|
| `space-1` | 4px | Gap entre label e campo, ícone e texto |
| `space-2` | 8px | Padding interno de badge/tag, gap entre chips |
| `space-3` | 12px | Padding interno de input, gap entre items de lista |
| `space-4` | 16px | Padding de card compacto, gap entre campos de form |
| `space-5` | 20px | Gap padrão entre componentes irmãos |
| `space-6` | 24px | Padding de card standard, gutter de grid tablet |
| `space-8` | 32px | Padding de card large, margem entre seções |
| `space-12` | 48px | Margem lateral desktop, espaço entre blocos maiores |
| `space-16` | 64px | Seção hero padding vertical, separação de blocos macro |

**Regra de aplicação:**
- Componentes internos: `space-1` a `space-4`
- Entre componentes: `space-5` a `space-8`
- Entre seções: `space-12` a `space-16`
- Nunca usar valores fora da escala (ex: 10px, 15px, 22px)

---

## Especificações de Componentes

### Primary Button

```
Background:       #C9A84C (gold accent)
Text:             #0A1628 (navy — texto escuro sobre dourado)
Font:             Space Grotesk, 14px, weight 600
Letter-spacing:   0.05em (wide)
Text-transform:   uppercase
Height:           40px
Padding:          0 20px
Border-radius:    2px (AXIS: sem arredondamento excessivo)
Border:           none

HOVER:
  Background:     #E4C87A (light gold)
  Transition:     background 150ms ease-out

FOCUS:
  Outline:        2px solid #C9A84C
  Outline-offset: 2px

ACTIVE:
  Background:     #B8943C (gold escuro)
  Transform:      scale(0.98)

DISABLED:
  Background:     #4A5568
  Text:           #2D3748
  Cursor:         not-allowed

LOADING:
  Background:     #C9A84C
  Text:           transparent
  Loader:         spinner 16px dourado centralizado
```

---

### Secondary Button

```
Background:       transparent
Text:             #C9A84C (gold)
Font:             Space Grotesk, 14px, weight 600
Letter-spacing:   0.05em
Height:           40px
Padding:          0 20px
Border:           1px solid rgba(201, 168, 76, 0.4)
Border-radius:    2px

HOVER:
  Background:     rgba(201, 168, 76, 0.08)
  Border-color:   #C9A84C
  Transition:     all 150ms ease-out

FOCUS:
  Outline:        2px solid #C9A84C
  Outline-offset: 2px

ACTIVE:
  Background:     rgba(201, 168, 76, 0.15)

DISABLED:
  Text:           #4A5568
  Border-color:   rgba(74, 85, 104, 0.4)
  Cursor:         not-allowed
```

---

### Ghost Button

```
Background:       transparent
Text:             #C5CDD8 (gray-200 — texto secundário)
Font:             Space Grotesk, 14px, weight 500
Height:           40px
Padding:          0 16px
Border:           none
Border-radius:    2px

HOVER:
  Background:     rgba(197, 205, 216, 0.06)
  Text:           #F5F7FA
  Transition:     all 150ms ease-out

FOCUS:
  Outline:        2px solid rgba(197, 205, 216, 0.4)
  Outline-offset: 2px

ACTIVE:
  Background:     rgba(197, 205, 216, 0.1)

DISABLED:
  Text:           #4A5568
  Cursor:         not-allowed
```

---

### Card — Dark (padrão)

```
Background:       #1C2B3A (graphite)
Border:           1px solid rgba(197, 205, 216, 0.12)
Border-radius:    4px
Padding:          24px
Shadow:           0 4px 12px rgba(0, 0, 0, 0.4)

HOVER:
  Background:     #243344 (card-hover)
  Border-color:   rgba(197, 205, 216, 0.24)
  Shadow:         0 8px 24px rgba(0, 0, 0, 0.5)
  Transition:     all 200ms ease-out

ACTIVE (clickable card):
  Transform:      scale(0.995)

SELECTED:
  Border-color:   rgba(201, 168, 76, 0.4)
  Border-width:   1px
  Box-shadow:     0 0 0 1px rgba(201, 168, 76, 0.2)

ERROR:
  Border-color:   rgba(231, 76, 60, 0.4)

LOADING:
  Background:     skeleton gradient animado (ver motion-system.md)
```

---

### Card — Light (modo claro, uso alternativo)

```
Background:       #F5F7FA
Border:           1px solid rgba(28, 43, 58, 0.12)
Border-radius:    4px
Padding:          24px
Shadow:           0 2px 8px rgba(10, 22, 40, 0.08)
Text:             #0A1628 (navy)

HOVER:
  Shadow:         0 4px 16px rgba(10, 22, 40, 0.12)
  Transition:     shadow 200ms ease-out
```

---

### Input

```
Background:       #0D1D30 (sidebar — mais escuro que card)
Border:           1px solid rgba(197, 205, 216, 0.12)
Border-radius:    2px
Height:           40px
Padding:          0 12px
Font:             Space Grotesk, 14px, weight 400
Color:            #F5F7FA
Placeholder:      #8A96A8

FOCUS:
  Border-color:   #C9A84C
  Outline:        none
  Box-shadow:     0 0 0 3px rgba(201, 168, 76, 0.12)

HOVER (unfocused):
  Border-color:   rgba(197, 205, 216, 0.24)

FILLED:
  Border-color:   rgba(197, 205, 216, 0.24)

ERROR:
  Border-color:   #E74C3C
  Box-shadow:     0 0 0 3px rgba(231, 76, 60, 0.12)
  + Error message: Space Grotesk 12px #E74C3C, margin-top 4px

SUCCESS:
  Border-color:   #2ECC71
  + Checkmark icon: 16px verde na direita

DISABLED:
  Background:     rgba(13, 29, 48, 0.5)
  Color:          #4A5568
  Cursor:         not-allowed
  Border-color:   rgba(197, 205, 216, 0.06)

LOADING:
  Spinner 14px à direita, gold
```

---

### Hero Section

```
Background:       #0A1628 (navy — full width)
Min-height:       640px (desktop), 480px (tablet), 400px (mobile)
Padding vertical: 96px (desktop), 64px (tablet), 48px (mobile)
Layout:           12 cols → content 8 cols centrado

Heading (H1):
  Font:           Canela, 72px, weight 300 (light — Canela é elegante em light)
  Color:          #F5F7FA
  Line-height:    1.1
  Letter-spacing: -0.02em
  Max-width:      720px

Subheading:
  Font:           Space Grotesk, 20px, weight 400
  Color:          #C5CDD8 (gray-200)
  Line-height:    1.6
  Max-width:      560px
  Margin-top:     24px

CTA group:
  Margin-top:     40px
  Gap:            12px
  Display:        flex, row

Accent element:
  Linha horizontal ouro (#C9A84C, 1px, width 48px) acima do heading
  Margin-bottom: 24px
  Representa o eixo X da identidade
```

---

### Tag / Badge

```
PADRÃO:
  Background:     rgba(197, 205, 216, 0.08)
  Border:         1px solid rgba(197, 205, 216, 0.16)
  Color:          #C5CDD8
  Font:           Space Grotesk, 11px, weight 600
  Letter-spacing: 0.08em
  Text-transform: uppercase
  Padding:        2px 8px
  Border-radius:  2px
  Height:         20px

VARIANTES DE STATUS:
  success:  bg rgba(46, 204, 113, 0.1), border rgba(46,204,113,0.3), text #2ECC71
  warning:  bg rgba(243, 156, 18, 0.1), border rgba(243,156,18,0.3), text #F39C12
  error:    bg rgba(231, 76, 60, 0.1),  border rgba(231,76,60,0.3),  text #E74C3C
  gold:     bg rgba(201, 168, 76, 0.1), border rgba(201,168,76,0.3), text #C9A84C
  info:     bg rgba(74, 159, 212, 0.1), border rgba(74,159,212,0.3), text #4A9FD4

ESTADOS:
  Sem hover interativo por padrão (badge é display, não ação)
  Se clicável: cursor pointer + hover bg 1.5x opacity
```

---

### Data Table — AXIS Financial

Componente específico para exibição de dados financeiros. Difere de tabelas genéricas.

```
CONTAINER:
  Background:     #1C2B3A
  Border:         1px solid rgba(197, 205, 216, 0.12)
  Border-radius:  4px
  Overflow:       hidden

HEADER ROW:
  Height:         36px
  Background:     rgba(10, 22, 40, 0.4) — mais escuro que body
  Font:           Space Grotesk, 11px, weight 600, uppercase
  Letter-spacing: 0.08em
  Color:          #8A96A8 (gray-300)
  Border-bottom:  1px solid rgba(197, 205, 216, 0.16)
  Padding:        0 16px

DATA ROW — COMPACT (default para dashboards):
  Height:         32px
  Padding:        0 16px
  Border-bottom:  1px solid rgba(197, 205, 216, 0.06)

DATA ROW — COMFORTABLE (para review detalhado):
  Height:         48px
  Padding:        0 16px

DATA ROW — SPACIOUS (para relatórios):
  Height:         64px
  Padding:        0 24px

ROW HOVER:
  Background:     rgba(36, 51, 68, 0.8)
  Cursor:         pointer (se expandível)
  Transition:     background 100ms ease-out

ROW SELECTED:
  Background:     rgba(201, 168, 76, 0.06)
  Border-left:    2px solid #C9A84C

COLUNAS NUMÉRICAS:
  Font:           JetBrains Mono, 13px, weight 400
  Text-align:     right
  Color:          #F5F7FA

COLUNAS DE VARIAÇÃO POSITIVA:
  Color:          #2ECC71
  + Seta up: ▲ 10px, inline

COLUNAS DE VARIAÇÃO NEGATIVA:
  Color:          #E74C3C
  + Seta down: ▼ 10px, inline

COLUNAS DE TEXTO:
  Font:           Space Grotesk, 13px, weight 400
  Color:          #C5CDD8
  Text-align:     left

COLUNA DE TICKER / SÍMBOLO:
  Font:           JetBrains Mono, 13px, weight 600
  Color:          #F5F7FA (primário — mais visível)

LOADING STATE (linha):
  Substituir célula por skeleton bar:
  Background gradient: linear-gradient(90deg, #1C2B3A 25%, #243344 50%, #1C2B3A 75%)
  Background-size: 200% 100%
  Animation:      shimmer 1.5s infinite

EMPTY STATE:
  Padding: 48px 24px
  Texto centralizado: JetBrains Mono 13px #8A96A8
  "— sem dados para este período —"

SORT INDICATOR:
  Coluna ativa: header color #C9A84C + ↑ ou ↓ 10px
  Coluna inativa: header normal com ↕ em #4A5568

PAGINATION:
  Font: Space Grotesk 12px
  Color: #8A96A8
  Active page: #C9A84C
  Arrows: Ghost button 32px square
```

---

## Dark Mode / Light Mode — Token Mapping

AXIS é **dark-first**. O modo claro é alternativo, utilizado apenas em contextos de impressão ou ambientes com luz intensa.

| Token Semântico | Dark (Default) | Light (Alternativo) |
|----------------|---------------|---------------------|
| `surface-page` | `#0A1628` | `#F5F7FA` |
| `surface-card` | `#1C2B3A` | `#FFFFFF` |
| `surface-card-hover` | `#243344` | `#F0F2F5` |
| `surface-sidebar` | `#0D1D30` | `#E8ECF0` |
| `text-primary` | `#F5F7FA` | `#0A1628` |
| `text-secondary` | `#C5CDD8` | `#4A5568` |
| `text-tertiary` | `#8A96A8` | `#8A96A8` |
| `text-accent` | `#C9A84C` | `#B8943C` (dourado mais escuro para contraste) |
| `border-default` | `rgba(197,205,216,0.12)` | `rgba(28,43,58,0.12)` |
| `border-strong` | `rgba(197,205,216,0.24)` | `rgba(28,43,58,0.24)` |
| `border-accent` | `rgba(201,168,76,0.4)` | `rgba(201,168,76,0.6)` |
| `border-focus` | `#C9A84C` | `#B8943C` |
| `semantic-success` | `#2ECC71` | `#27AE60` |
| `semantic-error` | `#E74C3C` | `#C0392B` |
| `semantic-warning` | `#F39C12` | `#D68910` |
| `semantic-info` | `#4A9FD4` | `#2980B9` |

**Implementação em CSS:**

```css
:root {
  /* Dark default */
  --surface-page: #0A1628;
  --surface-card: #1C2B3A;
  --text-primary: #F5F7FA;
  --text-secondary: #C5CDD8;
  --accent: #C9A84C;
}

[data-theme="light"] {
  --surface-page: #F5F7FA;
  --surface-card: #FFFFFF;
  --text-primary: #0A1628;
  --text-secondary: #4A5568;
  --accent: #B8943C;
}
```

---

## Data Visualization Colors

Para gráficos, charts e sparklines. Paleta ordenada por prioridade de uso.

| Índice | Nome | Hex | Uso |
|--------|------|-----|-----|
| 1 | Electric Blue | `#4A9FD4` | Série principal, linha de portfólio |
| 2 | Gold | `#C9A84C` | Benchmark, linha de referência |
| 3 | Emerald | `#2ECC71` | Dados positivos, comparação favorável |
| 4 | Coral | `#E74C3C` | Dados negativos, alerta |
| 5 | Lavender | `#8B7FD4` | Série terciária, comparação histórica |
| 6 | Amber | `#F39C12` | Volatilidade, dado de atenção |
| 7 | Teal | `#1ABC9C` | Dado neutro-positivo, hedge |
| 8 | Steel | `#95A5A6` | Dado inativo, dado histórico distante |

**Regras de data viz:**
- Nunca usar mais de 5 séries em um gráfico sem agrupamento
- Linha de benchmark sempre em Gold (#C9A84C)
- Área sob a curva: 12% de opacidade da cor da série
- Grid lines: `rgba(197, 205, 216, 0.08)` — quase invisíveis
- Axis labels: JetBrains Mono, 11px, #8A96A8

---

*Produzido por: Rio (ui-standards) + Vex (page-visual-specialist) + Breeze (responsive-guard) — BRAND SQUAD SUPREMO*
*Nível: N1 ESSÊNCIA | Projeto: AXIS | Data: 2026-03-05*
