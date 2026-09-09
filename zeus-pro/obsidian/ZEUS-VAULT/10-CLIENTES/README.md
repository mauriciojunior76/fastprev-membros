# 10-CLIENTES: Clientes

## O que guardar aqui

Contexto de clientes e projetos de cliente, quando o seu trabalho é atender terceiros.

## O que NÃO guardar aqui

Dado pessoal sensível, documento, informação de saúde ou financeira de terceiro. Isso nunca entra na Vault.

## Quando atualizar

A cada interação relevante.

## Quem usa esta informação

Os squads que trabalham para clientes.

## Nível de sensibilidade

SENSÍVEL. Marque tudo aqui como sensível e nunca envie a serviço externo.

## Frontmatter padrão desta pasta

```yaml
---
nome: nome-do-arquivo
descrição: Uma linha clara.
camada: projetos
tipo: declaração
origem: de onde veio
confiança: alta
sensibilidade: normal
responsável: usuário
status: ativo
criado_em: AAAA-MM-DD
atualizado_em: AAAA-MM-DD
validade: null
relacionados: []
---
```

## Como relacionar com outras notas

Use `[[nome-do-arquivo]]` para ligar esta nota a outras. Link para arquivo
que ainda não existe é aceitável: marca o que vale escrever depois.

Use tags no formato `#clientes` para
agrupar por tema dentro da pasta.
