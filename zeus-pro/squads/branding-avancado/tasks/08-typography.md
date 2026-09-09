# Task 08 — Tipografia e Hierarquia

**Executor:** Typo (typography)
**Fase:** 2 — Direção Visual
**Paralelo:** Com Veda (visual-direction), Mark (logo), Chroma (colors)
**Nível:** Todos (1, 2, 3)

---

## Inputs

| Arquivo | Fornecido por | Obrigatório |
|---------|---------------|-------------|
| `visual-direction.md` | Veda | SIM |
| `archetypes.md` | Mira | SIM |
| `brand-strategy.md` | Sage | SIM |
| `design-tokens.json` | Chroma | NÃO (calibra quando disponível) |

---

## Princípio Fundamental

Tipografia não é estética — é voz. A fonte comunica antes mesmo que o texto seja lido. A seleção tipográfica deve ser rastreável ao arquétipo e ao tom de voz, não apenas ao gosto pessoal ou à popularidade da fonte.

---

## Proibições Globais de Tipografia

As seguintes fontes são banidas como fonte principal por serem genéricas demais para criar identidade:

- **Inter** — usada por 60%+ das startups de tecnologia desde 2020
- **Roboto** — fonte padrão do Material Design / Google
- **Open Sans** — fonte corporativa sem personalidade
- **Lato** — versão mais suave do mesmo problema
- **Montserrat** — geek/startup genérico
- **Poppins** — "startup elegante" sem diferenciação
- **Arial/Helvetica** — apenas em contextos de fallback de sistema

> Exceção: essas fontes podem ser usadas como fonte de **sistema/fallback** ou em contextos técnicos específicos, nunca como identidade.

---

## Protocolo de Execução

```
STEP 1: Identificar caráter tipográfico coerente com o arquétipo
        → Mapa de caráter por arquétipo (ver tabela de referência abaixo)
        → Qual sensação a fonte deve transmitir antes mesmo de ser lida?
        → Adjetivos tipográficos que devem se materializar nas fontes escolhidas

STEP 2: Selecionar família principal com justificativa
        → Família principal: usada em headlines e display
        → Justificativa em 3 dimensões:
           → Psicológica: o que transmite emocionalmente
           → Estratégica: como serve ao posicionamento
           → Técnica: legibilidade, suporte de caracteres, formatos disponíveis
        → Verificar suporte a caracteres especiais do PT-BR (ç, ã, á, etc.)
        → Verificar disponibilidade: Google Fonts, Adobe Fonts, licença comercial

STEP 3: Selecionar família secundária (contraste funcional)
        → Deve complementar a principal, não competir
        → Contraste intencional: se principal é serif display → secundária sans-serif
        → Usada em: corpo de texto, legendas, UI labels
        → Mesmos critérios de verificação da principal

STEP 4: Construir escala tipográfica (mínimo 6 níveis)
        → Usar progressão modular (ratio: 1.25 Minor Third / 1.333 Perfect Fourth / 1.5 Perfect Fifth)
        → Documentar: nome do nível, tamanho (px e rem), peso, uso previsto
        → N1: 6 níveis mínimos
        → N2: 8 níveis
        → N3: 10+ níveis com variações responsivas

STEP 5: Definir line-height e letter-spacing por nível
        → line-height: display (1.1–1.2), headings (1.2–1.3), body (1.5–1.7), small (1.4–1.6)
        → letter-spacing: display (−0.03em a +0.02em), headings (−0.02em a +0.01em)
        → Documentar em tokens (não valores absolutos)

STEP 6: Documentar hierarquia por contexto
        → Hierarquia digital (web/app)
        → Hierarquia impressa (se aplicável)
        → Hierarquia de apresentação/deck

STEP 7: Gerar design tokens tipográficos
        → fontFamily, fontSize, fontWeight, lineHeight, letterSpacing
        → Integrar ao design-tokens.json de Chroma

STEP 8: Documentar licenciamento de todas as fontes
        → Nome da licença, URL de download/compra, custo (se houver)
        → Restrições de uso (embedding, subsets, etc.)
```

---

## Output

**Arquivo:** `typography-system.md`

### Estrutura obrigatória do documento:

```markdown
# Sistema Tipográfico — [Nome]

## Família Principal — [Nome da Fonte]
**Categoria:** [Serif / Sans-serif / Display / Monospace / Slab]
**Pesos disponíveis:** [lista de pesos — 400, 500, 600, 700, etc.]
**Licença:** [tipo de licença] — [URL]
**Custo:** [incluso / R$ X por desktop license / etc.]

**Justificativa psicológica:** [o que a fonte transmite antes de ser lida]
**Justificativa estratégica:** [como serve ao posicionamento]
**Justificativa técnica:** [legibilidade, suporte PT-BR, disponibilidade]

**Uso principal:**
- Headlines (H1, H2, H3)
- Display / Hero text
- Citações / Pull quotes

---

## Família Secundária — [Nome da Fonte]
**Categoria:** [Serif / Sans-serif / Display / Monospace / Slab]
**Pesos disponíveis:** [lista]
**Licença:** [tipo] — [URL]

**Contraste intencional com a principal:** [como se complementam]
**Uso principal:**
- Corpo de texto (parágrafos)
- Labels e legendas
- UI text

---

## Família de Código/Mono (se aplicável — N2/N3)
**Família:** [nome]
**Uso:** blocos de código, dados, interfaces técnicas

---

## Escala Tipográfica

| Nível | Nome | Tamanho (px) | Tamanho (rem) | Peso | Line-height | Letter-spacing | Uso |
|-------|------|-------------|--------------|------|-------------|---------------|-----|
| T1 | Display XL | 72 | 4.5rem | 700 | 1.1 | -0.03em | Hero principal |
| T2 | Display L | 56 | 3.5rem | 700 | 1.1 | -0.02em | Heading página |
| T3 | Heading 1 | 40 | 2.5rem | 600 | 1.2 | -0.01em | H1 de seção |
| T4 | Heading 2 | 32 | 2rem | 600 | 1.2 | 0 | H2 de seção |
| T5 | Heading 3 | 24 | 1.5rem | 600 | 1.3 | 0 | H3 de subseção |
| T6 | Body L | 18 | 1.125rem | 400 | 1.7 | 0 | Texto principal |
| T7 | Body M | 16 | 1rem | 400 | 1.7 | 0 | Corpo padrão |
| T8 | Body S | 14 | 0.875rem | 400 | 1.6 | 0.01em | Legendas |
| T9 | Label | 12 | 0.75rem | 500 | 1.4 | 0.04em | UI labels |
| T10 | Micro | 10 | 0.625rem | 500 | 1.4 | 0.05em | Timestamps |

---

## Design Tokens Tipográficos

```json
{
  "typography": {
    "family": {
      "display": { "$value": "[fonte-principal], serif", "$type": "fontFamily" },
      "body": { "$value": "[fonte-secundária], sans-serif", "$type": "fontFamily" },
      "mono": { "$value": "[fonte-mono], monospace", "$type": "fontFamily" }
    },
    "size": {
      "display-xl": { "$value": "4.5rem", "$type": "dimension" },
      "display-l": { "$value": "3.5rem", "$type": "dimension" },
      "h1": { "$value": "2.5rem", "$type": "dimension" },
      "h2": { "$value": "2rem", "$type": "dimension" },
      "h3": { "$value": "1.5rem", "$type": "dimension" },
      "body-l": { "$value": "1.125rem", "$type": "dimension" },
      "body-m": { "$value": "1rem", "$type": "dimension" },
      "body-s": { "$value": "0.875rem", "$type": "dimension" },
      "label": { "$value": "0.75rem", "$type": "dimension" }
    },
    "weight": {
      "regular": { "$value": 400, "$type": "fontWeight" },
      "medium":  { "$value": 500, "$type": "fontWeight" },
      "semibold": { "$value": 600, "$type": "fontWeight" },
      "bold":    { "$value": 700, "$type": "fontWeight" }
    },
    "lineHeight": {
      "tight":    { "$value": 1.1, "$type": "number" },
      "snug":     { "$value": 1.2, "$type": "number" },
      "normal":   { "$value": 1.5, "$type": "number" },
      "relaxed":  { "$value": 1.7, "$type": "number" }
    }
  }
}
```

---

## Hierarquia por Contexto

### Digital (web/app)
[tabela: nível → fonte → peso → tamanho → uso específico]

### Apresentação/Deck
[como a hierarquia muda em slides — fontes maiores, pesos diferentes]

### Impresso (se aplicável)
[considerações de DPI, sangria, leading em impressão]

---

## Combinações Aprovadas

| Contexto | Display/Heading | Body | Label |
|----------|----------------|------|-------|
| Hero section | [família+peso] | — | — |
| Seção informativa | [família+peso] | [família+peso] | [família+peso] |
| Card de produto | [família+peso] | [família+peso] | [família+peso] |
| Interface de app | [família+peso] | [família+peso] | [família+peso] |
```

---

## Critérios de Qualidade

| Critério | Regra | Verificação |
|----------|-------|-------------|
| Nenhuma fonte banida como principal | Inter, Roboto, Open Sans, Lato, Poppins, Montserrat proibidas | Verificação feita? |
| Escala tem mínimo 6 níveis | N1: 6, N2: 8, N3: 10+ | Contagem feita? |
| Licenciamento de cada fonte | Nome da licença e URL para todas as fontes | Ambas documentadas? |
| Suporte PT-BR verificado | Caracteres especiais: ç, ã, á, é, ó, ú, etc. | Verificação feita? |
| Design tokens cobrem 4 dimensões | family, size, weight, lineHeight — pelo menos | Todas presentes? |
| Line-height por tipo de texto | Display diferente de body diferente de label | Variação documentada? |
| Combinações aprovadas têm contextos | Não genéricas — exemplos reais de uso | Contextos específicos? |

---

## Mapa de Caráter Tipográfico por Arquétipo

| Arquétipo | Caráter tipográfico | Categorias recomendadas |
|-----------|--------------------|-----------------------|
| Herói | Forte, dinâmico, assertivo | Sans-serif condensed, geometric bold |
| Mago | Misterioso, refinado, singular | Serif display com detalhes únicos |
| Sábio | Preciso, estruturado, legível | Humanist sans-serif ou text serif |
| Criador | Expressivo, textural, único | Variable fonts, display com personalidade |
| Governante | Autoritário, clássico, elegante | Transitional ou Modern serif |
| Amante | Suave, sensorial, próximo | Italic serif display, sans com curvatura |
| Explorador | Aberto, dinâmico, moderno | Geometric sans com espaçamento generoso |
| Fora-da-lei | Disruptivo, cru, intenso | Condensed bold, contraste extremo |
| Cuidador | Acolhedor, claro, humano | Humanist sans-serif amigável |

---

## Integração com Outros Agentes

| Agente | Recebe de Typo | Usa para |
|--------|---------------|---------|
| Chroma (color-tokens) | tokens tipográficos | Integrar ao design-tokens.json |
| Pixel (ui-brand-system) | `typography-system.md` | Sistema tipográfico de UI |
| Slide (brand-deck) | `typography-system.md` | Hierarquia do deck |
| Arch (living-docs) | `typography-system.md` | Documentar no brandbook |

---

## Referências

- Squad: `squads/brand/SQUAD.md`
- Task de input principal: `tasks/05-visual-direction.md`
- Tasks paralelas: `tasks/06-logo-system.md`, `tasks/07-color-tokens.md`
- Próxima fase: `tasks/09-ui-brand-system.md`
