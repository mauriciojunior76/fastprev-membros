---
name: elementor-export
description: "Use when the user asks to export the page to Elementor or download the Elementor file. Converts the PAGE-FORGE HTML output into a valid Elementor JSON template file ready to import into WordPress."
---

# Elementor Export Skill

## O que faz (simples)

Pega a página pronta que o PAGE-FORGE criou e gera um arquivo `.json` que você baixa, abre no WordPress, importa no Elementor e a página aparece lá — com todos os textos, cores, fontes e estrutura. Você só precisará trocar as imagens (que ficam como espaço reservado) pelas do seu designer.

---

## Quando ativar

O usuário diz qualquer uma dessas coisas:
- "quero subir no Elementor"
- "gera o arquivo do Elementor"
- "exportar para Elementor"
- "arquivo JSON do Elementor"
- "quero o arquivo para importar"

---

## O que o arquivo entregue permite

✅ Importar direto no Elementor (WordPress)
✅ Editar qualquer texto dentro do Elementor
✅ Trocar imagens pelos arquivos do designer
✅ Mudar cores usando o editor visual
✅ Replicar seções arrastando e soltando
✅ Página 100% editável sem tocar em código

---

## Como funciona o processo

```
1. Criar content.json com textos/copy da pagina (ver test-content.json como modelo)
2. Criar palette.json com cores do cliente (ou usar defaults do wireframe)
3. Rodar: node scripts/elementor-builder.js build --content content.json --output nome.elementor.json
4. Builder gera JSON com widgets DECOMPOSTOS (heading, text-editor, image, button, etc.)
5. Validacao automatica (10 checks)
6. Entregar arquivo pronto para importar
```

### CLI Rapida
```bash
# Gerar JSON Elementor
node scripts/elementor-builder.js build --content content.json --output nome.elementor.json

# Validar JSON existente
node scripts/elementor-builder.js validate --input nome.elementor.json
```

### Modulos (squads/page-forge/lib/elementor/)
- `builder.js` — Montador de pagina + containers + validacao
- `widgets/` — 9 widget builders (heading, text-editor, image, button, image-box, icon-box, icon-list, spacer, divider)
- `templates/sections/` — 9 section builders (alert-banner, hero, pain-points, features, how-it-works, offer, bio, cta-final, footer)
- `custom-css.js` — CSS compartilhado (cta-button shine, gradient text, grain overlay)
- `templates/exemplo-wireframe.json` — Wireframe padrao Exemplo

---

## Widgets Suportados (baseado em 3 LPs Exemplo reais)

| Widget | Builder | Uso Tipico |
|--------|---------|------------|
| `heading` | `widgets/heading.js` | Titulos, subtitulos, labels |
| `text-editor` | `widgets/text-editor.js` | Paragrafos com HTML rico |
| `button` | `widgets/button.js` | CTAs com gradiente e shine effect |
| `image` | `widgets/image.js` | Logos, fotos (placeholder "TROCAR") |
| `image-box` | `widgets/image-box.js` | Cards com imagem+titulo+descricao |
| `icon-box` | `widgets/icon-box.js` | Cards com icone+titulo+descricao |
| `icon-list` | `widgets/icon-list.js` | Listas de bullet points |
| `spacer` | `widgets/spacer.js` | Espacamento responsivo |
| `divider` | `widgets/divider.js` | Separadores visuais |

## Secoes do Wireframe Exemplo

| Secao | Builder | Conteudo |
|-------|---------|----------|
| `alert-banner` | Banner topo | Gradiente + heading curto |
| `hero` | Hero | BG image, min-height 800px, logo+heading+CTA |
| `pain-points` | Dores | 4 icon-boxes com problemas |
| `features` | Beneficios | Row 2 colunas, image-boxes grid |
| `how-it-works` | Metodo | 4 steps com image-box |
| `offer` | Oferta | Icon-boxes + pricing + CTA |
| `bio` | Credibilidade | Row: texto + imagem |
| `cta-final` | CTA Final | Urgencia + botao |
| `footer` | Footer | Logo + copyright |

---

## Formato do JSON (automatico via builder)

O builder gera automaticamente no formato Elementor 0.4 com:
- Containers (moderno, NAO sections legadas)
- Widgets individuais editaveis
- Responsive com sufixos `_tablet` e `_mobile`
- Custom CSS compartilhado (cta-button, gradient text, grain overlay)
- page_settings com background e template elementor_canvas

Referencia de JSON real: `Downloads/paginas j/lp-magno-psi.json`

---

## Regras de Geração

### IDs únicos
Cada seção, coluna e widget precisa de um ID único de 7 caracteres (letras e números):
```
Exemplo: "a3f7b2c", "e91d4a8", "b5c2e0f"
Gerar aleatoriamente para cada elemento
```

### Imagens
Todas as imagens viram placeholder com instrução clara:
```json
"image": {
  "url": "https://placehold.co/1200x600/111118/C8A951?text=TROCAR+FOTO+AQUI",
  "alt": "⚠️ Substituir por imagem do designer"
}
```

### Fontes do Google
Elementor suporta Google Fonts nativamente. Especificar exatamente:
```json
"typography_font_family": "Space Grotesk"
```

### Cores globais (Elementor Kit)
Gerar bloco de configuração de cores globais separado para o usuário configurar no kit do Elementor:
```json
"global_colors": [
  { "id": "primary", "title": "Fundo Principal", "value": "#0A0A0F" },
  { "id": "secondary", "title": "Fundo Secundário", "value": "#111118" },
  { "id": "accent1", "title": "Dourado", "value": "#C8A951" },
  { "id": "accent2", "title": "Elétrico", "value": "#00D4FF" },
  { "id": "text", "title": "Texto Principal", "value": "#E8E8F0" },
  { "id": "muted", "title": "Texto Secundário", "value": "#6B6B80" }
]
```

---

## Validação antes de entregar

Antes de gerar o arquivo final, verificar:

```
□ JSON é válido (sem vírgulas faltando, sem chaves abertas)?
□ Cada seção tem pelo menos 1 coluna?
□ Cada coluna tem pelo menos 1 widget?
□ Todos os IDs são únicos (sem repetição)?
□ Todas as imagens têm placeholder visível?
□ Textos estão preenchidos com o copy real da página?
□ Cores batem com a paleta do Vex?
□ Fontes estão especificadas em todos os widgets de texto?
□ Padding mobile está definido em todas as seções?
□ page_settings tem a cor de fundo correta?
```

Se qualquer item estiver ❌ → Corrigir antes de entregar.

---

## Arquivo de entrega

Nome do arquivo: `{nome-da-pagina}.elementor.json`

Entregue com estas instruções (em português simples):

```
📦 ARQUIVO ELEMENTOR PRONTO

Como importar:
1. Abra o WordPress
2. Vá em Elementor → Templates → Importar Template
3. Selecione o arquivo "{nome}.elementor.json"
4. Clique em "Importar Agora"
5. A página aparece na lista de templates
6. Clique em "Inserir" para colocar na sua página

Após importar:
• Troque as imagens marcadas com ⚠️ pelos arquivos do designer
• Os textos já estão dentro — edite como quiser
• As cores e fontes já estão configuradas
• Tudo é editável direto no Elementor

Cores globais (configurar no Elementor Kit para reuso):
• Fundo: #0A0A0F
• Dourado: #C8A951
• Elétrico: #00D4FF
• Texto: #E8E8F0
```

---

## Revisão final

Após gerar o arquivo, o sistema responde:

```
✅ REVISÃO DO ARQUIVO ELEMENTOR

Seções geradas: [N]
Widgets criados: [N]
Imagens com placeholder: [N] (para trocar com designer)
Textos preenchidos: ✅
Cores da paleta: ✅
Fontes configuradas: ✅
JSON válido: ✅
Responsividade (mobile/tablet): ✅

📁 Arquivo: {nome}.elementor.json
📊 Tamanho: [X] KB

⚠️ Lembrete: Trocar [N] imagens pelos arquivos do designer
```

---

## Limitacoes conhecidas

- **Animacoes CSS customizadas** — Elementor tem Motion Effects proprio. Animacoes basicas (fadeIn, slideUp) sao suportadas via settings.
- **CSS complexo** — Estilos muito customizados podem precisar de ajuste fino no Elementor.
- **JavaScript** — Elementor nao suporta JS inline. Interacoes ficam em nota separada para Custom Code (Pro).
- **Imagens** — Sempre placeholder. Trocar manualmente no Elementor apos importar.
- **Gradiente de texto** — Usa classe `.gold`/`.gradient` via custom_css. Funciona no Elementor com a classe CSS aplicada no widget.
