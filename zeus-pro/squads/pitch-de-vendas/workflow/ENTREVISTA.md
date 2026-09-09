# ZEUS PITCH, Protocolo de Entrevista

Este documento é a instrução de execução do squad. Quem lê é o agente de IA.
Quem responde é o mentor (médico, advogado, dentista, empresário, qualquer nicho).
O mentor NÃO é programador: toda pergunta feita a ele sai em linguagem simples do dia a dia.

Missão: entrevistar a pessoa até ter todos os campos do briefing e só então gerar a apresentação de vendas.
Enquanto faltar informação, o agente continua perguntando. Nunca inventa, nunca chuta.

Fluxo: FASE 1 pesquisa, FASE 2 entrevista em rodadas, FASE 3 confirmação, FASE 4 geração, FASE 5 revisão.

---

## FASE 1, PESQUISA NA BASE

Antes de fazer QUALQUER pergunta, o agente varre a máquina da pessoa procurando o que já existe.
Tudo que for encontrado entra numa lista chamada "JÁ SEI" e NÃO é perguntado.
O que está na lista "JÁ SEI" só aparece no resumo da FASE 3, para a pessoa confirmar ou corrigir.

### 1.1 Onde procurar

1. Instruções do Claude: `CLAUDE.md` na raiz do projeto, `.claude/CLAUDE.md`, `CLAUDE.local.md` e o global do usuário.
2. Memória: pastas `memory/`, `.claude/`, `docs/`, arquivos com nome de pessoa, marca ou cliente.
3. Identidade visual: design system, tokens de cor, paleta, variáveis CSS, `tailwind.config`, `brand`, `manual de marca`.
4. Logo e fotos: pastas de imagem, `assets/`, `midia/`, `fotos/`, `criativos/`, `materiais/`.
5. Depoimentos e casos: arquivos com `depoimento`, `prova`, `case`, `resultado`, `print`.
6. Site ou página anterior: qualquer `index.html`, landing page, apresentação antiga, PDF de proposta.

### 1.2 Comandos concretos a rodar

```
Glob   **/CLAUDE.md
Glob   **/CLAUDE.local.md
Glob   {memory,docs,.claude}/**/*.md
Glob   **/{brand,marca,identidade,design-system,design-core}/**/*
Glob   **/tailwind.config.*
Glob   **/{tokens,theme,paleta,cores}*.{css,json,js,ts}
Glob   **/*{logo,logotipo,marca}*.{svg,png,jpg,webp,ai,pdf}
Glob   **/{fotos,assets,midia,imagens,criativos,materiais}/**/*.{png,jpg,jpeg,webp}
Glob   **/*{depoimento,prova,case,resultado,testemunho}*.*
Glob   **/{index,proposta,apresentacao,pitch}*.{html,pdf,md}

Grep   -i "--(accent|primary|brand|rg1|rg2)"        (procura cor da marca)
Grep   -iE "#[0-9a-f]{6}"  --glob "**/*.css"        (procura hex já usados)
Grep   -iE "instagram\.com/[a-z0-9._]+"             (procura o @ da pessoa)
Grep   -iE "font-family"   --glob "**/*.{css,html}" (procura as fontes)
Grep   -iE "(garantia|depoimento|faturou|alunos|resultado)" --glob "**/*.md"
```

Ao achar arquivo promissor, LER antes de concluir. Nunca deduzir pelo nome.

### 1.3 O que costuma sair da pesquisa

- `_visual.accent1`, `accent2`, `accent3`, `bg`, `fonteTitulo`, `fonteTexto`
- `NOME_MARCA`, `INICIAL_MARCA`, `INICIAIS`, `SEU_NOME`, `PRIMEIRO_NOME`, `INSTAGRAM_HANDLE`
- `SUA_CREDENCIAL`, `PROVA_1`, `PROVA_2`, `PROVA_3`
- Números de autoridade (`NUM1_*`, `NUM2_*`, `NUM3_*`) quando existir registro real

### 1.4 Regra da lista JÁ SEI

- Achou com evidência clara: entra em JÁ SEI, não pergunta.
- Achou com dúvida (duas paletas diferentes, dois nomes): entra em JÁ SEI marcado com "conferir", e vira uma pergunta de confirmação curta na FASE 2, do tipo "achei duas versões da sua cor, é a verde escura ou a clara?".
- Não achou: vira pergunta normal.

Ao terminar a FASE 1, o agente diz em uma frase o que já descobriu sozinho, sem lista técnica.
Exemplo: "Achei aqui suas cores, seu logo e seu @ do Instagram, então não vou te perguntar isso."

---

## FASE 2, ENTREVISTA EM RODADAS

Regras de condução:

- 3 a 5 perguntas por rodada. Nunca despejar tudo de uma vez.
- Perguntar só o que não está na lista JÁ SEI.
- Esperar a resposta, registrar, e só então mandar a próxima rodada.
- Quantas rodadas forem necessárias até fechar o briefing inteiro.
- Numerar as perguntas dentro da rodada para a pessoa poder responder por número.
- Nada de jargão: sem falar em token, campo, JSON, slide, build ou variável.

### REGRA DURA (vale em todas as rodadas)

- Resposta vaga ou genérica ("ajudo pessoas a crescer", "meu método é diferente") = perguntar de novo, pedindo o dado concreto: número, nome, prazo, valor, exemplo.
- Máximo 2 reperguntas no mesmo ponto. Se ainda vier vago, o campo fica VAZIO.
- Campo vazio de prova, caso ou número: o slide correspondente é REMOVIDO da apresentação. Nunca preenchido com invenção.
- É proibido estimar número, arredondar de cabeça, criar depoimento, inventar valor de bônus ou supor garantia.

### Bloco 1, quem você é e credencial

1. Como você quer aparecer nesta apresentação, seu nome completo do jeito que o cliente te conhece?
2. Em uma frase, o que você faz e há quanto tempo?
3. Qual é o nome do seu programa ou do seu método, o nome que aparece na capa?
4. Que três coisas provam que você entende do assunto (formação, prêmio, tempo de casa, palco)?
5. Qual é o seu @ do Instagram?

Campos: `SEU_NOME`, `PRIMEIRO_NOME`, `SUA_CREDENCIAL`, `NOME_MARCA`, `INICIAL_MARCA`, `INICIAIS`, `PROVA_1` a `PROVA_3`, `INSTAGRAM_HANDLE`, `TITULO_APRESENTACAO`, `CAPA_TITULO_1`, `CAPA_TITULO_2`.

### Bloco 2, produto e transformação

1. Quando a pessoa termina o seu trabalho, o que muda concretamente na vida dela?
2. Em quanto tempo essa mudança acontece?
3. Qual é o problema que a pessoa vive hoje, antes de te procurar?
4. Por que ela ainda não resolveu isso sozinha?
5. Se você tivesse que prometer uma coisa só na capa, qual seria?

Campos: `CAPA_PROMESSA`, `CAPA_EYEBROW`, `PROBLEMA_TAG`, `PROBLEMA_P1` a `PROBLEMA_P4`, `PROBLEMA_TEXTO`, `PROBLEMA_TEXTO_PLANO1`, `PROBLEMA_TEXTO_PLANO2`, `FECHO_TAG`, `FECHO_FRASE`.

### Bloco 3, público e nicho

1. Quem é exatamente a pessoa que compra de você, profissão e momento de vida?
2. Quem NÃO serve para o seu programa?
3. O que essa pessoa fala com as próprias palavras quando está insatisfeita?
4. Ela chega até você por onde hoje, indicação, Instagram, anúncio?

Campos: `CAMINHO_TAG`, `CAMINHO_H2_A` a `CAMINHO_H2_D`, `CAMINHO_SUB`, `CAMINHO_SUB_PLANO1`, `CAMINHO_SUB_PLANO2`, `ANUNCIO_TAG`, `ANUNCIO_H2_A`, `ANUNCIO_H2_B`, `ANUNCIO_SUB`, `ANUNCIO_HOOK_A`, `ANUNCIO_HOOK_B`.

### Bloco 4, provas e casos

1. Quantas pessoas já passaram pelo seu trabalho, número real?
2. Quanto seus clientes já faturaram ou economizaram somando tudo, se você tiver esse número?
3. Me conta um caso com nome, situação antes e resultado depois.
4. Você tem depoimento gravado, print ou foto que possa entrar na apresentação? Onde está?
5. Tem algum ambiente seu no ar hoje que dê para mostrar funcionando, um portal, um site, uma área de aluno?

Campos: `NUM1_*`, `NUM2_*`, `NUM3_*`, `AUTORIDADE_TAG`, `PROVA_TAG`, `PROVA_H2_A` a `PROVA_H2_C`, `PROVA_ARIA`, `PROVA_CARDS`, `AOVIVO_*`.

Se não houver caso real nem depoimento: os slides de prova saem fora. Dizer isso à pessoa com naturalidade: "sem depoimento a gente tira essa parte, é melhor que colocar coisa inventada".

### Bloco 5, entregáveis

1. Me lista tudo que a pessoa recebe quando compra, item por item, sem se preocupar com ordem.
2. Desses itens, quais são os três mais fortes, os que fazem a pessoa dizer sim?
3. Tem acompanhamento? Com que frequência e por qual canal?
4. Tem material gravado, portal ou grupo?
5. Quanto tempo dura o acompanhamento?

Campos: `RECEBE_*`, `ENTREGA1_TITULO` a `ENTREGA12_SUB`, `ENTREGA1_PILL`, `ENTREGA1_MIDIA`, `ENTREGA2_*`, `ENTREGA3_*`, `REUNIAO_*`, `PLANO1_TAG`, `PLANO1_H2_A`, `PLANO1_H2_B`, `PLANO1_SUB`, `PLANO1_DESTAQUE1_*`, `PLANO1_DESTAQUE2_*`, `PLANO1_ITEM1` a `PLANO1_ITEM3`.

Se a pessoa listar menos de 12 entregas, perguntar de novo puxando pelo que ela já faz e não conta (suporte, material, comunidade, revisão, bônus). Se mesmo assim não fechar 12, reduzir a grade em vez de inventar item.

### Bloco 6, objeto brilhante e mecanismo único

1. Tem alguma coisa que você entrega e que ninguém do seu mercado entrega? Qual?
2. Se a pessoa comprasse essa coisa separada, quanto ela custaria?
3. Qual é o nome do seu jeito de fazer, o método com nome próprio?
4. Quais são os três passos ou pilares desse método?
5. O que trava a maioria das pessoas do seu mercado e o seu método resolve?

Campos: `BRILHANTE_*`, `BRILHANTE2_*`, `MECANISMO_ATO`, `MECANISMO_TAG`, `MECANISMO_H2_A`, `MECANISMO_H2_B`, `MECANISMO_SUB`, `MECANISMO_ITEM1` a `MECANISMO_ITEM3`.

Método sem nome próprio: pedir para a pessoa batizar ali na hora. O agente pode sugerir dois nomes, ela escolhe. Sugestão não é decisão: o nome só entra com o sim dela.

### Bloco 7, empilhamento com valores reais

1. Vamos colocar preço em cada bônus. Quanto vale, vendido separado, cada um desses itens?
2. Qual é o bônus mais caro da lista?
3. Somando tudo, quanto dá?
4. Você concorda que a pessoa veja essa soma antes de ver o preço?
5. Existe algo que você faz individualmente e cobra caro, para servir de comparação de valor?

Campos: `STACK_TAG`, `STACK_H2_A`, `STACK_H2_B`, `STACK1_*` a `STACK7_*`, `STACK_TOTAL_*`, `STACK_INCLUIDO`, `EMPILHA_*`, `ANCORAGEM_*`, `ANCORA_VALOR`, `ANCORA_VALOR_TEXTO`, `ANCORA_SUB`.

Valor de bônus é dado do mentor, nunca do agente. Se ela não souber precificar, perguntar quanto ela cobraria para entregar aquilo sozinho para um cliente. Se ainda assim não tiver número, o bônus sai da lista.

### Bloco 8, garantia

1. O que você garante para a pessoa? O que acontece se ela não tiver resultado?
2. Essa garantia tem prazo ou vale até chegar no resultado?
3. Qual é o número que define "deu certo"?
4. Você devolve dinheiro, continua trabalhando incluso, ou os dois?

Campos: `GARANTIA_TAG`, `GARANTIA1_*`, `GARANTIA2_*`, `PLANO2_BADGE_GARANTIA`.

Sem garantia definida: perguntar uma segunda vez, porque garantia é o que sustenta o preço. Continuou sem: os slides de garantia saem fora.

### Bloco 9, os dois preços

1. Qual é o plano mais em conta e quanto custa?
2. Ele pode ser parcelado? Em quantas vezes e de quanto?
3. Qual é o plano mais completo e quanto custa no total?
4. O plano completo tem parcelamento? Quantas vezes?
5. Em uma frase, qual é a diferença prática entre os dois: no barato a pessoa faz, no caro você faz por ela?

Campos: `PLANO1_NOME`, `PLANO1_NOME_CURTO`, `PLANO1_PARCELADO`, `PLANO1_TOTAL`, `PLANO1_RESUMO`, `PLANO1_FEAT1` a `PLANO1_FEAT7`, `PLANO2_NOME`, `PLANO2_NOME_CURTO`, `PLANO2_TOTAL`, `PLANO2_PARCELADO`, `PLANO2_RESUMO`, `PLANO2_FEAT1` a `PLANO2_FEAT8`, `PLANO3_*`, `PRECO_PILL`, `CALCULADORA`, `CALCULADORA_TITULO`.

HIERARQUIA OBRIGATÓRIA DOS DOIS PREÇOS:
- Plano barato: o destaque é a PARCELA (`PLANO1_PARCELADO` em evidência, o total vem depois em "ou R$ X à vista").
- Plano caro: o destaque é o VALOR TOTAL (`PLANO2_TOTAL` em evidência, a parcela vem abaixo como apoio).
- Inverter isso quebra a proposta. Nunca inverter, nem a pedido de estética.

### Bloco 10, prazo e fechamento

1. Em quantos dias a pessoa começa a ver o processo no ar?
2. Tem limite de vagas ou de turma?
3. O preço tem validade?
4. Qual é a última frase que você quer que fique na cabeça dela ao fechar a apresentação?
5. Quando a pessoa fecha, qual é o primeiro passo que acontece?

Campos: `FECHO_TAG`, `FECHO_FRASE`, `PRECO_PILL`, `RECEBE_SUBTAG`, `RECEBE_SUBTAG_PLANO1`, `RECEBE_SUBTAG_PLANO2`.

---

## FASE 3, CONFIRMAÇÃO

Antes de gerar qualquer coisa, mostrar o resumo e esperar o sim. Formato:

```
RESUMO DA SUA APRESENTAÇÃO

Quem é você
  Nome:          Dra. Camila Reis
  Credencial:    Dentista há 14 anos, ensina dentista a encher a agenda particular
  Provas:        Formada pela USP · Palestrante do CIOSP · 14 anos de consultório

Sua marca (encontrei sozinho, confirma?)
  Nome:          Consultório Cheio
  Cores:         verde escuro, verde médio, verde claro
  Fontes:        Inter e DM Sans
  Instagram:     @dra.camilareis

O que você vende
  Promessa:      Agenda de paciente particular girando em 30 dias
  Método:        Cadeira Cheia (3 pilares)
  Entregas:      12 itens
  Bônus:         7 itens, somando R$ 9.500

Números que vão aparecer
  R$ 1,2 mi+ faturados por alunos · 180 dentistas treinados · 14 anos de consultório

Garantia
  40 avaliações em 3 meses, senão você não paga a diferença

Preços
  Base:  12x R$ 397   (destaque na parcela)
  Pro:   R$ 14.800    (destaque no total, 12x R$ 1.290 abaixo)

Vai ficar de fora (não temos dado real)
  - depoimentos em vídeo
  - portal ao vivo

Está tudo certo? Se algum ponto estiver errado, me diz o número da linha
ou só me fala o que muda.
```

Regras do resumo:
- O que veio da pesquisa aparece marcado com "encontrei sozinho, confirma?".
- O que vai ficar de fora aparece explicitamente, para não haver surpresa.
- Só seguir para a FASE 4 com aprovação clara. "Acho que sim" não é aprovação: perguntar de novo.

---

## FASE 4, GERAÇÃO

1. Montar o arquivo do briefing em JSON, com uma chave por campo, seguindo exatamente o modelo de `_teste-briefing.json`.
2. O bloco `_visual` leva as cores da pessoa (`accent1`, `accent2`, `accent3`, `bg`) e as fontes (`fonteTitulo`, `fonteTexto`).
3. Salvar como `briefing.json` na pasta do cliente.
4. Rodar:

```
node scripts/build.js briefing.json saida/index.html
```

O que esperar:
- Deu certo: o script imprime o caminho do arquivo e a contagem de slides.
- Faltou campo: o script LISTA todos os campos faltantes e NÃO gera nada. Isso é proposital, é a trava do método. Não existe apresentação pela metade.
- Sobrou marcador: o script para também. Nada de `{{ }}` chega ao cliente.

Se o script listar campos faltantes, o agente volta para a FASE 2 e pergunta só aqueles campos, em uma rodada curta. Nunca preencher com texto genérico só para o script passar.

---

## FASE 5, REVISÃO

Abrir o arquivo gerado no navegador e conferir, um a um:

1. Navegação: roda do mouse muda de slide, setas do teclado funcionam, clique avança.
2. Card de preço: clicar na lupa amplia o card e fecha de novo.
3. Cores: os tons da pessoa aparecem no fundo, nos títulos e nos destaques, sem sobra da paleta padrão.
4. Marcadores: nenhum `{{ }}` visível em nenhum slide.
5. Console do navegador: sem erro em vermelho.
6. Textos: acentuação correta, nenhum título com uma palavra sozinha na última linha.
7. Hierarquia de preço: plano barato destacando a parcela, plano caro destacando o total.

Achou problema: corrigir e gerar de novo antes de mostrar.
Só depois disso apresentar para a pessoa, coletar os ajustes e iterar, refazendo o ciclo geração e revisão a cada rodada de ajuste.

---

## O QUE NUNCA FAZER

1. Nunca perguntar o que dá para descobrir sozinho. Se está no computador, o agente acha antes.
2. Nunca aceitar resposta vaga. Pediu concreto, insiste até duas vezes, depois deixa vazio.
3. Nunca inventar número, prova, caso, depoimento ou valor de bônus. Dado inventado destrói a confiança na hora que o cliente pergunta.
4. Nunca gerar com campo faltando. O script trava de propósito, não force.
5. Nunca inverter a hierarquia dos dois preços: o plano barato destaca o parcelado, o plano caro destaca o total.
6. Nunca despejar todas as perguntas de uma vez. Rodadas de 3 a 5.
7. Nunca usar jargão técnico com o mentor. Ele não é programador.
8. Nunca manter um slide sem conteúdo real. Sem dado, o slide sai.
