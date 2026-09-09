# Task 41 - Revisao Diaria de Decisoes

> Agente responsavel: Diario (decision-notebook-specialist)
> Fase: Diagnostico e Revisao
> Bloqueante: NAO
> Nota: executar diariamente durante operacao (*daily-review)

## Inputs
- Metricas do dia (dashboard task 34)
- Decisoes pendentes da operacao

## Protocolo de Execucao

### STEP 1 - Responder 5 perguntas do dia
Preencher as 5 perguntas obrigatorias do ritual diario:
1. Que numero mudou? (identificar a metrica que mais variou nas ultimas 24h)
2. O que causou? (investigar a razao da variacao - positiva ou negativa)
3. Que acao tomar? (definir acao concreta baseada na variacao)
4. Quem executa? (atribuir dono para a acao)
5. Como medir? (definir como saber se a acao funcionou em 24-48h)

### STEP 2 - Registrar decisao formal
Para cada decisao tomada no dia, documentar: contexto (por que essa decisao foi necessaria), opcoes consideradas, decisao final, dono da execucao, prazo, metrica de sucesso.

### STEP 3 - Revisar decisoes anteriores
Verificar decisoes dos dias anteriores: a acao foi executada? O resultado esperado aconteceu? Se nao, qual ajuste fazer? Decisoes nao executadas devem ser escaladas ou canceladas - nunca ficam pendentes indefinidamente.

### STEP 4 - Consolidar aprendizados
Ao final de cada dia, registrar 1 aprendizado principal: "Hoje aprendi que X porque Y, e a partir de agora Z". Esse registro alimenta o diagnostico (task 40) e o post-mortem (task 37).

## Outputs
- `decision-notebook-{project}.md` - Caderno de decisoes diario com perguntas, decisoes e aprendizados

## Checklist de Validacao
- [ ] 5 perguntas respondidas com dados reais
- [ ] Decisoes registradas com dono e prazo
- [ ] Decisoes anteriores revisadas
- [ ] Aprendizado do dia documentado
- [ ] Metrica de sucesso definida para cada acao
- [ ] Acentuacao perfeita em todo texto portugues
