# MANUAL DE USO: COPY MASTER EDITION

## Bem-vindo

Você está com o COPY MASTER EDITION, o squad de copywriting mais completo já montado: 36 agentes, 12 frameworks, memória viva com copies validadas em produção real. Avaliação consolidada de R$ 2,4 milhões.

Este manual mostra como instalar e usar esse squad no seu próprio Zeus (Claude Code) em menos de 10 minutos.

---

## O QUE ESTÁ DENTRO DO ZIP

```
zeus-copy-squad/
├── README.md                  ← Visão geral do squad e avaliação
├── MANUAL.md                  ← ESTE arquivo
├── GLOBAL_COPY_RULES.md       ← 14 regras invioláveis de copy
├── activation-rules.md        ← Quando e como o squad ativa
├── business-context.md        ← Contexto de negócio (Exemplo)
├── squad.yaml                 ← Manifesto completo do squad
│
├── agents/                    ← 36 agentes especializados
│   ├── tier-0-orchestration/  ← copy-chief (orquestrador)
│   ├── tier-1-core-pt/        ← 8 agentes núcleo PT
│   ├── tier-2-legends/        ← 22 lendas do direct response
│   └── tier-3-hooks/          ← 5 hook specialists
│
├── frameworks/                ← 12 frameworks documentados
├── modules/                   ← 8 módulos por canal
├── memory/                    ← Memória viva (copies campeãs + feedback)
├── examples/                  ← 4 arquivos de exemplos prontos
├── tests/                     ← 3 checklists de qualidade
├── tasks/                     ← 13 tasks operacionais
├── workflows/                 ← 2 workflows orquestrados
├── checklists/                ← Quality gate
├── data/                      ← Catálogo de roteamento + frameworks
└── satellite-skills/          ← 4 skills satélite (sexy-canvas, mentoria, carrossel)
```

---

## INSTALAÇÃO PASSO A PASSO

### Você precisa ter:

- Claude Code instalado (https://claude.com/claude-code)
- Uma pasta de projeto onde você vai rodar o Zeus

### Passo 1: descompactar o ZIP

Descompacte o arquivo `zeus-copy-squad.zip` em qualquer pasta da sua máquina.

### Passo 2: colocar o squad dentro do seu projeto

Copie a pasta inteira `zeus-copy-squad/` para dentro do seu projeto Claude Code, em:

```
{seu-projeto}/squads/copywriting-squad/
```

Se você ainda não tem a pasta `squads/`, crie ela.

### Passo 3: ativar o squad

Abra o Claude Code na pasta do seu projeto e simplesmente peça:

```
chama o copy-chief
```

ou

```
@copy-chief preciso de copy para [seu objetivo]
```

O squad já ativa sozinho quando você usa palavras como: copy, gancho, hook, headline, anúncio, email de venda, landing page, carrossel, roteiro, VSL, oferta, funil.

---

## COMO USAR NA PRÁTICA

### Caso 1: você quer um anúncio para Meta Ads

```
chama o copy-chief e cria 3 variações de anúncio para Meta Ads.
Produto: [seu produto].
Público: [quem é].
Objetivo: gerar leads para mentoria.
```

O copy-chief vai recrutar automaticamente:
- ad-copy-warlord para a estrutura
- hook-warlord para o gancho
- copy-auditor para validar antes de entregar

### Caso 2: você quer uma sequência de email

```
chama o copy-chief e quero uma sequencia de 5 emails para lancamento.
Produto: [seu produto].
Lista quente, ja conhecem voce.
```

O copy-chief vai recrutar Russell Brunson (Epiphany Bridge) + André Chaperon (Soap Opera) + Ben Settle (engagement).

### Caso 3: você quer auditar uma copy existente

```
chama o copy-chief e audita essa copy aqui:
[cola sua copy]
```

O copy-auditor vai dar um score de 0 a 100 e apontar exatamente o que melhorar.

### Caso 4: você quer roteiro de Reels

```
chama o copy-chief e cria 3 ganchos de Reels de 15 segundos.
Tema: [seu tema].
```

Vai chamar os 5 hook specialists (Hormozi, Koe, Cole, Bourgoin, Welsh) e devolve 3 ganchos com estilos diferentes.

---

## OS 36 AGENTES (consulta rápida)

### Núcleo brasileiro (use sempre)

| Agente | Função |
|--------|--------|
| copy-chief | Diretor. Sempre chame ele primeiro |
| hook-warlord | Ganchos por tipo e canal |
| ad-copy-warlord | Meta Ads, padrões campeões |
| russell-brunson-agent | Funil, email, webinar |
| eugene-schwartz-agent | Diagnóstico de audiência |
| hormozi-offer-agent | Oferta irresistível |
| whatsapp-humanizer | WhatsApp humanizado |
| copy-auditor | Quality gate final |

### Lendas (use quando o copy-chief recomendar)

22 lendas do direct response USA/UK consultáveis 24/7:

Gary Halbert, Eugene Schwartz, Claude Hopkins, Gary Bencivenga, Robert Collier, John Carlton, Jim Rutz, Dan Kennedy, Frank Kern, Russell Brunson, Todd Brown, Stefan Georgi, Jon Benson, Ry Schwartz, Ben Settle, Andre Chaperon, Dan Koe, Joe Sugarman, David Ogilvy, Clayton Makepeace, Parris Lampropoulos, David Deutsch.

### Hook specialists (primeiros 3 segundos)

hook-hormozi, hook-koe, hook-cole, hook-bourgoin, hook-welsh.

---

## 12 FRAMEWORKS DISPONÍVEIS

| Framework | Quando usar |
|-----------|------------|
| ARENA | Estrutura universal de 7 passos para qualquer copy |
| Copy Killer Formula | VMC + Gancho + Crença Falsa |
| Sexy Canvas | 8 gatilhos baseados em pecados capitais |
| VMC | Diagnóstico de motivação de compra (dor vs desejo) |
| Hormozi Offer | Equação do valor + stack + garantia |
| Schwartz Awareness | 5 níveis de consciência da audiência |
| Brunson Funnels | Epiphany Bridge + Big Domino |
| PAS | Problem, Agitate, Solution |
| AIDA | Estrutura clássica |
| PASTOR | Email de venda em 6 passos |
| Mixing Guide | Como combinar frameworks (5 combos aprovados) |

Os frameworks estão na pasta `frameworks/` e você pode ler cada um deles.

---

## AS 2 LEIS QUE MANDAM EM TUDO (11/08/2026)

Antes de qualquer outra coisa, toda copy do squad obedece estas duas:

LEI DA FERIDA (regra 13): a copy DÓI em algo concreto antes de prometer qualquer coisa. Ordem de prioridade da dor: bolso (dinheiro perdido ou deixado na mesa), depois status (ficar pra trás enquanto o concorrente cresce), depois medo e tempo (a janela fechando). E o gancho precisa intrigar: ou abre a ferida, ou abre lacuna de curiosidade pesada. Copy morna, educada ou genérica volta pra reescrita.

LEI DO ALVO (regra 14): em copy de anúncio, a primeira linha fala DIRETAMENTE com quem a gente quer que veja, no menor número de palavras com o máximo de dor ou solução.
- Reprova: "Tenha mais pacientes"
- Aprova: "Médico, você pode ter mais pacientes"
- Aprova: "Tenha mais pacientes na sua clínica médica"

Produto que serve muita gente chama a identidade ampla ("Você que vive de ensinar o que sabe"), nunca uma profissão que exclua o resto.

## 14 REGRAS GLOBAIS INVIOLÁVEIS

O squad NUNCA viola estas regras (estão no arquivo `GLOBAL_COPY_RULES.md`):

1. Nunca vender produto high ticket em frio (cold traffic)
2. Especificidade obrigatória (mínimo 3 de 6 âncoras)
3. Uma única VMC por copy (dor OU desejo, nunca misturar)
4. Urgência apenas quando real (proibida urgência fake)
5. Prova social verificável (pessoa real + número real)
6. Ortografia perfeita / sem travessão
7. CTA único (dois CTAs = paralisia de decisão)
8. Público definido antes do copy
9. Auditoria interna obrigatória (score mínimo 60)
10. Memória viva atualizada após cada copy validada
11. Transformação acima do entregável (vende o estado desejado, não o formato)
12. Headline passa pelo scorecard (mínimo 21 de 30, nenhuma dimensão zerada)
13. LEI DA FERIDA (dói em algo concreto antes de prometer, bolso primeiro)
14. LEI DO ALVO (em anúncio, a primeira linha chama quem a gente quer que veja)

---

## ATUALIZAR O SQUAD

O squad é VIVO. A cada nova copy que você roda e que performa bem, abra o arquivo `memory/copies-campeoes.md` e registre:

- Copy completa
- Métricas reais (CPA, CTR, ROAS, fechamentos)
- Por que funcionou
- Padrão usado

Da próxima vez que o copy-chief for criar copy similar, ele usa as campeãs como referência.

Isso transforma o squad em ativo cumulativo, não ferramenta estática.

---

## ROI ESPERADO

Este squad foi avaliado em R$ 2,4 milhões. Mas o valor real é o que ele gera pra você.

Benchmark observado em uso real:
- Padrão Reconhecimento (anúncio HT) + Padrão Bônus Tangíveis (WhatsApp) viabilizaram dezenas de milhares em fechamentos em uma única semana de aplicação

Aplicando bem, este squad substitui um departamento inteiro de copywriting.

---

## SUPORTE E DÚVIDAS

sua mentoria: você tem acesso direto ao um mentor de referencia pelo grupo da mentoria.

Bug ou sugestão: registre no canal interno da mentoria.

Quer mais squads (vídeo, ads, design, ebook)?: o AIOS completo tem 287 agentes em 39 squads. Pergunte na próxima call.

---

## LICENÇA

PROPRIETARY — exclusivo para mentorados Exemplo ativos.

Este conteúdo é parte do programa de mentoria. Não compartilhar fora do grupo.

---

**Nome oficial:** Copy Master Edition (pasta no disco: squads/copywriting-squad/)
**Versão:** Master Edition v2.2 (11/08/2026)
**Mantenedor:** um mentor de referencia
**Diretor do squad:** copy-chief (Cyrus)
