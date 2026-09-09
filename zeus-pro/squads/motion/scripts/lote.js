#!/usr/bin/env node
/**
 * lote.js — vira uma gravação longa em várias produções de uma vez.
 *
 * O CAMINHO: `minerar-ganchos.js` acha os cortes, este script prepara cada um
 * como produção pronta para render. Um lote é uma pasta datada com N produções
 * irmãs, cada uma com a sua fatia de transcrição, o gancho identificado e a
 * ficha. Nada sai do lote sem passar pela revisão de aprendizado.
 *
 * SALVAGUARDAS, porque volume é onde se perde material:
 *   1. Lote NUNCA escreve dentro de produção existente. Pasta nova, sempre.
 *   2. Recusa começar se a pasta do lote já existir com conteúdo.
 *   3. Entrega já aprovada é intocável: o lote nem enxerga `entregas/`.
 *   4. Corte de mídia sempre em arquivo NOVO, o original nunca é tocado.
 *   5. Sem `--aplicar`, nada é gravado.
 *
 * Uso:
 *   node scripts/lote.js --de <transcricao> [--midia <arquivo>] [--cortes 1,3,5]
 *                        [--nome <slug>] [--quantos 6] [--aplicar]
 */

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const MOTION = path.resolve(__dirname, "..");
const LOTES = path.join(MOTION, "output", "_lotes");
const { minerar, lerTranscricao, emFrases } = require("./minerar-ganchos.js");

const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
const slugar = (s) =>
  String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48);

/** Palavras que não ajudam a nomear nada. */
const VAZIAS_NOME = new Set(
  ("a as o os um uma de do da dos das em no na por para pra com sem que se quando como e ou mas " +
   "voce ele ela eu nos tem ter ser esta e nao mais muito ja so tambem isso esse essa aquele").split(/\s+/)
);

/**
 * Nome de composition a partir do gancho. Precisa ser PascalCase, porque é o id
 * que o Remotion carrega e é o que o `new-composition.js` exige.
 */
function nomeDeComposition(gancho, i) {
  const limpo = String(gancho).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const palavras = limpo.split(/[^a-z0-9]+/).filter((p) => p.length > 2 && !VAZIAS_NOME.has(p)).slice(0, 3);
  const base = palavras.map((p) => p[0].toUpperCase() + p.slice(1)).join("");
  return (base || "Corte" + i) + "Reels";
}

/** Nome do corte tirado do próprio gancho: é o que se procura depois. */
function nomeDoCorte(gancho, i) {
  const limpo = gancho
    .replace(/^(o|a|os|as|um|uma|de|do|da|que|quando|se|e|entao)\s+/i, "")
    .split(/\s+/).slice(0, 5).join(" ");
  return `${String(i).padStart(2, "0")}-${slugar(limpo) || "corte"}`;
}

/**
 * Registra a composition no `Root.tsx`. O `new-composition.js` só imprime a
 * instrução de fazer isso à mão, o que funciona para uma peça e não funciona
 * para um lote de dez: sem o registro, o gate reprova todas com "não registrada
 * no Root.tsx".
 *
 * Escreve o mesmo formato das que já estão lá, e nunca duplica: composition já
 * registrada é deixada como está.
 */
function registrarNoRoot(nome) {
  const rootPath = path.join(MOTION, "src", "Root.tsx");
  let src = fs.readFileSync(rootPath, "utf8");
  if (src.includes(`id="${nome}"`)) return "ja estava";

  // o nome da constante de duração segue o padrão do gerador: PascalCase virado
  // em MAIUSCULO_COM_UNDERSCORE
  const constDur = "TOTAL_FRAMES_" + nome.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toUpperCase();
  const imp = `import { ${nome}, ${constDur} } from "./compositions/${nome}";`;

  const linhas = src.split("\n");
  let ultimoImport = -1;
  for (let i = 0; i < linhas.length; i++) {
    if (/^import .* from "\.\/compositions\//.test(linhas[i])) ultimoImport = i;
  }
  if (ultimoImport === -1) throw new Error("nao achei os imports de composition no Root.tsx");
  linhas.splice(ultimoImport + 1, 0, imp);
  src = linhas.join("\n");

  const fps = lerFpsDaComposition(nome);
  const bloco = [
    "      <Composition",
    `        id="${nome}"`,
    `        component={${nome}}`,
    `        durationInFrames={${constDur}}`,
    `        fps={${fps}}`,
    "        width={1080}",
    "        height={1920}",
    "      />",
    "",
  ].join("\n");

  // entra logo antes do fechamento do fragmento que agrupa as compositions
  const fecha = src.lastIndexOf("    </>");
  if (fecha === -1) throw new Error("nao achei onde fecha a lista de compositions no Root.tsx");
  src = src.slice(0, fecha) + bloco + src.slice(fecha);

  fs.writeFileSync(rootPath, src, "utf8");
  return "registrada";
}

/** O fps declarado nos tokens da composition, para o Root não mentir sobre ele. */
function lerFpsDaComposition(nome) {
  try {
    const t = fs.readFileSync(path.join(MOTION, "src", "compositions", nome, "tokens.ts"), "utf8");
    const m = /export const FPS\s*=\s*(\d+)/.exec(t);
    return m ? Number(m[1]) : 30;
  } catch {
    return 30;
  }
}

/** A fatia da transcrição que pertence a um corte, com o tempo zerado. */
function fatiar(frases, de, ate) {
  return frases
    .filter((f) => f.start >= de - 0.01 && f.end <= ate + 0.01)
    .map((f) => ({ texto: f.texto, start: +(f.start - de).toFixed(3), end: +(f.end - de).toFixed(3) }));
}

function main() {
  const argv = process.argv.slice(2);
  const pegar = (n) => {
    const i = argv.indexOf("--" + n);
    return i !== -1 ? argv[i + 1] : null;
  };
  const aplicar = argv.includes("--aplicar");
  const criarComposition = argv.includes("--criar-composition");
  const renderizar = argv.includes("--renderizar");
  const transcricao = pegar("de");
  const midia = pegar("midia");
  const quantos = Number(pegar("quantos") || 8);

  if (!transcricao) {
    console.error("Uso: node scripts/lote.js --de <transcricao> [--midia <arquivo>] [--cortes 1,3] [--aplicar]");
    return 1;
  }
  if (!fs.existsSync(transcricao)) {
    console.error(`Erro: nao achei ${transcricao}`);
    return 1;
  }
  if (midia && !fs.existsSync(midia)) {
    console.error(`Erro: nao achei a midia ${midia}`);
    return 1;
  }

  const r = minerar(transcricao, { quantos, min: 20, max: 75 });
  if (!r.candidatos.length) {
    console.error("Nenhum corte aprovado nesta gravacao. Nada a fazer.");
    return 3;
  }

  const filtro = pegar("cortes");
  const escolhidos = filtro
    ? filtro.split(",").map((n) => r.candidatos[Number(n.trim()) - 1]).filter(Boolean)
    : r.candidatos;

  const nomeLote = pegar("nome") || slugar(path.basename(transcricao, path.extname(transcricao)));
  const dirLote = path.join(LOTES, nomeLote);

  console.log(`\nLote "${nomeLote}"`);
  console.log(`  origem:  ${path.basename(transcricao)} (${mmss(r.duracaoS)})`);
  console.log(`  midia:   ${midia ? path.basename(midia) : "nenhuma, so a transcricao"}`);
  console.log(`  cortes:  ${escolhidos.length} de ${r.candidatos.length} aprovados\n`);

  // SALVAGUARDA 2: lote existente com conteudo nunca e sobrescrito
  if (fs.existsSync(dirLote) && fs.readdirSync(dirLote).length) {
    console.error(`Erro: ja existe conteudo em output/_lotes/${nomeLote}.`);
    console.error("Escolha outro --nome. Lote nao sobrescreve lote: material perdido nao volta.");
    return 1;
  }

  const frases = emFrases(lerTranscricao(transcricao));
  const plano = escolhidos.map((c, i) => ({
    corte: c,
    nome: nomeDoCorte(c.gancho, i + 1),
    trechos: fatiar(frases, c.de, c.ate),
  }));

  for (const p of plano) {
    console.log(`  ${p.nome}`);
    console.log(`    ${mmss(p.corte.de)} a ${mmss(p.corte.ate)} (${p.corte.duracao}s), nota ${p.corte.nota}`);
    console.log(`    ${p.corte.gatilhos.join(", ")}`);
    console.log(`    "${p.corte.gancho.slice(0, 78)}"`);
  }

  const opts = { criarComposition: criarComposition || renderizar, renderizar, estilo: pegar("estilo") };

  if (!aplicar) {
    console.log(`\nSIMULACAO. Nada gravado. Rode com --aplicar para criar as ${plano.length} pastas.\n`);
    return 0;
  }

  fs.mkdirSync(dirLote, { recursive: true });
  for (const p of plano) {
    const dir = path.join(dirLote, p.nome);
    fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(
      path.join(dir, "narration.json"),
      JSON.stringify({
        _leia: "Fatia da gravacao original, com o tempo zerado no inicio do corte.",
        origem: path.basename(transcricao),
        na_origem: { de: p.corte.de, ate: p.corte.ate },
        gancho: p.corte.gancho,
        gatilhos: p.corte.gatilhos,
        segments: p.trechos,
      }, null, 2) + "\n",
      "utf8"
    );

    fs.writeFileSync(
      path.join(dir, "producao.json"),
      JSON.stringify({
        _leia: "Producao nascida de lote. O tema sai do gancho; conferir antes do render.",
        lote: nomeLote,
        tema: p.corte.gancho.slice(0, 60),
        gancho: p.corte.gancho,
        gatilhos: p.corte.gatilhos,
        nota_do_gancho: p.corte.nota,
        duracao_s: p.corte.duracao,
        origem: { arquivo: path.basename(transcricao), de: p.corte.de, ate: p.corte.ate },
        estado: "rascunho",
      }, null, 2) + "\n",
      "utf8"
    );

    // SALVAGUARDA 4: o corte de midia sai em arquivo NOVO, o original intacto
    if (midia) {
      const saida = path.join(dir, "bruto" + path.extname(midia));
      const rr = spawnSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-ss", String(p.corte.de),
        "-to", String(p.corte.ate), "-i", midia, "-c", "copy", "-y", saida], { encoding: "utf8" });
      if (rr.status !== 0) {
        console.log(`    ${p.nome}: corte de midia falhou, ${(rr.stderr || "").trim().slice(0, 90)}`);
      }
    }
  }

  // Do corte à composition: o esqueleto vem do `new-composition.js`, que nasce do
  // núcleo. Copiar composition antiga era o hábito que gerava 700 linhas de
  // animação crua por peça, e é o que aquele script existe para matar.
  if (opts.criarComposition) {
    console.log("");
    for (const p of plano) {
      const nome = nomeDeComposition(p.corte.gancho, plano.indexOf(p) + 1);
      const destino = path.join(MOTION, "src", "compositions", nome);
      if (fs.existsSync(destino)) {
        // Pasta existente nunca é sobrescrita, mas o registro no Root é
        // conferido do mesmo jeito: composition criada e não registrada é
        // exatamente o estado que faz o gate reprovar depois.
        const reg = registrarNoRoot(nome);
        console.log(`  ${nome}: ja existia, ${reg} no Root`);
        p.composition = nome;
        continue;
      }
      const r = spawnSync("node", ["scripts/new-composition.js", nome, "--estilo", opts.estilo || "zeus"],
        { cwd: MOTION, encoding: "utf8" });
      if (r.status !== 0) {
        console.log(`  ${nome}: nao consegui criar (${(r.stderr || r.stdout || "").trim().split("\n")[0]})`);
        continue;
      }
      // a fala do corte vira a narração da composition nova
      const dataDir = path.join(destino, "data");
      fs.mkdirSync(dataDir, { recursive: true });
      fs.writeFileSync(
        path.join(dataDir, "narration.json"),
        JSON.stringify({
          _leia: "Fatia da gravacao original. Tempo zerado no inicio do corte.",
          origem: path.basename(transcricao),
          na_origem: { de: p.corte.de, ate: p.corte.ate },
          gancho: p.corte.gancho,
          durationSec: p.corte.duracao,
          segments: p.trechos,
        }, null, 2) + "\n",
        "utf8"
      );
      registrarNoRoot(nome);
      p.composition = nome;
      console.log(`  ${nome}: criada e registrada, ${p.trechos.length} trecho(s) de fala`);
    }
  }

  fs.writeFileSync(
    path.join(dirLote, "LEIA-ME.md"),
    [
      `# Lote ${nomeLote}`,
      "",
      `${plano.length} cortes tirados de \`${path.basename(transcricao)}\` (${mmss(r.duracaoS)} de gravação).`,
      "",
      "Cada pasta é um corte, com a fatia da transcrição e o gancho que o justificou.",
      "Nenhum foi renderizado ainda: são rascunhos para virar produção.",
      "",
      "| Corte | Na gravação | Duração | Nota | Gancho |",
      "|---|---|---|---|---|",
      ...plano.map((p) =>
        `| ${p.nome} | ${mmss(p.corte.de)} a ${mmss(p.corte.ate)} | ${p.corte.duracao}s | ${p.corte.nota} | ${p.corte.gancho.slice(0, 60)} |`
      ),
      "",
      "## Régua",
      "",
      "O gancho de cada corte passou pelo gate de `hook-intelligence`: pelo menos um",
      "gatilho mental, abertura que não começa em emenda nem na primeira pessoa do",
      "mentor. Nota maior é gatilho mais forte e mais perto da abertura.",
      "",
      "## Próximo passo",
      "",
      "```bash",
      "node scripts/aprendizado.js --revisar <Composition>",
      "```",
    ].join("\n"),
    "utf8"
  );

  console.log(`\n${plano.length} pastas criadas em output/_lotes/${nomeLote}/`);
  console.log("Nenhuma producao existente foi tocada. Original intacto.\n");

  if (opts.renderizar) return renderizarLote(plano, nomeLote);
  return 0;
}

/**
 * Renderiza cada produção do lote, com o gate no meio. Produção que reprovar
 * para e é reportada; as outras seguem, porque um corte ruim não pode segurar
 * os outros nove.
 *
 * A saída de cada etapa NÃO entra inteira aqui: render e ffmpeg despejam
 * milhares de linhas, e num terminal de agente isso é token repago em todo
 * turno seguinte. Só a última linha e o veredito.
 */
function renderizarLote(plano, nomeLote) {
  const comComp = plano.filter((p) => p.composition);
  if (!comComp.length) {
    console.error("Nenhuma producao do lote tem composition. Rode com --criar-composition antes.");
    return 1;
  }

  console.log(`Renderizando ${comComp.length} producao(oes) do lote ${nomeLote}\n`);
  const resultado = [];

  for (const p of comComp) {
    const etapas = [
      ["conferencia antes do render", ["scripts/pre-render-validate.js", p.composition]],
      ["render", ["scripts/render.js", p.composition]],
      ["revisao de aprendizado", ["scripts/aprendizado.js", "--revisar", p.composition]],
    ];
    let parouEm = null;
    let motivo = "";
    for (const [nome, args] of etapas) {
      const r = spawnSync("node", args, { cwd: MOTION, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
      if (r.status !== 0) {
        parouEm = nome;
        const saida = ((r.stdout || "") + (r.stderr || "")).trim().split("\n");
        motivo = saida.filter((l) => /ERRO|FALHA|REPROVADO|Error/i.test(l)).slice(0, 2).join(" | ")
          || saida[saida.length - 1] || "sem mensagem";
        break;
      }
    }
    if (parouEm) {
      console.log(`  REPROVADO  ${p.composition}  em: ${parouEm}`);
      console.log(`             ${motivo.slice(0, 150)}`);
      resultado.push({ comp: p.composition, ok: false, parouEm });
    } else {
      console.log(`  OK         ${p.composition}`);
      resultado.push({ comp: p.composition, ok: true });
    }
  }

  const bons = resultado.filter((r) => r.ok).length;
  console.log(`\n${bons} de ${resultado.length} renderizadas e aprovadas.`);
  if (bons < resultado.length) {
    console.log("As reprovadas nao foram entregues. Corrigir e rodar de novo so elas.\n");
  } else {
    console.log("");
  }
  return bons === resultado.length ? 0 : 2;
}

if (require.main === module) process.exit(main());
