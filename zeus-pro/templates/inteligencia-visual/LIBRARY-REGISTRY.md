# MATRIZ DE BIBLIOTECAS: qual usar, quando, com que licença

STATUS: conhecimento sob demanda. Este arquivo é lido quando o assunto aparece (escolher uma
biblioteca, conferir licença, decidir se vale usar 3D ou animação pesada), não em toda sessão.
O mapa geral de todos os módulos está em `templates/inteligencia-visual/INDEX.md`.

Levantamento feito em agosto/2026. Os status significam:

- **CORE**: padrão oficial, primeira escolha, não precisa justificar.
- **APPROVED**: uso pontual, com motivo claro.
- **SPECIAL**: só em caso muito específico, com regra de contenção junto.
- **WATCHLIST**: promissora, ainda não madura o bastante para virar padrão.
- **EVITAR**: não adotar em nada novo.
- **BANNED**: a licença ou o risco não permite, nem em teste.

Por que isso existe: escolher biblioteca no impulso custa caro depois. Uma decisão errada aqui
vira página lenta, licença que impede revenda, ou dois sistemas brigando dentro do mesmo projeto.
A matriz abaixo já resolveu essa pesquisa uma vez, para ninguém ter que refazer.

## Fundação de interface (aplicativos internos em React + Vite)

Contexto: a maior parte das entregas visuais é página HTML com tudo embutido em um arquivo só, e
essas entregas não usam nenhuma das bibliotecas desta tabela. O padrão abaixo vale para aplicativo
interno feito em React, seguindo a regra de interface interna do dono: sistema interno sempre em
shadcn/ui.

| Biblioteca | Licença | Status | Nota |
|---|---|---|---|
| Tailwind CSS v4 | MIT | CORE | todo aplicativo com processo de build (Vite) |
| shadcn/ui | MIT | CORE | trocou a base de Radix para Base UI em jul/2026, sem quebrar quem já usa Radix |
| Base UI | MIT | APPROVED | uso direto pontual quando o shadcn não cobrir; time pago pela MUI, mesmos criadores do Radix e do Floating UI |
| React Aria | Apache 2.0 | APPROVED | acessibilidade dura, componente complexo (seletor de data, tabela, arrastar e soltar) |
| Radix UI | MIT | APPROVED só em projeto antigo | manter onde já está, não iniciar projeto novo com ela |
| Floating UI | MIT | APPROVED | só em página HTML solta, via `@floating-ui/dom`; em aplicativo React nunca direto, ela já vem junto com Base UI e Radix |
| Ark UI | MIT | WATCHLIST | só faz sentido se entrar Vue, Solid ou Svelte no projeto; em projeto 100% React é redundante |
| Headless UI | MIT | EVITAR | 16 meses sem versão nova, o time da Tailwind Labs foi para o Tailwind Plus |

Regra dura: nunca duas bibliotecas da MESMA camada no mesmo aplicativo. Em bom português, duas
bibliotecas que fazem a mesma coisa (a peça invisível que controla menu, modal e dropdown) brigam
por comportamento, dobram o peso do arquivo e criam bug que ninguém acha.

## Animação e movimento (detalhe em `templates/inteligencia-visual/MOTION.md`)

| Biblioteca | Licença | Status |
|---|---|---|
| GSAP 3.15 com ScrollTrigger, Flip e SplitText | incluso desde abr/2025 | CORE, travar a versão dentro do projeto e não atualizar no meio de uma entrega |
| Lenis | MIT | CORE, usar a 1.3.26 ou mais recente |
| Motion (o antigo Framer Motion) | MIT | WATCHLIST, só se nascer um aplicativo React com animação de layout amarrada ao estado da tela |

O GSAP virou incluso em abril de 2025, inclusive para uso comercial, e isso muda a conta: antes
era pago para produto que vende, hoje não é. Por isso ele é a escolha padrão de animação, e não uma
exceção.

## Bibliotecas criativas (inspiração e dicionário de padrão, licença conferida uma a uma)

| Biblioteca | Licença | Pode copiar para o produto? | Status |
|---|---|---|---|
| Magic UI | MIT | sim, livre, inclusive revender | APPROVED, estudar bento, beam, ticker e marquee |
| Motion Primitives | MIT | sim, livre | APPROVED, melhor fonte de tempo e orquestração de animação sóbria |
| Animate UI, Kibo UI, Kokonut UI, Origin UI | MIT | sim, livre | APPROVED, peça animada pronta, composição complexa, refinamento de interface básica |
| React Bits | MIT com Commons Clause | usar sim, revender o componente empacotado não | SPECIAL, os textos animados são o ponto forte; a maioria dos fundos é WebGL pesado, evitar copiar inteiro |
| Aceternity UI | licença própria, sem repositório aberto | usar e modificar dentro do produto final sim, redistribuir como template não | SPECIAL, no máximo 1 efeito por página, é o parque de animação por excelência |
| 21st.dev | varia conforme o autor de cada componente | conferir peça a peça | WATCHLIST |

Nunca copiar código de biblioteca sem antes conferir a licença exata: abrir o arquivo LICENSE do
projeto e ler. Achismo não vale. A diferença entre MIT e Commons Clause é justamente a que decide
se você pode ou não vender aquilo dentro de um produto seu.

## Referência visual (não é biblioteca, é onde pesquisar antes de desenhar)

Mobbin e Refero mostram interface real de produto no ar, ou seja, o que sobreviveu em produção.
Godly tem curadoria apertada de página de venda premium. Land-book e Lapa Ninja entregam volume
para varrer rápido. Awwwards é bom para captar tendência e ruim para copiar direto: muito site
premiado ali converte mal, porque foi feito para impressionar júri, não para vender.

## Three.js e WebGL (3D dentro da página)

| Item | Status | Nota |
|---|---|---|
| Three.js, React Three Fiber, Drei | SPECIAL | só quando o 3D É o produto (configurador, visualização em 3D, topo de marca técnica). Nunca em página de conversão direta ou de tráfego pago |
| Vanta.js | SPECIAL | cerca de 120kB porque traz o three.js embutido; usar apenas como camada secundária, no máximo 1 a 2 efeitos por página, só no desktop e com alternativa estática |
| CSS 3D ou vídeo em loop curto | APPROVED | alternativa leve, testar sempre antes de partir para WebGL |

Sempre que houver WebGL, quatro cuidados são obrigatórios: detectar a capacidade do aparelho antes
de carregar, cair para imagem ou CSS estático quando o WebGL não existir (tela em branco é site
quebrado, não site elegante), pausar a animação quando ela sai da área visível, e respeitar
`prefers-reduced-motion` para quem configurou o aparelho pedindo menos movimento.

## Conferência visual e desempenho

| Ferramenta ou prática | Status | Nota |
|---|---|---|
| Conferência visual antes de publicar | CORE | contraste do texto em fundo claro e em fundo escuro, equilíbrio da chamada quando ela ocupa 2 linhas (nunca deixar uma palavra sozinha na última linha), leitura nos 3 tamanhos de tela: celular, tablet e desktop. Nada vai para o ar sem passar por isso |
| Playwright (captura de tela e comparação visual) | APPROVED quando existir biblioteca compartilhada | exagero para uma página isolada, vale quando houver componente reaproveitado entre vários projetos |
| axe-core | APPROVED | automatiza parte da checagem de acessibilidade; a revisão manual de teclado e leitor de tela continua necessária |
| Storybook | EVITAR no contexto atual | página HTML solta, sem componente reaproveitado, não justifica o custo de manter |
| Lighthouse e Core Web Vitals | CORE | limites de 2026: LCP até 2,5s, INP até 200ms, CLS até 0,1 |

Em linguagem de gente, os três limites acima medem: quanto tempo até a página mostrar o conteúdo
principal (LCP), quanto ela demora para responder ao primeiro clique ou toque (INP), e o quanto
ela dança e empurra os elementos enquanto carrega (CLS). Passar desses números é perder venda por
impaciência, não por falta de argumento.

## Orçamento de peso da página (referência para página de venda)

- Total até 1MB, teto absoluto de 2MB.
- JavaScript de 300 a 500KB comprimido, no máximo.
- Imagem até 1MB, em AVIF ou WebP, com carregamento sob demanda.
- Fonte de 100 a 200KB, com subset agressivo (só os caracteres usados) e formato woff2.

Cor, fonte e espaçamento saem do arquivo `templates/DESIGN-SYSTEM-CENTRAL.md` e viram variáveis de
CSS rodando `node templates/design-tokens/build.js`. Nenhum valor visual fica solto no código: se
está solto, uma hora alguém muda a marca e metade do material continua com a cor antiga.
