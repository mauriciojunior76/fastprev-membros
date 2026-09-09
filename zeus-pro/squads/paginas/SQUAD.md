# PAGE-FORGE SQUAD

**ID:** `page-forge`
**Ativação:** `@page-forge` ou `/AIOS:squads:page-forge`
**Missão:** Criar páginas, landing pages, dashboards e interfaces visuais profissionais de alto nível

---

## Filosofia

PAGE-FORGE combina dois superpoders:

| Base | O que traz |
|------|-----------|
| `claude-cookbooks-main` | **Estética real** — tipografia, paleta, motion, anti-AI-slop |
| `superpowers-main` | **Disciplina de dev** — design-first, planejamento, TDD, code review em cadeia |

**Resultado:** Páginas que parecem feitas por um designer + dev senior, com processo sistemático que escala.

---

## Os Agentes da Cadeia

| Agente | Persona | Papel |
|--------|---------|-------|
| `@page-intake` | **Iris** | Intake, classifica modo, faz perguntas estratégicas |
| `@page-visual-specialist` | **Vex** | Design visual — tipografia, paleta, motion, estética |
| `@page-planner` | **Rex** | Planeja tasks de 2-5 min com código exato (superpowers:writing-plans) |
| `@page-implementer` | **Forge** | Implementa cada task como subagente fresco (superpowers:SDD) |
| `@page-reviewer` | **Keen** | Code review 2 estágios: spec compliance + code quality |
| `@page-qa` | **Pixel** | Gate final: UX, mobile, acessibilidade, entrega |

---

## Os 2 Modos

### 🔥 MODO MONSTRO DEV
**Quando usar:** Páginas públicas, landing pages de cliente, dashboards comerciais, qualquer coisa que vai aparecer para o usuário final.

```
Iris → Vex (design doc aprovado) → Rex (tasks) → Forge×N (implement+review) → Pixel (gate) → ENTREGA
```

**Gatilhos automáticos:**
- "quero uma landing page"
- "página de vendas"
- "dashboard para cliente"
- "site profissional"
- "modo monstro"
- qualquer página pública de alto impacto

### ⚡ MODO REDUZIDO
**Quando usar:** Briefings internos, protótipos, páginas administrativas que não vão a público, documentos visuais internos.

```
Iris → Vex (decisões rápidas) → Forge (direto) → ENTREGA
```

**Gatilhos automáticos:**
- "briefing interno"
- "protótipo rápido"
- "só para referência"
- "interno"
- "esboço visual"
- "não vai a público"

---

## Ativação

### Comando direto:
```
@page-forge *monstro "cria uma landing page para [produto/serviço]"
@page-forge *reduzido "protótipo do painel de controle interno"
```

### Via qualquer agente do sistema:
Quando o agente detectar demanda de página e o contexto exigir alta qualidade:
```
→ Delegar para @page-intake *classify "<descrição da demanda>"
```

---

## Knowledge Base

- **Cookbooks:** `claude-cookbooks-main/coding/prompting_for_frontend_aesthetics.ipynb`
- **Referências visuais:** `claude-cookbooks-main/images/frontend_aesthetics/`
- **Skills de processo:** `superpowers-main/skills/`
  - `brainstorming/` — Refinamento socrático
  - `writing-plans/` — Tasks detalhadas
  - `subagent-driven-development/` — Execução em cadeia
  - `systematic-debugging/` — Debug se algo quebrar
  - `verification-before-completion/` — Verificação antes de entregar
  - `requesting-code-review/` — Gate de qualidade

---

## Outputs por Modo

### MONSTRO
- `docs/pages/{nome}/design.md` — Design doc aprovado
- `docs/pages/{nome}/plan.md` — Tasks detalhadas
- `docs/pages/{nome}/index.html` — Página final
- `docs/pages/{nome}/review.md` — Relatório de review

### REDUZIDO
- `docs/pages/{nome}/index.html` — Página final
- (Sem design doc nem plan formal)

---

## Regras Absolutas da Squad

1. **MONSTRO nunca pula o design doc** — Vex apresenta escolhas, usuário aprova
2. **MONSTRO nunca implementa sem plan** — Rex cria tasks antes do Forge
3. **Forge nunca entrega sem Keen revisar** — 2 estágios: spec + quality
4. **Vex nunca usa Inter, Roboto, Arial** — Tipografia com identidade sempre
5. **REDUZIDO nunca vira MONSTRO silencioso** — Se precisar de qualidade, sobe o modo explicitamente

---

## Integração com Domínios

| Domínio | Como usa PAGE-FORGE |
|---------|-------------------|
| **Exemplo Clientes (D1)** | Landing pages de cliente → @exemplo-master aciona @page-intake |
| **Interno (D2)** | Páginas internas → @delegator aciona @page-intake *reduzido |
| **Dev Stories** | Story com output visual → @dev passa por @page-intake antes de commitar |

---

## Padrão Exemplo — Elementor

Todo cliente Exemplo que pedir landing page recebe o **Padrão Exemplo**:

- **Wireframe fixo:** 9 seções (alert-banner → hero → pain-points → features → how-it-works → offer → bio → cta-final → footer)
- **Output:** `.preview.html` (aprovação visual) + `.elementor.json` (importar no WordPress)
- **Intake:** sistema aceita copy escrita, transcrição de reunião ou apresentação e extrai automaticamente para `content.json`
- **Paleta:** proposta pelo sistema baseada no mercado do cliente se não fornecida
- **Referência completa:** `squads/page-forge/lib/elementor/EXEMPLO-CLIENT-STANDARD.md`

### Ativação para cliente Exemplo

```
"Tenho [copy / transcrição / apresentação] do cliente [nome]"
→ Sistema extrai → propõe content.json + palette.json → usuário aprova → build automático → preview → entrega
```
