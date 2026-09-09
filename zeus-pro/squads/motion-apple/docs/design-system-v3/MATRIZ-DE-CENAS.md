# Matriz de cenas: da transcrição ao storyboard

Para o agente que recebe a transcrição e monta o storyboard, antes de qualquer
implementação. Três decisões, nesta ordem: **quantas cenas** · **qual molde em
cada uma** · **qual o ritmo entre elas**.

---

## 1. Quantas cenas caberem na fala, não no relógio

Um vídeo de 1 minuto pode ter 7 cenas ou 16. Não é gosto: sai da **densidade
de afirmações** da fala.

Conte, na transcrição, quantas **afirmações completas** existem — uma afirmação
é uma ideia que se sustenta sozinha ("o perfil precisa de foto profissional" é
uma; "foto profissional, bio e destaques" são três).

| Afirmações por minuto | Cenas em 1 min | Duração média | Caráter |
|---|---|---|---|
| 5 a 8 | **7 a 9** | 6 a 8s (360–480q) | **Lento.** Cada cena respira: entrada, ação, hold longo, saída. Molde estruturado (esquema, interface, comparação) por cena. |
| 9 a 13 | **10 a 13** | 4,5 a 6s (270–360q) | **Médio.** O padrão. Alterna estruturado e apoio; hold de 60 a 90q. |
| 14 a 20 | **14 a 16** | 3,5 a 4,5s (210–270q) | **Rápido.** Só destaque, número, apontamento e lista. Esquema com conector não cabe: o traço não termina de desenhar. |
| mais de 20 | **16, e agrupe** | — | A fala está corrida. Agrupe afirmações irmãs numa cena de lista, em vez de picar. |

**Regra dura do ritmo rápido:** abaixo de 240 quadros por cena, saem de cena
todos os moldes cujo `quadroCompleto` do build-registry passa de 48 — jornada,
causa-efeito, ponte, filtro, gargalo, radar. Sobram destaque (N1/N2/N3), número,
apontamento, checks, coluna, trio e troca.

**Como medir sem chutar:** `duracaoDaCena >= quadroCompleto + 60` (o hold
mínimo). Se não fecha, o molde é rápido demais para aquela fala — troque pela
alternativa, não corte o hold.

---

## 2. Qual molde: a matriz

A coluna do meio é o que a fala **afirma**, não a palavra que ela usa. Os
exemplos de fala saíram dos vídeos reais do squad e estão também em
`registry/visual-registry.json` (campo `exemplosDeFala`).

| Momento da fala | O que ela afirma | Molde | Alternativa |
|---|---|---|---|
| "você não tem tempo, então responde tarde e o lead esfria" | mecanismo entre causa e efeito | `relation.cause-effect.v1` | `flow.timeline.v1` |
| "se já tem público roda tráfego, se não monta o perfil" | condição com dois desfechos | `branch.decision.v1` | `branch.tree.v1` |
| "acompanhamento pesa mais que conteúdo" | dois pesos em disputa | `compare.balance.v1` | `compare.table.v1` |
| "um conteúdo vira reel, post e e-mail" | uma coisa se abre em várias | `branch.tree.v1` | `set.grid.v1` |
| "não é conteúdo que te leva de 5 para 50 mil, é mentoria" | o meio que atravessa o vão | `flow.bridge.v1` | `flow.gap.v1` |
| "em 8 minutos você monta o que levaria três meses" | desproporção entrada/saída | `relation.lever.v1` | `compare.balance.v1` |
| "esquece postar todo dia, faz 12 capas com estratégia" | substituição no mesmo lugar | `compare.swap.v1` | `compare.mirror.v1` |
| "ela sai de onde está e chega na mentoria" | origem e destino nomeados | `flow.journey-ab.v1` | `process.steps.v1` |
| "primeiro atrai, depois qualifica, agenda e vende" | ordem de 3 a 5 etapas | `process.steps.v1` | `flow.timeline.v1` |
| "de cem, dez respondem, um compra" | quantidade caindo por etapa | `flow.funnel.v1` | `flow.filter.v1` |
| "não é qualquer pessoa: tem que ter verba e decidir sozinho" | critérios de quem passa | `flow.filter.v1` | `flow.funnel.v1` |
| "o problema está na aprovação, é ali que trava" | uma etapa trava o resto | `flow.bottleneck.v1` | `flow.funnel.v1` |
| "mentoria é diferente de curso" | dois lados com atributos | `compare.table.v1` | `compare.mirror.v1` |
| "antes eu levava 8h, hoje 5 minutos" | mesmo eixo, dois estados | `compare.mirror.v1` | `number.time.v1` |
| "tem que ter foto, bio e destaques" | três itens sem ordem | `set.trio.v1` | `set.grid.v1` |
| "são cinco tipos de conteúdo" | 4 a 6 itens sem ordem | `set.grid.v1` | `set.count-grid.v1` |
| "pelo menos 12 conteúdos no feed" | quantidade contável | `interface.instagram.feed.v1` | `set.count-grid.v1` |
| "42% do feed é autoridade" | parte de um todo | `chart.donut.v1` | `number.percent.v1` |
| "era 24, foi para 38" | 2 ou 3 valores comparados | `chart.columns.v1` | `interface.chart.growth.v1` |
| "você está entre amador e profissional" | dois polos opostos | `scale.semantic.v1` | `scale.intensity.v1` |
| "seu diagnóstico em seis frentes" | 5–6 critérios, mesma escala | `chart.radar.v1` | `matrix.quadrants.v1` |
| "você abre o Telegram e fala" | ação dentro de plataforma | `interface.chat.audio.v1` | `interface.mobile.chat.v1` |
| "eu uso WhatsApp" | menção à plataforma | mini-selo, densidade 1 | — |
| "repara nesse print" | material real com recorte | `proof.annotated.v1` | `compare.right-wrong.v1` |
| "o aluno falou: entrei achando que era difícil" | citação de terceiro | `proof.testimonial.v1` | densidade 0 |
| "e você sabe quanto custa não fazer isso?" | pergunta retórica | `emphasis.word.v1` (a resposta) | `emphasis.icon-phrase.v1` |
| "o que trava é a OFERTA" | uma palavra é a tese | `emphasis.word.v1` | `emphasis.attribute.v1` |
| "entrei achando que era mais complicado" | sensação, sem objeto | **densidade 0** | — |

Quando duas linhas servem, vale a ordem de desempate do `AI_USAGE_GUIDE.md`: o
molde mais simples que ainda mostra a relação, e o que não se repetiu nos 3
beats anteriores.

---

## 3. Ritmo: como as cenas se encadeiam

O storyboard não é uma fila de moldes bons. Ele alterna **densidade** (0 a 5,
em `registry/scene-registry.json`) porque atenção cansa.

Regras que valem para qualquer duração:

- Nunca 3 cenas seguidas na mesma densidade.
- Nunca dois níveis 4 ou 5 em menos de 15s.
- Depois de um 4/5, a próxima cai para 0–2.
- Nível 5 (lettering, selo) no máximo 2 vezes por vídeo.
- Nunca o mesmo molde em beats vizinhos, mesmo que a fala permita.
- **Continuidade vence novidade:** dois beats sobre o mesmo objeto (o feed e
  depois a função das capas) ficam no mesmo palco crescendo, não em duas cenas.

Curva típica de 1 minuto no ritmo médio (11 cenas):

    hook 3 · apoio 1 · esquema 3 · respiro 0 · interface 3 · número 4
    · apoio 2 · esquema 3 · prova 3 · clímax 5 · fecho 5

O que segura até o fim não é ter movimento em tudo: é **variar a natureza do
movimento**. Traçado, cascata, contagem, foco que migra, digitação,
confirmação — se três cenas seguidas usam o mesmo gesto, o olho desiste antes
do conteúdo acabar.

---

## 4. Mobile: quando o aparelho entra

A moldura de celular (300 de largura, raio 44, borda 3) só entra quando a fala
diz que a coisa acontece **na tela de alguém**. Seis variantes prontas em
`#s04h-motion`: formulário, chat, notificações, post, checkout, perfil.

| Fala | Entra o aparelho? | O que usar |
|---|---|---|
| "aparece no celular dela" | **sim** | `interface.mobile.notification.v1` |
| "a pessoa abre e vê seu perfil" | **sim** | `interface.mobile.profile.v1` |
| "ela deixa o WhatsApp na página" | **sim** | `interface.mobile.form.v1` |
| "ele responde no Telegram" | não: a ação é a resposta | `interface.chat.audio.v1` (painel solto) |
| "olha as métricas da campanha" | não: é painel de trabalho | `interface.metrics.v1` |
| "12 conteúdos no feed" | não: o objeto é o feed | `interface.instagram.feed.v1` |

Regra: **o aparelho é contexto, não enfeite.** Ele entra pronto (reveal 18q,
scale .98 → 1) e só a ação narrada acontece dentro dele. Nunca dois celulares,
nunca vidro dentro de vidro (a tela É o painel), e todo texto dentro do
aparelho é barra — só o dado que a fala lê vira texto real.

Quando a fala é sobre a **ação** e não sobre o aparelho, o painel solto ganha:
sobra mais espaço para o gesto, que é o que precisa ser visto.

---

## 4b. Acento de passagem: a nota fora da escala

As 31 variantes motion de interface eram recrutadas **só** quando o beat era
sobre a plataforma. Como a maioria das falas apenas *toca* nelas ("me manda no
WhatsApp", "caiu a notificação", "chegou no e-mail"), elas quase nunca entravam
— e o sistema perdia as peças mais bonitas que tem.

O acento resolve isso: a variante entra **por cima da cena que já está no
palco**, pequena, por 40 a 60 quadros, e sai. Não troca o molde principal, não
troca a legenda, não pega o portador de cor. É a nota que não pertence à escala
e por isso chama atenção.

**Como fica:** densidade 1 · 40 a 60 quadros · escala 0,55 a 0,7 (o painel de
700 entra a 385–490) · canto direito com 24 de margem, nunca no centro ·
entrada reveal 12q descendo 16 · saída exit 12q subindo 12.

| Fala | Acento | Recorte |
|---|---|---|
| "me manda no WhatsApp" | `interface.chat.text.v1` | um balão só, 320 |
| "caiu a notificação" | `interface.notification.v1` | um cartão glass de 380 |
| "chegou no e-mail" | `interface.email.v1` | remetente e assunto, sem corpo |
| "ele respondeu por áudio" | `interface.chat.audio.v1` | um balão com a onda, 340 |
| "olha lá no perfil" | `interface.instagram.profile.v1` | avatar com anel e as 3 métricas, 360 |
| "aparece no feed dela" | `interface.instagram.feed.v1` | 3×2 de miniaturas, 300 |
| "comentário chegou" | `interface.comments.v1` | uma linha, 360 |
| "a pessoa pesquisa seu nome" | `interface.search.v1` | campo pill com cursor, 340 |
| "já tem 3 sessões marcadas" | `interface.schedule.v1` | 3 blocos de horário, 300 |
| "entrou a venda" | `interface.confirmation.v1` | check em anel, 200 |
| "pagou no cartão" | `interface.checkout.v1` | botão pill com o valor, 320 |
| "o número subiu" | `interface.metrics.v1` | um KPI só, 240 |
| "a lista tá enchendo" | `interface.leads.v1` | 3 linhas com avatar, 360 |
| "ligou o piloto automático" | `interface.toggles.v1` | um toggle com rótulo, 280 |
| "tá rodando agora" | `interface.progress.v1` | barra com sparkles, 320 |
| "no celular dela" | `interface.mobile.notification.v1` | moldura 300 cortada em 200 |

**Limites:** um acento por beat · nunca em beats vizinhos · nunca em cena de
densidade 4 ou 5 (o palco está cheio) · máximo 3 por vídeo de 1 minuto · nunca
cobrindo rótulo ou número do molde principal.

**Quando não é acento:** se a fala descreve a **ação** dentro da plataforma
(verbo com consequência, sequência temporal, dado citado), promova para cena de
interface em densidade 3. E se o acento precisa de mais de 60 quadros para ser
entendido, o beat era sobre a plataforma desde o começo.

Efeito no ritmo: uma cena de densidade 3 com acento lê como **3 → 1 → 3** e
quebra a monotonia sem trocar o palco. É a forma mais barata de variar.

## 5. O que o storyboard entrega

Uma linha por cena, com estes campos — é o que o motor consome:

    cena · beat da transcrição (texto exato) · palavraAncora · quadroDaPalavra
    · moldeId · densidade · palco · duracaoDaCena · quadroCompleto (do build-registry)
    · legenda (liga/cala) · gestoDominante · pesoDeSomTotal · acento (id, recorte,
    escala, canto, quadroDeEntrada) quando houver

Antes de fechar, três verificações mecânicas:

1. `duracaoDaCena >= quadroCompleto + 60` em toda cena.
2. Nenhuma densidade repetida três vezes seguidas, nenhum molde em beats
   vizinhos, nenhum gesto três vezes seguidas.
3. Soma dos pesos de som ≤ 22 por cena e ≥ 2,5s entre eventos de som.
