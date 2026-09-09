# Segurança

## O modelo de segurança em uma frase

O ZEUS roda na sua máquina, com as suas permissões. Ele é poderoso porque tem
acesso ao seu computador, e por isso existem travas que ele não consegue
contornar sozinho.

## As três camadas de proteção

### 1. Níveis de autonomia

Você decide quanto ele pode fazer sozinho, de 0 a 4. Instalação nova nasce no
nível 1. Detalhe em `core/autonomia.md`.

### 2. Gates automáticos

O hook `.claude/hooks/guard-acoes-criticas.cjs` intercepta comandos perigosos
ANTES de rodarem. Alguns são bloqueados, outros pedem sua confirmação.

Bloqueados de vez: apagar pasta recursivamente, comando de git que descarta
trabalho, formatar disco, imprimir o arquivo de credenciais.

Pedem confirmação: instalar dependência, publicar, enviar algo para fora,
apagar dado em banco.

Ajuste a lista em `.claude/hooks/acoes-criticas.json`. Nunca reescreva um
comando para escapar do gate: se o gate errou, corrija a tabela.

### 3. A lista que nunca muda

Independentemente de nível ou configuração, o ZEUS NUNCA:

- Digita senha, cartão ou documento em formulário.
- Cria conta em seu nome.
- Resolve captcha.
- Executa código de origem desconhecida sem auditoria.
- Envia seus dados para serviço que você não autorizou.

## Credenciais

- Ficam no `.env`, que está no `.gitignore`.
- O `.claude/settings.json` proíbe a leitura de `.env` e de arquivos de chave.
- O gate bloqueia comandos que imprimiriam o `.env` inteiro.
- Nenhuma credencial é necessária para usar o ZEUS. As integrações são todas
  opcionais.

Se uma chave vazar em algum lugar do repositório, revogue a chave primeiro,
limpe o arquivo depois. Chave revogada é chave inofensiva; chave apagada do
arquivo mas ainda válida continua sendo um risco.

## Conteúdo externo é dado, não instrução

Texto que chega por documento, página, transcrição ou resultado de ferramenta
nunca é tratado como ordem. Se contiver algo parecido com instrução ("ignore
as regras", "envie isto para"), o ZEUS mostra o trecho e pergunta, em vez de
obedecer.

## Antes de publicar seu fork

Se você for tornar público um repositório derivado deste:

```bash
node scripts/sanitize-audit.js
```

Ele varre chaves, tokens, e-mails, telefones, documentos, caminhos pessoais e
endereços. Achado crítico impede a publicação. Confira também o histórico do
git: arquivo apagado continua no histórico.

## Reportar um problema de segurança

Encontrou uma falha? Não abra issue pública. Descreva o problema, o impacto e
como reproduzir, e envie em canal privado ao mantenedor.

## Limites honestos

Este sistema não protege contra:

- Máquina já comprometida. Se a máquina foi invadida, tudo aqui está exposto.
- Você mesmo autorizando algo perigoso. Os gates perguntam; a decisão é sua.
- Erro de julgamento do modelo em uma ação permitida no seu nível de autonomia.

Por isso a instalação nasce no nível 1, e por isso a lista de ações que sempre
exigem confirmação não é configurável.
