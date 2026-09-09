# MODO REDUZIDO — Workflow Simplificado

**Squad:** PAGE-FORGE
**Trigger:** `@page-forge *reduzido` ou qualquer página interna/briefing/protótipo
**Duração típica:** 5-15 min
**Output:** HTML funcional com estética, sem overhead de process

---

## Diagrama da Cadeia

```
USUÁRIO
  │
  ▼
[IRIS — @page-intake]
  │  2 perguntas essenciais
  │  Classifica como REDUZIDO
  │
  ▼
[VEX — @page-visual-specialist]
  │  Decisões rápidas:
  │    • Fontes (1 escolha)
  │    • Paleta (5 vars máx)
  │    • Motion (mínimo)
  │  (SEM design doc formal)
  │
  ▼
[FORGE — @page-implementer]
  │  Implementação direta
  │  HTML completo em um shot
  │  Auto-revisão básica
  │
  ▼
ENTREGA DIRETA
  └── HTML (inline ou arquivo)
```

---

## Quando Usar REDUZIDO

**✅ CORRETO para:**
- Briefing visual interno da equipe
- Protótipo de referência para design
- Admin panel sem foco em UX de cliente
- Documento visual para apresentação interna
- Esboço de ideia antes de MONSTRO
- Tela de sistema back-office
- Qualquer coisa que não vai ao usuário final

**❌ ERRADO para:**
- Landing pages de cliente
- Páginas que vão ao ar
- Qualquer interface que o usuário final vai ver
- Anything that represents the brand externally

---

## Protocolo Iris (REDUZIDO)

Iris faz exatamente **2 perguntas**, não mais:

```
⚡ PAGE-FORGE REDUZIDO — Setup rápido

1. O que essa página/tela precisa mostrar ou fazer?
2. Alguma preferência de estilo? (dark/light, cor de destaque)

[Sem resposta = dark + gold accent como padrão Warframe-inspired]
```

Se o usuário não responder à pergunta 2, Vex usa o padrão do projeto automaticamente.

---

## Protocolo Vex (REDUZIDO)

Vex toma decisões em 30 segundos, **sem apresentar para aprovação**:

```
Decisões rápidas Vex (REDUZIDO):
1. Escolhe 1 fonte display + 1 fonte body
2. Define paleta de 4-5 colors no :root
3. Motion: apenas fade-in básico (não elaborado)
4. Background: gradiente simples ou cor sólida com sutil texture

Passa direto para Forge.
```

---

## Protocolo Forge (REDUZIDO)

Forge implementa em **um shot**, sem task breakdown:

```
1. Recebe decisões do Vex
2. Gera HTML completo self-contained
3. Auto-revisão dos 8 pontos básicos
4. Entrega
```

**Sem Keen. Sem Pixel. Sem commits formais.**

---

## Limitações Aceitas

No MODO REDUZIDO, os seguintes itens são **intencionalmente omitidos**:
- Design doc formal
- Plan com tasks
- Code review por Keen
- UX Gate por Pixel
- Commits por task
- Mobile responsiveness elaborada (apenas básico)
- Acessibilidade avançada

**Isso é esperado e aceitável para uso interno.**

---

## Escala para MONSTRO

Se durante o REDUZIDO o usuário decidir que a página vai a público:

```
Iris: "Mudou o contexto — essa página vai ser vista externamente?
Se sim, recomendo subir para MODO MONSTRO para garantir qualidade profissional."

Usuário confirma → Reinicia no fluxo MONSTRO com o HTML do REDUZIDO como referência base
```

---

## Uso

```
@page-forge *reduzido "painel interno mostrando status das campanhas"
@page-intake *reduzido "briefing visual do funil para a reunião de amanhã"
```

ou sem comando explícito — Iris detecta pelo contexto:
```
"faz um esboço rápido de como ficaria um dashboard de métricas interno"
```

---

## Output

```
⚡ PAGE-FORGE — ENTREGA REDUZIDA

✅ Intake (Iris): COMPLETO
✅ Design rápido (Vex): APLICADO
✅ Implementação (Forge): COMPLETA

📄 HTML entregue abaixo (modo inline) ou em docs/pages/{nome}/index.html

⚠️ Modo interno — sem review completo. Suba para MONSTRO se for a público.
```
