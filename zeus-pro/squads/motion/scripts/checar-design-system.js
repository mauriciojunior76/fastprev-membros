#!/usr/bin/env node
/**
 * checar-design-system.js — componente de cena nasce do índice de moldes,
 * e todo número sai das escalas fechadas do guia.
 *
 * Lição `design-system-do-indice`. Ele falou duas vezes na mesma peça:
 * "esse video não seguiu o design system padrão apple... tem um padrão para
 * tabelas com traçado colorido... que tu não aplicou inclusive para os
 * icones" e depois "a cena ta nao ta respeitando o design system".
 *
 * O QUE ACONTECEU: os componentes novos foram desenhados no olho. Chamei de
 * lettering um apoio com frase em duas linhas quando o guia define pôster de
 * 6 a 9 linhas com tônica em pill e anel; e usei respiro 14, ícone 42, padding
 * 28, anel 2 em círculo de 88 — todos fora das escalas FECHADAS.
 *
 * POR QUE UM SCRIPT E NÃO MAIS UM PARÁGRAFO: escala fechada é a única parte do
 * design system que uma máquina consegue conferir sozinha, e foi exatamente
 * onde eu errei. O resto (o molde certo para a fala) não dá para medir, então
 * a prova é DECLARADA: cada componente diz no cabeçalho de qual entrada do
 * índice ele veio. Declarar obriga a abrir o índice.
 *
 * Uso:
 *   node scripts/checar-design-system.js <Composition>
 *   node scripts/checar-design-system.js <Composition> --so-escalas
 */

const fs = require("fs");
const path = require("path");

const MOTION = path.resolve(__dirname, "..");
const COMPS = path.join(MOTION, "src", "compositions");
const INDICE = path.join(
  MOTION,
  "aprendizado",
  "propostas-externas",
  "2026-09-05-claude-design-v2.1",
  "moldes-index.json"
);

/* ------------------------------------------------------------------ *
 * escalas FECHADAS (guia v2.1, seções 4, 5 e 9c)
 * ------------------------------------------------------------------ */

/** Espaço no palco (escala 6) e dentro de painel (escala 4). A união das
 *  duas é o que um componente pode usar; qual das duas vale depende de onde
 *  o valor está, e isso o script não sabe — então aceita as duas e confia no
 *  revisor humano para o resto. */
const ESPACO = new Set([4, 6, 8, 12, 16, 18, 20, 24, 44, 88]);
/** Raio no palco e dentro de painel. 999 é a pill. */
const RAIO = new Set([8, 10, 14, 18, 24, 32, 52, 999]);
/**
 * Tamanho de ícone: badge, célula, círculo, selo.
 *
 * CORRIGIDO 06/09/2026, com o design system 3.3 instalado. A lista fechada
 * era [30, 40, 64, 116], copiada do `escalas.json`, e reprovava peça
 * APROVADA. O motivo: o próprio pacote se contradiz. O `escalas.json` declara
 * aqueles quatro, mas os moldes do mesmo pacote mandam desenhar ícone 26 (feed
 * com capas), 56 (N2, frase com ícone), 80 (N1, símbolo) e 120. Só o 64
 * coincide entre as duas listas.
 *
 * Régua do squad (COMO-ATUALIZAR-O-DESIGN-SYSTEM.md, passo 7): quando uma
 * régua nova reprova peça que ele aprovou, quem está errado é a régua. Então
 * a lista passa a ser a UNIÃO do que o sistema declara com o que os moldes do
 * sistema realmente usam, mais os tamanhos que vivem em peça aprovada (48 no
 * círculo de confirmação e no ícone do número, os dois do PauloRuizReels).
 *
 * Não é afrouxar o gate: continua fechado, e continua pegando número
 * inventado fora dessa lista. Só parou de reprovar o que o próprio manual
 * manda fazer.
 */
const ICONE = new Set([26, 30, 40, 48, 56, 64, 80, 116, 120]);
/**
 * Corpo de rótulo (seção 5) e tokens tipográficos do guia.
 *
 * 34, 76 e 104 entraram com o design system 3.3 (06/09/2026), que criou dois
 * níveis de ênfase para a faixa de 2 a 6 palavras: o N1b usa pill com texto
 * 34, e o N2b usa apoio 76 (depois 64) com a palavra tônica em 104. O
 * HamiltonZeusReels já usava 104 desde antes e estava reprovando por um
 * tamanho que agora tem nome oficial no sistema: a peça aprovada estava
 * certa, e o manual alcançou ela.
 */
const CORPO = new Set([16, 18, 22, 24, 26, 30, 34, 36, 38, 40, 52, 56, 58, 62, 64, 66, 72, 76, 84, 92, 96, 104, 132, 140, 200]);
/** Espessura de anel e borda de foco (seção 9c). */
const ANEL = new Set([1, 2, 3, 4, 6]);

/** Cada regra: como achar o número no código e em que escala ele cai. */
const REGRAS = [
  { nome: "espaço", escala: ESPACO, re: /\b(?:gap|marginTop|marginBottom|marginRight|marginLeft|padding|paddingTop|paddingBottom|RESPIRO|GAP|PAD)\s*[:=]\s*(\d+)/g },
  { nome: "raio", escala: RAIO, re: /\b(?:borderRadius|RAIO_[A-Z_]*)\s*[:=]\s*(\d+)/g },
  // ICONE_D / ICONE_TAM só: ICONE_[A-Z_]* pegava ICONE_TEXTO_GAP e
  // ICONE_DELAY, que são espaço e tempo, não tamanho de ícone.
  { nome: "tamanho de ícone", escala: ICONE, re: /\b(?:ICONE_D|ICONE_TAM|tamanho)\s*[:=]\s*(\d+)/g },
  { nome: "corpo de texto", escala: CORPO, re: /\bfontSize\s*[:=]\s*(\d+)/g },
  { nome: "espessura de anel/borda", escala: ANEL, re: /border:\s*`(\d+)px solid/g },
];

/** Linhas que o próprio guia marca como exceção declarada não contam. */
const ESCAPE = /\/\/\s*ds-ok:/;

function arquivosDeCena(comp) {
  const dir = path.join(COMPS, comp, "components", "icons");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((n) => n.endsWith(".tsx") && !n.startsWith("_") && n !== "drawUtils.tsx")
    .map((n) => path.join(dir, n));
}

function conferirEscalas(src, rel) {
  const problemas = [];
  const linhas = src.split(/\r?\n/);
  for (const regra of REGRAS) {
    for (let i = 0; i < linhas.length; i++) {
      const linha = linhas[i];
      if (ESCAPE.test(linha)) continue;
      regra.re.lastIndex = 0;
      let m;
      while ((m = regra.re.exec(linha))) {
        const valor = parseInt(m[1], 10);
        if (valor === 0) continue;
        if (!regra.escala.has(valor)) {
          problemas.push({
            rel,
            linha: i + 1,
            texto: `${regra.nome} ${valor} fora da escala (aceitos: ${[...regra.escala].join(", ")})`,
          });
        }
      }
    }
  }
  return problemas;
}

/** Cena que desenha um objeto citado na fala (lei 3b do playbook da
 *  categoria) não vem do índice de moldes: o índice cataloga estruturas de
 *  informação, e objeto é objeto. Declarar assim é resposta válida. */
const FORA_DO_INDICE = new Set(["objeto-lei-3b"]);

function moldeDeclarado(src) {
  const m = src.match(/MOLDE DO [IÍ]NDICE:\s*([a-z0-9-]+)/i);
  return m ? m[1] : null;
}

function conferirMolde(src, rel, ids) {
  const id = moldeDeclarado(src);
  if (!id) return { falta: true, rel };
  if (FORA_DO_INDICE.has(id)) return null;
  if (ids.size && !ids.has(id)) return { invalido: true, rel, id };
  return null;
}

/**
 * Orçamento do guia: "mesmo molde nunca seguido". Duas cenas vizinhas com a
 * mesma estrutura fazem o vídeo parecer que parou, mesmo com conteúdo novo.
 * Dá para medir cruzando a ordem das cenas (tokens.ts) com o molde declarado
 * no componente de cada uma (MotionStage.tsx faz o mapa).
 */
function conferirRepeticao(comp) {
  const dir = path.join(COMPS, comp);
  const tokens = path.join(dir, "tokens.ts");
  const palco = path.join(dir, "components", "MotionStage.tsx");
  if (!fs.existsSync(tokens) || !fs.existsSync(palco)) return [];

  const ordem = [...fs.readFileSync(tokens, "utf8").matchAll(/key:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]);
  const mapa = new Map(
    [...fs.readFileSync(palco, "utf8").matchAll(/"([a-z0-9-]+)":\s*([A-Za-z0-9_]+)\s*,/g)].map((m) => [m[1], m[2]])
  );

  const moldePorCena = new Map();
  for (const cena of ordem) {
    const componente = mapa.get(cena);
    if (!componente) continue;
    const arq = path.join(dir, "components", "icons", `${componente}.tsx`);
    if (!fs.existsSync(arq)) continue;
    const id = moldeDeclarado(fs.readFileSync(arq, "utf8"));
    if (id) moldePorCena.set(cena, id);
  }

  const problemas = [];
  const comMolde = ordem.filter((c) => moldePorCena.has(c));
  for (let i = 1; i < comMolde.length; i++) {
    const anterior = comMolde[i - 1];
    const atual = comMolde[i];
    if (moldePorCena.get(anterior) !== moldePorCena.get(atual)) continue;
    // só conta se forem vizinhas de verdade na linha do tempo
    if (ordem.indexOf(atual) - ordem.indexOf(anterior) !== 1) continue;
    problemas.push({
      texto: `cenas "${anterior}" e "${atual}" usam o mesmo molde ("${moldePorCena.get(atual)}") uma atras da outra`,
    });
  }
  return problemas;
}

/**
 * TEXTO NA CAIXA SEGURA (06/09/2026).
 *
 * O palco tem duas alturas, não uma (core/layout.ts): até 1536 é o que pode
 * ser LIDO, até 1632 é o que só precisa ser DESENHADO. Entre os dois ficam
 * 96px onde o Instagram sobrepõe legenda do post, arroba, áudio e botões:
 * o conteúdo não some, fica coberto de forma imprevisível.
 *
 * O `palco-overflow` do choreo-lint compara o CONTENT_H com o limite de
 * DESENHO, então deixa passar componente cheio de texto que termina em
 * 1563. Foi o caso do IscaPaga. Esta checagem cobra o limite de TEXTO para
 * quem tem texto.
 *
 * Como decide se um componente "tem texto": procura fontSize no fonte. Um
 * componente que só desenha geometria (trilho, conector, célula) não tem, e
 * continua medido contra o limite generoso.
 */
function conferirTextoNaCaixaSegura(comp) {
  const dir = path.join(COMPS, comp);
  const tokensPath = path.join(dir, "tokens.ts");
  const palcoPath = path.join(dir, "components", "MotionStage.tsx");
  if (!fs.existsSync(tokensPath) || !fs.existsSync(palcoPath)) return [];

  const tokens = fs.readFileSync(tokensPath, "utf8");
  // a peça precisa declarar as duas caixas; sem isso, não há o que conferir
  const mTexto = tokens.match(/STAGE_TEXTO\s*=\s*\{([\s\S]*?)\}/);
  if (!mTexto) return [];
  const alturaTexto = {};
  for (const [, chave, valor] of mTexto[1].matchAll(/(\w+):\s*GABARITO\.(\w+)\.seguro/g)) {
    alturaTexto[chave] = valor;
  }
  // as alturas reais são calculadas em runtime; aqui basta o par modo->campo
  const gab = calcularGabarito(tokens);
  if (!gab) return [];

  const mapa = new Map(
    [...fs.readFileSync(palcoPath, "utf8").matchAll(/"([a-z0-9-]+)":\s*([A-Za-z0-9_]+)\s*,/g)].map((m) => [m[1], m[2]])
  );
  const cenas = [
    ...tokens.matchAll(
      /key:\s*"([a-z0-9-]+)",\s*start:\s*[\d.]+,\s*end:\s*[\d.]+,\s*stage:\s*"(\w+)",\s*caption:\s*"(\w+)"/g
    ),
  ];

  const problemas = [];
  for (const [, cena, stage, caption] of cenas) {
    const componente = mapa.get(cena);
    if (!componente) continue;
    const arq = path.join(dir, "components", "icons", `${componente}.tsx`);
    if (!fs.existsSync(arq)) continue;
    const src = fs.readFileSync(arq, "utf8");
    if (!/fontSize/.test(src)) continue; // só geometria: usa o limite de desenho
    const m = src.match(/CONTENT_H\s*=\s*(\d+)/);
    if (!m) continue;
    const altura = parseInt(m[1], 10);
    const chave = (stage === "expanded" ? "expandido" : "normal") + (caption === "muted" ? "Calado" : "ComLegenda");
    const caixa = gab[chave];
    if (!caixa) continue;
    if (altura > caixa.seguro) {
      problemas.push({
        texto:
          `cena "${cena}" (${componente}) tem texto e altura ${altura}, ` +
          `acima dos ${caixa.seguro} da caixa segura (${stage}, legenda ${caption})`,
        detalhe: `a tinta termina em ${Math.round(caixa.topo + altura)}, e a UI do Instagram pode cobrir a partir de 1536`,
      });
    }
  }
  return problemas;
}

/** Refaz a conta do gabarito lendo as constantes da própria peça, para o
 *  script não ter número chumbado que desatualiza quando a peça muda. */
function calcularGabarito(tokens) {
  const num = (re) => {
    const m = tokens.match(re);
    return m ? parseFloat(m[1]) : null;
  };
  // o valor efetivo mora no comentário da linha (o código é uma conta), e o
  // padrão precisa atravessar o ponto e vírgula para chegar lá
  const centro = num(/CAPTION_CENTER_Y\s*=[^\n]*?\/\/\s*(\d+)/) || num(/CAPTION_CENTER_Y\s*=\s*(\d+)/);
  const banda = num(/CAPTION_BAND_H\s*=\s*(\d+)/);
  const shift = num(/videoShiftYExpanded:\s*(-?\d+)/);
  const gap = num(/STAGE_GAP\s*=[^\n]*?\/\/\s*(\d+)/) || 44;
  if (centro === null || banda === null) return null;
  const s = shift === null ? -70 : shift;
  const caixa = (e, muted) => {
    const desloca = s * e;
    const topo = muted ? centro - banda / 2 + desloca : centro + banda / 2 + desloca + gap;
    return { topo, seguro: Math.round(TEXTO_SEGURO_ATE - topo), desenhavel: Math.round(DEAD_START - topo) };
  };
  return {
    normalComLegenda: caixa(0, false),
    normalCalado: caixa(0, true),
    expandidoComLegenda: caixa(1, false),
    expandidoCalado: caixa(1, true),
  };
}

/** Os dois limites vêm de core/layout.ts; lidos de lá, nunca copiados. */
const LAYOUT_TS = fs.readFileSync(path.join(MOTION, "src", "core", "layout.ts"), "utf8");
const TEXTO_SEGURO_ATE = parseInt((LAYOUT_TS.match(/textoSeguroAte:\s*(\d+)/) || [])[1] || "1536", 10);
const DEAD_START = parseInt((LAYOUT_TS.match(/bottomDeadStart:\s*(\d+)/) || [])[1] || "1632", 10);

function checar(comp, opcoes = {}) {
  if (!comp) {
    console.error("uso: node scripts/checar-design-system.js <Composition> [--so-escalas]");
    return 1;
  }
  const arquivos = arquivosDeCena(comp);
  if (!arquivos.length) {
    console.log(`OK: ${comp} nao tem componente de cena para conferir.`);
    return 0;
  }

  let ids = new Set();
  if (fs.existsSync(INDICE)) {
    try {
      const idx = JSON.parse(fs.readFileSync(INDICE, "utf8"));
      ids = new Set((idx.entries || []).map((e) => e.id));
    } catch {
      /* índice ilegível: não inventa cobertura, só não valida o id */
    }
  }

  const foraDaEscala = [];
  const semMolde = [];
  for (const arq of arquivos) {
    const rel = path.relative(MOTION, arq).replace(/\\/g, "/");
    const src = fs.readFileSync(arq, "utf8");
    foraDaEscala.push(...conferirEscalas(src, rel));
    if (!opcoes.soEscalas) {
      const p = conferirMolde(src, rel, ids);
      if (p) semMolde.push(p);
    }
  }

  for (const p of foraDaEscala) {
    console.log(`  [ERRO] ${p.rel}:${p.linha} ${p.texto}`);
  }
  // Peça anterior à esteira nova não tinha como declarar molde: o campo e o
  // gate nasceram em 06/09/2026, e ela é de antes. Cobrar dela é reprovar
  // trabalho aprovado por uma regra que ainda não existia quando foi feito.
  // O sinal de que a peça nasceu da esteira é ter plano de cenas: quem tem
  // plano continua obrigado a declarar; quem não tem, recebe aviso.
  const nasceuDaEsteira = fs.existsSync(path.join(MOTION, "src", "compositions", comp, "plan", "05-scene-plan.json"));
  for (const p of semMolde) {
    if (p.falta && !nasceuDaEsteira) {
      console.log(`  [aviso] ${p.rel} nao declara molde do indice (peca anterior a esteira; nao reprova).`);
      continue;
    }
    if (p.falta) {
      console.log(`  [ERRO] ${p.rel} nao declara de qual molde do indice veio.`);
      console.log(`         Escrever no cabecalho: "MOLDE DO INDICE: <id>" (ver moldes-index.json).`);
      console.log(`         Se nenhuma entrada cobre a fala, isso e decisao do o dono do canal, nao licenca para inventar.`);
    } else {
      console.log(`  [ERRO] ${p.rel} declara molde "${p.id}", que nao existe no indice.`);
    }
  }

  const repetidos = opcoes.soEscalas ? [] : conferirRepeticao(comp);
  for (const p of repetidos) {
    console.log(`  [ERRO] ${p.texto}.`);
    console.log(`         Orcamento do guia: mesmo molde nunca seguido.`);
  }

  const foraDaCaixa = opcoes.soEscalas ? [] : conferirTextoNaCaixaSegura(comp);
  for (const p of foraDaCaixa) {
    console.log(`  [ERRO] ${p.texto}.`);
    console.log(`         ${p.detalhe}.`);
    console.log(`         Encolher o componente, ou tirar o texto do trecho de baixo.`);
  }

  // Em peça legada o "sem molde declarado" já saiu como aviso: não entra na
  // conta que reprova, senão o aviso vira reprovação por outro caminho.
  const semMoldeQueReprova = nasceuDaEsteira ? semMolde.length : semMolde.filter((p) => !p.falta).length;
  const total = foraDaEscala.length + semMoldeQueReprova + repetidos.length + foraDaCaixa.length;
  console.log(
    `\n${comp}: ${arquivos.length} componente(s), ${foraDaEscala.length} numero(s) fora de escala, ` +
      `${semMoldeQueReprova} sem molde declarado, ${repetidos.length} molde(s) repetido(s) em sequencia, ` +
      `${foraDaCaixa.length} com texto fora da caixa segura.\n`
  );
  if (total) {
    console.log("Escape para excecao consciente: // ds-ok: <motivo> na propria linha.");
  }
  return total ? 2 : 0;
}

if (require.main === module) {
  const comp = process.argv.find((a) => !a.startsWith("--") && a !== process.argv[0] && a !== process.argv[1]);
  process.exit(checar(comp, { soEscalas: process.argv.includes("--so-escalas") }));
}
module.exports = { checar };
