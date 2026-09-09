---
task: designRemarketing()
responsavel: "@remarketing-specialist"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: creative-plan
    tipo: markdown
    origem: creative-plan-{project}.md
    obrigatorio: true
  - campo: page-copy
    tipo: markdown
    origem: page-copy-{project}.md
    obrigatorio: true

Saida:
  - campo: remarketing-plan-{project}.md
    tipo: markdown
    destino: File
    persistido: true

Checklist:
  - "[ ] Single Shot com privilegio real"
  - "[ ] Lembretes com beneficio, nao contagem"
  - "[ ] Criativos de lembrete 3-5s"
  - "[ ] Segmentos de audiencia definidos"
---

# Task: Plano de Remarketing com Single Shot

**Task ID:** LP-017
**Version:** 1.0.0
**Command:** `*remarketing`
**Agent:** Remarketing Specialist (Echo)
**Purpose:** Plano de remarketing com Single Shot e lembretes inteligentes

---

## Inputs

| Campo | Tipo | Origem | Obrigatorio |
|-------|------|--------|-------------|
| creative-plan | markdown | creative-plan-{project}.md | Sim |
| page-copy | markdown | page-copy-{project}.md | Sim |

## Preconditions

- Plano de criativos finalizado com categoria C4 definida
- Copy da pagina de inscricao pronto

## Execution Phases

### Fase 1: Definir Single Shot

1. Criar script do Single Shot (oferta unica pos-inscricao)
2. Definir segmento alvo (quem se inscreveu mas nao confirmou)
3. Estabelecer frequencia de exibicao (1 vez por pessoa)
4. Criar privilegio real e exclusivo (nao desconto generico)
5. Definir janela de validade do Single Shot

### Fase 2: Lembretes inteligentes

1. Criar lembretes baseados em beneficio (nao em contagem regressiva)
2. Cada lembrete destaca um aspecto diferente do evento
3. Nunca repetir o mesmo argumento em lembretes consecutivos
4. Sequencia: beneficio > prova > bonus > urgencia real

### Fase 3: Criativos de lembrete

1. Criar criativos curtos (3-5 segundos) para cada lembrete
2. Produzir muitas variacoes para evitar fadiga de criativo
3. Formatos: video curto, imagem, carrossel de 2 slides
4. Tom: direto, util, sem parecer spam

### Fase 4: Remarketing no-shows

1. Definir estrategia para quem se inscreveu e nao compareceu
2. Criar mensagem especifica (nao generico "voce perdeu")
3. Oferecer replay ou segunda chance com prazo
4. Conectar com proxima acao disponivel

### Fase 5: Segmentacao de audiencias

1. Definir segmentos: visitou pagina, inscreveu, confirmou, compareceu, nao compareceu
2. Criar regras de exclusao (quem ja comprou sai do remarketing)
3. Definir tempo de permanencia em cada segmento
4. Mapear jornada de remarketing por segmento

## Output Format

Arquivo markdown unico:

- `remarketing-plan-{project}.md` - Plano completo com Single Shot, lembretes, criativos, no-shows e segmentacao

## Quality Checklist

- [ ] Single Shot com privilegio real e exclusivo
- [ ] Lembretes baseados em beneficio, nao contagem regressiva
- [ ] Criativos de lembrete curtos (3-5s) com muitas variacoes
- [ ] Segmentos de audiencia definidos com regras de exclusao
- [ ] Estrategia especifica para no-shows
- [ ] Nenhum lembrete parece spam ou pressao excessiva
