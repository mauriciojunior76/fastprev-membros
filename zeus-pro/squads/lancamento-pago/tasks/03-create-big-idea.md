---
task: createBigIdea()
responsavel: "@big-idea-specialist"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: promise-{project}.md
    tipo: markdown
    origem: Task LP-002
    obrigatorio: true
  - campo: research-{project}.md
    tipo: markdown
    origem: Task LP-001
    obrigatorio: true

Saida:
  - campo: big-idea-{project}.md
    tipo: markdown
    destino: File
    persistido: true

Checklist:
  - "[ ] Big Idea memoravel e diferenciada"
  - "[ ] Mecanismo unico construido"
  - "[ ] 3 variacoes geradas"
  - "[ ] Conexao clara com a promessa"
  - "[ ] Ancora toda a copy da campanha"
---

# Task: Criar Big Idea Central

**Task ID:** LP-003
**Version:** 1.0.0
**Command:** `*big-idea`
**Agent:** Big Idea Specialist (Ideia)
**Purpose:** Criar Big Idea central da campanha

---

## Inputs

| Campo | Tipo | Origem | Obrigatorio |
|-------|------|--------|-------------|
| promise-{project}.md | markdown | Task LP-002 | Sim |
| research-{project}.md | markdown | Task LP-001 | Sim |

## Preconditions

- Promessa central aprovada (LP-002)
- Pesquisa de mercado completa (LP-001)
- ICP com dores e linguagem mapeados

## Execution Phases

### Fase 1: Analisar promessa e ICP

1. Ler promise-{project}.md e identificar a variacao escolhida
2. Ler research-{project}.md para contexto de mercado
3. Mapear o que os concorrentes ja dizem (para evitar repeticao)
4. Identificar a crenca limitante principal do ICP

### Fase 2: Identificar tipo de Big Idea

1. Avaliar qual tipo se encaixa melhor no contexto:
   - Revelacao: algo que o publico nao sabe e muda tudo
   - Contradicao: o oposto do que o mercado prega
   - Nova Era: um momento historico que exige acao
   - Inimigo Oculto: algo que sabota sem a pessoa perceber
   - Novo Caminho: uma abordagem completamente diferente
2. Justificar a escolha do tipo
3. Documentar por que os outros tipos nao se encaixam tao bem

### Fase 3: Construir mecanismo unico

1. Criar o mecanismo que explica POR QUE a promessa funciona
2. Dar nome proprio ao mecanismo (naming memoravel)
3. Explicar em 1 frase como o mecanismo opera
4. Garantir que o mecanismo e diferente de tudo que o mercado usa
5. Validar que o mecanismo sustenta a promessa de forma logica

### Fase 4: Gerar 3 variacoes

1. Variacao 1 - Big Idea com angulo racional (logica, dados, processo)
2. Variacao 2 - Big Idea com angulo emocional (historia, identidade, transformacao)
3. Variacao 3 - Big Idea com angulo provocativo (confronto, contradicao, ruptura)
4. Cada variacao com mecanismo adaptado ao angulo

### Fase 5: Testar ancoragem na campanha

1. Verificar se a Big Idea funciona no anuncio (3-5 segundos de atencao)
2. Verificar se funciona na pagina de captura (headline principal)
3. Verificar se funciona no evento (narrativa do pitch)
4. Verificar se funciona no pos-pitch (reforco da decisao)
5. Se nao funciona em algum ponto, ajustar ate ancorar toda a jornada

## Output Format

Arquivo `big-idea-{project}.md` contendo:

- Big Idea central escolhida
- Tipo identificado (com justificativa)
- Mecanismo unico (nome, descricao, logica)
- 3 variacoes (racional, emocional, provocativo)
- Teste de ancoragem em cada ponto de contato da campanha
- Variacao recomendada (com justificativa)

## Quality Checklist

- [ ] Big Idea memoravel e diferenciada do mercado
- [ ] Mecanismo unico com nome proprio e explicacao clara
- [ ] 3 variacoes com angulos distintos
- [ ] Conexao direta e logica com a promessa central
- [ ] Ancora toda a copy da campanha (anuncio ao pos-pitch)
- [ ] Nao repete nada que os concorrentes ja dizem
