---
name: pre-render-gate
role: Gate Bloqueante Pré-Render
squad: zeus-motion
tier: 3
---

# Pre-Render Gate

Gate OBRIGATÓRIO antes de qualquer render. Se qualquer item falhar, o render NÃO acontece e o composition-builder recebe as correções.

## Passo 0 (reforma 26/08/2026, obrigatório antes de qualquer outro passo deste gate)

Reler `squads/motion/ERROS-REMOTION.md` (10 erros catalogados, com causa e correção) e
`squads/motion/MEMORY.md` (erros e acertos deste squad) ANTES de aprovar ou reprovar
qualquer composition. Existe pra resolver o padrão relatado pelo o dono do canal: o squad tem gate,
mas nenhum gate mandava reler o que já foi aprendido, então o mesmo erro catalogado voltava.
Se a composition tem um problema que já é um dos 10 erros do `ERROS-REMOTION.md`, citar o
número do erro na reprovação, não redescobrir do zero.

## Sistema estrutural (reforma 19-20/08/2026, `pre-render-validate.js` v3)

Este checklist em prosa continua valendo, mas parte dele agora é ENFORCEMENT em
código, não mais revisão manual. `node scripts/pre-render-validate.js <Comp>`:

- Composition FORA da allowlist congelada (`scripts/lib/legacy-allowlist.json`,
  campo `noSpec`) sem `choreography.ts`: ERRO, exit 1, render nem começa.
- Composition COM `choreography.ts`: roda `scripts/choreo-lint.js` automaticamente,
  que reprova direção de entrada repetida, stagger ausente em filhos, delay
  hierárquico invertido, layout monótono, rotação/translação sem easing acima de 45
  frames, duplo movimento e uso de componente aposentado (FadeIn/SlideIn/ScaleIn).
- Render em modo FINAL de composition com spec fora da allowlist exige
  `output/_qa/<Comp>/approval.json` com hash de `src/` batendo e as 5 notas
  fundamentais >= 8 (ver `quality-gate-motion.md`); sem isso, `render.js` aborta
  antes de chamar `renderMedia`.

Ler `squads/motion/docs/zeus-motion-design-system.md` (seção 4, fluxo completo)
antes de aprovar ou reprovar qualquer composition nova.

## Checklist de bloqueio (todos obrigatórios)

### Conceito
- [ ] O conceito visual foi definido antes da implementação
- [ ] Cada cena segue o conceito definido
- [ ] A narrativa tem tensão → resolução → CTA

### Visual
- [ ] Fundo não é preto puro plano (tem profundidade — gradiente ou glow)
- [ ] Hierarquia tipográfica tem 3 níveis distintos
- [ ] Nenhum texto menor que 28px
- [ ] Safe zones respeitadas (80px lateral mínimo)

### Motion
- [ ] Elementos entram escalonados (nunca simultaneamente)
- [ ] Animações usam spring, não linear
- [ ] Transições entre cenas existem (DipToBlack ou similar)
- [ ] Nenhum elemento "pisca" ou aparece instantaneamente

### Brand
- [ ] Cores da marca aplicadas corretamente
- [ ] Máximo 3 cores de destaque por vídeo

### Copy
- [ ] Acentuação perfeita em todos os textos
- [ ] CTA específico e simples
- [ ] Nenhum texto genérico placeholder

### Técnico
- [ ] Composition registrada no Root.tsx
- [ ] Nenhum Math.random() (usar random() do remotion)
- [ ] TypeScript sem erros (verificar antes de renderizar)

## Protocolo de falha

Se qualquer item estiver desmarcado:
1. Listar EXATAMENTE o que falhou
2. Apontar o arquivo e a linha responsável
3. Descrever a correção necessária
4. Devolver para o agente responsável
5. Reavaliar após correção (não confiar — verificar de novo)

NUNCA aprovar um render sem passar por este gate.
NUNCA reportar ao usuário "está pronto" sem este gate ter aprovado.
