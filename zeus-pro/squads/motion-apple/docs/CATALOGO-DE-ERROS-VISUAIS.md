# Catálogo de erros visuais do zeus-motion

Este documento reúne os 14 defeitos visuais encontrados na produção do PauloRuizReels, o reel vertical sobre como o Instagram do mentor precisa estar montado antes de rodar tráfego, que levou 11 rodadas de correção até ser aprovado. Leia antes de começar qualquer vídeo novo do squad zeus-motion e leia de novo antes de dar uma cena por pronta. A parte mais útil não é a lista de casos: são as cinco causas raiz e a régua de decisão no fim, que valem para qualquer produção futura.

## Os 14 defeitos

| Nº | Sintoma, na descrição do dono | Causa raiz em uma frase | Correção aplicada | O que impede a repetição |
|---|---|---|---|---|
| 1 | "cada vídeo é único, cada cena é única, o conceito e o estilo seguem iguais, mas as imagens não podem ser iguais" | A cena de perfil reaproveitou o mesmo objeto tridimensional de celular que já tinha aparecido em outro reel | Peça protagonista nunca se repete entre produções; dentro do mesmo vídeo, repetir continua permitido e se chama bookend, ou seja, a peça de abertura volta no fechamento | Regra de padrão fixo |
| 2 | "a logo do instagram tu não deveria criar deveria pegar na internet, logo de empresas marcas ou imagens padrão jamais deve criar sempre buscar em locais que tenham as imagens" | O logo foi desenhado à mão, com contornos aproximados em vez do arquivo oficial | Logo de terceiro passa a vir sempre do arquivo oficial, redesenhado a partir da fonte real em formato que não perde qualidade ao ampliar | Regra de padrão fixo |
| 3 | Logo errado mesmo depois de buscar: entrou o símbolo da câmera quando o pedido era a logo em texto | Foi buscada a versão errada da marca, o símbolo no lugar da marca escrita | O dono enviou a peça certa, que foi limpa por corte de fundo e convertida para formato que não perde qualidade ao ampliar, com o programa vtracer | Revisão por print |
| 4 | O gradiente reiniciava a cada letra, em vez de atravessar a palavra inteira | O conversor entrega cada letra como um desenho com deslocamento próprio, e o gradiente reinicia a cada deslocamento | O deslocamento de cada letra foi embutido nas próprias coordenadas, com a biblioteca svgpathtools, de forma que todas as letras passam a dividir o mesmo espaço de cor | Regra de padrão fixo |
| 5 | "ainda ficou lavada a cor, tem que ser na cor normal na frente de tudo, sem máscaras, sem reduzir opacidade" | A tentativa intermediária resolveu a cor com máscara, e máscara funciona por brilho: a borda suavizada de cada letra entra em cinza e lava a cor | Cor aplicada direto, na frente de tudo, sem máscara e sem redução de transparência | Regra de padrão fixo |
| 6 | Paleta pastel some quando vira texto grande preenchido | As cores do espectro da marca são pastéis e só têm força em traço fino de 6 pixels | Mesmas cores, em força cheia, para texto; o pastel continua valendo só no traço | Regra de padrão fixo |
| 7 | "o retângulo ao redor delas está muito encostado" | Os rótulos dos destaques estavam dentro de uma pílula de largura fixa e o texto encostava e ultrapassava a borda | Fonte e caixa recalculadas com folga real, e quebra de linha proibida nesses rótulos | Gate automático |
| 8 | "o alinhamento está errado, mal formatado, espaçamentos, aplica conceito de layout profissional" | Grade dos cinco propósitos com conteúdo mais estreito que a célula, encostado à esquerda, linha horizontal caindo bem onde a segunda fileira começava e sobra de linha ao lado de célula vazia | Virou grade de feed com seis blocos iguais, conteúdo centralizado dentro de cada bloco, respiro igual entre eles e o sexto bloco vazio de propósito | Revisão por print |
| 9 | Um X gigante riscado cobria justamente a foto que a cena precisava mostrar, e o lado certo não tinha marca nenhuma | A marcação de erro foi desenhada por cima do conteúdo, sem par simétrico no acerto | Dois selos simétricos: X vermelho na foto errada e check verde na certa | Revisão por print |
| 10 | Na cena final, o check verde ficava por cima da última letra do logo | Selo posicionado sobre o texto, sem espaço reservado | Logo e check na mesma linha, centralizados, com respiro entre eles | Revisão por print |
| 11 | Depois de "incluso.", a palavra "E" aparecia sozinha na tela | A junção de palavra fraca solitária só olhava para trás e grudava a palavra na frase anterior, que já tinha terminado em ponto | Quando a palavra fraca abre frase nova, ela passa a juntar para a frente | Gate automático |
| 12 | A legenda repetia o que a própria tela já mostrava | Nas cenas em que o texto está desenhado na tela, a grade com o número 12 e os três destaques com ícone e rótulo, a legenda continuava ligada | Essas cenas passaram a calar a legenda | Regra de padrão fixo |
| 13 | Foto vertical dentro do círculo virou barra branca nas laterais, e o retrato cortava o queixo | O recorte da foto não estava definido por número, ficava a cargo do comportamento padrão | Recorte definido por número, com respiro abaixo do rosto, e escolha explícita entre preencher o círculo ou caber inteiro dentro dele | Revisão por print |
| 14 | Travamento do rosto, o olho lê como engasgo | A imagem do rosto sai a 25 quadros por segundo e a animação roda a 60; como 60 não é múltiplo de 25, cada quadro do rosto se repete de forma irregular | RESOLVIDO em 06/09/2026 na produção do Carlos Seme: os tiles passam por uma reexportação a 60 quadros antes de entrar na composition, então a duplicação fica gravada no arquivo, uma vez só, em vez de ser decidida a cada render | Gate automático: `checar-cadencia.js` reprova qualquer material cuja taxa não divida a da peça |

## Os defeitos da terceira rodada do Carlos Seme (06/09/2026)

| Nº | Sintoma, na fala dele | Causa raiz | Correção | O que impede a repetição |
|---|---|---|---|---|
| 31 | "ainda tá errado a gangorra, tem que fazer certinho, cuidar o eixo, conferir depois de fazer, revisar" | Terceira reprovação da mesma cena. Eu tinha desenhado a balança de cabeça: comparada com o `compare.balance.v1` do build-registry, quase nada batia, e faltava o pivô triangular, que é a peça que faz o desenho ser lido como balança | Componente refeito com a geometria copiada em pixel do registro, e tudo que se move dentro de um grupo só | Item de checklist: a geometria vem do build-registry, não da cabeça |
| 32 | Prato descolando da haste com o eixo inclinado | O eixo girava dentro de um SVG e os pratos eram elementos de fora. Duas rodadas foram gastas calculando compensação: primeiro faltou a altura, depois o deslocamento horizontal | Um grupo só, que transforma. Só o texto recebe contra-rotação | Regra de padrão fixo |
| 33 | "aparece 3 pessoas iguais mas eu falo as pessoas que vão comprar" | A cena ilustrava o sujeito (pessoas) e não o evento que a fala nomeia (comprar) | A figura do meio ganha o badge do cifrão no quadro da palavra, com som de caixa registradora | Regra da dopamina: fala com evento de carga ganha o evento na tela |
| 34 | O badge com ícone de cédula ficou ilegível em 64px | Glifo composto em tamanho pequeno vira borrão | Símbolo em badge pequeno vai em TEXTO (o cifrão), como o X e o check já fazem | Regra de padrão fixo |
| 35 | "está escrito seu faturamento, mas acho melhor a foto dele com um tracinho vinculando, fica mais profissional e personalizado" | Rótulo genérico onde o dado é sobre a pessoa da call | A foto dela em círculo, ligada ao marcador por um cordão, viajando junto | Regra de padrão fixo |

### A causa raiz nova: usar o registro só para escolher, e não para desenhar

Os defeitos 31 e 32 fecham um ciclo que começou no defeito 21. Durante toda a produção eu abri o registry para decidir QUAL molde usar, e desenhei o molde pela minha ideia do que ele era. O `build-registry.json` do 3.2 traz a geometria em pixel de cada peça: itens, tamanhos, traços, colunas, vãos, altura da tinta e a timeline em quadros.

A partir daqui: escolher o molde é ler o registry, e desenhar o molde também é. O que o registro não diz é só o conteúdo.

## Os dois defeitos de mecânica (06/09/2026, segunda rodada do Carlos Seme)

Os dois são de MECÂNICA, não de escolha: o recurso estava certo, o desenho estava certo, e o movimento é que estava errado. Por isso valem para toda peça que usar o mesmo efeito.

| Nº | Sintoma, na fala dele | Causa raiz | Correção | O que impede a repetição |
|---|---|---|---|---|
| 29 | "a linha da ênfase colorida não ficou desacelerando no final... é legal o traço começar rápido mas ele tem que desacelerar no final, efeito After Effects" | O traço da palavra desenhava em 40 quadros. A curva já era a certa (`settleSoft`, que deixa 15% do caminho para os últimos 30% do tempo), mas em 0,67s a cauda inteira dura 0,2s e o olho não vê desaceleração: vê a linha chegar | Janela de 72 quadros (1,2s), que é o número que o livro do estilo já mandava para traço que se desenha | Regra de padrão fixo, e o `DRAW_PROGRESS_WINDOW` do choreo-lint já é 72 |
| 30 | "a gangorra ficou legal, o efeito suavizado, mas ela desconfigurou, provavelmente porque não foi mapeado direito os eixos dos movimentos" | O travessão girava de verdade, em torno do centro, e os pratos desciam 22 e 44 pixels, valores que eu escolhi a mão. Como não correspondiam à altura real da ponta girada, o prato descolava da haste | A altura de cada prato passou a sair da geometria: ponta a uma distância D do centro sobe ou desce `D × tan(ângulo)` | Regra de padrão fixo |

### A causa raiz nova: número escolhido a mão onde existe conta

O defeito 30 é o mesmo erro que a lei 10 do playbook já nomeia ("todo mockup nasce com grid derivado, zero número mágico solto"), aparecendo agora em MOVIMENTO em vez de layout.

Sempre que duas partes se movem juntas e uma depende da outra (prato pendurado no travessão, rótulo preso ao nó, seta ligando dois pontos que se deslocam), a posição da segunda se CALCULA a partir da primeira. Chutar o valor funciona no primeiro frame e quebra em todos os outros.

Teste antes de fechar qualquer movimento composto: se eu dobrar o ângulo ou a distância, as peças continuam juntas? Se não continuam, tem número chutado no meio.

### A régua de duração de traço

Traço que se desenha (marca sob palavra, conector, eixo, cota) nunca abaixo de 72 quadros com `settleSoft`. Abaixo disso a curva existe mas não é percebida, e o efeito lê como linha que aparece em vez de linha que assenta.

## Os defeitos da segunda rodada do Carlos Seme (06/09/2026)

Sete apontamentos do o dono do canal vendo o v05 inteiro. Três são escolha errada de esquema, três são de ritmo e um é a regra de convivência entre legenda e palco.

| Nº | Sintoma, na fala dele | Causa raiz | Correção aplicada | O que impede a repetição |
|---|---|---|---|---|
| 21 | "tem um gráfico de velas com um retângulo preto feio demais, isso tá errado" | Duas colunas preenchidas para mostrar "acima da média". Coluna é massa comparável; a fala pedia POSIÇÃO dentro de uma faixa | Escala de intensidade: trilho, marca da média no meio, botão que desliza com o rótulo do faturamento. O movimento é o argumento | Heurística escrita: "acima de", "abaixo de", "de 1 a 10" pedem escala, nunca coluna |
| 22 | "no segundo 11 tem a legenda e tem as frases grandes; tem que tirar a legenda quando tem uma frase maior" | A legenda ficava ligada por padrão e só calava nas palavras grandes N3 | Régua nova de convivência (abaixo), aplicada a 8 das 13 cenas | Régua fixa, conferida no checklist |
| 23 | "no segundo 14 fala um mini hospital, passa muito rápido... não pode ter animação que a gente não consiga ver" | O terceiro nó entrava a 0,56s do fim da cena | A cena passou a terminar em 16,28s: 1,58s de leitura | Gate automático `tempo-de-leitura` no choreo-lint |
| 24 | "no segundo 25, fica parado muito tempo e aí tem uma movimentação rápida na parte do business" | A gangorra virava em 0,5s no fim de uma cena de 7s | Dois giros longos casados com a fala: 1,5s pendendo para a técnica, 2,5s virando para o business | Regra: movimento ocupa o tempo que a cena tem |
| 25 | "o círculo ali não gostei, ficou mal feito, não foi a melhor escolha" | Anéis concêntricos para "as pessoas que vão comprar": geometria abstrata para sujeito humano | Trio de figuras de pessoa, sem rótulo | Heurística: grupo de pessoas pede figura, nunca forma geométrica |
| 26 | "jamais a gente vai repetir uma palavra no bullet e na legenda" | "evoluiu" aparecia na legenda e no palco no mesmo instante | Cenas com texto no palco calam a legenda; pills que repetiam a fala foram removidas | Item do checklist |
| 27 | Pills da balança giravam junto com o travessão e o texto ficava torto | A inclinação era aplicada ao grupo inteiro | Contra-rotação: o travessão inclina, o prato desce, o texto fica reto | Revisão por print |
| 28 | O circunflexo de VOCÊ era cortado no topo | Entrelinha 1 em caixa alta com acento | Entrelinha 1,18 em palavra grande acentuada | Regra de padrão fixo |

### A régua de convivência entre legenda e palco

| O que o palco tem | Legenda | Palco |
|---|---|---|
| Frase ou palavra em corpo 60 ou maior | cala | sobe e ocupa o canal da fala |
| Dois ou mais rótulos de esquema | cala | sobe |
| Qualquer palavra que a legenda diria no mesmo instante | cala | sobe |
| Um rótulo curto que não repete a fala | fica | normal |
| Só objeto ou ícone, sem texto | fica | normal |

Quando a legenda cala, o palco herda o canal dela: não fica buraco branco no meio da tela. Quando o palco não tem texto, a legenda volta.

### A causa raiz nova: escolher o esquema pela forma, não pelo que a fala pede

Os defeitos 21 e 25 são o mesmo erro. Nos dois eu escolhi um esquema que era bonito de desenhar em vez do que a lógica da fala pedia. A pergunta certa não é "que desenho cabe aqui", é "que tipo de informação é esta":

- posição dentro de uma faixa, com movimento → escala
- massa comparável entre itens → coluna ou barra
- grupo de pessoas → figura de gente
- oposição entre dois estados → espelho ou balança
- etapas em ordem → passos
- saídas sem ordem → ramificação

## Os defeitos da produção do Carlos Seme (06/09/2026)

Seis defeitos novos, encontrados olhando um frame de cada cena antes da entrega. Os quatro primeiros têm a mesma raiz e por isso viraram uma regra só.

| Nº | Sintoma | Causa raiz em uma frase | Correção aplicada | O que impede a repetição |
|---|---|---|---|---|
| 15 | A etapa MÉDICO sumia da sequência de três passos, e a raiz da ramificação sumia enquanto as folhas nasciam | O recuo forte do sistema, desfoque 6 e opacidade 0,45, foi aplicado a elementos que ainda formam a ideia junto com o que está em foco | Recuo só de cor nesses casos: cinza no lugar do preto, opacidade no máximo 15 por cento abaixo | Regra de padrão fixo, escrita no ERRO #5 da memória do squad |
| 16 | A balança passava seis segundos com um prato só e não lia como balança | A entrada de cada peça foi casada com a palavra que a nomeia, inclusive as peças que formam a ESTRUTURA | Estrutura nasce inteira e neutra no começo da cena; a palavra traz o destaque, não a forma | Revisão por print, um frame por cena |
| 17 | A coluna que representava o faturamento era um contorno vazio, e altura vazia não comunica altura | O molde desenhava a coluna como caixa de borda, seguindo o padrão de célula, quando o argumento da cena era massa | Coluna, faixa e prato nascem preenchidos: preto no foco, cinza claro no resto | Revisão por print |
| 18 | Dois segundos de tela quase branca antes da palavra grande aparecer | A palavra entrava no quadro 130 de uma cena de 202, para fechar exatamente na palavra falada | A palavra entra cedo e o TRAÇO assenta junto com a fala: a relação com a voz fica no gesto que fecha, não no que abre | Gate automático de ritmo, que já mede quadros parados no fim, mais revisão por print para o começo |
| 19 | Três anéis concêntricos vazios não diziam "as pessoas que vão comprar" | Esquema puramente geométrico usado para um assunto que precisa de sujeito | Ícone no centro nomeando o assunto, com o rótulo entrando na palavra | Regra de padrão fixo |
| 20 | Texto de três palavras espremido em três linhas dentro do nó circular | O nó foi tratado como círculo fixo de 128, quando o vocabulário do sistema aceita círculo OU pill para nó | Raiz com texto longo vira pill, que cresce na largura | Revisão por print |
| 21 | Etiqueta de preço com corte em V e furo de cordão, elemento que nunca existiu no sistema | O componente declarou a exceção `objeto-lei-3b`, que libera desenhar objeto CITADO na fala, mas a fala dizia "uma venda de um produto barato" e nunca citou etiqueta: a exceção virou licença para inventar metáfora visual | A lei 3b vale só para o objeto literalmente citado. Metáfora de conceito é molde, e molde sai do índice | Gate automático: `checar-design-system.js` e `checar-build-registry.js`, agora dentro do `pre-render-validate` |
| 22 | X vermelho de traço largo atravessando a estrutura inteira | O vermelho semântico foi usado como desenho livre, quando o guia só o define como badge de 64 no canto inferior direito, anel 3 | Veredito negativo é sempre o badge oficial, nunca traço sobre o objeto que a cena precisa mostrar | Gate automático de geometria contra o build-registry |
| 23 | Fluxo de quatro etapas com todos os anéis em cinza, sem nenhum portador de cor | Toda a documentação combatia anel COLORIDO DEMAIS (erros 35 e 10) e nenhuma linha dizia que esquema sem cor nenhuma também é defeito | Cena de esquema tem um portador de cor, com o par colorido sobre cinza e a regra do foco | Revisão por print, e a regra do foco escrita desde o primeiro rascunho |
| 24 | Pergunta destilada no palco sem o ponto de interrogação, com a legenda calada | No encurtamento da fala para caber no palco, a pontuação caiu, e sem legenda o palco era o único canal do trecho | Fala interrogativa que vai para o palco leva a interrogação junto | Revisão por print |

### A causa raiz nova: confundir estrutura com destaque

Os defeitos 16, 17, 18 e 19 são o mesmo erro em quatro roupas. A sincronia por palavra é lei da categoria, e por isso virou hábito casar TUDO com a fala. Só que numa cena existem duas camadas diferentes:

- **A estrutura** é o que dá forma à cena: os três nós, os dois pratos, as duas colunas, os anéis. Ela nasce inteira e neutra no começo, senão o espectador olha para uma tela incompleta e não entende o que está vendo.
- **O destaque** é o que a fala está dizendo agora: o preenchimento, o anel de cor, o rótulo, o número. Esse sim entra no quadro exato da palavra.

Regra de bolso: se o elemento sumindo faz a cena deixar de ser reconhecível, ele é estrutura e nasce cedo. Se o elemento sumindo só tira a ênfase, ele é destaque e entra na palavra.

## As cinco causas raiz por trás dos 14 defeitos

### Origem 1: material de fora tratado como se fosse nosso
Defeitos 1, 2 e 3.

Sempre que a cena precisa de uma peça que não nasceu conosco, logo de marca, foto, objeto reconhecível, a tentação é desenhar ou reaproveitar. As duas saídas dão errado pelo mesmo motivo: o espectador reconhece a marca e reconhece o vídeo anterior. Vale como lei geral: peça de terceiro vem da fonte oficial, e peça protagonista nasce nova a cada produção.

### Origem 2: a ferramenta técnica muda o resultado visual sem avisar
Defeitos 4, 5 e 13.

O conversor quebra a palavra em letras com deslocamento próprio, a máscara lava a cor por causa do brilho da borda, e a foto sem recorte definido se encaixa como o padrão do sistema quiser. Em todos os três, o código estava "certo" e a tela estava errada. O padrão que fica: toda etapa automática que transforma imagem precisa terminar com um número escolhido por nós, nunca com o padrão da ferramenta.

### Origem 3: valor calibrado num contexto, usado em outro
Defeitos 6 e 7.

O pastel foi calibrado para traço fino de 6 pixels e morreu no texto cheio. A caixa dos rótulos foi calibrada para um texto mais curto e estourou com outro. Um número que funciona numa escala não funciona noutra: cor tem contexto de área, caixa tem contexto de comprimento. Ao mudar tamanho, área ou quantidade de texto, o número precisa ser recalculado, não herdado.

### Origem 4: composição decidida no código, sem olhar o retângulo inteiro
Defeitos 8, 9 e 10.

A grade mal formada, o X cobrindo a informação e o selo em cima da letra são o mesmo erro: cada elemento foi posicionado sozinho, e ninguém olhou a cena como um quadro. Layout profissional é decisão de conjunto: mesmo respiro entre blocos, conteúdo centralizado, marcação ao lado do conteúdo e nunca por cima, simetria entre o lado certo e o errado.

### Origem 5: a legenda tratada como camada automática
Defeitos 11 e 12.

A legenda foi ligada por toda a duração e a regra de junção de palavras só olhava para trás. O resultado é palavra órfã na tela e texto repetido quando a cena já mostra o texto. A legenda é uma decisão por cena, não um interruptor geral: se a tela já diz, a legenda cala; e a junção de palavra fraca precisa olhar para os dois lados, porque palavra que abre frase pertence à frase seguinte.

O defeito 14, o travamento do rosto, fica fora das cinco por ser de outra natureza: é um descompasso de ritmo entre dois arquivos, não um erro de composição. Serve de lembrete próprio: quando duas peças rodam em velocidades diferentes e uma não é múltipla da outra, o olho percebe o engasgo mesmo sem saber explicar.

## O que só o print revela

O método que descobriu a maioria destes defeitos foi simples: gerar um print de cada cena e olhar, antes de renderizar o vídeo inteiro. Vários deles eram invisíveis no código e óbvios no print. Os tipos de defeito que só aparecem assim:

| Tipo de defeito | Por que não aparece no código |
|---|---|
| Texto encostando ou ultrapassando a borda da caixa | O código só diz o tamanho da caixa e o tamanho da fonte; a largura real do texto depende da fonte carregada e das letras específicas |
| Cor que some ou fica lavada | O valor da cor está correto no arquivo; o que falha é o contraste contra o fundo e a área ocupada |
| Gradiente reiniciando por letra | Cada letra tem a mesma definição de cor no código; a diferença nasce do deslocamento próprio de cada letra |
| Grade com alinhamento errado | O código descreve a grade como regular; o desalinhamento vem do conteúdo ser mais estreito que a célula |
| Elemento cobrindo informação importante | O código só diz onde cada elemento está; qual deles esconde o quê só se vê empilhado na tela |
| Foto cortando o rosto ou deixando barra branca | O enquadramento final depende da proporção do arquivo real, que o código não conhece |
| Peça repetida de outro vídeo | O arquivo tem nome válido e caminho certo; a repetição só é percebida pela memória visual de quem assiste |
| Legenda redundante | O texto da legenda e o texto da tela são gerados em lugares diferentes; a duplicação só é visível junta |

Regra prática: se o defeito depende de proporção, contraste, sobreposição ou memória de outro vídeo, o print é o único juiz.

## Régua de decisão

Antes de dar qualquer cena por pronta, responda sim a todas as perguntas abaixo. Um único não significa cena não aprovada.

**Material**
1. A peça protagonista desta cena é nova, sem repetir nada de outra produção?
2. Todo logo, marca ou imagem padrão veio de arquivo oficial, em vez de desenhado?
3. A versão do logo é a certa, símbolo ou texto, conforme o pedido?

**Cor e texto**
4. A cor está aplicada direto, na frente de tudo, sem máscara e sem redução de transparência?
5. As cores estão em força compatível com a área: cheia no texto preenchido, pastel só no traço fino?
6. Todo texto cabe dentro da própria caixa com folga real, sem encostar e sem quebrar linha onde a quebra é proibida?

**Composição**
7. Os blocos têm o mesmo respiro entre si e o conteúdo está centralizado dentro de cada bloco?
8. Nenhum selo, marca ou elemento decorativo cobre informação que a cena precisa mostrar?
9. Quando existe um lado certo e um errado, os dois têm marcação simétrica?
10. Todo recorte de foto está definido por número, com respiro abaixo do rosto e escolha explícita entre preencher o círculo ou caber inteiro dentro dele?

**Legenda**
11. Se a tela já mostra o texto, a legenda está calada nesta cena?
12. Nenhuma palavra fraca ficou sozinha na tela, e palavra que abre frase nova foi juntada para a frente?

**Ritmo**
13. Toda peça em movimento roda numa velocidade compatível com os 60 quadros por segundo da animação, sem repetição irregular de quadro?

**Verificação**
14. Existe um print desta cena e alguém olhou o print, não só o código?
15. A folha de aprovação do `scripts/storyboard.js` foi gerada antes de qualquer render?
16. As notas F1 a F7 foram registradas no `scripts/qa-approve.js` e nenhuma ficou abaixo de 8?
17. O `scripts/render.js` rodou por último, com o `scripts/pre-render-validate.js`, o `scripts/choreo-lint.js` e o `scripts/qa-frames.js` passando sem reprovar?
18. O critério aplicado confere com o `docs/STYLE-APPLE-CONCEITUAL.md` e com o protocolo P0 a P11 do `docs/ZOOM-REEL-MOTION.md`?

## Anexo: biblioteca de efeitos sonoros aprovada

Dos 48 sons da coleção, apenas cinco foram aprovados. Os demais o dono achou feios e ficam como banco não aprovado: só entram se ele aprovar um a um. As medidas abaixo foram feitas com o `scripts/analisar-sfx.py`.

| Som | Formato | Duração | Pico | Ataque | Cauda | Brilho | Grave | Agudo | Peso |
|---|---|---|---|---|---|---|---|---|---|
| Woosh 2 | wav | 4,87 s | 0,34 s | 0,18 s | 0,72 s | 12228 Hz | 13% | 85% | 10 |
| Woosh 11 | wav | 1,64 s | 0,79 s | 0,35 s | 0,33 s | 1939 Hz | 95% | 0,2% | 7 |
| Woosh 6 | mp3 | 1,70 s | 0,81 s | 0,34 s | 0,33 s | 1599 Hz | 96% | não medido | 6 |
| Woosh 5 | mp3 | 0,91 s | 0,46 s | 0,19 s | 0,19 s | 1421 Hz | 94% | não medido | 4 |
| Woosh 14 | mp3 | 2,06 s | 0,24 s | 0,09 s | 0,36 s | 6881 Hz | 47% | 12% | 3 |

O modelo que reproduz a percepção do dono, calibrado nesses cinco pontos por mínimos quadrados, com erro médio de 0,4 ponto:

```
peso = 52,82 x (ataque + cauda)  menos  84,88 x ataque  mais  27,37 x (fração de grave)  menos  25,95
```

Em português: o que mais pesa é o tamanho do trecho audível do som; ataque muito longo sozinho alivia o peso, porque o som vira uma aproximação suave em vez de um golpe; e quanto mais grave, mais peso.

Onde os sons foram aplicados no teste, e funcionou:

| Momento da cena | Som | Peso |
|---|---|---|
| As duas palavras-conceito grandes com traço colorido embaixo | Woosh 2 | 10 |
| A grade dos 12 posts e o número de 50 mil | Woosh 11 | 7 |
| O recap e o perfil pronto | Woosh 6 | 6 |
| Trocas simples de cena | Woosh 5 | 4 |

Regra de posicionamento que vale para todos: o instante em que o som deve começar é o instante desejado do pico menos o tempo de pico dentro do próprio arquivo. No caso das palavras-conceito, o pico cai no quadro exato em que o traço começa a ser desenhado. Volume entre 9 e 15 decibéis abaixo, e quanto mais leve o som, mais baixo ele entra.

## O anel contorna o PAI, e por isso so pode ser filho de uma forma (07/09/2026)

Reprovado pelo o dono do canal no fecho do Reel da Kamila: "no final o 21 dias tem um
circulo menor que parece feito no olho, o anel colorido nao esta alinhado".

O `AnelEspectro` nao desenha um circulo proprio: ele se posiciona com
`position: absolute; inset: -espessura` sobre o elemento PAI, e o `diametro`
que se passa serve so para escolher a espessura pela tabela (3 ate 48, 4 ate
100, 6 acima). Em `SeisMesesVs21Dias.tsx` eu passei `diametro={CIRCULO * 2}`
tendo como pai a caixa de texto do numero: o anel abracou a bounding box do
glifo "21", com o formato de pilula, e o "192" nao correspondia a nada
desenhado na tela.

Regra: o anel so pode ser filho de um elemento com largura e altura
declaradas e `position: relative`, e o `diametro` e sempre a dimensao REAL
desse elemento. Quando o alvo nao e circular, passa-se tambem o `raio`
(`raio={RAIO.painel}` para cartao, `RAIO.pill` para pilula), como
`CartaoIdeiaMentoria.tsx:159` e `Balanca.tsx:161` ja faziam nas pecas
aprovadas. Numero grande nao recebe anel: quem recebe e o cartao que o contem.

## Molde novo nasce da geometria de um molde aprovado (07/09/2026)

Na mesma peca, tres moldes foram escritos do zero e inventaram proporcao:
frase com icone com circulo 168 (o aprovado e 120), trilha com no 92 e icone
40 (o aprovado e 112 e 48), rotulo como texto solto (o aprovado e pill de 64 a
24 do circulo). Sozinho cada numero parecia razoavel; junto, a peca saiu da
familia visual das outras tres.

A escala e fechada e vive nas pecas aprovadas: atributo solo 180 com icone 80,
trio 148 com icone 64 e coluna 264, frase com icone 120 com icone 56, passos
112 (124 na Fernanda) com icone 48, comparacao 200 com icone 88 e coluna 320.
Quando a quantidade de itens nao cabe, o que aperta e a COLUNA e o CONECTOR,
nunca o no e o icone.

Junto com isso faltava o desfoque de entrada (6 para 0 em 20 quadros,
easyEase) em circulo e icone, presente em quatro componentes do Carlos, tres
da Fernanda e sete da Aline, e ausente em toda a peca nova. Blur so em icone e
imagem, nunca em texto.

## Os quatro gates que travam isso em codigo (07/09/2026)

Os defeitos acima (anel em volta do texto, escala inventada, saida deslocando,
item cruzando o vizinho) deixaram de depender de alguem lembrar. Todos os
quatro rodam no `scripts/choreo-lint.js`, que o `pre-render-validate.js` chama
antes de qualquer render:

- `palco-desloca` (ERRO): `MotionStage` chamando `applyChoreo` com elementos
  que declaram `ownsMotion`. E o que fazia a cena subir por cima do rosto na
  saida. Nas aprovadas o palco so aplica opacidade.
- `anel-sem-forma` (ERRO): `<AnelEspectro diametro={conta}>`. O anel contorna o
  PAI, entao o diametro tem que ser a dimensao real de um elemento que existe.
  Alvo nao circular leva `raio` junto.
- `escala-de-circulo` (AVISO): `CIRCULO`, `NO_D` ou `ICONE` fora da escala das
  pecas aprovadas (circulo 44 a 220 da lista fechada, icone 24 a 88).
- `largura-da-linha` (ERRO): N itens em linha somando mais que os 904 do palco,
  contando a largura declarada pela cena e o respiro do molde. E o defeito do
  segundo 44: cartao cruzando o vizinho e rotulo cortado.

Os quatro foram testados injetando o defeito e conferindo que reprovam, e
depois desfazendo.
