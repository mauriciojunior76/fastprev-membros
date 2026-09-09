# Brand Applications — AXIS
**Agente:** Vex (page-visual-specialist) + Vis (visual-hierarchy-analyst) + Art Finalista
**Nível:** N1 — ESSÊNCIA
**Output:** 7 aplicações com especificações completas de produção

---

## Princípios de Aplicação

Toda aplicação da marca AXIS parte de três premissas:

1. **Fundo escuro é o padrão.** AXIS não usa fundo branco como superfície principal. O branco entra como contraste de texto, nunca como fundo de layout.
2. **Logo sempre em versão adequada ao contexto.** Nunca distorcer, nunca recolorir fora do sistema definido.
3. **Hierarquia visual é matemática.** Tamanhos de tipografia seguem a escala. Espaçamentos seguem o grid. Nada "a olho".

---

## Versões de Logo para Aplicação

| Versão | Uso | Background |
|--------|-----|-----------|
| **Horizontal completo** (símbolo + wordmark) | Aplicações com espaço lateral | Fundos escuros |
| **Vertical empilhado** (símbolo acima + wordmark) | Aplicações quadradas, avatar, ícone de app | Qualquer |
| **Símbolo isolado** (apenas o cross-axis) | Favicon, ícone, marca d'água, espaços pequenos | Qualquer |
| **Wordmark isolado** (apenas AXIS) | Texto running, email, contextos onde símbolo está presente | Claro e escuro |
| **Negativo** (branco total) | Sobre fundos coloridos escuros, impressão 1 cor | Escuros |
| **Positivo invertido** (escuro total) | Impressão, papelaria clara, fundo branco obrigatório | Claros |

---

## Aplicação 1 — Dashboard UI Hero Section

**Contexto:** Primeira tela que o usuário vê ao logar no AXIS. Contém KPIs primários do portfólio.

### Especificações

```
Formato:          Interface web, responsivo
Dimensão:         100vw × 100vh (min-height: 640px)
Layout:           12 colunas, sidebar 240px fixada à esquerda

BACKGROUND:
  Cor base:       #0A1628 (navy)
  Overlay:        Axis Grid 7°, rgba(197,205,216,0.04)
  Radial glow:    Centro-superior, rgba(74,159,212,0.06), radius 800px

LOGO (sidebar, topo):
  Versão:         Símbolo isolado + wordmark horizontal
  Tamanho logo:   Símbolo 24px, wordmark 16px
  Cor:            #F5F7FA (off-white)
  Acento símbolo: #C9A84C (gold)
  Posição:        padding 24px top, 20px left

HEADING PRINCIPAL:
  Texto:          "Portfólio — {Nome do Fundo}"
  Fonte:          Canela, 36px, weight 300
  Cor:            #F5F7FA
  Position:       top da área de conteúdo, padding-top 40px

ACCENT BAR (acima do heading):
  Dimensão:       32px × 1px
  Cor:            #C9A84C
  Margin-bottom:  16px do heading

KPI ROW (abaixo do heading):
  Layout:         4 cards em grid horizontal (3 cols cada)
  Margin-top:     32px

  KPI Card — estrutura:
    Background:   #1C2B3A
    Border:       1px solid rgba(197,205,216,0.12)
    Border-radius: 4px
    Padding:      20px 24px

    Label:        Space Grotesk, 11px, uppercase, #8A96A8, letter-spacing 0.08em
    Valor:        JetBrains Mono, 32px, weight 400, #F5F7FA
    Variação:     Space Grotesk, 13px, weight 600
                  Positivo: #2ECC71 + "▲"
                  Negativo: #E74C3C + "▼"

CONTEÚDO PRINCIPAL (abaixo dos KPIs):
  Gráfico de portfólio: 8 cols × 340px height
  Sidebar direita (watchlist): 4 cols × 340px height
  Background sidebar: #1C2B3A
  Hairline divisória: rgba(197,205,216,0.12)
```

**Hierarquia visual:**
1. KPI primário (AUM total) — maior, topo
2. KPIs secundários (retorno, volatilidade, beta)
3. Gráfico de portfolio performance
4. Watchlist e alertas

**Instrução de produção:**
Implementar em HTML/CSS seguindo ui-guidelines.md. Skeleton loader obrigatório antes de dados carregarem. Animação de counter em todos os KPIs numéricos (ver motion-system.md — Number Counter).

---

## Aplicação 2 — Brand Deck Cover Slide

**Contexto:** Slide de capa de apresentação institucional ou pitch comercial

### Especificações

```
Formato:          Apresentação (PowerPoint / Keynote / Google Slides)
Dimensão:         1920 × 1080px (16:9) padrão
Resolução:        72dpi para digital, 150dpi para impressão + projeção

BACKGROUND:
  Layer 1:        Cor sólida #0A1628, full bleed
  Layer 2:        Axis Grid 7°, sparse (32px), rgba(197,205,216,0.04)
  Layer 3:        Number Matrix, canto inferior direito, 35% da área
                  Gradiente de opacidade: 8% centro → 0% borda
  Layer 4:        Radial gradient, canto superior esquerdo
                  De: rgba(201,168,76,0.06) → transparent, radius 600px
  Layer 5:        Cross Axis XL, posição 75% H × 50% V
                  Cor: rgba(201,168,76,0.1), rotação 7°
                  Dimensão: 200px × 320px

ZONA ESQUERDA (55% da largura):
  Padding:        80px esquerda, 80px topo

  Accent bar:
    48px × 1px, #C9A84C
    Position: topo da zona, antes do logo

  Logo (horizontal completo):
    Escala:       Símbolo 40px, wordmark 28px Canela
    Cor:          Off-white #F5F7FA (símbolo com acento dourado)
    Margin-top:   24px da accent bar

  Heading (título do deck):
    Fonte:        Canela, 64px, weight 300, line-height 1.1
    Cor:          #F5F7FA
    Max-width:    640px
    Margin-top:   48px
    Letter-spacing: -0.02em

  Subheading (subtítulo / tagline):
    Fonte:        Space Grotesk, 18px, weight 400
    Cor:          #C5CDD8 (gray secundário)
    Margin-top:   20px

  Rodapé (versão, data, confidencial):
    Fonte:        JetBrains Mono, 11px
    Cor:          #8A96A8 (gray terciário)
    Position:     bottom 48px, left 80px
    Conteúdo:     "AXIS — Confidencial — [Mês Ano] — v[N]"

ZONA DIREITA (45% da largura):
  Sem texto — área visual
  Decoração: Cross Axis M centralizado na zona, opacidade 15%
  Corner bracket L no canto inferior direito: 20px braços, ouro 40%
```

**Hierarquia visual:**
1. Logo (ancora identidade)
2. Heading (proposta da apresentação)
3. Subheading (contexto)
4. Elementos gráficos (atmosfera, fundo)

**Instrução de produção:**
Exportar como PPTX e PDF. Fontes embutidas obrigatório. Versão com fundo branco (fallback para impressão) deve usar logo negativo escuro e todos os textos em navy #0A1628.

---

## Aplicação 3 — LinkedIn Banner

**Contexto:** Imagem de capa do perfil LinkedIn da AXIS (company page)

### Especificações

```
Formato:          JPEG / PNG
Dimensão:         1584 × 396px (4:1)
Resolução:        72dpi
Zona segura:      Evitar conteúdo nos 80px das bordas (recorte de avatar e frame)

BACKGROUND:
  Cor base:       #0A1628, full bleed
  Axis Grid:      Sparse (32px), 7°, rgba(197,205,216,0.05)
  Gradient overlay: Linear, esquerda para direita
                   #0A1628 (100% opacidade) → transparent (0%) nos primeiros 40%
                   Permite que texto esquerdo seja legível sobre qualquer background

CONTEÚDO (zona esquerda, 50% da largura):
  Padding:        48px esquerda, 0 vertical (centralizado verticalmente)

  Logo horizontal completo:
    Símbolo:      28px
    Wordmark:     20px
    Cor:          #F5F7FA com acento #C9A84C no símbolo

  Heading:
    Texto:        "Dados que não mentem."
    Fonte:        Canela, 36px, weight 300
    Cor:          #F5F7FA
    Margin-top:   16px

  Subheading:
    Texto:        "Plataforma analítica para gestores de fundos de investimento"
    Fonte:        Space Grotesk, 14px, weight 400
    Cor:          #8A96A8
    Margin-top:   8px

CONTEÚDO (zona direita, 50% da largura):
  Elemento visual: Cross Axis L, centralizado na zona
  Cor:            rgba(201,168,76,0.2)
  Corner bracket M no canto inferior direito

RESTRIÇÕES:
  Não incluir URL ou contato (muda e fica desatualizado)
  Não incluir foto de pessoa (não é página de executivo)
  Testar renderização em mobile (LinkedIn comprime banner significativamente)
```

**Instrução de produção:**
Exportar em PNG (melhor qualidade para texto). Testar aparência com avatar circular do logo sobreposto no canto esquerdo. Em mobile, o banner é recortado ao centro — garantir que o elemento principal esteja centralizado.

---

## Aplicação 4 — Instagram Feed Post Editorial (1:1)

**Contexto:** Post editorial de thought leadership / dados de mercado

### Especificações

```
Formato:          JPEG / PNG
Dimensão:         1080 × 1080px
Resolução:        72dpi

VARIANTE A — Data Statement Post (dado + insight)
  Background:     #0A1628, full bleed
  Textura:        Number Matrix, canto superior direito, 45% da área
                  Gradiente: 6% → 0%
  Hairlines:      3 linhas em 7°, full width, rgba(201,168,76,0.08)

  Conteúdo central (zona 60% centralizada, padding 80px todos lados):
    Accent bar:   32px × 1px, #C9A84C, alinhado à esquerda
    Margin-bottom da bar: 20px

    Dado principal:
      Fonte:      JetBrains Mono, 64px, weight 400
      Cor:        #F5F7FA
      Exemplo:    "R$ 2.4M" ou "0,3%" ou "99,99%"

    Contexto do dado:
      Fonte:      Space Grotesk, 16px, weight 400
      Cor:        #C5CDD8
      Margin-top: 12px
      Exemplo:    "Divergência média entre sistemas analíticos e fonte primária"

    Insight (opcional):
      Fonte:      Canela, 20px, weight 300, italic
      Cor:        #C9A84C
      Margin-top: 20px

  Logo (canto inferior direito):
    Versão:       Símbolo isolado + wordmark horizontal
    Escala:       Símbolo 16px, wordmark 12px
    Cor:          rgba(245,247,250,0.5) — discreto
    Position:     bottom 32px, right 32px

VARIANTE B — Quote Post (citação de pensador/gestor)
  Igual ao A exceto:
    Não usa dado numérico como hero
    Usa Canela italic 32px para a citação
    Atribuição em Space Grotesk 12px, #8A96A8 abaixo da citação
```

**Instrução de produção:**
Templates para ambas as variantes no Figma. Posts de dado (variante A) publicados às terças, quintas. Posts de quote (variante B) publicados às segundas. Nunca usar foto de pessoa no feed editorial.

---

## Aplicação 5 — Business Card

### Versão Física (Standard)

```
Dimensão:         85 × 55mm (standard internacional)
Acabamento:       Laminação fosca frente/verso + hot stamping ouro no logo
Gráfica:          4/4 (CMYK frente e verso) + 1/0 hot stamp ouro

FRENTE:
  Background:     #0A1628 (navy sólido, 100% preto em CMYK = C0 M0 Y0 K100 → NÃO.
                  Usar Pantone 289 C para correspondência naval exata)

  Logo horizontal:
    Position:     Canto superior esquerdo, padding 6mm
    Tamanho:      Símbolo 8mm, wordmark 6mm Canela
    Cor símbolo:  Hot stamp ouro (PMS 871 C)
    Cor wordmark: #F5F7FA (branco offset)

  Tagline (inferior, abaixo do logo):
    Texto:        "Dados que não mentem."
    Fonte:        Space Grotesk, 6pt, weight 400
    Cor:          rgba(245,247,250,0.5)
    Position:     Abaixo do logo, margin-top 2mm

  Accent bar:
    1mm × 20mm, horizontal, #C9A84C (hot stamp ou Pantone 872 C)
    Position:     Canto inferior esquerdo, padding 6mm

VERSO:
  Background:     #0A1628

  Nome:
    Fonte:        Canela, 12pt, weight 300
    Cor:          #F5F7FA
    Position:     Centrado verticalmente e horizontalmente (ligeiramente acima do centro)

  Cargo:
    Fonte:        Space Grotesk, 7pt, weight 500, uppercase, letter-spacing 0.1em
    Cor:          #8A96A8
    Margin-top:   2mm

  Contatos (email, telefone, LinkedIn):
    Fonte:        JetBrains Mono, 6.5pt
    Cor:          #C5CDD8
    Margin-top:   4mm
    Layout:       Stack vertical, line-height 1.6

  Cross Axis decorativo:
    Position:     Canto inferior direito
    Dimensão:     12mm × 18mm
    Cor:          rgba(201,168,76,0.15) — impresso como tela muito aberta

PRODUÇÃO TÉCNICA:
  Sangria:        3mm todos os lados
  Área segura:    4mm das bordas
  Resolução:      300dpi mínimo para arte
  Perfil de cor:  CMYK - Coated FOGRA39
```

---

### Versão Digital

```
Formato:          vCard (.vcf) + imagem de capa para digital wallet
Dimensão capa:    1004 × 648px (Apple Wallet standard)

Capa digital:
  Background:     #0A1628
  Logo:           Horizontal, 32px símbolo
  Nome:           Canela 28px
  Cargo:          Space Grotesk 13px #8A96A8
  Email:          JetBrains Mono 12px, hyperlink

Assinatura para email reply:
  HTML inline — ver Aplicação 6
```

---

## Aplicação 6 — Email Signature

**Contexto:** Assinatura padrão de email corporativo para todos os membros da equipe AXIS

### Especificações

```html
<!-- AXIS Email Signature — HTML inline (compatível com Gmail, Outlook, Apple Mail) -->
<!-- Usar tabelas para compatibilidade máxima -->

<table cellpadding="0" cellspacing="0" border="0"
       style="font-family:'Space Grotesk',Helvetica,Arial,sans-serif;
              font-size:13px; color:#4A5568; line-height:1.5;">
  <tr>
    <td style="padding-right:16px; border-right:1px solid #C5CDD8; vertical-align:top;">
      <!-- Logo como imagem hospedada -->
      <img src="https://cdn.axis.com.br/brand/logo-horizontal-white-48.png"
           alt="AXIS" width="80" height="24"
           style="display:block;">
    </td>
    <td style="padding-left:16px; vertical-align:top;">
      <!-- Nome -->
      <div style="font-family:'Space Grotesk',Helvetica,Arial,sans-serif;
                  font-size:14px; font-weight:600; color:#0A1628;
                  margin-bottom:2px;">
        Rafael Camargo
      </div>
      <!-- Cargo -->
      <div style="font-size:11px; font-weight:600; letter-spacing:0.06em;
                  text-transform:uppercase; color:#8A96A8; margin-bottom:8px;">
        Co-Founder & CEO
      </div>
      <!-- Contatos -->
      <div style="font-family:'Courier New',monospace; font-size:12px; color:#4A5568;">
        <a href="mailto:rafael@axis.com.br"
           style="color:#C9A84C; text-decoration:none;">
          rafael@axis.com.br
        </a>
        &nbsp;·&nbsp;
        <a href="tel:SEU_TELEFONE" style="color:#4A5568; text-decoration:none;">
          +55 11 9 9999-9999
        </a>
      </div>
      <!-- Tagline -->
      <div style="font-size:11px; color:#8A96A8; margin-top:6px;
                  font-style:italic;">
        Dados que não mentem.
      </div>
    </td>
  </tr>
  <tr>
    <td colspan="2"
        style="padding-top:12px; border-top:1px solid rgba(197,205,216,0.3);
               font-size:10px; color:#C5CDD8;">
      AXIS Tecnologia Financeira S.A. — São Paulo, SP
      &nbsp;·&nbsp;
      <a href="https://axis.com.br" style="color:#C9A84C; text-decoration:none;">
        axis.com.br
      </a>
      &nbsp;·&nbsp;
      Esta mensagem é confidencial.
    </td>
  </tr>
</table>
```

**Instrução de produção:**
- Logo hospedado em CDN (não embed Base64 — quebra em Outlook)
- Testar em Gmail, Outlook 2016+, Apple Mail, mobile
- Não incluir foto do executivo (fora do posicionamento austero da marca)
- Versão light: substitui #0A1628 por #F5F7FA e inverte cores de texto

---

## Aplicação 7 — PDF Report Cover (A4)

**Contexto:** Capa de relatório de análise exportado pela plataforma AXIS (ex: relatório mensal de portfólio)

### Especificações

```
Formato:          PDF/A (para arquivo), PDF/X-4 (para impressão)
Dimensão:         A4 — 210 × 297mm (595 × 842pt @ 72dpi)
Margem de sangria: 3mm (para versão impressa)
Resolução de imagens: 300dpi mínimo

ESTRUTURA DA PÁGINA:

HEADER STRIP (topo, 60mm de altura):
  Background:     #0A1628, full width

  Logo horizontal:
    Posição:      22mm left, 20mm top
    Tamanho:      Símbolo 10mm, wordmark altura proporcional
    Cor:          #F5F7FA (branco + ouro no símbolo)

  Versão / Classificação:
    Texto:        "RELATÓRIO CONFIDENCIAL — v1.0"
    Fonte:        JetBrains Mono, 8pt, uppercase
    Cor:          rgba(245,247,250,0.4)
    Posição:      alinhado direita, 22mm right, 22mm top

  Accent line:
    1pt × full width, #C9A84C
    Position:     base do header strip (60mm from top)

BODY (60mm a 240mm do topo):
  Background:     #F5F7FA (light — corpo do relatório é claro para legibilidade impressa)

  Título do relatório:
    Fonte:        Canela, 36pt, weight 300
    Cor:          #0A1628
    Position:     22mm left, 80mm top
    Max-width:    130mm
    Line-height:  1.2

  Subtítulo / Período:
    Fonte:        Space Grotesk, 12pt, weight 400
    Cor:          #4A5568
    Position:     22mm left, abaixo do título (margin 6mm)

  Nome do Fundo e Gestor:
    Fonte:        Space Grotesk, 10pt, weight 600, uppercase, letter-spacing 0.08em
    Cor:          #8A96A8
    Position:     22mm left, abaixo do subtítulo (margin 4mm)

  KPI de destaque (opcional — AUM ou retorno do período):
    Corner brackets L ao redor do dado
    Valor:        JetBrains Mono, 28pt, weight 400, #0A1628
    Label:        Space Grotesk, 8pt, uppercase, #8A96A8
    Position:     Canto inferior direito do body (120mm right, 180mm top)

DECORAÇÃO (body):
  Coordinate Grid (light version):
    Grid 16mm, rgba(10,22,40,0.03) — quase invisível
    Área: 50% direita do body

  Cross Axis M (light):
    Canto inferior direito do body
    Cor: rgba(201,168,76,0.1)
    Dimensão: 30mm × 45mm

FOOTER (240mm a 297mm do topo):
  Background:     #1C2B3A (graphite — mais escuro que body, mais claro que header)

  Info da empresa:
    Fonte:        Space Grotesk, 8pt
    Cor:          #8A96A8
    Texto:        "AXIS Tecnologia Financeira S.A. · axis.com.br · CVM nº XXXXX"
    Position:     22mm left, vertically centered in footer

  Numeração de página:
    Texto:        "1" (capa não numera, mas define o sistema)
    Fundo:        Este sistema usa numeração a partir da página 2

  Tagline:
    Texto:        "Dados que não mentem."
    Fonte:        Canela, 10pt, weight 300, italic
    Cor:          #C9A84C
    Position:     alinhado direita, 22mm right
```

**Instrução de produção:**
Exportar em PDF/X-4 para versão de impressão (CVM requer qualidade específica para relatórios). Versão digital em PDF/A para arquivo e envio. Fontes Canela e Space Grotesk devem estar embutidas. Verificar que número matrix background passe em acessibilidade (não interfere com leitura de screen readers — deve ser elemento decorativo sem texto semântico).

---

*Produzido por: Vex (page-visual-specialist) + Art Finalista — BRAND SQUAD SUPREMO*
*Nível: N1 ESSÊNCIA | Projeto: AXIS | Data: 2026-03-05*
