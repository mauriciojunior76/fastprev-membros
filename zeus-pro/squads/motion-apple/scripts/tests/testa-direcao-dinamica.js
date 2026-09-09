#!/usr/bin/env node
/**
 * testa-direcao-dinamica.js: regressao da regra de direcao dinamica.
 *
 * Cobre o que o olho nao pega numa peca pronta: se o papel narrativo sai certo
 * da fala, se a fronteira de palavra impede falso positivo, e se a regra de
 * alternancia (DIRECAO-DINAMICA secao 2) segura os estados de palco.
 *
 * Nasceu junto com a regra em 08/09/2026, depois que a primeira rodada em cima
 * da transcricao real do Paulo Ruiz classificou um beat de estrutura como
 * gancho: "repara" tinha casado dentro de "preparar" e "leva a" dentro de
 * "eleva a". Falso positivo de lexico nao aparece no video, aparece na cena
 * errada tres semanas depois.
 *
 * Uso: node scripts/tests/testa-direcao-dinamica.js
 */
const R = require("../lib/ds-registry");

let falhas = 0;
const ok = (cond, titulo, detalhe = "") => {
  if (cond) {
    console.log(`  ok    ${titulo}`);
  } else {
    falhas++;
    console.log(`  FALHA ${titulo}${detalhe ? "\n        " + detalhe : ""}`);
  }
};

console.log("\nFRONTEIRA DE PALAVRA (o gatilho nao pode casar dentro de outra palavra)");
const falsosPositivos = [
  ["eleva a barra do mercado", "leva a"],
  ["preparar o material antes", "repara"],
  ["as chamas demais", "mas"],
  ["o mesmo de antes", "mas"],
  ["clicando no botao", "clica"],
];
for (const [texto, gatilho] of falsosPositivos) {
  ok(!R.casaGatilho(R.norm(texto), gatilho), `"${gatilho}" NAO casa em "${texto}"`);
}

const verdadeiros = [
  ["mas eu fui la e testei", "mas"],
  ["entao voce faz assim", "entao"],
  ["caiu a ficha na hora", "caiu a ficha"],
  ["em vez de dez ferramentas", "em vez de"],
  ["quer uma prova disso", "quer uma prova"],
];
for (const [texto, gatilho] of verdadeiros) {
  ok(R.casaGatilho(R.norm(texto), gatilho), `"${gatilho}" casa em "${texto}"`);
}

console.log("\nPAPEL PELA FALA (secao 3 do manual)");
const papeis = [
  ["olha isso que acabou de sair", "gancho"],
  ["mas tem uma coisa acontecendo aqui", "tensao"],
  ["comecei a testar e pedir pra ele", "experimento"],
  ["pouco tempo atras eu precisaria de um software", "dor"],
  ["foi ai que caiu a ficha", "epifania"],
  ["a verdade e que isso ja esta acontecendo", "tese"],
  ["funciona assim porque o sistema aprende", "mecanismo"],
  ["isso muda muita coisa pra quem cria", "implicacao"],
  ["nao e uma ferramenta, e uma nova forma de criar", "reenquadramento"],
  ["em vez de dominar dez ferramentas diferentes", "contraste"],
  ["o que importa e saber pensar", "habilidade"],
  ["quer uma prova? esse video foi editado assim", "prova"],
  ["se voce quer aprender, entra pra comunidade", "cta"],
];
for (const [fala, esperado] of papeis) {
  const achado = R.papelPelaFala(fala);
  ok(achado === esperado, `"${fala.slice(0, 42)}" => ${esperado}`, achado ? `veio "${achado}"` : "veio nulo");
}

ok(R.papelPelaFala("hoje o tempo esta bom e o cafe acabou") === null,
  "fala sem gatilho nenhum devolve nulo (nunca chuta papel)");

console.log("\nREGISTRY (integridade)");
const roles = R.carregar().papeisNarrativos;
ok(roles.length === 13, `13 papeis no registry`, `tem ${roles.length}`);
ok(roles.every((p) => ["A", "B", "C"].includes(p.estadoPadrao)), "todo papel tem estado padrao valido");
ok(roles.every((p) => p.peso >= 0 && p.peso <= 10), "todo peso dentro da escala 0 a 10");
ok(roles.every((p) => p.equivaleA), "todo papel aponta o equivalente antigo do squad");
ok(roles.find((p) => p.id === "gancho").estadoPadrao === "A", "gancho abre no estado A");
ok(roles.find((p) => p.id === "cta").estadoPadrao === "A", "cta fecha no estado A");
ok(roles.filter((p) => p.estadoPadrao === "B").length >= 2, "existe papel que pede tela cheia escura");
ok(roles.filter((p) => p.estadoPadrao === "C").length >= 3, "existe papel que pede tela cheia clara");

console.log("\nESTADOS DE PALCO (secao 1)");
const A = R.estadoDePalco("vertical-mao", "A");
const B = R.estadoDePalco("vertical-mao", "B");
const C = R.estadoDePalco("vertical-mao", "C");
ok(A && A.temRosto === true, "estado A e o unico com rosto na tela");
ok(B && B.temRosto === false && C && C.temRosto === false, "estados B e C nao tem rosto");
ok(A.vertical.costura.y === 1039 && A.vertical.costura.h === 122, "costura do A na faixa de legenda do sistema (1039, 122px)");
ok(A.vertical.rosto.y === 1161 && A.vertical.rosto.h === 759, "rosto do A ocupa a metade de baixo");
ok(
  A.vertical.esquema.h + A.vertical.costura.h + A.vertical.rosto.h === 1920,
  "as tres faixas somam 1920 exatos, sem sobra nem sobreposicao"
);
ok(B.temLegenda === false && C.temLegenda === false, "sem legenda nos estados de tela cheia");
ok(R.estadoDePalco("reels-call", "A") === null, "reels-call nao usa estados dinamicos");

console.log("\nALTERNANCIA (secao 2)");
const regras = R.regrasDeAlternancia("vertical-mao");
ok(regras.rostoVoltaEmAteQuadros === 480, "rosto volta em ate 480 quadros");
ok(regras.abreEm === "A" && regras.fechaEm === "A", "abre e fecha no estado A");
ok(regras.cNaoAbre === true, "estado C nunca abre o video");
ok(regras.somaBCPercentualMin === 30 && regras.somaBCPercentualMax === 45, "tela cheia entre 30% e 45%");
ok(R.regrasDeAlternancia("reels-call") === null, "reels-call nao tem regra de alternancia");

console.log("\nPONTA A PONTA (fala vira sequencia de estados)");
// A fixture e a fala de um anuncio real percorrendo o arco inteiro, com os
// tempos por palavra. Prova o que nenhum teste unitario prova: que a
// classificacao mais a regra de alternancia produzem um video que alterna de
// verdade, em vez de virar oito cenas iguais.
{
  const { execFileSync } = require("child_process");
  const os = require("os");
  const fs = require("fs");
  const path = require("path");
  const saida = fs.mkdtempSync(path.join(os.tmpdir(), "direcao-dinamica-"));
  try {
    execFileSync(
      process.execPath,
      [
        path.join(__dirname, "..", "beats.js"),
        "--narration",
        path.join(__dirname, "fixtures", "narration-arco-completo.json"),
        "--out",
        saida,
        "--formato",
        "vertical-mao",
      ],
      { stdio: "pipe" }
    );
    const plano = JSON.parse(fs.readFileSync(path.join(saida, "02-beats.draft.json"), "utf8"));
    const seq = plano.beats.map((b) => b.stageState);
    const papeis = plano.beats.map((b) => b.role);

    ok(seq[0] === "A", "abre no estado A (quem fala aparece antes de qualquer tese)");
    ok(seq[seq.length - 1] === "A", "fecha no estado A (quem pede a acao e a pessoa)");
    ok(seq.includes("B"), "a fala gerou pelo menos um estado B", `veio ${seq.join(" ")}`);
    ok(seq.includes("C"), "a fala gerou pelo menos um estado C", `veio ${seq.join(" ")}`);
    ok(
      !seq.some((e, i) => i > 0 && e === "B" && seq[i - 1] === "B"),
      "nunca dois B seguidos"
    );
    ok(
      papeis.filter(Boolean).length >= plano.beats.length - 1,
      "quase todo beat saiu com papel classificado",
      `${papeis.filter(Boolean).length} de ${plano.beats.length}`
    );
    ok(papeis[0] === "gancho", "o primeiro beat foi lido como gancho", `veio ${papeis[0]}`);
    ok(papeis[papeis.length - 1] === "cta", "o ultimo beat foi lido como cta", `veio ${papeis[papeis.length - 1]}`);
    ok(
      plano.palco.percentualTelaCheia >= 30 && plano.palco.percentualTelaCheia <= 45,
      "tela cheia dentro da faixa de 30% a 45%",
      `veio ${plano.palco.percentualTelaCheia}%`
    );
    ok(plano.palco.avisos.length === 0, "sem aviso de alternancia nesta fala", plano.palco.avisos.join(" | "));
    console.log(`        sequencia obtida: ${seq.join(" ")}`);
  } finally {
    fs.rmSync(saida, { recursive: true, force: true });
  }
}

console.log("\nCENA SOB DEMANDA (secao 11: sem recurso pronto, compoe)");
{
  const { execFileSync } = require("child_process");
  const path = require("path");
  const rodar = (texto) =>
    JSON.parse(
      execFileSync(
        process.execPath,
        [path.join(__dirname, "..", "cena-sob-demanda.js"), "--texto", texto, "--json"],
        { encoding: "utf8" }
      )
    );

  // O exemplo que o o dono do canal deu na sessao em que a regra nasceu.
  const zip = rodar("baixa o zip, abre no Claude Code e coloca o Zeus");
  ok(zip.compoe === true, "a fala do zip vira cena composta");
  ok(zip.eventos.length === 3, "tres eventos, um por verbo", `vieram ${zip.eventos.length}`);
  ok(zip.eventos[0].primitiva === "arquivo" && zip.eventos[0].gesto === "desaba", "baixar o zip: arquivo que desaba");
  ok(zip.eventos[1].objeto === "Claude Code", "nome proprio composto fica inteiro", `veio "${zip.eventos[1].objeto}"`);
  ok(zip.eventos[1].primitiva === "janela" && zip.eventos[1].gesto === "expande", "abrir o Claude Code: janela que expande");
  ok(zip.eventos[2].objeto === "Zeus" && zip.eventos[2].primitiva === "item", "colocar o Zeus: o verbo faz dele um item", `veio ${zip.eventos[2].primitiva}`);
  ok(zip.eventos.every((e, i) => i === 0 || e.gestoEmFrame > zip.eventos[i - 1].gestoEmFrame), "os gestos acontecem em ordem no tempo");
  ok(zip.eventos.every((e) => e.nasceEmFrame === e.gestoEmFrame - 6), "todo objeto nasce 6 quadros antes do gesto (MOTION secao 4)");
  ok(zip.pesoDentroDoTeto === true, "soma de peso dentro do teto de 22", `soma ${zip.somaPeso}`);

  // Fala abstrata nao tem o que compor: cai no fallback do manual, nunca num
  // molde aproximado.
  const abstrata = rodar("a barreira tecnica esta desaparecendo");
  ok(abstrata.compoe === false, "fala sem verbo de acao nao compoe");
  ok(abstrata.fallback.estado === "C", "fallback e o estado C (lettering), nunca tela vazia");
}

console.log(
  falhas === 0
    ? "\nTUDO PASSOU.\n"
    : `\n${falhas} FALHA(S). A regra de direcao dinamica esta quebrada: corrigir antes de gerar peca.\n`
);
process.exit(falhas === 0 ? 0 : 1);
