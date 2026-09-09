# EXEMPLO CLIENT STANDARD — Padrão de Páginas para Clientes

**Versão:** 1.0
**Status:** ATIVO — aplica-se a todos os clientes Exemplo
**Wireframe base:** `exemplo-wireframe.json` (9 seções)
**Preview gerado:** `preview-v4-medico.preview.html` (referência visual)

---

## O Padrão

Toda landing page de cliente Exemplo segue **exatamente** esta estrutura de 9 seções:

| # | Seção | Propósito |
|---|-------|-----------|
| 1 | `alert-banner` | Faixa de urgência/prova social no topo |
| 2 | `hero` | Proposta de valor + foto do especialista à direita + CTA |
| 3 | `pain-points` | 4 dores do avatar (icon-box) |
| 4 | `features` | 4 benefícios/entregáveis (image-box grid) |
| 5 | `how-it-works` | 4 passos do método (steps numerados) |
| 6 | `offer` | O que inclui + ancoragem de preço + CTA final |
| 7 | `bio` | Credibilidade do especialista (texto esq + foto dir) |
| 8 | `cta-final` | Urgência + botão |
| 9 | `footer` | Logo + copyright |

**Regra imutável:** A estrutura nunca muda. Só o conteúdo, as cores e as fontes mudam por cliente.

---

## Padrão Visual

### Hero
- Foto do especialista É o fundo (background-image full-bleed)
- `background-position: right center` — pessoa à direita
- Gradient overlay escuro à esquerda → texto legível
- Texto ancorado à esquerda real do viewport (`margin:0`, não centrado)
- Min-height: 850px desktop

### Tipografia
- Display: Google Font escolhida por Vex para o mercado do cliente
- Body: Inter (fallback universal)
- Accent: DM Sans ou similar
- Headings: 40-52px desktop / 32-44px tablet / 24-32px mobile
- Peso: 700-800 headings / 400 body

### Cores
- Cada cliente tem sua `palette.json` com `gradient1`, `gradient2`, `bgDark`, `bgLight`, `textDark`, `textLight`
- Dourado/gold presente em todos os clientes Exemplo como accent
- CTA botão: sempre gradiente `gradient1 → gradient2`

### Preço (ancoragem obrigatória)
```
Valor total do programa: R$ X.XXX  [riscado]
🏷 Você economiza R$ X.XXX
"Você investe apenas"
12x de R$ [NÚMERO ENORME BRANCO]
Ou à vista por R$ X.XXX
7 dias de garantia — risco zero
```
O número principal NUNCA usa gradiente — sempre `color: #ffffff` para funcionar em qualquer fundo escuro.

### Animações
- Scroll: elementos entram com fadeUp/fadeLeft ao entrar na viewport
- Animações REPETEM ao subir e descer (IntersectionObserver sem unobserve)
- Counters resetam para 0 ao sair do viewport e recontam ao entrar

---

## Como Usar Para um Novo Cliente

### 1. Receber o material do cliente
Pode ser qualquer um dos 3 formatos abaixo. Ver seção **INTAKE** para extração.

### 2. Criar os 2 arquivos de configuração
```
content-{cliente}.json   ← textos e copy
palette-{cliente}.json   ← cores e fontes
```

### 3. Rodar o builder
```bash
node scripts/elementor-builder.js build \
  --wireframe exemplo \
  --content squads/page-forge/lib/elementor/content-{cliente}.json \
  --palette squads/page-forge/lib/elementor/palette-{cliente}.json \
  --output squads/page-forge/lib/elementor/{cliente}.elementor.json \
  --preview squads/page-forge/lib/elementor/{cliente}.preview.html
```

### 4. Abrir o preview no browser
```
file:///CAMINHO_DA_SUA_PASTA
```

### 5. Ajustar → rebuildar → aprovar → entregar o .elementor.json

---

## INTAKE — Como Extrair de Qualquer Material

### Tipo 1: Copy Escrita (Doc, PDF, texto)

Mapear diretamente para os campos do `content-{cliente}.json`:

| Onde aparece no material | Campo no JSON |
|--------------------------|---------------|
| Frase de urgência/escassez (topo) | `alert-banner.text` |
| Promessa principal / título da página | `hero.title` |
| Subtítulo / detalhamento da promessa | `hero.subtitle` |
| Texto do botão principal | `hero.ctaText` |
| Problemas/dores listados | `pain-points.items[].title` + `.description` |
| Benefícios/entregáveis | `features.items[].title` + `.description` |
| Passos do método/processo | `how-it-works.steps[].title` + `.description` |
| O que inclui na oferta | `offer.items[].title` + `.bulletPoints[]` |
| Preço parcelado | `offer.installmentValue` + `offer.installmentPrefix` |
| Preço à vista | `offer.cashPrice` |
| Preço âncora (riscado) | `offer.anchorPrice` |
| Bio/história do especialista | `bio.bio` |
| Nome e credencial | `bio.name` + `bio.title` |
| Texto urgência final | `cta-final.title` + `cta-final.subtitle` |
| Copyright | `footer.copyrightText` |

**Se o campo não existir no material:** usar placeholder padrão (ver `content-template.json`).

---

### Tipo 2: Transcrição de Reunião

Extrair das falas do cliente:

| O que procurar na fala | Campo alvo |
|------------------------|------------|
| "meu produto/serviço faz X" | `hero.title` (transformar em promessa) |
| "meu público sofre com..." | `pain-points.items[]` |
| "o que eu entrego é..." | `features.items[]` e `offer.items[]` |
| "meu método funciona assim..." | `how-it-works.steps[]` |
| "eu cobro X por mês ou Y à vista" | campos de pricing em `offer` |
| "minha história é..." | `bio.bio` |
| "tenho pressa porque..." | `alert-banner.text` e `cta-final.title` |
| "tenho X alunos/clientes/resultados" | incluir em `hero.subtitle` ou `bio.bio` |

**Regra de ouro para transcrição:** O cliente fala em primeira pessoa. Transformar para segunda pessoa (você) ou imperativo nos headings. Condensar. Nunca copiar fala crua.

---

### Tipo 3: Apresentação (PowerPoint, Slides)

Varrer slide a slide mapeando pelo tipo:

| Tipo de slide | Campo alvo |
|---------------|------------|
| Slide de capa / título principal | `hero.title` |
| "Por que você precisa disso" / dores | `pain-points.items[]` |
| "O que você vai aprender/conquistar" | `features.items[]` |
| "Como funciona" / processo | `how-it-works.steps[]` |
| "O que está incluído" | `offer.items[]` |
| Slide de preço | todos os campos de pricing em `offer` |
| "Sobre mim" / "Quem sou" | `bio.*` |
| Slide final / CTA | `cta-final.*` |
| Logo | `hero.logoUrl` e `footer.logoUrl` (pedir arquivo ao cliente) |

---

## Palette — Paletas por Mercado

Se o cliente não trouxer cores, usar como ponto de partida:

| Mercado | gradient1 | gradient2 | bgDark |
|---------|-----------|-----------|--------|
| Médico / Saúde | `#0077B6` | `#00B4D8` | `#06101C` |
| Financeiro / Investimentos | `#C0A24B` | `#ECEAC3` | `#0A0A0F` |
| Coaching / Desenvolvimento | `#7C3AED` | `#A78BFA` | `#0D0D1A` |
| Jurídico / Advocacia | `#1E3A5F` | `#4A90D9` | `#080E1A` |
| Fitness / Emagrecimento | `#16A34A` | `#4ADE80` | `#071A0F` |
| Educação / Cursos | `#EA580C` | `#FB923C` | `#1A0A04` |

`bgLight`, `textDark`, `textLight`, `textMuted` seguem os padrões do `palette-medico.json` como base.

---

## Arquivos de Referência

| Arquivo | Para que serve |
|---------|----------------|
| `content-medico.json` | Exemplo completo preenchido (cliente médico) |
| `palette-medico.json` | Palette de referência (azul médico) |
| `content-template.json` | Template em branco para novo cliente |
| `preview-v4-medico.preview.html` | Referência visual do resultado final |
| `exemplo-wireframe.json` | Wireframe das 9 seções (não editar) |

---

## Checklist Antes de Entregar

```
□ alert-banner tem texto de urgência real (não placeholder)
□ hero.title é uma promessa forte e específica
□ hero.heroImageUrl tem URL da foto do especialista (ou vazio para placeholder)
□ pain-points tem 4 itens reais do avatar do cliente
□ features tem 4 benefícios reais da oferta
□ how-it-works tem 4 passos reais do método
□ offer.items tem os entregáveis reais com bullet points
□ offer.anchorPrice > offer.installmentValue × 12 (âncora maior que total parcelado)
□ bio.bio conta a história de transformação do especialista
□ cta-final tem urgência real (vagas, data, bônus que expira)
□ footer.copyrightText tem o ano correto e nome do produto
□ palette tem gradient1/gradient2 que NÃO são azul sobre azul escuro
□ Preview aprovado visualmente antes de gerar .elementor.json
```
