---
task: buildOffer()
responsavel: "@offer-architect"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: promise
    tipo: markdown
    origem: promise-{project}.md
    obrigatorio: true
  - campo: research
    tipo: markdown
    origem: research-{project}.md
    obrigatorio: true
  - campo: icp
    tipo: markdown
    origem: icp-{project}.md
    obrigatorio: true

Saida:
  - campo: offer-architecture-{project}.md
    tipo: markdown
    destino: File
    persistido: true

Checklist:
  - "[ ] Produto e proximo passo natural do evento"
  - "[ ] Order bump com ancoragem"
  - "[ ] Regra de foco aplicada em cada camada"
---

# Task: Construir Arquitetura da Oferta

**Task ID:** LP-018
**Version:** 1.0.0
**Command:** `*offer`
**Agent:** Offer Architect (Oferta)
**Purpose:** Construir arquitetura completa da oferta com produto, bumps e regra de foco

---

## Inputs

| Campo | Tipo | Origem | Obrigatorio |
|-------|------|--------|-------------|
| promise | markdown | promise-{project}.md | Sim |
| research | markdown | research-{project}.md | Sim |
| icp | markdown | icp-{project}.md | Sim |

## Preconditions

- Promessa central validada
- Pesquisa de mercado com concorrencia e gaps documentados
- ICP com dores priorizadas

## Execution Phases

### Fase 1: Produto principal como proximo passo natural

1. Definir o produto principal como continuacao logica do evento
2. Garantir que quem participou do evento sente falta do produto
3. Descrever entregaveis concretos (nao promessas vagas)
4. Posicionar como acelerador do resultado prometido no evento
5. Definir preco e justificativa de valor

### Fase 2: Order bumps com ancoragem

1. Criar order bump que complementa o produto principal
2. Ancorar valor real do bump (quanto custaria separado)
3. Posicionar como "ja que voce esta aqui" - conveniencia
4. Definir preco do bump (10-30% do produto principal)
5. Garantir que o bump nao distrai do produto principal

### Fase 3: Upsell

1. Definir upsell como versao premium ou acelerada
2. Apresentar apos a compra principal (nao antes)
3. Criar oferta de upsell com beneficio claro e mensuravel
4. Definir preco e forma de pagamento
5. Avaliar impacto no foco do comprador

### Fase 4: Downsell

1. Criar alternativa para quem recusa o upsell
2. Oferecer versao simplificada ou parcelamento estendido
3. Manter o valor percebido mesmo na versao reduzida
4. Definir preco e condicoes

### Fase 5: Cashback

1. Definir se cashback se aplica ao lancamento
2. Criar mecanica de cashback que incentiva acao rapida
3. Definir condicoes claras de elegibilidade
4. Garantir que o cashback nao canibaliza margem

### Fase 6: Regra de foco

1. Avaliar cada camada da oferta pelo efeito no foco do comprador
2. Remover qualquer camada que confunde ou distrai
3. Garantir que a jornada de compra e linear e simples
4. Validar: o comprador sabe exatamente o que esta comprando em cada etapa

## Output Format

Arquivo markdown unico:

- `offer-architecture-{project}.md` - Arquitetura completa com produto, bumps, upsell, downsell, cashback e regra de foco

## Quality Checklist

- [ ] Produto principal e o proximo passo natural do evento
- [ ] Order bump com ancoragem de valor clara
- [ ] Regra de foco aplicada em cada camada (nenhuma distrai)
- [ ] Upsell e downsell com logica de progressao
- [ ] Precos e condicoes definidos para cada camada
- [ ] Jornada de compra linear e sem confusao
