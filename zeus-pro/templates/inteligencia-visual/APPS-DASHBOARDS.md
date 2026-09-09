# APLICATIVOS, PAINÉIS E ÁREAS DE MEMBROS

STATUS: conhecimento sob demanda. Este módulo é lido quando o assunto aparece (aplicativo, painel,
área de membros, formulário), não em toda sessão. O mapa geral dos módulos está em
`templates/inteligencia-visual/INDEX.md`. Levantamento de referência feito em agosto de 2026.

Tela de sistema tem linguagem visual diferente de página de venda. Aqui o objetivo é velocidade e
clareza, não emoção. A pessoa não está sendo convencida de nada: ela já entrou, já pagou, já é
usuária, e quer terminar uma tarefa. Cada elemento que existe só para impressionar é atrito.
A fronteira completa entre os dois mundos está em `FOUNDATIONS.md`.

## Stack padrão (já é regra da casa, não inventar outra)

Aplicativo interno em React + Vite: sempre shadcn/ui com Base UI por baixo e Tailwind v4. Essa é a
regra de interface interna do dono, e ela existe por um motivo prático: são componentes prontos,
testados em acessibilidade e teclado, que já resolvem os detalhes chatos (foco, leitor de tela,
navegação por tabulação). Reinventar botão e caixa de diálogo custa semanas e entrega pior.

Área de membros, na prática, é uma página HTML única e independente, com a configuração embutida
no próprio arquivo, e não um projeto Next.js completo. Motivo: uma página só, sem servidor por
trás, sobe em qualquer lugar, abre rápido e não quebra quando alguma dependência muda de versão.

Antes de mexer numa área de membros que já está no ar para um cliente, leia o que já foi decidido
para aquele cliente: qual template está em uso, o que foi customizado e o que está na configuração
embutida. Área de membros existente se ajusta, nunca se recria do zero.

## Padrões de navegação e controle de aplicativo produtivo

- **Barra lateral de navegação**: padrão para 5 ou mais seções, e ela colapsa no celular. Abaixo
  de 5 seções a barra lateral só ocupa espaço sem organizar nada.
- **Abas**: padrão para 2 a 5 visões do mesmo contexto, nunca mais que isso. Passou de 5, vira
  barra lateral, porque a pessoa deixa de enxergar as abas como um conjunto.
- **Busca por atalho de teclado (Cmd+K)**: para o usuário avançado, que busca e executa sem tirar
  a mão do teclado. É o que separa uma ferramenta que a pessoa usa o dia inteiro de uma que ela
  suporta.
- **Filtro e ordem de exibição**: sempre visíveis. Em tabela grande, nunca escondidos atrás de
  mais de 1 clique. Filtro escondido é filtro que ninguém usa, e aí a pessoa reclama que a tela
  não mostra o que ela precisa.
- **Densidade ajustável**: painel com muito dado se beneficia de um modo compacto opcional. Quem
  analisa números o dia inteiro quer mais linhas na tela; quem entra uma vez por semana quer
  respiro. Deixe a escolha com quem usa.

## Estados obrigatórios (componente não está pronto sem isso)

Todo componente relevante de aplicativo precisa cobrir: `default`, `hover` (mouse por cima),
`focus` (selecionado pelo teclado), `active/pressed` (no momento do clique), `selected`,
`disabled`, `loading`, `success`, `warning`, `error`, `empty` (sem nenhum dado ainda) e `skeleton`
(o esqueleto cinza enquanto carrega).

Faltando qualquer um desses doze, a peça está incompleta, mesmo funcionando no caminho feliz. E o
caminho feliz é a menor parte do uso real: na vida de verdade a internet cai, a lista chega vazia,
o campo vem errado e a pessoa clica duas vezes. É nesses momentos que a interface passa a
impressão de ser confiável ou de ser amadora.

## Formulário e onboarding

- **Revelação progressiva**: nunca mostrar 20 ou mais campos de uma vez se eles puderem ser
  divididos em passos lógicos. Formulário em etapas, com indicador de progresso visível. Parede de
  campos é a maior causa de abandono em cadastro.
- **Validação junto ao campo**: o erro aparece perto do campo e no momento certo, ao sair do campo
  ou ao tentar avançar. Nunca só num resumo genérico no topo, que obriga a pessoa a caçar onde
  errou.
- **Salvamento automático** em formulário longo, com um indicador discreto de "salvo". Perder
  quinze minutos de preenchimento é o tipo de frustração da qual o usuário não volta.
- **Texto de ajuda e exemplo** perto do campo que gera dúvida, não escondido numa janela separada.
  Se a pessoa precisa abrir outra tela para entender o campo, o campo está mal escrito.
- **Campo condicional**: só aparece quando a resposta anterior o torna relevante. Campo que não se
  aplica ao caso da pessoa só aumenta a sensação de burocracia.
- **Recuperação de erro**: mensagem específica dizendo o que corrigir, nunca "algo deu errado".
  A mensagem precisa dizer o que fazer agora, não apenas que falhou.

## Tabela e dado

Usar `tabular-nums` em toda coluna numérica (detalhe em `TYPOGRAPHY.md`). É o ajuste tipográfico
que faz todo número ocupar a mesma largura, para que as casas fiquem alinhadas na vertical e dê
para comparar valores batendo o olho na coluna.

Navegação entre telas de resultado e ordenação por coluna ficam sempre visíveis. Ação em massa
(selecionar vários e aplicar de uma vez) aparece só quando existe seleção ativa, nunca ocupando
espaço por padrão. Botão perigoso visível o tempo todo em cima de uma tabela é convite a
acidente.

## Painel: hierarquia de métrica

A métrica mais importante fica maior e no canto superior esquerdo, porque é ali que o olho
ocidental começa a leitura. As métricas de apoio ficam menores e ao redor. Painel em que tudo tem
o mesmo tamanho não tem hierarquia nenhuma: obriga a pessoa a ler tudo para descobrir o que
importa.

Cor no painel serve como SINAL, nunca como decoração. Verde e vermelho de variação comunicam
alta e queda; cor aplicada por gosto destrói essa leitura, porque a pessoa deixa de saber se
aquele tom quer dizer alguma coisa. Toda cor entra como variável do sistema, definida em
`templates/design-tokens/` e gerada com `node templates/design-tokens/build.js`, nunca escrita
solta no meio do código.

Gráfico simples sempre que ele resolver. Nada de WebGL ou 3D em painel: gráfico tridimensional
distorce a leitura de proporção e cobra desempenho da máquina de quem usa, sem entregar nenhuma
informação a mais. Referência de bibliotecas em `LIBRARY-REGISTRY.md`.

## Diferença de página de venda que mais gente erra

Nunca aplicar em aplicativo, painel ou área de membros:

1. Chamada para ação de venda.
2. Textura granulada por cima da tela (grain overlay).
3. Gradiente de marca decorativo.
4. Animação cinematográfica de 1 segundo ou mais.

Os quatro existem para criar clima e prender atenção, que é exatamente o oposto do que se quer em
uma ferramenta de trabalho: animação longa vira espera, e todo dia, várias vezes.

Se a tela parece pedir esses recursos, provavelmente ela não é um aplicativo nem um painel, e sim
uma tela de venda disfarçada. Reclassifique antes de implementar, porque as duas seguem réguas
diferentes e misturar as duas entrega o pior dos dois lados.

## Antes de entregar

- Conferir o contraste de texto e de sinal nos 3 tamanhos de tela (celular, tablet e computador),
  e no tema claro e no escuro se o produto tiver os dois. Cor que funciona no claro costuma sumir
  no escuro.
- Conferir o equilíbrio da chamada principal quando ela ocupa 2 linhas: as duas linhas devem ter
  tamanho parecido, sem deixar uma palavra sozinha na linha de baixo.
- Percorrer a tela inteira só pelo teclado, com tabulação. Se em algum ponto você perde de vista
  onde está o foco, o estado `focus` está faltando ou apagado demais.
- Abrir a tela sem nenhum dado cadastrado. Se ela ficar vazia e muda, o estado `empty` não foi
  feito.
