# Visual Prompts Library — AXIS
**Agente:** Nova (prompt-specialist) + Vex (page-visual-specialist)
**Nível:** N1 — ESSÊNCIA
**Output:** Biblioteca de prompts para geração de imagens (Luma / Midjourney / Ideogram)
**Notas:** Todos os prompts em inglês para máxima compatibilidade com modelos de IA de imagem

---

## Calibração Visual AXIS — Parâmetros Base

Antes de qualquer prompt, calibrar o modelo com estes parâmetros fixos de identidade AXIS.

### Paleta em Inglês (para uso em prompts)

| Nome AXIS | Hex | Descrição para Prompt |
|-----------|-----|----------------------|
| Navy | `#0A1628` | deep navy, almost black, dark slate blue |
| Graphite | `#1C2B3A` | dark steel gray, dark charcoal blue |
| Gold | `#C9A84C` | burnished gold, muted gold, antique brass |
| Light Gold | `#E4C87A` | pale gold, champagne gold |
| Off-White | `#F5F7FA` | cool white, light gray-white, paper white |
| Electric Blue | `#4A9FD4` | electric blue, steel blue, data blue |

### Vocabulário Visual para Prompts

**Usar sempre:**
- `dark editorial`, `Swiss design`, `Bauhaus geometry`, `precision instruments`
- `financial data terminal`, `Bloomberg terminal aesthetic`, `war room`
- `mathematical precision`, `coordinate system`, `cartesian grid`
- `muted gold accents`, `dark navy background`, `cool white typography`
- `no rounded corners`, `sharp edges`, `geometric`, `minimal`
- `negative space`, `typographic hierarchy`, `monospace font details`

**Nunca usar:**
- `futuristic`, `sci-fi`, `neon`, `glowing`, `sparkle`, `magic`
- `friendly`, `playful`, `fun`, `colorful`, `vibrant`
- `gradient purple`, `gradient pink`, `ombre`
- `stock photo`, `business people`, `handshake`, `smiling`
- `startup aesthetic`, `fintech colorful`, `cheerful`

---

## BLOCK 1 — Logo Prompts

### L1 — Logo Symbol (isolado)

**Uso:** Variações do símbolo para testes de logo, uso em fundos alternativos

```
Primary logo prompt:

Two perpendicular lines intersecting at their center point,
rotated 7 degrees from the horizontal axis, forming a precise cross symbol.
Lines are equal in visual weight, clean sharp edges.
The intersection point marked by a small solid circle.
Proportion: horizontal line is 1.618x longer than vertical (golden ratio).
Rendered against deep navy background (#0A1628).
Lines in burnished muted gold (#C9A84C).
Style: Swiss International Style, Bauhaus, technical precision.
No gradients, no shadows, no decorative elements.
Clean vector-like rendering.
High contrast, minimalist.
--ar 1:1 --style raw
```

---

### L2 — Logo + Wordmark on Dark

**Uso:** Preview de logo completo em contextos digitais

```
Logo + wordmark composition:

Geometric cross symbol (two intersecting perpendicular lines, rotated 7 degrees)
in burnished gold on the left side.
To the right of the symbol, the word "AXIS" in elegant serif/transitional typeface,
light weight (300), uppercase, wide letter-spacing.
Typography feels like a financial institution, not a tech startup.
Color: off-white cool text (#F5F7FA) against deep navy background.
Gold symbol creates strong visual anchor.
Horizontal layout, centered vertically.
Generous whitespace around elements.
Swiss typographic precision.
No taglines, no borders, no decorative frames.
Ultra-clean composition.
Dark editorial photography quality.
--ar 3:1 --style raw
```

---

### L3 — Logo on Light Background (inverted)

**Uso:** Impressão, papelaria, contextos de fundo claro

```
Minimal logo on light cool white background (#F5F7FA):

Cross symbol (two perpendicular lines, 7 degree rotation) in deep navy (#0A1628),
with precise intersection point.
Wordmark "AXIS" beside it in deep navy, serif light weight.
No gold (removed for single-color context).
Maximum reduction, zero ornamentation.
Feels like a prestigious private equity firm's letterhead.
Swiss design, Helvetica era precision, typographic restraint.
Background is cool paper white, not warm white.
Photorealistic rendering at high resolution.
--ar 3:1 --style raw
```

---

## BLOCK 2 — Moodboard Prompts

### M1 — Financial Data War Room

**Uso:** Moodboard principal de atmosfera AXIS, textura para hero sections

```
Dark, high-contrast financial data room:

Multiple screens displaying real-time market data — numbers, charts, line graphs.
Bloomberg terminal aesthetic but more refined, more modern.
Deep navy and charcoal color palette.
Muted gold reflections on screen bezels and desk surfaces.
Cool white typography on screens.
Monospace fonts, dense information hierarchy.
No people visible — just the data itself.
Dramatic raking light from screens.
Black metal and glass surfaces.
Precision instruments on desk: ruler, compass, mechanical pencil.
Atmosphere: authority, concentration, zero distraction.
Editorial photography style, architectural composition.
Shot from 3/4 angle, slight low perspective.
--ar 16:9 --style raw --q 2
```

---

### M2 — Precision Instruments Still Life

**Uso:** Moodboard de materiais para identidade AXIS, uso em editorial

```
Flat lay of precision instruments on deep navy surface:

Technical drawing compass (drafting compass), set square, T-square.
Mechanical pencil, fine-tip technical pen.
Graph paper with coordinate grid, partially filled with financial equations.
A rectangular gold ingot (bullion bar) as a compositional anchor.
Analog calculator or financial terminal keyboard.
Small circular level (spirit level).
All objects: matte black, brushed aluminum, or dark steel.
Gold accents only on small details.
Cool directional lighting from upper left, sharp shadows.
No warmth, no lifestyle feel — pure technical precision.
Swiss design photography tradition.
Background: dark navy, matte finish.
--ar 4:3 --style raw --q 2
```

---

### M3 — Data Topography

**Uso:** Background abstrato para hero de landing page, slides de deck

```
Abstract data topography visualization:

Cartesian coordinate grid rotated 7 degrees, extending to infinite horizon.
Fine hairlines in soft electric blue, barely visible against deep navy.
At grid intersections: small data points, some highlighted in muted gold.
In the distance: rising landscape of data towers — 3D bar chart aesthetic
but rendered as architectural forms, not charts.
Depth and atmosphere: closer grid is brighter, farther grid fades to black.
No text, no labels — pure geometric form.
Inspired by cartographic relief maps and financial candlestick charts.
Cinematic color grading: deep shadows, cold midtones, warm gold highlights.
Ultra-detailed, photorealistic, 8K quality.
--ar 16:9 --style raw --q 2
```

---

## BLOCK 3 — Slide Background Prompts

### S1 — Dark Data Slide Background

**Uso:** Fundo para slides de dados — tabelas, gráficos

```
Minimal dark editorial slide background:

Deep navy (#0A1628) base color.
Extremely subtle coordinate grid — hairlines barely visible.
One horizontal precision hairline in muted gold, positioned in upper third.
Very faint number matrix in the right corner — financial decimals and percentages
in monospace type, opacity 5%, not readable as text but as texture.
Zero focal point — pure atmosphere, designed to recede behind content.
No gradients, no glow effects.
Flat, matte, dark.
Swiss design, Bauhaus restraint.
--ar 16:9 --style raw
```

---

### S2 — Gold Accent Slide (chapter divider)

**Uso:** Slides de abertura de novo capítulo, separadores de seção

```
Dark editorial slide with gold geometric element:

Deep navy background, 90% of the composition.
Single cross symbol (two perpendicular lines, 7 degree rotation)
centered or positioned at intersection of golden ratio lines.
Symbol in burnished gold, proportionally large but not overwhelming —
occupies roughly 15% of the slide area.
Faint coordinate grid in background, almost invisible.
No text content visible — pure visual composition.
Cinematic, authoritative, silent.
The emptiness is deliberate and powerful.
Negative space dominates.
--ar 16:9 --style raw
```

---

### S3 — Light Editorial Slide Background

**Uso:** Slides de texto longo, apresentações para impressão, contextos de luz intensa

```
Clean light editorial presentation background:

Cool white (#F5F7FA) as primary surface.
Extremely subtle coordinate grid in deep navy, opacity 3% — barely suggested.
Single thin horizontal rule in pale gold at the top, 1px height.
Corner detail: very small bracket marks (right angle brackets) in lower right corner,
in deep navy at 20% opacity.
Zero decoration beyond these structural elements.
Feels like precision engineering documentation or Bauhaus design manual.
No warmth, no organic shapes, no curves.
--ar 16:9 --style raw
```

---

## BLOCK 4 — Social Media Prompts

### R1 — Instagram Data Post Background

**Uso:** Fundo para posts de dado / stat no Instagram (formato 1:1)

```
Square dark editorial composition for social media data post:

Deep navy (#0A1628) background, full bleed.
Top-right corner: subtle number matrix — financial decimals and percentages
in JetBrains Mono-style monospace, varying sizes, opacity 5-8%.
Three diagonal hairlines crossing the composition at 7 degrees,
in pale gold, opacity 8%.
Bottom-left corner: small cross symbol in burnished gold, 15% opacity.
Central zone (60% of composition): completely clear, for data/text placement.
Total atmosphere: precision, authority, zero noise.
Square format 1:1, high resolution, clean edges.
--ar 1:1 --style raw
```

---

### R2 — LinkedIn Editorial Post

**Uso:** Imagem para posts do LinkedIn com dado ou insight

```
Dark editorial image for LinkedIn post (landscape):

Deep navy background.
Left zone: vertical accent line in burnished gold, 2px width, full height.
Typography composition feeling: headline in light-weight elegant serif,
supporting text in geometric sans-serif, monospace details.
Right side: abstract data visualization — line chart as pure graphic element,
no labels, only the shape of the curve in electric blue at 30% opacity.
Overall feeling: Bloomberg editorial, Financial Times design sensibility,
Deutsche Bank annual report aesthetic.
Horizontal format, clean and authoritative.
--ar 4:3 --style raw
```

---

### R3 — Stories / Reels Background

**Uso:** Fundo vertical para Instagram Stories e Reels

```
Vertical dark editorial background for stories/reels:

Deep navy, full bleed, 9:16 aspect ratio.
Axis Grid pattern at 7 degrees, very subtle, full coverage.
Central vertical zone (40% width, centered): completely clear for text/data.
Top: small logo symbol (cross mark) centered, in burnished gold, small scale.
Bottom: horizontal hairline in gold, accent marker.
Both sides: very faint number matrix texture.
Motion-ready: static version as first frame,
with space for animated counter or chart reveal.
Cinematic dark, zero noise in central area.
--ar 9:16 --style raw
```

---

## Glossário EN — Atributos AXIS para Prompts

| Atributo AXIS | Vocabulário para Prompt |
|--------------|------------------------|
| Governante (arquétipo) | `authoritative`, `commanding`, `institutional`, `prestigious` |
| Sábio (arquétipo) | `analytical`, `precise`, `data-driven`, `intellectual` |
| Navy #0A1628 | `deep navy`, `almost black navy`, `dark slate blue`, `midnight navy` |
| Graphite #1C2B3A | `dark steel gray`, `dark charcoal blue`, `slate graphite` |
| Gold #C9A84C | `burnished gold`, `muted gold`, `antique gold`, `oxidized brass` |
| Electric Blue #4A9FD4 | `data blue`, `steel electric blue`, `terminal blue` |
| Canela (tipografia) | `elegant transitional serif`, `editorial serif`, `light-weight serif` |
| Space Grotesk (body) | `geometric sans-serif`, `clean grotesque`, `modern neutral typeface` |
| JetBrains Mono (data) | `monospace`, `coding font`, `terminal typeface`, `technical monotype` |
| Swiss Design | `International Typographic Style`, `Basel School`, `Müller-Brockmann grid` |
| Bauhaus | `Bauhaus geometry`, `form follows function`, `Gropius school` |
| 7° rotation | `slightly rotated`, `7 degree angle`, `oblique at 7 degrees` |
| Precisão absoluta | `no approximation`, `exact`, `precise`, `zero noise`, `engineered` |

---

## Negative Prompts AXIS (Universal)

Incluir em TODOS os prompts de geração de imagem para AXIS:

```
NEGATIVE PROMPTS (--no flag ou campo de negative prompt):

--no rounded corners, no soft edges, no organic shapes, no blobs,
no purple gradients, no rainbow colors, no neon, no glow effects,
no lens flare, no bokeh, no warm tones, no cheerful, no playful,
no startup aesthetic, no tech bros, no handshake, no smiling executives,
no stock photography feel, no generic business imagery, no flat vector icons,
no bright colors, no white background with purple accent,
no colorful fintech, no friendly rounded UI, no sans-serif-only composition,
no oversimplification, no infographic style, no cartoon,
no watercolor, no illustration style
```

---

## Instruções de Uso dos Prompts

### Para Luma (AI image generation):
1. Usar prompt base do bloco relevante
2. Adicionar parâmetros de calibração visual AXIS (vocabulário)
3. Incluir negative prompts do bloco final
4. Gerar 3-5 variações por prompt
5. Selecionar apenas imagens com Navy como cor dominante (≥60% da área)

### Para Midjourney:
1. Adicionar `--style raw` e `--q 2` para máxima qualidade
2. Usar `--ar` conforme especificado em cada prompt
3. Adicionar `--no` com lista de negative prompts
4. Usar `--seed` para consistência entre prompts relacionados

### Para Ideogram:
1. Usar modo "Design" para composições tipográficas
2. Especificar explicitamente as cores em hex quando possível
3. Usar campo de negative prompt para todas as restrições AXIS

### Critério de Seleção — Checklist para imagem aprovada:
- [ ] Fundo é dark (navy ou graphite dominante)
- [ ] Sem elementos orgânicos, sem bordas arredondadas desnecessárias
- [ ] Gold presente como acento, nunca dominante
- [ ] Tipografia na imagem (se houver) é serif elegante OU monospace — nunca sans-serif arredondada
- [ ] Sem pessoas, sem mãos, sem rostos
- [ ] Composição tem hierarquia clara e zona de respiro
- [ ] Não parece "startup colorido" nem "banco tradicional conservador"
- [ ] Evoca precision instruments, data authority, editorial financial media

---

*Produzido por: Nova (prompt-specialist) + Vex (page-visual-specialist) — BRAND SQUAD SUPREMO*
*Nível: N1 ESSÊNCIA | Projeto: AXIS | Data: 2026-03-05*
