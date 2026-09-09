# MANUAL DE USO — motion.ts no Remotion
### Para Claude Code e Astra · Zeus Reels · 60fps · v3.0

Leia este arquivo **antes** de escrever qualquer componente. O MOTION-MANUAL.md
diz *o que* fazer; este diz *como* fazer no Remotion, sem inventar nada.

---

## 0. Instalação

```
src/
  motion/
    motion.ts                 ← copiar deste projeto, sem editar
    motion-spec.schema.json   ← validar specs no build
    sfx-map.json              ← do design system
  scenes/
    Scene01.tsx …
  specs/
    scene-01.spec.json · scene-01.sfx.json · scene-01.check.md
  Root.tsx
```

`Root.tsx`:
```tsx
import { Composition } from 'remotion';
import { FPS } from './motion/motion';
export const Root = () => (
  <>
    <Composition id="Reel" component={Reel} fps={FPS} width={1080} height={1920} durationInFrames={TOTAL} />
    <Composition id="Wide" component={Wide} fps={FPS} width={1920} height={1080} durationInFrames={TOTAL} />
  </>
);
```
Regras fixas: `fps={60}` sempre. Toda duração em quadros inteiros. `Math.round` uma vez por evento.

---

## 1. Fluxo obrigatório (nesta ordem, sem pular)

```
words.json (com tonic) ─▶ beatsFromWords() ─▶ classifyVerb() ─▶ INTENT[verb] + NATURE_OVERRIDE
      ─▶ MotionSpec[] ─▶ validateScene() / validateVideo() ─▶ SceneNN.tsx ─▶ sfxCueFor() ─▶ sfx.json
```
Se `validateScene` retornar erros, **não escreva o componente**. Corrija o spec.

### 1.1 Gerar o spec de um beat
```ts
import { beatsFromWords, classifyVerb, tonicWord, INTENT, NATURE_OVERRIDE,
         cueFrom, durationOf, staggerDelay, holdFrames, STEP, validateScene } from '../motion/motion';

const beats = beatsFromWords(words);
const b = beats[1];
const verb = classifyVerb(b.text);          // ex.: 'romper'
const tonic = tonicWord(b).tonic;           // quadro absoluto da sílaba tônica
const g = INTENT[verb];

const spec: MotionSpec = {
  elementId: 'card-price', nature: 'objeto', verb, sizePx: 420,
  startFrame: cueFrom(tonic, 'act'),                     // tonic − 6
  durationFrames: durationOf(typeof g.dur === 'number' ? 'transfer' : g.dur, 420, g.weight),
  ease: NATURE_OVERRIDE['objeto']?.ease ?? g.ease,       // natureza vence gesto
  weight: g.weight, ownerOfFocus: true,
  holdFrames: holdFrames(b.text),
};
const errors = validateScene([spec, ...outros], prevVerb);
```

---

## 2. Anatomia de um componente de cena

Sempre este esqueleto. Nada de `useState`, `useEffect` para animar, `Math.random`, `Date.now`.

```tsx
import { useCurrentFrame, Sequence, AbsoluteFill } from 'remotion';
import { enterStaged, exitStaged, tween, staggerDelay, STEP, highlight,
         counterAE, draw, focusRect, SCENE_OVERLAP } from '../motion/motion';
import spec from '../specs/scene-02.spec.json';

export const Scene02: React.FC<{ tonic: number; sceneEnd: number }> = ({ tonic, sceneEnd }) => {
  const frame = useCurrentFrame();                        // tempo LOCAL da Sequence
  const inStart  = tonic - 18;                            // [in]
  const outStart = sceneEnd - 24;                         // [out]
  const panel = enterStaged(frame, inStart, 24);
  const out   = exitStaged(frame, outStart, 24);
  const items = ['A','B','C','D'];

  return (
    <AbsoluteFill style={{ background: '#f5f5f7' }}>
      <div style={{ ...panel, ...out /* out sobrescreve quando ativo */ }}>
        {items.map((t, i) => {
          const s = tonic - 12 + staggerDelay(i, STEP.item, items.length);   // [build]
          const p = tween({ frame, start: s, duration: 20, from: 0, to: 1, ease: 'settle' });
          return <div key={t} style={{ opacity: p, transform: `scale(${0.98 + 0.02 * p})`,
                                       filter: `blur(${6 * (1 - p)}px)` }}>{t}</div>;
        })}
      </div>
    </AbsoluteFill>
  );
};
```
No pai:
```tsx
<Sequence from={sceneStart} durationInFrames={sceneLen + SCENE_OVERLAP}><Scene02 tonic={tonicLocal} sceneEnd={sceneLen} /></Sequence>
```
`tonicLocal = tonicAbsoluto − sceneStart`. **Nunca** subtraia startFrame duas vezes.

---

## 3. Receitas (copiar e preencher)

| Preciso de | Chamo | Observações |
|---|---|---|
| contexto entra | `enterStaged(frame, tonic−18, 24)` | opacity até 60%, blur/scale até 100% |
| cena sai | `exitStaged(frame, end−24, 24)` | opacity só a partir de 30% |
| cena → cena | `sceneHandoff(frame, outStart)` | devolve `{out, in}`; in começa no 14º q |
| item em cascata | `staggerDelay(i, STEP.item, n)` + `tween(... 'settle')` | teto 24q automático |
| destaque | `highlight(frame, tonic)` | `{ring, item, other}` — aplique `other` em TODOS os vizinhos |
| foco migra | `focusRect(frame, tonic−4, rectA, rectB)` + `focusHandoff(frame, tonic−4)` | um só nó de anel; A recua, não some |
| valor troca | `swapInPlace(frame, start, dir)` | dir 1 = novo vem de baixo (sobe) |
| conector | `draw(frame, start, pathLength)` | `pathLength` via `getTotalLength()` medido uma vez |
| contador | `counterAE(frame, start, to, from)` | duração real: `counterAEDuration(from, to)`; ding em `start + duração` |
| barra cresce | `tween(... 'lift')` + `transformOrigin: 'bottom center'` | nunca do centro |
| rolagem/empurra | `springAt(frame, start, 'inertia')` | vizinhos deslocam, não teleportam |
| nasce (selo) | `springAt(frame, start, 'elasticSoft')` | 1 por cena, ≤120px |
| horizontal | `transformStage(frame, tonic, faceBox)` | `{mask, camera, veil, moldSlot, moldFrame}` — 3 camadas |
| N3 em 16:9 | `darkenStage(frame, tonic)` | não recorta |

### 3.1 Contador completo
```tsx
const start = tonic - 6, to = 2997;
const v = counterAE(frame, start, to);
const settle = start + counterAEDuration(0, to);          // → sfx ding peso 5 neste quadro
<div style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: '-.04em' }}>{fmtBRL(v)}</div>
```

### 3.2 Horizontal (1920×1080)
```tsx
const T = transformStage(frame, tonic, faceBox);          // faceBox vem do spec (px)
<AbsoluteFill>
  <AbsoluteFill style={T.veil} />
  <AbsoluteFill style={T.mask}>
    <AbsoluteFill style={T.camera}><Video src={talking} /></AbsoluteFill>
  </AbsoluteFill>
  <div style={{ position: 'absolute', ...T.moldSlot, ...enterStaged(frame, T.moldFrame, 24) }}>{molde}</div>
</AbsoluteFill>
```

---

## 4. Som (derivado, nunca manual)
```ts
import { sfxCueFor, musicLevelForScene } from '../motion/motion';
const cues = specs.map(s => sfxCueFor(s, pickSfxId(s))).filter(Boolean);   // → scene-NN.sfx.json
const musicDb = musicLevelForScene(specs);
```
- `pickSfxId` lê `sfx-map.json` pelo par (gesto, peso). Peso 0 → sem cue.
- Cue dispara no **assento** (fim da cauda); quebra/entrada/nascer disparam no start.
- Peso ≥7 traz `duck` — aplique na trilha com `interpolate` e `EASE.smooth`, mesmo intervalo.
- Entrada e saída da mesma passagem nunca soam juntas.

---

## 5. Proibições (o validador e o revisor reprovam)
- Easing literal (`Easing.bezier(...)`, `cubic-bezier`) fora de `motion.ts`.
- Número mágico de duração/offset fora do spec.
- `scale` partindo abaixo de `.98` em entrada; deslocamento >16px (>22px em `dramatico`).
- `overshootMicro` fora de confirmação ≤48px. Qualquer overshoot em destaque ou texto.
- Dois donos de foco; dois gestos no mesmo `[act]`; mesmo verbo principal em cenas adjacentes.
- Hold < `holdFrames(texto)`. Cascata > 24q. Soma de pesos > 22.
- `useState`/`useEffect`/`requestAnimationFrame`/`Math.random`/`Date.now` para animar.
- Blur em rótulo lido (>2px). Fundo com blur. Duas camadas desfocadas.
- Sincronizar pelo início da frase (sempre `tonic`).

---

## 6. Entregáveis por cena (todos os quatro)
1. `specs/scene-NN.spec.json` — `MotionSpec[]`, validado contra o schema, com `verb`, `mold`, soma de pesos.
2. `scenes/SceneNN.tsx` — só helpers de `motion.ts`.
3. `specs/scene-NN.sfx.json` — de `sfxCueFor`.
4. `specs/scene-NN.check.md` — 12 itens do checklist marcados + o que o teste de subtração removeu.

## 7. Auto-revisão antes de entregar
Pause em `tonic`: o gesto principal está ~30% percorrido? Pause em `start + dur`: o objeto está parado, nítido, no lugar? Pause em `start + dur × 0,4`: já percorreu ~90%? Se alguma resposta é não, a cena volta.
