---
name: "Gerar Feedback"
order: 2
input: "Scorecard da task anterior"
output: "Veredito APPROVE/REJECT com feedback acionável"
---

## Process

1. Ler o scorecard completo
2. Verificar regras de aprovação:
   a. Score médio >= 4.0 E nenhum critério < 3: APPROVE
   b. Score médio >= 4.0 MAS algum critério < 3: REJECT (critério crítico)
   c. Score médio < 4.0: REJECT
3. Se APPROVE: listar sugestões opcionais de melhoria (critérios < 5)
4. Se REJECT: listar correções obrigatórias em ordem de prioridade
5. Formatar veredito final

## Output Format

```
VEREDITO: [APPROVE / REJECT]
SCORE MÉDIO: [X.X]

[Se APPROVE]
SUGESTÕES DE MELHORIA (opcionais):
- Critério X (nota Y): sugestão de melhoria

[Se REJECT]
CORREÇÕES OBRIGATÓRIAS:
1. Critério X (nota Y): o que está errado + como corrigir
2. Critério Z (nota W): o que está errado + como corrigir
```

## Output Example

```
VEREDITO: APPROVE
SCORE MÉDIO: 4.6

SUGESTÕES DE MELHORIA (opcionais):
- Hierarquia de texto (nota 4): Slide 6 pode diferenciar mais o tamanho entre headline e supporting text
- Palavras por slide (nota 4): Slide 3 com 38 palavras, adicionar 1 frase de contexto para chegar a 42+
- CTA final (nota 4): Trocar "comenta aqui" por "comenta IA se você já usa" (mais específico, gera mais comentários)
- Narrativa (nota 4): Slide 8 repete argumento do slide 5, substituir por exemplo prático diferente
```

## Quality Criteria

- Veredito claro e inequívoco (APPROVE ou REJECT)
- Score médio correto
- Toda nota < 5 gera sugestão
- Toda nota < 3 gera correção obrigatória (em caso de REJECT)
- Feedback sempre com: problema + sugestão de correção

## Veto Conditions

- Veredito ambíguo (ex: "quase aprovado"): definir APPROVE ou REJECT
- Feedback sem sugestão de correção: adicionar como corrigir cada ponto
