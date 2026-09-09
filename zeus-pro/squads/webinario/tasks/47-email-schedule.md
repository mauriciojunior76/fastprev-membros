# Task 47 — Configurar Sequência de Emails

## Objetivo
Criar todos os emails da sequência (D-7 a D+7), com assunto, preview text, corpo completo e horário exato, prontos para configurar no Brevo ou ferramenta similar.

## Quando Usar
Após roteiro do evento definido, oferta estruturada e datas confirmadas pelo calendar-intelligence.

## Agente Principal
- `email-scheduler` (Caixa v2)

## Sequência Completa

| Email | Quando | Horário | Assunto |
|-------|--------|---------|---------|
| E1 | D-7 | 09h | Confirmação de inscrição + o que esperar |
| E2 | D-3 | 11h | Preview do conteúdo + prova social |
| E3 | D-1 | 18h | Lembrete + bônus exclusivos ao vivo |
| E4 | D-0 manhã | 08h | Hoje é o dia — link de acesso |
| E5 | D-0 evento | 2h antes | Começamos em 2 horas |
| E6 | D-0 final | 15min antes | Entrando agora — link de acesso |
| E7 | D+1 | 10h | Replay disponível + carrinho aberto |
| E8 | D+2 | 11h | Prazo do carrinho + prova social pós-evento |
| E9 | D+3 | 09h | FAQ de objeções + urgência crescente |
| E10 | D+4 | 14h | Case de transformação real |
| E11 | D+5 (último dia) | 10h | Penúltimo aviso — carrinho fecha amanhã |
| E12 | D+7 manhã | 10h | Carrinho fecha hoje à meia-noite |
| E13 | D+7 final | 20h | ÚLTIMA HORA — carrinho fecha em 4h |

## Estrutura de Cada Email
- Assunto (máx 50 chars) + preview text (máx 90 chars)
- Abertura personalizada ({{nome}})
- Corpo principal (3-5 parágrafos curtos)
- CTA único e claro
- PS estratégico com info secundária importante

## Setup no Brevo (incluso)
1. Criar conta em brevo.com (300 emails/dia incluso para sempre)
2. Verificar domínio de envio
3. Importar lista de leads (CSV: email, nome, data_inscricao)
4. Criar automação: trigger = inscrição → sequência iniciada
5. Configurar horários de envio no timezone do público

## Alternativas incluso
- MailerLite: 1.000 contatos e 12.000 emails/mês incluso
- Mailchimp: 500 contatos e 1.000 emails/mês incluso (limitado)

## Output
- 13 emails completos com assunto + preview + corpo + CTA
- CSV de configuração para import no Brevo
- Guia de setup em 5 passos

## Feeds Into
- `webinar-master-planner` (Cap 12)
- `calendar-intelligence` (confirmar datas antes de configurar)
