# Presentation Structure — AXIS
**Agente:** Slide Agent (brand-deck-builder) + Vera (copywriter)
**Nível:** N1 — ESSÊNCIA (adaptável a N2/N3 com adição de slides)
**Output:** Estrutura completa de 20 slides — deck institucional/comercial
**Voz:** Autoritativa, analítica, zero ruído — como gestores falam entre si

---

## Visão Geral do Deck

**Nome do deck:** AXIS — Plataforma Analítica para Gestoras de Fundos
**Versão:** 1.0 — Uso comercial e institucional
**Total de slides:** 20
**Duração estimada:** 18-22 minutos (apresentado), 8 minutos (self-guided)
**Dimensão:** 1920 × 1080px (16:9)

**Narrativa central:**
O deck segue a estrutura: Problema → Posicionamento → Sistema → Confiança → Ação.
Não há "apresentação da empresa" tradicional. Começa com o problema do prospect, não com a história da empresa.

---

## Slide 1 — COVER

**Título do slide:** AXIS
**Layout type:** Full bleed, dividido em dois terços

```
BACKGROUND:
  Layer base: #0A1628 navy solid
  Axis Grid 7°, sparse: rgba(197,205,216,0.04)
  Number Matrix: canto inferior direito, 35% da área, 6% opacidade
  Cross Axis XL: 75% H × 50% V, rgba(201,168,76,0.10)
  Radial glow: superior esquerdo, rgba(201,168,76,0.06), radius 600px

CONTEÚDO — ZONA ESQUERDA (55% da largura):
  Padding: 80px left, 80px top

  Accent bar:
    Tipo: horizontal line
    Dimensão: 48px × 1px
    Cor: #C9A84C
    Margin-bottom: 24px

  Logo:
    Versão: horizontal completo
    Símbolo: 40px com acento dourado
    Wordmark: Canela 28px, #F5F7FA

  H1 (título do deck):
    Texto: "Cada posição do seu portfólio ancorada em dado real."
    Fonte: Canela, 52px, weight 300, line-height 1.1
    Cor: #F5F7FA
    Max-width: 580px
    Letter-spacing: -0.02em
    Margin-top: 48px

  H2 (subtítulo):
    Texto: "Plataforma analítica para gestoras de fundos de investimento"
    Fonte: Space Grotesk, 16px, weight 400
    Cor: #C5CDD8
    Margin-top: 16px

  Footer:
    Texto: "AXIS — Confidencial — Março 2026 — v1.0"
    Fonte: JetBrains Mono, 10px
    Cor: rgba(245,247,250,0.35)
    Position: bottom 48px

CONTEÚDO — ZONA DIREITA (45% da largura):
  Elemento visual: Cross Axis L centralizado
  Cor: rgba(201,168,76,0.15)
  Corner bracket: inferior direito, 20px braços, #C9A84C 40%

ANIMATION:
  Accent bar: fade-in, 0ms delay, 150ms
  Logo: fade-in, 100ms delay, 200ms
  H1: fade-in + translateY(8px → 0), 200ms delay, 350ms
  H2: fade-in, 400ms delay, 200ms
  Cross Axis visual: fade-in, 600ms delay, 400ms
```

**Design notes:** Este slide ficará na tela enquanto o apresentador faz a abertura — deve sustentar 2-3 minutos de presença. A ausência de informação densa é intencional: o prospect precisa de tempo para absorver a proposta do H1.

---

## Slide 2 — MANIFESTO

**Título do slide:** *(sem título visível — o manifesto é o conteúdo)*
**Layout type:** Texto centrado, fundo escuro, silêncio visual

```
BACKGROUND:
  #0A1628 sólido
  Hairline horizontal: 1px, #C9A84C, na posição 30% do topo (acima do texto)
  Hairline horizontal: 1px, rgba(197,205,216,0.12), na posição 70% (abaixo)

CONTEÚDO — Centrado horizontal e verticalmente:
  Padding: 120px todos os lados

  Manifesto (linhas separadas):
    Fonte: Canela, 28px, weight 300, italic, line-height 1.7
    Cor: #F5F7FA
    Max-width: 780px
    Alinhamento: centrado

    Linha 1: "Dados não pedem licença."
    [pausa visual — linha em branco]
    Linha 3: "Não chegam quando é conveniente,"
    Linha 4: "não esperam a reunião terminar."
    [pausa visual]
    Linha 6: "AXIS existe para gestores que sabem"
    Linha 7: "que uma decisão errada não é uma lição —"
    Linha 8: "é uma perda."
    [pausa visual]
    Linha 10 (em ouro): "Dados que não mentem."
    Fonte linha 10: Canela, 28px, weight 300, #C9A84C

  Logo pequeno (canto inferior direito):
    Símbolo isolado, 16px, rgba(245,247,250,0.3)

ANIMATION:
  Linhas aparecem em sequência: cada linha com 80ms de delay entre si
  Fade-in individual, 200ms cada
  Linha 10 (tagline): fade-in + leve scale 0.98 → 1, delay após as outras, 300ms
```

**Design notes:** Nenhum gráfico, nenhum bullet point. Presenters devem ler o manifesto em voz alta enquanto ele aparece progressivamente. Pausa de 3 segundos antes de avançar após a tagline aparecer.

---

## Slide 3 — THE PROBLEM

**Título do slide:** "O dado que você está vendo agora pode estar errado."
**Layout type:** Impact statement + dado de evidência

```
BACKGROUND:
  #0A1628 com axis grid muito sutil

CONTEÚDO — Layout assimétrico (60/40):

  ZONA ESQUERDA (60%):
    H1 (statement do problema):
      Texto: "O dado que você está vendo agora pode estar errado."
      Fonte: Canela, 44px, weight 300
      Cor: #F5F7FA
      Line-height: 1.15

    Body:
      Texto: "A maioria dos sistemas analíticos do mercado brasileiro foi construída sobre infraestrutura dos anos 2000. Dados apresentados como 'tempo real' chegam com 15 a 45 minutos de atraso. Métricas de risco calculadas com modelos pré-2008."
      Fonte: Space Grotesk, 16px, weight 400
      Cor: #C5CDD8
      Margin-top: 24px
      Max-width: 520px
      Line-height: 1.6

  ZONA DIREITA (40%):
    Card de dado 1:
      Background: #1C2B3A, border gold 40%
      Corner brackets dourados
      Valor: "0,3%"
      Fonte: JetBrains Mono, 56px, #E74C3C
      Label: "Divergência média entre sistemas e fontes primárias"
      Fonte label: Space Grotesk, 11px uppercase, #8A96A8

    Card de dado 2 (abaixo):
      Valor: "R$ 2.4M"
      Fonte: JetBrains Mono, 36px, #E74C3C
      Label: "Em R$ 800M AUM, essa divergência é:"
      Fonte label: Space Grotesk, 11px uppercase, #8A96A8

ANIMATION:
  H1: entrada, 0ms
  Body: entrada, 300ms
  Card 1: entrada com number counter, 600ms (conta de 0% a 0,3%)
  Card 2: entrada com number counter, 900ms (conta de R$0 a R$2,4M)
```

**Design notes:** Os números devem ser impactantes. O vermelho é intencional — é o único uso de vermelho no deck inteiro, aqui para marcar o problema. Presenters pausam após os números aparecerem.

---

## Slide 4 — THE POSITIONING

**Título do slide:** "O território que AXIS ocupa"
**Layout type:** Matrix de posicionamento 2×2

```
BACKGROUND: #0A1628 + grid muito sutil

CONTEÚDO:
  Label acima da matrix:
    Texto: "Autoridade analítica silenciosa"
    Fonte: Space Grotesk, 11px, uppercase, letter-spacing 0.1em
    Cor: #C9A84C

  H1:
    Texto: "O Bloomberg para quem já superou o Bloomberg."
    Fonte: Canela, 38px, weight 300
    Cor: #F5F7FA
    Margin-bottom: 48px

  MATRIX DE POSICIONAMENTO (gráfico 2×2):
    Eixo X (horizontal): "Profundidade de dado" (shallow → deep)
    Eixo Y (vertical): "Qualidade de UX" (dated → modern)
    Eixo cor: linhas de eixo em #C9A84C (dourado — os eixos são da AXIS)

    Concorrentes plotados:
      Bloomberg Terminal:  profundidade alta, UX datada  → quadrante superior esquerdo
      Refinitiv:           profundidade alta, UX média   → quadrante superior esquerdo-centro
      FactSet:             profundidade média, UX datada → quadrante meio
      Startups FinTech:    profundidade baixa, UX moderna → quadrante inferior direito
      AXIS:                profundidade alta, UX moderna  → quadrante SUPERIOR DIREITO (destaque em ouro)

    AXIS label:
      Texto: "AXIS"
      Fonte: Space Grotesk, 13px, weight 700
      Cor: #C9A84C
      Dot: 10px circle, gold
      Corner brackets ao redor do ponto

ANIMATION:
  Label + H1: entrada imediata
  Eixos do matrix: desenham de dentro para fora, 400ms, ease-out
  Concorrentes: aparecem em sequência, 100ms cada
  AXIS: aparece por último, 600ms, com glow sutil de 800ms depois
```

---

## Slide 5 — ARCHETYPE

**Título do slide:** "Governante + Sábio"
**Layout type:** Díptico — arquétipo esquerdo / manifestação direita

```
BACKGROUND: #0A1628

ZONA ESQUERDA:
  H2: "Governante"
  Fonte: Canela, 36px, weight 300, #C9A84C

  Body: "Autoridade natural. Não precisa provar — os dados provam. Decisão como soberania."
  Fonte: Space Grotesk, 15px, #C5CDD8

  Separator hairline vertical: 1px, rgba(201,168,76,0.3), altura 80%

ZONA DIREITA:
  H2: "Sábio"
  Fonte: Canela, 36px, weight 300, #C9A84C

  Body: "Conhecimento profundo como instrumento. Dado como mapa. Sem atalho, sem simplificação."
  Fonte: Space Grotesk, 15px, #C5CDD8

ZONA INFERIOR (full width):
  Linha separadora: hairline dourada

  3 colunas de manifestação:
    Col 1 — Comunicação: "Tom analítico, zero superlativo. Dado como argumento."
    Col 2 — Produto: "Interface densa mas clara. Sem assistente, sem sugestão não solicitada."
    Col 3 — Relacionamento: "Conversa técnica. Trial real. Nenhum pitch vazio."
    Fonte: Space Grotesk, 13px, #8A96A8
```

---

## Slide 6 — ICP

**Título do slide:** "Para quem AXIS foi construído"
**Layout type:** Perfil de persona detalhado

```
BACKGROUND: #0A1628 + axis grid

H1: "Gestores que tomam decisões de R$50M+ baseadas em números."
Fonte: Canela, 36px, #F5F7FA

GRID DE ATRIBUTOS (4 cards):

  Card 1 — Perfil:
    Label: "QUEM É"
    Texto: "35–55 anos. CFA, PhD ou ambos. R$500M+ AUM. Leu Taleb. Usa Python para modelagem."
    Ícone: gráfico de dispersão (JetBrains Mono ✕)

  Card 2 — O que valoriza:
    Label: "VALORIZA"
    Texto: "Dado completo > dado bonito. Confiabilidade > feature set. Interface que não 'ajuda' demais."

  Card 3 — O que detesta:
    Label: "REJEITA"
    Texto: "IA 'que pensa por você'. Onboarding patronizador. Case com foto de executivo sorrindo."

  Card 4 — Como decide:
    Label: "DECIDE POR"
    Texto: "Trial 30 dias com dados reais. Conversa técnica com engenharia. Referência de par respeitado."

RODAPÉ:
  Texto: "AXIS não democratiza dados. AXIS aprofunda para quem já está no nível."
  Fonte: Canela, 18px, italic, #C9A84C
```

---

## Slide 7 — PROMISE / TRANSFORMATION

**Título do slide:** "O que muda quando você opera com dado real"
**Layout type:** Before / After split com testemunho

```
BACKGROUND: #0A1628

H1: "De estimativa para certeza."
Fonte: Canela, 44px, weight 300, #F5F7FA

SPLIT LAYOUT:

  LADO ESQUERDO — "Antes" (com borda sutil vermelha):
    Label: "SEM AXIS"
    Fonte: Space Grotesk, 10px, uppercase, #E74C3C

    Lista:
    • Consolidação manual: 2h toda manhã
    • Dados de 3 sistemas não reconciliados
    • "Tempo real" com 30 min de atraso
    • Divergências descobertas no relatório de CRI
    • Decisões baseadas em estimativa fundamentada

  LADO DIREITO — "Depois" (com borda sutil verde):
    Label: "COM AXIS"
    Fonte: Space Grotesk, 10px, uppercase, #2ECC71

    Lista:
    • Consolidação automática, latência <50ms
    • Fonte única de verdade — todas as classes
    • Dado de mercado confirmado, não estimado
    • Divergência alertada antes de virar problema
    • Cada posição ancorada em dado verificável

TESTEMUNHO (rodapé, em card):
  Background: #1C2B3A, border gold sutil
  Texto: "Hoje eu sei o que tenho. Antes eu estimava."
  Atribuição: "CFO — Gestora Vértice (R$1,2B AUM)"
  Fonte: Canela, 18px, italic, #F5F7FA
  Atribuição fonte: Space Grotesk, 11px, #8A96A8
```

---

## Slide 8 — LOGO SYSTEM

**Título do slide:** "Sistema de Logo"
**Layout type:** Showcase grid de versões

```
BACKGROUND: Dividido: metade #0A1628, metade #F5F7FA (demonstrar versatilidade)

H1: "Logo AXIS"
Fonte: Space Grotesk, 18px, uppercase, letter-spacing 0.1em, #C9A84C

GRID DE VERSÕES (2×3):

  [Fundo escuro — coluna esquerda]
  Row 1: Logo horizontal completo (dark bg)
  Row 2: Logo vertical empilhado (dark bg)
  Row 3: Símbolo isolado (dark bg)

  [Fundo claro — coluna direita]
  Row 1: Logo horizontal completo (light bg)
  Row 2: Logo vertical empilhado (light bg)
  Row 3: Símbolo isolado (light bg)

RODAPÉ:
  Regras: "Nunca distorcer. Nunca recolorir. Área de proteção = altura do símbolo."
  Fonte: JetBrains Mono, 10px, #8A96A8
```

---

## Slide 9 — COLOR SYSTEM

**Título do slide:** "Sistema de Cores"
**Layout type:** Paleta com tokens e uso

```
BACKGROUND: #0A1628

H1: "5 cores. Hierarquia absoluta."
Fonte: Canela, 32px, #F5F7FA

PALETA (swatches em linha):

  Navy #0A1628 — "Dominante. Fundo, base, autoridade."
  Graphite #1C2B3A — "Superfície. Cards, painéis."
  Gold #C9A84C — "Único acento quente. Com moderação."
  Off-White #F5F7FA — "Texto primário. Clareza."
  Electric Blue #4A9FD4 — "Dado. Gráficos, visualizações."

  Cada swatch: retângulo 80px × 120px, valor hex em JetBrains Mono abaixo

REGRAS DE USO:
  Grid: 3 colunas, Space Grotesk 13px

  | Cor | Porcentagem | Nunca |
  |-----|-------------|-------|
  | Navy | 60-70% | Fundo claro como padrão |
  | Graphite | 15-20% | Fundo principal |
  | Gold | 5-10% | Mais de 3 usos por tela |
  | Off-White | 15-20% | Fundo (apenas texto) |
  | Electric Blue | 5-8% | Decoração sem dado |
```

---

## Slide 10 — TYPOGRAPHY

**Título do slide:** "Sistema Tipográfico"
**Layout type:** Specimen das 3 famílias com hierarquia

```
BACKGROUND: #0A1628

3 COLUNAS (uma por família):

  COL 1 — CANELA (display):
    Label: "DISPLAY / HEADINGS"
    Specimen: "Ag" em Canela 72px, weight 300
    Usos: Headlines, manifesto, citações, títulos de slide
    Tom: "Autoridade editorial"

  COL 2 — SPACE GROTESK (body):
    Label: "BODY / UI"
    Specimen: "Ag" em Space Grotesk 48px, weight 400
    Usos: Texto corrido, labels, botões, navegação
    Tom: "Clareza técnica"

  COL 3 — JETBRAINS MONO (data):
    Label: "DATA / CODE"
    Specimen: "0123" em JetBrains Mono 48px
    Usos: Números, percentuais, tickers, código, timestamps
    Tom: "Precisão de máquina"

ESCALA TIPOGRÁFICA (rodapé):
  Display XL → H1 → H2 → H3 → Body L → Body M → Label → Mono
  Tamanhos em pt/px
  Fonte: JetBrains Mono, 10px
```

---

## Slide 11 — APPLICATIONS (Digital)

**Título do slide:** "O Sistema em Uso — Digital"
**Layout type:** Mockup showcase de interface

```
BACKGROUND: #0A1628 com grid

H1: "Interface AXIS em produção"
Fonte: Space Grotesk, 22px, #F5F7FA

CONTEÚDO PRINCIPAL:
  Mockup de dashboard AXIS (tela de laptop/monitor)
  Screenshot ou render: hero section do dashboard com KPIs visíveis
  Dimensão: 70% do slide, centrado levemente à direita

CALLOUTS (balões técnicos ao redor do mockup):
  "Latência <50ms" — apontando para indicador de atualização
  "8 casas decimais disponíveis" — apontando para dado numérico
  "Modo compact (32px rows)" — apontando para tabela
  "JetBrains Mono em todos os dados" — apontando para coluna numérica

RODAPÉ:
  Tagline: "Dados que não mentem."
  Fonte: Canela, 16px, italic, #C9A84C
```

---

## Slide 12 — UI SYSTEM (parte 1 — Componentes)

**Título do slide:** "Sistema de UI — Componentes"
**Layout type:** Component showcase grid

```
BACKGROUND: #0A1628

H1: "Cada componente comunica estado."
Fonte: Canela, 28px, #F5F7FA

GRID DE COMPONENTES (3×3):

  Row 1: Botões (Primary, Secondary, Ghost)
  Row 2: Card (default, hover, selected)
  Row 3: Input (default, focus, error) + Data Table preview

Cada componente:
  Label de estado acima em Space Grotesk 10px uppercase
  Componente real (screenshot de alta fidelidade)
  Spec abaixo: height, font, color em JetBrains Mono 9px

DESTAQUE:
  Data Table card: ocupar 2 cols × 2 rows (destaque de componente AXIS-específico)
  Label: "AXIS Data Table — compact mode"
```

---

## Slide 13 — UI SYSTEM (parte 2 — Data Visualization)

**Título do slide:** "Visualização de Dados"
**Layout type:** Chart showcase com paleta de data viz

```
BACKGROUND: #0A1628

H1: "Dado financeiro não é infográfico."
Fonte: Canela, 32px, #F5F7FA

Subheading:
  "Paleta de visualização construída para densidade, não para cor."
  Fonte: Space Grotesk, 15px, #C5CDD8

EXEMPLOS DE CHART (4 exemplos):
  1. Line chart de portfólio (série em electric blue, benchmark em gold)
  2. Candlestick chart (up em verde #2ECC71, down em vermelho #E74C3C)
  3. Multi-series line (até 4 séries usando paleta de data viz)
  4. Table com sparklines embutidas (compact mode)

PALETA DE DATA VIZ (rodapé):
  8 swatches em linha com hex e uso
  Electric Blue → Gold → Emerald → Coral → Lavender → Amber → Teal → Steel
```

---

## Slide 14 — MOTION PREVIEW

**Título do slide:** "Sistema de Motion"
**Layout type:** Principle statement + QR code para demo

```
BACKGROUND: #0A1628

H1: "Como cálculo executando."
Fonte: Canela, 44px, #F5F7FA

3 PRINCÍPIOS (3 cards):
  "Resposta exata — toda animação responde a uma ação"
  "Economia de movimento — menor distância entre estados"
  "Continuidade — o usuário nunca perde contexto"

3 ANTI-PADRÕES (3 cards, borda vermelha sutil):
  "Nunca bounce ou spring"
  "Nunca animação contínua sem trigger"
  "Nunca entretenimento visual"

QR CODE (canto inferior direito):
  Link para demo interativo da interface
  Label: "Demo ao vivo — axis.com.br/demo"
  Fonte: JetBrains Mono, 10px, #8A96A8

ANIMATION (este slide tem animação demo):
  Counter de número anima de 0 → R$ 1.287.432,00 enquanto slide está visível
  Label acima: "Number counter — 1.200ms, ease-out-quart"
```

---

## Slide 15 — PATTERN LIBRARY

**Título do slide:** "Biblioteca de Padrões Gráficos"
**Layout type:** Grid de elementos com aplicação

```
BACKGROUND: #0A1628

H1: "Todo elemento tem raiz no eixo cartesiano."
Fonte: Canela, 32px, #F5F7FA

GRID DE ELEMENTOS (4 colunas × 2 rows):

  Cross Axis (S, M, L, XL) — 4 tamanhos
  Coordinate Grid (dense, medium, sparse, oblique) — 4 densidades
  Accent Bar (horizontal, vertical, larga, fina) — 4 variantes
  Corner Brackets (S, M, L, single) — 4 tamanhos

  Cada elemento: em card escuro com label abaixo
  Label: nome + uso em JetBrains Mono 9px

COMPOSIÇÃO DEMO (metade direita):
  Exemplo de composição completa de hero background com todos os layers
  Labels apontando para cada layer com opacidade
```

---

## Slide 16 — COMPETITIVE LANDSCAPE

**Título do slide:** "Por que os gestores sérios migram"
**Layout type:** Comparison table

```
BACKGROUND: #0A1628

H1: "O mercado tem opções. AXIS tem uma posição."
Fonte: Canela, 36px, #F5F7FA

TABELA COMPARATIVA:

  Colunas: Critério | Bloomberg | Refinitiv | FactSet | FinTech Startups | AXIS
  Fundo header: #1C2B3A
  Row AXIS: fundo rgba(201,168,76,0.06), borda esquerda gold 2px

  Critérios (rows):
  • Latência real de dados
  • Dado sem arredondamento
  • Uptime SLA
  • UX moderna
  • Especialização em gestoras
  • Preço relativo (índice 1-5)
  • Onboarding (trial real vs demo)
  • Suporte técnico nível

  AXIS sempre com checkmark dourado nos critérios diferenciais
  Fonte dos dados: JetBrains Mono, 12px
  Checkmark: ✓ em #2ECC71, ✗ em #E74C3C, ~ em #F39C12

RODAPÉ:
  "Como um Bloomberg para quem já superou o Bloomberg."
  Fonte: Canela, 16px, italic, #C9A84C
```

---

## Slide 17 — KEY MESSAGES

**Título do slide:** "3 razões para começar hoje"
**Layout type:** 3 grandes statements com evidência

```
BACKGROUND: #0A1628 com hairline gold no terço superior

H1: "Dados que não mentem."
Fonte: Canela, 44px, #C9A84C (tagline em ouro — único slide com H1 em ouro)
Margin-bottom: 56px

STATEMENT 1:
  Número: "01"
  Fonte: JetBrains Mono, 14px, #8A96A8
  Texto: "Divergências custam mais que a plataforma."
  Fonte: Canela, 28px, #F5F7FA
  Evidência: "Divergência de 0,3% em R$500M AUM = R$1.5M de exposição calculável."
  Fonte evidência: Space Grotesk, 13px, #C5CDD8

STATEMENT 2:
  Número: "02"
  Texto: "Consolidação manual é risco operacional."
  Evidência: "2 horas por dia de conciliação manual. 100% dos erros de dado ocorrem nesse processo."

STATEMENT 3:
  Número: "03"
  Texto: "Trial com dado real — sem compromisso."
  Evidência: "30 dias com os seus dados, os seus ativos, os seus modelos. Não demo. Produção real."
```

---

## Slide 18 — NEXT STEPS / CTA

**Título do slide:** "Como começar"
**Layout type:** 3 passos + CTA principal

```
BACKGROUND: #0A1628

H1: "Três passos para dado real."
Fonte: Canela, 40px, #F5F7FA

3 STEPS (horizontal):
  Step 1 — Conversa técnica:
    Label: "01 — HOJE"
    Texto: "30 minutos com o time de engenharia. Sem pitch."
    Detalhe: "Mostramos como funciona com o seu stack atual."

  Step 2 — Trial:
    Label: "02 — PRÓXIMA SEMANA"
    Texto: "30 dias com os seus dados reais."
    Detalhe: "Acesso completo. Sem limitação de feature."

  Step 3 — Decisão:
    Label: "03 — EM 45 DIAS"
    Texto: "Com dado suficiente para decidir com certeza."
    Detalhe: "Sem pressão de vendas. A decisão é baseada no dado do trial."

CTA PRINCIPAL (card com corner brackets dourados):
  Texto: "Agende a conversa técnica"
  Fonte: Space Grotesk, 18px, weight 600, #0A1628
  Background: #C9A84C (botão ouro — único elemento full-gold no deck)
  Padding: 16px 32px

  Sub-CTA: "rafael@axis.com.br · axis.com.br/demo"
  Fonte: JetBrains Mono, 12px, #8A96A8
```

---

## Slide 19 — THANK YOU

**Título do slide:** *(sem título — silêncio visual)*
**Layout type:** Logo centrado, máximo de espaço negativo

```
BACKGROUND:
  #0A1628 sólido
  Coordinate Grid sparse, quase invisível
  Cross Axis L no canto inferior direito, rgba(201,168,76,0.08)

CONTEÚDO CENTRAL:
  Logo horizontal completo, centrado
  Símbolo: 48px com acento dourado
  Wordmark: Canela 32px, #F5F7FA

  Tagline (abaixo do logo):
    "Dados que não mentem."
    Fonte: Canela, 22px, weight 300, italic, #C9A84C
    Margin-top: 20px

  Accent line:
    Horizontal, 48px × 1px, #C9A84C
    Margin-bottom: 20px do logo

CONTATO (discreto, canto inferior):
  "axis.com.br · rafael@axis.com.br · +55 11 9 9999-9999"
  Fonte: JetBrains Mono, 11px, #8A96A8
  Position: bottom 48px, centered

ANIMATION:
  Logo aparece com a sequência de logo animation (ver motion-system.md)
  Total: 800ms, uma vez, sem loop
  Tagline: fade-in após logo completar, 200ms delay
```

**Design notes:** Este slide é a última imagem que o prospect carrega. O silêncio visual é intencional — sustenta a autoridade do manifesto. Não há CTAs repetidos aqui (já foram no slide anterior). Apenas a marca.

---

## Slide 20 — BACK COVER

**Título do slide:** *(informativo — não apresentado)*
**Layout type:** Colofão e informações do documento

```
BACKGROUND: #1C2B3A (graphite — diferencia visualmente da capa)

CONTEÚDO:
  Logo símbolo isolado: 24px, canto superior esquerdo, rgba(245,247,250,0.3)

  Informações do documento:
    Fonte: JetBrains Mono, 10px, #8A96A8
    "AXIS Tecnologia Financeira S.A."
    "CNPJ: XX.XXX.XXX/0001-XX"
    "Av. Brigadeiro Faria Lima, XXXX — São Paulo, SP"
    ""
    "Este documento é confidencial e destinado exclusivamente ao destinatário indicado."
    "Reprodução proibida sem autorização expressa."
    ""
    "Deck versão 1.0 — Março 2026"
    "Produzido por BRAND SQUAD SUPREMO — Synkra AIOS"

  Hairline horizontal: full width, rgba(197,205,216,0.12)

  Footer final:
    "Dados que não mentem."
    Fonte: Canela, 14px, italic, #C9A84C 40%
```

---

## Sumário de Design por Slide

| # | Slide | Background | Acento | Animação | Fonte H1 |
|---|-------|-----------|--------|----------|---------|
| 1 | Cover | Navy + Matrix | Cross Axis XL | Sequencial, 5 elementos | Canela 52px |
| 2 | Manifesto | Navy sólido | Hairlines gold | Linha por linha | Canela 28px italic |
| 3 | Problem | Navy + grid | Cards vermelho | Counter numérico | Canela 44px |
| 4 | Positioning | Navy + grid | Matrix 2×2 gold | Eixos crescem | Canela 38px |
| 5 | Archetype | Navy sólido | Hairline vertical | Fade sequencial | Canela 36px gold |
| 6 | ICP | Navy + grid | 4 cards | Fade por card | Canela 36px |
| 7 | Promise | Navy sólido | Split border | Simultâneo | Canela 44px |
| 8 | Logo | Split dark/light | — | Fade por versão | Space Grotesk 18px |
| 9 | Colors | Navy sólido | 5 swatches | Swatches sequenciais | Canela 32px |
| 10 | Typography | Navy sólido | — | Specimen aparecem | Space Grotesk 22px |
| 11 | App Digital | Navy + grid | Callouts | Slide-in callouts | Space Grotesk 22px |
| 12 | UI Components | Navy sólido | Grid 3×3 | Grid fade | Canela 28px |
| 13 | Data Viz | Navy sólido | Charts | Chart draw sequencial | Canela 32px |
| 14 | Motion | Navy sólido | QR code | Counter demo ao vivo | Canela 44px |
| 15 | Patterns | Navy sólido | Grid elementos | Fade por elemento | Canela 32px |
| 16 | Competitive | Navy sólido | Row gold AXIS | Table row por row | Canela 36px |
| 17 | Messages | Navy + hairline | H1 em ouro | Statements sequenciais | Canela 44px gold |
| 18 | CTA | Navy sólido | Botão ouro | Steps sequenciais | Canela 40px |
| 19 | Thank You | Navy sólido | Logo animation | Logo reveal (800ms) | Canela 22px italic |
| 20 | Back Cover | Graphite | — | Nenhuma | — |

---

*Produzido por: Slide Agent + Vera (copywriter) — BRAND SQUAD SUPREMO*
*Nível: N1 ESSÊNCIA | Projeto: AXIS | Data: 2026-03-05*
