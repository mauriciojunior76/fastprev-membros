# Regras Visuais - Zeus Show

Regras invioláveis que todo agente de design segue. Se uma regra aqui conflita com o briefing do mentor, prevalece a regra.

---

## 1. Fundo do body sempre definido

Todo HTML gerado TEM `background` no body e html. Nunca confiar no padrão branco do navegador.

```css
html, body { background: var(--bg); }
```

Tema Neutro (padrão): `background: #0c0e1a`
Tema Apple: `background: #ffffff`
Tema Vintage: `background: #f5ede0`

Este é o Erro #1 aprendido. Gate obrigatório.

---

## 2. Contraste WCAG AA mínimo

- Texto normal: razão de contraste 4.5:1
- Texto grande (>18px negrito ou >24px regular): razão 3.0:1
- Contrast Checker valida cada combinação foreground + background
- Se falhar: ajusta luminância do foreground até passar

---

## 3. Hierarquia visual (branco + accent)

Nunca usar o accent em TODOS os elementos. Alternar:

- Títulos e números de destaque: branco puro (#fff no dark, #000 no claro)
- Palavras-chave e labels: cor accent do tema
- Corpo: branco suave (rgba 0.55) ou cinza neutro
- Tags e subtextos: accent muted

Erro #3 aprendido: saturar tudo na cor de destaque embaralha a leitura.

---

## 4. Responsive obrigatório

- Mobile 375px: sem overflow horizontal
- Tablet 768px: layout adaptado
- Desktop 1920px: full experience

Usar `clamp()` para tipografia, `min()` e `max()` para containers.

---

## 5. Grain overlay quando o tema pede

Temas com `"grain": true` no JSON aplicam:

```css
body::after {
  content: "";
  position: fixed;
  inset: 0;
  background: url("data:image/svg+xml,<svg><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23g)'/></svg>");
  opacity: 0.4;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: overlay;
}
```

---

## 6. Tipografia via clamp()

Tamanhos nunca fixos em px. Sempre:

```css
h1 { font-size: clamp(2.5rem, 5vw, 5rem); }
h2 { font-size: clamp(1.8rem, 3vw, 3rem); }
p  { font-size: clamp(1rem, 1.5vw, 1.2rem); }
```

---

## 7. Ícones nunca emoji unicode

Exceto quando o mentor escolheu explicitamente "ícones: emojis". Padrão é:

1. Biblioteca Exemplo (50 ícones)
2. Fallback: Tabler, Lucide ou Phosphor (External Icon Integrator)
3. Se nada funciona: tipografia pura sem ícone

---

## 8. Animações suaves, nunca bruscas

- Entrada: `cubic-bezier(0.16, 1, 0.3, 1)` ou variante do tema
- Spring physics para overshoot: `cubic-bezier(0.34, 1.56, 0.64, 1)`
- Duração: 300-700ms para entrada, 150-300ms para hover
- Nunca `ease-in` puro (entra arrastado)

---

## 9. Countdown só onde faz sentido

Apenas em prelúdios, apenas nos slides planejados. Nunca fixo em todos os slides.

Erro #4 aprendido.

---

## 10. Dark mode é padrão para prelúdio

Temas claros (Apple, Vintage, Editorial, Corporativo) ficam melhores em aula e ebook. Prelúdio funciona melhor em dark (Exemplo, Futurista). Se o mentor escolher tema claro para prelúdio, a Color Guard avisa e sugere escurecer 20%.
