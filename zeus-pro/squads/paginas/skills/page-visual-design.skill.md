---
name: page-visual-design
description: "Use when creating any page, UI, dashboard, landing page or visual interface. Activates Vex (page-visual-specialist) with full aesthetic system from claude-cookbooks-main."
---

# Page Visual Design Skill

## Overview

Integra o sistema de design visual do `claude-cookbooks-main` com o workflow do PAGE-FORGE squad.

**Princípio central:** Anti-AI-slop. Toda página tem identidade visual real, tipografia com caráter, paleta coesa e motion com intenção.

**Knowledge base:** `claude-cookbooks-main/coding/prompting_for_frontend_aesthetics.ipynb`

---

## O Prompt Distilled Aesthetics (base de tudo)

Aplicar SEMPRE em qualquer geração de frontend:

```
<frontend_aesthetics>
You tend to converge toward generic, "on distribution" outputs. In frontend design,
this creates what users call the "AI slop" aesthetic. Avoid this: make creative,
distinctive frontends that surprise and delight. Focus on:

Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic
fonts like Arial and Inter; opt instead for distinctive choices that elevate the
frontend's aesthetics.

Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency.
Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
Draw from IDE themes and cultural aesthetics for inspiration.

Motion: Use animations for effects and micro-interactions. Prioritize CSS-only
solutions for HTML. Focus on high-impact moments: one well-orchestrated page load
with staggered reveals (animation-delay) creates more delight than scattered
micro-interactions.

Backgrounds: Create atmosphere and depth rather than defaulting to solid colors.
Layer CSS gradients, use geometric patterns, or add contextual effects that match
the overall aesthetic.

Avoid generic AI-generated aesthetics:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Interpret creatively and make unexpected choices that feel genuinely designed
for the context. Vary between light and dark themes, different fonts, different
aesthetics.
</frontend_aesthetics>
```

---

## Estética Padrão (quando sem contexto específico)

**Warframe-Inspired** — Dark sci-fi, metálico, atmosférico:

```css
:root {
  /* Backgrounds */
  --bg-primary: #0A0A0F;
  --bg-secondary: #111118;
  --bg-card: rgba(255, 255, 255, 0.03);

  /* Accents */
  --accent-gold: #C8A951;
  --accent-electric: #00D4FF;
  --accent-gold-glow: rgba(200, 169, 81, 0.15);

  /* Text */
  --text-primary: #E8E8F0;
  --text-muted: #6B6B80;
  --text-dim: #3D3D50;

  /* Borders */
  --border: rgba(200, 169, 81, 0.2);
  --border-subtle: rgba(255, 255, 255, 0.05);

  /* Fonts */
  --font-display: 'Clash Display', sans-serif;
  --font-body: 'Space Grotesk', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

**Google Fonts link:**
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```
*(Clash Display não está no Google Fonts — usar CDN da FontSource ou alternativa)*

---

## Paletas Alternativas

### IDE Theme (para ferramentas/dashboards técnicos)
```css
:root {
  --bg-primary: #1E1E2E;
  --accent: #CBA6F7;
  --accent-2: #89B4FA;
  --text: #CDD6F4;
  --muted: #6C7086;
}
/* Fonts: IBM Plex Mono + IBM Plex Sans */
```

### Editorial (para blogs, portfolios, conteúdo)
```css
:root {
  --bg-primary: #FAFAF8;
  --accent: #1A1A2E;
  --accent-warm: #C8814A;
  --text: #1A1A1A;
  --muted: #6B6B6B;
}
/* Fonts: Playfair Display + Crimson Pro */
```

### Startup Energia (para landing pages de curso/produto)
```css
:root {
  --bg-primary: #0D0D0D;
  --accent-neon: #39FF14;
  --accent-warm: #FF6B35;
  --text: #F5F5F5;
  --muted: #888888;
}
/* Fonts: Clash Display + Space Grotesk */
```

### Solarpunk (para produtos sustentáveis/naturais)
```css
:root {
  --bg-primary: #1C2B1A;
  --accent-gold: #D4A847;
  --accent-green: #7DB87D;
  --text: #E8F0E4;
  --muted: #89A484;
}
/* Fonts: Fraunces + Source Sans 3 */
```

---

## Motion Patterns

### Page Load (aplicar sempre)
```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

.animate-in {
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}

/* Stagger delays */
.animate-in:nth-child(1) { animation-delay: 0s; }
.animate-in:nth-child(2) { animation-delay: 0.1s; }
.animate-in:nth-child(3) { animation-delay: 0.2s; }
.animate-in:nth-child(4) { animation-delay: 0.3s; }
```

### Hover Effects (elementos interativos)
```css
.btn-primary {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 0 0 rgba(200, 169, 81, 0);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 24px rgba(200, 169, 81, 0.3);
}
```

### Background Atmosférico
```css
.bg-atmospheric {
  background:
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(200,169,81,0.08) 0%, transparent 70%),
    radial-gradient(ellipse 60% 40% at 80% 80%, rgba(0,212,255,0.05) 0%, transparent 60%),
    #0A0A0F;
}
```

---

## Tipografia (Regras de Hierarquia)

```
CORRETO:
H1: Clash Display 900 weight, 64-96px
H2: Clash Display 700 weight, 36-48px
H3: Space Grotesk 600 weight, 24-28px
Body: Space Grotesk 400 weight, 16-18px
Small/Label: JetBrains Mono 500 weight, 11-12px uppercase tracking

ERRADO:
H1: Roboto 600 weight, 32px
H2: Roboto 500 weight, 24px
Body: Roboto 400 weight, 16px
(tudo parecido = sem hierarquia = AI slop)
```

---

## Checklist antes de entregar

```
□ Nenhuma fonte genérica usada (não Inter, Roboto, Arial)
□ CSS variables no :root (não hardcoded)
□ Cor dominante + accent sharp (não paleta tímida)
□ Animation no page load (mínimo fadeInUp)
□ Background com atmosfera (não cor sólida genérica)
□ Hierarquia tipográfica clara (jump de 3x+ entre tamanhos)
□ HTML completo e self-contained
□ Fontes linkadas corretamente no head
```

---

## Referências Visuais

Imagens antes/depois em `claude-cookbooks-main/images/frontend_aesthetics/`:
- `distilled_saas.png` — O que uma SaaS landing DEVE parecer
- `distilled_dashboard.png` — O que um dashboard DEVE parecer
- `distilled_portfolio.png` — O que um portfolio DEVE parecer
- `baseline_*.png` — O que é AI slop (EVITAR)
