# Barra de Progresso Dinamica - Hotmart

> Ferramenta oficial do metodo Baldan para barra de lotes dinamica na pagina de vendas do ingresso.
> Fonte: https://github.com/Pythonando/progressbar_hotmart_opensource

---

## O que faz

Exibe na LP de ingresso uma barra que avanca em tempo real conforme as vendas acontecem na Hotmart.
- Cada venda aprovada no Hotmart dispara um webhook
- O backend Django incrementa o contador do lote correspondente
- O frontend faz polling e atualiza a barra ao vivo
- Psicologia de escassez real: o visitante ve a barra enchendo

---

## Arquitetura

```
Hotmart Checkout
    |
    | Webhook POST (a cada venda aprovada)
    v
Django Backend (este projeto)
    |--- Webhook endpoint: POST /webhook_hotmart/
    |--- Incrementa tickets_sales no banco
    |
    | API GET (polling do frontend)
    v
LP de Ingresso
    |--- Chama GET /h/{offer_code}/  a cada 30s
    |--- Recebe {"progress": 73}
    |--- Atualiza a barra de progresso no HTML
```

---

## Modelos de Dados

```python
Batch:
  - batch          # nome do lote (ex: "1o Lote")
  - total_tickets  # total de ingressos desse lote
  - tickets_sales  # quantos ja foram vendidos
  - offer_code     # codigo da oferta no Hotmart (liga webhook ao lote)
  - price          # preco do lote

SalesTicket:
  - email
  - telefone
  - name
  - batch (FK)
```

---

## Endpoints

| Metodo | URL | Funcao |
|--------|-----|--------|
| GET | `/h/{offer_code}/` | Retorna `{"progress": N}` onde N = percentual 0-100 |
| POST | `/webhook_hotmart/` | Recebe webhook da Hotmart, incrementa contador |

---

## Variaveis de Ambiente (.env)

```
HOTTOK=seu_token_hotmart_webhook
PRODUCT_ID=id_do_produto_hotmart
SECRET_KEY=django_secret_key
```

- `HOTTOK`: token de seguranca configurado no painel Hotmart > Webhooks
- `PRODUCT_ID`: ID numerico do produto no Hotmart

---

## Como Configurar na Hotmart

1. Painel Hotmart > Ferramentas > Webhooks
2. URL: `https://seu-dominio.com/webhook_hotmart/`
3. Eventos: selecionar `purchase.approved` e `purchase.complete`
4. Copiar o Hottok gerado e colocar no .env

---

## Como Criar um Lote no Admin Django

1. Acesse `/admin/`
2. Crie um `Batch` com:
   - Nome: "1o Lote"
   - Total: 50 (quantidade de ingressos)
   - Tickets vendidos: 0
   - Offer code: copie do painel Hotmart (ex: `abc123xyz`)
   - Preco: 19.00

---

## Snippet JS para a LP (integrar na pagina de inscricoes)

Cole este bloco no HTML da LP onde quiser exibir a barra:

```html
<!-- BARRA DE PROGRESSO DINAMICA - METODO BALDAN -->
<div class="lote-progress-container">
  <div class="lote-info">
    <span class="lote-label">1o Lote - R$27</span>
    <span class="lote-restantes" id="lote-restantes">carregando...</span>
  </div>
  <div class="progress-bar-bg">
    <div class="progress-bar-fill" id="progress-fill" style="width: 0%"></div>
  </div>
  <p class="urgencia-text" id="urgencia-text"></p>
</div>

<style>
.lote-progress-container {
  max-width: 480px;
  margin: 24px auto;
  padding: 20px;
  background: #1a1a1a;
  border-radius: 12px;
  border: 1px solid #333;
}
.lote-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
  color: #ccc;
}
.lote-label { font-weight: 600; color: #fff; }
.progress-bar-bg {
  height: 12px;
  background: #333;
  border-radius: 6px;
  overflow: hidden;
}
.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #f59e0b, #ef4444);
  border-radius: 6px;
  transition: width 0.8s ease;
}
.urgencia-text {
  margin-top: 8px;
  font-size: 12px;
  color: #ef4444;
  text-align: center;
}
</style>

<script>
const OFFER_CODE = 'SEU_OFFER_CODE_AQUI';
const TOTAL_TICKETS = 50; // total do lote
const API_URL = 'https://SEU_BACKEND.com/h/' + OFFER_CODE + '/';

function atualizarBarra() {
  fetch(API_URL)
    .then(r => r.json())
    .then(data => {
      const progress = data.progress;
      const vendidos = Math.round((progress / 100) * TOTAL_TICKETS);
      const restantes = TOTAL_TICKETS - vendidos;

      document.getElementById('progress-fill').style.width = progress + '%';
      document.getElementById('lote-restantes').textContent = restantes + ' vagas restantes';

      if (progress >= 90) {
        document.getElementById('urgencia-text').textContent = 'Ultimas vagas! Lote encerrando.';
      } else if (progress >= 70) {
        document.getElementById('urgencia-text').textContent = 'Mais da metade preenchido.';
      }
    })
    .catch(() => {});
}

atualizarBarra();
setInterval(atualizarBarra, 30000); // atualiza a cada 30s
</script>
<!-- FIM BARRA DE PROGRESSO -->
```

---

## Como Subir na VPS Zeus

```bash
# 1. Instalar dependencias
cd squads/launch-paid/tools/progressbar-hotmart
pip install -r requirements.txt

# 2. Criar .env
echo "HOTTOK=seu_token" >> .env
echo "PRODUCT_ID=12345" >> .env
echo "SECRET_KEY=sua_chave_django" >> .env

# 3. Rodar migracoes
python manage.py migrate

# 4. Criar superuser
python manage.py createsuperuser

# 5. Rodar em producao (com gunicorn)
gunicorn core.wsgi:application --bind 0.0.0.0:8001

# Ou via Docker
docker build -t progressbar .
docker run -d -p 8001:8001 --env-file .env progressbar
```

---

## Posicao na LP (Padrao Baldan)

- Colocar a barra LOGO ABAIXO do CTA principal de compra
- Acima ou junto ao bloco de preco/lotes
- Nunca esconder - a barra e elemento de urgencia real
- Texto ao lado: "X vagas restantes nesse lote"

---

## Integracao com Ticket Strategist

O agente `ticket-strategist` (Lote) usa essa ferramenta para:
- Criar lotes no admin Django antes do lancamento
- Configurar webhook Hotmart por lote
- Monitorar progresso em tempo real
- Disparar alertas quando lote chega a 80%+ (campanha de escassez)
