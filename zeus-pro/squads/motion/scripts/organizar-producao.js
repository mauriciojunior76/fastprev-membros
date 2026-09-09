#!/usr/bin/env node
/**
 * organizar-producao.js — põe uma produção no padrão de pastas e nomes, e
 * gera o índice que deixa achar UMA CENA depois, não só o vídeo inteiro.
 *
 * POR QUE EXISTE: `output/` tinha três convenções ao mesmo tempo (pasta com
 * número e tema, pasta com nome de composition, pasta com nome de projeto),
 * `ZeusTrafego` e `01-zeus-trafego` duplicadas, e nome de arquivo que só quem
 * já sabia o que era `PauloRuizReels` conseguia entender. Seis meses depois
 * ninguém acha nada, e reaproveitar um pedaço vira refazer do zero.
 *
 * Uso:
 *   node scripts/organizar-producao.js <Composition> [--tema "reel do instagram do mentor"]
 *                                      [--cliente <slug>] [--aplicar]
 *   node scripts/organizar-producao.js --auditar        (varre tudo e aponta o que está fora)
 *   node scripts/organizar-producao.js --achar "aquela parte da baleia"   (acha UMA CENA)
 *
 * Sem `--aplicar` só mostra o que faria. O tema, quando não vem por argumento,
 * é sugerido a partir da transcrição da própria narração.
 */

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const MOTION = path.resolve(__dirname, "..");
const ROOT = path.resolve(MOTION, "..", "..");
const OUTPUT = path.join(MOTION, "output");
const COMPS = path.join(MOTION, "src", "compositions");
const ENTREGAS = path.join(ROOT, "entregas", "videos");

const LC = require("./lib/ler-composition.js");

/* ------------------------------------------------------------------ *
 * o tema, tirado da transcrição
 * ------------------------------------------------------------------ */

/** Palavras que aparecem em toda narração e não distinguem nada. */
const VAZIAS = new Set(
  ("a as o os um uma uns umas de do da dos das em no na nos nas por para pra pro com sem sobre " +
   "e ou mas que se quando como onde qual quais quem porque porquê pois entao então ai aí " +
   "eu tu voce você ele ela nos nós eles elas me te se lhe meu minha seu sua nosso nossa " +
   "ser estar ter haver ir vir fazer poder querer dizer falar ficar dar ver saber " +
   "e é sao são foi era tem tinha vai vou to tá ta esta está isso isto esse essa aquilo " +
   "muito mais menos ja já so só tambem também bem mal aqui ali la lá agora hoje " +
   "nao não sim talvez cada todo toda todos todas outro outra mesmo mesma " +
   "de a o que em um para com nao uma os no se na por mais as dos como mas ao ele das " +
   "coisa gente cara tipo assim entao ne né então ó olha vamos vamo").split(/\s+/)
);

function lerNarracao(comp) {
  const p = path.join(COMPS, comp, "data", "narration.json");
  if (!fs.existsSync(p)) return null;
  try {
    const d = JSON.parse(fs.readFileSync(p, "utf8"));
    return Array.isArray(d.words) ? d.words : null;
  } catch {
    return null;
  }
}

/**
 * O assunto da peça, tirado do que é FALADO nela: as palavras de conteúdo que
 * mais se repetem. Não inventa tema: se a narração não existe, devolve null e
 * o tema tem que ser dito na mão.
 */
function sugerirTema(palavras) {
  if (!palavras || !palavras.length) return null;
  const conta = new Map();
  for (const w of palavras) {
    const t = String(w.text || "").toLowerCase().replace(/[^a-zà-ÿ]/gi, "");
    if (t.length < 4 || VAZIAS.has(t)) continue;
    conta.set(t, (conta.get(t) || 0) + 1);
  }
  const top = [...conta.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  return {
    palavras: top.map(([t, n]) => ({ palavra: t, vezes: n })),
    sugestao: top.slice(0, 3).map(([t]) => t).join("-"),
    abertura: palavras.slice(0, 14).map((w) => w.text).join(" "),
  };
}

const slugar = (s) =>
  String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/* ------------------------------------------------------------------ *
 * o índice de cenas: achar UM PEDAÇO, não só o vídeo
 * ------------------------------------------------------------------ */

/**
 * Para cada cena: o segundo em que entra, o componente que desenha, e o texto
 * que é FALADO naquele intervalo. É o texto falado que deixa achar a cena
 * depois pela lembrança ("aquela parte que ele fala de conexão"), porque
 * ninguém lembra do nome do componente.
 */
function indiceDeCenas(comp) {
  const dir = path.join(COMPS, comp);
  const tokensSrc = fs.readFileSync(path.join(dir, "tokens.ts"), "utf8");
  const cenas = LC.lerCenas(tokensSrc, path.join(dir, "tokens.ts"), (m) => {
    throw new Error(m);
  });
  const stagePath = path.join(dir, "components", "MotionStage.tsx");
  const mapa = fs.existsSync(stagePath)
    ? LC.lerMapaDeCenas(fs.readFileSync(stagePath, "utf8"))
    : {};
  const palavras = lerNarracao(comp) || [];

  return cenas.map((c) => {
    const ditas = palavras.filter((w) => w.start >= c.start && w.start < c.end);
    return {
      cena: c.key,
      de: +c.start.toFixed(2),
      ate: +c.end.toFixed(2),
      componente: mapa[c.key] || null,
      fala: ditas.map((w) => w.text).join(" ").trim() || null,
    };
  });
}

/* ------------------------------------------------------------------ *
 * onde cada coisa mora
 * ------------------------------------------------------------------ */

/** A pasta de trabalho da produção, com TODAS as versões juntas. */
function acharPasta(comp) {
  if (!fs.existsSync(OUTPUT)) return null;
  const candidatas = [];
  for (const e of fs.readdirSync(OUTPUT, { withFileTypes: true })) {
    // pasta de sistema (_baseline, _preview, _qa, _revisao) guarda copia de
    // conferencia, nunca e a pasta da producao: gravar ficha ali esconde o
    // material no lugar errado
    if (!e.isDirectory() || e.name.startsWith("_")) continue;
    const dir = path.join(OUTPUT, e.name);
    const arquivos = fs.readdirSync(dir);
    // casa pelo prefixo do arquivo OU pelo nome da pasta: producao antiga nomeou
    // a pasta com o nome da composition e os arquivos com outro padrao
    const casa = e.name === comp || slugar(e.name) === slugar(comp) ||
      arquivos.some((f) => f.startsWith(comp + "-") || f.startsWith(slugar(comp)));
    if (casa) {
      candidatas.push({ nome: e.name, dir, arquivos: arquivos.length });
    }
  }
  candidatas.sort((a, b) => b.arquivos - a.arquivos);
  return candidatas;
}

const RE_VERSAO = /-v(\d{2,3})(?:-([a-z0-9-]+))?\.mp4$/i;

function versoesDe(dir) {
  if (!dir || !fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mp4"))
    .map((f) => {
      const m = RE_VERSAO.exec(f);
      return { arquivo: f, versao: m ? parseInt(m[1], 10) : null, sufixo: m && m[2] ? m[2] : null };
    })
    .sort((a, b) => (a.versao || 0) - (b.versao || 0));
}

/* ------------------------------------------------------------------ *
 * auditoria: o que está fora do padrão hoje
 * ------------------------------------------------------------------ */

function auditar() {
  const RE_PADRAO = /^\d{2}-[a-z0-9-]+$/;
  // Banco de teste e experimento nao sao producao e nao entram na regra.
  let naoEProducao = {};
  const listaP = path.join(OUTPUT, "_nao-e-producao.json");
  if (fs.existsSync(listaP)) {
    try { naoEProducao = JSON.parse(fs.readFileSync(listaP, "utf8")).pastas || {}; } catch {}
  }
  const linhas = [];
  const dirs = fs.readdirSync(OUTPUT, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith("_") && !naoEProducao[e.name])
    .map((e) => e.name);

  for (const nome of dirs) {
    const dir = path.join(OUTPUT, nome);
    const arquivos = fs.readdirSync(dir);
    const mp4 = arquivos.filter((f) => f.endsWith(".mp4"));
    const problemas = [];
    // Pasta-ponteiro: foi esvaziada, ficou so com o LEIA-ME dizendo para onde o
    // material foi. Nao e producao, e placa de rua. Nada a cobrar dela.
    if (!mp4.length && arquivos.length <= 2 && arquivos.includes("LEIA-ME.md")) {
      linhas.push({ pasta: nome, mp4: 0, problemas: [], ponteiro: true });
      continue;
    }
    // Producao HISTORICA: nenhum video tocado nos ultimos 120 dias e sem ficha.
    // Nao se reorganiza arquivo morto: a regra vale para o que ainda roda, e
    // renomear pasta antiga so quebra o caminho escrito em doc velha.
    const maisNovo = mp4.reduce((acc, f) => Math.max(acc, fs.statSync(path.join(dir, f)).mtimeMs), 0);
    const diasParado = maisNovo ? (Date.now() - maisNovo) / 86400000 : Infinity;
    if (!arquivos.includes("producao.json") && diasParado > 120) {
      linhas.push({ pasta: nome, mp4: mp4.length, problemas: [], historica: true, diasParado: Math.round(diasParado) });
      continue;
    }
    let ficha = {};
    if (arquivos.includes("producao.json")) {
      try { ficha = JSON.parse(fs.readFileSync(path.join(dir, "producao.json"), "utf8")); } catch {}
    }
    if (!RE_PADRAO.test(nome) && !ficha.nome_de_pasta_antigo) problemas.push("nome da pasta fora do padrao NN-tema-em-palavras");
    if (!arquivos.includes("producao.json")) problemas.push("sem producao.json (a ficha)");
    if (!arquivos.includes("LEIA-ME.md")) problemas.push("sem LEIA-ME.md");
    if (!arquivos.includes("cenas.json") && !ficha.sem_indice_de_cena) problemas.push("sem cenas.json (nao da pra achar uma cena)");
    if (mp4.some((f) => !RE_VERSAO.test(f))) problemas.push("mp4 sem numero de versao no nome");
    linhas.push({ pasta: nome, mp4: mp4.length, problemas });
  }

  // pastas irmãs que são a mesma produção com nomes diferentes
  const porComp = new Map();
  for (const nome of dirs) {
    const arquivos = fs.readdirSync(path.join(OUTPUT, nome));
    for (const f of arquivos) {
      const m = /^([A-Za-z]+)-v\d/.exec(f);
      if (!m) continue;
      if (!porComp.has(m[1])) porComp.set(m[1], new Set());
      porComp.get(m[1]).add(nome);
    }
  }
  const duplicadas = [...porComp.entries()].filter(([, s]) => s.size > 1);

  console.log("\nAuditoria de organizacao\n");
  const fora = linhas.filter((l) => l.problemas.length);
  console.log(`${dirs.length} pastas de producao, ${fora.length} fora do padrao.\n`);
  for (const l of fora) {
    console.log(`  ${l.pasta} (${l.mp4} videos)`);
    for (const p of l.problemas) console.log(`    - ${p}`);
  }
  if (duplicadas.length) {
    console.log("\nMesma producao em mais de uma pasta (juntar em uma so):");
    for (const [comp, set] of duplicadas) console.log(`  ${comp}: ${[...set].join("  e  ")}`);
  }
  console.log("\nRegra: docs/ORGANIZACAO-E-NOMES.md");
  console.log("Arrumar uma: node scripts/organizar-producao.js <Composition> --tema \"...\" --aplicar\n");
  return fora.length + duplicadas.length;
}

/* ------------------------------------------------------------------ *
 * organizar uma produção
 * ------------------------------------------------------------------ */

function organizar(comp, opts) {
  const candidatas = acharPasta(comp);
  if (!candidatas || !candidatas.length) {
    console.error(`Erro: nao achei pasta de output com arquivos de ${comp}`);
    process.exit(1);
  }
  const alvo = candidatas[0];
  const narracao = lerNarracao(comp);
  const sugerido = sugerirTema(narracao);

  let tema = opts.tema;
  if (!tema) {
    // sem tema dito, herda o da pasta se ela ja estiver no padrao NN-tema
    const m = /^\d{2}-(.+)$/.exec(alvo.nome);
    tema = m ? m[1].replace(/-/g, " ") : null;
  }
  // O slug e o nome da pasta de entrega. Quando ja existe uma, ela manda: link
  // publicado e caminho ja escrito em memoria nao mudam de nome so por causa de
  // uma regra nova.
  let slug = opts.slug || (tema ? slugar(tema) : null);
  if (!opts.slug && fs.existsSync(ENTREGAS)) {
    const chaves = (tema || comp).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").split(/[^a-z0-9]+/).filter((w) => w.length > 3);
    const existente = fs.readdirSync(ENTREGAS).find((d) => chaves.filter((k) => d.includes(k)).length >= 2);
    if (existente) slug = existente;
  }

  const versoes = versoesDe(alvo.dir);
  let cenas = [];
  let erroCenas = null;
  try {
    cenas = indiceDeCenas(comp);
  } catch (e) {
    erroCenas = e.message;
  }

  const pastaEntrega = slug ? path.join(ENTREGAS, slug) : null;
  const temEntrega = pastaEntrega && fs.existsSync(pastaEntrega);

  console.log(`\n${comp}`);
  console.log(`  pasta de trabalho: output/${alvo.nome}${candidatas.length > 1 ? "  (ATENCAO: tambem em " + candidatas.slice(1).map((c) => c.nome).join(", ") + ")" : ""}`);
  console.log(`  tema: ${tema || "NAO DEFINIDO, passe --tema"}`);
  if (sugerido) {
    console.log(`  o que a narracao diz: ${sugerido.palavras.slice(0, 5).map((p) => p.palavra).join(", ")}`);
    console.log(`  comeca com: "${sugerido.abertura}..."`);
  }
  console.log(`  versoes: ${versoes.length}${versoes.length ? ` (v${String(versoes[0].versao).padStart(2, "0")} a v${String(versoes[versoes.length - 1].versao).padStart(2, "0")})` : ""}`);
  const semCodigo = erroCenas && erroCenas.includes("tokens.ts");
  console.log(`  cenas: ${semCodigo ? "nao da para indexar (producao antiga, sem tokens.ts): so ficha e LEIA-ME"
    : erroCenas ? "ERRO: " + erroCenas : cenas.length + " (" + cenas.filter((c) => c.fala).length + " com fala indexada)"}`);
  console.log(`  entrega: ${temEntrega ? "entregas/videos/" + slug : "ainda nao existe"}`);

  if (!tema) {
    console.log("\nSem tema nao da para nomear nada. Rode com --tema \"assunto em palavras\".");
    return 1;
  }

  const ficha = {
    _leia: "A ficha da producao. Escrita a mao uma vez; o resto (LEIA-ME, cenas) e gerado a partir dela.",
    composition: comp,
    tema,
    slug,
    cliente: opts.cliente || null,
    pasta_trabalho: `squads/motion/output/${alvo.nome}`,
    pasta_entrega: `entregas/videos/${slug}`,
    versoes: versoes.length,
    ultima_versao: versoes.length ? versoes[versoes.length - 1].arquivo : null,
    // producao anterior ao formato tokens.ts nao tem como ter indice de cena.
    // Fica registrado na ficha para a auditoria nao cobrar o impossivel para sempre.
    sem_indice_de_cena: erroCenas ? erroCenas.slice(0, 120) : null,
    nome_de_pasta_antigo: !/^\d{2}-/.test(alvo.nome) || null,
    narracao_comeca: sugerido ? sugerido.abertura : null,
    palavras_do_assunto: sugerido ? sugerido.palavras.map((p) => p.palavra) : [],
  };

  if (!opts.aplicar) {
    console.log("\nSIMULACAO. Gravaria producao.json, LEIA-ME.md e cenas.json. Rode com --aplicar.\n");
    return 0;
  }

  fs.writeFileSync(path.join(alvo.dir, "producao.json"), JSON.stringify(ficha, null, 2), "utf8");
  if (cenas.length) {
    fs.writeFileSync(
      path.join(alvo.dir, "cenas.json"),
      JSON.stringify({ _leia: "Indice para achar UMA CENA depois. A busca util e pelo campo fala.", composition: comp, tema, cenas }, null, 2),
      "utf8"
    );
  }
  fs.writeFileSync(path.join(alvo.dir, "LEIA-ME.md"), leiaMe(ficha, versoes, cenas), "utf8");

  console.log(`\nGravado em output/${alvo.nome}: producao.json, LEIA-ME.md${cenas.length ? ", cenas.json" : ""}`);

  // A pasta de entrega tambem ganha LEIA-ME: e nela que se procura o arquivo
  // final, e nome de arquivo sozinho nao diz qual e o aprovado nem por que as
  // outras versoes foram descartadas.
  if (temEntrega) {
    fs.writeFileSync(path.join(pastaEntrega, "LEIA-ME.md"), leiaMeEntrega(ficha, pastaEntrega, comp), "utf8");
    console.log(`Gravado em entregas/videos/${slug}: LEIA-ME.md`);
  }
  console.log("Catalogando no Atlas para achar por frase...");
  const frases = [tema, `video ${tema}`, `reel ${tema}`, ...(opts.cliente ? [`video do ${opts.cliente}`] : [])];
  const r = spawnSync("node", [path.join(ROOT, "scripts", "atlas", "catalog.js"), "--new", "asset", slug, tema], {
    cwd: ROOT, encoding: "utf8",
  });
  console.log(r.status === 0 ? `  catalogado como "${slug}"` : `  Atlas nao catalogou (rode na mao): ${(r.stderr || "").trim().slice(0, 120)}`);
  console.log(`  frases de busca sugeridas: ${frases.join(" | ")}\n`);
  return 0;
}

/**
 * O LEIA-ME da pasta de ENTREGA. Responde a única pergunta que se faz ali:
 * qual destes arquivos é o aprovado, e por que os outros não são.
 */
function leiaMeEntrega(f, pasta, comp) {
  const arqs = fs.readdirSync(pasta);
  const final = arqs.find((a) => /FINAL-aprovado\.mp4$/i.test(a));
  const vdir = path.join(pasta, "_versions");
  const antigas = fs.existsSync(vdir) ? fs.readdirSync(vdir).filter((a) => a.endsWith(".mp4")) : [];

  const L = [];
  L.push(`# ${f.tema}`);
  L.push("");
  L.push(final
    ? `O arquivo aprovado é \`${final}\`. Qualquer outro nesta pasta não é.`
    : "ATENÇÃO: nenhum arquivo com `FINAL-aprovado` no nome. A entrega está incompleta.");
  if (f.cliente) L.push(`\nCliente: ${f.cliente}.`);
  L.push("");
  if (antigas.length) {
    L.push("## Versões anteriores, em `_versions/`");
    L.push("");
    for (const a of antigas) L.push(`- \`${a}\``);
    L.push("");
    L.push("O motivo do descarte está no próprio nome do arquivo, para não precisar abrir nenhum.");
    L.push("");
  }
  L.push("## Onde está o resto");
  L.push("");
  L.push(`- Todas as versões de trabalho: \`${f.pasta_trabalho}\``);
  L.push(`- O que é falado em cada cena: \`${f.pasta_trabalho}/cenas.json\``);
  L.push(`- O código que desenha: \`squads/motion/src/compositions/${comp}/\``);
  L.push("");
  L.push("Para reaproveitar um pedaço em outro vídeo:");
  L.push("");
  L.push("```bash");
  L.push('node scripts/organizar-producao.js --achar "uma frase que eu lembro"');
  L.push("```");
  return L.join("\n");
}

function leiaMe(f, versoes, cenas) {
  const L = [];
  L.push(`# ${f.tema}`);
  L.push("");
  L.push(`Peça do zeus-motion. Composition \`${f.composition}\`${f.cliente ? `, cliente ${f.cliente}` : ""}.`);
  if (f.narracao_comeca) L.push(`\nComeça falando: "${f.narracao_comeca}..."`);
  L.push("");
  L.push("## Onde está cada coisa");
  L.push("");
  L.push(`- Todas as versões, inclusive as reprovadas: \`${f.pasta_trabalho}\``);
  L.push(`- A versão final, sozinha: \`${f.pasta_entrega}\``);
  L.push(`- O código que desenha: \`squads/motion/src/compositions/${f.composition}/\``);
  L.push("");
  if (versoes.length) {
    L.push("## Versões");
    L.push("");
    L.push(`${versoes.length} versões, da v${String(versoes[0].versao).padStart(2, "0")} à v${String(versoes[versoes.length - 1].versao).padStart(2, "0")}. A última é \`${f.ultima_versao}\`.`);
    L.push("");
  }
  if (cenas.length) {
    L.push("## As cenas, para reaproveitar um pedaço");
    L.push("");
    L.push("Procure pela fala, não pelo nome da cena: é a fala que a gente lembra.");
    L.push("");
    L.push("| Segundo | Cena | O que é falado |");
    L.push("|---|---|---|");
    for (const c of cenas) {
      const fala = c.fala ? (c.fala.length > 70 ? c.fala.slice(0, 67) + "..." : c.fala) : "(sem fala)";
      L.push(`| ${c.de}s | ${c.cena} | ${fala} |`);
    }
    L.push("");
    L.push(`Índice completo em \`cenas.json\`, com o componente de cada uma.`);
    L.push("");
  }
  L.push("## Como achar isto de novo");
  L.push("");
  L.push("```bash");
  L.push(`node scripts/atlas/find.js "${f.tema}"`);
  L.push("```");
  L.push("");
  L.push("Regra de organização: `squads/motion/docs/ORGANIZACAO-E-NOMES.md`");
  return L.join("\n");
}

/* ------------------------------------------------------------------ *
 * cli
 * ------------------------------------------------------------------ */

const argv = process.argv.slice(2);
if (argv.includes("--auditar")) process.exit(auditar() ? 2 : 0);
const iAchar = argv.indexOf("--achar");
if (iAchar !== -1) process.exit(require("./lib/achar-cena.js").acharCena(argv.slice(iAchar + 1).join(" ")));

const comp = argv.find((a) => !a.startsWith("--"));
if (!comp) {
  console.error("Uso: node scripts/organizar-producao.js <Composition> [--tema \"...\"] [--cliente <slug>] [--aplicar]");
  console.error("     node scripts/organizar-producao.js --auditar");
  process.exit(1);
}
const pegar = (n) => { const i = argv.indexOf("--" + n); return i !== -1 ? argv[i + 1] : null; };
process.exit(organizar(comp, { tema: pegar("tema"), cliente: pegar("cliente"), slug: pegar("slug"), aplicar: argv.includes("--aplicar") }));
