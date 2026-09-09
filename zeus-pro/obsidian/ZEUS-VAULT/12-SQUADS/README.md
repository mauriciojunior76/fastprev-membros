# 12-SQUADS: Squads

## O que guardar aqui

Documentação dos times de agentes: o que cada um faz, quando é acionado, o que ele aprendeu com o uso.

## O que NÃO guardar aqui

Código. O squad vive em `squads/` no repositório; aqui fica a leitura humana.

## Quando atualizar

Quando um squad for criado ou mudar de escopo.

## Quem usa esta informação

O orquestrador, para decidir quem chamar.

## Nível de sensibilidade

normal

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

Use tags no formato `#squads` para
agrupar por tema dentro da pasta.
