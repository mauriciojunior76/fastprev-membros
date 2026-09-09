# Governança de dados

Como a informação nasce, vive, se move e morre dentro do ZEUS.

## Ciclo de vida de uma informação

```
   você conta ou o sistema descobre
                |
      classificar: qual camada, qual tipo
                |
   gravar em memory/ com frontmatter completo
                |
        entrar no índice
                |
   +------------+------------+
   |                         |
espelhar para a Vault    ficar só no repositório
(se não for sensível)    (se for sensível)
   |                         |
   +------------+------------+
                |
       usar nas entregas
                |
    revisar na data de validade
                |
   +------------+------------+
   |                         |
atualizar                arquivar em _arquivo/
(continua válida)        (superada, nunca apagada)
```

## As 12 camadas

Toda informação pertence a exatamente uma: identidade, empresa, comercial,
público, posicionamento, branding, comunicação, projetos, operacional,
estratégica, histórica, preferências.

Duas marcações atravessam todas: `temporária` (vive só na sessão) e
`sensível` (proteção extra).

Detalhe em `core/memoria-schema/FRONTMATTER.md`.

## Os 7 tipos, e por que a distinção é a regra mais importante

| Tipo | Origem | Vira regra? |
|---|---|---|
| fato | Verificado em uma fonte | Sim |
| declaração | Você disse | Sim |
| hipótese | Suposição não testada | Não |
| inferência | O ZEUS deduziu | Só com sua confirmação |
| preferência | Seu gosto | Sim, como preferência |
| decisão | Escolha tomada | Sim |
| regra | Lei de comportamento | Já é |

Promover um tipo para outro é sempre explícito e comunicado. Uma inferência
que vira regra em silêncio contamina todas as decisões seguintes com aparência
de embasamento.

## Níveis de sensibilidade

| Nível | O que é | Tratamento |
|---|---|---|
| normal | Informação de trabalho | Espelha para a Vault, uso livre |
| sensível | Dado de terceiro, financeiro, estratégico | Não espelha, não sai sem autorização |
| secreto | Documento pessoal, dado de saúde, credencial | Não espelha, não aparece em exemplo, uso mínimo |

Credencial não é memória: mora no `.env`, nunca em `memory/`.

## Retenção

Nada é deletado. Informação superada vai para `memory/_arquivo/` com a data e
o motivo. Isso permite responder depois "o que a gente achava na época e por
que mudou de ideia", que é onde mora a maior parte do aprendizado real.

A exceção é você: você apaga o que quiser, quando quiser.

## Qualidade da memória

```bash
node scripts/memory-index.js --auditar
```

Aponta: arquivo sem frontmatter, campo obrigatório faltando, nome divergente,
memória vencida (passou da data de revisão) e índice acima do teto.

Rode de vez em quando. Memória desatualizada é pior que memória ausente:
ausente o sistema pergunta, desatualizada ele afirma com confiança.

## Uma casa por assunto

Cada tema tem exatamente um arquivo dono. Nenhum outro arquivo copia esse
conteúdo: aponta com `[[nome-do-arquivo]]`.

POR QUÊ: duas cópias do mesmo assunto divergem com o tempo. A partir daí o
sistema tem duas verdades e escolhe a errada na hora errada.

## Fluxo de dado para fora

Nenhuma informação sai da máquina sem passar por três perguntas:

1. Contém dado sensível ou de terceiro?
2. Você autorizou este serviço para este tipo de dado?
3. Dá para resolver sem enviar, ou enviando menos?

Se a primeira for sim e a segunda for não, o ZEUS para e pergunta.
