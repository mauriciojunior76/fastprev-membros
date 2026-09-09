# Symbol-First Pipeline — De Símbolo Pronto a Marca Completa

## Situação
O usuário criou o símbolo (isotipo) no Nano Banana / Lovato e traz o PNG pronto.
Os agentes pegam esse símbolo e constroem TUDO em cima dele:
nome, estratégia, cores, tipografia, voz, identidade completa.

**Este é o workflow preferido do usuário. É o modo padrão.**

---

## Ativação

```
Quando o usuário enviar:
  → PNG/imagem de isotipo + "crie a marca" / "identidade" / "branding"
  → "aqui está o símbolo, agora faz tudo"
  → "crie em cima desse símbolo"
  → "símbolo pronto, preciso da marca completa"

→ ATIVAR Symbol-First Pipeline automaticamente
```

---

## O Princípio

```
FLUXO NORMAL DE BRANDING:
  Estratégia → Posicionamento → Arquétipos → ISOTIPO → Identidade

SYMBOL-FIRST (modo do usuário):
  ISOTIPO → DECODIFICAÇÃO → Estratégia → Posicionamento → Nome → Identidade

O símbolo é a âncora. Tudo nasce a partir do que o símbolo comunica.
O símbolo já tem a alma da marca — os agentes apenas revelam essa alma.
```

---

## Pipeline Completo

### FASE 0 — RECEPÇÃO DO SÍMBOLO

```
Agente: Ikon (@isotipo-master)
Input: PNG do isotipo enviado pelo usuário
Tempo: Imediato

Ikon executa:
  1. Análise visual completa (Nível Análise)
  2. Chama Lúmen → extrai TODAS as leituras (mín. 3)
  3. Chama Dax → verifica se passa no teste de inversão
  4. Chama Zeno → identifica sistema de grid provável
  5. Chama Vera → analisa proporção e peso visual

Output de Ikon: "DECONSTRUÇÃO COMPLETA" com:
  → 3-5 leituras hierarquizadas
  → Estilo classificado (monoline / solid / angular / minimal / lettermark)
  → Universo simbólico (o que esse símbolo "é" no mundo)
  → Segmentos onde esse símbolo funcionaria naturalmente
  → Segmentos onde NÃO funcionaria (honestidade é lei)
```

### FASE 1 — ESTRATÉGIA DERIVADA DO SÍMBOLO

```
Agente: Zeus (@brand-master) + Kyros (@brand-strategist)
Input: Deconstrução completa de Ikon

Kyros executa:
  1. Mapear as leituras do símbolo para arquétipos de marca
  2. Derivar o posicionamento do universo simbólico
  3. Definir: Quem é esse cliente ideal? (ICP visual)
  4. Definir: Que promessa esse símbolo já está fazendo?
  5. Definir: Que valores estão implícitos na forma?

Outputs:
  → Arquétipo principal e secundário (baseados no símbolo)
  → Posicionamento de 1 frase derivado das leituras
  → ICP visual (o tipo de pessoa que esse símbolo atrai)
  → Atributos da marca (3-5 palavras que o símbolo "é")
```

### FASE 2 — NOME (Naming from Symbol)

```
Agente: Semio (@naming-semantics)
Input: Leituras do símbolo + arquétipos + atributos

Semio gera 5 opções de nome que:
  → ECOAM o vocabulário visual do símbolo
  → São memoráveis e únicos
  → Têm domínio .com disponível (verificar)
  → Funcionam em português E inglês (ou são universais)

Para cada nome:
  → Rationale de 1 frase (por que esse nome + esse símbolo)
  → Como o nome e símbolo se reforçam
  → Pronuncia, memorização, registro

Formato de entrega:
  NOME RECOMENDADO: [X] → [rationale]
  Alternativas: [A], [B], [C], [D]
```

### FASE 3 — IDENTIDADE VISUAL (Derivada do Símbolo)

```
Agente: Vera (@visual-identity) + Lara (@color-tokens)

3A — PALETA DE CORES:
  → Analisar o isotipo e seu universo simbólico
  → Definir cor dominante que AMPLIFICA o isotipo (não compete)
  → Regra: A cor principal faz o isotipo parecer ainda mais poderoso
  → Paleta: 1 dominante + 1 acento + neutros
  → Especificar em HEX + RGB + CMYK + Pantone

3B — TIPOGRAFIA ECHO:
  → Chamar Typography Echo System (skill)
  → Display: fonte que espelha o vocabulário do símbolo
  → Body: fonte neutra complementar
  → Letter-spacing derivado do respiro do isotipo
  → Entregar: nomes das fontes + configurações de uso

3C — SISTEMA DE GRID:
  → Espaçamentos derivados das proporções do isotipo
  → Tamanhos de fonte em relação ao isotipo
  → Zona de proteção do símbolo
```

### FASE 4 — VOZ E PERSONALIDADE

```
Agente: Lyra (@storytelling) + Semio (@naming-semantics)

Derivar do símbolo:
  → Tom de voz (formal/íntimo/técnico/poético)
  → Vocabulário da marca (palavras que pertencem a essa identidade)
  → O que a marca nunca diz (anti-vocabulário)
  → Manifesto de 3-5 frases (a alma revelada)
  → Tagline derivada das leituras do símbolo

Exemplo WOLF:
  Símbolo: lobo geométrico = precisão + instinto + liderança
  Tom: direto, assertivo, sem enrolação
  Manifesto: "Você não precisa de um bando. Você precisa de clareza."
  Tagline: "Precisão de predador."
```

### FASE 5 — APRESENTAÇÃO COMPLETA

```
Agente: Mark (@logo-symbol) + Art (@art-finalizer)

Mark entrega:
  → Logotipo completo (símbolo + wordmark)
  → Versões: horizontal + vertical + símbolo isolado
  → Versões de cor: positivo + negativo + monocromático
  → Mockups: 3 aplicações do segmento identificado

Art finaliza:
  → Pasta de entrega organizada
  → Apresentação HTML luxury (luxury-brand-presentation.html template)
  → Quick guide de uso
  → Restrições de uso

Template de apresentação: `squads/brand/templates/luxury-brand-presentation.html`
```

---

## Output Final Entregue ao Usuário

```
📦 ENTREGA COMPLETA — [NOME DA MARCA]

01. ISOTIPO ANALISADO
    → Leituras decodificadas (3-5)
    → Estilo e construção identificados
    → Aprovação Dax (inversão)

02. ESTRATÉGIA
    → Arquétipos derivados do símbolo
    → Posicionamento de 1 frase
    → ICP visual

03. NOME
    → 1 nome recomendado + 4 alternativas
    → Rationale de cada opção

04. IDENTIDADE VISUAL
    → Paleta com HEX/RGB/CMYK
    → Tipografia echo (display + body + configurações)
    → Grid derivado do isotipo

05. VOZ
    → Tom + vocabulário + manifesto + tagline

06. APRESENTAÇÃO HTML
    → Luxury presentation no estilo AETERNA
    → Mockups aplicados

07. QUICK GUIDE
    → Como usar (cores, fontes, símbolo, grid)
    → O que nunca fazer
```

---

## Protocolo de Aprovação em Cada Fase

```
Zeus apresenta Fase → usuário aprova ou ajusta → próxima fase
Nunca pular para a próxima fase sem aprovação da anterior.
Se o usuário disser "continua" → próxima fase.
Se corrigir algo → ajustar + repetir apresentação antes de continuar.
```

---

## Compatibilidade com Segmentos

Este pipeline funciona para:

| Segmento do Símbolo | Derivação Automática |
|---------------------|---------------------|
| Animal geométrico | Arquétipo Herói/Explorador → naming forte |
| Diamond/Losango | Arquétipo Soberano/Sábio → naming premium |
| Angular/Coroa | Arquétipo Soberano → naming autoridade |
| Monoline abstrato | Qualquer arquétipo → naming conceitual |
| Lettermark | Mantém inicial → naming derivado |
| Minimalismo radical | Arquétipo Criador/Sábio → naming minimalista |

---

## Referências

- Template de apresentação: `squads/brand/templates/luxury-brand-presentation.html`
- Isotipo Squad: `squads/isotipo/SQUAD.md`
- Brand Squad: `squads/brand/SQUAD.md`
- Este arquivo: `squads/brand/workflows/symbol-first-pipeline.md`
