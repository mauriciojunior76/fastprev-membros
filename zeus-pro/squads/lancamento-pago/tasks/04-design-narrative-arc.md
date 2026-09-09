---
task: designNarrativeArc()
responsavel: "@narrative-analyst"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: big-idea-{project}.md
    tipo: markdown
    origem: Task LP-003
    obrigatorio: true
  - campo: promise-{project}.md
    tipo: markdown
    origem: Task LP-002
    obrigatorio: true

Saida:
  - campo: narrative-arc-{project}.md
    tipo: markdown
    destino: File
    persistido: true

Checklist:
  - "[ ] Arco coerente do anuncio ao pos-pitch"
  - "[ ] Seeding points mapeados"
  - "[ ] Crencas quebradas progressivamente"
  - "[ ] Curva de tensao desenhada"
  - "[ ] Coerencia narrativa validada ponto a ponto"
---

# Task: Desenhar Arco Narrativo

**Task ID:** LP-004
**Version:** 1.0.0
**Command:** `*narrative`
**Agent:** Narrative Analyst (Arco)
**Purpose:** Desenhar arco narrativo do anuncio ate pos-pitch

---

## Inputs

| Campo | Tipo | Origem | Obrigatorio |
|-------|------|--------|-------------|
| big-idea-{project}.md | markdown | Task LP-003 | Sim |
| promise-{project}.md | markdown | Task LP-002 | Sim |

## Preconditions

- Big Idea central definida (LP-003)
- Promessa central aprovada (LP-002)
- Mecanismo unico construido

## Execution Phases

### Fase 1: Mapear pontos de contato

1. Listar todos os pontos de contato da jornada:
   - Anuncio (primeiro contato)
   - Pagina de ingresso (decisao de compra do ingresso)
   - Grupo de WhatsApp (warmup pre-evento)
   - Evento Dia 1 (conteudo + primeiro pitch)
   - Evento Dia 2 (conteudo + pitch principal)
   - Pos-pitch / Comercial (fechamento)
2. Definir o objetivo narrativo de cada ponto
3. Identificar qual emocao predomina em cada ponto

### Fase 2: Definir progressao de crencas

1. Mapear as crencas limitantes do ICP (o que ele acredita ANTES)
2. Mapear as crencas necessarias (o que ele precisa acreditar DEPOIS)
3. Criar a sequencia de quebra de crencas ponto a ponto
4. Garantir que cada ponto de contato quebra 1-2 crencas
5. Validar que ao chegar no pitch, todas as crencas limitantes ja cairam

### Fase 3: Mapear seeding points

1. Identificar onde plantar sementes da oferta sem vender explicitamente
2. Definir seeding de autoridade (provas, resultados, historia)
3. Definir seeding de urgencia (janela, escassez, momento)
4. Definir seeding de mecanismo (como funciona, por que e diferente)
5. Distribuir seeding points ao longo de toda a jornada

### Fase 4: Desenhar curva de tensao

1. Definir nivel de tensao em cada ponto (escala 1-10)
2. Garantir que a curva e crescente (nunca estabiliza por tempo demais)
3. Identificar os picos de tensao (momentos de revelacao, confronto, decisao)
4. Posicionar o pico maximo imediatamente antes do pitch principal
5. Planejar a resolucao pos-pitch (tensao cai com a decisao de compra)

### Fase 5: Validar coerencia narrativa

1. Percorrer toda a jornada do inicio ao fim como se fosse o ICP
2. Verificar se cada transicao entre pontos faz sentido
3. Verificar se nao ha contradicoes entre pontos
4. Verificar se a Big Idea esta presente em todos os pontos
5. Ajustar qualquer inconsistencia encontrada

## Output Format

Arquivo `narrative-arc-{project}.md` contendo:

- Mapa completo de pontos de contato com objetivo de cada um
- Progressao de crencas (antes vs depois por ponto)
- Seeding points distribuidos na jornada
- Curva de tensao com niveis 1-10 por ponto
- Validacao de coerencia narrativa

## Quality Checklist

- [ ] Arco coerente do anuncio ao pos-pitch sem contradicoes
- [ ] Seeding points mapeados e distribuidos estrategicamente
- [ ] Crencas limitantes quebradas progressivamente (todas antes do pitch)
- [ ] Curva de tensao crescente com pico antes do pitch principal
- [ ] Coerencia narrativa validada ponto a ponto
