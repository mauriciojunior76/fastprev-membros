---
task: marketResearch()
responsavel: "@researcher"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: nicho
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: produto-servico
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: publico-alvo-inicial
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: research-{project}.md
    tipo: markdown
    destino: File
    persistido: true
  - campo: icp-{project}.md
    tipo: markdown
    destino: File
    persistido: true

Checklist:
  - "[ ] ICP com dor reconhecida pelo publico"
  - "[ ] Gap de mercado mapeado"
  - "[ ] 3+ concorrentes analisados"
  - "[ ] Promessas dos concorrentes documentadas"
  - "[ ] Hierarquia de dores priorizada"
---

# Task: Pesquisa de Mercado

**Task ID:** LP-001
**Version:** 1.0.0
**Command:** `*research`
**Agent:** Researcher (Radar)
**Purpose:** Pesquisa de mercado, ICP, concorrencia e mapeamento de dores

---

## Inputs

| Campo | Tipo | Origem | Obrigatorio |
|-------|------|--------|-------------|
| nicho | string | User Input | Sim |
| produto-servico | string | User Input | Sim |
| publico-alvo-inicial | string | User Input | Sim |

## Preconditions

- Nicho definido pelo expert
- Produto ou servico principal identificado
- Publico-alvo inicial (mesmo que generico) informado

## Execution Phases

### Fase 1: Analise de mercado

1. Mapear o tamanho e maturidade do mercado no nicho informado
2. Identificar tendencias atuais e sazonalidades
3. Levantar os principais players e suas ofertas
4. Documentar faixa de preco praticada no mercado

### Fase 2: Mapeamento ICP

1. Definir perfil demografico (idade, genero, localizacao, renda)
2. Mapear perfil psicografico (valores, medos, desejos, frustrações)
3. Identificar comportamento de compra (onde busca, como decide, objecoes)
4. Documentar linguagem real do publico (como fala sobre o problema)
5. Criar persona principal com nome ficticio e narrativa

### Fase 3: Analise de concorrencia

1. Selecionar 3 a 5 concorrentes diretos
2. Analisar promessas centrais de cada um
3. Mapear pontos fortes e fracos de cada oferta
4. Documentar precos, formatos e canais de venda
5. Capturar copy principal (headlines, CTAs, argumentos)

### Fase 4: Hierarquia de dores

1. Listar todas as dores identificadas na pesquisa
2. Classificar por intensidade (aguda vs cronica)
3. Classificar por frequencia (diaria, semanal, esporadica)
4. Priorizar as 5 dores mais fortes e reconhecidas pelo publico
5. Validar se o produto/servico resolve diretamente cada dor

### Fase 5: Gap analysis

1. Comparar o que os concorrentes entregam vs o que o publico quer
2. Identificar lacunas nao atendidas pelo mercado
3. Mapear oportunidades de diferenciacao
4. Documentar o gap principal que o expert pode ocupar
5. Conectar o gap com a dor prioritaria do ICP

## Output Format

Dois arquivos markdown:

- `research-{project}.md` - Documento completo com analise de mercado, concorrencia, gaps e oportunidades
- `icp-{project}.md` - Perfil detalhado do ICP com dores priorizadas, linguagem real e comportamento de compra

## Quality Checklist

- [ ] ICP com dor reconhecida pelo publico (nao inventada)
- [ ] Gap de mercado mapeado com clareza
- [ ] 3+ concorrentes analisados com promessas documentadas
- [ ] Promessas dos concorrentes documentadas lado a lado
- [ ] Hierarquia de dores priorizada por intensidade e frequencia
- [ ] Linguagem real do publico capturada (nao jargao de marketing)
