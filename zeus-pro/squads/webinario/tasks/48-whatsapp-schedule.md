# Task 48 — Configurar Agendamento WhatsApp

## Objetivo
Criar todas as mensagens do grupo de aquecimento (D-21 a D+7), formatadas nativamente para WhatsApp, e gerar o scheduler Node.js para envio automático via Evolution API.

## Quando Usar
Após grupo do WhatsApp criado e datas confirmadas pelo calendar-intelligence.

## Agentes Envolvidos
- `whatsapp-formatter` (Zap v2) — escreve as mensagens formatadas
- `whatsapp-scheduler` (Zaptime) — gera o script Node.js de agendamento

## Regras de Formatação WhatsApp
- *negrito* com asteriscos
- _itálico_ com underscores
- ~riscado~ com tilde
- Máx 3 emojis por mensagem
- Máx 300 chars para lembretes
- Quebrar em parágrafos curtos (não blocos de texto)
- NUNCA enviar entre 22h e 07h

## Sequência Completa de Mensagens

| Dia | Horário | Tipo | Objetivo |
|-----|---------|------|----------|
| D-21 | 18h | Boas-vindas | Apresentar grupo e expert |
| D-14 | 20h | Aquecimento | Primeira dor / problema |
| D-10 | 19h | Conteúdo | Mini-insight de valor |
| D-7 | 18h | Aquecimento | Segundo conteúdo / prova |
| D-5 | 20h | Intensivo | Prova social + história |
| D-3 | 19h | Lembrete | D-3 + confirmação |
| D-2 | 20h | Engajamento | Enquete ou pergunta |
| D-1 | 10h | Urgência | Lembrete D-1 manhã |
| D-1 | 20h | Urgência | Lembrete D-1 noite + link |
| D-0 | 08h | Dia do evento | Confirmação do dia |
| D-0 | -2h | Lembrete | "Em 2 horas começa" |
| D-0 | -30min | Lembrete | "Em 30 minutos" + link |
| D+1 | 10h | Replay | Replay disponível + carrinho |
| D+2 | 19h | Reforço | Depoimento pós-evento |
| D+3 | 18h | Urgência | Urgência crescente + FAQ |
| D+5 | 19h | Penúltimo | Carrinho fecha em 2 dias |
| D+7 | 10h | Final | Carrinho fecha hoje |
| D+7 | 20h | Final | Última hora + link |

## Script Node.js Gerado (scheduler-webinar-{nome}.js)
```javascript
// Exemplo de estrutura gerada
const schedule = require('node-cron');
const axios = require('axios');

const EVOLUTION_URL = 'https://SEU_SERVIDOR_EVOLUTION_API'; // ex: https://evolution.seudominio.com
const INSTANCE = 'SUA_INSTANCIA';                           // nome da instância no seu servidor
const API_KEY = 'SUA_API_KEY';                              // chave de autenticação
const GROUP_ID = 'XXXX@g.us'; // preencher com ID real do grupo

async function sendMessage(text) {
  await axios.post(`${EVOLUTION_URL}/message/sendText/${INSTANCE}`, {
    number: GROUP_ID,
    text: text
  }, {
    headers: { apikey: API_KEY }
  });
}

// D-21 18h
schedule.schedule('0 18 DD MM *', () => sendMessage(`...`));
// [demais jobs gerados com datas reais]
```

## Deploy na VPS Zeus
```bash
# Upload do arquivo
scp scheduler-webinar-{nome}.js root@IP_DO_SEU_VPS:/root/schedulers/

# Instalar dependências
ssh root@IP_DO_SEU_VPS "cd /root/schedulers && npm install node-cron axios"

# Iniciar com PM2 (fica rodando mesmo após reinicialização)
ssh root@IP_DO_SEU_VPS "pm2 start scheduler-webinar-{nome}.js --name 'webinar-{nome}'"
ssh root@IP_DO_SEU_VPS "pm2 save"
```

## Como Encontrar o ID do Grupo
```bash
# Via Evolution API
curl -X GET "https://SEU_SERVIDOR_EVOLUTION_API/group/fetchAllGroups/SUA_INSTANCIA?getParticipants=false" \
  -H "apikey: SUA_API_KEY" | grep -i "nome-do-grupo"
```

## Output
- 18 mensagens formatadas para WhatsApp (com datas reais)
- Arquivo `scheduler-webinar-{nome}.js` pronto para deploy
- Guia de deploy em 4 comandos

## Feeds Into
- `webinar-master-planner` (Cap 13)
- `calendar-intelligence` (confirmar datas antes de gerar o scheduler)
