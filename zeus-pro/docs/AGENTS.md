# Agentes

## O que é um agente aqui

Um papel com autoridade definida, um critério de julgamento próprio e limites
explícitos. Não é personagem: é um recorte de responsabilidade.

## Formato

```markdown
# nome-do-agente

- Squad: a que time pertence
- Papel: uma frase de responsabilidade
- Autoridade: o que só ele decide
- Ativação: automática ou por recrutamento do lead

## Regra própria
A lei específica dele, geralmente nascida de um erro real.

## O que ele SEMPRE faz
## O que ele NUNCA faz
```

## O lead

Todo squad tem um. Ele recebe o pedido, decide o rumo, recruta o mínimo
necessário, aprova a entrega e responde pelo resultado.

Regra do lead: recrutar pouco. Squad inteiro é exceção, não padrão.

## Handoff entre agentes

Quando um agente passa trabalho para outro, passa só o essencial:

```yaml
de: agente-a
para: agente-b
contexto: em uma frase, o que está sendo feito
decisoes: no máximo 5, as que já foram tomadas
arquivos: no máximo 10, os que foram tocados
bloqueios: no máximo 3
proxima_acao: o que o agente que entra deve fazer
```

O que NUNCA é passado adiante: a persona inteira do agente anterior, a lista
de comandos dele, os templates dele. Isso incha o contexto sem agregar nada.

## Agentes de revisão

Todo squad tem pelo menos um agente que revisa antes da entrega, e ele entra
sempre por último. Revisor nunca é pulado, nem em pedido pequeno.

## Criar um agente novo

Só quando existir uma responsabilidade que nenhum agente atual cobre. Se dois
agentes fazem quase a mesma coisa, são um só. Agente novo entra no
`squad.yaml` do squad e ganha arquivo em `agentes/`.
