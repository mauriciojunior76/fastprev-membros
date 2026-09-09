# MOTION: quando animar, quanto tempo, com o quê

STATUS: conhecimento sob demanda. Este arquivo não fica carregado o tempo todo, ele é lido quando o
assunto aparece (animação, transição, scroll, abertura de página, apresentação em movimento). O mapa
geral dos módulos de inteligência visual está em `templates/inteligencia-visual/INDEX.md`.

## As bibliotecas recomendadas e por que são estas

Levantamento de agosto/2026, e a conclusão continua valendo: a combinação abaixo é a mais capaz do
mercado e não custa nada.

- GSAP 3.15.0, com os complementos ScrollTrigger, Flip e SplitText. É o motor que executa a
  animação: encadeia vários movimentos numa linha do tempo, prende uma seção enquanto a pessoa
  rola, faz um elemento sair de um lugar e chegar em outro sem cortar, e quebra um título em letras
  ou palavras para entrarem em sequência.
- Lenis 1.3.25. É o que dá aquela sensação de rolagem macia e cara nas páginas.

Desde abril/2025 o GSAP é incluso por completo, inclusive uso comercial, porque foi comprado pela
Webflow. Não existe mais versão paga a perseguir.

Única atualização pendente: subir o Lenis para 1.3.26 na próxima vez que as bibliotecas do projeto
forem tocadas. O ganho é concreto: a versão nova respeita sozinha a configuração de quem pediu menos
movimento no próprio aparelho.

## Motion nunca é decoração

Movimento existe para fazer trabalho, e o trabalho é sempre um destes:

- mostrar causa e efeito (a pessoa clicou aqui, então aquilo abriu)
- preservar o contexto entre um estado e outro, para ninguém se perder
- mostrar hierarquia, ou seja, o que é principal e o que é apoio
- dar retorno imediato de que a ação foi registrada
- explicar uma mudança de estado
- guiar a atenção para onde ela precisa ir
- aumentar a percepção de qualidade
- reduzir a sensação de espera

Regra dura acima de todas: motion NUNCA atrasa a ação do usuário. Se a animação está no caminho de
algo que a pessoa quer fazer agora, ela é curta o suficiente para não incomodar ou é pulável. Beleza
que faz esperar vira irritação, e irritação em página de venda custa dinheiro.

## Escala de duração por tipo de interação

| Tipo | Duração | Uso |
|---|---|---|
| Micro (hover, liga e desliga, botão) | 100 a 200ms | retorno de estado, sempre no momento em que o dedo ou o mouse aperta, não só quando solta |
| Transição de interface (janela sobreposta, menu que abre, troca de tela) | 200 a 400ms na entrada | a saída é sempre mais rápida, 150 a 250ms |
| Cinematográfico (topo da página, entrada de seção, narrativa visual) | 500 a 1200ms, com atraso de 30 a 80ms entre elementos | referência prática: 1,3s de duração com 0,12s entre os elementos fica na faixa e funciona bem |

Por que a saída é mais rápida que a entrada: entrar é apresentar algo novo, e a pessoa precisa de
tempo para perceber. Sair é remover algo que ela já não quer, e esperar por isso é frustrante.

O atraso entre elementos (o efeito de "um depois do outro") é o que separa entrada elegante de
entrada bagunçada. Abaixo de 30ms parece tudo junto, acima de 80ms a lista parece lenta.

Os tempos base já ficam guardados como variável em `templates/design-tokens/core.json`, no bloco
`transicoes` (`rapida`, `media`, `lenta`). Depois de mexer nesse arquivo, rode
`node templates/design-tokens/build.js` para gerar o CSS de novo. Nunca edite o CSS gerado na mão,
porque ele é sobrescrito no próximo build.

## Easings, a curva de aceleração

Easing é a curva de velocidade da animação: como ela acelera e como freia. É o que faz o movimento
parecer natural em vez de mecânico.

- Entrada: ease-out, ou seja, começa rápido e desacelera ao chegar. Use
  `cubic-bezier(0.22, 1, 0.36, 1)`, ou `power2.out` e `power3.out` quando estiver no GSAP. Os
  easings ficam tokenizados em `templates/design-tokens/core.json`, bloco `transicoes`: os valores
  neutros que já vêm no arquivo servem para interface, e a curva mais pronunciada acima é a que dá o
  ar cinematográfico em topo de página e entrada de seção.
- Saída: ease-in curto. O elemento acelera enquanto some, e some rápido.
- Movimento dentro da tela, de um ponto ao outro: ease-in-out.
- Interação que segue gesto ou arrasto: spring, mas sem quicar em contexto de interface. O padrão
  Apple é spring criticamente amortecido, com resposta de 0,3 a 0,4s. Quique só depois de um gesto
  físico de verdade, nunca por enfeite.
- Linear (velocidade constante, sem aceleração): só em faixa de texto correndo, barra de progresso e
  qualquer coisa presa à rolagem da página. Nesses casos o próprio movimento do dedo já é a curva.

## Qual ferramenta usar

| Ferramenta | Quando | Custo |
|---|---|---|
| GSAP + ScrollTrigger (o padrão) | Linha do tempo complexa, narrativa que se desenrola conforme a rolagem, título quebrado em partes, coreografia de vários elementos | cerca de 45 a 55kB com os três complementos, e já está pago (é incluso) |
| Lenis | Rolagem macia em página de venda ou apresentação com estética premium | cerca de 4kB, conversa nativamente com o ScrollTrigger |
| View Transitions (dentro da mesma página) | Troca de estado ou navegação em que um elemento se transforma em outro | zero peso adicional, funciona em todos os navegadores atuais; usar como melhoria opcional, checando antes se o navegador suporta (`document.startViewTransition`) |
| Animações CSS presas à rolagem | Barra de progresso, entrada suave leve, paralaxe discreta | zero peso adicional e roda fora da linha principal do navegador, então não engasga; o Firefox ainda não suporta por completo, então é melhoria opcional, nunca o único caminho |
| Web Animations API | Micro-interação pontual em código puro, sem carregar biblioteca nenhuma | nativa do navegador, mas não tem um bom controle de sequência entre elementos; só para o simples |
| Motion (antigo Framer Motion) | Só se nascer um projeto em React com animação de layout amarrada ao estado da tela | não adicionar ao conjunto atual, seria repetir o que o GSAP já faz |

Para coreografia séria de rolagem (prender a seção, amarrar a animação ao movimento do dedo, linha
do tempo com vários passos), o ScrollTrigger continua sendo a resposta em 2026. O recurso nativo do
navegador ainda não substitui.

## Respeitar quem pediu menos movimento é obrigatório, sempre

Existe uma configuração no celular e no computador em que a pessoa pede menos animação. Quem liga
isso normalmente tem enxaqueca, labirintite, sensibilidade vestibular ou simplesmente enjoa. Ignorar
esse pedido passa mal de verdade, não é frescura.

Como atender:

- No GSAP, usar `gsap.matchMedia()` com essa condição. A versão reduzida troca movimento por simples
  aparecer e sumir de opacidade.
- Matar paralaxe, reprodução automática e rolagem macia nessa versão (o Lenis 1.3.26 já desliga
  sozinho).
- View Transitions e animações CSS presas à rolagem também precisam do bloco
  `@media (prefers-reduced-motion: reduce)`.

Página sem isso não passa no checklist de acessibilidade e não deve ir para o ar.

## A regra dura do reveal de página

Entrada de elemento em página: SOMENTE deslocamento vertical (`translateY`). Nunca entrada lateral,
nunca crescer ou encolher (`scale`), nunca desfoque (`blur`).

Única exceção aprovada para o desfoque na entrada: o padrão de apresentação do dono, onde ele é
usado de propósito e num ambiente controlado.

Por que a proibição é dura: desfoque na entrada causa falha de desenho da tela no celular, com
elemento piscando ou ficando borrado de vez. E quando se avisa o navegador para preparar o desenho
antecipado junto com desfoque, ele cria camadas de processamento gráfico que brigam entre si. O
resultado é travamento em aparelho intermediário, justamente o que a maior parte do público usa.

Esta regra vale junto com o resto das decisões visuais do projeto, que ficam em
`templates/DESIGN-SYSTEM-CENTRAL.md`.

## Conferência antes de publicar

Passar o olho nestes cinco pontos, sempre no aparelho real, nunca só no código:

1. A versão com movimento reduzido existe e funciona.
2. Cada animação está dentro da faixa de duração da tabela acima.
3. A saída está mais rápida que a entrada.
4. As entradas de seção usam só deslocamento vertical.
5. Nenhuma animação segura uma ação que a pessoa quer fazer agora.

Falhar em qualquer um dos cinco significa que a página ainda não está pronta, mesmo parecendo bonita
na tela grande.
