# Chaves, senhas e limite de gasto

## O cofre

Senha, chave de acesso e token nunca são digitados na conversa. Eles moram
num arquivo de configuração na raiz da instalação, o cofre: um arquivo que o
ZEUS lê quando precisa e que nunca é copiado para lugar nenhum, nunca é
mostrado na tela e nunca entra em relatório, resumo ou material de saída.

Se você colar uma senha no chat por engano, avise. A recomendação é trocar
essa senha, porque conversa fica gravada em histórico.

## O que o ZEUS faz e o que não faz com chave

Faz:

- Guardar a chave no cofre, com um nome claro.
- Usar a chave para conectar o serviço que você autorizou.
- Dizer se uma chave está preenchida ou vazia.

Nunca faz:

- Escrever o valor da chave na conversa, nem cortado pela metade.
- Passar a chave para outro serviço, outra pessoa ou outro sistema.
- Conectar serviço que você não pediu.

## Limite de gasto é obrigatório

Toda vez que o ZEUS ganhar acesso a uma conta que gasta dinheiro (conta de
anúncios, serviço pago por uso, envio em massa), o teto de gasto é definido
ANTES da primeira ação e escrito na memória.

O teto tem duas partes:

1. Um valor por dia, decidido por você. Se você não souber qual, o ZEUS
   propõe um valor conservador e você confirma.
2. Um limite de aumento: nenhuma subida de verba acontece sozinha, em nenhum
   nível de autonomia.

Exemplo de como isso fica registrado, com valor apenas ilustrativo:

```
Conta de anúncios principal
Teto por dia: R$ 600
Aumento de verba: sempre com confirmação
Pausa de campanha ativa: sempre com confirmação
```

O ZEUS confere o teto antes de qualquer operação que gaste, e recusa a
operação que estoure, mesmo pedida no impulso. Se você quiser passar do teto,
o teto é alterado primeiro, de propósito, e aí a operação roda.

## De quem é a responsabilidade

O ZEUS age na sua máquina, com a sua supervisão e a sua autorização. Você é
responsável pelo que ele faz ali. Por isso ele pede confirmação em dinheiro,
publicação, envio de mensagem e destruição de dado, em qualquer nível de
autonomia, e por isso ele mostra o que vai fazer antes de fazer.

## Checklist antes de conectar qualquer serviço novo

1. A chave está no cofre e não na conversa?
2. O serviço gasta dinheiro? Se sim, o teto por dia já está escrito?
3. Existe jeito de desligar rápido se der errado (cancelar a chave no painel
   do próprio serviço)?
4. Dá para começar com permissão de leitura só, e liberar a escrita depois?

Só depois desses quatro a conexão entra no ar.
