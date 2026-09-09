---
name: page-implementation
description: "Use when implementing HTML pages in PAGE-FORGE. Orchestrates subagent execution per task with spec compliance + code quality review loop."
---

# Page Implementation Skill

## Overview

Integra a metodologia **superpowers:subagent-driven-development** com o workflow de páginas do PAGE-FORGE squad. Cada task do plano é executada por um subagente fresco, revisada em 2 estágios (spec + quality) e auto-corrigida até 2 tentativas.

**Princípio central:** Discipline beats genius. Processo sistemático > implementação apressada.

---

## Quando Usar

- **MODO MONSTRO:** Para cada task do plan.md gerado pelo Rex
- **MODO REDUZIDO:** Em modo simplificado (one-shot, sem review loop)

---

## Subagent Dispatch (MONSTRO)

Para cada task, despachar subagente Forge com:

```
[PAGE-FORGE:implementer]

DESIGN_DOC: docs/pages/{nome}/design.md
TASK_NUMBER: {N}
TASK_DESCRIPTION: {descrição exata do plan}
TASK_CODE: {código exato fornecido pelo Rex}
TECH_STACK: {vanilla | react | etc}

REGRAS:
1. Implementar EXATAMENTE como especificado no task
2. Seguir paleta e tipografia do design doc
3. HTML completo e self-contained
4. Fontes linkadas no head
5. CSS variables do Vex respeitadas fielmente
6. Auto-revisão antes de responder
7. Output em ```html
```

---

## Review Loop (após cada task)

### Stage 1: Spec Compliance (Keen)
```
[PAGE-FORGE:spec-reviewer]

DESIGN_DOC: docs/pages/{nome}/design.md
TASK_NUMBER: {N}
IMPLEMENTATION: {HTML do Forge}

VERIFICAR:
- Tipografia bate com design doc?
- Paleta de cores correta?
- Componentes especificados presentes?
- Motion implementado?

VEREDICTO: APPROVED | REJECTED (com lista específica)
```

### Stage 2: Code Quality (Keen)
```
[PAGE-FORGE:quality-reviewer]

TASK_NUMBER: {N}
IMPLEMENTATION: {HTML do Forge}

VERIFICAR:
- CSS variables usadas (não hardcoded)?
- Seletores limpos?
- Animações performance-friendly (transform/opacity)?
- Mobile básico presente?
- Semântica HTML correta?
- Código organizado com comentários?

VEREDICTO: APPROVED | REJECTED (com correções priorizadas)
```

---

## Self-Healing Loop

```python
for task in plan.tasks:
    attempts = 0
    approved = False

    while not approved and attempts < 2:
        implementation = dispatch_forge(task)
        spec_ok = dispatch_spec_reviewer(task, implementation)
        quality_ok = dispatch_quality_reviewer(task, implementation)

        if spec_ok and quality_ok:
            approved = True
            commit_task(task)
        else:
            feedback = collect_feedback(spec_ok, quality_ok)
            dispatch_forge_fix(task, implementation, feedback)
            attempts += 1

    if not approved:
        escalate_to_iris(task, "2 tentativas falharam")
```

---

## Critérios de Aprovação Automática

**Aprovado quando:**
- Todas as fontes do design doc implementadas
- Todas as CSS variables do Vex no :root
- Todos os componentes do task presentes
- Nenhuma cor hardcoded fora do :root
- HTML abre sem erro de sintaxe
- Motion básico presente (se especificado)

**Rejeitado imediatamente quando:**
- Inter/Roboto/Arial como fonte principal
- Cores hardcoded ao invés de CSS vars
- Componente do design doc ausente
- HTML incompleto (sem head ou sem body)
- Erro de sintaxe CSS visível

---

## Commit por Task (MONSTRO)

Após cada task aprovada:
```bash
git add docs/pages/{nome}/index.html
git commit -m "feat(page-{nome}): task {N} - {descrição curta}"
```

---

## One-Shot (REDUZIDO)

No modo reduzido, sem loop de review:

```
[PAGE-FORGE:implementer-direct]

BRIEFING: {resumo do Iris}
VEX_DECISIONS: {paleta + fontes rápidas do Vex}
TECH: vanilla HTML

ENTREGAR: HTML completo self-contained em um shot
SEM: review, commit, loop
```

---

## Referências

- `superpowers-main/skills/subagent-driven-development/SKILL.md`
- `superpowers-main/skills/subagent-driven-development/implementer-prompt.md`
- `superpowers-main/skills/subagent-driven-development/spec-reviewer-prompt.md`
- `superpowers-main/skills/subagent-driven-development/code-quality-reviewer-prompt.md`
