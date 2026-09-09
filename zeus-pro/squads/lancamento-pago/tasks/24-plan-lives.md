---
task: planLives()
responsavel: "@live-post-pitch-specialist"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: commercial-plan
    tipo: string
    origem: "commercial-plan-{project}.md"
    obrigatorio: true
  - campo: bonus-plan
    tipo: string
    origem: "bonus-plan-{project}.md"
    obrigatorio: true

Saida:
  - campo: live-plan
    tipo: string
    destino: "live-plan-{project}.md"
    persistido: true

Checklist:
  - "[ ] Calendario de lives definido (datas e horarios)"
  - "[ ] Cada live traz motivo novo de compra"
  - "[ ] Scripts prontos por live"
  - "[ ] Coordenacao com bonus escalonados"
  - "[ ] Ponte live-conversao mapeada"
---

# Task: Planejar Lives Pos-Pitch

**Task ID:** LP-024
**Version:** 1.0.0
**Command:** `*lives`
**Agent:** Live Post-Pitch Specialist (Ao Vivo)
**Purpose:** Planejar lives pos-pitch que sustentam vendas e criam razoes novas de compra

---

## Inputs

| Campo | Tipo | Origem | Obrigatorio |
|-------|------|--------|-------------|
| commercial-plan | string | commercial-plan-{project}.md | Sim |
| bonus-plan | string | bonus-plan-{project}.md | Sim |

## Preconditions

- Plano comercial definido com janela de vendas
- Plano de bonus escalonados pronto
- Pitch principal ja desenhado

## Execution Phases

### Fase 1 - Calendario de lives
- Definir datas e horarios de cada live
- Alinhar com janela de vendas e bonus
- Distribuir ao longo do periodo de carrinho aberto

### Fase 2 - Tema por live
- Cada live traz uma razao NOVA de compra
- Nenhuma live repete argumento
- Temas conectados a objecoes, desejos e provas

### Fase 3 - Scripts por live
- Roteiro completo por live (abertura, conteudo, CTA)
- Gatilhos emocionais por sessao
- Transicoes naturais para oferta

### Fase 4 - Ponte live-conversao
- Como cada live direciona para a pagina de vendas
- CTAs especificos por live
- Urgencia e escassez progressivas

### Fase 5 - Coordenacao com bonus escalonados
- Sincronizar anuncios de bonus com lives
- Revelar bonus na live certa
- Cada live reforça o bonus do momento

## Output Format

Arquivo `live-plan-{project}.md` contendo:
- Calendario completo com datas e horarios
- Tema e objetivo de cada live
- Script completo por live
- CTAs e pontes de conversao
- Mapa de coordenacao com bonus

## Quality Checklist

- [ ] Calendario com datas e horarios definidos
- [ ] Cada live traz motivo novo de compra
- [ ] Scripts completos e prontos para uso
- [ ] Coordenacao com bonus escalonados documentada
- [ ] Pontes de conversao claras por live
- [ ] Nenhuma live repete argumento de outra
