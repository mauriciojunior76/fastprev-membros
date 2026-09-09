# memory: a memória do ZEUS

Esta pasta guarda tudo que o ZEUS sabe sobre o dono desta instalação.

## Importante

O CONTEÚDO desta pasta NÃO é versionado. Está no `.gitignore` de propósito: é
memória pessoal, não código. Se você publicar seu fork deste repositório, nada
daqui vai junto.

O que é versionado: este README, os templates em `_templates/` e os dois
arquivos de estrutura (`LACUNAS-DE-CONHECIMENTO.md` e
`DIARIO-DE-BORDO-INICIAL.md`), que nascem vazios.

## O que fica aqui

| Arquivo | Papel |
|---|---|
| `PERFIL.md` | Quem é o dono. A existência dele indica que o boot já rodou |
| `INDICE.md` | Índice de tudo, teto de 15.000 caracteres |
| `LACUNAS-DE-CONHECIMENTO.md` | O que o ZEUS ainda precisa descobrir |
| `APRENDIZADOS.md` | Erros com causa raiz e acertos com padrão |
| `DIARIO-DE-BORDO-INICIAL.md` | A foto do dia da instalação |
| `diarios/AAAA-MM-DD.md` | Diário contínuo |
| `produtos/` | Um arquivo por produto ou serviço |
| `_arquivo/` | Memória fria: nunca carrega, nunca se perde |
| `_learning/` | Registro automático de falhas e correções (gerado por hook) |
| `_templates/` | Modelos de arquivo de memória |

## Como escrever aqui

Todo arquivo obedece ao esquema de `core/memoria-schema/FRONTMATTER.md`. Sem
frontmatter, o arquivo não entra no índice e o ZEUS não acha a informação
depois.

## Comandos úteis

```bash
node scripts/memory-index.js            # gera o catálogo
node scripts/memory-index.js --auditar  # aponta problemas
node scripts/obsidian-mirror.js         # espelha para a Vault (leitura humana)
```

## Como corrigir o que o ZEUS sabe

Duas formas, as duas funcionam:

1. Diga a ele. "Aquilo do preço está errado, o certo é X." Ele corrige o
   arquivo e registra o aprendizado.
2. Edite o arquivo você mesmo. É markdown comum.

A memória é sua. Ela nunca deve conter algo que você não reconheça como verdade.
