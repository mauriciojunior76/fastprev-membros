# Task 03 — Naming, Semântica e Voz

**Executor:** Lexi (naming-semantics)
**Fase:** 1 — Estratégia e Personalidade
**Paralelo:** Com Sage (brand-strategy) e Mira (archetypes)
**Nível:** Todos (1, 2, 3)

---

## Inputs

| Arquivo | Fornecido por | Obrigatório |
|---------|---------------|-------------|
| `briefing-expandido.md` | Zeus | SIM |
| `archetypes.md` | Mira | NÃO (calibra quando disponível) |
| `brand-strategy.md` | Sage | NÃO (calibra quando disponível) |

---

## Contextos de Naming

### Caso A — Nome já existe
Lexi valida o nome existente nas seguintes dimensões:
- Semântica: o que o nome diz literalmente, implicitamente e emocionalmente
- Pronúncia: fluência em português e em inglês (se relevante)
- Memorabilidade: é fácil de lembrar e escrever?
- Diferenciação: é único no mercado?
- Expansão: permite crescimento da marca além do produto atual?

### Caso B — Nome a gerar
Lexi cria 3 propostas de naming com análise completa de cada uma.

---

## Protocolo de Execução

```
STEP 1: Verificar se existe nome ou se deve gerar
        → Campo 1 do briefing: nome ou "sugerir"
        → Se "sugerir": executar Caso B
        → Se nome existe: executar Caso A

STEP 2 (Caso B): Gerar 3 propostas de naming
        Cada proposta deve ser de uma categoria diferente:
        → Categoria 1: Nome construído (invented word, portmanteau, acrônimo)
        → Categoria 2: Nome metafórico (conceito, sensação, objeto simbólico)
        → Categoria 3: Nome descritivo-evocativo (palavra real com nova associação)

STEP 3: Análise semântica de cada proposta (ou do nome existente)
        → Significado literal
        → Significado implícito / conotação cultural
        → Pronúncia e ritmo (número de sílabas, acento)
        → Associações positivas
        → Riscos semânticos ou fonéticos
        → Disponibilidade de domínio (verificar .com e .com.br mentalmente)

STEP 4: Criar slogan e taglines
        → 1 slogan principal (curto, emocional, memorável — máx 6 palavras)
        → 2 alternativas de slogan
        → 1 tagline de posicionamento (mais longa, explica o diferencial)

STEP 5: Definir vocabulário oficial da marca
        → 20+ palavras que a marca usa naturalmente
        → 10+ palavras que a marca proíbe
        → Neologismos ou termos próprios da marca (se aplicável)

STEP 6: Estabelecer tom de voz com 4 dimensões
        Cada dimensão usa um espectro com 2 polos opostos:
        → Dimensão 1: [polo A] ——————— [polo B]  Posição: X/10
        → Dimensão 2: [polo A] ——————— [polo B]  Posição: X/10
        → Dimensão 3: [polo A] ——————— [polo B]  Posição: X/10
        → Dimensão 4: [polo A] ——————— [polo B]  Posição: X/10

STEP 7: Criar exemplos de antes/depois de linguagem
        → 5 pares mostrando como a marca transforma comunicação genérica

STEP 8: Documentar em brand-voice.md
        → Seguir estrutura de output abaixo
        → Verificar critérios de qualidade antes de finalizar
```

---

## Output

**Arquivo:** `brand-voice.md`

### Estrutura obrigatória do documento:

```markdown
# Naming, Semântica e Voz — [Nome]

## Naming

### [Se Caso A — Validação do nome existente]
**Nome:** [nome]
**Análise semântica:** [literal + implícita + emocional]
**Pronúncia:** [fluência PT + EN se relevante]
**Memorabilidade:** [avaliação]
**Diferenciação:** [único no mercado?]
**Veredicto:** [APROVADO / APROVADO COM RESSALVA / SUBSTITUIR]
**Ressalvas/Riscos:** [se houver]

### [Se Caso B — Propostas de naming]
#### Proposta 1: [Nome] — Categoria: [tipo]
**Conceito:** [ideia geradora]
**Análise semântica:** [literal + implícita + emocional]
**Pronúncia:** [X sílabas — fluência PT + EN]
**Associações positivas:** [lista]
**Riscos:** [se houver]
**Domínio:** [disponível / indisponível / verificar]

#### Proposta 2: [Nome] — [...]
#### Proposta 3: [Nome] — [...]

## Slogans e Taglines
**Slogan principal:** "[slogan]"
**Alternativa 1:** "[alternativa]"
**Alternativa 2:** "[alternativa]"
**Tagline de posicionamento:** "[tagline — mais longa, explica o diferencial]"

## Vocabulário Oficial da Marca
**Palavras que a marca USA:**
[lista de 20+ palavras em formato de tags]

**Palavras que a marca PROÍBE:**
[lista de 10+ palavras com motivo de cada proibição]

**Termos próprios (se aplicável):**
[neologismos ou nomenclatura interna]

## Tom de Voz — 4 Dimensões

| Dimensão | Polo A | Posição | Polo B |
|----------|--------|---------|--------|
| [D1]     | [A]    | [X/10]  | [B]    |
| [D2]     | [A]    | [X/10]  | [B]    |
| [D3]     | [A]    | [X/10]  | [B]    |
| [D4]     | [A]    | [X/10]  | [B]    |

**Interpretação:** [como ler e aplicar as 4 dimensões na prática]

## Antes/Depois de Linguagem (5 exemplos)

| Contexto | Antes (genérico) | Depois (voz da marca) |
|----------|-----------------|----------------------|
| [ctx1]   | [genérico]       | [voz da marca]       |
| [ctx2]   | [genérico]       | [voz da marca]       |
| [ctx3]   | [genérico]       | [voz da marca]       |
| [ctx4]   | [genérico]       | [voz da marca]       |
| [ctx5]   | [genérico]       | [voz da marca]       |

## Exemplos Contextuais

### Email (abertura)
[como a marca começa um email]

### Redes sociais (post)
[como a marca posta — tom, estrutura, elementos]

### Heading de página (hero section)
[como a marca escreve o título principal de uma landing page]
```

---

## Critérios de Qualidade

| Critério | Regra | Verificação |
|----------|-------|-------------|
| 3 propostas de naming (se Caso B) | Categorias diferentes — não variações do mesmo conceito | Categorias distintas? |
| Análise semântica completa | Literal + implícita + emocional para cada proposta | Todas as camadas? |
| Tom de voz tem 4 dimensões | Com polos opostos e posição numérica | 4 espectros preenchidos? |
| Palavras proibidas são específicas | Não "bom", "qualidade", "inovador" sem contexto — palavras reais | São específicas? |
| Antes/depois tem 5 pares distintos | Contextos diferentes — não variações da mesma situação | 5 contextos únicos? |
| Slogan tem máx 6 palavras | Testado em voz alta — flui naturalmente? | Contagem de palavras |
| Vocabulário tem 20+ palavras permitidas | Palavras reais que a marca usa — não adjetivos genéricos | Contagem feita? |

---

## Exemplos de 4 Dimensões de Tom de Voz

Referência de como construir as 4 dimensões:

| Dimensão | Polo A | Polo B |
|----------|--------|--------|
| Formalidade | Casual e coloquial | Formal e técnico |
| Energia | Calmo e reflexivo | Intenso e energético |
| Proximidade | Íntimo e pessoal | Profissional e distante |
| Complexidade | Simples e direto | Denso e elaborado |

> Lexi deve criar as 4 dimensões específicas para esta marca — não copiar o exemplo acima diretamente. As dimensões devem refletir o arquétipo e a estratégia.

---

## Integração com Outros Agentes

| Agente | Recebe de Lexi | Usa para |
|--------|---------------|---------|
| Nara (storytelling) | `brand-voice.md` | Escrever manifesto e narrativas na voz da marca |
| Slide (brand-deck) | `brand-voice.md` | Escrever conteúdo do deck com a voz correta |
| Arch (living-docs) | `brand-voice.md` | Consolidar no brandbook |
| Pixel (ui-brand-system) | `brand-voice.md` | Definir microcopy de UI com a voz da marca |

---

## Referências

- Squad: `squads/brand/SQUAD.md`
- Task anterior: `tasks/00-briefing-intake.md`
- Tasks paralelas: `tasks/01-brand-strategy.md`, `tasks/02-archetypes.md`
- Próxima fase: `tasks/04-storytelling.md`, `tasks/05-visual-direction.md`
