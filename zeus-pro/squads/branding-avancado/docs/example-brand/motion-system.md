# Motion System — AXIS
**Agente:** Vex (page-visual-specialist) + Rio (ui-standards)
**Nível:** N1 — ESSÊNCIA
**Output:** Filosofia de motion, tokens, microanimações, transições, loader, prefers-reduced-motion

---

## Filosofia de Motion

### Metáfora Central

**"Como cálculo executando."**

O movimento em AXIS é o movimento de um sistema de processamento de dados: determinístico, preciso, sem hesitação. Não há bounces, não há springs, não há overshot. Cada elemento se move de A para B pelo caminho mais eficiente, no tempo exato que a ação requer.

Não é animação que "encanta". É animação que comunica estado.

**Metáfora secundária:** "Como agulha de instrumento de precisão." — O ponteiro de um galvanômetro de laboratório não oscila nem hesita. Move-se com velocidade proporcional à mudança. Para na posição exata. Não vibra quando para.

---

## O Que Motion É para AXIS — 3 Qualidades

### 1. Resposta Exata
Cada animação é resposta a uma ação do usuário ou mudança de estado do sistema. Nada anima "por decoração". Se um elemento se move, é porque algo mudou.

### 2. Economia de Movimento
A menor distância entre dois estados. Sem delays desnecessários, sem fases intermediárias que não carregam informação. Duração de animação é proporcional à magnitude da mudança — uma mudança pequena (cor de hover) dura menos que uma mudança grande (abertura de modal).

### 3. Continuidade de Contexto
O usuário nunca perde contexto de onde estava. Transições mantêm a relação espacial entre origem e destino. Dados que saem e entram mantêm sua posição relativa.

---

## O Que Motion NUNCA É para AXIS — 3 Anti-Padrões

### 1. Entretenimento
Não existe animação de "bem-vindo", confetes de conclusão de tarefa, mascote animado, ou qualquer sequência que anime para emocionar. O gestor de fundo abre o AXIS para trabalhar, não para assistir.

### 2. Bounce / Spring / Overshoot
Curvas elásticas ou de spring (tipo `cubic-bezier(0.175, 0.885, 0.32, 1.275)`) são proibidas. Comunicam playfulness — o oposto de precisão. AXIS nunca ultrapassa o ponto de destino.

### 3. Animação Contínua Sem Trigger
Elementos que pulsam, brilham, orbitam ou se movem continuamente sem ação do usuário são ruído visual. A única exceção é o loader (quando há processamento real acontecendo) e o counter de dados em tempo real.

---

## Timing Tokens

| Token | Valor | Uso |
|-------|-------|-----|
| `duration-micro` | `80ms` | Mudança de cor em hover, focus ring |
| `duration-fast` | `150ms` | Button press, checkbox toggle, badge appear |
| `duration-normal` | `220ms` | Card hover elevation, dropdown open/close |
| `duration-medium` | `300ms` | Drawer slide, tab switch, panel expand |
| `duration-slow` | `450ms` | Modal open, page transition, chart reveal |
| `duration-enter` | `350ms` | Elementos entrando na view (scroll trigger) |
| `duration-exit` | `200ms` | Elementos saindo (sempre mais rápido que entrada) |
| `duration-counter` | `1200ms` | Number counter animation (dashboard load) |
| `duration-skeleton` | `1500ms` | Skeleton shimmer cycle (loop) |
| `duration-logo` | `800ms` | Logo reveal animation (total) |

**Regra de saída vs entrada:**
Elementos saindo animam 30-40% mais rápido que entram.
Saída é consequência; entrada é comunicação de novo contexto.

---

## Easing Curves

```css
/* Padrão principal — desaceleração limpa, chegada precisa */
--ease-out-precise: cubic-bezier(0.0, 0.0, 0.2, 1.0);

/* Entrada de dados — acelera no início (sistema "lançando" dado) */
--ease-in-data: cubic-bezier(0.4, 0.0, 1.0, 1.0);

/* Hover / Focus — simétrico, não direcional */
--ease-standard: cubic-bezier(0.4, 0.0, 0.2, 1.0);

/* Número counter — desaceleração pronunciada no fim (como ponteiro parando) */
--ease-counter: cubic-bezier(0.0, 0.0, 0.05, 1.0);

/* Exit — aceleração simples, sai sem cerimônia */
--ease-exit: cubic-bezier(0.4, 0.0, 1.0, 1.0);

/* Modal/Drawer — overshoots proibidos — use este, não spring */
--ease-modal: cubic-bezier(0.0, 0.0, 0.3, 1.0);
```

---

## Microanimações de Componentes

### Button — Primary / Secondary / Ghost

```css
/* Estado: default → hover */
transition: background-color var(--duration-micro) var(--ease-standard),
            border-color var(--duration-micro) var(--ease-standard),
            box-shadow var(--duration-micro) var(--ease-standard);

/* Estado: hover → active (press) */
.btn:active {
  transform: scale(0.98);
  transition: transform 60ms var(--ease-in-data);
}

/* Release de active → default */
.btn:not(:active) {
  transition: transform var(--duration-fast) var(--ease-out-precise);
}

/* Loading state: texto desaparece, spinner aparece */
.btn.loading .btn-label {
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease-exit);
}
.btn.loading .btn-spinner {
  opacity: 1;
  transition: opacity var(--duration-fast) var(--ease-out-precise);
}
```

**Spinner do button:**
```css
.btn-spinner {
  width: 14px;
  height: 14px;
  border: 1.5px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin var(--duration-skeleton) linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

### Input

```css
/* Focus ring — aparece progressivamente */
.input:focus {
  border-color: #C9A84C;
  box-shadow: 0 0 0 3px rgba(201, 168, 76, 0.0);
  transition: border-color var(--duration-micro) var(--ease-standard),
              box-shadow var(--duration-fast) var(--ease-out-precise);
}
.input:focus {
  box-shadow: 0 0 0 3px rgba(201, 168, 76, 0.12);
}

/* Error state — borda muda de cor */
.input.error {
  border-color: #E74C3C;
  transition: border-color var(--duration-fast) var(--ease-standard);
}

/* Error message — slide in from top */
.input-error-msg {
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: max-height var(--duration-normal) var(--ease-out-precise),
              opacity var(--duration-fast) var(--ease-out-precise);
}
.input.error .input-error-msg {
  max-height: 24px;
  opacity: 1;
}
```

---

### Card (Data Card)

```css
/* Hover — elevation aumenta, borda brightens */
.card {
  transition: background-color var(--duration-normal) var(--ease-standard),
              border-color var(--duration-normal) var(--ease-standard),
              box-shadow var(--duration-normal) var(--ease-out-precise);
}

/* Entry animation (scroll-triggered) */
.card[data-animate="enter"] {
  opacity: 0;
  transform: translateY(8px);
  transition: opacity var(--duration-enter) var(--ease-out-precise),
              transform var(--duration-enter) var(--ease-out-precise);
}
.card[data-animate="visible"] {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger para grupos de cards: delay de 60ms por card */
.card:nth-child(1) { transition-delay: 0ms; }
.card:nth-child(2) { transition-delay: 60ms; }
.card:nth-child(3) { transition-delay: 120ms; }
.card:nth-child(4) { transition-delay: 180ms; }
```

---

### Table Row

```css
/* Hover — background muda, sem transform */
.table-row {
  transition: background-color var(--duration-micro) var(--ease-standard);
}

/* Seleção — borda esquerda desliza de fora */
.table-row td:first-child {
  border-left: 2px solid transparent;
  transition: border-color var(--duration-fast) var(--ease-out-precise);
}
.table-row.selected td:first-child {
  border-left-color: #C9A84C;
}

/* New data row appearing (real-time updates) */
.table-row[data-new="true"] {
  animation: rowFlash var(--duration-slow) var(--ease-out-precise) 1;
}
@keyframes rowFlash {
  0%   { background-color: rgba(74, 159, 212, 0.15); }
  100% { background-color: transparent; }
}

/* Row de dado removido */
.table-row[data-removing="true"] {
  animation: rowFade var(--duration-exit) var(--ease-exit) 1 forwards;
}
@keyframes rowFade {
  0%   { opacity: 1; max-height: 32px; }
  100% { opacity: 0; max-height: 0; }
}
```

---

### Chart Reveal (AXIS-specific)

```css
/* Line chart — desenha a linha progressivamente */
.chart-line {
  stroke-dasharray: var(--line-length);
  stroke-dashoffset: var(--line-length);
  animation: drawLine var(--duration-slow) var(--ease-out-precise) forwards;
  animation-delay: 100ms;
}
@keyframes drawLine {
  to { stroke-dashoffset: 0; }
}

/* Área sob a linha — fade in após a linha completar */
.chart-area {
  opacity: 0;
  animation: areaFade var(--duration-normal) var(--ease-out-precise) forwards;
  animation-delay: 400ms; /* após line draw */
}
@keyframes areaFade {
  to { opacity: 1; }
}

/* Data points (dots) — aparecem após área */
.chart-dot {
  transform: scale(0);
  animation: dotPop var(--duration-fast) var(--ease-out-precise) forwards;
  animation-delay: calc(600ms + (var(--dot-index) * 30ms));
}
@keyframes dotPop {
  to { transform: scale(1); }
}
```

---

## Number Counter Animation (AXIS Data Dashboard)

Animação específica para KPIs e métricas financeiras que carregam ao abrir o dashboard.

```css
/* Wrapper do número */
.data-counter {
  font-family: 'JetBrains Mono', monospace;
  font-size: 48px;
  font-weight: 400;
  color: #F5F7FA;
  letter-spacing: -0.02em;
}

/* Implementação JavaScript */
/*
  Algoritmo: easeOutQuart
  Duração: 1200ms (duration-counter)
  Início: 0 ou valor anterior
  Fim: valor real do dado

  Easing function:
  function easeOutQuart(t) { return 1 - (--t) * t * t * t; }

  Formatação durante animação:
  - Manter casas decimais fixas (ex: sempre 2 casas)
  - Manter prefixo/sufixo estático (R$, %, BPS)
  - Separador de milhar desde o início (não "jumpa" de formato)
*/
```

```javascript
function animateCounter(element, from, to, duration = 1200, decimals = 2) {
  const startTime = performance.now();
  const prefix = element.dataset.prefix || '';
  const suffix = element.dataset.suffix || '';

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function formatNumber(value) {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }

  function tick(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutQuart(progress);
    const current = from + (to - from) * eased;

    element.textContent = prefix + formatNumber(current) + suffix;

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}
```

**Comportamento de variação (positivo/negativo):**
```
Valor positivo (vs período anterior):
  - Counter vai de 0 → valor
  - Cor final: #2ECC71 (green) por 800ms, depois #F5F7FA

Valor negativo:
  - Counter vai de 0 → valor (negativo mostrado com -)
  - Cor final: #E74C3C (red) por 800ms, depois #F5F7FA
```

---

## Loading Skeleton para Financial Data

```css
/* Skeleton base */
.skeleton {
  background: linear-gradient(
    90deg,
    #1C2B3A 0%,
    #243344 50%,
    #1C2B3A 100%
  );
  background-size: 200% 100%;
  animation: shimmer var(--duration-skeleton) ease-in-out infinite;
  border-radius: 2px;
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Variantes por tipo de dado */
.skeleton-kpi {
  height: 48px;
  width: 140px;
  margin-bottom: 8px;
}
.skeleton-kpi-label {
  height: 14px;
  width: 80px;
}
.skeleton-table-row {
  height: 32px;
  width: 100%;
  margin-bottom: 1px;
}
.skeleton-chart {
  height: 200px;
  width: 100%;
}
.skeleton-chart-line {
  height: 2px;
  width: 70%;
  margin-top: 100px;
  opacity: 0.5;
}

/* Stagger entre skeletons */
.skeleton:nth-child(1) { animation-delay: 0ms; }
.skeleton:nth-child(2) { animation-delay: 150ms; }
.skeleton:nth-child(3) { animation-delay: 300ms; }
```

---

## Slide Transitions — Deck de Apresentação

| Transição | Tipo | Duração | Justificativa |
|-----------|------|---------|--------------|
| Slides principais | Fade | 300ms | Não há relação espacial entre slides — fade é neutro e preciso |
| Drill-down (slide filho) | Slide-left | 350ms, ease-out | Comunicar "entrando em detalhe" — movimento para dentro |
| Voltar (slide pai) | Slide-right | 250ms, ease-out | Sair mais rápido que entrar — narrativa linear |
| Seção nova (capitular) | Cross-fade com scale 0.98→1 | 400ms | Mudança de capítulo — levemente mais lenta para marcar estrutura |
| Overlay de dado | Fade-up 8px | 220ms | Dado que complementa slide atual — não substitui |

**CSS para slide cross-fade:**
```css
.slide-exit {
  animation: slideExit 250ms var(--ease-exit) forwards;
}
.slide-enter {
  animation: slideEnter 350ms var(--ease-out-precise) forwards;
}

@keyframes slideExit {
  to { opacity: 0; }
}
@keyframes slideEnter {
  from { opacity: 0; }
  to   { opacity: 1; }
}
```

---

## Logo Animation

**Conceito:** Os dois eixos se constroem a partir do ponto de interseção, crescendo em direções opostas, até atingir proporção goldbar. O ponto de origem pulsa uma vez ao completar.

### Sequência (total: 800ms)

```
0ms    — Canvas vazio
0ms    — Ponto de origem aparece: circle 0px → 4px, fade-in 80ms
100ms  — Segmento X começa a crescer: esquerda e direita simultaneamente
         De: 0px em cada direção
         Para: comprimento final (proporção goldbar)
         Duração: 400ms, ease-out-precise
100ms  — Segmento Y começa a crescer: cima e baixo simultaneamente
         Ligeiro delay de timing para comunicar que X e Y são independentes
         Duração: 400ms, ease-out-precise
520ms  — Wordmark "AXIS" aparece: fade-in + translateY(4px → 0)
         Duração: 180ms, ease-out-precise
700ms  — Tagline aparece: fade-in
         Duração: 100ms, ease-standard
800ms  — Animação completa
```

**CSS:**
```css
.logo-x-axis {
  transform-origin: center;
  clip-path: inset(0 100% 0 100%); /* começa invisível */
  animation: growX 400ms var(--ease-out-precise) 100ms forwards;
}
@keyframes growX {
  to { clip-path: inset(0 0% 0 0%); }
}

.logo-y-axis {
  transform-origin: center;
  clip-path: inset(100% 0 100% 0);
  animation: growY 400ms var(--ease-out-precise) 100ms forwards;
}
@keyframes growY {
  to { clip-path: inset(0% 0 0% 0); }
}

.logo-origin-dot {
  transform: scale(0);
  animation: dotAppear 80ms var(--ease-out-precise) 0ms forwards;
}
@keyframes dotAppear {
  to { transform: scale(1); }
}
```

**Loop:** Não há loop. A animação executa uma vez (no carregamento da página ou transição para splash screen). Após completar, o logo é estático.

---

## Loader — Símbolo de Eixo

Para estados de carregamento de páginas inteiras (não de componentes individuais).

```css
/* O loader é o símbolo cross-axis que pulsa em sua origem */
.axis-loader {
  position: relative;
  width: 40px;
  height: 40px;
}

/* Eixo X — pulsa em comprimento */
.axis-loader__x {
  position: absolute;
  top: 50%; left: 0;
  width: 100%; height: 2px;
  background: #C9A84C;
  transform: translateY(-50%) rotate(7deg);
  transform-origin: center;
  animation: pulseX 1200ms var(--ease-out-precise) infinite alternate;
}
@keyframes pulseX {
  0%   { scaleX(0.7); opacity: 0.4; }
  100% { scaleX(1.0); opacity: 1.0; }
}

/* Eixo Y — pulsa em comprimento, fase oposta */
.axis-loader__y {
  position: absolute;
  left: 50%; top: 0;
  width: 2px; height: 100%;
  background: #C9A84C;
  transform: translateX(-50%) rotate(7deg);
  transform-origin: center;
  animation: pulseY 1200ms var(--ease-out-precise) 600ms infinite alternate;
}
@keyframes pulseY {
  0%   { scaleY(0.7); opacity: 0.4; }
  100% { scaleY(1.0); opacity: 1.0; }
}

/* Ponto de origem */
.axis-loader__dot {
  position: absolute;
  top: 50%; left: 50%;
  width: 6px; height: 6px;
  background: #C9A84C;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: dotPulse 1200ms var(--ease-out-precise) infinite;
}
@keyframes dotPulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1.0); opacity: 1.0; }
  50%       { transform: translate(-50%, -50%) scale(0.6); opacity: 0.5; }
}
```

---

## prefers-reduced-motion (Obrigatório)

```css
@media (prefers-reduced-motion: reduce) {
  /* Desabilitar todas as animações de movimento */
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* Manter apenas mudanças de opacity (não causam motion sickness) */
  .skeleton {
    animation: none;
    background: #243344; /* cor estática, sem shimmer */
  }

  .axis-loader {
    animation: none;
  }
  .axis-loader__x,
  .axis-loader__y {
    animation: none;
    opacity: 0.7;
  }
  .axis-loader__dot {
    animation: dotPulse-reduced 2000ms ease-in-out infinite;
  }
  @keyframes dotPulse-reduced {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }

  /* Counter: mostrar valor final imediatamente, sem animação */
  .data-counter[data-animate] {
    transition: none;
  }

  /* Chart: mostrar completo imediatamente */
  .chart-line {
    stroke-dashoffset: 0 !important;
    animation: none;
  }
  .chart-area {
    opacity: 1 !important;
    animation: none;
  }
}
```

---

## Design Tokens — JSON (Motion)

```json
{
  "motion": {
    "duration": {
      "micro":    { "value": "80ms",   "type": "duration", "description": "Mudança de cor, focus ring" },
      "fast":     { "value": "150ms",  "type": "duration", "description": "Badge, toggle, checkbox" },
      "normal":   { "value": "220ms",  "type": "duration", "description": "Card hover, dropdown" },
      "medium":   { "value": "300ms",  "type": "duration", "description": "Drawer, tab switch, panel" },
      "slow":     { "value": "450ms",  "type": "duration", "description": "Modal, page transition, chart" },
      "enter":    { "value": "350ms",  "type": "duration", "description": "Elementos entrando na view" },
      "exit":     { "value": "200ms",  "type": "duration", "description": "Elementos saindo da view" },
      "counter":  { "value": "1200ms", "type": "duration", "description": "Number counter — KPI dashboard" },
      "skeleton": { "value": "1500ms", "type": "duration", "description": "Skeleton shimmer loop" },
      "logo":     { "value": "800ms",  "type": "duration", "description": "Logo reveal total" }
    },
    "easing": {
      "out-precise": {
        "value": "cubic-bezier(0.0, 0.0, 0.2, 1.0)",
        "type": "cubicBezier",
        "description": "Padrão principal — chegada precisa sem overshoot"
      },
      "in-data": {
        "value": "cubic-bezier(0.4, 0.0, 1.0, 1.0)",
        "type": "cubicBezier",
        "description": "Entrada de dados, lançamento rápido"
      },
      "standard": {
        "value": "cubic-bezier(0.4, 0.0, 0.2, 1.0)",
        "type": "cubicBezier",
        "description": "Hover, focus — bidirecional"
      },
      "counter": {
        "value": "cubic-bezier(0.0, 0.0, 0.05, 1.0)",
        "type": "cubicBezier",
        "description": "Counter de número — ponteiro parando"
      },
      "exit": {
        "value": "cubic-bezier(0.4, 0.0, 1.0, 1.0)",
        "type": "cubicBezier",
        "description": "Saída — acelera sem cerimônia"
      },
      "modal": {
        "value": "cubic-bezier(0.0, 0.0, 0.3, 1.0)",
        "type": "cubicBezier",
        "description": "Modal, drawer — sem overshoot"
      }
    },
    "principles": {
      "no-bounce":   { "value": true,  "type": "boolean", "description": "Spring/bounce curves são proibidas" },
      "no-loop":     { "value": true,  "type": "boolean", "description": "Animações contínuas sem trigger são proibidas" },
      "exit-faster": { "value": "0.65", "type": "ratio",  "description": "Exit duration = Enter duration × 0.65" }
    }
  }
}
```

---

*Produzido por: Vex (page-visual-specialist) + Rio (ui-standards) — BRAND SQUAD SUPREMO*
*Nível: N1 ESSÊNCIA | Projeto: AXIS | Data: 2026-03-05*
