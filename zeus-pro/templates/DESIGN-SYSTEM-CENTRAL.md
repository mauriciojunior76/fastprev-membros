# DESIGN SYSTEM CENTRAL

Fonte única da SUA marca. Todo squad que produz algo que alguém vai VER lê este
arquivo antes de decidir qualquer coisa: apresentação, e-book, página, post,
anúncio, vídeo, documento.

Este arquivo responde "qual é o meu azul, qual é a minha fonte". O CRITÉRIO de
quando usar cada coisa (quando cabe vidro fosco, quanto tempo dura uma
animação, o que faz uma página parecer feita por IA) fica em
`templates/inteligencia-visual/INDEX.md`. Os dois trabalham juntos: um traz a
identidade, o outro traz o julgamento.

## Como preencher

- JÁ TEM MARCA: peça o manual, a logo, as cores e as fontes, e transcreva o
  que já existe. Não substitua, não "melhore" e não opine sem ser perguntado.
- NÃO TEM MARCA: use o squad de branding para construir, e só então preencha.
  Enquanto estiver vazio, o ZEUS avisa antes de produzir qualquer visual, em
  vez de inventar cor e fonte por conta própria.

Depois de preencher, copie este arquivo para a raiz do projeto do dono e rode
`node templates/design-tokens/build.js` para gerar as variáveis de CSS.

---

## 1. A marca

- Nome: FastPrev
- O que ela representa, em uma frase: (declaração do dono, ainda não coletada — ver lacuna)
- Três adjetivos que ela deve transmitir: (não coletado)
- Três adjetivos que ela NUNCA deve transmitir: (não coletado)

> Origem desta seção: transcrita das variáveis CSS de `index.html`,
> `biblioteca.html` e `area-premium.html` (o site real, não um manual à
> parte). O tom de marca (o que ela representa, adjetivos) ainda não foi
> declarado pelo dono — ver `memory/LACUNAS-DE-CONHECIMENTO.md`.

## 2. Cores

| Papel | Código | Onde usar |
|---|---|---|
| Primária | `#6CB33F` (`--g2`) | Ação principal, progresso, valor de destaque (ex: `.prog-txt`, plano do usuário) |
| Secundária | `#2B5C1A` (`--g1`) | Gradientes de fundo, ponto de partida de barra de progresso |
| Fundo claro (mais claro do par escuro) | `#0B1A0D` (`--bg-card`) | Fundo de card, sobre o fundo base |
| Fundo escuro | `#030805` (`--bg`) | Fundo base da página (o site é 100% tema escuro, sem versão clara) |
| Texto principal | `#E8F4EC` (`--txt`) | Corpo de texto sobre fundo escuro |
| Texto secundário | `#7A9A80` (`--txt-muted`) | Legenda, descrição, texto de menor peso |
| Destaque | `#A8D87A` (`--g-accent`) | Ponto final de gradiente de progresso, brilho/glow de destaque |
| Sucesso | `#6CB33F` (mesma cor da primária — não há verde de sucesso separado) | Estado concluído, progresso |
| Alerta | **não existe no site** | Nenhuma cor de aviso/warning foi encontrada nas três páginas — ver lacuna abaixo |
| Erro | `#E0654F` (`--danger`) | Estado de erro (ex: senha incorreta na Área Premium) |

Cores auxiliares que também aparecem no CSS, fora do papel dos 8 acima:
`--bg-alt: #060F08`, `--bg-sidebar: #050D06`, bordas em
`rgba(108,179,63,0.14)` (fina) e `rgba(108,179,63,0.40)` (em hover/foco), e um
brilho verde `rgba(108,179,63,0.28)` (`--shadow-g`) atrás do avatar/hero.

Regra dura: nenhuma cor solta no material. Toda cor vira variável. Cor escrita
direto no código é o que faz a identidade se degradar com o tempo.

**Lacuna registrada:** não existe, nas três páginas do site, uma cor de
"alerta" (estado de aviso, diferente de erro). Ficou de fora de
`templates/design-tokens/brands/fastprev.json` em vez de ser inventada —
perguntar ao dono se ele quer definir uma, ou se todo aviso do site vira erro
mesmo (ver `memory/LACUNAS-DE-CONHECIMENTO.md`).

## 3. Tipografia

- Fonte de título: `'Inter', system-ui, sans-serif`
- Fonte de texto: `'Inter', system-ui, sans-serif` (mesma família do título — o site inteiro usa só Inter)
- Fonte de apoio (número, legenda, código): não definida pelo site; mantido o padrão do ZEUS (`ui-monospace, 'Cascadia Code', Consolas, monospace`) até o dono usar algum lugar com número/código em destaque

| Nível | Tamanho | Peso | Uso |
|---|---|---|---|
| Título de destaque | 28px | 800 | Número/título hero (ex: progresso em destaque) |
| Título de seção | 20px | 800 | Título de bloco grande (ex: cabeçalho de card premium) |
| Subtítulo de seção | 16px | 700, `letter-spacing: -0.2px` | Divisão de conteúdo (`.sec-title`) |
| Corpo | 13–13.5px | 500–600 | Texto de leitura, nome de usuário, item de lista |
| Legenda / rótulo | 9–12px | 600–700, maiúsculo, `letter-spacing: 0.05–0.13em` | Legenda, badge, rótulo de categoria (bastante uso de versalete com tracking aberto) |

## 4. Formas e espaçamento

- Cantos: levemente arredondado — `14px` nos blocos principais (`--radius`), `8px` nos elementos menores (`--radius-sm`); avatar e badges usam `border-radius: 50%`/`20px` (pílula)
- Bordas: sim, linha fina de 1px, sempre na cor da marca em baixa opacidade (`rgba(108,179,63,0.14)`, mais forte em hover: `0.40` ou `0.2`) — nunca cinza neutro
- Sombra: usa, mas como brilho (glow) verde translúcido atrás de elementos de destaque (`box-shadow: 0 0 32px rgba(108,179,63,0.28)`), não sombra cinza tradicional de elevação
- Densidade: equilibrada
- Unidade base de espaçamento: não fixada em variável própria no CSS (herda o `--espaco-*` de `core.json`, base de 8px)

## 5. Imagem e iconografia

- Estilo de foto: real — fotos de pessoa (`img/mauricio-hero.png`, `img/mauricio-perfil.png`), não ilustração
- Tratamento de imagem: cor original, sem filtro aplicado
- Ícones: não avaliado nesta transcrição (não há biblioteca de ícone SVG identificada nas três páginas)
- Ilustração: não usa

**Logo:** `img/logo-full.jpg` (logo completa) e `img/logo-icon.jpg` (ícone). Regra 6
da seção 9 vale aqui: a logo nunca se recria em código, sempre usar o arquivo
original.

## 6. Aplicação por tipo de material

| Material | Regras específicas |
|---|---|
| Apresentação | (não coletado) |
| E-book | (não coletado) |
| Post e carrossel | (não coletado) |
| Página | Tema escuro sempre; fundo `--bg`, cards em `--bg-card`, nunca fundo claro |
| Anúncio | (não coletado) |
| Vídeo | (não coletado) |
| Documento formal | (não coletado) |

## 7. O que NUNCA fazer com esta marca

- Não usar fundo claro/branco como fundo de página: o site é 100% tema escuro, isso não foi testado nem aprovado.
- Não usar cinza neutro em borda ou sombra: toda borda e todo brilho aqui saem do verde da marca (`--g2`) em baixa opacidade, nunca de um cinza genérico.
- Não recriar a logo em texto ou CSS: usar sempre `img/logo-full.jpg` ou `img/logo-icon.jpg`.

## 8. Referências

- Aprovadas (o dono viu e gostou): o próprio site em produção (`index.html`, `biblioteca.html`, `area-premium.html`) é a referência aprovada — qualquer peça nova replica essas variáveis, não reinterpreta.
- Rejeitadas (o dono viu e não quis): (não coletado)

## 9. Regras universais, valem para qualquer marca

Estas não dependem de preenchimento. Valem sempre. O conjunto completo de
critério visual, com o porquê de cada decisão, está em
`templates/inteligencia-visual/` (10 módulos, lidos sob demanda).

1. Título em duas ou mais linhas tem as linhas com tamanho parecido. Uma
   palavra sozinha na última linha é defeito. Corte palavras da linha maior ou
   force a quebra no ponto certo.
2. Contraste suficiente entre texto e fundo, sempre. Design bonito e ilegível
   é design ruim.
3. Nunca mais de duas seções escuras seguidas em uma página longa: cansa a
   vista e apaga a hierarquia.
4. Uma ação principal por tela. Dois botões com o mesmo peso viram nenhum.
5. Espaço em branco é elemento de design, não desperdício.
6. Logo não se recria em código. Se precisar da logo, use o arquivo original.
