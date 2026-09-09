# BOOK FORGE - Orquestracao v3.0

Documento de orquestracao: pipeline linear de 14 papéis, com 4 pausas de aprovacao. Substitui a
orquestracao v2.0.0 (101 agentes/16 camadas) após auditoria completa em 02/07/2026. Ver
`docs/AUDITORIA-2026-07-02.md` para o diagnostico e `STRATEGY.md` para o contexto estratégico que
todo agente le antes de começar.

## Status: official, v3.0.0 (2026-07-02)

---

## Por que a mudanca

O squad v2 tinha 91 agentes próprios pensados para um modelo que precisava de granularidade extrema
para manter qualidade (8 agentes de voz que eram variacoes do mesmo prompt de tom; 7 "copy masters"
que eram fatias do mesmo framework de persuasao; 12 agentes de quality gate fatiados). Com Sonnet 5
isso vira peso morto: contexto inchado, pipeline caro (150k-300k+ tokens, 30-90 min), sem ganho de
qualidade sobre um agente forte com playbook interno.

Além disso, o squad v2 nunca perguntava: qual o OBJETIVO deste ebook, o TEMA e generico ou
estratégico, o CTA bate com o próximo passo do funil, e o ebook realmente gerou lead/MQL/reuniao/
venda depois de publicado. A v3 resolve isso com uma camada estratégica nova e obrigatoria.

---

## Pipeline (ordem canonica, único modo -- ver execution_modes em squad.yaml para escala de peso)

```
0. book-chief recebe o pedido, detecta modo (A Exemplo / B mentorado novo / B+ recorrente),
   le STRATEGY.md, loga explicitamente quais agentes vão rodar

1. book-strategist monta o briefing (templates/briefing-template.md)
   - GATE DE OBJETIVO: 1 dos 10 objetivos de STRATEGY.md, bloqueante
   - GATE DE TEMA: fora da blacklist de STRATEGY.md, bloqueante
   - Big Idea, transformacao, promessa com número, persona + nivel de consciência Schwartz
   - Se Modo A: cruza com memory/icp-exemplo-ht-completo.md, framework-copy-exemplo-pma.md,
     buyer-psychology-exemplo.md

   >>> PAUSA 0 (nova): briefing estratégico aprovado pelo usuario?

2. book-outliner monta o sumario nos 12 blocos obrigatorios de STRATEGY.md

   >>> PAUSA 1: outline aprovado?

3. Camada de conteúdo (pode paralelizar):
   - book-writer escreve os capitulos (playbook interno de vozes + frameworks de copy)
   - book-cta-funnel escreve CTAs amarrados ao objetivo e ao próximo passo do funil
   - book-tutorial roda SÓ SE o ebook for guia técnico passo a passo (screenshots, código)

3.5 book-didatico lê os capítulos e decide onde o texto vira esquema (tabela, fluxo, pirâmide,
   funil, linha do tempo, matriz). Emite marcadores com orçamento de altura em mm.
   - Roda SEMPRE antes da camada editorial: o texto dentro dos esquemas precisa passar pelo
     language-gate (senão volta o ERRO #2, acentuação em texto que ninguém revisou)
   - Motor de decisão: docs/rules-on-demand/didatica-esquemas-exemplo.md
   - Não roda em correção pontual (modo micro)

4. Camada editorial (pode paralelizar):
   - book-editor (clareza, ritmo, humanizacao, voz única)
   - book-language-gate (acentuacao + travessao + ortografia + números, BLOQUEANTE)
   - book-fact-checker (números, citacoes, cases com fonte ou hipotetico)

   >>> PAUSA 2: amostra de tom aprovada (1 paragrafo)?

5. book-designer aplica tema, paleta, tipografia, layout, capa, logo-guard, icones, gráficos,
   ornamentos (BLOQUEANTE nos gates de logo e cor)

6. book-assembler monta o HTML final e renderiza o PDF (Playwright, fallback WeasyPrint)

7. book-qa roda checklist editorial (novo) + checklist visual (herdado), BLOQUEANTE

   >>> PAUSA 3: PDF final aprovado pelo usuario?

8. book-learning atualiza style-profile, taste-fingerprint, errors.md do tenant, E registra o
   ebook em `_memory/resultados/registro-ebooks.md` (17 campos, campos sem dado real = "Dado
   ausente", nunca inventado)

ENTREGA
9. book-chief apresenta o PDF + relatorio de economics (tokens/custo/tempo, agora seção do
   relatorio, não mais 3 agentes)
   [OBRIGATORIO - CRM DE EBOOKS] Para todo ebook Exemplo/interno aprovado:
   a. Adicionar entrada em biblioteca-ebooks-exemplo/ebooks-registry.json
   b. Rodar: node scripts/deploy-ebooks.js
   c. Verificar HTTP 200 na URL nova
   d. O ebook aparece automaticamente em https://seu-dominio.com.br
   Ebooks de clientes/mentorados NÃO entram no registry (só Exemplo/interno).
```

---

## Paralelizacao

- Camada 3 (writer + cta-funnel + tutorial opcional): paralelo
- Camada 3.5 (didatico): sequencial, precisa dos capítulos prontos e trava a camada 4
- Camada 4 (editor + language-gate + fact-checker): paralelo

---

## Pontos de pausa/confirmacao (4, uma a mais que a v2)

1. PAUSA 0 (nova): briefing estratégico aprovado? (objetivo, tema, promessa, público)
2. PAUSA 1: outline aprovado?
3. PAUSA 2: amostra de tom aprovada (1 paragrafo)?
4. PAUSA 3: PDF final pronto para entrega?

Em correcao pontual (peso 0-20, modo micro): zero pauses, só `book-language-gate` roda direto.

---

## Gates bloqueantes (ordem de execucao)

1. objetivo-gate (book-strategist) -- novo v3
2. tema-gate (book-strategist) -- novo v3
3. language-gate (book-language-gate)
4. logo-exemplo-gate (book-designer)
5. cor-coerencia-gate (book-designer)
6. qa-editorial-gate (book-qa) -- novo v3
7. qa-visual-gate (book-qa)
8. fullsafe-gate (book-chief, sempre antes de editar existente)

Se algum gate falhar: devolve para o agente responsável (max 2 iteracoes, depois entrega com
transparencia sobre a limitacao restante).

---

## Integracao com Core Team

Core team (token-economist, cost-gatekeeper, 3 accent agents, travessao-hunter, humanizer,
ai-detector, self-correction, repeat-preventer) continua injetado automaticamente, mas absorvido
dentro dos agentes v3 (accent+travessao dentro de `book-language-gate`; humanizer+ai-detector dentro
de `book-editor`; self-correction+repeat-preventer dentro de `book-learning`). O `book-chief` loga
explicitamente a ativacao (resolve achado #7 da auditoria: injecao silenciosa sem log visivel).

---

## Auto-learning continuo (mudanca central: mede resultado real, não só custo)

Após cada ebook, `book-learning`:
1. Atualiza `_memory/{tenant}/style-profile.md` e `taste-fingerprint.md`
2. Atualiza `_memory/{tenant}/errors.md` (padrão só vira regra automática com aprovacao datada,
   nunca auto-aplicado sem essa marca -- resolve achado #8 do explorador de contexto)
3. Registra `_memory/resultados/registro-ebooks.md`: tema, promessa, público, objetivo, CTA, origem
   de tráfego, conversao, downloads, leads, MQLs, reunioes, vendas, feedback, abandono, o que
   funcionou, o que falhou, o que melhorar

No próximo ebook do mesmo tenant: `book-designer` aplica padrões já aprovados (com data+aprovador),
`book-strategist` le style-profile e errors.md antes de montar o briefing.

---

## Legado preservado

Os 91 agentes v2 continuam intactos em `agents/_legacy/` (FULLSAFE, nunca deletados). Cada agente v3
lista no seu frontmatter (`absorbe:`) quais legados fundiu, para consulta caso algum framework
específico (ex: Bencivenga, Caples) precise ser revisitado em detalhe.
