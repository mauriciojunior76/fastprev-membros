/**
 * ds-registry.js: leitura barata do design system.
 *
 * O design system tem 260 KB de indice (visual-registry sozinho tem 109 KB) e um
 * painel de 568 KB. Nada disso pode entrar no contexto do modelo. Este modulo le
 * os arquivos UMA vez, monta um indice compacto em .cache/ds-index.json e responde
 * perguntas pontuais: quais candidatos para esta estrutura, o que diz esta entrada,
 * onde fica a secao do guia.
 *
 * Regra: o cache e invalidado por tamanho + data de modificacao de cada fonte.
 */
const fs = require("fs");
const path = require("path");
const { paths, existe } = require("./ds-root");

const FONTES = [
  "design-router.json",
  "moldes-index.json",
  "sfx-map.json",
  "numbers-spec.json",
  "icons-map.json",
  "local-overrides.json",
  "registry/semantic-registry.json",
  "registry/visual-registry.json",
  "registry/scene-registry.json",
  "registry/interface-registry.json",
  "registry/diagram-registry.json",
  "registry/motion-registry.json",
  // Direcao dinamica (08/09/2026): papel narrativo do beat e estados de palco
  // do formato vertical-mao. Ver design-system/DIRECAO-DINAMICA.md.
  "registry/narrative-roles.json",
  "registry/stage-states.json",
  "DESIGN-SYSTEM-REELS-APPLE-v2.md",
  "Zeus Reels Design System.dc.html",
];

function lerJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

/** minusculas, sem acento, espaco unico: como o roteador de contexto ja faz */
function norm(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function assinaturaFontes() {
  const sig = {};
  for (const rel of FONTES) {
    const p = path.join(paths.ds, rel);
    if (!existe(p)) {
      sig[rel] = null;
      continue;
    }
    const st = fs.statSync(p);
    sig[rel] = { size: st.size, mtimeMs: Math.round(st.mtimeMs) };
  }
  return sig;
}

/** cabecalhos do guia no padrao "## 6a. titulo" ou "## 9e2. titulo" -> secao "§6a" */
function indexarGuia(texto) {
  const linhas = texto.split(/\r?\n/);
  const secoes = {};
  let atual = null;
  linhas.forEach((l, i) => {
    const m = l.match(/^#{2,3}\s*(\d{1,2}[a-z]?\d?)\.\s*(.*)$/);
    if (m) {
      if (atual) secoes[atual].linhaFim = i - 1;
      atual = `§${m[1]}`;
      secoes[atual] = { titulo: m[2].trim(), linhaIni: i, linhaFim: linhas.length - 1 };
    }
  });
  return secoes;
}

/** ancoras do painel: id="s04d-enfase" -> intervalo de bytes ate a proxima ancora */
function indexarPainel(html) {
  const ancoras = {};
  const re = /id="(s\d[\w-]*)"/g;
  const achados = [];
  let m;
  while ((m = re.exec(html)) !== null) achados.push({ id: m[1], pos: m.index });
  achados.forEach((a, i) => {
    ancoras[`#${a.id}`] = {
      byteIni: a.pos,
      byteFim: i + 1 < achados.length ? achados[i + 1].pos : html.length,
    };
  });
  return ancoras;
}

function construirIndice() {
  const router = lerJson(paths.dsRouter);
  const visual = lerJson(paths.reg("visual"));
  const semantic = lerJson(paths.reg("semantic"));
  const scene = lerJson(paths.reg("scene"));
  const iface = lerJson(paths.reg("interface"));
  const diagram = lerJson(paths.reg("diagram"));
  const motion = lerJson(paths.reg("motion"));
  const sfx = lerJson(paths.dsSfxMap);
  const moldes = existe(paths.dsMoldes) ? lerJson(paths.dsMoldes) : { entries: [] };
  const overrides = existe(paths.dsOverrides) ? lerJson(paths.dsOverrides) : {};

  const porId = {};
  const legacyParaId = {};
  const entradas = Array.isArray(visual.entries) ? visual.entries : Object.values(visual.entries);
  for (const e of entradas) {
    porId[e.id] = {
      id: e.id,
      name: e.name,
      family: e.family,
      semantic: e.semantic || [],
      useWhen: e.useWhen,
      dontUseWhen: e.dontUseWhen,
      input: e.input,
      items: e.items,
      durationFrames: e.durationFrames,
      density: e.density,
      speakerVisible: e.speakerVisible,
      fullScreen: e.fullScreen,
      caption: e.caption,
      alternatives: e.alternatives || [],
      commonErrors: e.commonErrors || [],
      gesture: e.gesture,
      pieces: e.pieces || [],
      triggers: (e.triggers || []).map(norm),
      where: e.where || {},
      version: e.version,
      status: e.status,
      origem: "ds",
    };
    if (e.legacyId) legacyParaId[norm(e.legacyId)] = e.id;
  }

  // recursos locais aprovados pelo squad (camada 1) entram no mesmo formato
  for (const extra of overrides.extraResources || []) {
    porId[extra.id] = { ...extra, triggers: (extra.triggers || []).map(norm), origem: "local" };
  }

  const semantica = {};
  for (const [estrutura, dados] of Object.entries(semantic.structures || {})) {
    semantica[estrutura] = (dados.candidates || []).slice();
  }
  // recurso local entra como candidato das estruturas que ele declara
  for (const extra of overrides.extraResources || []) {
    for (const est of extra.semantic || []) {
      if (!semantica[est]) semantica[est] = [];
      if (!semantica[est].includes(extra.id)) semantica[est].push(extra.id);
    }
  }

  const triggers = (router.triggers || []).map((t) => ({
    match: (t.match || []).map(norm),
    entry: t.entry,
    id: legacyParaId[norm(t.entry)] || (porId[t.entry] ? t.entry : null),
    alt: (t.alt || []).map((a) => legacyParaId[norm(a)] || (porId[a] ? a : null)).filter(Boolean),
    altBruto: t.alt || [],
  }));

  const familiasCena = (scene.families || []).map((f) => ({
    id: f.id,
    density: f.density,
    speaker: f.speaker,
    caption: f.caption,
    useWhen: f.useWhen,
    avoid: f.avoid,
    durationFrames: f.durationFrames,
    components: f.components || [],
    transition: f.transition,
  }));

  // Direcao dinamica: opcionais de proposito. Squad que ainda nao tem os dois
  // registries continua funcionando igual, so sem o formato vertical-mao.
  const papeisPath = path.join(paths.ds, "registry", "narrative-roles.json");
  const palcosPath = path.join(paths.ds, "registry", "stage-states.json");
  const papeis = existe(papeisPath) ? lerJson(papeisPath) : { roles: [] };
  const palcos = existe(palcosPath) ? lerJson(palcosPath) : { formatos: {} };

  const guiaTexto = existe(paths.dsGuide) ? fs.readFileSync(paths.dsGuide, "utf8") : "";
  const painelTexto = existe(paths.dsPanel) ? fs.readFileSync(paths.dsPanel, "utf8") : "";

  const sfxEventos = {};
  for (const ev of sfx.events || []) sfxEventos[ev.id] = ev;

  return {
    versao: router.version || visual.version || "?",
    geradoEm: new Date().toISOString().slice(0, 10),
    fontes: assinaturaFontes(),
    porId,
    legacyParaId,
    semantica,
    triggers,
    familiasCena,
    densidades: scene.density_levels || {},
    ritmo: scene.rhythm_rules || [],
    budget: router.budget || {},
    presets: router.presets || {},
    production: router.production || {},
    classify: router.classify || [],
    relacaoRegras: (router.relation_rules || {}).rules || [],
    scoring: router.scoring || {},
    papeisNarrativos: papeis.roles || [],
    arcoTipico: papeis.arco_tipico || [],
    palcos: palcos.formatos || {},
    interfaceTeste: iface.test || {},
    interfacePlataformas: iface.platforms || {},
    interfaceFrameRule: iface.frame_rule || "",
    interfaceSymbolRule: iface.symbol_rule || "",
    // acento de passagem (design system 3.3): a variante que entra por cima da
    // cena quando a fala so MENCIONA a plataforma. Sem isto exposto aqui, o
    // roteador so sabia devolver mini-selo, e as variantes de interface nunca
    // eram recrutadas fora de cena de interface.
    acentoDePassagem: iface.acento_de_passagem || {},
    diagramRelacoes: diagram.relations || [],
    diagramAntiRegras: diagram.anti_rules || [],
    motionFuncoes: motion.functions || [],
    motionEasing: motion.easing || {},
    motionReceita: motion.scene_recipe || [],
    motionGestos: motion.gestures || {},
    motionNatureza: motion.nature_rules || [],
    motionProibido: motion.forbidden || [],
    sfxEventos,
    sfxRegras: sfx.rules || [],
    sfxEscala: sfx.weight_scale || {},
    moldesIds: (moldes.entries || []).map((e) => e.id || e.uid).filter(Boolean),
    guiaSecoes: indexarGuia(guiaTexto),
    painelAncoras: indexarPainel(painelTexto),
    overrides,
    contagens: {
      recursos: Object.keys(porId).length,
      estruturas: Object.keys(semantica).length,
      familiasCena: familiasCena.length,
      triggers: triggers.length,
      sfxEventos: Object.keys(sfxEventos).length,
    },
  };
}

let memoria = null;

function carregar({ forcar = false } = {}) {
  if (memoria && !forcar) return memoria;
  const sigAtual = assinaturaFontes();
  if (!forcar && existe(paths.cacheFile)) {
    try {
      const cache = lerJson(paths.cacheFile);
      if (JSON.stringify(cache.fontes) === JSON.stringify(sigAtual)) {
        memoria = cache;
        return memoria;
      }
    } catch (_) {
      /* cache corrompido: reconstroi */
    }
  }
  memoria = construirIndice();
  if (!existe(paths.cacheDir)) fs.mkdirSync(paths.cacheDir, { recursive: true });
  fs.writeFileSync(paths.cacheFile, JSON.stringify(memoria), "utf8");
  return memoria;
}

// ─── consultas ────────────────────────────────────────────────────────────────

function entrada(id) {
  return carregar().porId[id] || null;
}

function candidatosDaEstrutura(estrutura) {
  return (carregar().semantica[estrutura] || []).slice();
}

function estruturas() {
  return Object.keys(carregar().semantica);
}

/** casa gatilhos lexicais no texto: expressao inteira vale mais que palavra */
function casarTriggers(texto) {
  const t = norm(texto);
  const achados = [];
  for (const trg of carregar().triggers) {
    for (const m of trg.match) {
      if (!m) continue;
      if (t.includes(m)) {
        achados.push({ frase: m, peso: m.includes(" ") ? 5 : 3, id: trg.id, alt: trg.alt, entry: trg.entry });
        break;
      }
    }
  }
  // tambem casa os triggers declarados dentro de cada entrada do visual-registry
  for (const [id, e] of Object.entries(carregar().porId)) {
    for (const m of e.triggers || []) {
      if (m && t.includes(m)) {
        achados.push({ frase: m, peso: m.includes(" ") ? 5 : 3, id, alt: e.alternatives || [], entry: id });
        break;
      }
    }
  }
  return achados;
}

function familiaCena(id) {
  return carregar().familiasCena.find((f) => f.id === id) || null;
}

/** familias de cena compativeis com um recurso, pelo glob de components */
function familiasParaRecurso(id) {
  const idx = carregar();
  return idx.familiasCena.filter((f) =>
    (f.components || []).some((c) => {
      if (c.endsWith(".*")) return id.startsWith(c.slice(0, -1));
      return c === id;
    })
  );
}

function secaoDoGuia(secao, maxChars = 2500) {
  const idx = carregar();
  const chave = secao.startsWith("§") ? secao : `§${secao}`;
  const s = idx.guiaSecoes[chave];
  if (!s) return null;
  const linhas = fs.readFileSync(paths.dsGuide, "utf8").split(/\r?\n/);
  let texto = linhas.slice(s.linhaIni, s.linhaFim + 1).join("\n");
  let cortado = false;
  if (texto.length > maxChars) {
    texto = texto.slice(0, maxChars);
    cortado = true;
  }
  return { secao: chave, titulo: s.titulo, texto, cortado };
}

function blocoDoPainel(ancora, maxChars = 1500) {
  const idx = carregar();
  const chave = ancora.startsWith("#") ? ancora : `#${ancora}`;
  const a = idx.painelAncoras[chave];
  if (!a) return null;
  const html = fs.readFileSync(paths.dsPanel, "utf8").slice(a.byteIni, a.byteFim);
  let texto = html
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  let cortado = false;
  if (texto.length > maxChars) {
    texto = texto.slice(0, maxChars);
    cortado = true;
  }
  return { ancora: chave, texto, cortado };
}

/** Papel narrativo pelo id (DIRECAO-DINAMICA secao 3). */
function papelNarrativo(id) {
  return carregar().papeisNarrativos.find((p) => p.id === norm(id)) || null;
}

/**
 * Casa um gatilho de fala com FRONTEIRA DE PALAVRA nas duas pontas.
 *
 * Sem isso, `includes` puro casa dentro de outra palavra e o papel sai errado:
 * medido em 08/09/2026 na transcricao do Paulo Ruiz, "repara" casou dentro de
 * "preparar" e "leva a" dentro de "eleva a", classificando um beat de estrutura
 * como gancho. Gatilho de varias palavras continua valendo: a fronteira e
 * aplicada no comeco da primeira e no fim da ultima.
 */
function casaGatilho(textoNorm, gatilho) {
  // Gatilho do registry e texto simples (letras e espacos). Escapa so o que
  // apareceria num acento perdido, pra RegExp nunca receber sintaxe crua.
  const g = norm(gatilho).split("").map((c) => (/[a-z0-9 ]/.test(c) ? c : "\\" + c)).join("");
  return new RegExp(`(^|[^a-z0-9])${g}([^a-z0-9]|$)`, "i").test(textoNorm);
}

/**
 * Papel proposto pela fala: primeira ocorrencia de gatilho decide, na ordem em
 * que os papeis estao no registry (que e a ordem do arco). Devolve null quando
 * nenhum gatilho casa: quem decide ai e a etapa R3, nunca um chute.
 */
function papelPelaFala(texto) {
  const t = norm(texto);
  for (const p of carregar().papeisNarrativos) {
    if ((p.lexico || []).some((g) => casaGatilho(t, g))) return p.id;
  }
  return null;
}

/** Definicao de um estado de palco de um formato (A, B ou C). */
function estadoDePalco(formato, estado) {
  const f = carregar().palcos[formato];
  if (!f || !f.estados) return null;
  return f.estados[String(estado).toUpperCase()] || null;
}

/** Regras de alternancia do formato (rosto a cada N quadros, teto de B+C etc). */
function regrasDeAlternancia(formato) {
  const f = carregar().palcos[formato];
  return (f && f.alternancia) || null;
}

module.exports = {
  carregar,
  papelNarrativo,
  papelPelaFala,
  casaGatilho,
  estadoDePalco,
  regrasDeAlternancia,
  norm,
  entrada,
  estruturas,
  candidatosDaEstrutura,
  casarTriggers,
  familiaCena,
  familiasParaRecurso,
  secaoDoGuia,
  blocoDoPainel,
};
