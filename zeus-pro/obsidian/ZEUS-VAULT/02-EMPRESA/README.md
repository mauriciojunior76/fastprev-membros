# 02-EMPRESA: Empresa

## O que guardar aqui

Como o negócio funciona: modelo, estrutura, time, canais, números gerais.

## O que NÃO guardar aqui

Extrato bancário, contrato assinado, dado de folha de pagamento. Isso é sensível e fica fora da Vault.

## Quando atualizar

Quando mudar estrutura, time ou modelo de negócio.

## Quem usa esta informação

Planejamento, tráfego, produtos de entrada, automação.

## Nível de sensibilidade

normal, com partes sensíveis

## Frontmatter padrão desta pasta

```yaml
---
nome: nome-do-arquivo
descrição: Uma linha clara.
camada: empresa
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

Use tags no formato `#empresa` para
agrupar por tema dentro da pasta.
