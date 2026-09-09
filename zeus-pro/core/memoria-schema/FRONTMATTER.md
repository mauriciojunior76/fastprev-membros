# Esquema canônico de memória

Todo arquivo em `memory/` obedece a este esquema. Sem exceção.

## Frontmatter

```yaml
---
nome: slug-do-arquivo            # igual ao nome do arquivo, sem .md
descrição: Uma linha clara.      # é o que aparece no índice e decide o recall
camada: comercial                # uma das 12 camadas
tipo: fato                       # fato | declaração | hipótese | inferência | preferência | decisão | regra
origem: entrevista de boot       # de onde a informação veio
confiança: alta                  # alta | média | baixa
sensibilidade: normal            # normal | sensível | secreto
responsável: usuário             # quem é dono da informação
status: ativo                    # ativo | superado | arquivado
criado_em: AAAA-MM-DD
atualizado_em: AAAA-MM-DD
validade: null                   # data de revisão obrigatória, quando aplicável
relacionados: []                 # lista de [[outros-arquivos]]
---
```

## As 12 camadas

| Camada | Guarda | Pasta na Vault |
|---|---|---|
| identidade | Quem a pessoa é profissionalmente | 01-IDENTIDADE |
| empresa | Como o negócio funciona | 02-EMPRESA |
| comercial | Produtos, serviços, ofertas, objeções | 03-PRODUTOS |
| público | Quem ela atende e quem não atende | 04-PUBLICOS |
| posicionamento | Como quer ser percebida | 05-POSICIONAMENTO |
| branding | Identidade visual e aplicação | 06-BRANDING |
| comunicação | Estilo, tom, palavras | 07-COMUNICACAO |
| projetos | Estado, escopo, próximos passos | 08-PROJETOS |
| operacional | Processos, ferramentas, rotinas | 09-PROCESSOS |
| estratégica | Objetivos, prioridades, decisões | 14-DECISOES |
| histórica | Diários e o que aconteceu | 15-DIARIOS |
| preferências | Gostos de formato e interação | 20-SISTEMA |

Duas camadas não têm pasta porque não são conteúdo permanente:

- temporária: vive só na sessão, nunca vira arquivo.
- sensível: é uma MARCAÇÃO (campo `sensibilidade`), não uma pasta. Pode estar
  em qualquer camada.

## Os 7 tipos, e por que a distinção existe

| Tipo | O que é | Pode virar regra? |
|---|---|---|
| fato | Verificável em uma fonte, com a fonte anotada | Sim |
| declaração | O usuário disse. Verdade operacional | Sim |
| hipótese | Suposição ainda não testada | Não, até virar fato |
| inferência | Você deduziu | Só com confirmação explícita |
| preferência | Gosto, não certo nem errado | Sim, como preferência |
| decisão | Escolha tomada, com data e motivo | Sim |
| regra | Lei permanente de comportamento | Já é |

Promoção de tipo é sempre explícita e comunicada: "essa hipótese virou fato,
porque o dado X confirmou".

## Corpo do arquivo

Markdown livre. Recomendado: título, contexto em uma frase, o conteúdo em
seções curtas, e uma seção final de "o que ainda não sei sobre isso".

Links entre memórias com `[[nome-do-arquivo]]`. Link para arquivo que ainda não
existe é aceitável: marca o que vale escrever depois.

## Arquivos especiais de `memory/`

| Arquivo | Papel |
|---|---|
| `PERFIL.md` | O dono da instalação. Sua existência indica que o boot já rodou |
| `INDICE.md` | Índice de tudo, teto de 15.000 caracteres |
| `LACUNAS-DE-CONHECIMENTO.md` | O que ainda falta descobrir |
| `APRENDIZADOS.md` | Erros com causa raiz e acertos com padrão |
| `DIARIO-DE-BORDO-INICIAL.md` | A foto do dia da instalação |
| `diarios/AAAA-MM-DD.md` | Diário contínuo |
| `_arquivo/` | Camada fria, nunca carrega, nunca se perde |
