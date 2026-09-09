#!/usr/bin/env node
/**
 * cena-sob-demanda.js: quando nao existe recurso pronto, a cena e composta.
 *
 * O catalogo do design system tem 93 recursos. Nenhum deles ilustra "baixa o
 * zip, abre no Claude Code e coloca o Zeus". Ate 08/09/2026 uma fala dessas
 * caia num molde aproximado (errado) ou virava so legenda (vazio). Este script
 * e a terceira saida: monta a cena a partir das doze primitivas atomicas,
 * guiado pelo VERBO da fala, no traco do sistema.
 *
 * Nao inventa estetica. Combina pecas que ja obedecem ao design system, na
 * ordem e no tempo que a regra manda (DIRECAO-DINAMICA secao 11).
 *
 * Uso:
 *   node cena-sob-demanda.js --texto "baixa o zip, abre no Claude Code e coloca o Zeus"
 *   node cena-sob-demanda.js --texto "..." --tonica 240        ancora na tonica real
 *   node cena-sob-demanda.js --plano <Composition>             todos os beats sem recurso
 *   node cena-sob-demanda.js --texto "..." --json              para outro script consumir
 */
const fs = require("fs");
const path = require("path");
const R = require("./lib/ds-registry");
const { paths, planDir, existe } = require("./lib/ds-root");

const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const valor = (n, p = null) => {
  const i = args.indexOf(n);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : p;
};

const FPS = 60;
const PRIMITIVAS_PATH = path.join(paths.ds, "registry", "primitivas-atomicas.json");

function carregarPrimitivas() {
  if (!existe(PRIMITIVAS_PATH)) {
    console.error(`Registro de primitivas nao encontrado: ${PRIMITIVAS_PATH}`);
    console.error("Sem ele nao da pra compor cena: o alfabeto e ele.");
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(PRIMITIVAS_PATH, "utf8"));
}

/**
 * Palavras que nunca viram objeto: artigo, preposicao, pronome e o resto do
 * cimento da frase. Sem esta lista, "o" e "do" virariam janela.
 */
const VAZIAS = new Set(
  ("o a os as um uma uns umas de do da dos das em no na nos nas por para pra pro com sem sobre " +
    "e ou mas que se ja la ali aqui isso isto esse essa este esta aquele aquela seu sua meu minha " +
    "voce eu ele ela nos eles elas ai entao depois antes agora tambem so muito bem tudo nada " +
    "ser estar ter fazer vai vou pode quer")
    .split(" ")
);

/** Mapa de pista para primitiva. A ordem importa: a primeira que casa decide. */
const PISTAS = [
  { primitiva: "arquivo", re: /\b(zip|rar|pdf|mp4|png|jpe?g|csv|json|docx?|xlsx?|arquivo|arquivos|pacote|download)\b/i },
  { primitiva: "pasta", re: /\b(pasta|diretorio|destino|repositorio|projeto)\b/i },
  { primitiva: "campo", re: /\b(prompt|comando|busca|pesquisa|campo|mensagem|texto)\b/i },
  { primitiva: "botao", re: /\b(botao|enviar|publicar|salvar|confirmar)\b/i },
  { primitiva: "lista", re: /\b(lista|conjunto|varios|todos|itens|opcoes)\b/i },
  { primitiva: "passo", re: /\b(etapa|etapas|passo|passos|processo)\b/i },
  { primitiva: "badge", re: /\b(pronto|feito|confirmado|instalado|aprovado)\b/i },
  { primitiva: "cursor", re: /\b(clique|clicar|mouse|cursor)\b/i },
];

/**
 * Nome proprio ou termo de produto vira JANELA por padrao (Claude Code, Notion,
 * Figma), a nao ser que ja tenha virado outra coisa por uma pista acima. E o
 * chute menos errado: quase todo nome de ferramenta se ve como uma tela.
 */
function pareceNomeProprio(palavraOriginal) {
  return /^[A-Z]/.test(palavraOriginal) && palavraOriginal.length > 2;
}

/**
 * Junta nomes proprios vizinhos num objeto so: "Claude Code" e uma janela, nao
 * duas. Sem isto, cada palavra com maiuscula virava um objeto e o terceiro
 * verbo da frase agia sobre a metade de um nome (medido em 08/09/2026).
 */
function juntarNomesProprios(brutas) {
  const saida = [];
  for (let i = 0; i < brutas.length; i++) {
    const limpa = brutas[i].replace(/[.,;:!?()"']/g, "");
    if (pareceNomeProprio(limpa) && i > 0) {
      const grupo = [limpa];
      let j = i + 1;
      while (j < brutas.length) {
        const prox = brutas[j].replace(/[.,;:!?()"']/g, "");
        // a virgula ou o ponto encerram o nome; o texto original mantem a
        // pontuacao, entao a checagem e no bruto, nao no limpo
        if (!pareceNomeProprio(prox) || /[.,;:!?]$/.test(brutas[j - 1])) break;
        grupo.push(prox);
        j++;
      }
      saida.push({ palavra: grupo.join(" "), indice: i });
      i = j - 1;
    } else {
      saida.push({ palavra: brutas[i], indice: i });
    }
  }
  return saida;
}

/** Objetos que a fala nomeia, na ordem em que aparecem. */
function extrairObjetos(texto) {
  const brutas = juntarNomesProprios(texto.split(/\s+/)).map((x) => x.palavra);
  const objetos = [];
  const vistos = new Set();

  brutas.forEach((bruta, idx) => {
    const limpa = bruta.replace(/[.,;:!?()"']/g, "");
    if (!limpa) return;
    const n = R.norm(limpa);
    if (VAZIAS.has(n) || n.length < 2) return;

    let primitiva = null;
    for (const p of PISTAS) {
      if (p.re.test(limpa)) {
        primitiva = p.primitiva;
        break;
      }
    }
    if (!primitiva && pareceNomeProprio(limpa) && idx > 0) primitiva = "janela";
    if (!primitiva) return;

    const chave = `${primitiva}:${n}`;
    if (vistos.has(chave)) return;
    vistos.add(chave);
    objetos.push({ rotulo: limpa, primitiva, palavraIndice: idx });
  });

  return objetos;
}

/** Verbos que a fala executa, na ordem, com o gesto de cada um. */
function extrairVerbos(texto, mapa) {
  const n = R.norm(texto);
  const achados = [];
  for (const entrada of mapa.verbo_para_gesto) {
    for (const v of entrada.verbos) {
      if (!R.casaGatilho(n, v)) continue;
      const pos = n.indexOf(R.norm(v));
      achados.push({ verbo: v, pos, ...entrada });
      break;
    }
  }
  return achados.sort((a, b) => a.pos - b.pos);
}

/**
 * Compoe a cena. Cada verbo puxa o objeto mais proximo que ainda nao foi usado,
 * e vira um evento com gesto, tempo e peso. Sem verbo nenhum a cena nao existe:
 * o fallback do manual e virar N2 da frase (estado C), nunca um molde errado.
 */
function compor(texto, { tonicFrame = 120 } = {}) {
  const mapa = carregarPrimitivas();
  const objetos = extrairObjetos(texto);
  const verbos = extrairVerbos(texto, mapa);

  if (!verbos.length) {
    return {
      texto,
      compoe: false,
      motivo: "nenhum verbo de acao na fala",
      fallback: { estado: "C", recurso: "lettering N2 da frase" },
      objetos,
      eventos: [],
    };
  }

  const disponiveis = [...objetos];
  const eventos = [];
  let frame = tonicFrame;

  verbos.forEach((v, i) => {
    // O objeto do verbo e o proximo ainda livre; sem objeto identificado, o
    // gesto age sobre um cartao generico (nunca sobre nada).
    const alvo = disponiveis.shift() || { rotulo: "conteudo", primitiva: "cartao" };
    // O verbo manda no que a coisa E naquele momento: "coloca o Zeus" faz do
    // Zeus um item entrando numa lista, mesmo que o nome sozinho parecesse uma
    // janela. A pista do substantivo so prevalece quando o verbo nao opina.
    const primitiva = v.primitivaPreferida || alvo.primitiva;
    const spec = mapa.primitivas.find((p) => p.id === primitiva);
    const dur = v.durQ || Math.max(12, Math.round(alvo.rotulo.length * 1.5));

    eventos.push({
      ordem: i + 1,
      objeto: alvo.rotulo,
      primitiva,
      primitivaPelaPalavra: alvo.primitiva,
      tamanhoPx: spec ? spec.tamanhoPx : null,
      verbo: v.verbo,
      gesto: v.gesto,
      ease: v.ease,
      // O objeto nasce 6 quadros antes da palavra que o nomeia; o gesto
      // acontece na tonica do verbo (MOTION secao 4).
      nasceEmFrame: frame - 6,
      gestoEmFrame: frame,
      durationFrames: dur,
      peso: v.peso,
      seVe: v.seVe,
    });

    // proximo evento comeca quando este assenta, com o respiro de uma passagem
    frame += dur + 10;
  });

  const somaPeso = eventos.reduce((a, e) => a + e.peso, 0);
  const ultimo = eventos[eventos.length - 1];
  const palavras = texto.trim().split(/\s+/).length;
  const hold = 60 + Math.max(0, palavras - 4) * 12;

  return {
    texto,
    compoe: true,
    layout: eventos.length >= 3 ? "passos em cascata da esquerda para a direita, anel unico migrando" : "objeto central",
    objetos,
    eventos,
    somaPeso,
    pesoDentroDoTeto: somaPeso <= 22,
    fimEmFrame: ultimo.gestoEmFrame + ultimo.durationFrames,
    holdFrames: hold,
    duracaoTotalFrames: ultimo.gestoEmFrame + ultimo.durationFrames + hold - (eventos[0].nasceEmFrame),
    estado: "A",
    avisos: somaPeso > 22 ? [`soma de peso ${somaPeso} acima do teto de 22: rebaixar o gesto de menor informacao`] : [],
  };
}

function imprimir(c) {
  console.log(`\nfala: "${c.texto}"`);
  if (!c.compoe) {
    console.log(`  NAO COMPOE: ${c.motivo}`);
    console.log(`  fallback do manual: estado ${c.fallback.estado}, ${c.fallback.recurso}`);
    console.log("  (nunca tela vazia, nunca molde errado so porque era o que tinha)");
    return;
  }
  console.log(`  estado ${c.estado} · ${c.eventos.length} eventos · peso somado ${c.somaPeso} (teto 22)`);
  console.log(`  layout: ${c.layout}`);
  console.log("");
  c.eventos.forEach((e) => {
    console.log(`  ${e.ordem}. ${e.objeto}  [${e.primitiva}]`);
    console.log(`     verbo "${e.verbo}" vira ${e.gesto} (${e.ease}, ${e.durationFrames}q, peso ${e.peso})`);
    console.log(`     nasce no quadro ${e.nasceEmFrame}, gesto no ${e.gestoEmFrame}: ${e.seVe}`);
  });
  console.log(`\n  hold de leitura: ${c.holdFrames}q · cena inteira: ${c.duracaoTotalFrames}q`);
  c.avisos.forEach((a) => console.log(`  aviso: ${a}`));
}

function main() {
  const comoJson = flag("--json");

  const texto = valor("--texto");
  if (texto) {
    const c = compor(texto, { tonicFrame: Number(valor("--tonica", 120)) });
    if (comoJson) return console.log(JSON.stringify(c, null, 2));
    return imprimir(c);
  }

  const comp = valor("--plano");
  if (comp) {
    const dir = planDir(comp);
    const p = path.join(dir, "02-beats.json");
    const alt = path.join(dir, "02-beats.draft.json");
    const alvo = existe(p) ? p : existe(alt) ? alt : null;
    if (!alvo) {
      console.error(`Sem plano de beats para ${comp}. Rode antes: node scripts/beats.js ${comp}`);
      process.exit(1);
    }
    const plano = JSON.parse(fs.readFileSync(alvo, "utf8"));
    const compostas = [];
    for (const b of plano.beats || []) {
      // So compoe onde o roteador nao achou estrutura: cena composta e a
      // terceira saida, nunca a primeira.
      if ((b.structures || []).length) continue;
      const c = compor(b.text, { tonicFrame: b.startFrame + 60 });
      if (c.compoe) compostas.push({ beat: b.id, ...c });
    }
    const saida = path.join(dir, "03-cenas-compostas.json");
    fs.writeFileSync(saida, JSON.stringify({ composition: comp, geradoEm: new Date().toISOString().slice(0, 10), cenas: compostas }, null, 2), "utf8");
    if (comoJson) return console.log(JSON.stringify(compostas, null, 2));
    console.log(`${compostas.length} cena(s) composta(s) de ${(plano.beats || []).length} beats.`);
    compostas.forEach((c) => console.log(`  ${c.beat}: ${c.eventos.map((e) => `${e.objeto}(${e.gesto})`).join(" · ")}`));
    console.log(path.relative(paths.repo, saida));
    return;
  }

  console.error('Uso: node cena-sob-demanda.js --texto "a fala" [--tonica N] | --plano <Composition>   [--json]');
  process.exit(1);
}

main();
