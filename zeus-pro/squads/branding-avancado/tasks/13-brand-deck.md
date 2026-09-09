# Task 13 — Brand Deck Premium

**Executor:** Slide (brand-deck)
**Fase:** 4 — Entrega Final
**Paralelo:** Com Luma (visual-prompts)
**Nível:** Todos (slides variam: N1=8–10 / N2=14–16 / N3=20)

---

## Inputs

| Arquivo | Fornecido por | Obrigatório |
|---------|---------------|-------------|
| `briefing-expandido.md` | Zeus | SIM |
| `brand-strategy.md` | Sage | SIM |
| `archetypes.md` | Mira | SIM |
| `brand-voice.md` | Lexi | SIM |
| `storytelling.md` | Nara | NÃO (N2/N3) |
| `visual-direction.md` | Veda | SIM |
| `logo-rationale.md` | Mark | SIM |
| `design-tokens.json` | Chroma | SIM |
| `typography-system.md` | Typo | SIM |
| `ui-guidelines.md` | Pixel | NÃO (N2/N3) |
| `pattern-library.md` | Rex | NÃO (N2/N3) |
| `applications.md` | Kira | NÃO (N2/N3) |

---

## Princípio Fundamental

O brand deck não é uma apresentação corporativa com bullets e stock photos — é a narrativa da marca em formato visual. Cada slide tem uma emoção dominante, um propósito claro na jornada, e um elemento visual que comunica antes que o texto seja lido. Um deck premium convence pelo design, não apenas pelo conteúdo.

---

## Estrutura por Nível

### N1 — ESSÊNCIA: 8–10 slides

| # | Slide | Tipo | Emoção Dominante |
|---|-------|------|-----------------|
| 1 | Capa | Full-brand | Impacto / Curiosidade |
| 2 | Conceito central | Declaração | Clareza / Força |
| 3 | Posicionamento | Estratégia | Confiança |
| 4 | Para quem | ICP | Reconhecimento |
| 5 | Arquétipo e personalidade | Identidade | Conexão |
| 6 | Sistema de cores | Visual | Coerência |
| 7 | Tipografia | Visual | Elegância |
| 8 | Logo e variações | Visual | Autoridade |
| 9 | Aplicação rápida | Prova | Concreto |
| 10 | Próximos passos | CTA | Momentum |

### N2 — IDENTIDADE: 14–16 slides

Todos os slides do N1 +

| # | Slide | Tipo | Emoção Dominante |
|---|-------|------|-----------------|
| 11 | Manifesto / Crença central | Storytelling | Polarização |
| 12 | Tom de voz com exemplos | Verbal | Reconhecimento |
| 13 | UI Brand System | Visual | Sofisticação |
| 14 | Pattern Library | Visual | Riqueza |
| 15 | Aplicações (mockups) | Prova | Confiança |
| 16 | Guia de uso rápido | Instrução | Empoderamento |

### N3 — SUPREMO: 20 slides

Todos os slides do N2 +

| # | Slide | Tipo | Emoção Dominante |
|---|-------|------|-----------------|
| 17 | Análise competitiva visual | Estratégia | Diferenciação |
| 18 | Motion system | Visual | Dinamismo |
| 19 | Prompts visuais (teaser) | Ferramenta | Praticidade |
| 20 | Visão de futuro / Expansão | Aspiração | Possibilidade |

---

## Protocolo de Execução

```
STEP 1: Definir número de slides por nível
        → N1: 8–10 slides (escolher dentro do intervalo com base na marca)
        → N2: 14–16 slides
        → N3: 20 slides exatos

STEP 2: Estruturar narrativa do deck (arco dramático)
        → Ato 1 (slides 1–3): Identidade e mundo da marca
        → Ato 2 (slides 4–N-2): Sistema completo — estratégia → visual → aplicação
        → Ato 3 (slides N-1–N): Prova de conceito e próximos passos
        → Verificar: a jornada emocional faz sentido?
          O espectador sai do slide 1 ao último com crescente clareza?

STEP 3: Para cada slide — documentar 5 campos obrigatórios
        → Tipo: full-brand / declaração / estratégia / visual / storytelling / instrução / CTA
        → Emoção dominante: o estado emocional que o slide deve provocar
        → Conteúdo: texto exato de heading e corpo (não apenas "escrever sobre X")
        → Instrução visual: o que aparecer visualmente (fundo, imagem, grafismo, posição do logo)
        → Transição: como entrar neste slide e sair para o próximo

STEP 4: Garantir progressão lógica
        → Estratégia antes de visual (ninguém entende a paleta antes de entender o posicionamento)
        → Identidade verbal antes de identidade visual
        → Sistema antes de aplicações
        → Aplicações antes do CTA

STEP 5: Criar slide de abertura impactante
        → Não usar "Brandbook" ou nome da empresa como único elemento
        → Deve provocar curiosidade ou fazer uma declaração
        → Pode usar: pergunta, afirmação provocadora, frase do manifesto, tensão

STEP 6: Criar slide de fechamento com CTA claro
        → O que o cliente faz depois de ver o deck?
        → Próximos passos concretos e acionáveis
        → Não terminar com "Obrigado" genérico

STEP 7: Documentar em presentation-structure.md e slide-content.md
```

---

## Outputs

**Arquivo 1:** `presentation-structure.md` — estrutura técnica do deck
**Arquivo 2:** `slide-content.md` — conteúdo textual completo de cada slide

### Estrutura de presentation-structure.md:

```markdown
# Estrutura da Apresentação — [Nome]
**Nível:** [N1 / N2 / N3]
**Total de slides:** [X]
**Narrativa:** [Ato 1: X slides / Ato 2: Y slides / Ato 3: Z slides]

## Arco Narrativo
[Descrição da jornada emocional — como o espectador se sente do slide 1 ao último]

## Mapa de Slides

| # | Título interno | Tipo | Emoção | Transição |
|---|---------------|------|--------|----------|
| 1 | [nome interno] | full-brand | Impacto | Fade in |
| 2 | [nome interno] | declaração | Clareza | Slide esquerda |
...

## Instruções Visuais Gerais
**Template base:** [Figma / Google Slides / PowerPoint]
**Paleta de fundo por tipo de slide:**
- Full-brand: [cor]
- Declaração: [cor]
- Visual: [cor]
- Instrução: [cor]

**Posição do logo:** [regra geral — exceções por slide]
**Tipografia nos slides:** [família, pesos, tamanhos por tipo de conteúdo]
```

### Estrutura de slide-content.md:

```markdown
# Conteúdo dos Slides — [Nome]

---

## Slide 1 — [Título interno]

**Tipo:** full-brand
**Emoção dominante:** Impacto / Curiosidade

### Conteúdo
**Heading:** "[texto exato]"
**Subheading (se houver):** "[texto exato]"
**Corpo (se houver):** "[texto exato]"

### Instrução Visual
- Fundo: [cor + gradiente + grafismo]
- Logo: [versão, posição, tamanho]
- Elemento hero: [foto, ilustração, grafismo — descrição]
- Grafismo de detalhe: [posição, opacidade, escala]

### Transição
**Entrada:** [tipo de transição — fade, slide, zoom]
**Saída para próximo:** [tipo]
**Animação interna (se houver):** [sequência de aparecimento dos elementos]

---

## Slide 2 — [Título interno]
[mesma estrutura]

...

## Slide [N] — [Título interno]
**Tipo:** CTA
**Emoção dominante:** Momentum / Clareza

### Conteúdo
**Heading:** "[não 'Obrigado' genérico]"
**Próximos passos:**
1. [Ação concreta 1]
2. [Ação concreta 2]
3. [Ação concreta 3]

### Instrução Visual
[full-brand, logo grande, elementos de identidade em máxima expressão]
```

---

## Critérios de Qualidade

| Critério | Regra | Verificação |
|----------|-------|-------------|
| N1: 8–10 slides com narrativa coerente | Não 5, não 15 — dentro do intervalo | Contagem feita? |
| N2: 14–16 slides | Dentro do intervalo | Contagem feita? |
| N3: 20 slides exatos | Não 19, não 21 | Contagem: exatamente 20? |
| Cada slide tem 5 campos | Tipo, emoção, conteúdo, instrução visual, transição | Todos os campos? |
| Slide 1 não é "Brandbook" genérico | Deve provocar curiosidade ou fazer declaração | Teste: é impactante? |
| Último slide tem CTA | Próximos passos concretos — não "Obrigado" | CTA presente? |
| Progressão lógica | Estratégia antes de visual, identidade antes de aplicação | Ordem verificada? |
| Conteúdo textual está em slide-content.md | Não apenas estrutura — texto real de cada slide | Texto presente? |

---

## Tipos de Slide — Referência

| Tipo | Quando usar | Fundo típico | Densidade de texto |
|------|-------------|-------------|-------------------|
| full-brand | Abertura, fechamento, momentos de impacto | Cor de marca forte | Mínimo |
| declaração | Posicionamento, crença central, manifesto | Neutro escuro ou claro | Mínimo-médio |
| estratégia | Análise, ICP, diferenciação | Neutro claro | Médio |
| visual | Cores, tipografia, logo, patterns | Depende do conteúdo | Mínimo |
| storytelling | Manifesto, narrativa, origem | Imagem ou cor forte | Médio |
| instrução | Tom de voz, guia de uso | Neutro | Médio-alto |
| CTA | Próximos passos, encerramento | Cor de marca | Mínimo |

---

## Erros Comuns a Evitar

- Slide 1 com apenas logo + nome da marca (nenhum impacto)
- Último slide com "Obrigado" sem CTA
- Slides com texto demais (deck virou documento)
- Sistema visual antes de estratégia (o espectador não entende o contexto)
- Animações que distraem em vez de guiar

---

## Integração com Outros Agentes

| Agente | Recebe de Slide | Usa para |
|--------|----------------|---------|
| Arch (living-docs) | `presentation-structure.md`, `slide-content.md` | Incorporar ao brandbook |
| Quinn (quality-consistency) | Ambos os arquivos | Verificar coerência |

---

## Referências

- Squad: `squads/brand/SQUAD.md`
- Tasks de input: todas as tasks das Fases 1, 2 e 3
- Tasks paralelas: `tasks/12-visual-prompts.md`
- Próxima fase: `tasks/14-living-docs.md`
- Nível: disponível para todos (slides variam)
