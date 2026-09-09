# Conectar o Zeus à sua conta de anúncios da Meta

Este documento mostra como ligar o Zeus à sua conta de anúncios do Facebook e Instagram, para ele conseguir ler resultados, criar campanhas e subir criativos. Leia quando for usar o Zeus para qualquer coisa de tráfego pago pela primeira vez, ou quando algo parar de funcionar e você suspeitar que a conexão caiu.

## A analogia da tomada

Existe um jeito padrão de ligar uma ferramenta de fora na inteligência artificial. Esse jeito se chama MCP. Pense numa tomada: um lado do encaixe é a Meta, o outro lado é a IA. Enquanto os dois estão desencaixados, o Zeus não enxerga nada da sua conta. Quando você encaixa, os dois passam a conversar sozinhos, sem você precisar copiar e colar número nenhum.

Na prática: com a tomada encaixada, você pergunta "como está a campanha de hoje" e o Zeus vai lá, olha e responde. Sem a tomada, ele só pode chutar, e chute em tráfego custa dinheiro.

## Passo a passo para encaixar

1. Abra o Claude Code e digite `/mcp`. Vai aparecer a lista das ferramentas de fora que já estão ligadas.
2. Procure na lista alguma coisa com o nome de anúncios da Meta. Se já estiver lá e marcada como conectada, você não precisa fazer mais nada.
3. Se não estiver na lista, peça para o Zeus com esta frase: `procura o conector oficial de anúncios da Meta e me mostra como ligar`. Ele busca no catálogo de conectores e devolve o caminho.
4. Ao ligar, vai abrir uma tela da própria Meta pedindo para você entrar com o seu login e autorizar o acesso. Essa tela é da Meta, não do Zeus. Sua senha é digitada lá e o Zeus nunca vê.
5. Na hora de autorizar, escolha a conta de anúncios certa e a página certa. Se você administra mais de uma conta, confira o nome com calma: autorizar a conta errada faz o Zeus mexer no lugar errado depois.
6. Volte para o Claude Code e teste com uma pergunta simples: `lista as minhas contas de anúncio`. Se vier a lista, está encaixado.

## O caminho alternativo: o token de acesso

A tomada resolve a maior parte do trabalho, mas não tudo. Algumas coisas continuam precisando de um acesso direto, chamado token de acesso. Token é uma senha longa que a Meta gera para um programa usar no seu lugar.

Você vai precisar do token principalmente para:

- subir imagem nova de criativo;
- subir vídeo novo de criativo;
- marcar as etiquetas de rastreio nos links dos anúncios, aquelas que dizem de onde veio cada visita (as UTMs).

### Onde pegar esse acesso

1. Entre no painel de negócios da Meta com o mesmo login que administra a conta de anúncios.
2. Vá na área de aplicativos para desenvolvedores e crie um aplicativo do tipo de negócios. É só um cadastro, não é programação.
3. Dentro do aplicativo, abra a ferramenta de gerar acesso e escolha o seu usuário e a sua conta de anúncios.
4. Marque as permissões de gerenciar anúncios e ler resultados de anúncios.
5. Gere o acesso e troque por um de longa duração, senão ele vence em poucas horas e você vai ter que refazer isso toda semana.
6. Copie o texto gerado. Ele é longo e parece um monte de letras sem sentido. É isso mesmo.

### Onde guardar

O acesso vai em um arquivo chamado `.env`, que fica na raiz da sua pasta do Zeus. Esse arquivo é o cofre: nada dele é publicado e nada dele vai junto quando você compartilha o projeto.

```
META_ACCESS_TOKEN=SUA_CHAVE_AQUI
META_AD_ACCOUNT_ID=SUA_CONTA_AQUI
META_PAGE_ID=SUA_PAGINA_AQUI
```

Depois de salvar, peça: `confere se as chaves da Meta estão no .env e testa a conexão`. O Zeus verifica se estão preenchidas e faz um teste de leitura, sem mostrar o valor na tela.

## O que nunca fazer

1. Nunca escreva o acesso no meio do código de um arquivo. Ele vira parte do projeto e vaza no primeiro compartilhamento.
2. Nunca cole o acesso dentro da conversa do chat. Se colou por engano, vá na Meta e gere um novo na hora, invalidando o antigo.
3. Nunca mande o acesso por mensagem, e-mail ou grupo, nem para quem trabalha com você. Quem precisa, gera o próprio.
4. Nunca coloque o arquivo `.env` em um repositório público.

## Aviso de segurança

O token de acesso dá poder de gastar o seu dinheiro. Quem tem ele nas mãos consegue criar campanha, subir orçamento e publicar anúncio na sua conta, usando o seu cartão. Trate como se fosse a senha do banco: ninguém compartilha, e ao menor sinal de que vazou, gere um novo imediatamente. Gerar um novo desliga o antigo na hora.

## Quando algo para de funcionar

1. Peça: `testa a conexão com a Meta e me diz o que está falhando`.
2. As causas mais comuns são: o acesso venceu, a permissão foi removida no painel da Meta, ou a conta de anúncios foi desativada por questão de pagamento.
3. Acesso vencido não é motivo para reinstalar nada. É só gerar outro e trocar no `.env`.
