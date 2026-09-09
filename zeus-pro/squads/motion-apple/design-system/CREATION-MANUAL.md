# Manual de criação — como inventar um recurso novo sem sair do sistema

Para quando a fala pede algo que **não existe** no registry. O objetivo não é
liberdade: é fazer o novo nascer com a mesma gramática, para que ninguém
perceba que ele é novo.

Antes de criar, **tente três vezes não criar**:

1. O `registry/semantic-registry.json` tem a estrutura sob outro nome?
   (bifurcação e árvore de decisão são coisas diferentes; escolha e decisão não.)
2. Um recurso existente com **variação** resolve? (número de itens, orientação,
   com/sem imagem, com/sem número, versão motion × completa)
3. A combinação de dois existentes resolve? (linha do tempo + número; painel +
   apontamento)

Se as três respostas forem não, crie — e siga o processo abaixo inteiro. Um
recurso criado pela metade contamina o sistema.

---

## PARTE 1 · As sete perguntas antes de desenhar

1. **Que relação a fala afirma?** Escreva numa frase começando com um verbo:
   "duas coisas se excluem", "uma vira três", "isto trava aquilo". Se você não
   consegue escrever essa frase, não é esquema — é destaque, número ou legenda.
2. **Qual o invariante?** O que fica imóvel para o resto ter sentido (a base, o
   eixo, o centro, o contêiner). Sem invariante, o desenho vira animação solta.
3. **Quais são os dados de entrada mínimos?** Liste os campos obrigatórios. Se
   um deles costuma faltar na fala, o recurso nasce errado: reduza o escopo.
4. **Quantos itens?** Mínimo, ideal, máximo. Acima de 5 itens de significado,
   divida a cena — não aumente o recurso.
5. **Quem carrega a cor?** Um portador, sempre em traço. Se você não consegue
   apontar UM, o recurso tem foco demais.
6. **O que o espectador entende sem áudio?** Descreva o frame de repouso. Se
   só fizer sentido com a voz, o desenho não está representando nada.
7. **Qual recurso existente ele torna redundante?** Se a resposta for "nenhum",
   ótimo. Se for "dois", você provavelmente está criando uma variação, não um
   recurso.

---

## PARTE 2 · Vocabulário fechado (só combine estas peças)

Um recurso novo **não inventa forma**. Ele combina as peças que já existem:

| Peça | Especificação | Para que serve |
|---|---|---|
| **Nó** | círculo 112–148, borda 2 gray200, ícone dentro (40–64) | entidade |
| **Bloco** | 280×158, raio 24, glass | conceito com rótulo |
| **Célula** | quadrado 70–108, raio 18–24 | unidade contável |
| **Pill** | altura 40–64, raio 999, glass ou borda 1 | rótulo, estado |
| **Cartão** | raio 24–32, glass, padding 20–24 | agrupamento, painel |
| **Conector** | linha 6 gray200, ponta chevron 18 | relação, direção |
| **Trilho** | 6–10 de altura, raio metade, gray100 + preenchimento black | progresso, escala |
| **Anel** | 3 (≤48) · 4 (49–100) · 6 (>100), espectro, vazado | foco (um por cena) |
| **Traço** | 4, 95% da caixa, curva de 2 no centro | ênfase de palavra |
| **Número** | §11 / `numbers-spec.json` | dado |
| **Rótulo** | 30 palco · 24 esquema/unidade · 22 interface · 18 recuado | nome |
| **Divisória** | hairline 1 gray100 | ritmo dentro de cartão |
| **Barra de texto** | 6–12 de altura, gray200/gray600, máx. 3 por bloco | texto simbólico (motion) |
| **Véu** | rgba(255,255,255,.55) sobre imagem | contexto de evidência |

**Proibido inventar:** forma orgânica, ilustração, render 3D, seta curva
desenhada à mão, textura, gradiente em preenchimento, sombra colorida, ícone
preenchido, emoji, moldura decorativa.

---

## PARTE 3 · Geometria (o que mata a maioria dos recursos novos)

O palco padrão é **904 × 374** (dois vídeos no topo). Calcule antes de desenhar:

```
largura usada = n × largura_item + (n − 1) × gap        ≤ 904
altura usada  = linhas × altura_item + (linhas − 1) × gap + padding  ≤ 374
```

Referências que cabem:
- 3 blocos de 280 + 2 gaps de 18 = **876** ✓ (4 blocos não cabem)
- 3 nós de 148 + 2 conectores de 216 = **876** ✓
- células quadradas: **sempre 3 colunas**; 4 linhas → célula ≤ 78 · 3 linhas →
  célula ≤ 108 (regra §4c)
- 2 colunas de 400 + 44 = **844** ✓

**Duas travas de CSS que já nos custaram três rodadas.** (a) `height` fixo numa
linha `display:flex` menor que o filho mais alto: o filho transborda, e com
`align-items:flex-end` transborda para **cima** — deixe a linha dimensionar pelo
conteúdo e centralize no palco. (b)  em grade com rótulo, nunca
`repeat(n,1fr)` — isso é `minmax(auto,1fr)` e a palavra mais longa fixa o piso
da faixa; a grade estoura o cartão e reduzir o painel não resolve. Use colunas
**fixas em px** ou `minmax(0,1fr)`, e encurte o rótulo.

Se não couber, **nesta ordem**: (1) reduza o número de itens; (2) reduza o
item; (3) vá para o palco expandido (904×790 com um vídeo, ou 904×1254 em tela
cheia). Nunca encolha o rótulo abaixo de 22 para caber.

Espaço: escala 6 (6 · 12 · 18 · 24 · 44 · 88). Raio: filho = pai − padding.

---

## PARTE 4 · Movimento (obrigatório, não opcional)

Escreva a linha do tempo em **quadros a 60fps**, na receita padrão:

```
[in]    contexto entra pronto        reveal 12–18q   opacity 0→1, scale .98→1, blur 6→0
[build] estrutura em cascata         response 20q    round(i × 4)
[act]   a ação narrada, um gesto     em t − 6q da palavra
[focus] o anel nasce e migra         transfer 20–24q recuo dos irmãos no mesmo intervalo
[hold]  sustentação                  ≥ 60q           imóvel e legível
[out]   saída junta                  exit 24q        scale 1→1,02, blur 0→6, overlap 10q
```

Regras que valem para todo recurso novo:
- **Uma propriedade primária por ação** (+ uma auxiliar, justificada).
- O objeto respeita sua natureza: trilho preenche, conector desenha, nó aparece,
  número conta ou revela, lista insere e desloca.
- Recuo é por **contraste** (gray400, opacity .6). Blur ≤3 só em ícone, imagem
  ou bloco — **nunca em rótulo**.
- Nada em linha reta, exceto playback e progresso real.
- Sem overshoot, sem respiração, sem rotação, sem brilho como repouso.
- **Teste de subtração:** remova blur, scale, stagger e rotação um por vez; se a
  compreensão não piora, fique com a versão mais simples.

---

## PARTE 5 · Som

Atribua peso 0–10 a **cada** movimento, por `sfx-map.json`:

- 0 = silêncio obrigatório (traço, contagem em curso, legenda, áudio real)
- 1–2 tick mínimo · 3–4 tick/sweep/pop · 5–6 médio/ding/click
- 7–8 grave/whoosh longo · 9–10 só N3 e selo de fecho

Densidade: ≤1 som por 2,5s; eventos a menos de 8q → corta o de menor peso;
cascata de 6+ → soam 1º, meio e último; **soma dos pesos da cena ≤ 22**.

---

## PARTE 6 · Contrato para o Remotion

Todo recurso novo entrega estes campos — é o que o código consome:

```
id                 familia.nome.v1        (famílias existentes; não crie família nova sem necessidade)
inputs             campos obrigatórios e opcionais, com tipo
itemCount          { min, ideal, max }
layout             largura/altura de cada peça + gaps + fórmula que prova ≤904×374
focusSchedule      [{ startFrame, durationFrames, fromElementId, toElementId }]
motionSpec         por objeto: nature, semanticVerb, primaryProperty, easingToken,
                   startFrame, durationFrames, invariants, finalReadableState
sfxSchedule        [{ eventId, weight, frame }]
dataMode           real | illustrative
captionPolicy      keep | replace-equivalent | none
sceneFamily        de scene-registry.json
density            0–5
fallback           o que fazer quando um input obrigatório falta
```

Implementação: 60fps, toda propriedade = `f(inputs, frame)`, sem
`Date.now`/`Math.random`/`setInterval`; intervalos `[início, fim)`; arredonde
uma vez por evento; `transformOrigin` explícito; `strokeDashoffset` com
comprimento medido (`getTotalLength()`); anel como máscara
(`mask-composite: exclude`), nunca preenchimento.

---

## PARTE 7 · Registro (sem isto, o recurso não existe)

1. **`registry/visual-registry.json`** — entrada nova com os 14 campos
   obrigatórios, incluindo `dontUseWhen`, `alternatives` e `commonErrors`.
2. **`registry/semantic-registry.json`** — adicione o id nas estruturas que
   ele atende (e remova de onde ele passa a ser melhor que outro).
3. **`registry/diagram-registry.json`** ou **`interface-registry.json`** — se
   for relação ou plataforma.
4. **`design-router.json`** — gatilhos (expressões inteiras, não só palavras) e,
   se necessário, uma regra em `relation_rules`.
5. **Painel** — um espécime na seção correspondente, com legenda no formato
   **o que é · como funciona · variações · comportamento**.
6. **Guia** — a regra, se ela for nova (não repita o que já está escrito).
7. **`icons-map.json`** — se usou um conceito novo de ícone.
8. **`CHANGELOG.md`** — o que entrou, e o que ficou redundante.
9. **`sfx-map.json`** — se criou um gesto novo.

Status: `exploracao` até ser usado num vídeo aprovado; só então
`aprovado-visual`. **Nada entra na biblioteca aprovada no meio de um lote.**

---

## PARTE 8 · Checklist de aprovação (11 itens)

Um recurso novo só é aprovado se passar em todos:

1. A frase da relação existe e o desenho a mostra **sem áudio**.
2. Só peças do vocabulário fechado (Parte 2).
3. Geometria provada por conta (Parte 3), rótulos ≥22.
4. Um portador de cor, em traço, ≤5% da tela.
5. Sólido preto ≤64 por item, ≤3 por cena.
6. Movimento com as quatro curvas, sem overshoot, recuo por contraste.
7. Nenhum blur em rótulo.
8. Hold ≥60q e frame de repouso legível como imagem.
9. Som com pesos declarados, soma ≤22.
10. Fallback escrito para input ausente — e **nada inventado** quando falta dado.
11. Registrado nos 9 lugares da Parte 7.
12. Legenda do espécime **lida do markup**, não digitada de memória: largura,
    célula, colunas, itens e durações batendo com o que está construído.

---

## PARTE 9 · Erros que já cometemos (não repita)

- **Render 3D no palco** (baleia/sardinha): três linguagens no mesmo canal. Virou
  dois círculos com o mesmo ícone em escalas diferentes — o argumento é a escala.
- **Gráfico de som "bonito"** com barras aleatórias: onda gravada tem forma fixa
  (tabela) e só o playback muda a cor.
- **Cor em dois lugares** (conector + anel): conector passou a cinza sempre.
- **Blur como recuo padrão**: virou contraste; blur só em ícone/imagem/bloco.
- **Grade 4×3 num canvas retrato**: células quadradas são 3 colunas.
- **Texto real dentro de interface de vídeo**: virou barra; só o dado lido é texto.
- **Contar um preço**: preço revela; conta só o que evolui.
- **Ponto sólido de espectro**: virou mini-anel 14 vazado.
- **Seta curva desenhada à mão**: virou conector reto com chevron.
- **Esquema para fala sem relação** (depoimento): a resposta certa era densidade 0.
