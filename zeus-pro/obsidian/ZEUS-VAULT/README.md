# ZEUS VAULT

Esta é a camada LEGÍVEL da memória do ZEUS. Aqui você abre, lê, corrige e
organiza tudo que ele sabe sobre você.

## Por que uma vault, e não só um banco de dados

Porque memória que você não consegue ler não é sua. Se o sistema guardar tudo
em um índice invisível, você nunca sabe o que ele acha que sabe, e não tem
como corrigir. Aqui é markdown puro: abre em qualquer editor, funciona sem o
Obsidian, e é seu para sempre.

## As 22 pastas

| Pasta | Guarda |
|---|---|
| `00-INICIO` | Início |
| `01-IDENTIDADE` | Identidade |
| `02-EMPRESA` | Empresa |
| `03-PRODUTOS` | Produtos |
| `04-PUBLICOS` | Públicos |
| `05-POSICIONAMENTO` | Posicionamento |
| `06-BRANDING` | Branding |
| `07-COMUNICACAO` | Comunicação |
| `08-PROJETOS` | Projetos |
| `09-PROCESSOS` | Processos |
| `10-CLIENTES` | Clientes |
| `11-CONHECIMENTO` | Conhecimento |
| `12-SQUADS` | Squads |
| `13-AGENTES` | Agentes |
| `14-DECISOES` | Decisões |
| `15-DIARIOS` | Diários |
| `16-PESQUISAS` | Pesquisas |
| `17-TEMPLATES` | Templates |
| `18-RESULTADOS` | Resultados |
| `19-INTEGRACOES` | Integrações |
| `20-SISTEMA` | Sistema |
| `99-ARQUIVO` | Arquivo |

## Como funciona o espelho

O comando `node scripts/obsidian-mirror.js` copia a memória do repositório
para cá. É via única: o repositório manda, a vault recebe.

Memória marcada como `sensibilidade: sensível` ou `secreto` NUNCA é
espelhada, de propósito.

## Como corrigir algo errado

1. Diga ao ZEUS. Ele corrige na origem e o espelho se atualiza.
2. Ou edite direto em `memory/` no repositório.

Editar aqui na vault funciona para você ler melhor, mas a próxima sincronização
sobrescreve. A origem é sempre `memory/`.
