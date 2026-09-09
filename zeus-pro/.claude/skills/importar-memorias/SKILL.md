---
name: importar-memorias
description: Transforma o histórico de conversas que a pessoa já tem em outras inteligências artificiais (ChatGPT, Claude, Gemini e afins) em memória organizada do ZEUS, separando fato duradouro de conversa descartável. Use quando ela disser "já conversei muito com outra IA", "importa meu histórico", "tenho a exportação do ChatGPT", "aproveita o que eu já falei".
---

# Importar memórias de outras inteligências

## Objetivo

A pessoa já passou meses conversando com outros assistentes. Ali dentro está
metade do que o ZEUS precisaria perguntar na entrevista: o que ela vende, para
quem, com que palavras, quais projetos estão parados. Esta skill pega esse
material e converte em memória com marcação correta, para o ZEUS não começar
do zero.

O que entra aqui é matéria-prima, não verdade pronta. Nada vira regra sem a
pessoa confirmar.

## ETAPA 1: a pessoa exporta o histórico

Cada serviço muda o menu de lugar de tempos em tempos, então o roteiro é
genérico de propósito. Oriente assim, com estas palavras:

1. Abra o serviço no computador, no navegador, não no aplicativo do celular.
2. Entre nas configurações da conta. Costuma ser o nome ou a foto dela, num
   canto da tela.
3. Procure por "exportar dados", "exportar conversas", "baixar seus dados" ou
   "controle de dados". O nome muda de serviço para serviço, mas sempre existe
   alguma dessas variações.
4. Peça a exportação e confirme.
5. Espere o email. Costuma chegar em minutos, às vezes em algumas horas. O
   link do email vence, então baixe assim que chegar.
6. Baixe o arquivo compactado (termina em `.zip`) e descompacte numa pasta do
   computador dela.

Vale a pena fazer isso em todos os serviços que ela usa, um de cada vez. Se ela
não souber onde fica, peça um print da tela de configurações e oriente pelo que
aparecer ali.

Se ela não quiser exportar tudo, existe o caminho manual: abrir as conversas
mais importantes, copiar o texto e colar num documento. Menos completo, mas
funciona e ela escolhe o que entra.

## ETAPA 2: onde colocar os arquivos

A pasta de entrada é:

```
importar/
```

Dentro dela, uma subpasta por origem, para não misturar:

```
importar/chatgpt/
importar/claude/
importar/gemini/
importar/outros/
```

Diga isso para ela, com estas palavras: essa pasta fica no computador dela e
não é enviada para lugar nenhum. O ZEUS lê os arquivos ali, escreve a memória
e pronto. Se ela quiser, depois de tudo processado pode apagar a pasta sem
perder nada, porque o que interessa já virou memória.

Confira que `importar/` está listada no `.gitignore` antes de pedir para ela
colocar qualquer coisa lá. Se não estiver, adicione.

## ETAPA 3: ler e separar

Percorra os arquivos e classifique cada trecho em uma de três pilhas.

PILHA 1, fato duradouro. Vale para amanhã e para o ano que vem:
- Quem ela é, o que faz, há quanto tempo.
- Empresa, equipe, como o dinheiro entra.
- Produtos, preços, formas de entrega, objeções que aparecem na venda.
- Público, dores, frases literais de cliente.
- Posicionamento, promessas que ela faz e as que se recusa a fazer.
- Jeito de escrever: palavras que ela usa sempre, palavras que ela odeia.
- Objetivos, decisões tomadas com data e motivo, projetos e o estado deles.
- Ferramentas que ela paga e usa todo dia.

PILHA 2, conversa descartável. Serviu naquele dia e acabou:
- Pedido pontual do tipo "resume este texto", "corrige este email".
- Tentativa que não deu certo e foi abandonada.
- Assunto pessoal solto sem relação com o trabalho dela.
- Explicação genérica que a IA deu, que não é informação sobre ela.

PILHA 3, dúvida. Você não tem certeza se é duradouro. Não descarte: guarde a
pergunta para a etapa de conferência, no fim.

Regra prática para decidir: se a frase continua verdadeira daqui a seis meses e
fala sobre ELA ou sobre o NEGÓCIO dela, é pilha 1. Se fala sobre uma tarefa de
um dia, é pilha 2.

## ETAPA 4: agrupar por assunto e gravar

Não crie um arquivo por conversa. Isso reproduz a bagunça de origem e faz o
sistema mentir depois, porque o mesmo assunto aparece em cinco lugares.

Agrupe por tema e grave nas casas que já existem:

| Assunto | Arquivo |
|---|---|
| Quem ela é | `memory/PERFIL.md` |
| Como o negócio funciona | `memory/empresa.md` |
| Cada produto | `memory/produtos/{nome}.md` |
| Quem ela atende | `memory/publico.md` |
| Como quer ser percebida | `memory/posicionamento.md` |
| Estilo de escrita | `memory/comunicacao.md` |
| Metas e gargalos | `memory/objetivos.md` |
| Ferramentas e rotinas | `memory/ferramentas.md` |

Se o arquivo já existe, versione antes de mexer
(`node scripts/fullsafe.js versionar <caminho> "antes de importar histórico"`)
e ACRESCENTE numa seção datada chamada "Vindo do histórico importado". Nunca
sobrescreva o que veio da entrevista com o que veio de conversa antiga: a
entrevista é mais recente e mais confiável.

Todo arquivo obedece ao frontmatter de `core/memoria-schema/FRONTMATTER.md`,
com dois campos merecendo atenção especial:

- `origem`: escreva de onde veio de verdade, por exemplo
  `histórico importado do ChatGPT, conversa de 2025-03`.
- `tipo`: aqui está o cuidado central desta skill.
  - A pessoa afirmou aquilo com todas as letras na conversa? `declaração`.
  - Você juntou pedaços e concluiu? `inferência`, e inferência não vira regra
    de comportamento antes de ela confirmar.
  - Conta com número, print ou fonte anexada? Aí sim `fato`.

Marque também `confiança: média` no que veio de conversa antiga, salvo quando
a pessoa repetiu a mesma informação em vários momentos. Histórico envelhece:
preço muda, produto sai de linha, sócio entra e sai.

## O que NUNCA vira memória

Corte na leitura, antes mesmo de agrupar:

- Senha, chave de acesso, token, código de verificação. Nem truncado, nem em
  exemplo, nem comentado. Se aparecer, avise a pessoa que aquilo estava no
  histórico e sugira que ela troque.
- Dado de cartão, conta bancária, chave de pagamento.
- Documento de identificação dela ou de qualquer pessoa.
- Dado pessoal de terceiro: cliente, paciente, aluno, lead, funcionário. Nome
  completo, telefone, email, endereço, informação de saúde ou jurídica. Se o
  aprendizado for útil, guarde o PADRÃO sem a pessoa: "cliente do tipo X
  costuma travar no preço" entra, "a Fulana de tal travou no preço" não entra.
- Conversa de tarefa pontual sem valor duradouro, a pilha 2 inteira.
- Texto longo de terceiro copiado dentro da conversa (artigo, livro, material
  de curso). Guarde a referência, não o conteúdo.

## ETAPA 5: conferência com a pessoa, obrigatória

Memória errada é pior que memória vazia, porque o ZEUS passa a trabalhar em
cima de coisa falsa com cara de verdade. Então esta etapa não é opcional e não
pode ser pulada por pressa.

Ao terminar, mostre para ela:

1. O RETRATO, em no máximo 15 linhas: quem ela é, o que vende, para quem, como
   fala, o que está perseguindo agora. Tudo em linguagem simples.
2. A LISTA DO QUE FOI DEDUZIDO, separada do resto, item a item. Cada item com
   uma pergunta fechada: "entendi que você parou de vender o produto X. Está
   certo?".
3. O QUE PARECE VELHO: qualquer informação que soe datada, principalmente
   preço, equipe, produto e meta.
4. AS DÚVIDAS da pilha 3.

Peça correção de forma direta: "me diz o que está errado, sem economizar".
Correção aqui é o item mais valioso da importação inteira.

Depois da resposta dela:
- O que foi confirmado sobe de `inferência` para `declaração`, e você avisa
  que promoveu.
- O que ela negou é corrigido na hora, e o registro fica com nota do que estava
  errado.
- O que ficou sem resposta vai para `memory/LACUNAS-DE-CONHECIMENTO.md`.

## ETAPA 6: muito arquivo, processar por partes

Exportação de quem usa o serviço há anos vem grande. Não tente ler tudo de uma
vez: o trabalho quebra no meio e ela não sabe o que foi aproveitado.

O jeito certo:

1. Antes de começar, conte quantos arquivos e conversas existem e diga o número
   para ela, junto com uma estimativa de quantas rodadas vai levar.
2. Processe em lotes, do mais recente para o mais antigo. Conversa recente vale
   mais que conversa de dois anos atrás, e se o trabalho parar no meio, o que
   já entrou é o que mais importa.
3. Ao fim de CADA lote, salve o progresso em
   `importar/PROGRESSO-IMPORTACAO.md`: quais arquivos já foram lidos, o que foi
   gravado em memória, onde parou, o que vem no próximo lote.
4. Diga em duas linhas o que aquele lote rendeu: "li 40 conversas de março a
   junho, saiu informação nova sobre dois produtos e sobre o seu jeito de
   escrever em proposta".
5. Pergunte se ela quer continuar agora ou depois. Se parar, o arquivo de
   progresso permite retomar exatamente do ponto certo, sem reler nada.

Quando terminar todos os lotes, rode a conferência da ETAPA 5 sobre o conjunto
inteiro, não sobre o último lote apenas.

## Fechamento

Ao final da importação completa:

- Atualize `memory/INDICE.md` com uma linha por memória nova.
- Rode `node scripts/memory-index.js` e `node scripts/obsidian-mirror.js`.
- Registre em `memory/LACUNAS-DE-CONHECIMENTO.md` o que o histórico não
  respondeu.
- Diga em três linhas: o que você aprendeu, o que continua sem saber, e o que
  ela pode te pedir a partir de agora.

## Fronteiras

- Histórico importado NUNCA substitui a entrevista de boot. Ele adianta o
  trabalho e a entrevista fecha as lacunas.
- Nada do que foi importado vira regra permanente de comportamento sem a
  confirmação explícita dela.
- Na dúvida entre guardar e não guardar um dado sensível, não guarde e
  pergunte.
