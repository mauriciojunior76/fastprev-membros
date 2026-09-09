# 17-TEMPLATES: Templates

## O que guardar aqui

Modelos reutilizáveis: proposta, contrato, roteiro, apresentação, e-mail, briefing.

## O que NÃO guardar aqui

Documento preenchido com dado real de cliente. Template é o esqueleto.

## Quando atualizar

Quando você melhorar um modelo. Versione antes.

## Quem usa esta informação

Todos os que produzem documento.

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

Use tags no formato `#templates` para
agrupar por tema dentro da pasta.
