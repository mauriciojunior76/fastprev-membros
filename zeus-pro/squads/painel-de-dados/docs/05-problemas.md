# Guia 5: resolvendo problemas

Se algo não funcionou, respire. Quase todo problema aqui cai em um dos casos abaixo. Achou o seu, siga a receita.

## O dash não abre

Você acessa o endereço e não aparece nada, ou dá erro.

**Primeiro, veja o que o painel está dizendo.** Dentro da pasta do painel na VPS, rode:

```bash
docker compose logs -f
```

Leia as últimas linhas. Se aparecer alguma mensagem de erro em vermelho, ela costuma dizer o que faltou (uma chave errada, o banco fora do ar). Para sair dessa tela, aperte Ctrl+C.

**Confira se o painel realmente subiu:**

```bash
docker compose ps
```

Se o painel aparecer como `running` (rodando), ele está de pé. Se aparecer `exited` ou não aparecer, ele caiu, e o motivo está nos logs acima.

**Confira a porta.** O painel roda na porta 3000. Se você usa o Caddy, o Caddyfile precisa apontar para `localhost:3000`. Se digitou outra porta, corrija (veja o guia 04-deploy-vps.md).

Se ainda assim não abrir, tente reiniciar:

```bash
docker compose restart
```

## Os anúncios não aparecem

O painel abre, mas o gasto e os resultados de anúncio estão zerados.

- **Você configurou o token do Meta?** Se você não anuncia ou não colocou o token, é normal não aparecer nada. Sem problema.
- **O token pode ter vencido ou estar errado.** Confirme que você usou o token long-lived do usuário de sistema com a permissão `ads_read`, e não um token do Graph Explorer (esse expira rápido). Veja o guia 02-token-meta.md.
- **A conta está no formato certo?** O número da conta precisa vir com `act_` na frente, tipo `act_SUA_CONTA_DE_ANUNCIOS`.
- **O coletor de anúncio já rodou?** Os dados do Meta chegam quando o coletor busca eles. Ele roda sozinho de tempos em tempos, mas na primeira vez pode demorar. Se quiser forçar agora, olhe a pasta `collectors` do painel e rode o coletor de Meta. Depois recarregue a tela do painel.

Se o token estiver certo e ainda não vier nada, veja os logs (`docker compose logs -f`), o erro do Meta costuma aparecer ali.

## Show rate aparece sem eu ter registro nenhum

Você vê reunião ou show rate no painel, mas não usa CRM.

Isso é **normal** e não é um bug. No modo high ticket, reunião e show rate só fazem sentido para quem usa um CRM. Se você não usa, esses dois campos ficam vazios ou zerados, é esperado. Se preferir que eles nem apareçam, rode o guia de configuração de novo (`node setup/wizard.js`) e diga que você não usa CRM. O painel some com esses campos e mostra só o resto.

## As vendas não aparecem

Você vende low ticket, mas as vendas não caem no painel.

- **A URL do webhook foi colada na UTMify?** Esse é o erro mais comum. Volte na UTMify, nas configurações de webhook, e confira se a URL está lá **por inteiro**, incluindo o `?secret=XXXXX` no final. Se cortou uma parte, não funciona. Veja o guia 03-utmify.md.
- **O secret está igual?** O `XXXXX` da URL na UTMify precisa ser exatamente o mesmo que o guia gerou na instalação. Um caractere diferente e o painel rejeita a venda (por segurança). Se tiver dúvida, rode `node setup/wizard.js` de novo para ver o secret atual e cole ele na UTMify.
- **O evento certo está marcado?** Na UTMify, marque para avisar em **venda aprovada** (venda paga). Se marcou só outro tipo de evento, a venda não chega.
- **Faça uma venda de teste** e acompanhe os logs do painel (`docker compose logs -f`) para ver se a venda chegou. Se chegou nos logs mas não na tela, recarregue a página.
- **Rede de segurança:** você pode rodar o coletor de reforço para buscar as vendas direto na UTMify: `node collectors/coletor-utmify.js`.

## Como atualizo o dash depois de mudar algo

Quando sair uma versão nova do painel (ou você mudou algo no código), atualize assim, dentro da pasta do painel na VPS:

```bash
git pull
docker compose up -d --build
```

O `git pull` baixa a versão nova e o `--build` reconstrói o painel com as mudanças. Seus dados no Supabase e sua configuração continuam intactos.

## Como troco as cores ou as metas depois

Você tem dois caminhos:

**Caminho fácil (recomendado):** rode o guia de novo:

```bash
node setup/wizard.js
```

Ele reconhece que já está configurado e deixa você mudar o que quiser (cores, metas, modo). No fim, reinicie o painel:

```bash
docker compose restart
```

**Caminho manual:** abra o arquivo `config.json` (fica na pasta do painel), mude os valores de cor e de meta na mão e salve. Depois reinicie com `docker compose restart`. Só use este caminho se você se sentir à vontade editando arquivo de texto, uma vírgula ou aspa fora do lugar quebra o arquivo. Na dúvida, use o guia interativo.

## Ainda travado?

Rode `docker compose logs -f`, leia a última mensagem de erro e cole ela em uma busca. Na maioria das vezes, o próprio texto do erro já aponta a chave errada ou o serviço fora do ar. Corrija, rode `docker compose restart` e teste de novo.
