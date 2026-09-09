# Relatório de Classificação de Componentes

Documento de engenharia. Registra como cada capacidade do sistema de origem foi
classificada antes de qualquer transferência para o ZEUS PRO.

Nenhum conteúdo sensível aparece aqui. Componentes das categorias C e D estão
listados apenas pela função genérica, sem nome de arquivo, sem conteúdo e sem
qualquer identificação de pessoa, empresa ou estratégia.

## Categorias

| Cat | Significado | Destino |
|---|---|---|
| A | Arquitetura exportável | Reconstruída do zero no ZEUS PRO, a partir do esquema |
| B | Heurística generalizável | Reescrita como framework público, sem réguas nem números privados |
| C | Proprietário reservado | Permanece exclusivamente no sistema de origem |
| D | Privado ou sensível | Jamais sai, nem como exemplo |
| E | Desnecessário ou obsoleto | Não entra na nova arquitetura |

## Regra de transferência

Nenhum arquivo é copiado. Componentes da categoria A são reescritos a partir do
esquema observado. A única exceção é código utilitário sem qualquer dado
embutido (mecânica de roteamento de contexto, versionamento, validação de
sintaxe), que pode ser adaptado após revisão linha a linha removendo caminhos
locais, nomes e referências ao sistema de origem.

---

## Categoria A: arquitetura exportável

| Componente | Função | Risco de exposição | Reconstrução | Destino |
|---|---|---|---|---|
| Protocolo de orquestração por peso | Classifica cada pedido de 0 a 100 e dimensiona a resposta | Nenhum, é método | Reescrito com tabela de pesos genérica | `.claude/rules/orquestrador.md` |
| Sistema de regras em camadas | Regra curta sempre ativa, detalhe sob demanda, arquivo frio | Nenhum | Reescrito | `.claude/rules/` e `docs/rules-on-demand/` |
| Roteador de contexto por gatilho | Injeta o arquivo certo quando a palavra aparece no pedido | Baixo, a tabela nasce vazia | Mecânica adaptada, tabela zerada | `.claude/hooks/context-router.cjs` |
| Versionamento antes de editar | Guarda cópia numerada antes de alterar arquivo existente | Nenhum | Mecânica adaptada | `scripts/fullsafe.js` |
| Ciclo de auto-aprendizado | Captura erro e correção, consolida, escala por reincidência | Nenhum | Reescrito | hooks de aprendizado + regra |
| Esquema de memória com frontmatter | Padrão de arquivo de memória com origem, data, confiança, sensibilidade | Nenhum | Reescrito e ampliado para 12 camadas | `core/memoria-schema/` |
| Índice de memória com teto | Índice enxuto que aponta, nunca duplica conteúdo | Nenhum | Reescrito | `core/memoria-schema/` |
| Esquema de manifesto de squad | Identidade, gatilhos, elenco, gate de qualidade, herança | Nenhum | Reescrito e simplificado | `squads/_template/squad.yaml` |
| Memória de squad com teto | Aprendizado por squad com checklist regenerado | Nenhum | Reescrito | `squads/_template/MEMORY.md` |
| Time transversal injetado | Agentes de qualidade que rodam em todo squad | Nenhum | Reescrito e enxugado | `squads/_core-team/` |
| Squads silenciosos | Classificação e pontuação, nunca chamados pelo usuário | Nenhum | Reescrito | `squads/_dispatcher/`, `squads/_quality-gate/` |
| Handoff comprimido entre agentes | Passa contexto essencial sem carregar persona inteira | Nenhum | Reescrito | `docs/AGENTS.md` |
| Gates de proteção em hook | Bloqueio ou confirmação antes de ação perigosa, com tabela viva | Nenhum, listas nascem genéricas | Reescrito | `.claude/hooks/` |
| Gate de verificação de entrega | Proíbe declarar pronto sem conferir no canal real | Nenhum | Reescrito | `.claude/rules/verificacao-de-entrega.md` |
| Níveis de autonomia | Escala de 0 a 4 com matriz de ações que sempre pedem confirmação | Nenhum | Criado, ampliando o conceito de origem | `core/autonomia.md` |
| Espelho para Obsidian | Cópia unidirecional da memória para vault legível, com filtros | Nenhum | Reescrito com filtros genéricos | `scripts/obsidian-mirror.js` |
| Formato de diário de bordo | Registro datado de fatos, decisões e o que ficou em aberto | Nenhum | Reescrito e ampliado | `memory/_templates/` |
| Pipeline de criação de squad | Da lacuna identificada ao squad documentado e registrado | Nenhum | Reescrito | `.claude/skills/criar-squad/` |
| Pipeline de criação de skill | Rascunho, teste, avaliação, reescrita, aprovação | Nenhum | Reescrito | `.claude/skills/criar-skill/` |
| Pipeline de ingestão de conhecimento | Material externo vira dossiê ancorado, sem invenção | Nenhum | Reescrito | `.claude/skills/ingerir-conhecimento/` |
| Descoberta por repetição | Conta lacunas e sugere criar recurso na terceira ocorrência | Nenhum | Reescrito | regra de aprendizado |
| Anti-duplicação por catálogo | Consulta o índice antes de criar recurso novo | Nenhum | Reescrito | skills de criação |
| Mecânica de design tokens | JSON compilado gera CSS e tokens, escala tipográfica calculada | Nenhum, valores da marca não vão | Reescrito com paleta neutra | `templates/design-tokens/` |
| Auditoria automática de página | Verifica peso, contraste, overflow e movimento em 3 telas | Nenhum | Reescrito | `templates/design-tokens/audit-page.js` |
| Orçamento de contexto medido | Mede o custo fixo de cada sessão e impede o inchaço | Nenhum | Reescrito | `scripts/medir-contexto.js` |

## Categoria B: heurística generalizável

Conhecimento reescrito do zero como framework público e explicável. Nenhum
número, régua, benchmark ou nome de método privado é transportado.

| Conhecimento | Como vai para o ZEUS PRO |
|---|---|
| Níveis de consciência do público | Framework público clássico, explicado do zero, sem calibragem privada |
| Estrutura persuasiva de uma peça | Dor, mecanismo, prova, oferta, ação: princípios gerais, sem fórmula proprietária |
| Anatomia de página de venda | Blocos funcionais e a razão de cada um, sem o padrão privado de nenhum negócio |
| Estrutura de teste de campanha | Princípio de concentrar verba e dar tempo de amostragem, sem valores nem janelas privadas |
| Leitura de métrica de funil | Onde procurar o gargalo em cada etapa, sem benchmark do negócio de origem |
| Equilíbrio de linhas em texto visual | Regra de quebra controlada e ausência de palavra órfã |
| Escada de produtos | Princípio de degraus de preço com distância suficiente, sem tabela de preços |
| Estrutura de apresentação | Narrativa, hierarquia da informação, densidade por slide |
| Estrutura de e-book | Promessa, capítulos, densidade, fechamento |
| Diagnóstico antes de prescrição | Descobrir sozinho o que é descobrível, perguntar só o que muda a recomendação |
| Checklists de revisão | Critérios genéricos de qualidade por tipo de entrega |
| Pós-morte de campanha | Perguntas de debriefing antes de escalar ou cortar |

## Categoria C: proprietário reservado

Permanece exclusivamente no sistema de origem. Listado por função, sem nome.

- Motor de copywriting proprietário, com base de padrões validados por resultado.
- Método de venda de ticket alto de um mentor específico, com réguas numéricas.
- Método de produto de entrada de um mentor específico, com escada de preço e janelas.
- Base central de ordens e heurísticas de um mentor específico.
- Conselho consultivo com lentes nomeadas por referências reais.
- Catálogo consolidado de heurísticas extraídas de anos de memória.
- Documento constitucional com hierarquia de decisão calibrada por histórico real.
- Skills que capturam o DNA operacional de pessoas específicas.
- Elencos maduros de squad construídos por acúmulo (dezenas de agentes por squad).
- Persona do assistente, calibrada ao dono original.

## Categoria D: privado ou sensível

Jamais sai, em nenhuma forma, nem como exemplo anonimizado.

- Toda a memória acumulada sobre o dono original e o negócio dele.
- Pastas de clientes, mentorados, leads e contatos.
- Credenciais, tokens, senhas, cofres e arquivos de ambiente.
- Transcrições, gravações, reuniões e conversas.
- Diários de bordo, log de erros e decisões comerciais.
- Contratos, dados financeiros, métricas e resultados.
- Identidade visual e design system da empresa de origem.
- Integrações privadas: servidores, automações e contas de plataforma.
- Histórico do Git do repositório de origem.
- Caminhos locais, nome de usuário do sistema operacional e metadados de máquina.

## Categoria E: desnecessário ou obsoleto

- Subsistema de contexto aposentado no sistema de origem.
- Motor programático de orquestração sem integração com o fluxo real de uso.
- Registro de agentes desatualizado em relação ao disco.
- Arquivos de versões antigas e regras arquivadas.
- Elenco acumulado de mais de mil agentes: o ZEUS PRO nasce com poucos e bons.

## Dependências entre componentes

O roteador de contexto depende da tabela de gatilhos. O aprendizado depende dos
hooks de captura e do consolidador. Os squads dependem do time transversal e do
esquema de manifesto. O design system depende do build de tokens e da auditoria.
O boot depende do esquema de memória e alimenta a tabela de gatilhos. Nenhuma
dessas dependências cruza para conteúdo das categorias C ou D.
