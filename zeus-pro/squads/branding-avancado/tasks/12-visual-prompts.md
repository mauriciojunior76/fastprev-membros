# Task 12 — Prompts Visuais para IA

**Executor:** Luma (visual-prompts)
**Fase:** 4 — Entrega Final
**Paralelo:** Com Slide (brand-deck)
**Nível:** 2 (3–5 prompts dos Blocos 1, 2, 3) e 3 (biblioteca completa — todos os 5 blocos)

---

## Inputs

| Arquivo | Fornecido por | Obrigatório |
|---------|---------------|-------------|
| `visual-direction.md` | Veda | SIM |
| `archetypes.md` | Mira | SIM |
| `design-tokens.json` | Chroma | SIM |
| `logo-rationale.md` | Mark | SIM |
| `typography-system.md` | Typo | NÃO |
| `pattern-library.md` | Rex | NÃO |

---

## Princípio Fundamental

Prompts para IA de imagem não são descrições livres — são especificações técnicas da marca em linguagem de geração. Um bom prompt de marca é calibrado: inclui o estilo, exclui os desvios, e produz resultados coerentes independente de quem o usa. Um prompt genérico ("logo elegante para empresa de tecnologia") produz AI slop. Um prompt calibrado produz identidade.

---

## Glossário Visual da Marca (OBRIGATÓRIO ANTES DOS PROMPTS)

Antes de criar qualquer prompt, Luma constrói o glossário visual em inglês — o vocabulário técnico que aparece em todos os prompts para garantir consistência.

```
COLOR VOCABULARY (EN):
→ Cor primária em inglês técnico de fotografia/design
→ Complementar, neutros e acento em inglês técnico
→ Ex: "deep muted teal (#1a4a47), warm off-white (#f5f2ec),
      electric amber accent (#d4820a)"

STYLE VOCABULARY (EN):
→ 5–8 adjetivos de estilo específicos (não "elegant", "modern")
→ Baseados no moodboard verbal de Veda
→ Ex: "brutalist-refined", "ink-textured", "mathematically precise"

TECHNIQUE VOCABULARY (EN):
→ Técnicas e referências de renderização específicas
→ Ex: "film grain overlay", "halftone texture", "letterpress impression"

ANTI-VOCABULARY (EN):
→ O que os prompts devem sempre negar
→ Ex: "--no gradients, --no lens flare, --no stock photography aesthetic"
```

---

## Os 5 Blocos de Prompts

### Bloco 1 — Prompts de Logo
Gerar conceitos de logotipo para exploração e variação.

### Bloco 2 — Prompts de Moodboard/Conceito
Gerar imagens atmosféricas que capturam o universo da marca.

### Bloco 3 — Prompts para Slides/Apresentação
Gerar backgrounds, elementos e mockups para o deck da marca.

### Bloco 4 — Prompts para Redes Sociais (N3 apenas)
Gerar imagens de post, stories e covers com identidade da marca.

### Bloco 5 — Prompts de Mockups (N3 apenas)
Gerar mockups realistas de aplicações da marca em contexto.

---

## Protocolo de Execução

```
STEP 1: Definir calibração visual da marca
        → Absorver: conceito visual central, moodboard verbal, paleta de Chroma
        → Absorver: arquétipo e sensação dominante de Mira
        → Construir glossário visual completo em inglês

STEP 2: Criar prompts de logo — Bloco 1
        → Mínimo 2 prompts (N2), mínimo 4 prompts (N3)
        → Variações por: estilo de renderização, estado de uso, variação conceitual
        → Cada prompt tem: positivo + negativo + parâmetros técnicos

STEP 3: Criar prompts de moodboard/conceito — Bloco 2
        → Mínimo 2 prompts (N2), mínimo 4 prompts (N3)
        → Capturar: atmosfera, textura, profundidade, temperatura cromática
        → Não mostrar logo ou produto — mostrar o universo

STEP 4: Criar prompts para slides/apresentação — Bloco 3
        → Mínimo 1 prompt (N2), mínimo 3 prompts (N3)
        → Backgrounds abstratos, texturas, formas para uso em slides

STEP 5 (N3 apenas): Criar prompts para redes sociais — Bloco 4
        → Mínimo 4 prompts para formatos diferentes
        → Feed post, story, cover, thumbnail

STEP 6 (N3 apenas): Criar prompts de mockups — Bloco 5
        → Mínimo 4 prompts de aplicações em contexto
        → Cartão de visita, embalagem, dispositivo digital, ambiente físico

STEP 7: Criar glossário visual EN completo
        → Color vocabulary
        → Style vocabulary
        → Technique vocabulary
        → Anti-vocabulary

STEP 8: Documentar adaptações para diferentes ferramentas
        → Midjourney: parâmetros específicos (--ar, --style, --v)
        → DALL-E: ajustes de sintaxe (sem parâmetros --v, usa estilo descritivo)
        → Stable Diffusion: modelo recomendado + sampler
        → Adobe Firefly: abordagem para estilo consistente
```

---

## Output

**Arquivo:** `visual-prompts.md`

### Estrutura obrigatória do documento:

```markdown
# Prompts Visuais — [Nome]

## Glossário Visual da Marca (EN)

### Color Vocabulary
[cores em inglês técnico com hex]

### Style Vocabulary
[5–8 termos específicos]

### Technique Vocabulary
[técnicas de renderização específicas]

### Anti-Vocabulary (aplicar em todos os prompts como negative)
[lista de elementos a negar]

---

## Bloco 1 — Prompts de Logo

### Prompt 1.1: [Variação — ex: "Símbolo geométrico, renderização vetorial"]

**Midjourney:**
```
[prompt positivo, detalhado, vocabulário calibrado] --ar 1:1 --style raw --v 6
```
**Negative prompt:** [anti-vocabulary + elementos específicos a negar]
**Parâmetros adicionais:** [stylize, chaos, quality se relevante]

**DALL-E:**
```
[versão adaptada para DALL-E — sem parâmetros --, mais descritivo]
```

**O que esperar:** [descrição do resultado esperado]
**Iterações:** [como variar o prompt para explorar]

---

### Prompt 1.2: [...]
### Prompt 1.3: [...]
### Prompt 1.4: [...] (N3)

---

## Bloco 2 — Prompts de Moodboard/Conceito

### Prompt 2.1: [Variação — ex: "Atmosfera editorial, textura principal"]

**Midjourney:**
```
[prompt positivo] --ar 16:9 --style raw --v 6
```
**Negative prompt:** [...]
**O que esperar:** [...]
**Iterações:** [...]

---

### Prompt 2.2: [...]
### Prompt 2.3: [...]
### Prompt 2.4: [...] (N3)

---

## Bloco 3 — Prompts para Slides/Apresentação

### Prompt 3.1: [Variação — ex: "Background abstrato para hero slide"]

**Midjourney:**
```
[prompt positivo] --ar 16:9 --style raw --v 6
```
**Uso:** [qual slide ou seção da apresentação]
**Negative prompt:** [...]

---

### Prompt 3.2: [...]
### Prompt 3.3: [...] (N3)

---

## Bloco 4 — Prompts para Redes Sociais (N3)

### Prompt 4.1: [Feed post — ex: "Post editorial com produto"]
**Formato:** 1080×1080px
[estrutura padrão]

### Prompt 4.2: [Story vertical]
**Formato:** 1080×1920px
[estrutura padrão]

### Prompt 4.3: [Cover de perfil]
**Formato:** 1584×396px (LinkedIn) / 1500×500px (Twitter)
[estrutura padrão]

### Prompt 4.4: [Thumbnail]
**Formato:** 1280×720px
[estrutura padrão]

---

## Bloco 5 — Prompts de Mockups (N3)

### Prompt 5.1: [Mockup — ex: "Cartão de visita em contexto de mesa"]
[estrutura padrão]

### Prompt 5.2: [Mockup digital — dispositivo]
[estrutura padrão]

### Prompt 5.3: [Mockup de ambiente físico]
[estrutura padrão]

### Prompt 5.4: [Mockup de embalagem]
[estrutura padrão]

---

## Adaptações por Ferramenta

| Ferramenta | Sintaxe de parâmetros | Ajustes necessários |
|-----------|----------------------|---------------------|
| Midjourney v6 | `--ar` `--style raw` `--v 6` `--no` | Padrão da biblioteca |
| DALL-E 3 | Sem parâmetros — descritivo | Remover -- flags, expandir descrição |
| Stable Diffusion | SDXL recomendado — Euler a sampler | Separar positivo/negativo em campos distintos |
| Adobe Firefly | Sem parâmetros técnicos | Usar style reference + keywords |
| Leonardo.ai | Similar ao Midjourney | Ajustar aspect ratio via interface |
```

---

## Critérios de Qualidade

| Critério | Regra | Verificação |
|----------|-------|-------------|
| N2: mínimo 3–5 prompts dos Blocos 1, 2, 3 | Distribuição: 2+2+1 ou 2+2+2 | Contagem feita? |
| N3: todos os 5 blocos, mínimo 15 prompts | 4+4+3+4+4 ou distribuição equivalente | Contagem feita? |
| Cada prompt tem positivo + negativo + parâmetros | 3 seções obrigatórias | Seções presentes? |
| Nenhum prompt usa adjetivos genéricos | Proibido: "beautiful", "amazing", "professional", "elegant" | Escaneamento feito? |
| Glossário visual completo | 4 vocabulários: color, style, technique, anti | Todos presentes? |
| Anti-vocabulary aplicado em todos os prompts | Negative prompt de cada bloco inclui anti-vocabulary | Verificação feita? |
| Adaptações para pelo menos 3 ferramentas | Midjourney + DALL-E + 1 mais | 3+ ferramentas? |

---

## Adjetivos Proibidos em Prompts

Os seguintes adjetivos são banidos de todos os prompts por serem genéricos e produzirem AI slop:

- beautiful, gorgeous, stunning, breathtaking
- amazing, incredible, extraordinary
- professional, corporate, business
- elegant, sophisticated, luxurious (sem qualificação)
- modern, contemporary, trendy
- creative, artistic, aesthetic
- clean, minimal (sem especificação de tipo)
- unique, one-of-a-kind

> Substituir por: referências específicas de movimento artístico, período histórico, material físico, técnica de impressão ou referência cultural.

---

## Integração com Outros Agentes

| Agente | Recebe de Luma | Usa para |
|--------|---------------|---------|
| Arch (living-docs) | `visual-prompts.md` | Incorporar ao brandbook (N2/N3) |
| Quinn (quality-consistency) | `visual-prompts.md` | Verificar que prompts são coerentes com sistema |

---

## Referências

- Squad: `squads/brand/SQUAD.md`
- Tasks de input: `tasks/05-visual-direction.md`, `tasks/02-archetypes.md`, `tasks/07-color-tokens.md`, `tasks/06-logo-system.md`
- Tasks paralelas: `tasks/13-brand-deck.md`
- Próxima fase: `tasks/14-living-docs.md`
- Nível: N2 (Blocos 1–3 básico) / N3 (biblioteca completa)
