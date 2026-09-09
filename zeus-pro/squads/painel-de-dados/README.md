# zeus-dash

Dashboard de tráfego e vendas em tempo real. Você clona, roda um guia de 5 minutos e liga ele na sua própria base de dados: seus anúncios, suas vendas, sua marca, suas cores.

Serve para dois cenários (você escolhe no guia):

- **High ticket**: foco em gerar leads baratos e qualificados. Mostra total de MQL, custo por lead qualificado (CPL), taxa de qualificação, gasto, funil de lead até a venda e (se você usa CRM) reunião e show rate.
- **Low ticket**: foco em vendas e custo por venda. Mostra vendas, faturamento, custo por venda (CPA), ROAS e ticket médio, com as vendas caindo em tempo real.
- **Os dois**: mostra os dois, com um botão para alternar.

## O que você vai precisar

- Uma VPS (servidor) com Docker, onde o dash fica no ar 24 horas.
- Uma conta incluso no [Supabase](https://supabase.com) (é o banco onde tudo fica guardado).
- Opcional: um token do Meta, se você anuncia no Facebook e Instagram.
- Opcional: a [UTMify](https://utmify.com.br), se você vende low ticket (ela junta Hotmart, Kiwify e outras num lugar só).

## Começar (3 passos)

```bash
git clone https://github.com/seu-usuario/zeus-dash.git
cd zeus-dash
node setup/wizard.js
```

O guia faz umas 8 perguntas simples (nome, modo de uso, suas cores, suas conexões) e no fim deixa tudo pronto. Depois:

```bash
docker compose up -d
```

Pronto, o dash está no ar. Para ter domínio próprio e cadeado (HTTPS), veja [docs/04-deploy-vps.md](docs/04-deploy-vps.md).

## Guias

Comece por [docs/00-COMECE-AQUI.md](docs/00-COMECE-AQUI.md). Os outros cobrem Supabase, token do Meta, UTMify, deploy na VPS e solução de problemas.

## Segurança

Nenhum segredo fica no código. Tudo que é sensível (chaves, tokens) vive só no arquivo `.env` da sua máquina, que nunca é enviado ao GitHub. As cores, metas e o modo ficam no `config.json`, também local.

Licença MIT.
