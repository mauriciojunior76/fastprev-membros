# Subir Campanha Meta - Protocolo via MCP

Peça ao Claude Code (com o MCP Meta conectado) pra montar campanha, conjunto, criativo e
anúncio, do zero até o anúncio pausado pronto pra ativação, sempre com um gate de
segurança antes de qualquer gasto real.

## Pré-requisito: seu contexto de cliente

Preencha `contexto.example.md` (ticket, oferta, CPA-alvo, conta de anúncio, link de
destino fixo) antes de montar qualquer campanha. Sem isso, não dá pra saber se o
orçamento e a oferta fazem sentido.

## Passo a passo

### 1. Campanha (pausada, ABO por padrão)
Objetivo conforme a oferta (geração de leads ou venda direta). ABO é o padrão (budget
no conjunto, não na campanha), a menos que você prefira CBO explicitamente.

### 2. Conjunto de anúncios
Budget de TESTE conservador por padrão (algo entre R$40 e R$50/dia por conjunto). Só
subir esse valor com confirmação explícita sua, nunca automático. Placement restrito
conforme a arte disponível (ver seção de formato abaixo). Localização sempre restrita a
"pessoas que moram no local", nunca a opção "moram ou estiveram recentemente" (opção
descontinuada pela Meta que trava a publicação).

### 3. Criativo
Se está clonando um criativo campeão: reaproveitar o ID existente. Se é imagem nova:
criar via MCP. Upload de imagem grande sempre comprimido (JPEG ~85% de qualidade, evita
timeout).

### 4. Blindagem obrigatória (fora do MCP)
O MCP da Meta não expõe dois campos importantes:
- `contextual_multi_ads`: o recurso "anúncios com vários anunciantes" (multi-advertiser)
  vem LIGADO por padrão desde 2024 se você não desligar explicitamente. Isso coloca seu
  anúncio ao lado de anúncios de outras marcas na mesma unidade, sem controle de
  contexto. Desligue sempre (`OPT_OUT`).
- `url_tags` (UTMs): se você depende de rastreamento por parâmetro de URL, confirme que
  as UTMs sobreviveram à criação do criativo.

Como o MCP não expõe esses campos, a criação final do criativo (ou o ajuste desses dois
campos) precisa passar pela API direta (Graph API), reaproveitando o post já criado pelo
MCP por referência (`object_story_id`), sem criar um post novo.

### 5. Formato por posicionamento
- Vertical 9:16: só em Stories e Reels.
- Quadrado ou 4:5: feed, explore, marketplace.
- Nunca vertical no feed: a Meta corta o topo da imagem, exatamente onde costuma ficar
  o texto/gancho.
- Se só existe a arte vertical, restrinja o conjunto às posições verticais em vez de
  fingir compatibilidade com o feed.

### 6. Gate final (obrigatório, bloqueante)
Antes de considerar a campanha pronta, ler de volta o criativo pela API e confirmar:
`contextual_multi_ads` = OPT_OUT e as UTMs presentes. O preview visual NÃO mostra o
status do multi-advertiser, então não serve como prova. Só depois de confirmar pela
leitura da API é que a campanha está pronta.

### 7. Entrega
Tudo sobe PAUSADO. Você ativa manualmente. Ativar campanha (gasto real) nunca deve
acontecer sem sua confirmação explícita.

## Recorrência: trocar criativo e link sem depender de programador

Depois que a campanha está no ar, rodar em recorrência (diária ou semanal) trocando
criativo e ajustando orçamento é só reaplicar os passos 3 a 6 num novo conjunto ou
anúncio, pausando o anterior se o CPA não performar. Regra de decisão: quando o CPA
sair da curva, mexa primeiro em PÁGINA e OFERTA, não em criativo. Criativo raramente é
o problema real.

## Checklist ao criar criativo

1. Passei `contextual_multi_ads` OPT_OUT na criação?
2. Passei as UTMs se a campanha rastreia por parâmetro?
3. Li o criativo de volta e confirmei OPT_OUT?
4. O anúncio aponta para o criativo correto (o blindado, não o original do MCP)?

Qualquer "não" nessa lista: corrigir antes de considerar a campanha entregue.
