# Guia de acesso: ligando o Claude Code no Google Ads

Este é o guia da parte chata: tirar as permissões com o Google para o Claude conseguir mexer na
sua conta de anúncios. Depois que isso estiver de pé, você fala com ele em português normal e
ele cria e cuida das campanhas.

Leia isto se você nunca fez essa ligação, ou se ela quebrou.

## Como usar este guia

Cada fase tem quatro partes:

- **O que é:** uma frase explicando.
- **O Claude faz:** o que ele resolve sozinho, você só pede.
- **Você faz:** o que só o dono da conta pode fazer, passo a passo.
- **Deu certo quando:** como saber que pode seguir em frente.

Se você é o Claude lendo isto: identifique em que fase o usuário está antes de qualquer coisa,
execute tudo que estiver em "O Claude faz", e quando chegar num "Você faz", entregue a instrução
em linguagem simples e espere. Nunca diga apenas "não consigo": diga a fase, o passo e o que
você precisa que a pessoa faça.

## O quadro geral, em uma imagem

O Google trabalha com três níveis de permissão. Você vai subindo de degrau:

| Nível | Nome na tela | O que dá pra fazer |
|---|---|---|
| 1 | Conta de teste | Só mexer em contas de faz de conta. Nada na conta real. |
| 2 | Acesso às Análises | Já lê dados reais e já cria campanha. Não cria conta de cliente nova. |
| 3 | Acesso básico | Tudo liberado no dia a dia. |

Você nasce no nível 1. Para chegar no 3 precisa pedir e um analista do Google aprovar na mão.
Não existe atalho. Todo mundo passa pela mesma fila.

---

# FASE 0: Preparação

**O que é:** escolher a conta certa e criar a conta administradora, que é o guarda-chuva onde
suas contas de anúncio ficam penduradas.

**Você faz:**

1. Escolha uma conta de e-mail Google **que você abre e lê todo dia**. Todo aviso do Google vai
   cair nela. Conta que você não acompanha trava o processo em silêncio por semanas.
2. Entre em ads.google.com com essa conta e crie uma **conta administradora** (o Google chama de
   MCC ou Centro de Clientes). É incluso.
3. Dentro dela, vá em **Ferramentas → Central de API** e peça o **token de desenvolvedor**. Ele
   nasce no nível 1 (Conta de teste). É normal.
4. Anote o número da conta administradora (formato 123-456-7890).

**Deu certo quando:** você consegue abrir a Central de API e vê um token lá, mesmo que apareça
"Conta de teste" do lado.

**Onde costuma dar errado:** usar uma conta de e-mail secundária que ninguém abre. O Google
manda pedidos de esclarecimento por e-mail e desiste se ninguém responde.

---

# FASE 1: Credenciais

**O que é:** criar a "chave" que permite o Claude entrar na sua conta sem você digitar senha
toda vez.

**Você faz (parte 1):**

1. Entre em console.cloud.google.com com a mesma conta de e-mail.
2. Crie um projeto novo (nome livre).
3. Procure por "Google Ads API" e clique em **Ativar**.
4. Vá em **APIs e serviços → Credenciais → Criar credenciais → ID do cliente OAuth**.
5. No tipo, escolha **App para computador**. Não escolha Aplicativo da Web.

> Por que isso importa: o tipo Web exige cadastrar um endereço de retorno, e é onde quase todo
> mundo trava com uma mensagem de erro sem explicação. O tipo App para computador não precisa
> disso. Se você já criou como Web, dá pra consertar: edite a credencial e adicione
> `http://127.0.0.1:8080` na lista de endereços de retorno autorizados.

6. Anote o **ID do cliente** e a **chave secreta** que aparecerem.

**O Claude faz:** roda o script oficial que gera a chave de acesso permanente (refresh token) e
monta o arquivo de configuração `google-ads.yaml` com tudo dentro.

**Você faz (parte 2):** o Claude vai te dar um endereço. Abra, faça login com a mesma conta e
clique em **Permitir**. Vai aparecer um aviso dizendo que o Google não verificou o aplicativo:
isso é normal, é o seu próprio programa, pode continuar. Quando a tela disser que o código foi
recebido, acabou a sua parte.

**Deu certo quando:** o Claude consegue perguntar algo simples para o Google e receber resposta
sem erro de login.

---

# FASE 2: Pedir o acesso completo

**O que é:** o pedido formal para sair do nível 1 e chegar no nível 3. Um analista de verdade lê
o seu pedido.

**Você faz:** na Central de API, clique em **Solicitar acesso básico** e preencha o formulário.

Estas são as armadilhas que mais fazem gente tomar recusa:

**1. O site da empresa precisa ter conteúdo de verdade.**
O analista abre o endereço que você informar. Se for uma página de links, um site fora do ar ou
uma página em construção, o pedido é recusado com a frase "seu site não tem conteúdo relacionado
à sua aplicação". O site precisa falar da sua empresa e também da ferramenta que você está
construindo. Se você não tem um site assim, publique uma página simples explicando as duas
coisas e use esse endereço.

**2. Nome da empresa é o nome da empresa.**
Não coloque o nome do seu robô, do seu projeto ou da conta administradora. O analista compara o
nome da empresa com o domínio do seu e-mail de contato. Se um diz uma coisa e o outro diz outra,
ele para tudo e pergunta. Nome da empresa, domínio do e-mail e site devem contar a mesma história.

**3. E-mail de contato monitorado.**
Use um endereço no domínio da sua empresa e que alguém leia sempre.

**4. Documento da ferramenta.**
O formulário pede um arquivo descrevendo o que sua ferramenta faz. Descreva: o que a empresa faz,
o que a ferramenta faz passo a passo, quem usa ela (interno ou público) e que tipo de dado ela
lê e escreve. O Claude escreve esse documento pra você.

**5. Envie até o fim.**
Só conta como enviado quando aparece a tela dizendo que receberam a sua solicitação. Anote o
número do caso. Formulário preenchido e deixado aberto numa aba não é pedido enviado, e você
pode passar semanas esperando resposta de algo que nunca saiu.

**Deu certo quando:** você vê a tela de confirmação e recebe um e-mail com o número do caso.

**O que esperar:**

- O prazo é de até 5 dias úteis por rodada.
- É comum vir um pedido de esclarecimento antes da decisão. Responda no mesmo dia, respondendo o
  próprio e-mail deles, sem abrir caso novo.
- Cada resposta sua reinicia a contagem do prazo.
- Se recusarem, eles dizem o motivo exato. Corrija e reenvie usando o mesmo caso.

---

# FASE 3: O que dá pra fazer enquanto espera

**No nível 1 (Conta de teste):** nada na conta real. Nem ler.

> Isso costuma confundir. Existe material na internet dizendo que no nível de teste você já
> consegue puxar relatório da conta real. Não consegue. Qualquer pedido para uma conta real
> volta com erro de token não aprovado, seja para ler ou para escrever. O que funciona no nível
> de teste é só dentro de uma conta de faz de conta.

Se quiser treinar sem esperar, dá pra montar um ambiente de faz de conta. Ele exige uma estrutura
separada, com outra conta de e-mail Google, porque o Google não deixa misturar teste com real.
Nesse ambiente tudo funciona e nada gasta dinheiro.

**No nível 2 (Acesso às Análises):** já dá pra ler dados reais e criar campanha de verdade. Fica
bloqueado: criar conta de cliente nova, o planejador de palavras-chave e configurar cobrança.

Uma estratégia que funciona bem nesse nível: em vez de uma conta para cada cliente, use uma conta
só e crie uma campanha para cada cliente ou assunto dentro dela, cada uma apontando para a página
daquele assunto. Assim você nunca esbarra no bloqueio de criar conta.

---

# FASE 4: Onde a campanha mora

**O que é:** entender a diferença entre a conta administradora e a conta de anúncio.

A conta administradora é só um guarda-chuva. Campanha não roda dentro dela. Você precisa de pelo
menos uma **conta de anúncio** pendurada nela.

Duas formas de conseguir isso:

- **Vincular uma conta que você já tem:** dentro da administradora, use a opção de adicionar
  conta existente e informe o número dela. A outra conta recebe um convite e precisa aceitar.
- **Criar uma conta nova:** só funciona depois do acesso completo aprovado.

**Nomes que evitam bagunça:** quando várias campanhas de clientes diferentes convivem na mesma
conta, use um padrão de nome fixo, tipo `[cliente] - [assunto]`. Isso deixa claro de quem é cada
campanha e facilita separar orçamento e relatório depois.

**Deu certo quando:** o Claude consegue listar a conta de anúncio pendurada na administradora.

---

# FASE 5: Criando campanha

Daqui pra frente o trabalho é dos agentes do squad. O caminho é o normal: pesquisa de mercado,
palavras-chave, planejamento, escrita dos anúncios, subida e acompanhamento.

Três regras que valem sempre:

1. **Campanha nasce pausada.** Nunca sobe já gastando. Você revisa e ativa quando quiser.
2. **Simular antes de dizer que está pronto.** O Google tem um modo de simulação que testa a
   campanha sem criar nada. Todo envio passa por ele primeiro.
3. **Ninguém ativa sozinho.** A ativação, que é quando o dinheiro começa a sair, é sempre uma
   decisão sua.

---

# FASE 6: Manutenção

**A chave de acesso expira.** Sem aviso, às vezes em poucos dias. Quando isso acontece, tudo para
de funcionar com um erro de login. Renovar leva dois minutos: é repetir a parte 2 da Fase 1.

**Aviso importante para o Claude:** se qualquer verificação automática falhar por problema de
login, isso é um alerta, nunca um "nada mudou". Falha de credencial tratada como resultado normal
já fez sistema rodar semanas sem ninguém perceber que estava cego.

**Como conferir o nível de acesso:** olhe direto na Central de API ou pergunte pela API. Não
espere só pelo e-mail, porque a mudança de nível às vezes acontece antes do aviso chegar.

---

# Atalhos que não existem

- **Criar um aplicativo novo não fura a fila.** O cadastro do aplicativo é outra coisa,
  necessária mas separada. A aprovação continua sendo humana.
- **Não existe contato que acelere.** A análise é manual para todo mundo, inclusive para quem já
  tem outras contas aprovadas.
- **A verificação de marca só ajuda quem já tem marca e site de verdade.** Para quem está
  começando, ela adiciona trabalho sem ganhar tempo.
- **Token de teste não lê conta real.** Já foi dito na Fase 3, mas é o mito que mais faz gente
  perder dias.

---

# Quando alguma coisa der errado

Antes de concluir que está quebrado, confira nesta ordem:

1. A chave de acesso ainda funciona? (erro de login é sempre o primeiro suspeito)
2. Qual o nível de acesso atual na Central de API?
3. A conta que você está tentando usar está pendurada na administradora?
4. O que a mensagem de erro diz exatamente? O Google costuma nomear o problema com precisão.

A maioria dos travamentos cai em um desses quatro.
