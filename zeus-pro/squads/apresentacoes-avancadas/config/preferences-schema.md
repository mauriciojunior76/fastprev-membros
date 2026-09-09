# Schema de Preferências do Mentor

Toda memória em `_memory/mentores/{slug}.md` segue este formato.

---

## Frontmatter YAML (obrigatório)

```yaml
---
mentor: o dono do canal-silveira        # slug único (kebab-case)
nome: "um mentor de referencia"        # nome completo
nicho: "mentoria digital"        # segmento principal
produto: "Agente Arquiteto"      # produto principal
avatar: "mentor iniciante..."    # uma frase
tom: "direto, provocador"        # 1 ou 2 tons combinados
tema_preferido: "exemplo"          # id de um dos 6 temas
fontes:                          # pares de fonte escolhidos
  title: "Inter"
  body: "DM Sans"
paleta:                          # hex codes
  - "#b8887a"
  - "#d4a08a"
  - "#0a0806"
grain: true                      # aplicar grain overlay
motion: "smooth"                 # smooth | gentle | sharp
icons: "animated"                # animated | static | emoji | none
fotos: false                     # true se normalmente usa fotos
logo: "C:/caminho/logo.png"      # opcional, absoluto
referencias:                     # links ou caminhos inspiração
  - "https://exemplo.seu-dominio.com.br"
criado_em: "2026-04-14"
atualizado_em: "2026-04-14"
---
```

---

## Corpo do arquivo

### Histórico

Lista cronológica das apresentações geradas:

```markdown
## Histórico

- 2026-04-14 Prelúdio Claude Code (8 slides, loop 45s, tema Exemplo)
- 2026-04-07 Aula Criativos LT (22 slides, 28 min, tema Exemplo)
- 2026-03-29 Ebook Fluxo QR (10 seções, tema Exemplo)
```

### Preferências específicas

Regras que o mentor aprovou ou rejeitou, aprendidas pelo squad ao longo do tempo:

```markdown
## Preferências aprovadas

- Títulos em caixa alta para prelúdio
- Ícones animados sempre (nunca estáticos)
- Número de impacto em branco puro (nunca colorido)

## Rejeitadas

- Fundos claros (o mentor sempre pede dark)
- Serifa em aula (prefere sem serifa)
- Emojis (não cola com a marca)
```

### Referências visuais

Links ou pastas de referências visuais:

```markdown
## Referências

- https://exemplo.seu-dominio.com.br (tom próprio)
- clientes/zeus/preludio-claude-code/ (prelúdio aprovado)
- clientes/zeus/aula-claude-code-2/ (aula aprovada)
```

---

## Tons disponíveis

Combinações válidas do campo `tom`:

- direto
- provocador
- técnico
- didático
- inspirador
- motivacional
- casual
- amigável
- executivo
- sóbrio

Pode combinar 2 (ex: "direto, técnico"). Acima disso vira genérico.

---

## Temas disponíveis

Ids válidos do campo `tema_preferido`:

- exemplo
- apple
- vintage
- futurista
- editorial
- corporativo

---

## Motion profiles

- `smooth`: cubic-bezier(0.16, 1, 0.3, 1) - ease-out suave
- `gentle`: cubic-bezier(0.25, 0.1, 0.25, 1) - mais contido
- `sharp`: cubic-bezier(0.68, -0.55, 0.27, 1.55) - overshoot marcante

---

## Icons styles

- `animated`: ícones em loop (foguete sobe, estrela pulsa)
- `static`: ícones fixos, stroke consistente
- `emoji`: emojis unicode (uso raro, apenas quando pedido)
- `none`: sem ícone, apenas tipografia e cor
