# Processo do reel de Zoom: o que é automático, o que é padrão, o que exige pensar

Documento de operação do squad zeus-motion. Base real: a produção do PauloRuizReels, o reel vertical sobre como o Instagram do mentor precisa estar montado antes de rodar tráfego. Esse vídeo passou por 11 rodadas de correção até ser aprovado no visual. Este documento existe para que a rodada 12 do próximo vídeo nunca mais aconteça pelos mesmos motivos.

O objetivo é um só: parar de pensar de novo naquilo que já foi pensado, sem transformar o sistema num robô cego.

---

## 1. As três camadas

**AUTOMÁTICO.** A etapa tem resposta certa que a máquina mede sozinha, com número, e ou passa ou reprova. Custo de raciocínio: zero.

**PADRÃO.** A etapa tem resposta fixa que já foi decidida uma vez, está escrita, e agora é só aplicar sem discutir. Custo de raciocínio: mínimo, o de consultar e obedecer.

**PENSADO.** A etapa depende de ler a fala do mentor, entender o sentido do que ele está dizendo e escolher. Não existe resposta certa medível. Custo de raciocínio: cheio, e é aqui que o esforço de análise deve ser gasto.

---

## 2. O teste de uma pergunta só

> **Duas pessoas diferentes, com a mesma informação na frente, chegariam ao mesmo resultado?**

- **Sim, e dá para medir com número.** É AUTOMÁTICO. Vira script, vira trava de verificação, nunca mais volta para a conversa.
- **Sim, porque já está escrito qual é a resposta.** É PADRÃO. Vira linha no livro de estilo ou no protocolo, e é consultado, não debatido.
- **Não, porque depende de entender o que a frase quer dizer.** É PENSADO. Fica com o humano ou com o Claude Code lendo a transcrição, e ninguém tenta automatizar.

Regra de bolso que resolve quase todos os casos duvidosos: se a resposta muda conforme o assunto da call, é PENSADO. Se a resposta é a mesma em qualquer call, é PADRÃO ou AUTOMÁTICO.

---

## 3. Tabela mestre: todas as etapas, da gravação bruta até a entrega

### Fase A: matéria-prima

| Etapa | Camada | Quem executa | Comando ou regra | O que acontece se pular |
|---|---|---|---|---|
| Receber a gravação da call do Zoom | PADRÃO | Operador | Arquivo vai para a pasta da produção com nome do reel | Material se perde entre produções e a versão errada vira base |
| Escolher o trecho da call que vira reel | PENSADO | Humano ou Claude lendo a transcrição | Precisa ter começo, meio e uma virada de ideia | Reel sem tese, o espectador não entende por que aquilo existe |
| Mapear a gordura da fala (repetição, reformulação, vício, fim interrompido) | PENSADO com apoio automático | Claude roda o script, humano decide | `node squads/motion/scripts/mapear-redundancia.js <narration.json>` | Reel carrega a mesma ideia duas vezes e termina numa fala interrompida |
| Cortar os trechos aprovados do bruto | AUTOMÁTICO | Máquina | `node scripts/video/cortar-fala.js <zoom.mp4> --cortes <cortes.json> --narration <narration.json> --confirmar` | Corte na mão, sem gate, cai no meio da palavra e muda a taxa de quadros sem ninguém ver |
| Transcrever com tempo por palavra | AUTOMÁTICO | Máquina | `scripts/transcribe-words.py` | Sem tempo por palavra a legenda nunca cola na voz e o áudio desencontra do texto |
| Cortar silêncios da voz | AUTOMÁTICO | Máquina | Rotina de corte do squad | Reel arrastado, e o espectador sai antes do fim |
| Conferir a taxa de quadros do vídeo do rosto depois do corte | AUTOMÁTICO | Máquina | Medir e comparar com o esperado, hoje 25 quadros por segundo | É exatamente o defeito 14, o rosto engasga e ninguém sabe por quê |

### Fase B: roteiro e decisão de cena

| Etapa | Camada | Quem executa | Comando ou regra | O que acontece se pular |
|---|---|---|---|---|
| Dividir a fala em cenas | PENSADO | Claude lendo a transcrição | Uma ideia por cena, corte onde o raciocínio vira | Cena com duas ideias, o visual não consegue ilustrar nenhuma das duas |
| Escolher o elemento visual de cada cena | PENSADO | Claude ou humano | Ler a fala e decidir o que aquela frase pede ver | O vídeo vira legenda animada, sem função visual nenhuma |
| Escolher a palavra âncora de cada cena | PENSADO | Claude ou humano | A palavra que carrega o sentido da frase, não a mais bonita | Destaque cai em palavra vazia e o espectador olha para o lugar errado |
| Decidir onde a legenda cala | PENSADO | Claude ou humano | Cena que já mostra o texto na tela não repete na legenda | É o defeito 12: tela e legenda dizendo a mesma coisa, poluição pura |
| Escrever os textos que aparecem na tela | PENSADO | Claude | Curto, na fala do mentor, nunca resumo genérico | Texto de banco de imagem, sem a voz de quem falou |
| Montar a folha de aprovação do roteiro | PADRÃO | Máquina | `scripts/storyboard.js` | Erro de conceito só aparece depois de horas de render |
| Aprovação do dono no storyboard | PENSADO | Dono | Ele olha e diz sim ou não | Rodada 11 de novo: correção de conceito no fim, quando custa muito mais caro |

### Fase C: peças visuais

| Etapa | Camada | Quem executa | Comando ou regra | O que acontece se pular |
|---|---|---|---|---|
| Checar se a peça protagonista já apareceu em outro reel | AUTOMÁTICO | Máquina | Registro das peças usadas por produção | Defeito 1: o celular repetido entre vídeos. Cada vídeo é único, cada cena é única |
| Repetir uma peça dentro do mesmo vídeo (abre e fecha) | PADRÃO | Claude | Permitido e desejado quando abre e fecha o vídeo | Perde a sensação de fecho, o reel termina solto |
| Buscar logo de marca de terceiro | PADRÃO | Máquina ou operador | Logo sempre do arquivo oficial, nunca desenhada à mão | Defeito 2: logo do Instagram aproximada, marca deformada no ar |
| Conferir se é a variante certa do logo | PENSADO | Humano | Símbolo e logo em texto são peças diferentes | Defeito 3: veio a câmera quando o pedido era a logo escrita |
| Limpar fundo e vetorizar a peça recebida | AUTOMÁTICO | Máquina | Corte de fundo mais vetorização | Peça pesada, com borda suja, que estoura na tela grande |
| Achatar o deslocamento das letras dentro das coordenadas | AUTOMÁTICO | Máquina | Uma passada por peça vetorizada | Defeito 4: o gradiente reinicia em cada letra e a cor pisca no meio da palavra |
| Aplicar cor em texto cheio | PADRÃO | Claude | Cor na frente de tudo, sem máscara, sem baixar opacidade | Defeito 5: a máscara trabalha por brilho, a borda das letras entra cinza e a cor lava |
| Escolher a força da cor conforme o uso | PADRÃO | Claude | Pastel no traço fino de 6 pixels, cor cheia em texto preenchido | Defeito 6: paleta pastel some no texto grande e a marca desaparece |
| Definir a caixa dos rótulos de destaque | AUTOMÁTICO | Máquina | Fonte e caixa calculadas com folga real, quebra de linha proibida | Defeito 7: o texto encosta e vaza da borda do rótulo |
| Montar grade de vários blocos | PADRÃO | Claude | Grade de feed, blocos iguais, conteúdo centralizado, respiro igual, bloco vazio é vazio de propósito | Defeito 8: conteúdo encostado à esquerda, linha caindo em cima da fileira, sobra ao lado de célula vazia |
| Marcar certo e errado na mesma cena | PADRÃO | Claude | Dois selos simétricos, X vermelho no errado e check verde no certo, nunca por cima da informação | Defeito 9: um X gigante cobrindo justamente o que a cena precisava mostrar |
| Posicionar selo perto de logo ou texto | PADRÃO | Claude | Mesma linha, centralizados, com respiro entre eles | Defeito 10: check verde em cima da última letra do logo |
| Enquadrar foto de rosto | PADRÃO | Máquina | Recorte definido por número, respiro abaixo do rosto, escolha explícita entre preencher o círculo ou caber inteiro | Defeito 13: barra branca nas laterais e queixo cortado |
| Gerar o quadro do rosto seguindo o rosto | AUTOMÁTICO | Máquina | `aios/scripts/video/tile-com-track.py` | O rosto sai do quadro no meio da fala |

### Fase D: legenda

| Etapa | Camada | Quem executa | Comando ou regra | O que acontece se pular |
|---|---|---|---|---|
| Sincronizar legenda com a voz | AUTOMÁTICO | Máquina | Base no tempo por palavra da transcrição | Texto entrando antes ou depois da fala |
| Juntar palavra fraca solitária | AUTOMÁTICO | Máquina | Se a palavra fraca abre frase nova, junta para a frente; se fecha, junta para trás | Defeito 11: a palavra E sozinha na tela depois de um ponto final |
| Conferir acentuação e traço na legenda | AUTOMÁTICO | Máquina | `scripts/pre-render-validate.js` | Erro de acento congelado dentro do vídeo, impossível corrigir depois da publicação |

### Fase E: som

| Etapa | Camada | Quem executa | Comando ou regra | O que acontece se pular |
|---|---|---|---|---|
| Escolher quais sons existem na biblioteca | PENSADO | Dono | Só os cinco aprovados entram. Os outros ficam no banco não aprovado e entram um a um, só com aprovação dele | Volta a entrar som que ele já disse que é feio |
| Medir um som novo | AUTOMÁTICO | Máquina | `scripts/analisar-sfx.py` | Som entra no vídeo sem ninguém saber o peso que ele tem |
| Calcular o peso do som | AUTOMÁTICO | Máquina | Modelo calibrado nos cinco sons aprovados | Escolha de som vira palpite toda vez |
| Escolher o som de cada momento | PADRÃO | Claude | Tabela de aplicação já testada, logo abaixo desta tabela | Momento forte com som fraco, e o inverso, que é pior |
| Posicionar o som no tempo | AUTOMÁTICO | Máquina | Início do som é o instante do impacto menos o tempo de pico dentro do arquivo | Som chega depois do movimento e o cérebro lê como erro de edição |
| Definir o volume | PADRÃO | Máquina | Entre 9 e 15 decibéis abaixo da voz. Quanto mais leve o som, mais baixo | Efeito atropela a voz do mentor |
| Misturar voz, trilha e efeito | AUTOMÁTICO | Máquina | `aios/scripts/video/mixar-trilha.js`, com as cinco conferências automáticas de áudio | Trilha estourando, voz sumindo, e só se descobre no celular do cliente |

### Fase F: render e entrega

| Etapa | Camada | Quem executa | Comando ou regra | O que acontece se pular |
|---|---|---|---|---|
| Travas de composição | AUTOMÁTICO | Máquina | `scripts/pre-render-validate.js` e `scripts/choreo-lint.js`, mais de 20 verificações | Texto vazando do palco, acento errado, coreografia quebrada, tudo isso só aparece renderizado |
| Print de cada cena antes do vídeo | AUTOMÁTICO | Máquina | `scripts/qa-frames.js`, chamado pelo próprio render | É o método que achou a maior parte dos 14 defeitos. Pular aqui é escolher descobrir tarde |
| Olhar os prints | PENSADO | Humano ou Claude | Comparar com o livro de estilo e com o storyboard aprovado | O print existe e ninguém olha: mesmo custo, zero benefício |
| Notas F1 a F7 | PADRÃO | Máquina mais avaliador | `scripts/qa-approve.js`. Abaixo de 8 o render final trava | Vídeo medíocre é entregue porque ninguém cravou uma nota |
| Render do vídeo | AUTOMÁTICO | Máquina | `scripts/render.js`, único que gera vídeo. Ele chama as travas sozinho e aborta se reprovar | Render por fora do script pula todas as travas de uma vez |
| Conferência final no aparelho | PENSADO | Dono | Ele assiste no celular | Defeito que só aparece na tela pequena passa direto |
| Registrar as peças usadas nesta produção | PADRÃO | Máquina | Alimenta o registro que impede repetição no próximo reel | O defeito 1 volta no vídeo seguinte, com outra peça |

### Tabela de aplicação dos sons, já testada e aprovada

| Momento na cena | Som | Peso | Por que funciona |
|---|---|---|---|
| Palavra-conceito grande com traço colorido embaixo | Woosh 2 (wav) | 10 | Som longo e brilhante, pico caindo no quadro exato em que o traço começa a ser desenhado |
| Grade dos 12 posts e o número de 50 mil | Woosh 11 (wav) | 7 | Som grave, dá peso de bloco chegando |
| Recapitulação e perfil pronto | Woosh 6 (mp3) | 6 | Grave, mais curto, fecha sem pesar |
| Troca simples de cena | Woosh 5 (mp3) | 4 | Curto e discreto, costura sem chamar atenção |
| Uso leve, aproximação suave | Woosh 14 (mp3) | 3 | Ataque muito rápido e brilho alto, alivia em vez de golpear |

Medidas reais dos cinco, para consulta:

| Som | Duração | Pico em | Ataque | Cauda | Brilho | Grave | Agudo | Peso |
|---|---|---|---|---|---|---|---|---|
| Woosh 2 (wav) | 4,87s | 0,34s | 0,18s | 0,72s | 12228 Hz | 13% | 85% | 10 |
| Woosh 11 (wav) | 1,64s | 0,79s | 0,35s | 0,33s | 1939 Hz | 95% | 0,2% | 7 |
| Woosh 6 (mp3) | 1,70s | 0,81s | 0,34s | 0,33s | 1599 Hz | 96% | 0% | 6 |
| Woosh 5 (mp3) | 0,91s | 0,46s | 0,19s | 0,19s | 1421 Hz | 94% | 0% | 4 |
| Woosh 14 (mp3) | 2,06s | 0,24s | 0,09s | 0,36s | 6881 Hz | 47% | 12% | 3 |

O modelo que reproduz a percepção do dono, calibrado nesses cinco pontos:

```
peso = 52,82 x (ataque + cauda)  menos  84,88 x ataque  mais  27,37 x (fração de grave)  menos  25,95
```

Erro médio de 0,4 ponto. Em português: o que mais pesa é o tamanho do som audível. Ataque muito longo sozinho ALIVIA o peso, porque o som vira aproximação suave em vez de golpe. E quanto mais grave, mais peso.

---

## 4. O que nunca deve virar automático

Existe uma tentação óbvia: como a máquina já mede tanta coisa, por que não deixar ela escolher tudo? Porque três decisões dependem de entender o que a frase quer dizer, e nenhum número mede sentido. Se essas três forem mecanizadas, o vídeo continua passando em todas as travas e fica burro.

**Escolher qual elemento visual cada trecho de fala pede.**
Esta é a decisão que separa um reel de uma legenda animada. Quando o mentor diz que o perfil precisa mostrar quem ele é antes do tráfego rodar, a cena pede um perfil montado, não um ícone de pessoa. A máquina só consegue casar palavra com imagem: ouve "perfil" e traz um símbolo de perfil. Quem entende a frase percebe que a cena precisa mostrar a diferença entre um perfil vazio e um perfil pronto, porque é isso que a fala está dizendo, mesmo sem usar essas palavras. Automatizar aqui produz um vídeo tecnicamente correto e completamente vazio.

**Escolher a palavra âncora.**
A palavra que ganha o traço colorido embaixo e o som de peso 10 não é a mais longa, nem a mais rara, nem a de maior volume na voz. É a que carrega a virada da ideia. Uma contagem de frequência escolheria "Instagram" em quase toda cena, porque é a palavra que mais aparece. Mas o ponto da fala pode estar em "antes", em "montado", em "gastar". Errar a âncora não quebra nada, não reprova em trava nenhuma, e por isso é o erro mais perigoso: o vídeo sai perfeito e destacando a palavra errada.

**Decidir quando a legenda cala.**
A regra parece mecânica, e não é. A legenda cala quando a tela já está dizendo aquilo, mas "já está dizendo" não é comparação de texto. A grade com o número 12 diz uma coisa que a fala também diz, com outras palavras. Os três destaques com ícone e rótulo dizem o conteúdo inteiro da frase sem repetir uma sílaba dela. Comparar texto com texto não pega nenhum desses dois casos. Só quem entende que a informação já chegou pelos olhos sabe que ela não precisa chegar de novo pela leitura.

**Bônus, também nunca automático:** decidir qual variante de um logo de marca é a certa (símbolo ou logo em texto), e a aprovação final do dono. A primeira depende do sentido da cena, e a segunda é a única régua que existe acima de todas as outras.

---

## 5. O que ainda está sendo pensado toda vez e deveria virar automático

Cada item aqui é uma decisão que hoje volta para a conversa, custa tempo de análise e já tem resposta conhecida.

| Oportunidade | Como está hoje | Como deveria ficar | Ganho |
|---|---|---|---|
| Travamento do rosto (defeito 14, ainda aberto) | O quadro do rosto sai a 25 quadros por segundo e a animação roda a 60. Como 60 não é múltiplo de 25, cada quadro do rosto se repete de forma irregular e o olho lê como engasgo. Neste vídeo ficou pior porque o corte de silêncios deixou o arquivo com taxa média de 24,96 em vez de 25 fixos | O quadro do rosto nasce a 30 quadros por segundo, que divide 60 certinho, e o script confere a taxa depois do corte de silêncio, travando se sair do valor fixo | Elimina o último defeito visível conhecido e o único ainda sem correção |
| Peça protagonista repetida entre vídeos | Alguém precisa lembrar do que já foi usado | Registro automático de peça por produção, com aviso na hora de montar a cena | Mata o defeito 1 na origem, sem depender de memória |
| Escolha do som de cada momento | Discutida caso a caso | Tabela de aplicação por tipo de momento, já testada, consultada em vez de debatida | Uma decisão a menos por cena, e cada reel tem muitas cenas |
| Volume do efeito sonoro | Ajustado no ouvido | Derivado do peso, dentro da faixa de 9 a 15 decibéis abaixo da voz | Mistura previsível, e para de virar rodada de correção de áudio |
| Cor cheia contra pastel | Reavaliada a cada peça | Regra automática pela espessura: traço fino usa pastel, preenchimento usa cor cheia | Mata o defeito 6 sem ninguém pensar nele de novo |
| Caixa dos rótulos de destaque | Ajustada no olho | Fonte e caixa calculadas por medida do texto, com folga mínima e quebra proibida | Mata o defeito 7 e economiza uma rodada inteira de print |
| Enquadramento de foto | Decidido caso a caso | Padrão fixo com número de recorte, respiro abaixo do rosto e escolha declarada entre preencher ou caber | Mata o defeito 13 e padroniza toda cena de retrato |
| Grade de blocos | Montada do zero | Peça única de grade de feed, com respiro e centralização já resolvidos | Mata o defeito 8 e reduz o tempo de montagem das cenas de lista |
| Selos de certo e errado | Posicionados na mão | Peça de par simétrico, com regra de nunca cobrir informação e respiro mínimo | Mata os defeitos 9 e 10 de uma vez |
| Olhar os prints | Feito lendo cada print inteiro | Todas as cenas numa folha só, com destaque no que fugiu da régua | Menos leitura, mesma capacidade de enxergar o erro |

Ordem de ataque sugerida, pelo tamanho do estrago que evitam: taxa de quadros do rosto, registro de peças usadas, caixa dos rótulos, peça de grade, peça de selos, padrão de foto, regra de cor cheia contra pastel.

---

## 6. O fluxo real, na ordem de execução

1. **Receber a gravação da call e arquivar na pasta da produção.** PADRÃO.
2. **Escolher o trecho que vira reel.** PENSADO.
3. **Transcrever com tempo por palavra** (`scripts/transcribe-words.py`). AUTOMÁTICO.
4. **Cortar silêncios e conferir a taxa de quadros resultante.** AUTOMÁTICO.
5. **Dividir a fala em cenas, uma ideia por cena.** PENSADO.
6. **Para cada cena: escolher o elemento visual, a palavra âncora e se a legenda cala.** PENSADO. É aqui que o esforço deve ser gasto, e só aqui.
7. **Escrever os textos de tela na voz do mentor.** PENSADO.
8. **Gerar a folha de aprovação** (`scripts/storyboard.js`). PADRÃO.
9. **Aprovação do dono no storyboard.** PENSADO. Nada avança sem isso.
10. **Conferir se alguma peça protagonista já apareceu em outro reel.** AUTOMÁTICO.
11. **Buscar logo de marca no arquivo oficial e confirmar a variante certa.** PADRÃO na busca, PENSADO na variante.
12. **Limpar fundo, vetorizar e achatar o deslocamento das letras.** AUTOMÁTICO.
13. **Aplicar cor: na frente de tudo, sem máscara, força cheia em texto preenchido e pastel no traço fino.** PADRÃO.
14. **Montar as cenas usando as peças fixas: grade de feed, selos simétricos, caixa de rótulo com folga, padrão de foto.** PADRÃO.
15. **Gerar o quadro do rosto seguindo o rosto** (`aios/scripts/video/tile-com-track.py`). AUTOMÁTICO.
16. **Sincronizar a legenda e aplicar a junção de palavra fraca.** AUTOMÁTICO.
17. **Escolher o som de cada momento pela tabela de aplicação.** PADRÃO.
18. **Posicionar cada som pelo pico e definir o volume pelo peso.** AUTOMÁTICO.
19. **Misturar voz, trilha e efeito** (`aios/scripts/video/mixar-trilha.js`). AUTOMÁTICO.
20. **Rodar as travas de composição** (`scripts/pre-render-validate.js` e `scripts/choreo-lint.js`). AUTOMÁTICO.
21. **Gerar o print de cada cena** (`scripts/qa-frames.js`). AUTOMÁTICO.
22. **Olhar os prints e comparar com o storyboard aprovado e com o livro de estilo.** PENSADO. Este é o passo que descobriu a maioria dos 14 defeitos.
23. **Corrigir o que os prints mostraram e voltar ao passo 21.** PENSADO na correção, AUTOMÁTICO na conferência.
24. **Registrar as notas F1 a F7** (`scripts/qa-approve.js`). PADRÃO. Abaixo de 8 o render final trava.
25. **Renderizar** (`scripts/render.js`, único que gera vídeo, e ele mesmo chama as travas e aborta se reprovar). AUTOMÁTICO.
26. **Conferência final do dono no aparelho.** PENSADO.
27. **Registrar as peças usadas nesta produção, para o próximo reel não repetir.** PADRÃO.

---

## Referências vivas do squad

| Arquivo | Função |
|---|---|
| `docs/STYLE-APPLE-CONCEITUAL.md` | Livro de estilo, 1005 linhas. Fonte de tudo que é PADRÃO no visual |
| `docs/ZOOM-REEL-MOTION.md` | Protocolo P0 a P11 da categoria |
| `scripts/render.js` | Único caminho para gerar vídeo |
| `scripts/pre-render-validate.js`, `scripts/choreo-lint.js` | Travas de composição |
| `scripts/qa-frames.js` | Print de cada cena antes do vídeo inteiro |
| `scripts/qa-approve.js` | Notas F1 a F7 |
| `scripts/storyboard.js` | Folha de aprovação |
| `scripts/transcribe-words.py` | Transcrição com tempo por palavra |
| `scripts/analisar-sfx.py` | Medição dos efeitos sonoros |
| `aios/scripts/video/mixar-trilha.js` | Mistura de áudio com cinco conferências |
| `aios/scripts/video/tile-com-track.py` | Quadro do rosto seguindo o rosto |

**A frase que resume o documento:** a máquina mede, o padrão decide o que já foi decidido, e a cabeça humana fica livre para a única coisa que ninguém automatiza, que é entender o que a fala está pedindo para ver.
