# FULLSAFE: versionar antes de editar

## STATUS: SEMPRE ATIVO. Nada que existia é perdido, nunca.

## O protocolo

1. Arquivo NÃO existe? Crie normalmente, sem versionar.
2. Arquivo JÁ existe? Antes de qualquer alteração:
   - Ler `_versions/registry.json` da pasta para descobrir a versão atual real.
     NUNCA assumir que é a primeira: assumir sobrescreve backup antigo.
   - Copiar o arquivo atual para `_versions/{nome}.v{N+1}{extensao}`.
   - Atualizar o registry.
   - Só então editar o original.
3. Reportar em uma linha: qual versão foi criada e como voltar atrás.

Comando pronto: `node scripts/fullsafe.js versionar <caminho> "motivo"`.

## Esquema do registry

```json
{
  "_fullsafe": true,
  "_atualizado": "AAAA-MM-DD",
  "arquivos": {
    "nome.md": {
      "versao_atual": 3,
      "versoes": [
        { "v": 3, "data": "AAAA-MM-DD", "motivo": "antes de reescrever a seção X", "caminho": "_versions/nome.v3.md" }
      ]
    }
  }
}
```

O campo `motivo` descreve o que VAI acontecer, não o que aconteceu: "antes de
trocar a paleta", não "paleta trocada". Assim o registry conta a história das
intenções.

## Rollback

Quando o usuário disser "deu errado", "volta", "desfaz": copiar a versão
anterior de volta por cima do original, registrar a volta no registry e
reportar. Versões NUNCA são apagadas, nem durante um rollback.

Comando: `node scripts/fullsafe.js voltar <caminho> <versao>`.

## Não se aplica a

Arquivo criado do zero nesta sessão, conteúdo de `_versions/`, o próprio
registry, arquivos gerados automaticamente e `.gitignore`.

## Aplica-se especialmente a

Regras, memórias, páginas, documentos aprovados, arquivos com "final" ou
"aprovado" no nome, e qualquer coisa que o usuário elogiou antes.
