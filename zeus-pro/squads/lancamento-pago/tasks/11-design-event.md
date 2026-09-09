---
task: designEvent()
responsavel: "@event-architect"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: event-agenda-{project}.md
    tipo: markdown
    origem: User Input
    obrigatorio: true
  - campo: event-content-{project}.md
    tipo: markdown
    origem: User Input
    obrigatorio: true
  - campo: pitch-scripts-{project}.md
    tipo: markdown
    origem: User Input
    obrigatorio: true

Saida:
  - campo: event-structure-{project}.md
    tipo: markdown
    destino: File
    persistido: true

Checklist:
  - "[ ] 2 dias completos 9h-18h estruturados"
  - "[ ] Regra 80/20 confirmada (80% conteudo, 20% pitch)"
  - "[ ] 3 pitches nos horarios corretos (D1 10:30, D2 11:30, D2 16:40)"
  - "[ ] Conteudo retorna apos pitch final"
  - "[ ] Curva de energia crescente desenhada"
---

# Task: Estruturar Evento de 2 Dias

**Task ID:** LP-011
**Version:** 1.0.0
**Command:** `*event`
**Agent:** Event Architect (Stage)
**Purpose:** Estruturar evento de 2 dias com rundown minuto a minuto

---

## Inputs

| Campo | Tipo | Origem | Obrigatorio |
|-------|------|--------|-------------|
| event-agenda-{project}.md | markdown | User Input | Sim |
| event-content-{project}.md | markdown | User Input | Sim |
| pitch-scripts-{project}.md | markdown | User Input | Sim |

## Preconditions

- Conteudo do evento definido pelo expert
- Scripts de pitch prontos ou em rascunho
- Agenda base com temas por bloco
- Big Idea e promessa central disponiveis para alinhar narrativa

## Execution Phases

### Fase 1: Definir 9 blocos

1. Estruturar os 9 blocos obrigatorios do evento:
   - D1 Bloco 1: Abertura + contexto + quebra de gelo (9h-10h)
   - D1 Bloco 2: Conteudo principal #1 (10h-10:30)
   - D1 Bloco 3: Pitch leve #1 (10:30) + Conteudo #2 (10:45-12h)
   - D1 Bloco 4: Almoco (12h-14h)
   - D1 Bloco 5: Conteudo #3 + Workshop pratico (14h-18h)
   - D2 Bloco 6: Abertura D2 + Recapitulacao (9h-11h)
   - D2 Bloco 7: Conteudo #4 + Pitch #2 (11h-11:30) + Conteudo #5 (11:45-12h)
   - D2 Bloco 8: Almoco (12h-14h)
   - D2 Bloco 9: Conteudo #6 + Pitch principal (16:40) + Conteudo final (17h-18h)
2. Cada bloco com duracao, objetivo e responsavel

### Fase 2: Alocar 80/20

1. Calcular tempo total disponivel (2 dias x 8h uteis = 16h)
2. 80% conteudo puro = 12h48min
3. 20% pitch + oferta = 3h12min
4. Distribuir proporcionalmente ao longo dos 2 dias
5. Validar que cada bloco respeita a proporcao
6. Garantir que os pitches NUNCA parecem desproporcionais

### Fase 3: Posicionar pitches

1. Pitch leve #1: D1 as 10:30 (apos primeiro bloco de conteudo forte)
   - Tom: convite suave, plantar semente
   - Duracao: 10-15 minutos
2. Pitch #2: D2 as 11:30 (apos recapitulacao e conteudo matinal)
   - Tom: aprofundar a oferta, detalhar modulos
   - Duracao: 20-30 minutos
3. Pitch principal #3: D2 as 16:40 (momento de energia maxima)
   - Tom: oferta completa, urgencia, decisao
   - Duracao: 40-60 minutos
4. Validar que cada pitch tem conteudo ANTES e DEPOIS

### Fase 4: Desenhar curva de energia

1. Mapear nivel de energia esperado em cada bloco (escala 1-10)
2. D1 abertura: 7 (animacao, expectativa)
3. D1 conteudo: 8 (entrega real, micro-wins)
4. D1 workshop: 9 (mao na massa, resultado pratico)
5. D2 abertura: 7 (retomada, energia renovada)
6. D2 conteudo: 8-9 (conteudo premium, profundidade)
7. D2 pitch principal: 10 (pico de energia, decisao)
8. D2 conteudo final: 8 (resolucao, celebracao)
9. Nunca permitir que a energia caia abaixo de 6 por mais de 30min

### Fase 5: Validar regra de ouro

1. REGRA DE OURO: conteudo RETORNA apos o pitch final
2. Apos o pitch principal (16:40), o evento NAO termina
3. Bloco de conteudo final (17h-18h) entrega valor real
4. Esse bloco reforca a decisao de quem comprou
5. E gera arrependimento positivo em quem nao comprou (quer mais)
6. Validar que o ultimo bloco e conteudo genuino, nao pitch disfarçado

## Output Format

Arquivo `event-structure-{project}.md` contendo:

- Rundown minuto a minuto dos 2 dias
- 9 blocos detalhados com: horario, tema, objetivo, responsavel, duracao
- Posicao dos 3 pitches com tom e duracao de cada um
- Curva de energia mapeada (grafico ou tabela)
- Validacao 80/20 com numeros
- Regra de ouro confirmada (conteudo apos pitch final)
- Notas logisticas (intervalos, coffee break, setup tecnico)

## Quality Checklist

- [ ] 2 dias completos 9h-18h estruturados bloco a bloco
- [ ] Regra 80/20 confirmada com calculo (80% conteudo, 20% pitch)
- [ ] 3 pitches nos horarios corretos (D1 10:30, D2 11:30, D2 16:40)
- [ ] Conteudo genuino retorna apos pitch final (regra de ouro)
- [ ] Curva de energia crescente com pico no pitch principal
- [ ] Cada bloco com objetivo claro e responsavel definido
- [ ] Intervalos e logistica planejados
