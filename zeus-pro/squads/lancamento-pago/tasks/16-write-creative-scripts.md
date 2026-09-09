---
task: writeCreativeScripts()
responsavel: "@creative-script-writer"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: creative-plan
    tipo: markdown
    origem: creative-plan-{project}.md
    obrigatorio: true
  - campo: ad-copy
    tipo: markdown
    origem: ad-copy-{project}.md
    obrigatorio: true

Saida:
  - campo: creative-scripts-{project}.md
    tipo: markdown
    destino: File
    persistido: true

Checklist:
  - "[ ] 3+ roteiros por categoria"
  - "[ ] Hook em 3-5 segundos"
  - "[ ] Densidade correta por nivel C"
---

# Task: Roteiros de Video e Storyboards

**Task ID:** LP-016
**Version:** 1.0.0
**Command:** `*creative-scripts`
**Agent:** Creative Script Writer (Reel)
**Purpose:** Roteiros de video e storyboards para criativos C0 a C4

---

## Inputs

| Campo | Tipo | Origem | Obrigatorio |
|-------|------|--------|-------------|
| creative-plan | markdown | creative-plan-{project}.md | Sim |
| ad-copy | markdown | ad-copy-{project}.md | Sim |

## Preconditions

- Plano de criativos C0-C4 finalizado com briefings
- Copy de anuncios validado

## Execution Phases

### Fase 1: Roteiros C0 - Viral

1. Criar 3+ roteiros focados em alcance e compartilhamento
2. Hook nos primeiros 3 segundos (curiosidade ou choque leve)
3. Tom leve, educativo, sem mencao direta a oferta
4. Duracao: 15-30 segundos

### Fase 2: Roteiros C1 - Oportunidade

1. Criar 3+ roteiros focados em despertar interesse
2. Hook em 3-5 segundos com problema reconhecido
3. Apresentar oportunidade como descoberta
4. CTA suave (saiba mais, link na bio)
5. Duracao: 30-60 segundos

### Fase 3: Roteiros C2 - Objecao

1. Criar 3+ roteiros quebrando objecoes comuns
2. Hook com a propria objecao ("voce acha que X?")
3. Prova contraria com logica ou depoimento
4. CTA para pagina de inscricao
5. Duracao: 15-45 segundos

### Fase 4: Roteiros C3 - Prova

1. Criar 3+ roteiros com resultados e autoridade
2. Hook com numero ou resultado concreto
3. Bastidores, depoimento ou antes/depois
4. CTA com urgencia leve
5. Duracao: 30-60 segundos

### Fase 5: Roteiros C4 - Remarketing

1. Criar 3+ roteiros para quem ja visitou a pagina
2. Hook direto ("voce viu isso e nao se inscreveu")
3. Reforço de beneficio + urgencia real
4. CTA direto com escassez
5. Duracao: 10-20 segundos

### Fase 6: Storyboards estaticos

1. Criar storyboards para criativos de imagem (carrossel, estatico)
2. Definir layout visual por frame (titulo, imagem, CTA)
3. Indicar copy de cada frame
4. Marcar variacoes de cor e formato (feed vs stories)

## Output Format

Arquivo markdown unico:

- `creative-scripts-{project}.md` - Roteiros completos organizados por categoria C0-C4 com storyboards estaticos

## Quality Checklist

- [ ] 3+ roteiros por categoria (C0 a C4)
- [ ] Hook em 3-5 segundos em todo roteiro de video
- [ ] Densidade correta por nivel C (C0 leve, C4 direto)
- [ ] Duracao adequada por categoria
- [ ] Storyboards estaticos com copy por frame
- [ ] CTA progressivo (suave no C0, direto no C4)
