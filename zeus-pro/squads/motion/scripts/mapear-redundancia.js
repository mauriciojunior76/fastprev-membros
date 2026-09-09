#!/usr/bin/env node
/**
 * mapear-redundancia.js — mapeia trechos candidatos a corte numa transcricao
 * por palavra (narration.json), ANTES do vídeo virar composition.
 *
 * Nasce do ERRO/pedido do o dono do canal na producao do video da call com o Carlos
 * Seme (05/09/2026): aos 14,66s ele diz "tem um mini hospital" e de 15,72 a
 * 19,16 repete a mesma ideia ("ou, você citou, né, um hospital numa
 * proporção um pouco menor"). Ordem literal dele: "Esse padrão já tem que
 * adicionar no Squad para que, toda vez que ele pegar uma transcrição, ele
 * veja a transcrição e mapeie coisas que podem ser removidas."
 *
 * Isto e camada PENSADA, nao automatica (docs/PROCESSO-REEL-ZOOM.md secao 1):
 * o script so aponta CANDIDATOS com motivo e trecho exato; quem aprova o
 * corte e sempre um humano. Nunca corta sozinho -- quem corta e
 * scripts/video/cortar-fala.js, e so com a lista aprovada.
 *
 * Cinco heuristicas, cada uma com o motivo escrito ao lado do candidato:
 *
 *   a) REFORMULACAO REDUNDANTE: uma frase comeca com marcador de reformulacao
 *      ("ou," "então," "quer dizer," "na verdade") OU contem um CALLBACK
 *      explicito ("você citou", "como eu disse/falei", "já falei/disse",
 *      "repetindo", "retomando") e repete uma palavra de conteudo ja dita na
 *      frase IMEDIATAMENTE anterior (nunca em frases mais distantes: e assim
 *      que se evita confundir reformulacao com enumeracao). A frase inteira
 *      vira candidato a corte; a frase anterior, mais limpa, fica.
 *   b) ENUMERACAO (nao e candidato a corte, e AVISO pra nao cortar por
 *      engano): a mesma sentenca tem 2 ou mais clausulas internas comecando
 *      com "ou"/"então" (padrao "ou X, ou Y, ou Z"). Isso e estrutura
 *      retorica de lista (design-router.json, esquema RAMIFICACAO/PASSOS),
 *      nunca reformulacao. Repetir o verbo entre as clausulas e o proprio
 *      recurso, nao gordura.
 *   c) SUBSTANTIVO FORTE REPETIDO: a mesma palavra de conteudo (>= 4 letras,
 *      fora da lista de parada) aparece de novo dentro de uma janela curta
 *      (padrao 8s), fora dos casos (a) e (b). Sinal fraco, so aviso.
 *   d) VICIO DE FALA ISOLADO: palavra de preenchimento ("né", "tá") cercada
 *      de pausa dos dois lados (>= 0.25s antes e depois).
 *   e) FIM INTERROMPIDO: a ultima palavra da transcricao termina bem antes
 *      do fim do arquivo de audio (janela padrao 0.8s), sinal de fala
 *      cortada por outra pessoa ou pelo fim da gravacao. O candidato lista
 *      as palavras de CONTEUDO da ultima frase com duracao (pista de enfase
 *      de voz), pra um humano escolher a palavra-conceito do fecho --
 *      escolher essa palavra e PENSADO (docs/design-system-v2 secao 6a: um
 *      substantivo abstrato quase sempre pesa mais que um numero ou
 *      quantificador que so complementa ele), o script nunca decide sozinho.
 *
 * Uso:
 *   node mapear-redundancia.js <narration.json> [--out cortes-candidatos.json]
 *      [--janela-redundancia 8] [--janela-fim 0.8]
 *
 * Saida: JSON com a lista de candidatos, cada um com tipo, motivo, texto,
 * palavra inicial/final (indice e tempo) e uma sugestao de "de" / "ate" em
 * segundos, pronta para virar entrada de scripts/video/cortar-fala.js depois
 * de revisada por humano.
 */

"use strict";

const fs = require("fs");
const path = require("path");

const ARGV = process.argv.slice(2);
if (ARGV.length === 0 || ARGV[0].startsWith("--")) {
  console.error("Uso: node mapear-redundancia.js <narration.json> [--out arquivo.json] [--janela-redundancia 8] [--janela-fim 0.8]");
  process.exit(1);
}

function argVal(name, def) {
  const i = ARGV.indexOf(`--${name}`);
  if (i === -1) return def;
  return ARGV[i + 1];
}

const INPUT = ARGV[0];
const OUT = argVal("out", null);
const JANELA_REDUNDANCIA_S = parseFloat(argVal("janela-redundancia", "8"));
const JANELA_FIM_S = parseFloat(argVal("janela-fim", "0.8"));
const PAUSA_VICIO_S = 0.25;

if (!fs.existsSync(INPUT)) {
  console.error(`Arquivo nao encontrado: ${INPUT}`);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(INPUT, "utf8"));
const words = data.words || [];
if (words.length === 0) {
  console.error("narration.json sem palavras.");
  process.exit(1);
}

// ---------------------------------------------------------------------
// Vocabulario de controle. Mantido curto e literal de proposito: e mais
// facil o Zeus futuro ADICIONAR um marcador novo aqui do que decifrar um
// classificador estatistico quando um caso novo nao for pego.
// ---------------------------------------------------------------------

const MARCADORES_INICIO = ["ou", "então", "entao"];

// So entram aqui referencias PARA TRAS explicitas ("isto que eu vou dizer
// ja foi dito"). "ou seja", "quer dizer" e "na verdade" ficaram de fora de
// proposito: sao conectores genericos que tanto introduzem reformulacao
// redundante quanto CONTRASTE ou explicacao nova ("todo mundo acha X, mas
// na verdade Y" e virada de tese, nao redundancia) -- incluir "na verdade"
// aqui gerou um falso positivo real no proprio video de teste (cortava a
// virada "ele acha que e tecnica, MAS NA VERDADE a mentoria que vende e
// outra", que e o argumento central, nao gordura).
const CALLBACKS = [
  ["você", "citou"], ["voce", "citou"],
  ["como", "eu", "disse"], ["como", "eu", "falei"],
  ["já", "falei"], ["ja", "falei"], ["já", "disse"], ["ja", "disse"],
  ["que", "já", "falei"], ["que", "ja", "falei"],
  ["que", "já", "mencionei"], ["que", "ja", "mencionei"],
  ["repetindo"], ["retomando"],
];

const VICIOS_ISOLADOS = new Set(["né", "ne", "tá", "ta"]);

const PARADA = new Set([
  "o", "a", "os", "as", "um", "uma", "uns", "umas", "de", "da", "do", "das", "dos",
  "que", "e", "é", "ou", "se", "em", "no", "na", "nos", "nas", "para", "por", "com",
  "sem", "ele", "ela", "eles", "elas", "eu", "tu", "você", "voce", "nós", "nos",
  "vai", "vão", "vao", "tem", "ter", "está", "esta", "estão", "estao", "seu", "sua",
  "mais", "muito", "muitos", "muitas", "como", "já", "ja", "só", "so", "não", "nao",
  "mas", "então", "entao", "isso", "esse", "essa", "este", "aí", "ai",
]);

function semAcento(s) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function normaliza(raw) {
  return raw
    .toLowerCase()
    .replace(/[.,!?;:"']/g, "")
    .trim();
}

function ehConteudo(norm) {
  return norm.length >= 4 && !PARADA.has(norm) && !PARADA.has(semAcento(norm));
}

// ---------------------------------------------------------------------
// Segmenta em sentencas por pontuacao de fim (. ! ?) na palavra bruta.
// ---------------------------------------------------------------------

function segmentarSentencas(ws) {
  const sentencas = [];
  let atual = [];
  for (const w of ws) {
    atual.push(w);
    if (/[.!?]$/.test(w.text.trim())) {
      sentencas.push(atual);
      atual = [];
    }
  }
  if (atual.length > 0) sentencas.push(atual);
  return sentencas;
}

const sentencas = segmentarSentencas(words);

function palavrasConteudo(sentenca) {
  return sentenca.map((w) => normaliza(w.text)).filter(ehConteudo);
}

function textoDe(sentenca) {
  return sentenca.map((w) => w.text).join(" ");
}

function contemCallback(sentenca) {
  const norms = sentenca.map((w) => normaliza(w.text));
  for (const seq of CALLBACKS) {
    const seqNorm = seq.map((s) => normaliza(s));
    for (let k = 0; k <= norms.length - seqNorm.length; k++) {
      if (seqNorm.every((tok, j) => norms[k + j] === tok)) {
        return seq.join(" ");
      }
    }
  }
  return null;
}

function comecaComMarcador(sentenca) {
  const primeira = normaliza(sentenca[0].text);
  return MARCADORES_INICIO.includes(primeira) ? primeira : null;
}

/**
 * Enumeracao: dentro da MESMA sentenca (que so termina em . ! ?, virgula
 * nao conta), conta clausulas internas que comecam com "ou"/"então" logo
 * apos uma virgula. Duas ou mais = lista retorica ("ou X, ou Y, ou Z"),
 * nunca reformulacao.
 */
function contarClausulasOu(sentenca) {
  let clausulas = comecaComMarcador(sentenca) ? 1 : 0;
  for (let k = 1; k < sentenca.length; k++) {
    const anterior = sentenca[k - 1].text.trim();
    if (!/,$/.test(anterior)) continue;
    const norm = normaliza(sentenca[k].text);
    if (MARCADORES_INICIO.includes(norm)) clausulas++;
  }
  return clausulas;
}

const candidatos = [];

// --- (a) REFORMULACAO REDUNDANTE (so contra a sentenca IMEDIATAMENTE
//         anterior, nunca varrendo varias pra tras -- foi assim que uma
//         palavra repetida por acaso a 8s de distancia virava falso
//         positivo) ------------------------------------------------------
for (let i = 1; i < sentencas.length; i++) {
  const atual = sentencas[i];
  const anterior = sentencas[i - 1];

  if (contarClausulasOu(atual) >= 2) continue; // vira (b), enumeracao

  const marcador = comecaComMarcador(atual);
  const callback = contemCallback(atual);
  if (!marcador && !callback) continue;

  const conteudoAtual = new Set(palavrasConteudo(atual));
  const conteudoAnterior = new Set(palavrasConteudo(anterior));
  const repetidas = [...conteudoAtual].filter((p) => conteudoAnterior.has(p));
  if (repetidas.length === 0) continue;

  const primeira = atual[0];
  const ultima = atual[atual.length - 1];

  // Duas forcas bem diferentes, e misturar as duas gera corte errado:
  //
  //  - CALLBACK explicito ("você citou", "como eu disse"): a propria fala
  //    declara que aquilo ja foi dito. Sinal forte, candidato de verdade.
  //  - So o marcador ("ou,", "então,") mais uma palavra repetida: sinal
  //    FRACO. No proprio video de teste, depois do primeiro corte, a frase
  //    "Ou seja, as pessoas que vão comprar a sua mentoria, elas não querem
  //    entender da parte técnica do negócio" passou a cair nessa regra so
  //    porque repete "pessoas" -- e ela e conteudo NOVO, o argumento
  //    central. Marcador com repeticao vira AVISO, nunca corte proposto.
  candidatos.push({
    tipo: callback ? "reformulacao-redundante" : "possivel-reformulacao",
    motivo: callback
      ? `contem o callback explicito "${callback}" e repete a palavra "${repetidas[0]}", ja dita na frase anterior ("${textoDe(anterior)}")`
      : `frase comeca com marcador ("${marcador}") e repete a palavra "${repetidas[0]}" da frase anterior. CONFERIR A MAO: marcador com repeticao tanto introduz reformulacao redundante quanto conteudo novo (consequencia, contraste, explicacao)`,
    de_palavra_i: primeira.i,
    ate_palavra_i: ultima.i,
    de_s: Number(anterior[anterior.length - 1].end.toFixed(3)),
    ate_s: Number(ultima.end.toFixed(3)),
    texto_removido: textoDe(atual),
    texto_que_fica_antes: textoDe(anterior),
    confianca: callback ? "alta" : "media (aviso, conferir a mao)",
  });
}

// --- (b) ENUMERACAO: so um AVISO informativo, pra nao ser confundida com
//         redundancia por quem for revisar a lista a mao. -----------------
for (let i = 0; i < sentencas.length; i++) {
  const s = sentencas[i];
  const clausulas = contarClausulasOu(s);
  if (clausulas >= 2) {
    candidatos.push({
      tipo: "estrutura-enumeracao",
      motivo: `${clausulas} clausulas comecando com "ou"/"então" na mesma frase: lista retorica ("${textoDe(s)}"). NAO cortar, e candidata a esquema RAMIFICACAO ou PASSOS (design-router.json)`,
      de_palavra_i: s[0].i,
      ate_palavra_i: s[s.length - 1].i,
      de_s: Number(s[0].start.toFixed(3)),
      ate_s: Number(s[s.length - 1].end.toFixed(3)),
      confianca: "informativo",
    });
  }
}

// --- (c) SUBSTANTIVO FORTE REPETIDO (aviso fraco) -------------------------
const jaMarcados = new Set(candidatos.filter((c) => c.tipo === "reformulacao-redundante").map((c) => c.de_palavra_i));
const ocorrencias = {}; // norm -> ultima ocorrencia {i, end}
for (const w of words) {
  const norm = normaliza(w.text);
  if (!ehConteudo(norm)) continue;
  const anteriorOc = ocorrencias[norm];
  if (anteriorOc && w.start - anteriorOc.end <= JANELA_REDUNDANCIA_S && !jaMarcados.has(w.i)) {
    candidatos.push({
      tipo: "substantivo-repetido",
      motivo: `palavra "${norm}" repetida ${(w.start - anteriorOc.end).toFixed(1)}s depois da ocorrencia anterior (indice ${anteriorOc.i})`,
      de_palavra_i: anteriorOc.i,
      ate_palavra_i: w.i,
      de_s: Number(anteriorOc.end.toFixed(3)),
      ate_s: Number(w.end.toFixed(3)),
      confianca: "baixa (aviso, nao objeto de corte automatico)",
    });
  }
  ocorrencias[norm] = { i: w.i, end: w.end };
}

// --- (d) VICIO DE FALA ISOLADO -------------------------------------------
for (let k = 0; k < words.length; k++) {
  const w = words[k];
  const norm = normaliza(w.text);
  if (!VICIOS_ISOLADOS.has(norm)) continue;
  const anteriorW = words[k - 1];
  const proximaW = words[k + 1];
  const pausaAntes = anteriorW ? w.start - anteriorW.end : 1;
  const pausaDepois = proximaW ? proximaW.start - w.end : 1;
  if (pausaAntes >= PAUSA_VICIO_S || pausaDepois >= PAUSA_VICIO_S) {
    candidatos.push({
      tipo: "vicio-isolado",
      motivo: `"${w.text}" cercado de pausa (antes ${pausaAntes.toFixed(2)}s, depois ${pausaDepois.toFixed(2)}s), sem sentido novo`,
      de_palavra_i: w.i,
      ate_palavra_i: w.i,
      de_s: Number(w.start.toFixed(3)),
      ate_s: Number(w.end.toFixed(3)),
      texto_removido: w.text,
      confianca: "media",
    });
  }
}

// --- (e) FIM INTERROMPIDO -------------------------------------------------
const ultimaPalavra = words[words.length - 1];
const duracaoAudio = data.durationSec || ultimaPalavra.end;
const folgaFinal = duracaoAudio - ultimaPalavra.end;

if (folgaFinal < JANELA_FIM_S && folgaFinal >= 0) {
  candidatos.push({
    tipo: "fim-nao-interrompido",
    motivo: `ultima palavra termina ${folgaFinal.toFixed(2)}s antes do fim do audio: fala parece ter chegado ao fim natural, sem interrupcao`,
    de_palavra_i: ultimaPalavra.i,
    ate_palavra_i: ultimaPalavra.i,
    de_s: Number(ultimaPalavra.end.toFixed(3)),
    ate_s: Number(duracaoAudio.toFixed(3)),
    confianca: "informativo",
  });
} else {
  const ultimaSentenca = sentencas[sentencas.length - 1];
  const candidatasDestaque = ultimaSentenca
    .map((w) => ({ texto: w.text, start: w.start, end: w.end, dur: Number((w.end - w.start).toFixed(3)) }))
    .filter((w) => ehConteudo(normaliza(w.texto)));
  candidatos.push({
    tipo: "fim-interrompido",
    motivo: `${folgaFinal.toFixed(2)}s de folga entre a ultima palavra transcrita ("${ultimaPalavra.text}") e o fim do audio (${duracaoAudio.toFixed(2)}s): sinal de interrupcao ou corte externo`,
    de_palavra_i: ultimaSentenca[0].i,
    ate_palavra_i: null,
    corte_sugerido_de_s: Number((ultimaPalavra.end + 0.3).toFixed(3)),
    corte_sugerido_ate_s: Number(duracaoAudio.toFixed(3)),
    ultima_frase: textoDe(ultimaSentenca),
    candidatos_palavra_conceito_do_fecho: candidatasDestaque,
    escolha_da_palavra: "PENSADO (nao automatizavel): prefira o substantivo ABSTRATO que carrega o conceito (docs/design-system-v2 secao 6a, N3) sobre numero/quantificador que so o complementa",
    confianca: "alta (o corte); a escolha da palavra de destaque e humana",
  });
}

// ---------------------------------------------------------------------

const resultado = {
  _doc: "Candidatos a corte de fala. Aprovar/rejeitar cada um a mao, so entao virar entrada de scripts/video/cortar-fala.js. Camada PENSADA (docs/PROCESSO-REEL-ZOOM.md secao 1): o script aponta, o humano decide.",
  fonte: path.resolve(INPUT),
  duracaoAudioSec: duracaoAudio,
  geradoEm: new Date().toISOString(),
  candidatos,
};

const saida = JSON.stringify(resultado, null, 2);
if (OUT) {
  fs.writeFileSync(OUT, saida, "utf8");
  console.log(`Gravado em ${OUT} (${candidatos.length} candidatos).`);
} else {
  console.log(saida);
}

console.error("");
console.error(`--- ${candidatos.length} candidato(s) ---`);
for (const c of candidatos) {
  console.error(`[${c.tipo}] ${c.de_s ?? c.corte_sugerido_de_s}s -> ${c.ate_s ?? c.corte_sugerido_ate_s}s : ${c.motivo}`);
}
