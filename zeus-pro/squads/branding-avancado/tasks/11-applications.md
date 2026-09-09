# Task 11 — Aplicações de Marca

**Executor:** Kira (brand-applications)
**Fase:** 3 — Sistema e Aplicações
**Paralelo:** Com Rex (pattern-library) e Flow (motion-system)
**Nível:** 2 e 3 apenas (omitido no N1)

---

## Inputs

| Arquivo | Fornecido por | Obrigatório |
|---------|---------------|-------------|
| `visual-direction.md` | Veda | SIM |
| `logo-rationale.md` | Mark | SIM |
| `design-tokens.json` | Chroma | SIM |
| `typography-system.md` | Typo | SIM |
| `ui-guidelines.md` | Pixel | SIM |
| `pattern-library.md` | Rex | SIM |

> **Nota:** Kira só inicia após receber todos os inputs listados. É a última task de produção antes da Fase 4 (Entrega Final).

---

## Princípio Fundamental

Aplicações de marca provam que o sistema funciona no mundo real. Uma paleta bonita em abstrato que quebra em um cartão de visita ou colapsa sobre uma foto não é um sistema — é um esboço. Kira verifica coerência, acessibilidade e praticidade em cada suporte.

---

## Catálogo de Suportes por Nível

### N2 — IDENTIDADE (mínimo 5 aplicações)

| # | Suporte | Formato | Dimensões |
|---|---------|---------|-----------|
| 1 | Cartão de visita | Físico | 85×54mm |
| 2 | Assinatura de email | Digital | 600px largura máx |
| 3 | Cover de perfil social | Digital | 1200×630px (OG) + variações por rede |
| 4 | Apresentação (template) | Digital | 1920×1080px (16:9) |
| 5 | Letterhead / Papel timbrado | Físico | A4 — 210×297mm |
| 6 | Favicon e app icon | Digital | 16, 32, 180, 512px |

### N3 — SUPREMO (mínimo 10 aplicações — adicionar ao N2)

| # | Suporte | Formato | Dimensões |
|---|---------|---------|-----------|
| 7 | Banner digital | Digital | 970×250 (leaderboard) + 300×250 (rectangle) |
| 8 | Embalagem primária | Físico | Depende do produto |
| 9 | Uniforme/vestuário | Físico | Bordado e estampa |
| 10 | Sinalização / Outdoor | Físico | 3×1m (padrão) |
| 11 | Mockup de produto digital | Digital | App screenshots (375×812px) |
| 12 | Crachá / Badge | Físico | 54×85mm |
| 13 | Template de stories | Digital | 1080×1920px |
| 14 | Template de post feed | Digital | 1080×1080px |

---

## Protocolo de Execução

```
STEP 1: Listar aplicações por nível
        → N2: selecionar 5–6 aplicações do catálogo (ou customizar)
        → N3: selecionar 10–14 aplicações do catálogo (ou customizar)
        → Priorizar aplicações mais relevantes para o negócio

STEP 2: Para cada aplicação — especificar formato e dimensões
        → Formato: digital ou físico
        → Dimensões exatas + resolução (para digital: px; físico: mm/cm + DPI)
        → Variações necessárias (ex: horizontal e vertical para o mesmo suporte)

STEP 3: Documentar hierarquia de elementos por aplicação
        → Quais elementos aparecem: logo, tagline, nome, grafismo, cor de fundo
        → Qual versão do logo usar (principal, horizontal, símbolo, negativa)
        → Hierarquia: O que o olho vê primeiro? Segundo? Terceiro?

STEP 4: Especificar posição e versão do logo em cada suporte
        → Posição exata: canto superior esquerdo, centralizado, etc.
        → Área de respiro respeitada: confirmar com base em logo-rationale.md
        → Versão do logo: referência à variação documentada em Task 06

STEP 5: Documentar instruções de produção
        → Ferramenta: Figma, PowerPoint, Canva, InDesign, etc.
        → Configurações de artboard/documento
        → Fontes necessárias e onde baixar
        → Onde usar: uso interno apenas, enviar para gráfica, publicar online

STEP 6: Criar tabela resumo de todos os suportes
        → Visão geral de todas as aplicações em uma tabela
```

---

## Output

**Arquivo:** `applications.md`

### Estrutura obrigatória do documento:

```markdown
# Aplicações de Marca — [Nome]

## Tabela Resumo

| # | Suporte | Formato | Dimensões | Nível | Logo versão |
|---|---------|---------|-----------|-------|-------------|
| 1 | Cartão de visita | Físico | 85×54mm | N2 | Combination horizontal |
| 2 | Assinatura de email | Digital | 600px | N2 | Combination horizontal |
| ... | ... | ... | ... | ... | ... |

---

## Aplicação 1: Cartão de Visita

**Formato:** Físico
**Dimensões:** 85×54mm (frente e verso) — com 3mm de sangria
**Resolução de impressão:** 300 DPI
**Modo de cor:** CMYK

### Frente
**Fundo:** [cor — token semântico]
**Elementos:**
- Logo: versão [X] — posição [X, Y] — tamanho [X]mm
- Nome: [família], [peso], [tamanho], [cor]
- Cargo/título: [família], [peso], [tamanho], [cor]
- Grafismo: [categoria de Rex] — posição [X] — opacidade [X%]

**Hierarquia visual:** Logo → Nome → Cargo

### Verso
[mesma estrutura]

**WCAG:** Contraste verificado — [ratio] : 1 — [status AA/AAA]

**Instrução de produção (Figma):**
1. Criar frame 320×204px (escala 1:3.77)
2. Configurar grade com sangria [X]px
3. Importar fontes: [lista de fontes]
4. Exportar: PDF de alta qualidade + PNG 300DPI equivalente

---

## Aplicação 2: Assinatura de Email

**Formato:** Digital (HTML)
**Largura:** 600px máximo (compatível com clientes de email)
**Altura:** Variável — máx recomendado 200px

### Estrutura
**Fundo:** [cor]
**Elementos:**
- Logo: versão [X] — largura [X]px
- Nome: [família], [peso], [tamanho]px
- Cargo: [família], [peso], [tamanho]px
- Informações de contato: [lista]
- Links sociais: ícones [X]px

**Template HTML:** [código HTML mínimo da assinatura]

```html
<table cellpadding="0" cellspacing="0" border="0" style="font-family: [fonte], sans-serif;">
  <tr>
    <td style="padding-right: 16px; border-right: 2px solid [cor];">
      <img src="logo.png" alt="[Nome da marca]" width="[X]" style="display: block;" />
    </td>
    <td style="padding-left: 16px;">
      <p style="margin: 0; font-size: 16px; font-weight: 600; color: [hex];">[Nome]</p>
      <p style="margin: 0; font-size: 14px; color: [hex];">[Cargo]</p>
      <p style="margin: 4px 0 0; font-size: 12px; color: [hex];">[Contato]</p>
    </td>
  </tr>
</table>
```

---

## Aplicação 3: Cover de Perfil Social

**Formato:** Digital
**Dimensões:**
- LinkedIn: 1584×396px
- Twitter/X: 1500×500px
- Facebook: 851×315px
- YouTube: 2560×1440px (safe zone: 1546×423px)

### Composição (para todas as variações)
[estrutura de elementos, posição, hierarquia]

**Nota:** Todas as versões devem usar os mesmos elementos visuais — apenas redimensionar. O logo e elementos críticos devem ficar dentro da safe zone de cada plataforma.

---

## Aplicação 4: Template de Apresentação

**Formato:** Digital
**Dimensões:** 1920×1080px (16:9)
**Ferramenta primária:** Google Slides / PowerPoint / Keynote

### Slides de template

| Slide | Tipo | Layout | Elementos |
|-------|------|--------|-----------|
| 1 | Capa | Full-brand | Logo grande, título, grafismo |
| 2 | Agenda | Estruturado | Itens numerados com acento da marca |
| 3 | Conteúdo (título+texto) | Hierárquico | Heading grande + corpo |
| 4 | Conteúdo (2 colunas) | Paralelo | Duas colunas iguais |
| 5 | Destaque/Citação | Pull quote | Frase grande centralizada |
| 6 | Dados/Gráfico | Técnico | Placeholder de gráfico com paleta da marca |
| 7 | Encerramento | Full-brand | Logo, CTA, contato |

---

## Aplicação 5: Letterhead / Papel Timbrado

**Formato:** Físico + Digital
**Dimensões:** A4 — 210×297mm
**Resolução:** 300 DPI para impressão
**Modo de cor:** CMYK

### Cabeçalho
[logo, posição, tamanho]

### Rodapé
[informações legais, contato, elementos gráficos]

### Área de conteúdo
[margem, tipografia de conteúdo]

---

## Aplicação 6: Favicon e App Icon

**Formato:** Digital
**Dimensões e formatos:**

| Tamanho | Formato | Uso |
|---------|---------|-----|
| 16×16px | ICO/PNG | Browser tab |
| 32×32px | ICO/PNG | Browser tab (retina) |
| 180×180px | PNG | Apple touch icon |
| 192×192px | PNG | Android PWA |
| 512×512px | PNG | PWA splash / app store |

**Versão do logo:** Símbolo isolado — simplificado para pixel-perfect em tamanho mínimo
**Cor de fundo:** [cor — explicar escolha: transparente, brand primary, ou neutra]

**Instrução de simplificação:** [como adaptar o símbolo para 16px — quais detalhes são removidos]

---

## [Continuação N3 — Aplicações 7–14]

[Documentar cada aplicação adicional no mesmo formato]
```

---

## Critérios de Qualidade

| Critério | Regra | Verificação |
|----------|-------|-------------|
| N2: mínimo 5 aplicações completas | Cada uma com todos os campos preenchidos | Contagem e completude |
| N3: mínimo 10 aplicações completas | Incluindo todas as N2 | Contagem e completude |
| Cada aplicação: formato, dimensões, hierarquia, logo versão, pattern | Todos os campos por aplicação | Checklist por aplicação |
| Instrução de produção para pelo menos 3 aplicações | Detalhada e acionável | 3+ instruções presentes |
| Contraste WCAG verificado em todas | 4.5:1 mínimo — documentado | Ratio presente? |
| Tabela resumo presente | Visão geral de todas as aplicações | Tabela preenchida |
| Logo versão referencia Task 06 | Não inventar novas variações | Referência explícita |

---

## Erros Comuns a Evitar

- Documentar dimensões sem resolução (DPI) para impressos
- Omitir safe zone em covers de redes sociais
- Usar logo na versão errada para o suporte (principal em favicon)
- Não verificar contraste em backgrounds de cor da marca
- Instruções de produção vagas ("colocar o logo no topo")

---

## Integração com Outros Agentes

| Agente | Recebe de Kira | Usa para |
|--------|---------------|---------|
| Arch (living-docs) | `applications.md` | Documentar no brandbook |
| Quinn (quality-consistency) | `applications.md` | Verificar coerência do sistema |

---

## Referências

- Squad: `squads/brand/SQUAD.md`
- Tasks de input: `tasks/05-visual-direction.md` a `tasks/10-patterns-motion.md`
- Próxima fase: `tasks/12-visual-prompts.md`, `tasks/13-brand-deck.md`, `tasks/14-living-docs.md`
- Nível: disponível apenas para N2 e N3
