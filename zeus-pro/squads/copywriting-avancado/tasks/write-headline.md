---
task: writeHeadline()
responsavel: "@eugene-schwartz + @hook-warlord"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: produto
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: dor_ou_desejo_literal
    tipo: string
    origem: User Input ou Matriz de CP/ICP
    obrigatorio: true
  - campo: publico_nomeado
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: transformacao
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: nivel_consciencia
    tipo: enum
    origem: User Input ou diagnostico @eugene-schwartz
    obrigatorio: true

Saida:
  - campo: pacote_headline
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] 3 insumos obrigatorios coletados (dor literal, persona, transformacao)"
  - "[ ] Nivel de consciencia confirmado ou diagnosticado"
  - "[ ] 10+ variacoes geradas cruzando no minimo 4 tipos de gancho"
  - "[ ] Cada variacao pontuada no scorecard de 6 dimensoes"
  - "[ ] Nenhuma entregue com nota bloqueada (dimensao = 1) ou total < 21/30"
---

# Task: Motor de Headline

**Task ID:** COPY-001
**Version:** 2.0.0, reforço 23/07/2026, headline era o ponto fraco do squad
**Comando:** `*write-headline`
**Agentes:** Eugene Schwartz (diagnóstico de consciência) e Hook Warlord (geração e scorecard)
**Propósito:** headline é a peça mais importante de qualquer copy (página, anúncio, criativo, vídeo). Esta task existe pra garantir que ela nunca saia sem noção, sem sentido, fraca ou desconectada da dor, da persona e da transformação.

Esta task é a fonte única do processo de headline no squad. `modules/hooks.md` traz o catálogo de tipos de gancho, `agents/tier-1-core-pt/hook-warlord.md` traz o scorecard e as regras por canal. Esta task orquestra os dois em pipeline.

---

## Regra de ouro

Headline fraca não é falta de criatividade, é falta de insumo. Sem dor literal, persona nomeada e transformação concreta, qualquer headline gerada é genérica por definição. Por isso o Bloco 1 é bloqueante: sem os 3 insumos, a task NÃO gera headline, ela busca o insumo primeiro.

---

## Pipeline obrigatório (5 blocos)

### BLOCO 1, INSUMO OBRIGATÓRIO (gate de entrada, bloqueante)

Antes de escrever qualquer headline, ter em mãos:

1. **Dor ou desejo na fala LITERAL do público.** Não é o que o Zeus acha que a persona sente, é a frase que a persona diria. Fontes, nesta ordem de prioridade:
   - HT Exemplo: Matriz de CP/MQL (skill `matriz-cp-mql`) ou `memory/icp-exemplo-ht-completo.md` seção 7 (dor central: DISPERSÃO, medo de perder tempo e dinheiro) e seção 8 (desejo oculto: SER SERVIDO).
   - LT (Arquiteto, Sofá Marrom): dossiê DNA campeão (`dossie-dna-campeao-lt.md`) ou padrão `low-ticket-creative-standard.md`.
   - Cliente novo sem dossiê: perguntar ao usuário a frase literal que o cliente ouve do público dele. Nunca inventar.
2. **Persona nomeada.** Não "especialistas em geral". Profissão ou perfil específico: "psicólogo clínico", "coach de emagrecimento", "advogado que quer virar mentor". Se vier genérico, devolver pedindo a especificação, 1 pergunta, não trava o fluxo.
3. **Transformação concreta.** Estado A, onde a pessoa está, nomeado, até Estado B, onde ela quer chegar, nomeado. Sem os dois estados visíveis, não existe transformação, existe promessa vaga.

Se qualquer um dos 3 faltar: PARAR, perguntar ou buscar na fonte indicada, nunca inventar e seguir como se tivesse o dado.

### BLOCO 2, ÂNGULO (diagnóstico de consciência, agressividade calibrada)

Usar o protocolo de 5 perguntas do `eugene-schwartz-agent.md` pra travar o nível (1 a 5) e o quanto a headline pode e deve ser agressiva:

| Nível | Nome | Agressividade da headline |
|---|---|---|
| 1 | Unaware | Máxima em EMOÇÃO, zero em produto. Cena vívida ou dor na cara, nunca nome de produto, mentoria ou preço. |
| 2 | Problem aware | Agressiva na dor, ainda sem produto. Amplifica o custo de continuar como está. |
| 3 | Solution aware | Agressividade desce, entra a diferenciação do mecanismo. Por que este método, não o genérico. |
| 4 | Product aware | Ataca a objeção principal. Prova social, urgência real, garantia. |
| 5 | Most aware | Direto, oferta, preço, urgência. Zero rodeio. |

Regra: quanto mais frio o público, mais a agressividade mora na DOR e no DESEJO; quanto mais quente, mais mora na OFERTA. Nunca inverter (oferta agressiva pra público frio queima o anúncio; dor genérica pra público quente é lentidão desnecessária).

### BLOCO 3, GERAÇÃO (mínimo 10 variações)

Gerar cruzando:
- Pelo menos 4 tipos distintos dos 15 ganchos catalogados em `modules/hooks.md`: Dor, Desejo, Curiosidade, Contraste, Autoridade, Erro Comum, Segredo, Opinião Forte, Quebra de Padrão, Antes/Depois, Promessa Específica, Ameaça Silenciosa, Oportunidade Perdida, Comparação, Diagnóstico.
- Os 5 padrões de performance por canal: Pergunta, Estatística Marcante, Antes/Depois, Lacuna de Curiosidade, Problema mais Agitação. Ver `hook-warlord.md` seção "Padrões de Performance".
- Quando for criativo LT: as 8 fórmulas de H1 do padrão Sofá Marrom (`low-ticket-creative-standard.md`).
- Quando for criativo HT: gancho nome ou MQL nos 3 primeiros segundos (skill `criativo-3-segundos-ht`), estrutura "profissão ou perfil, você critério MQL e dor ou desejo?".
- Respeitar limite de caracteres do canal, tabela em `hook-warlord.md`: Meta imagem H1 32 chars, email assunto 60 chars, etc.
- Variar tamanho: curtas (até 8 palavras), médias (8 a 15), longas (15 ou mais).
- Cada variação passa pelo Teste do Estranho antes de entrar no scorecard: em 2 segundos, um estranho sem contexto responde tema, público e tensão. Quem não passa nem chega ao Bloco 4.

### BLOCO 4, SCORECARD (bloqueante, novo)

Pontuar cada variação sobrevivente de 1 a 5 em 6 dimensões:

| Dimensão | Pergunta |
|---|---|
| Dor ou desejo literal | Usa a linguagem real do público, não um resumo genérico dela? |
| Especificidade | Tem número, prazo ou detalhe concreto, regra 4U: útil, urgente, único, ultraespecífico? |
| Curiosidade | Abre uma lacuna real que só o resto da peça fecha? |
| Urgência | Existe motivo real pra agir agora, nunca urgência falsa, Regra 5 do GLOBAL_COPY_RULES? |
| Transformação | Estado A e Estado B aparecem ou ficam implícitos com clareza? |
| Teste do Estranho | Sobrevive isolada, sem perfil, legenda ou contexto? |

Nota mínima pra entregar: total maior ou igual a 21 de 30 pontos E nenhuma dimensão com nota 1. Headline abaixo disso não sobe pro o dono do canal, reescrever ou descartar.

### BLOCO 5, ENTREGA

- Top 5 ranqueadas por nota total, com 1 linha de porquê cada.
- Indicar as 2 melhores pra teste A/B.
- Sub-headline (H2) das 3 melhores, usando fórmula por ângulo: resultado, transformação, nicho, urgência, prova social ou crença destruída. Referência: `squads/lt-criativos/agents/headline-specialist.md`.
- Banco completo das 10+ variações geradas, com nota e gancho usado em cada.

---

## Formato de saída

```markdown
## Pacote de Headline

**Produto:** {produto}
**Público:** {persona nomeada}
**Nível de consciência:** {1 a 5, nome}
**Dor ou desejo literal usada:** {frase}
**Transformação:** {estado A} até {estado B}

### Top 5 (ranqueadas)

| Rank | Headline | Gancho | Dor | Especif. | Curiosidade | Urgência | Transformação | Estranho | Total |
|---|---|---|---|---|---|---|---|---|---|
| 1 | {headline} | {tipo} | X | X | X | X | X | X | XX de 30 |

### Teste A/B recomendado
Controle: {headline 1}
Variante: {headline 2}
Por quê: {motivo}

### Sub-headlines (top 3)
1. {headline} mais {H2}
2. {headline} mais {H2}
3. {headline} mais {H2}

### Banco completo (10+)
1. {headline}, gancho {tipo}, nota {XX de 30}
...

### Reprovadas (se houver, com motivo)
- {headline}, reprovada, motivo: {dimensão que zerou}
```

---

## Vetos

- NUNCA gerar sem os 3 insumos do Bloco 1. Buscar ou perguntar, nunca inventar.
- NUNCA menos de 10 variações.
- NUNCA nome de produto ou preço em headline pra público nível 1 ou 2.
- NUNCA gancho da lista de proibições absolutas do `hook-warlord.md`, frase batida.
- NUNCA headline que não cite o tema, gate de contexto: um estranho olhando só a peça entende do que se trata.
- NUNCA entregar variação com nota total abaixo de 21 de 30 ou com dimensão zerada.
- NUNCA headline em 2 ou mais linhas sem quebra controlada e tamanho equilibrado entre linhas, regra `equilibrio-linhas-texto-visual.md`.
- NUNCA headline centrada no entregável, Regra 11 do GLOBAL_COPY_RULES: vende transformação, não formato.

## Critérios de conclusão

- [ ] 3 insumos coletados e citados na saída
- [ ] Nível de consciência diagnosticado
- [ ] 10+ variações geradas cruzando 4 ou mais tipos de gancho
- [ ] Cada variação com scorecard de 6 dimensões
- [ ] Top 5 ranqueadas com motivo
- [ ] Par de teste A/B indicado
- [ ] Sub-headlines das top 3
- [ ] Zero variação entregue abaixo da nota mínima
