# Guia 1: criar o banco de dados incluso (Supabase)

Este é o único passo obrigatório antes do deploy. O painel precisa de um lugar para guardar seus números, e esse lugar é o Supabase. É incluso e leva uns cinco minutos.

## O que é o Supabase

Pense no Supabase como uma planilha turbinada que mora na internet. É onde o painel guarda tudo: seus leads, suas vendas, seu gasto de anúncio. Você cria uma conta incluso, cria um projeto e pega três informações para colar no guia de instalação. Só isso.

## Passo 1: criar a conta

1. Abra o site [supabase.com](https://supabase.com).
2. Clique em **Start your project** (ou **Sign up**).
3. Você pode entrar com sua conta do GitHub ou com email e senha. Escolha o que preferir.

Pronto, conta criada.

## Passo 2: criar um projeto

1. Já logado, clique em **New project**.
2. Dê um nome (por exemplo: `meu-painel`).
3. Crie uma **senha do banco de dados** e **guarde essa senha**. Você vai precisar dela daqui a pouco (ela aparece dentro da connection string). Anote em um lugar seguro.
4. Escolha a região mais perto de você (por exemplo, uma região do Brasil ou dos Estados Unidos).
5. Clique em **Create new project** e espere um ou dois minutos enquanto o Supabase monta tudo.

## Passo 3: pegar as três informações

O painel precisa de três coisas do Supabase. Vou dizer exatamente onde cada uma está.

### A) A URL do projeto e a service_role key

1. No menu do projeto, clique na engrenagem de **Settings** (Configurações).
2. Clique em **API**.
3. Nessa tela você encontra:
   - **Project URL:** um endereço parecido com `https://abcdefgh.supabase.co`. Essa é a **URL do projeto**.
   - **Project API keys:** procure a chave chamada **service_role**. Clique em **Reveal** (revelar) para vê-la e copie. Essa é a **service_role key**.

### B) A connection string do Postgres

1. Ainda em **Settings**, clique em **Database** (Banco de dados).
2. Procure a seção **Connection string** e escolha a aba **URI**.
3. Copie o texto que aparece. Ele começa com `postgresql://` e é longo. Essa é a **connection string**.
4. Nessa string existe um trecho escrito `[YOUR-PASSWORD]`. Troque esse trecho pela senha do banco que você criou e anotou no Passo 2.

Agora você tem as três informações: URL do projeto, service_role key e connection string. Guarde-as juntas. O guia de instalação vai pedir cada uma.

## Passo 4: criar as tabelas

As tabelas são as gavetas onde os dados ficam organizados. Você não precisa criar na mão: quando você rodar `node setup/wizard.js` e colar a connection string, o guia cria todas as tabelas sozinho.

### Plano B (se o guia não conseguir criar as tabelas)

Às vezes a conexão direta falha (bloqueio de rede, região, essas coisas). Nesse caso, faça manualmente, é rápido:

1. No projeto do Supabase, clique em **SQL Editor** (no menu à esquerda).
2. Clique em **New query** (nova consulta).
3. Abra o arquivo `setup/schema.sql` que veio junto com o painel, copie **todo** o conteúdo dele.
4. Cole na caixa do SQL Editor.
5. Clique em **Run** (executar).

Deve aparecer uma mensagem de sucesso. As tabelas estão criadas. Pode seguir para o deploy.

## Aviso importante sobre segurança

A **service_role key é secreta**, é como a chave-mestra do seu banco. Nunca a envie por WhatsApp, nunca cole em grupo, nunca coloque em print público, nunca suba em repositório público. Ela fica só dentro do seu servidor, no arquivo de configuração que o guia gera. Se por acidente você expuser essa chave, volte no Supabase, em Settings > API, e gere uma nova.
