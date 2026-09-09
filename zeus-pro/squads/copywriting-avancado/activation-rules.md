# REGRAS DE ATIVAÇÃO: COPY MASTER EDITION (nome oficial e fonte única desde 11/08/2026)

## Quem manda aqui

O SQUAD é a fonte única. Não existe mais espelho: a skill global `copy-killer-mega-skill` virou uma casca fina que só detecta o pedido e entrega o trabalho para cá. Toda regra, todo agente e todo placar vivem em `squads/copywriting-squad/`.

Ordem de leitura ao ativar: `GLOBAL_COPY_RULES.md`, depois `agents/tier-0-orchestration/copy-chief.md`, depois `memory/copies-campeoes.md` (placar real).

## Gatilhos de Ativação Automática

O squad ativa quando a mensagem contém QUALQUER um destes padrões:

### Palavras-chave diretas
```
copy, copies, copywriting
anúncio, anúncios, ad, ads
gancho, hook, ganchos, hooks
headline, headlines, título, títulos
email de venda, email marketing, sequência de email
landing page, LP, página de venda, página de captura
carrossel, carrossel de vendas
roteiro, script, roteiro de venda
legenda, caption
WhatsApp (mensagem de venda ou follow-up)
oferta, estrutura de oferta
VSL, vídeo de vendas
webinar (copy/roteiro)
```

### Contextos implícitos (sem palavras-chave diretas)
```
"escreve X para Y público"
"faz X que converta"
"como vender [produto]"
"copy para [canal]"
"como abordar [tipo de lead]"
"texto para [canal] sobre [assunto]"
"como estruturar a oferta"
"como apresentar o produto"
```

---

## Peso de Ativação

LEI (ordem do o dono do canal, 04/08/2026 reforçada em 11/08/2026): TODO texto de copy passa pelo squad, em qualquer peso. O peso NÃO decide se o squad entra, decide só o tamanho do time. Peso baixo nunca significa escrever solto sem as regras.

| Tipo de pedido | Peso | Time recrutado |
|---------------|------|--------------|
| Copy de anúncio simples | 45 | @copy-chief + @ad-copy-warlord + @copy-auditor |
| Copy de anúncio com 10 variações | 65 | @copy-chief + @ad-copy-warlord + @eugene-schwartz-agent + @copy-auditor |
| Email de venda | 55 | @copy-chief + @russell-brunson-agent + @copy-auditor |
| Sequência de emails | 70 | Squad completo |
| Landing page (copy) | 75 | Squad completo + @hormozi-offer-agent |
| 5 ganchos para post | 35 | @copy-chief enxuto + @hook-warlord + @copy-auditor |
| Mensagem WhatsApp | 30 | @copy-chief enxuto + @whatsapp-humanizer + @copy-auditor |
| Auditoria de copy existente | 40 | @copy-auditor |

O @copy-auditor nunca sai da lista, em nenhum peso: é ele que roda o gate da Lei da Ferida e da Lei do Alvo. Copy sem auditoria é copy não entregue.

---

## Hierarquia de Recrutamento

```
Toda tarefa de copy → @copy-chief primeiro (briefing)
  ↓
@copy-chief analisa e recruta especialistas:
  
  Anúncio Meta       → @ad-copy-warlord + @eugene-schwartz-agent
  Email / VSL        → @russell-brunson-agent + @ad-copy-warlord
  Oferta/Stack       → @hormozi-offer-agent
  Ganchos isolados   → @hook-warlord
  WhatsApp           → @whatsapp-humanizer
  Auditoria          → @copy-auditor (sempre no final)
  
@copy-auditor avalia TODA copy antes de entregar:
  Score >= 60 → entrega
  Score < 60  → reitera internamente (máx 2x)
```

---

## Modo de Operação

### MODE 0 — MICRO (tarefa leve, peso <= 25)

Ativar quando: 1 mensagem de WhatsApp, 1 hook isolado, 1 CTA, ajuste rápido em copy existente.

Arquivos carregados (apenas 3):
1. `GLOBAL_COPY_RULES.md` (regras invioláveis, incluindo Lei da Ferida e Lei do Alvo)
2. Módulo do canal pedido: `modules/whatsapp.md`, `modules/ads.md`, `modules/hooks.md`, `modules/email.md`, `modules/carousel.md`, `modules/scripts.md`, `modules/landing-pages.md` ou `modules/copy-review.md`
3. Agente específico necessário: `agents/tier-1-core-pt/whatsapp-humanizer.md` ou `agents/tier-1-core-pt/hook-warlord.md` (todos os executores vivem em `agents/tier-1-core-pt/`, o diretor em `agents/tier-0-orchestration/`)

O que NÃO carregar no MODE 0:
- Todos os outros agentes
- Todos os frameworks
- Contexto de negócio completo (apenas os dados necessários para a tarefa)
- Framework-mixing-guide
- Copies campeãs (exceto se pedido explicitamente)

Exemplos de ativação MODE 0:
- "escreve uma mensagem de WA para lead que agendou" → MICRO
- "dá 3 opções de gancho para esse post" → MICRO
- "melhora esse CTA" → MICRO
- "como chamar a atenção em 2 linhas?" → MICRO

### MODE 1 — AUTO (recebe criativo/copy existente)
Ativar quando: usuário manda imagem, print, texto de anúncio existente.
Ação: analisar o mecanismo de conversão, diagnosticar, entregar 10 variações.

### MODE 2 — ZERO (cria do zero com briefing)
Ativar quando: usuário pede "faz uma copy" sem referência.
Ação: @copy-chief faz até 5 perguntas, depois executa.

### MODE 3 — ADAPT (adapta padrão campeão para outro nicho)
Ativar quando: usuário quer "igual ao padrão X mas para Y".
Ação: identificar o padrão, mapear equação de valor no novo contexto, entregar 10 variações.

---

## Contexto de Negócio (sempre carregado)

Carregar `business-context.md` automaticamente ao ativar o squad.

Contém:
- Linha de produtos (LT R$ 67, HT em faixa premium)
- Números para copy (8 minutos, R$ 15k de consultoria equivalente, R$ 2.997 venda, 44x ROI)
- Prova social aprovada (um cliente do exemplo)
- Regras de segurança (NUNCA vender HT em frio, preço mínimo não fragmentado)

---

## Regras de Saída

### Toda copy entregue DEVE ter:
- Acentuação 100% correta
- Zero travessão (U+2014 ou U+2013)
- Zero asterisco duplo (**)
- Score Copy Auditor >= 60, com nenhum bloqueante violado
- Especificidade: pelo menos 3 dos 6 elementos de ancoragem
- LEI DA FERIDA: dói em algo concreto antes de prometer, e dá pra apontar a frase onde dói
- LEI DO ALVO (anúncio): a primeira linha chama quem a gente quer que veja, no menor número de palavras

### Formato de entrega por tipo:
- Anúncio: H1 + H2 + PREÇO + CTA + LEGENDA (separados e rotulados)
- Email: ASSUNTO + CORPO (com breaks claros)
- WhatsApp: mensagem direta, sem formatação especial
- Carrossel: SLIDE 1 (capa) + SLIDES 2-N + SLIDE FINAL (CTA)
- Roteiro: tempo marcado por bloco

---

## Integrações

### Com o hook de contexto (context-triggers.json)
Entrada `copy-oficial`: qualquer prompt com copy, headline, texto de anúncio, texto profissional, legenda, roteiro de venda ou texto de página injeta o `GLOBAL_COPY_RULES.md` deste squad automaticamente. Gatilho registrado em 11/08/2026.

### Com squad-router.md
Toda keyword de copy aponta para COPYWRITING-SQUAD, lead `@copy-chief`. Os destinos antigos ("Copy Squad", "Copy Masters") foram unificados aqui em 11/08/2026: eram nomes de pastas que nunca existiram.

### Com GLOBAL_COPY_RULES.md
O squad respeita e aplica todas as 14 regras. Em conflito, GLOBAL_COPY_RULES vence qualquer agente, módulo ou skill.

### Com a skill copy-mentoria-killer (v3.0)
É satélite, não concorrente. Serve ao produto Agente Arquiteto (LT R$67) nos modos 1 a 3, produto agnóstico no modo 4 e roteiro de vídeo no modo 5. Conteúdo canônico em `~/.claude/skills/copy-mentoria-killer/`. Alto ticket nunca usa essa skill: usa este squad direto.

### Com a casca fina copy-killer-mega-skill
É só a porta de entrada que autoativa em pedido genérico de copy e manda ler este squad. Não guarda conteúdo. Se algum dia voltar a ter agente, framework ou placar dentro dela, é regressão: apagar o conteúdo e restaurar o ponteiro.
