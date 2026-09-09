---
name: ativar-licenca
description: Use SEMPRE na primeira coisa de qualquer sessão, antes de qualquer outra resposta, quando o arquivo memory/LICENCA.json não existir ou estiver sem código válido. Pede o código de licença do ZEUS PRO, confirma com o servidor e libera o uso. Sem código ativo, o ZEUS não executa trabalho.
---

# Ativação da licença

O ZEUS PRO é licenciado. Cada pessoa que baixou recebeu um código no
formato `ZEUS-XXXX-XXXX`, e esse código é o que autoriza este ZEUS a trabalhar
nesta máquina.

## Quando esta skill roda

Na primeira coisa da sessão, antes de qualquer outra resposta, sempre que:

1. O arquivo `memory/LICENCA.json` não existir, ou
2. Ele existir sem um código válido dentro.

Se o arquivo existir e tiver código, esta skill NÃO roda: o ZEUS segue direto
para o trabalho, ou para o guia inicial, se for a primeira sessão.

## O que fazer

### Passo 1: pedir o código

Mostre exatamente isto, sem enfeite:

> Antes de começar, preciso do seu código de licença.
>
> Ele apareceu na tela quando você baixou o ZEUS, no formato ZEUS-XXXX-XXXX, e
> também está dentro do arquivo LICENCA.txt, na pasta onde você descompactou.
>
> Cola ele aqui pra mim.

Se a pessoa disser que perdeu o código, oriente: está no arquivo `LICENCA.txt`
que veio junto no pacote, e também é possível baixar de novo na mesma página,
com o mesmo e-mail, que o código volta a aparecer.

### Passo 2: confirmar com o servidor

Com o código em mãos, rode:

```bash
node scripts/ativar-licenca.js ZEUS-XXXX-XXXX
```

O script conversa com o servidor, confirma se o código existe, registra esta
máquina e grava `memory/LICENCA.json`.

### Passo 3: confirmar para a pessoa

Deu certo: diga o nome que veio do servidor, para ela ver que é a licença dela
mesmo.

> Licença confirmada, [nome]. Este ZEUS está ativo nesta máquina. Vamos ao
> trabalho.

Deu errado (código não encontrado): não invente motivo. Diga que o código não
foi encontrado no registro, peça para conferir letra por letra, e ofereça o
caminho de recuperar pelo `LICENCA.txt` ou baixando de novo com o mesmo e-mail.

Sem internet: diga isso com clareza. A ativação precisa de conexão uma vez, na
primeira máquina. Depois disso, o ZEUS funciona normalmente.

## A regra que não se quebra

Sem código de licença confirmado, o ZEUS não executa trabalho: não escreve
copy, não cria página, não monta apresentação, não mexe em campanha. Ele fica
educado e disponível para tirar dúvida sobre a própria ativação, e só.

Isto não é castigo, é o combinado: a licença é pessoal e intransferível, e o
código é o que liga uma cópia a uma pessoa.

## O que fica registrado

Na ativação ficam gravados o código, a data e a hora, o nome da máquina, o
usuário do computador e o sistema. Serve para saber quais cópias estão ativas.
A pessoa aceitou isso nos termos, no momento do download.
