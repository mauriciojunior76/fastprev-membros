# Task 16 - Avaliacao de Iconografia

## Posicao no Pipeline

Executa APOS Fase 2 (Direcao Visual aprovada) e ANTES da Fase de Entrega.
E uma fase CONDICIONAL: Zeus avalia se a marca precisa de iconografia custom.

---

## Criterios de Decisao (Zeus avalia)

### PRECISA de iconografia custom quando:

| Criterio | Peso | Exemplo |
|----------|------|---------|
| Marca tera landing page ou site | ALTO | LP de venda, site institucional |
| Marca tera material educativo | ALTO | Ebook, PDF, carrossel, curso |
| Marca tera dashboard ou app | ALTO | SaaS, plataforma, painel |
| Nicho tecnico ou de inovacao | MEDIO | IA, tech, SaaS, fintech |
| Marca nivel 2 ou 3 (IDENTIDADE/SUPREMO) | MEDIO | Mais entregaveis = mais icones |
| Briefing menciona icones ou elementos graficos | ALTO | Pedido explicito |
| Marca tem pattern library (Rex) | MEDIO | Grafismos precisam de icones |

### NAO precisa de iconografia custom quando:

| Criterio | Exemplo |
|----------|---------|
| Marca so precisa de logo e brandbook | Marca nivel 1 simples |
| Nicho artistico/organico sem UI | Artista, artesao, chef |
| Cliente ja tem sistema de icones proprio | Redesign parcial |
| Nenhum material digital alem do brandbook | Marca offline |

### Decisao

Zeus apresenta ao usuario:

```
AVALIACAO DE ICONOGRAFIA

Segmento: [nicho do cliente]
Conceito visual: [resumo da direcao visual aprovada]
Materiais previstos: [LP, ebook, dashboard, etc.]

RECOMENDACAO: [CRIAR ICONOGRAFIA / PULAR ICONOGRAFIA]
Motivo: [explicacao em 1-2 frases]

Deseja incluir iconografia custom nesta marca?
```

Aceitar: "sim", "pode", "inclui", "quero"
Recusar: "nao", "pula", "sem icones", "depois"

---

## Se APROVADO: Pipeline de Criacao

### Passo 1 - Analise de Contexto (Zeus)

Zeus analisa os outputs ja produzidos:
- `brand-strategy.md` - segmento, publico, tom
- `visual-direction.md` - estetica, densidade, estilo
- `design-tokens.json` - paleta de cores
- `typography-system.md` - fontes e pesos

### Passo 2 - Definicao do Set (Zeus + Icon Forge)

Zeus define com base no conceito:

```yaml
iconografia:
  quantidade: 16-50  # baseado no nivel e materiais
  stroke_weight: "bold|elegant|deluxe"  # baseado na estetica
  paleta_stroke: "derivada do --g2 do design-tokens"
  contextos:
    - landing_page: true/false
    - ebook_pdf: true/false
    - dashboard: true/false
    - carrossel: true/false
    - apresentacao: true/false
  conceitos_obrigatorios:
    - [lista de conceitos baseados no nicho]
```

**Regra de stroke weight por estetica:**

| Estetica da marca | Stroke Weight | Versao |
|-------------------|---------------|--------|
| Forte, impactante, masculina | 1.2 | Bold |
| Elegante, equilibrada, feminina | 0.75 | Elegant |
| Ultra-luxo, minimalista, aristocratica | 0.45 | Deluxe |

### Passo 3 - Criacao dos Icones (Icon Forge)

Cross-call para ICON FORGE squad:
- @icon-master (Glyph) recebe o briefing visual da marca
- @icon-designer (Stroke) cria os icones seguindo exemplo-icon-guide.md
- @icon-system (Grid) valida consistencia do set
- @icon-optimizer (Slim) otimiza SVGs para web

**Spec tecnico OBRIGATORIO (herdado do exemplo-icon-guide.md):**
- viewBox: 0 0 24 24
- fill: none
- stroke: currentColor (cor vem do CSS)
- stroke-linecap: square
- stroke-linejoin: miter
- Max 5 elementos SVG por icone
- Coordenadas inteiras
- Conceitual, nunca literal
- NUNCA rostos ou expressoes

**Adaptacoes por marca:**
- Stroke-width: definido no Passo 2 (1.2, 0.75 ou 0.45)
- Cor do stroke: derivada da paleta da marca (nao hardcoded, via CSS var)
- Gradiente opcional: baseado nos tokens --g1, --g2, --g-accent da marca

### Passo 4 - Preview HTML (Icon Forge)

Gerar pagina de preview seguindo o padrao das 3 versoes Exemplo:
- Grid responsivo com todos os icones
- Seletor de tamanho
- Download SVG e PNG por icone
- Navegacao entre versoes (se mais de uma)

Output: `clientes/{nome-marca}/brand/iconografia/icon-preview.html`

### Passo 5 - Gate de Aprovacao (Zeus)

Zeus apresenta o preview ao usuario:

```
ICONOGRAFIA CUSTOM - [nome da marca]

[X] icones criados
Stroke: [bold/elegant/deluxe] (peso [N])
Paleta: derivada de [cores da marca]

Preview: [link local ou VPS]

Aprovado? Deseja ajustes?
```

Se aprovado: icones sao incluidos no brandbook e na pasta de entrega.
Se reprovado: Zeus solicita ajustes especificos e retorna ao Passo 3.

### Passo 6 - Integracao na Entrega (Art Finalizer)

Art inclui na estrutura de entrega:

```
entrega/{nome-marca}/
├── ... (estrutura existente)
└── 08-iconografia/
    ├── {marca}-icons-preview.html
    ├── svg/
    │   ├── {nome-icone}.svg (cada icone individual)
    │   └── {marca}-icon-sprite.svg (sprite completo)
    ├── png/
    │   ├── {nome-icone}-512.png (cada icone em 512x512)
    │   └── {nome-icone}-128.png (cada icone em 128x128)
    └── README-iconografia.md
        (spec tecnico, regras de uso, tamanhos recomendados)
```

---

## Se NAO APROVADO: Pular

Zeus registra no quality-report.md:
```
Iconografia: PULADA
Motivo: [usuario optou por nao incluir / marca nao necessita]
```

Pipeline continua normalmente para a fase de entrega.

---

## Dependencias

| Input | De quem |
|-------|---------|
| brand-strategy.md | Sage (Fase 1) |
| visual-direction.md | Veda (Fase 2) |
| design-tokens.json | Chroma (Fase 2) |
| typography-system.md | Typo (Fase 2) |
| Aprovacao visual | Gate Fase 2 |

| Output | Para quem |
|--------|-----------|
| icon-preview.html | Usuario (aprovacao) |
| SVGs individuais | Art Finalizer (entrega) |
| PNGs exportados | Art Finalizer (entrega) |
| README-iconografia.md | Living Docs (Arch) |

---

## Agentes Envolvidos

| Agente | Papel |
|--------|-------|
| Zeus (brand-master) | Avalia necessidade, apresenta recomendacao, gate |
| Glyph (icon-master) | Recebe briefing, seleciona biblioteca base |
| Stroke (icon-designer) | Cria icones custom seguindo spec |
| Grid (icon-system) | Valida consistencia do set |
| Slim (icon-optimizer) | Otimiza SVGs, gera sprite |
| Art (art-finalizer) | Inclui na pasta de entrega |
