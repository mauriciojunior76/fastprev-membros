#!/usr/bin/env node
/**
 * new-composition.js — scaffold de composition nova (reforma 26/08/2026,
 * Zeus Visual Intelligence / pedido direto do o dono do canal).
 *
 * Existe pra matar o hábito real que gerava o problema relatado: composition
 * nova nascia de COPIAR um arquivo antigo (500 a 750 linhas de CSS/animação
 * cru cada), nunca do núcleo. Este script gera o esqueleto mínimo já
 * suavizado: choreography.ts com o contrato defineSpec(), tokens.ts puxando
 * cor e fonte do snapshot design-core-brands.ts (a mesma fonte única que
 * squads/motion/src/brand/loader.ts usa), e index.tsx importando TUDO
 * de core/ (nunca spring()/interpolate() cru do Remotion — os dois checks
 * novos de scripts/choreo-lint.js reprovam isso).
 *
 * Uso:
 *   node scripts/new-composition.js NomeDaComposition --estilo exemplo-1
 *   node scripts/new-composition.js NomeDaComposition --estilo exemplo-2
 *   node scripts/new-composition.js NomeDaComposition --estilo zeus
 *
 * Base: src/compositions/_casos/CasoEstatistica (85 linhas, tudo do núcleo).
 * Não inventa template novo — só parametriza esse padrão já aprovado.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const COMPOSITIONS_DIR = path.join(ROOT, "src", "compositions");
const BRANDS_FILE = path.join(ROOT, "src", "core", "themes", "generated", "design-core-brands.ts");

const args = process.argv.slice(2);
const NAME = args.find((a) => !a.startsWith("--"));
const estiloIdx = args.indexOf("--estilo");
const ESTILO = estiloIdx >= 0 ? args[estiloIdx + 1] : "zeus";

// ─── estilo de traço: muda a estrutura do desenho, não só a cor ─────────────
// Quem recebe o pacote escolhe o estilo no onboarding e a paleta sai da marca
// dele (src/brand/marca.json). Estes três nomes não são marcas do registry:
// são formas de desenhar, e a cor vem de quem está usando.
const ESTILOS_DE_TRACO = {
  "apple-conceitual": { borda: 2, raioCartao: 32, raioCelula: 24, serifa: false },
  classico: { borda: 3, raioCartao: 12, raioCelula: 8, serifa: true },
  proprio: { borda: 2, raioCartao: 20, raioCelula: 14, serifa: false },
};
const ehEstiloDeTraco = Object.prototype.hasOwnProperty.call(ESTILOS_DE_TRACO, ESTILO);

if (!NAME || !/^[A-Z][A-Za-z0-9]*$/.test(NAME)) {
  console.error(
    "Uso: node scripts/new-composition.js NomeDaComposition --estilo exemplo-1|exemplo-2|zeus\n" +
      "Nome precisa ser PascalCase (ex.: MinhaComposicaoNova), igual ao id do <Composition/> no Root.tsx."
  );
  process.exit(1);
}

if (fs.existsSync(path.join(COMPOSITIONS_DIR, NAME))) {
  console.error(`Já existe src/compositions/${NAME}/. Escolher outro nome ou apagar a pasta antes.`);
  process.exit(1);
}

// ─── estilo de traço: a paleta vem da marca de quem está usando ─────────────
let brand = null;
let traco = null;

if (ehEstiloDeTraco) {
  traco = ESTILOS_DE_TRACO[ESTILO];
  const { conferir } = require("./marca-check.js");
  const gate = conferir();
  const MARCA_PATH = path.join(ROOT, "src", "brand", "marca.json");
  if (!gate.ok || !gate.marca) {
    console.error("\nA marca do vídeo ainda não está pronta:\n");
    gate.problemas.forEach((p) => console.error("  - " + p));
    console.error(
      "\nRode o passo Marca no vídeo do boot da inteligência, ou peça: " +
        '"configura a marca do meu vídeo".\n'
    );
    process.exit(1);
  }
  const m = gate.marca;
  const paleta = Array.isArray(m.paleta) ? m.paleta : Object.values(m.cores || {});
  brand = {
    client: m.nome || "minha-marca",
    colors: {
      bg: paleta[0],
      text: paleta[1],
      text_secondary: paleta[2] || paleta[1],
      accent: paleta[3] || paleta[2] || paleta[1],
    },
    typography: {
      display: (m.tipografia && m.tipografia.titulo) || (traco.serifa ? "Georgia" : "Inter"),
    },
  };
  console.log(`estilo de traço: ${ESTILO} (paleta lida de ${path.relative(ROOT, MARCA_PATH)})`);
}

// ─── lê a paleta do estilo escolhido, do snapshot gerado por sync-design-core.js ──
if (!ehEstiloDeTraco && !fs.existsSync(BRANDS_FILE)) {
  console.error(
    `Snapshot de marca não existe ainda: ${path.relative(ROOT, BRANDS_FILE)}\n` +
      "Rodar primeiro: a ferramenta de sincronizacao de marca (nao incluida: o arquivo ja vem pronto)"
  );
  process.exit(1);
}
const brandsSrc = ehEstiloDeTraco ? "" : fs.readFileSync(BRANDS_FILE, "utf8");
const brandKey = ESTILO.toLowerCase();
const brandMatch = ehEstiloDeTraco
  ? true
  : brandsSrc.match(
      new RegExp(`"${brandKey}":\\s*BRAND_${brandKey.toUpperCase().replace(/-/g, "_")}`)
    );
if (!brandMatch) {
  console.error(
    `Estilo "${ESTILO}" não existe em design-core-brands.ts. Opções hoje: exemplo-1, exemplo-2, zeus.\n` +
      "Marca nova? Criar o JSON em templates/design-tokens/brands/ e rodar a ferramenta de sincronizacao de marca (nao incluida: o arquivo ja vem pronto)."
  );
  process.exit(1);
}
// extrai o bloco BRAND_<NOME> inteiro (regex simples: o gerador sempre produz JSON.stringify de 2 espaços)
if (!ehEstiloDeTraco) {
  const blockRe = new RegExp(
    `export const BRAND_${brandKey.toUpperCase().replace(/-/g, "_")}: BrandConfig = (\\{[\\s\\S]*?\\n\\};)`
  );
  const blockMatch = brandsSrc.match(blockRe);
  brand = JSON.parse(blockMatch[1].replace(/;$/, ""));
}

// ─── nomes derivados ────────────────────────────────────────────────────────
const snake = NAME.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toUpperCase();
const TOTAL_FRAMES_CONST = `TOTAL_FRAMES_${snake}`;
const compDir = path.join(COMPOSITIONS_DIR, NAME);
fs.mkdirSync(compDir, { recursive: true });

// ─── tokens.ts ──────────────────────────────────────────────────────────────
const cabecalhoTokens = traco
  ? `/**
 * ${NAME}/tokens.ts — cor e fonte vêm da SUA marca (src/brand/marca.json),
 * no estilo de traço "${ESTILO}". Mudar a identidade nasce lá, nunca aqui:
 * edite a marca e rode new-composition.js de novo.
 */`
  : `/**
 * ${NAME}/tokens.ts — cor e fonte vêm de templates/design-tokens/brands/${brand.client}.json,
 * via o snapshot squads/motion/src/core/themes/generated/design-core-brands.ts
 * (gerado por a ferramenta de sincronizacao de marca (nao incluida: o arquivo ja vem pronto)). Mudar a marca nasce no design-core,
 * nunca aqui — regenerar o snapshot e rodar new-composition.js de novo se precisar.
 */`;

const tokensTs = `${cabecalhoTokens}

export const COLORS = {
  bg: "${brand.colors.bg}",
  text: "${brand.colors.text}",
  textMuted: "${brand.colors.text_secondary}",
  accent: "${brand.colors.accent}",
} as const;

export const FONT = {
  family: ${JSON.stringify(brand.typography.display)},
} as const;
${
  traco
    ? `
/** Estilo de traço "${ESTILO}": estrutura do desenho, não só a cor. */
export const TRACO = {
  borda: ${traco.borda},
  raioCartao: ${traco.raioCartao},
  raioCelula: ${traco.raioCelula},
  serifa: ${traco.serifa},
} as const;
`
    : ""
}
export const FPS = 30;
`;
fs.writeFileSync(path.join(compDir, "tokens.ts"), tokensTs, "utf8");

// ─── choreography.ts ────────────────────────────────────────────────────────
const choreographyTs = `/**
 * ${NAME}/choreography.ts — SceneSpec desta composition (contrato em
 * core/choreo.ts). Editar as cenas e os elementos, nunca escrever direção,
 * distância ou duração de entrada/saída direto no index.tsx: quem decide
 * "de onde entra e quando" é este arquivo, o palco só executa via
 * applyChoreo() de core/choreo-runtime.
 */
import { defineSpec, alternateDir } from "../../core/choreo";

export default defineSpec({
  composition: "${NAME}",
  fps: 30,
  scenes: [
    {
      name: "principal",
      from: 0,
      dur: 90,
      exitF: 66,
      elements: [
        { id: "titulo", role: "hero", entry: { dir: alternateDir(0) }, exit: { dir: alternateDir(0) } },
        { id: "subtitulo", role: "label", entry: { dir: alternateDir(0), delayF: 8 } },
      ],
    },
  ],
});
`;
fs.writeFileSync(path.join(compDir, "choreography.ts"), choreographyTs, "utf8");

// ─── index.tsx ──────────────────────────────────────────────────────────────
const indexTsx = `/**
 * ${NAME} — gerado por scripts/new-composition.js (estilo: ${ESTILO}).
 * Preencher: texto real, timing real (choreography.ts), 1080x1920 ou
 * 1920x1080 conforme o formato pedido. Nunca trocar applyChoreo/ci por
 * spring()/interpolate() cru do Remotion: scripts/choreo-lint.js reprova.
 */
import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { applyChoreo } from "../../core/choreo-runtime";
import { COLORS, FONT } from "./tokens";
import spec from "./choreography";

const PRINCIPAL = spec.scenes[0];

const CenaPrincipal: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.bg, alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          ...applyChoreo(frame, PRINCIPAL, "titulo"),
          fontFamily: FONT.family,
          fontSize: 72,
          fontWeight: 800,
          color: COLORS.text,
          textAlign: "center",
        }}
      >
        Título aqui
      </div>
      <div
        style={{
          ...applyChoreo(frame, PRINCIPAL, "subtitulo"),
          marginTop: 16,
          fontFamily: FONT.family,
          fontSize: 28,
          fontWeight: 500,
          color: COLORS.textMuted,
          textAlign: "center",
        }}
      >
        Subtítulo aqui
      </div>
    </AbsoluteFill>
  );
};

export const ${TOTAL_FRAMES_CONST} = PRINCIPAL.from + PRINCIPAL.dur;

export const ${NAME}: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={PRINCIPAL.from} durationInFrames={PRINCIPAL.dur}>
      <CenaPrincipal />
    </Sequence>
  </AbsoluteFill>
);
`;
fs.writeFileSync(path.join(compDir, "index.tsx"), indexTsx, "utf8");

// ─── output ─────────────────────────────────────────────────────────────────
console.log(`\nGerado src/compositions/${NAME}/ (estilo ${ESTILO}, marca ${brand.client}):`);
console.log(`  - choreography.ts (1 cena, 2 elementos, editar timing aqui)`);
console.log(`  - tokens.ts (cor e fonte de ${brand.client})`);
console.log(`  - index.tsx (esqueleto, preencher texto real)`);
console.log(`\nPróximos passos:`);
console.log(`  1. node scripts/choreo-lint.js ${NAME}          (deve passar OK antes de continuar)`);
console.log(`  2. Registrar no Root.tsx (import no topo + <Composition/> no corpo):`);
console.log(
  `     import { ${NAME}, ${TOTAL_FRAMES_CONST} } from "./compositions/${NAME}";`
);
console.log(
  `     <Composition id="${NAME}" component={${NAME}} durationInFrames={${TOTAL_FRAMES_CONST}} fps={30} width={1080} height={1920} />`
);
console.log(`  3. node scripts/pre-render-validate.js ${NAME}`);
console.log(`  4. node scripts/render.js ${NAME} draft <nome-do-arquivo>`);
