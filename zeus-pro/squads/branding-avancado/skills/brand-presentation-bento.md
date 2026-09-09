# Skill: Brand Presentation — Bento Grid Dashboard

## Metadata
- **ID:** brand-presentation-bento
- **Version:** 1.0
- **Squad:** Brand Squad Supremo
- **Agent:** @presentation-builder (Frame) + @page-visual-specialist (Vex)
- **Replicable:** YES — funciona para qualquer marca

---

## Propósito

Criar apresentações de brand guidelines no formato bento grid dashboard,
inspirado no modelo AIOX (brand.aioxsquad.ai/brandbook/guidelines).
Cada apresentação é um HTML self-contained com 14 painéis padronizados.

---

## Inputs Necessários

| Input | Fonte | Obrigatório |
|-------|-------|-------------|
| `brand-strategy.md` | Brand Squad | SIM |
| `brand-voice.md` | Brand Squad | SIM |
| `visual-direction.md` | Brand Squad | SIM |
| `logo-rationale.md` | Brand Squad | SIM |
| `design-tokens.json` | Brand Squad | SIM |
| PNG do isotipo aprovado | Isotipo Squad | SIM |
| Mockups (se existirem) | Mockup Squad | NÃO |

---

## Os 14 Painéis Padrão

| # | Painel | Grid Span | Conteúdo | Fonte de Dados |
|---|--------|-----------|----------|----------------|
| 01 | IDENTITY SYSTEM | 4 col (hero) | `<img>` isotipo + wordmark + tagline | logo-rationale, brand-voice |
| -- | TICKER | 4 col | Texto animado com dados da marca | brand-strategy |
| 02 | ISOTIPO | 2 col × 2 row | PNG em 3 variantes (gold, white, dark) | isotipo PNG |
| 03 | COLOR PALETTE | 2 col | 4 blocos verticais de cor | design-tokens |
| 04 | LOGO CONSTRUCTION | 2 col | Grid + `<img>` + safe space | logo-rationale |
| 05 | MANIFESTO | 2 col | Citação principal + texto | brand-voice |
| 06 | TYPOGRAPHY | 2 col × 2 row | Specimen + pesos + alphabet | design-tokens |
| 07 | NAMING & CONCEPT | 4 col | Flow semântico do nome | brand-strategy |
| 08 | POSITIONING | 2 col | Enemy / Target / Category | brand-strategy |
| 09 | ARCHETYPES | 2 col | Barras percentuais | brand-strategy |
| 10 | PERSONALITY | 2 col | Tags IN + tags NEVER | brand-voice |
| 11 | TOM DE VOZ | 2 col | 4 dimensões com barras | brand-voice |
| 12 | APPLICATIONS | 4 col | 4 mockups com `<img>` | logo-rationale + PNG |
| 13 | VISUAL DIRECTION | 2 col | 4 dimensões de art direction | visual-direction |
| 14 | PROHIBITIONS | 2 col | 6 proibições da marca | logo-rationale |
| -- | FOOTER | 4 col | `<img>` isotipo + créditos | - |

---

## Estrutura HTML Padrão

### CSS Variables (adaptar por marca)
```css
:root {
  --bb-dark: #0D0D12;        /* Fundo principal */
  --bb-surface: #111118;      /* Fundo elevado */
  --bb-accent: #C9A84C;       /* Cor de acento */
  --bb-cream: #F0F0F0;        /* Texto principal */
  --bb-dim: #6B6B80;          /* Texto secundário */
  --bb-border: rgba(x,x,x,0.12); /* Bordas */
}
```

### Bento Grid
```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--bb-border);  /* 1px border trick */
}
```

### Panel Pattern (cada painel)
```html
<div class="panel" style="grid-column: span N; grid-row: span N">
  <!-- Header Bar -->
  <div class="panel-header">
    <span class="line"></span>
    <span class="title">SECTION NAME</span>
    <span class="line-fill"></span>
    <span class="sub">Subtitle</span>
    <span class="line"></span>
    <span class="num">02</span>
  </div>
  <!-- Content -->
  <div>...</div>
  <!-- Footer Bar -->
  <div class="panel-footer">
    <span>Left Label</span>
    <span>Center Label</span>
    <span>Number</span>
  </div>
</div>
```

### Isotipo System (OBRIGATÓRIO — nunca SVG)
```css
.zspark-img { display: block; object-fit: contain; }
.zspark-gold { filter: invert(1) sepia(1) saturate(4) hue-rotate(5deg) brightness(0.85); mix-blend-mode: screen; }
.zspark-white { filter: invert(1); mix-blend-mode: screen; }
.zspark-dark { mix-blend-mode: multiply; }
```

---

## Responsividade

```css
@media (max-width: 1024px) { .bento-grid { grid-template-columns: repeat(2, 1fr) !important; } }
@media (max-width: 768px)  { .bento-grid { grid-template-columns: 1fr !important; } }
```

---

## Checklist de Verificação Pré-Entrega

- [ ] Todas as instâncias do isotipo usam `<img src>` (NUNCA SVG path)
- [ ] CSS variables definidas com cores da marca
- [ ] Todas as 14 seções presentes
- [ ] Dados populados dos brand docs reais (não placeholder)
- [ ] Responsivo em 3 breakpoints (4col → 2col → 1col)
- [ ] Ticker animado funcionando
- [ ] Tags IN/NEVER populadas do brand-voice.md
- [ ] Barras de arquétipo com percentuais corretos
- [ ] Barras de tom de voz com percentuais corretos
- [ ] Footer com `<img>` isotipo + créditos
- [ ] 0 SVG paths que imitem a marca (grep verification)
- [ ] Font-face carregando corretamente (Google Fonts ou local)

---

## Execução

```
@page-visual-specialist (Vex) → define CSS variables por marca
@presentation-builder (Frame) → gera HTML usando este template
@brand-master (Zeus) → valida dados e conteúdo
→ ENTREGA: arquivo HTML self-contained
```

---

## Referência

- Template base: `squads/brand/docs/zeus-brand/apresentacao.html`
- Modelo visual: `brand.aioxsquad.ai/brandbook/guidelines`
- Regra de integridade: `.claude/rules/brand-mark-integrity.md`
- Este arquivo: `squads/brand/skills/brand-presentation-bento.md`
