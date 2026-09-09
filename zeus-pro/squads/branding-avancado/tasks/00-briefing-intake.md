# Task 00 — Briefing Intake e Expansão

**Executor:** Zeus (brand-master)
**Fase:** 0 — Intake
**Blocker:** SIM — pipeline não avança sem briefing expandido aprovado

---

## Inputs

- Demanda inicial do usuário (texto livre ou briefing parcial)
- Contexto de negócio (qualquer informação disponível)

---

## Protocolo de Execução

### STEP 1 — Seleção de Nível

Zeus apresenta os 3 níveis e aguarda seleção:

```
🏛️ BRAND SQUAD SUPREMO — Qual é o nível desta marca?

1️⃣  ESSÊNCIA (referência R$2.000)
    Marca objetiva e poderosa com core brand completo.
    → Estratégia, arquétipos, paleta, tipografia, logo racional,
      deck 8–10 slides, quick guide, pasta de entrega básica.
    → Ideal para: lançamentos ágeis, MVPs, validações, marcas iniciais.

2️⃣  IDENTIDADE (referência R$ 12.000)
    Marca com sistema visual e verbal completo.
    → Tudo do Nível 1 + UI brand system básico, pattern library,
      6 aplicações, brandbook médio 8–12 páginas,
      prompts de geração visual, deck 14–16 slides, pasta de entrega completa.
    → Ideal para: crescimento, rebrandings, produtos digitais, SaaS.

3️⃣  SUPREMO (referência R$50.000)
    Ecossistema de marca premium total — brandbook de nível global.
    → Todos os 18 agentes, 14 blocos completos, motion system,
      UI system full, pattern library completa, biblioteca de prompts,
      deck premium 20 slides, documentação viva, style guide,
      pasta de entrega profissional com todas as variações.
    → Ideal para: marcas premium, enterprise B2B, IPO-ready, alto valor.

📌 Em todos os níveis: qualidade visual é IGUAL. A diferença é profundidade e volume.
📦 Em todos os níveis: Art Finalista cria a pasta de entrega profissional ao cliente.
```

**[GATE: level-selection]** — Não avançar sem resposta explícita do usuário.

---

### STEP 2 — Coleta do Briefing Mínimo (11 campos)

Zeus coleta ou infere os seguintes campos. Se o usuário não forneceu um campo, Zeus infere com base no contexto e documenta a inferência explicitamente (ver STEP 3).

| # | Campo | Descrição |
|---|-------|-----------|
| 1 | Nome da marca | Nome existente ou "sugerir" |
| 2 | Nicho/setor | Segmento de mercado |
| 3 | O que vende ou entrega | Produto, serviço ou transformação |
| 4 | Para quem (ICP básico) | Perfil primário do cliente ideal |
| 5 | Transformação prometida | Antes → Depois (estado emocional/prático) |
| 6 | Estilo desejado | Adjetivos estéticos ou referências |
| 7 | Palavras que a marca DEVE transmitir | 3–5 palavras obrigatórias |
| 8 | Palavras que a marca NUNCA deve transmitir | 3–5 palavras proibidas |
| 9 | Marcas de referência visual | 2–3 marcas como referência estética |
| 10 | Sensação desejada ao ver a marca | Estado emocional que a marca evoca |
| 11 | Orçamento para assets externos | Fontes pagas, stock, ilustradores? |

---

### STEP 3 — Inferências Documentadas

Para cada campo ausente ou incompleto, Zeus infere com base no contexto disponível e documenta explicitamente no formato abaixo. Inferências nunca são silenciosas.

```markdown
## Inferências de Zeus

- Campo 4 (ICP): inferido como "empreendedores digitais 28–45 anos buscando autoridade de marca"
  Razão: nicho de consultoria premium implica esse perfil com base em dados de mercado.

- Campo 9 (Referências): inferidas como "Apple, Aesop, Arc Browser"
  Razão: estilo "premium minimalista com alma" indicado nos adjetivos fornecidos.

- Campo 11 (Budget assets): inferido como "não disponível"
  Razão: usuário não mencionou orçamento adicional; assume-se fontes incluso/OFL.
```

**Regra:** Toda inferência deve ser confirmada ou corrigida pelo usuário antes do STEP 4.

---

### STEP 4 — Expansão do Briefing

Com os 11 campos completos (diretos ou inferidos e confirmados), Zeus gera o briefing expandido contendo:

**4.1 — Persona do Cliente Ideal (profunda)**
- Nome fictício e contexto de vida
- Dores psicológicas (não apenas problemas práticos)
- Crenças e visão de mundo
- Objeções principais
- O que a faz comprar de verdade (não o que ela diz)

**4.2 — Contexto Competitivo Básico**
- 3–5 concorrentes de percepção (não apenas de produto)
- Como o mercado se posiciona atualmente
- Espaço vazio de percepção identificado

**4.3 — Hipótese de Posicionamento**
- 1 frase de 15–25 palavras que captura a diferença
- Justificativa da hipótese

**4.4 — Hipótese de Arquétipo**
- Arquétipo primário e secundário (com justificativa)
- Sombra a evitar

**4.5 — Sensação Visual Preliminar**
- 3–5 adjetivos sensoriais (não apenas visuais)
- Metáfora de energia da marca

**4.6 — Mercado e Contexto**
- Tamanho de mercado aproximado (não precisa ser exato)
- Momento do mercado (crescendo, saturado, emergente?)
- Oportunidade central

---

### STEP 5 — Confirmação e Início do Pipeline

Zeus apresenta o briefing expandido ao usuário no formato:

```markdown
## Briefing Expandido — [Nome da Marca]
**Nível selecionado:** [1 / 2 / 3]
**Agentes que serão ativados:** [lista]

[conteúdo do briefing expandido]

---
✅ Confirma esse briefing? (sim / ajustar [campo])
```

Zeus aguarda confirmação antes de acionar os agentes da Fase 1.

---

## Output

| Arquivo | Descrição |
|---------|-----------|
| `briefing-expandido.md` | Briefing completo com inferências documentadas |
| Confirmação verbal | Nível selecionado e pipeline aprovado |
| Lista de agentes | Quais agentes serão ativados nesta sessão |

---

## Critérios de Qualidade

| Critério | Verificação |
|----------|-------------|
| 11 campos completos | Diretos ou inferências documentadas e confirmadas |
| Persona tem profundidade psicológica | Não só demográfico — inclui crenças e objeções |
| Hipótese de arquétipo justificada | Primário + secundário com razão explícita |
| Inferências são transparentes | Documentadas no formato padrão, não silenciosas |
| Nível selecionado antes do pipeline | Gate hard bloqueante — pipeline não avança sem isso |
| Briefing confirmado pelo usuário | Gate soft — Zeus aguarda confirmação antes da Fase 1 |

---

## Erros Comuns a Evitar

- Inferir e não documentar (inferência silenciosa = violação)
- Avançar sem seleção de nível
- Persona com apenas dados demográficos
- Hipótese de posicionamento genérica ("marca para todos")
- Não aguardar confirmação do briefing expandido

---

## Referências

- Squad: `squads/brand/SQUAD.md`
- Config: `squads/brand/squad.yaml`
- Regra de ativação: `.claude/rules/brand-squad.md`
- Próxima fase: Tasks 01, 02, 03 (paralelas)
