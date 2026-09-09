# Design system dos Reels Apple: índice (v3.6)

Este é o mapa. O manual inteiro tem 68 KB e o painel 568 KB: nenhum dos dois se abre inteiro.
Aqui está o processo, o que existe, e o comando que responde cada pergunta.

## O processo, em 10 passos

1. Ler a transcrição inteira, alinhada por palavra.
2. Entender o vídeo como um todo: quem fala, para quem, o que promete, onde termina.
3. Dividir por SIGNIFICADO (beats), nunca por tempo nem por frase.
4. Classificar cada beat: qual a estrutura da informação?
5. Procurar essa estrutura no registro semântico.
6. Recuperar de 2 a 4 candidatos, nunca 1.
7. Abrir apenas essas entradas no registro visual.
8. Comparar "use quando" com "não use quando" e com os dados que você realmente tem.
9. Escolher e escrever o porquê.
10. Só então montar a cena.

Nunca pule do passo 1 para o 10. Nunca escolha por palavra solta.

## Antes de escolher molde: quantas cenas a fala pede

Conte as afirmações por minuto da transcrição. Fala lenta (5 a 8 por minuto) pede 7 a 9 cenas;
fala rápida (14 a 20) pede 14 a 16. A tabela e os 28 momentos de fala reais estão em
`design-system/MATRIZ-DE-CENAS.md`.

Regra dura: cena abaixo de 240 quadros (4s) não recebe molde que leva mais de 48 quadros para
se montar. O molde até cabe na tela, mas termina de aparecer depois que a fala já passou.
O `quadroCompleto` de cada molde está no `registry/build-registry.json`, e o fiscal de ritmo
cobra isso sozinho.

## Frase em destaque: conte as palavras antes de escolher

1 palavra: destaque grande (N3) ou atributo (N1). 2 a 4 com símbolo: frase em pill (N1b).
2 a 6 com uma tônica dentro: frase com palavra tônica (N2b). Até 12 em duas linhas com ícone: N2.
Acima disso, lettering, e no máximo um por vídeo.

Frase de 2 a 6 palavras tem molde próprio: nunca jogar duas em caixa alta dentro do N2. Uma
tônica por frase.

## O acento de passagem

Quando a fala TOCA numa plataforma (WhatsApp, e-mail, perfil, notificação) sem que o trecho seja
sobre ela, a variante de interface entra pequena, por cima da cena, no canto direito, e sai.
40 a 60 quadros, escala 0,55 a 0,7, densidade 1. Não troca o molde, não troca a legenda e não
pega a cor. Teto de 3 por minuto, nunca em cena cheia (densidade 4 ou 5), nunca em cenas vizinhas.

É também remédio de ritmo: uma cena de densidade 3 com acento lê como 3, 1, 3.
Peça que desenha: `squads/motion/src/core/AcentoDePassagem.tsx`.

## Duas peças na mesma cena

Só se existir invariante: algo que NÃO muda entre a primeira e a segunda (mesmo contêiner, mesma
posição, mesmos itens). Sem isso são duas cenas, e o palco não precisa fingir metamorfose.
Os pares permitidos e os proibidos estão em `registry/composition-rules.json`, com o motivo e o
"faça assim" de cada proibição. O fiscal de uso cobra.

## A regra de ouro

Um recurso só entra se representa a estrutura que a fala afirma.
Relação, é diagrama. Ação dentro de um aplicativo, é interface. Palavra cravada, é destaque.
Número, é número. Nada disso, é locutor e legenda, e isso é decisão legítima, não falha.

Palavra-gatilho sozinha não decide: "mais clareza" é destaque, não equação; "vagas" sem prazo não
é contagem regressiva.

Confiança alta é expressão inteira mais relação e dados. Baixa é só a palavra, e aí é legenda.

## O que existe

93 recursos visuais em 16 famílias: interface 46 · flow 8 · emphasis 6 · compare 6 · number 6 · relation 4 · set 3 · chart 3 · hierarchy 2 · branch 2 · scale 2 · process 1 · matrix 1 · scheme 1 · proof 1 · object3d 1.
84 estruturas de informação · 19 famílias de cena ·
83 gatilhos de fala · 40 eventos de som.

Densidade de cena, de 0 a 5:
0. só speaker + legenda: respiro, transição de assunto, fala sem objeto concreto (ex.: depoimento emocional)
1. micro destaque OU acento de passagem: um icone, um mini-selo, um numero pequeno, ou uma variante motion de interface entrando por 40 a 60 quadros sobre a cena atual; nao muda a composicao nem o molde principal
2. visual de apoio: lista, checks, apontamento, toggles; o palco tem um objeto simples
3. cena estruturada: esquema, interface, trio, grade; o palco carrega a informação
4. visual dominante: tela cheia ou palco expandido (comparação com imagem, matriz, feed 12, filtro)
5. excepcional: lettering ou selo de fecho; 1 a 2 vezes por vídeo, nunca em sequência

Ritmo (regras duras):
- nunca 3 cenas seguidas no mesmo nível de densidade
- nunca dois níveis 4 ou 5 em menos de 15s
- depois de um nível 4/5, a próxima cai para 0–2
- um vídeo de 60s típico: 0,2,3,2,4,1,3,0,5 (aprox. 9 a 12 cenas)
- o gancho é função (role=hook), não nível: pode ser 3, 4 ou 5
- o acento de passagem conta como variacao de densidade: uma cena de densidade 3 com acento lê como 3 → 1 → 3 e quebra a monotonia sem trocar o palco
- use acento quando a fala mencionar plataforma e o beat for de outro assunto: sem ele, as 31 variantes motion so aparecem em cena de interface
- maximo 3 acentos por video de 1 minuto

Orçamento por cena: 1 protagonista · 1 portador de cor · ≤ 904×374 (497 lettering) · ≤ 5 itens · ≤ 3 sólidos ≤64px
Orçamento por vídeo: N3 2–3 · N2 3–4 · lettering ≤1 · mesmo molde nunca seguido · ícone nunca em 2 moldes

## Os comandos (é assim que se consulta, não abrindo arquivo)

```
node squads/motion-apple/scripts/beats.js <Comp>              transcrição vira digest e proposta de beats
node squads/motion-apple/scripts/beats.js <Comp> --validate   confere os beats escritos
node squads/motion-apple/scripts/ds-router.js --beat "fala"   devolve 2 a 4 candidatos com o porquê
node squads/motion-apple/scripts/ds-router.js --plan <Comp>   roteia todos os beats de uma vez
node squads/motion-apple/scripts/ds-guia.js "§6a"             abre só uma seção do manual
node squads/motion-apple/scripts/ds-guia.js --painel "#s04d-enfase"   abre só um bloco do painel
node squads/motion-apple/scripts/scene-plan-to-tokens.js <Comp>       plano vira código
node squads/motion-apple/scripts/ds-auditar.js <Comp> --tudo  ritmo, parada, som e uso do sistema
node squads/motion-apple/scripts/comparar-plano.js <Comp>     plano novo contra o que está no ar
node squads/motion-apple/scripts/ds-router.js --check         confere se o sistema está íntegro
node squads/motion-apple/scripts/ds-som.js "<gesto>"          qual par de som do motor usar
node squads/motion-apple/scripts/ds-som.js --molde <id>       o som daquele molde
```

Som: o design system nomeia o gesto pelo que se move, o motor nomeia pelo peso. `ds-som.js`
traduz um no outro pela ponte de 67 pares. Gesto que não está na ponte não vira som inventado:
ou usa par existente, ou fica em silêncio declarado.

## O que a lei local veta (vence o manual quando conflitam)

- Peso de som vem do catálogo do squad, calibrado de ouvido, nunca do mapa recebido.
- Zona morta de baixo é 1632, medida no código, não 1536.
- Objeto 3D branco continua no sistema: é protagonista de peça aprovada.
- Legenda cala quando a frase grande já é a fala inteira do trecho.
- Desfoque em texto que precisa ser lido é defeito, sempre.

Detalhe e exceções: `design-system/local-overrides.json` e `docs/DESIGN-SYSTEM-REELS-APPLE.md`.

## O que nunca se abre inteiro

A lista de palavras da transcrição, o painel visual, o manual de 68 KB, o registro visual de 109 KB
e a memória do squad. Tudo isso se consulta por comando, em pedaço.

## Contratos

`plan/02-beats.json`: por beat, id, frame inicial e final, palavras, texto, tópico, ideia,
papel narrativo (gancho, contexto, problema, explicação, exemplo, prova, clímax, chamada, respiro,
fecho), densidade, estruturas, palavra de âncora, sinais medidos e confiança.

`plan/05-scene-plan.json`: por cena, beat de origem, estrutura, candidatos com nota, escolhido com
motivo, família de cena, densidade, locutor (2up, 1up, none), política de legenda (keep, none),
âncora na palavra, frames de início e fim, tempo de entrada, ação, foco, sustentação e saída,
eventos de foco, som por gesto com peso, e avisos de validação.
