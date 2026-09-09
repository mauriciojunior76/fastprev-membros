# FOUNDATIONS: o processo mental antes de desenhar qualquer coisa

STATUS: conhecimento sob demanda. Este arquivo é lido quando o assunto aparece (tela nova, página nova, escolha de linguagem visual, dúvida de densidade), não em toda sessão. O mapa geral dos módulos de inteligência visual está em `templates/inteligencia-visual/INDEX.md`.

A maior parte das telas que parecem "feitas por robô" não sofre de falta de talento visual, sofre de falta de decisão. Quando ninguém decide a paleta, a fonte, o raio de canto, o tom e o modo visual antes de começar, o resultado escorrega para a média de tudo que já existe na internet. Média é exatamente o que dá aquela sensação de genérico. Este módulo existe para forçar a decisão antes da execução.

## As 16 perguntas (rodar mentalmente antes de abrir o editor)

1. Qual é o objetivo desta tela. Uma frase, sem enrolação. Se não couber em uma frase, a tela está tentando fazer duas coisas.
2. Quem é o usuário e o quanto ele já sabe do assunto. A escala prática vai do C0 (nem sabe que tem o problema) ao C4 (já conhece a sua solução e só está comparando preço). Quem fala com C0 precisa de contexto e história; quem fala com C4 precisa de oferta e prova, o resto atrapalha.
3. Qual é a ação principal, a única que importa. Se existem três botões com o mesmo peso visual, não existe ação principal.
4. Qual informação tem prioridade sobre as demais. Hierarquia é escolha, não acidente: alguma coisa precisa ser claramente maior, mais forte ou mais isolada que o resto.
5. Qual densidade cabe aqui. Página de venda respira, painel de controle é denso. Ver a seção "Fronteira" abaixo.
6. Qual linguagem visual faz sentido. Ver "Modos visuais" abaixo.
7. Quais componentes são realmente necessários, não quais existem numa biblioteca. Ter o componente disponível não é motivo para usá-lo.
8. Que movimento de fato ajuda a entender alguma coisa, e não apenas decora. Animação que não explica nada é ruído com custo de carregamento.
9. Existe necessidade real de vidro (o efeito translúcido). Ver `templates/inteligencia-visual/MATERIALS.md`.
10. Existe necessidade real de desfoque de fundo.
11. Existe necessidade real de WebGL, ou seja, gráfico 3D rodando na página. Quase sempre a resposta é não. Ver `templates/inteligencia-visual/PATTERN-REGISTRY.md`.
12. Como fica no celular, em tela de 375px de largura. Não "como fica menor", e sim o que sai da frente e o que continua legível.
13. Como funciona só de teclado. Quem navega por tabulação precisa chegar na ação principal e enxergar onde está o foco.
14. Como funciona para quem pediu menos animação no próprio aparelho (a preferência `prefers-reduced-motion`). Isso é acessibilidade, não detalhe: para parte das pessoas, movimento em excesso causa mal estar físico.
15. Qual o custo de desempenho desta escolha. Ver `templates/inteligencia-visual/MOTION.md` e a nota sobre desfoque de fundo (`backdrop-filter`), que é um dos efeitos mais caros que existem em página.
16. Esta tela parece um produto profissional ou uma demonstração de biblioteca de efeito. Se parece vitrine de efeito, o efeito virou o assunto e o produto sumiu.

Se a resposta de qualquer pergunta for "não sei, só ficou bonito", ali existe uma decisão que não foi tomada. Ver `templates/inteligencia-visual/BLACKLIST.md`: decisão que não foi tomada vira média estatística, e média é a cara de conteúdo gerado por inteligência artificial sem direção.

## Fronteira: página de venda contra aplicativo

Emoção e velocidade disputam atenção de formas diferentes. Nunca misturar a linguagem das duas. Página de venda existe para convencer alguém que ainda não decidiu; aplicativo existe para alguém que já decidiu e agora quer terminar a tarefa rápido.

| | Página de venda, deck, área pública | Aplicativo interno, painel, área de membros, ferramenta |
|---|---|---|
| Objetivo | Converter, convencer, emocionar | Executar tarefa rápido, sem fricção |
| Densidade | Baixa, respiro generoso | Alta, informação por área de tela |
| Movimento | Cinematográfico, narrativo, animação ligada à rolagem (ver `templates/inteligencia-visual/MOTION.md`) | Mínimo, apenas resposta rápida de estado, de 100 a 200ms |
| Tipografia | Display forte, hierarquia dramática | Corpo estável, hierarquia funcional |
| Cor | Gradiente de marca, escuro premium (padrão da casa) | Neutro de biblioteca de componentes, cor só como estado (erro, sucesso, alerta) |
| Referência | `templates/DESIGN-SYSTEM-CENTRAL.md` e os tokens em `templates/design-tokens/` (gerados com `node templates/design-tokens/build.js`) | `templates/inteligencia-visual/APPS-DASHBOARDS.md` e a regra de interface interna do dono |

Nunca aplicar botão de venda, textura granulada de fundo ou gradiente de marca dentro de um painel interno. Nunca aplicar densidade de tabela numa página de venda. Quando as duas linguagens se misturam, a página de venda fica fria e o painel fica lento de ler.

## Modos visuais (linguagem inteira, não paleta)

Trocar de modo não é trocar de cor. É mudar grade, tipografia, espaçamento, movimento e imagem, tudo junto e no mesmo sentido.

- **Escuro premium** (padrão da casa hoje): fundo quase preto, levemente tingido, gradiente monocromático, textura granulada sutil, entrada de elementos por volta de 1,3s subindo poucos pixels. Fonte: `templates/DESIGN-SYSTEM-CENTRAL.md`.
- **Minimalismo tipo Apple**: uma única família tipográfica, hierarquia feita por peso da fonte, espaço generoso em grade de 8 pontos, vidro somente na camada funcional (barra, menu, painel flutuante) e nunca no conteúdo, movimento com resposta elástica sem quicar. Fonte: `templates/inteligencia-visual/MATERIALS.md`.
- **Editorial**: tipografia com serifa, grande, como protagonista, colunas assimétricas, muito espaço vazio, quase nenhum componente decorativo. Excelente para autoridade e conteúdo longo de leitura.
- **Dados intensivos**: densidade alta, números alinhados em coluna (numeração tabular), cor usada apenas como sinal, movimento quase zero. É a base do `templates/inteligencia-visual/APPS-DASHBOARDS.md`.
- **Tecnologia moderna, tipo SaaS**: fontes de grade neutra como Inter ou Geist, uma cor de marca única sobre fundo neutro, componentes de biblioteca padronizada, blocos em mosaico usados com propósito e não como enfeite.
- **Luxo e autoridade**: serifa clássica (Playfair e parentes), preto com dourado ou preto e branco puro, quase nenhuma animação, silêncio visual funcionando como sinal de status.

Escolher 1 modo por entrega e sustentar do início ao fim. Misturar 2 modos na mesma peça é o sintoma número 1 de trabalho "feito por partes, sem direção única". Ver `templates/inteligencia-visual/BLACKLIST.md`, nos itens de estrutura previsível e falta de decisão.

## Conferência antes de entregar

As perguntas 12, 13 e 14 não são teoria, viram conferência prática no fim do trabalho:

- Abrir a peça nos 3 tamanhos de tela (celular, tablet, computador) e conferir contraste e legibilidade em cada um, no tema claro e no escuro se os dois existirem.
- Conferir o equilíbrio da chamada principal quando ela ocupa 2 linhas: as duas linhas precisam ter tamanho parecido, e nunca sobrar uma palavra solta na última linha.
- Navegar a tela só com o teclado até a ação principal, olhando se o foco fica visível.
- Testar com a preferência de menos animação ligada e confirmar que a tela continua utilizável, sem elementos que só aparecem quando a animação roda.

## Regra final

Fixar a decisão (paleta, fonte, raio de canto, tom e modo visual) ANTES de implementar, mesmo que seja só na cabeça, mesmo que leve dois minutos. Sem isso, a peça sempre volta para a média do que já foi visto, que é exatamente o problema que este módulo existe para resolver.

*Levantamento de referência consolidado em agosto de 2026.*
