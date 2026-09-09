---
task: designPitch()
responsavel: "@pitch-organizer"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: offer-architecture
    tipo: markdown
    origem: offer-architecture-{project}.md
    obrigatorio: true
  - campo: big-idea
    tipo: markdown
    origem: big-idea-{project}.md
    obrigatorio: true
  - campo: event-structure
    tipo: markdown
    origem: event-structure-{project}.md
    obrigatorio: true

Saida:
  - campo: pitch-scripts-{project}.md
    tipo: markdown
    destino: File
    persistido: true

Checklist:
  - "[ ] 3 etapas com scripts completos"
  - "[ ] Timing correto por etapa"
  - "[ ] Transicoes suaves entre etapas"
  - "[ ] CTA claro e direto"
  - "[ ] Principio pitch nao trabalha sozinho aplicado"
---

# Task: Estruturar Pitch em 3 Etapas

**Task ID:** LP-012
**Version:** 1.0.0
**Command:** `*pitch`
**Agent:** Pitch Organizer (Pitch)
**Purpose:** Estruturar pitch em 3 etapas com scripts, timing e transicoes

---

## Inputs

| Campo | Tipo | Origem | Obrigatorio |
|-------|------|--------|-------------|
| offer-architecture | markdown | offer-architecture-{project}.md | Sim |
| big-idea | markdown | big-idea-{project}.md | Sim |
| event-structure | markdown | event-structure-{project}.md | Sim |

## Preconditions

- Arquitetura da oferta definida
- Big Idea validada
- Estrutura do evento mapeada com blocos e horarios

## Execution Phases

### Fase 1: Etapa 1 - Ancoragem (D1 10:30)

1. Apresentar o produto principal como solucao natural
2. Ancorar o valor real do que esta sendo entregue
3. Conectar com o problema central discutido no evento
4. Criar contexto emocional para a oferta
5. Redigir script completo da etapa com falas e timing

### Fase 2: Etapa 2 - Oferta (D2 11:30)

1. Detalhar beneficios concretos do produto
2. Apresentar bonus com justificativa real
3. Explicar condicoes especiais e suporte incluso
4. Detalhar opcoes de pagamento
5. Redigir script completo da etapa com falas e timing

### Fase 3: Etapa 3 - Tsunami/Abertura (D2 16:40)

1. Construir CTA principal com urgencia real
2. Aplicar escassez (vagas, prazo, bonus limitado)
3. Criar transicao comercial fluida para o time de closers
4. Redigir script completo da etapa com falas e timing

### Fase 4: Transicoes entre etapas

1. Criar ponte narrativa entre Etapa 1 e Etapa 2
2. Criar ponte narrativa entre Etapa 2 e Etapa 3
3. Garantir que cada transicao retoma o contexto anterior
4. Validar que nenhuma transicao quebra o ritmo do evento

### Fase 5: Ensaio e timing

1. Calcular duracao de cada etapa em minutos
2. Marcar pontos de pausa e interacao com a plateia
3. Definir momentos de prova social dentro do pitch
4. Ajustar densidade de informacao por etapa
5. Validar que o pitch completo cabe no tempo disponivel

## Output Format

Arquivo markdown unico:

- `pitch-scripts-{project}.md` - Scripts completos das 3 etapas com timing, transicoes e notas de palco

## Quality Checklist

- [ ] 3 etapas com scripts completos e prontos para uso
- [ ] Timing correto e realista por etapa
- [ ] Transicoes suaves sem quebra de ritmo
- [ ] CTA claro, direto e com urgencia real
- [ ] Principio "pitch nao trabalha sozinho" aplicado (seeding + conteudo preparam o terreno)
- [ ] Escassez e urgencia baseadas em fatos reais
- [ ] Linguagem natural, nao robotica
