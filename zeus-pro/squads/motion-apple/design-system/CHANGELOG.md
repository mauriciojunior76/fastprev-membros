# CHANGELOG · Zeus Reels Design System

## 6.0 — numeração única (2026-09-08)

A numeração do sistema visual passou a ser a mesma do produto e do time de vídeo: tudo é 6.0.
Antes o sistema visual corria em 2.x por conta própria, e o material novo chegava com numeração
de terceiro (3.x), o que criava três números para a mesma coisa. Não muda regra nem valor: só o
nome da versão. O histórico abaixo fica como está, com os números que tinha na época.

## 2.1 — revisão de auditoria (2026-09-05)

### Corrigido
- Cor: um portador por quadro também para cor citada (comparação: anel do Instagram só no lado descrito); pontos sólidos de espectro → mini-anel 14; gancho 1B reprovado; live → indicador neutro; anel aninhado → um contorno.
- Foco: presença × ênfase separadas; recuo por contraste (fundo gray400/.6 sem blur; dito gray600/.8, blur ≤2 opcional, nunca em rótulo); specimens dos moldes atualizados.
- Geometria: legenda 1039→1161 (122), palco 1162; 04f 6 = 3×2; blocos 280 máx. 3/linha; barras ≤3/bloco; conteúdo em foco ≥22px.
- Dados: preço revelado (não contado); enquete 64+36; ranking proporcional só com valores; monotônica só ilustrativa; onda gravada ≠ visualizador; progresso ≠ playback (indeterminado sem dado).
- Traço de ícone: clamp(1, 2, 6,5×24/tamanho) — 6,5px constantes de 80 a 156.
- Curvas: funções response/transfer/reveal/exit; settle deixa de prometer "começa parado".
- Tokens: shorthand tipográfico completo (peso, tamanho, altura), --z-fps, --z-caption-*, --z-emph-*, --z-dur-* por classe, --z-icon-stroke-*, --z-solid-*.
- Índice/roteador: foco-migra → foco; versões e status por entrada; deprecações; regras de relação; confiança/fallback; presets de composição; seção production.
- icons-log: IDs do índice, segundos, exceção de assinatura.

### Adicionado
- 04c: 6 esquemas prioritários (total 23 esquemas desenhados; 25 lógicas na gramática, 2 delas atendidas pelos moldes da 04) com inputs/foco/sequência/evitar — gargalo, causa-efeito, árvore de decisão, filtro por critérios, evidência anotada, manual × automatizado.
- 04h: 31 variantes motion + 6 interfaces dentro do celular (moldura 300) — formulário, chat, notificações, post, checkout, perfil — com regra de quando usar a moldura.
- 05b: motion por natureza do elemento — seis perguntas, classes temporais, contrato motionSpec, matriz de 24 elementos, natureza dos esquemas, teste de subtração, 3 storyboards (formulário, trio, causa-efeito).
- Guia §2 (presença × ênfase), §9a (contradições), §9e (motion), §9f (produção).

### Adicionado em 2.1.1
- Seção "Do After Effects para o Remotion": vocabulário técnico (comp, pre-comp, keyframe/clamp, Graph Editor→Easing.bezier, anchor point→transformOrigin, parenting, Trim Paths→dashoffset, track matte→mask, Gaussian Blur padronizado, sequencing sem drift, time remap, motion blur off, determinismo) e a receita [in][build][act][focus][hold][out] válida para todo molde. Tokens: --z-ease-response/transfer/reveal/exit, --z-blur-*, --z-offset-max.

### Adicionado em 2.1.2
- `sfx-map.json`: 40 eventos de som mapeados por gesto/molde, cada um com peso 0–10, categoria, dB de referência e ponto de sincronização em frames; escala de peso, 10 regras (densidade, corte por proximidade, cascata longa, pan, som sobre fala, soma ≤22 por cena) e os pesos 0 obrigatórios. Guia §9g + checklist item 13; roteador devolve `sfxSchedule`.
- Correções: gabarito da legenda 904×122 centro 1100 (era 134/1106); 7 rótulos com blur na seção 04 → recuo por contraste; citação do depoimento com ortografia normal; 97 gradientes com parada errada ({{marca.espectro.3}} 36% → 28%); seção 01 com espaçamento e alinhamento normalizados; SIM/NÃO da árvore fora das curvas.

### Adicionado em 2.1.3
- Seção 06 do painel (#s06-numeros) + `numbers-spec.json` + guia §11: os 6 tipos de número com corpo/peso/tracking por papel, prefixo e sufixo em 40% do corpo, formatação pt-BR (milhar com ponto, sem centavos, k só acima de 10.000), regra conta × revela × tempo real, curva da contagem (settleSoft, começa em t−6q e assenta 6q antes do fim), som (0 em curso, ding 5 ao parar), cor (dígito sempre preto) e fallbacks. Checklist item 13.

### 2.2 — camada de inteligência de uso (2026-09-05)

Adicionado, sem alterar nenhum componente aprovado:
- `AI_USAGE_GUIDE.md`: processo de decisão em 10 passos, metodologia Transcript to Visual, fórmula da decisão, confiança/fallback, ordem de desempate, tabela de quando abrir cada arquivo, "padrão não cópia" e a lista do que nunca fazer.
- `registry/visual-registry.json`: registro mestre com **83 recursos** e IDs estáveis (`familia.nome.v1`), cada um com o que sou / quando usar / quando NÃO usar / que conteúdo represento, além de itens mín-ideal-máx, duração, densidade, speaker, tela cheia, legenda, alternativas e erros comuns. `legacyId` liga ao índice antigo; `moldes-index.json` ganhou o campo `uid`.
- `registry/semantic-registry.json`: 81 estruturas de informação → candidatos.
- `registry/scene-registry.json`: 6 níveis de densidade, 18 famílias de cena, regras de ritmo.
- `registry/interface-registry.json`: teste menção × ação, regra da moldura de celular, 14 plataformas mapeadas.
- `registry/diagram-registry.json`: 21 relações → esquema + anti-regras.
- `registry/motion-registry.json`: 10 funções de movimento, curvas, receita de cena, gestos com som, natureza do objeto, proibições.
- `semantic-atlas.md`: 53 estruturas, cada uma com frase falada real → recurso.
- `decision-examples.md`: os 4 vídeos do squad analisados beat a beat (fala preservada) + 8 heurísticas extraídas.
- `retrieval-tests.json`: 22 testes de recuperação (22 passaram) **com as limitações declaradas**.

### 2.2.1 — grade em retrato (2026-09-05)
- Todas as grades de células quadradas passaram para **3 colunas**: grade com contagem (12 = 3×4), contagem da §06 (3×4), feed com capas (8 → 12 capas em 3×4), feed motion (3×3). Rótulo obsoleto "4×3 · contagem" corrigido em 04f.
- Novo card em 04f: **GRADE EM RETRATO**, com o certo × errado lado a lado e a regra — quadrados sempre em 3 colunas; exceção para blocos não quadrados (horário, pill) que aceitam 4; blocos largos de 280 no máx. 3. Guia §4c e tokens `--z-grid-cols-*`.
- Correções da auditoria: 4 anéis do Instagram sem `box-sizing` (desalinhavam o miolo); traço visual em 80px unificado em 6,5 (o texto dizia 6,7 contra a regra); 16 estilos com `;;` limpos.

### 2.2.2 — manual de criação (2026-09-05)
- `CREATION-MANUAL.md`: 9 partes — três tentativas de NÃO criar, sete perguntas antes de desenhar, vocabulário fechado de 14 peças (com a lista do que é proibido inventar), fórmulas de geometria do palco, receita de movimento em quadros, pesos de som, contrato de 13 campos para o Remotion, os 9 lugares de registro, checklist de aprovação de 11 itens e os 10 erros já cometidos.
- Correções da verificação: quatro espécimes de grade estavam cortados no palco (célula 96 → 70 na contagem, painéis do feed reduzidos, feed motion em 3 linhas); regra de altura acrescentada ao card GRADE EM RETRATO; contradição do trio (desfoque 6) alinhada com §2; 25 rótulos e contêineres com texto perderam o blur; versão do cabeçalho para 2.2.1.

### 2.2.3 — geometria das grades (2026-09-05)
- Feed com capas movido para o **palco expandido** (904×790, um vídeo), com as 12 capas em células fixas de 160, ícone 40 e rótulo 18 — pela própria regra §4c, 12 quadrados com rótulo não cabem nos 374 do palco padrão. Legenda reescrita com os números reais.
- Causa raiz das duas rodadas anteriores: `repeat(3,1fr)` é `minmax(auto,1fr)`, e o rótulo mais longo fixava o piso da faixa (107px), então reduzir o painel só empurrava a grade para fora do cartão. Todas as grades do painel passaram para `minmax(0,1fr)` ou colunas fixas, e a lição entrou na regra (§4c, card GRADE EM RETRATO e Parte 3 do manual de criação).
- Trio de atributos: 909 → dentro dos 904 (gap 32, pill 20). Lacuna: nós 112 e gap 18, sem corte no topo.

### 2.2.4 — lacuna (2026-09-05)
- Causa raiz: a linha do espécime tinha `height:220px` fixa, menor que o filho mais alto (282 = bloco 220 + gap 14 + pill 48); com `align-items:flex-end` o filho transbordava 62px para cima e o contorno do anel saía do palco. As duas tentativas anteriores mexeram no tamanho do nó, não na restrição. Altura fixa removida — a linha dimensiona pelo conteúdo e o palco centraliza. A armadilha entrou na regra (§4c, card GRADE EM RETRATO, Parte 3 do manual de criação).

### 2.2.5 — legendas contra o build (2026-09-05)
- Causa raiz do erro anterior: calculei o índice da legenda **depois** de fatiar a mesma string, então a substituição caiu no cartão errado (a legenda do feed foi para o "Chat de áudio · motion"). Agora as legendas são trocadas por linha ou por texto único, nunca por índice em string mutada.
- Legenda do chat de áudio restaurada; legenda do feed com capas reescrita com os números reais (palco 904×790, painel 580, células fixas 160, ícone 40, rótulo 18); grade com contagem (04) e contagem (§06) passaram a declarar 3 colunas × 4 linhas com célula 70 e respiro 14 — e a §06 explica por que 96/18 não é canônico no palco padrão (438 > 374).
- Card de arranjo por contagem: os arranjos de 8 e 10 desenhavam 4 por linha e eram rotulados como células quadradas, contradizendo a regra de 3 colunas. Viraram 2 + 3 + 3 e 1 + 3 + 3 + 3, e a regra da linha incompleta passou a distinguir bloco largo de célula quadrada.

### 2.2.6 — arranjo por contagem derivado da regra (2026-09-05)
- Causa raiz: eu corrigia item por item (8 e 10) em vez de derivar a faixa inteira da regra, então 7 (3+4) e 12 (4+4+4) continuavam contradizendo o card que os resume. A faixa agora é gerada de uma tabela única com validação: máximo 3 por linha (exceção formal: 4 = 2×2) e linha incompleta em cima. Resultado conferido item a item — 2 · 3 · 2+2 · 2+3 · 3+3 · 1+3+3 · 2+3+3 · 3+3+3 · 1+3+3+3 · 3+3+3+3, soma igual ao número em todos.
- A regra passou a ser uma frase só, sem contra-exemplo: valia para bloco largo e célula quadrada igualmente, e o texto antigo atribuía 7 = 3 + 4 a blocos de 280 — impossível pela própria aritmética (4×280 > 904).

### 2.2.7 — legendas conferidas contra o build (2026-09-05)
- Chat de áudio · motion: legenda dizia "painel glass 700" e o painel é 640 (número digitado do rascunho, não lido do markup). Corrigido por leitura.
- Em vez de trocar só esse número, varri **todas** as legendas que citam largura de painel comparando com o build: 27 cartões, agora 27 conferindo (700/700, 640/640, 580/580, 560/560, 520/520, 600/600). Essa conferência passou a ser parte do checklist de auditoria.

### 2.3 — camada executável e quatro gráficos (2026-09-06)

Novos arquivos:
- `registry/build-registry.json` — **87 entradas** (83 anteriores + 4 gráficos) com identidade (`componentName` em PascalCase, para ninguém inventar o nome), geometria em px com `contentHeight` e o cálculo dela, camadas em ordem de pintura com o token de cor de cada uma e o portador marcado, estados (repouso, foco, dito, recuo) com valores exatos, timeline em quadros **relativos à palavra âncora** com `quadroCompleto` e vida útil, contrato de props derivado de input/items, som no **vocabulário fechado** do sfx-map (com `missingGesture` quando falta) e `checks` como condições verificáveis.
- `registry/composition-rules.json` — princípio do invariante, teste de três perguntas, 8 pares permitidos (com base, transformação, quem manda, tempo de cada parte e quadro da troca), 7 combinações proibidas e o orçamento por cena. **Resposta ao caso concreto:** checks-lista + cartão de agenda é combinação proibida — não há invariante (contentor, posição e itens diferentes) e a agenda traz dado novo (horário) que a lista não continha; são **duas cenas** com overlap de 10.
- `moldes-specs.json` — 40 moldes com geometria, variantes por contagem, camadas, linha do tempo, portador, legenda, som, dados obrigatórios, fallback, quando usar/não usar e erros comuns.
- `escalas.json` — as escalas fechadas do guia como dado (espaço, raio, rótulo, ícone, anel, borda, tipografia, sólido, cor, grade, curvas, durações, som).

Quatro gráficos novos (§6b4, painel #s07-graficos): **rosca** (parte de um todo, percentuais que somam 100), **velas** (variação período a período de dado real, alta/baixa por vazado × preenchido), **escala semântica** (dois polos opostos nomeados — distinta de escala-intensidade) e **radar** (5 a 6 critérios na mesma escala, palco expandido). Registrados em visual, semantic e diagram registry, no roteador (com 4 regras de relação novas para não cair por palavra solta) e no moldes-index.

Relatório de completude: 46 moldes com medidas de fonte (guia, tokens, numbers-spec ou espécime novo), 41 com status `derivado-do-painel` (medidas lidas do espécime construído, a confirmar em escala 1:1), 0 sem medida. **11 gestos de som pedidos e ainda não catalogados** (arco-fecha, marco-chega, intersecao-nasce, quadrante-foco, camada-entra, veu-sobe, vao-abre, resultado-assenta, painel-par-entra, anel-guia-entra, poligono-desenha) estão listados em sfx-map.json como precisa de decisão humana, com peso sugerido — nenhum foi inventado no catálogo.

### 2.3.1 — correções da seção 07 (2026-09-06)
- Escala semântica estourava o palco: pills de polo na mesma linha do trilho somavam 1064 (152 + 24 + 640 + 24 + 224) contra 904, e os dois polos apareciam cortados. Corrigido na origem: os polos foram para **rótulo 18 acima das pontas** do trilho, o trilho manteve 640 com vão 152 e o rótulo de posição desceu para 22. Bloco de 640×212. Mesmo número atualizado no card, em moldes-specs.json e no build-registry (+ check `polos-acima` e `largura-do-bloco`).
- Rosca: o contorno de espectro usava `clip-path` de meia circunferência (180°) enquanto a fatia terminava em 151°, sobrando sobre a fatia vizinha. Agora a rosca é SVG e o contorno é um arco de raio 166 com `stroke-dasharray` derivado do **mesmo percentual** — fatia e contorno saem do mesmo dado. Check `contorno-derivado-do-dado` acrescentado.

### 2.3.2 — alturas e larguras declaradas (2026-09-06)
- Os quatro gráficos declaravam contentHeight que não fechava com o espécime, e o campo calculoDaAltura da escala somava 140 contradizendo o próprio valor de 212. Medidos e corrigidos: escala 147 (era 212), rosca 324 (era 300), velas 279 (era 300), radar 560 (era 520), com a soma item a item reescrita para fechar em cada um.
- larguraTotal passou a ser a largura do BLOCO desenhado, não a do palco: rosca 607, velas 424, escala 640, radar 700 (as três primeiras diziam 904). O _doc do build-registry agora define o campo, porque é com ele que o motor escolhe o palco.

### 2.3.3 — gráficos revisados (2026-09-06)
- `chart.candles.v1` virou **`chart.columns.v1` (colunas comparadas)**: o pedido não era gráfico de investimento, e sim 2 ou 3 retângulos verticais comparando valores. Colunas de 150 (vão 44, máximo 3) vazadas com borda 1 gray200, a falada em vidro com contorno de espectro 3 — **nenhuma massa preta**, número acima (44, 56 em foco) e rótulo 22 abaixo. Sete velas com pavio, plot e base saíram: era informação demais para o padrão.
- Rosca refeita no vocabulário do sistema: anel de raio 150 com espessura **14** (era um disco de 44, que virava mancha), fatia com ponta arredondada, percentual 110 no centro com o % em 44 e a unidade em 22, contorno externo a 172 ainda derivado do mesmo percentual.
- Radar: o anel de foco estava posicionado por fora do SVG, em coordenada de tela, e com o viewBox deslocado (-30 -10) saía do vértice. Agora é um `<circle>` concêntrico dentro do mesmo SVG (raio 17 sobre o ponto de 6). Teia e eixos foram para gray100 e o polígono comparado para gray200 tracejado, para o cheio dominar. Check `anel-dentro-do-svg` acrescentado.
- Renomeação propagada: visual, semantic e diagram registry, roteador (com a regra de relação reescrita), moldes-index, moldes-specs, build-registry, guia §6b4 e painel.

### 2.3.4 — colunas: altura fixa removida (2026-09-06)
- A linha das colunas tinha `height:300px` com `align-items:flex-end` e o filho mais alto media 328: transbordava 28px para cima — a mesma armadilha da lacuna corrigida em 2.2.4, e a que o próprio guia documenta. Altura fixa removida (a linha dimensiona pelo conteúdo e o palco centraliza).
- Os três números divergentes (330 declarado, 324 no cálculo, 328 real) foram unificados em **328**, com a soma item a item fechando nesse valor em moldes-specs.json e no build-registry. Checks `altura-declarada`, `cabe-no-palco` e o novo `sem-altura-fixa-na-linha` atualizados; a armadilha entrou nos erros comuns do molde.

### 2.3.5 — espectro oficial e rosca de uma linha só (2026-09-06)
- A rosca tinha **duas linhas concêntricas** competindo: a fatia em preto e um contorno colorido por fora. O contorno externo saiu; a própria fatia em foco passou a ser o arco de espectro, com espessura 10 e ponta arredondada. As outras fatias ficam em gray200 e gray100. Bloco 603×320.
- O gradiente da seção 07 tinha **paradas inventadas** (4 cores em diagonal). Substituído em todas as ocorrências pelo **espectro oficial de 7 paradas** na ordem do traço da palavra-conceito. A regra virou dado em escalas.json (`cor.espectro_oficial`), entrou como regra 2 do §6b4 e como check `espectro-oficial` em **todas as 87 entradas** do build-registry — era exatamente o tipo de desvio que se replica sem ninguém notar.

### 2.3.6 — colunas estreitas (2026-09-06)
- Colunas de 150 eram blocos, não colunas: passaram para **88 de largura** com vão 56 e raio 14. A regra ficou explícita — proporção alvo de 1:2 a 1:2,5 (88 para 150–210 de altura), porque o vocabulário do sistema é traço e anel, e largura acima de 100 vira bloco. Bloco total 376×328. Check `coluna-estreita` acrescentado.

### 2.3.7 — caixa do SVG e contagens (2026-09-06)
- A rosca declarava 603×320 mas desenhava 623×340: o SVG tinha caixa fixa de 340 enquanto o número saiu da extensão do anel (raio 150 + espessura 10). Reduzi o SVG para 320×320 com centro em 160,160, então o contrato passou a ser verdade. Virou regra verificável em todas as 87 entradas (check `caixa-manda`): quando o molde usa SVG, a altura declarada é a da **caixa**, nunca a do desenho interno.
- Contagens obsoletas no painel visível, a mesma classe de divergência de 2.2: subtítulo e cabeçalho da 04c diziam 23 esquemas e o card de gramática 25 lógicas · 23 esquemas, enquanto os quatro gráficos já estavam no índice. Agora 27 esquemas e 29 lógicas nos três lugares. Versão do cabeçalho de v2.2.1 para v2.3.7.

### 2.3.8 — ids de gradiente (2026-09-06)
- Havia dois `<linearGradient id="gz">` no documento (rosca e radar) com dois consumidores em SVGs distintos. Sem defeito visual, porque as definições eram idênticas, mas em SVG a segunda é ignorada e qualquer `url(#gz)` resolve na primeira: ajustar o gradiente do radar não teria efeito e ajustar o da rosca mudaria o radar. Ids separados (`gz-donut`, `gz-radar`).
- Virou regra: check `id-de-gradiente-unico` nas 87 entradas, nota no `_doc` do build-registry e no campo `implementacao` do espectro em escalas.json — no Remotion, o id sai do id da instância, nunca fixo.

### 2.3.9 — o espectro tem duas formas (2026-09-06)
- Causa raiz da rodada anterior: escrevi a regra do espectro como se houvesse uma forma só. O token sempre teve duas — `--z-spectrum` (cônico, 8 paradas, a última repetindo a primeira para fechar a volta) e `--z-spectrum-line` (linear, 7 paradas, sem fechamento) — então o check `espectro-oficial` que acrescentei às 87 entradas reprovava o traço aprovado da palavra-conceito, do lettering e do número. O texto também dizia "as 7 paradas" listando 8.
- Corrigido no dado: `escalas.json` declara as duas formas com paradas, uso e o critério (a geometria escolhe: volta completa usa a fechada, percurso de A a B usa a aberta), o check foi reescrito nas 87 entradas para validar a forma correspondente à geometria, e a regra 2 do §6b4 passou a descrever as duas.

### 2.3.10 — rosca no anel do sistema (2026-09-06)
- Causa do "colorido inventado": o arco usava `linearGradient` atravessando a caixa do SVG, então os 42% de arco mostravam só um trecho da paleta. Agora a fatia usa a **forma fechada** do espectro com as 8 paradas **comprimidas no ângulo da fatia** (parada × 42%), então a paleta aparece inteira dentro do arco.
- Técnica unificada: a rosca passou a ser `conic-gradient` + máscara `exclude`, a mesma de todos os anéis do sistema (selo, ícone ativo, contorno), em vez de `stroke` de SVG. Anel mais fino: espessura 8, diâmetro 300, bloco 583×300, número 104.
- A compressão em arco entrou como propriedade do espectro em escalas.json e como checks `espectro-comprimido-na-fatia` e `tecnica-de-anel`.

### 3.1.1 — ponte com o motor (2026-09-06)
- `registry/sound-bridge.json`: 44 eventos do pacote ligados aos **12 pares e 6 arquivos do motor** — 21 com par direto e 23 em `falta_no_motor` com a redução proposta (4 deles para silêncio: peso 0 obrigatório, peso 1 abaixo do arquivo mais leve, e a saída de cena, que o motor não tem). Nenhum arquivo novo inventado. Escolha do arquivo pelo peso, volume em dB por faixa, disparo em `quadroDoGesto − picoDoArquivo` (o pico vem do motor: o pacote não mede áudio). O catálogo do motor prevalece; o campo `sound` dos specs passa a ser sugestão.
- `registry/palco-veredito.md`: as duas contas derivadas lado a lado. As duas fecham; a diferença inteira é o limite inferior (1632 contra 1536, 96px) e **nenhum dos dois mediu o aparelho**. Decisão aplicada: **duas caixas** — palco seguro 904×374 para conteúdo legível e palco desenhável 904×429 para geometria sem texto, com o check `cabe-no-palco` validando o desenhável e o novo `texto-na-caixa-segura` validando o texto. Nenhum molde precisou mudar.
- Onde o motor está certo e o pacote estava errado: o expandido de **790 era arbitrado**, não derivado. Adotado **499** (um vídeo, legenda ligada), mais 847 (legenda no topo) e 1306 para tela cheia (o preset dizia 1254). Os quatro moldes citados: bottleneck e filter cabem em 499; matrix reduz o quadrante de 290 para 235 e radar reduz o raio de 210 para 175, ambos com tela cheia como alternativa declarada. Nenhum sai do catálogo.

### 3.2 — tres esquemas novos e a matriz de cenas (2026-09-06)
- Na mesma familia dos que se provaram em video (causa-efeito, arvore de decisao, balanca, ramificacao), tres esquemas de ilustracao de ideia: **ponte** (o meio que atravessa o vao, 592x220), **alavanca** (desproporcao entre entrada e saida, fulcro a 34% do vao, 760x200) e **troca** (substituicao no mesmo lugar, 420x250 — diferente do espelho, que e lado a lado). Registrados em visual, semantic e diagram registry, roteador (com 3 regras de relacao), indice, moldes-specs e build-registry (90 entradas). Guia 6b5, painel #s04c-esquemas. Contagem: 30 esquemas, 32 logicas.
- `MATRIZ-DE-CENAS.md`: o que faltava para o agente de roteiro. Quantas cenas a fala pede (afirmacoes por minuto: 7 a 9 cenas lentas ate 14 a 16 rapidas, com a regra dura de que abaixo de 240 quadros saem os moldes de quadroCompleto acima de 48), matriz de 28 momentos de fala reais para molde + alternativa, regras de ritmo com a curva tipica de 1 minuto, e a tabela de quando o aparelho entra (mobile e contexto, nao enfeite).
- Exemplos de fala reais gravados em `exemplosDeFala` nos quatro moldes aprovados e nos tres novos.
- Buraco pequeno do parecer resolvido: a estrutura PERGUNTA passou a ter emphasis.word.v1 e emphasis.icon-phrase.v1 como primeiros candidatos, com a nota de que pergunta retorica e destaque tipografico e interface so quando a pergunta e feita dentro de uma plataforma.

### 3.3 — acento de passagem (2026-09-06)
- Causa de as 31 variantes motion quase nao serem recrutadas: o interface-registry mandava, para mencao de plataforma, "mini-selo, sem painel" — a regra proibia ativamente as variantes fora de cena de interface, e a maioria das falas apenas menciona.
- Criado o **acento de passagem**: a variante entra por cima da cena que ja esta no palco, recortada, a 0,55-0,7 de escala, no canto direito, por 40 a 60 quadros, e sai. Densidade 1. Nao troca o molde principal, nao troca a legenda e nao pega o portador de cor. Catalogo de 16 acentos com o recorte de cada um.
- Registrado como familia de cena ACENTO_DE_PASSAGEM no scene-registry, como par permitido no composition-rules (excecao formal a proibicao de duas interfaces: o acento e citacao de 40 a 60 quadros, nao uma segunda peca de conteudo), como candidatos de mencao em 12 estruturas do semantic-registry, no roteador, no guia 6b6, na secao 4b da matriz de cenas e no AI_USAGE_GUIDE.
- Regra de ritmo: uma cena de densidade 3 com acento le como 3 para 1 para 3 e quebra a monotonia sem trocar o palco. Maximo 3 acentos por video de 1 minuto.

### 3.4 — os tres esquemas novos realinhados ao vocabulario (2026-09-06)
- Diagnostico aceito: os tres estavam sendo desenhados com pecas proprias em vez das que ja existiam. Refeitos usando so o vocabulario: no 148/112, conector de traco 6 com chevron 18, pill 48, coluna 400 da tabela, espacos da escala 6.
- **Ponte**: o tabuleiro proprio de 240x16 saiu; agora e a estrutura da jornada A-B (dois nos 148, colunas 272, conector 216 traco 6) e o unico acrescimo e a pill de 48 a 18 acima do conector. Bloco 760x256.
- **Alavanca**: a barra inclinada de traco 8 saiu (era ela que deixava tudo torto e desalinhava os rotulos). Barra RETA de traco 6 no vao de 216, fulcro em triangulo vazado a 34% do vao, e a desproporcao passa a ser dita pelos tamanhos de no (112 no esforco, 148 com anel no resultado). Bloco 744x256.
- **Troca**: cartoes tinham 340 e 420 de largura, contradizendo o proprio argumento do molde (mesmo slot). Agora os dois tem 400 (a coluna da tabela comparativa), respiro 18 e seta de 44 traco 6. Bloco 400x254.
- Check novo nos tres: `vocabulario-existente` (todo tamanho tem de pertencer ao vocabulario), mais `barra-reta` na alavanca e `mesma-largura` na troca. As derivas entraram como erros comuns, para o proximo molde novo nascer ancorado.

### 3.5 — conectores ancorados no centro dos nos (2026-09-06)
- Causa raiz das duas rodadas anteriores da alavanca e da ponte: eu encaixava o conector com margem fixa (margin-bottom 120, margin-top -92) dentro de linha flex. Com nos de tamanhos diferentes (112 e 148) e colunas de alturas diferentes, nenhuma margem unica passa pelos dois centros: a barra flutuava 51px acima de um e 33 do outro, e o conector da ponte ficava 14px abaixo dos nos.
- Corrigido na origem: os dois moldes passaram a posicionamento absoluto com os centros derivados do raio (centro dos nos em y = 148/2 = 74) e o conector no mesmo y. Na alavanca, os nos agora se alinham pelo **centro** e nao pela base — so assim uma barra reta atravessa os dois, e a desproporcao continua sendo dita pelo tamanho dos nos e pelo fulcro deslocado.
- Alturas remedidas e sincronizadas nos dois arquivos de contrato: ponte 214 (era 256), alavanca 202 (era 256), troca 272 (era 254 — o calculo descontava uma sobreposicao que nao existe; os respiros medidos sao 18 e 18).
- Checks novos: `conector-no-centro-dos-nos` na ponte e na alavanca, `nos-alinhados-pelo-centro` na alavanca, mais o campo `geometry.ancoragem` com a regra. A regra tambem entrou no guia 6b5, para o proximo molde com conector nascer ancorado.

### 3.6 — dois niveis de enfase para a faixa de 2 a 6 palavras (2026-09-06)
- Lacuna real, vista num caso do Claude Code: os tres niveis cobriam 1 palavra (N3, N1) e ate 12 palavras (N2), mas a faixa de 2 a 6 nao tinha casa. O resultado tipico era jogar duas palavras em caixa alta dentro do N2 e a cena sair sem padrao.
- **N1b · frase em pill sob o simbolo** (2 a 4 palavras): o N1 esticado, sem composicao nova — simbolo 180 com anel 6, pill de 64 com o texto em 34/700/0,04em. Bloco 268x268.
- **N2b · frase com palavra tonica** (2 a 6 palavras): apoio em 76/700 gray600 e tonica em 104/900 preto com o traco de espectro (forma aberta). A enfase e a diferenca entre os dois. Uma tonica por frase. Bloco de altura 160.
- Escala de enfase declarada como dado no roteador (`escala_de_enfase`), como nota de escolha na estrutura FRASE_IMPORTANTE do semantic-registry, no guia 5d com a tabela das seis faixas, e na matriz de cenas. Regra: conte as palavras antes de escolher.
- Registrados em visual (94 recursos), semantic, roteador, indice, moldes-specs (45) e build-registry (92), com checks `contagem-de-palavras` e `uma-tonica`.

### 3.7 — N2b em duas linhas e larguras derivadas (2026-09-06)
- Causa da quebra: os dois blocos de texto do N2b estavam numa linha flex sem `white-space: nowrap` e com flex-shrink padrao, e a soma natural (apoio 76 + tonica 104 + gap) passa de 904 nesta faixa de corpo — o navegador encolheu e quebrou o apoio em duas linhas, exatamente o defeito que o molde existe para evitar.
- Corrigido na origem: o apoio foi para **linha propria acima** da tonica (64/700 gray600), com nowrap e flex none nos dois. Bloco 215 de altura (67 + 18 + 104 + 12 + 14), largura = a maior das duas linhas medidas.
- N1b: a largura declarada era a do simbolo (180), mas a pill mede 280 e e ela que define o bloco. Passou a ser **max(180, pill medida)**, para o numero nao divergir a cada texto novo.
- Checks novos nos dois: `sem-quebra-de-linha` (nowrap + flex none + scrollHeight === clientHeight) e `largura-derivada`. As duas derivas entraram como erros comuns.

### Pendências verificáveis (não executadas neste ambiente)
- Animação real: os storyboards são quadros estáticos; suavidade, sincronismo e transferência de foco em movimento NÃO foram observados.
- Componentes React/Remotion, validação em runtime (zod), fixtures e testes de regressão: não existem; o painel é preview de design (CSS inline), não implementação.
- Teste de leitura a 360px de largura real em aparelho: não executado; os specimens estão a 60% e os storyboards a 20%.
- O painel não consome tokens/reels-tokens.css (design components exigem estilo inline); a sincronização entre painel, guia e tokens é manual e foi revisada nesta versão, sem geração automática.
- Nomes de ícones Lucide verificados só para os que renderizam no painel; ícones citados em texto (circle-check, help-circle, clipboard-list, arrow-right, mail, video, tower-control) renderizam; qualquer novo nome deve ser conferido (help-circle → circle-help corrigido; varredura de imagens quebradas no painel: 0 de 615).
- Variantes de interface pedidas e ainda não desenhadas: kanban, editor de documento, fluxo de automação, central de conversas, activity log, simulador, pesquisa com fonte, version diff. Esquemas ainda não desenhados: dependência/desbloqueio, ponte, custo de oportunidade, acúmulo, saturação, distribuição, sintoma-causa, desmontar, objeção-resposta, zoom.
- Os testes de recuperação foram escritos pelo mesmo agente que escreveu os registries: medem consistência interna, não acerto de julgamento. O teste que falta é dar a um agente novo só o guia + registries e uma transcrição inédita.
- Biblioteca de SFX: os arquivos vivem no PC do squad; o mapa nomeia categoria e peso, não valida se o arquivo existe nem mede loudness (LUFS) do mix final.
- Áreas seguras do Reels (160 / 1536): preset declarado, não verificado contra a UI atual do app.

### Handoff — contratos propostos (não implementados)
BeatPlan {id, templateId, templateVersion, family, role, startFrame, durationFrames, transcript: WordTiming[], focusEvents: FocusEvent[], captionPolicy, dataMode, assetIds}
WordTiming {id, text, startFrame, endFrameExclusive} · FocusEvent {startFrame, durationFrames, fromElementId|null, toElementId|null}
SemanticMotionSpec: ver painel #s05b-motion-semantico.

### Migração de identificadores
foco-migra → foco · trophy → award · gancho 1B → removido da seleção · "quatro estados" → presença × ênfase.
