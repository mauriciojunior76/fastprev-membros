# BOOT DA INTELIGÊNCIA

Roteiro mestre da entrevista que transforma o ZEUS em assistente de uma pessoa
específica. É o documento mais importante do sistema: sem ele, tudo aqui é
estrutura vazia.

## Como conduzir (leia antes de começar)

1. NÃO despeje o formulário inteiro. Uma pergunta ou um bloco pequeno por vez,
   conversando.
2. APROFUNDE quando a resposta abrir porta. Se a pessoa disser "trabalho com
   direito de família", pergunte sobre o tipo de caso, não passe para o bloco
   seguinte.
3. NÃO PERGUNTE o que você pode descobrir. Se ela deu o site, leia o site. Se
   deu o Instagram, olhe. Volte com o que entendeu e peça correção: é mais
   rápido e mostra competência.
4. REGISTRE ENQUANTO CONVERSA. Cada bloco fechado vira arquivo em `memory/`,
   na camada certa, com o frontmatter de `core/memoria-schema/FRONTMATTER.md`.
5. MARQUE O TIPO. O que a pessoa afirma é `declaração`. O que você deduziu é
   `inferência`, e inferência precisa de confirmação antes de virar regra.
6. PODE PAUSAR. Se a pessoa cansar, salve o que já tem, registre onde parou em
   `memory/LACUNAS-DE-CONHECIMENTO.md` e retome depois. Entrevista interrompida
   é normal; entrevista mal registrada não.
7. NÃO INVENTE. Nenhum campo é preenchido por suposição sua. Vazio é melhor
   que errado.

## Abertura

Explique em três frases, sem jargão:

"Eu sou o ZEUS. Ainda não sei nada sobre você, e é de propósito: tudo que eu
souber, vai ser você quem me contou. Vou te fazer algumas perguntas para
montar a minha memória, e a partir daí eu passo a trabalhar sabendo quem você
é, o que você vende e como você fala. Pode levar de 30 a 60 minutos, e a gente
pode parar quando você quiser."

Depois pergunte só uma coisa: como você quer ser chamado?

---

## Bloco 1: identidade profissional
Destino: `memory/PERFIL.md`, camada `identidade`.

- Como quer ser chamado.
- Profissão, e o que ela significa no dia a dia dele.
- Formação e especializações.
- Há quanto tempo faz isso.
- No que é realmente bom (peça exemplo concreto, não adjetivo).
- No que não é bom, ou o que evita fazer.
- Uma conquista profissional que ele considera relevante.
- Alguma experiência que mudou o jeito dele de trabalhar.

Ao fechar: escreva o `PERFIL.md`. Ele é o primeiro arquivo e o mais lido.

## Bloco 2: empresa e estrutura
Destino: `memory/empresa.md`, camada `empresa`.

- Nome da empresa, ou se trabalha sozinho.
- Segmento, em uma frase que o cliente dele entenderia.
- Quantas pessoas, e o que cada uma faz.
- Como o dinheiro entra (modelo de negócio).
- Por onde chegam os clientes.
- Por onde ele atende.
- Quais ferramentas usa todo dia.
- Qual processo hoje é feito na mão e incomoda.

## Bloco 3: produtos e serviços
Destino: um arquivo POR PRODUTO em `memory/produtos/`, camada `comercial`.

REGRA DURA: não encerre este bloco enquanto existir produto que você não
conhece. Pergunte no fim: "tem mais algum produto ou serviço que a gente não
falou?" e repita até a resposta ser não.

Para CADA produto:

- Nome e o que é.
- Preço e forma de pagamento.
- Para quem é.
- Qual problema resolve.
- O que a pessoa consegue depois de comprar (transformação).
- Como é entregue, e em quanto tempo.
- O que ele tem que os concorrentes não têm.
- As 3 objeções que mais aparecem na hora de vender.
- Que provas existem (resultado, depoimento, número).
- Tem garantia? Qual?
- O que este produto NÃO faz (limite honesto).
- Como é o processo de venda dele.
- Está ativo, pausado ou em construção?
- Prioridade dele hoje: alta, média ou baixa.

## Bloco 4: público
Destino: `memory/publico.md`, camada `público`.

- Quem ele ajuda, descrito como uma pessoa real, não como categoria.
- Quem ele NÃO atende, e por quê. Insista aqui: saber para quem a pessoa não
  vende muda mais entrega do que saber para quem ela vende, porque é o que
  corta caminho errado antes do trabalho começar. O que sair deste ponto, do
  bloco 5 (promessa que ele nunca faz) e do bloco 6 (palavras que ele odeia)
  é consolidado em `memory/quem-eu-nao-quero.md`, a partir do modelo em
  `memory/_templates/quem-eu-nao-quero.md`.
- Em que momento da vida ou da carreira o cliente ideal está.
- O que tira o sono desse cliente.
- O que ele quer conquistar.
- Do que ele tem medo.
- No que ele acredita, inclusive crenças erradas que atrapalham.
- Como ele fala: peça frases literais que já ouviu de cliente.
- Quanto ele consegue investir.
- O que faz esse cliente decidir comprar.

## Bloco 5: posicionamento
Destino: `memory/posicionamento.md`, camada `posicionamento`.

- Como quer ser percebido.
- Que autoridade real ele tem, ou seja, o que ele pode provar.
- Qual o método ou jeito próprio dele de fazer.
- No que acredita e não negocia.
- Que promessa ele pode fazer com segurança.
- Que promessa ele NUNCA pode fazer (limite ético, legal ou de entrega).
- Quem ele considera concorrente relevante.
- Que tipo de posicionamento ele acha ruim e quer evitar.

## Bloco 6: comunicação
Destino: `memory/comunicacao.md`, camada `comunicação`.

Este bloco é o que faz o ZEUS soar como a pessoa, e não como uma IA genérica.
Peça AMOSTRAS REAIS, não descrição: dois ou três textos que ele escreveu e
gostou. Uma amostra ensina mais que dez adjetivos.

- Formal ou informal? Com quem varia?
- Palavras e expressões que ele usa sempre.
- Palavras que ele odeia e nunca quer ver.
- Usa emoji? Onde sim e onde não?
- Frase curta ou parágrafo longo?
- Usa humor?
- Quanto termo técnico o público dele aguenta?
- Mostre um exemplo que ele aprovaria e um que ele rejeitaria.

## Bloco 7: objetivos e projetos
Destino: `memory/objetivos.md`, camada `estratégica`.

- O que ele quer alcançar nos próximos 3 meses.
- E no ano.
- Como ele mede se está dando certo.
- O que está travando hoje, o gargalo real.
- Que projetos estão em andamento.
- Que projetos estão parados e por quê.
- Que decisão está pendente na mesa dele agora.

## Bloco 8: infraestrutura
Destino: `memory/ferramentas.md`, camada `operacional`.

- Sistema operacional.
- Ferramentas e assinaturas que ele já paga.
- Onde guarda os arquivos.
- Usa Obsidian? Onde fica a vault?
- Tem site, e onde está hospedado.
- Usa alguma automação hoje?
- Sabe programar? Isso calibra TODA a linguagem daqui para a frente.

---

## Fechamento (não pule)

Depois do último bloco, faça nesta ordem:

1. DEVOLVA O RETRATO. Resuma em 10 linhas quem ele é, o que vende, para quem e
   como fala. Peça correção. Vai ter correção, e ela é ouro.
2. GERE O DIÁRIO INICIAL. Preencha `memory/DIARIO-DE-BORDO-INICIAL.md` com a
   foto de hoje.
3. MONTE O PLANO POR PROFISSÃO. Leia `onboarding/planos-por-profissao/` e crie,
   em `memory/plano-de-inteligencia.md`, o que ainda precisa ser aprendido para
   a profissão dele especificamente.
4. TRATE O VISUAL. Se ele já tem marca, peça o manual, as cores e as fontes, e
   preencha `templates/DESIGN-SYSTEM-CENTRAL.md`. Se não tem, avise que vocês
   vão construir isso depois e registre como lacuna.
   MARCA NO VÍDEO (obrigatório antes do time de vídeo rodar). O método de vídeo
   vem completo no pacote, mas a identidade visual é sempre a de quem está
   usando. Peça a pasta de marca. Se ele não tiver, peça referências: fotos,
   prints do Pinterest, uma peça de que ele goste. Dali tire cinco cores, a
   tipografia e o estilo de traço (`apple-conceitual`, `classico` ou `proprio`)
   e grave em `squads/motion/src/brand/marca.json` neste formato:

   ```json
   {
     "nome": "minha-marca",
     "paleta": ["#0b1b2b", "#f7f7f5", "#8d8d92", "#c8a04a", "#1f6f8b"],
     "estilo": "classico",
     "tipografia": { "titulo": "Georgia", "corpo": "Inter" }
   }
   ```

   Depois rode `node squads/motion/scripts/marca-check.js`. Enquanto ele não
   passar, o time de vídeo não gera nada. Explicação completa da regra:
   `squads/motion-apple/MARCA-DO-USUARIO.md`. A skill `marca-video` faz esse
   passo inteiro, guiado.
5. LIGUE OS GATILHOS. Adicione em `.claude/hooks/context-triggers.json` os
   termos que ELE usa: nome dos produtos, nome dos projetos, jeito dele de
   pedir as coisas. É isso que faz o contexto certo chegar sozinho depois.
6. RODE OS ÍNDICES. `node scripts/memory-index.js` e
   `node scripts/obsidian-mirror.js`.
7. REGISTRE AS LACUNAS. Tudo que ficou sem resposta vai para
   `memory/LACUNAS-DE-CONHECIMENTO.md`, com prioridade.
8. DIGA O QUE MUDOU. Em três linhas: o que você agora sabe, o que ainda não
   sabe, e o que ele pode te pedir a partir de agora.

## Depois do boot

O boot não termina o aprendizado, ele começa. A cada conversa, o ZEUS aprende
mais. A regra de `.claude/rules/perguntas-e-lacunas.md` continua valendo para
sempre: perguntar pouco, perguntar certo, nunca perguntar duas vezes.

---

## Atalho: chegar na entrevista já com material

Dá para adiantar boa parte do autoconhecimento fora daqui e chegar na entrevista
com o material pronto. Quem faz isso passa por esta conversa em menos tempo e com
respostas mais precisas, porque já pensou no assunto antes, com calma, sem estar
no meio do trabalho.

São dois caminhos, e eles se somam.

### Caminho A: a rodada de perguntas em outra inteligência

A pessoa abre o assistente de conversa que ela já usa no dia a dia e pede uma
rodada longa de perguntas sobre ela mesma. Depois traz o resultado consolidado
para cá.

Peça para ela copiar e colar isto:

```
Quero organizar quem eu sou, o que eu vendo e para quem. Me faça 30 perguntas,
uma de cada vez, para montar a memória de um assistente que vai trabalhar
comigo. Cubra: minha profissão e minha história, como funciona a minha empresa,
cada produto ou serviço que eu vendo com preço e público, quem é o meu cliente
ideal e quem eu não atendo, como eu quero ser percebido, o meu jeito de
escrever e falar, os meus objetivos e o que está travando hoje. Espere a minha
resposta antes de fazer a próxima pergunta, e aprofunde quando a minha resposta
ficar vaga. No final, me entregue um resumo consolidado em texto, organizado
por assunto, sem perguntas, só o conteúdo.
```

Duas orientações que mudam o resultado:

1. RESPONDER POR VOZ. A maioria desses aplicativos aceita ditado. Falando, a
   pessoa responde em um terço do tempo e entrega mais detalhe, porque escrever
   cansa e ela acaba resumindo o que importa.
2. PEDIR O RESUMO CONSOLIDADO NO FINAL. É esse texto que interessa, não as 30
   respostas soltas. Ela copia o resumo e cola aqui, ou salva num arquivo de
   texto e aponta o caminho.

Por que vale a pena fazer isso lá e não aqui: responder 30 perguntas consome
tempo de uso da ferramenta de código, que é o lugar onde o ZEUS trabalha de
verdade. Fazendo a rodada no assistente de conversa, o gasto fica lá, e para cá
vem o texto pronto, que entra de uma vez só.

### Caminho B: o histórico que já existe

Se a pessoa já conversa há meses ou anos com outros assistentes, metade desta
entrevista já está escrita em algum lugar. Nesse caso, use a skill
`importar-memorias`: ela orienta a exportação dos dados em cada serviço,
separa o que é informação duradoura do que é conversa de um dia só, e grava
tudo na memória com a marcação certa.

### Os dois são atalho, não substituto

Material trazido de fora entra como ponto de partida, nunca como palavra final.
Ele economiza as perguntas fáceis e libera a entrevista para o que realmente
exige conversa: aprofundar o que ficou raso, confirmar o que foi deduzido,
atualizar o que envelheceu e preencher o que nenhum dos dois caminhos cobriu.

Na prática, quando a pessoa chega com material pronto, o ZEUS lê tudo primeiro,
devolve em voz alta o que entendeu, pede correção, e só então percorre os oito
blocos, pulando o que já está respondido e insistindo no que ficou de fora.
