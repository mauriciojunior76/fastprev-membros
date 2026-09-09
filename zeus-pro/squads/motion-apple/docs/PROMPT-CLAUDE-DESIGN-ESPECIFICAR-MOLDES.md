# Prompt para o Claude Design: transformar o índice de moldes em especificação executável

Contexto de por que este prompt existe (não colar isto, é a explicação):
o pacote v2.1 tem 77 moldes no `moldes-index.json`, mas 50 deles só existem
como id, gatilho, lista de peças e um gesto. A geometria vive no painel HTML
de 543KB, que é preview visual, não dado. Quem monta o vídeo não consegue ir
do id até um número, e acaba desenhando no olho. O guia prova o contrário no
§5c (lettering): lá tem 7 vozes, faixa de corpo, regra da tônica e
temporização, e o lettering saiu certo. Onde tem número, sai certo.

Colar daqui para baixo.

---

Você tem o Zeus Reels Design System v2.1 (guia, índice de moldes, roteador,
tokens, mapa de ícones, mapa de SFX e o painel HTML).

O problema: o `moldes-index.json` tem 77 entradas, mas a maioria só diz id,
família, peças, gesto e gatilhos. A geometria de cada molde está desenhada no
painel HTML, que é preview de design, não é dado. Quem constrói os vídeos lê
JSON e escreve código Remotion; não consegue medir pixel dentro de um HTML de
543KB. O resultado é que os moldes sem números acabam desenhados no olho, e o
vídeo destoa do sistema.

O §5c (lettering) é a prova do que funciona: ele especifica as 7 vozes, as
faixas de corpo, a regra da tônica, a cascata das letras e o tempo de
sustentação. Esse molde é executado certo justamente porque está escrito com
números.

Sua tarefa: levar TODOS os moldes ao nível de detalhe do §5c, entregando dado
legível por máquina.

## Entrega 1: `moldes-specs.json`

Uma entrada por id do `moldes-index.json` (77 no total), com estes campos.
Todas as medidas em px no canvas de 1080x1920, com o palco em 904x374 (ou
904x497 no lettering). Todo tempo em QUADROS a 60fps, relativo à palavra que
ancora a cena.

```
{
  "id": "aprovacao-reprovacao",
  "resumo": "uma frase dizendo o que este molde afirma na tela",

  "geometria": {
    "palco": "normal | expandido",
    "largura_total": 904,
    "altura_conteudo": 260,
    "elementos": [
      {
        "nome": "circulo-check",
        "forma": "circulo",
        "tamanho": 96,
        "posicao": { "x": "centro da coluna", "y": 0 },
        "traco": 4,
        "preenchimento": "vazado",
        "cor": "semantica-verde | semantica-vermelho | preto | gray200"
      }
    ],
    "colunas": { "quantidade": 2, "largura": 400, "vao": 44 },
    "rotulo": { "corpo": 30, "tracking": "0.08em", "distancia_do_elemento": 24 }
  },

  "variantes_por_contagem": {
    "2": "duas colunas de 400, vao 44",
    "3": "tres colunas de 280, vao 18",
    "4": "grade 2x2, celula 280x158",
    "5": "grade 3+2, ultima linha centrada",
    "6": "grade 3x2"
  },

  "camadas": {
    "entra_pronto": ["painel", "colunas vazias"],
    "nasce_na_fala": ["circulo-check", "rotulo do item"]
  },

  "linha_do_tempo": [
    { "etapa": "in",    "quadro": -24, "o_que": "painel entra vazio", "curva": "settle", "duracao": 24 },
    { "etapa": "build", "quadro": 0,   "o_que": "estrutura fixa em cascata", "curva": "settle", "duracao": 20, "stagger": 4 },
    { "etapa": "act",   "quadro": 0,   "o_que": "o item nasce na palavra que o nomeia", "curva": "settle", "duracao": 20 },
    { "etapa": "focus", "quadro": 0,   "o_que": "portador de cor migra para o item falado", "curva": "smoothInOut", "duracao": 24 },
    { "etapa": "hold",  "quadro": 0,   "o_que": "minimo antes de sair", "duracao": 60 },
    { "etapa": "out",   "quadro": 0,   "o_que": "sai junto", "curva": "easyEase", "duracao": 24 }
  ],

  "portador_de_cor": {
    "leva_anel": false,
    "onde": "nao se aplica",
    "por_que": "cor semantica ja e o evento; anel em cima dobraria o portador"
  },

  "legenda": "liga | cala",
  "por_que_a_legenda": "uma frase",

  "som": { "categoria": "comparacao-veredito", "gestos": { "entrada": 0, "badge": 0 } },

  "dados_obrigatorios": ["o veredito de cada item (sim ou nao)"],
  "se_faltar_dado": "usar descricao ou N1; nunca inventar o veredito",

  "quando_usar": "a fala aprova uma coisa e reprova outra, item a item",
  "quando_nao_usar": [
    { "situacao": "so um lado e avaliado", "va_para": "atributo-solo" },
    { "situacao": "os dois lados tem imagem", "va_para": "comparacao-certo-errado" }
  ],

  "erros_comuns": [
    "encher o circulo de cor solida acima de 64px em vez de vazar",
    "por anel de espectro junto da cor semantica"
  ]
}
```

Regras para preencher:
- Todo número tem que sair das escalas fechadas do próprio guia (espaço
  6/12/18/24/44/88 no palco e 4/8/12/16/20/24 em painel; raio 10/18/24/32/52/pill
  e 8/14/18 dentro de painel; rótulo 30/24/22/18/16; ícone 30/40/64/116; anel 3
  até 48, 4 até 100, 6 acima). Se um molde precisar de valor fora, diga
  explicitamente que é exceção e por quê.
- Se o molde já está descrito em prosa no guia (Trio, Jornada A→B, Funil,
  Passos, Ciclo, Níveis, Ramificação, Tabela comparativa, Comparação, Grade),
  converta a prosa em número; não invente valor diferente do que já está lá.
- `altura_conteudo` é a tinta real, sem espaço morto: é o número que o motor
  usa para saber se a cena cabe no palco.
- Nunca ultrapassar 904 de largura nem 374 de altura (497 no lettering).

## Entrega 2: `objetos-lei-3b.json`

O sistema cataloga estruturas de informação, mas quando a fala cita um objeto
concreto (esteira de produtos, produto barato, isca, carteira, celular,
troféu), a regra manda desenhar o objeto, e não existe biblioteca para isso.
Hoje isso é desenhado à mão, e é onde mais sai errado.

Entregar 20 a 30 objetos do vocabulário de mentoria e tráfego, cada um com:
- `id`, `sinonimos_na_fala` (como a pessoa fala: "esteira", "escada de
  produtos", "funil de produtos")
- `silhueta`: o path SVG num viewBox de 200x200, traço preto, vazado, no mesmo
  estilo de linha do resto do sistema
- `tamanho_no_palco`, `traco`
- `partes_animaveis`: quais trechos do path entram separados e em que ordem
- `nao_confundir_com`: objetos parecidos e como diferenciar

Comece por: esteira de produtos, produto barato (etiqueta de preço), isca,
anzol, funil, degrau, celular, carteira, troféu, calendário, relógio,
mensagem, aperto de mão, megafone, livro, bússola, chave, ponte, semente,
alavanca.

## Entrega 3: `escalas.json`

As escalas hoje estão em prosa no guia e em variáveis no CSS. Quem confere é
um script, e ele precisa lê-las. Entregar um JSON com: espaço (palco e
painel), raio (palco e painel), corpo de rótulo, tamanho de ícone, espessura
de anel e de borda por faixa de tamanho, corpos tipográficos permitidos, e o
teto de sólido preto. É o mesmo conteúdo do guia, só que como dado.

## Entrega 4: `roteador-v3.json`

O roteador atual decide por palavra solta e erra. Dois casos reais: "aí você
roda uma venda" caiu em `ciclo` por causa de "roda", e "é uma isca paga" caiu
em `cartao-publico` por causa de "isca". Além disso, falas inteiras não
casaram com nada ("esquece esteira de produtos", "eu não aconselho quem está
começando").

Entregar um roteador que decida pela RELAÇÃO que a frase afirma, não pela
palavra:
- uma árvore de perguntas objetivas (a fala afirma ordem no tempo? afirma
  causa? recorta um público? nega alguma coisa? lista coisas do mesmo tipo?)
- para cada folha, o molde e as alternativas
- regras de descarte com exemplos dos falsos positivos acima
- o que devolver quando nada casa: hoje devolve vazio, e o certo é devolver o
  caminho de fallback (só legenda, ou N1, ou objeto pela lei 3b)

## Entrega 5: `contrato-remotion.md`

O guia descreve motion em §9e e §9f, mas não existe implementação, e o
CHANGELOG admite que animação real nunca foi observada. Entregar o contrato
que um componente Remotion precisa cumprir para ser considerado fiel ao
molde: quais props recebe, o que ele calcula sozinho, o que vem do plano de
cena, e como um script pode conferir a fidelidade sem olhar pixel.

## Formato

Arquivos separados, JSON de verdade (sem comentário), acentuação correta em
português, e um `CHANGELOG.md` dizendo o que foi acrescentado. Não mexer no
que já está aprovado no guia: só acrescentar o que falta.

Se em algum molde faltar informação para preencher um campo, deixe o campo
com `null` e liste o molde numa seção "precisa de decisão humana" no
changelog, dizendo o que falta decidir. Preferimos buraco declarado a número
inventado.
