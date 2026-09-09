# Prompt padrão de reforma de vídeo (squad motion-apple)

Cole no início da conversa quando quiser refazer ou ajustar uma peça no estilo Apple.
Troque o que está entre colchetes. As palavras "Zeus Motion/Apple-Style" no começo já fazem o
sistema carregar sozinho o manual certo e a memória deste squad.

---

## Prompt de REFORMA (peça que já existe)

```
Zeus Motion/Apple-Style: reforma o [NOME DA PEÇA].

O que me incomoda nele: [escreve aqui, com as tuas palavras. Exemplos: pouca cena, fica parado
demais no meio, a legenda repete o que já está escrito na tela, o som entra fora de hora, a
parte do [assunto] não tem nada visual, o final morre].

Segue a esteira do squad, sem pular etapa:

1. Confere a transcrição por palavra da peça. Não existe, transcreve antes.
2. Divide a fala em trechos por SIGNIFICADO, nunca por tempo, e escreve o papel de cada um
   (gancho, problema, explicação, exemplo, prova, clímax, chamada, respiro).
3. Para cada trecho, pergunta ao design system que tipo de informação é aquilo e recebe os
   candidatos. Escolhe lendo "use quando" e "não use quando", e escreve o motivo da escolha.
4. Monta o plano de cenas: âncora numa palavra real da fala, densidade alternando (nunca três
   cenas seguidas no mesmo nível), legenda calando onde o palco já tem texto ou número grande,
   movimento com entrada, ação, foco, sustentação e saída, e som por peso do gesto.
   Antes de escolher molde, diz quantas cenas a fala pede (afirmações por minuto, pela matriz de
   cenas). Cena curta não recebe molde de montagem longa. Menção de plataforma vira acento por
   cima da cena, nunca cena de interface.
5. Passa nos fiscais automáticos: ritmo, som, cena parada tempo demais, uso do design system.
   O do design system é `node scripts/checar-design-system.js <Composition>`: ele exige que cada
   componente declare no cabeçalho a linha `MOLDE DO INDICE: <id>`, confere os números contra as
   escalas fechadas e acusa molde repetido em cenas vizinhas. Nasceu porque eu desenhei molde no
   olho duas vezes (lição `design-system-do-indice`).
6. Gera o código e a folha de storyboard, e PARA. Me manda a folha para eu aprovar.
   Nenhum render antes do meu OK.
7. Depois do meu OK: monta os componentes, revisa quadro a quadro, renderiza e me manda o
   vídeo aqui na conversa.

Regras que não se negociam:
- Nada de copiar cena, texto ou componente de outra peça. Cada vídeo é único.
- Se a fala não dá o número, o prazo ou a prova, não inventa: escolhe um recurso que não exija.
- Trecho sem estrutura clara é locutor e legenda, e isso é decisão certa, não preguiça.
- O que já foi reprovado antes continua reprovado, mesmo que o manual novo sugira o contrário.

No fim, me diz em duas linhas o que mudou de verdade em relação à versão anterior.
```

---

## Prompt de PEÇA NOVA (gravação virando Reel)

```
Zeus Motion/Apple-Style: transforma [o arquivo / a call do dia tal] em Reel.

Assunto que eu quero no corte: [o trecho ou tema]. Duração alvo: [45 a 70 segundos].

Mesma esteira de sempre: corta a fala, transcreve por palavra, divide por significado,
classifica cada trecho, consulta o design system antes de inventar visual, monta o plano de
cenas sincronizado com a fala, passa nos fiscais, me manda a folha de storyboard e espera meu
OK antes de renderizar.
```

---

## Prompt de AJUSTE PEQUENO (uma cena só)

```
Zeus Motion/Apple-Style: na peça [NOME], a cena [qual, ou o segundo aproximado, ou a frase
falada] está [o que está errado].

Mexe só nessa cena, mantém o resto intacto, passa nos fiscais de novo e me mostra o quadro
antes e depois. Se o conserto quebrar o ritmo das cenas vizinhas, me avisa antes de mexer nelas.
```

---

## Por que o prompt é assim

Cada bloco existe para travar um erro que já aconteceu. A ordem obrigatória impede começar pelo
visual (foi assim que uma peça nasceu como cópia de outra). O "me manda a folha antes" existe
porque render sem storyboard aprovado gastou rodadas inteiras. O "não inventa número" e o
"trecho sem estrutura é legenda" vêm do próprio manual do design system. E pedir o resumo do
que mudou no fim é o que permite comparar versão com versão sem assistir tudo de novo.

---

## O checklist do passo 7 (06/09/2026)

Antes de mandar o vídeo, rodar item a item o CHECKLIST PRÉ-ENTREGA do `MEMORY.md` deste squad.
Cada linha de lá custou uma rodada de correção, então nenhuma é decorativa.

O item que mais pega defeito é o mais simples de todos: olhar um frame de CADA cena, com
`node scripts/video/qa-beats.js <Composition>`. Na produção do Carlos Seme, cinco dos seis
defeitos visuais apareceram só nessa olhada, e nenhum deles tinha sido pego pelos fiscais
automáticos: eles medem o que é mensurável (colisão, sobra, acento, cor solta), e não sabem
dizer que uma balança com um prato só não parece uma balança.

Fiscal automático reprova o que dá para contar. O frame mostra o que dá para entender.
