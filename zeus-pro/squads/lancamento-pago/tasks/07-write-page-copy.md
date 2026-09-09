---
task: writePageCopy()
responsavel: "@page-copy-specialist"
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
  - campo: icp-{project}.md
    tipo: markdown
    origem: Task LP-001
    obrigatorio: true
  - campo: curriculo-evento
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: cases-depoimentos
    tipo: string
    origem: User Input
    obrigatorio: false

Saida:
  - campo: copy-pagina-{project}.md
    tipo: markdown
    destino: File
    persistido: true

Checklist:
  - "[ ] 12 secoes completas na ordem correta"
  - "[ ] CTAs em pontos estrategicos"
  - "[ ] Linguagem de execucao em todo o texto"
  - "[ ] 0 verbos proibidos"
  - "[ ] Copy conectado com Big Idea e promessa"
---

# Task: Escrever Copy da Pagina

**Task ID:** LP-007
**Version:** 1.0.0
**Command:** `*page-copy`
**Agent:** Page Copy Specialist (Dobra)
**Purpose:** Escrever copy completo das 12 secoes da pagina

---

## Inputs

| Campo | Tipo | Origem | Obrigatorio |
|-------|------|--------|-------------|
| headlines-{project}.md | markdown | Task LP-006 | Sim |
| big-idea-{project}.md | markdown | Task LP-003 | Sim |
| promise-{project}.md | markdown | Task LP-002 | Sim |
| icp-{project}.md | markdown | Task LP-001 | Sim |
| curriculo-evento | string | User Input | Sim |
| cases-depoimentos | string | User Input | Nao |

## Preconditions

- Headlines aprovadas (LP-006)
- Big Idea e mecanismo definidos (LP-003)
- Promessa central aprovada (LP-002)
- Curriculo do evento fornecido pelo expert
- Cases e depoimentos disponiveis (quando houver)

## Execution Phases

### Fase 1: Secao Promessa (H1 + Subheadline)

1. Usar a headline top 1 como H1 principal
2. Escrever subheadline que complementa e expande
3. Incluir CTA primario (inscricao/ingresso)
4. Garantir que em 5 segundos o visitante entende o que e, para quem e e o que ganha

### Fase 2: Secao Caminho

1. Descrever o caminho que o participante vai percorrer
2. 3 a 5 passos simples e claros
3. Cada passo com resultado intermediario tangivel
4. Conectar com o mecanismo unico da Big Idea

### Fase 3: Secao Identificacao

1. Bloco "Isso e para voce se..." com 5-7 criterios
2. Usar linguagem real do ICP (nao jargao de marketing)
3. Cada criterio toca uma dor ou desejo reconhecido
4. Finalizar com CTA secundario

### Fase 4: Secao Conteudo do Evento

1. Listar o que sera ensinado/apresentado em cada dia
2. Usar o curriculo fornecido pelo expert
3. Destacar os modulos mais atrativos
4. Conectar cada modulo com um resultado pratico

### Fase 5: Secao Cronograma

1. Estruturar agenda visual dos 2 dias
2. Horarios, blocos e temas principais
3. Destacar momentos-chave (abertura, conteudo premium, networking)
4. Formato claro e escaneavel

### Fase 6: Secao Cases Imagem

1. Apresentar 3-6 cases de resultado com foto
2. Nome, contexto, resultado obtido
3. Formato antes vs depois quando possivel
4. Conectar cada case com a promessa central

### Fase 7: Secao Preco + Lotes

1. Apresentar valor do ingresso com ancoragem
2. Estrutura de lotes (se aplicavel)
3. Destacar o que esta incluso
4. CTA forte com urgencia de lote

### Fase 8: Secao Cases Video

1. Depoimentos em video (embeds)
2. Breve descricao do resultado de cada pessoa
3. Variedade de perfis (diferentes nichos, experiencias)

### Fase 9: Secao Sobre o Expert

1. Bio do expert focada em autoridade e resultados
2. Numeros relevantes (alunos, faturamento, tempo de mercado)
3. Historia de origem conectada com a dor do ICP
4. Foto profissional

### Fase 10: Secao Garantia

1. Tipo de garantia oferecida (incondicional, condicional, hibrida)
2. Prazo da garantia
3. Texto que remove risco da decisao
4. Linguagem direta e confiante

### Fase 11: Secao Certificado

1. Descricao do certificado (se aplicavel)
2. Valor percebido do certificado
3. Formato e entrega

### Fase 12: Secao FAQ + CTAs

1. 8-12 perguntas frequentes reais
2. Respostas curtas e diretas que quebram objecoes
3. CTA final forte apos o FAQ
4. Dados de contato para duvidas restantes

## Output Format

Arquivo `copy-pagina-{project}.md` contendo:

- 12 secoes completas na ordem definida
- Copy pronto para implementacao (H1, H2, paragrafos, bullets, CTAs)
- Notas para o designer sobre layout quando relevante
- Indicacao de onde entram fotos, videos e depoimentos

## Quality Checklist

- [ ] 12 secoes completas na ordem correta
- [ ] CTAs posicionados em pontos estrategicos (minimo 4 ao longo da pagina)
- [ ] Linguagem de execucao em todo o texto (nao passiva)
- [ ] 0 verbos proibidos (aprender, descobrir, faturar, desbloquear, conquistar, segredos)
- [ ] Copy conectado com Big Idea e promessa em todas as secoes
- [ ] Identificacao toca dores reais do ICP
- [ ] FAQ responde objecoes reais
