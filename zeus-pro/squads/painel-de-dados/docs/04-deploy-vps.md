# Guia 4: colocar o painel no ar (deploy na VPS)

Aqui você coloca o painel para funcionar de verdade, rodando 24 horas no seu próprio servidor. Vou pelo caminho completo, passo a passo, sem pressupor que você já mexeu com servidor antes.

## O que é uma VPS

VPS é um computador de aluguel que fica ligado na internet o tempo todo. É onde o painel vai morar. Você não deixa o painel no seu computador pessoal porque, quando você desliga o computador, o painel cai. Na VPS ele fica no ar sempre.

## Passo 1: contratar uma VPS

Procure uma VPS simples e barata. As mais comuns e fáceis são da Hostinger, DigitalOcean, Contabo, Hetzner, entre outras. Para este painel, uma máquina básica já resolve (algo como 1 ou 2 processadores e 2 GB de memória).

Ao contratar, escolha o sistema **Ubuntu** (versão recente, por exemplo 22.04 ou mais nova). Depois de contratar, a empresa te dá três coisas:

- O **endereço IP** da máquina (uma sequência de números, tipo `123.45.67.89`).
- O **usuário** (normalmente `root`).
- A **senha** (ou um jeito de definir uma).

Guarde os três.

## Passo 2: acessar a VPS pelo terminal (ssh)

"Acessar por ssh" é entrar na VPS pelo terminal do seu computador, como se você estivesse sentado na frente dela. No seu computador, abra o terminal (no Windows, use o PowerShell ou o app Terminal) e digite, trocando pelo IP da sua VPS:

```bash
ssh root@123.45.67.89
```

Vai pedir a senha. Digite (ela não aparece na tela enquanto você digita, é normal) e aperte Enter. Se apareceu um texto de boas-vindas do Ubuntu, você entrou.

## Passo 3: instalar o Docker

O **Docker** é o programa que roda o painel. Ele empacota o painel com tudo que precisa, então você não instala mil coisas separadas. Já dentro da VPS, rode este comando, que instala o Docker sozinho:

```bash
curl -fsSL https://get.docker.com | sh
```

Espere terminar. Para conferir se instalou, rode:

```bash
docker --version
```

Se apareceu um número de versão, o Docker está instalado.

## Passo 4: baixar o painel (git clone)

Agora você traz o código do painel para dentro da VPS. Rode o comando abaixo (troque pela URL real do repositório do painel):

```bash
git clone URL-DO-REPOSITORIO-DO-PAINEL
```

Isso cria uma pasta com o painel dentro. Entre nela:

```bash
cd zeus-dash
```

(O nome da pasta é o nome do repositório. Se for diferente, use o nome que apareceu.)

## Passo 5: rodar o guia de configuração

Dentro da pasta, rode o comando mágico:

```bash
node setup/wizard.js
```

O guia vai fazer perguntas simples, uma de cada vez: qual modo você quer (high ticket, low ticket ou os dois), as três chaves do Supabase, se você anuncia (token do Meta e a conta `act_...`), se você vende low ticket (token e webhook da UTMify), suas cores e suas metas. Você só responde. No fim, ele cria toda a configuração sozinho e, se você deu a connection string do Supabase, também cria as tabelas do banco.

Anote a **URL de webhook** que ele mostrar no fim, se você usa UTMify. Você vai colar ela na UTMify (veja o guia 03-utmify.md).

## Passo 6: subir o painel

Agora liga o painel:

```bash
docker compose up -d
```

O `-d` faz o painel rodar em segundo plano, ele continua no ar mesmo depois que você fecha o terminal. Em alguns segundos o painel está rodando na porta 3000 da VPS.

## Passo 7: domínio próprio e HTTPS com o Caddy

Nesse ponto o painel já roda, mas o endereço é feio (o IP da VPS com a porta). Para ter um endereço bonito, com seu domínio e o cadeado de segurança (HTTPS), use o **Caddy**. O Caddy é um porteiro que fica na frente do painel: ele recebe quem chega pelo seu domínio e encaminha para o painel, e cuida do certificado de segurança sozinho, incluso.

Primeiro, aponte seu domínio para o IP da VPS. Isso é feito no painel de onde você comprou o domínio (Registro.br, GoDaddy, etc.): crie um registro do tipo **A** apontando o domínio (por exemplo `painel.seusite.com`) para o IP da VPS.

Depois, instale o Caddy na VPS:

```bash
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update && sudo apt install -y caddy
```

Agora edite o arquivo de configuração do Caddy, chamado Caddyfile:

```bash
nano /etc/caddy/Caddyfile
```

Apague o que estiver lá e deixe só isto (troque `seudominio.com` pelo seu domínio de verdade):

```
seudominio.com {
    reverse_proxy localhost:3000
}
```

Traduzindo: quando alguém acessar `seudominio.com`, o Caddy encaminha para o painel, que está rodando na porta 3000 da própria máquina (`localhost:3000`). Salve com Ctrl+O e Enter, e saia com Ctrl+X.

Recarregue o Caddy para valer a nova configuração:

```bash
sudo systemctl reload caddy
```

Pronto. Em um ou dois minutos, o painel abre em `https://seudominio.com` com o cadeado de segurança. O painel é servido na raiz do endereço (a barra `/`), então basta acessar o domínio.

## Ver os logs e reiniciar

**Ver o que o painel está fazendo** (útil quando algo dá errado):

```bash
docker compose logs -f
```

Isso mostra as mensagens do painel em tempo real. Para sair dessa tela, aperte Ctrl+C (isso só fecha a visualização, não desliga o painel).

**Reiniciar o painel** (quando quer que ele leia uma mudança ou simplesmente destravar):

```bash
docker compose restart
```

Se em algum momento algo não funcionar, o guia 05-problemas.md tem as soluções dos casos mais comuns.
