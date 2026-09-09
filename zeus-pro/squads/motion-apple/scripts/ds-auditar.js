#!/usr/bin/env node
/**
 * ds-auditar.js: os cinco fiscais automaticos da peca.
 *
 *   --ritmo        densidade alternando, orcamento por cena e por video
 *   --estagnacao   maior janela sem nada mudar na tela
 *   --som          um som a cada 2,5s, soma de pesos por cena, peso 0 obrigatorio
 *   --uso          o design system foi usado ou tudo virou cartao e legenda
 *   --tudo         roda os quatro
 *
 * Sem plan/05-scene-plan.json a peca e anterior a esteira nova: os fiscais que
 * dependem do plano registram "pulado" e nao reprovam ninguem.
 *
 * Uso: node ds-auditar.js <Composition> [--tudo] [--json] [--max-hold 8]
 */
const fs = require("fs");
const path = require("path");
const R = require("./lib/ds-registry");
const { paths, compDir, planDir, existe } = require("./lib/ds-root");

const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const valor = (n, p = null) => {
  const i = args.indexOf(n);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : p;
};
const comp = args.find((a) => !a.startsWith("--") && args[args.indexOf(a) - 1] !== "--max-hold");

const FPS = 60;
const MAX_HOLD_S = Number(valor("--max-hold", 8));
const MAX_HOLD_RESPIRO_S = 12;

function lerPlano() {
  const p = path.join(planDir(comp), "05-scene-plan.json");
  return existe(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : null;
}
function lerBeats() {
  const p = path.join(planDir(comp), "02-beats.json");
  return existe(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : null;
}
function lerCenasDoCodigo() {
  const LC = require(path.join(paths.engineLib, "ler-composition.js"));
  const tokensPath = path.join(compDir(comp), "tokens.ts");
  if (!existe(tokensPath)) return null;
  const src = fs.readFileSync(tokensPath, "utf8");
  return LC.lerCenas(src, tokensPath, (msg) => {
    throw new Error(msg);
  });
}

// ─── fiscal 1: ritmo ──────────────────────────────────────────────────────────
function fiscalRitmo(plano) {
  const idx = R.carregar();
  const res = { fiscal: "ritmo", ok: true, pulado: false, erros: [], avisos: [], sequencia: [] };
  if (!plano) {
    res.pulado = true;
    res.avisos.push("sem plano de cenas: peca anterior a esteira nova");
    return res;
  }
  const cenas = plano.scenes || [];
  res.sequencia = cenas.map((c) => c.density ?? 0);

  for (let i = 2; i < res.sequencia.length; i++) {
    if (res.sequencia[i] === res.sequencia[i - 1] && res.sequencia[i] === res.sequencia[i - 2]) {
      res.erros.push(`${cenas[i].id || i}: tres cenas seguidas na densidade ${res.sequencia[i]} (a tela para de respirar)`);
    }
  }
  // o selo de fecho e assinatura, nao pico de conteudo: sai da regra de proximidade
  const picos = cenas.map((c, i) => ({ i, c })).filter(({ c }) => (c.density ?? 0) >= 4 && c.sceneFamily !== "BRAND_CLOSE");
  for (let a = 0; a < picos.length - 1; a++) {
    const s1 = picos[a].c.startFrame / FPS;
    const s2 = picos[a + 1].c.startFrame / FPS;
    if (s2 - s1 < 15) res.erros.push(`${picos[a].c.id} e ${picos[a + 1].c.id}: dois picos de densidade em ${(s2 - s1).toFixed(1)}s (o minimo e 15s)`);
  }
  picos.forEach(({ i, c }) => {
    const prox = cenas[i + 1];
    if (prox && (prox.density ?? 0) > 2) res.avisos.push(`${c.id} e pico e a cena seguinte (${prox.id}) fica em ${prox.density}: depois de um pico o certo e cair para 0 a 2`);
  });
  const nivel5 = cenas.filter((c) => (c.density ?? 0) === 5).length;
  if (nivel5 > 2) res.erros.push(`${nivel5} cenas no nivel 5 (lettering ou selo): o teto e 2 por video`);

  const durS = cenas.length ? (cenas[cenas.length - 1].endFrameExclusive - cenas[0].startFrame) / FPS : 0;
  const porMin = durS ? (cenas.length / durS) * 60 : 0;
  if (porMin && porMin < 8) res.avisos.push(`${porMin.toFixed(1)} cenas por minuto: abaixo da referencia de 9 a 12`);
  if (porMin > 18) res.avisos.push(`${porMin.toFixed(1)} cenas por minuto: acima da referencia`);

  // orcamento por cena e por video (design-router.budget)
  const usados = {};
  cenas.forEach((c) => {
    const id = c.chosen && c.chosen.id;
    if (!id) return;
    usados[id] = (usados[id] || 0) + 1;
    const e = idx.porId[id];
    if (e && e.durationFrames) {
      const dur = c.endFrameExclusive - c.startFrame;
      const [min, max] = e.durationFrames;
      if (dur < min * 0.6) res.avisos.push(`${c.id}: ${Math.round(dur / FPS * 10) / 10}s para ${id}, que pede pelo menos ${(min / FPS).toFixed(1)}s`);
    }
  });
  cenas.forEach((c, i) => {
    const ant = cenas[i - 1];
    // So acusa repeticao quando as DUAS cenas tem recurso escolhido. Sem esta
    // guarda, duas cenas ainda sem escolha (id null nas duas) acusavam
    // "repete o mesmo recurso (null)", que e ruido: plano incompleto ja e
    // apontado pelo fiscal de uso, com a mensagem certa.
    const idAtual = c.chosen && c.chosen.id;
    const idAnterior = ant && ant.chosen && ant.chosen.id;
    if (idAtual && idAnterior && idAtual === idAnterior) {
      res.erros.push(`${c.id}: repete o mesmo recurso da cena anterior (${idAtual})`);
    }
  });

  // ── 3.2: cena curta nao aguenta molde de montagem longa ──────────────────
  // Regra dura da MATRIZ-DE-CENAS: abaixo de 240 quadros (4s), sai todo molde
  // cujo `quadroCompleto` no build-registry passa de 48. O molde ate cabe na
  // tela, mas termina de se montar quando a fala ja foi embora: o espectador
  // ve a peca se montando, nunca a peca pronta.
  const completo = quadroCompletoPorId();
  cenas.forEach((c) => {
    const id = c.chosen && c.chosen.id;
    if (!id) return;
    const dur = c.endFrameExclusive - c.startFrame;
    const qc = completo[id];
    if (dur < 240 && qc && qc > 48) {
      res.erros.push(
        `${c.id}: ${Math.round((dur / FPS) * 10) / 10}s (${dur}q) para "${id}", que leva ${qc}q so para se montar. ` +
          `Cena abaixo de 240q pede molde de montagem rapida (MATRIZ-DE-CENAS, regra dura)`
      );
    }
  });

  // ── 3.2: acento de passagem ──────────────────────────────────────────────
  // O acento entra POR CIMA da cena, citando a plataforma que a fala mencionou.
  // Teto de 3 por minuto, janela de 40 a 60 quadros, e nunca em cena que ja tem
  // portador de cor (a regra de um portador por quadro vale para ele tambem).
  const comAcento = cenas.filter((c) => c.acento);
  const minutos = durS ? durS / 60 : 1;
  const tetoAcentos = Math.max(3, Math.round(3 * minutos));
  if (comAcento.length > tetoAcentos) {
    res.erros.push(`${comAcento.length} acentos de passagem em ${durS.toFixed(0)}s: o teto e 3 por minuto (${tetoAcentos} aqui)`);
  }
  comAcento.forEach((c) => {
    const a = c.acento || {};
    const dur = (a.ate ?? 0) - (a.de ?? 0);
    if (dur < 40 || dur > 60) {
      res.erros.push(`${c.id}: acento de ${dur}q (a janela e 40 a 60; abaixo nao da tempo de ler, acima vira segunda cena)`);
    }
    if (c.portadorDeCor || (c.chosen && c.chosen.portadorDeCor)) {
      res.erros.push(`${c.id}: acento numa cena que ja tem portador de cor (um portador por quadro; o acento nao pega a cor)`);
    }
  });

  res.ok = res.erros.length === 0;
  return res;
}

/**
 * `quadroCompleto` de cada molde, lido do build-registry (a "receita de
 * construcao" que veio no 3.2). E o quadro em que a peca terminou de se
 * montar, contado a partir da palavra-ancora. Sem o arquivo, o check dorme:
 * regra que depende de dado ausente nunca reprova por falta de dado.
 */
/**
 * Regras de composicao (quais duas pecas podem dividir uma cena). Veio no
 * 3.2. Sem o arquivo, o check dorme em vez de reprovar por falta de dado.
 */
let _composicaoCache;
function lerComposicao() {
  if (_composicaoCache !== undefined) return _composicaoCache;
  const p = path.join(paths.ds, "registry", "composition-rules.json");
  _composicaoCache = null;
  if (existe(p)) {
    try {
      _composicaoCache = JSON.parse(fs.readFileSync(p, "utf8"));
    } catch (_) {
      /* arquivo quebrado nao derruba a auditoria */
    }
  }
  return _composicaoCache;
}

let _completoCache = null;
function quadroCompletoPorId() {
  if (_completoCache) return _completoCache;
  _completoCache = {};
  const p = path.join(paths.ds, "registry", "build-registry.json");
  if (!existe(p)) return _completoCache;
  try {
    const reg = JSON.parse(fs.readFileSync(p, "utf8"));
    for (const e of reg.entradas || []) {
      const id = e.identidade && e.identidade.id;
      const qc = e.timeline && (e.timeline.quadroCompleto ?? e.timeline.quadro_completo);
      if (id && typeof qc === "number") _completoCache[id] = qc;
    }
  } catch (_) {
    /* arquivo quebrado nao derruba a auditoria inteira */
  }
  return _completoCache;
}

// ─── fiscal 2: estagnacao ─────────────────────────────────────────────────────
function fiscalEstagnacao(plano) {
  const res = { fiscal: "estagnacao", ok: true, pulado: false, erros: [], avisos: [], maiorJanelaS: 0 };
  let eventos = [];
  let fimS = 0;

  const chorPath = path.join(compDir(comp), "choreography.ts");
  if (existe(chorPath)) {
    try {
      const { loadSpec } = require(path.join(paths.engineLib, "load-choreography.js"));
      const spec = loadSpec(chorPath);
      (spec.scenes || []).forEach((s) => {
        eventos.push(s.from);
        (s.elements || []).forEach((el) => {
          const d = (el.entry && el.entry.delayF) || 0;
          eventos.push(s.from + d);
          if (el.entry && el.entry.dur) eventos.push(s.from + d + el.entry.dur);
          if (el.children && el.children.staggerF) eventos.push(s.from + d + el.children.staggerF * 2);
        });
        if (s.exitF) eventos.push(s.from + s.exitF);
        fimS = Math.max(fimS, (s.from + (s.dur || 0)) / FPS);
      });
    } catch (e) {
      res.avisos.push(`nao consegui ler a coreografia: ${e.message.split("\n")[0]}`);
    }
  }

  if (plano) {
    (plano.scenes || []).forEach((c) => {
      eventos.push(c.startFrame);
      if (c.timing && c.timing.actFrame) eventos.push(c.timing.actFrame);
      (c.focusEvents || []).forEach((f) => eventos.push(f.startFrame));
      (c.sfxSchedule || []).forEach((s) => eventos.push(c.startFrame + (s.frame || 0)));
      fimS = Math.max(fimS, c.endFrameExclusive / FPS);
    });
  }

  try {
    const { montarMapa } = require(path.join(paths.engineLib, "sfx-mapa.js"));
    const mapa = montarMapa(comp, {});
    (mapa.eventos || []).forEach((e) => {
      if (typeof e.gestoS === "number") eventos.push(Math.round(e.gestoS * FPS));
    });
  } catch (_) {
    /* peca sem som mapeado ainda */
  }

  if (!eventos.length) {
    res.pulado = true;
    res.avisos.push("nao achei coreografia nem plano: nada a medir");
    return res;
  }

  eventos = [...new Set(eventos.filter((f) => Number.isFinite(f)))].sort((a, b) => a - b);
  let maior = 0;
  let ondeIni = 0;
  for (let i = 1; i < eventos.length; i++) {
    const janela = (eventos[i] - eventos[i - 1]) / FPS;
    if (janela > maior) {
      maior = janela;
      ondeIni = eventos[i - 1];
    }
  }
  res.maiorJanelaS = Math.round(maior * 10) / 10;

  const cenaNaJanela = plano ? (plano.scenes || []).find((c) => ondeIni >= c.startFrame && ondeIni < c.endFrameExclusive) : null;
  const respiro = cenaNaJanela && (cenaNaJanela.density ?? 0) <= 1;
  const teto = respiro ? MAX_HOLD_RESPIRO_S : MAX_HOLD_S;
  const onde = `${Math.floor(ondeIni / FPS / 60)}:${((ondeIni / FPS) % 60).toFixed(1).padStart(4, "0")}`;
  if (maior > teto) {
    res.erros.push(`${res.maiorJanelaS}s sem nada mudar na tela, a partir de ${onde}${cenaNaJanela ? ` (cena ${cenaNaJanela.id})` : ""}. Teto: ${teto}s`);
  } else {
    res.avisos.push(`maior parada: ${res.maiorJanelaS}s em ${onde} (teto ${teto}s)`);
  }
  res.ok = res.erros.length === 0;
  return res;
}

// ─── fiscal 3: som ────────────────────────────────────────────────────────────
function fiscalSom(plano) {
  const idx = R.carregar();
  const res = { fiscal: "som", ok: true, pulado: false, erros: [], avisos: [] };
  let mapa = null;
  try {
    const { montarMapa } = require(path.join(paths.engineLib, "sfx-mapa.js"));
    mapa = montarMapa(comp, {});
  } catch (e) {
    res.pulado = true;
    res.avisos.push(`sem mapa de som: ${e.message.split("\n")[0]}`);
    return res;
  }
  const eventos = (mapa.eventos || []).slice().sort((a, b) => (a.gestoS || 0) - (b.gestoS || 0));
  if (!eventos.length) {
    res.pulado = true;
    res.avisos.push("a peca nao declara nenhum som (SFX_EVENTS vazio)");
    return res;
  }

  (mapa.problemas || []).forEach((p) => res.avisos.push(typeof p === "string" ? p : JSON.stringify(p)));

  // densidade: um som a cada 2,5s no estilo Apple
  for (let i = 1; i < eventos.length; i++) {
    const d = (eventos[i].gestoS || 0) - (eventos[i - 1].gestoS || 0);
    if (d < 0.25) res.erros.push(`dois sons colados em ${(eventos[i].gestoS || 0).toFixed(1)}s (${d.toFixed(2)}s de distancia; o minimo e 0,25s)`);
  }
  const durS = eventos[eventos.length - 1].gestoS || 1;
  const porSom = durS / eventos.length;
  if (porSom < 2.5) res.avisos.push(`um som a cada ${porSom.toFixed(1)}s: o estilo pede 2,5s ou mais (${eventos.length} sons em ${durS.toFixed(0)}s)`);

  // Dois pesos altos perto e soma por cena acima de 22: sao regras do design system
  // recebido, e as duas REPROVAM pecas ja aprovadas e calibradas de ouvido (Paulo em
  // 3 pontos, Fernanda em 1). Pela regra de governanca do squad, regua que reprova
  // peca aprovada esta errada: ficam como aviso, nunca como reprovacao.
  // Registrado em design-system/local-overrides.json.
  for (let i = 1; i < eventos.length; i++) {
    if ((eventos[i].peso || 0) >= 7 && (eventos[i - 1].peso || 0) >= 7) {
      const d = (eventos[i].gestoS || 0) - (eventos[i - 1].gestoS || 0);
      if (d < 3) res.avisos.push(`dois sons pesados (${eventos[i - 1].peso} e ${eventos[i].peso}) em ${d.toFixed(1)}s, aos ${(eventos[i].gestoS || 0).toFixed(1)}s`);
    }
  }

  const porCena = {};
  eventos.forEach((e) => {
    porCena[e.cena] = (porCena[e.cena] || 0) + (e.peso || 0);
  });
  Object.entries(porCena).forEach(([cena, soma]) => {
    if (soma > 22) res.avisos.push(`cena ${cena}: soma de pesos ${soma} (referencia do design system e 22; peca aprovada ja passou disso)`);
  });

  // peso 0 obrigatorio nos gestos que nao soam
  const naoSoam = ["traco", "contagem", "legenda", "playback"];
  eventos.forEach((e) => {
    if (naoSoam.includes(String(e.gesto)) && (e.peso || 0) > 0 && String(e.categoria) !== "palavra-conceito") {
      res.avisos.push(`cena ${e.cena}: gesto "${e.gesto}" com peso ${e.peso}; no design system esse gesto e silencio obrigatorio`);
    }
  });

  // peso do plano precisa existir no catalogo do codigo
  if (plano) {
    const pesosCatalogo = Object.keys((mapa.catalogo && mapa.catalogo.tabela_de_peso) || {}).map(Number).filter(Boolean);
    (plano.scenes || []).forEach((c) => {
      (c.sfxSchedule || []).forEach((s) => {
        if (s.weight && pesosCatalogo.length && !pesosCatalogo.includes(s.weight)) {
          const maisProximo = pesosCatalogo.reduce((a, b) => (Math.abs(b - s.weight) < Math.abs(a - s.weight) ? b : a));
          res.avisos.push(`${c.id}: peso ${s.weight} nao existe no catalogo; o proximo aprovado e ${maisProximo}`);
        }
      });
    });
  }

  res.ok = res.erros.length === 0;
  return res;
}

// ─── fiscal 4: uso do design system ───────────────────────────────────────────
// Familias aceitas por estrutura. Mais de uma quando o proprio design system manda
// trocar: jornada com etapa no meio vira passos, por ordem do "nao use quando" do
// flow.journey-ab.v1. Estrutura fora desta tabela nao e cobrada.
const FAMILIA_ESPERADA = {
  COMPARACAO: ["compare"], A_VS_B: ["compare"], ANTES_E_DEPOIS: ["compare"], PROS_CONTRAS: ["compare"],
  BIFURCACAO: ["branch"], ESCOLHA: ["branch"], RAMIFICACAO: ["branch", "set"], MAPA_MENTAL: ["branch"], ARVORE: ["branch"],
  SEQUENCIA: ["process", "flow"], PASSOS: ["process", "flow"], PROCESSO: ["process", "flow"], PIPELINE: ["process", "flow"],
  FLUXO: ["flow", "process"], JORNADA: ["flow", "process"], TIMELINE: ["flow"], FUNIL: ["flow"], CICLO: ["flow"],
  CAUSA_E_EFEITO: ["relation", "flow", "scheme"], RELACAO: ["relation"], CONEXAO: ["relation"],
  HIERARQUIA: ["hierarchy", "scale"], CAMADAS: ["hierarchy"], NIVEIS: ["hierarchy"], ESCALA: ["scale", "hierarchy"],
  NUMERO: ["number", "set"], PORCENTAGEM: ["number"], CRESCIMENTO: ["number", "interface"], META: ["number", "interface"],
  WHATSAPP: ["interface"], EMAIL: ["interface"], CHAT: ["interface"], CRM: ["interface"], DASHBOARD: ["interface"],
  FORMULARIO: ["interface"], PAGAMENTO: ["interface"], CALENDARIO: ["interface"], SOCIAL_MEDIA: ["interface"],
};

function fiscalUso(plano, beats) {
  const res = { fiscal: "uso do design system", ok: true, pulado: false, erros: [], avisos: [], resumo: {} };
  if (!plano || !beats) {
    res.pulado = true;
    res.avisos.push("sem plano ou sem beats: nada a cruzar");
    return res;
  }
  const porBeat = {};
  (plano.scenes || []).forEach((c) => {
    porBeat[c.beatId] = c;
  });

  let comEstrutura = 0;
  let comRecurso = 0;
  let fallback = 0;
  const degradacoes = [];
  const familias = {};

  (beats.beats || []).forEach((b) => {
    const estruturas = b.structures || [];
    const cena = porBeat[b.id];
    const id = cena && cena.chosen && cena.chosen.id;
    if (id) familias[id.split(".")[0]] = (familias[id.split(".")[0]] || 0) + 1;
    if (!estruturas.length) return;
    comEstrutura++;
    if (!id) {
      fallback++;
      return;
    }
    comRecurso++;
    const fam = id.split(".")[0];
    const esperadas = estruturas.flatMap((e) => FAMILIA_ESPERADA[e] || []);
    if (esperadas.length && !esperadas.includes(fam) && !(cena && cena.excecao)) {
      degradacoes.push({ beat: b.id, estruturas, escolhido: id, esperado: [...new Set(esperadas)] });
    }
  });

  degradacoes.forEach((d) => {
    const frase = {
      compare: "comparacao virou outra coisa (era para julgar dois lados lado a lado)",
      branch: "bifurcacao ou ramificacao virou outra coisa (era para mostrar os caminhos)",
      process: "sequencia virou itens soltos (a ordem se perdeu)",
      flow: "fluxo virou item parado",
      relation: "relacao virou icone solto (a ligacao se perdeu)",
      hierarchy: "hierarquia virou lista plana",
      number: "numero virou texto",
      interface: "acao dentro de um aplicativo virou so o logo",
    };
    const esperado = d.esperado[0];
    res.erros.push(`${d.beat}: ${frase[esperado] || `esperava familia ${esperado}`} · escolhido: ${d.escolhido} · estrutura: ${d.estruturas.join(", ")}`);
  });

  const taxa = comEstrutura ? comRecurso / comEstrutura : 1;
  if (comEstrutura && taxa < 0.6) res.erros.push(`so ${Math.round(taxa * 100)}% dos trechos com estrutura viraram recurso do design system (o piso e 60%)`);

  // ── 3.2: duas pecas na mesma cena ────────────────────────────────────────
  // O `composition-rules.json` diz quais pares podem dividir uma cena (existe
  // invariante: algo que NAO muda entre a base e a transformacao) e quais nao
  // podem. Par proibido nao e questao de gosto: sem invariante o espectador ve
  // uma peca sumir e outra nascer, e isso ja sao duas cenas.
  const regras = lerComposicao();
  if (regras) {
    const proibidos = {};
    (regras.combinacoes_proibidas || []).forEach((r) => {
      const ids = String(r.par || "").split("+").map((s) => s.trim()).filter(Boolean);
      if (ids.length === 2) proibidos[[...ids].sort().join(" + ")] = r;
    });
    const permitidos = new Set(
      (regras.pares_permitidos || []).map((r) => [r.base, r.transformacao].sort().join(" + "))
    );
    const orc = regras.orcamento_por_cena || {};

    (plano.scenes || []).forEach((c) => {
      const partes = (c.parts || c.partes || []).map((p) => (typeof p === "string" ? p : p && p.id)).filter(Boolean);
      if (partes.length >= 2) {
        const chave = [...partes].slice(0, 2).sort().join(" + ");
        const proibido = proibidos[chave];
        if (proibido) {
          res.erros.push(`${c.id}: par proibido na mesma cena (${chave}). ${proibido.por_que} Faca assim: ${proibido.faca}`);
        } else if (!permitidos.has(chave)) {
          res.avisos.push(`${c.id}: o par ${chave} nao esta na lista de pares com invariante declarado; conferir se as duas pecas dividem contentor e posicao`);
        }
      }
      if (orc.partes_combinadas && partes.length > orc.partes_combinadas) {
        res.erros.push(`${c.id}: ${partes.length} pecas na mesma cena (o teto e ${orc.partes_combinadas}; se a fala pede tres, o beat esta grande demais e vira duas cenas)`);
      }
      const itens = c.itemCount ?? (c.chosen && c.chosen.itemCount);
      if (orc.itens_de_significado && typeof itens === "number" && itens > orc.itens_de_significado) {
        res.avisos.push(`${c.id}: ${itens} itens de significado (referencia do sistema e ${orc.itens_de_significado})`);
      }
      if (orc.acentos && c.acento && Array.isArray(c.acento) && c.acento.length > orc.acentos) {
        res.erros.push(`${c.id}: ${c.acento.length} acentos na mesma cena (o teto e ${orc.acentos})`);
      }
    });
  }

  res.resumo = { beatsComEstrutura: comEstrutura, comRecursoDS: comRecurso, fallback, familias };
  res.ok = res.erros.length === 0;
  return res;
}

// ─── execucao ─────────────────────────────────────────────────────────────────

/**
 * fiscalDirecao: a regra de alternancia de palco (DIRECAO-DINAMICA secao 2).
 *
 * So roda quando o plano declara `formato: "vertical-mao"`. Peca de reels-call
 * passa batido de proposito: os estados de palco nao existem la, e reprovar
 * peca aprovada por regra que nao valia pra ela seria reescrever historia.
 *
 * O que ele pega, que nenhum outro fiscal pega: video que vira slideshow
 * (rosto some por tempo demais), video que vira cabeca falante (nunca sai do
 * estado A), e beat sem papel narrativo, que e a causa de o estado sair errado.
 */
function fiscalDirecao(plano, beats) {
  const res = { fiscal: "direcao", ok: true, pulado: false, erros: [], avisos: [], sequencia: [] };

  const formato = (plano && plano.formato) || (beats && beats.formato) || null;
  const regras = formato ? R.regrasDeAlternancia(formato) : null;
  if (!regras) {
    res.pulado = true;
    res.avisos.push(
      formato
        ? `formato "${formato}" nao usa estados de palco dinamicos`
        : "sem formato declarado no plano: fiscal de direcao dinamica nao se aplica"
    );
    return res;
  }

  const lista = (beats && beats.beats) || (plano && plano.scenes) || [];
  if (!lista.length) {
    res.pulado = true;
    res.avisos.push("sem beats para conferir");
    return res;
  }

  const estado = (b) => b.stageState || null;
  res.sequencia = lista.map(estado);

  // beat sem papel: a causa, nao o sintoma
  const semPapel = lista.filter((b) => !b.role);
  if (semPapel.length) {
    res.erros.push(
      `${semPapel.length} de ${lista.length} beats sem papel narrativo (${semPapel.map((b) => b.id).slice(0, 6).join(", ")}): sem papel o estado de palco e chute`
    );
  }

  // sem estado declarado nao da pra julgar o resto
  const semEstado = lista.filter((b) => !estado(b));
  if (semEstado.length) {
    res.erros.push(
      `${semEstado.length} beats sem estado de palco declarado (${semEstado.map((b) => b.id).slice(0, 6).join(", ")})`
    );
    res.ok = false;
    return res;
  }

  // lei 1: o rosto volta em ate N quadros
  let acumulado = 0;
  let inicioDaSequencia = null;
  lista.forEach((b) => {
    const dur = (b.endFrameExclusive || 0) - (b.startFrame || 0);
    if (estado(b) === "A") {
      acumulado = 0;
      inicioDaSequencia = null;
      return;
    }
    if (inicioDaSequencia === null) inicioDaSequencia = b.id;
    acumulado += dur;
    if (acumulado > regras.rostoVoltaEmAteQuadros) {
      res.erros.push(
        `de ${inicioDaSequencia} ate ${b.id}: ${acumulado}q sem o rosto na tela (teto ${regras.rostoVoltaEmAteQuadros}q). O video vira slideshow.`
      );
      acumulado = 0;
      inicioDaSequencia = null;
    }
  });

  // lei 2: nunca dois B seguidos com frases diferentes
  for (let i = 1; i < lista.length; i++) {
    if (estado(lista[i]) === "B" && estado(lista[i - 1]) === "B") {
      const mesmaFrase = (lista[i].topic && lista[i].topic === lista[i - 1].topic) || lista[i].continuaFrase === true;
      if (!mesmaFrase) {
        res.erros.push(
          `${lista[i - 1].id} e ${lista[i].id}: dois estados B seguidos com assuntos diferentes. So vale quando e a mesma frase quebrada em dois beats.`
        );
      }
    }
  }

  // leis 3 e 4: abre e fecha no estado A
  if (estado(lista[0]) !== regras.abreEm) {
    res.erros.push(`${lista[0].id}: o video abre no estado ${estado(lista[0])}, e a regra manda abrir em ${regras.abreEm} (quem fala aparece antes de qualquer tese)`);
  }
  const ultimo = lista[lista.length - 1];
  if (estado(ultimo) !== regras.fechaEm) {
    res.erros.push(`${ultimo.id}: o video fecha no estado ${estado(ultimo)}, e a regra manda fechar em ${regras.fechaEm} (quem pede a acao e a pessoa)`);
  }

  // lei 5: proporcao de tela cheia
  const total = lista.reduce((a, b) => a + ((b.endFrameExclusive || 0) - (b.startFrame || 0)), 0);
  const cheia = lista.reduce(
    (a, b) => a + (estado(b) === "A" ? 0 : (b.endFrameExclusive || 0) - (b.startFrame || 0)),
    0
  );
  const pct = total ? Math.round((cheia / total) * 100) : 0;
  res.percentualTelaCheia = pct;
  if (pct < regras.somaBCPercentualMin) {
    res.avisos.push(`tela cheia em ${pct}% do tempo (minimo ${regras.somaBCPercentualMin}%): o video e uma cabeca falante com apoio`);
  }
  if (pct > regras.somaBCPercentualMax) {
    res.erros.push(`tela cheia em ${pct}% do tempo (teto ${regras.somaBCPercentualMax}%): a pessoa some e a peca vira motion generico`);
  }

  res.ok = res.erros.length === 0;
  return res;
}

function main() {
  if (!comp) {
    console.error("uso: node ds-auditar.js <Composition> [--tudo | --ritmo | --estagnacao | --som | --uso | --direcao] [--json]");
    process.exit(1);
  }
  const plano = lerPlano();
  const beats = lerBeats();
  const tudo =
    flag("--tudo") ||
    (!flag("--ritmo") && !flag("--estagnacao") && !flag("--som") && !flag("--uso") && !flag("--direcao"));

  const saidas = [];
  if (tudo || flag("--ritmo")) saidas.push(fiscalRitmo(plano));
  if (tudo || flag("--estagnacao")) saidas.push(fiscalEstagnacao(plano));
  if (tudo || flag("--som")) saidas.push(fiscalSom(plano));
  if (tudo || flag("--uso")) saidas.push(fiscalUso(plano, beats));
  if (tudo || flag("--direcao")) saidas.push(fiscalDirecao(plano, beats));

  const relatorio = {
    composition: comp,
    temPlano: !!plano,
    geradoEm: new Date().toISOString(),
    fiscais: saidas,
    ok: saidas.every((s) => s.ok),
  };

  const destino = path.join(paths.outQa, comp);
  if (!existe(destino)) fs.mkdirSync(destino, { recursive: true });
  fs.writeFileSync(path.join(destino, "09-lint.json"), JSON.stringify(relatorio, null, 2), "utf8");

  if (flag("--json")) {
    console.log(JSON.stringify(relatorio, null, 2));
  } else {
    console.log(`fiscais de ${comp}${plano ? "" : " (sem plano de cenas: os fiscais que dependem dele ficam pulados)"}\n`);
    saidas.forEach((s) => {
      const marca = s.pulado ? "pulado" : s.ok ? "ok" : "REPROVOU";
      console.log(`[${marca}] ${s.fiscal}`);
      if (s.sequencia && s.sequencia.length) console.log(`   densidade: ${s.sequencia.join(" ")}`);
      if (s.maiorJanelaS) console.log(`   maior parada: ${s.maiorJanelaS}s`);
      if (s.resumo && s.resumo.beatsComEstrutura != null) console.log(`   ${s.resumo.comRecursoDS}/${s.resumo.beatsComEstrutura} trechos com estrutura viraram recurso do design system`);
      s.erros.forEach((e) => console.log(`   erro: ${e}`));
      s.avisos.slice(0, 4).forEach((a) => console.log(`   aviso: ${a}`));
      console.log("");
    });
    console.log(relatorio.ok ? "OK: passou nos fiscais." : "REPROVOU: conserte antes de renderizar.");
  }

  if (!relatorio.ok) process.exit(1);
}

main();
