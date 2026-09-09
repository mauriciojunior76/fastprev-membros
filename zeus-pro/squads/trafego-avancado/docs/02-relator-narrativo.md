# Relator Narrativo de Tráfego

Transforma número de campanha em história curta. Em vez de despejar tabela de métrica,
peça ao Claude Code pra puxar os dados (via MCP Meta) e escrever uma narrativa de 3 a 4
parágrafos pronta pra mandar no WhatsApp do cliente ou sócio.

## O que é (e o que não é)

É uma narrativa curta de gestor de tráfego falando com gente. Direta, sem corporativês.
Não é tabela seca, não é dashboard, e o teto são 4 parágrafos.

## Estrutura (nesta ordem, sempre)

**1. Panorama**: quanto investiu, quantos resultados, o número que mais importa pro seu
cliente (CPL, ROAS, vendas). Abre situando: "essa semana a conta gastou X e trouxe Y."

**2. O que mudou e por quê**: o coração do relatório. O que mexeu versus o período
anterior e a causa provável (criativo cansou, público escalou, oferta mudou).

**3. Ponto de atenção**: o risco ou gargalo mais importante. Um ponto só, o que dói mais.
Se está ruim, dizer que está ruim.

**4. Próximo passo**: ação concreta, verbo no começo. "Vou pausar o conjunto X",
"Recomendo subir o orçamento do Y em 20%".

Se o período foi calmo, os parágrafos 3 e 4 podem se fundir e o relatório fica com 3.
Nunca forçar 4 só pra preencher.

## Limiares que disparam o ponto de atenção

Definir suas próprias metas por cliente antes de rodar (ver `contexto.example.md`):
- CPA: dispara quando passa de 1,15x a meta (mais de 15% acima).
- ROAS: dispara quando cai abaixo de 0,85x a meta (mais de 15% abaixo).
- CTR: dispara quando fica abaixo de 1,0% com gasto acima de R$100.

Se nenhum limiar estourar: "nada crítico, segue o jogo". Não inventar problema onde os
números estão na curva.

## Formatação no WhatsApp

- Negrito é `*asterisco simples*` (markdown do WhatsApp), nunca `**duplo**`.
- Nada de tabela. Número sempre inline na frase ("CPA caiu pra R$23").
- Real no padrão brasileiro: milhar com ponto, centavo com vírgula (`R$ 12.345,60`).
- Pluralização correta: "1 venda" / "3 vendas".

## A voz

Direto, frase curta, sem corporativês ("alavancar sinergias", "otimizar entregáveis" são
proibidos). Gestor de tráfego falando com gente, não relatório de agência.

## Pipeline (3 passos)

1. **Puxar métricas** via MCP Meta (tendência do período + situação atual).
2. **Cruzar com o histórico** do cliente (período anterior, metas ativas, último
   relatório enviado). Sem esse cruzamento o parágrafo 2 vira descrição, não explicação.
3. **Preview e confirmação obrigatória**: NUNCA enviar direto. Mostrar a narrativa
   pronta, perguntar se pode mandar, só enviar depois do ok.

## Checklist antes de enviar

1. São 3 ou 4 parágrafos na ordem certa?
2. Tem causa no parágrafo 2, não só descrição?
3. O próximo passo termina com ação concreta?
4. Voz curta, sem corporativês, acentuação perfeita?
5. Os números vieram do MCP, não de chute?
6. Você viu o preview e confirmou o destinatário?
