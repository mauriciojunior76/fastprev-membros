/**
 * checar-build-registry.js — compara o que foi IMPLEMENTADO com o que o design
 * system MANDA construir.
 *
 * POR QUE ESTE GATE EXISTE: até 06/09/2026 nenhum fiscal comparava a geometria
 * de um componente de cena com a do molde oficial. Dava para escrever um nó de
 * 112 onde o padrão manda 148, um conector de 78 onde manda 216, e passar em
 * todos os gates. Foi exatamente o que aconteceu no AlineZeusReels: a peça saiu
 * "aprovada" com cinco componentes fora da medida e uma combinação de moldes
 * proibida pelas regras de composição.
 *
 * COMO A CENA DECLARA O MOLDE: no `SCENES` do tokens.ts, campo `molde` com o id
 * do registro (ex.: `molde: "process.steps.v1"`). Cena sem o campo não é
 * checada, então peça legada continua passando.
 *
 * O que este gate NÃO faz: julgar se o molde escolhido é o certo para a fala.
 * Isso é decisão de direção, e continua com quem lê a transcrição.
 *
 * Uso como módulo (é assim que o choreo-lint chama):
 *   const { checarBuildRegistry } = require("./checar-build-registry");
 *   checarBuildRegistry({ compDir, errAdd, warnAdd, infoAdd });
 *
 * Uso direto, para depurar uma composition:
 *   node scripts/checar-build-registry.js AlineZeusReels
 */

const fs = require("fs");
const path = require("path");

const MOTION = path.resolve(__dirname, "..");
const APPLE = path.resolve(MOTION, "..", "motion-apple");
const REGISTRY = path.join(APPLE, "design-system", "registry", "build-registry.json");
const OVERRIDES = path.join(APPLE, "design-system", "local-overrides.json");
const COMPOSICAO_RULES = path.join(APPLE, "design-system", "registry", "composition-rules.json");

function lerJson(caminho) {
  try {
    return JSON.parse(fs.readFileSync(caminho, "utf8"));
  } catch {
    return null;
  }
}

/** Moldes declarados por cena: { chaveDaCena: [idDoMolde, ...] }. */
function moldesPorCena(tokensSrc) {
  const bloco = tokensSrc.match(/SCENES\s*:\s*SceneDef\[\]\s*=\s*\[([\s\S]*?)\n\];/);
  if (!bloco) return {};
  const mapa = {};
  for (const m of bloco[1].matchAll(/key:\s*"([^"]+)"[^}]*?molde:\s*"([^"]+)"/g)) {
    mapa[m[1]] = m[2].split("+").map((s) => s.trim()).filter(Boolean);
  }
  return mapa;
}

/** Componente de cada cena, lido do SCENE_COMPONENTS do MotionStage. */
function componentesPorCena(stageSrc) {
  const bloco = stageSrc.match(/SCENE_COMPONENTS\s*:\s*Record<string,\s*React\.FC>\s*=\s*\{([\s\S]*?)\n\};/);
  if (!bloco) return {};
  const mapa = {};
  for (const m of bloco[1].matchAll(/"([^"]+)"\s*:\s*(\w+)/g)) mapa[m[1]] = m[2];
  return mapa;
}

/** Caminho do arquivo de um componente, pelos imports do MotionStage. */
function arquivoDoComponente(stageSrc, compDir, nome) {
  const re = new RegExp(`import\\s*\\{\\s*${nome}\\s*\\}\\s*from\\s*["']([^"']+)["']`);
  const m = stageSrc.match(re);
  if (!m) return null;
  const rel = m[1].endsWith(".tsx") ? m[1] : `${m[1]}.tsx`;
  return path.join(compDir, "components", rel.replace(/^\.\//, ""));
}

const contentH = (src) => {
  const m = src.match(/export const CONTENT_H\s*=\s*(\d+)/);
  return m ? Number(m[1]) : null;
};

/**
 * Desfoque aplicado no MESMO objeto de estilo que define corpo de texto.
 * É o erro #11 do squad Apple: recuo em esquema tira cor, nunca nitidez.
 */
function desfoqueEmRotulo(src) {
  const achados = [];
  // cada objeto de estilo entre chaves, de forma conservadora
  for (const m of src.matchAll(/style=\{\{([\s\S]*?)\}\}/g)) {
    const corpo = m[1];
    const temTexto = /fontSize\s*:/.test(corpo);
    const temBlur = /filter\s*:[^,]*blur\(/.test(corpo);
    if (temTexto && temBlur) {
      const linha = src.slice(0, m.index).split("\n").length;
      achados.push(linha);
    }
  }
  return achados;
}

function checarBuildRegistry({ compDir, composition, errAdd, warnAdd, infoAdd }) {
  const registro = lerJson(REGISTRY);
  if (!registro) {
    infoAdd && infoAdd("build-registry", "design system 3.1 nao encontrado; gate inativo.");
    return;
  }

  const tokensPath = path.join(compDir, "tokens.ts");
  const stagePath = path.join(compDir, "components", "MotionStage.tsx");
  if (!fs.existsSync(tokensPath) || !fs.existsSync(stagePath)) return;

  const tokensSrc = fs.readFileSync(tokensPath, "utf8");
  const stageSrc = fs.readFileSync(stagePath, "utf8");

  const moldes = moldesPorCena(tokensSrc);
  const cenas = Object.keys(moldes);
  if (!cenas.length) {
    infoAdd &&
      infoAdd(
        "build-registry",
        `${composition}: nenhuma cena declara "molde"; gate inativo (peca legada). ` +
          "Cena nova nasce com o id do registro no SCENES."
      );
    return;
  }

  const porId = new Map(registro.entradas.map((e) => [e.identidade.id, e]));
  const overrides = lerJson(OVERRIDES) || {};
  const reducoes = overrides.reducoes_por_palco || {};
  const palcos = overrides.palcos_do_motor || {};
  const comps = componentesPorCena(stageSrc);

  // combinacao de moldes na mesma cena: so o que as regras permitem
  const regras = lerJson(COMPOSICAO_RULES);
  const proibidas = new Set(
    (regras?.combinacoes_proibidas || [])
      .map((p) => (p.par || "").split("+").map((s) => s.trim()).sort().join("+"))
      .filter(Boolean)
  );

  for (const cena of cenas) {
    const ids = moldes[cena];

    if (ids.length > 1) {
      const chave = [...ids].sort().join("+");
      if (proibidas.has(chave)) {
        errAdd(
          "build-registry",
          `cena "${cena}": a combinacao ${ids.join(" + ")} e PROIBIDA pelas regras de composicao. ` +
            "Divida em duas cenas."
        );
        continue;
      }
    }

    for (const id of ids) {
      const oficial = porId.get(id);
      if (!oficial) {
        errAdd("build-registry", `cena "${cena}": molde "${id}" nao existe no build-registry.`);
        continue;
      }

      const nomeComp = comps[cena];
      if (!nomeComp) {
        warnAdd(
          "build-registry",
          `cena "${cena}" declara molde "${id}" mas nao tem componente no SCENE_COMPONENTS (passthrough?).`
        );
        continue;
      }

      const esperado = oficial.identidade.componentName;
      if (esperado && nomeComp !== esperado && ids.length === 1) {
        warnAdd(
          "build-registry",
          `cena "${cena}": componente "${nomeComp}" difere do nome oficial do molde ("${esperado}"). ` +
            "Nome igual ao do registro evita duas implementacoes do mesmo molde."
        );
      }

      const arq = arquivoDoComponente(stageSrc, compDir, nomeComp);
      if (!arq || !fs.existsSync(arq)) continue;
      const src = fs.readFileSync(arq, "utf8");

      // 1. altura declarada contra a oficial (com a reducao de palco, quando houver)
      const meu = contentH(src);
      const reducao = reducoes[id];
      const alvo = reducao ? reducao.altura_no_motor : oficial.geometry?.contentHeight;
      if (meu != null && typeof alvo === "number" && meu !== alvo) {
        const nota = reducao ? ` (altura reduzida do palco: o pacote declara ${reducao.altura_do_pacote})` : "";
        errAdd(
          "build-registry",
          `cena "${cena}" (${nomeComp}): CONTENT_H ${meu} difere da altura oficial do molde ${id}, ` +
            `que e ${alvo}${nota}. Medida de molde nao se arredonda no olho.`
        );
      }

      // 2. desfoque em rotulo (erro #11 do squad Apple)
      const linhas = desfoqueEmRotulo(src);
      if (linhas.length) {
        errAdd(
          "build-registry",
          `cena "${cena}" (${nomeComp}): desfoque aplicado junto de texto na(s) linha(s) ${linhas.join(", ")}. ` +
            "Recuo em esquema tira COR, nunca nitidez de rotulo."
        );
      }

      // 3. o palco declarado no molde cabe no palco do motor
      const palco = oficial.geometry?.palco;
      const teto = palcos[palco] ? palcos[palco][1] : null;
      if (teto && typeof alvo === "number" && alvo > teto) {
        errAdd(
          "build-registry",
          `cena "${cena}": o molde ${id} pede ${alvo}px no palco "${palco}", mas o motor so tem ${teto}px. ` +
            "Registrar a reducao em local-overrides.json antes de usar."
        );
      }
    }
  }
}

module.exports = { checarBuildRegistry };

if (require.main === module) {
  const composition = process.argv[2];
  if (!composition) {
    console.error("uso: node scripts/checar-build-registry.js <Composition>");
    process.exit(1);
  }
  const compDir = path.join(MOTION, "src", "compositions", composition);
  const achados = [];
  checarBuildRegistry({
    compDir,
    composition,
    errAdd: (c, m) => achados.push(["ERRO", c, m]),
    warnAdd: (c, m) => achados.push(["AVISO", c, m]),
    infoAdd: (c, m) => achados.push(["INFO", c, m]),
  });
  if (!achados.length) console.log(`[build-registry] ${composition}: sem problemas.`);
  for (const [nivel, check, msg] of achados) console.log(`  [${nivel}] (${check}) ${msg}`);
  process.exit(achados.some((a) => a[0] === "ERRO") ? 1 : 0);
}
