# Conectar geração de imagem para criar artes de anúncio

Este documento mostra como ligar o Zeus aos serviços que criam imagem por inteligência artificial, para você pedir a arte de um anúncio e receber o arquivo pronto. Leia antes de pedir a primeira arte, ou quando quiser trocar de serviço.

## O que muda na prática

Com a conexão ligada, você descreve a arte que quer e o Zeus devolve o arquivo de imagem já no tamanho certo do anúncio. Sem a conexão, ele só consegue escrever o texto da arte e você precisa montar em outro lugar.

Existem dois caminhos principais, e você pode ter os dois ligados ao mesmo tempo. O Zeus usa o que estiver disponível.

## Caminho 1: Google (família Gemini, o gerador de imagem apelidado de Nano Banana)

1. Entre no painel de desenvolvedores do Google com a sua conta.
2. Procure a área de chaves de acesso e crie uma chave nova.
3. Confirme que a cobrança está ativa no projeto. Sem isso, a chave nasce limitada e a geração falha logo no início.
4. Copie a chave e guarde no arquivo `.env`.

## Caminho 2: OpenAI (geração de imagem do GPT)

1. Entre no painel da plataforma da OpenAI com a sua conta.
2. Vá na área de chaves de acesso e crie uma chave nova.
3. Adicione crédito na conta. A geração de imagem cobra por imagem e não funciona com saldo zerado.
4. Copie a chave. Ela aparece uma vez só na tela: se você fechar sem copiar, precisa criar outra.

## Onde colocar as chaves

Tudo vai no arquivo `.env`, na raiz da sua pasta do Zeus. Esse arquivo é o cofre do projeto: nada dele é publicado.

```
GOOGLE_API_KEY=SUA_CHAVE_AQUI
OPENAI_API_KEY=SUA_CHAVE_AQUI
```

Salve o arquivo e peça: `confere se as chaves de imagem estão configuradas`. O Zeus verifica se estão preenchidas sem mostrar o valor na tela.

Chave nunca vai colada no chat e nunca vai escrita dentro de um arquivo de código. Se colou por engano em algum lugar, apague a chave no painel do serviço e crie outra.

## Como pedir uma imagem

Frases que funcionam bem:

```
gera uma arte de anúncio 1080x1350 para o meu produto, tema:
consultoria financeira para donos de clínica, tom sério e limpo
```

```
gera 3 variações dessa mesma arte trocando só a cor de fundo
```

```
gera a arte no formato quadrado 1080x1080 e também na vertical 1080x1920
```

Peça no máximo 3 variações por rodada. Muitas de uma vez consome crédito rápido e você acaba escolhendo pior, porque o olho cansa.

## Boas práticas de arte para anúncio

1. O que importa fica no topo. No celular, o feed corta a parte de baixo e a pessoa decide se para de rolar olhando o primeiro terço da imagem. Título, promessa e rosto vão em cima.
2. Texto curto. Arte de anúncio não é página de vendas. Uma frase forte e no máximo uma linha de apoio. Texto longo vira mancha cinza e ninguém lê.
3. Escreva o pedido da arte em inglês, mas o texto que vai aparecer dentro da imagem no idioma do seu público. Os geradores entendem o pedido melhor em inglês e escrevem melhor a frase quando ela vem separada e clara. Exemplo: descreva a cena em inglês e depois diga `the text on the image must read exactly: Sua clínica lucra pouco?`.
4. Sempre peça a proporção. Se você não disser, vem quadrado por padrão e não serve para todo lugar. As mais usadas: 1080x1350 para feed, 1080x1920 para stories e reels, 1080x1080 para quadrado.
5. Descreva o clima, não só o objeto. Diga se é iluminação de estúdio, foto realista, ilustração ou fundo liso. Sem isso, cada geração sai de um jeito e a sua marca fica sem cara.
6. Confira a escrita da frase na imagem antes de subir. Gerador de imagem ainda erra letra e acento. Se saiu errado, peça de novo pedindo a frase exata.
7. Guarde o pedido que deu certo. Quando uma arte performar bem, você vai querer repetir o mesmo padrão trocando só uma coisa por vez.

## Aviso de custo

Cada imagem gerada consome crédito pago da sua própria conta no Google ou na OpenAI. Não existe geração sem custo, e pedir 20 variações de uma vez custa 20 vezes. Acompanhe o consumo no painel do serviço e defina um limite mensal lá dentro, para não tomar susto na fatura.

## Quando falha

1. Mensagem de saldo ou cota: falta crédito na conta do serviço, não é problema do Zeus.
2. Mensagem de chave inválida: a chave foi apagada, digitada errada ou tem espaço sobrando no `.env`.
3. A imagem sai sem o texto ou com o texto errado: repita pedindo a frase exata entre aspas e reduza o tamanho da frase.
4. A imagem sai fora do formato: repita informando a proporção explicitamente.
