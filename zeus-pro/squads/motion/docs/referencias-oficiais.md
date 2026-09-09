# Referências oficiais de qualidade do zeus-motion

> Status: DOCUMENTO CANÔNICO. Criado em 27/08/2026, Fase 2 da auditoria do ecossistema
> audiovisual, a partir das 3 peças que o o dono do canal apontou como referência na mesma sessão.
> Leitura obrigatória antes de definir a direção de arte de qualquer composition nova
> (passo 2 do fluxo em `zeus-motion-design-system.md`).

Este documento existe porque "profissional" era gosto implícito do o dono do canal, guardado só na
cabeça dele e em prosa espalhada. Aqui ele vira artefato consultável: peça, nota medida na
rubrica dos 5 fundamentais, e os princípios extraídos ligados ao que os implementa em `core/`.

## A lei que rege este documento

**Extrai-se o princípio, nunca a decoração.** Cor, fonte e paleta destas peças pertencem ao
contexto delas (ver `src/brand/loader.ts` e `templates/design-tokens/brands/`). O que se herda é a
proporção, a hierarquia, o ritmo e o acabamento. Copiar o rosa do Motion Rosa para um vídeo de
cliente é exatamente o erro que a fronteira de marca existe para impedir.

---

## 1. AgenteArquiteto: referência de MINIMALISMO PROFISSIONAL

```
Peça          output/_baseline/AgenteArquiteto-v01.mp4 (20/08/2026)
Composition   src/compositions/AgenteArquiteto/ (legado, sem spec, na allowlist)
Formato       1080x1920, 30fps, 46,3s, 9 cenas
Identidade    Apple minimalista dark: branco, cinza #8E8E93, quase-preto. SF Pro Display.
Notas         F1=9  F2=9  F3=7  F4=9  F5=9   VEREDITO: reprovado em F3
Evidência     output/_qa/AgenteArquiteto/approval.json + 13 frames auditados
```

Palavras do o dono do canal: "minimalista profissional conceitual, tem efeitos visuais, tem
metrônomo, tem letras corretas, tem motion, tem separação por partes".

**Por que reprova em F3 e mesmo assim é referência.** O defeito é UM e localizado: na cena 2
um campo de cerca de 15 formas geométricas vazadas está espalhado sem grade nem eixo, e a
headline da mesma cena tem margem lateral apertada e desigual. Os outros 4 fundamentais passam
com folga. A peça é referência de PRINCÍPIOS, não peça perfeita; o defeito dela é justamente o
melhor exemplo do que o F3 mede. O render mais recente (`output/_qa/AgenteArquiteto/`) já
corrigiu as margens e preencheu o card de bônus que aparecia vazio no baseline.

### Princípios extraídos

1. **Um protagonista por frame, e ele é grande de verdade.** O preço "R$8,05" é cerca de 4
   vezes maior que qualquer outro texto do frame. Hierarquia não se faz com diferença de 20%,
   se faz com diferença de 3 a 4 vezes. Implementa: escala tipográfica de `core/tokens.ts`.
2. **Três níveis tipográficos fixos, nunca mais que isso.** Kicker minúsculo em caixa alta com
   tracking largo, título em peso pesado, apoio pequeno em cinza. A mesma escala se repete em
   todas as cenas: é daí que vem a unidade.
3. **Todo conteúdo mora no terço superior.** Mais da metade da tela fica vazia embaixo, de
   propósito. É o que faz parecer caro em vez de cheio. Implementa: `SAFE` e `ZONES` de
   `core/layout.ts`, dead zone da base.
4. **Máximo 4 ou 5 elementos por frame.** Quando a peça tentou mais (o campo de formas), foi
   exatamente onde ficou fraca. Densidade não é o mesmo que informação.
5. **Ritmo constante de separação.** Uma ideia a cada 6 ou 7 segundos, e cada bloco entra e sai
   por inteiro: a cena morre antes da próxima nascer. É o "separação por partes" que o o dono do canal
   elogiou. Implementa: `exitF` e o overlap do `SceneSpec`.
6. **Eixo central único e sagrado.** Título, apoio, ícone e card compartilham a mesma linha
   vertical. Bloco alinhado à esquerda é alinhado à esquerda por inteiro: nunca misturar centro
   e esquerda dentro do mesmo bloco. Implementa: `OpticalBox.tsx`, `placeAtOpticalCenter()`.
7. **Contraste em degraus, não em dois extremos.** Escada clara: destaque em branco pleno,
   apoio em cinza médio, estrutura (linhas, ícones vazados, divisores) em cinza bem apagado.
   Profundidade sem precisar de cor nenhuma.
8. **Uma única textura de forma para tudo.** Ícones e molduras todos de linha fina, mesma
   espessura. A coerência de traço é o que faz parecer desenhado pela mesma mão. Implementa:
   token `STROKE`, e o check `traco-quadrado` do `choreo-lint.js`.

---

## 2. MaquinaNeoanalogiaca2, o "Motion Rosa": referência de ESTILO e EFEITOS

```
Peça          src/compositions/MaquinaNeoanalogiaca2/ (14 rodadas de refino, v1 a v14)
Formato       1080x1920, 30fps, 59,5s, 8 cenas
Identidade    Brutalista tech: fundo #050505, branco #F2F2F2, rosa neon #FF2D78 / #FF85B3.
              SF Pro Display + Space Mono.
Notas         F1=9  F2=9  F3=10  F4=10  F5=9   VEREDITO: APROVADO
Evidência     output/_qa/MaquinaNeoanalogiaca2/approval.json + 6 frames auditados
Derivados     TrafegoIA, RaioXLucroAzul, MotionMassofy nascem dela (comentários em Root.tsx)
```

Palavras do o dono do canal: "achei o motion rosa que gosto dos efeitos e do estilo, ele é o que mais
se aproxima de algo que eu chamo de profissional".

### Princípios extraídos

1. **Um só acento saturado sobre base quase monocromática.** A cor forte aparece em no máximo
   dois lugares por quadro. O princípio é a PROPORÇÃO, não o rosa: qualquer cor funciona se for
   a única.
2. **O brilho é do objeto, nunca do fundo.** Só um elemento por cena pode brilhar de verdade, e
   é o que carrega a informação principal.
3. **Halo e vinheta criam palco.** Um clarão amplo e fraquíssimo atrás do centro, mais
   escurecimento nas bordas, puxa o olho para o meio sem desenhar caixa nenhuma. Custa quase
   nada e mata a cara de fundo chapado.
4. **Texto grande sempre em branco puro; a cor fica nos apoios.** O número é branco, quem é
   colorido é o kicker e a régua. Invertendo isso (número colorido) a peça vira anúncio barato
   na hora.
5. **Monoespaçada como contraponto de dado.** Largura fixa só onde há medida, etapa ou estado.
   Dá ar de painel de instrumento justamente por ser rara; se todo texto fosse assim, viraria
   terminal genérico.
6. **Card com borda de 1px e preenchimento quase invisível.** Contorno finíssimo e enchimento
   levemente tingido, nunca fundo colorido: estrutura sem peso, com o preto seguindo dominante.
7. **Densidade em degrau, nunca de uma vez.** A cena começa com um card e chega a três; o
   número chega sozinho e só depois ganha frase e régua. Cada frame congelado é legível porque
   a informação foi entregue em camadas. Implementa: `children.staggerF` do `SceneSpec`.
8. **Toda saída sai desfocada.** O elemento antigo não some: ele borra e afunda. É o que dá
   profundidade e o que impede a peça de parecer troca de slide. Implementa: `exitTo` de
   `core/primitives.ts` (saída quádrupla: posição + blur + opacity + scale).

---

## 3. AgenteArquiteto-v1 (renders/): base boa, NÃO é a referência

```
Peça          output/AgenteArquiteto/renders/AgenteArquiteto-v1.mp4 (15/05/2026)
Status        contra-exemplo útil
```

Palavras do o dono do canal: "vídeo minimalista com movimentos, esquemas interessantes, ainda tem que
melhorar muita coisa. Serve como referência de uma base. Ele tem movimentos, tem suavizações,
mas tem um outro que foi feito melhor que esse."

Serve para mostrar a diferença entre "tem motion" e "tem direção de arte". O baseline v01
(item 1 acima) é a evolução direta desta peça, 3 meses depois. Quando alguém pedir "igual ao
Agente Arquiteto", o alvo é o v01 do `_baseline/`, nunca este.

---

## Como escolher entre as duas linguagens

Regra de bolso vinda da auditoria:

- **Cena com número, etapa, lista ou comparação: linguagem densa (Motion Rosa).** O brilho e a
  régua funcionam como painel de instrumento e comunicam "isto é uma máquina que funciona".
  Serve para tráfego frio, produto com promessa concreta, público que precisa ver evidência.
- **Cena com uma ideia só, frase de posicionamento, manifesto, abertura de alto ticket:
  linguagem minimalista (AgenteArquiteto).** Ali o vazio é a mensagem, e qualquer efeito rouba
  autoridade da frase.
- **Misturar as duas na mesma peça é o erro** que faz o vídeo parecer indeciso.

O que as duas têm em comum, e por isso vale para QUALQUER peça do squad, independente de marca:
eixo óptico único, terço superior ocupado com base livre, no máximo 4 ou 5 elementos por frame,
três níveis tipográficos, contraste em degraus, entrada e saída sempre com opacity + blur +
posição juntos, e coerência de traço.

---

## Referência 3: direção dinâmica (externa, 08/09/2026)

Esta é diferente das duas de cima: as outras definem ESTÉTICA (como a peça se parece), esta define
ESTRUTURA (o que ocupa a tela e quando troca). O o dono do canal trouxe um anúncio vertical de 45s de fora
da casa e pediu explicitamente que o visual continuasse sendo o nosso. Então daqui não sai uma cor,
uma fonte nem um efeito: sai a gramática de direção.

Arquivo e frames: `aprendizado/referencias-externas/2026-09-08-fernando-direcao-dinamica/`.
Manual completo: `squads/motion-apple/design-system/DIRECAO-DINAMICA.md`.

Nota na rubrica dos 5 fundamentais (medida na peça editada, 0:09 a 0:53):

- F1 eixo e hierarquia: 8. Um eixo central em todos os estados, no máximo 3 elementos por frame.
- F2 respiro: 9. Estados de tela cheia funcionam como respiro estrutural, não como enfeite.
- F3 tipografia: 7. Três níveis claros (legenda, título, frase), mas a ênfase é por cor, o que no
  nosso sistema é por fonte.
- F4 movimento: 7. Entradas corretas, mas amplitude maior que o nosso teto em algumas passagens.
- F5 coerência: 9. Um acento só, um traço só, do primeiro ao último quadro.

Princípios extraídos (os que viraram regra nossa):

1. **Estado de palco escolhido pelo papel do beat no arco**, não pelo assunto. Treze papéis, três
   estados. É o que ele chama de direcionamento dinâmico.
2. **O rosto volta a cada 8 segundos.** Tela cheia é tempero, não prato.
3. **Título persistente:** o esquema fica parado e só a frase acima troca por beat. Rende três cenas
   com um molde só.
4. **Legenda na costura:** a faixa de legenda ancora a divisão entre esquema e rosto, em vez de
   flutuar sobre um deles.
5. **Fala concreta ganha esquema, fala abstrata ganha metáfora.** A linha que evita ícone decorativo.
6. **Sem recurso pronto, compor:** a cena nasce de primitivas atômicas guiadas pelo verbo da fala,
   em vez de cair num molde errado ou numa tela vazia.

O que NÃO adotamos: paleta preta e amarela, visual de chat de IA, ênfase por cor, amplitude de
movimento acima do nosso teto de 16px.

---

## Onde isto se conecta

```
zeus-motion-design-system.md   o fluxo obrigatório; este doc é insumo do passo 2 (direção de arte)
DIRECAO-DINAMICA.md            estrutura e momento (motion-apple/design-system/); as ref. 1 e 2 dizem COMO se parece, ela diz O QUE aparece e QUANDO
INTENT-MAP.md                  tradução de pedido em português para chamada de função do core
padrao-aprovado-zeus-motion.md filosofias visuais por projeto, exemplos código a código
src/core/                      a implementação dos princípios acima
output/_qa/<Comp>/approval.json a nota medida de cada peça, com o hash do src no momento
```

Peça nova que o o dono do canal aprovar com elogio explícito entra aqui na mesma sessão, com nota
medida pela rubrica e princípios extraídos. Aprovação sem princípio extraído não vira
referência: vira só um arquivo bonito que ninguém consegue repetir.
