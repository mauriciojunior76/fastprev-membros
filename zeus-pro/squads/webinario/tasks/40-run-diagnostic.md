# Task 40 - Executar Diagnostico de Performance

> Agente responsavel: Raio-X (diagnostics-specialist)
> Fase: Diagnostico e Revisao
> Bloqueante: NAO
> Nota: executar sob demanda (*diagnose) ou quando metricas ficarem abaixo do benchmark

## Inputs
- Metricas atuais do dashboard (task 34)
- Benchmarks definidos por modelo

## Protocolo de Execucao

### STEP 1 - Identificar etapa com maior gap
Comparar cada metrica real com seu benchmark. Identificar qual etapa do funil tem a maior distancia entre o resultado real e o esperado. Essa e a etapa prioritaria - o gargalo do funil.

### STEP 2 - Diagnosticar em 4 niveis
Para a etapa com maior gap, fazer diagnostico em profundidade:
- Sintoma: o que os numeros mostram (ex: "taxa de comparecimento em 22%, benchmark e 40%")
- Causa imediata: o que esta causando o sintoma na superficie (ex: "lembretes nao estao sendo abertos")
- Causa raiz: o que esta por tras da causa imediata (ex: "assunto do email generico, sem urgencia")
- Correcao: acao especifica para resolver a causa raiz (ex: "reescrever assunto com nome do expert + horario especifico")

### STEP 3 - Priorizar correcao por impacto economico
Calcular o impacto financeiro de corrigir cada gargalo. Se o comparecimento subir de 22% para 40% com 1000 inscritos, sao 180 pessoas a mais assistindo, o que gera X vendas adicionais a Y reais. Priorizar a correcao com maior retorno por esforco.

### STEP 4 - Documentar diagnostico
Registrar o diagnostico completo com: data, metricas atuais, benchmark, gap, causa raiz, correcao proposta, impacto estimado, responsavel pela execucao.

## Outputs
- `diagnostic-{project}.md` - Diagnostico completo com gaps, causas raiz e correcoes priorizadas

## Checklist de Validacao
- [ ] Etapa com maior gap identificada
- [ ] Diagnostico em 4 niveis (sintoma, causa imediata, causa raiz, correcao)
- [ ] Impacto economico calculado por correcao
- [ ] Priorizacao por retorno/esforco
- [ ] Diagnostico documentado com data e responsavel
- [ ] Acentuacao perfeita em todo texto portugues
