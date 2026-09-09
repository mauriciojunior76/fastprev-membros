# Atlas semântico — da frase falada ao recurso

Cada linha começa com uma **frase falada** (do tipo que aparece nestes vídeos) e
mostra qual recurso representa aquela estrutura. Use como calibragem de
reconhecimento, não como tabela de substituição: a decisão final passa por
`useWhen`/`dontUseWhen` no `visual-registry.json`.

| Estrutura | Frase falada | Recurso | Como fica |
|---|---|---|---|
| IDEIA ÚNICA | "o que trava não é o tráfego, é a oferta" | `emphasis.word.v1` | OFERTA em 200/900 com traço |
| PALAVRA CHAVE | "isso é autoridade" | `emphasis.attribute.v1` | ícone + palavra em círculo |
| FRASE IMPORTANTE | "te levo de zero a dez alunos em 60 dias" | `emphasis.icon-phrase.v1` | ícone centralizado + 2 linhas |
| CITAÇÃO | "o aluno me falou: entrei achando que era difícil" | `proof.testimonial.v1` | cartão com avatar + citação |
| LISTA | "tem que ter foto, bio e destaques" | `set.trio.v1` | 3 círculos com ícone |
| BULLETS | "são cinco tipos de conteúdo" | `set.grid.v1` | grade de 5 blocos |
| SEQUÊNCIA | "primeiro atrai, depois qualifica, agenda e vende" | `process.steps.v1` | 4 passos numerados |
| PROCESSO | "o método tem três fases" | `process.steps.v1` | 3 passos + rótulos |
| FLUXO | "o lead entra, passa pelo filtro e chega em você" | `flow.filter.v1` | unidades + critérios |
| JORNADA | "ela sai de onde está e chega na mentoria" | `flow.journey-ab.v1` | 2 nós + conector com seta |
| TIMELINE | "no dia 1 você monta, em 30 dias já vende" | `flow.timeline.v1` | trilho + 2 marcos |
| COMPARAÇÃO | "mentoria é diferente de curso" | `compare.table.v1` | 2 colunas em cartão glass |
| A VS B | "o Zeus faz isso, o gestor faz aquilo" | `compare.panels.v1` | 2 painéis, contorno no falado |
| ANTES E DEPOIS | "antes eu levava 8h, hoje 5 minutos" | `compare.mirror.v1` | 2 estados + delta |
| PRÓS E CONTRAS | "isso pesa mais que aquilo" | `compare.balance.v1` | balança inclinando |
| CAUSA E EFEITO | "você não tem tempo, então responde tarde e o lead esfria" | `relation.cause-effect.v1` | 3 nós + conectores |
| PROBLEMA E SOLUÇÃO | "o problema está na aprovação, é ali que trava" | `flow.bottleneck.v1` | fila + gargalo + vazão |
| ENTRADA E SAÍDA | "entra lead frio, sai cliente" | `flow.journey-ab.v1` | 2 nós |
| BIFURCAÇÃO | "você pode continuar sozinho ou montar uma equipe" | `branch.decision.v1` | condição + 2 ramos |
| ESCOLHA | "se já tem público, roda tráfego; se não, monta o perfil" | `branch.decision.v1` | 2 ramos, o escolhido em preto |
| RAMIFICAÇÃO | "um conteúdo vira reel, post e e-mail" | `branch.tree.v1` | raiz + 3 folhas |
| MAPA MENTAL | "tudo isso se ramifica do mesmo tema" | `branch.tree.v1` | raiz + folhas radiais |
| HIERARQUIA | "tem três níveis de consciência" | `hierarchy.levels.v1` | pirâmide de 3 |
| CAMADAS | "a base é o posicionamento, em cima disso vem a oferta" | `hierarchy.layers.v1` | camadas empilhadas |
| FUNIL | "de cem, dez respondem, um compra" | `flow.funnel.v1` | 3 etapas + números |
| CICLO | "vende, entrega, gera depoimento, que traz mais venda" | `flow.cycle.v1` | 4 etapas em loop |
| FRAMEWORK | "muito esforço e pouco resultado é o pior quadrante" | `matrix.quadrants.v1` | matriz 2×2 |
| ESCALA | "o público vai do frio ao pronto pra comprar" | `scale.intensity.v1` | escala de 4 paradas |
| TRANSFORMAÇÃO | "o mesmo processo, feito à mão ou pelo Zeus" | `compare.manual-auto.v1` | 2 trilhas: 6 passos × 2 |
| CRESCIMENTO | "saiu de 2 mil e foi para 50 mil por mês" | `interface.chart.growth.v1` | curva + ponto com anel |
| NÚMERO | "pelo menos 12 conteúdos" | `set.count-grid.v1` | grade 4×3 + fração 08/12 |
| PORCENTAGEM | "cresceu 184% em alunos" | `number.percent.v1` | +184% com % em 40% |
| META | "a meta é 50 mil no mês" | `interface.goal.v1` | barra + botão-anel + valor |
| RESULTADO | "fechou a venda" | `interface.confirmation.v1` | check vazado + anel |
| ALERTA | "repara nesse trecho aqui" | `proof.annotated.v1` | print com recorte anotado |
| ERRO | "essa foto aqui está errada" | `compare.right-wrong.v1` | 2 imagens + badges |
| EXEMPLO | "tipo isca de baleia e isca de sardinha" | `profile.audience-card.v1` | 2 cartões de público |
| DEFINIÇÃO | "isca de baleia é quando você fala com quem já tem dinheiro" | `scheme.description.v1` | ícone + título + 3 barras |
| PERGUNTA | "você sabe quanto custa não fazer isso?" | `interface.poll.v1` | enquete/caixa de perguntas |
| RESPOSTA | "ele responde: está assim, assim e assim" | `interface.chat.audio.v1` | balão do Zeus com onda |
| WHATSAPP | "mandei mensagem e ele respondeu 5 min depois" | `interface.chat.text.v1` | balões + sequência |
| EMAIL | "chega o relatório da semana no e-mail" | `interface.email.v1` | remetente + assunto |
| CHAT | "você fala por áudio e ele otimiza" | `interface.chat.audio.v1` | onda + anel no play |
| NOTIFICAÇÃO | "caiu um lead novo" | `interface.notification.v1` | cartão glass entrando de cima |
| CALENDÁRIO | "todo dia você faz isso" | `interface.calendar.v1` | grade de dias |
| SITE / BUSCA | "a pessoa procura seu nome" | `interface.search.v1` | campo pill + resultados |
| DASHBOARD | "olha as métricas da campanha" | `interface.metrics.v1` | 3 KPIs, um citado |
| CRM | "a lista de leads vai enchendo" | `interface.leads.v1` | lista com avatares |
| FORMULÁRIO | "ela deixa o WhatsApp na página" | `interface.form.v1` | 2 campos + botão |
| PAGAMENTO | "são 12x de 297" | `interface.checkout.v1` | preço + parcela + botão |
| SOCIAL MEDIA | "o feed com capas estratégicas" | `interface.instagram.feed.v1` | grade 4×3 com ícone |
| MOBILE APP | "aparece no celular dela" | `interface.mobile.notification.v1` | moldura 300 + pilha |
| METÁFORA VISUAL | "é um atalho, não um caminho novo" | `emphasis.lettering.v1` | lettering multi-fonte |

## Como usar este atlas

1. Encontre a linha cuja **estrutura** corresponde ao seu beat (não a frase).
2. Abra o recurso no `visual-registry.json` e leia `dontUseWhen`.
3. Se o `dontUseWhen` bate com o seu caso, use a `alternatives`.
4. Se nenhuma linha corresponde, a estrutura pode não existir ainda: escolha o
   fallback (legenda ou destaque) e registre a lacuna.
