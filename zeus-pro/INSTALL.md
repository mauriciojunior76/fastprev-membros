# Instalação

## O que você precisa

- [Node.js 18 ou maior](https://nodejs.org)
- [Git](https://git-scm.com). Você não precisa saber usar. Ele é uma peça que
  o Claude Code usa por baixo para guardar histórico e voltar atrás quando
  algo dá errado. Basta instalar e seguir adiante.
- [Claude Code](https://claude.com/claude-code)
- Opcional: [Obsidian](https://obsidian.md), para ler a sua memória com conforto

Instalados os três, a instalação leva por volta de cinco minutos, e nenhum
passo pede conhecimento de programação.

## Passo a passo

### 1. Baixar

O download é liberado na página, com o seu cadastro e o aceite da licença.
Você recebe um arquivo compactado e um código de licença pessoal.

Descompacte o arquivo numa pasta do seu computador, por exemplo
`Documentos/zeus-personal`, e abra o terminal dentro dessa pasta. Guarde o
`LICENCA.txt` que vem dentro: ele é a prova da sua licença.

### 2. Instalar

```bash
node scripts/setup.js
```

Isso cria o `.env`, as pastas de memória e a Vault, e confere se as
proteções estão respondendo. Não instala dependência nenhuma e não chama
nenhum serviço externo.

### 3. Escolher onde fica a sua Vault (opcional)

Se você já usa Obsidian e quer a memória do ZEUS dentro da sua Vault atual,
abra o `.env` e preencha:

```
ZEUS_VAULT_PATH=C:/caminho/para/sua/Vault
```

Rode `node scripts/setup.js` de novo. Sem isso, a Vault fica em
`obsidian/vault-local` dentro do próprio projeto, e funciona igual.

### 4. Fazer o boot

Abra o Claude Code nesta pasta e diga:

> vamos fazer o boot da inteligência

Reserve de 30 a 60 minutos. Você pode parar no meio e continuar depois: o que
já foi respondido fica salvo.

### 5. Deixar esta pasta como padrão

O ZEUS só existe dentro da pasta dele. Se você abrir o Claude Code em outra
pasta, é o Claude Code puro que responde, sem os times, sem as regras e sem a
sua memória.

Para não precisar lembrar disso toda vez, diga a ele, com a pasta aberta:

> esta pasta aqui vai ser a pasta padrão de toda nova sessão e de toda nova
> conversa

Depois disso, toda conversa nova já nasce com o ZEUS junto. Uma pasta só para
tudo é o caminho mais simples; quem trabalha com projetos muito diferentes
pode preferir uma pasta por projeto, e nesse caso a memória de cada uma é
separada.

## Se algo der errado

| Sintoma | Provável causa | O que fazer |
|---|---|---|
| `node não é reconhecido` | Node.js não instalado ou fora do PATH | Instale de nodejs.org e abra um terminal novo |
| O setup reclama de hook ausente | Download incompleto | Baixe o repositório de novo |
| O ZEUS não parece seguir as regras | Claude Code aberto na pasta errada | Feche e abra na pasta do zeus-personal |
| Ele não lembra do que você contou | O boot não terminou | Confira se `memory/PERFIL.md` existe |
| Nenhum contexto é injetado | Hook não registrado | Confira `.claude/settings.json` |

Teste o roteador de contexto na mão:

```bash
echo '{"session_id":"teste","prompt":"quero configurar o zeus"}' | node .claude/hooks/context-router.cjs
```

Se sair um bloco de texto, está funcionando.

## Atualizar

Baixe a versão nova na página, descompacte numa pasta separada e copie a sua
pasta `memory/` da instalação antiga para dentro da nova. Depois rode:

```bash
node scripts/setup.js
```

A sua memória é sua e fica só na sua máquina, então nenhuma atualização
sobrescreve o que o ZEUS sabe sobre você. Na dúvida, guarde a pasta antiga
até confirmar que a nova está funcionando.
