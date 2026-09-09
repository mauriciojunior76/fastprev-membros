# Task 10 — Patterns, Grafismos e Motion

**Executores:** Rex (pattern-library) + Flow (motion-system)
**Fase:** 3 — Sistema e Aplicações
**Paralelo:** Rex e Flow executam em paralelo entre si e com Pixel
**Nível:** Rex (N2/N3) / Flow (N3 apenas)

---

## Inputs

### Inputs de Rex (pattern-library)

| Arquivo | Fornecido por | Obrigatório |
|---------|---------------|-------------|
| `visual-direction.md` | Veda | SIM |
| `logo-rationale.md` | Mark | SIM |
| `design-tokens.json` | Chroma | SIM |
| `typography-system.md` | Typo | NÃO |

### Inputs de Flow (motion-system)

| Arquivo | Fornecido por | Obrigatório |
|---------|---------------|-------------|
| `visual-direction.md` | Veda | SIM |
| `archetypes.md` | Mira | SIM |
| `ui-guidelines.md` | Pixel | SIM |

---

## PARTE A — Rex: Pattern Library

### Princípio Fundamental

Grafismos não são decoração — são extensão do sistema visual. Devem derivar do conceito visual central de Veda e do sistema do logo de Mark. Um grafismo genérico quebra a coerência da marca. Um grafismo derivado do sistema amplifica a identidade.

### Protocolo de Execução de Rex

```
STEP 1: Derivar elementos gráficos do conceito visual central
        → Qual é o conceito central de Veda? (ex: "luz através de cristal")
        → Quais formas geométricas o logo de Mark usa?
        → Como transformar esses elementos em padrões expansivos?

STEP 2: Criar 4 categorias de elementos gráficos

        Categoria 1: FORMAS PRIMÁRIAS
        → Formas geométricas base derivadas do logo
        → Usos: seções de fundo, masks, elementos estruturais
        → Variações de escala, opacidade e rotação

        Categoria 2: LINHAS E ESTRUTURAS
        → Traços, grades, retículas, divisores
        → Espessura, estilo (sólido/tracejado), comportamento
        → Usos: separadores de seção, backgrounds de dados, wireframes

        Categoria 3: PADRÕES REPETITIVOS
        → Texturas, grids, tramas, pontilhados
        → Tamanho do módulo, espaçamento, escala
        → Usos: backgrounds, máscaras, preenchimentos

        Categoria 4: ORNAMENTOS E DETALHES
        → Elementos decorativos menores — pontos de atenção
        → Marca de canto, ícones de sistema, marcadores
        → Usos: acentos, destaques, indicadores visuais

STEP 3: Definir paleta de uso dos grafismos
        → Quais cores da marca (de Chroma) são usadas nos grafismos?
        → Opacidades permitidas por contexto
        → Combinações proibidas (grafismo sobre foto, etc.)

STEP 4: Documentar aplicação por suporte (tabela)
        → Para cada suporte: qual categoria de grafismo, em qual posição, com qual cor

STEP 5: Criar 3 composições exemplares
        → Composição 1: Layout clean (poucos elementos)
        → Composição 2: Layout médio (equilíbrio)
        → Composição 3: Layout rico (máxima expressão)
        → Cada composição documenta: camadas, hierarquia, proporções

STEP 6: Listar restrições de uso
        → O que os grafismos nunca fazem
        → Contextos onde não aparecem
        → Combinações proibidas
```

---

## PARTE B — Flow: Motion System

### Princípio Fundamental

Motion não é animação por animação — é a expressão temporal do arquétipo. Um Mago usa transições que transformam (não apenas movem). Um Herói usa movimentos assertivos e diretos. Um Amante usa movimentos fluidos e sensuais. Sem conexão ao arquétipo, o motion é ruído.

> **N3 apenas.** N2 usa o motion básico definido por Pixel na Task 09.

### Protocolo de Execução de Flow

```
STEP 1: Definir metáfora de movimento coerente com arquétipo
        → Qual é a metáfora física que governa o movimento desta marca?
        → Ex: Mago → "água que toma a forma do recipiente — flui, não força"
        → Ex: Herói → "flecha — direta, precisa, sem desvios"
        → Ex: Criador → "argila sendo moldada — resistência, textura, transformação"
        → Documentar a metáfora em 1 frase

STEP 2: Criar vocabulário de timing com tokens
        → Estender o sistema básico de Pixel com granularidade maior
        → Nomear cada duration com significado (não apenas "fast", "slow")
        → Tokens de timing: instant, micro, fast, base, slow, dramatic, cinematic

STEP 3: Definir curvas de easing por contexto
        → Easing de entrada (elementos que aparecem)
        → Easing de saída (elementos que desaparecem)
        → Easing de transição (elementos que mudam de estado)
        → Easing de atenção (animações de highlight)
        → Easing de celebração (feedback positivo)
        → Todos como cubic-bezier com valores específicos

STEP 4: Especificar microanimações (hover, focus, active)
        → Hover: o que acontece ao passar o mouse (além de cor)
        → Focus: como o focus ring aparece
        → Active: feedback de clique/toque
        → Loading: indicadores de progresso e skeleton screens

STEP 5: Definir animações de página
        → Page entrance (como o conteúdo entra ao navegar)
        → Scroll animations (parallax, reveal, sticky)
        → Animações de herói (logo, headline, CTA)
        → Transições de rota (N3 — SPAs e apps)

STEP 6: Definir animações de identidade
        → Logo animation: como o logo aparece em vídeo/digital
        → Splash screen: se aplicável
        → Loading state da marca

STEP 7: Documentar prefers-reduced-motion (OBRIGATÓRIO)
        → Cada animação deve ter fallback para prefers-reduced-motion
        → Regra geral + exceções justificadas
        → Código CSS de referência
```

---

## Outputs

| Executor | Arquivo | Nível |
|----------|---------|-------|
| Rex | `pattern-library.md` | N2 e N3 |
| Flow | `motion-system.md` | N3 apenas |

---

### Estrutura de pattern-library.md:

```markdown
# Pattern Library — [Nome]

## Conceito Gerador dos Grafismos
[Como os grafismos derivam do conceito visual central e do sistema do logo]

---

## Categoria 1: Formas Primárias
**Origem:** [como derivam do logo/conceito central]
**Formas base:** [lista de formas geométricas]
**Variações:** escala [X–X], opacidade [X%–X%], rotação [0°, 45°, 90°]
**Uso:** [contextos de uso]
**Proibições:** [onde não usar]

## Categoria 2: Linhas e Estruturas
[mesma estrutura]

## Categoria 3: Padrões Repetitivos
[mesma estrutura]

## Categoria 4: Ornamentos e Detalhes
[mesma estrutura]

---

## Paleta dos Grafismos

| Cor | Token | Opacidade padrão | Opacidade máxima | Opacidade mínima |
|-----|-------|-----------------|-----------------|-----------------|
| Primária | brand-primary | 20% | 60% | 8% |
| Neutra | neutral-900 | 8% | 20% | 4% |
| [cor] | [token] | [%] | [%] | [%] |

---

## Aplicação por Suporte

| Suporte | Categoria | Posição | Cor/Opacidade | Escala |
|---------|-----------|---------|--------------|--------|
| Landing page hero | Formas primárias | Fundo, canto inferior direito | brand 20% | Grande |
| Card | Ornamentos | Canto superior | brand 40% | Pequeno |
| Apresentação slide | Linhas + Formas | Margem inferior | neutra 12% | Médio |
| Email header | Formas primárias | Fundo full-width | brand 15% | Médio |
| Embalagem | Padrão repetitivo | Full-coverage | brand+neutra | Médio |

---

## Composições Exemplares

### Composição 1: Clean
**Princípio:** Respiração e hierarquia dominam
[descrição das camadas e proporções]

### Composição 2: Equilibrado
**Princípio:** Identidade sem sobrecarga
[descrição das camadas e proporções]

### Composição 3: Rico
**Princípio:** Máxima expressão da marca
[descrição das camadas e proporções]

---

## Restrições de Uso

1. [Restrição 1 + contexto]
2. [Restrição 2 + contexto]
3. [Restrição 3 + contexto]
4. [Restrição 4 + contexto]
5. [Restrição 5 + contexto]
```

---

### Estrutura de motion-system.md:

```markdown
# Motion System — [Nome]

## Metáfora de Movimento
> "[1 frase que governa todo o sistema de motion]"

**Implicações práticas:**
- [o que a metáfora implica em termos de timing]
- [o que a metáfora implica em termos de easing]
- [o que a metáfora proíbe]

---

## Vocabulário de Timing

| Token | Valor | Uso |
|-------|-------|-----|
| duration-instant | 0ms | Mudanças de estado sem transição |
| duration-micro | 80ms | Hover de ícone, mudança de ícone |
| duration-fast | 150ms | Toggle, checkbox, hover de botão |
| duration-base | 250ms | Transição de componente padrão |
| duration-slow | 350ms | Modal open/close, drawer |
| duration-dramatic | 500ms | Animação de hero, page entrance |
| duration-cinematic | 800ms+ | Animações de identidade |

---

## Curvas de Easing

| Token | Curva | Quando usar |
|-------|-------|-------------|
| ease-enter | cubic-bezier(0, 0, 0.2, 1) | Elementos que entram na tela |
| ease-exit | cubic-bezier(0.4, 0, 1, 1) | Elementos que saem da tela |
| ease-move | cubic-bezier(0.4, 0, 0.2, 1) | Elementos que se reposicionam |
| ease-spring | cubic-bezier(0.34, 1.56, 0.64, 1) | Feedback positivo, celebração |
| ease-smooth | cubic-bezier(0.16, 1, 0.3, 1) | Transições suaves de identidade |

---

## Microanimações

### Hover
[o que acontece + tokens de timing e easing]

### Focus
[como o focus ring aparece + tokens]

### Active/Click
[feedback de interação + tokens]

### Loading
[skeleton screens, spinners, progress — tokens e estilo]

---

## Animações de Página

### Page Entrance
[como o conteúdo aparece ao navegar para uma nova página]

### Scroll Reveal
[como elementos aparecem ao rolar — threshold, delay, stagger]

### Hero Animation
[sequência de animação do hero — logo, headline, CTA]

---

## Animação de Identidade

### Logo Animation
[como o logo aparece em contextos digitais — duração, easing, sequência]

---

## prefers-reduced-motion — Regra Obrigatória

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Exceções justificadas:** [animações essenciais para comunicação de estado — ex: loading spinner]
```

---

## Critérios de Qualidade

### Rex — Pattern Library

| Critério | Regra | Verificação |
|----------|-------|-------------|
| Mínimo 3 categorias de elementos | Formas, linhas, padrões — pelo menos | Contagem feita? |
| Derivação do conceito central documentada | Não elementos genéricos | Conexão rastreável? |
| Tabela de aplicação cobre 5+ suportes | Com posição, cor e escala | 5+ linhas? |
| Composições exemplares documentam camadas | Não apenas descrição vaga | Camadas listadas? |
| Paleta dos grafismos tem opacidades | Padrão, máxima e mínima | Todos os valores? |

### Flow — Motion System (N3)

| Critério | Regra | Verificação |
|----------|-------|-------------|
| Metáfora de movimento conecta ao arquétipo | 1 frase específica + implicações | Frase presente? |
| Vocabulário de timing usa tokens nomeados | Não apenas ms — nomes semânticos | Tokens nomeados? |
| prefers-reduced-motion obrigatório | CSS de referência presente | Código presente? |
| Microanimações têm duration + easing específicos | Não "rápido" — tokens exatos | Tokens especificados? |
| Curvas de easing como cubic-bezier | Não palavras-chave CSS (ease, ease-in) | Formato correto? |

---

## Integração com Outros Agentes

### Rex entrega para:

| Agente | Arquivo | Usa para |
|--------|---------|---------|
| Kira (applications) | `pattern-library.md` | Aplicar grafismos em cada suporte |
| Arch (living-docs) | `pattern-library.md` | Documentar no brandbook |

### Flow entrega para:

| Agente | Arquivo | Usa para |
|--------|---------|---------|
| Arch (living-docs) | `motion-system.md` | Documentar no brandbook |

---

## Referências

- Squad: `squads/brand/SQUAD.md`
- Tasks de input: `tasks/05-visual-direction.md`, `tasks/06-logo-system.md`, `tasks/07-color-tokens.md`
- Tasks paralelas: `tasks/09-ui-brand-system.md`
- Próxima fase: `tasks/11-applications.md`, `tasks/14-living-docs.md`
- Nível Rex: N2 e N3 / Nível Flow: N3 apenas
