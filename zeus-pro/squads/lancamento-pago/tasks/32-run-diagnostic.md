---
task: runDiagnostic()
responsavel: "@diagnostics-specialist"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: metricas-atuais
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: diagnostic-report
    tipo: string
    destino: "diagnostic-report-{project}.md"
    persistido: true

Checklist:
  - "[ ] Estagio identificado corretamente"
  - "[ ] Causa raiz encontrada (nao sintoma)"
  - "[ ] Prescricao acionavel definida"
  - "[ ] Responsavel e prazo por correcao"
---

# Task: Diagnosticar Problemas por Etapa

**Task ID:** LP-032
**Version:** 1.0.0
**Command:** `*diagnose`
**Agent:** Diagnostics Specialist (Raio-X)
**Purpose:** Diagnosticar problemas do lancamento por etapa e prescrever correcoes acionaveis

---

## Inputs

| Campo | Tipo | Origem | Obrigatorio |
|-------|------|--------|-------------|
| metricas-atuais | string | User Input | Sim |

## Preconditions

- Lancamento em andamento ou encerrado
- Metricas disponiveis (mesmo que parciais)
- Dashboard de metricas alimentado (LP-025)

## Execution Phases

### Fase 1 - Coletar metricas
- Leads captados vs meta
- Presenca no evento vs inscritos
- Conversao pos-pitch
- Ticket medio realizado
- ROAS e CPA atuais
- Taxa de recuperacao (boleto/PIX)

### Fase 2 - Identificar estagio do problema
- Baixa venda: muita gente, pouca conversao
- Baixa presenca: muitos inscritos, poucos ao vivo
- Baixa conversao: presenca boa, pitch nao converte
- Queda pos-D1: primeiro dia bom, segundo dia fraco
- Baixa captacao: poucos inscritos desde o inicio
- Cada estagio tem causas e correcoes diferentes

### Fase 3 - Mapear causas provaveis
- Por estagio, listar as 3-5 causas mais provaveis
- Ranquear por probabilidade e impacto
- Cruzar com dados disponiveis
- Eliminar hipoteses com evidencia

### Fase 4 - Prescrever correcoes
- Correcao especifica por causa raiz
- Acao imediata (proximo dia)
- Acao de medio prazo (proxima semana)
- Recursos necessarios para cada correcao
- Resultado esperado por correcao

### Fase 5 - Definir responsavel e prazo
- Quem executa cada correcao
- Prazo maximo por acao
- Metrica de sucesso da correcao
- Ponto de verificacao (quando checar se funcionou)

## Output Format

Arquivo `diagnostic-report-{project}.md` contendo:
- Resumo das metricas coletadas
- Estagio do problema identificado
- Causas provaveis ranqueadas
- Prescricoes acionaveis com responsavel e prazo
- Metricas de sucesso por correcao

## Quality Checklist

- [ ] Estagio identificado corretamente com evidencia
- [ ] Causa raiz encontrada (nao sintoma)
- [ ] Prescricao acionavel e especifica
- [ ] Responsavel e prazo definidos por correcao
- [ ] Metricas de sucesso por correcao claras
- [ ] Hipoteses eliminadas com dados
