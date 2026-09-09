# Vigia - Motor 24h de Monitoramento de Meta Ads

Motor Python standalone que vigia uma conta de Meta Ads em loop e alerta no
WhatsApp quando algo sai do esperado.

## O que ele observa (os 4 olhos)

| Olho   | Dispara quando                                                       |
|--------|---------------------------------------------------------------------|
| CPA    | CPA de hoje passa de 1,5x o CPA médio dos últimos 14 dias           |
| Saldo  | Saldo da conta cai abaixo de R$100 (ou perto de acabar no ritmo)    |
| Status | Conta inativa, ou anúncios reprovados/pausados há mais de 6 horas   |
| Pacing | Gasto de hoje passa de 1,3x o orçamento diário dos conjuntos ativos |

Cada olho que dispara vira uma linha no alerta de WhatsApp com uma recomendação
concreta. Cooldown padrão de 60 minutos por olho, para não floodar.

## Pré-requisitos

- Python 3.10+ (usa sintaxe de tipos `X | None`).
- Dependências: `pip install -r requirements.txt` (httpx, python-dotenv, requests).
- Um `.env` configurado (veja `.env.example`, ou rode `node ../setup/wizard.js`).
- Uma Evolution API própria (WhatsApp) já configurada e conectada.

## Token Meta (LEIA): precisa ser long-lived

Este motor roda 24 horas por dia em loop. Por isso o `META_ACCESS_TOKEN` tem
que ser um token long-lived de System User do Business Manager, que não expira
sozinho. Token de Graph Explorer expira em poucas horas e o vigia para no meio
da madrugada.

Como gerar: Business Settings > Usuários do sistema > selecionar o usuário do
sistema > Gerar novo token > escolher o app > marcar `ads_read`
(e `ads_management` se um dia o vigia for pausar conjunto) > gerar e guardar no
`.env` em `META_ACCESS_TOKEN`.

## Configuração

```bash
cd vigia
cp .env.example .env
# edita o .env: token Meta long-lived, conta, e os dados da sua Evolution API
pip install -r requirements.txt
```

## Como rodar

Um ciclo só (teste, não manda WhatsApp):

```bash
python main.py --client minha-conta --account act_SUA_CONTA_DE_ANUNCIOS --once --no-send
```

Um ciclo mandando para um número específico:

```bash
python main.py --client minha-conta --account act_SUA_CONTA_DE_ANUNCIOS --once --to SEU_TELEFONE
```

Loop contínuo (default 15 min), alertando o número do `.env`:

```bash
python main.py --client minha-conta --account act_SUA_CONTA_DE_ANUNCIOS
```

Loop a cada 5 minutos:

```bash
python main.py --client minha-conta --interval 5
```

### Flags

| Flag         | O que faz                                                        |
|--------------|--------------------------------------------------------------------|
| `--client`   | Slug da sua conta/cliente (obrigatório). Define a pasta de estado/log. |
| `--account`  | Conta Meta act_XXXX. Sobrescreve `META_AD_ACCOUNT_ID` do .env.   |
| `--once`     | Roda 1 ciclo e sai. Sem isso, loop infinito.                     |
| `--interval` | Minutos entre ciclos no loop (default 15 ou `VIGIA_INTERVAL_MIN`).|
| `--to`       | Número/JID do WhatsApp. Default: `VIGIA_ALERT_NUMBER` do .env.    |
| `--no-send`  | Só imprime no terminal, não manda WhatsApp.                      |
| `--cooldown` | Minutos de cooldown por olho (default 60).                       |

## Estado e log

Por padrão o estado fica em `<pasta vigia>/state/clientes/<cliente>/vigia/`:

- `state.json` - cooldowns e último alerta por olho.
- `log.md` - log append-only de cada ciclo.

Para mudar o local, defina `VIGIA_STATE_DIR` no `.env`.

## Agendar na sua VPS (rodar 24/7)

A forma mais simples é systemd. Crie um serviço que mantém o loop vivo e
reinicia se cair. Exemplo de unit (`/etc/systemd/system/vigia-minha-conta.service`):

```ini
[Unit]
Description=Vigia 24h Meta Ads
After=network-online.target

[Service]
Type=simple
WorkingDirectory=/caminho/pro/vigia
ExecStart=/usr/bin/python3 main.py --client minha-conta --account act_SUA_CONTA_DE_ANUNCIOS --interval 15
Restart=always
RestartSec=30
EnvironmentFile=/caminho/pro/vigia/.env

[Install]
WantedBy=multi-user.target
```

Ativar:

```bash
systemctl daemon-reload
systemctl enable --now vigia-minha-conta.service
journalctl -u vigia-minha-conta -f   # acompanhar o log ao vivo
```

Para mais de uma conta, crie um serviço por conta, com `--client` e `--account`
diferentes. O `--interval` já faz o loop interno, então NÃO use cron por cima:
um processo systemd por conta basta.

Alternativa simples sem systemd (uma conta, modo --once via cron de 15 em 15 min):

```bash
# crontab -e
*/15 * * * * cd /caminho/pro/vigia && /usr/bin/python3 main.py --client minha-conta --account act_SUA_CONTA_DE_ANUNCIOS --once >> cron.log 2>&1
```

No modo cron use sempre `--once`. O cron controla o intervalo, o script roda um
ciclo e sai.

## Observações

- WhatsApp: usa o padrão da Evolution API v2 (`/message/sendText/<instancia>`,
  header `apikey`, JSON UTF-8). Acentuação em português não quebra.
- Meta: este motor lê insights direto da Graph API porque roda standalone 24/7
  (caso que o MCP do Claude Code não cobre nesse formato). Para criar ou editar
  campanha, use o protocolo `docs/03-subir-campanha.md` (via MCP, na sua sessão
  do Claude Code), nunca este motor.
- A chave da Evolution e do token Meta moram só no `.env`, nunca no código.
