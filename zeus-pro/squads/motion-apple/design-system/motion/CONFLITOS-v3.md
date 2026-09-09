# Conflitos entre o Manual de Motion v3.0 e o que o squad já fazia

Incorporado em 08/09/2026 (rodada 2 do plano APPLE DESIGN 6). O material novo é a
regra; os vídeos aprovados (Carlos, Aline, Clodoaldo, Fernanda, Hamilton, Paulo Ruiz)
são jurisprudência, não veto. Onde houve choque, está registrado aqui com o que foi
feito e por quê.

## 1. As quatro curvas do núcleo mudaram de bezier, com o mesmo nome

| Token | Squad (27/08 e 05/09) | Manual v3.0 | O que foi feito |
|---|---|---|---|
| `settle` | `.1,.45,.75,1` | `.05,.7,.1,1` | v3 entrou como `settleV3` |
| `smoothInOut` / `smooth` | `.45,0,.15,1` | `.6,0,.05,1` | v3 entrou como `smoothV3` |
| `settleSoft` | `.12,.4,.8,1` | `.16,.84,.14,1` | v3 entrou como `settleSoftV3` |
| `easyEase` / `easy` | `.33,0,.67,1` | `.4,0,.2,1` | v3 entrou como `easyV3` |

**Por que não sobrescrevi no lugar:** essas quatro curvas estão em uso nas seis peças
já aprovadas. Trocar o valor mantendo o nome mudaria o movimento de todas elas no
próximo render, sem ninguém ver e sem decisão sua. O plano é explícito em não
reescrever vídeo aprovado para caber na regra nova.

**Minha opinião:** os valores do v3 são melhores, e a diferença é real, não cosmética.
A cauda longa é o que faz o movimento parecer After Effects. Migrar peça a peça, com
revisão visual de cada uma, é o caminho; migrar todas de uma vez, por troca de
constante, é o jeito de descobrir que quebrou depois de publicado. Peça nova nasce em
`motionVersion: 3` e usa o vocabulário v3 desde o primeiro quadro.

## 2. Camada avançada não existia

`anticipate`, `overshootMicro`, `brake`, `gravity`, `lift` e `linear` entraram com o
nome do manual, sem conflito: não havia equivalente no squad. Junto vieram as duas
curvas que são spring, `elasticSoft` e `inertia`, em `motion-spec.ts`.

## 3. Teto de cascata (§5.2)

O squad calculava `delay = base + stagger × índice`, sem teto. Com 12 irmãos e passo 4
isso dá 44 quadros de cascata: a fala termina antes do último item entrar.

`childDelay` de `core/choreo.ts` ficou **intacto** (mesmo motivo do item 1). Peça nova
usa `childDelayComTeto`. O `choreo-lint` avisa toda peça que passa do teto e **reprova**
quem declara `motionVersion: 3`.

## 4. Amplitude de entrada

`MOTION_LEGACY.entryDistance` é 80px e `exitDistance` é 1200px. O manual fecha o
deslocamento em 16px, sempre. Mesmo tratamento: aviso para peça antiga, reprovação
para peça v3.

## 5. Sincronia pela sílaba tônica (§4)

Regra nova sem equivalente antigo, e a que mais muda o resultado. Peça v3 sem arquivo
de palavras alinhadas na pasta é reprovada pelo lint: sem tônica o gesto não tem onde
ancorar, e o fallback do manual é hold estático, nunca chute.

## 6. Peso 0 a 10 unificando motion e som (§3b, §3c)

O squad já tinha peso no catálogo de SFX. O manual amarra os dois: o mesmo número
decide amplitude, duração, hold, blur, arquivo de som e volume. Implementado nos dois
lados: `motion-spec.ts` (`gainForWeight`, `sfxCueFor`, `musicLevelForScene`) e
`ds-som.js` (`--peso`, `--cena`). O catálogo do motor continua mandando no par de som,
como você decidiu em 06/09.

## O que ficou fora desta rodada

Wide 16:9 entrou só na parte de motion (`transformStage` e as proporções em
`layout.ts`). O `wide-registry.json` e os mocks de aparelho vêm no pacote visual, que é
a rodada 1 e continua pendente.
