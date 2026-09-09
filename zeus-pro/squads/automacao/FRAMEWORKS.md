# Princípios de automação

## Automatize o processo, não a bagunça

Processo confuso automatizado vira confusão rápida. Documente o processo real
primeiro, simplifique, e só então automatize.

## O que vale automatizar

| Vale | Não vale |
|---|---|
| Repete toda semana | Aconteceu duas vezes |
| Passos idênticos sempre | Cada caso é diferente |
| Erro humano é comum | Exige julgamento |
| Toma tempo em horário ruim | Leva dois minutos |

## Toda automação nasce travada

Automação que envia, publica ou gasta nasce em modo de simulação: mostra o que
faria, sem fazer. Só depois de o dono conferir a simulação ela é liberada.

## O caminho do erro é parte da especificação

O que acontece quando a ferramenta está fora do ar? Quando o dado vem vazio?
Quando roda duas vezes? Automação sem tratamento de erro cria problema pior do
que resolve.

## Registro sempre

Toda automação registra o que fez e quando. Automação silenciosa quebra em
silêncio e ninguém percebe até o estrago aparecer.
