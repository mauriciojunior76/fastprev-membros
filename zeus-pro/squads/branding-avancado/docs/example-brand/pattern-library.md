# Pattern Library — AXIS
**Agente:** Vex (page-visual-specialist) + Vis (visual-hierarchy-analyst)
**Nível:** N1 — ESSÊNCIA
**Output:** Elementos gráficos, categorias, composições, regras de aplicação

---

## Filosofia de Padrão Visual

AXIS deriva seus elementos gráficos de uma única fonte: o eixo cartesiano.
Dois vetores, um ponto de origem, variação controlada. Não existe ornamento arbitrário no sistema AXIS —
cada elemento tem raiz geométrica no conceito de dado como coordenada em espaço de decisão.

**Influências visuais primárias:**
- Swiss International Style — grid modular, tipografia funcional, sem ornamento incluso
- Bauhaus — construção a partir de formas primárias (ponto, linha, plano)
- Design de interface de instrumentos de precisão — Reuters terminals, cockpit avionics
- Cartografia topográfica — curvas de nível, escala, orientação

**O que diferencia AXIS de SaaS genérico:**
Sistemas SaaS usam formas orgânicas (blobs, gradientes fluidos, bordas arredondadas) para parecer acessíveis.
AXIS usa geometria precisa para comunicar precisão. Cada ângulo é intencional. Cada linha tem espessura definida.

---

## Categoria 1 — FORMAS: O Sistema de Eixos

### 1.1 — Cross Axis (elemento primário)

O símbolo central da marca: dois segmentos de linha intersectando-se a 7° de rotação do eixo padrão.

```
Geometria:
  Segmento horizontal (X): width variável, height 1–3px
  Segmento vertical (Y):   width 1–3px, height variável
  Ponto de interseção:     círculo de 4px (dourado em aplicações decorativas)
  Rotação do conjunto:     7° (identidade, mantida sempre)
  Proporção goldbar:       relação X:Y = 1.618:1 (seção áurea)

Variantes:
  XS:  2px / 2px — uso inline, texto
  S:   1px / 24px horizontal, 32px vertical — detalhes
  M:   2px / 48px × 64px — ícones grandes, divisores
  L:   2px / 120px × 160px — seções de apresentação
  XL:  3px / full-width — hero de slide, fundo decorativo

Cor padrão:  #C9A84C (gold accent)
Cor alt:     rgba(197, 205, 216, 0.24) (ghost — uso como watermark/background)
Cor alt 2:   rgba(74, 159, 212, 0.4) (electric blue — variação de campanha)
```

**Regra de uso:**
Nunca sobrepor dois cross-axis de tamanho similar na mesma área visual.
O elemento maior domina — o menor recua em opacidade.

---

### 1.2 — Coordinate Grid (grade de coordenadas)

Grade cartesiana derivada do logo, usada como elemento de fundo e textura.

```
Estrutura:
  Linhas horizontais:  espaçamento regular (múltiplo de 8px)
  Linhas verticais:    espaçamento regular (mesmo múltiplo)
  Espessura das linhas: 0.5px
  Cor:                 rgba(197, 205, 216, 0.06) — quase invisível

Variantes:
  Dense:   8px entre linhas — fundo de seção de dados
  Medium:  16px entre linhas — fundo de card, slide
  Sparse:  32px entre linhas — fundo de hero, área clara
  Oblique: grade rotacionada 7° — versão de identidade do sistema

Aplicação:
  Sempre como layer, nunca como elemento principal
  Opacity range: 4% a 12%
  Nunca visível sobre texto — usar z-index correto
```

---

### 1.3 — Golden Ratio Circles (círculos proporcionais)

Série de círculos concêntricos em progressão de seção áurea, usados como elemento decorativo estrutural.

```
Série padrão (px):  8, 13, 21, 34, 55, 89
Alternativa (px):   16, 26, 42, 68 (dobro da base)

Aplicação:
  Sempre incompletos — arco parcial (90°–180°), nunca círculo fechado
  Estilo: stroke only, fill transparent
  Cor: rgba(201, 168, 76, 0.15) — ouro muito sutil
  Uso: canto de composição, background de hero de campanha

Nunca usar como:
  - Bullet points (muito ornamental para dado)
  - Decoração de texto running
  - Qualquer elemento que possa ser confundido com ícone funcional
```

---

## Categoria 2 — LINHAS: Sistema de Precisão

### 2.1 — Data Scan Line

Linha horizontal animada que cruza um painel de dados, simulando processo de leitura/atualização.

```
Espessura:        1px
Comprimento:      100% do container
Cor:              rgba(74, 159, 212, 0.6) (electric blue — ativo)
                  rgba(201, 168, 76, 0.4) (gold — alternativo, destaque)
Uso estático:     divisor entre seções de dado homogêneas
Uso animado:      loading indicator em data panels (ver motion-system.md)

Variante pontilhada:
  Dash:           4px on, 4px off
  Uso:            separador de dado projetado vs realizado
  Cor:            rgba(197, 205, 216, 0.3)
```

---

### 2.2 — Precision Hairline

Linha de 0.5px usada como separador de alta precisão.

```
Espessura:        0.5px
Cor padrão:       rgba(197, 205, 216, 0.12)
Cor strong:       rgba(197, 205, 216, 0.24)
Cor accent:       rgba(201, 168, 76, 0.3)

Uso horizontal:   divisor de linhas em tabela, separador de seção em card
Uso vertical:     divisor entre colunas de painel, sidebar separator

Regra:
  Usar hairline (0.5px) para separação estrutural interna de componentes
  Usar border-default (1px) para contorno de componentes
  Nunca combinar hairline e border-1px no mesmo componente (conflito visual)
```

---

### 2.3 — Accent Bar

Barra colorida de destaque, usada para hierarquizar seções ou marcar estado ativo.

```
Versão vertical (sidebar nav):
  Width:          2px
  Height:         24px (ícone)
  Color:          #C9A84C
  Position:       left side do item ativo

Versão horizontal (card título):
  Width:          32px
  Height:         2px
  Color:          #C9A84C
  Position:       acima do título principal do card

Versão larga (seção hero):
  Width:          48px
  Height:         1px
  Color:          #C9A84C
  Position:       acima do H1 em hero sections

Regra:
  Accent bar sempre em ouro — nunca em outra cor
  Máximo 1 accent bar por componente/seção
  Não usar accent bar em elementos secundários (labels, subheadings)
```

---

## Categoria 3 — PADRÕES: Texturas Gráficas

### 3.1 — Circuit Topology Pattern

Padrão inspirado em topologia de circuito impresso, derivado da grade cartesiana com nós.

```
Estrutura:
  Grid base:          32px
  Nós (dots):         2px circle em intersecções selecionadas (não todas)
  Linhas de conexão:  1px, L-shaped (90° only — sem diagonais)
  Densidade visual:   baixa (20% das intersecções têm nó)

Cor:
  Linhas:  rgba(74, 159, 212, 0.08) — electric blue ultra-sutil
  Nós:     rgba(74, 159, 212, 0.16) — um pouco mais visível

Uso:
  Background de seções de conteúdo técnico (API docs, whitepaper)
  Hero de página de produto (nível técnico/integrações)
  Nunca em hero de landing page comercial (é complexo demais)

Variante com ouro:
  Para seções premium/destaque
  Linhas:  rgba(201, 168, 76, 0.06)
  Nós:     rgba(201, 168, 76, 0.12)
```

---

### 3.2 — Number Matrix

Grade de números financeiros aleatórios em tipografia mono, usada como textura de fundo.

```
Fonte:          JetBrains Mono, 11px, weight 400
Conteúdo:       Números decimais de 4-8 dígitos (ex: 1.0342, 98.7621, 0.0087)
                Mistura de positivos e negativos
Cor base:       rgba(197, 205, 216, 0.04) — quase imperceptível
Cor accent:     Algumas células em rgba(201, 168, 76, 0.08) — ouro sutil
Espaçamento:    Line-height 18px, col spacing 48px
Uso:            Background de hero dark, capa de relatório PDF

Renderização:
  Gerar como SVG ou canvas element
  Não usar como texto acessível (aria-hidden="true")
  Animar: vertical scroll lento, 0.5px/s — praticamente imperceptível
```

---

### 3.3 — Axis Grid (padrão de identidade)

Versão da coordinate grid rotacionada 7°, tornando-se padrão de identidade único do AXIS.

```
Grid base:      16px, rotacionado 7°
Espessura:      0.5px
Cor:            rgba(197, 205, 216, 0.06)
Variante ouro:  rgba(201, 168, 76, 0.04) — ainda mais sutil

Diferença vs Coordinate Grid:
  Rotation 7° — quebra o alinhamento esperado, cria tensão visual controlada
  Não usa no alinhamento do conteúdo (o conteúdo segue grid normal 0°)
  Existe como plano de fundo apenas — layer separado

Uso exclusivo:
  Capa de deck/relatório (PDF)
  Hero de landing page institucional
  Background de stories/reels da marca
```

---

## Categoria 4 — ORNAMENTOS: Elementos de Precisão

### 4.1 — Corner Brackets (colchetes de 90°)

Brackets angulares usados para enquadrar elementos de destaque.

```
Estrutura:
  L-shape: duas linhas de 90° exatos
  Espessura: 1.5px
  Comprimento de cada braço: 8px (S), 12px (M), 20px (L)
  Aparência: ┌ e └ e ┐ e ┘

Uso padrão:
  Quadruple bracket (4 cantos) em torno de métrica de destaque:
    ┌─────────────┐
    │  R$ 1.2B    │
    └─────────────┘
  Dois brackets diagonais (topo-esq + baixo-dir) em estado ativo

Cor:
  Default: rgba(201, 168, 76, 0.5)
  Highlight/active: #C9A84C (100% opacidade)
  Ghost: rgba(197, 205, 216, 0.2) — para elementos secundários

Regra:
  Não animar os brackets (ornamento estático — a animação é do conteúdo interno)
  Usar somente 1 grupo de brackets por seção de destaque
  Tamanho M (12px braços) é o padrão; usar L apenas em hero de apresentação
```

---

### 4.2 — Decimal Markers

Ponto decimal como elemento gráfico standalone, marcando precisão e escala.

```
Forma:           círculo preenchido, 3px (S) ou 5px (M)
Cor:             #C9A84C
Uso inline:      Entre valores em sequência: 1.032 · 0.987 · 1.104
Uso decorativo:  Série de 3 pontos como separador de seção (···)
Uso vertical:    Coluna de dots como timeline de dados

Regra:
  Não substituir bullet lists — decimal markers são ornamentais
  Espaçamento mínimo de 12px entre markers em série
  Nunca usar mais de 5 em sequência (vira ruído)
```

---

### 4.3 — Measurement Marks

Marcas de escala derivadas de régua técnica, usadas em contextos de dados de alta precisão.

```
Estrutura:
  Linha principal:    height 12px, width 1px
  Linhas menores:     height 6px, a cada 1/4 da unidade
  Linha menor ainda:  height 3px, a cada 1/8 (opcional)
  Espaçamento:        8px entre marcas maiores

Cor:                rgba(197, 205, 216, 0.3)
Fundo:              nunca em superfície clara

Uso específico:
  Escala lateral de gráficos (não no lugar do eixo Y padrão — adiciona textura)
  Rodapé de relatórios PDF (elemento de assinatura visual)
  Topo de slides de dados (elemento decorativo de régua)
```

---

## Tabela de Aplicação — Por Meio

| Elemento Gráfico | Dashboard UI | Deck/Slides | LinkedIn Post | PDF Report | Email Sig |
|-----------------|:---:|:---:|:---:|:---:|:---:|
| Cross Axis (S/M) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Cross Axis (L/XL) | — | ✓ | ✓ | ✓ | — |
| Coordinate Grid | ✓ | ✓ | — | ✓ | — |
| Golden Ratio Circles | — | ✓ | ✓ | ✓ | — |
| Data Scan Line | ✓ | — | — | — | — |
| Precision Hairline | ✓ | ✓ | — | ✓ | ✓ |
| Accent Bar | ✓ | ✓ | ✓ | ✓ | — |
| Circuit Topology | — | ✓ | — | ✓ | — |
| Number Matrix | — | ✓ | ✓ | ✓ | — |
| Axis Grid (7°) | — | ✓ | ✓ | ✓ | — |
| Corner Brackets | ✓ | ✓ | ✓ | ✓ | — |
| Decimal Markers | ✓ | ✓ | ✓ | ✓ | ✓ |
| Measurement Marks | — | ✓ | — | ✓ | — |

---

## 3 Composições Exemplares

### Composição 1 — Hero Background (Dashboard)

**Cenário:** Fundo da seção hero da interface principal do AXIS

```
Camadas (ordem de baixo para cima):

LAYER 1 — Base:
  Cor sólida: #0A1628 (navy)
  100% opacidade

LAYER 2 — Axis Grid:
  Coordinate grid rotacionada 7°
  Cor: rgba(197, 205, 216, 0.05)
  Cobre 100% da área

LAYER 3 — Number Matrix:
  Bloco de texto mono no canto inferior esquerdo (30% da largura)
  Cor: rgba(197, 205, 216, 0.04)
  Gradiente de opacidade: 100% no canto → 0% em fade para direita

LAYER 4 — Radial glow:
  Gradiente radial, origem no centro-direito
  De: rgba(74, 159, 212, 0.08)
  Para: transparent
  Radius: 600px

LAYER 5 — Cross Axis XL:
  Posição: 80% horizontal, 50% vertical
  Rotação padrão (7°)
  Cor: rgba(201, 168, 76, 0.12)
  Dimensão: 160px × 240px

LAYER 6 — Hairline divisor:
  Horizontal, 100% width, na base da hero section
  Cor: rgba(197, 205, 216, 0.12)

Conteúdo (sobre todos os layers):
  Logo + Tagline + CTA — z-index máximo, sem efeito de transparência
```

---

### Composição 2 — Slide Background (Deck de Apresentação)

**Cenário:** Slide de dados — gráfico de portfólio

```
Camadas:

LAYER 1 — Base:
  Gradiente linear suave:
  #0A1628 (100%) → #0D1D30 (0%) — quase imperceptível
  Direção: 135°

LAYER 2 — Axis Grid sparse:
  32px entre linhas, 0°
  Cor: rgba(197, 205, 216, 0.04)

LAYER 3 — Accent element (topo esquerdo):
  Corner bracket L, dourado 50% opacidade
  Tamanho: 20px braços
  Posição: 48px from top, 64px from left

LAYER 4 — Accent Bar (título):
  48px × 1px, gold, acima do título

LAYER 5 — Hairline horizontal:
  Separa header do corpo do slide
  Cor: rgba(197, 205, 216, 0.12)
  Posição: 80px from top

Conteúdo:
  Área de dado (gráfico): 70% da largura
  Sidebar de contexto: 30% da largura, background #1C2B3A
```

---

### Composição 3 — Instagram Post (Feed Editorial)

**Cenário:** Post 1:1, 1080×1080px, fundo escuro editorial

```
Camadas:

LAYER 1 — Base:
  Cor sólida: #0A1628

LAYER 2 — Noise texture (sutil):
  SVG noise, 3% opacidade — adiciona profundidade a tela sólida

LAYER 3 — Number Matrix (canto superior direito):
  Bloco 40% × 40% da imagem
  Cor: rgba(197, 205, 216, 0.05)
  Gradiente: fade para dentro da imagem

LAYER 4 — Diagonal hairlines:
  2-3 linhas em 7° (rotação de marca)
  Cor: rgba(201, 168, 76, 0.08)
  Espaçadas em 200px

LAYER 5 — Cross Axis M:
  Canto inferior esquerdo
  Cor: rgba(201, 168, 76, 0.3) — mais visível que nos outros meios
  (post de rede social — leitura mais rápida, elementos mais definidos)

Zona de conteúdo:
  Centro 60% da imagem — texto, dado ou stat em destaque
  Padding de segurança: 80px em todos os lados
  (considerar recorte de feed e stories)
```

---

## Regras de Cor para Elementos Gráficos

| Contexto | Cor do Elemento | Opacidade Range |
|----------|----------------|----------------|
| Fundo escuro (padrão) | `rgba(197, 205, 216, X)` | 4% – 12% |
| Fundo escuro + destaque | `rgba(201, 168, 76, X)` | 8% – 30% |
| Fundo escuro + tech | `rgba(74, 159, 212, X)` | 6% – 20% |
| Sobre card #1C2B3A | `rgba(197, 205, 216, X)` | 6% – 16% |
| Fundo claro (alternativo) | `rgba(10, 22, 40, X)` | 4% – 10% |
| Elemento de assinatura (marca) | `#C9A84C` | 40% – 100% |

**Regra absoluta:**
Elementos gráficos NUNCA em 100% de opacidade sobre fundos (exceto accent bar e corner brackets em estado ativo).
Sempre são elementos de atmosfera, nunca de conteúdo.

---

## Escala de Aplicação — Tamanho do Padrão

| Contexto | Escala | Motivo |
|----------|--------|--------|
| Ícone / Avatar (32-64px) | Não usar padrão | Área insuficiente — degradaria para ruído |
| Card (200-400px) | XS — grid 8px, hairlines only | Manter leiturabilidade do dado |
| Panel / Seção (400-800px) | S — grid 16px, accent elements pontuais | Criar atmosfera sem competir com dado |
| Hero / Full-width (800px+) | M — grid 32px, cross axis visível | Padrão de identidade completo |
| Impressão A4 (595×842pt) | L — grid 48pt, número matrix | Alta resolução permite maior detalhe |
| Print grande / Totem | XL — todos os elementos, escala 2× | Impacto visual a distância |

---

*Produzido por: Vex (page-visual-specialist) + Vis (visual-hierarchy-analyst) — BRAND SQUAD SUPREMO*
*Nível: N1 ESSÊNCIA | Projeto: AXIS | Data: 2026-03-05*
