# BOOK FORGE - Manual v3.0

Guia passo a passo para produzir ebooks com o squad consolidado (13 agentes, 4 pausas de aprovacao).

## Decisão inicial: qual modo?

```
Eu sou o dono do canal / conteúdo Exemplo? > Modo A (zero perguntas)
Eu sou mentorado e e meu primeiro ebook? > Modo B (3 perguntas + aprovacao de paleta)
Eu sou mentorado e já fiz ebook antes? > Modo B+ (zero perguntas, aplica padrões aprovados)
```

---

## Modo A - Ebook Exemplo (o dono do canal)

### Acionamento
```
"Cria ebook de {X} páginas sobre {tema}, objetivo: {1 dos 10 de STRATEGY.md}"
```

Se o objetivo não for informado, `book-strategist` pergunta antes de prosseguir (gate bloqueante).

### O que o squad faz automaticamente
1. Zeus detecta keyword `ebook`, dominio D2 (interno)
2. `book-chief` recebe, detecta modo A, le `STRATEGY.md`
3. `book-strategist` monta o briefing, roda gate de objetivo e gate de tema, cruza com ICP real e
   framework PMA

   >>> PAUSA 0: briefing aprovado?

4. `book-outliner` monta o sumario

   >>> PAUSA 1: outline aprovado?

5. `book-writer` + `book-cta-funnel` escrevem
6. `book-editor` + `book-language-gate` + `book-fact-checker` revisam

   >>> PAUSA 2: amostra de tom aprovada?

7. `book-designer` aplica visual Exemplo (zero perguntas: já sabe logo, cores, fontes, tom)
8. `book-assembler` monta e renderiza
9. `book-qa` roda os 2 checklists

   >>> PAUSA 3: PDF final aprovado?

10. `book-learning` registra resultado e atualiza memória

---

## Modo B - Primeiro ebook de mentorado

### Acionamento
```
"Preciso de ebook para {mentorado}, sobre {tema}, objetivo: {X}"
(enviar logo em anexo ou informar path)
```

### 3 perguntas (feitas pelo book-strategist na montagem do briefing)

1. **Identidade**: "Qual o nome da marca/projeto e qual segmento você atua?"
2. **Visual**: "Tem logo e paleta definida? Se tiver, manda. Se não, qual estilo: sofisticado,
   moderno, clean, colorido, escuro, luxuoso?"
3. **Voz**: "Como você fala com seu público: formal, casual, direto, professoral, inspiracional?
   Me da um exemplo de frase que você gostaria de ouvir em um ebook seu."

### Fluxo após as respostas
1. `book-designer` extrai a paleta do logo (Python PIL + K-means)
2. **NOVO v3**: a paleta extraida e APRESENTADA para aprovacao antes de aplicar em todo o material
   (resolve o risco de logo ruim gerar paleta dissonante sem checagem)
3. `book-designer` inicializa o brand profile em `_memory/{slug}/`
4. Produz o ebook pelo pipeline normal (PAUSA 0, 1, 2, 3)
5. `book-learning` registra os aprendizados iniciais

### Da próxima vez
Zero perguntas. Modo B+ ativado automaticamente (detecta `_memory/{slug}/` existente).

---

## Modo B+ - Mentorado recorrente

### Acionamento
Mesmo comando, o sistema detecta `_memory/{slug}/` existente.

### Diferencial
- `book-designer` aplica padrões aprovados -- **só os que tem data + aprovador explicito** (novo v3,
  resolve o risco de "aprender" um erro que passou por acidente em um gate)
- `book-strategist` carrega style-profile e errors.md do tenant antes de montar o briefing
- Mais rápido, mais consistente, mais barato

---

## Estrutura de um ebook completo (pipeline v3, 4 pausas)

### PASSO 0 - Estratégia (novo, 2-5 min)
`book-strategist` monta o briefing (objetivo, tema, promessa, público, CTA, meta de resultado).
Gate de objetivo e gate de tema, ambos bloqueantes.

>>> PAUSA 0: briefing estratégico aprovado?

### PASSO 1 - Estrutura (2-3 min)
`book-outliner` monta o sumario nos 12 blocos obrigatorios.

>>> PAUSA 1: outline aprovado?

### PASSO 2 - Conteúdo (10-20 min)
`book-writer` escreve os capitulos aplicando o playbook interno de vozes e frameworks de copy
(Schwartz, Hormozi, Halbert, Caples, Ogilvy, Sullivan, Kennedy, escolhidos por parametro).
`book-cta-funnel` escreve os CTAs amarrados ao objetivo e ao próximo passo do funil.
`book-tutorial` roda só se o ebook for guia técnico passo a passo.

### PASSO 3 - Editorial (5-10 min)
`book-editor` (clareza, ritmo, voz única, humanizacao), `book-language-gate` (bloqueante:
acentuacao, travessao, ortografia, números), `book-fact-checker` (números, cases com fonte).

>>> PAUSA 2: amostra de tom aprovada (1 paragrafo)?

### PASSO 4 - Visual (10-15 min)
`book-designer` aplica tema, paleta, tipografia, layout, capa (logo-guard bloqueante),
icones, gráficos, ornamentos, coerencia visual.

### PASSO 5 - Montagem (3-5 min)
`book-assembler` monta o HTML e renderiza o PDF (Playwright, fallback WeasyPrint).

### PASSO 6 - QA (2-5 min)
`book-qa` roda o checklist editorial (novo) e o checklist visual (herdado). Bloqueante.

>>> PAUSA 3: PDF final aprovado?

### PASSO 7 - Aprendizado (1-2 min)
`book-learning` atualiza style-profile/taste-fingerprint/errors do tenant e registra o ebook em
`_memory/resultados/registro-ebooks.md`.

### Entrega
PDF + link + relatorio de economics (tokens/custo/tempo, agora seção do relatorio final, não mais
agentes separados).

---

## Gates que podem bloquear

| Gate | O que valida |
|------|--------------|
| objetivo-gate | Objetivo do ebook declarado (novo v3) |
| tema-gate | Tema fora da blacklist de STRATEGY.md (novo v3) |
| language-gate | Acentuacao + travessao + ortografia + números |
| logo-exemplo-gate | Logo oficial (não recriar) |
| cor-coerencia-gate | Cores da paleta aprovada, contraste WCAG AA |
| qa-editorial-gate | Especificidade, unicidade, CTA alinhado (novo v3) |
| qa-visual-gate | PDF valido, paginacao, ornamentos |
| fullsafe-gate | Versionar arquivo existente |

Max 2 iteracoes por gate, depois entrega com transparencia sobre a limitacao restante.

---

## Troubleshooting

### Ebook sem objetivo claro
`book-strategist` bloqueia na PAUSA 0. Responder qual dos 10 objetivos de `STRATEGY.md` se aplica.

### Tema generico
`book-strategist` rejeita automaticamente contra a blacklist. Escolher tema da whitelist ou
justificar por que o tema proposto não e generico no contexto específico.

### Ebook muito robotico
`book-editor` reprocessa (absorveu humanizer/rhythm-doctor/clichê-killer). Se ainda robotico após
2 rodadas: usuario escolhe aprovar com aviso ou regerar do zero.

### Cores fora da paleta
`book-designer` bloqueia automático no gate de cor-coerencia. Corrige manualmente ou amplia paleta.

### Exemplo generico ("5 Passos para o Sucesso")
`book-qa` rejeita no checklist editorial (item 13). `book-writer` reescreve com contexto real do
tenant (`_memory/{tenant}/cases.md`, brand profile).

### Case sem fonte
`book-fact-checker` marca como `[FACT-CHECK]`. Vira "(hipotetico)" ou e removido -- nunca apresentado
como fato real sem fonte.

### Mesmo erro aparece em 2 ebooks
`book-learning` escala severidade. Só vira padrão automático com aprovacao explicita datada.

---

## Memória do tenant

Após o 1o ebook: `_memory/{slug}/` populado. Após o 3o: taste-fingerprint confidence medium. Após o
7o: confidence high, `book-designer` aplica padrões aprovados automaticamente (só os com data +
aprovador).

---

## Scripts CLI (mantidos)

```bash
node scripts/cli.js create-ebook [opções]
python scripts/extract-palette.py logo.png
node scripts/generate-theme.js --tenant slug --palette paleta.json
node scripts/ingest-context.js
node scripts/learn-from-session.js --session session.json
node scripts/render-pdf.js --input ebook.html --output ebook.pdf
python scripts/render-pdf-weasy.py ebook.html ebook.pdf
node scripts/validate-ebook.js ebook.pdf
node scripts/init-tenant-memory.js --slug joao-silva
python scripts/fix-acentos-pt.py <arquivo>
python scripts/audit-exemplo.py <arquivo>
```

---

## Referências cruzadas

- Estratégia (objetivo, tema, funil): `STRATEGY.md`
- Pipeline completo: `orchestration.md`
- Auditoria que originou a v3: `docs/AUDITORIA-2026-07-02.md`
- Core Squad Standard: `../../_core-team/README.md`
- Context global Exemplo: `_memory/o dono do canal-exemplo/`
