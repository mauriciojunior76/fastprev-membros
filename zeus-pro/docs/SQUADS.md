# Squads

Um squad é um time de agentes especializado em um tipo de trabalho. O ZEUS
chama o squad certo sozinho, com base no que você pediu.

São vinte e nove ao todo: doze do dia a dia e dezessete avançados de
trabalho pesado.

## Os doze

| Squad | Faz | Chame quando |
|---|---|---|
| copywriting | Texto que persuade | Precisa de anúncio, página, e-mail, mensagem |
| apresentacoes | Slides e narrativa | Vai apresentar algo para alguém |
| ebooks | Material escrito longo | Quer produzir guia, apostila, e-book |
| video | Roteiro e direção de edição | Vai gravar ou editar vídeo |
| produtos-de-entrada | Criar e estruturar produto | Quer lançar ou reposicionar produto |
| trafego | Campanha e métrica | Anuncia ou quer entender o funil |
| branding | Identidade visual | Vai criar ou aplicar a marca |
| pesquisa | Informação externa com fonte | Precisa saber algo que não está na memória |
| conhecimento | Ingerir material externo | Tem livro, curso ou aula para aproveitar |
| automacao | Tirar trabalho repetitivo da sua mão | Faz a mesma coisa toda semana |
| desenvolvimento | Código e sistemas | Precisa de app, site ou correção |
| planejamento-decisao | Prioridade e escolha | Precisa decidir ou organizar o que vem primeiro |

## Os dezessete avançados

Times de trabalho pesado, com método já montado. Chegam prontos, e ficam mais
seus conforme você usa e corrige.

| Squad | Faz | Chame quando |
|---|---|---|
| aplicativos | Criar app ou SaaS de verdade, do briefing à stack | Quer construir um aplicativo pra vender |
| low-ticket | Método completo de produto de entrada, do preço ao anúncio | Quer criar ou escalar um produto barato |
| motion | Animação programada nas suas cores | Quer vinheta, abertura, peça animada |
| edicao-de-video | Corte de gravação de reunião e de celular | Tem vídeo bruto para transformar em corte |
| apresentacoes-avancadas | Deck completo com tema visual e publicação | Vai dar aula, palestra ou evento |
| pitch-de-vendas | Proposta apresentada para uma pessoa só | Vai apresentar preço em conversa individual |
| webinario | Evento online ao vivo que termina em oferta | Vai fazer aula aberta para vender |
| lancamento-pago | Lançamento com verba de anúncio | Vai lançar com data de abertura e fechamento |
| paginas | Página de captura, de venda e de obrigado | Precisa de página no ar |
| carrossel | Carrossel para rede social | Vai postar conteúdo em sequência de imagens |
| ebooks-avancados | Livro e apostila em padrão editorial | Quer material longo com acabamento alto |
| copywriting-avancado | Texto de venda com auditoria de qualidade | A copy precisa vender de verdade, não só existir |
| branding-avancado | Identidade completa, do símbolo ao manual | Vai criar marca do zero ou refazer a sua |
| trafego-avancado | Vigilância de campanha e leitura de padrão | Já anuncia todo dia e quer acompanhamento |
| painel-de-dados | Painel de acompanhamento com dados seus | Quer ver seus números num lugar só |
| google-ads | Campanha de busca e display no Google | Vai anunciar para quem já procura o que você faz |
| motion-apple | Método completo de vídeo animado, da escolha da cena ao som | Vai gravar falando e quer o vídeo animado com a sua marca |

Os doze primeiros times respondem a qualquer pedido. Estes dezessete entram
quando o trabalho é grande e o padrão importa. Vinte e oito times ao todo.

## Os dois silenciosos

- `_dispatcher`: classifica todo pedido antes do trabalho começar.
- `_quality-gate`: pontua a entrega e manda refazer quando fica fraca.

Nunca são chamados por você e nunca aparecem na resposta.

## O time transversal

`_core-team` roda em toda entrega, em qualquer squad: economia de contexto,
revisão de idioma, detector de texto genérico e registro de aprendizado.

## Como chamar, e como cruzar

Não existe comando certo. Você pede em português, do jeito que pediria a uma
pessoa. O que muda o resultado é nomear o time:

> quero fazer um e-book, aciona o squad de e-books

Trabalho grande quase nunca é de um time só. Aí você diz a ordem, e cada time
trabalha em cima do que o anterior entregou:

> nesse momento eu quero fazer um carrossel. Você vai cruzar: usa o squad de
> copy para fazer todos os textos e usa o squad de carrossel para a arte

Quando ele responder que não pode fazer alguma coisa, quase sempre é falta de
configuração, não impossibilidade. Pergunte o que falta liberar. O guia
completo, com as combinações que funcionam melhor, está em
`docs/rules-on-demand/cruzar-squads.md`.

## Anatomia de um squad

```
squads/nome/
  squad.yaml      identidade, gatilhos, elenco, limites, qualidade
  MEMORY.md       o que aprendeu com o uso, teto de 8000 caracteres
  CHECKLIST.md    o que conferir antes de entregar
  FRAMEWORKS.md   métodos daquele domínio (quando existe)
  agentes/        lead mais 3 a 6 especialistas
```

## Por que os squads são pequenos

Cada agente custa contexto e tempo. Um squad com trinta agentes não é mais
inteligente que um com cinco: é mais lento e produz mais texto redundante. A
regra é o menor conjunto capaz de entregar bem.

## Criar um squad novo

Use a skill `criar-squad`. O ZEUS propõe sozinho quando o mesmo tipo de
tarefa aparece pela terceira vez sem time dedicado. Ele explica a lacuna,
pede autorização, cria a partir do template e testa antes de confiar.
