---
task: planCommercial()
responsavel: "@commercial-strategist"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: pitch-scripts
    tipo: markdown
    origem: pitch-scripts-{project}.md
    obrigatorio: true
  - campo: offer-architecture
    tipo: markdown
    origem: offer-architecture-{project}.md
    obrigatorio: true
  - campo: bonus-plan
    tipo: markdown
    origem: bonus-plan-{project}.md
    obrigatorio: true

Saida:
  - campo: commercial-plan-{project}.md
    tipo: markdown
    destino: File
    persistido: true

Checklist:
  - "[ ] 11 toques unicos, cada um com razao nova"
  - "[ ] Ritmo diario definido"
  - "[ ] Closer briefado com guidelines"
---

# Task: Plano Comercial com 11 Toques

**Task ID:** LP-021
**Version:** 1.0.0
**Command:** `*commercial`
**Agent:** Commercial Strategist (Closer)
**Purpose:** Plano comercial com 11 toques unicos e calendario diario

---

## Inputs

| Campo | Tipo | Origem | Obrigatorio |
|-------|------|--------|-------------|
| pitch-scripts | markdown | pitch-scripts-{project}.md | Sim |
| offer-architecture | markdown | offer-architecture-{project}.md | Sim |
| bonus-plan | markdown | bonus-plan-{project}.md | Sim |

## Preconditions

- Scripts do pitch finalizados
- Arquitetura da oferta completa
- Plano de bonus com escalonamento definido

## Execution Phases

### Fase 1: Definir 11 toques

1. Cada toque tem uma razao nova para o contato (nao repetir argumento)
2. Toque 1: abertura de carrinho - oportunidade
3. Toque 2: prova social - resultado de aluno
4. Toque 3: bonus exclusivo - escassez real
5. Toque 4: quebra de objecao principal
6. Toque 5: bastidores - humanizacao
7. Toque 6: depoimento em video
8. Toque 7: lote virando - urgencia de preco
9. Toque 8: FAQ - duvidas mais frequentes
10. Toque 9: comparativo - custo de nao agir
11. Toque 10: penultimo dia - escassez de vagas
12. Toque 11: ultimo dia - fechamento com urgencia maxima

### Fase 2: Scripts por toque

1. Redigir script completo para cada toque
2. Definir canal principal por toque (email, WhatsApp, ligacao, anuncio)
3. Incluir variacao de tom progressiva (inicio amigavel, fim direto)
4. Cada script com abertura, desenvolvimento e CTA

### Fase 3: Calendario comercial diario

1. Distribuir os 11 toques no periodo de vendas
2. Definir horario ideal por toque (manha, tarde, noite)
3. Garantir que nao ha 2 toques no mesmo horario
4. Planejar dias de descanso (nao saturar o lead)

### Fase 4: Guidelines closer

1. Definir postura do closer (consultor, nao vendedor)
2. Criar respostas para as 10 objecoes mais comuns
3. Definir limite de desconto/condicao que o closer pode oferecer
4. Protocolo de escalonamento (quando passar para o expert)

### Fase 5: Metricas comerciais

1. Definir taxa de conversao target por toque
2. Estabelecer meta de vendas diaria
3. Criar dashboard simples de acompanhamento
4. Definir gatilhos de alerta (se conversao cair abaixo de X)

## Output Format

Arquivo markdown unico:

- `commercial-plan-{project}.md` - Plano completo com 11 toques, scripts, calendario, guidelines e metricas

## Quality Checklist

- [ ] 11 toques unicos - cada um com razao nova para o contato
- [ ] Ritmo diario definido sem saturar o lead
- [ ] Closer briefado com guidelines e respostas para objecoes
- [ ] Scripts completos por toque com canal definido
- [ ] Metricas comerciais com targets e alertas
- [ ] Progressao de tom: amigavel no inicio, direto no final
