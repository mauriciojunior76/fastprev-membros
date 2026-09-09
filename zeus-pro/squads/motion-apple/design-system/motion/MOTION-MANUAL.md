# MANUAL DE MOTION — Zeus Reels · Apple Conceitual
### v3.0 · o documento normativo de movimento · 60fps · destino Remotion

> Este arquivo **substitui** §9d/§9e/§9e2 como fonte de verdade operacional de motion.
> O guia principal continua mandando em layout, tinta, tipo e massa visual.
> Companheiros: `REMOTION-USAGE.md` (como usar no Remotion — leia primeiro se for gerar código),
> `motion.ts` (implementação), `motion-spec.schema.json` (contrato),
> `registry/motion-registry.json` (índice curto), `sfx-map.json` (som).

---

## 0. Como ler este manual

Sete camadas, nesta ordem. Cada cena passa por todas.

| # | Camada | Pergunta que responde |
|---|---|---|
| 1 | **Intenção** | qual verbo a fala está executando? |
| 2 | **Natureza** | o objeto é da família de quê? (tempo, dado, texto, pessoa…) |
| 3 | **Gesto** | qual movimento nomeado materializa esse verbo nesse objeto? |
| 4 | **Curva** | qual perfil de velocidade esse gesto tem? |
| 5 | **Tempo** | quantos quadros, começando em qual quadro relativo à fala? |
| 6 | **Encadeamento** | quem se move junto, quem espera, quanto entre um e outro? |
| 7 | **Som** | qual peso, logo qual SFX? |

Regra de ouro: **uma camada errada estraga as outras seis**. O defeito mais comum
não é curva feia — é intenção não identificada, o que faz cair sempre no mesmo gesto.

---

## 1. Física do sistema (a premissa que faz parecer Apple)

Tudo neste sistema obedece a três leis. Elas são o motivo de o resultado parecer
caro e não amador.

**Lei 1 — Massa.** Objeto grande é pesado: sai mais devagar do repouso e leva mais
tempo para parar. Objeto pequeno é leve: parte rápido e para rápido.
Duração ≈ `base × massFactor`, onde massFactor é:

| Tamanho na tela | massFactor | Exemplo |
|---|---|---|
| ≤ 48px | 0,70 | ponto, check, ícone s |
| 49–120px | 0,85 | célula, badge, avatar |
| 121–320px | 1,00 | cartão, bloco, nó |
| 321–700px | 1,20 | painel, gráfico |
| > 700px | 1,40 | cena inteira, palco |

**Lei 2 — Continuidade.** Nada parte de velocidade zero se já estava se movendo, e
nada para de repente se ainda tem para onde ir. Interrupção de animação **continua
da posição e da velocidade atuais** (`inertiaFrom`), nunca reinicia em zero.

**Lei 3 — Foco único.** Só um objeto por vez tem a atenção. Quem entra em foco
adquire no mesmo intervalo em que o anterior recua. Nunca dois anéis, nunca dois
elementos "acordando" ao mesmo tempo.

**Consequência prática:** deslocamento ≤ 16px, escala ≤ 1,04, blur é profundidade.
Amplitude pequena + curva certa lê como caro. Amplitude grande lê como PowerPoint.

---

## 2. Biblioteca de curvas (o Graph Editor do sistema)

### 2.0 A assinatura do sistema: cauda longa
Toda curva daqui percorre **~90% da distância nos primeiros 40% do tempo** e usa os
**60% restantes só para assentar**. O olho vê o objeto chegar e depois *pousar*.
É isso — não a amplitude, não o blur — que faz o movimento parecer After Effects.
No Graph Editor de velocidade: pico cedo, cauda longa quase plana até zero.
Consequência: durações maiores que antes (reveal 18q, transfer 26q, reframe 36q);
se a cena parecer lenta, corte amplitude e stagger — nunca a cauda.

### 2.1 Núcleo — 4 curvas, 90% das cenas

| Token | Bezier | Perfil de velocidade | Usar quando |
|---|---|---|---|
| `settle` | `.05,.7,.1,1` | arranca forte, freia longo | algo **entra** e precisa assentar (item, cartão, balão) |
| `smooth` | `.6,0,.05,1` | lento-rápido-lento simétrico | algo **troca de lugar** (foco, reposição, swap) |
| `settleSoft` | `.16,.84,.14,1` | arranque suave, freio muito longo | algo é **revelado** (traço, painel, contexto, número) |
| `easy` | `.4,0,.2,1` | simétrico neutro | algo **sai** (fade, recuo, blur out) |

### 2.2 Camada avançada — intenção específica, uso justificado

Estas existem para acabar com o "movimento sempre igual". Cada uma tem **uma**
intenção. Usar fora dela é defeito.

| Token | Implementação | Perfil | Intenção exclusiva |
|---|---|---|---|
| `anticipate` | `.7,-0.2,.1,1` | recua ~4% antes de ir | **força/decisão**: botão que envia, corte que rompe, virada de argumento |
| `overshootMicro` | `.16,1.02,.2,1` | passa 1,5–2% e volta | **chegada de item leve** ≤120px (check, badge, pin). Nunca em painel, nunca em texto |
| `elasticSoft` | spring `{damping:22, stiffness:170, mass:1}` | 1 oscilação e para | **materialização**: algo que nasce (selo, ícone-chave). Máx. 1 por cena |
| `inertia` | spring `{damping:40, stiffness:80, mass:1.2}` | desacelera longo, sem oscilar | **continuação**: scroll, carrossel, lista que empurra vizinhos |
| `brake` | `0,.9,.08,1` | rápido imediato, freio duro | **parada exata**: contador que trava no número, foco que crava |
| `gravity` | `.32,0,.88,.42` | acelera até o fim | **queda/entrega**: download, arquivo que cai na pasta, valor que desaba |
| `lift` | `.1,.9,.1,1` | sai rápido, sobe leve | **subida/aprovação**: valor que cresce, item que sobe no ranking |
| `linear` | — | uniforme | **tempo real apenas**: playback, cronômetro, progresso medido |

> **Overshoot** é **regulado**, não livre: `overshootMicro` (≤2%) só na confirmação
> (check ≤48px); `elasticSoft` (1 oscilação) só em "nascer" (selo, ícone-chave)
> ≤120px; máximo **um** por cena; nunca em destaque, nunca em texto. Fora disso: proibido.

### 2.3 Como escolher a curva em 5 segundos

```
o objeto está ENTRANDO?        → settle        (leve e pequeno? overshootMicro)
está sendo REVELADO/DESENHADO? → settleSoft
está TROCANDO de posição?      → smooth
está SAINDO?                   → easy
tem FORÇA/decisão?             → anticipate
CAI?  → gravity   SOBE? → lift
PARA num valor exato?          → brake
CONTINUA um movimento?         → inertia
NASCE do nada?                 → elasticSoft
é TEMPO REAL?                  → linear
```

---

## 3. Classes temporais (60fps · unidade = quadro "q")

Duração **nunca é escolhida no olho**. Ela sai da classe do evento × massFactor.

| Classe | Base | Faixa | O que é |
|---|---|---|---|
| `feedback` | 8q | 6–10 | resposta imediata: toque, check, tick |
| `reveal` | 18q | 14–22 | algo aparece: item, rótulo, ícone |
| `transfer` | 26q | 20–30 | foco migra, elemento troca de lugar |
| `reorg` | 32q | 26–38 | lista reordena, grade recompõe |
| `reframe` | 36q | 30–42 | câmera/palco muda de enquadramento |
| `draw` | 34q | 28–40 | traço, conector, path desenhando |
| `count` | 48q | 40–60 | contador, barra medida |
| `hold` | ≥60q | 60–180 | sustentação legível, imóvel |
| `real` | = duração real | — | playback, cronômetro |

**Regra do hold:** texto na tela precisa de `hold` ≥ 60q + 12q por palavra além de 4.
Frase de 9 palavras → 60 + 5×12 = **120q (2s)** parada. É a causa nº1 de "cortou cedo".

**Arredondamento:** `Math.round` **uma vez por evento**, nunca por propriedade.
Duas propriedades do mesmo objeto compartilham o mesmo `startFrame` arredondado.

---

## 3b. Peso do movimento (0–10) — a escala que liga motion e som

Todo gesto recebe um **peso de 0 a 10**: quanto ele importa na cena. O peso é
**a mesma escala do sfx-map.json** — o número que você escreve no motionSpec é o
número que escolhe o arquivo e o volume do som. Sem tradução, sem segunda tabela.

O peso não é gosto: sai do que o gesto **comunica**.

| Peso | Classe | O que é | Amplitude | Duração | Hold extra | Blur in | Som (sfx-map) |
|---|---|---|---|---|---|---|---|
| **0** | silêncio | traço da palavra, contagem em curso, legenda, playback | ×0,5 | ×0,8 | 0 | 0–2px | nenhum (obrigatório) |
| **1–2** | detalhe | letra, digitação, célula, tick, vizinho que desloca | ×0,6 | ×0,85 | 0 | 4px | tick mínimo, −20 a −22 dB |
| **3–4** | estrutura | cascata, item de lista, conector, anel migra, barra, nó secundário | ×0,8 | ×1,0 | 0 | 6px | tick / sweep / pop suave, −15 a −18 dB |
| **5–6** | evento | nó principal, painel, check, número que assenta, botão, notificação, cena entra | ×1,0 | ×1,1 | +12q | 6px | médio / ding / click, −12 a −14 dB |
| **7–8** | virada | N2, gargalo que libera, tônica do lettering, comparação certo×errado, "mas" | ×1,25 | ×1,25 | +24q | 8px | grave / whoosh longo, −10 a −11 dB |
| **9–10** | assinatura | N3 (palavra-conceito), selo de fecho | ×1,4 | ×1,5 | ×1,5 | 10–12px | whoosh longo + grave, −9 dB |

**Intensidade (§7) deriva do peso:** 0–4 = `sutil` · 5–6 = `padrao` · 7–10 = `dramatico`.
Não se escolhe intensidade; escolhe-se o peso e ela vem junto.

### Regras de peso por cena (as mesmas do som)
- Soma dos pesos de uma cena **≤ 22**. Passou, algum gesto está mentindo sobre a própria importância.
- Nunca dois gestos ≥7 a menos de **3s** (180q).
- Peso 9–10: **máximo 2 por vídeo**. O terceiro rebaixa a todos.
- Dois eventos a menos de 8q: o de menor peso perde a animação própria (entra junto, sem som).
- Cascata ≥6 irmãos: só o 1º, o do meio e o último carregam peso; os outros são peso 1.
- Peso 0 é obrigatório, não opcional. Traço da palavra sob N3 é peso 0 mesmo sendo o gesto mais visível — o peso está na palavra.
- Saída de cena (peso 4) e entrada da próxima (peso 6) nunca soam juntas: fica a da cena que traz informação nova.

### Peso dos gestos da tabela §6
```
reveal 6 · cascata 3 · tracado 4 (+ chevron 5) · preenche 3 · desloca 2
confronto 6→7 (errado 6, certo 7, 8q depois) · empilha 3 · sobe 4 · desaba 5
quebra 7 · troca 3 · foco 3 (nasce 5) · confirmacao 6 · contador 0 (assenta 5)
processo 0 (conclui 6) · envio 6 · digitacao 2 · expande 3 · remove 4
alerta 6 · materializa 10 (selo) / 7 (ícone-chave) · rolagem 1
```

### Peso dos esquemas (§8b)
```
causa-efeito: X 4 · conector 4 · chevron 5 · Y 5               (soma 18)
árvore:       raiz 5 · ramos 4 (um som) · folhas 3/1/3           (soma 16)
etapas:       passos 3 (1º e último) · anel nasce 5 · migra 3·3  (soma 17)
funil:        barras 3·3·3 · último nível 5                      (soma 14)
concêntrico:  núcleo 5 · camadas 3·3                             (soma 11)
quadrantes:   eixos 4 · quadrantes 3/1/1/3 · anel 4              (soma 16)
```

---

## 3c. Som ↔ peso ↔ cena (como a trilha e o SFX seguem o motion)

O som não é adicionado depois: ele **deriva** do motionSpec. Três camadas.

| Camada | Segue | Regra |
|---|---|---|
| **SFX** | o peso de cada gesto | id e volume do sfx-map pelo peso (§3b); dispara no quadro em que o gesto **assenta** (fim da cauda), não no start — exceto whoosh de quebra/entrada (start) |
| **Trilha** | o peso máximo da cena | cena peso ≤4: trilha −18 dB, sem mudança · 5–6: −16 dB · 7–8: ducking −6 dB por 40q a partir de tonic−6 · 9–10: ducking −10 dB + drop/pausa da trilha no quadro do assento, retorna com `inertia` em 60q |
| **Pausa** | o hold | hold ≥120q com peso ≤4: a trilha sobe +2 dB (respiro); volta no próximo [in] |

- Ducking usa a mesma curva do gesto (`smooth`), mesmo intervalo, mesmo start.
- Um SFX por passagem; entrada e saída nunca soam juntas.
- Número: peso 0 em curso (silêncio), ding no quadro que trava.
- Cascata: só 1º / meio / último soam; se ≥6 irmãos, os do meio são peso 1.
- Mapa por cena emitido em `scene-NN.sfx.json`: `{frame, weight, sfxId, gainDb, duck?: {fromFrame, toFrame, db}}` — derivado, nunca escrito à mão.

---

## 4. Sincronia com a fala (o que mais desalinha)

O movimento **antecipa** a palavra. O olho precisa chegar antes do ouvido.

| Evento | Offset relativo à palavra (t=0 é o onset da sílaba tônica) |
|---|---|
| Gesto principal da cena (`[act]`) | **t − 6q** |
| Entrada de contexto (`[in]`) | t − 18q |
| Cascata da estrutura (`[build]`) | t − 12q, primeiro item |
| Migração de foco | **t − 4q** (chega junto com a palavra) |
| Confirmação / check | **t + 2q** (reage depois de dito) |
| Saída da cena | último `hold` termina ≥ 10q **depois** do fim da fala |

**Nunca** sincronize pelo início da frase — sempre pela **palavra tônica**
(`WordTiming.tonicFrame`). Se o timing da fala não estiver disponível, a cena não
é gerada: fallback é hold estático, não é chute.

Verificação: se você pausa no quadro do onset da palavra, o gesto deve estar
**~30% percorrido**. Menos que isso = atrasado. Mais que 60% = adiantado.

---

## 5. Encadeamento e stagger (a segunda causa de amadorismo)

### 5.1 Passos base

| Unidade | Step |
|---|---|
| letra | 1,5q |
| palavra | 3q |
| item de lista / célula | 4q |
| linha de tabela | 6q |
| bloco / cartão | 8q |
| coluna de gráfico | 4q |
| cena (overlap) | 10q |

### 5.2 Teto de cascata — a regra que falta hoje

```
step = min(stepBase, 24 / (n - 1))     // n = número de irmãos
```

A cascata inteira **nunca passa de 24q**. 12 itens com step 4 = 44q de cascata:
a cena parece lenta e a fala já foi embora. Com o teto: step ≈ 2,2q.
Piso: step ≥ 1q (abaixo disso vira entrada simultânea — então faça simultânea).

### 5.3 Ordem da cascata segue a natureza, não o índice

| Estrutura | Ordem |
|---|---|
| lista vertical | topo → base |
| lista que recebe item novo | o novo entra, os vizinhos **deslocam** com `inertia` |
| grade | leitura Z (linha por linha, esquerda→direita) |
| árvore / mapa mental | raiz → ramo → folha, por **profundidade** |
| gráfico de barras | ordem dos dados, jamais por altura |
| trio comparativo | esquerda → direita, exceto se a fala nomear outra ordem |
| timeline | sempre para frente no tempo |

### 5.4 Parenting
Grupo se move como grupo. Filho de um wrapper animado **não** tem stagger próprio
nem curva própria — senão o cartão "se desmonta" no ar.

---

## 6. Tabela INTENÇÃO → MOTION (obrigatória)

Esta tabela é o antídoto para "movimento sempre igual". Identifique o **verbo da
fala**; o gesto é consequência, não escolha.

| Verbo da fala | Gesto | Propriedade primária | Curva | Dur. | Peso (= som) |
|---|---|---|---|---|---|
| **revelar / mostrar** | `reveal` | opacity + blur 6→0 | settleSoft | 14q | 6 |
| **construir / listar** | `cascata` | opacity+scale por irmão | settle | 20q, step 4 | 3 |
| **conectar / porque** | `tracado` | strokeDashoffset | settleSoft | 28q | 4+5 |
| **preencher / completar** | `preenche` | clip-path inset | settle | 20q | 3 |
| **deslocar / mudar** | `desloca` | x/y ≤16px | smooth | 20q | 2 |
| **comparar / versus** | `confronto` | dois focos alternando, 1 por vez | smooth | 2×16q | 3 cada |
| **acumular / somar** | `empilha` | item entra por baixo, pilha sobe | inertia | 22q, step 4 | 3 |
| **crescer / subir** | `sobe` | scaleY origem bottom | lift | 24q | 4 |
| **cair / perder** | `desaba` | y + scaleY | gravity | 18q | 5 |
| **romper / mas / porém** | `quebra` | recuo e avanço, corte de foco | anticipate | 16q | 7 |
| **substituir / trocar** | `troca` | sai easy 10q ⟂ entra settle 14q, overlap 6q | smooth | 20q | 3 |
| **selecionar / escolher** | `foco` | x,y,w,h,r do anel único | smooth | 20q | 3 |
| **confirmar / pronto** | `confirmacao` | fill + draw do check | settle + overshootMicro | 16q | 6 |
| **medir / quanto** | `contador` | valor numérico | settleSoft → brake | 48q | 0, ding 5 |
| **esperar / processar** | `processo` | progresso real | linear | real | 0 |
| **enviar / entregar** | `envio` | botão → trajeto → destino | anticipate + gravity | 12+18q | 6 |
| **escrever / digitar** | `digitacao` | largura da barra/caret | linear | 1,5q/char | 2 a cada 3 |
| **expandir / detalhar** | `expande` | h + opacity do conteúdo | settleSoft | 22q | 3 |
| **remover / cortar** | `remove` | opacity + colapso dos vizinhos | easy + inertia | 14+20q | 4 |
| **alertar / cuidado** | `alerta` | cor semântica + anel, sem shake | settle | 12q | 7 |
| **nascer / apresentar** | `materializa` | scale .92→1 + blur 12→0 | elasticSoft | 26q | 6 |
| **continuar / rolar** | `rolagem` | translateY contínuo | inertia | var. | 1 |

### 6.1 Regra anti-repetição (apoio)
Duas cenas **adjacentes** não usam o mesmo gesto principal. Se o verbo se repete,
troque a **intensidade** (§7), não o gesto — e se a intensidade também repetir,
troque o enquadramento (close ↔ palco).

---

## 7. Intensidades (3 níveis por gesto)

Mesmo gesto, três leituras. Escolha pela ênfase da fala.

| Nível | Amplitude | Duração | Blur entrada | Quando |
|---|---|---|---|---|
| `sutil` | ×0,6 (desloc. ≤10px, scale ≤1,02) | ×0,85 | 4px | fala corrida, informação de apoio |
| `padrao` | ×1,0 (≤16px, ≤1,04) | ×1,0 | 6px | default |
| `dramatico` | ×1,4 (≤22px, ≤1,06) | ×1,25 + hold ×1,5 | 10px | virada, número-chave, punch line |

`dramatico` no máximo **duas vezes por vídeo**. Três ou mais e nenhuma é dramática.

---

## 8. Comportamento por natureza do objeto (matriz)

A natureza manda mais que o gesto: um relógio não faz cascata, um gráfico não
faz elastic. Se natureza e gesto conflitam, **a natureza vence**.

| # | Objeto | Natureza | Faz | Nunca faz |
|---|---|---|---|---|
| 1 | Relógio / cronômetro | tempo real | ponteiro avança em `linear`, na cadência real | girar sem prazo real; acelerar |
| 2 | Contador / métrica | quantidade | sobe com settleSoft e **trava** com brake | passar do valor e voltar |
| 3 | Barra de gráfico | dado com baseline | cresce da base (`origin: bottom`), `lift` | crescer do centro; encolher para entrar |
| 4 | Linha de gráfico | trajetória | desenha da esquerda, `draw` 28q, ponto surge no fim | aparecer inteira; desenhar de trás |
| 5 | Pizza / anel de % | proporção | preenche do topo, sentido horário, settleSoft | girar como carregamento |
| 6 | Seta / download | direção | move **na direção do fato**, `gravity` se desce | flutuar; apontar e não mover |
| 7 | Balão de mensagem | fala | nasce do lado de quem fala, scale .96→1 origem no rabo | entrar de cima; fade puro |
| 8 | Lista | fila | novo item entra, vizinhos deslocam com `inertia` | vizinhos teleportarem |
| 9 | Tabela | grade | linha por linha, step 6q | célula por célula |
| 10 | Formulário | preenchimento | rótulo → campo → texto digitado → botão | tudo pronto de uma vez |
| 11 | Botão | ação | `anticipate` 12q, feedback 8q, só quando acionado | pulsar em repouso |
| 12 | Toggle / switch | estado binário | knob desliza smooth 12q, trilho troca de cor junto | fade entre estados |
| 13 | Check / confirmação | veredito | círculo preenche 12q → traço desenha 16q, overshootMicro | check aparecer pronto |
| 14 | Notificação | interrupção | entra do topo com `settle`, hold, sai com `easy` | shake |
| 15 | Avatar / pessoa | identidade | reveal + anel; **imóvel** durante a fala | respirar; girar |
| 16 | Nó de mapa mental | relação | aparece **depois** do conector que o liga | aparecer solto e depois ligar |
| 17 | Conector / seta de relação | causa | desenha da origem para o destino, settleSoft | desenhar do meio |
| 18 | Árvore / hierarquia | estrutura | raiz → ramos por profundidade, step 6q | por índice do array |
| 19 | Timeline | progressão | sempre para frente, marcadores em cascata | voltar |
| 20 | Card / cartão | objeto | move como grupo (parenting), `smooth` | filhos com stagger próprio |
| 21 | Painel de interface | contexto | entra vazio (settleSoft 24q), conteúdo depois em cascata | entrar já preenchido |
| 22 | Anel de foco | atenção | interpola x,y,w,h,r pelo caminho mais curto, smooth 20q | teleportar; existir em duplicata |
| 23 | Texto / lettering | leitura | palavra step 3q, letra 1,5q, blur 12→0, hold longo | blur em rótulo; sair antes de lido |
| 24 | Ícone | símbolo | reveal 12q, traço constante (§9c do guia) | girar; piscar |
| 25 | Imagem / miniatura | evidência | ken-burns ≤1,04 durante o hold | estática total; zoom brusco |
| 26 | Selo / logo | assinatura | `materializa` (elasticSoft), 1× por vídeo | repetir |
| 27 | Slider / controle | ajuste | knob `smooth`, valor acompanha em tempo real | valor saltar |
| 28 | Feed / grade de posts | coleção | leitura Z, step com teto §5.2 | aleatório |

---

## 8b. Esquemas — o movimento conta a relação (certo × errado)

Um esquema existe porque a fala afirma uma **relação** (diagram-registry). O
movimento tem de contar essa relação **na ordem em que ela acontece**. Estrutura
antes de conteúdo; origem antes de destino; critério antes de resposta.

| Esquema | Relação | CERTO | ERRADO (o que o gerador tende a fazer) |
|---|---|---|---|
| **Causa e efeito** \`relation.cause-effect\` | X leva a Y | X assenta (settle 14q) → conector **desenha de X para Y** (settleSoft 28q) → Y nasce quando a ponta chega (settle 14q, em t−6q da palavra "Y") | X e Y ao mesmo tempo, seta pronta, bounce. Vira "dois cards e um desenho" |
| **Árvore** \`branch.tree\` | um se divide em N | raiz (settleSoft) → ramos desenham **da raiz para a folha** (settleSoft 24q, simultâneos) → folhas em cascata step 4q, teto 24q | folhas antes da raiz; ordem por índice do array; ramos aparecem prontos no fim |
| **Etapas** \`process.steps\` | existem N passos | passos assentam em cascata (settle 20q, step 4q) → **um anel** migra 1→2→3 com smooth 20q, na tônica de cada etapa, sempre para a direita | tudo de uma vez; um anel por passo; anéis piscando |
| **Funil** \`flow.funnel\` | poucos passam de N para 1 | **de cima para baixo**, cada nível mais estreito (scaleX origem center, settleSoft 16q, step 6q); último nível com \`gravity\` e sólido (≤64px): é o que sobrou | de baixo para cima ("o funil enche"); bounce; o resultado respira em repouso |
| **Concêntrico** \`relation.concentric\` | uma coisa contém outra | **de dentro para fora**: núcleo sólido (settle 14q) → cada camada envolve a anterior (settleSoft 18q, step 6q), scale .98→1 | de fora para dentro; scale 0→1; rotação. Lê como alvo/carregamento |
| **Quadrantes** \`matrix.quadrants\` | dois critérios cruzados | **eixos desenham primeiro** (settleSoft 24q, o horizontal 3q depois do vertical) → quadrantes em leitura Z, step 4q → anel só no quadrante que a fala nomeia | quadrantes em ordem aleatória, girando; eixos por último |

Aplica-se também, por analogia, a: \`hierarchy.layers\` (camada de baixo primeiro,
como o funil invertido), \`flow.timeline\` (marcadores para frente, nunca voltar),
\`relation.venn\` (círculos entram, a interseção é a **última** a receber cor),
\`scheme.equation\` (operandos → operador → resultado, com \`brake\` no resultado),
\`flow.bottleneck\` (fluxo linear até o gargalo; **para** nele com \`brake\`, o anel
crava ali), \`scale.intensity\` (\`lift\` na direção do "mais").

**Regra geral dos esquemas**
1. Estrutura (eixo, raiz, causa) entra antes do conteúdo.
2. Conector desenha da origem ao destino; o destino nasce quando a ponta chega.
3. A direção do movimento é a direção do argumento: funil cai, crescimento sobe, processo avança.
4. Um anel só, e só onde a fala está.
5. Sem rotação, sem bounce, sem respiração: esquema em repouso é imóvel.

---

## 8c. Destaque — destacar não é pular

Referência mental: telão de lançamento da Apple. O que ganha atenção **não se
mexe mais** — o resto recua. O destaque é feito de quatro gestos silenciosos no
**mesmo intervalo** (20q, começando em tonicFrame − 4):

| # | Gesto | Propriedade | Curva | Peso |
|---|---|---|---|---|
| 1 | Anel nasce | opacity 0→1 · scale .96→1 | settleSoft 20q | 5 (anel-nasce) |
| 2 | Item sobe | scale 1→**1,02** (e nada mais) | settleSoft 20q | 0 |
| 3 | Vizinhos recuam | opacity 1→.45 · blur 0→6 · tinta gray400 | smooth 20q | 0 |
| 4 | Hold imóvel | — | ≥60q | 0 |

**Errado (o "pulinho"):** scale 1→1,15→1 com bounce, vizinhos intactos, pulso de
repouso depois. Chama atenção para o movimento, não para o item. É a assinatura
de motion genérico e está proibido.

Regra: em destaque, **overshoot é proibido — inclusive `overshootMicro`**, que
fica reservado à confirmação (check ≤48px) e a mais nada. Se a atenção precisa
de mais força, sobe o **peso** (mais recuo dos vizinhos, hold mais longo), nunca
a amplitude.

---

## 8d. Transições — quando um sai e outro entra

Nada some em corte, nada aparece pronto. Entre dois estados existe uma **passagem**
com ordem fixa: o que sai **desfoca e recua antes de apagar**; o que entra
**chega presente e só depois fica nítido**. Blur é profundidade; opacidade é presença.

### Ordem das propriedades dentro da passagem
```
SAÍDA  (easy 24q)        blur 0→6 ........ [0%,100%]
                         scale 1→1,02 .... [0%,100%]
                         opacity 1→0 ..... [30%,100%]   ← espera ~7q: recua, depois apaga
ENTRADA (settleSoft 24q) opacity 0→1 ..... [0%,60%]     ← presente em ~14q
                         scale .98→1 ..... [0%,100%]
                         blur 6→0 ........ [0%,100%]    ← nitidez assenta por último (lente)
```
Rótulo que precisa ser lido: blur máximo 2 na entrada, 0 na saída de leitura.

### Tabela de passagens
| Passagem | Quem sai | Quem entra | Overlap | Peso |
|---|---|---|---|---|
| Cena → cena | easy 24q · blur 0→6 · scale 1→1,02 · opacity a partir de 30% | settleSoft 24q · opacity até 60% · blur 6→0 · scale .98→1; começa no 14º q do out | 10q | 6 (só o in soa) |
| Foco A → B | A recua: opacity 1→.45 · blur 0→4 · tinta gray400 · smooth 20q | B acorda: .45→1 · blur 4→0; anel interpola x,y,w,h,r | 20q (simultâneo) | 3 |
| Substituir no lugar | easy 10q · y −6px · blur 0→4 · opacity 1→0 | settle 14q · y +6→0 · blur 6→0 | 6q | 3 |
| Item removido | easy 14q · opacity 1→0 · blur 0→4 · scaleY 1→.96 (origem top) | vizinhos fecham: inertia 20q, do 8º q da saída | 6q | 4 |
| Item inserido | vizinhos abrem o vão: inertia 20q | settle 20q · entra pelo lado de onde vem, do 10º q do vão | 10q | 3 |
| Legenda palavra → palavra | dita: gray600 · opacity .8 · blur 0 · atraso 10q | nova: settle 12q · blur 2→0 | — | 0 |
| Painel → close | contexto: blur 0→8 · opacity 1→.6 · smooth 30q | câmera scale 1→1,2 no alvo, mesmo intervalo | 30q | 5 |
| Estado → estado | forma antiga: opacity 1→0 em 8q | nova: smooth 12q · sem blur (mesmo objeto) | 8q | 4 |

### Errado (o que o gerador tende a fazer)
- Corte seco: A some e B aparece no mesmo quadro.
- Tela vazia: A apaga inteira, nada, B entra.
- A **desaparece** ao perder o foco (perde-se a comparação). A recua, nunca some.
- Anel teleporta em vez de interpolar.
- Substituição com scale 1→0,6 / 0,6→1 e bounce: zoom sem profundidade, texto deformado.
- Duas camadas desfocadas na mesma cena; fundo com blur.

### Blur e opacidade — quem faz o quê
- **Blur = profundidade**: 0 plano da atenção · 4 recuado (ainda legível) · 6 fundo/saída · 8–12 "veio de trás" (letra, lettering).
- **Opacidade = presença**: 1 em cena · .8 dito (gray600) · .45 recuado · .6 fundo · 0 fora. Nunca <.45 para algo que ainda importa.
- Rótulo lido não desfoca: recuo de rótulo é tinta + opacidade.
- Fundo tem blur 0; o desfoque é do objeto que recua.
- Quem entra vem de trás (blur→0, .98→1), nunca de cima (>1,04) nem de fora (>16px).
- Um som por passagem: fica o da cena com informação nova.

---

## 8e. Números — acelera e freia nos últimos dígitos

Um contador nunca anda em linha reta. Parte rápido, atravessa o meio em
velocidade e nos últimos ~30% do tempo só os dígitos finais ainda mudam, até
**travar** no valor exato. O ding (peso 5) marca o quadro em que ele **para**.

Duas fases, como no After — **cabeça** (acelera e desacelera) e **cauda** (os
últimos valores aparecem um por um, cada passo mais lento):

```
K       = min(18, |to − from|)                 passos finais, 1 em 1
gaps[i] = round(1 + i × 0,45), i = 0..K−1      1,1,2,2,3,3,4,4,5,5,6,6,6,7,7,8,8,9q (Σ = 87q)
head    = max(8, dur − Σgaps)                  easeInOut de from até (to − K)
tail    = (to − K) + (i+1) a cada gap          número por número até travar
dur     = 90q (≥1.000) · 72q (≥100 ou ano) · 48q (<100)   → a cauda é ≥ metade do tempo
start   = tonicFrame − 6
ding    = peso 5 no 1º quadro em que valor === to
hold    ≥ 60q depois de travar
60fps   = frame inteiro sempre; nunca interpolar entre quadros
fonte   = tabular-nums · letter-spacing −.04em (a largura não pode pular)
```
Implementação: `counterAE()` em motion.ts.

| Natureza | Regra |
|---|---|
| **Dinheiro** `R$ 0 → R$ 2.997` | parte de 0 · prefixo entra fixo antes · separador de milhar desde o 1º quadro em que existe · centavos só se o argumento for centavos |
| **Quantidade** `0 → 1.240 alunos` | parte de 0 · unidade entra junto, legível e imóvel · inteiro sempre |
| **Ano** `1998 → 2026` | **nunca parte de 0 nem de 1900**: parte de um ano anterior plausível · passo 1 · distância curta → 40q |
| **Porcentagem** `0 → 87%` | parte de 0 · anel/barra cresce no **mesmo** brake · símbolo % fixo |
| **Queda** `3.200 → 890` | mesma curva · som grave-seco (6) · tinta não muda (não é erro, é fato) |
| **Comparação** | dois contadores: o segundo começa quando o primeiro trava (+8q), nunca juntos |

**Errado:** curva única até o fim (o número "escorrega" e trava sem mostrar os últimos valores); velocidade constante (linear) e parada seca — lê como máquina; sem
tabular-nums a largura treme; sem freio o olho não sabe que chegou; ano partindo
de zero; contagem com som durante o percurso (é peso 0 em curso, 5 ao travar).

---

## 9. Anatomia de cena (as 6 fases, com quadros)

```
[in]     contexto entra           opacity 0→1 · scale .98→1 · blur 6→0 · settleSoft 12–18q
[build]  estrutura em cascata     settle 20q · step 4q (teto §5.2)
[act]    a ação narrada           1 gesto · começa em t−6q da palavra tônica
[focus]  anel único               smooth 20–24q · recuo do anterior no MESMO intervalo
[hold]   sustentação              ≥60q + 12q/palavra extra · IMÓVEL (só ken-burns em imagem)
[out]    saída junta              opacity 1→0 · scale 1→1,02 · blur 0→6 · easy 24q
```
Overlap entre cenas: 10q. O foco é liberado no **1º quadro** de `[out]`.
Um gesto por fase `[act]`. Dois gestos simultâneos = nenhum é lido.

---

## 10. Failure modes (o que quebra e a correção exata)

| Sintoma | Causa real | Correção |
|---|---|---|
| "Cortou antes de terminar" | hold calculado por duração de cena, não por leitura | `hold = 60 + max(0, palavras−4)×12`; a cena estica, não o texto encolhe |
| "Movimento sempre igual" | verbo da fala não foi classificado → cai no default `reveal` | passar pela tabela §6 **antes** de escrever a cena; anti-repetição §6.1 |
| "Fora de sincronia" | sincronizado pelo início da frase | sincronizar por `tonicFrame`, gesto em t−6q (§4) |
| "Stagger errado" | step fixo com muitos irmãos | teto `min(step, 24/(n−1))` (§5.2) |
| "Movimento grosseiro" | amplitude grande + curva simétrica | desloc. ≤16px, scale ≤1,04, curva por intenção (§2.3) |
| "Entrada dura" | escala partindo de valor baixo, sem blur | scale .98→1 **com** blur 6→0; nunca .85→1 |
| "Foco pula" | dois donos de foco / remount do anel | `ownerId` único, um só nó de anel interpolado |
| "Cartão se desmonta" | filhos animando junto com o pai | parenting: wrapper anima, filhos estáticos (§5.4) |
| "Cena parece lenta" | cascata longa + hold longo somados | teto de cascata; hold conta a partir do **fim** da cascata |
| "Layout quebra com texto maior" | largura medida com fonte não carregada | `document.fonts.ready` antes de medir; `nowrap` + `maxWidth` |

---

## 11. Determinismo (não negociável no Remotion)

```
propriedade = f(inputs, frame)
```
Proibido: `Date.now`, `Math.random`, `setInterval`, `requestAnimationFrame`,
estado incremental, `useState` para animar. Intervalos são **[início, fim)**.
`extrapolateLeft/Right: 'clamp'` sempre — clamp é o hold antes e depois.
Fontes carregadas antes de medir. Assets com versão fixada.

---

## 12. Checklist de aprovação de cena (10 itens)

1. O verbo da fala foi identificado e consta em §6?
2. O gesto é diferente do gesto da cena anterior?
3. A natureza do objeto (§8) foi respeitada acima do gesto?
4. `startFrame` está ancorado em `tonicFrame`, não no início da frase?
5. Duração = classe × massFactor × peso, arredondada uma vez?
5b. Todo gesto tem peso 0–10 declarado e a soma da cena é ≤ 22?
6. Cascata dentro do teto de 24q?
7. Só **um** dono de foco?
8. Hold ≥ 60q + 12q por palavra além de 4?
9. Amplitude ≤16px / ≤1,04 (ou ≤1,06 se `dramatico`)?
10. Teste de subtração: removendo blur, scale, stagger e rotação um a um — o que
    não muda a compreensão **sai**.

---

## 12b. Pipeline fala → cena (o que o gerador executa, nesta ordem)

| # | Passo | Faz | Produz |
|---|---|---|---|
| 1 | **Words** | transcrição alinhada; cada palavra com startFrame, endFrame, **tonicFrame** (onset da sílaba tônica) | `WordTiming[]` |
| 2 | **Beats** | agrupar em unidades de sentido de 2–5s; corta em conjunção, pausa ≥20q ou mudança de sujeito; beat <90q funde | `Beat[]` |
| 3 | **Verbo** | classificar pelo léxico abaixo; **um** verbo principal; secundário vira acento (§6b6 do guia) | `verb, tonicWord` |
| 4 | **Molde + natureza** | verbo → relação (diagram-registry) → molde; cada objeto recebe natureza (§8) | `mold, objects[]` |
| 5 | **motionSpec** | gesto, curva, start = tonic + offset, dur = classe × massa × peso, stagger com teto, hold pela leitura, peso 0–10 | `MotionSpec[]` |
| 6 | **Validar + emitir** | validateScene + validateVideo; só então o componente, usando **só** helpers de motion.ts | `SceneNN.tsx · spec.json · sfx.json` |

### Léxico fala → verbo (primeira ocorrência decide; adversativa > número > esquema > lista)
| A fala contém | Verbo | Gesto | Molde provável |
|---|---|---|---|
| "mas", "porém", "só que", "o problema é" | romper | quebra | compare.ab · gap |
| número falado, "R$", "por cento", "vezes", "em X minutos" | medir | contador | number.hero · chart |
| "primeiro… depois… por fim", "etapa", "passo" | construir | cascata + foco | process.steps |
| "porque", "então", "leva a", "gera", "resulta em" | conectar | tracado | relation.cause-effect |
| "ou", "versus", "em vez de", "ao contrário de" | comparar | confronto | compare.ab · table |
| "se divide", "três caminhos", "tipos de" | construir | cascata raiz→folha | branch.tree |
| "poucos passam", "filtra", "só quem" | cair | desaba | flow.funnel · filter |
| "cresce", "sobe", "aumenta", "escala" | crescer | sobe | chart.growth · scale |
| "cai", "perde", "desaba", "some" | cair | desaba | chart · number |
| "envia", "manda", "publica", "clica" | enviar | envio | interface.form · chat |
| "pronto", "feito", "aprovado", "confirmado" | confirmar | confirmacao | interface.check |
| "contém", "dentro de", "faz parte" | expandir | expande dentro→fora | relation.concentric |
| "imagina", "olha isso", "por exemplo" | revelar | reveal | evidence · interface |
| nome do produto / conceito-chave, 1ª vez | nascer | materializa | N3 palavra · selo |

### Exemplo completo
Fala: *"Você organiza o conhecimento em oito minutos, **mas** vende a mentoria por dois mil novecentos e noventa e sete."*
```
1 words    orgaNIza 42q · MInutos 118q · MAS 150q · vende 168q · noVEnta e SEte 262q
2 beats    B1 [0,150) "organiza…minutos" · B2 [150,300) "mas vende…997"
3 verbs    B1 medir (oito minutos) · B2 romper (mas) + medir (2.997) → principal = quebra
4 scene    B1 contador "8 min" · B2 quebra + contador "R$ 2.997"
5 spec     B1 contador  start 112 (118−6) · counterAE 0→8 · peso 0 em curso, 5 ao travar (148)
           B2 quebra    start 144 (150−6) · anticipate 16q · peso 7
           B2 contador  start 168 (após a quebra) · counterAE 0→2997 · 90q · peso 5 (trava 258)
           B2 hold      ≥60q após 258 → fim ≥318 · overlap 10q com a próxima
6 validate soma B2 = 12 ≤ 22 ✓ · um ≥7 ✓ · B1≠B2 ✓ · quantidade→brake ✓
```

### Fallbacks obrigatórios
| Quando | Então |
|---|---|
| Sem tonicFrame | não animar o [act]: hold estático do estado final; registrar `sync.missingTonic` |
| Duas tônicas a <40q | fundir: gesto na primeira; a segunda vira acento (cor/anel) |
| Beat <90q | fundir com o vizinho de mesmo verbo; se diferem, fica o mais pesado |
| Beat >300q sem novo verbo | dividir em [act] + [focus] migrando entre objetos a cada tônica |
| Texto maior que o molde | reduzir até 22px; depois cortar texto — nunca o hold |
| Soma de pesos >22 | rebaixar o gesto de menor informação para 0 |
| Mesmo verbo da cena anterior | trocar enquadramento (close ↔ palco) e peso; gesto permanece |

### Entregáveis por cena
`scene-NN.spec.json` (MotionSpec[] validado) · `SceneNN.tsx` (só helpers de motion.ts, nenhum easing literal) · `scene-NN.sfx.json` (frame + peso + id do sfx-map, derivado) · `scene-NN.check.md` (checklist marcado + o que o teste de subtração removeu).

---

## 12c. Horizontal (1920×1080) — Transformar: a pessoa cede espaço, não sai

No vertical o molde cobre a pessoa. No 16:9 a tela é larga: quando o motion
entra, a imagem **se transforma** — recorta até o rosto, desliza para um lado e o
molde ocupa o outro. Um único movimento (o "Transformar" do OBS), com curva,
massa e tempo deste sistema.

```
TRANSFORMAR  (reframe · peso 5)
start   = tonicFrame − 18            é [in]: antecipa o contexto
dur     = 30q · smooth               massFactor 1,4 já incluso
mask    = clip-path inset(t r b l) round r
          de   inset(0 0 0 0) round 0
          para faceBox ± margem 8% · r 28px
camera  = scale 1 → 1,08–1,14 · transform-origin = centro do rosto
          translate para o rosto cair no terço do lado escolhido
veil    = fundo do sistema (#f5f5f7) opacity 0 → 1, mesmo intervalo
molde   = enterStaged em start+20 · lado oposto ao rosto
pessoa  = imóvel depois de assentar · ken-burns ≤1,02 no hold
VOLTA   = mesmo caminho invertido · easy 24q · molde sai 10q antes
```
Máscara, câmera e véu **no mesmo intervalo**. Errado: corte seco na máscara,
câmera parada, painel entrando de fora com bounce — parecem duas mídias coladas.

### Regras 16:9
| | |
|---|---|
| **Lado** | rosto vai para o lado onde já está; centrado → esquerda (leitura). Nunca troca de lado no mesmo beat |
| **Proporção** | rosto 36–42% da largura · molde 46–52% · gutter 6% · rosto nunca <640px de altura |
| **Olhar** | câmera desloca para o rosto olhar *para* o molde (espaço negativo do lado do molde) |
| **Molde** | slot horizontal: mesmo molde, tipografia 0,85×, itens em coluna única; cascata começa do lado do rosto |
| **Legenda** | sob o rosto, dentro da máscara; não cruza para o lado do molde |
| **Encadeado** | molde A → B com máscara fechada: só o molde troca (§8d cena→cena). A máscara não reabre entre beats vizinhos |
| **N3 / número-herói** | não recorta: véu escuro (#1d1d1f .6, smooth 24q) e a palavra materializa no centro |

### Estados do palco horizontal
| Estado | Pessoa | Transição para cá | Peso |
|---|---|---|---|
| Palco cheio | plano inteiro, legenda embaixo | volta do Transformar, easy 24q, molde sai 10q antes | 4 |
| Rosto + molde | recorte 36–42% num lado, imóvel | Transformar: máscara+câmera+véu, smooth 30q, tonic−18 | 5 |
| Rosto pequeno + palco | recorte 22% num canto (1:1, r 24), molde 70% | máscara e câmera continuam (inertia), molde reflui | 4 |
| Escurecido (N3) | plano inteiro sob véu .6 | véu smooth 24q · palavra materializa | 9–10 |

Implementação: `transformStage()` em motion.ts (`orientation: 'landscape'` no motionSpec).

---

## 13. Prompt-block (colar no Claude Code / Astra)

```
Antes de gerar qualquer cena Remotion deste projeto, siga o pipeline §12b (Words → Beats → Verbo → Molde → motionSpec → Validar):
0. Exija WordTiming com tonicFrame. Sem ele: hold estático, sem [act].
1. Classifique o verbo da fala pelo léxico §12b e escolha o gesto na tabela INTENÇÃO→MOTION (§6 do MOTION-MANUAL).
2. Verifique a natureza do objeto (§8). Natureza vence gesto em caso de conflito.
3. Atribua peso 0–10 a cada gesto (§3b). Duração = classe (§3) × massFactor (§1) × fator do peso. Soma da cena ≤ 22. Arredonde uma vez por evento.
4. startFrame do gesto principal = tonicFrame − 6. Foco = tonicFrame − 4. Check = tonicFrame + 2.
5. Stagger = min(stepBase, 24/(n−1)).
6. hold = 60 + max(0, palavras−4)*12.
7. Use SOMENTE easings de motion.ts. Overshoot só via overshootMicro/elasticSoft, ≤120px, 1 por cena.
8. Nenhum gesto principal se repete em cenas adjacentes.
9. Emita o motionSpec de cada objeto e valide contra motion-spec.schema.json.
10. Determinismo: f(inputs, frame). Nada de Date.now/Math.random/estado.
11. Se orientation = landscape: todo molde entra via transformStage() (§12c). Rosto num lado, molde no outro; máscara, câmera e véu no mesmo intervalo; N3 não recorta, escurece.
```
