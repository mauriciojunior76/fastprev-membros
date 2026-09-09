/**
 * sfx-mapa.js — monta o mapa de som de uma composition a partir do CODIGO.
 *
 * POR QUE ISTO EXISTE: a mixagem do PauloRuizReels foi construida a mao em
 * scripts temporarios, ao longo de 24 versoes. Cada lei (serie, categoria,
 * som duplo, densidade) foi descoberta corrigindo o mesmo erro de novo. Aqui
 * elas viram conta, e a conta roda antes do render.
 *
 * O QUE ENTRA: o SFX_EVENTS de cada componente (quadro local, categoria,
 * gesto), o SCENES do tokens.ts, o SCENE_COMPONENTS do MotionStage e o
 * catalogo em public/_sfx/catalogo.json.
 *
 * O QUE SAI: cada evento com o instante absoluto do gesto, o arquivo de som,
 * o volume, e o instante em que o audio comeca a tocar para que o pico dele
 * caia no quadro certo.
 *
 * AS LEIS, e onde cada uma vive nesta biblioteca:
 *   1. pico no quadro       -> `inicioS = gestoS - pico_s`
 *   2. serie                -> `aplicarSerie`, queda de 1 dB por etapa
 *   3. categoria            -> estrutural: o som vem do catalogo, nunca do
 *                              componente, entao nao ha como divergir
 *   4. som duplo            -> consequencia da lei 5: gestos a mais de 0,25s
 *                              sobrevivem os dois
 *   5. proximidade          -> `filtrarProximos`, vence o de maior peso
 *   6. densidade            -> `medirDensidade`, teto por estilo
 *   7. peso decide som      -> `tabela_de_peso` do catalogo
 *
 * A conversao de tempo usa o `from` da coreografia quando existe, nunca
 * `start * fps` em ponto flutuante, e soma HOOK_FRAMES (hoje 0 em todas as
 * pecas, mas o dia que nao for, a conta ja esta certa).
 */

const fs = require("fs");
const path = require("path");

const LC = require("./ler-composition.js");
const { resolveCompDir } = require("./resolve-comp-dir.js");

const MOTION = path.resolve(__dirname, "..", "..");
const CATALOGO_PATH = path.join(MOTION, "public", "_sfx", "catalogo.json");
const COMPOSITIONS_DIR = path.join(MOTION, "src", "compositions");

/** Uma linha do SFX_EVENTS, ancorada nas duas pontas: o que fugir do molde
 *  reprova com o numero da linha, nunca e ignorado em silencio. */
const RE_EVENTO =
  /^\s*\{\s*frame:\s*(\d+)\s*,\s*categoria:\s*"([a-z0-9-]+)"\s*,\s*gesto:\s*"([a-z0-9-]+)"(?:\s*,\s*etapa:\s*(\d+))?\s*\}\s*,?\s*(?:\/\/.*)?\r?$/;

/** Posicoes de delay aceitas para provar que um frame declarado e real. */
const PADROES_DE_DELAY = (n) => [
  new RegExp(`delay=\\{${n}\\}`),
  new RegExp(`[Dd]elay=\\{${n}\\}`),
  new RegExp(`delay:\\s*${n}\\b`),
  new RegExp(`useDrawProgress\\(\\s*${n}\\b`),
  new RegExp(`useContador\\(\\s*${n}\\b`),
  new RegExp(`ci\\(\\s*frame\\s*,\\s*\\[\\s*${n}\\b`),
  new RegExp(`frame\\s*-\\s*\\(\\s*${n}\\b`),
  new RegExp(`frame\\s*-\\s*${n}\\b`),
  new RegExp(`\\{\\s*${n}\\s*,`),
];

function lerCatalogo() {
  if (!fs.existsSync(CATALOGO_PATH)) {
    throw new Error(`catalogo de som nao encontrado em ${CATALOGO_PATH}`);
  }
  return JSON.parse(fs.readFileSync(CATALOGO_PATH, "utf8"));
}

/**
 * Le o SFX_EVENTS de um componente. Devolve `{ eventos, problemas }`.
 * Componente sem o export devolve `eventos: null`, que o chamador trata
 * como falta declarada (diferente de lista vazia, que e decisao explicita).
 */
/**
 * Acha o arquivo de um componente que nao aparece nos imports do
 * MotionStage. Usado pelos componentes montados direto no index.tsx, como o
 * selo de fecho.
 */
function acharComponente(compDir, nome) {
  const candidatos = [
    path.join(compDir, "components", `${nome}.tsx`),
    path.join(compDir, "components", "icons", `${nome}.tsx`),
  ];
  return candidatos.find((c) => fs.existsSync(c)) || null;
}

function lerSfxEvents(arquivo) {
  const problemas = [];
  if (!arquivo || !fs.existsSync(arquivo)) {
    return { eventos: null, problemas: [`arquivo nao encontrado: ${arquivo}`] };
  }
  const src = fs.readFileSync(arquivo, "utf8");
  const bloco = LC.blocoDeArray(src, "SFX_EVENTS");
  if (bloco === null) return { eventos: null, problemas };

  const eventos = [];
  const linhas = bloco.split("\n");
  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i];
    const limpa = linha.trim();
    if (limpa === "" || limpa.startsWith("//") || limpa.startsWith("*") || limpa.startsWith("/*")) continue;

    const m = RE_EVENTO.exec(linha);
    if (!m) {
      problemas.push(
        `${path.basename(arquivo)}: linha fora do molde no SFX_EVENTS: ${limpa.slice(0, 60)}`
      );
      continue;
    }
    const frame = parseInt(m[1], 10);
    const evento = {
      frame,
      categoria: m[2],
      gesto: m[3],
      etapa: m[4] ? parseInt(m[4], 10) : null,
      componente: path.basename(arquivo, ".tsx"),
    };

    // frame orfao: todo numero declarado precisa existir como delay no proprio
    // arquivo, ou levar o escape. E o check que pega o retrabalho classico:
    // alguem muda a animacao e esquece a lista.
    const temEscape = /\/\/\s*sfx-frame-ok:/.test(linha);
    // Quando o componente consome `SFX.<gesto>` no delay, o literal sai do
    // codigo de proposito: o export virou a fonte. Isso e prova mais forte
    // que achar o numero solto, entao vale como delay encontrado.
    const consomeExport = new RegExp("SFX\\." + evento.gesto + "\\b").test(src);
    // frame 0 e o inicio da cena: sempre um instante real, nunca orfao.
    if (frame !== 0 && !temEscape && !consomeExport && !PADROES_DE_DELAY(frame).some((re) => re.test(src))) {
      problemas.push(
        `${path.basename(arquivo)}: frame ${frame} declarado no SFX_EVENTS nao aparece como delay no componente (use "// sfx-frame-ok: <motivo>" se for valor derivado)`
      );
    }
    eventos.push(evento);
  }
  return { eventos, problemas };
}

/** Serie: mesmo som em todas as etapas, volume caindo 1 dB por etapa. */
function aplicarSerie(eventos, regras) {
  const porSerie = new Map();
  for (const e of eventos) {
    if (e.etapa === null) continue;
    const chave = `${e.cena}/${e.categoria}`;
    if (!porSerie.has(chave)) porSerie.set(chave, []);
    porSerie.get(chave).push(e);
  }
  const series = [];
  for (const [chave, itens] of porSerie) {
    itens.sort((a, b) => a.etapa - b.etapa);
    itens.forEach((e, i) => {
      e.volumeDb -= i * (regras.serie_queda_db_por_etapa || 1);
    });
    series.push({
      chave,
      etapas: itens.length,
      volumes: itens.map((e) => e.volumeDb),
      ordemOk: itens.every((e, i) => e.etapa === i + 1),
    });
  }
  return series;
}

/** Dois eventos a menos de 0,25s viram um: vence o de maior peso. */
/**
 * Série mais rápida que o ouvido resolve vira UM som, não um som sim outro não.
 *
 * A fila de três figuras do Hamilton entra a 0,2s de distância, abaixo do mínimo
 * de 0,25s. O filtro de proximidade, sozinho, matava só a do meio: sobrava som
 * na primeira e na terceira, e buraco no meio. Isso soa como falha, não como
 * ritmo. Quando qualquer etapa de uma série cai por proximidade, a série inteira
 * passa a levar um som só, na primeira etapa: é o que o ouvido entende como um
 * gesto único, que é o que a cena está fazendo mesmo.
 */
function colapsarSerieRapida(eventos, minimoS) {
  const porSerie = new Map();
  for (const e of eventos) {
    if (!e.etapa) continue;
    const chave = `${e.cena}/${e.categoria}/${e.gesto}`;
    if (!porSerie.has(chave)) porSerie.set(chave, []);
    porSerie.get(chave).push(e);
  }

  const colapsadas = new Set();
  for (const [chave, etapas] of porSerie) {
    if (etapas.length < 2) continue;
    const ordem = [...etapas].sort((a, b) => a.etapa - b.etapa);
    const rapida = ordem.some((e, i) => i > 0 && e.gestoS - ordem[i - 1].gestoS < minimoS);
    if (rapida) colapsadas.add(chave);
  }
  if (!colapsadas.size) return { eventos, descartados: [] };

  const mantidos = [];
  const descartados = [];
  for (const e of eventos) {
    const chave = `${e.cena}/${e.categoria}/${e.gesto}`;
    if (e.etapa && e.etapa > 1 && colapsadas.has(chave)) {
      e.motivoDescarte = "serie rapida demais (etapas a menos de " + minimoS +
        "s): a serie inteira leva um som so, na primeira etapa";
      descartados.push(e);
      continue;
    }
    mantidos.push(e);
  }
  return { eventos: mantidos, descartados };
}

function filtrarProximos(eventos, minimoS) {
  const ordenados = [...eventos].sort((a, b) => a.gestoS - b.gestoS);
  const mantidos = [];
  const descartados = [];
  for (const e of ordenados) {
    const anterior = mantidos[mantidos.length - 1];
    if (anterior && e.gestoS - anterior.gestoS < minimoS) {
      const perdedor = e.peso > anterior.peso ? anterior : e;
      const vencedor = perdedor === e ? anterior : e;
      perdedor.motivoDescarte =
        `a ${(Math.abs(e.gestoS - anterior.gestoS)).toFixed(3)}s de ${vencedor.id}, peso menor ou igual`;
      descartados.push(perdedor);
      if (perdedor === anterior) mantidos[mantidos.length - 1] = e;
      continue;
    }
    mantidos.push(e);
  }
  return { mantidos, descartados };
}

function medirDensidade(eventos, duracaoS, teto) {
  const mediaS = eventos.length ? duracaoS / eventos.length : Infinity;
  return {
    sons: eventos.length,
    duracaoS: +duracaoS.toFixed(2),
    mediaS: +mediaS.toFixed(2),
    tetoS: teto,
    ok: mediaS >= teto,
  };
}

/**
 * Monta o mapa inteiro. Nao encerra o processo: devolve `problemas` para o
 * chamador decidir (o lint bloqueia o render, o CLI imprime e sai com erro).
 */
function montarMapa(composition, opcoes = {}) {
  const catalogo = opcoes.catalogo || lerCatalogo();
  const problemas = [];
  const avisos = [];

  const compDir = resolveCompDir(COMPOSITIONS_DIR, composition);
  const tokensPath = path.join(compDir, "tokens.ts");
  const stagePath = path.join(compDir, "components", "MotionStage.tsx");
  if (!fs.existsSync(tokensPath)) throw new Error(`sem tokens.ts em ${compDir}`);
  if (!fs.existsSync(stagePath)) throw new Error(`sem MotionStage.tsx em ${compDir}`);

  const tokensSrc = fs.readFileSync(tokensPath, "utf8");
  const stageSrc = fs.readFileSync(stagePath, "utf8");

  const fps = LC.numeroDaConst(tokensSrc, "FPS") || 60;
  const hookFrames = LC.numeroDaConst(tokensSrc, "HOOK_FRAMES") || 0;
  const totalFrames = LC.lerTotalFrames(tokensSrc);
  const duracaoS = totalFrames ? totalFrames / fps : null;

  const cenas = LC.lerCenas(tokensSrc, tokensPath, (m) => { problemas.push(m); return []; });
  const mapaCenas = LC.lerMapaDeCenas(stageSrc);
  const imports = LC.lerImports(stageSrc, path.join(compDir, "components"));

  const estilo = opcoes.estilo || "apple-conceitual";
  const regras = catalogo.regras || {};
  const densidadeEstilo = (regras.densidade_por_estilo || {})[estilo] || { segundos_por_som: 2.5 };

  const eventos = [];
  const semDeclaracao = [];

  /**
   * COMPONENTES MONTADOS FORA DO MotionStage (06/09/2026).
   *
   * O selo de fecho nao entra pelo palco: ele e montado direto no index.tsx,
   * numa linha do tipo `scene.key === "zeus-seal" && <ZeusSealClose ... />`.
   * Como o varredor so olhava o SCENE_COMPONENTS, o `SFX_EVENTS` do
   * ZeusSealClose (categoria selo-zeus, gesto assenta, peso 6) NUNCA entrava
   * no mapa: o selo da marca assentava mudo em toda peca do squad.
   *
   * O comentario antigo desta linha ja admitia o buraco ("o selo entra
   * depois") e ninguem tinha voltado. Reclamacao do o dono do canal em 06/09/2026:
   * "os efeitos sonoros estao errados, as vezes aparece as vezes nao".
   *
   * O deslocamento tambem e diferente: estes componentes recebem `startFrame`
   * com o SEAL_OFFSET_FRAMES somado, entao o frame local deles conta a partir
   * dali, e nao do inicio da cena.
   */
  const seloOffsetFrames = LC.numeroDaConst(tokensSrc, "SEAL_OFFSET_FRAMES") || 0;
  const indexPath = path.join(compDir, "index.tsx");
  const foraDoPalco = {};
  if (fs.existsSync(indexPath)) {
    const indexSrc = fs.readFileSync(indexPath, "utf8");
    const re = /scene\.key === "([^"]+)"\s*&&\s*<([A-Z]\w+)([^>]*)>/g;
    for (const m of indexSrc.matchAll(re)) {
      const usaSeloOffset = /SEAL_OFFSET_FRAMES/.test(m[3] || "");
      foraDoPalco[m[1]] = { componente: m[2], offset: usaSeloOffset ? (seloOffsetFrames || 0) : 0 };
    }
  }

  for (const cena of cenas) {
    let nomeComp = mapaCenas[cena.key];
    let offsetExtra = 0;
    if (!nomeComp && foraDoPalco[cena.key]) {
      nomeComp = foraDoPalco[cena.key].componente;
      offsetExtra = foraDoPalco[cena.key].offset;
    }
    if (!nomeComp) continue;
    const arquivo = imports[nomeComp] || acharComponente(compDir, nomeComp);
    const { eventos: lista, problemas: probs } = lerSfxEvents(arquivo);
    problemas.push(...probs);

    if (lista === null) {
      semDeclaracao.push({ cena: cena.key, componente: nomeComp, arquivo });
      continue;
    }

    for (const ev of lista) {
      const cat = (catalogo.categorias || {})[ev.categoria];
      if (!cat) {
        problemas.push(
          `${cena.key}: categoria "${ev.categoria}" nao existe no catalogo (vocabulario fechado)`
        );
        continue;
      }
      const decl = (cat.gestos || {})[ev.gesto];
      if (decl === undefined) {
        problemas.push(
          `${cena.key}: gesto "${ev.gesto}" nao existe na categoria "${ev.categoria}"`
        );
        continue;
      }
      // o gesto e o peso, ou {peso, familia} quando aquele peso tem mais de um
      // som no catalogo (peso 4 tem whoosh-medio e stamp)
      const peso = typeof decl === "object" ? decl.peso : decl;
      const familia = typeof decl === "object" ? decl.familia : null;
      const linhaPeso = (catalogo.tabela_de_peso || {})[String(peso)];
      if (!linhaPeso) {
        problemas.push(`${cena.key}: peso ${peso} sem linha na tabela de peso`);
        continue;
      }
      let arquivoSom = linhaPeso.som;
      if (familia) {
        const achado = Object.entries(catalogo.sons || {}).find(
          ([, v]) => v.familia === familia && v.peso === peso
        );
        if (!achado) {
          problemas.push(
            `${cena.key}: nao existe som da familia "${familia}" com peso ${peso} no catalogo`
          );
          continue;
        }
        arquivoSom = achado[0];
      }
      const som = (catalogo.sons || {})[arquivoSom];
      if (!som) {
        problemas.push(`${cena.key}: som "${linhaPeso.som}" nao esta no catalogo`);
        continue;
      }

      const inicioCenaFrames = Math.round(cena.start * fps) + hookFrames;
      const gestoFrames = inicioCenaFrames + offsetExtra + ev.frame;
      const gestoS = gestoFrames / fps;
      const fimCenaS = cena.end;

      const e = {
        id: `${cena.key}/${ev.gesto}`,
        cena: cena.key,
        componente: ev.componente,
        categoria: ev.categoria,
        gesto: ev.gesto,
        etapa: ev.etapa,
        peso,
        frameLocal: ev.frame,
        gestoS: +gestoS.toFixed(3),
        som: arquivoSom,
        volumeDb: linhaPeso.volume_db,
        inicioS: +(gestoS - som.pico_s).toFixed(3),
        inicioMs: Math.round((gestoS - som.pico_s) * 1000),
        fimS: +(gestoS + som.decaimento_s).toFixed(3),
        fadeOutS: null,
      };

      if (e.gestoS > fimCenaS) {
        problemas.push(
          `${e.id}: o gesto cai em ${e.gestoS}s, depois do fim da cena (${fimCenaS}s)`
        );
      }
      if (e.inicioS < 0) {
        avisos.push(`${e.id}: o som comecaria antes do inicio do video, cortado em zero`);
        e.inicioS = 0;
        e.inicioMs = 0;
      }
      if (e.fimS > fimCenaS + 0.5) {
        e.fadeOutS = +(fimCenaS + 0.3).toFixed(3);
        avisos.push(
          `${e.id}: a cauda passa da cena seguinte, fade de saida em ${e.fadeOutS}s`
        );
      }
      eventos.push(e);
    }
  }

  const series = aplicarSerie(eventos, regras);
  for (const s of series) {
    if (!s.ordemOk) problemas.push(`serie ${s.chave}: etapas fora de ordem ou com buraco`);
    if (s.etapas > (regras.serie_maximo_etapas || 6)) {
      problemas.push(`serie ${s.chave}: ${s.etapas} etapas, acima do maximo`);
    }
  }

  // TETO POR FAMILIA: som que significa "isto e importante" so mantem o
  // significado se for raro. O shimmer tem teto de 2 por peca por ordem do
  // o dono do canal em 06/09/2026; usado tres vezes, vira textura de fundo. O teto
  // mora no catalogo (`teto_por_peca` do som), nunca chumbado aqui.
  const contaFamilia = {};
  for (const e of eventos) {
    const ficha = (catalogo.sons || {})[e.som];
    if (!ficha || !ficha.familia) continue;
    contaFamilia[ficha.familia] = (contaFamilia[ficha.familia] || 0) + 1;
  }
  for (const [familia, quantas] of Object.entries(contaFamilia)) {
    const ficha = Object.values(catalogo.sons || {}).find((v) => v.familia === familia);
    const teto = ficha && ficha.teto_por_peca;
    if (teto && quantas > teto) {
      problemas.push(
        `familia "${familia}": ${quantas} usos, teto de ${teto} por peca. ` +
          `Som de significado perde o significado quando repete`
      );
    }
  }

  const minimo = regras.distancia_minima_s || 0.25;
  // primeiro a série colapsa, depois o filtro geral de proximidade: na outra
  // ordem, o filtro já teria aberto o buraco no meio da fila.
  const colapso = colapsarSerieRapida(eventos, minimo);
  const { mantidos, descartados } = filtrarProximos(colapso.eventos, minimo);
  descartados.push(...colapso.descartados);

  // Lei da categoria, conferida mesmo sendo estrutural: se um dia alguem
  // driblar o catalogo, o mapa avisa em vez de deixar passar.
  const porCategoria = {};
  for (const e of mantidos) {
    if (!porCategoria[e.categoria]) porCategoria[e.categoria] = { aparicoes: [], gestos: {} };
    const c = porCategoria[e.categoria];
    if (!c.aparicoes.includes(e.cena)) c.aparicoes.push(e.cena);
    if (!c.gestos[e.gesto]) c.gestos[e.gesto] = { som: e.som, volumeDb: e.volumeDb };
    else if (c.gestos[e.gesto].som !== e.som) {
      problemas.push(
        `categoria "${e.categoria}", gesto "${e.gesto}": som diferente entre aparicoes (${c.gestos[e.gesto].som} e ${e.som})`
      );
    }
  }

  const densidade = duracaoS
    ? medirDensidade(mantidos, duracaoS, densidadeEstilo.segundos_por_som)
    : null;
  if (densidade && !densidade.ok) {
    avisos.push(
      `densidade: um som a cada ${densidade.mediaS}s, teto do estilo e ${densidade.tetoS}s`
    );
  }

  const seloOffset = LC.numeroDaConst(tokensSrc, "SEAL_OFFSET_FRAMES");
  // `zeus-seal` e não `seal`: a vinheta falada diz "Zeus, inteligência artificial
  // para mentores". O depoimento do Bernardo fecha com `exemplo-seal`, e com o teste
  // largo ele receberia a vinheta do Zeus no fim de uma peça da Exemplo.
  const cenaSelo = cenas.find((c) => c.key.includes("zeus-seal"));

  /**
   * FIM DA LOCUCAO, para a vinheta nao tocar por cima da fala.
   *
   * CORRIGIDO em 06/09/2026 (o dono do canal: "a vinheta no final cortou a palavra
   * Zeus"). Nao era corte: era SOBREPOSICAO. A vinheta era ancorada so no
   * frame do selo, e na Fernanda ela entrava em 49,983s enquanto a locucao
   * seguia falando ate 51,80s. A palavra "Zeus", que o catalogo posiciona
   * logo no comeco do arquivo, tocava embaixo da voz e sumia.
   *
   * O gate de som do mixar-final.js nao pegava porque ele mede NIVEL da
   * vinheta e SILENCIO no fim, nunca a sobreposicao com a voz.
   */
  const narrationPath = path.join(compDir, "data", "narration.json");
  let fimDaFalaS = null;
  if (fs.existsSync(narrationPath)) {
    try {
      const n = JSON.parse(fs.readFileSync(narrationPath, "utf8"));
      const palavras = Array.isArray(n) ? n : n.words || [];
      const fins = palavras.map((w) => Number(w.end)).filter((v) => Number.isFinite(v));
      if (fins.length) fimDaFalaS = Math.max(...fins);
    } catch (e) {
      // narracao ilegivel nao derruba o mapa: a ancora cai no comportamento antigo
    }
  }

  /**
   * O FIM REAL DO SOM, medido no arquivo, nao o fim da palavra na transcricao.
   *
   * CORRIGIDO em 06/09/2026, segunda reclamacao do mesmo ponto: "no final
   * cortou a minha fala esteira de produtos, nunca pode cortar falas".
   *
   * A transcricao fecha a palavra ANTES de o som terminar. Na Fernanda a
   * ultima palavra fecha em 48,80s e a voz so cala em 48,98s: 0,18s de cauda
   * que a transcricao nao ve. Com o respiro contado a partir de 48,80, a
   * vinheta entrava em 49,20 e pisava nos ultimos 0,02s da palavra. No papel
   * havia folga; no ouvido a fala soava cortada.
   *
   * Agora o fim da fala e medido com silencedetect no proprio audio, e a
   * transcricao vira so o ponto de partida da busca. Se o ffmpeg nao estiver
   * disponivel, cai na transcricao, que e o comportamento antigo.
   */
  const RESPIRO_APOS_A_FALA_S = 0.5;

  function fimRealDoSom(caminhoAudio, apartirS) {
    try {
      const { spawnSync } = require("child_process");
      const origem = Math.max(0, apartirS - 2.0);
      const r = spawnSync(
        "ffmpeg",
        ["-hide_banner", "-ss", String(origem), "-i", caminhoAudio,
         "-af", "silencedetect=n=-45dB:d=0.04", "-f", "null", "-"],
        { encoding: "utf8" }
      );
      // o ffmpeg escreve o relatorio dos filtros no STDERR, nunca no stdout
      const texto = (r.stderr || "") + (r.stdout || "");
      /**
       * O que interessa e o silencio TERMINAL, o unico que comeca e nunca
       * mais acaba dentro do arquivo. Os outros silence_start sao pausas
       * entre palavras e entre silabas, e pegar o ultimo deles cravava a
       * ancora ANTES da ultima silaba.
       */
      const eventos = [...texto.matchAll(/silence_(start|end):\s*([\d.]+)/g)]
        .map((m) => ({ tipo: m[1], t: Number(m[2]) + origem }));
      if (!eventos.length) return null;
      const ultimo = eventos[eventos.length - 1];
      if (ultimo.tipo === "start" && ultimo.t >= apartirS - 1.0) return +ultimo.t.toFixed(3);

      /**
       * Nao ha silencio terminal detectavel: o arquivo de voz acaba junto com
       * a fala, que e o caso normal depois de um corte justo. Entao o fim do
       * som E o fim do arquivo. Melhor errar 0,05s para o lado do respiro do
       * que 0,2s para o lado de pisar na ultima silaba.
       */
      const d = spawnSync(
        "ffprobe",
        ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", caminhoAudio],
        { encoding: "utf8" }
      );
      const dur = Number((d.stdout || "").trim());
      return Number.isFinite(dur) && dur > apartirS ? +dur.toFixed(3) : null;
    } catch (e) {
      return null; // sem ffmpeg no caminho: mantem o comportamento antigo
    }
  }


  const inicioPeloSelo = (Math.round(cenaSelo ? cenaSelo.start * fps : 0) + hookFrames + (seloOffset || 0)) / fps;
  const audioDaVoz = path.join(MOTION, "public", composition, "audio-final.wav");
  const fimMedido = fimDaFalaS !== null && fs.existsSync(audioDaVoz)
    ? fimRealDoSom(audioDaVoz, fimDaFalaS)
    : null;
  const fimEfetivoS = fimMedido !== null ? Math.max(fimMedido, fimDaFalaS) : fimDaFalaS;
  const inicioPelaFala = fimEfetivoS === null ? 0 : fimEfetivoS + RESPIRO_APOS_A_FALA_S;
  const inicioVinhetaS = +Math.max(inicioPeloSelo, inicioPelaFala).toFixed(3);

  const vinheta = cenaSelo && catalogo.vinheta
    ? {
        arquivo: catalogo.vinheta.arquivo,
        // a duracao vem do catalogo para o mixer saber se a peca termina COM a
        // vinheta: nesse caso o fim nao e silencio, e queda, e o gate muda
        duracaoS: catalogo.vinheta.duracao_s,
        inicioS: inicioVinhetaS,
        ancoradaEm: inicioPelaFala > inicioPeloSelo ? "fim-da-fala" : "frame-do-selo",
        fimDaFalaS: fimEfetivoS,
        fimDaFalaNaTranscricaoS: fimDaFalaS,
        fimDaFalaMedidoS: fimMedido,
        nivelar_com_a_fala: true,
      }
    : null;

  return {
    composition,
    estilo,
    fps,
    hookFrames,
    duracaoS,
    eventos: mantidos,
    descartados,
    series,
    categorias: porCategoria,
    vinheta,
    densidade,
    semDeclaracao,
    avisos,
    problemas,
  };
}

/** Só o que bloqueia render, para o choreo-lint. */
function validarParaLint(composition, opcoes = {}) {
  let mapa;
  try {
    mapa = montarMapa(composition, opcoes);
  } catch (e) {
    return { erros: [`sfx-mapa: ${e.message}`], avisos: [] };
  }
  const erros = [...mapa.problemas];
  for (const s of mapa.semDeclaracao) {
    erros.push(
      `${s.cena}: o componente ${s.componente} nao exporta SFX_EVENTS (declare a lista vazia se a cena nao tem gesto com som)`
    );
  }
  return { erros, avisos: mapa.avisos, mapa };
}

module.exports = { lerSfxEvents, montarMapa, validarParaLint, lerCatalogo, RE_EVENTO };
