# Biblioteca de efeito sonoro do zeus-motion

> **A fonte é `public/_sfx/catalogo.json`. Quando este texto e o arquivo divergirem, o arquivo manda.**
> Porta de entrada da documentação: `docs/LEIA-PRIMEIRO.md`.

## COMECE AQUI: pergunte pela cena, não pelo som

Na hora da produção a pergunta nunca é "quais sons eu tenho". É "esta cena está
fazendo o quê". Um comando responde isso, lendo o catálogo em tempo real (som novo
catalogado já aparece, sem ninguém atualizar documento):

```bash
node scripts/sfx-busca.js "a cena mostra que deu certo"
```

Ele devolve a categoria, o gesto, o arquivo, a duração, o pico, onde usar, onde NÃO
usar, e a linha pronta para declarar no componente. `--tudo` lista todas as
categorias com as palavras que acham cada uma.

Termo que devia achar e não achou entra no dicionário `INTENCAO` dentro do próprio
`scripts/sfx-busca.js`, na mesma sessão. Nunca no código da busca.


## Fonte de som livre: Kenney, via GitHub

Garimpo de 06/09/2026. O repositório `kapishdima/soundcn` no GitHub empacota os
packs de áudio do Kenney (kenney.nl), que são **CC0 1.0**: domínio público, uso
comercial livre, sem atribuição obrigatória. A licença foi conferida no
`License.txt` de dentro do próprio pack, não na etiqueta do repositório.

806 arquivos, sendo 100 só de interface (erro, confirmação, clique, tique,
alternar, abrir, fechar). É a fonte padrão daqui para a frente quando faltar som
utilitário: é incluso, é seco, e não tem cara de trilha de videogame.

Caminho dos arquivos, para baixar direto:

```
https://raw.githubusercontent.com/kapishdima/soundcn/HEAD/assets/kenney_interface-sounds/<arquivo>.ogg
https://raw.githubusercontent.com/kapishdima/soundcn/HEAD/assets/kenney_digital-audio/<arquivo>.ogg
```

Packs disponíveis no mesmo repositório: `kenney_impact-sounds` (130),
`kenney_interface-sounds` (100), `kenney_music-jingles` (85),
`kenney_sci-fi-sounds` (73), `kenney_digital-audio` (63),
`kenney_casino-audio` (54), `kenney_rpg-audio` (52).

Descartado no mesmo garimpo: `scopegate/octave` (986 estrelas, sons de UI para
iOS) não tem arquivo de áudio no repositório, só código.

### O método do garimpo, para repetir

Baixar de 8 a 12 candidatos por tipo e **deixar a medição escolher**, nunca o
nome do arquivo. Rodar `python scripts/medir-sfx-envelope.py` na pasta dos
candidatos: mede duração, instante do pico, cauda até -30 dB, RMS, número de
ataques e a fatia de energia no agudo.

Foi a coluna do agudo que decidiu três das cinco escolhas de 06/09/2026: o erro
certo é o mais grave dos oito (4% de agudo, os outros soavam cômicos), o check
certo é o mais brilhante dos quatro (83%), e o alarme certo é o mais grave dos
doze (1%). Nenhuma das três eu teria acertado lendo o nome do arquivo.

## Índice por intenção

| A cena está… | Categoria | Som |
|---|---|---|
| no momento mais importante da peça | `revelacao-importante` | shimmer, teto de 2 |
| confirmando, validando, selando | `confirmacao` | ping |
| movendo algo que assenta no fim | `transicao-com-chegada` | sweep |
| mostrando uma compra ou venda | `venda-acontece` | caixa registradora, teto de 1 |
| dando um veredito entre dois | `comparacao-veredito` | carimbo |
| subindo um gráfico ou escala | `grafico-sobe` | whoosh médio, ding no marco |
| andando por etapas | `jornada` | whoosh médio |
| listando itens em sequência | `serie-itens` | whoosh médio |
| destacando uma palavra | `palavra-conceito` | whoosh longo no traço |
| fechando com o selo | `selo-zeus` | whoosh forte |

## Som de movimento e som de significado

Os cinco whooshes originais descrevem MOVIMENTO: algo entrou, algo passou. Eles
respondem "o que se mexeu". Os sons semânticos (ping, shimmer, sweep, registradora)
respondem "o que isso significa", e é neles que mora a reação do espectador.

Som de significado tem TETO por peça, gravado no campo `teto_por_peca` do catálogo e
cobrado pelo `sfx-mapa.js` automaticamente: shimmer no máximo 2, caixa registradora
no máximo 1. Não é frescura de estética. Um som que diz "isto é importante" deixa de
dizer isso na terceira vez, e vira textura de fundo.

## Duas armadilhas de preparo, aprendidas na prática

1. **Efeito se normaliza por PICO, nunca por média.** Passar um build por
   `loudnorm` achata a curva e mata a subida, que é a informação inteira. Use
   `volume` mais `alimiter`. Loudnorm é para voz.
2. **Duração de arquivo não é duração de som.** Todo arquivo baixado ou enviado
   chega com silêncio na frente ou cauda morta no fim. Os três de 06/09/2026 vieram
   com 370 ms, 1,66 s e 150 ms de lixo. Medir e aparar antes de catalogar; silêncio
   na frente desloca o som do quadro da palavra.

## Como um som novo entra no banco

1. Medir com `python scripts/analisar-sfx.py <arquivo>` ou o medidor de envelope.
2. Aparar frente e cauda, converter para wav mono 48 kHz 24 bits, ganho por pico.
3. Gravar em `public/_sfx/` com o nome `peso-NN-familia-uso.wav`.
4. Catalogar em `sons` do `catalogo.json`: `peso`, `familia`, `usar_em`,
   `nao_usar_em`, `origem`, a medição e o `teto_por_peca` quando for som semântico.
5. Criar a categoria em `categorias` declarando a FAMÍLIA, nunca só o peso:
   `{"gestos": {"confirma": {"peso": 4, "familia": "ping"}}}`. Declarar só o peso
   devolve o whoosh genérico da tabela de peso, e foi esse o erro que deixou a caixa
   registradora fora da primeira mixagem em 06/09/2026.
6. Adicionar as palavras de busca no dicionário `INTENCAO` do `sfx-busca.js`.

---

# Referência: os sons de movimento

## Aviso de honestidade sobre o método

Quem escreveu este documento não escuta os sons. Toda a classificação aqui vem de medição feita por computador, com o script `scripts/analisar-sfx.py`: duração do arquivo, em que instante ele atinge o volume máximo, quanto tempo leva para subir até esse máximo, quanto tempo leva para sumir depois, o brilho (se o som puxa mais para o agudo ou para o grave) e quanto da energia está em cada faixa.

Medida serve para decidir duas coisas com segurança: **onde o som encaixa no tempo** e **quanto peso ele tem**. Isso é matemática de sincronia, não gosto. O que a medida **não** decide é se o som é bonito, se combina com a marca, se soa datado ou barato. Isso continua sendo aprovação do dono, ouvido por ouvido. Dos 49 sons da coleção, ele aprovou cinco. Os outros 44 não foram aprovados, e nenhum deles entra em vídeo sem ele ouvir e liberar.

## 1. Por que efeito sonoro muda o sentido do movimento

Uma palavra que desliza para dentro da tela sem som é uma palavra que apareceu. A mesma palavra com um whoosh grave e curto no instante exato em que ela para é uma palavra que **chegou**, com força, e o espectador entende que aquilo importa. Foi isso que aconteceu no PauloRuizReels: o traço colorido que corre por baixo das duas palavras-conceito é a mesma animação com e sem som, mas com o pico do whoosh caindo no quadro em que o traço começa a ser desenhado, o traço deixa de ser enfeite e vira sublinhado de ênfase. O som não decora o movimento, ele diz ao espectador qual movimento merece atenção.

## 2. A ficha dos cinco sons aprovados

| Som | Peso | Duração | Pico | Ataque | Cauda | Brilho | Grave | Agudo | O que comunica |
|---|---|---|---|---|---|---|---|---|---|
| Woosh 2 (wav) | 10 | 4,87s | 0,34s | 0,18s | 0,72s | 12228 Hz | 13% | 85% | Golpe brilhante e largo: revelação, o momento mais importante do vídeo |
| Woosh 11 (wav) | 7 | 1,64s | 0,79s | 0,35s | 0,33s | 1939 Hz | 95% | 0,2% | Baque grave e cheio: peso de dado, número grande, bloco que assenta |
| Woosh 6 (mp3) | 6 | 1,70s | 0,81s | 0,34s | 0,33s | 1599 Hz | 96% | 0,2% | Baque grave um pouco mais macio: fechamento, montagem que se completa |
| Woosh 5 (mp3) | 4 | 0,91s | 0,46s | 0,19s | 0,19s | 1421 Hz | 94% | 0,2% | Passagem grave e rápida: virada de cena, sem chamar atenção para si |
| Woosh 14 (mp3) | 3 | 2,06s | 0,24s | 0,09s | 0,36s | 6881 Hz | 47% | 12% | Sopro claro e ligeiro: entrada leve de elemento pequeno |

Explicando as colunas em português do dia a dia: **pico** é o instante, dentro do arquivo, em que o som está mais alto. **Ataque** é quanto tempo ele leva do silêncio até esse ponto mais alto. **Cauda** é quanto tempo ele leva para sumir depois do pico. **Brilho** é a altura média do som, número alto é som agudo e sibilante, número baixo é som grave e encorpado. **Grave** e **agudo** são a fatia da energia em cada extremo.

Repare numa coisa que a tabela mostra sozinha: o Woosh 2 tem 4,87 segundos de arquivo, mas só 0,90 segundo de som realmente audível (0,18 de subida mais 0,72 de queda). O resto é silêncio gravado. Duração de arquivo não é duração de som, e é por isso que a fórmula do peso ignora a duração total.

## 3. O modelo de peso

A fórmula calibrada nos cinco pontos aprovados, por mínimos quadrados:

```
peso = 52,82 x (ataque + cauda)  -  84,88 x ataque  +  27,37 x (fração de grave)  -  25,95
```

O erro médio dela contra as notas que o dono deu é de 0,4 ponto, ou seja, ela fica bem perto da percepção dele e serve para classificar som novo sem ele precisar dar nota.

Em português simples, a fórmula diz três coisas:

**Primeiro termo, o tamanho do som audível.** Ataque mais cauda é o tempo em que o som existe de verdade. Quanto maior esse tempo, mais o som ocupa espaço na cena, e mais peso ele carrega. Esse é o fator dominante.

**Segundo termo, o ataque sozinho, com sinal negativo.** Aqui está a parte que parece contraintuitiva e não é: **ataque longo alivia o peso em vez de aumentar**. A explicação é física e todo mundo já sentiu isso na vida real. Um som que salta do silêncio para o volume máximo em 0,09 segundo é uma batida, uma pancada, algo que estala. O mesmo volume alcançado em 0,35 segundo é uma aproximação, um sopro que cresce, algo que se anuncia antes de chegar. O ouvido lê subida rápida como impacto e subida lenta como movimento suave. Por isso, entre dois sons de mesma duração audível, o de ataque mais demorado soa mais gentil, e a fórmula subtrai peso por isso.

**Terceiro termo, quanto o som tem de grave.** Grave é sentido no peito, agudo é sentido na orelha. Quanto mais a energia está embaixo, mais o som parece pesado e presente, então esse termo soma.

Um teste rápido no Woosh 2 para mostrar a conta rodando: som audível de 0,90 segundo dá 47,5 pontos; o ataque de 0,18 segundo desconta 15,3; o grave de 13% acrescenta 3,6; a constante tira 25,9. Sobra 9,9, que arredonda para o 10 que o dono deu.

## 4. Tabela de aplicação: cada peso acompanha um tipo de movimento

| Peso | Som | Que movimento ele acompanha | Onde foi usado no PauloRuizReels |
|---|---|---|---|
| 10 | Woosh 2 | O ponto mais alto do vídeo: palavra-conceito grande, revelação, virada de argumento | As duas palavras-conceito com traço colorido embaixo, com o pico caindo no quadro em que o traço começa a ser desenhado |
| 7 | Woosh 11 | Bloco de peso, dado numérico, estrutura que assenta na tela | A grade dos 12 posts e o número de 50 mil |
| 6 | Woosh 6 | Fechamento e montagem que se completa | O recap e a cena do perfil pronto |
| 4 | Woosh 5 | Passagem de uma cena para outra, sem destaque | Trocas simples de cena |
| 3 | Woosh 14 | Entrada de elemento pequeno: ícone, selo, etiqueta | Disponível na biblioteca, ainda sem uso fixo nesta produção |

Regra de bolso que sai da tabela: peso alto é raro por definição. Se o vídeo inteiro tem 60 segundos, o whoosh de peso 10 aparece duas ou três vezes, no máximo. Usado em toda cena, ele deixa de significar "isto é importante" e vira barulho de fundo.

## 5. A regra de posicionamento e de volume

O erro mais comum ao aplicar efeito sonoro é começar o som no mesmo instante em que o movimento começa. Isso soa atrasado, porque o ponto mais forte do som só vai chegar depois. O que precisa coincidir com o movimento é o **pico**, não o começo do arquivo.

A conta, passo a passo:

1. Descubra em que quadro o movimento importante acontece.
2. Converta esse quadro em segundos, dividindo por 60 (a animação roda a 60 quadros por segundo).
3. Subtraia o tempo de pico do arquivo, que está na tabela da seção 2.
4. O resultado é o instante em que o som deve começar.
5. Converta de volta para quadro multiplicando por 60, e arredonde para o quadro inteiro mais próximo.

**Exemplo numérico completo.** O traço colorido embaixo da primeira palavra-conceito começa a ser desenhado no quadro 120. Em segundos, 120 dividido por 60 dá 2,000 segundos. O som escolhido é o Woosh 2, cujo pico está em 0,34 segundo dentro do arquivo. Então o som precisa começar em 2,000 menos 0,34, que é 1,66 segundo. Multiplicando por 60, dá 99,6, que arredonda para o quadro 100. Ou seja: o som entra no quadro 100 para bater exatamente no quadro 120.

Ainda no mesmo exemplo, vale conferir a cauda: o Woosh 2 tem 0,72 segundo de queda depois do pico, então ele termina de soar em 2,000 mais 0,72, ou seja 2,72 segundos, o quadro 163. Se a próxima cena começa antes disso, você tem invasão de cauda, e o assunto é a seção 6.

**Volume.** Todos os efeitos entram entre 9 e 15 decibéis abaixo do nível da voz. A régua é direta: quanto mais leve o som, mais baixo ele fica. Efeito de peso 10 fica perto de 9 abaixo, para ser sentido. Efeito de peso 3 ou 4 fica perto de 15 abaixo, porque a função dele é costurar a passagem, não ser notado. A mistura final é feita por `aios/scripts/video/mixar-trilha.js`, que junta voz, trilha e efeito e roda cinco conferências automáticas de áudio antes de liberar o arquivo.

## 6. A lei da série: mesma lógica visual, mesmo som em cada etapa

Ordem literal do dono, dada depois do primeiro teste de som no PauloRuizReels:

> "os sons tem que cuidar quando são movimentos como no caso tabela ou textos iguais, tem que usar o mesmo som. No segundo 40 tem a tabelinha do Insta, apareceu o som no primeiro e não apareceu nos outros que têm o mesmo peso e comunicam a mesma lógica, mas por etapas."

O defeito é de leitura, não de volume. Quando três círculos ou cinco blocos entram um a um, eles são a MESMA informação repartida no tempo. Se só o primeiro leva som, o ouvido entende que o primeiro é o importante e os outros são sobra, e a cena passa a mentir sobre a própria hierarquia.

A regra, então:

1. Elemento da mesma família que entra por etapas leva o MESMO som em cada etapa, sem exceção. Não é o primeiro que leva som, são todos.
2. O peso do som é escolhido uma vez, pela família inteira, e não muda de um item para o outro.
3. Para não virar metralhadora, o volume cai 1 decibel a cada repetição. O ouvido continua reconhecendo o mesmo som, mas ele deixa de brigar por atenção.
4. Se a série tiver mais de seis etapas, o som passa a marcar só as etapas que a fala nomeia, nunca todas. Doze células de grade com doze sons viram ruído.

Como isso ficou aplicado no PauloRuizReels, com os instantes reais:

| Série | Etapas | Som | Instante do gesto | Volume |
|---|---|---|---|---|
| Três destaques do perfil | círculo 1, 2 e 3 | whoosh peso 4 | 13,713s, 14,680s, 15,863s | menos 16, 17 e 18 decibéis |
| Cinco propósitos de conteúdo | item 1 a 5 | whoosh peso 4 | 34,980s, 36,397s, 37,680s, 39,680s, 42,913s | menos 16 a 20 decibéis |

Os instantes não foram escolhidos a olho: cada um é o quadro de entrada do item, lido direto do código do componente e convertido para segundos.

## 7. Os erros a evitar

**Som demais no mesmo trecho.** Se dois efeitos se sobrepõem, nenhum dos dois é ouvido como intenção, os dois viram sujeira. A régua prática: pelo menos um segundo de distância entre o fim da cauda de um e o começo do próximo. Trecho de cena com três elementos entrando em sequência rápida leva **um** som, no elemento principal, não três.

**Som competindo com a voz.** A voz é o conteúdo, o efeito é pontuação. Efeito não entra em cima de palavra falada importante. O lugar natural do efeito é a respiração entre frases, e é por isso que a marcação por palavra do `scripts/transcribe-words.py` serve para duas coisas: legenda e escolha do vão de silêncio onde o som cabe.

**Cauda invadindo a cena seguinte.** Esse é o mais fácil de deixar passar, porque no código não aparece nada de errado. O Woosh 2 soa por 0,90 segundo depois de começar; se o corte para a próxima cena acontece 0,4 segundo depois do pico, o espectador ouve o final de um som que pertence a uma imagem que já saiu da tela, e a sensação é de vídeo mal montado. Antes de fixar o som, some pico mais cauda e compare com o quadro do corte.

**Som pesado em movimento leve.** Um selo de confirmação que aparece com 200 milissegundos de escala não sustenta um whoosh de peso 10. O som fica maior que a imagem, e o espectador sente que faltou alguma coisa na tela. Movimento pequeno pede peso 3 ou 4.

**Fechando com o método que descobriu quase tudo nesta produção:** gerar uma imagem parada de cada cena e olhar, antes de gerar o vídeo inteiro. Vários defeitos eram invisíveis no código e óbvios na imagem. Para som vale o equivalente: exportar o trecho curto com o efeito aplicado e ouvir, antes de mandar o vídeo inteiro. O `scripts/storyboard.js` é a folha de aprovação antes de qualquer geração de vídeo, o `scripts/qa-approve.js` registra as notas F1 a F7 e trava a geração final abaixo de 8, e o `scripts/render.js` chama sozinho o `pre-render-validate.js` e o `qa-frames.js` e para tudo se reprovar. O som entra nesse mesmo funil, não por fora dele.

## 8. O banco não aprovado e como pescar candidatos nele

Os outros 44 sons da coleção continuam guardados como banco não aprovado. Eles não são lixo, são material que ainda não passou pelo ouvido do dono. A regra é única e não tem exceção: **nada sai do banco não aprovado sem ele aprovar, um a um.** A fórmula não substitui a aprovação, ela só encurta a fila.

Quando faltar um peso na biblioteca (por exemplo, um som de peso 8, que hoje não existe entre os cinco), o caminho é este:

1. Rodar `scripts/analisar-sfx.py` em todo o banco não aprovado, obtendo ataque, cauda, brilho e fração de grave de cada arquivo.
2. Aplicar a fórmula da seção 3 em cada um e calcular o peso previsto.
3. Filtrar os que caem na faixa de peso que falta, com margem de meio ponto para cada lado.
4. Dentro desse filtro, ordenar por proximidade com o som aprovado mais parecido, olhando brilho e fração de grave. Um candidato de peso 8 com 95% de grave é primo do Woosh 11 e vai soar da mesma família; um candidato de peso 8 com 85% de agudo é primo do Woosh 2 e pertence a outra família.
5. Levar no máximo três candidatos para o dono ouvir, com o peso previsto e a família ao lado de cada um.
6. O que ele aprovar entra na biblioteca com a ficha completa, no mesmo formato da tabela da seção 2. O que ele reprovar volta para o banco e fica marcado como já ouvido e recusado, para não voltar na próxima pescaria.

A vantagem do método é simples: em vez de pedir para ele ouvir 44 sons, você pede para ele ouvir três, já filtrados pelo peso que a produção precisa e pela família sonora que combina com o que ele já aprovou. A medição faz o trabalho chato de triagem. O gosto continua onde sempre esteve, com ele.

## A armadilha do mono na mixagem (06/09/2026)

A saída da mixagem é estéreo e os arquivos de som são mono. Quando um arquivo mono é espalhado nos dois canais, ele perde 3 dB. O `mix-padroes.json` já compensava isso na VOZ da narração, com o campo `voz.ganho_db`, mas a VINHETA não tinha a mesma compensação, e por isso chegava sempre 3 dB abaixo do nível calculado. O gate da lei 9 reprovava um arquivo que estava certo.

Como foi achado: cinco preparos diferentes do mesmo arquivo, com médias e picos bem distintos, davam SEMPRE a mesma medida final de -20,6 dB. Valor que não muda quando o material muda só pode ser perda no caminho, nunca defeito do material. A pista estava na constância, não no número.

Corrigido em `scripts/video/mixar-final.js`: o ganho da vinheta soma `padroes.voz.ganho_db`, lido do mesmo lugar que a voz usa, para não existirem dois números.

**A regra maior:** todo som mono que entra numa mixagem estéreo precisa da mesma compensação. Se um dia entrar um terceiro elemento de som (uma segunda voz, um leitor de tela, uma assinatura falada), ele nasce com ela.

**E a regra de diagnóstico:** medida que não muda quando a entrada muda é perda de processo. Antes de mexer no material pela terceira vez, verificar se o número está reagindo ao que se está mudando.
