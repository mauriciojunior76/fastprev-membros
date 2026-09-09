---
task: designSeeding()
responsavel: "@seeding-specialist"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: narrative-arc
    tipo: markdown
    origem: narrative-arc-{project}.md
    obrigatorio: true
  - campo: pitch-scripts
    tipo: markdown
    origem: pitch-scripts-{project}.md
    obrigatorio: true
  - campo: event-agenda
    tipo: markdown
    origem: event-agenda-{project}.md
    obrigatorio: true

Saida:
  - campo: seeding-map-{project}.md
    tipo: markdown
    destino: File
    persistido: true

Checklist:
  - "[ ] Seeds posicionados naturalmente"
  - "[ ] Frases-mae prontas"
  - "[ ] Nenhum seed parece venda disfarçada"
  - "[ ] Ponte sutil para oferta estabelecida"
---

# Task: Mapear Momentos de Seeding no Evento

**Task ID:** LP-014
**Version:** 1.0.0
**Command:** `*seeding`
**Agent:** Seeding Specialist (Semente)
**Purpose:** Mapear momentos de seeding no evento para preparar terreno da oferta

---

## Inputs

| Campo | Tipo | Origem | Obrigatorio |
|-------|------|--------|-------------|
| narrative-arc | markdown | narrative-arc-{project}.md | Sim |
| pitch-scripts | markdown | pitch-scripts-{project}.md | Sim |
| event-agenda | markdown | event-agenda-{project}.md | Sim |

## Preconditions

- Arco narrativo completo com momentos emocionais mapeados
- Scripts do pitch finalizados
- Agenda do evento com 9 blocos definidos

## Execution Phases

### Fase 1: Identificar momentos naturais de seeding

1. Analisar cada bloco do evento buscando aberturas organicas
2. Marcar momentos onde o conteudo naturalmente aponta para "algo maior"
3. Identificar historias pessoais que conectam com a oferta
4. Mapear perguntas retoricas que plantam sementes

### Fase 2: Criar frases-mae

1. Redigir frases-semente para cada momento identificado
2. Garantir que cada frase faz sentido isoladamente (nao depende do pitch)
3. Usar linguagem do ICP, nao jargao de vendas
4. Criar variacoes para o expert escolher a mais natural

### Fase 3: Posicionar nos blocos corretos

1. Distribuir seeds ao longo dos 9 blocos (nao concentrar no final)
2. Garantir pelo menos 1 seed por bloco dos blocos 1-6
3. Aumentar frequencia nos blocos 5-7 (pre-pitch)
4. Marcar posicao exata (inicio, meio ou fim do bloco)

### Fase 4: Validar naturalidade

1. Ler cada seed no contexto do bloco onde esta inserido
2. Verificar se parece continuacao natural do conteudo
3. Remover qualquer seed que soa como "venda disfarçada"
4. Testar: se remover o seed, o conteudo perde algo? Se nao, reescrever

### Fase 5: Conectar seeds com pitch

1. Mapear qual seed prepara qual elemento do pitch
2. Garantir que os 3 pilares do pitch (ancoragem, oferta, abertura) tem seeds
3. Criar fio condutor entre os seeds (progressao sutil)
4. Validar que a transicao para o pitch e consequencia natural dos seeds

## Output Format

Arquivo markdown unico:

- `seeding-map-{project}.md` - Mapa completo de seeds com posicao, frase-mae, bloco, timing e conexao com o pitch

## Quality Checklist

- [ ] Seeds posicionados naturalmente nos blocos corretos
- [ ] Frases-mae prontas e com variacoes
- [ ] Nenhum seed parece venda disfarçada ou forçado
- [ ] Ponte sutil para oferta estabelecida com progressao
- [ ] Pelo menos 1 seed por bloco nos blocos 1-6
- [ ] Cada seed faz sentido isoladamente no contexto do conteudo
