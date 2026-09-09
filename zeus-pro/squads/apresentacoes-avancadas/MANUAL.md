# Manual de Instalação - Zeus Show v1.0

Este manual cobre instalação, configuração e operação do squad do zero até a primeira apresentação entregue.

---

## Pré-requisitos

| Dependência | Versão mínima | Como verificar |
|-------------|--------------|----------------|
| Node.js | 18 ou superior | `node --version` |
| Git | qualquer recente | `git --version` |
| npm | 9 ou superior | `npm --version` |

Opcional:

| Dependência | Para quê |
|-------------|----------|
| Chave Unsplash/Pexels/Pixabay | Uso de fotos de banco incluso |
| Chave Lovart ou Nano Banana | Geração de imagem com IA |

---

## Instalação

### Passo 1: Clonar o repositório

```bash
git clone https://github.com/seu-usuario/zeus-show.git
cd zeus-show
```

### Passo 2: Instalar dependências

```bash
npm install
```

Isso instala Playwright, js-yaml e utilitários de renderização.

### Passo 3: Rodar o setup inicial

```bash
node scripts/install.js
```

O setup cria a pasta `_memory/mentores/`, valida a versão do Node, confirma que os 52 agentes estão presentes e roda um healthcheck. Saída esperada:

```
[install] Node 18+ ok
[install] 53 agentes encontrados (52 + Lead)
[install] Pasta _memory/mentores/ criada
[install] Temas validados: exemplo, apple, vintage, futurista, editorial, corporativo
[install] Pronto. Rode: node scripts/new-presentation.js
```

### Passo 4: Primeira apresentação

```bash
node scripts/new-presentation.js
```

Na primeira execução ele dispara o onboarding (8 perguntas). Respostas ficam salvas em `_memory/mentores/{seu-slug}.md` e não perguntam de novo.

Da segunda em diante, ele vai direto para o briefing:

- Qual o formato? (prelúdio, aula, ebook)
- Qual o tema da apresentação?
- Duração estimada?
- Tem números, comparações ou linha do tempo?
- Tem fotos a incluir?

Após as respostas, o Maestro monta o pool de agentes e produz o HTML. A saída fica em `output/{data}-{slug}-{formato}/index.html`.

---

## Configuração por mentor

Cada mentor tem um arquivo em `_memory/mentores/{slug}.md` com:

```markdown
---
mentor: o dono do canal-silveira
nicho: mentoria digital
produto: Agente Arquiteto
avatar: mentores iniciantes
tom: direto e provocador
tema_preferido: exemplo
fontes: Inter + DM Sans
paleta: rosegold dark
grain: true
motion: smooth
---

## Histórico

- 2026-04-14 Prelúdio Claude Code (15 slides, loop 45s)
- 2026-04-07 Aula Criativos LT (22 slides, 28 min)
```

Para atualizar manualmente, edite o YAML do frontmatter. O squad lê tudo automaticamente na próxima execução.

---

## Uso com Claude Code

Dentro do ambiente AIOS (Claude Code + MCP), basta dizer:

```
Zeus Show, vamos criar uma apresentação
```

O Lead Maestro reconhece e inicia o fluxo. Alternativas:

```
Zeus Show, cria prelúdio sobre {tema}
Zeus Show, cria aula sobre {tema} em 20 minutos
Zeus Show, cria ebook sobre {tema}
Zeus Show, usa meu perfil salvo
Zeus Show, troca o tema para {apple|vintage|futurista|editorial|corporativo|exemplo}
```

---

## Uso via CLI (sem Claude Code)

Se você está operando o squad fora do ambiente AIOS:

```bash
node scripts/new-presentation.js \
  --formato preludio \
  --tema "15 coisas que o meu aluno aprende em 30 dias" \
  --duracao 45 \
  --theme exemplo \
  --output ./output/teste
```

Ou apenas `node scripts/new-presentation.js` para o wizard interativo.

---

## Deploy na VPS

Após o HTML pronto:

```bash
node scripts/deploy.js \
  --slug minha-apresentacao \
  --folder ./output/2026-04-14-o dono do canal-preludio
```

O script publica em `https://seu-dominio.com.br`. Valida HTTP 200 antes de confirmar.

Requisito: ter acesso SSH ao servidor Zeus (credenciais em `.env` ou via `--host`, `--user`, `--key`).

---

## Variáveis de ambiente (opcionais)

Crie um `.env` na raiz do zeus-show:

```env
# Banco de imagens incluso (opcional)
UNSPLASH_ACCESS_KEY=sua_chave
PEXELS_API_KEY=sua_chave
PIXABAY_API_KEY=sua_chave

# Geração de imagem via IA (opcional)
LOVART_API_KEY=sua_chave
NANO_BANANA_API_KEY=sua_chave

# VPS deploy (se for publicar)
ZEUS_VPS_HOST=SEU_IP_DA_VPS
ZEUS_VPS_USER=root
ZEUS_VPS_KEY=/caminho/para/chave
```

Se nenhuma API estiver configurada, o squad pula automaticamente a camada de imagens e usa apenas ícones e tipografia.

---

## Troubleshooting

### O squad não gerou acentos

**Causa:** texto veio sem acento desde a primeira escrita e passou pelo Spell Checker.
**Solução:** rode `node scripts/validate-output.js ./output/{pasta}` que varre o HTML e aponta palavras sem acento.

### Contraste reprovado

**Causa:** Contrast Checker marcou elementos com contraste inferior a 4.5:1.
**Solução:** o próprio squad refaz a paleta. Se persistir, escolha tema mais claro ou mais escuro e rode de novo.

### Ícones aparecem como quadrado vazio

**Causa:** biblioteca Exemplo não tinha o semântico e o External Icon Integrator não conseguiu baixar.
**Solução:** confirme acesso à internet. Opcional: edite `config/visual-rules.md` e desative ícones externos.

### HTTP 403 no deploy

**Causa:** credencial da VPS incorreta no `.env`.
**Solução:** valide com `ssh root@SEU_IP_DA_VPS` manualmente. Ajuste `.env` e rode de novo.

### Primeira apresentação demora

**Causa:** primeira execução baixa o Chromium do Playwright (200 MB).
**Solução:** aguarde. Da segunda em diante fica instantâneo.

---

## Estrutura de pastas

```
zeus-show/
├── README.md
├── MANUAL.md
├── WIZARD.md
├── CHANGELOG.md
├── package.json
├── squad.yaml                   52 agentes + workflows
├── agents/                      53 arquivos .md (Lead + 52)
├── templates/
│   ├── preludio-base.html
│   ├── aula-base.html
│   └── ebook-base.html
├── themes/                      6 variantes (JSON)
│   ├── exemplo.json
│   ├── apple.json
│   ├── vintage.json
│   ├── futurista.json
│   ├── editorial.json
│   └── corporativo.json
├── _memory/
│   ├── global-rules.md
│   ├── visual-preferences.md
│   ├── errors-learned.md
│   └── mentores/                1 arquivo por mentor
├── config/
│   ├── visual-rules.md
│   ├── format-specs.md
│   └── preferences-schema.md
├── scripts/
│   ├── install.js
│   ├── gen-agents.js
│   ├── new-presentation.js
│   ├── validate-output.js
│   └── deploy.js
└── output/                      apresentações geradas
```

---

## Atualização

Para atualizar o squad quando sair nova versão:

```bash
cd zeus-show
git pull origin main
npm install
node scripts/install.js  # valida se novos agentes ou temas foram adicionados
```

Sua memória em `_memory/mentores/` é preservada. Atualizações não sobrescrevem perfil de mentor.

---

## Licença e suporte

Uso interno Synkra AIOS. Distribuição autorizada para mentores da Exemplo.

Issues e sugestões: [github.com/seu-usuario/zeus-show/issues](https://github.com/seu-usuario/zeus-show/issues)
