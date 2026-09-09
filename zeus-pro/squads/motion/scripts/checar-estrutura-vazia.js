#!/usr/bin/env node
/**
 * checar-estrutura-vazia.js — forma fechada nasce preenchida e com nome.
 *
 * Lição `estrutura-vazia-sem-rotulo`. Ele já tinha dito em 04/09 ("a coluna
 * que representava o faturamento era um contorno vazio, e altura vazia não
 * comunica altura") e voltou a dizer em 06/09, olhando o segundo 11 da
 * Fernanda: "tem erros que são colunas e um x sem o padrão oficial".
 *
 * O QUE ESTE SCRIPT PEGA, e é o caso exato que passou:
 *
 * 1. FORMA FECHADA SEM MIOLO. Retângulo, círculo ou barra com `border` e
 *    `background` branco puro (ou transparente) dentro de uma peça que já é
 *    branca. No papel parece contorno; na tela é caixa vazia. A régua do
 *    sistema é "coluna, faixa e prato nascem preenchidos".
 *
 * 2. RÓTULO QUE CHEGA DEPOIS DO VEREDITO. O rótulo nascia 12 frames DEPOIS
 *    do X entrar, então existia uma janela inteira em que a tela mostrava
 *    três retângulos sem nome nenhum. Estrutura e nome entram juntos.
 *
 * O que ele NÃO tenta adivinhar: se o desenho é bonito, ou se o molde é o
 * certo para a fala. Isso é olho e é do revisor visual.
 *
 * Uso:
 *   node scripts/checar-estrutura-vazia.js <Composition>
 */

const fs = require("fs");
const path = require("path");

const MOTION = path.resolve(__dirname, "..");
const COMPS = path.join(MOTION, "src", "compositions");

/** Cores que, no fundo branco da peça, não contam como preenchimento. */
const VAZIO = /^(transparent|none|#fff(fff)?|COLORS\.pureWhite|COLORS\.white)$/i;

/**
 * Cada bloco de estilo com `border` é uma forma fechada candidata. Procura
 * `background` no MESMO bloco.
 */
function formasFechadas(src) {
  const achados = [];
  const re = /style=\{\{([\s\S]{0,900}?)\}\}/g;
  for (const m of src.matchAll(re)) {
    const bloco = m[1];
    if (!/\bborder\s*:/.test(bloco)) continue;
    // borda de 1px costuma ser divisória ou pill de vidro, não estrutura
    const b = bloco.match(/border\s*:\s*`?\$?\{?([\d.]+)/);
    if (b && Number(b[1]) <= 1) continue;

    const bg = bloco.match(/background\s*:\s*`?"?([^,"`\n]+)"?/);
    const valor = bg ? bg[1].trim().replace(/[`"]/g, "") : null;

    /**
     * "Tem conteudo dentro" se olha DEPOIS do bloco de estilo, nunca dentro
     * dele. Um style cheio de `${sobe}` e `${STROKE.regular}` parecia texto
     * para o teste ingenuo da primeira versao deste script, e foi assim que
     * ele deixou passar exatamente a caixa vazia que o o dono do canal reclamou.
     * Elemento auto-fechado (`/>`) nao tem filho nenhum, por definicao.
     */
    const depois = src.slice(m.index + m[0].length, m.index + m[0].length + 400);
    const autoFechado = /^\s*\/>/.test(depois);
    const abre = depois.match(/^\s*>([\s\S]{0,300})/);
    const temTexto =
      !autoFechado && !!abre && /[A-Za-zÀ-ÿ0-9]/.test(abre[1].replace(/<[^>]*>/g, ""));
    const linha = src.slice(0, m.index).split("\n").length;

    /**
     * Escape consciente na PROPRIA linha, igual ao `ds-ok` do
     * checar-design-system. Existe caso legitimo de forma fechada sem miolo:
     * a camada cinza do par de foco (colorido por cima, cinza por baixo) e
     * transparente de proposito, senao taparia o numero do no.
     */
    const linhasDoBloco = src.slice(m.index, m.index + m[0].length);
    const temEscape = /\/\/\s*ev-ok:/.test(linhasDoBloco);

    if ((!bg || VAZIO.test(valor)) && !temEscape) {
      achados.push({ linha, valor: valor || "(sem background)", temTexto });
    }
  }
  return achados;
}

/**
 * Rótulo que entra depois do gesto de veredito. Procura o padrão
 * `frame - SFX.<gesto>` usado como base de um delay de rótulo.
 */
function rotuloDepoisDoVeredito(src) {
  const m = src.match(/const\s+fRot\s*=\s*frame\s*-\s*SFX\.(\w+)\s*([-+]\s*\d+)?/);
  if (!m) return null;
  const ajuste = m[2] ? Number(m[2].replace(/\s/g, "")) : 0;
  // fRot = frame - SFX.x - 10 => o rotulo comeca em SFX.x + 10, depois do gesto
  if (ajuste <= 0) return { gesto: m[1], atraso: -ajuste };
  return null;
}

function componentesDaComp(compDir) {
  const dir = path.join(compDir, "components", "icons");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".tsx") && !f.startsWith("_") && f !== "drawUtils.tsx")
    .map((f) => ({ nome: f, caminho: path.join(dir, f) }));
}

function main() {
  const composition = process.argv[2];
  if (!composition) {
    console.error("Uso: node scripts/checar-estrutura-vazia.js <Composition>");
    process.exit(1);
  }
  const compDir = path.join(COMPS, composition);
  if (!fs.existsSync(compDir)) {
    console.error(`composicao nao encontrada: ${compDir}`);
    process.exit(1);
  }

  const erros = [];
  let analisados = 0;

  for (const c of componentesDaComp(compDir)) {
    const src = fs.readFileSync(c.caminho, "utf8");
    if (/\/\/ ev-ok:/.test(src) && /ev-ok: arquivo/.test(src)) continue;
    analisados++;

    for (const f of formasFechadas(src)) {
      if (f.temTexto) continue; // tem conteudo proprio dentro: nao e caixa vazia
      erros.push(
        `  [ERRO] ${c.nome}:${f.linha} forma fechada com borda e miolo "${f.valor}", sem nada dentro.\n` +
          `         No fundo branco da peca isso le como caixa vazia. Coluna, degrau, faixa e prato\n` +
          `         nascem preenchidos, ou com numero/rotulo proprio dentro.`
      );
    }

    const tardio = rotuloDepoisDoVeredito(src);
    if (tardio && tardio.atraso >= 0) {
      erros.push(
        `  [ERRO] ${c.nome}: o rotulo nasce em SFX.${tardio.gesto} + ${tardio.atraso}, ou seja DEPOIS do gesto.\n` +
          `         Existe uma janela em que a estrutura aparece sem nome. Estrutura e nome entram juntos.`
      );
    }
  }

  if (erros.length) {
    console.log(`${composition}: estrutura que nasce vazia\n`);
    for (const e of erros) console.log(e);
    console.log(`\n${erros.length} ocorrencia(s) em ${analisados} componente(s).`);
    console.log(`Escape para excecao consciente: // ev-ok: <motivo> no cabecalho do arquivo.`);
    process.exit(2);
  }

  console.log(`${composition}: ${analisados} componente(s), nenhuma estrutura vazia sem nome.`);
}

main();
