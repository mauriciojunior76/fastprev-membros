# Memória

## Como o ZEUS lembra

Arquivos de texto em `memory/`, com um cabeçalho estruturado que diz de onde
a informação veio, quanto ela vale e quando precisa ser revista.

Sem banco de dados, sem índice invisível. Você abre e lê.

## As três camadas de carregamento

| Camada | O que é | Quando carrega |
|---|---|---|
| Sempre ativa | Identidade, regras, índice | Toda sessão. Teto de 100.000 caracteres |
| Sob demanda | Memórias de tema, conhecimento | Quando o assunto aparece |
| Arquivo | O que saiu de circulação | Nunca. E nunca se perde |

Conteúdo se move entre camadas. Nada é deletado.

```bash
node scripts/medir-contexto.js
```

## As doze camadas de conteúdo

identidade, empresa, comercial, público, posicionamento, branding,
comunicação, projetos, operacional, estratégica, histórica, preferências.

Mais duas marcações que atravessam todas: temporária e sensível.

## O cabeçalho de toda memória

```yaml
---
nome: slug-do-arquivo
descrição: Uma linha. É o que decide se o ZEUS acha este arquivo depois.
camada: comercial
tipo: declaração
origem: conversa de 20/03
confiança: alta
sensibilidade: normal
status: ativo
criado_em: 2026-03-20
atualizado_em: 2026-03-20
validade: null
---
```

## A distinção que mais importa

Fato, declaração, hipótese, inferência, preferência, decisão, regra.

Uma inferência do sistema NUNCA vira regra sem a sua confirmação. É o que
impede uma suposição de virar "o que a gente sabe" três meses depois.

## O índice

`memory/INDICE.md`, uma linha por memória, teto de 15.000 caracteres. Ao
estourar, as linhas frias vão para o arquivo ANTES de entrar linha nova.

## Comandos

```bash
node scripts/memory-index.js            # cataloga
node scripts/memory-index.js --auditar  # aponta problemas
node scripts/obsidian-mirror.js         # espelha para a Vault
node scripts/fullsafe.js listar <arquivo>  # histórico de versões
```

## Corrigir

Fale com ele, ou edite o arquivo. As duas funcionam. A memória é sua e nunca
deveria conter algo que você não reconhece como verdade.
