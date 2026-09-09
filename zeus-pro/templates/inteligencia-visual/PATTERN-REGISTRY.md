# PATTERN REGISTRY: padrões de seção e componente, com contexto e custo

## STATUS: conhecimento sob demanda. Leia quando o assunto aparecer: montar uma página, escolher a estrutura de uma seção, decidir se um componente entra ou não. O mapa geral de todos os módulos está em `templates/inteligencia-visual/INDEX.md`.

Para cada padrão você encontra quatro coisas: quando usar, quando não usar, quanto ele custa em
performance, e o que ele faz no celular e na acessibilidade.

Padrão não é biblioteca, é decisão de estrutura. O mesmo padrão pode ser feito em CSS puro, com uma
biblioteca de animação, ou adaptado a partir do `templates/inteligencia-visual/LIBRARY-REGISTRY.md`.
Levantamento feito em agosto de 2026.

## Hero

- **Split hero** (texto de um lado, imagem ou tela do produto do outro): bom para produto de
  software com uma tela pra mostrar. Custo baixo, e no celular as duas colunas viram uma só,
  empilhadas. Funciona porque a pessoa lê a promessa e vê a coisa existindo no mesmo golpe de vista.
- **Editorial hero** (tipografia gigante como protagonista, pouca ou nenhuma imagem): bom para
  autoridade, conteúdo e marca pessoal. Custo mínimo e o melhor comportamento no celular, porque
  texto sempre cabe. Quando não existe nada visual pra mostrar, foto genérica enfraquece: a frase
  certa em corpo grande carrega sozinha.
- **Cover com foto de fundo e camada de escurecimento por cima**: bom quando existe foto real do
  dono, da equipe ou do produto. A régua de contraste dessa camada e a legibilidade do texto sobre a
  foto saem do `templates/DESIGN-SYSTEM-CENTRAL.md`, não se decidem caso a caso. Foto de banco de
  imagem sem relação com o negócio derruba mais do que ajuda.
- **Hero 3D ou WebGL**: só quando o produto É visual ou técnico. É o padrão mais caro da lista em
  peso de página e em bateria de celular. O limite de uso está no `LIBRARY-REGISTRY.md`.

## Seções de conteúdo

- **Bento grid**: só quando os itens têm tamanho de informação genuinamente diferente (uma métrica
  grande mais três detalhes pequenos). Usado sem essa diferença ele é pura decoração e vira o
  sintoma descrito no `BLACKLIST.md`. Custo baixo, com uma ressalva: no celular os blocos se
  reorganizam, então empilhe por ordem de importância, nunca pela ordem que estava no desktop.
- **Marquee de prova social** (logos ou depoimentos rolando de lado): custo baixo com CSS puro
  (`animation` mais `transform`), não precisa de JS pesado. Pausar quando o mouse encosta e respeitar
  `prefers-reduced-motion`, virando estático para quem pediu menos movimento na configuração do
  próprio aparelho.
- **Sticky storytelling** (a seção prende na tela enquanto o conteúdo ao lado muda conforme a
  rolagem): forte em apresentação e em explicação de mecanismo, porque segura a atenção em uma ideia
  por vez. Custo médio, por causa do travamento da seção durante o scroll. Testar no celular com
  cuidado: esse travamento costuma quebrar em tela pequena, então considere desligar abaixo de 768px.
- **Comparison slider** (antes e depois com uma alça que se arrasta): bom para prova de resultado.
  Acessibilidade: garantir que funcione também pelo teclado, não só por arrasto de mouse ou dedo.
- **Número que conta na tela** (animated counter): bom para métrica de impacto. Usar `tabular-nums`
  (ver `TYPOGRAPHY.md`) para a largura não "dançar" enquanto o número sobe. Rodar uma vez quando a
  seção entra na tela, nunca em loop.

## Navegação e controle

- **Command palette** (a busca que abre com Ctrl+K ou Cmd+K): padrão de aplicativo e de painel de
  trabalho, não de página de venda. Ver `APPS-DASHBOARDS.md`.
- **Dock navigation** (barra fixa com os atalhos principais): boa em aplicativo com poucas seções,
  ruim quando passa de cinco ou seis itens, porque cada item novo rouba clareza dos outros.
- **Bottom sheet** (o painel que sobe de baixo, no celular): melhor que a janela centralizada para
  ação secundária, porque mantém visível o contexto da tela de trás e a pessoa não perde o lugar.
- **Spotlight card e magnetic button**: microinteração de destaque quando o mouse passa por cima,
  custo baixo no desktop. No celular não existe passar o mouse, então é obrigatório garantir um
  estado equivalente no toque, senão o elemento simplesmente não reage para metade das pessoas.

## O que NÃO virou padrão aprovado (usar com máxima moderação, um por página)

Parallax incluso, cursor customizado sem motivo funcional, brilho decorativo em elemento parado, e
rolagem artificial que foge do comportamento nativo do navegador. Os quatro aparecem como
antipadrão recorrente no `BLACKLIST.md`. Se a peça realmente pedir um deles, justifique o propósito
antes de aplicar. Nenhum entra por hábito.

## Regra de escolha

Um padrão só entra na peça se resolver uma das 16 perguntas do `FOUNDATIONS.md`, e quase sempre é uma
destas duas: "que movimento realmente ajuda aqui" ou "qual densidade de informação cabe aqui".

Padrão que existe só porque está na moda é o mesmo erro do bento grid sem propósito: custa
manutenção, custa tempo de carregamento e não convence ninguém de nada.
