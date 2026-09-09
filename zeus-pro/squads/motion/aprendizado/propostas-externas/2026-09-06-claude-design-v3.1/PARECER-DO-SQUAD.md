# Parecer do squad sobre o pacote v3.1

Auditado em 06/09/2026 contra as 5 entregas pedidas em
`squads/motion-apple/docs/PROMPT-CLAUDE-DESIGN-ESPECIFICAR-MOLDES.md`.
Medido com script, não lido por cima.

## Resolvido

**1. Especificação por molde.** `moldes-specs.json` traz 40 moldes no formato
exato que foi pedido (os 15 campos), e `registry/build-registry.json` cobre
**81 de 81** do índice, via `identidade.legacyId`. Nenhum molde ficou de fora.
Cada entrada tem `geometry`, `layers`, `timeline` em quadros relativos à
palavra âncora, `contract` com props tipadas (min/ideal/max) e `checks` com
condições verificáveis por script. Status honesto por entrada: 46 `completo`,
41 `derivado-do-painel`, 0 `sem-medida`.

Isso ataca a causa raiz da reprovação de 05/09: antes o índice dava nome,
peças e gesto, e a geometria vivia só no painel HTML de 543KB.

**3. Escalas como dado.** `escalas.json` com canvas, palco, vídeo, legenda,
espaço, raio, rótulo, ícone, anel, borda, tipografia e teto de sólido preto.
O `scripts/checar-design-system.js` para de ter escala chumbada no código.

**4. Roteamento pela relação.** `registry/semantic-registry.json` com 83
estruturas de informação. Teste com as 11 falas reais da peça da Fernanda:

| caminho | acertos |
|---|---|
| gatilho lexical (`design-router.json`, agora legado) | 1 de 11 |
| estrutura semântica (`semantic-registry`) | 6 de 11 na 1a tentativa |

Dos 5 que erraram, 3 eram classificação errada MINHA, não falha do registro:
a grade de 6 conceitos é `LISTA` ou `CATEGORIAS`, e eu tinha classificado como
`X_TEM_A_B_C` (que devolve `set.trio.v1`, correto para 3 itens). Corrigida a
classificação, sobe para 9 de 11.

**5. Contrato de código.** Veio melhor do que foi pedido: em vez de um
documento genérico, cada molde tem `contract` (props, tipos, obrigatoriedade,
limites) e `checks` (condições que um script confere: altura declarada bate
com a soma, cabe no palco, portador de cor único, sem desfoque em rótulo).

## Não veio

**2. Biblioteca de objetos (lei 3b).** Nenhum arquivo. A estrutura
`ITEM_UNICO` devolve `emphasis.attribute.v1`, que é tipografia, não objeto.
Continua sem casa o caso em que a fala cita uma coisa concreta e a lei 3b do
playbook manda desenhar a coisa: a escada de produtos, a etiqueta de preço e
a isca da peça da Fernanda seguem sendo desenho à mão. É o único buraco
grande que sobrou.

## Buraco pequeno

A estrutura `PERGUNTA` devolve só interface (chat, enquete, busca). Pergunta
retórica que vira destaque tipográfico (o caso do "SEM VALIDAR", 4,94s a
9,82s) não tem candidato. `emphasis.icon-phrase.v1` aparece em `DEFINICAO`,
`FRASE_IMPORTANTE` e `PROMESSA`, mas não em `PERGUNTA`.

## Risco que precisa de decisão do o dono do canal

O pacote traz catálogo de som PRÓPRIO, com mais de 30 eventos
(`process/anel-migra`, `destaque-maximo`, `sequencia`, `trio`, `grade`).
Ele não bate com `public/_sfx/catalogo.json`, que tem 16 categorias, é
vocabulário FECHADO e cuja regra diz: "categoria nova é decisão do o dono do canal,
nunca do agente". Medido: **27 categorias usadas pelo pacote não existem no
catálogo do squad**.

Seguir os specs ao pé da letra reprova no `choreo-lint`, que é o mesmo erro
que eu cometi ao inventar `esquema-no`. Dois caminhos, e a escolha é dele:

1. tabela de tradução (evento do pacote para categoria do catálogo), mantendo
   os 6 sons aprovados e as 16 categorias;
2. ampliar o catálogo do squad, o que exige ele escolher e aprovar som novo.

Até a decisão, vale o catálogo do squad, e o campo `sound` dos specs é
tratado como sugestão, não como fonte.

## Incorporação

Segue `docs/COMO-ATUALIZAR-O-DESIGN-SYSTEM.md`: decisão provada (cicatriz de
reprovação) não muda por sugestão externa; lacuna declarada aceita a proposta
inteira; valor medido só muda com medida nova, e o código muda junto.
