---
task: writeAdCopy()
responsavel: "@ad-copy-specialist"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: headlines-{project}.md
    tipo: markdown
    origem: Task LP-006
    obrigatorio: true
  - campo: big-idea-{project}.md
    tipo: markdown
    origem: Task LP-003
    obrigatorio: true
  - campo: promise-{project}.md
    tipo: markdown
    origem: Task LP-002
    obrigatorio: true

Saida:
  - campo: ad-copy-{project}.md
    tipo: markdown
    destino: File
    persistido: true

Checklist:
  - "[ ] 3+ variacoes por categoria (C0-C4)"
  - "[ ] Hook em 3-5 segundos em todos os criativos"
  - "[ ] C4 inclui Single Shot"
  - "[ ] Linguagem de execucao em todos"
  - "[ ] 0 verbos proibidos"
---

# Task: Escrever Copy para Criativos

**Task ID:** LP-010
**Version:** 1.0.0
**Command:** `*ad-copy`
**Agent:** Ad Copy Specialist (Click)
**Purpose:** Escrever copy para criativos C0-C4

---

## Inputs

| Campo | Tipo | Origem | Obrigatorio |
|-------|------|--------|-------------|
| headlines-{project}.md | markdown | Task LP-006 | Sim |
| big-idea-{project}.md | markdown | Task LP-003 | Sim |
| promise-{project}.md | markdown | Task LP-002 | Sim |

## Preconditions

- Headlines aprovadas com ranking (LP-006)
- Big Idea e mecanismo definidos (LP-003)
- Promessa central aprovada (LP-002)
- ICP com linguagem real disponivel

## Execution Phases

### Fase 1: C0 - Viral (leve, compartilhavel)

1. Objetivo: alcance e engajamento, nao conversao direta
2. Tom leve, compartilhavel, identificavel
3. Formato: meme, insight rapido, provocacao suave
4. Hook nos primeiros 3 segundos (visual ou texto)
5. Gerar 3+ variacoes
6. CTA suave ou sem CTA (gera curiosidade)

### Fase 2: C1 - Oportunidade (dor + solucao)

1. Objetivo: atrair publico qualificado com consciencia do problema
2. Abrir com a DOR reconhecida pelo ICP
3. Apresentar a SOLUCAO (evento) como caminho
4. Conectar com a promessa central
5. Gerar 3+ variacoes com angulos diferentes
6. CTA direto para pagina de inscricao

### Fase 3: C2 - Quebra de objecao

1. Objetivo: converter quem tem interesse mas tem duvida
2. Identificar a objecao #1 do publico
3. Responder a objecao com argumento forte (dado, case, logica)
4. Reforcar o mecanismo unico
5. Gerar 3+ variacoes (cada uma ataca uma objecao diferente)
6. CTA com urgencia suave

### Fase 4: C3 - Prova social

1. Objetivo: converter usando validacao de terceiros
2. Depoimento real (texto, imagem ou descricao de video)
3. Resultado especifico e mensuravel do depoimento
4. Conexao entre o resultado do case e a promessa do evento
5. Gerar 3+ variacoes (diferentes perfis de case)
6. CTA direto

### Fase 5: C4 - Remarketing (urgencia + Single Shot)

1. Objetivo: fechar quem ja visitou a pagina ou interagiu
2. Urgencia real (lote, vagas, prazo)
3. Recapitulacao ultra-rapida da oferta (1-2 frases)
4. Incluir formato SINGLE SHOT: criativo unico que funciona sozinho
5. Single Shot = imagem impactante + headline + CTA, sem depender de contexto
6. Gerar 3+ variacoes
7. CTA forte e direto (ultimas vagas, ultimo dia, encerra hoje)

## Output Format

Arquivo `ad-copy-{project}.md` contendo:

- Criativos organizados por categoria (C0, C1, C2, C3, C4)
- Cada criativo com: headline, corpo, CTA, formato sugerido (imagem/video/carrossel)
- Notas de segmentacao por categoria
- Indicacao de publico-alvo por etapa do funil
- Single Shot destacado na secao C4

## Quality Checklist

- [ ] 3+ variacoes por categoria (C0 a C4 = minimo 15 criativos)
- [ ] Hook em 3-5 segundos em todos os criativos
- [ ] C4 inclui pelo menos 1 Single Shot completo
- [ ] Linguagem de execucao em todos (nao passiva)
- [ ] 0 verbos proibidos (aprender, descobrir, faturar, desbloquear, conquistar, segredos)
- [ ] Cada categoria com objetivo claro e CTA adequado
- [ ] Segmentacao de publico indicada por etapa
