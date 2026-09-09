---
name: "Pontuar Conteúdo"
order: 1
input: "Carrossel otimizado do Creator"
output: "Scorecard com nota 1-5 por critério"
---

## Process

1. Receber o carrossel completo (slides + legenda + hashtags)
2. Avaliar cada critério com nota de 1 a 5:
   a. Cover: para o scroll? Título provocativo? Contraste?
   b. Hierarquia de texto: headline grande + supporting text menor em todos os slides?
   c. Palavras por slide: todos entre 40-80?
   d. Alternância de cores: ritmo visual entre slides?
   e. Hook da legenda: primeiros 125 chars criam urgência/curiosidade?
   f. CTA final: específico e acionável?
   g. Hashtags: 5-15, mix adequado?
   h. Ortografia/acentuação: 100% correto?
   i. Narrativa: cada slide avança a história? Zero filler?
   j. Compartilhabilidade: vale salvar/enviar para alguém?
3. Registrar nota e observação para cada critério
4. Calcular score médio

## Output Format

```yaml
scorecard:
  criteria:
    - name: "Cover"
      score: 5
      note: "Observação"
    - name: "Hierarquia de texto"
      score: 4
      note: "Observação"
  average: 4.3
```

## Output Example

```yaml
scorecard:
  criteria:
    - name: "Cover"
      score: 5
      note: "Título provocativo com número, alto contraste visual"
    - name: "Hierarquia de texto"
      score: 4
      note: "Slide 6 tem headline e supporting text muito similares em tamanho"
    - name: "Palavras por slide"
      score: 4
      note: "9 de 10 slides OK, slide 3 com 38 palavras"
    - name: "Alternância de cores"
      score: 5
      note: "Dark, light, accent em ritmo perfeito"
    - name: "Hook da legenda"
      score: 5
      note: "Abre com dado impactante, impossível não clicar mais"
    - name: "CTA final"
      score: 4
      note: "Bom mas poderia ser mais específico (ex: comenta IA)"
    - name: "Hashtags"
      score: 5
      note: "12 hashtags, boa variedade nicho e amplo"
    - name: "Ortografia"
      score: 5
      note: "Zero erros"
    - name: "Narrativa"
      score: 4
      note: "Slide 8 repete argumento do slide 5"
    - name: "Compartilhabilidade"
      score: 5
      note: "Conteúdo de referência, alto potencial de save"
  average: 4.6
```

## Quality Criteria

- Todos os 10 critérios avaliados
- Nota numérica de 1 a 5 para cada um
- Observação específica para cada critério
- Score médio calculado corretamente

## Veto Conditions

- Critério sem nota: avaliar todos os 10 obrigatoriamente
- Observação genérica ("bom"): reescrever com detalhe específico
