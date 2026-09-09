# Task 09 — UI Brand System

**Executor:** Pixel (ui-brand-system)
**Fase:** 3 — Sistema e Aplicações
**Paralelo:** Com Rex (pattern-library)
**Nível:** 2 e 3 apenas (omitido no N1)

---

## Inputs

| Arquivo | Fornecido por | Obrigatório |
|---------|---------------|-------------|
| `visual-direction.md` | Veda | SIM |
| `design-tokens.json` | Chroma | SIM |
| `typography-system.md` | Typo | SIM |
| `brand-strategy.md` | Sage | SIM |
| `archetypes.md` | Mira | NÃO (calibra quando disponível) |

> **Nota:** Pixel é o primeiro agente da Fase 3 e define a base técnica para Kira (applications) e Flow (motion). Deve ser o primeiro a finalizar nesta fase.

---

## Princípio Fundamental

O UI Brand System não é apenas CSS — é a materialização da marca em interface. Cada decisão (radius de botão, spacing de card, estilo de input) comunica o arquétipo. Um Governante usa bordas retas e hierarquia rigorosa. Um Amante usa bordas suaves e espaços generosos. Um Mago usa profundidade e contraste dramático.

---

## Protocolo de Execução

```
STEP 1: Definir princípios de UI da marca (3–5)
        → Cada princípio: nome + regra prática + exemplo de aplicação
        → Os princípios devem derivar do arquétipo (não ser genéricos)
        → Ex: Princípio "Densidade Intencional" para marca Governante:
          "Cada pixel tem propósito. Zero espaço desperdiçado. A densidade é um sinal de respeito pelo usuário."

STEP 2: Especificar sistema de grid
        → Número de colunas: 4 (mobile), 8 (tablet), 12 (desktop)
        → Gutter: tamanho em px/rem por breakpoint
        → Margin lateral: tamanho em px/rem por breakpoint
        → Breakpoints mínimos: 375px (mobile), 768px (tablet), 1280px (desktop)
        → Max-width do container (se houver)

STEP 3: Construir spacing scale
        → Base: 4px ou 8px (documentar qual e por quê)
        → Escala: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 (se base 4px)
        → Nomear cada valor: xs, sm, md, lg, xl, 2xl, 3xl, 4xl
        → Documentar uso de cada nível

STEP 4: Especificar componentes core
        → Botões (3 variações obrigatórias + 5 estados cada)
        → Cards (estrutura, padding, border-radius, sombra)
        → Inputs de formulário (text, select, checkbox, radio)
        → Hero section (estrutura e hierarquia)
        → Tags/badges
        → Modais/overlays

STEP 5: Definir dark/light mode com tokens semânticos
        → Usar tokens semânticos de Chroma — não inverter cores diretamente
        → Documentar quais tokens mudam e para qual valor no dark mode
        → Verificar WCAG em ambos os modos

STEP 6: Documentar todos os estados de UI
        → Para cada componente interativo: default, hover, focus, active, disabled, error, loading
        → Focus ring: visível e coerente com a marca (não apenas o outline padrão do browser)
        → Transição entre estados: duração e easing

STEP 7: Especificar motion básico (N2) ou delegar para Flow (N3)
        → N2: Pixel define durations e easings básicos
        → N3: Pixel define princípios; Flow (motion-system) executa o sistema completo
```

---

## Output

**Arquivo:** `ui-guidelines.md`

### Estrutura obrigatória do documento:

```markdown
# UI Brand System — [Nome]

## Princípios de UI

### Princípio 1: [Nome]
**Regra:** [regra prática]
**Aplicação:** [exemplo concreto]
**Conexão com arquétipo:** [como deriva do arquétipo]

### Princípio 2: [...]
### Princípio 3: [...]
[+ 2 adicionais se necessário]

---

## Sistema de Grid

| Breakpoint | Colunas | Gutter | Margin | Container max-width |
|------------|---------|--------|--------|---------------------|
| Mobile (375px+) | 4 | [X]px | [X]px | 100% |
| Tablet (768px+) | 8 | [X]px | [X]px | 100% |
| Desktop (1280px+) | 12 | [X]px | [X]px | [X]px |
| Wide (1440px+) | 12 | [X]px | [X]px | [X]px |

---

## Spacing Scale

**Base:** [4px ou 8px]
**Razão:** [por que esse base para essa marca]

| Token | Valor | Uso típico |
|-------|-------|-----------|
| spacing-1 (xs) | 4px | Gap entre ícone e label |
| spacing-2 (sm) | 8px | Padding interno de tag |
| spacing-3 (md) | 12px | Gap entre elementos de form |
| spacing-4 (lg) | 16px | Padding de card pequeno |
| spacing-6 (xl) | 24px | Padding de card padrão |
| spacing-8 (2xl) | 32px | Espaço entre seções internas |
| spacing-12 (3xl) | 48px | Padding de seção |
| spacing-16 (4xl) | 64px | Espaço entre seções |
| spacing-24 (5xl) | 96px | Padding de hero |

---

## Componentes Core

### Botões

#### Variação 1: Primário (CTA principal)
- Background: `{color.semantic.brand.primary}`
- Texto: `{color.semantic.text.on-brand}`
- Border-radius: [X]px
- Padding: [Y]px [X]px
- Font: [família, peso, tamanho]

**Estados:**
| Estado | Background | Texto | Border | Sombra |
|--------|-----------|-------|--------|--------|
| Default | brand-primary | on-brand | none | none |
| Hover | brand-primary-dark | on-brand | none | elevation-1 |
| Focus | brand-primary | on-brand | focus-ring 2px | none |
| Active | brand-primary-darker | on-brand | none | none |
| Disabled | neutral-200 | neutral-400 | none | none |

#### Variação 2: Secundário (ghost/outline)
[mesmo formato]

#### Variação 3: Terciário (texto/link-button)
[mesmo formato]

---

### Cards

**Estrutura base:**
- Background: `{color.semantic.background.secondary}`
- Border: 1px solid `{color.semantic.border.default}`
- Border-radius: [X]px
- Padding: `{spacing-6}` = 24px
- Sombra: [shadow token ou none]

**Elevações (se houver sistema):**
| Nível | box-shadow |
|-------|-----------|
| elevation-0 | none |
| elevation-1 | [valor] |
| elevation-2 | [valor] |

---

### Inputs de Formulário

**Text Input:**
- Border: 1px solid `{border.default}`
- Border-radius: [X]px
- Padding: [Y]px [X]px
- Font: body-m, weight regular

**Estados:**
| Estado | Border | Label | Helper text |
|--------|--------|-------|------------|
| Default | border-default | text-secondary | text-muted |
| Focus | brand-primary | text-primary | text-muted |
| Error | feedback-error | feedback-error | feedback-error |
| Disabled | border-muted | text-muted | — |
| Success | feedback-success | text-primary | feedback-success |

---

### Focus Ring
**Estilo:** [outline ou box-shadow]
**Cor:** `{color.semantic.brand.primary}` com 30% alpha
**Tamanho:** 2px
**Offset:** 2px
**Aplicação:** Todos os elementos interativos via `:focus-visible`

---

## Dark/Light Mode

### Tokens que mudam no Dark Mode

| Token semântico | Light | Dark |
|----------------|-------|------|
| background.primary | neutral-0 (#fff) | neutral-950 (#...) |
| background.secondary | neutral-100 | neutral-900 |
| text.primary | neutral-900 | neutral-50 |
| text.secondary | neutral-600 | neutral-400 |
| border.default | neutral-200 | neutral-800 |

---

## Motion Básico (N2)
*(N3: delegar ao Flow — motion-system)*

**Durations:**
| Token | Valor | Uso |
|-------|-------|-----|
| duration-instant | 0ms | Sem animação — cambio de estado seco |
| duration-fast | 100ms | Hover simples, toggle |
| duration-normal | 200ms | Transições de componente |
| duration-slow | 300ms | Modais, drawers |
| duration-slower | 500ms | Animações de página |

**Easings:**
| Token | Valor | Uso |
|-------|-------|-----|
| ease-default | cubic-bezier(0.16, 1, 0.3, 1) | Maioria das transições |
| ease-in | cubic-bezier(0.55, 0, 1, 0.45) | Elementos que saem |
| ease-out | cubic-bezier(0, 0.55, 0.45, 1) | Elementos que entram |
| ease-spring | cubic-bezier(0.34, 1.56, 0.64, 1) | Interações lúdicas |
```

---

## Critérios de Qualidade

| Critério | Regra | Verificação |
|----------|-------|-------------|
| Grid tem 3 breakpoints mínimos | Mobile, tablet, desktop | Todos presentes? |
| Spacing scale baseada em múltiplos | 4px ou 8px de base — não aleatória | Base documentada? |
| Botões têm 3 variações + 5 estados cada | Primário, secundário, terciário × default/hover/focus/active/disabled | Completo? |
| Dark mode usa tokens semânticos | Não inverter cores — trocar tokens | Semântica mantida? |
| Focus ring visível em todos os interativos | `:focus-visible` aplicado | Implementação? |
| Princípios de UI conectam ao arquétipo | Cada princípio tem "conexão com arquétipo" | Campo preenchido? |
| WCAG verificado em ambos os modos | 4.5:1 no mínimo em light e dark | Verificação feita? |

---

## Integração com Outros Agentes

| Agente | Recebe de Pixel | Usa para |
|--------|----------------|---------|
| Rex (pattern-library) | `ui-guidelines.md` | Aplicar sistema nos grafismos |
| Flow (motion-system) | `ui-guidelines.md` | Estender motion além do básico |
| Kira (applications) | `ui-guidelines.md` | Aplicar sistema nas aplicações |
| Arch (living-docs) | `ui-guidelines.md` | Documentar no brandbook |

---

## Referências

- Squad: `squads/brand/SQUAD.md`
- Tasks de input: `tasks/05-visual-direction.md`, `tasks/07-color-tokens.md`, `tasks/08-typography.md`
- Tasks paralelas: `tasks/10-patterns-motion.md`
- Próxima fase: `tasks/11-applications.md`
- Nível: disponível apenas para N2 e N3
