# Task 15 — Revisão e Gate de Qualidade

**Executor:** Quinn (quality-consistency)
**Fase:** 4 — Entrega Final
**Sequência:** Após Arch finalizar — última task antes do gate final com Zeus
**Nível:** Todos

---

## Inputs

Quinn revisa **todos** os arquivos do pipeline:

| Arquivo | Fornecido por | Revisão |
|---------|---------------|---------|
| `briefing-expandido.md` | Zeus | Referência de validação |
| `brand-strategy.md` | Sage | Dimensões 1 e 3 |
| `archetypes.md` | Mira | Dimensões 1 e 6 |
| `brand-voice.md` | Lexi | Dimensões 1 e 6 |
| `storytelling.md` | Nara | Dimensões 1 e 6 (N2/N3) |
| `visual-direction.md` | Veda | Dimensões 2 e 6 |
| `logo-rationale.md` | Mark | Dimensões 2 e 5 |
| `design-tokens.json` | Chroma | Dimensões 2 e 5 |
| `color-system.md` | Chroma | Dimensões 2 e 5 |
| `typography-system.md` | Typo | Dimensões 2 e 4 |
| `ui-guidelines.md` | Pixel | Dimensões 2 e 7 (N2/N3) |
| `pattern-library.md` | Rex | Dimensões 2 e 6 (N2/N3) |
| `motion-system.md` | Flow | Dimensão 7 (N3) |
| `applications.md` | Kira | Dimensões 2, 5 e 7 (N2/N3) |
| `visual-prompts.md` | Luma | Dimensão 6 (N2/N3) |
| `presentation-structure.md` | Slide | Dimensão 6 |
| `slide-content.md` | Slide | Dimensões 1 e 6 |
| `brandbook-master.md` | Arch | Todas as dimensões |
| `quick-guide.md` | Arch | Dimensões 3 e 7 |

---

## As 7 Dimensões de Avaliação

Quinn avalia o sistema completo em 7 dimensões, cada uma valendo até 5 pontos. Total máximo: 35 pontos.

### Dimensão 1 — Coerência Estratégia ↔ Visual (máx 5 pts)
Verifica se o sistema visual materializa a estratégia e o arquétipo de forma rastreável.

**Perguntas de avaliação:**
- A cor primária é rastreável ao arquétipo e à estratégia? (sim/não)
- A tipografia principal reflete o caráter do arquétipo? (sim/não)
- O conceito visual central conecta-se à tese de posicionamento? (sim/não)
- O logo comunica visualmente o que a estratégia promete verbalmente? (sim/não)
- O tom de voz nos slides é coerente com as 4 dimensões definidas por Lexi? (sim/não)

**Pontuação:** número de "sim" = pontuação (0–5)

---

### Dimensão 2 — Consistência Tipográfica (máx 5 pts)
Verifica se a tipografia é aplicada corretamente em todos os pontos do sistema.

**Perguntas de avaliação:**
- Nenhuma fonte banida (Inter, Roboto, Open Sans, Lato, Poppins, Montserrat) está como principal? (sim/não)
- A escala tipográfica tem mínimo 6 níveis com uso definido? (sim/não)
- Os design tokens de tipografia cobrem family, size, weight e lineHeight? (sim/não)
- O licenciamento de todas as fontes está documentado? (sim/não)
- As combinações aprovadas têm contextos de uso específicos? (sim/não)

**Pontuação:** número de "sim" = pontuação (0–5)

---

### Dimensão 3 — Consistência de Cores (máx 5 pts)
Verifica se o sistema cromático é coerente, funcional e bem documentado.

**Perguntas de avaliação:**
- A cor primária tem justificativa estratégica rastreável (não apenas estética)? (sim/não)
- Os neutros têm temperatura definida (não são cinzas puros)? (sim/não)
- O design-tokens.json segue o formato W3C ($value, $type)? (sim/não)
- A quantidade de tokens atende o mínimo do nível (N1≥8, N2≥20, N3≥50)? (sim/não)
- A paleta não é um "arco-íris acidental" (máx 3 famílias cromáticas)? (sim/não)

**Pontuação:** número de "sim" = pontuação (0–5)

---

### Dimensão 4 — Acessibilidade e WCAG (máx 5 pts)
Verifica se todas as combinações de cor/texto atendem os requisitos mínimos de acessibilidade.

**Checklist:**
- Texto principal sobre fundo principal: ratio ≥4.5:1? (sim/não)
- Texto sobre cor de marca (se usado): ratio ≥4.5:1? (sim/não)
- Texto sobre fundo secundário: ratio ≥4.5:1? (sim/não)
- Focus ring visível em todos os componentes interativos? (sim/não — N2/N3)
- prefers-reduced-motion documentado e implementado? (sim/não — N3)

**Pontuação:** número de "sim" = pontuação (0–5)

> N1: avaliar apenas os 3 primeiros itens. Máximo de 3 "sim" possíveis para N1, normalizado para 5 pontos.

---

### Dimensão 5 — Completude por Nível (máx 5 pts)
Verifica se todos os entregáveis obrigatórios do nível estão presentes e completos.

#### N1 — Checklist de completude
- [ ] briefing-expandido.md
- [ ] brand-strategy.md
- [ ] archetypes.md
- [ ] brand-voice.md
- [ ] visual-direction.md
- [ ] logo-rationale.md
- [ ] design-tokens.json
- [ ] color-system.md
- [ ] typography-system.md
- [ ] presentation-structure.md
- [ ] slide-content.md (8–10 slides)
- [ ] brandbook-master.md
- [ ] quick-guide.md

#### N2 — Adicionar ao N1
- [ ] storytelling.md
- [ ] ui-guidelines.md
- [ ] pattern-library.md
- [ ] applications.md (5–6 suportes)
- [ ] visual-prompts.md (Blocos 1–3)
- [ ] slide-content.md (14–16 slides)

#### N3 — Adicionar ao N2
- [ ] motion-system.md
- [ ] applications.md (10+ suportes)
- [ ] visual-prompts.md (todos os 5 blocos)
- [ ] slide-content.md (20 slides exatos)

**Pontuação:**
- 100% dos arquivos presentes e não-vazios = 5
- 90–99% = 4
- 80–89% = 3
- 70–79% = 2
- <70% = 1

---

### Dimensão 6 — Coerência Entre Todos os Agentes (máx 5 pts)
Verifica se os agentes trabalharam de forma coerente entre si — sem contradições.

**Perguntas de avaliação:**
- O arquétipo primário de Mira e o conceito visual de Veda apontam para a mesma direção? (sim/não)
- O tom de voz nos slides (Slide) é coerente com as dimensões de Lexi? (sim/não)
- Os grafismos de Rex derivam do conceito visual de Veda (rastreável)? (sim/não)
- As aplicações de Kira usam as versões corretas do logo de Mark? (sim/não)
- O conteúdo do brandbook de Arch não contradiz nenhum arquivo de agente? (sim/não)

**Pontuação:** número de "sim" = pontuação (0–5)

---

### Dimensão 7 — Praticidade e Usabilidade (máx 5 pts)
Verifica se o sistema é utilizável pelo cliente sem Arch presente.

**Perguntas de avaliação:**
- O quick guide responde as 5 dúvidas mais comuns de uso da marca? (sim/não)
- As instruções de produção são acionáveis (ferramentas + passos)? (sim/não)
- O checklist de consistência permite auto-verificação? (sim/não)
- Os design tokens são consumíveis diretamente em CSS/Figma? (sim/não)
- Os próximos passos do deck são concretos e acionáveis? (sim/não)

**Pontuação:** número de "sim" = pontuação (0–5)

---

## Protocolo de Execução

```
STEP 1: Revisar coerência estratégia ↔ visual
        → Avaliar Dimensão 1 com as 5 perguntas
        → Documentar inconsistências encontradas com localização exata

STEP 2: Verificar consistência tipográfica
        → Avaliar Dimensão 2 com as 5 perguntas
        → Verificar fontes banidas em todos os arquivos do pipeline

STEP 3: Verificar consistência de cores
        → Avaliar Dimensão 3 com as 5 perguntas
        → Verificar formato do design-tokens.json

STEP 4: Validar contraste e acessibilidade
        → Avaliar Dimensão 4 com o checklist WCAG
        → Verificar todos os pares de cor/texto documentados

STEP 5: Verificar completude por nível
        → Avaliar Dimensão 5 com o checklist do nível
        → Listar arquivos ausentes ou incompletos

STEP 6: Verificar coerência entre todos os agentes
        → Avaliar Dimensão 6 com as 5 perguntas
        → Identificar contradições entre outputs de agentes diferentes

STEP 7: Verificar praticidade e usabilidade
        → Avaliar Dimensão 7 com as 5 perguntas
        → Testar quick guide como usuário final sem contexto do pipeline

STEP 8: Pontuar (N/35) e emitir veredicto
        → Somar pontos das 7 dimensões
        → Aplicar tabela de veredictos
        → Documentar em quality-report.md
```

---

## Output

**Arquivo:** `quality-report.md`

### Estrutura obrigatória do documento:

```markdown
# Quality Report — [Nome da Marca]
**Data:** [data]
**Executor:** Quinn (quality-consistency)
**Nível:** [N1 / N2 / N3]

---

## Pontuação por Dimensão

| # | Dimensão | Pontuação | Máximo |
|---|----------|----------|--------|
| 1 | Coerência Estratégia ↔ Visual | X | 5 |
| 2 | Consistência Tipográfica | X | 5 |
| 3 | Consistência de Cores | X | 5 |
| 4 | Acessibilidade e WCAG | X | 5 |
| 5 | Completude por Nível | X | 5 |
| 6 | Coerência Entre Agentes | X | 5 |
| 7 | Praticidade e Usabilidade | X | 5 |
| | **TOTAL** | **X** | **35** |

---

## Veredicto

**[APROVADO / COM RESSALVAS / REPROVADO]**

[Justificativa em 2–3 frases]

---

## Inconsistências Encontradas

[Se nenhuma: "Nenhuma inconsistência encontrada."]

### Inconsistência 1
**Localização:** [arquivo(s) envolvido(s) + trecho específico]
**Impacto:** [alto / médio / baixo]
**Dimensão afetada:** [D1-D7]
**Sugestão de correção:** [ação específica para o agente responsável]

### Inconsistência 2
[mesma estrutura]

---

## Correções Obrigatórias (antes do gate)

[Apenas se veredicto COM RESSALVAS ou REPROVADO]

| # | Correção | Agente responsável | Prioridade |
|---|----------|------------------|------------|
| 1 | [o que corrigir] | [agente] | Alta/Média/Baixa |

---

## Status de Cada Arquivo de Output

| Arquivo | Status | Observação |
|---------|--------|------------|
| briefing-expandido.md | ✅ Completo | — |
| brand-strategy.md | ✅ Completo | — |
| archetypes.md | ✅ Completo | — |
| brand-voice.md | ⚠️ Incompleto | Faltam 3 exemplos antes/depois |
| visual-direction.md | ✅ Completo | — |
| logo-rationale.md | ✅ Completo | — |
| design-tokens.json | ❌ Problema | Formato não segue W3C — corrigir |
| color-system.md | ✅ Completo | — |
| typography-system.md | ✅ Completo | — |
| ui-guidelines.md | ✅ Completo | — |
| pattern-library.md | ✅ Completo | — |
| motion-system.md | N/A | N1 não inclui |
| applications.md | ✅ Completo | — |
| visual-prompts.md | ✅ Completo | — |
| presentation-structure.md | ✅ Completo | — |
| slide-content.md | ⚠️ Incompleto | Slide 15 sem instrução visual |
| brandbook-master.md | ✅ Completo | — |
| quick-guide.md | ✅ Completo | — |

---

## Próximos Passos

[Se APROVADO:]
→ Quinn notifica Zeus para gate final com o usuário
→ Zeus apresenta o sistema completo e aguarda aprovação
→ Art (`@art-finalizer`) só é acionado após aprovação explícita do usuário

[Se COM RESSALVAS:]
→ Agentes responsáveis corrigem os itens listados acima
→ Quinn re-revisa apenas os arquivos corrigidos
→ Se pontuação ≥28 após correções → APROVADO

[Se REPROVADO:]
→ Agentes das dimensões com menor pontuação refazem seus outputs
→ Quinn realiza revisão completa novamente
→ Zeus é notificado com resumo do que foi identificado
```

---

## Tabela de Veredictos

| Pontuação | Veredicto | Próxima ação |
|-----------|-----------|-------------|
| 28–35 | APROVADO | Gate final com Zeus + usuário |
| 21–27 | COM RESSALVAS | Correções antes do gate — re-revisar |
| <21 | REPROVADO | Agentes responsáveis refazem — revisão completa |

---

## Critérios de Qualidade do Quality Report

| Critério | Regra | Verificação |
|----------|-------|-------------|
| 7 dimensões avaliadas com justificativa | Não apenas pontuação — razão por dimensão | Texto por dimensão? |
| Inconsistências têm localização exata | Arquivo + trecho — não "a paleta está errada" | Especificidade? |
| Status de cada arquivo listado | Todos os arquivos do pipeline com status | Lista completa? |
| Correções têm agente responsável | Quem deve corrigir o quê | Agente identificado? |
| Próximos passos por veredicto | 3 veredictos com ação diferente | 3 ações presentes? |
| Pontuação somada corretamente | Total = soma das 7 dimensões | Cálculo verificado? |

---

## Regras de Escalação

### Quinn detecta violação constitucional
Se Quinn encontrar violação dos princípios da Constitution (Artigos I–VI), deve:
1. Marcar a inconsistência como "VIOLAÇÃO CONSTITUCIONAL" no quality report
2. Atribuir pontuação 0 na dimensão afetada automaticamente
3. Emitir veredicto REPROVADO independente das outras pontuações
4. Notificar Zeus com a violação específica

### Quinn não consegue avaliar um arquivo
Se um arquivo de input estiver ausente ou ilegível:
1. Marcar o arquivo como ❌ Ausente no status
2. Subtrair 1 ponto da Dimensão 5 por arquivo ausente
3. Documentar como inconsistência com prioridade Alta
4. Não bloquear a avaliação dos outros arquivos

---

## Integração com Zeus

Após emitir o quality report:
1. Quinn notifica Zeus: "[Nome] — Quality Report: [APROVADO/COM RESSALVAS/REPROVADO] — [X]/35 pontos"
2. Zeus apresenta o report ao usuário com contexto
3. Se APROVADO: Zeus solicita aprovação final do usuário para acionar Art
4. Se COM RESSALVAS: Zeus lista as correções e aguarda agentes corrigirem
5. Se REPROVADO: Zeus apresenta as dimensões mais críticas e propõe plano de correção

---

## Referências

- Squad: `squads/brand/SQUAD.md`
- Constitution: `.aios-core/constitution.md`
- Tasks de input: todas as 14 tasks anteriores
- Próxima etapa: gate final com Zeus e usuário → Art Finalista (se aprovado)
- Nível: disponível para todos
