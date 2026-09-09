# MODO MONSTRO DEV — Workflow Completo

**Squad:** PAGE-FORGE + UX-VISION
**Trigger:** `@page-forge *monstro` ou qualquer página pública de alto impacto
**Duração típica:** 40-120 min dependendo da complexidade
**Output:** Página profissional de alto nível, documentada, revisada e pronta para Elementor se pedido

---

## Diagrama da Cadeia

```
USUÁRIO
  │
  ▼
[IRIS — @page-intake]
  │  5 perguntas estratégicas
  │  Classifica como MONSTRO
  │
  ▼
[VEX — @page-visual-specialist]
  │  Briefing do Iris
  │  Design doc completo:
  │    • Tipografia escolhida + justificativa
  │    • Paleta de cores (CSS variables)
  │    • Motion plan (animações)
  │    • Estrutura de sections
  │    • Atmosfera do background
  │
  ▼ [USUÁRIO APROVA DESIGN DOC]
  │
[UX-VISION SQUAD — 4 agentes em paralelo]
  │  Stella (@ux-analyst)      → Fluxo do usuário, hierarquia, riscos de abandono
  │  Rio (@ui-standards)       → Tamanhos exatos, kerning, espaçamento, contraste
  │  Breeze (@responsive-guard)→ Regras de mobile, tablet, desktop (breakpoints)
  │  Axel (@dev-bridge)        → Estrutura de código limpa para programadores
  │
  │  Output: docs/pages/{nome}/ux-spec.md aprovado
  │
  ▼ [USUÁRIO APROVA UX-SPEC]
  │
[REX — @page-planner]
  │  Design doc aprovado
  │  Cria plan.md com tasks de 2-5 min
  │    • Código exato por task
  │    • Critério de sucesso por task
  │    • Referência ao design doc
  │
  ▼ [USUÁRIO CONFIRMA PLAN]
  │
┌─────────────────────────────┐
│  LOOP POR TASK (N tasks)    │
│                             │
│  [FORGE — @page-implementer] │
│    │  Implementa task       │
│    │  Auto-revisão          │
│    │                        │
│    ▼                        │
│  [KEEN — @page-reviewer]    │
│    │  Stage 1: Spec?        │
│    │  Stage 2: Quality?     │
│    │                        │
│    ├─ REJECTED → Forge fix  │
│    │   (máx 2x por task)    │
│    │                        │
│    └─ APPROVED → next task  │
└─────────────────────────────┘
  │
  ▼ (após todas as tasks)
[PIXEL — @page-qa]
  │  Gate final completo:
  │    • UX check
  │    • Mobile 375px
  │    • Performance
  │    • Acessibilidade básica
  │    • Identidade visual (Vex compliance)
  │
  ├─ REPROVADO → Forge corrige lista de Pixel
  │
  └─ APROVADO
       │
       ▼ [USUÁRIO PEDIU ELEMENTOR?]
       │
       ├─ SIM → Gera {nome}.elementor.json → Revisão → Entrega arquivo
       │
       └─ NÃO → ENTREGA HTML FINAL
            │
            ▼
         docs/pages/{nome}/
         ├── index.html            (página completa)
         ├── design.md             (escolhas do Vex)
         ├── ux-spec.md            (padrões do UX-VISION)
         ├── plan.md               (tasks do Rex)
         └── {nome}.elementor.json (se pedido)
```

---

## Fase 1: Intake (Iris)

**Input:** Demanda crua do usuário
**Output:** Briefing estruturado

Iris coleta:
- Objetivo da página
- Público-alvo
- Referências visuais (se houver)
- Stack tecnológica preferida
- Copy disponível ou a criar

---

## Fase 2: Design (Vex)

**Input:** Briefing do Iris
**Output:** `docs/pages/{nome}/design.md` aprovado

Vex entrega o design doc com:

```markdown
# Design Doc — [Nome da Página]

## Tipografia
**Display:** [Font] — [Uso: headings, hero titles]
**Body:** [Font] — [Uso: parágrafos, labels]
**Mono:** [Font] — [Uso: se aplicável, código/dados]
**Hierarquia:** H1 [Xpx/weight] → H2 [Xpx/weight] → body [Xpx/weight]
**Justificativa:** [Por que essas fontes para esse contexto]

## Paleta de Cores
```css
:root {
  --bg-primary: #[cor];
  --bg-secondary: #[cor];
  --accent-1: #[cor];
  --accent-2: #[cor];
  --text-primary: #[cor];
  --text-muted: #[cor];
  --border: rgba([r,g,b], [opacidade]);
}
```
**Tema:** [dark/light/mixed]
**Inspiração:** [Warframe / IDE / Editorial / etc]

## Motion
**Page load:** [Descrição do reveal inicial]
**Scroll:** [Comportamento ao scroll]
**Hover:** [Efeitos de hover nos elementos]
**Transições:** [Durações e easings]

## Background
**Técnica:** [Gradiente / Padrão geométrico / Noise / etc]
**Código CSS:** [implementação exata]

## Estrutura de Sections
1. [Section 1] — [Propósito]
2. [Section 2] — [Propósito]
...

## Atmosfera Geral
[Descrição em 2-3 frases do feeling da página]
```

**Gate:** Usuário APROVA antes de continuar.

---

## Fase 3: Planejamento (Rex)

**Input:** Design doc aprovado
**Output:** `docs/pages/{nome}/plan.md`

Rex quebra em tasks de 2-5 min cada. Típico:

```
Task 1: Base HTML + CSS variables
Task 2: Tipografia global + resets
Task 3: Background + atmosfera
Task 4: Navigation/Header
Task 5: Hero section
Task 6: [Section específica da página]
...
Task N-1: Animações e motion
Task N: Mobile responsiveness
```

**Gate:** Usuário confirma antes de executar.

---

## Fase 4: Implementação em Cadeia (Forge + Keen)

Para cada task do plan:

```
Forge implementa task
  → Auto-revisão (8 pontos)
  → Keen Stage 1 (spec compliance)
  → Keen Stage 2 (code quality)
    → APPROVED: commit + próxima task
    → REJECTED: Forge corrige → Keen revisa de novo
      → (máx 2 tentativas)
      → Escala para Iris se 2 falhas
```

---

## Fase 5: Gate Final (Pixel)

Após todas as tasks aprovadas pelo Keen:

```
Pixel executa gate completo (25 checkpoints)
  → APROVADO: Entrega
  → APROVADO COM RESSALVAS: Entrega + issues documentados
  → REPROVADO: Lista de correções → Forge corrige → Pixel gate de novo
```

---

## Fase 6: Entrega

```markdown
🎯 PAGE-FORGE — ENTREGA MONSTRO

✅ Intake (Iris): COMPLETO
✅ Design visual (Vex): APROVADO PELO USUÁRIO
✅ Planejamento (Rex): [N] tasks executadas
✅ Implementação (Forge): COMPLETA
✅ Code Review (Keen): [N] tasks aprovadas
✅ UX Gate (Pixel): APROVADO

📁 docs/pages/{nome}/
   index.html — Página final
   design.md  — Design doc do Vex
   plan.md    — Tasks do Rex

🌐 Para visualizar: Abra index.html no browser
```

---

## Estimativas

| Tipo de página | Tasks | Tempo estimado |
|---------------|-------|---------------|
| Landing page simples (1 CTA) | 5-7 | 20-35 min |
| Landing page completa (multi-section) | 8-12 | 35-60 min |
| Dashboard com gráficos | 12-18 | 60-90 min |
| Multi-page layout | 15-25 | 90-150 min |

---

## Uso

```
@page-forge *monstro "landing page para mentoria de copywriting, público de empreendedores 25-40 anos, referência visual: dark/premium, copy disponível"
```
ou simplesmente:
```
@page-intake *monstro "landing page para vender meu curso de tráfego pago"
```

---

## Modo Elementor MONSTRO — Padrão Exemplo

**Ativação:** Quando o output final for WordPress/Elementor em vez de HTML puro.

**Padrão de referência:** `squads/page-forge/lib/elementor/EXEMPLO-CLIENT-STANDARD.md`

### Workflow Elementor (substitui o HTML puro)

```
MATERIAL DO CLIENTE
  │  (copy / transcrição de reunião / apresentação)
  │
  ▼
[EXTRAÇÃO DE CONTEÚDO — seguir EXEMPLO-CLIENT-STANDARD.md intake]
  │  Mapear para content-{cliente}.json
  │  Propor ou extrair palette-{cliente}.json
  │
  ▼
[APROVAÇÃO DO CONTENT.JSON + PALETTE.JSON pelo usuário]
  │
  ▼
[BUILD — executar builder]
  │  node scripts/elementor-builder.js build
  │    --wireframe exemplo
  │    --content content-{cliente}.json
  │    --palette palette-{cliente}.json
  │    --output {cliente}.elementor.json
  │    --preview {cliente}.preview.html
  │
  ▼
[PREVIEW HTML — abrir no browser para aprovação visual]
  │  Ajustar copy, cores, fontes conforme feedback
  │  Rebuildar até aprovado
  │
  ▼
[ENTREGA]
  ├── {cliente}.preview.html      ← referência visual aprovada
  └── {cliente}.elementor.json   ← importar no Elementor WordPress
```

### Intake por Tipo de Material

| Material recebido | O que fazer |
|-------------------|-------------|
| **Copy escrita** (doc/pdf/texto) | Mapear direto para campos do content.json — ver tabela no EXEMPLO-CLIENT-STANDARD.md |
| **Transcrição de reunião** | Extrair das falas: promessa, dores, método, oferta, preço, bio. Reescrever em copy de resposta direta. |
| **Apresentação** (pptx/slides) | Varrer slide a slide mapeando tipo de slide → seção do wireframe |

### Quando usar este modo vs HTML puro

| Situação | Modo |
|----------|------|
| Cliente vai editar no Elementor | Elementor MONSTRO |
| Página vai ao ar sem edição manual | HTML MONSTRO |
| Protótipo / aprovação visual | HTML MONSTRO (mais rápido) |
| Entrega final para WordPress | Elementor MONSTRO |

### Paleta padrão por mercado

Se o cliente não trouxer cores, consultar tabela em `EXEMPLO-CLIENT-STANDARD.md` → seção "Palette por Mercado".

### Estrutura de arquivos por cliente

```
squads/page-forge/lib/elementor/
  content-{cliente}.json       ← copy e textos
  palette-{cliente}.json       ← cores e fontes
  {cliente}.preview.html       ← aprovação visual
  {cliente}.elementor.json     ← entrega final Elementor
```
