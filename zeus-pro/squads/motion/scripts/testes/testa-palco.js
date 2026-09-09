#!/usr/bin/env node
/**
 * testa-palco.js: os dois lados da regra de palco tem que dizer a mesma coisa.
 *
 * A regra de direcao dinamica vive em dois lugares por necessidade: o registry
 * `stage-states.json` (que os scripts do motion-apple leem) e o
 * `src/core/palco.ts` (que o Remotion usa em tempo de render, porque o bundle
 * nao alcanca a pasta do design system). Duas copias da mesma verdade sempre
 * divergem em silencio: uma muda, a outra fica, e a peca sai fora da regra sem
 * ninguem ver.
 *
 * Este teste e o que impede isso. Compara numero a numero e reprova.
 *
 * Uso: node scripts/testes/testa-palco.js
 */
const fs = require("fs");
const path = require("path");

const RAIZ = path.join(__dirname, "..", "..");
const REGISTRY = path.join(
  RAIZ,
  "..",
  "motion-apple",
  "design-system",
  "registry",
  "stage-states.json"
);

let falhas = 0;
const ok = (cond, titulo, detalhe = "") => {
  if (cond) {
    console.log(`  ok    ${titulo}`);
  } else {
    falhas++;
    console.log(`  FALHA ${titulo}${detalhe ? "\n        " + detalhe : ""}`);
  }
};

if (!fs.existsSync(REGISTRY)) {
  console.error(`Registry nao encontrado: ${REGISTRY}`);
  process.exit(1);
}
const reg = JSON.parse(fs.readFileSync(REGISTRY, "utf8")).formatos["vertical-mao"];

// palco.ts e TypeScript puro, sem dependencia nenhuma: transpila em memoria com
// o mesmo esbuild que o choreo-lint usa pra ler o choreography.ts, e avalia.
// Nao monta bundle e nao toca no Remotion.
const esbuild = require("esbuild");
const Module = require("module");
const P = (() => {
  const arquivo = path.join(RAIZ, "src", "core", "palco.ts");
  const { code } = esbuild.transformSync(fs.readFileSync(arquivo, "utf8"), { loader: "ts", format: "cjs" });
  const m = new Module(arquivo);
  m._compile(code, arquivo);
  return m.exports;
})();

console.log("\nGEOMETRIA DO ESTADO A (registry x palco.ts)");
const rA = reg.estados.A.vertical;
ok(P.PALCO_A.esquema.y === rA.esquema.y && P.PALCO_A.esquema.h === rA.esquema.h, "faixa do esquema bate");
ok(P.PALCO_A.costura.y === rA.costura.y && P.PALCO_A.costura.h === rA.costura.h, "faixa da costura bate", `registry ${rA.costura.y}/${rA.costura.h}, codigo ${P.PALCO_A.costura.y}/${P.PALCO_A.costura.h}`);
ok(P.PALCO_A.rosto.y === rA.rosto.y && P.PALCO_A.rosto.h === rA.rosto.h, "faixa do rosto bate");
ok(P.PALCO_A.titulo.y === rA.titulo.y && P.PALCO_A.titulo.h === rA.titulo.h, "faixa do titulo bate");
ok(
  P.PALCO_A.esquema.h + P.PALCO_A.costura.h + P.PALCO_A.rosto.h === P.CANVAS_VERTICAL.height,
  "as tres faixas somam a altura do canvas, sem sobra nem sobreposicao",
  `soma ${P.PALCO_A.esquema.h + P.PALCO_A.costura.h + P.PALCO_A.rosto.h}`
);

console.log("\nO QUE CADA ESTADO TEM NA TELA");
for (const e of ["A", "B", "C"]) {
  const r = reg.estados[e];
  ok(P.ESTADOS[e].temRosto === r.temRosto, `estado ${e}: rosto bate`);
  ok(P.ESTADOS[e].temLegenda === r.temLegenda, `estado ${e}: legenda bate`);
  ok(P.ESTADOS[e].temTitulo === r.temTitulo, `estado ${e}: titulo bate`);
}

console.log("\nREGRA DE ALTERNANCIA (registry x palco.ts)");
const rAlt = reg.alternancia;
ok(P.ALTERNANCIA.rostoVoltaEmAteQuadros === rAlt.rostoVoltaEmAteQuadros, "teto de quadros sem rosto bate");
ok(P.ALTERNANCIA.abreEm === rAlt.abreEm && P.ALTERNANCIA.fechaEm === rAlt.fechaEm, "abre e fecha batem");
ok(P.ALTERNANCIA.telaCheiaPercentualMin === rAlt.somaBCPercentualMin, "piso de tela cheia bate");
ok(P.ALTERNANCIA.telaCheiaPercentualMax === rAlt.somaBCPercentualMax, "teto de tela cheia bate");
ok(P.ALTERNANCIA.maxTitulosPorEsquema === reg.tituloPersistente.maxTitulosPorEsquema, "teto de titulos por esquema bate");

console.log("\nPAPEL PARA ESTADO (palco.ts x narrative-roles.json)");
const ROLES = path.join(path.dirname(REGISTRY), "narrative-roles.json");
const papeis = JSON.parse(fs.readFileSync(ROLES, "utf8")).roles;
ok(Object.keys(P.ESTADO_POR_PAPEL).length === papeis.length, "mesma quantidade de papeis nos dois lados", `codigo ${Object.keys(P.ESTADO_POR_PAPEL).length}, registry ${papeis.length}`);
for (const p of papeis) {
  ok(P.ESTADO_POR_PAPEL[p.id] === p.estadoPadrao, `${p.id}: estado padrao bate`, `registry ${p.estadoPadrao}, codigo ${P.ESTADO_POR_PAPEL[p.id]}`);
  ok(P.ESTADO_ALTERNATIVO[p.id] === p.estadoAlternativo, `${p.id}: estado alternativo bate`);
}

console.log("\nALTERNANCIA APLICADA (o comportamento, nao so os numeros)");
const beats = [
  { id: "b1", papel: "gancho", startFrame: 0, endFrameExclusive: 300 },
  { id: "b2", papel: "tensao", startFrame: 300, endFrameExclusive: 600 },
  { id: "b3", papel: "epifania", startFrame: 600, endFrameExclusive: 900 },
  { id: "b4", papel: "tese", startFrame: 900, endFrameExclusive: 1200 },
  { id: "b5", papel: "cta", startFrame: 1200, endFrameExclusive: 1500 },
];
const r = P.regraDeAlternancia(beats);
ok(r.estados[0] === "A", "abre em A");
ok(r.estados[4] === "A", "fecha em A");
ok(!r.estados.some((e, i) => i > 0 && e === "B" && r.estados[i - 1] === "B"), "nao deixou dois B seguidos", r.estados.join(" "));
ok(r.percentualTelaCheia > 0, "gerou tela cheia a partir dos papeis", `${r.percentualTelaCheia}%`);
console.log(`        sequencia: ${r.estados.join(" ")} (${r.percentualTelaCheia}% de tela cheia)`);

console.log("\nTITULO PERSISTENTE (secao 4)");
const t = P.titulosPersistentes([
  { id: "b1", topic: "antes" },
  { id: "b2", topic: "antes" },
  { id: "b3", topic: "antes" },
  { id: "b4", topic: "antes" },
  { id: "b5", topic: "depois" },
]);
ok(t[0].reaproveitaEsquema === false, "o primeiro beat abre o esquema");
ok(t[1].reaproveitaEsquema && t[2].reaproveitaEsquema, "beats do mesmo assunto reaproveitam o esquema");
ok(t[3].reaproveitaEsquema === false, "o quarto beat do mesmo assunto troca de esquema (teto de 3 titulos)");
ok(t[4].reaproveitaEsquema === false, "assunto novo abre esquema novo");

console.log(
  falhas === 0
    ? "\nTUDO PASSOU: registry e codigo dizem a mesma coisa.\n"
    : `\n${falhas} FALHA(S). O registry e o palco.ts divergiram: alinhar os dois antes de renderizar.\n`
);
process.exit(falhas === 0 ? 0 : 1);
