#!/usr/bin/env node
/**
 * ds-som.js: do gesto do design system para o par de som do motor.
 *
 * O design system nomeia o gesto pelo que se MOVE ("anel-migra", "celula-preenche");
 * o motor nomeia pelo PESO que aquilo tem ("serie-itens/item", peso 4). Quem
 * implementa uma cena precisa do segundo, nunca do primeiro: `SFX_EVENTS` de
 * componente so aceita categoria e gesto que existam em
 * `squads/motion/public/_sfx/catalogo.json`.
 *
 * A traducao vive em `design-system/registry/sound-bridge.json` (67 pares, zero
 * faltando). Este script so consulta: nao decide nada por conta propria, e o
 * catalogo do motor manda (decisao do o dono do canal, 06/09/2026, registrada em
 * `design-system/local-overrides.json` chave `ponte_de_som`).
 *
 * Uso:
 *   node ds-som.js "anel-migra"                  gesto do pacote
 *   node ds-som.js --molde emphasis.attribute.v1 todos os gestos de um molde
 *   node ds-som.js --listar                      a tabela inteira, resumida
 *   node ds-som.js --json ...                    saida para outro script
 *   node ds-som.js --peso 7                      o que o peso 7 manda no som e no movimento
 *   node ds-som.js --cena "6 3 3 7"              confere as regras de peso da cena inteira
 *
 * Nao confundir com o mapa de som do motor (`squads/motion/scripts/sfx-mapa.js`),
 * que le o codigo pronto e monta a trilha. Este aqui responde antes: qual par usar.
 */
const fs = require("fs");
const path = require("path");
const { paths, existe } = require("./lib/ds-root");

const PONTE = path.join(paths.ds, "registry", "sound-bridge.json");
const CATALOGO_MOTOR = path.join(paths.engine, "public", "_sfx", "catalogo.json");

function norm(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[_\s]+/g, "-")
    .trim();
}

function carregar() {
  if (!existe(PONTE)) {
    console.error(`Ponte de som nao encontrada: ${PONTE}`);
    console.error("Sem ela nao da pra traduzir gesto do design system em par do motor.");
    process.exit(1);
  }
  const ponte = JSON.parse(fs.readFileSync(PONTE, "utf8"));
  const catalogo = existe(CATALOGO_MOTOR) ? JSON.parse(fs.readFileSync(CATALOGO_MOTOR, "utf8")) : null;
  return { ponte, catalogo };
}

/**
 * O par so vale se as DUAS pontas existirem no catalogo do motor: a
 * categoria com aquele gesto (em `categorias`) e o arquivo de som (em
 * `sons`). Conferir so a categoria deixaria passar par apontando para
 * arquivo que ninguem aprovou, que e exatamente o risco desta ponte.
 */
function conferirNoMotor(catalogo, par, arquivo) {
  if (!catalogo) return { ok: null, motivo: "catalogo do motor nao encontrado" };
  // Par nulo e SILENCIO PROPOSITAL, nao defeito: o pacote pede som onde o
  // motor decidiu que nao tem som (peso 0 obrigatorio, ou gesto que o motor
  // nao reconhece). Silencio declarado e resposta valida.
  if (!par) return { ok: true, motivo: "", silencio: true };
  const problemas = [];
  const [categoria, gesto] = String(par || "").split("/");
  const cat = (catalogo.categorias || {})[categoria];
  if (!cat) {
    const tem = Object.keys(catalogo.categorias || {}).filter((k) => !k.startsWith("_"));
    problemas.push(`categoria "${categoria}" nao existe no motor (tem: ${tem.join(", ")})`);
  } else if (gesto && cat.gestos && !(gesto in cat.gestos)) {
    problemas.push(`gesto "${gesto}" nao existe em ${categoria} (tem: ${Object.keys(cat.gestos).join(", ")})`);
  }
  if (arquivo && catalogo.sons && !(arquivo in catalogo.sons)) {
    problemas.push(`arquivo "${arquivo}" nao esta na lista aprovada do motor`);
  }
  return { ok: problemas.length === 0, motivo: problemas.join("; ") };
}

/** peso que o motor da para aquele gesto (a fonte e o motor, nunca o pacote) */
function pesoDoMotor(catalogo, par) {
  const [categoria, gesto] = String(par || "").split("/");
  const cat = (catalogo && catalogo.categorias && catalogo.categorias[categoria]) || null;
  if (!cat || !cat.gestos || !(gesto in cat.gestos)) return null;
  return cat.gestos[gesto];
}

function mostrar(p, catalogo, comoJson) {
  if (comoJson) return p;
  const check = conferirNoMotor(catalogo, p.motor, p.arquivo);
  if (check.silencio) {
    return [
      `${p.gestoPacote}  (${p.categoriaPacote})`,
      "  SEM SOM, de proposito: o motor nao tem par para este gesto.",
      p.por_que ? `  por que: ${p.por_que}` : "",
      "  Silencio declarado e decisao valida: nao inventar arquivo nem reaproveitar par de outro peso.",
    ]
      .filter(Boolean)
      .join("\n");
  }
  const pesoMotor = pesoDoMotor(catalogo, p.motor);
  const aviso = check.ok === false ? `  [ATENCAO] ${check.motivo}` : "";
  // Peso divergente nao e erro: o motor manda, e o numero dele e o que vale.
  const divergePeso =
    pesoMotor !== null && p.peso !== undefined && pesoMotor !== p.peso
      ? `  peso no motor: ${pesoMotor} (a ponte diz ${p.peso}; vale o do motor)`
      : "";
  return [
    `${p.gestoPacote}  (${p.categoriaPacote})`,
    `  par do motor: ${p.motor}   peso ${pesoMotor !== null ? pesoMotor : p.peso}   arquivo ${p.arquivo}`,
    divergePeso,
    p.por_que ? `  por que: ${p.por_que}` : "",
    p.usadoPor && p.usadoPor.length ? `  usado por: ${p.usadoPor.join(", ")}` : "",
    aviso,
  ]
    .filter(Boolean)
    .join("\n");
}


/* ==================================================================
 * MANUAL DE MOTION v3.0 §3b e §3c — o peso decide o som
 *
 * Ate aqui este script so traduzia o NOME do gesto. O manual v3.0 fecha
 * a outra metade: o peso 0 a 10 e a MESMA escala do movimento e do som,
 * entao o numero que o motionSpec escreve ja decide volume, ducking e
 * se o gesto sequer soa. Sem segunda tabela, sem traducao.
 *
 * Fonte: design-system/motion/MOTION-MANUAL.md §3b, §3c.
 * Implementacao irma no motor: squads/motion/src/core/motion-spec.ts
 * (gainForWeight, sfxCueFor, musicLevelForScene).
 * ================================================================== */

/** §3b — perfil completo de um peso. */
const PERFIL_DE_PESO = [
  { ate: 0, classe: "silencio", amp: 0.5, dur: 0.8, holdExtra: 0, blur: 2, ganhoDb: null, som: "nenhum (obrigatorio)" },
  { ate: 2, classe: "detalhe", amp: 0.6, dur: 0.85, holdExtra: 0, blur: 4, ganhoDb: -21, som: "tick minimo" },
  { ate: 4, classe: "estrutura", amp: 0.8, dur: 1.0, holdExtra: 0, blur: 6, ganhoDb: -16, som: "tick, sweep ou pop suave" },
  { ate: 6, classe: "evento", amp: 1.0, dur: 1.1, holdExtra: 12, blur: 6, ganhoDb: -13, som: "medio, ding ou click" },
  { ate: 8, classe: "virada", amp: 1.25, dur: 1.25, holdExtra: 24, blur: 8, ganhoDb: -10.5, som: "grave ou whoosh longo" },
  { ate: 10, classe: "assinatura", amp: 1.4, dur: 1.5, holdExtra: 36, blur: 12, ganhoDb: -9, som: "whoosh longo + grave" },
];

const PESO_MAX_CENA = 22;
const PESO_PESADO_GAP_MIN = 180; // quadros entre dois gestos de peso 7 ou mais
const PESO_ASSINATURA_MAX_VIDEO = 2;

function perfilDoPeso(w) {
  const n = Number(w);
  if (!Number.isFinite(n) || n < 0 || n > 10) return null;
  return PERFIL_DE_PESO.find((p) => n <= p.ate);
}

/** §3c — nivel da trilha e ducking pela cena inteira. */
function trilhaDaCena(pesos) {
  const max = Math.max(0, ...pesos);
  if (max <= 4) return { nivelDb: -18, duck: null, nota: "trilha sem mudanca" };
  if (max <= 6) return { nivelDb: -16, duck: null, nota: "trilha sem mudanca" };
  if (max <= 8)
    return { nivelDb: -16, duck: { db: -6, quadros: 40 }, nota: "ducking a partir da tonica menos 6" };
  return {
    nivelDb: -16,
    duck: { db: -10, quadros: 60 },
    nota: "ducking com pausa da trilha no quadro do assento, volta com inertia em 60q",
  };
}

/** §3b — as regras de cena, em codigo. Devolve a lista de problemas. */
function conferirCena(pesos) {
  const problemas = [];
  const soma = pesos.reduce((a, b) => a + b, 0);
  if (soma > PESO_MAX_CENA)
    problemas.push(
      `soma dos pesos ${soma} acima de ${PESO_MAX_CENA}: algum gesto esta mentindo sobre a propria importancia`,
    );
  const pesados = pesos.filter((w) => w >= 7).length;
  if (pesados > 1)
    problemas.push(
      `${pesados} gestos de peso 7 ou mais na mesma cena: precisam de ${PESO_PESADO_GAP_MIN}q de distancia entre eles`,
    );
  const assinatura = pesos.filter((w) => w >= 9).length;
  if (assinatura > PESO_ASSINATURA_MAX_VIDEO)
    problemas.push(
      `${assinatura} gestos de peso 9 ou 10: o video inteiro so aceita ${PESO_ASSINATURA_MAX_VIDEO}, o terceiro rebaixa todos`,
    );
  return { soma, problemas };
}

function mostrarPeso(w) {
  const p = perfilDoPeso(w);
  if (!p) {
    console.error(`Peso invalido: "${w}". A escala do manual vai de 0 a 10.`);
    process.exit(1);
  }
  const intensidade = w <= 4 ? "sutil" : w <= 6 ? "padrao" : "dramatico";
  console.log(`peso ${w}  classe ${p.classe}`);
  console.log(`  som: ${p.som}${p.ganhoDb === null ? "" : `, ganho ${p.ganhoDb} dB`}`);
  console.log(`  movimento: amplitude x${p.amp}, duracao x${p.dur}, hold extra ${p.holdExtra}q, blur de entrada ${p.blur}px`);
  console.log(`  intensidade derivada: ${intensidade} (nao se escolhe, vem do peso)`);
  if (w === 0) console.log("  silencio e OBRIGATORIO aqui, nao opcional: o peso esta em outro elemento da cena.");
  if (w >= 7) console.log(`  dispara ducking da trilha; exige ${PESO_PESADO_GAP_MIN}q ate o proximo gesto pesado.`);
  if (w >= 9) console.log(`  peso de assinatura: no maximo ${PESO_ASSINATURA_MAX_VIDEO} no video inteiro.`);
}

function mostrarCena(lista) {
  const pesos = lista
    .split(/[ ,]+/)
    .filter(Boolean)
    .map(Number);
  if (pesos.some((n) => !Number.isFinite(n) || n < 0 || n > 10)) {
    console.error("Pesos da cena devem ser numeros de 0 a 10. Ex: node ds-som.js --cena \"6 3 3 7\"");
    process.exit(1);
  }
  const { soma, problemas } = conferirCena(pesos);
  const trilha = trilhaDaCena(pesos);
  console.log(`cena com ${pesos.length} gestos, soma ${soma} (teto ${PESO_MAX_CENA})`);
  console.log(`  trilha: ${trilha.nivelDb} dB, ${trilha.nota}`);
  if (trilha.duck) console.log(`  ducking: ${trilha.duck.db} dB por ${trilha.duck.quadros}q`);
  pesos.forEach((w) => {
    const p = perfilDoPeso(w);
    console.log(`  peso ${w}  ${p.classe}  ${p.ganhoDb === null ? "silencio" : p.ganhoDb + " dB"}  ${p.som}`);
  });
  if (problemas.length) {
    console.log("");
    problemas.forEach((m) => console.log(`  [REPROVA] ${m}`));
    process.exit(2);
  }
  console.log("");
  console.log("  cena dentro das regras de peso do manual v3.0.");
}

function main() {
  const args = process.argv.slice(2);
  const comoJson = args.includes("--json");
  const limpos = args.filter((a) => a !== "--json");
  const iPeso = limpos.indexOf("--peso");
  if (iPeso !== -1) return mostrarPeso(Number(limpos[iPeso + 1]));

  const iCena = limpos.indexOf("--cena");
  if (iCena !== -1) return mostrarCena(limpos.slice(iCena + 1).join(" "));

  const { ponte, catalogo } = carregar();
  const pontes = ponte.pontes || [];

  if (limpos.includes("--listar")) {
    if (comoJson) return console.log(JSON.stringify(pontes, null, 1));
    console.log(`Ponte de som: ${pontes.length} pares (${ponte.total_silencio_proposital || 0} em silencio proposital).`);
    console.log(ponte.regra_de_posicao ? `Posicao: ${ponte.regra_de_posicao}\n` : "");
    pontes.forEach((p) => console.log(`${String(p.gestoPacote).padEnd(26)} ${String(p.motor).padEnd(28)} peso ${p.peso}`));
    return;
  }

  const iMolde = limpos.indexOf("--molde");
  if (iMolde !== -1) {
    const molde = limpos[iMolde + 1];
    if (!molde) {
      console.error('Falta o id do molde. Ex: node ds-som.js --molde emphasis.attribute.v1');
      process.exit(1);
    }
    const achados = pontes.filter((p) => (p.usadoPor || []).some((u) => norm(u) === norm(molde)));
    if (!achados.length) {
      console.error(`Nenhum gesto de som declarado para "${molde}".`);
      console.error("Molde sem som e decisao legitima (densidade baixa). Se precisar de som, escolher o gesto pela tabela: node ds-som.js --listar");
      process.exit(2);
    }
    if (comoJson) return console.log(JSON.stringify(achados, null, 1));
    achados.forEach((p) => console.log(mostrar(p, catalogo, false) + "\n"));
    return;
  }

  const alvo = limpos[0];
  if (!alvo) {
    console.error("Uso: node ds-som.js \"<gesto>\" | --molde <id> | --listar | --peso <0-10> | --cena \"6 3 3\"   [--json]");
    process.exit(1);
  }

  const exato = pontes.filter((p) => norm(p.gestoPacote) === norm(alvo));
  const parcial = exato.length
    ? exato
    : pontes.filter((p) => norm(p.gestoPacote).includes(norm(alvo)) || norm(p.motor).includes(norm(alvo)));

  if (!parcial.length) {
    console.error(`Nao achei "${alvo}" na ponte de som.`);
    console.error("A tabela inteira: node ds-som.js --listar");
    console.error("Gesto que nao esta na ponte NAO vira som inventado: ou usa um par existente, ou fica em silencio.");
    process.exit(2);
  }
  if (comoJson) return console.log(JSON.stringify(parcial, null, 1));
  if (!exato.length) console.log(`(sem correspondencia exata para "${alvo}"; mostrando o que se parece)\n`);
  parcial.forEach((p) => console.log(mostrar(p, catalogo, false) + "\n"));
}

main();
