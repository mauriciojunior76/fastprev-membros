# Task 44 — Criar Formulário de Aplicação

## Objetivo
Criar formulário completo de qualificação para o modelo de aplicação, com lógica condicional, páginas de confirmação e microcopy que pré-vende antes da call.

## Quando Usar
Apenas quando o modelo do webinário é **aplicação** (produto acima de R$3.000 com call de diagnóstico).

## Agentes Envolvidos
- `application-form-designer` (Portão) — formulário e lógica
- `application-pitch-designer` (Filtro) — CTA no webinário e follow-up

## Pré-requisitos
- Produto definido (nome, preço, promessa)
- Perfil do cliente ideal (do `webinar-intake-master`)
- Critérios de aluno ideal (quem deve ser aprovado)

## Os 12 Campos do Formulário
1. Nome completo
2. Email
3. WhatsApp com DDD
4. Profissão / área de atuação
5. Situação atual (textarea, mín. 100 chars)
6. Maior dor / frustração (textarea)
7. Resultado desejado em 6 meses (textarea — ativa imaginação)
8. Por que agora? (textarea — força articular urgência)
9. Comprometimento de tempo (radio: sim/parcial/não)
10. Condição financeira (radio: sim/parcelamento/não)
11. Tomada de decisão (radio: sozinho/parceiro/precisa de tempo)
12. Expectativa da conversa (textarea — aumenta expectativa)

## Lógica de Qualificação
- **Aprovação imediata**: campos 9+10 positivos + respostas substanciais → redirecionar para confirmado
- **Fila de revisão**: limitações mas motivação → expert revisa manualmente
- **Não qualificado**: campos bloqueantes negativos → redirecionar para produto alternativo

## Páginas de Confirmação
- **Aprovado**: "Sua candidatura foi recebida! Expert analisa e entra em contato em até 48h pelo WhatsApp."
- **Não qualificado**: "No momento o perfil não é o foco — mas tenho algo para te ajudar agora." + oferta alternativa

## Output
- Formulário com 12 campos e microcopy
- Lógica de qualificação documentada
- Páginas de confirmação (aprovado + não qualificado)
- Opcionalmente: HTML com CSS para hospedar na VPS

## Feeds Into
- `event-page-builder` (integra na página de aplicação)
- `webinar-master-planner` (Cap 9)
