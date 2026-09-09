---
task: buildPageBrief()
responsavel: "@page-builder-coordinator"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: copy-pagina
    tipo: string
    origem: "copy-pagina-{project}.md"
    obrigatorio: true
  - campo: ticket-strategy
    tipo: string
    origem: "ticket-strategy-{project}.md"
    obrigatorio: true

Saida:
  - campo: page-brief
    tipo: string
    destino: "page-brief-{project}.md"
    persistido: true

Checklist:
  - "[ ] Brief completo com copy e specs de design"
  - "[ ] Metricas target definidas (connect rate, conversao)"
  - "[ ] Handoff limpo para PAGE-FORGE"
  - "[ ] 12 secoes de copy compiladas"
  - "[ ] Output final validado"
---

# Task: Criar Brief para PAGE-FORGE

**Task ID:** LP-031
**Version:** 1.0.0
**Command:** `*page-brief`
**Agent:** Page Builder Coordinator (Link)
**Purpose:** Criar brief completo para PAGE-FORGE construir a pagina de captacao ou vendas

---

## Inputs

| Campo | Tipo | Origem | Obrigatorio |
|-------|------|--------|-------------|
| copy-pagina | string | copy-pagina-{project}.md | Sim |
| ticket-strategy | string | ticket-strategy-{project}.md | Sim |

## Preconditions

- Copy da pagina aprovado
- Estrategia de ticket definida
- Identidade visual disponivel

## Execution Phases

### Fase 1 - Compilar 12 secoes de copy
1. Headline principal e sub-headline
2. Promessa e big idea
3. Prova social e autoridade
4. Dores e frustracao do publico
5. Solucao e mecanismo unico
6. Estrutura do evento (o que vai acontecer)
7. Bonus e empilhamento de valor
8. Ancoragem de preco e oferta
9. Garantia e reversao de risco
10. CTA principal e secundario
11. FAQ e objecoes
12. Urgencia e escassez

### Fase 2 - Definir specs de design
- Paleta de cores do projeto
- Tipografia (heading, body, accent)
- Estilo visual (clean, bold, premium, etc.)
- Referencias visuais (se houver)
- Mobile-first obrigatorio
- Animacoes e interacoes desejadas

### Fase 3 - Metricas target
- Connect rate alvo (ex: 40%+ de opt-in)
- Conversao de pagina de vendas (ex: 3-5%)
- Tempo medio na pagina
- Scroll depth minimo
- Taxa de bounce aceitavel

### Fase 4 - Cross-squad brief para PAGE-FORGE
- Documento formatado para o squad PAGE-FORGE
- Todas as secoes de copy em ordem
- Specs de design com referencias
- Metricas target como criterio de aceite
- Assets necessarios (logo, fotos, icones)

### Fase 5 - Validar output final
- Revisar pagina construida pelo PAGE-FORGE
- Testar em mobile e desktop
- Verificar todos os CTAs e links
- Validar copy final vs brief
- Aprovar ou solicitar ajustes

## Output Format

Arquivo `page-brief-{project}.md` contendo:
- 12 secoes de copy compiladas e ordenadas
- Specs de design completas
- Metricas target com criterios de aceite
- Lista de assets necessarios
- Instrucoes de handoff para PAGE-FORGE

## Quality Checklist

- [ ] Brief completo com copy e specs de design
- [ ] Metricas target definidas (connect rate, conversao)
- [ ] Handoff limpo e claro para PAGE-FORGE
- [ ] 12 secoes de copy compiladas em ordem
- [ ] Output final validado apos construcao
- [ ] Mobile-first garantido nas specs
