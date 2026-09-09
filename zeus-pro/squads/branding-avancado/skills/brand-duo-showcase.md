# Brand Duo Showcase — Padrão de Apresentação Positivo/Negativo

## STATUS: PADRÃO OBRIGATÓRIO
Toda apresentação de marca DEVE incluir o Duo Showcase como primeiro elemento visual
após a explicação do símbolo. Este padrão foi aprovado pelo usuário e é replicável.

---

## O Que É

Dois app icons lado a lado (Positivo + Negativo) dentro de um container preto com bordas
arredondadas. Mostra as duas versões principais da marca de forma limpa e profissional.

## Estrutura HTML

```html
<!-- ── HERO DUO: Positivo + Negativo lado a lado ── -->
<div style="
  background: var(--black);
  border-radius: 24px;
  padding: clamp(48px, 8vw, 96px) clamp(32px, 6vw, 80px);
  margin-top: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(32px, 5vw, 64px);
  flex-wrap: wrap;
">
  <!-- Positivo (Light) -->
  <div style="display:flex; flex-direction:column; align-items:center; gap:16px;">
    <div style="
      width: clamp(120px, 14vw, 160px);
      height: clamp(120px, 14vw, 160px);
      border-radius: 30px;
      background: var(--white);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 12px 48px rgba(0,0,0,0.5);
    ">
      <img src="./ISOTIPO.png" alt="Marca — Positivo"
           style="width:60%; height:60%; object-fit:contain; filter:none;">
    </div>
    <span style="font-size:11px; letter-spacing:0.14em; text-transform:uppercase;
                 color:var(--gray-600); font-weight:500;">Positivo</span>
  </div>

  <!-- Negativo (Dark) -->
  <div style="display:flex; flex-direction:column; align-items:center; gap:16px;">
    <div style="
      width: clamp(120px, 14vw, 160px);
      height: clamp(120px, 14vw, 160px);
      border-radius: 30px;
      background: var(--charcoal);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 12px 48px rgba(0,0,0,0.5);
      border: 1px solid rgba(255,255,255,0.06);
    ">
      <img src="./ISOTIPO.png" alt="Marca — Negativo"
           class="zspark-negative"
           style="width:60%; height:60%; object-fit:contain;">
    </div>
    <span style="font-size:11px; letter-spacing:0.14em; text-transform:uppercase;
                 color:var(--gray-600); font-weight:500;">Negativo</span>
  </div>
</div>
```

## Regras do Padrão

| Regra | Valor |
|-------|-------|
| Container fundo | `var(--black)` (#000000) — sempre preto puro |
| Container border-radius | 24px |
| Icon positivo fundo | `var(--white)` (#FFFFFF) |
| Icon negativo fundo | `var(--charcoal)` (#1D1D1F) |
| Icon border-radius | 30px (estilo iOS) |
| Icon shadow | `0 12px 48px rgba(0,0,0,0.5)` |
| Negativo border | `1px solid rgba(255,255,255,0.06)` — sutil para separar do fundo |
| Isotipo tamanho | 60% do container do icon |
| Labels | 11px, uppercase, letter-spacing 0.14em, gray-600 |
| Gap entre icons | `clamp(32px, 5vw, 64px)` |
| Posição na página | PRIMEIRO bloco visual após texto explicativo do símbolo |

## Variações Permitidas

- Adicionar um terceiro icon (ex: "App Icon" com border-radius menor)
- Ajustar cores do charcoal para a paleta específica da marca
- Adicionar label "App Icon" abaixo dos dois quando o contexto for mobile app

## Variações PROIBIDAS

- Nunca usar fundo cinza no container (sempre preto puro)
- Nunca mostrar o icon sem border-radius (sempre arredondado)
- Nunca recriar o isotipo em código — sempre `<img src>`
- Nunca usar sombra colorida — sempre sombra preta com opacidade

## Posição na Apresentação

```
02 O Símbolo
  ├── Headline + texto explicativo
  ├── Gênese Visual (raio + Z + AI = símbolo)
  ├── ★ HERO DUO (Positivo + Negativo) ← ESTE BLOCO
  └── Seção full-bleed (símbolo grande centralizado)
```

## Referência

- Skill: `squads/brand/skills/brand-duo-showcase.md`
- Exemplo real: `get-shit-done-main/zeus-brand/index.html` (seção 02)
- Aprovado: 2026-03-06
