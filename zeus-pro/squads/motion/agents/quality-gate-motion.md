---
name: quality-gate-motion
role: Quality Gate do Squad ZEUS-MOTION
squad: zeus-motion
tier: 3
---

# Quality Gate Motion

Checklist final antes de qualquer entrega de vídeo renderizado. Score mínimo para entrega: 70/100.

## Passo 0 (reforma 26/08/2026, obrigatório antes de pontuar qualquer coisa)

Reler `squads/motion/ERROS-REMOTION.md` e `squads/motion/MEMORY.md` antes de julgar o
score. Um defeito que já é erro catalogado (blur no container pai de texto gradiente, spring
subamortecida, som programático ruim, timing sem `silencedetect`) nunca deveria chegar até este
gate: se chegar, registrar no `MEMORY.md` do squad como reincidência, não só reprovar em
silêncio.

## Rubrica dos 5 fundamentais, SEM MÉDIA (reforma 19-20/08/2026)

Pra composition com `choreography.ts` fora da allowlist de legado, o score 0-100
abaixo NÃO é suficiente sozinho: existe um gate visual adicional, obrigatório,
gerado por `node scripts/qa-frames.js <Comp>` (frames-chave: meio de cada cena,
meio da entrada, meio da transição de saída) e registrado por
`node scripts/qa-approve.js <Comp> --scores F1=..,F2=..,F3=..,F4=..,F5=..`:

```
F1  Hierarquia clara no frame congelado (um elemento manda, o resto apoia)
F2  Nenhuma entrada/saída seca (sempre opacity + blur + posição juntos)
F3  Eixo óptico dos elementos alinhado (não parecem soltos, flutuando)
F4  Dentro da safe area (nada cortado nas bordas, nada na dead zone da base)
F5  Isto pareceria um slide de PowerPoint se eu mostrasse parado?
```

Regra dura: nota abaixo de 8 em QUALQUER fundamental reprova a composition inteira,
mesmo que os outros estejam em 10. Nunca tirar média pra esconder uma nota fraca. F1
e F5 juntos são o "teste do frame congelado": pausar em qualquer instante e perguntar
se ainda parece intencional, ou se parece um slide estático com enfeite. Sem
`approval.json` aprovado, `render.js --mode final` aborta antes de renderizar (ver
`pre-render-gate.md`). Detalhe completo:
`squads/motion/docs/zeus-motion-design-system.md` (seção 5).

## Checklist de aprovação

### Técnico (25 pontos)
- [ ] Render completa sem erros (exit code 0): 10p
- [ ] Arquivo .mp4 existe e tem tamanho > 0: 5p
- [ ] Duração correta (confirmar com ffprobe ou abrir no player): 5p
- [ ] Resolução correta (1080x1920 para vertical): 5p

### Visual (25 pontos)
- [ ] Safe zones respeitadas (nada cortado nas bordas): 10p
- [ ] Hierarquia visual clara (título maior que corpo): 5p
- [ ] Cores da marca aplicadas corretamente: 5p
- [ ] Sem artefatos visuais (glitches, flickers): 5p

### Timing (25 pontos)
- [ ] Animações naturais (não robóticas): 10p
- [ ] Delays criam ritmo e hierarquia: 10p
- [ ] Duração total adequada para plataforma alvo: 5p

### Copy (25 pontos)
- [ ] Acentuação perfeita em todos os textos: 10p
- [ ] Copy alinhado com objetivo do vídeo: 10p
- [ ] CTA claro e acionável: 5p

## Threshold por tipo de vídeo

| Tipo | Score mínimo |
|------|-------------|
| Vídeo de marketing (SquadPromo, etc.) | 80 |
| Composition de demonstração | 70 |
| Rascunho para aprovação | 60 |

## Protocolo em caso de falha

Score < threshold:
1. Identificar quais critérios estão abaixo
2. Delegar correções para o agente especialista
   - Visual/Timing → motion-reviewer
   - Copy/Texto → copy-layer-reviewer
   - Técnico → render-engineer
3. Reprocessar após correções
4. Reavaliar (máx 2 iterações antes de entregar com ressalvas)

## Comando de verificação técnica

```bash
# Confirmar que o arquivo existe e tem tamanho
ls -lh sua-pasta-do-zeus

# Verificar duração (se ffprobe disponível)
ffprobe -v quiet -print_format json -show_format output.mp4 | grep duration
```

## Entrega ao usuário

Formato de entrega:
```
Video renderizado.

Arquivo: C:\Users\[usuario]sua-pasta-do-zeus].mp4
Duracao: 21 segundos
Resolucao: 1080x1920 (vertical)
Score: 87/100
```
