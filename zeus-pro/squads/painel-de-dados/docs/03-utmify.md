# Guia 3: UTMify (só para low ticket)

Este guia é **opcional**. Ele só serve para quem vende produto barato pela internet (low ticket) e quer que as vendas apareçam no painel automaticamente. Se você não vende low ticket, pode pular.

## O que é a UTMify

Quando você vende, a venda pode acontecer na Hotmart, na Kiwify, na Eduzz, em várias plataformas diferentes. Olhar cada uma separada é um inferno. A UTMify resolve isso: ela junta as vendas de todas essas plataformas num lugar só e ainda te diz de qual anúncio cada venda veio.

O painel se conecta na UTMify para trazer essas vendas para dentro da sua tela. Assim, faturamento, número de vendas e custo por venda aparecem no painel sozinhos.

A ligação funciona nos dois sentidos, e é bom entender a diferença:

- **Webhook (o principal):** é a UTMify **avisando o painel na hora** que uma venda aconteceu. Cada venda cai no painel na mesma hora, sem você fazer nada.
- **Token da API (o reforço):** é o painel **buscando** as vendas na UTMify quando precisa conferir ou preencher algo que faltou.

## Passo 1: pegar o token da API na UTMify

1. Entre na sua conta da UTMify.
2. Vá nas configurações de **Integrações** ou **API** (o nome do menu pode variar um pouco).
3. Procure a opção de **gerar / copiar o token da API**.
4. Copie esse token e guarde. Você vai colá-lo quando rodar `node setup/wizard.js`.

## Passo 2: colar a URL do webhook na UTMify

Quando você roda o guia de instalação (`node setup/wizard.js`), ele gera para você uma **URL de webhook** e um **secret** (uma senha aleatória que protege essa URL para ninguém de fora mandar venda falsa). A URL tem este formato:

```
https://SEU-DOMINIO/webhook/utmify?secret=XXXXX
```

Onde `SEU-DOMINIO` é o endereço do seu painel (por exemplo, `painel.seusite.com`) e `XXXXX` é o secret que o guia gerou. Copie a URL inteira, exatamente como o guia mostrou.

Agora, dentro da UTMify:

1. Entre na sua conta da UTMify.
2. Vá nas configurações de **Webhooks** (avisos automáticos).
3. Clique em adicionar um novo webhook.
4. Cole a URL completa que o guia gerou (com o `?secret=XXXXX` no final, sem cortar nada).
5. Se pedir para escolher quais eventos avisar, marque **venda aprovada** (venda paga). Salve.

Feito. A partir de agora, cada venda aprovada cai no seu painel na hora.

## Passo 3: testar

A melhor forma de saber se funcionou é fazer uma **venda de teste**:

1. Na sua plataforma de venda, use o modo de teste (ou compre você mesmo um produto de valor baixo e depois estorne).
2. Espere alguns segundos.
3. Abra o painel e veja se a venda apareceu.

Se apareceu, está tudo certo. Se não apareceu, confira se a URL do webhook foi colada por inteiro e se o `secret` está igual ao que o guia gerou. O guia 05-problemas.md tem mais detalhes.

## O coletor de reforço

Além do webhook (o aviso na hora), o painel tem um coletor que busca as vendas na UTMify quando você quiser dar uma conferida ou recuperar algo que passou batido. Você roda assim:

```bash
node collectors/coletor-utmify.js
```

Você não precisa disso no dia a dia, o webhook já faz o trabalho sozinho. O coletor é só uma rede de segurança para garantir que nenhuma venda ficou de fora.
