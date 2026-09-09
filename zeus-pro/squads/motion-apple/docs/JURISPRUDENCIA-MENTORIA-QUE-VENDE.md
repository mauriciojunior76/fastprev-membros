# Jurisprudência: "A mentoria que vende é business, não técnica"

Peça de referência do estilo Apple Conceitual para call de argumentação. Aprovada pelo o dono do canal em 06/09/2026, depois de 21 versões e 11 rodadas de correção. Este documento é a régua para os próximos materiais do mesmo tipo: o que ficou decidido aqui não se rediscute, se aplica.

## A peça

| Campo | Valor |
|---|---|
| Título | A mentoria que vende é business, não técnica |
| Arquivo | `mentoria-que-vende-e-business-INSTAGRAM.mp4` |
| Pasta da entrega | `CAMINHO_DA_SUA_PASTA` |
| Link | https://seu-dominio.com.br |
| Produção | `squads/motion/output/07-mentoria-tecnica-carlos/` |
| Código | `squads/motion/src/compositions/CarlosSemeReels/` |
| Versão final | `CarlosSemeReels-v21-som.mp4` |
| Duração | 56,90s (3414 quadros a 60 fps) |
| Formato | 1080x1920, H.264 high, yuv420p, bt709, faixa TV, faststart |
| Origem | Call Mentoria VIP com Carlos Seme Nejm Jr, 27/08/2026 |

## As 13 decisões que valem para as próximas peças

### 1. Densidade: uma cena por trecho de fala

13 cenas com esquema em 51 segundos, média de 3,9 segundos por cena, zero passthrough. Ordem dele: "cada fala pode ter uma cena, em cada fala pode ter um esquema conforme a necessidade".

Trecho sem símbolo óbvio quase sempre tem ESTRUTURA (contraste, etapas, causa e efeito, níveis, ramificação), e estrutura vira esquema. Passthrough só como respiro escrito, no máximo um a cada dez cenas.

### 2. Legenda não convive com texto no palco

| O palco tem | Legenda | Palco |
|---|---|---|
| Frase ou palavra em corpo 60 ou maior | cala | sobe |
| Dois ou mais rótulos de esquema | cala | sobe |
| Palavra que a legenda diria no mesmo instante | cala | sobe |
| Rótulo curto que não repete a fala | fica | normal |
| Só objeto, ícone ou foto | fica | normal |

Rótulo que repete a fala não entra: as pills "MUITO BOM" e "VÃO TE PAGAR" saíram por isso. Quando o registry e esta regra colidirem (o registry manda a legenda continuar em cena de interface), esta regra vence.

### 3. O esquema sai do registry, e a GEOMETRIA também

Este é o erro que mais custou nesta produção, e tem duas metades.

A primeira: escolher o molde pelo caminho do `AI_USAGE_GUIDE`, classificando a estrutura da fala, pegando de 2 a 4 candidatos no `semantic-registry`, comparando `useWhen` contra `dontUseWhen` no `visual-registry` e escrevendo o porquê. Três esquemas foram reprovados por eu ter pulado esse caminho: colunas para "acima da média" (era escala de intensidade), anéis concêntricos para "as pessoas" (era figura de gente), espelho para "na verdade é outra coisa" (era cartão de ideia).

A segunda, que eu só entendi na décima rodada: a geometria vem do `registry/build-registry.json`, copiada em pixel. Eu lia o registry para decidir QUAL molde e desenhava o molde de cabeça. A gangorra foi reprovada três vezes por isso, e quando comparei com o registro, quase nada batia: eixo 760 contra 520, traço 10 contra 6, prato 200 contra 240, altura 208 contra 300, e sem o pivô triangular, que é a peça que faz o desenho ser lido como balança.

Escolher o molde é ler o registry. Desenhar o molde também é. O que o registro não diz é só o conteúdo.

Não achando o recurso: fallback agora, criação depois pelo `CREATION-MANUAL.md`. Nunca inventar no meio da produção.

### 4. Ritmo: nada entra sem tempo de ser visto

- Elemento NOVO: 40 quadros para assentar mais 72 para ser lido, antes de a cena virar.
- Destaque em elemento que já está na tela: 36 quadros.
- Deslocamento longo: nunca abaixo de 60 quadros; com folga na cena, o movimento se estica em vez de terminar cedo.
- Traço que se desenha: 72 quadros ou mais com `settleSoft`. Curva certa em janela curta não mostra desaceleração, o olho vê a linha chegar em vez de assentar.
- Gate `tempo-de-leitura` no `choreo-lint` reprova sozinho.

### 5. Estrutura nasce inteira, destaque entra na palavra

A forma da cena (todos os nós, pratos, colunas, anéis) nasce junto, em cinza. O que chega na palavra é o destaque: preenchimento, anel, rótulo. Teste: se o elemento sumindo faz a cena deixar de ser reconhecível, ele é estrutura.

Recuo em esquema é só de cor, nunca desfoque que apague elemento da mesma ideia.

### 6. Movimento composto mora num grupo só

Peça que se move junto (prato pendurado no eixo, rótulo preso ao nó, seta ligando pontos que se deslocam) fica dentro de um grupo, e o grupo é que transforma. Só o TEXTO recebe contra-rotação, para ficar reto.

Duas rodadas foram gastas calculando compensação de posição por trigonometria. Enquanto existirem duas geometrias, sempre faltará uma compensação: primeiro faltou a altura, depois o deslocamento horizontal. Uma geometria só não tem o que compensar.

Corolário, que é a lei 10 do playbook aparecendo em movimento: quando uma peça depende da outra, a posição da segunda se calcula a partir da primeira, nunca se chuta.

### 7. O fecho, medido

| Momento | Instante |
|---|---|
| Fim REAL da fala (medido no áudio, não na transcrição) | 51,30s |
| Selo entra | 51,45s |
| Texto ZEUS aparece | 52,12s |
| Voz diz "Zeus" | 52,38s |
| Fim | 56,90s |

- O selo entra 0,15s depois do fim REAL da fala.
- O texto ZEUS revela em 24 quadros depois do selo montar (era 72), para a voz e o texto acontecerem juntos.
- A palavra grande do fecho não fica parada mais que 1,5s antes do selo: a sensação de demora começa AÍ, não no selo. Encurtar só o fecho não resolve, porque o defeito está na cena anterior.
- Vinheta `vinheta-zeus-voz-feminina.wav`, com sumiço de 1,45s: a peça termina, não é cortada.

### 8. Corte de fala

Borda de corte sai do ÁUDIO medido, nunca do timestamp da transcrição: a plosiva final soa depois do fim marcado. Pausa válida tem 250ms ou mais. Rodar `cortar-fala.js --ajustar-bordas` e ouvir a emenda.

O mesmo vale para achar o fim da fala ao montar o fecho: a transcrição marcava 51,06s e o som ia até 51,30s.

### 9. Dopamina: toda edição tem que dar um retorno

Ordem dele: "toda edição tem que gerar dopamina, toda edição tem que ser dopaminérgica; a gente já faz assim mas tem que estar sempre melhorando".

Na prática: quando a fala nomeia um evento com carga (comprar, vender, ganhar, perder), a tela dá o EVENTO em vez de só ilustrar o sujeito. Nesta peça, as três pessoas iguais viraram três pessoas com a do meio ganhando o cifrão no quadro da palavra "comprar", com som de caixa registradora.

Símbolo em badge pequeno vai em TEXTO, não em ícone: em 64px o glifo de cédula vira borrão e o cifrão se lê de longe. É o mesmo princípio do X e do check no badge de certo e errado.

### 10. Personalização: a foto vale mais que o rótulo

Quando o dado é sobre a PESSOA da call, a foto dela substitui o rótulo de texto. Ordem dele sobre o range do faturamento: "acho melhor substituir pela foto dele, com um tracinho ou algo vinculando, vai ficar mais legal, profissional e personalizado".

Preparo: recorte quadrado centrado no rosto, redimensão para o dobro do tamanho de tela, webp com qualidade 82. A foto do Carlos saiu de 6 MB para 4,6 KB.

### 11. Som que não existe no banco se busca pronto

Ordem dele quando faltou a caixa registradora: "com certeza tem na internet, ache uns 4, veja o melhor e coloque, sem IA e sem custo".

O método: baixar quatro candidatos de fonte livre para uso comercial (Mixkit e Pixabay servem download direto), medir os quatro (duração, pico, cauda até menos 30 dB, brilho, número de ataques) e escolher pelo critério do gesto, não de ouvido. O escolhido tinha dois ataques em 0,09 e 0,19s (o mecanismo e o sino) e pico imediato, que é o que permite cravar no frame da palavra. Catalogar com fonte e licença.

### 12. Entrega

Reencodar o render final convertendo a faixa de cor, porque o Remotion entrega em faixa cheia e o Instagram espera em faixa de TV:

```
-vf "scale=in_range=full:out_range=tv,format=yuv420p" -c:v libx264 -crf 16 -preset slow
-profile:v high -level 4.2 -colorspace bt709 -color_primaries bt709 -color_trc bt709
-color_range tv -x264-params "keyint=120:min-keyint=60" -movflags +faststart
-c:a aac -b:a 256k -ar 48000 -ac 2
```

Sem isso o preto sai lavado em alguns players.

O arquivo fica na pasta local, `entregas/videos/<slug>/`. Não publicar na VPS por iniciativa própria: "não coloque na VPS algo que eu não mandei; quando eu pedir link, deixa o link da pasta local, porque fica mais fácil pra eu achar e baixar". Quando um link já existe e a peça é corrigida, substituir o arquivo publicado, porque link servindo versão velha é pior que não ter link.


### 13. Trilha grave morre no corte de grave padrão

O padrão do mixador corta 180 Hz da trilha, para ela não brigar com os whooshes,
que são quase todos graves. Isso funciona para trilha de banda larga e **destrói**
trilha que vive no grave.

A trilha desta peça tinha 94% da energia abaixo de 250 Hz. Com o padrão, ela ficou
39,7 dB abaixo da voz: existia no arquivo e não existia no ouvido. Medir a fatia de
grave da trilha ANTES de mixar; acima de 80%, o corte desce para a faixa de 90 a
110 Hz.

O acerto final desta peça: corte em 90 Hz, volume -6 dB, abaixamento de razão 3.
Resultado medido: trilha 9 dB abaixo da voz, que é presença de fundo audível sem
competir. `--trilha-highpass` nasceu aqui.

**Como medir trilha de verdade:** nível médio do arquivo não serve. Uma trilha
16 dB abaixo da voz muda o nível total em 0,1 dB, o que é indistinguível de erro de
medição. O método certo é subtrair, amostra a amostra, a mixagem sem trilha da
mixagem com trilha: o que sobra é a trilha isolada, e aí o número é real.

## O que deu certo, e por quê

A cena mais elogiada foi a tríade médico, especialista, mini hospital: "ficou perfeito, lindo, maravilhoso, encaixou". Os seis motivos estão em `POR-QUE-A-TRIADE-FUNCIONOU.md`, e o resumo vale para qualquer esquema:

A cena encaixa quando o desenho revela uma estrutura que JÁ EXISTIA na fala, com as palavras dele, entrando no tempo dele. Os defeitos desta produção falharam todos em pelo menos um desses três pontos: forma imposta, palavra minha, ou tempo meu.

## Duas travas de processo que nasceram aqui

Valem para qualquer produção com mais de uma sessão trabalhando no repositório ao mesmo tempo.

Entrada isolada por peça: o bundle compila as 47 compositions do Root, então qualquer arquivo salvo por outra sessão derruba o render desta peça, o que aconteceu quatro vezes em minutos. Solução: `src/_root-<slug>.tsx` registrando uma composition só, que o `render.js` e o `get-compositions.js` usam quando existe.

Hash de aprovação por peça: a trava que amarra o aprovado ao renderizado cobria o `src/` inteiro, com o mesmo efeito. Agora `hashSrc(composition)` cobre a pasta da peça mais `core` e `modules`. A garantia continua, sem depender de trabalho alheio.

## O custo, e por que este documento existe

21 versões e 11 rodadas de correção. Os defeitos com a regra de cada um estão em `MEMORY.md` e no `CATALOGO-DE-ERROS-VISUAIS.md` (defeitos 21 a 30).

Olhando o conjunto, quase tudo que ele reprovou cai em três causas:

1. Eu decidia por intuição onde havia registro. Escolha de esquema e geometria. Cada vez que abri o registry antes, acertei de primeira.
2. Eu consertava o sintoma, não a causa. A gangorra levou três rodadas porque eu ajustava número em vez de olhar a estrutura. O fecho levou duas porque eu encurtava o selo quando o defeito estava na cena anterior.
3. Eu confiava no dado errado. Timestamp de transcrição para cortar áudio, curva sem olhar a janela, média de arquivo sem considerar o que o processo faz com ela.

A próxima peça desta categoria não deveria repetir nenhuma delas. É para isso que este documento existe.
