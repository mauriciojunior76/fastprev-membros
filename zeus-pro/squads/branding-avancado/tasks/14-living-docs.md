# Task 14 — Documentação Viva (Brandbook)

**Executor:** Arch (living-docs)
**Fase:** 4 — Entrega Final
**Sequência:** Após Luma e Slide finalizarem
**Nível:** Todos (profundidade e volume variam)

---

## Inputs

| Arquivo | Fornecido por | Obrigatório |
|---------|---------------|-------------|
| `briefing-expandido.md` | Zeus | SIM |
| `brand-strategy.md` | Sage | SIM |
| `archetypes.md` | Mira | SIM |
| `brand-voice.md` | Lexi | SIM |
| `storytelling.md` | Nara | N2/N3 |
| `visual-direction.md` | Veda | SIM |
| `logo-rationale.md` | Mark | SIM |
| `design-tokens.json` | Chroma | SIM |
| `color-system.md` | Chroma | SIM |
| `typography-system.md` | Typo | SIM |
| `ui-guidelines.md` | Pixel | N2/N3 |
| `pattern-library.md` | Rex | N2/N3 |
| `motion-system.md` | Flow | N3 |
| `applications.md` | Kira | N2/N3 |
| `visual-prompts.md` | Luma | N2/N3 |
| `presentation-structure.md` | Slide | SIM |
| `slide-content.md` | Slide | SIM |

---

## Princípio Fundamental

O brandbook não é uma compilação de arquivos — é uma narrativa consolidada. Arch não copia e cola: conecta, contextualiza e organiza. O documento final deve ser lido de forma linear (do posicionamento à aplicação) e também consultado de forma não-linear (ir diretamente à seção de cores, por exemplo). Estrutura e navegabilidade são tão importantes quanto o conteúdo.

---

## Protocolo de Execução

```
STEP 1: Consolidar todos os outputs em brandbook-master.md
        → Ler todos os arquivos do pipeline
        → Identificar inconsistências entre arquivos (documentar para Quinn)
        → Organizar em ordem lógica: estratégia → personalidade → visual → aplicação
        → Conectar seções com transições narrativas (não apenas "próximo capítulo")

STEP 2: Criar quick guide (2–4 páginas) — todos os níveis
        → Guia de uso rápido para quem não tem tempo de ler o brandbook completo
        → Contém: logo (versões e restrições), cores (hex direto), tipografia (famílias), regras básicas
        → Formato: altamente visual, tabelas e bullets — sem prosa longa

STEP 3 (N2): Construir brandbook médio (8–12 páginas)
        → Todos os capítulos com profundidade média
        → Cada capítulo: propósito + regras + exemplos visuais (descrição)
        → Incluir: "O que fazer / O que nunca fazer" por capítulo

STEP 4 (N3): Brandbook completo + living docs
        → Todos os 14 blocos com profundidade total
        → Living docs: estrutura para atualização contínua da marca
        → Versioning: como registrar mudanças na marca ao longo do tempo
        → Governance: quem tem autoridade para aprovar mudanças

STEP 5: Estruturar capítulos em ordem lógica
        → Seção 0: Como usar este documento
        → Seção 1: Estratégia e Posicionamento
        → Seção 2: Personalidade e Voz
        → Seção 3: Identidade Visual
        → Seção 4: Sistema e Componentes
        → Seção 5: Aplicações
        → Seção 6: Recursos e Ferramentas
        → Apêndice: Design Tokens + Glossário

STEP 6: Incluir checklist de consistência
        → Lista de verificações para quem usa a marca
        → Perguntas que devem ser respondidas "sim" antes de publicar qualquer material

STEP 7: Documentar próximos passos e como manter a marca
        → O que fazer quando surgir uma nova aplicação não documentada
        → Quem consultar para dúvidas
        → Como evoluir a marca com consistência
```

---

## Outputs

| Arquivo | Descrição | Nível |
|---------|-----------|-------|
| `brandbook-master.md` | Documentação consolidada completa | Todos |
| `quick-guide.md` | Guia de uso rápido 2–4 páginas | Todos |

---

### Estrutura de brandbook-master.md:

```markdown
# Brandbook — [Nome]
**Versão:** 1.0
**Data:** [data]
**Nível:** [N1 / N2 / N3]

---

## Como Usar Este Documento

[Breve explicação de como navegar o brandbook]
[Para quem é cada seção]
[O que fazer quando a resposta não está aqui]

---

## Seção 0: Essência da Marca (1 página)
[Resumo executivo — tese de posicionamento, arquétipo, promessa, tom em 1 parágrafo cada]

---

## Seção 1: Estratégia e Posicionamento

### 1.1 Tese de Posicionamento
[Extraído e expandido de brand-strategy.md]

### 1.2 Território de Marca
[Espaço que a marca ocupa / deixa para outros]

### 1.3 ICP e Anti-Público
[Com psicografia e crenças — não apenas demográfico]

### 1.4 Proposta de Valor
[Funcional + Emocional + Identidade]

---

## Seção 2: Personalidade e Voz

### 2.1 Arquétipos
[Primário + Secundário + Sombra]

### 2.2 5 Traços de Personalidade
[Com exemplos de comportamento]

### 2.3 Tom de Voz
[4 dimensões com espectro + exemplos antes/depois]

### 2.4 Vocabulário
[Permitido e proibido]

### 2.5 Manifesto e Narrativa (N2/N3)
[Manifesto + narrativa curta + narrativa expandida]

---

## Seção 3: Identidade Visual

### 3.1 Conceito Visual Central
[1 frase + derivação]

### 3.2 Logo e Sistema
[Racional + variações + área de respiro + restrições]

### 3.3 Cores
[Sistema completo + WCAG + semântica]

### 3.4 Tipografia
[Famílias + escala + tokens]

### 3.5 Moodboard e Universo Estético
[O que é / O que nunca é + referências]

---

## Seção 4: Sistema e Componentes (N2/N3)

### 4.1 UI Brand System
[Grid + Spacing + Componentes core + Dark/Light mode]

### 4.2 Pattern Library
[4 categorias de grafismos + aplicação por suporte]

### 4.3 Motion System (N3)
[Metáfora + Timing + Easing + Microanimações]

---

## Seção 5: Aplicações

### 5.1 Tabela de Suportes
[Todas as aplicações documentadas com tabela resumo]

### 5.2 Detalhamento por Suporte
[Cada aplicação com instrução de produção]

---

## Seção 6: Recursos e Ferramentas

### 6.1 Prompts Visuais (N2/N3)
[Biblioteca de prompts com glossário]

### 6.2 Deck da Marca
[Link para apresentação / referência para slides]

### 6.3 Assets e Downloads
[Onde acessar: logo, fontes, tokens, templates]

---

## Seção 7: Governança e Manutenção (N3)

### 7.1 Como Evoluir a Marca
[Processo para adicionar novos elementos]

### 7.2 Quem Aprova O Quê
[Matriz de autoridade sobre decisões de marca]

### 7.3 Changelog
[Histórico de versões do brandbook]

### 7.4 Living Docs — Como Atualizar
[Protocolo para manter o documento vivo]

---

## Apêndice A: Design Tokens Completos
[design-tokens.json formatado para referência]

## Apêndice B: Glossário
[Termos técnicos usados no brandbook com definições]

## Apêndice C: Checklist de Consistência

### Antes de publicar qualquer material, verificar:
- [ ] O logo está na versão correta para este suporte?
- [ ] A área de respiro está respeitada?
- [ ] As cores são as tokens semânticas corretas?
- [ ] O contraste WCAG está verificado?
- [ ] A tipografia segue a escala definida?
- [ ] O tom de voz é coerente com as 4 dimensões?
- [ ] Os grafismos usam a paleta e opacidades corretas?
- [ ] O material exclui fontes e cores banidas?
```

---

### Estrutura de quick-guide.md:

```markdown
# Quick Guide — [Nome]
**Para quem:** Qualquer pessoa que usa a marca no dia a dia
**Quando usar:** Dúvida rápida — para aprofundamento, use o Brandbook completo

---

## Logo

| Versão | Quando usar |
|--------|-------------|
| Principal | Uso geral em fundos neutros |
| Horizontal | Headers digitais, documentos largos |
| Símbolo | App icon, favicon, uso isolado |
| Negativa | Fundos escuros e coloridos |

**Área de respiro:** [Regra rápida em linguagem simples]
**Tamanho mínimo:** [X]px digital / [X]mm impresso

**Nunca:**
- [Restrição 1]
- [Restrição 2]
- [Restrição 3]

---

## Cores

| Nome | HEX | Uso |
|------|-----|-----|
| Primária | #... | [uso] |
| Secundária | #... | [uso] |
| Acento | #... | Máx 10% da composição |
| Fundo claro | #... | Fundo padrão |
| Fundo escuro | #... | Dark mode / seções de impacto |
| Texto principal | #... | Texto sobre fundo claro |

---

## Tipografia

| Uso | Família | Peso |
|-----|---------|------|
| Headlines | [família] | [peso] |
| Corpo de texto | [família] | [peso] |
| Labels / UI | [família] | [peso] |

**Fontes banidas:** Inter, Roboto, Open Sans, Lato, Poppins, Montserrat

---

## Tom de Voz — Resumo

**A marca é:** [traço 1], [traço 2], [traço 3]
**A marca nunca é:** [anti-traço 1], [anti-traço 2], [anti-traço 3]

**Na dúvida, perguntar:** "Esta comunicação soaria assim se [descrição do arquétipo]?"

---

## Dúvidas Frequentes

**Posso usar o logo sobre foto?** [resposta direta]
**Qual fonte usar em apresentações?** [resposta direta]
**Posso criar novas cores?** [resposta direta]
**Quem aprova novos materiais?** [resposta direta]
```

---

## Critérios de Qualidade

| Critério | Regra | Verificação |
|----------|-------|-------------|
| Quick guide tem 4 seções mínimas | Logo + Cores + Tipografia + Tom de voz | Seções presentes? |
| N2: brandbook cobre estratégia + visual completo | Seções 1, 2, 3 completas com N2 depth | Seções preenchidas? |
| N3: brandbook é referência viva com todos os blocos | Seções 1–7 + apêndices | Completo? |
| Capítulos têm ordem lógica | Estratégia antes de visual, sistema antes de aplicação | Ordem verificada? |
| Inclui seção "O que fazer / O que nunca fazer" | Por capítulo no brandbook médio/completo | Seção presente? |
| Checklist de consistência presente | Mínimo 8 itens verificáveis | Presente e preenchido? |
| Inconsistências identificadas para Quinn | Documentadas no início do brandbook-master.md | Documentadas? |
| Quick guide é acionável sem o brandbook | Responde dúvidas do dia a dia | Teste de autonomia |

---

## Escopo por Nível Detalhado

| Seção | N1 | N2 | N3 |
|-------|----|----|-----|
| Como usar o documento | Resumo | Completo | Completo + Governance |
| Seção 0: Essência | Sim | Sim | Sim |
| Seção 1: Estratégia | Básico | Completo | Completo + Cenários |
| Seção 2: Personalidade | Básico | Completo | Completo + Stories |
| Seção 3: Identidade Visual | Básico | Completo | Completo |
| Seção 4: Sistema | — | Básico | Completo |
| Seção 5: Aplicações | — | 5–6 suportes | 10+ suportes |
| Seção 6: Recursos | — | Prompts básicos | Completo |
| Seção 7: Governança | — | — | Completo |
| Apêndice A: Tokens | HEX + familia | JSON básico | JSON completo |
| Apêndice B: Glossário | Mínimo | Completo | Completo |
| Apêndice C: Checklist | 5 itens | 8+ itens | 12+ itens |

---

## Integração com Outros Agentes

| Agente | Arch recebe de | Usa para |
|--------|---------------|---------|
| Quinn (quality-consistency) | `brandbook-master.md`, `quick-guide.md` | Gate final de qualidade |

---

## Referências

- Squad: `squads/brand/SQUAD.md`
- Tasks de input: todas as tasks das Fases 1, 2, 3 e tarefas paralelas da Fase 4
- Próxima fase: `tasks/15-quality-gate.md` (gate final)
- Nível: disponível para todos (profundidade varia)
