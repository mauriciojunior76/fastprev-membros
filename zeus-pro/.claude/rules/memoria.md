# Memória: o que registrar, onde e como

## STATUS: SEMPRE ATIVO. Detalhe completo em `core/memoria-schema/`.

## As 3 camadas de carregamento

- CAMADA A, sempre carregada: `CLAUDE.md`, as regras de `.claude/rules/` e o
  índice `memory/INDICE.md`. Teto duro de 100.000 caracteres somados. Medir com
  `node scripts/medir-contexto.js`.
- CAMADA B, por gatilho: arquivos de `memory/` e `docs/rules-on-demand/`,
  injetados pelo roteador de contexto quando a palavra aparece.
- CAMADA C, arquivo frio: `memory/_arquivo/`. Nunca carrega, nunca se perde.

Lei: conteúdo nunca é deletado. Sai da A, vai para a B. Sai da B, vai para a C.
Da C não sai.

## As 12 camadas de conteúdo

Toda informação sobre o usuário pertence a exatamente uma destas camadas, que
correspondem às pastas da Vault:

1. Identidade: quem a pessoa é profissionalmente.
2. Empresa: como o negócio funciona.
3. Comercial: produtos, serviços, ofertas, preços, objeções.
4. Branding: identidade visual e regras de aplicação.
5. Comunicação: estilo, tom, palavras permitidas e proibidas.
6. Operacional: processos, ferramentas, rotinas, responsáveis.
7. Estratégica: objetivos, prioridades, decisões, hipóteses.
8. Projetos: estado, escopo, arquivos, próximos passos.
9. Histórica: o que aconteceu e o que resultou (diários).
10. Preferências: formato, organização, jeito de interagir.
11. Temporária: útil só para a tarefa atual, não vira permanente.
12. Sensível: exige proteção extra e nunca vai para serviço externo sem o "pode".

## Frontmatter obrigatório

Todo arquivo em `memory/` nasce com:

```yaml
---
nome: slug-do-arquivo
descricao: Uma linha. É o que aparece no índice e decide o recall.
camada: comercial          # uma das 12 acima
tipo: fato                 # fato | declaracao | hipotese | inferencia | preferencia | decisao | regra
origem: entrevista de boot # de onde veio a informação
confianca: alta            # alta | media | baixa
sensibilidade: normal      # normal | sensivel | secreto
criado_em: AAAA-MM-DD
atualizado_em: AAAA-MM-DD
validade: null             # data em que precisa ser revisto, quando aplicável
---
```

## Diferença entre os tipos (a mais importante do sistema)

- FATO: verificável em uma fonte. "O produto custa X" com print da página.
- DECLARAÇÃO: o usuário disse. Vale como verdade operacional, não como fato
  verificado.
- HIPÓTESE: alguém supôs, ainda não foi testado.
- INFERÊNCIA: você deduziu a partir de outras informações. NUNCA vira regra
  sem o usuário confirmar.
- PREFERÊNCIA: gosto do usuário, não certo nem errado.
- DECISÃO: escolha tomada, com data e motivo.
- REGRA: lei permanente de comportamento. Só nasce com confirmação explícita.

Nunca promova um tipo para outro sozinho. Hipótese confirmada por dado vira
fato, e você diz que promoveu.

## Índice `memory/INDICE.md`

Uma linha por memória, apontando, nunca duplicando conteúdo:

```
- [Rótulo curto](arquivo.md) resumo em uma frase, com o gatilho de fala quando houver.
```

Teto de 15.000 caracteres. Ao estourar, mover linhas frias para
`memory/_arquivo/INDICE-ARQUIVO.md` ANTES de adicionar linha nova.

## Quando registrar

Registre quando: o usuário disser algo que vale para amanhã; uma decisão for
tomada; uma correção acontecer; um projeto mudar de estado; um produto for
criado ou alterado. NÃO registre: o que só vale nesta conversa; o que já está
escrito em outro arquivo (aponte, não copie); detalhe de execução técnica.

## Uma casa por assunto

Cada tema tem exatamente um arquivo dono. Nenhum outro arquivo copia esse
conteúdo: aponta com `[[nome-do-arquivo]]`. Duplicata é erro, porque as duas
cópias divergem e o sistema passa a mentir.
