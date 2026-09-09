# 19-INTEGRACOES: Integrações

## O que guardar aqui

Que ferramentas externas estão conectadas, para quê, e o que cada uma tem permissão de fazer.

## O que NÃO guardar aqui

CHAVE, TOKEN OU SENHA. Nunca, em hipótese alguma. Credencial mora no `.env`, fora da Vault.

## Quando atualizar

Quando conectar ou desconectar uma ferramenta.

## Quem usa esta informação

Automação, desenvolvimento.

## Nível de sensibilidade

normal, MAS jamais com credencial

## Frontmatter padrão desta pasta

```yaml
---
nome: nome-do-arquivo
descrição: Uma linha clara.
camada: operacional
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

Use tags no formato `#integracoes` para
agrupar por tema dentro da pasta.
