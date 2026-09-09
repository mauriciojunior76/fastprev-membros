---
name: carousel-cover-copy
description: Use when criar ou ajustar a capa (slide 1) de um carrossel Instagram no padrão Exemplo. Ativar sempre que houver headline de capa, gancho viral, copy de abertura de carrossel para mentores.
---

# Carousel Cover Copy - Padrão Exemplo

## Regra Central

A capa do carrossel tem UMA estrutura aprovada. Nunca fragmentar em múltiplos elementos com tamanhos misturados fora do h1.

## Estrutura Obrigatória (sempre nessa ordem)

```
[LOGO/ÍCONE] - SVG conceitual no topo
[TAG] - rótulo pequeno uppercase rosegold
[H1] - headline única com gold inline
[LINE-DECO] - traço rosegold decorativo
[SUBTEXTO] - frase de apoio pequena e opaca
```

## A Fórmula do H1 Aprovado

TODO o headline fica dentro de um único `<h1 class="headline">`. O elemento de destaque (número, palavra-chave) entra como `<span class="gold">` inline, nunca em tag separada.

```html
<!-- PADRÃO APROVADO - capa do carrossel 4 níveis -->
<h1 class="headline" style="font-size:56px;margin-bottom:20px">
  Como cobrar<br><span class="gold" style="font-size:96px">R$ 15k</span><br>na sua mentoria que hoje custa menos de 3k
</h1>
```

Regra de tamanho:
- Texto normal do h1: 48px - 58px
- Elemento gold de destaque: 88px - 100px (sempre maior que o texto ao redor)
- Subtexto abaixo da linha: 24px - 26px, opacity 0.6

## Fórmulas de Gancho Viral para Mentores

Escolher UMA das 4 fórmulas. Nunca misturar.

### 1. NÚMERO DE DESEJO (melhor para conversão)
```
[verbo de ação]<br>
<span class="gold" style="font-size:96px">[número/resultado]</span><br>
[contexto de como/para quem]
```
Exemplo: "Como cobrar / R$15k / na sua mentoria que custa menos de 3k"
Exemplo: "A IA que te ajuda a faturar / R$50k / vendendo mentoria do jeito certo"

### 2. CLUBE DOS QUE SABEM (cria FOMO + curiosidade)
```
[quem já sabe/faz]<br>
<span class="gold" style="font-size:88px">[o que eles têm/fazem]</span><br>
[você ainda não descobriu]
```
Exemplo: "Mentores de R$50k / já instalaram / você ainda não tem?"

### 3. REVELAÇÃO DIRETA (forte em engajamento)
```
[o que é]<br>
<span class="gold" style="font-size:96px">[nome/ferramenta]</span><br>
[para que serve + público]
```

### 4. CONFRONTO (alta conversão em feed)
```
[comportamento atual errado]<br>
<span class="gold" style="font-size:88px">[o certo]</span><br>
[consequência]
```

## Subtexto Abaixo da Linha

Sempre uma frase que:
- Resolve a curiosidade gerada pelo h1
- Tem no máximo 12 palavras
- Não repete o h1, completa ele

Exemplos bons:
- "Sem ensinar nada diferente. Sem mudar de nicho. Entenda como."
- "O setup completo. Sem precisar saber programar."
- "5 ferramentas. Do jeito certo. Para mentores."

## TAG - Labels que Funcionam

Usar uma dessas ou variação:
- "Salve este post" (mais engajamento)
- "Para mentores que vendem conhecimento"
- "Guarda esse aqui"

## Erros Proibidos

| Erro | Por que é ruim |
|------|---------------|
| Quebrar headline em 3+ tags separadas | Lê fragmentado, perde impacto visual |
| Misturar font-size fora do h1 em parágrafos separados | Hierarquia confusa, parece descuidado |
| Colocar o número grande em parágrafo próprio | Perde contexto da frase, não faz sentido sozinho |
| Subtexto genérico ("Setup completo. Do jeito certo.") | Fraco demais, não completa o gancho |
| H1 sem o span.gold | Sem elemento de destaque, não é viral |
| Mais de 1 elemento gold no h1 | Dilui o impacto - só 1 destaque por capa |

## Checklist Antes de Entregar

- [ ] Estrutura na ordem: ícone > tag > h1 > line-deco > subtexto
- [ ] H1 tem texto normal + span.gold + (opcional) texto normal
- [ ] Gold é visivelmente maior que o texto ao redor (min 40% maior)
- [ ] Subtexto tem 12 palavras ou menos
- [ ] Faz sentido lendo o h1 em voz alta de uma vez
- [ ] Fórmula de gancho escolhida é uma das 4 (não misturada)
