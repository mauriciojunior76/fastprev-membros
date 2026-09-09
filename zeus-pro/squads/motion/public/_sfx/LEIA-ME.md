# Sons do zeus-motion: onde está cada coisa

Esta pasta é o único lugar de som do squad. Se você está editando um vídeo e precisa de efeito, é aqui, e o nome do arquivo já diz o peso.

## Os seis efeitos aprovados

| Arquivo | Peso | Quando usar |
|---|---|---|
| `peso-10-whoosh-longo.wav` | 10 | A palavra conceito com o traço colorido embaixo. Duas ou três vezes por vídeo, no máximo |
| `peso-07-whoosh-grave.wav` | 7 | Peça estrutural pesada (grade, número grande) e a frase de maior peso do vídeo |
| `peso-06-whoosh-forte.wav` | 6 | Revelação positiva, frase grande, grade fechando |
| `peso-04-whoosh-medio.wav` | 4 | Troca simples de cena, chegada de elemento, item de série |
| `peso-04-stamp.wav` | 4 | Badge ou selo assentando com escala. Nunca whoosh aqui: whoosh é deslocamento, stamp é chegada |
| `peso-03-ding.wav` | 3 | Check de aprovação e fim de contagem de número |

`vinheta-zeus-ia-para-mentores.wav` não é efeito, é voz. É o fecho falado do selo, e obedece à regra de nível da fala, nunca à tabela de peso.

## As três coisas que você não precisa decidir

1. Qual som usar. O componente declara a categoria e o gesto. O `catalogo.json` diz o peso, e a tabela de peso diz o arquivo e o volume. Você não escolhe som, e é por isso que a mesma categoria nunca sai com som diferente em duas cenas.
2. Onde o som começa. O pico de cada arquivo está medido no catálogo. O início é o instante do gesto menos o pico. O `sfx-mapa.js` faz essa conta.
3. Qual volume. Vem da tabela de peso. Série cai 1 dB por etapa, automático.

## O que você precisa decidir

Quais movimentos da cena são gesto com som, e a categoria de cada um. Isso é escolha de direção, como escolher o objeto visual. Vive no `SFX_EVENTS` de cada componente.

## Pastas

`trilhas/` guarda as trilhas com a ficha medida ao lado. Sem ficha aprovada, a mixagem não roda. Para escolher entre candidatas: `python scripts/trilha-avaliar.py <arquivos>`.

`banco-nao-aprovado/` guarda 59 sons medidos que o o dono do canal reprovou ou nunca ouviu. Nada daqui entra num vídeo sem ele aprovar um a um. Serve para pescar candidato quando faltar um peso: a ficha de cada um diz duração, pico, brilho e grave.

`_versions/` guarda os mesmos aprovados com os nomes antigos, antes da organização por peso.

## Arquivos de configuração

`catalogo.json` é a fonte única: sons, pesos, vocabulário de categorias, regras numéricas.

`mix-padroes.json` traz os números da mixagem: trilha, abafamento sob a voz, gates de nível, e as medidas da versão aprovada como alvo.

Nenhum dos dois se edita a olho. As medidas entram por `python scripts/analisar-sfx.py public/_sfx --catalogo`. Peso e aprovação são decisão do o dono do canal.

## A lógica completa

`docs/LOGICA-EFEITOS-SONOROS.md`: qual som para qual movimento, a lei da série, a lei da categoria, a conta de posicionamento e o que fica sem som de propósito.
