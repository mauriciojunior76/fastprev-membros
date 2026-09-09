# Comece aqui: o painel Zeus Dash

Bem-vindo. Este documento é o ponto de partida. Se você leu só ele, já entende o que o painel faz, o que precisa ter em mãos e por onde começar.

## O que é o Zeus Dash

O Zeus Dash é um painel (um site privado só seu) que junta, numa tela só, os números que importam do seu negócio: quanto você gastou em anúncio, quantos leads ou vendas isso gerou e quanto custou cada um. Pense nele como o painel do carro: em vez de abrir dez ferramentas diferentes para descobrir se está indo bem, você olha um lugar e sabe.

Ele é seu de verdade. Você baixa o código, roda no seu próprio servidor e ninguém mais vê seus números. Nada de mensalidade de plataforma e nada de seus dados na mão de terceiros.

## O que ele mostra

Depende do modo que você escolher (explico logo abaixo). Em geral:

- **Gasto com anúncio** (se você anuncia no Meta / Facebook e Instagram).
- **Leads gerados** e o custo de cada lead (o famoso CPL).
- **Leads qualificados** (os que valem a pena, chamados de MQL) e o custo de cada um.
- **Vendas e faturamento** (quando você vende produto barato pela internet).
- **Custo por venda** e **ROAS** (quantos reais voltaram para cada real gasto em anúncio).
- **Funil** completo: do lead até a venda, para você ver onde as pessoas param no caminho.

## Os 3 modos de uso

Na hora de configurar, você escolhe um dos três. Não precisa decidir agora, o guia pergunta na hora:

- **High ticket:** foco em gerar leads baratos e qualificados. Mostra MQL, CPL e o funil do lead até a venda. É o modo de quem vende produto caro (mentoria, consultoria) e precisa de reuniões.
- **Low ticket:** foco em vender e saber o custo. Mostra vendas, faturamento, custo por venda (CPA) e ROAS. É o modo de quem vende produto barato direto pela internet.
- **Os dois:** mostra tudo, com um botão para alternar entre a visão de high ticket e a de low ticket. É para quem trabalha com os dois ao mesmo tempo.

Observação: no modo high ticket, os números de **reunião e show rate** (quantos marcaram e quantos apareceram) só aparecem se você usar um CRM. Sem CRM, o painel simplesmente esconde esses dois e mostra o resto normalmente.

## O que você vai precisar

Nada de conhecimento técnico. Você vai precisar de três coisas (as duas últimas são opcionais):

1. **Uma VPS com Docker.** VPS é um servidor de aluguel na internet, uma "máquina ligada 24 horas" que hospeda o painel. Existem opções a partir de uns poucos dólares por mês. O guia de deploy ensina a contratar e a instalar o Docker (o programa que roda o painel). Isto é obrigatório.
2. **Uma conta incluso no Supabase.** É o banco de dados, onde ficam guardados seus números. O plano incluso serve de sobra. Isto é obrigatório.
3. **Token do Meta (opcional):** só se você anuncia no Facebook e Instagram. Sem ele, o painel funciona normal, só não puxa os dados de anúncio sozinho.
4. **Token da UTMify (opcional):** só se você vende produto barato (low ticket) e quer que as vendas caiam no painel automaticamente.

## O comando mágico

Você não vai editar arquivo de configuração na unha. Depois de baixar o painel, roda um único comando:

```bash
node setup/wizard.js
```

Isso abre um guia interativo que faz perguntas simples (qual modo você quer, cola aqui a chave do Supabase, você anuncia? e por aí vai) e cria toda a configuração sozinho. É como um assistente de instalação que monta tudo para você.

## Ordem de leitura dos guias

Siga nesta ordem. Cada guia é curto e vai ao ponto:

1. **01-supabase.md:** cria o banco de dados incluso. Obrigatório, comece por aqui.
2. **02-token-meta.md:** só se você anuncia no Meta. Pode pular se não anuncia.
3. **03-utmify.md:** só se você vende low ticket. Pode pular se não vende.
4. **04-deploy-vps.md:** coloca o painel no ar no seu servidor. Obrigatório.
5. **05-problemas.md:** o que fazer quando algo não funciona. Guarde para quando precisar.

Resumo do caminho: separe as chaves do Supabase (guia 01), separe as chaves de anúncio ou vendas se for o caso (guias 02 e 03), suba o painel na VPS (guia 04) e rode `node setup/wizard.js` para amarrar tudo. Se travar em algo, o guia 05 resolve a maioria dos casos.
