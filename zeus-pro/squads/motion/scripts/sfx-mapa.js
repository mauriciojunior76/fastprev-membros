#!/usr/bin/env node
/**
 * sfx-mapa.js — a folha de som de uma peça, gerada do código.
 *
 * Uso:
 *   node scripts/sfx-mapa.js <Composition> [--estilo <nome>] [--json] [--salvar]
 *
 * Sem `--salvar` só imprime. Com `--salvar`, grava em
 * `output/<Campanha>/<Composition>-sfx-mapa-vNN.json` e `.md`, versionado,
 * como manda o OUTPUT-PROTOCOL: mapa sobrescrito é mapa perdido.
 *
 * Sai com código diferente de zero quando encontra problema, para poder ser
 * encadeado num gate.
 *
 * Este arquivo NÃO usa a data do sistema: a folha precisa sair idêntica para
 * a mesma entrada, para dar para comparar duas versões.
 */

const fs = require("fs");
const path = require("path");

const { montarMapa } = require("./lib/sfx-mapa.js");

const MOTION = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(MOTION, "output");

const args = process.argv.slice(2);
const composition = args.find((a) => !a.startsWith("--"));
const querJson = args.includes("--json");
const querSalvar = args.includes("--salvar");
const estiloArg = args.indexOf("--estilo");
const estilo = estiloArg !== -1 ? args[estiloArg + 1] : "apple-conceitual";

if (!composition) {
  console.error("Uso: node scripts/sfx-mapa.js <Composition> [--estilo <nome>] [--json] [--salvar]");
  process.exit(1);
}

/** pasta de output onde já existem mp4 desta composition. */
function acharCampanha(comp) {
  if (!fs.existsSync(OUTPUT_DIR)) return null;
  for (const entry of fs.readdirSync(OUTPUT_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const dir = path.join(OUTPUT_DIR, entry.name);
    if (fs.readdirSync(dir).some((f) => f.startsWith(comp + "-") && f.endsWith(".mp4"))) {
      return dir;
    }
  }
  return null;
}

function proximaVersao(dir, comp) {
  if (!fs.existsSync(dir)) return 1;
  const re = new RegExp(`^${comp}-sfx-mapa-v(\\d+)\\.json$`);
  let maior = 0;
  for (const f of fs.readdirSync(dir)) {
    const m = re.exec(f);
    if (m) maior = Math.max(maior, parseInt(m[1], 10));
  }
  return maior + 1;
}

const seg = (n) => (n === null || n === undefined ? "" : n.toFixed(3) + "s");

function folha(m) {
  const L = [];
  L.push(`# Som de ${m.composition}`);
  L.push("");
  L.push(
    `Gerado do código: ${m.eventos.length} sons em ${m.duracaoS}s, estilo ${m.estilo}. ` +
      `Nenhum instante foi digitado à mão. Aprove esta folha antes do render.`
  );
  L.push("");

  L.push("## Som, evento a evento");
  L.push("");
  L.push("| Gesto em | Cena | O que acontece | Peso | Som | Volume | Áudio começa em |");
  L.push("|---|---|---|---|---|---|---|");
  for (const e of m.eventos) {
    const oque = e.etapa ? `${e.gesto} (etapa ${e.etapa})` : e.gesto;
    L.push(
      `| ${seg(e.gestoS)} | ${e.cena} | ${oque} | ${e.peso} | ${e.som.replace(/^peso-\d+-/, "")} | ${e.volumeDb} dB | ${seg(e.inicioS)} |`
    );
  }
  L.push("");

  if (m.vinheta) {
    L.push("## Vinheta");
    L.push("");
    L.push(
      `\`${m.vinheta.arquivo}\` entra em ${seg(m.vinheta.inicioS)}. É voz, não efeito: ` +
        `o nível dela se compara com a fala do vídeo, com diferença máxima de 3 dB.`
    );
    L.push("");
  }

  L.push("## Categorias");
  L.push("");
  L.push(
    "Mesma categoria recebe o mesmo som em todas as aparições, sempre. Isso não é conferido depois: " +
      "o som vem do catálogo pelo par categoria mais gesto, então não existe como divergir."
  );
  L.push("");
  L.push("| Categoria | Aparece em | Gestos |");
  L.push("|---|---|---|");
  for (const [cat, d] of Object.entries(m.categorias)) {
    const gestos = Object.entries(d.gestos)
      .map(([g, v]) => `${g} (${v.som.replace(/^peso-\d+-/, "")}, ${v.volumeDb} dB)`)
      .join("; ");
    L.push(`| ${cat} | ${d.aparicoes.join(", ")} | ${gestos} |`);
  }
  L.push("");

  if (m.series.length) {
    L.push("## Séries");
    L.push("");
    L.push("Itens que entram por etapa levam o mesmo som, com o volume caindo 1 dB por etapa.");
    L.push("");
    for (const s of m.series) {
      L.push(`- \`${s.chave}\`: ${s.etapas} etapas, ${s.volumes.join(", ")} dB`);
    }
    L.push("");
  }

  if (m.descartados.length) {
    L.push("## Descartados, e por quê");
    L.push("");
    for (const d of m.descartados) L.push(`- \`${d.id}\` em ${seg(d.gestoS)}: ${d.motivoDescarte}`);
    L.push("");
  }

  if (m.densidade) {
    L.push("## Densidade");
    L.push("");
    L.push(
      `Um som a cada ${m.densidade.mediaS}s. O teto do estilo ${m.estilo} é ${m.densidade.tetoS}s. ` +
        (m.densidade.ok ? "Dentro do limite." : "ACIMA DO LIMITE: o vídeo cansa mesmo com cada som certo no lugar certo.")
    );
    L.push("");
  }

  if (m.semDeclaracao.length) {
    L.push("## Cenas sem gesto declarado");
    L.push("");
    for (const s of m.semDeclaracao) L.push(`- ${s.cena} (${s.componente})`);
    L.push("");
  }

  if (m.avisos.length) {
    L.push("## Avisos");
    L.push("");
    for (const a of m.avisos) L.push(`- ${a}`);
    L.push("");
  }

  if (m.problemas.length) {
    L.push("## Problemas, que bloqueiam o render");
    L.push("");
    for (const p of m.problemas) L.push(`- ${p}`);
    L.push("");
  }

  return L.join("\n");
}

let mapa;
try {
  mapa = montarMapa(composition, { estilo });
} catch (e) {
  console.error("Erro: " + e.message);
  process.exit(1);
}

if (querJson) {
  console.log(JSON.stringify(mapa, null, 2));
} else {
  console.log(folha(mapa));
}

if (querSalvar) {
  const campanha = acharCampanha(composition) || path.join(OUTPUT_DIR, composition);
  fs.mkdirSync(campanha, { recursive: true });
  const v = String(proximaVersao(campanha, composition)).padStart(2, "0");
  const base = path.join(campanha, `${composition}-sfx-mapa-v${v}`);
  fs.writeFileSync(base + ".json", JSON.stringify(mapa, null, 2), "utf8");
  fs.writeFileSync(base + ".md", folha(mapa), "utf8");
  console.error(`\nSalvo em ${base}.json e .md`);
}

if (mapa.problemas.length) process.exit(2);
