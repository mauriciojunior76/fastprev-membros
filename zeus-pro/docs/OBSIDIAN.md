# A Vault do Obsidian

## Por que existe

Memória que você não consegue ler não é sua. Se o sistema guardasse tudo em um
índice invisível, você nunca saberia o que ele acha que sabe, e não teria como
corrigir.

A Vault é a camada legível: markdown puro, abre em qualquer editor, funciona
sem o Obsidian, e sobrevive a este projeto.

## As 22 pastas

| Pasta | Guarda |
|---|---|
| 00-INICIO | Painel de entrada, só links |
| 01-IDENTIDADE | Quem você é profissionalmente |
| 02-EMPRESA | Como o negócio funciona |
| 03-PRODUTOS | Um arquivo por produto |
| 04-PUBLICOS | Quem você atende |
| 05-POSICIONAMENTO | Como quer ser percebido |
| 06-BRANDING | Identidade visual |
| 07-COMUNICACAO | Seu jeito de escrever, com amostras |
| 08-PROJETOS | Um arquivo por projeto |
| 09-PROCESSOS | Como as coisas são feitas |
| 10-CLIENTES | Contexto de cliente (sensível) |
| 11-CONHECIMENTO | O que você aprendeu de fora |
| 12-SQUADS | Documentação dos times |
| 13-AGENTES | Documentação dos agentes |
| 14-DECISOES | O que foi decidido e por quê |
| 15-DIARIOS | Diário de bordo |
| 16-PESQUISAS | Pesquisa com fonte e data |
| 17-TEMPLATES | Modelos reutilizáveis |
| 18-RESULTADOS | O que foi entregue e o que deu |
| 19-INTEGRACOES | Ferramentas conectadas (nunca credencial) |
| 20-SISTEMA | Como o ZEUS trabalha para você |
| 99-ARQUIVO | O que saiu de circulação |

Cada pasta tem um README dizendo o que guardar, o que não guardar, quando
atualizar, quem usa e qual a sensibilidade.

## Configurar

No `.env`:

```
ZEUS_VAULT_PATH=C:/caminho/para/sua/Vault
```

Sem isso, fica em `obsidian/vault-local`.

## Espelhar

```bash
node scripts/obsidian-mirror.js            # espelha
node scripts/obsidian-mirror.js --simular  # mostra o que faria
```

Via única: o repositório manda, a Vault recebe. Editar na Vault serve para
ler melhor, mas a próxima sincronização sobrescreve. A origem é `memory/`.

## O que nunca é espelhado

Memória marcada como sensível ou secreta, e qualquer arquivo cujo nome cheire
a credencial. De propósito, e sem exceção.

## Como usar bem

- Leia `00-INICIO` uma vez por semana.
- Quando achar algo errado, corrija falando com o ZEUS.
- Use o grafo do Obsidian para ver o que está desconectado: memória isolada
  costuma ser memória esquecida.
