# Diagnostico de Conta Meta - Auditoria em 4 Frentes via MCP

Peça ao Claude Code (com o MCP Meta conectado na sua sessão) para auditar sua conta de
anúncios em 4 frentes: estrutura, criativo, público e página de destino. O resultado é
um diagnóstico priorizado, salvo num arquivo, com o que atacar primeiro.

## Pré-condição

1. Confirmar que a conta existe e está consultável antes de rodar qualquer coisa.
2. Definir a janela de análise. Padrão: últimos 30 dias. Conta com pouco volume: últimos
   90 dias. Para investigar queda recente, comparar últimos 7 dias contra últimos 30.

## Frente 1: Estrutura

Objetivo: ver se a conta está montada de um jeito que ajuda ou atrapalha a entrega.

| Sinal | Limiar | Severidade | Ação |
|-------|--------|------------|------|
| Campanhas duplicadas | 2+ campanhas com mesmo objetivo e público quase idêntico | ALTA | manter a de melhor custo, pausar as outras, consolidar |
| Estratégia de lance arriscada sem dados | Cost Cap/Bid Cap com gasto < R$200 ou < 50 conversões em 30 dias | ALTA | trocar pra lance automático até acumular dados |
| Excesso de conjuntos por campanha | mais de 5 conjuntos ativos na mesma campanha | MEDIA | consolidar em 2-3 no máximo |
| Conjunto subescalado | menos de 50 conversões por semana (não sai do aprendizado) | MEDIA | mover budget pros vencedores ou consolidar |
| Conjuntos pausados antigos | pausado há mais de 30 dias sem alteração | BAIXA | arquivar, não deletar |

Regra de ouro: cada conjunto precisa de ~50 conversões por semana pra sair do
aprendizado. Com muitos conjuntos disputando o mesmo público essa conta quase nunca
fecha a otimização.

## Frente 2: Criativo

Objetivo: ver se os anúncios estão cansados e se o problema é qualidade ou lance.

| Sinal | Limiar | Severidade | Ação |
|-------|--------|------------|------|
| Fadiga de criativo | rodando há mais de 21-30 dias e frequência acima de 3,0-3,5x | ALTA | pausar e subir 2-3 variações novas |
| CTR baixo com gasto | rodando há mais de 7 dias, gasto acima de R$50, CTR abaixo de 0,5% | MEDIA | refazer o gancho do zero |
| Sem conversão com gasto alto | 0 conversões com gasto acima de 2x o CPA-alvo | ALTA | pausar imediatamente |
| Hook rate fraco (vídeo) | visualização de 3 segundos abaixo de 25% | MEDIA | refazer o primeiro segundo |
| Conjunto sem variação | apenas 1 anúncio ativo no conjunto | MEDIA | subir ao menos 3 variações (gancho, formato, ângulo diferentes) |

## Frente 3: Público

Objetivo: ver se a segmentação ajuda ou estrangula, e se há sobreposição.

| Sinal | Limiar | Severidade | Ação |
|-------|--------|------------|------|
| Sobreposição de público | acima de 30-40% entre conjuntos da mesma campanha | ALTA | consolidar num só conjunto ou usar exclusões mútuas |
| Lookalike velho | seed sem atualizar há mais de 90 dias | MEDIA | recriar com conversões recentes |
| Público customizado velho | sem atualizar há mais de 30 dias | MEDIA | atualizar a janela |
| Idade ampla sem segmentação | faixa de 40+ anos sem nenhuma camada de interesse | BAIXA | estreitar pro avatar real ou adicionar camada |

## Frente 4: Página de destino

Objetivo: a conta pode estar ótima e a venda morrer na página.

| Sinal | Limiar | Severidade | Ação |
|-------|--------|------------|------|
| Pixel sem disparo | nenhum evento registrado, ou último PageView há mais de 24h com tráfego rodando | ALTA | confirmar disparo com a ferramenta de debug do pixel |
| Página fora do ar | não retorna HTTP 200 | ALTA | corrigir antes de deixar o tráfego cair num buraco |
| Performance crítica | score de velocidade abaixo de 50 (mobile ou desktop) | ALTA | atacar imagens, JS bloqueante, fontes síncronas |
| Performance mediana | score entre 50 e 75 | MEDIA | mirar carregamento abaixo de 2,5s |
| Quebra de promessa | o anúncio promete algo que não aparece na página | MEDIA | alinhar a dobra inicial com a promessa do criativo |

## Formato de saída

Gerar um markdown único, priorizado por impacto:

```
# Diagnostico de Conta - <data>

## Prioridade ALTA (atacar agora)
- [Frente] Achado. Por que dói. Ação concreta.

## Prioridade MEDIA
- [Frente] Achado. Ação.

## Prioridade BAIXA
- [Frente] Achado. Ação.
```

Na conversa, entregar o resumo curto (2-3 pontos de prioridade ALTA), não o markdown
inteiro. Detalhe completo só se pedido.
