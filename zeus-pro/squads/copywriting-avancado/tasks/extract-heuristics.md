---
task: extractHeuristics()
responsavel: "@copy-chief"
apoio: "@hook-warlord + @eugene-schwartz-agent"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada: uma peça de referência (nossa ou de terceiro) que merece ser estudada.
Saída: a engenharia dela desmontada em 8 campos, pronta para virar matriz de peça nova.
---

# TASK: EXTRAIR A ENGENHARIA DE UMA REFERÊNCIA

## STATUS: criada em 11/08/2026, junto com a aula "Copy para Vender Mentoria".

## A LEI DESTA TASK

NÃO COPIE A FRASE. DESCUBRA A ENGENHARIA.

Copiar a frase te dá uma peça. Entender por que ela funcionou te dá todas as próximas. Referência copiada ao pé da letra vira imitação genérica, porque o que fez ela funcionar era o contexto, não as palavras.

## QUANDO RODAR

- Antes de usar qualquer referência como base de uma peça nova.
- Ao registrar uma copy campeã nossa no `memory/copies-campeoes.md` (o bloco DIAGNÓSTICO daquele arquivo é a saída desta task).
- Quando o o dono do canal mandar um anúncio de terceiro dizendo "olha esse aqui".
- Em lote, ao montar o banco de referências de um nicho novo.

## PASSO 0: A REFERÊNCIA MERECE SER ESTUDADA?

Antes de gastar tempo, checar o sinal de validação. Sem sinal nenhum, a peça é gosto pessoal, não referência.

| Origem | Sinal que valida |
|---|---|
| Nossa | número medido no Meta: gasto, custo por lead, reunião, venda, com data |
| Terceiro | tempo no ar (biblioteca de anúncios mostra desde quando roda), volume de variações da mesma peça, marca que a gente sabe que investe pesado |
| Nenhum sinal | anotar como HIPÓTESE e seguir, nunca chamar de campeã |

Copy bonita não é copy validada. O mercado valida, o estrategista interpreta, a IA multiplica.

## PRIORIDADE DE COLETA: QUEM VENDEU, NÃO QUEM ENGAJOU (aula de 11/08/2026)

Ao montar o banco de referências, a ordem de prioridade é:

1. Anúncio que VENDEU (tem venda atribuída).
2. Anúncio que gerou reunião marcada.
3. Anúncio que gerou lead.
4. Anúncio com engajamento alto e nenhuma das anteriores: entra como curiosidade, nunca como referência.

Dito ao vivo: priorizar os que efetivamente venderam. Lead barato com venda zero ensina a fazer mais lead barato sem venda.

## OS 8 CAMPOS DA ENGENHARIA

Desmontar a peça respondendo cada um. Resposta vaga aqui vira copy vaga depois.

1. ALVO: quem a primeira linha chama, e quem ela exclui de propósito.
2. GANCHO: qual dos 15 tipos foi usado (ver `agents/tier-1-core-pt/hook-warlord.md`) e por que ele para o scroll deste público.
3. NÍVEL DE CONSCIÊNCIA: em que degrau C0 a C4 a peça fala, e como dá para saber (quem fala de mecanismo mira C2, quem fala de oferta mira C4).
4. VMC: a peça ataca DOR ou DESEJO. Se as duas, ela está confusa e isso explica parte do resultado.
5. FERIDA: onde exatamente dói, e se dói no bolso, no status ou no tempo.
6. MECANISMO: o "por que isso funciona" que a peça apresenta. Peça sem mecanismo depende só de promessa, e promessa sozinha satura rápido.
7. PROVA: número, nome, print, autoridade. O que sustenta a promessa.
8. CTA: qual ação pede, e se ela corresponde ao estágio do lead naquele ponto do funil.

## O CAMPO 9, O MAIS IMPORTANTE

O QUE DÁ PARA ROUBAR: a estrutura, nunca o texto.

Escrever em uma frase o que é transferível para outro nicho. Exemplo real: da peça "Médico, você pode ter mais pacientes" o transferível não é "médico" nem "pacientes", é chamar a profissão na primeira palavra e prometer o volume que ela já persegue.

Se não der para escrever essa frase, a engenharia não foi entendida, só descrita.

## SAÍDA DA TASK

Bloco com os 9 campos preenchidos, mais um veredito de 1 frase: vale virar matriz, vale como inspiração de gancho, ou não vale nada e por quê.

Quando a referência for nossa e tiver número, o resultado desta task vai direto para o bloco DIAGNÓSTICO em `memory/copies-campeoes.md`. Quando for de terceiro, vai para a seção REFERÊNCIAS EXTERNAS do mesmo arquivo.

## GATE

Nunca gerar peça nova "baseada em" uma referência sem ter rodado esta task antes. Sem a engenharia na mão, o que sai é paráfrase, e paráfrase de campeã alheia costuma performar pior que original honesta.
