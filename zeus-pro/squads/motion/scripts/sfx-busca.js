#!/usr/bin/env node
/**
 * sfx-busca: acha o som certo pela INTENCAO da cena.
 *
 * O catalogo responde "quais sons existem". Na producao a pergunta e outra:
 * "esta cena esta fazendo o que?". Este script traduz uma para a outra.
 *
 * A fonte e sempre o public/_sfx/catalogo.json, entao a busca nunca fica
 * desatualizada em relacao ao banco: som novo catalogado ja aparece aqui.
 *
 *   node scripts/sfx-busca.js "a cena mostra que deu certo"
 *   node scripts/sfx-busca.js --tudo
 */
const fs = require("fs");
const path = require("path");

const CAT = path.join(__dirname, "..", "public", "_sfx", "catalogo.json");
const catalogo = JSON.parse(fs.readFileSync(CAT, "utf8"));

/**
 * O dicionario de intencao: as palavras que a gente usa para DESCREVER a cena,
 * apontando para a categoria do catalogo. Termo novo entra aqui, nunca no
 * codigo da busca.
 */
const INTENCAO = {
  "erro-na-tela": [
    "erro", "errado", "nao e isso", "furou", "falhou", "x vermelho", "descarta",
    "nao funciona", "caminho errado", "burrada",
  ],
  "certo-na-tela": [
    "acerta", "acertou", "lado certo", "esse sim", "o correto", "certinho",
  ],
  contagem: [
    "contador", "contagem", "numero correndo", "numero sobe", "porcentagem",
    "conta", "acumula",
  ],
  "tempo-passando": [
    "tempo", "cronometro", "prazo", "urgencia", "relogio", "tempo passando",
    "correndo contra o tempo", "acabando",
  ],
  "risco-alerta": [
    "risco", "alerta", "alarme", "perigo", "cuidado", "perde", "perda",
    "custa caro", "erro comum", "tensao",
  ],
  "revelacao-importante": [
    "importante", "mais importante", "revelacao", "revela", "clima", "luminoso",
    "brilho", "especial", "momento", "climax", "virada grande", "bom", "premium",
  ],
  confirmacao: [
    "certo", "deu certo", "check", "aprovado", "valida", "validou", "confirma",
    "confirmacao", "sela", "selo de certo", "ok", "formulario", "enviou", "aceito",
  ],
  "transicao-com-chegada": [
    "transicao", "passagem", "movimento", "viaja", "assenta", "chega", "abre",
    "expande", "desliza", "termina em", "para no lugar", "muda de bloco",
  ],
  "venda-acontece": [
    "venda", "vende", "compra", "comprar", "dinheiro", "cifrao", "faturou",
    "pagou", "cliente comprou", "caixa",
  ],
  "comparacao-veredito": [
    "comparacao", "veredito", "certo e errado", "badge", "carimbo", "julga",
    "melhor", "pior", "contra",
  ],
  "grafico-sobe": ["grafico", "sobe", "cresce", "escala", "range", "curva", "aumenta"],
  jornada: ["jornada", "etapa", "passo", "caminho", "de um ponto a outro", "partida", "chegada"],
  "serie-itens": ["lista", "itens", "sequencia", "varios", "cascata", "um por um", "desdobra"],
  "palavra-conceito": ["palavra", "conceito", "termo", "traco", "sublinhado", "enfase"],
  "frase-grande": ["frase", "frase grande", "texto grande"],
  "numero-protagonista": ["numero", "cifra", "estatistica", "dado grande"],
  "interface-mensagem": ["mensagem", "chat", "whatsapp", "notificacao", "conversa"],
  revelacao: ["entrada", "aparece", "nasce", "surge", "entra em cena"],
  "conceito-com-icone": ["icone", "simbolo", "objeto"],
  "selo-zeus": ["selo zeus", "assinatura", "fecho", "final"],
  "selo-exemplo": ["selo exemplo", "logo exemplo"],
  "check-aprovacao": ["carimbo de aprovado", "selado"],
  "grade-conteudos": ["grade", "modulos", "cards"],
  "objeto-3d": ["objeto 3d", "produto"],
};

/** Tira acento e caixa, para "revelação" achar "revelacao". */
const normal = (s) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/** A ficha completa do som que uma categoria toca em um gesto. */
function somDoGesto(decl) {
  const peso = typeof decl === "object" ? decl.peso : decl;
  const familia = typeof decl === "object" ? decl.familia : null;
  if (familia) {
    const achado = Object.entries(catalogo.sons || {}).find(
      ([, v]) => v.familia === familia && v.peso === peso
    );
    if (achado) return { arquivo: achado[0], ficha: achado[1], peso, familia };
  }
  const linha = (catalogo.tabela_de_peso || {})[String(peso)] || {};
  return {
    arquivo: linha.som || "(sem som)",
    ficha: (catalogo.sons || {})[linha.som] || {},
    peso,
    familia: null,
  };
}

function mostrar(cat, motivo) {
  const c = catalogo.categorias[cat];
  if (!c || typeof c !== "object" || !c.gestos) return;
  console.log(`\n${cat}${motivo ? "   <- " + motivo : ""}`);
  if (c.descricao) console.log(`  ${c.descricao}`);
  if (c._leia) console.log(`  ATENCAO: ${c._leia}`);
  for (const [gesto, decl] of Object.entries(c.gestos)) {
    const s = somDoGesto(decl);
    const d = s.ficha.duracao_s ? `${s.ficha.duracao_s}s` : "";
    const p = s.ficha.pico_s !== undefined ? `pico ${s.ficha.pico_s}s` : "";
    console.log(`  gesto "${gesto}"  peso ${s.peso}  ->  ${s.arquivo}  ${d} ${p}`);
    if (s.ficha.usar_em) console.log(`     usar em: ${s.ficha.usar_em}`);
    if (s.ficha.nao_usar_em) console.log(`     NAO usar em: ${s.ficha.nao_usar_em}`);
    console.log(
      `     declarar: { categoria: "${cat}", gesto: "${gesto}" }` +
        (s.familia ? `   (a familia "${s.familia}" ja esta no catalogo)` : "")
    );
  }
}

const arg = process.argv.slice(2).join(" ").trim();

if (!arg || arg === "--tudo") {
  console.log("Biblioteca de som por intencao. Uso:");
  console.log('  node scripts/sfx-busca.js "a cena mostra que deu certo"\n');
  console.log("Categorias disponiveis:");
  for (const cat of Object.keys(catalogo.categorias)) {
    if (cat.startsWith("_")) continue;
    const termos = (INTENCAO[cat] || []).slice(0, 5).join(", ");
    console.log(`  ${cat.padEnd(26)} ${termos}`);
  }
  process.exit(0);
}

const alvo = normal(arg);
const placar = [];
// A forca de um casamento e QUANTOS termos da categoria aparecem na frase,
// e so em segundo lugar o tamanho do termo. Ordenar so por tamanho fazia
// "risco de perder dinheiro" cair em venda por causa de "dinheiro", que e
// uma palavra maior que "risco" mas casa sozinha.
for (const [cat, termos] of Object.entries(INTENCAO)) {
  if (!catalogo.categorias[cat]) continue;
  const casados = termos.filter((t) => alvo.includes(normal(t)));
  if (!casados.length) continue;
  const maior = casados.reduce((a, b) => (b.length > a.length ? b : a));
  placar.push({ cat, termo: maior, quantos: casados.length, forca: maior.length });
}
placar.sort((a, b) => b.quantos - a.quantos || b.forca - a.forca);

if (!placar.length) {
  console.log(`\nNada casou com "${arg}".`);
  console.log("Rode --tudo para ver as categorias, ou descreva a cena com outras");
  console.log("palavras. Se o termo devia existir, ele entra no dicionario INTENCAO");
  console.log("deste script, na mesma sessao.\n");
  process.exit(1);
}

console.log(`\nCena: "${arg}"`);
placar.slice(0, 3).forEach((p, i) => mostrar(p.cat, i === 0 ? `casou em "${p.termo}"` : `tambem: "${p.termo}"`));
console.log("");
