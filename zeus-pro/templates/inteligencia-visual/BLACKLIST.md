# BLACKLIST: os sinais de "cara de IA" (nunca fazer)

STATUS: conhecimento sob demanda. Leia quando o assunto for aparência de página, aplicativo, painel ou peça visual, e antes de aprovar qualquer tela. O mapa geral dos modulos está em `templates/inteligencia-visual/INDEX.md`.

Levantamento feito em agosto/2026.

## Por que isso acontece

Todo modelo de IA entrega a MÉDIA estatística do que viu no treino. Quando ninguém decide a cor, a fonte ou a composição, o resultado é a mediana do que já existe na internet, e a mediana tem uma cara só. Foi por isso que a expressão "cara de IA" virou um julgamento de qualidade: quem olha não sabe explicar o motivo, mas reconhece na hora que aquilo não foi decidido por ninguém.

A defesa é sempre a mesma: TOMAR a decisão (cor, fonte, layout, espaçamento) em vez de aceitar o que o framework já vem propondo. O raciocínio completo está em `templates/inteligencia-visual/FOUNDATIONS.md`.

A lista abaixo é o inventário do que denuncia. São 20 itens. Cada um deles, sozinho, já é suficiente pra queimar a percepção da peça inteira.

## Cor e efeito (evitar sempre)

1. Gradiente roxo para azul (indigo-500 a purple-600, tipo `#6366F1` a `#8B5CF6`). É o sinal número 1 de site feito por IA. A origem é o padrão do Tailwind UI, no ar desde 2019, e desde então foi copiado tantas vezes que hoje funciona como carimbo.
2. Modo escuro automático com neon (ciano ou violeta) sobre fundo escuro, mais brilho na borda dos cards. Parece futurista por 3 segundos e genérico pelo resto do tempo.
3. Glassmorphism (vidro fosco) em tudo, esferas de gradiente flutuando no fundo, formas 3D abstratas sem propósito nenhum. Efeito que não explica nada só ocupa espaço.
4. Fundo branco puro ou preto puro, sem nenhuma profundidade e sem nenhum tom da marca por baixo. Branco puro é ausência de escolha, não é limpeza.
5. Paleta cinza padrão do shadcn somada ao azul padrão do Tailwind, sem NENHUMA cor própria de quem está sendo apresentado. A cor da marca é definida em `templates/design-tokens/` e gerada com `node templates/design-tokens/build.js`. Se a peça não passa por ali, ela vai nascer com a cor de todo mundo.

## Layout (evitar sempre)

6. Topo (hero) centralizado gigante, com uma etiqueta pequena em cima do título e um botão indigo embaixo. É a composição mais repetida da internet nos últimos anos.
7. Exatamente 3 cards de recurso em fileira, cantos arredondados, ícone de linha fina em cima, sempre no mesmo desenho. Três é o número que a IA escolhe quando não sabe quantos deveriam ser.
8. Estrutura sempre igual: topo, recursos, prova social, preços, perguntas frequentes, rodapé, tudo centralizado, sem nenhuma variação de composição entre as seções. Se todas as seções respiram igual, a página não tem ritmo.
9. "Cardocalipse": card dentro de card dentro de card, tudo virando card por hábito. Card é uma decisão de agrupamento, não o formato natural de qualquer conteúdo.
10. Bento grid (aquele mosaico de blocos de tamanhos diferentes) sem diferença real de importância entre os itens, usado só porque está na moda. O tamanho do bloco tem que significar peso, senão é decoração.
11. Espaçamento arbitrário (13px, 37px) sem relação com uma escala de 8 pontos. Detalhe em `templates/inteligencia-visual/LAYOUT.md`.

## Componentes (evitar sempre)

12. `rounded-2xl shadow-lg p-6` aplicado em todo card igual, sem nenhuma variação proposital de raio. Um raio único pra tudo é o mesmo que não ter escolhido raio nenhum.
13. Sombra suave idêntica (opacidade baixa) espalhada em tudo, sem hierarquia de profundidade. Se tudo flutua na mesma altura, nada está em destaque.
14. Ícone de linha fina genérico, daqueles que serviriam pra qualquer produto e não dizem nada sobre este. E emoji no lugar de ícone em contexto profissional.
15. Faixa colorida decorativa de 3 a 4px na lateral do card sem função nenhuma. Ou aquela faixa comunica um estado (alerta, sucesso, categoria) ou ela é enfeite.

## Tipografia (evitar sempre)

16. Inter (ou Roboto, Poppins, Geist) em tudo, sem intenção, com `font-bold` apenas nos títulos e o resto no padrão do framework. Não é que essas fontes sejam ruins: é que elas são a escolha de quem não escolheu.
17. Tamanho de texto arbitrário, sem escala definida. E monospace decorativo em palavra solta, sem que aquilo seja um dado de verdade (código, número, identificador).

## Copy (mesmo não sendo o foco deste modulo, denuncia junto com o visual)

18. Frase abrindo com "Empower", "Unlock", "Transform" (o clássico "Unlock your potential"). Em português, o equivalente é "Transforme seu potencial", "Desbloqueie resultados".
19. Título de card com 2 substantivos abstratos ("Seamless Integration", "Integração perfeita") sem dizer o que a coisa faz na prática.
20. "Feito para times modernos" e nenhum número, nenhuma afirmação concreta em volta.

## O que fazer no lugar (resumo, detalhe nos outros modulos)

- COR: no máximo 3 tons, com a regra 60/30/10 (60% de base, 30% de apoio, 10% de destaque). A cor nasce do significado da marca, nunca do padrão do framework. Ver `templates/inteligencia-visual/LAYOUT.md` e `templates/inteligencia-visual/TYPOGRAPHY.md`.
- TIPOGRAFIA COMO PROTAGONISTA: um par de fontes escolhido pra esta peça (uma de display, pros títulos, uma de texto), escala matemática real, e uma chamada confiante carregando a página. Quando a tipografia é forte, o gradiente vira dispensável. Linear e Stripe são referência de execução, nunca de clone.
- ASSIMETRIA INTENCIONAL em vez de tudo centralizado. Ver `templates/inteligencia-visual/LAYOUT.md`.
- PROFUNDIDADE por espaço e deslocamento antes de sombra. Borda só quando ela significa alguma coisa. Ver `templates/inteligencia-visual/MATERIALS.md`.
- IMAGEM PRÓPRIA: a interface real do produto no topo da página, ou uma ilustração autoral com ponto de vista. Nunca aquele mockup abstrato genérico de banco de imagens.
- COPY com número real e tom de gente, nunca a lista de verbos vazios dos itens 18 a 20. Todo texto persuasivo passa pela régua de copy da operação antes de entrar na peça.

## Os 2 testes práticos antes de aprovar qualquer peça

TESTE DO SÓSIA: reduza a tela a uma silhueta preto e branco de 200px de largura e coloque ao lado da mesma silhueta de um concorrente. Se você não consegue reconhecer qual é a sua, a estrutura é genérica demais. Não adianta ajustar cor: o problema está na composição.

AUDITORIA DE DECISÃO: para cada escolha da peça (fonte, cor, layout, componente, espaçamento), pergunte "alguém decidiu isso ou veio por padrão?". Tudo que veio por padrão é candidato imediato a troca. Este é o teste mais rápido e o que mais devolve resultado.

## Verificações antes de publicar

Estas duas conferências separam a peça pronta da peça quase pronta:

1. CONTRASTE NOS 3 TAMANHOS DE TELA. Abra a página no celular, no tablet e no computador e confira se todo texto continua legível sobre o fundo, inclusive nas seções claras e nas escuras. Texto cinza claro sobre fundo claro é o defeito mais comum e o mais fácil de deixar passar.
2. EQUILÍBRIO DA CHAMADA EM 2 LINHAS. Toda chamada de destaque que ocupa duas linhas ou mais precisa ter linhas de tamanho parecido. Uma palavra sozinha na última linha é defeito. Se não equilibra quebrando a frase em outro ponto, corte palavras da linha maior até os blocos ficarem próximos. Confira no tamanho real da tela, nunca só no código.
