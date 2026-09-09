# DIREÇÃO DINÂMICA: estrutura e momento do vídeo

### v1.0 · 08/09/2026 · formato `vertical-mao` · companheiro do MOTION-MANUAL e do guia visual

> **O visual continua sendo o do design system.** Fundo branco do sistema, cinzas, traço §9c,
> N1/N2/N3, ênfase por troca de fonte, espectro só no fecho, um portador de cor por quadro.
> Este manual não muda nada disso. Ele decide **estrutura** (o que ocupa a tela) e **momento**
> (quando troca). Onde este manual e o guia visual discordarem sobre aparência, o guia visual vence.
>
> Origem: leitura quadro a quadro de uma peça de referência externa (08/09/2026), guardada em
> `squads/motion/aprendizado/referencias-externas/2026-09-08-fernando-direcao-dinamica/`.
> Dela veio a estrutura, nunca a estética.

---

## 0. Formato antes de esquema

Nenhuma decisão de cena começa sem os dois eixos resolvidos. Formato errado faz o esquema certo
parecer errado.

| Eixo | Valores | Como decidir |
|---|---|---|
| **tipo** | `reels-call` · `vertical-mao` · `aula` | tem dois vídeos de gente conversando? `reels-call`. É uma pessoa só, gravada de frente, falando pra câmera? `vertical-mao`. É gravação longa de ensino, com tela compartilhada? `aula`. |
| **orientação** | `vertical` (padrão) · `horizontal` | `vertical` sempre, menos quando o destino pede 16:9 (YouTube longo, apresentação, tela de evento). O objetivo decide, nunca o hábito. |

### O que muda por formato

| | `reels-call` vertical | `vertical-mao` vertical | qualquer tipo em horizontal |
|---|---|---|---|
| Rosto | dois cartões empilhados no topo | um bloco embaixo, ocupando a metade de baixo | um lado da tela (`transformStage`, MOTION §12c) |
| Legenda | faixa própria entre vídeo e palco | **na costura** entre esquema e rosto | sob o rosto, dentro da máscara |
| Palco | abaixo da legenda | acima da costura (é o esquema) | o lado oposto ao rosto |
| Estados | os 4 do `design-router.json` | os 3 deste manual (§1) | os 3 deste manual, girados (§1.4) |
| Gabarito | `dois-videos-palco` | §1 deste manual | `colunasWide` de `core/layout.ts` |

`reels-call` continua como está: este manual não mexe nele. `aula` não usa estados de palco, usa o
recorte da própria gravação.

---

## 1. Os três estados de palco do `vertical-mao`

Canvas 1080x1920, 60fps. Um estado por beat. A alternância entre eles é a direção dinâmica.

### 1.1 Estado A, dividido (o estado de trabalho)

```
ESQUEMA   y 0     altura 1039   molde, interface, imagem ou cena composta
COSTURA   y 1039  altura  122   a legenda vive aqui (a mesma faixa do reels-call)
ROSTO     y 1161  altura  759   face-cam, sem recorte e sem máscara
```

As três somam 1920 exatos, sem sobra e sem sobreposição. O
`scripts/testes/testa-palco.js` confere essa soma e reprova: um pixel de folga
aqui vira uma linha clara na costura no vídeo renderizado.

O título curto mora dentro da faixa do esquema, no topo (y 96 a 200), acima do conteúdo. O rosto
nunca é coberto, nunca recebe overlay, nunca é recortado. É o único estado em que ele aparece.

### 1.2 Estado B, herói (tela cheia escura)

Palco `darkened` (MOTION §12c): o fundo escuro do sistema ocupa a tela inteira, o rosto some por
completo. No centro óptico entra **N3** (a palavra-conceito) ou uma frase de 2 a 4 palavras. Sem
legenda, sem título, sem esquema. Pode ter um símbolo pequeno acima (N1) ou uma imagem de metáfora
abaixo, nunca os dois.

Peso 7 a 10 (MOTION §3b). É o estado mais caro do vídeo: usar pouco e com intenção.

### 1.3 Estado C, cinético (tela cheia clara)

Fundo branco do sistema na tela inteira, rosto some. A frase do beat aparece **palavra a palavra**
no centro óptico, em N2. A palavra tônica recebe a ênfase do sistema (troca de fonte); quando a
marca tiver acento declarado, a tônica também ganha a caixa de acento e a palavra seguinte a mesma
caixa a 35% de opacidade. Pode ter um elemento pequeno de interface abaixo (uma entrada digitando,
um logo), nunca um molde inteiro.

Peso 5 a 8. É o estado da tese: a fala vira o conteúdo, não há legenda separada.

### 1.4 Os três estados em horizontal

Mesmos três, girados. A vira `transformStage`: rosto num lado (36 a 42% da largura), esquema no
outro, legenda sob o rosto dentro da máscara. B e C não recortam nada: ocupam a tela inteira igual
ao vertical, com o texto no centro óptico do 16:9. A regra de alternância (§2) é idêntica.

---

## 2. Regra de alternância (o que impede o vídeo de virar slideshow)

1. **O rosto volta em até 480 quadros (8s).** Passou disso sem estado A, a peça está reprovada.
2. **Nunca dois B seguidos**, a não ser que sejam a continuação da mesma frase (a frase quebrada em
   dois beats por respiro).
3. **C nunca abre o vídeo.** O primeiro beat é sempre A: quem fala precisa aparecer antes de
   qualquer tese.
4. **Abre em A com o gancho, fecha em A com o CTA.** Quem pede a ação é a pessoa, não a tipografia.
5. **B mais C somam entre 30% e 45% do tempo.** Abaixo de 30% o vídeo é uma cabeça falante com
   apoio; acima de 45% a pessoa some e vira motion genérico.
6. **Estado não se repete três vezes seguidas.** A A A é aceito só quando o título persistente (§4)
   está trocando; sem título novo, três A seguidos é cena parada.

---

## 3. Função narrativa do beat (a regra do direcionamento dinâmico)

Aqui mora a diferença entre um sistema que ilustra palavras e um que dirige um vídeo. O estado de
palco não sai do assunto do beat: sai do **papel que aquele beat cumpre no arco**.

Treze papéis. Um beat tem exatamente um.

| # | Papel | Estado padrão | Alternativo | Peso | O que ocupa a tela | Gatilho de fala |
|---|---|---|---|---|---|---|
| 1 | `gancho` | A | A | 6 | esquema do produto ou do problema, com título | primeira fala; "olha isso", "acabou de sair", nome do produto |
| 2 | `tensao` | B | C | 7 | N3 ou frase curta: a inquietação | "tem uma coisa", "só que", "mas", "o problema é" |
| 3 | `experimento` | A | A | 5 | interface em uso, digitação, resposta | "comecei a testar", "fui lá e", "pedi pra ele" |
| 4 | `dor` | A | B | 6 | esquema do jeito antigo, título persistente | "antes", "pouco tempo atrás", "precisaria", "tinha que" |
| 5 | `epifania` | B | B | 8 | N3 isolada: a virada | "caiu a ficha", "aí eu entendi", "foi quando" |
| 6 | `tese` | C | B | 7 | frase cinética palavra a palavra | "a verdade é", "na real", afirmação sem hedge |
| 7 | `mecanismo` | A | C | 5 | esquema de causa e efeito, traçado | "porque", "funciona assim", "se você X então Y" |
| 8 | `implicacao` | C | B | 6 | frase cinética: o que muda | "isso muda", "significa que", "ou seja" |
| 9 | `reenquadramento` | C | B | 7 | frase cinética com elemento pequeno de interface | "uma nova forma", "não é X, é Y", "na verdade" |
| 10 | `contraste` | A | A | 6 | esquema comparativo ou "muitos vira um" | "em vez de", "versus", "não precisa mais", número contra número |
| 11 | `habilidade` | A | C | 5 | esquema de lista ou metáfora, com título | "vai ser", "o que importa é", "a habilidade" |
| 12 | `prova` | A | A | 6 | evidência: print, linha do tempo, o próprio vídeo | "quer uma prova", "esse vídeo", "olha o resultado" |
| 13 | `cta` | A | A | 6 | botão de ação e marca | "entra pra", "clica", "link na bio", "vem pro" |

Como usar: o `beats.js` propõe o papel pelo gatilho de fala; o R3 confirma ou troca. Papel decide
estado; estado filtra os recursos possíveis; só então o molde é escolhido pelo verbo
(MANUAL-DE-ESCOLHA e MOTION §6). Nesta ordem, nunca ao contrário.

**Arco típico de 45s:** gancho, tensão, experimento, dor, epifania, tese, mecanismo, implicação,
reenquadramento, contraste, habilidade, prova, cta. Nem todo vídeo tem os treze; a ordem é que
importa. Papel repetido em beats vizinhos é sinal de que os dois eram um só.

---

## 4. Título persistente (a economia que faz parecer mais cenas)

Quando dois ou três beats vizinhos falam do mesmo assunto (`topic` igual), **o esquema fica parado e
só o título troca**. É a ideia mais barata deste manual e a que mais rende.

- Título é frase de 2 a 4 palavras, com ponto final, no topo da faixa do esquema.
- Troca em t menos 6q da tônica do beat novo (MOTION §4), com a passagem "substituir no lugar"
  (§8d): sai 10q subindo 6px, entra 14q vindo de baixo, overlap 6q.
- **Máximo 3 títulos por esquema.** No quarto beat, o esquema troca ou o estado muda.
- Enquanto o título troca, o esquema pode receber um acento discreto (um anel de foco migrando, um
  item acendendo), nunca uma reconstrução.
- O primeiro título entra junto com o esquema; os seguintes entram sozinhos.

Sem isso, o sistema troca de molde a cada beat e gasta o catálogo inteiro em 40 segundos.

---

## 5. Legenda, título e frase são três coisas diferentes

| | Legenda | Título | Frase cheia |
|---|---|---|---|
| Onde | costura do estado A (y 1039, altura 122) | topo do esquema, estado A | centro óptico, estados B e C |
| O quê | a fala corrente, palavra a palavra | resumo editorial do beat | a fala do beat inteiro |
| Tipografia | sans do sistema, regular | sans do sistema, bold | N2 (C) ou N3 (B) |
| Ênfase | troca de fonte em no máximo 1 palavra | nenhuma | tônica por fonte, e caixa de acento se a marca tiver |
| Existe em | só A | só A | só B e C |

Nunca as três ao mesmo tempo. No estado A existem legenda e título; em B e C existe só a frase.

---

## 6. Momentos de interface (o repertório de "o que aparece em cima")

Traduzidos para o traço do sistema: cinza do sistema, sem logo real, sem cor de app
(regra "o app real é colorido, a simulação não").

| Momento | O que é | Gesto (MOTION §6) | Peso | Quando |
|---|---|---|---|---|
| Entrada que digita | campo de texto com cursor e botão de enviar | `digitacao` (linear, 1,5q por caractere) e depois `envio` (anticipate) | 2 e 6 | fala descreve pedir algo a um sistema |
| Resposta com check | cartão que chega e confirma | `reveal` mais `confirmacao` (overshootMicro até 48px) | 6 | fala descreve o resultado chegando |
| Abas que trocam | linha de 2 a 4 abas, a ativa em destaque | `troca` (smooth 20q, overlap 6q) | 3 | fala compara contextos ou muda de área |
| Muitos vira um | grade de N chips que preenche em cascata e **colapsa** numa entrada só | `cascata` (teto 24q) e depois `remove` com `inertia` | 3 e 6 | fala contrapõe muitas ferramentas a uma só ação |
| Linha do tempo | 3 trilhas com playhead avançando | `rolagem` (inertia) | 1 | fala trata de edição, processo ou progresso |
| Botão de ação | botão único com seta | `anticipate` 12q | 6 | CTA, e só no CTA |

"Muitos vira um" é esquema novo, nascido daqui: é a forma visual do argumento "você não precisa
mais de N coisas". Vale para ferramenta, etapa, profissional, custo.

---

## 7. Slot de imagem de metáfora

**Fala concreta sobre ferramenta ganha esquema. Fala abstrata ganha metáfora.** Esta é a linha.

Dois tipos:

1. **Render**: objeto único, fundo do sistema, luz suave, sem cena complexa. Exemplos de uso:
   barreira que se desfaz, objeto que se transforma em outro, algo pequeno na palma da mão.
   Entra com `materializa` (elasticSoft, máximo 1 por cena), peso 7 a 10.
2. **Recorte da pessoa**: o próprio o dono do canal em preto e branco, recortado, com um adereço mínimo
   (um balão de fala, um objeto simbólico). Serve pra encarnar a ideia sem gravar de novo. Entra com
   `reveal`, peso 6, ken-burns até 1,02 no hold.

Como pedir: `docs/rules-on-demand/prompt-imagem-criativo.md` (prompt em inglês, texto da arte em
português). **Custo:** gerar imagem por IA é escolha do o dono do canal, com o valor na frente
(`gasto-imagem-gate`). Enquanto não houver imagem aprovada, o slot fica com o ícone equivalente do
sistema em escala, que é como o design system já resolve metáfora hoje.

Quando NÃO entra: fala sobre passo, ferramenta, número, comparação ou processo. Isso é esquema.

---

## 8. Acento por marca

Um acento por peça, vindo de `templates/design-tokens/*.json`. Nunca inventado na composição.

- **Peça Zeus:** a ênfase é por **troca de fonte**, e o destaque estrutural usa `--black` (#1d1d1f)
  com texto claro. O espectro continua só no fecho. A regra "texto colorido não existe no sistema"
  segue de pé.
- **Peça de cliente:** o acento é a cor da marca dele. A caixa de destaque na tônica usa o acento
  sólido; a palavra seguinte, o mesmo acento a 35%. Um acento só, no vídeo inteiro.
- A referência externa usa amarelo. Amarelo é um valor válido de acento para cliente que use
  amarelo, e nada além disso.

---

## 9. Repertório de direção dinâmica (catálogo aberto)

O que dá pra fazer além dos seis momentos do §6. Cada ideia com quando usar, estado e peso.
Lista viva: ideia nova aprovada entra aqui.

| # | Ideia | Quando | Estado | Peso |
|---|---|---|---|---|
| 1 | **Anel que migra** enquanto o título troca: o esquema fica, o foco anda de item em item na tônica de cada beat | processo de 3 passos numa fala corrida | A | 3 |
| 2 | **N3 que nasce do título**: a última palavra do título do estado A cresce e vira a palavra-herói do B seguinte | virada logo depois de uma explicação | A para B | 8 |
| 3 | **Contador que trava** no estado B: o número sobe e crava, o resto da tela vazia | número que é o argumento | B | 5 (0 durante) |
| 4 | **Esquema que vira metáfora**: o ícone do esquema cresce, perde a moldura e vira a imagem de metáfora | passagem do concreto para o abstrato | A para B | 7 |
| 5 | **Ken-burns no recorte**: a foto recortada respira 1,02 durante o hold, o resto imóvel | fala longa sobre a pessoa ou a ideia dela | B | 4 |
| 6 | **Costura que sobe**: no fim do beat A, a linha da costura sobe e o rosto ganha a tela antes do corte | encerramento de bloco, respiro antes do próximo assunto | A | 4 |
| 7 | **Frase que se completa**: a mesma frase começa no C e termina no B (claro para escuro) com a palavra final isolada | tese que vira epifania | C para B | 8 |
| 8 | **Acento de passagem**: variante de interface entra por 40 a 60q dentro de um beat de outro assunto, sem trocar o molde | menção rápida a uma plataforma | A | 2 |
| 9 | **Comparação alternada**: dois focos no mesmo esquema, um por vez, nunca os dois acesos | "isso ou aquilo" | A | 3 cada |
| 10 | **Grade que colapsa** (§6) | muitos contra um | A | 3 e 6 |
| 11 | **Título que fica e esquema que troca** (o inverso do §4): a frase permanece e o que ilustra muda | mesma afirmação com duas evidências | A | 5 |
| 12 | **Cena composta** (§11): não existe recurso pronto, o sistema monta a partir de primitivas | fala descreve um processo que o catálogo não tem | A | conforme os gestos |
| 13 | **Barra de progresso na borda**: 2px na base, linear, o vídeo inteiro | peça acima de 30s | todos | 0 |
| 14 | **Respiro escuro**: 8 a 12 quadros de tela escura entre dois blocos de assunto, sem texto | mudança de capítulo dentro do vídeo | B | 4 |

---

## 10. Checklist de aprovação do `vertical-mao`

1. Todo beat tem papel narrativo declarado?
2. O estado de cada beat saiu da tabela §3 (papel), não do assunto?
3. O rosto volta a cada 480 quadros ou menos?
4. Abre em A com o gancho e fecha em A com o CTA?
5. B mais C ficam entre 30% e 45% do tempo?
6. O título persistente foi usado pelo menos uma vez (esquema parado, título trocando)?
7. Esquema só em fala concreta, metáfora só em fala abstrata?
8. Um acento só, vindo dos tokens da marca?
9. Legenda na costura no estado A, e ausente em B e C?
10. Barra de progresso na borda, se a peça passa de 30s?

Falhar em qualquer um: a peça não está pronta, mesmo bonita.

---

## 11. Cena sob demanda (quando não existe recurso pronto)

A capacidade que separa ilustrar palavra de dirigir vídeo. Quando a fala descreve um processo que o
catálogo não cobre ("baixa o zip, abre no Claude Code e coloca o Zeus"), o sistema **compõe** a cena
a partir de primitivas atômicas, no traço do sistema, sincronizada com a transcrição. Não inventa
estética: combina peças que já obedecem ao design system.

### Os cinco passos

**1. Da fala saem objetos e verbos.** Substantivo nomeado vira objeto; o verbo sai do léxico do
MOTION §12b. "Baixa o zip, abre no Claude Code e coloca o Zeus" produz três objetos (arquivo,
janela, item) e três verbos (baixar, abrir, colocar).

**2. Cada objeto vira uma primitiva atômica.** Catálogo fechado de doze, todas em cinza do sistema,
traço §9c, sem logo real e sem cor de app:

`janela` · `cartao` · `lista` · `item` · `campo` · `botao` · `arquivo` · `pasta` · `badge` · `seta`
· `passo` · `cursor`

Como mapear: nome de programa ou site vira `janela`; nome de arquivo, extensão ou download vira
`arquivo`; nome de pasta ou destino vira `pasta`; coisa que entra numa lista vira `item`; coisa que
se digita vira `campo`; coisa que se clica vira `botao`; confirmação vira `badge`.

**3. Cada verbo vira o gesto da tabela INTENÇÃO para MOTION (§6 do MOTION-MANUAL).**

| Verbo da fala | Gesto | O que se vê |
|---|---|---|
| baixar, salvar | `desaba` (gravity 18q) | o arquivo cai na pasta |
| abrir, iniciar | `expande` (settleSoft 22q) | a janela cresce e recebe conteúdo depois |
| colocar, instalar, adicionar | `empilha` (inertia 22q) | o item entra na lista, vizinhos deslocam, badge confirma |
| digitar, escrever | `digitacao` (linear, 1,5q por caractere) | o campo enche caractere a caractere |
| enviar, clicar, rodar | `envio` (anticipate mais gravity) | botão recua, dispara, o destino reage |
| escolher, selecionar | `foco` (smooth 20q) | o anel migra até o item |
| copiar, mover | `desloca` (smooth 20q, até 16px) | o item viaja de um lugar ao outro |
| apagar, remover | `remove` (easy mais inertia) | o item some, vizinhos fecham |

**4. Layout pela natureza (§8 do MOTION-MANUAL).** Processo em passos: cascata da esquerda para a
direita, anel único migrando na tônica de cada etapa. Janela: entra vazia e recebe conteúdo depois,
nunca já preenchida. Lista: item novo entra, vizinhos deslocam com `inertia`, nunca teleportam.

**5. Sincronia.** Cada objeto nasce em t menos 6q da palavra que o nomeia. O gesto acontece na
tônica do verbo. Hold pela regra de leitura (60q mais 12q por palavra além de quatro). Sem tônica
disponível, a cena não anima: vira hold estático do estado final.

### Print de apoio

Screenshot ajuda e nunca aparece. O print vira **wireframe no traço do sistema**: blocos cinza na
mesma posição relativa, e texto real só nos rótulos que a fala cita. Serve pra acertar posição e
hierarquia, não pra ser exibido. Print cru na peça é reprovação: quebra o §interface do guia visual
("o app real é colorido, a simulação não").

### Fallback e aprendizado

Sem primitiva que sirva, a cena vira N2 da frase (estado C). Nunca tela vazia, nunca um recurso
errado só porque era o que tinha.

Toda cena composta aprovada é registrada em `aprendizado/cenas-compostas.jsonl`. Quando a mesma
composição aparecer três vezes, ela vira recurso do `visual-registry`. O catálogo cresce do uso,
não da invenção.
