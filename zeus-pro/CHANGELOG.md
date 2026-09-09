# Registro de mudanças

## [6.0.0] - 2026-09-08

A numeração passou a ser única: o pacote, o time de vídeo e o sistema visual são todos 6.0.
A versão anterior era a 2.5.0.

O time de vídeo passou a viajar com o método inteiro, sob o nome Zeus Motion 6.0.
Junto veio a regra que sustenta isso: o método é seu, a identidade visual de
origem não.

### Mudou

- Time novo `motion-apple` (Zeus Motion 6.0): o método conceitual de vídeo
  animado completo. Processo do começo ao fim, os agentes que executam cada
  etapa, o design system em texto, a matriz de cenas, o repertório de gestos e
  os scripts que aplicam tudo isso.
- O time `motion` passou a levar os efeitos de som aprovados. Cada som tem um
  peso, e o peso do som acompanha o peso da cena. Vinheta de marca e trilha de
  fundo continuam fora.
- Passo de marca obrigatório no boot: a inteligência pergunta pela sua pasta de
  marca ou pelas suas referências, monta a sua paleta, a sua tipografia e o seu
  estilo de traço, e grava em `squads/motion/src/brand/marca.json`. Enquanto isso
  não estiver pronto, o time de vídeo não gera nada.
- Estilo de traço no gerador de peças: `apple-conceitual`, `classico` ou
  `proprio`. Trocar só a cor mantém cara de cópia; o estilo muda a estrutura do
  desenho.
- Skill nova `marca-video`, que conduz esse passo de ponta a ponta.
- Licença: ficou escrito que a identidade visual de origem (paleta, anel de
  espectro, selo e painel visual) não é licenciada. O método é.
- Agora são vinte e nove times: doze do dia a dia e dezessete avançados.



## [2.5.0] - 2026-08-27

O time de Motion virou 2.0: passou por uma auditoria completa, aprendeu com
os próprios erros de verdade (não só na teoria), e todo vídeo pronto agora se
acha sozinho depois.

### Adicionado

- **Motion 2.0: vídeo pronto se acha sozinho depois.** Antes, achar um vídeo
  já feito dependia de lembrar o nome exato do arquivo. Agora, todo vídeo
  renderizado entra sozinho num catálogo pesquisável: descreve o que lembra
  ("aquele vídeo preto e branco", "o de efeito rosa e brilho") e ele encontra,
  mesmo sem saber o nome técnico.
- **Duas referências de qualidade, com nota, não só "parece bom".** O time de
  Motion agora tem dois padrões de vídeo oficiais, cada um avaliado por
  critério objetivo (não "eu acho"), com os princípios de composição
  documentados e prontos para aplicar em vídeo novo: um estilo minimalista e
  um estilo com mais efeito visual, para saber qual cabe em cada peça.

### Mudou

- **Verificação de cor de marca antes de renderizar, não depois.** Se um
  vídeo tentar usar uma cor fora da marca certa (hardcoded, fora do lugar
  onde a cor deveria vir), o sistema agora reprova ANTES do vídeo ficar
  pronto, apontando o arquivo e a linha exata. Antes, cor errada só aparecia
  no vídeo já renderizado.
- **A memória de erros do time de Motion parou de acumular lixo.** O sensor
  que registra o que deu errado, para nunca repetir, estava confundindo
  arquivo editado com sucesso com erro de verdade. Metade do histórico de
  aprendizado era ruído. Corrigido: agora só entra erro real, e o time
  aprende de verdade com o que já aconteceu.
- **Legenda que surge junto com a fala, de verdade.** A legenda palavra por
  palavra com desfoque na entrada era uma regra escrita, mas o módulo central
  não aplicava em fundo claro. Corrigido: a palavra some antes de ser dita e
  surge exatamente no instante certo, em qualquer fundo.



## [2.4.0] - 2026-08-27

O ZEUS aprendeu a montar palestra de telão, e parou de gastar o seu dinheiro
com imagem sem perguntar.

### Adicionado

- **Receita completa de palestra e aula ao vivo**, em
  `squads/apresentacoes/PADRAO-TELAO.md`. Não é teoria de apresentação: é a
  anatomia de um deck real aprovado, usado numa imersão presencial. Traz o arco
  de quatro atos com o tamanho de cada bloco, as cinco leis da abertura (abrir
  com prova pessoal em número e deixar o loop aberto, desarmar a objeção no
  slide seguinte, fechar o loop no meio da palestra e não no fim), o teto de
  cerca de dezessete palavras por slide, a regra do título em duas metades com
  a segunda colorida, a tabela de tamanhos de fonte que funciona projetada, os
  três papéis de imagem que nunca se misturam, e a mecânica de revelar um item
  por clique. O time de apresentações passa a consultar isso sempre que o
  material for para telão.

### Mudou

- **Gerar imagem, vídeo ou voz agora é escolha sua, sempre.** Nova lei sempre
  ativa (`.claude/rules/custo-de-geracao.md`): antes de gerar qualquer mídia por
  IA, o ZEUS diz quantas peças, quanto custa aproximadamente e o que muda se não
  gerar, e espera o seu "pode". Vale a partir da primeira imagem, não só para
  lote grande. O custo aparece na pergunta, nunca no relatório depois que o
  dinheiro já saiu. Onde a ferramenta permitir conferir o texto sem gastar, ele
  confere primeiro e te mostra.



## [2.3.0] - 2026-08-27

O ZEUS aprendeu a ter critério visual, e o time de vídeo virou ferramenta de
verdade, não só método escrito.

### Adicionado

- **Inteligência visual: onze documentos de critério, sob demanda.** O Design
  System Central sempre respondeu "qual é a minha cor, qual é a minha fonte".
  Faltava a outra metade: quando usar cada coisa. Agora existe
  `templates/inteligencia-visual/`, com o critério que separa uma peça que
  parece produto de uma peça que parece gerada por máquina. São onze arquivos,
  lidos só quando o assunto aparece: fundamentos e as dezesseis perguntas
  antes de desenhar qualquer tela, materiais (quando cabe vidro fosco e
  desfoque, e quando não cabe), movimento (quanto tempo dura cada animação, e
  qual curva), recursos visuais modernos que já são seguros de usar hoje,
  tipografia, grade e espaçamento, catálogo de padrões de seção com o custo
  real de cada um, matriz de bibliotecas com a licença conferida uma a uma,
  telas de trabalho (aplicativo, painel, área de membros, formulário), e a
  lista dos vinte sinais que fazem uma página parecer feita por IA.
  Vale para TODOS os times que produzem algo visual, não só um.
- **O time de vídeo agora entende pedido em português.** "Suaviza isso",
  "coloca um desfoque", "deixa com cara de cinema": cada um desses pedidos
  passou a ter uma tradução fixa para o efeito certo. Antes, cada pedido desses
  dependia de improviso, e o mesmo pedido dava resultado diferente a cada vez.
- **Vídeo novo nasce pronto no padrão.** Um comando monta a estrutura do vídeo
  novo já com o movimento suave e a cor da marca escolhida. Antes o começo era
  copiar um vídeo antigo inteiro, o que trazia junto todos os defeitos dele.
- **Seis exemplos de vídeo em código completo, para estudar e adaptar.**
  Conceito, estatística, fluxo visual, faixa de legenda, texto de impacto e
  enquadramento de duas pessoas. Servem de ponto de partida em vez de começar
  do zero. São referência de código: para rodar de verdade, é preciso instalar
  as dependências do time de vídeo e registrar a peça no seu projeto.

### Mudou

- **O time de vídeo passou a viajar com as ferramentas, não só com o método.**
  Até a versão anterior, o pacote levava a explicação de como fazer, mas não os
  programas que fazem a conferência. Agora vão junto: a conferência de qualidade
  do movimento, a validação antes de gerar o vídeo, a captura de quadros para
  avaliação e o registro de aprovação.
- **Animação dura é barrada antes de virar vídeo.** A conferência automática
  agora percebe quando o movimento foi escrito na mão, fora do padrão suave, e
  reprova apontando o arquivo e a linha. Antes esse defeito só aparecia depois
  do vídeo pronto, quando já custava retrabalho.
- **O time de vídeo relê os próprios erros antes de começar.** Virou etapa
  obrigatória consultar a lista de erros já catalogados antes de qualquer vídeo,
  e registrar no fim o que deu certo. Erro antigo para de voltar a cada pedido.

### Corrigido

- Arquivos do time de vídeo apontavam para pastas que só existem no sistema de
  origem. Quem baixasse seguiria uma instrução para um caminho inexistente.
  Agora todo caminho citado corresponde ao que existe na sua cópia.
- A conferência de qualidade do vídeo encerrava com um erro técnico de
  programação quando as dependências ainda não tinham sido instaladas. Agora
  ela diz, em uma linha, o comando que resolve.
- Uma ferramenta de uso interno (sincronização de marca com o sistema de
  origem) estava sendo distribuída sem funcionar fora dele. Saiu do pacote; o
  arquivo que ela gerava continua vindo pronto.
- Um filtro de segurança do empacotamento, que existe para impedir que arquivo
  de senha viaje junto, estava apagando também o arquivo de tokens visuais do
  time de vídeo, só porque o nome era parecido. O resultado é que o código
  chegava incompleto e não compilava. O filtro passou a distinguir os dois.
- Dois dos exemplos de vídeo dependiam de peças que não estavam sendo
  incluídas, então chegavam com referência a arquivo inexistente. As peças
  entraram, e agora todas as referências de código do pacote apontam para
  arquivo que existe de verdade.



## [2.2.0] - 2026-08-20

O nome novo terminou de valer em todo lugar, e a contagem de times bateu.

### Mudou

- A marca ZEUS PRO, que a 2.1.1 só tinha trocado no nome do arquivo baixado,
  agora vale em todo o pacote: README, CLAUDE.md, licença, instalação, texto
  impresso na tela no momento da instalação, e o LICENCA.txt carimbado dentro
  do ZIP. Também na página de venda e nos termos.
- A página de venda listava só quatorze dos dezesseis times avançados, com o
  título dizendo "Catorze". Faltavam apresentações avançadas e Google Ads;
  os dois entraram na lista e o título passou a dizer o número certo.
- `docs/SQUADS.md` ganhou a linha que faltava dizendo o total por extenso,
  pra bater com a auditoria que o próprio build já fazia.

### Adicionado

- Processo de release: nome e versão do produto agora vivem em um único
  arquivo (fora deste repositório, no `aios`), e um comando cuida de subir a
  versão, montar, verificar e publicar, sem precisar caçar os pontos
  espalhados pelo código a cada atualização.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/).

## [2.1.1] - 2026-08-19

O pacote virou ZEUS-PRO, e a primeira sessão passou a funcionar de verdade.

### Mudou

- O nome do produto entregue agora é ZEUS-PRO: é assim que se chama a pasta
  que você descompacta e o arquivo que você baixa. "Zeus" continua sendo o
  nome dele na conversa, o apelido de sempre.
- A abertura da primeira sessão deixou de depender de sorte. Antes, o ZEUS
  podia responder como assistente comum na primeira mensagem, sem se
  apresentar e sem começar o tour. Agora ele se apresenta sempre, na primeira
  palavra, e conduz o caminho certo conforme o estado da instalação: pedir o
  código de licença, ou começar o tour, ou simplesmente trabalhar.
- O tour agora começa perguntando se você já usa ChatGPT, Claude, Gemini ou
  Grok, e traz essas memórias primeiro. A entrevista virou o passo de
  completar o que faltou, não o de começar do zero. É a ordem ensinada na
  aula de 18 de agosto, e é a que economiza o seu tempo.
- A licença deixou de ser um pedido educado e virou uma trava real: sem código
  ativo, o ZEUS não escreve, não cria e não executa. Ler arquivos e tirar
  dúvida sobre a própria ativação continua liberado, porque ninguém consegue
  ativar às cegas.
- A promessa de privacidade ficou honesta: o seu trabalho continua sem sair da
  máquina, e o registro da licença (o que você aceitou nos termos) está
  escrito com todas as letras, em vez de contradizer a página ao lado.
- Contagem de times corrigida: são vinte e oito, doze do dia a dia e dezesseis
  de trabalho pesado. Os documentos diziam números diferentes entre si. Agora
  quem confere a contagem é o próprio sistema, na montagem do pacote, então
  ela não volta a divergir.

## [2.1.0] - 2026-08-18

O que foi ensinado e prometido na aula pública do dia 18 de agosto virou
arquivo dentro do pacote.

### Adicionado

- Nova lei: explicação visual. Dúvida, conceito, passo a passo, comparação e
  número agora saem em widget, uma página visual simples aberta no navegador,
  e não mais em texto corrido. Foi um pedido feito em voz alta na aula, e
  agora está na raiz do treinamento, não numa dica solta.
- Guia de uso pelo Telegram: como criar o bot, como autorizar só o seu
  número, o que dá para fazer por lá e o que fazer quando o bot cair.
- Guia de chaves e limite de gasto: onde as senhas ficam guardadas, o que o
  ZEUS nunca faz com elas, e a obrigação de definir um teto de gasto por dia
  antes da primeira ação em qualquer conta que gaste dinheiro.
- Guia de cruzamento de times: como pedir um trabalho grande dizendo quais
  times entram e em qual ordem, com a tabela das combinações que funcionam
  melhor, e o que perguntar quando ele responde que não pode fazer algo.
- Criação de marca do zero no time de branding: um especialista novo e um
  método completo, da frase que define a marca até o nome, as direções
  visuais e a aplicação em peças reais. Era a fraqueza assumida em aula.
- Modelo de memória "quem eu não quero": para quem você não vende, o trabalho
  que você recusa, a promessa que nunca faz e o jeito de comunicar que você
  não aceita. Saber isso corta caminho errado antes do trabalho começar.

### Mudou

- A entrevista inicial agora insiste no lado negativo do público, e consolida
  esse material num arquivo próprio da memória.
- Instalação: o Git entrou na lista do que você precisa ter instalado, junto
  com a explicação de que ninguém precisa aprender a usar, e ganhou o passo
  de deixar a pasta do ZEUS como padrão de toda conversa nova.
- O roteador de contexto ganhou quatro gatilhos novos, para puxar sozinho os
  guias de Telegram, chaves e gastos, cruzamento de times e explicação
  visual.
- Roadmap atualizado com o que foi anunciado como em construção: algoritmo de
  tráfego que confere a própria projeção, branding com acabamento completo,
  análise financeira e ponte do Telegram mais estável.

## [2.0.0] - 2026-08-18

Frota completa dentro do pacote, e distribuição licenciada.

### Adicionado

- Quinze times avançados, com método já montado: criar aplicativos, baixo
  ticket avançado, motion, edição de vídeo, apresentações avançadas, pitch de
  vendas, webinário, lançamento pago, páginas, carrossel, e-books avançados,
  copywriting avançado, branding avançado, tráfego avançado e painel de dados.
- Quatro guias de conexão: conta de anúncios da Meta, APIs de imagem, páginas
  e servidor, painéis e relatórios.
- Skill `importar-memorias`: aproveita o histórico que você já tem em outras
  inteligências e transforma em memória organizada.
- Skill `guia-inicial`: dispara sozinha na primeira sessão, antes de qualquer
  pedido. Diagnostica o que falta na memória, oferece ajuda pra conectar as
  integrações úteis e grava como você quer que ele se comporte.
- Atalho no boot: como chegar na entrevista já com o material pronto.
- Novos blocos de método: edição de vídeo gravado e motion no time de vídeo,
  webinário e proposta um a um no time de apresentações, lançamento com
  tráfego pago no time de tráfego, carrossel no time de copy.

### Mudou

- A distribuição saiu do repositório aberto. O pacote agora é liberado na
  página, com cadastro e aceite de licença, e cada liberação gera um código de
  licença pessoal e intransferível.
- Atualizar deixou de ser feito por linha de comando: baixe a versão nova na
  página. A sua pasta `memory/` é sua e não é tocada.

## [1.0.0] - 2026-07-25

Primeira versão.

### Adicionado

- Núcleo: protocolo de orquestração por peso, 8 regras sempre ativas, esquema
  de memória em 12 camadas e 7 tipos de informação.
- Boot da Inteligência: entrevista em 8 blocos, com planos para 6 profissões.
- Vault do Obsidian: 22 pastas, cada uma documentada.
- 12 squads genéricos, 2 silenciosos e o time transversal de 4 agentes.
- 5 skills: boot, diário de bordo, criar squad, pesquisar ferramenta, ingerir
  conhecimento.
- 3 hooks: roteador de contexto, gate de ações críticas, captura de
  aprendizado.
- 6 scripts: instalação, versionamento, índice de memória, espelho para a
  Vault, medidor de contexto, auditoria de sanitização.
- Design System Central e compilador de tokens sem dependências.
- Níveis de autonomia de 0 a 4, com lista fixa de ações que sempre exigem
  confirmação.
- Documentação: instalação, primeiros passos, arquitetura, squads, agentes,
  skills, memória, Obsidian, onboarding, personalização, segurança,
  privacidade e governança de dados.
