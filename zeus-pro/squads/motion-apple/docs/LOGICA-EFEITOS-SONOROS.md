# Lógica de efeito sonoro: qual som para qual movimento

> **Os números desta página vivem em `public/_sfx/catalogo.json` e `public/_sfx/mix-padroes.json`.**
> Quando o texto e o arquivo divergirem, o arquivo manda: é ele que o código lê.
> Porta de entrada da documentação: `docs/LEIA-PRIMEIRO.md`.


Este documento responde uma pergunta só: dado um movimento na tela, qual efeito entra, em que instante exato, em que volume, e quando é melhor não entrar som nenhum.

Ele existe porque efeito sonoro solto é pior que silêncio. Som que não bate no quadro certo, ou que acompanha um movimento que não pede som, faz o vídeo parecer amador mesmo quando a animação está boa. As três perguntas que este documento resolve, na ordem:

1. Este movimento pede som?
2. Se pede, qual família e qual peso?
3. Em que milissegundo esse som começa para o pico dele cair no quadro do movimento?

Documentos irmãos: `BIBLIOTECA-SFX.md` traz a ficha medida dos sons aprovados e o modelo de peso. `STYLE-APPLE-CONCEITUAL.md` seção 10 traz a receita de mixagem e os cinco gates de conferência.

---

## 1. A regra que vem antes de todas: o pico casa com o quadro

Todo efeito tem um instante em que ele bate. Esse instante quase nunca é o começo do arquivo. O `ding` bate 0,21s depois do início; o whoosh grave bate 0,79s depois. Colocar o arquivo para tocar no quadro do movimento atrasa o som e desmonta a sincronia.

A conta, sempre a mesma:

```
início do som = instante do movimento - instante do pico dentro do arquivo
```

Exemplo real do PauloRuizReels. O traço colorido embaixo da palavra começa a ser desenhado no quadro local 46 da cena, e a cena começa em 31,80s. Então o movimento acontece em 31,80 + 46/60 = 32,567s. O whoosh escolhido tem o pico em 0,34s. Logo o som começa em 32,567 - 0,34 = 32,227s, ou 32227 milissegundos no comando de mixagem.

O instante do pico de cada som está medido na ficha (`output/_sfx-ficha.json`, campo `pico_s`), gerada por `scripts/analisar-sfx.py`. Nunca estime a olho.

---

## 2. Tabela mestra: movimento para efeito

| Movimento na tela | Efeito | Arquivo | Condição de uso | Volume | Onde cai o pico |
|---|---|---|---|---|---|
| Contagem de número subindo (odômetro, R$, porcentagem) | tick por dígito mais ding no valor final | `public/sounds/tick.wav` e `public/sounds/ding.wav` | Só quando o número é o protagonista da cena. Número em rodapé ou apoio não leva som | tick a menos 22 dB, ding a menos 14 dB | Cada tick no quadro em que o dígito troca; o ding no quadro em que a contagem para |
| Entrada de título ou frase, movimento rápido (menos de 0,4s) | whoosh curto | `public/sounds/whoosh.wav` | Só se o texto entra rápido. Texto que aparece devagar, em fade longo, não leva som | menos 16 dB | No primeiro quadro do movimento |
| Entrada de título ou frase, movimento lento (mais de 0,6s) | nenhum | | Som em movimento lento vira ruído: o ouvido espera um golpe e recebe um arrasto | | |
| Palavra conceito grande com traço colorido embaixo | whoosh longo e brilhante | `public/_sfx/peso-10-whoosh-longo.wav` | Reservado para as duas ou três palavras protagonistas do vídeo inteiro | menos 9 dB | No quadro em que o traço começa a ser desenhado, não na entrada da palavra |
| Troca de cena leve, sem mudança de assunto | whoosh médio | `public/_sfx/peso-04-whoosh-medio.wav` | Toda troca de cena que não é revelação | menos 15 dB | No primeiro quadro da cena nova |
| Troca de cena para peça estrutural pesada (grade, tabela, número grande) | whoosh grave | `public/_sfx/peso-07-whoosh-grave.wav` | Quando a cena seguinte tem peso visual maior que a anterior | menos 11 dB | No primeiro quadro da cena nova |
| Revelação positiva (perfil pronto, resultado alcançado) | whoosh com brilho | `public/_sfx/peso-06-whoosh-forte.wav` | Quando a cena entrega uma conquista, não apenas informação | menos 13 dB | No primeiro quadro da cena nova |
| Badge, ícone ou card entrando com escala ou pulo | stamp | `public/sounds/stamp.wav` | Nunca whoosh aqui. Whoosh é deslocamento, stamp é chegada e assentamento | menos 14 dB | No quadro em que a escala termina, não no começo dela |
| Check de aprovação ou sucesso | ding | `public/sounds/ding.wav` | Um por vídeo. Dois dings tiram o valor do primeiro | menos 14 dB | No quadro em que o check fica opaco |
| Erro, alerta, queda de métrica | descendente grave | `public/sounds/downer-grave.wav` | Só quando a queda é o argumento. Queda mencionada de passagem não leva som | menos 13 dB | No quadro em que a linha ou o número começa a cair |
| Erro leve, correção, item riscado | descendente com brilho | `public/sounds/downer-brilho.wav` | Alternativa mais leve ao grave, para marcações pequenas | menos 16 dB | No quadro da marcação |
| Fundo ou gradiente mudando | reveal | `public/sounds/reveal.wav` | Só quando a mudança de fundo é o evento. Fundo que muda junto com outra coisa não leva som próprio | menos 18 dB | No quadro em que a transição começa |
| Zoom aproximando (câmera entra) | whoosh grave | `public/_sfx/peso-07-whoosh-grave.wav` | O grave lê como massa se aproximando. Confira o campo `direcao` da ficha: prefira `sobe` | menos 13 dB | No quadro em que o zoom atinge o destino |
| Zoom afastando (câmera sai) | whoosh com brilho e direção descendente | `public/_sfx/peso-10-whoosh-longo.wav` | O brilho descendente lê como afastamento | menos 15 dB | No quadro em que o zoom começa |
| Impacto, peça pesada assentando, selo | impact | `public/sounds/impact.wav` | Uma vez por vídeo, no fecho | menos 10 dB | No quadro em que a peça para de se mexer |
| Interface simulada com clique (dashboard, botão) | clique de mouse | `public/sounds/mouse-click.wav` | Só se existe cursor ou toque visível na tela. Sem cursor, o clique não tem origem e soa falso | menos 20 dB | No quadro do clique |
| Painel deslizando, aba trocando | switch | `public/sounds/switch.wav` | Interface que muda de estado, não cena que troca | menos 17 dB | No quadro em que o painel encaixa |
| Página, carrossel ou slide virando | page-turn | `public/sounds/page-turn.wav` | Movimento lateral com sensação de folha | menos 16 dB | No meio do movimento lateral |
| Dashboard vivo, gráfico respirando, elemento em repetição infinita | nenhum | | Ambiente em repetição cansa em vídeo curto. O silêncio aqui é decisão, não esquecimento | | |

---

## 3. A lei da série: mesma lógica, mesmo som em cada etapa

Ordem literal do dono, depois do primeiro teste de som:

> "os sons têm que cuidar quando são movimentos como no caso tabela ou textos iguais, tem que usar o mesmo som. No segundo 40 tem a tabelinha do Insta, apareceu o som no primeiro e não apareceu nos outros que têm o mesmo peso e comunicam a mesma lógica, mas por etapas."

Quando três círculos ou cinco blocos entram um a um, eles são a mesma informação repartida no tempo. Se só o primeiro leva som, o ouvido entende que o primeiro é o importante e o resto é sobra, e a cena mente sobre a própria hierarquia.

1. Elemento da mesma família que entra por etapas leva o mesmo som em cada etapa, sem exceção.
2. O peso é escolhido uma vez, pela família inteira, e não muda de item para item.
3. O volume cai 1 dB a cada repetição, para o som não virar metralhadora.
4. Série com mais de seis etapas marca só as etapas que a fala nomeia, nunca todas.

Aplicação real no PauloRuizReels:

| Série | Etapas | Efeito | Instantes | Volume |
|---|---|---|---|---|
| Três destaques do perfil | círculos 1, 2 e 3 | whoosh médio | 13,713s, 14,680s, 15,863s | menos 16, 17 e 18 dB |
| Cinco propósitos de conteúdo | itens 1 a 5 | whoosh médio | 34,980s, 36,397s, 37,680s, 39,680s, 42,913s | menos 16 a 20 dB |

---

## 4. Quando NÃO colocar som

Esta lista vale tanto quanto a tabela de cima, e é o que separa trilha profissional de vídeo poluído.

- Movimento lento, acima de 0,6 segundo de duração. O ouvido espera um golpe e recebe um arrasto.
- Dois eventos a menos de 0,25 segundo um do outro. Escolha o mais importante e cale o outro.
- Trecho em que a voz está no pico da frase. Som pontual em cima de sílaba forte come a palavra.
- Elemento de apoio: rótulo, régua, linha de base, legenda. Som aqui promove ao protagonista algo que é fundo.
- Repetição contínua ou animação em laço.
- Segundo check, segundo impacto ou segundo ding no mesmo vídeo. O segundo apaga o valor do primeiro.

---

## 5. Integração: como o som entra sem parecer colado por cima

Quatro regras que vieram dos gates de áudio já existentes em `scripts/video/mixar-trilha.js`.

1. **A trilha abaixa sozinha quando a voz fala.** Compressão com cadeia lateral, limiar 0,25, proporção 3, ataque 20 ms, alívio 350 ms. Sem isso, a voz fica enterrada e o efeito parece descolado do vídeo.
2. **O efeito nunca disputa faixa com a voz.** A voz vive na faixa média. Efeito com muita energia média precisa de mais 3 dB de corte do que um efeito grave ou agudo do mesmo peso.
3. **A cauda do efeito não invade a cena seguinte.** Confira o campo `decaimento_s` na ficha: se o som tem cauda de 0,7s e faltam 0,4s para a próxima cena, corte o som com desvanecimento antes do corte, ou escolha um som mais curto.
4. **Silêncio no fim é obrigatório.** O gate de áudio reprova mixagem cuja média dos últimos 0,15s passe de menos 50 dB. Efeito posicionado tarde demais no fecho reprova a peça inteira.

---

## 6. Fluxo de trabalho, do movimento ao arquivo final

1. Liste os movimentos da peça a partir do `SCENES` em `tokens.ts` e dos delays internos de cada componente. Nunca a olho no vídeo.
2. Para cada movimento, aplique a tabela mestra e a lista do item 4. A maioria dos movimentos não leva som.
3. Para cada som escolhido, leia `pico_s` na ficha e faça a conta do item 1.
4. Monte a mixagem com `scripts/video/mixar-trilha.js`, ou com o comando direto de mixagem quando forem vários efeitos.
5. Confira os cinco gates de áudio. Se algum reprovar, nada é gravado por cima do vídeo.
6. Ouça uma vez inteiro antes de entregar, prestando atenção só em som que chega adiantado ou atrasado.

---

## 7. Onde cada arquivo mora

| Pasta | O que tem |
|---|---|
| `public/_sfx/` | Os quatro whooshes aprovados pelo dono, com peso 4, 6, 7 e 10 |
| `public/sounds/` | A biblioteca funcional: tick, ding, stamp, impact, reveal, whoosh curto, whip, switch, page-turn, mouse-click, shutter, downer grave e downer com brilho |
| `public/HamiltonZeusReels/audio/` | O efeito do selo de fecho e a trilha aprovada |
| `materiais/claude-workspace/ferramentas/exemplo-video-editor/public/sfx/` | Banco antigo: magic, riser e trilhas |
| `output/_sfx-ficha.json` e `output/_sfx-existentes.json` | As fichas medidas de todos eles |

Os dois sons descendentes foram criados aqui, invertendo no tempo os risers do banco antigo, com custo zero. Riser é tensão que sobe; invertido, vira queda.

---

## 8. O que ainda falta

- Som de digitação para texto que aparece letra por letra. Hoje o efeito letra a letra roda sem som.
- Assinatura sonora curta de abertura, de meio segundo, para o gancho dos primeiros três segundos.
- Aprovação do dono para cada som novo que sair do banco não aprovado. Nada entra na biblioteca sem isso.

---

## 9. Gestão de movimento e som: o mapa completo de uma peça

Ordem literal dele, depois de ouvir a peça com som pela primeira vez:

> "cada movimento tem que ter whoosh, alguns mais outros menos conforme o peso da ação, a importância, o tamanho. Conforme o peso vai ter um volume pouco maior ou pouco menor. Tem lugares que está sem. No segundo 9 tem a palavra promessa específica e letras importantes que não têm whoosh, e no segundo 51 tem o mesmo problema. Tem que fazer uma gestão de movimentos e whoosh conforme o peso e a importância, cuidado para não exagerar."

A lição: som não se decide cena a cena, se decide EVENTO a evento. Uma cena pode ter dois eventos com pesos diferentes, e uma cena inteira pode não ter evento nenhum que peça som.

### Como montar o mapa, em quatro passos

1. Liste as cenas a partir do `SCENES` em `tokens.ts`.
2. Para cada cena, abra o componente e liste os EVENTOS internos: cada `delay` de entrada é um evento em potencial. O início da cena é apenas o primeiro deles.
3. Dê um peso de 1 a 10 a cada evento, pela régua abaixo.
4. Descarte os eventos de peso 1 e 2, e os que caem a menos de 0,25 segundo de outro mais pesado.

### A régua de peso do EVENTO (diferente da régua de peso do SOM)

| Peso | Que tipo de evento é | Som |
|---|---|---|
| 10 | A palavra conceito que sustenta o argumento inteiro, com traço colorido | whoosh longo, menos 9 dB |
| 7 | Peça estrutural pesada, ou a frase de maior peso do vídeo | whoosh grave, menos 11 dB |
| 6 | Revelação de resultado, frase grande, grade fechando | whoosh com brilho, menos 13 dB |
| 4 | Troca simples de cena, chegada de elemento, item de série | whoosh médio, menos 15 a 20 dB |
| 3 | Selo de aprovação, marcação pequena | ding, menos 18 dB |
| 1 e 2 | Rótulo, régua, linha de base, legenda | nenhum |

### O mapa real do PauloRuizReels, 22 sons

| Segundo do gesto | Evento | Peso | Som | Volume |
|---|---|---|---|---|
| 0,50 | logo do Instagram assenta no gancho | 4 | médio | menos 15 |
| 2,22 | dois círculos da comparação de foto | 4 | médio | menos 15 |
| 6,37 | traço colorido sob AUTORIDADE | 10 | longo | menos 9 |
| 7,81 | frase da promessa entra | 6 | forte | menos 13 |
| 10,38 | letra A entra | 4 | médio | menos 15 |
| 12,05 | letra B chega, depois da seta | 4 | médio | menos 16 |
| 13,71 / 14,68 / 15,86 | os três destaques, série | 4 | médio | menos 16, 17, 18 |
| 22,66 | grade de 12 posts | 7 | grave | menos 11 |
| 32,57 | traço colorido sob ESTRATÉGIA | 10 | longo | menos 9 |
| 34,98 a 43,32 | os seis propósitos, série | 4 | médio | menos 16 a 21 |
| 44,48 | grade cheia do recap | 6 | forte | menos 13 |
| 49,39 | frase "sem postar toda hora" | 7 | grave | menos 11 |
| 51,54 | logo do perfil pronto | 6 | forte | menos 13 |
| 52,11 | check verde sela o resultado | 3 | ding | menos 18 |
| 54,20 | número de 50 mil | 7 | grave | menos 11 |
| 56,47 | vinheta falada do selo | próprio | arquivo de vinheta | nivelado com a fala |

### As duas travas contra exagero

1. **Distância mínima entre sons: 0,25 segundo.** Dois eventos mais próximos que isso viram um só, e vence o de maior peso.
2. **Teto de densidade: um som a cada 2,5 segundos, em média.** Este vídeo tem 64,5 segundos e 22 sons, ou seja um a cada 2,9 segundos. Acima do teto, o vídeo cansa mesmo com cada som certo no lugar certo.

### O que continua sem som, de propósito

Rótulo entrando, régua de chão, legenda palavra a palavra, número contando entre o primeiro e o último dígito, e qualquer movimento acima de 0,6 segundo de duração. Esses são o fundo. Som no fundo promove a apoio o que deveria ficar embaixo.

---

## 10. A lei da categoria: mesmo elemento, mesmo som, sempre

Ordem literal dele, depois de ouvir a peça com o mapa completo:

> "teve um momento que apareceu o número 12 e deu um som legal. Depois teve outro momento que mostrou a mesma coisa e não deu o som. Tem que ter categorias: quando replica o estilo, a categoria tem que ter o som novamente. Não pode mostrar uma coisa que tem um peso, uma função, uma lógica, que tem o som, e depois ficar sem o som ou trocar o som."

Esta é a lei mais forte deste documento, e é diferente da lei da série. A lei da série cuida do que se repete DENTRO de uma cena. A lei da categoria cuida do que se repete ENTRE cenas, às vezes com trinta segundos de distância.

### A regra

Todo elemento pertence a uma categoria. Duas aparições da mesma categoria recebem o MESMO som, no MESMO volume, no MESMO ponto do movimento. Sem exceção, mesmo que a segunda aparição seja mais curta, mesmo que ela seja recapitulação.

Quando o espectador vê a mesma coisa e ouve outra, o vídeo perde a gramática: o som deixa de significar e vira decoração.

### Como montar a tabela de categorias de uma peça

Antes de posicionar qualquer som, agrupe os eventos do vídeo por categoria, não por cena. Duas cenas diferentes podem pertencer à mesma categoria, e uma cena pode conter eventos de categorias diferentes.

Categorias do PauloRuizReels, com as duas aparições onde existem:

| Categoria | Onde aparece | Som na entrada | Som no fechamento |
|---|---|---|---|
| Palavra conceito com traço | AUTORIDADE (5,6s) e ESTRATÉGIA (31,8s) | médio na letra, menos 14 dB | longo no traço, menos 9 dB |
| Grade de 12 posts | feed (22,66s) e recap (44,48s) | grave, menos 11 dB | ding no fim da contagem, menos 19 dB |
| Frase grande de lettering | promessa (7,54s) e liberdade (49,12s) | grave, menos 12 dB | nenhum |
| Selo de marca | gancho (0s) e perfil pronto (51,54s) | forte, menos 13 a 14 dB | ding no check, menos 18 dB |
| Número protagonista | 50 mil (54,2s) | grave, menos 11 dB | ding no fim da contagem, menos 17 dB |
| Comparação com veredito | foto certa e errada (2,22s) | médio na entrada, menos 15 dB | stamp nos selos, menos 16 dB |
| Jornada de A para B | jornada (10,38s) | médio na partida e na chegada, menos 15 e 16 dB | nenhum |
| Série de itens | destaques (13,48s) e propósitos (34,98s) | médio, caindo 1 dB por etapa | nenhum |

### O gate da categoria, antes de fechar a mixagem

1. Listei todos os eventos e agrupei por categoria, não por cena?
2. Toda categoria com duas ou mais aparições tem som idêntico em todas?
3. Toda categoria que tem evento de fechamento (contagem terminando, selo assentando) tem o som de fechamento nas duas vezes?
4. Nenhuma categoria trocou de som no meio do vídeo?

Se a resposta de qualquer uma for não, a mixagem não sai.

### O corolário do peso

Categorias diferentes têm sons diferentes, e a diferença precisa ser audível. Elemento leve e elemento pesado que compartilham o mesmo som apagam a hierarquia tanto quanto a mesma categoria com sons diferentes. A régua de peso da seção 9 é o que garante essa separação.
