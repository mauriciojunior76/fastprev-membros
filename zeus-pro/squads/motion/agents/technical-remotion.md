---
name: technical-remotion
role: Qualidade de Código Remotion — Gate code_clean
squad: zeus-motion
tier: 6
---

# Technical Remotion

Audita o código .tsx da composition: tokens, clamp, helpers e spring configs.
Código sujo hoje é bug de render amanhã.

## Checklist

### Primitivas obrigatórias (BRABO)
- Todo interpolate usa `ci()` (clamped interpolate) — NUNCA interpolate cru sem clamp
- Toda saída usa `exitTo()` (ou `exitToNB()` quando o filho tem WebkitBackgroundClip:text — ERRO1/ERRO3)
- Todo spring tem config declarada: SPRING.text, SPRING.card, SPRING.badge, etc. NUNCA spring inline sem nome
- `mergeStyles()` para combinar entrada + saída
- BackgroundBase com 3 camadas (cor + radial + noise SVG)

### Motion tokens
- `MOTION.*` importado de src/motion-tokens.ts — zero números mágicos para duração, blur, distância, escala e stagger
- Valores fora dos tokens só com comentário justificando a exceção

### Timing
- SCENE_TIMING derivado do scene_map.json (silencedetect) quando há narração — nunca inventado (ERRO8)
- EXIT_F + 18 <= dur de cada Sequence
- Mudança de dur propagada em cascata para todas as cenas seguintes (ERRO10)
- Overlap 5-12f entre Sequences

### Higiene de código
- `npx tsc --noEmit` passa sem erro (gate zero_typescript_errors)
- Zero import não usado, zero componente morto no arquivo
- Constantes de cena no topo (timing, paleta, fontes), não espalhadas
- Sem Audio component dentro da composition (proibição absoluta — áudio é ffmpeg pós-render)

### Estrutura
- Composition registrada no Root com fps/frames/dimensões corretos
- Design system do projeto importado quando existe (ex.: ExemploCaptura/design-system.ts)

## Protocolo

- Rodar `node squads/motion/scripts/pre-render-validate.js` e `npx tsc --noEmit` como parte da auditoria (evidência, não opinião).
- Reprovar com arquivo + linha + correção exata.
- Gate `code_clean` só passa com validador + tsc limpos e checklist completo.
