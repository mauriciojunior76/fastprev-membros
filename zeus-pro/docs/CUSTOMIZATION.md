# Personalização

## O que dá para mudar

Tudo. O ZEUS é feito de arquivos de texto.

## Os quatro lugares de personalização

### 1. `CLAUDE.local.md` (o mais fácil)

Crie na raiz. Não é versionado, e tem precedência sobre o `CLAUDE.md`.

```markdown
# Meus ajustes

- Fale comigo em tom mais direto, sem rodeio.
- Nunca use a palavra "solução".
- Quando eu pedir texto, mande sempre duas versões.
```

É onde você molda a personalidade dele ao seu gosto.

### 2. As regras (`.claude/rules/`)

Alteram o comportamento em toda sessão. Mexa com cuidado: o teto de contexto
é 100.000 caracteres somados, e regra longa demais rouba espaço do que
importa. Confira com `node scripts/medir-contexto.js`.

### 3. Os squads (`squads/`)

Ajuste o `squad.yaml` para mudar gatilhos, elenco e limites. Ajuste o
`CHECKLIST.md` para mudar o critério de qualidade daquele tipo de entrega.
Ajuste os arquivos de `agentes/` para mudar como cada papel trabalha.

### 4. Os gatilhos (`.claude/hooks/context-triggers.json`)

O que faz o contexto certo chegar sozinho. Adicione os termos que VOCÊ usa:
nome dos seus produtos, dos seus projetos, do seu jeito de pedir as coisas.

```json
{
  "id": "meu-produto-principal",
  "keywords": ["nome do produto", "apelido que eu uso"],
  "file": "memory/produtos/nome-do-produto.md",
  "note": "Ficha completa do produto."
}
```

## Nível de autonomia

No `.env`: `ZEUS_NIVEL_AUTONOMIA=2`. Suba quando confiar. Ver
`core/autonomia.md`.

## O que os gates bloqueiam

`.claude/hooks/acoes-criticas.json`. Se um bloqueio atrapalhar sem motivo,
corrija a tabela. Nunca contorne o comando: se o gate errou, ele precisa ser
consertado, não driblado.

## O que NÃO personalizar

A lista de ações que sempre exigem confirmação (dinheiro, publicação, envio,
destruição) e a lista do que nunca é feito em hipótese alguma (senha,
captcha, conta em seu nome). Se essas ficarem configuráveis, elas param de
proteger no dia em que você estiver com pressa.

## Depois de personalizar

```bash
node scripts/medir-contexto.js
```

Se passar do teto, o assistente fica lento e distraído. O medidor diz o que
cortar.
