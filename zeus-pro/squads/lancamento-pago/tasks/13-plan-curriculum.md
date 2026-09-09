---
task: planCurriculum()
responsavel: "@subject-organizer"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: big-idea
    tipo: markdown
    origem: big-idea-{project}.md
    obrigatorio: true
  - campo: promise
    tipo: markdown
    origem: promise-{project}.md
    obrigatorio: true
  - campo: narrative-arc
    tipo: markdown
    origem: narrative-arc-{project}.md
    obrigatorio: true

Saida:
  - campo: event-agenda-{project}.md
    tipo: markdown
    destino: File
    persistido: true
  - campo: event-content-{project}.md
    tipo: markdown
    destino: File
    persistido: true

Checklist:
  - "[ ] 9 blocos preenchidos"
  - "[ ] 80% conteudo pratico"
  - "[ ] Participante sai com algo concreto"
  - "[ ] Progressao logica validada"
---

# Task: Organizar Conteudo do Evento nos 9 Blocos

**Task ID:** LP-013
**Version:** 1.0.0
**Command:** `*curriculum`
**Agent:** Subject Organizer (Pauta) + Subject Expert (Prof)
**Purpose:** Organizar conteudo do evento nos 9 blocos com progressao logica

---

## Inputs

| Campo | Tipo | Origem | Obrigatorio |
|-------|------|--------|-------------|
| big-idea | markdown | big-idea-{project}.md | Sim |
| promise | markdown | promise-{project}.md | Sim |
| narrative-arc | markdown | narrative-arc-{project}.md | Sim |

## Preconditions

- Big Idea definida e validada
- Promessa central documentada
- Arco narrativo com progressao emocional mapeado

## Execution Phases

### Fase 1: Definir 9 blocos do evento

1. Bloco 1 - Abertura: boas-vindas, contexto, expectativa
2. Bloco 2 - Diagnostico: onde o participante esta hoje
3. Bloco 3 - Crenca: crenca limitante que trava o avanço
4. Bloco 4 - Mecanismo: como funciona a solucao (framework)
5. Bloco 5 - Demonstracao: prova ao vivo, mao na massa
6. Bloco 6 - Plano: passos concretos para aplicar
7. Bloco 7 - Transicao: ponte do conteudo para a oferta
8. Bloco 8 - Pitch: apresentacao da oferta
9. Bloco 9 - Q&A: perguntas, objecoes, depoimentos

### Fase 2: Alocar conteudo por bloco

1. Distribuir topicos da big-idea nos blocos adequados
2. Garantir que cada bloco tem objetivo claro e entregavel
3. Evitar repeticao de conteudo entre blocos
4. Balancear teoria vs pratica (meta: 80% pratico)

### Fase 3: Garantir mao na massa

1. Definir pelo menos 1 exercicio pratico por dia
2. Participante deve sair com algo tangivel (template, plano, ferramenta)
3. Exercicio deve ser possivel de fazer no local com recursos minimos
4. Resultado do exercicio deve conectar com a oferta

### Fase 4: Calibrar profundidade

1. Definir o que ensinar em detalhe (gera valor imediato)
2. Definir o que mostrar mas nao aprofundar (gera desejo)
3. Garantir que o conteudo entregue resolve 1 problema real
4. Garantir que o produto resolve os proximos problemas

### Fase 5: Validar progressao logica

1. Revisar sequencia dos 9 blocos como jornada unica
2. Verificar se cada bloco prepara o seguinte
3. Confirmar que o participante chega ao pitch preparado
4. Ajustar ordem se houver salto logico

## Output Format

Dois arquivos markdown:

- `event-agenda-{project}.md` - Agenda completa com 9 blocos, horarios e objetivos
- `event-content-{project}.md` - Conteudo detalhado por bloco com topicos, exercicios e materiais

## Quality Checklist

- [ ] 9 blocos preenchidos com objetivo claro cada
- [ ] 80% do conteudo e pratico (nao so teoria)
- [ ] Participante sai com algo concreto e utilizavel
- [ ] Progressao logica sem saltos entre blocos
- [ ] Equilibrio entre valor entregue e desejo gerado
- [ ] Exercicios praticos viaveis no local do evento
