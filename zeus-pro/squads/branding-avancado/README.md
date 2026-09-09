# BRAND SQUAD SUPREMO

Sistema de criação de marca premium com IA — do briefing ao brandbook completo.

## O que é

O BRAND SQUAD SUPREMO é um sistema de 21 agentes especializados que transforma 11 campos de briefing em um ecossistema de marca completo. Opera em 3 níveis de profundidade com qualidade visual idêntica em todos.

## 3 Níveis

| Nível | Referência | Agentes | Output |
|-------|-----------|---------|--------|
| 1 — ESSÊNCIA | R$2.000 | 6 | Core brand + deck 8–10 slides |
| 2 — IDENTIDADE | R$ 12.000 | 11 | Sistema completo + deck 14–16 slides |
| 3 — SUPREMO | R$50.000 | 17 | Ecossistema premium + deck 20 slides |

A qualidade visual é **igual em todos os níveis**. A diferença é profundidade e volume.

## Como usar

1. Mencione "criar marca", "branding" ou `@brand-master`
2. Zeus apresenta os 3 níveis — selecione o adequado
3. Forneça o briefing (11 campos)
4. Aguarde execução das fases
5. Aprove a direção visual (gate obrigatório)
6. Aguarde entrega final
7. Aprove para geração de imagens e pasta de entrega

## Fluxo de Execução

```
Fase 0: INTAKE (Zeus) — seleção de nível + briefing expandido
Fase 1: ESTRATÉGIA — Sage + Mira + Lexi + Nara (paralelo)
Fase 2: VISUAL — Veda + Mark + Chroma + Typo (paralelo)
[GATE VISUAL — aprovação humana obrigatória]
Fase 3: SISTEMA — Pixel + Rex + Flow + Kira (N2/N3)
Fase 4: ENTREGA — Luma + Slide + Arch + Quinn
[GATE FINAL — aprovação humana obrigatória]
Fase 5: IMAGEM — Iris + Clio + Vale → brand-image-generator.js
[GATE ARTE — aprovação humana obrigatória]
Fase 6: ENTREGA — Art (art-finalizer) → pasta completa
```

## Agentes

### Orquestradores
| Agente | Persona | Papel |
|--------|---------|-------|
| `brand-master` | Zeus | Orquestrador principal |
| `art-finalizer` | Art | Pasta de entrega ao cliente |

### Estratégia e Narrativa
| Agente | Persona | Output |
|--------|---------|--------|
| `brand-strategist` | Sage | brand-strategy.md |
| `archetype-designer` | Mira | archetypes.md |
| `naming-semantics` | Lexi | brand-voice.md |
| `storytelling` | Nara | storytelling.md (N2/N3) |

### Identidade Visual
| Agente | Persona | Output |
|--------|---------|--------|
| `visual-identity` | Veda | visual-direction.md |
| `logo-symbol` | Mark | logo-rationale.md |
| `color-tokens` | Chroma | design-tokens.json |
| `typography` | Typo | typography-system.md |

### Sistema (N2/N3)
| Agente | Persona | Output |
|--------|---------|--------|
| `ui-brand-system` | Pixel | ui-guidelines.md |
| `pattern-library` | Rex | pattern-library.md |
| `motion-system` | Flow | motion-system.md (N3) |
| `brand-applications` | Kira | applications.md |

### Entrega
| Agente | Persona | Output |
|--------|---------|--------|
| `brand-deck` | Slide | presentation-structure.md |
| `living-docs` | Arch | brandbook-master.md |
| `visual-prompts` | Luma | visual-prompts.md |
| `quality-consistency` | Quinn | quality-report.md |

### Geração de Imagens (OpenAI DALL-E 3)
| Agente | Persona | Papel |
|--------|---------|-------|
| `image-describer` | Iris | Brief visual detalhado por ativo |
| `image-prompt-architect` | Clio | Prompts DALL-E 3 otimizados |
| `image-reviewer` | Vale | Validação antes de chamar API |

## Geração de Imagens

Todo ativo visual (isotipo, paleta, tipografia) é gerado via OpenAI DALL-E 3:

```bash
# Configurar OPENAI_API_KEY no .env
# Rodar após aprovação de Vale:
node scripts/brand-image-generator.js --brand=nome-da-marca
```

## Estrutura de Arquivos

```
squads/brand/
├── SQUAD.md          — Overview filosófico
├── README.md         — Este arquivo
├── squad.yaml        — Config completa
├── agents/           — 21 agentes
├── tasks/            — 16 tasks do pipeline
├── workflows/        — Pipeline de execução
├── templates/        — Templates base
├── checklists/       — Gates de qualidade
├── skills/           — Skills reutilizáveis
├── data/             — Registry de marcas
└── docs/example-brand/  — Exemplo completo AXIS
```

## Output por Marca

```
clientes/{marca}/
├── brand/            — Arquivos de trabalho (agentes)
└── entrega/          — Pasta de entrega ao cliente
    ├── 01-logo-principal/
    ├── 02-isotipo-simbolo/
    ├── 03-wordmark/
    ├── 04-cores-oficiais/
    ├── 05-tipografia/
    ├── 06-apresentacao/
    └── 07-instrucoes/
```
