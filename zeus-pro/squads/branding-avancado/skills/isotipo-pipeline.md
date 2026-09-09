# Isotipo Pipeline — Sistema Completo de R$100k

## O que é Isotipo

Isotipo é o SÍMBOLO da marca isolado, sem texto.
Exemplos: Apple (maçã), Nike (swoosh), Twitter (pássaro).

**É a parte mais importante de toda a construção visual.**
É o primeiro elemento criado e o último que pode ser alterado.
Tudo na marca — cores, tipografia, voz, mockups — deriva do isotipo.

---

## A Lei Absoluta (Não Tem Exceção)

```
TODO ISOTIPO DEVE FUNCIONAR EM:
  ✅ Fundo BRANCO puro (#FFFFFF) — símbolo em preto
  ✅ Fundo PRETO puro (#000000) — símbolo em branco
  ✅ Fundo COR PRIMÁRIA — símbolo em contraste mínimo WCAG 4.5:1

Falhou em qualquer um → REPROVAR → redesenhar do zero.
```

---

## 12 Regras Absolutas de Isotipo Profissional

```
1. FLAT TOTAL
   Zero 3D, zero sombra, zero gradiente, zero metálico, zero textura.

2. PRETO E BRANCO PRIMEIRO
   Form-First: construir em P&B até a forma estar perfeita.
   Cor vem SEMPRE por último.

3. LEITURA MÚLTIPLA
   Mínimo 2 leituras simultâneas. Premium exige 3-5.
   Se tem só 1 leitura → isotipo fraco.

4. INVERSÃO OBRIGATÓRIA
   Funciona em fundo branco E preto — sem exceção.

5. ESPAÇO NEGATIVO ATIVO
   O vazio define tanto quanto o cheio.
   Espaço negativo pode ser a segunda leitura.

6. CONSTRUÇÃO MATEMÁTICA
   Nenhuma curva é "desenhada de olho".
   Tudo nasce de círculos, proporções e relações matemáticas.

7. ESCALA UNIVERSAL
   Funciona de 16×16px (favicon) até outdoor 10 metros.
   Aberturas internas mínimas: 8px em canvas 500px.

8. VETORIZÁVEL
   PNG é referência. O resultado final é vetorizado em SVG.

9. ATEMPORAL
   Não segue tendência visual. Deve funcionar por 10-100 anos.

10. MEMORÁVEL
    Desenhável de memória após 5 segundos de visualização.

11. TIPOGRAFIA ECHO
    A fonte do wordmark espelha o vocabulário visual do isotipo.

12. FUNDO NATURAL
    Todo isotipo tem um fundo onde "vive melhor" (claro, escuro ou neutro).
    Identificar e documentar o fundo natural.
```

---

## Os 5 Estilos Mestres

### ESTILO 1 — MONOLINE CONCEITUAL (Premium/Luxo)
```
Para: Mentoria alto ticket, luxo, marcas atemporais, consultoria
Técnica: Traço único espessura constante, zero preenchimento
Leituras: 3-5 conceitos simultâneos
Fundo natural: Escuro (o monoline flutua no preto)
Referências: REF-06 Casa+WiFi, REF-12 WOLF
Grid: Golden ratio ou circle-based
```

### ESTILO 2 — SOLID GEOMÉTRICO + NEGATIVO
```
Para: Tech, consumer, SaaS, marcas modernas
Técnica: Formas sólidas com negativo interno estratégico
Leituras: 2-3 conceitos
Fundo natural: Funciona igual em branco e preto
Referências: REF-01 mycode verde, REF-08 W diamonds, REF-09 AQTIA
Grid: Circle-based ou 8pt
```

### ESTILO 3 — ANGULAR POWER (Autoridade/Força)
```
Para: Moda, esporte, liderança, marcas de poder
Técnica: Triângulos e ângulos calculados, simetria bilateral perfeita
Leituras: 2-4 conceitos (foco em autoridade e força)
Fundo natural: Preto absoluto
Referências: REF-11 Crowned Apparel
Grid: Ângulos calculados, bilateral symmetry
```

### ESTILO 4 — LETTERMARK TRANSFORMADO
```
Para: Personal brands, iniciais, marcas com nome forte
Técnica: Letra transformada até ficar irreconhecível como letra
Leituras: Inicial + conceito + terceiro elemento
Fundo natural: Qualquer (neutro é mais seguro)
Referências: REF-05 NITOLNEO, REF-07 Grid A
Grid: Modular, unidade base U
```

### ESTILO 5 — MINIMALISMO RADICAL
```
Para: Luxo silencioso, estúdios premium, marcas que não precisam gritar
Técnica: Forma única, 10-15% do canvas, 85-90% vazio
Leituras: 1-2 (clareza máxima, não riqueza)
Fundo natural: Preto (o branco flutua com leveza impossível)
Referências: REF-10 Pássaro branco
Grid: Centrado, proporção radical
```

---

## Pipeline de Criação (Standard)

### Fase 1 — CONCEITO (Ikon + Lúmen)
```
1. Brief recebido → identificar essência da marca (verbo transformador)
2. Mapear arquétipo visual (animal / forma / letra / abstrato)
3. Definir 3 leituras alvo (R1 imediata + R2 descoberta + R3 conceitual)
4. Selecionar estilo (1 dos 5 acima)
5. Definir fundo natural candidato
```

### Fase 2 — CONSTRUÇÃO (Zeno)
```
1. Selecionar sistema de grid (circle-based / golden / 8pt / modular)
2. Canvas 500×500px, centro (250,250)
3. Definir círculos-guia e nós de construção
4. Traçar conectando nós (apenas arcos + retas, nunca Bézier livre)
5. Verificar simetria ponto a ponto
6. Documentar todos os ratios
```

### Fase 3 — EQUILÍBRIO (Vera)
```
1. Análise de peso visual por quadrante (máx 15% diferença)
2. Espaço negativo externo (mín 10%, ideal 20%)
3. Espaço negativo interno (mín 20% da área total)
4. Proporção relativa entre elementos (hierarquia clara)
5. Tensão visual (olho deve circular dentro do símbolo)
```

### Fase 4 — LEITURAS (Lúmen)
```
1. Verificar as 3 leituras alvo → estão presentes?
2. Buscar leituras não planejadas (bônus)
3. Verificar coexistência (leituras não se destroem)
4. Hierarquizar: principal / presente / profundo
5. Documentar tabela de leituras
```

### Fase 5 — TESTE DE INVERSÃO (Dax) — LEI
```
1. Cenário 1: Preto sobre branco
2. Cenário 2: Branco sobre preto
3. Cenário 3: Cor primária como fundo
4. Cenário 4: Cinza suave #F0F0F0 (luxury test)
5. Cenário 5: Escala mínima 32×32px
Aprovação: 5/5 cenários → prosseguir
```

### Fase 6 — PROMPT + GERAÇÃO (Nova)
```
1. Montar prompt técnico completo (8 blocos)
2. Gerar 3 variações
3. Avaliar outputs → selecionar melhor
4. Dax valida o output gerado
5. PNG aprovado vai para Mark (@logo-symbol)
```

---

## Pipeline Symbol-First (Símbolo Enviado pelo Usuário)

Quando o usuário traz o símbolo pronto (Nano Banana / Lovato):
```
→ Ver: squads/brand/workflows/symbol-first-pipeline.md
```

O pipeline invertido:
  SÍMBOLO PRONTO → Decodificação → Estratégia → Nome → Identidade → Apresentação

---

## As 12 Referências Mestras

| # | Caso | Estilo | Lição |
|---|------|--------|-------|
| 1 | mycode verde | Solid outline | Negativo define leitura |
| 2 | mycode azul | Monoline angular | Animal geométrico + letra |
| 3 | Hootsy | Solid radiante | Progressão rítmica |
| 4 | uptag | Solid modular | Padrão extraído do mínimo |
| 5 | NITOLNEO | Lettermark espelhado | Transformação irreconhecível |
| 6 | Casa+WiFi | Monoline premium ⭐ | Form-First, 5 leituras |
| 7 | Grid A | Lettermark variation | 1 letra → infinito |
| 8 | W diamonds | Circle-based ⭐ | Grid de círculos, negativo emerge |
| 9 | AQTIA | Diamond + echo ⭐⭐ | Fonte e símbolo = mesmo DNA |
| 10 | Pássaro | Minimalismo radical ⭐⭐ | Poder = contenção |
| 11 | Crowned Apparel | Angular power ⭐⭐ | Triângulos = autoridade |
| 12 | WOLF | Monoline animal ⭐⭐ | Face geométrica, fundo foto |

---

## Integração com Isotipo Squad

```
@isotipo-master (Ikon) — Maestro
  ├── @grid-architect (Zeno) — Construção matemática
  ├── @form-reader (Lúmen) — Leituras múltiplas
  ├── @balance-keeper (Vera) — Proporção e peso
  ├── @inversion-judge (Dax) — Teste de inversão (LEI)
  └── @prompt-forge (Nova) — Geração via IA

Skills: concept-to-form.md | prompt-power-system.md | typography-echo-system.md
```
