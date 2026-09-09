# Colocar páginas no ar: VPS e domínio

Este documento mostra como você coloca uma página na internet com o Zeus: onde a página fica hospedada, como o endereço do seu site aponta para lá, e quais frases você cola no Claude Code para o Zeus fazer o trabalho. Leia antes de publicar a sua primeira página.

## Os dois conceitos, em uma frase cada

VPS é um computador ligado 24 horas por dia na internet, que você aluga por mês e onde as suas páginas ficam guardadas para qualquer pessoa abrir.

Domínio é o nome bonito que as pessoas digitam para chegar até esse computador, no lugar de decorar um número.

O domínio sozinho não mostra nada. A VPS sozinha só é alcançável por um número. Você precisa dos dois e precisa ligar um no outro.

## Passo a passo, na ordem

### 1. Contratar a VPS

1. Escolha uma empresa de hospedagem que ofereça VPS. As mais usadas cobram por mês e permitem cancelar quando quiser.
2. Contrate o plano mais simples que a empresa oferecer. Para páginas, o menor já resolve com folga.
3. Na hora de criar, escolha o sistema Linux na versão indicada como estável. Se aparecer Ubuntu com um número de versão marcado como recomendado, é esse.
4. Ao final, a empresa mostra três coisas na tela: o endereço numérico da máquina, o nome de usuário e a senha. Copie os três e guarde num lugar seguro. A senha costuma aparecer uma vez só.

### 2. Comprar o domínio

1. Escolha uma empresa de registro de domínios e pesquise o nome que você quer.
2. Compre. O custo é anual e costuma ser baixo.
3. Ative a renovação automática. Domínio vencido derruba tudo que está publicado nele, e recuperar depois é caro e demorado.

### 3. Apontar o domínio para a VPS

Aqui você diz para a internet inteira que aquele nome pertence àquele computador. Isso é feito no painel de onde você comprou o domínio, na área chamada DNS ou zona de DNS.

Você vai criar três registros do tipo A. Registro do tipo A é simplesmente uma linha dizendo "este nome leva a este número".

1. Nome `@`, tipo A, valor: o endereço numérico da sua VPS. Esse é o domínio raiz, o nome puro sem nada na frente.
2. Nome `www`, tipo A, valor: o mesmo endereço numérico. Assim quem digita com www também chega.
3. Nome `*`, tipo A, valor: o mesmo endereço numérico. Esse é o curinga: faz qualquer nome na frente do seu domínio funcionar, o que permite criar endereços novos depois sem voltar aqui.

Depois de salvar, a mudança demora de alguns minutos a algumas horas para valer no mundo todo. É normal. Não fique refazendo.

### 4. Guardar os acessos no arquivo `.env`

O `.env` fica na raiz da sua pasta do Zeus e funciona como cofre: nada dele é publicado.

```
VPS_HOST=SEU_ENDERECO_AQUI
VPS_USER=SEU_USUARIO_AQUI
VPS_PASS=SUA_SENHA_AQUI
VPS_DOMINIO=SEU_DOMINIO_AQUI
```

Nunca coloque a senha da VPS dentro de um arquivo de código e nunca cole no chat. Se colou por engano, troque a senha na hora pelo painel da hospedagem.

## Mini prompt copiável: configurar a VPS

Cole isto no Claude Code, trocando os campos entre colchetes pelos seus dados. O Zeus faz o resto sozinho.

```
Configura a minha VPS para hospedar páginas.

Endereço: [SEU_ENDERECO_AQUI]
Usuário: [SEU_USUARIO_AQUI]
Senha: [SUA_SENHA_AQUI]
Domínio: [SEU_DOMINIO_AQUI]

O que eu quero:
1. Conectar na máquina e conferir se está tudo certo.
2. Instalar o que for preciso para servir páginas.
3. Deixar o certificado de segurança ativo, para o endereço
   abrir com cadeado e sem aviso de site inseguro.
4. Criar uma pasta onde as páginas vão ficar.
5. Salvar os acessos no arquivo .env, nunca dentro do código.
6. No final, publicar uma página de teste e me mandar o link
   já conferido, abrindo de verdade.

Antes de mexer em qualquer coisa que já exista na máquina,
me pergunte. Só crie coisas novas sem perguntar.
```

## Mini prompt copiável: publicar uma página

```
Publica esta página na minha VPS e me devolve o link.

Arquivo ou conteúdo: [DESCREVA OU APONTE O ARQUIVO]
Endereço desejado: [SEU_DOMINIO_AQUI]/[NOME_DA_PAGINA]

Regras:
1. Se já existir alguma coisa publicada nesse endereço,
   pare e me avise antes de escrever por cima.
2. Depois de publicar, confira se o link abre de verdade
   e se abre com cadeado de segurança.
3. Confira também no celular, não só no computador.
4. Só então me mande o link.
```

## Antes de mandar o link para alguém

Sempre abra o link você mesmo, no seu celular, com os dados móveis em vez do wi-fi de casa. Isso mostra a página do jeito que um estranho vai ver. Confira três coisas: abriu, apareceu o cadeado de segurança e o conteúdo está certo. Mandar link quebrado para cliente ou para uma lista é o tipo de erro que custa caro e não tem desculpa, porque leva dez segundos para evitar.
