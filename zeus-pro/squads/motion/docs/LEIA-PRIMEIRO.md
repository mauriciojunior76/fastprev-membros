# Leia primeiro

Este squad tem 28 documentos. Este aqui diz qual abrir, e o que **manda** quando dois
se contradizem.

## A regra que resolve contradição

Quando um documento diverge do que está aqui, **o dado vence o texto**:

| Assunto | Fonte que manda | O que os documentos são |
|---|---|---|
| Som: qual arquivo, qual peso, qual volume | `public/_sfx/catalogo.json` | explicação do porquê |
| Mixagem: ducking, fades, limites de nível | `public/_sfx/mix-padroes.json` | explicação do porquê |
| Cor de marca de terceiro | `aprendizado/cores-de-marca.json` | explicação do porquê |
| Origem de logo de terceiro | `aprendizado/origem-de-marca.json` | explicação do porquê |
| O que já foi corrigido e quantas vezes | `aprendizado/licoes.json` | explicação do porquê |
| Cor, fonte, easing, breakpoint | `templates/design-tokens/*.json` | explicação do porquê |

Texto envelhece sozinho; arquivo de dados é lido pelo código e quebra na hora se
estiver errado. Por isso número nunca é copiado para dentro de documento: fica no
arquivo, e o documento aponta.

## Antes de desenhar qualquer coisa

`DESIGN-SYSTEM-REELS-APPLE.md` é a base visual do squad: fundo, conceito, cores,
elementos, espaçamento, colorido, tipografia e movimento, com os valores dentro. Peça
nova lê esse arquivo antes de abrir qualquer componente, e não sai copiando peça antiga.

Ele é autossuficiente de propósito: existe para ser lido por fora, inclusive por
ferramenta que não tem este repositório.

Quando chegar melhoria de fora para esse arquivo, o caminho está em
`COMO-ATUALIZAR-O-DESIGN-SYSTEM.md`: nem tudo que ele tem é preferência, parte é
cicatriz de rodada reprovada, e substituir o arquivo inteiro perde isso.

## Por onde começar, conforme o pedido

| O pedido é | Abra |
|---|---|
| "transforma esse vídeo do Zoom em Reel" | `ZOOM-REEL-MOTION.md`, depois `PROCESSO-REEL-ZOOM.md` |
| "faz um vídeo novo nesse estilo" | `STYLE-REGISTRY.md` para escolher o estilo |
| "suaviza", "blur", "estilo After Effects" | `INTENT-MAP.md`, que traduz o pedido para o núcleo |
| gravação longa que vira vários vídeos | `ESCALA-E-APRENDIZADO.md` |
| som, whoosh, trilha, vinheta | `LOGICA-EFEITOS-SONOROS.md` (números no catálogo) |
| onde guardar, como nomear, achar peça antiga | `ORGANIZACAO-E-NOMES.md` |
| "por que deu errado da última vez" | `CATALOGO-DE-ERROS-VISUAIS.md` |
| reaproveitar uma cena pronta | `BIBLIOTECA-DE-MOLDES.md` |
| vou escrever um componente de cena novo | `ANTES-DE-ESCREVER-CENA.md`, as 11 armadilhas da esteira |

## Antes de mostrar qualquer vídeo

```bash
node scripts/aprendizado.js --revisar <Composition>
```

Roda as dez conferências de uma vez e barra o que já foi corrigido três vezes ou mais.
A lista do que cada uma mede está em `ESCALA-E-APRENDIZADO.md`.

## Os documentos, por camada

**Como o squad decide** (leitura obrigatória em peça nova)
`ESCALA-E-APRENDIZADO.md`, `ORGANIZACAO-E-NOMES.md`, `CATALOGO-DE-ERROS-VISUAIS.md`,
`HEURISTICAS-E-FRAMEWORKS.md`

**Como cada estilo se parece**
`STYLE-REGISTRY.md` (o índice), `STYLE-APPLE-CONCEITUAL.md`, `STYLE-POPULAR.md`,
`STYLE-DEPOIMENTO.md`, `STYLE-NEOANALOGIACA.md`, `STYLE-NAVY-ARQUITETO-VINTAGE.md`

**Como se faz na prática**
`ZOOM-REEL-MOTION.md`, `PROCESSO-REEL-ZOOM.md`, `INTENT-MAP.md`,
`BIBLIOTECA-DE-MOLDES.md`, `LOGICA-EFEITOS-SONOROS.md`, `BIBLIOTECA-SFX.md`,
`audio-pipeline.md`, `remotion-*` (regras de código)

**Histórico, não é receita**
`brabo-motion-os-v9.md`, `diretor-brabo-workflow.md`, `ads007-design-system.md`,
`post-mortem-agente-arquiteto.md`, `producao-exemplo-captura.md`,
`padrao-aprovado-zeus-motion.md`, `guia-video-narrado.md`

Esses últimos são de maio e junho de 2026, de antes do formato atual. Servem para
entender uma decisão antiga, não para copiar procedimento.

## O que fazer quando algo aqui estiver errado

Corrigir o documento na mesma sessão, e nunca ao contrário: se o código faz diferente
do que está escrito, o código vence e o texto se ajusta. Documento que descreve um
mundo que não existe mais é pior do que documento nenhum, porque parece confiável.

## Esteira de reforma e de produção nova

Pedido de reforma ou de peça nova segue `docs/PROMPT-REFORMA.md` (7 passos, parada obrigatória na folha de storyboard antes de qualquer render). Template literal do o dono do canal, 05/09/2026.
