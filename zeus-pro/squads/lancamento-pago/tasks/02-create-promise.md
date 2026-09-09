---
task: createPromise()
responsavel: "@promise-architect"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: research-{project}.md
    tipo: markdown
    origem: Task LP-001
    obrigatorio: true
  - campo: icp-{project}.md
    tipo: markdown
    origem: Task LP-001
    obrigatorio: true

Saida:
  - campo: promise-{project}.md
    tipo: markdown
    destino: File
    persistido: true

Checklist:
  - "[ ] Formula aplicada (tempo+acao+entrega)"
  - "[ ] 0 verbos proibidos"
  - "[ ] Imagem mental clara em cada variacao"
  - "[ ] 4 perguntas respondidas em cada variacao"
  - "[ ] 5 variacoes geradas"
---

# Task: Criar Promessa Central

**Task ID:** LP-002
**Version:** 1.0.0
**Command:** `*promise`
**Agent:** Promise Architect (Farol)
**Purpose:** Criar promessa central com formula aprovada

---

## Inputs

| Campo | Tipo | Origem | Obrigatorio |
|-------|------|--------|-------------|
| research-{project}.md | markdown | Task LP-001 | Sim |
| icp-{project}.md | markdown | Task LP-001 | Sim |

## Preconditions

- Pesquisa de mercado concluida (LP-001)
- ICP com dores priorizadas disponivel
- Dor principal identificada e validada

## Execution Phases

### Fase 1: Extrair dor principal do ICP

1. Ler icp-{project}.md completo
2. Identificar a dor #1 na hierarquia
3. Validar que e uma dor reconhecida (o publico sabe que tem)
4. Documentar a linguagem exata que o publico usa para descrever essa dor

### Fase 2: Aplicar formula (tempo + acao + entrega)

1. Definir o TEMPO (em quanto tempo o resultado acontece)
2. Definir a ACAO (o que a pessoa vai fazer - verbo de execucao)
3. Definir a ENTREGA (resultado tangivel e mensuravel)
4. Montar a promessa base seguindo a formula
5. Garantir que a promessa gera imagem mental concreta

### Fase 3: Gerar 5 variacoes

1. Variacao 1 - Foco no tempo (velocidade do resultado)
2. Variacao 2 - Foco na acao (simplicidade do processo)
3. Variacao 3 - Foco na entrega (tangibilidade do resultado)
4. Variacao 4 - Foco na dor (alívio imediato)
5. Variacao 5 - Foco na transformacao (antes vs depois)

### Fase 4: Teste de imagem mental

1. Para cada variacao, responder: "O publico consegue SE VER fazendo isso?"
2. Se a resposta for nao, reescrever ate gerar imagem mental concreta
3. Validar que cada variacao cria uma cena visual na mente do leitor
4. Documentar o teste de cada variacao

### Fase 5: Filtro de verbos proibidos

1. Verificar TODAS as variacoes contra a lista de verbos proibidos
2. Verbos BANIDOS: aprender, descobrir, faturar, desbloquear, conquistar, segredos
3. Substituir qualquer verbo proibido por verbo de execucao (implementar, montar, criar, aplicar, instalar, configurar)
4. Revalidar a imagem mental apos substituicao
5. Confirmar 0 verbos proibidos no output final

## Output Format

Arquivo `promise-{project}.md` contendo:

- Dor principal extraida do ICP
- Formula aplicada (tempo + acao + entrega)
- 5 variacoes com teste de imagem mental
- Resultado do filtro de verbos proibidos
- Variacao recomendada (com justificativa)

## Quality Checklist

- [ ] Formula (tempo + acao + entrega) aplicada corretamente
- [ ] 0 verbos proibidos em todas as variacoes (aprender, descobrir, faturar, desbloquear, conquistar, segredos)
- [ ] Imagem mental clara e concreta em cada variacao
- [ ] 4 perguntas respondidas em cada variacao (o que, quanto tempo, resultado, por que agora)
- [ ] 5 variacoes distintas geradas
- [ ] Variacao recomendada com justificativa
