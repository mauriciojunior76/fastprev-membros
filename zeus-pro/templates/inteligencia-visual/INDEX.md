# INTELIGÊNCIA VISUAL: o mapa

STATUS: conhecimento sob demanda. Cada módulo é lido quando o assunto aparece, nunca todos de uma vez.

O Design System Central (`templates/DESIGN-SYSTEM-CENTRAL.md`) guarda a SUA marca: cor,
fonte, forma. Esta pasta guarda o CRITÉRIO: quando usar cada coisa, e por quê.

Um responde "qual é o meu azul". O outro responde "esse azul deve aparecer aqui?".

Levantamento feito em agosto de 2026, sobre documentação oficial de navegador, diretrizes
de interface da Apple e o estado real das bibliotecas de mercado. Não é opinião de gosto:
é o critério que separa uma peça que parece produto de uma peça que parece gerada.

## Antes de criar qualquer tela

Ler `FOUNDATIONS.md`. São 16 perguntas que substituem o hábito de pegar um modelo pronto e
enfeitar. É o único módulo que se lê SEMPRE.

## Qual módulo ler para qual dúvida

| Preciso de... | Ler |
|---|---|
| Processo de decisão, modos visuais, diferença entre página de venda e aplicativo | `FOUNDATIONS.md` |
| Saber se uso vidro fosco, desfoque, textura, sombra, ou se não uso | `MATERIALS.md` |
| Duração e curva de animação, qual ferramenta de movimento usar | `MOTION.md` |
| Saber se um recurso visual moderno é seguro hoje ou ainda precisa de plano B | `CSS-MODERNO.md` |
| Hierarquia de texto, escala, pareamento de fonte | `TYPOGRAPHY.md` |
| Grade, espaçamento, densidade, ritmo da página | `LAYOUT.md` |
| Escolher biblioteca de interface ou de efeito, e conferir a licença | `LIBRARY-REGISTRY.md` |
| Padrão de seção ou componente, com o custo real de cada um | `PATTERN-REGISTRY.md` |
| O que NUNCA fazer, os sinais de "cara de IA" | `BLACKLIST.md` |
| Aplicativo, painel, área de membros, formulário, integração | `APPS-DASHBOARDS.md` |

## As 3 leis de convívio

1. COR E MEDIDA VÊM DOS TOKENS, nunca inventadas na peça. A fonte é
   `templates/design-tokens/`, gerada com `node templates/design-tokens/build.js`. Estes
   módulos explicam QUANDO e POR QUE usar; os números da sua marca vivem lá.
2. PEÇA NOVA NÃO NASCE DE CÓPIA de peça antiga. Copiar arquivo velho é como a mesma cor
   vira cinco valores diferentes espalhados pelo material, e a identidade se degrada sem
   ninguém perceber.
3. ESTES MÓDULOS INFORMAM A DECISÃO, não substituem a sua aprovação. Quem diz se ficou bom
   é você olhando a peça pronta, nos três tamanhos de tela.

## O teste rápido antes de aprovar qualquer coisa

Reduza a tela a uma silhueta em preto e branco, do tamanho de uma miniatura, e coloque ao
lado de um concorrente. Dá para reconhecer qual é a sua? Se não dá, a estrutura está
genérica: abra o `BLACKLIST.md` antes de entregar.
