# Antes de escrever cena: as armadilhas que já custaram rodada

Este documento nasceu da produção do `AlineZeusReels` (05/09/2026), a primeira peça feita do
zero com o design system v2. Foram 11 tropeços numa produção só, e nenhum deles era falta de
talento visual: eram coisas que o código do squad JÁ sabe e que quem escreve a cena não
conferiu antes de escrever.

Quem lê isto: o Zeus de amanhã, antes de criar um componente de cena novo. Ler leva dois
minutos. Cada item abaixo custou entre 10 minutos e duas horas quando foi descoberto tarde.

A regra que resume o documento: **o que o gate reprova depois, um `cat` antes teria evitado.**

---

## 1. O vocabulário de som é FECHADO. Leia o catálogo antes de declarar gesto

`public/_sfx/catalogo.json` define, por categoria, exatamente quais gestos existem. Inventar
nome de gesto não gera som errado: gera 18 erros de `choreo-lint` de uma vez, e a correção é
reescrever todos os `SFX_EVENTS` da peça.

```bash
python -c "import json;d=json.load(open('public/_sfx/catalogo.json',encoding='utf-8'));[print(k,'->',list(v['gestos'])) for k,v in d['categorias'].items()]"
```

O que existe hoje, para consulta rápida:

| Categoria | Gestos válidos |
|---|---|
| `selo-marca` | entrada |
| `frase-grande` | entrada |
| `palavra-conceito` | entrada, traco |
| `numero-protagonista` | entrada, fechamento |
| `serie-itens` | item |
| `jornada` | partida, chegada |
| `interface-mensagem` | chega, abre, fechamento |

Se a cena nova não encaixa em nenhum par categoria mais gesto, a resposta certa quase sempre é
usar a categoria mais próxima com o gesto que já existe, não criar vocabulário. Som novo de
verdade só entra com aprovação do o dono do canal, uma peça por vez.

Caso real: uma cena de lettering de sete linhas queria um som por linha. A categoria
`frase-grande` só tem `entrada`, e está certa: sete sons num pôster de sete linhas seria
poluição sonora. A lista vazia (`SFX_EVENTS = []`) também é declaração válida quando a cena
não pede som.

---

## 2. `sfxPorGesto` indexa por GESTO, não por categoria mais gesto

Dois eventos no mesmo arquivo com o mesmo nome de gesto (por exemplo `selo-marca/entrada` e
`frase-grande/entrada`) colapsam: `SFX.entrada` devolve só o PRIMEIRO. O segundo componente
passa a animar no quadro errado, e nada acusa, porque o valor existe e é um número plausível.

Regra: se o arquivo repete um nome de gesto, os quadros dos demais entram como LITERAL no
código, com comentário dizendo por quê. Nunca `SFX.<gesto>` quando há repetição.

---

## 3. O primeiro som da peça precisa caber dentro do vídeo

O som é posicionado pelo PICO, não pelo início: o arquivo começa a tocar em
`quadro_do_gesto - tempo_de_pico`. Com o gesto no quadro 0, o áudio nasceria antes do vídeo, é
cortado, e a onda entra já no volume máximo. Resultado: o gate de pico global do
`mixar-final.js` reprova, e o `choreo-lint` avisa "o som começaria antes do início do vídeo".

Conta: `quadro_minimo = tempo_de_pico_em_segundos * 60`.

| Som | Pico | Quadro mínimo do gesto |
|---|---|---|
| `peso-06-whoosh-forte.wav` | 0,81s | 49 |
| `peso-07-whoosh-grave.wav` | 0,79s | 48 |
| `peso-04-whoosh-medio.wav` | 0,46s | 28 |
| `peso-10-whoosh-longo.wav` | 0,34s | 21 |
| `peso-03-ding.wav` | 0,21s | 13 |
| `peso-04-stamp.wav` | 0,02s | 2 |

Meio segundo de tela limpa antes do primeiro elemento é abertura normal de reel. Som cortado
não é.

---

## 4. `CONTENT_H` é a tinta real, e "toda linha" inclui as que não são texto

O valor declarado vira a ALTURA CSS da caixa. Se o conteúdo real for maior, ele vaza para fora
do cartão, e o defeito só aparece no print, nunca no lint.

O erro concreto: a conta do painel de chat somou cabeçalho e dois balões, e esqueceu a linha do
indicador de "digitando" no meio. Faltaram 116 pixels e o segundo balão saiu do vidro.

Como fazer a conta:

1. Somar TODA linha do fluxo, inclusive indicador, divisória e espaço entre irmãos.
2. Texto que pode quebrar entra pelo PIOR caso (duas linhas), não pelo caso feliz.
3. Somar o `padding` das duas pontas.
4. Conferir contra o orçamento do palco: 429 no normal, 499 no expandido.

---

## 5. Mais de um item com anel exige a regra do foco escrita desde o primeiro rascunho

O design system v2 é literal: um portador de cor por quadro. Componente com dois ou mais nós
que acendem anel precisa da lógica de recuo JUNTO, não depois: quando o próximo chega, o
anterior perde a cor, ganha desfoque leve e cai para cinza.

Sem isso a cena renderiza bonita e reprova na revisão visual, que é onde isso foi pego.

O padrão que funciona, e que já está em três componentes desta peça:

```
const foco = acendeQuandoEuChego * (1 - apagaQuandoOProximoChega)
```

Dois anéis empilhados no mesmo lugar (colorido com `opacity: foco`, cinza com
`opacity: 1 - foco`) resolvem a troca sem piscar.

---

## 6. A duração total precisa caber a vinheta falada inteira

CORRIGIDO EM 06/09/2026. As duas afirmações que estavam aqui morreram no mesmo dia: a vinheta
NÃO tem mais 8 segundos e NÃO entra mais pouco depois do selo.

A vinheta do catálogo hoje é a de voz feminina, com **5,35 segundos**, e ela entra depois que a
FALA termina, não no frame do selo. Quem decide é o `scripts/lib/sfx-mapa.js`, pegando o maior
valor entre o frame do selo e o fim da última palavra do `narration.json` mais 0,4s de respiro.
Ancorada só no selo, ela tocava por cima da locução e a palavra "Zeus" sumia embaixo da voz.

Conta nova:

```
inicio_da_vinheta = max(inicio_do_selo + 0,27s ; fim_da_fala + 0,4s)
TOTAL_FRAMES >= (inicio_da_vinheta + duracao_da_vinheta + 1s de silêncio) * 60
```

A duração da vinheta sai do `public/_sfx/catalogo.json`, nunca de um número decorado: ela já mudou
duas vezes. Exemplo real da Fernanda, depois do corte de fala: fala termina em 48,80s, vinheta
entra em 49,20s, dura 5,35s e fecha em 54,55s, com `VIDEO_FRAMES` em 3333 (55,55s) e cerca de 1s
de silêncio no fim.

O que estica é o selo parado, nunca a gravação: o bloco de vídeo já desmontou antes disso.

Se o vídeo acabar antes de a vinheta terminar, o gate "fim sem queda" reprova, porque a peça
termina com voz no ar. E se a vinheta começar antes de a fala acabar, o gate de sobreposição do
`mixar-final.js` reprova também.

---

## 7. Voz com trilha nasce em `TP=-3.0`, não em `-1.5`

O teto de pico é orçamento compartilhado entre voz, trilha e efeito. Se a voz sozinha já chega
a -1,5 dBTP, qualquer coisa somada estoura o teto de -1 dB do gate.

No passo P2 (normalização da voz):

```
loudnorm I=-16:TP=-3.0:LRA=11
```

O volume percebido não muda (continua -16 LUFS), só os picos ganham folga. Peça de voz sozinha,
sem trilha, pode seguir com -1,5.

Sintoma de que se caiu nesta armadilha: o gate de pico reprova sempre na MESMA janela de tempo,
e mexer no efeito daquela janela não resolve. O culpado é a voz, não o efeito.

---

## 8. Todo componente novo declara `MOVIMENTO_ATE`, e cena nenhuma fica parada mais de 2,5s

`export const MOVIMENTO_ATE = <ultimo quadro local com movimento proprio>` é o que permite ao
fiscal de ritmo saber se a animação cobre o tempo da cena. Sem isso ele só avisa; com isso ele
reprova de verdade quando a tela morre esperando a próxima cena.

O conflito real desta produção: a regra do lettering manda o pôster ficar pelo menos 3 segundos
na tela depois da última palavra, e o fiscal reprova cena parada por mais de 2,5 segundos. As
duas coisas se resolvem juntas com movimento LENTO no fecho, nunca com ausência de movimento:
o anel de espectro da palavra tônica floresce em 130 quadros em vez de 24. O pôster continua na
tela e nada fica congelado.

Regra geral: quando o estilo pede respiro longo, o respiro é feito de movimento lento, não de
imagem parada.

---

## 9. O molde se escolhe pelo TIPO DE INFORMAÇÃO da fala, nunca pela palavra

Este é o erro caro, porque passa em todos os gates automáticos e entrega um vídeo tecnicamente
perfeito contando a história errada.

Caso real: a fala dizia "vai conversar com os leads, separar os qualificados e agendar sozinho".
O corte usou o molde FUNIL. Funil significa "muitos entram, poucos chegam", e a fala nunca
mencionou perda: ela descreve TRÊS ETAPAS que acontecem sozinhas. O molde certo era PASSOS.

O teste, antes de escolher: escrever numa linha o que a fala AFIRMA. Se a frase escrita não
contém a ideia que o molde carrega, o molde está errado, por mais bonito que fique.

| A fala afirma | Molde |
|---|---|
| etapas em ordem | passos |
| perda ao longo do caminho | funil |
| um vira dois ou três | ramificação |
| de um estado para outro | jornada |
| três coisas que compõem | trio |
| dois caminhos comparados | espelho ou tabela |

---

## 10. Depois de `qa-approve`, não se toca em NADA dentro de `src/`

A aprovação visual guarda um hash de TODO o `src/`, incluindo tamanho e data de cada arquivo.
Trocar uma vírgula de comentário invalida a aprovação, e o render final recusa com a mensagem
"aprovação DESATUALIZADA", que parece erro de gate e não é.

Sequência correta, sem nada no meio: `qa-frames` → olhar os prints → `qa-approve` →
`render final`.

---

## 11. Render é um por vez no REPOSITÓRIO inteiro, não um por peça

Duas sessões renderizando peças diferentes ao mesmo tempo brigam pelo empacotador e pelo
servidor de arquivos, e o erro que aparece não tem relação com a causa. Nesta produção
apareceram três disfarces do mesmo problema:

- "No frame found at position ..." num arquivo de vídeo que estava íntegro
- "Handshake is not defined" num ícone que existe e estava importado
- "aprovação visual DESATUALIZADA" logo depois de aprovar

Antes de aprovar e renderizar:

```bash
ls squads/motion/output/_locks/
```

Vazio, pode ir. Com lock de outra peça, esperar. Lock de processo morto (o PID de dentro do
arquivo não aparece no `tasklist`) pode ser removido na mão.

---

## O que checar, em ordem, antes de escrever a primeira linha de um componente

1. Li o `catalogo.json` e sei quais gestos existem na categoria que vou usar.
2. Escrevi numa linha o que a fala AFIRMA, e o molde que escolhi carrega essa ideia.
3. Calculei o `CONTENT_H` somando toda linha, pelo pior caso, e ele cabe no orçamento do palco.
4. Se tem mais de um item com anel, a regra do foco já está no plano.
5. O primeiro gesto de som da peça está depois do quadro mínimo do som dele.
6. Se repeti nome de gesto no arquivo, os quadros seguintes são literais.
7. Declarei `MOVIMENTO_ATE` e o movimento cobre a cena até perto do fim.

E antes de renderizar: `output/_locks/` vazio, voz em `TP=-3.0` se a peça leva trilha, e o
total de quadros comporta a vinheta inteira.
