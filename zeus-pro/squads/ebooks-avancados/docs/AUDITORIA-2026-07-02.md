# Auditoria BOOK FORGE (Squad de Ebooks) - 02/07/2026

Auditoria completa do squad existente antes da refatoracao v3. Squad auditado: `squads/book-forge/`
(101 agentes: 91 próprios + 10 do Core Team, 16 camadas, versão v2.0.0, aprovado 21/04/2026).

---

## 1. Diagnostico geral

O BOOK FORGE e um squad de produção MUITO forte tecnicamente (visual, montagem, humanizacao,
frameworks de copy) e MUITO fraco estrategicamente (objetivo do ebook, curadoria de tema, conexão
com o funil, mensuracao de resultado real). Ele foi desenhado para um modelo anterior que exigia
granularidade extrema para manter qualidade (8 vozes separadas, 7 copy masters separados, 5 agentes
de review leve mais 7 de quality gate). Com Sonnet 5 essa granularidade e peso morto: contexto
inchado, pipeline caro e lento, sem ganho de qualidade real, porque um agente forte com playbook
interno resolve o que 8 agentes fracos resolviam antes em serie.

Resumo em uma frase: o squad sabe fazer um ebook bonito e correto, mas não sabe decidir se aquele
ebook devia existir, para quem, com qual objetivo, e se funcionou depois de publicado.

## 2. Mapa de arquivos, agentes, prompts e fluxos

Estrutura completa:

```
squads/book-forge/
├── agents/          91 arquivos .md (1 por agente)
├── themes/          6 JSON (exemplo, minimal, corporate, luxury, editorial, custom-template)
├── templates/        18 HTML/MD (capa, capitulo, toc, checklist, tabela, cta, etc.)
├── scripts/          11 scripts JS/Python (fix-acentos-pt.py, audit-exemplo.py, render, deploy)
├── _memory/          memória por tenant (o dono do canal-exemplo + templates)
├── _versions/        FULLSAFE
├── squad.yaml         manifesto (101 agentes, 16 camadas)
├── SOURCE-OF-TRUTH.md hierarquia de autoridade
├── MANUAL.md          guia de uso (Modo A/B/B+)
├── README.md          visao geral
├── MEMORY.md          erros aprendidos cross-tenant
└── orchestration.md   pipeline detalhado por peso (micro/light/normal/heavy/full)
```

16 camadas (0 a 15): orquestracao, context-ingestion (6), intake (5), content (8), editorial (5),
humanizacao (4), visual-alignment (10), visual-assets (5), tutorial (5), assembly (4),
lightweight-review (5), quality-gate (7), auto-learning (10), economics (3), vozes (8),
copy-masters (7).

Pipeline hoje (resumo): brief > deteccao de modo (A Exemplo / B mentorado novo / B+ recorrente) >
context ingestion > intake (research, outline, strategy, audience) > escolha de voz > escrita
(writer, hooks, stories, examples, cta) > camada de copy masters > editorial > acentuacao > humanizacao
> visual (tema, paleta, tipografia, layout, capa, icones, imagens, gráficos) > assembly (HTML > PDF)
> review leve > quality gate (7 gates, incluindo final-qa com 15 pontos) > entrega > auto-learning >
economics. 3 pausas de aprovacao: outline, amostra de tom, PDF final.

Regra suprema (Tier 0, inviolavel): `docs/rules-on-demand/ebook-exemplo-padrão-oficial.md` (cores,
fontes, wireframe, gates marciais de acentuacao e travessao). Nada nesta auditoria contraria essa regra.

## 3. Como escolhe tema hoje

NÃO escolhe. O `book-intake` valida o brief que chega, mas não existe nenhum agente ou gate que
avalie SE o tema e bom, generico, ou desconectado do posicionamento. Qualquer tema que o usuario
digitar entra no pipeline sem filtro. Isso e uma falha direta contra a trava de seguranca pedida
("não pode criar tema generico").

## 4. Como define promessa hoje

`book-strategist` (camada intake) define Big Idea, transformacao (estado A > estado B) e promessa
com número. Isso e bom e sera preservado. Falha: não existe verificação cruzada entre a promessa do
ebook e o produto real do funil (LT R$27-67, ou mentoria HT R$11k-15,6k). A promessa pode ficar
ambiciosa demais ou fraca demais para o próximo passo que o CTA vai pedir.

## 5. Como define público hoje

`book-audience-profiler` mapeia persona e nivel de consciência de Eugene Schwartz (Unaware até Most
Aware). Isso e sofisticado e correto. Falha: não há cruzamento obrigatorio com o ICP real da Exemplo
já documentado (`memory/icp-exemplo-ht-completo.md`: homens 35-44, já fatura, quer estrutura de venda).
O profiler roda isolado, sem ler esse ativo por padrão.

## 6. Como organiza o sumario hoje

`book-outliner` monta 8-12 capitulos, 2-5 seções por capitulo, títulos especificos. Bom. Falta a
etapa explicita de "quebra de crenca" e "conceito central" como blocos obrigatorios verificaveis
(hoje são estilo, não estrutura obrigatoria no checklist).

## 7. Como escreve a introducao hoje

`book-cover-designer` (capa) + `book-schwartz-copywriter` (hook de abertura calibrado por awareness
level). Tecnicamente forte. Falta conectar a abertura ao objetivo do ebook (um ebook de captacao topo
de funil abre diferente de um ebook de aquecimento pré-call).

## 8. Como organiza os capitulos hoje

`book-writer` segue: abertura > desenvolvimento > exemplos > sintese > fechamento. Estrutura solida,
mantida na v3.

## 9. Como cria exemplos hoje

`book-examples` gera checklists, tabelas comparativas, templates. Achado do explorador: exemplos
tendem a sair genericos ("5 Passos para o Sucesso") quando o brief não trouxe contexto específico do
tenant, porque o agente não e obrigado a ler o brand-profile e os cases documentados antes de escrever.
Falha confirmada (ver item 16).

## 10. Como cria exercícios/aplicação hoje

`book-stories` insere cases, analogias, metaforas. Regra diz "zero história inventada", mas sem uma
fonte de cases real por tenant (`_memory/{tenant}/cases.md` não existe hoje), o agente acaba gerando
"um cliente tipico" em vez de nome, número e prazo reais. Falha confirmada.

## 11. Como cria CTA hoje

`book-cta` + `book-hormozi-framer`. 4 tipos de CTA (reflexivo, atitudinal, transacional, conteúdo),
estilo Renan/Hormozi (direto, específico). Bom nivel de execucao. Falha: não há regra que amarre o
tipo de CTA ao objetivo declarado do ebook nem ao próximo passo real do funil Exemplo (encontro
individual, plano de "10 mentorias de R$4k").

## 12. Como conecta ao funil hoje

NÃO conecta de forma explicita e obrigatoria. O squad produz o ebook como artefato isolado. A conexão
com low ticket (R$27-67) e high ticket (R$11k-15,6k) existe na cabeca do operador, não no pipeline.
Nenhum agente le `memory/framework-copy-exemplo-pma.md` nem `memory/icp-exemplo-ht-completo.md` por
padrão. Está e a falha estratégica mais grave encontrada.

## 13. Como mede resultado hoje

Camada 13 (Economics: usage-tracker, bottleneck-finder, efficiency-reporter) mede TOKENS, CUSTO,
TEMPO e SCORE DE QUALIDADE INTERNO. Zero campo para downloads, leads, MQL, reuniao ou venda. A trava
pedida ("nunca medir sucesso apenas por download", "nunca ignorar MQL/reuniao/venda") está 100%
violada hoje, porque nem download e medido, quanto mais o resto.

## 14. Onde está generico

Exemplos (`book-examples`) e stories (`book-stories`) quando o contexto do tenant e fraco ou o brief
e vago (ver itens 9 e 10, com trechos reais no relatorio do explorador). Também: não existe blacklist
de temas genericos ("como ganhar dinheiro online" passaria sem bloqueio hoje).

## 15. Onde está longo demais

Não no CONTEÚDO do ebook (a estrutura por páginas e calculada e razoavel), mas no PROCESSO: modo HEAVY/FULL
roda até 101 agentes sequenciais/paralelos para um único PDF, 150k-300k+ tokens, 30-90 minutos. Grande
parte dessa camada e granularidade que faz sentido para modelo antigo (8 agentes de voz que são, na
prática, 8 variacoes de um mesmo prompt de tom; 7 "copy masters" que são 7 fatias do mesmo framework de
persuasao). Isso e o "longo demais" real do squad: processo, não página.

## 16. Onde está bonito mas sem estratégia

Achado concreto do explorador (camada Visual Assets e Content): exemplo fraco real gerado sem contexto
seria "5 Passos para Sucesso: Definir objetivo, Pesquisar mercado, Criar plano, Executar, Medir
resultados" -- visualmente pode sair no template certo, cores certas, tipografia certa, e ainda assim
ser inútil porque não diz nada específico ao leitor. Design forte carregando conteúdo fraco e
exatamente o risco que está auditoria foi pedida para eliminar.

## 17. Onde está atraindo público errado

Risco estrutural, não caso documentado: sem gate de tema (item 3) e sem cruzamento com ICP real
(item 5), um ebook pode nascer com tema "como começar do absoluto zero" (proibido pela lista do
o dono do canal) e atrair curioso sem dinheiro em vez do profissional maduro que já fatura e quer estrutura
(ICP real). Hoje nada no pipeline impede isso.

## 18. Riscos de ebook bonito mas inútil

Confirmado no item 16. Adicional: o `book-final-qa` (15 pontos, última barreira) e 100% estrutural
(PDF abre, capa presente, indice existe, acentuacao ok, contraste ok, paginacao ok). Nenhum dos 15
pontos valida se o conteúdo e único, se os exemplos são especificos, se o CTA bate com o objetivo.
Um ebook pode passar em todos os 15 pontos e ainda ser reciclagem de lição comum de internet.

## 19. Riscos de mensuracao

Item 13 já cobre a falha. Risco prático: sem registro de leads/MQL/reuniao/venda por ebook, o squad
nunca vai saber qual ebook realmente empurra o funil e qual só ocupa espaco na biblioteca. Decisão de
"que tema priorizar no próximo trimestre" fica no achismo.

## 20. Pontos fortes do squad atual (para não jogar fora)

- Design system Exemplo v2 e disciplina de acentuacao/travessao: excelentes, mantidos 100%.
- Estrutura editorial de capitulo (abertura > desenvolvimento > exemplos > sintese > fechamento): boa,
  mantida.
- Níveis de consciência de Schwartz aplicados a audiência e abertura: sofisticado, mantido (vira
  playbook do strategist/writer, não mais agentes separados).
- 3 pausas de aprovacao (outline, amostra de tom, PDF final): correto, mantido e reforcado com uma
  4a pausa (briefing estratégico).
- Auto-aprendizado por tenant (taste-fingerprint, pattern-enforcer): ideia certa, execucao precisa de
  trava contra "aprender erro" (item 8 do explorador de contexto: se um erro passa no gate uma vez,
  vira padrão aprovado).
- Biblioteca central de ebooks (`biblioteca-ebooks-exemplo/`, 13 títulos publicados, registry.json):
  ativo real, não mexer.

## 21. Recomendacoes objetivas (o que a v3 resolve)

1. Gate de objetivo obrigatorio e bloqueante antes de qualquer produção (10 objetivos possiveis).
2. Blacklist de 8 temas genericos + whitelist de 10 temas prioritarios, validados no briefing.
3. Camada estratégica lendo por padrão: ICP real (`memory/icp-exemplo-ht-completo.md`), framework PMA
   (`memory/framework-copy-exemplo-pma.md`), buyer psychology (`memory/buyer-psychology-exemplo.md`).
4. CTA amarrado ao objetivo declarado e ao próximo passo real do funil (LT, ou encontro individual HT).
5. Checklist editorial novo no QA: especificidade de exemplos, unicidade, promessa com número, tema
   fora da blacklist -- não só estrutura de PDF.
6. Registro de resultado por ebook com 17 campos (tema, promessa, público, objetivo, CTA, origem de
   tráfego, conversao, downloads, leads, MQL, reunioes, vendas, feedback, abandono, o que funcionou,
   o que falhou, o que melhorar).
7. Consolidacao de 101 para ~13 agentes fortes (nova arquitetura no item 22/seção seguinte), eliminando
   peso morto de granularidade desenhada para modelo anterior.

---

## Nova arquitetura sugerida (resumo -- detalhe completo em `squad.yaml` v3)

13 papéis (chief, strategist, outliner, writer, cta-funnel, editor, language-gate, fact-checker,
designer, assembler, qa, learning, tutorial-opcional). Os 91 agentes antigos preservados em
`agents/_legacy/` (nunca deletados, FULLSAFE). Pipeline com 4 pausas: briefing estratégico (nova),
outline, amostra de tom, PDF final.

## Novo modelo de briefing

`templates/briefing-template.md` -- objetivo (1 dos 10), público + nivel de consciência, promessa com
número, tema validado, CTA e próximo passo do funil, origem de tráfego prevista, meta de resultado.

## Novo modelo de sumario

Estrutura ideal de 12 blocos (capa forte, promessa clara, introducao com contexto, diagnostico do
problema, quebra de crenca, conceito central, método/estrutura, exemplos práticos, aplicação,
recapitulacao, CTA, próximo passo) -- ver `checklists/editorial-checklist.md`.

## Novo checklist editorial

`checklists/editorial-checklist.md`.

## Novo checklist visual

`checklists/visual-checklist.md` (referência a regra oficial, não duplica).

## Nova estrutura de aprendizado por resultado

`_memory/resultados/registro-ebooks.md`.

## Plano de refatoracao por etapas

1. FULLSAFE dos 6 arquivos-nucleo (feito).
2. Está auditoria (feito).
3. Artefatos estrategicos novos: STRATEGY.md, briefing, 2 checklists, registro de resultados.
4. Escrever os ~13 agentes novos absorvendo o conteúdo real dos legados.
5. Mover 91 agentes antigos para `agents/_legacy/`.
6. Reescrever `squad.yaml` e `orchestration.md` com o pipeline v3.
7. Atualizar SOURCE-OF-TRUTH, MANUAL, README, MEMORY do squad.
8. Verificação estrutural + gate negativo + teste real (smoke).

## Testes necessarios para validar se o squad ficou melhor

1. Estrutural: toda referência em `squad.yaml`/`orchestration.md` aponta para arquivo existente.
2. Gate negativo: briefing com tema proibido e sem objetivo declarado deve ser BLOQUEADO pelo
   strategist novo, com a mensagem "Dado ausente. Não e possível concluir com seguranca." ou
   equivalente de tema proibido.
3. Smoke test real: gerar 1 mini-ebook (5-8 páginas), tema prioritario "Como transformar experiência
   em mentoria vendavel", objetivo "aquecer para high ticket", CTA para o encontro individual. Deve
   passar no checklist editorial, no checklist visual e renderizar PDF.
4. Verificar acentuacao/travessao do material gerado com os scripts existentes do squad.
