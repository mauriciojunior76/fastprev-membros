# Task 01 — Estratégia de Marca

**Executor:** Sage (brand-strategist)
**Fase:** 1 — Estratégia e Personalidade
**Paralelo:** Com Mira (archetypes) e Lexi (naming-voice)
**Nível:** Todos (1, 2, 3)

---

## Inputs

| Arquivo | Fornecido por | Obrigatório |
|---------|---------------|-------------|
| `briefing-expandido.md` | Zeus | SIM |

---

## Protocolo de Execução

```
STEP 1: Analisar briefing expandido completo
        → Absorver: nicho, ICP, transformação prometida, referências, persona
        → Identificar tensões e contradições no briefing

STEP 2: Identificar o "trabalho a ser feito" (JTBD) do cliente
        → O que o cliente contrata essa marca para fazer na vida dele?
        → Separar JTBD funcional do JTBD emocional e do JTBD de identidade

STEP 3: Mapear o oceano competitivo
        → Identificar 3–5 concorrentes de percepção (não só de produto)
        → Mapear como cada um se posiciona (em 1 frase cada)
        → Identificar padrões de linguagem e visual do setor

STEP 4: Encontrar o "espaço vazio de percepção"
        → Qual posição ainda não está ocupada na mente do cliente ideal?
        → Qual tensão do mercado nenhuma marca resolve ainda?
        → Documentar o espaço vazio como oportunidade estratégica

STEP 5: Construir a tese de posicionamento (máx 25 palavras)
        → Formato: "Para [ICP específico], [marca] é a única [categoria] que [diferença real]"
        → Testar: exclui alguém? Se não exclui, não posiciona.
        → Validar: é verificável? Um cliente pode confirmar ou negar?

STEP 6: Derivar pilares, promessa e proposta de valor
        → 3–5 pilares de percepção (o que a marca quer ser conhecida por)
        → Promessa central (o compromisso público da marca)
        → Proposta de valor em 3 dimensões (funcional, emocional, identidade)

STEP 7: Documentar em brand-strategy.md
        → Seguir estrutura de output abaixo
        → Verificar critérios de qualidade antes de finalizar
```

---

## Output

**Arquivo:** `brand-strategy.md`

### Estrutura obrigatória do documento:

```markdown
# Estratégia de Marca — [Nome]

## Essência da Marca
[1–2 frases que capturam o núcleo irredutível da marca]

## Tese de Posicionamento
[15–25 palavras — formato: "Para [ICP], [marca] é a única [categoria] que [diferença]"]

## Território de Marca
**Pertence a:** [qual categoria mental a marca ocupa]
**Espaço vazio explorado:** [tensão de mercado que resolve]
**O que deixa para os outros:** [o que deliberadamente não faz]

## Promessa Central
[Compromisso público da marca — máx 30 palavras]

## Pilares de Percepção
1. [Pilar] — [como se manifesta]
2. [Pilar] — [como se manifesta]
3. [Pilar] — [como se manifesta]
(adicionar 4º e 5º se necessário)

## Proposta de Valor
**Funcional:** [o que entrega de concreto]
**Emocional:** [como faz o cliente se sentir]
**Identidade:** [quem o cliente se torna ao usar/comprar]

## Diferenciação Competitiva
| Concorrente | Posicionamento deles | Nossa diferença |
|-------------|---------------------|-----------------|
| [nome]      | [em 1 frase]        | [em 1 frase]    |

## ICP Refinado
**Perfil primário:** [descrição psicográfica — não só demográfica]
**Crenças que possui:** [lista de 3–5 crenças do ICP]
**Objeção principal:** [o que impede de comprar]
**O que realmente quer:** [JTBD emocional real]

## Anti-Público
**Quem essa marca NÃO é para:** [perfil específico]
**Por que:** [razão estratégica — não apenas preferência]
```

---

## Critérios de Qualidade

| Critério | Regra | Verificação |
|----------|-------|-------------|
| Tese de posicionamento exclui alguém | Se serve a todos, não posiciona nada | Quem fica de fora? |
| Sem clichês estratégicos | Nunca usar: "inovador", "disruptivo", "único no mercado", "faz a diferença" | Escanear o texto |
| ICP tem atitudes e crenças | Não apenas faixa etária, renda ou profissão | Há crenças listadas? |
| Anti-público é específico | Não "pessoas que não valorizam qualidade" — quem especificamente? | Nome do perfil |
| Proposta de valor tem 3 dimensões | Funcional + Emocional + Identidade | Todas presentes? |
| Diferenciação tem tabela | Mínimo 3 concorrentes comparados | Tabela preenchida? |
| Pilares são verificáveis | Cliente pode confirmar ou negar cada pilar | Teste de negação |

---

## Entregas por Nível

| Nível | Profundidade |
|-------|-------------|
| N1 — ESSÊNCIA | Todos os 8 blocos com profundidade básica |
| N2 — IDENTIDADE | Todos os 8 blocos + análise competitiva expandida (5 concorrentes) |
| N3 — SUPREMO | Todos os 8 blocos + análise competitiva completa + mapa perceptual + cenários futuros |

---

## Erros Comuns a Evitar

- Tese de posicionamento que serve "a qualquer empresa do setor"
- ICP com apenas dados demográficos (idade, renda, localização)
- Anti-público vago ("pessoas que não entendem o valor")
- Pilares sem exemplos de manifestação concreta
- Diferenciação baseada em atributos que todos os concorrentes também têm

---

## Integração com Outros Agentes

| Agente | Recebe de Sage | Usa para |
|--------|---------------|---------|
| Mira (archetypes) | `brand-strategy.md` | Validar coerência arquétipo ↔ posicionamento |
| Lexi (naming-voice) | `brand-strategy.md` | Derivar tom de voz coerente com estratégia |
| Veda (visual-direction) | `brand-strategy.md` | Ancorar direção visual na estratégia |
| Nara (storytelling) | `brand-strategy.md` | Construir narrativa sobre a tese de posicionamento |

---

## Referências

- Squad: `squads/brand/SQUAD.md`
- Task anterior: `tasks/00-briefing-intake.md`
- Tasks paralelas: `tasks/02-archetypes.md`, `tasks/03-naming-voice.md`
- Próxima fase: `tasks/05-visual-direction.md`
