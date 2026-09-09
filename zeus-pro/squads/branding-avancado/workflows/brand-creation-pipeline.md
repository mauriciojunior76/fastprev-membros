# Brand Creation Pipeline — Workflow de Orquestração

## Visão Geral

Pipeline de criação de marca do BRAND SQUAD SUPREMO. Adapta-se ao nível selecionado (1, 2 ou 3) com fases sequenciais e paralelas, gates humanos obrigatórios e entrega profissional via Arte Finalista.

**Princípio:** Tasks são lei. Cada task define inputs, outputs e dependências. Agentes executam tarefas em paralelo quando sem dependência, e em sequência quando há dependência de output.

---

## FASE 0 — INTAKE E SELEÇÃO DE NÍVEL

**Executor:** Zeus (brand-master)
**Blocker:** SIM — sem seleção de nível, nada avança
**Paralelo:** NÃO

```
INPUT: Qualquer demanda de branding (palavras-chave ou briefing direto)

STEP 1: Zeus ativa o squad
STEP 2: Zeus apresenta os 3 níveis com descrição clara
STEP 3: Aguardar seleção do usuário → [GATE: level-selection-gate]
STEP 4: Zeus coleta o briefing mínimo (11 campos)
          → Se campos faltando: Zeus infere com base no contexto
          → Zeus documenta inferências explicitamente ("Inferido: ...")
STEP 5: Zeus expande briefing em dados estratégicos preliminares
STEP 6: Zeus define quais agentes serão ativados para o nível escolhido
STEP 7: Zeus inicia Fase 1

OUTPUT: briefing-expandido.md + plano de execução por nível
```

### Briefing Mínimo (11 campos que Zeus coleta):
```
1. Nome da marca (ou "sugerir" para Zeus gerar)
2. Nicho/setor de atuação
3. O que vende ou entrega
4. Para quem (ICP básico — tipo de pessoa, não demográfico)
5. Transformação prometida (antes → depois)
6. Estilo desejado (ex: minimalista, dark, editorial, futurista)
7. Palavras que a marca DEVE transmitir (3-5 palavras)
8. Palavras que a marca NUNCA deve transmitir (3-5 palavras)
9. Marcas de referência visual (2-3 marcas)
10. Sensação desejada ao ver a marca
11. Orçamento para assets externos? (afeta prompts pagos com IA)
```

---

## FASE 1 — ESTRATÉGIA E PERSONALIDADE

**Nível 1:** Sage + Mira + Lexi (paralelo parcial)
**Nível 2:** Sage + Mira + Lexi + Nara (paralelo)
**Nível 3:** Sage + Mira + Lexi + Nara (paralelo)

```
[Sage] brand-strategy.md
  → Posicionamento, proposta de valor, tese de marca,
    pilares de percepção, diferenciação competitiva

[Mira] archetypes.md ← (paralelo com Sage)
  → Matriz de arquétipos, personalidade, tom psicológico,
    traços, energia da marca, o que a marca nunca é

[Lexi] brand-voice.md ← (paralelo com Mira)
  → Naming validation/geração, slogan, vocabulário oficial,
    palavras permitidas/proibidas, linguagem proprietária

[Nara] storytelling.md ← (N2/N3 paralelo com Lexi) ← omitido no N1
  → Manifesto, origem da marca, visão, missão,
    narrativa curta + expandida, frases de impacto
```

**Sincronização:** Zeus aguarda todos os outputs da Fase 1 antes de iniciar Fase 2.

---

## FASE 2 — DIREÇÃO VISUAL (PARALELO TOTAL)

**Todos os níveis:** Veda + Mark + Chroma + Typo em paralelo
**Blocker:** visual-direction-approval-gate após síntese

```
[Veda] visual-direction.md ← paralelo
  → Conceito visual, moodboard verbal, direção de arte,
    universo estético, contraste, ritmo, composição, sensação

[Mark] logo-rationale.md ← paralelo
  → Racional conceitual de símbolo, direções (monograma/wordmark/emblem),
    construção lógica, proporções, área de respiro, restrições

[Chroma] design-tokens.json + color-system.md ← paralelo
  → Paleta primária/secundária/neutros/destaque,
    semântica de cor, tokens JSON, regras de contraste,
    uso em fundo/texto/borda/brilho/estados

[Typo] typography-system.md ← paralelo
  → Fontes principal e secundária, escalas de títulos,
    subtítulos, textos institucionais, UI, tracking, line-height
```

**Gate obrigatório:** Zeus apresenta síntese visual (direção + paleta + tipografia) e aguarda aprovação antes de continuar.

---

## FASE 2.5 — AVALIAÇÃO DE ICONOGRAFIA (CONDICIONAL)

**Executor:** Zeus (brand-master) + Icon Forge Squad (cross-call)
**Blocker:** SIM — gate de decisão (criar ou pular)
**Paralelo:** NÃO (depende da aprovação visual da Fase 2)
**Todos os níveis:** Zeus avalia; execução só se aprovada

```
INPUT: Outputs da Fase 1 + Fase 2 aprovados

STEP 1: Zeus analisa segmento, conceito e materiais previstos
        → Marca terá LP/site? Ebook/PDF? Dashboard? Carrossel?
        → Nicho técnico ou de inovação?
        → Nível 2/3 com pattern library?

STEP 2: Zeus apresenta RECOMENDAÇÃO ao usuário
        → "CRIAR ICONOGRAFIA" ou "PULAR ICONOGRAFIA"
        → Com motivo claro baseado no contexto

STEP 3: [GATE: iconography-decision-gate]
        → Aprovado: Zeus define stroke weight + quantidade + conceitos
        → Recusado: registrar no quality-report e pular para Fase 3

STEP 4: [SE APROVADO] Cross-call para ICON FORGE squad
        [Glyph] recebe briefing visual da marca
        [Stroke] cria ícones seguindo exemplo-icon-guide.md
        [Grid] valida consistência do set
        [Slim] otimiza SVGs e gera preview HTML

STEP 5: Zeus apresenta preview ao usuário → [GATE: iconography-approval-gate]
        → Aprovado: ícones incluídos na entrega
        → Ajustes: retorna ao Step 4
        → Máx 2 rodadas de ajuste

OUTPUT: icon-preview.html + SVGs + PNGs (ou skip registrado)
```

**Regra de stroke weight por estética da marca:**

| Estética | Stroke | Versão |
|----------|--------|--------|
| Forte, impactante, masculina | 1.2 | Bold |
| Elegante, equilibrada, feminina | 0.75 | Elegant |
| Ultra-luxo, minimalista, aristocrática | 0.45 | Deluxe |

**Task detalhada:** `tasks/16-iconography-assessment.md`

---

## FASE 3 — SISTEMA E APLICAÇÕES (N2/N3 APENAS)

**Nível 1:** PULAR — ir direto para Fase 4
**Nível 2:** Pixel + Rex + Kira (paralelo parcial)
**Nível 3:** Pixel + Rex + Flow + Kira (paralelo)

```
[Pixel] ui-guidelines.md ← paralelo N2/N3
  → Princípios de layout, cards, botões, painéis,
    seções hero, componentes institucionais, dark/light mode

[Rex] pattern-library.md ← paralelo N2/N3
  → Ornamentos, padrões, linhas, grafismos, texturas,
    elementos de fundo, sobreposições, formas de profundidade

[Flow] motion-system.md ← N3 apenas
  → Motion principles, entradas/saídas, microanimações,
    ritmo, aceleração, transições de slides

[Kira] applications.md ← paralelo N2/N3
  → Aplicações em capa, slides, site, Instagram, dashboard,
    favicon, papelaria digital, proposta premium
```

---

## FASE 4 — ENTREGA FINAL (PARALELO PARCIAL)

**Nível 1:** Slide → Arch → Quinn (sequência)
**Nível 2/3:** Luma + Slide (paralelo) → Arch → Quinn

```
[Luma] visual-prompts.md ← N2/N3, paralelo com Slide
  → Prompts para logo (IA), concept art, identidade visual,
    slides hero, backgrounds, mockups, coerentes com o sistema criado

[Slide] presentation-structure.md + slide-content.md ← paralelo com Luma
  → Estrutura do deck (8/14/20 slides por nível),
    ordem narrativa, capítulos, conteúdo de cada slide,
    instruções de composição por slide

[Arch] brandbook-master.md ← após Luma e Slide
  → Brandbook completo consolidado, quick guide,
    brand rules, checklist de consistência, mapa de módulos

[Quinn] quality-report.md ← após Arch
  → Relatório de coerência, inconsistências identificadas,
    correções aplicadas, validação final do ecossistema
```

---

## GATE FINAL — APROVAÇÃO HUMANA

```
Quinn entrega quality-report.md

Zeus apresenta ao usuário:
  "✅ Sistema de marca completo e validado.
   📦 Deseja gerar a pasta de entrega profissional para o cliente?
   Art (Arte Finalista) irá criar as variações de logo e o PDF."

AGUARDAR aprovação explícita do usuário.
Aprovação aceita: 'sim', 'vai', 'pode', 'aprovado', 'gera', 'pode finalizar'

[SE APROVADO] → Fase de Arte Finalista
[SE REPROVADO] → Zeus solicita revisão específica e retorna ao agente responsável
```

---

## FASE FINAL — ARTE FINALISTA (PÓS-APROVAÇÃO)

**Executor:** Art (art-finalizer)
**Nível 1/2/3:** Sempre executa (conteúdo varia por nível)

```
Art cria a estrutura:
entrega/{nome-marca}/
├── 01-logo-principal/
│   ├── {marca}-logo-positivo.svg
│   ├── {marca}-logo-positivo.png (500px + 2000px)
│   ├── {marca}-logo-negativo.svg (para fundos escuros)
│   ├── {marca}-logo-negativo.png
│   ├── {marca}-logo-branco.svg (só branco)
│   ├── {marca}-logo-preto.svg (só preto)
│   └── {marca}-logo-mono.svg (monocromático)
├── 02-isotipo-simbolo/
│   ├── {marca}-isotipo-positivo.svg
│   ├── {marca}-isotipo-positivo.png
│   ├── {marca}-isotipo-negativo.svg
│   └── {marca}-isotipo-favicon.png (32x32, 64x64, 128x128)
├── 03-wordmark/            ← N2/N3
│   ├── {marca}-wordmark-positivo.svg
│   ├── {marca}-wordmark-negativo.svg
│   └── {marca}-wordmark-colorido.svg
├── 04-cores-oficiais/
│   ├── paleta-oficial.md (HEX + RGB + CMYK)
│   └── design-tokens.json
├── 05-tipografia/
│   └── tipografia-oficial.md (fontes + onde licenciar)
├── 06-apresentacao/
│   ├── {marca}-brandbook.pdf (estrutura + instruções de montagem)
│   └── {marca}-quickguide.pdf (1 pager de uso)
├── 07-instrucoes/
│   └── README-uso-da-marca.md (regras de uso para o cliente)
└── 08-iconografia/              ← SE iconografia aprovada na Fase 2.5
    ├── {marca}-icons-preview.html
    ├── svg/ (ícones individuais .svg)
    ├── png/ (cada ícone em 512x512 e 128x128)
    └── README-iconografia.md (spec, regras de uso, tamanhos)

Art gera também:
  - Prompts específicos para criar cada variação com IA de logo (Midjourney/Stable Diffusion)
  - Instruções de criação em Figma ou Illustrator
  - README com regras claras de uso e área de respiro
```

---

## Fluxo de Fallback e Escalação

| Situação | Ação |
|----------|------|
| Aprovação visual reprovada | Veda + Chroma + Typo revisam → reapresenta |
| Inconsistência detectada por Quinn | Agente responsável corrige → Quinn revalida |
| Usuário solicita mudança após Quinn | Zeus roteiam para agente correto |
| Agente incompleto | Zeus escalona para brand-master review |
| Arte finalista: ambiguidade de logo | Art especifica alternativas e aguarda decisão |
| Iconografia reprovada | Zeus solicita ajustes, Stroke refaz (máx 2 rodadas) |
| Iconografia pulada | Zeus registra motivo no quality-report, pipeline continua |

---

## Outputs Consolidados

Ao final do pipeline, o sistema entrega:

**Por arquivo:**
- `brand-strategy.md` — Sage
- `archetypes.md` — Mira
- `brand-voice.md` — Lexi
- `storytelling.md` — Nara (N2/N3)
- `visual-direction.md` — Veda
- `logo-rationale.md` — Mark
- `design-tokens.json` — Chroma
- `typography-system.md` — Typo
- `ui-guidelines.md` — Pixel (N2/N3)
- `pattern-library.md` — Rex (N2/N3)
- `motion-system.md` — Flow (N3)
- `applications.md` — Kira (N2/N3)
- `visual-prompts.md` — Luma (N2/N3)
- `presentation-structure.md` — Slide
- `brandbook-master.md` — Arch
- `quality-report.md` — Quinn
- `icon-preview.html` — Icon Forge (Fase 2.5, condicional)
- `SVGs + PNGs de ícones` — Icon Forge (Fase 2.5, condicional)
- `README-iconografia.md` — Icon Forge (Fase 2.5, condicional)
- `entrega/{marca}/` — Art (pós-aprovação)
