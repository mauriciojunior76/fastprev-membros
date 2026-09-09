# BOOK FORGE v3.0

> LEITURA OBRIGATORIA ANTES DE QUALQUER EBOOK: `squads/book-forge/SOURCE-OF-TRUTH.md` (cor/logo/
> template) e `squads/book-forge/STRATEGY.md` (objetivo, tema, funil -- novo v3, roda ANTES da cadeia
> visual). Memória de squad e contexto, NÃO autoridade.

Squad profissional de produção de ebooks. Refatorado em 02/07/2026 após auditoria completa
(`docs/AUDITORIA-2026-07-02.md`): de 101 agentes/16 camadas (v2, desenhado para modelo anterior que
precisava de granularidade extrema) para 13 papéis fortes otimizados para Sonnet 5.

## Status: OFICIAL v3.0.0 - Atualizado 2026-07-02

## O que mudou na v3

Duas mudancas, uma de eficiencia e uma estratégica:

1. **Consolidacao de 101 para 13 agentes.** Granularidade extrema (8 vozes separadas, 7 "copy
   masters" separados, 12 agentes de quality gate fatiados) fazia sentido para um modelo que
   precisava de muleta. Sonnet 5 não precisa: um agente forte com playbook interno resolve o que
   8 agentes fracos resolviam em serie, com uma fracao do custo de token e do tempo. Os 91 agentes
   antigos continuam preservados em `agents/_legacy/` (FULLSAFE, nunca deletados).

2. **Camada estratégica nova e obrigatoria.** O squad v2 produzia ebooks tecnicamente excelentes sem
   nunca perguntar objetivo, tema ou conexão com o funil, e media resultado só em tokens/custo. A v3
   exige objetivo declarado e tema validado ANTES de qualquer escrita (gates bloqueantes no
   `book-strategist`), amarra o CTA ao próximo passo real do funil (`book-cta-funnel`), e registra
   resultado de negócio real -- downloads, leads, MQL, reuniao, venda -- em
   `_memory/resultados/registro-ebooks.md`.

## Arquitetura v3 (13 papéis, pipeline linear com 4 pausas)

```
0. book-chief (lead, orquestra e loga gates)
1. book-strategist (briefing + GATE DE OBJETIVO + GATE DE TEMA + big idea + promessa + persona)
   >>> PAUSA 0: briefing aprovado
2. book-outliner (sumario nos 12 blocos de STRATEGY.md)
   >>> PAUSA 1: outline aprovado
3. book-writer + book-cta-funnel + book-tutorial (opcional)
4. book-editor + book-language-gate (bloqueante) + book-fact-checker
   >>> PAUSA 2: amostra de tom aprovada
5. book-designer (tema, paleta, tipografia, capa, logo-guard, icones, gráficos, ornamentos)
6. book-assembler (HTML + PDF)
7. book-qa (checklist editorial novo + checklist visual, bloqueante)
   >>> PAUSA 3: PDF final aprovado
8. book-learning (estilo, erros, gosto do tenant + registro de resultado real)
```

Cada agente v3 lista no frontmatter (`absorbe:`) quais dos 91 legados fundiu -- consultavel em
`agents/_legacy/` sempre que um framework específico (Bencivenga, Caples, Sullivan etc.) precisar de
revisão em detalhe.

## Core Squad Standard (absorvido, não mais 10 agentes separados)

token-economist e cost-gatekeeper continuam informando peso/orcamento ao chief. Acentuacao e
travessao vivem dentro de `book-language-gate`. Humanizacao e deteccao de "cara de IA" vivem dentro
de `book-editor`. Self-correction e repeat-preventer vivem dentro de `book-learning`. O chief loga
explicitamente a ativacao de cada um (resolve achado #7 da auditoria: gates que passavam sem log
visivel).

## Modos de execucao (simplificado, ver squad.yaml)

| Peso | Modo | Agentes ativos | Tokens |
|------|------|-----------------|--------|
| 0-20 | micro | só book-language-gate | 3k-8k |
| 21-40 | light | pipeline completo, sem tutorial | 15k-35k |
| 41-60 | normal | pipeline completo | 35k-70k |
| 61-80 | heavy | pipeline completo | 70k-140k |
| 81-100 | full | pipeline completo | 140k-220k |

## Os 3 modos de tenant (mantidos)

### Modo A (o dono do canal/Exemplo)
Zero perguntas. `book-strategist` cruza automaticamente com `memory/icp-exemplo-ht-completo.md`,
`memory/framework-copy-exemplo-pma.md`, `memory/buyer-psychology-exemplo.md`.

### Modo B (Mentorado novo)
3 perguntas de first-use (nome/segmento, logo/estilo, voz). Paleta extraida do logo APRESENTADA para
aprovacao antes de aplicar em todo o material (novo v3 -- resolve o risco de paleta ruim de logo
ruim entrar sem checagem).

### Modo B+ (Mentorado recorrente)
Zero perguntas. `book-designer` aplica padrões já aprovados -- só os que tem data + aprovador
explicito registrados por `book-learning` (novo v3 -- resolve o risco de "aprender" um erro que
passou por acidente).

## Gates marciais (bloqueantes)

1. objetivo-gate (novo v3)
2. tema-gate (novo v3)
3. language-gate (acentuacao + travessao + ortografia + números)
4. logo-exemplo-gate
5. cor-coerencia-gate
6. qa-editorial-gate (novo v3: especificidade, unicidade, CTA alinhado, objetivo atendido)
7. qa-visual-gate
8. fullsafe-gate

## Memória por tenant

`_memory/{tenant}/` continua com os arquivos vivos (style-profile, taste-fingerprint, errors,
cases). Novo: `_memory/resultados/registro-ebooks.md` (cross-tenant), com 17 campos de resultado
real por ebook.

## Como usar

### Modo conversacional (Zeus ativa automaticamente)
```
"Cria um ebook de 120 páginas sobre X, objetivo: aquecer para high ticket"
```
Zeus detecta keyword `ebook`, aciona `@book-chief`, que roda o pipeline de 4 pausas até a entrega.

## Estrutura de pastas

```
squads/book-forge/
├── agents/ (13 agentes v3 + _legacy/ com os 91 originais preservados)
├── themes/ (6 temas)
├── templates/ (18 templates HTML + briefing-template.md novo)
├── checklists/ (editorial-checklist.md + visual-checklist.md, novos)
├── scripts/ (11 scripts)
├── docs/ (AUDITORIA-2026-07-02.md, novo)
├── _memory/
│   ├── _templates/
│   ├── resultados/ (registro-ebooks.md, novo)
│   ├── o dono do canal-exemplo/
│   └── {outros tenants}/
├── _versions/ (FULLSAFE backups)
├── STRATEGY.md (novo: objetivo, blacklist/whitelist de tema, funil, travas)
├── squad.yaml (manifesto v3)
├── orchestration.md (pipeline v3 detalhado)
├── README.md (este arquivo)
├── MANUAL.md (passo a passo v3)
└── MEMORY.md (erros cross-tenant)
```

## Referências

- Auditoria completa: `docs/AUDITORIA-2026-07-02.md`
- Estratégia: `STRATEGY.md`
- Orchestration detalhada: `orchestration.md`
- Manual de uso: `MANUAL.md`
- Agent definitions: `agents/` (13 novos), `agents/_legacy/` (91 preservados)
