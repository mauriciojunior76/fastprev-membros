#!/usr/bin/env node
/**
 * ds-router.js: da fala para o recurso visual.
 *
 * Recebe o texto de um beat e devolve de 2 a 4 candidatos do design system, com
 * o motivo de cada um, o que diz "use quando" e "nao use quando", e onde esta a
 * regra. Nunca devolve o painel nem o guia inteiro.
 *
 * A ordem de decisao e a do proprio design system (scoring.order):
 *   1 expressao inteira casada   2 relacao da frase compativel
 *   3 dados disponiveis          4 orcamento de densidade
 *   5 variedade (nao repetir os 3 beats anteriores)
 *
 * Uso:
 *   node ds-router.js --check
 *   node ds-router.js --beat "texto da fala" [--estrutura X,Y] [--dados numero=100] [--json] [--explicar]
 *   node ds-router.js --plan <Composition>
 *   node ds-router.js --teste
 */
const fs = require("fs");
const path = require("path");
const R = require("./lib/ds-registry");
const { paths, planDir, existe } = require("./lib/ds-root");

const args = process.argv.slice(2);
function flag(nome) {
  return args.includes(nome);
}
function valor(nome, padrao = null) {
  const i = args.indexOf(nome);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : padrao;
}

// ─── regras de relacao: gatilho lexical nao basta ─────────────────────────────
// Cada regra recebe o texto normalizado e o id candidato, e devolve null (nada a
// dizer) ou { corta, rebaixa, motivo }.
const REGRAS_RELACAO = {
  maisSemDoisTermos(t, id) {
    if (!/\bmais\b/.test(t)) return null;
    if (!id.startsWith("relation.") && !id.startsWith("number.")) return null;
    const temEquacao = /\bmais\b.{0,40}\b(e|da|vira|resulta|gera)\b/.test(t) && /\b(e|vira|resulta|gera)\b/.test(t);
    if (temEquacao) return null;
    return { corta: false, rebaixa: 4, motivo: "'mais' aqui nao e equacao (falta segundo termo e resultado nomeado): vira destaque" };
  },
  ligaSemConfiguracao(t, id) {
    if (!/\bliga(r|ndo)?\b/.test(t)) return null;
    if (!/toggle|switch|configura/.test(id)) return null;
    const ehConfig = /\b(configuracao|opcao|chave|automacao|robo|sistema)\b/.test(t);
    if (ehConfig) return null;
    return { corta: true, motivo: "'liga' com pessoa e acao humana (chamada), nao interruptor de configuracao" };
  },
  vagasSemPrazo(t, id) {
    if (!/\bvagas?\b/.test(t)) return null;
    if (!/countdown|contagem|timer|relogio/.test(id)) return null;
    const temPrazo = /\b(ate|prazo|hoje|amanha|sexta|domingo|dias?|horas?|semana)\b/.test(t);
    if (temPrazo) return null;
    return { corta: true, motivo: "'vagas' sem prazo nao vira contagem regressiva: usa numero ou confirmacao" };
  },
  ganchoNaoEhCategoria(t, id) {
    if (!/\bgancho\b/.test(t)) return null;
    return { corta: false, rebaixa: 2, motivo: "'gancho' e funcao narrativa, nao categoria de recurso: combina com um molde" };
  },
  contagemSoSeEvolucaoEhArgumento(t, id) {
    if (!/^number\.(count|money|percent)/.test(id) && !/count/.test(id)) return null;
    const evolui = /\b(saiu de|foi para|passou de|cresceu|subiu|caiu|de \d|para \d)\b/.test(t);
    const fixo = /\b(meta|preco|preço|custa|data|dia|vagas|sao \d|e de \d)\b/.test(t);
    if (evolui) return null;
    if (fixo) return { corta: false, rebaixa: 3, motivo: "dado fixo (meta, preco, data) e revelado, nao contado do zero" };
    return null;
  },
  dadoAusente(t, id, dados) {
    const e = R.entrada(id);
    if (!e || !e.input) return null;
    const exigeNumero = /\b(numero|percentual|valor|preco|prazo|%)\b/i.test(e.input);
    const temNumero = /\d/.test(t) || (dados && Object.keys(dados).length > 0);
    if (exigeNumero && !temNumero) {
      return { corta: true, motivo: "o recurso exige dado que a fala nao da; nunca inventar numero" };
    }
    return null;
  },
};

/** menção versus ação numa plataforma */
function testeDePlataforma(textoNorm) {
  const idx = R.carregar();
  const plataformas = Object.keys(idx.interfacePlataformas || {});
  const citada = plataformas.find((p) => textoNorm.includes(p));
  if (!citada) return null;
  const verboComConsequencia = /\b(mandei|mandou|enviei|enviou|respondeu|respondi|abriu|abre|clicou|preencheu|comprou|pagou|agendou|caiu|chegou|recebi|recebeu|postou|publicou|apareceu)\b/.test(
    textoNorm
  );
  const temDado = /\d/.test(textoNorm);
  const modo = verboComConsequencia || temDado ? "show" : "mention";
  return {
    plataforma: citada,
    modo,
    show: idx.interfacePlataformas[citada].show || [],
    mention: idx.interfacePlataformas[citada].mention || "mini-selo",
    acento: modo === "mention" ? acentoParaPlataforma(citada, textoNorm) : null,
  };
}

/**
 * O acento de passagem daquela plataforma: qual variante entra por cima e com
 * que recorte. Sai do catálogo de 16 acentos do `interface-registry.json`
 * (design system 3.3). Casa primeiro pela frase de exemplo do catálogo, depois
 * pela primeira variante que a plataforma declara em `show`.
 */
function acentoParaPlataforma(plataforma, textoNorm) {
  const idx = R.carregar();
  const bloco = idx.acentoDePassagem || {};
  const catalogo = bloco.catalogo_de_acentos || [];
  const norm = (s) =>
    String(s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "");

  // casa pela frase do catálogo (a mais específica que aparecer no texto)
  let melhor = null;
  for (const item of catalogo) {
    const chave = norm(item.fala);
    const palavras = chave.split(/\s+/).filter((w) => w.length > 3);
    const casadas = palavras.filter((w) => textoNorm.includes(w)).length;
    if (casadas && (!melhor || casadas > melhor.casadas)) melhor = { item, casadas };
  }
  if (melhor) {
    return { id: melhor.item.acento, recorte: melhor.item.recorte, de: bloco.como && bloco.como.duracao_quadros };
  }
  const show = (idx.interfacePlataformas[plataforma] || {}).show || [];
  if (!show.length) return null;
  const doCatalogo = catalogo.find((c) => c.acento === show[0]);
  return { id: show[0], recorte: doCatalogo ? doCatalogo.recorte : "recorte nao catalogado: use a menor parte que ainda se le" };
}

/** relacoes afirmadas: entra pelo diagram-registry */
function relacoesAfirmadas(textoNorm) {
  const idx = R.carregar();
  const achados = [];
  for (const r of idx.diagramRelacoes) {
    const chave = R.norm(r.relation)
      .replace(/\b[xy]\b|\ba\b|\bb\b/g, "")
      .trim();
    if (chave.length >= 5 && textoNorm.includes(chave)) achados.push(r);
  }
  return achados;
}

/**
 * Rota um beat.
 * @param {string} texto fala do beat
 * @param {object} opts { estruturas: [], dados: {}, recentes: [ids dos 3 beats anteriores] }
 */
function rotear(texto, opts = {}) {
  const idx = R.carregar();
  const t = R.norm(texto);
  const recentes = opts.recentes || [];
  const dados = opts.dados || {};

  const pontos = new Map(); // id -> { score, motivos[] }
  function somar(id, valor, motivo) {
    if (!id || !idx.porId[id]) return;
    if (!pontos.has(id)) pontos.set(id, { score: 0, motivos: [], cortado: false });
    const p = pontos.get(id);
    p.score += valor;
    if (motivo) p.motivos.push(motivo);
  }

  // 1) estruturas: as declaradas pelo agente, senao as inferidas por gatilho
  let estruturas = (opts.estruturas || []).filter((e) => idx.semantica[e]);
  const trg = R.casarTriggers(texto);
  if (!estruturas.length) {
    const vindasDoTrigger = new Set();
    for (const a of trg) {
      const e = idx.porId[a.id];
      if (e) (e.semantic || []).forEach((s) => vindasDoTrigger.add(s));
    }
    estruturas = [...vindasDoTrigger].filter((e) => idx.semantica[e]);
  }

  for (const est of estruturas) {
    const cands = R.candidatosDaEstrutura(est);
    cands.forEach((id, i) => somar(id, Math.max(4 - i, 1), `candidato de ${est}`));
  }

  // 2) gatilho lexical
  for (const a of trg) {
    somar(a.id, a.peso, `casou "${a.frase}"`);
    (a.alt || []).forEach((alt) => somar(alt, 1, `alternativa de "${a.frase}"`));
  }

  // 3) relacao afirmada
  for (const r of relacoesAfirmadas(t)) {
    somar(r.resource, 4, `a fala afirma relacao: ${r.relation}`);
    if (r.alt) somar(r.alt, 2, `alternativa da relacao ${r.relation}`);
  }

  // 4) plataforma: mencao versus acao
  const plat = testeDePlataforma(t);
  if (plat) {
    if (plat.modo === "show") {
      plat.show.forEach((id) => somar(id, 5, `acao dentro do ${plat.plataforma}`));
    } else {
      // Menção: a cena principal NÃO vira interface, mas a variante entra como
      // ACENTO DE PASSAGEM, por cima, 40 a 60 quadros (design system 3.3).
      // Antes desta versão a menção só devolvia mini-selo, e era por isso que
      // as 31 variantes de interface quase nunca eram recrutadas: a regra
      // proibia ativamente a peça fora de cena de interface.
      for (const [id] of pontos) {
        if (id.startsWith("interface.")) {
          pontos.get(id).cortado = true;
          pontos.get(id).motivos.push("so mencao da plataforma: entra como acento por cima, nao como cena de interface");
        }
      }
    }
  }

  // 5) regras de relacao (cortam ou rebaixam)
  const avisosRelacao = [];
  for (const [id, p] of pontos) {
    for (const [nome, fn] of Object.entries(REGRAS_RELACAO)) {
      const r = fn(t, id, dados);
      if (!r) continue;
      if (r.corta) {
        p.cortado = true;
        p.motivos.push(`${nome}: ${r.motivo}`);
      } else {
        p.score -= r.rebaixa || 1;
        p.motivos.push(`${nome}: ${r.motivo}`);
      }
      avisosRelacao.push({ regra: nome, id, motivo: r.motivo });
    }
  }

  // 6) variedade: nao repetir os 3 beats anteriores
  for (const [id, p] of pontos) {
    if (recentes.includes(id)) {
      p.score -= 2;
      p.motivos.push("ja usado nos 3 beats anteriores (variedade)");
    }
  }

  const ordenados = [...pontos.entries()]
    .filter(([, p]) => !p.cortado && p.score > 0)
    .sort((a, b) => b[1].score - a[1].score)
    .slice(0, 4)
    .map(([id, p]) => {
      const e = idx.porId[id];
      const fams = R.familiasParaRecurso(id);
      return {
        id,
        family: e.family,
        density: e.density,
        useWhen: e.useWhen,
        dontUseWhen: e.dontUseWhen,
        input: e.input,
        durationFrames: e.durationFrames,
        gesture: e.gesture,
        caption: e.caption,
        speakerVisible: e.speakerVisible,
        alternatives: e.alternatives,
        where: e.where,
        familiaCena: fams[0] ? fams[0].id : null,
        score: p.score,
        porque: p.motivos.slice(0, 3),
        origem: e.origem,
      };
    });

  // se ficou so 1, puxa a alternativa declarada pela propria entrada
  if (ordenados.length === 1) {
    const alt = (idx.porId[ordenados[0].id].alternatives || [])[0];
    if (alt && idx.porId[alt]) {
      const e = idx.porId[alt];
      ordenados.push({
        id: alt,
        family: e.family,
        density: e.density,
        useWhen: e.useWhen,
        dontUseWhen: e.dontUseWhen,
        input: e.input,
        durationFrames: e.durationFrames,
        gesture: e.gesture,
        caption: e.caption,
        speakerVisible: e.speakerVisible,
        alternatives: e.alternatives,
        where: e.where,
        familiaCena: (R.familiasParaRecurso(alt)[0] || {}).id || null,
        score: 1,
        porque: ["alternativa declarada pelo candidato principal"],
        origem: e.origem,
      });
    }
  }

  // confianca conforme o guia do design system
  const casouExpressao = trg.some((a) => a.frase.includes(" "));
  let confianca = "baixa";
  if (casouExpressao && ordenados.length && avisosRelacao.every((a) => !a.corta)) confianca = "alta";
  else if (ordenados.length) confianca = "media";

  return {
    texto,
    estruturas,
    plataforma: plat,
    confianca: ordenados.length ? confianca : "baixa",
    candidatos: ordenados,
    relacao: avisosRelacao,
    fallback: ordenados.length
      ? null
      : plat && plat.modo === "mention"
        ? {
            cena: "SPEAKER_PLUS_MICRO",
            recurso: plat.mention,
            motivo: `so mencao do ${plat.plataforma}: mini-selo nivel 1 por 40 quadros, a legenda carrega o nome`,
          }
        : { cena: "SPEAKER_ONLY", recurso: null, motivo: "sem estrutura reconhecida: legenda e locutor, decisao legitima" },
  };
}

// ─── comandos ─────────────────────────────────────────────────────────────────

function comandoCheck() {
  const idx = R.carregar({ forcar: true });
  const erros = [];
  const avisos = [];

  const router = JSON.parse(fs.readFileSync(paths.dsRouter, "utf8"));
  for (const [chave, rel] of Object.entries(router.files || {})) {
    if (!rel || rel.endsWith("/")) continue;
    const p = path.join(paths.ds, rel);
    if (!existe(p)) erros.push(`files.${chave} aponta para "${rel}", que nao existe`);
  }

  for (const [est, cands] of Object.entries(idx.semantica)) {
    for (const id of cands) {
      if (!idx.porId[id]) erros.push(`estrutura ${est} indica "${id}", que nao existe no registro visual`);
    }
  }
  for (const [id, e] of Object.entries(idx.porId)) {
    for (const alt of e.alternatives || []) {
      if (!idx.porId[alt]) avisos.push(`${id}: alternativa "${alt}" nao existe`);
    }
  }
  const orfaos = idx.triggers.filter((t) => !t.id).map((t) => t.entry);
  if (orfaos.length) avisos.push(`gatilhos sem recurso correspondente (${orfaos.length}): ${[...new Set(orfaos)].join(", ")}`);

  for (const f of idx.familiasCena) {
    for (const c of f.components || []) {
      const base = c.endsWith(".*") ? c.slice(0, -1) : c;
      const achou = Object.keys(idx.porId).some((id) => (c.endsWith(".*") ? id.startsWith(base) : id === c));
      if (!achou) avisos.push(`familia de cena ${f.id} cita "${c}", sem recurso correspondente`);
    }
  }

  if (existe(paths.iconsMapCodigo)) {
    const cod = JSON.parse(fs.readFileSync(paths.iconsMapCodigo, "utf8"));
    const ds = JSON.parse(fs.readFileSync(paths.dsIconsMap, "utf8"));
    const nCod = Object.keys(cod.icons || cod).length;
    const nDs = Object.keys(ds.icons || ds).length;
    if (nCod !== nDs) avisos.push(`mapa de icones diverge: codigo tem ${nCod}, design system tem ${nDs}. O codigo vence.`);
  }

  const catal = existe(paths.sfxCatalogo) ? JSON.parse(fs.readFileSync(paths.sfxCatalogo, "utf8")) : null;
  if (catal && catal.tabela_de_peso) {
    const pesosCatalogo = Object.keys(catal.tabela_de_peso).map(Number);
    const pesosDs = [...new Set(Object.values(idx.sfxEventos).map((e) => e.weight))].filter((w) => w > 0);
    const semArquivo = pesosDs.filter((w) => !pesosCatalogo.includes(w));
    if (semArquivo.length) avisos.push(`pesos do mapa de som sem arquivo aprovado no catalogo: ${semArquivo.sort().join(", ")} (faixa mapeada na hora do uso)`);
  }

  console.log(`design system v${idx.versao}: ${idx.contagens.recursos} recursos, ${idx.contagens.estruturas} estruturas, ${idx.contagens.familiasCena} familias de cena, ${idx.contagens.triggers} gatilhos, ${idx.contagens.sfxEventos} eventos de som`);
  console.log(`guia: ${Object.keys(idx.guiaSecoes).length} secoes indexadas · painel: ${Object.keys(idx.painelAncoras).length} ancoras`);
  if (avisos.length) {
    console.log(`\nAVISOS (${avisos.length}):`);
    avisos.forEach((a) => console.log(`  - ${a}`));
  }
  if (erros.length) {
    console.log(`\nERROS (${erros.length}):`);
    erros.forEach((e) => console.log(`  x ${e}`));
    process.exit(1);
  }
  console.log("\nOK: contratos do design system integros.");
}

function comandoBeat() {
  const texto = valor("--beat");
  if (!texto) {
    console.error('uso: node ds-router.js --beat "texto da fala"');
    process.exit(1);
  }
  const estruturas = (valor("--estrutura") || "").split(",").map((s) => s.trim()).filter(Boolean);
  const dadosRaw = valor("--dados") || "";
  const dados = {};
  dadosRaw.split(",").filter(Boolean).forEach((par) => {
    const [k, v] = par.split("=");
    if (k) dados[k.trim()] = (v || "").trim();
  });
  const r = rotear(texto, { estruturas, dados });

  if (flag("--explicar")) {
    r.candidatos.forEach((c) => {
      if (c.where && c.where.guide) {
        const s = R.secaoDoGuia(String(c.where.guide).split(/[ +]/)[0]);
        if (s) c.guia = { secao: s.secao, titulo: s.titulo, texto: s.texto };
      }
    });
  }

  if (flag("--json")) {
    console.log(JSON.stringify(r, null, 2));
    return;
  }
  console.log(`fala: "${r.texto}"`);
  console.log(`estruturas: ${r.estruturas.join(", ") || "(nenhuma reconhecida)"} · confianca: ${r.confianca}`);
  if (r.plataforma) {
    const p = r.plataforma;
    if (p.modo === "show") {
      console.log(`plataforma: ${p.plataforma} (acao dentro do app: cena de interface, painel inteiro)`);
    } else if (p.acento) {
      console.log(
        `plataforma: ${p.plataforma} (so mencao: ACENTO DE PASSAGEM por cima da cena principal)\n` +
          `  acento: ${p.acento.id} · recorte: ${p.acento.recorte}\n` +
          `  como: 40 a 60 quadros, escala 0,55 a 0,7, canto direito, densidade 1. Nao troca o molde,\n` +
          `        nao troca a legenda e nao pega o portador de cor. Teto de 3 por video de 1 minuto.`
      );
    } else {
      console.log(`plataforma: ${p.plataforma} (so mencao: mini-selo, sem painel)`);
    }
  }
  if (!r.candidatos.length) console.log(`fallback: ${r.fallback.cena} (${r.fallback.motivo})`);
  r.candidatos.forEach((c, i) => {
    console.log(`\n${i + 1}. ${c.id} [${c.family}] score ${c.score} · densidade ${c.density} · cena ${c.familiaCena || "?"}`);
    console.log(`   use quando: ${c.useWhen}`);
    console.log(`   nao use quando: ${c.dontUseWhen}`);
    console.log(`   porque: ${c.porque.join(" | ")}`);
    if (c.guia) console.log(`   guia ${c.guia.secao} ${c.guia.titulo}`);
  });
  if (r.relacao.length) {
    console.log("\nregras de relacao aplicadas:");
    r.relacao.forEach((a) => console.log(`  - ${a.regra} em ${a.id}: ${a.motivo}`));
  }
}

function comandoPlan() {
  const comp = valor("--plan");
  if (!comp) {
    console.error("uso: node ds-router.js --plan <Composition>");
    process.exit(1);
  }
  const dir = planDir(comp, true);
  const fonteOportunidades = path.join(dir, "03-visual-opportunities.json");
  const fonteBeats = path.join(dir, "02-beats.json");
  const fonte = existe(fonteOportunidades) ? fonteOportunidades : fonteBeats;
  if (!existe(fonte)) {
    console.error(`nao achei ${path.relative(paths.repo, fonteBeats)} nem 03-visual-opportunities.json. Rode beats.js antes.`);
    process.exit(1);
  }
  const dadosFonte = JSON.parse(fs.readFileSync(fonte, "utf8"));
  const beats = dadosFonte.beats || dadosFonte;
  const recentes = [];
  const saida = { composition: comp, dsVersion: R.carregar().versao, geradoDe: path.basename(fonte), beats: [] };

  for (const b of beats) {
    const r = rotear(b.text || b.texto || "", {
      estruturas: b.structures || b.estruturas || [],
      dados: b.dados || {},
      recentes: recentes.slice(-3),
    });
    saida.beats.push({ id: b.id, texto: r.texto, estruturas: r.estruturas, confianca: r.confianca, plataforma: r.plataforma, candidatos: r.candidatos, relacao: r.relacao, fallback: r.fallback });
    if (r.candidatos[0]) recentes.push(r.candidatos[0].id);
  }

  const destino = path.join(dir, "04-ds-retrieval.json");
  fs.writeFileSync(destino, JSON.stringify(saida, null, 2), "utf8");
  const semCandidato = saida.beats.filter((b) => !b.candidatos.length).length;
  console.log(`04-ds-retrieval.json gravado: ${saida.beats.length} beats, ${saida.beats.length - semCandidato} com candidato, ${semCandidato} em fallback (locutor + legenda).`);
  console.log(path.relative(paths.repo, destino));
}

function comandoTeste() {
  const idx = R.carregar();
  const casos = [];
  if (existe(paths.dsTests)) {
    const t = JSON.parse(fs.readFileSync(paths.dsTests, "utf8"));
    for (const c of t.tests || []) {
      casos.push({ origem: "ds", fala: c.speech, estruturas: c.structures || [], esperado: c.expected, esperadoQualquer: c.candidates || (c.expected ? [c.expected] : []) });
    }
  }
  const extras = path.join(__dirname, "tests", "ds-router-frases.json");
  if (existe(extras)) {
    for (const c of JSON.parse(fs.readFileSync(extras, "utf8")).tests || []) {
      casos.push({ origem: "nossa", fala: c.speech, estruturas: c.structures || [], esperadoQualquer: c.expectedAny || [], proibido: c.mustNot || [], nota: c.note });
    }
  }

  let ok = 0;
  const falhas = [];
  console.log(`rodando ${casos.length} testes de recuperacao\n`);
  for (const c of casos) {
    const r = rotear(c.fala, { estruturas: c.estruturas });
    const ids = r.candidatos.map((x) => x.id);
    // mencao de plataforma: o certo e mini-selo nivel 1, nao painel. O teste do proprio
    // design system usa assertiva fraca aqui (ele mesmo declara isso nas limitacoes).
    const mencaoCorreta =
      r.plataforma &&
      r.plataforma.modo === "mention" &&
      !ids.length &&
      c.esperadoQualquer.every((e) => e.startsWith("interface."));
    const bateu = !c.esperadoQualquer.length || mencaoCorreta || c.esperadoQualquer.some((e) => ids.includes(e));
    const proibidoNoTopo = (c.proibido || []).some((p) => ids[0] === p || (p.endsWith("*") && ids[0] && ids[0].startsWith(p.slice(0, -1))));
    const passou = bateu && !proibidoNoTopo;
    if (passou) ok++;
    else falhas.push({ fala: c.fala, esperado: c.esperadoQualquer, proibido: c.proibido || [], obtido: ids, estruturas: r.estruturas });
    console.log(`${passou ? "ok  " : "FALHA"} [${c.origem}] "${c.fala.slice(0, 58)}" -> ${ids.slice(0, 3).join(", ") || "(fallback)"}`);
  }
  console.log(`\n${ok}/${casos.length} passaram`);
  if (falhas.length) {
    console.log("\nfalhas:");
    falhas.forEach((f) => console.log(`  - "${f.fala}"\n      esperava: ${f.esperado.join(" | ")}${f.proibido.length ? ` · proibido no topo: ${f.proibido.join(", ")}` : ""}\n      obteve:   ${f.obtido.join(", ") || "(nada)"} · estruturas: ${f.estruturas.join(", ") || "(nenhuma)"}`));
    process.exit(1);
  }
}

if (flag("--check")) comandoCheck();
else if (flag("--teste")) comandoTeste();
else if (flag("--plan")) comandoPlan();
else if (flag("--beat")) comandoBeat();
else {
  console.log("uso: node ds-router.js --check | --beat \"fala\" [--estrutura X] [--json] [--explicar] | --plan <Comp> | --teste");
}

module.exports = { rotear };
