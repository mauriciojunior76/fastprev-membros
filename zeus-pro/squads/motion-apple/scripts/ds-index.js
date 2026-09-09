#!/usr/bin/env node
/**
 * ds-index.js: gera o INDEX.md do design system.
 *
 * Este e o unico arquivo do design system que entra inteiro no contexto (o
 * roteador injeta arquivos de ate 8000 caracteres). Ele nao explica o sistema:
 * ele diz o processo, o que existe, e qual comando responde cada pergunta.
 *
 * Uso: node ds-index.js [--conferir]
 */
const fs = require("fs");
const R = require("./lib/ds-registry");
const { paths } = require("./lib/ds-root");

const TETO = 8000;
const idx = R.carregar({ forcar: true });

// Entrada sem `family` nao e recurso visual: e lei local de
// local-overrides.json (ex.: "bloco-unico-centrado-no-optico", 07/09/2026),
// que entra no mesmo indice por id. Contar ela criava a familia "undefined"
// no INDEX.md e estourava o teto de 8000 caracteres do roteador.
const familias = {};
Object.values(idx.porId).forEach((e) => {
  if (!e.family) return;
  familias[e.family] = (familias[e.family] || 0) + 1;
});
// A contagem tem que ser a soma das familias, nao `contagens.recursos`:
// aquele numero inclui a lei local que acabou de ser filtrada acima, e o
// INDEX.md dizia 94 recursos com 93 espalhados pelas familias.
const totalRecursos = Object.values(familias).reduce((a, b) => a + b, 0);
const listaFamilias = Object.entries(familias)
  .sort((a, b) => b[1] - a[1])
  .map(([f, n]) => `${f} ${n}`)
  .join(" · ");

const md = `# Design system dos Reels Apple: índice (v${idx.versao})

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
\`design-system/MATRIZ-DE-CENAS.md\`.

Regra dura: cena abaixo de 240 quadros (4s) não recebe molde que leva mais de 48 quadros para
se montar. O molde até cabe na tela, mas termina de aparecer depois que a fala já passou.
O \`quadroCompleto\` de cada molde está no \`registry/build-registry.json\`, e o fiscal de ritmo
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
Peça que desenha: \`squads/motion/src/core/AcentoDePassagem.tsx\`.

## Duas peças na mesma cena

Só se existir invariante: algo que NÃO muda entre a primeira e a segunda (mesmo contêiner, mesma
posição, mesmos itens). Sem isso são duas cenas, e o palco não precisa fingir metamorfose.
Os pares permitidos e os proibidos estão em \`registry/composition-rules.json\`, com o motivo e o
"faça assim" de cada proibição. O fiscal de uso cobra.

## A regra de ouro

Um recurso só entra se representa a estrutura que a fala afirma.
Relação, é diagrama. Ação dentro de um aplicativo, é interface. Palavra cravada, é destaque.
Número, é número. Nada disso, é locutor e legenda, e isso é decisão legítima, não falha.

Palavra-gatilho sozinha não decide: "mais clareza" é destaque, não equação; "vagas" sem prazo não
é contagem regressiva.

Confiança alta é expressão inteira mais relação e dados. Baixa é só a palavra, e aí é legenda.

## O que existe

${totalRecursos} recursos visuais em ${Object.keys(familias).length} famílias: ${listaFamilias}.
${idx.contagens.estruturas} estruturas de informação · ${idx.contagens.familiasCena} famílias de cena ·
${idx.contagens.triggers} gatilhos de fala · ${idx.contagens.sfxEventos} eventos de som.

Densidade de cena, de 0 a 5:
${Object.entries(idx.densidades).map(([n, d]) => `${n}. ${d}`).join("\n")}

Ritmo (regras duras):
${idx.ritmo.map((r) => `- ${r}`).join("\n")}

Orçamento por cena: ${(idx.budget.per_scene || []).join(" · ")}
Orçamento por vídeo: ${(idx.budget.per_video || []).join(" · ")}

## Os comandos (é assim que se consulta, não abrindo arquivo)

\`\`\`
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
\`\`\`

Som: o design system nomeia o gesto pelo que se move, o motor nomeia pelo peso. \`ds-som.js\`
traduz um no outro pela ponte de 67 pares. Gesto que não está na ponte não vira som inventado:
ou usa par existente, ou fica em silêncio declarado.

## O que a lei local veta (vence o manual quando conflitam)

- Peso de som vem do catálogo do squad, calibrado de ouvido, nunca do mapa recebido.
- Zona morta de baixo é 1632, medida no código, não 1536.
- Objeto 3D branco continua no sistema: é protagonista de peça aprovada.
- Legenda cala quando a frase grande já é a fala inteira do trecho.
- Desfoque em texto que precisa ser lido é defeito, sempre.

Detalhe e exceções: \`design-system/local-overrides.json\` e \`docs/DESIGN-SYSTEM-REELS-APPLE.md\`.

## O que nunca se abre inteiro

A lista de palavras da transcrição, o painel visual, o manual de 68 KB, o registro visual de 109 KB
e a memória do squad. Tudo isso se consulta por comando, em pedaço.

## Contratos

\`plan/02-beats.json\`: por beat, id, frame inicial e final, palavras, texto, tópico, ideia,
papel narrativo (gancho, contexto, problema, explicação, exemplo, prova, clímax, chamada, respiro,
fecho), densidade, estruturas, palavra de âncora, sinais medidos e confiança.

\`plan/05-scene-plan.json\`: por cena, beat de origem, estrutura, candidatos com nota, escolhido com
motivo, família de cena, densidade, locutor (2up, 1up, none), política de legenda (keep, none),
âncora na palavra, frames de início e fim, tempo de entrada, ação, foco, sustentação e saída,
eventos de foco, som por gesto com peso, e avisos de validação.
`;

fs.writeFileSync(paths.dsIndex, md, "utf8");
const n = md.length;
console.log(`INDEX.md gerado: ${n} caracteres (teto ${TETO})`);
if (n > TETO) {
  console.error(`ACIMA DO TETO: o roteador so injeta arquivo inteiro ate ${TETO}. Corte ${n - TETO} caracteres.`);
  process.exit(1);
}
