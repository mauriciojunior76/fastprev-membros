# Guia do App: como construir um aplicativo que vale a pena

Este guia é a referência do squad Aplicativos. Ele responde a uma pergunta
só: como um mentorado sai de uma ideia vaga e chega num aplicativo de verdade,
funcionando, que alguém paga para usar. Este squad cuida da construção
técnica. Quem cuida de vender esse produto em escala é o squad irmão de baixo
ticket, mencionado no final deste guia.

---

## 1. O que faz um app valer a pena

Um aplicativo só vale a pena construir quando ele passa nestes quatro
critérios, nesta ordem:

1. **Resolve um problema real e concreto.** Não é uma ideia bonita no papel,
   é uma dor que alguém sente hoje e já reclama dela em voz alta. Se ninguém
   nomeia o problema sem você perguntar, o problema ainda não está validado.
2. **Entrega algo de fato.** A pessoa que paga sai com uma ferramenta que usa,
   não com uma promessa. Banco de questões, simulador, gerador, painel de
   acompanhamento: o valor aparece na tela, não só no discurso de venda.
3. **Pode ser pagamento único ou assinatura mensal.** As duas formas são
   válidas. Pagamento único funciona quando a dor é pontual. Assinatura
   funciona quando o uso se repete todo mês, e é aí que mora a recorrência de
   verdade (o cliente paga uma vez e continua pagando enquanto usa).
4. **O gargalo pra vender nunca é técnico.** Construir a solução com as
   ferramentas de hoje é a parte fácil. O que separa quem fatura de quem não
   fatura é perceber a demanda real antes de escrever a primeira linha de
   código. Quem constrói primeiro e valida depois normalmente constrói o app
   errado.

Regra de bolso: se você não consegue citar três frases reais que pessoas
disseram sobre essa dor, ainda não é hora de construir. É hora de perguntar.

---

## 2. O método dos prints

Antes de desenhar qualquer tela, é comum pedir print de aplicativos de
sucesso no mesmo nicho ou em nicho parecido. Isso não é atalho preguiçoso,
é engenharia reversa de algo que já provou funcionar. O ponto crítico é O QUE
se estuda no print:

- **Estudar o CONCEITO e a LÓGICA de fluxo.** Como a pessoa entra, o que ela
  vê primeiro, quantos passos até o valor principal, onde fica o botão de
  ação, como o app conduz do cadastro até o uso real.
- **Estudar a estrutura de páginas e telas.** Tela de entrada, tela principal,
  tela de resultado, tela de configuração: o esqueleto que faz sentido para
  aquele tipo de produto.
- **Adaptar para o próprio público.** A lógica que funciona lá vira a base,
  mas a linguagem, o tom, as cores e o nome são do produto novo, pensados
  para quem vai usar este app específico.

O que é PROIBIDO no método dos prints:

- Copiar a identidade visual exata (paleta, logotipo, fontes, ícones únicos)
  de um app de terceiro.
- Copiar o nome da marca ou qualquer variação óbvia dele.
- Replicar textos literais de tela, botão ou copy do app original.

A lição do print é sempre sobre o que funciona na lógica de uso, nunca sobre
vestir a roupa de outra marca. Um app copiado na aparência não ensina nada
sobre o próprio público e ainda carrega risco de imagem.

---

## 3. O briefing antes de construir

Nenhum app nasce sem um briefing respondido primeiro. Ele existe para evitar
o erro mais caro do processo: construir bonito algo que ninguém quer pagar
para usar. As perguntas centrais:

1. **O que o app resolve?** Em uma frase, sem enrolação, a dor concreta.
2. **Para quem?** Descrição real de quem sente essa dor hoje, com contexto de
   vida ou trabalho, não uma faixa etária genérica.
3. **Qual é a dor?** O incômodo específico, de preferência na fala literal de
   quem já reclamou dela.
4. **O que o app faz na prática?** A lista curta de funções que resolvem essa
   dor, sem inflar com recurso que ninguém pediu.

### A antipersona

Definir quem NÃO é o público às vezes importa mais do que definir quem é.
A antipersona corta gente que pareceria cliente mas não vai pagar, não vai
usar, ou vai gerar suporte caro sem gerar receita. Exemplos de pergunta que
revela a antipersona: quem já testou soluções parecidas e desistiu por qual
motivo, quem tem a dor mas não tem orçamento nem intenção de pagar, quem
precisaria de um produto muito mais robusto do que este MVP entrega.

### Restrições

O que o app NÃO pode ter, definido antes de construir: funcionalidade que
some tempo de desenvolvimento sem mover a dor central, integração que
depende de terceiro instável, promessa que a equipe não consegue sustentar
depois da venda.

### Referências visuais

As imagens do método dos prints entram aqui, já filtradas pela regra da
seção 2: conceito e fluxo aproveitados, identidade visual descartada.

---

## 4. A stack técnica validada

Esta é a stack que já provou funcionar na prática, testada em caso real com
resultado financeiro comprovado:

- **PWA instalável no celular.** Aplicativo web progressivo, que a pessoa
  adiciona à tela inicial do telefone como se fosse um app nativo. Não é app
  de loja (Google Play, App Store): o custo de publicação e aprovação em loja
  não compensa no início, e o PWA entrega a mesma sensação de uso para a
  maioria dos casos.
- **Hospedagem em servidor próprio (VPS).** O aplicativo roda em um servidor
  dedicado, sem depender de plataforma de terceiro que pode mudar regra ou
  preço a qualquer momento.
- **Banco de dados Supabase.** Guarda os dados do app (usuários, conteúdo,
  progresso) de forma organizada, com estrutura pronta para autenticação e
  consulta.
- **Pagamento via gateway com integração por aviso automático.** O
  pagamento passa por uma plataforma de gateway (as opções mais comuns do
  mercado servem), e a confirmação de compra chega ao sistema por um aviso
  automático entre sistemas (a integração técnica conhecida como webhook),
  liberando o acesso sem precisar de conferência manual.
- **Entrega do acesso por WhatsApp além de email.** Email sozinho falha:
  mensagem cai em spam, endereço com erro de digitação, caixa cheia. O
  WhatsApp garante que o acesso chega de verdade, reduzindo cancelamento por
  "não recebi o produto".
- **Interface no padrão shadcn/ui quando for painel interno.** Toda tela que
  opera o negócio por dentro (painel de administração, área logada com
  cadastro e listagem, dashboard) usa a biblioteca de componentes prontos
  shadcn/ui sobre Vite, React, Tailwind, Radix e ícones Lucide. Isso evita
  interface desenhada à mão que sai com cara de rascunho. Página de venda do
  produto não entra nessa regra, essa segue o padrão de página do squad de
  baixo ticket.

---

## 5. Segurança que evita bug e vazamento

Segurança não é etapa opcional no fim: ela entra desenhada desde o início.

- **Sessão única por usuário.** Cada novo login invalida o token da sessão
  anterior. Isso impede que um acesso comprado por uma pessoa seja
  compartilhado ao mesmo tempo com várias outras, o que sangraria a
  recorrência sem ninguém perceber de imediato.
- **Testar como alguém mal intencionado tentaria burlar o pagamento, antes
  de vender.** Antes de abrir a venda de verdade, simular as tentativas mais
  óbvias: acessar a área paga sem pagar, reusar um link de acesso antigo,
  manipular a URL para pular a etapa de checkout. Se o teste encontrar uma
  brecha, ela se corrige antes do primeiro cliente pagante, nunca depois.
- **Dado pessoal de terceiro exige cuidado (LGPD) em qualquer app que colete
  informação de usuário.** Nome, telefone, email, dado de saúde ou financeiro
  do usuário do app pedem: coleta só do que é necessário, guarda em local com
  controle de acesso, e clareza sobre para que aquele dado serve. Nenhum
  dado de usuário do app é reaproveitado para outra finalidade sem que a
  pessoa saiba.

O checklist de segurança faz parte da entrega do MVP, não é um passo futuro
"quando o app crescer". Vazamento ou fraude no início mata a confiança antes
mesmo do produto provar seu valor.

---

## 6. Prova de que o método funciona

O caminho descrito neste guia não é teórico. Um mentorado real construiu um
aplicativo de recorrência seguindo exatamente esta lógica (dor validada numa
comunidade que ele já tinha acesso, entrega simples via PWA, tráfego pago
estruturado) e faturou mais de trinta mil reais em cerca de sessenta dias,
com custo de aquisição por cliente na faixa de trinta reais. O ponto que
importa replicar não é o nicho escolhido por ele, é a sequência: validar
antes de construir, construir simples, vender com o método já testado, e só
depois pensar em recurso extra.

---

## 7. Trabalha junto com o time de baixo ticket

Criar o app é uma coisa. Vender ele em escala (oferta, página de vendas,
criativo, tráfego pago) é outra. Este squad entrega o produto pronto,
funcionando, seguro e hospedado. A partir daí, quem estrutura a venda em
volume é o squad de baixo ticket: ele monta a esteira de preço, a página, o
criativo e a campanha que levam o estranho do anúncio até o pagamento. As
duas frentes trabalham juntas no mesmo projeto, mas cada uma cuida da sua
metade: aqui se constrói o que vale a pena vender, lá se vende em escala.
