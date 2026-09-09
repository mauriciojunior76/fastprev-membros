#!/usr/bin/env node
/**
 * atlas-register.js — liga o render do zeus-motion ao Zeus Atlas.
 *
 * Criado em 27/08/2026, Fase 3 da auditoria do ecossistema audiovisual. Diagnóstico que
 * motivou: o repositório tinha 30 compositions e só 2 fichas no Atlas, e
 * `06_search/deploys.jsonl` tinha 153 linhas, nenhuma delas de vídeo. Publicar página web
 * alimentava o Atlas sozinho; renderizar vídeo não alimentava nada. Resultado prático: o
 * o dono do canal não conseguia achar o próprio material sem lembrar o nome técnico da composition.
 *
 * O que faz: depois de um render FINAL entregue, cria ou atualiza a ficha de asset da peça,
 * com os metadados que fazem vídeo ser encontrado depois (duração, resolução, estilo, marca,
 * paleta, notas do gate visual).
 *
 * PRINCÍPIO DE SEGURANÇA: isto roda DEPOIS do vídeo estar entregue e verificado. Qualquer
 * falha aqui AVISA e segue, nunca derruba o render. Indexação não pode virar gate: o vídeo
 * já existe no disco, e um Atlas fora do ar não pode transformar entrega boa em erro.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const SQUAD = path.resolve(__dirname, '..', '..');
const AIOS = path.resolve(SQUAD, '..', '..');
const ATLAS_ASSETS = path.join(AIOS, '.zeus_atlas', '02_entities', 'assets');

/** Marca do design-core para o nome que o Atlas usa em video_brand */
const BRAND_CONHECIDA = new Set(['zeus', 'exemplo-1', 'exemplo-2']);

/** slug do id da ficha: "MotionMassofy" vira "motion-massofy-video" */
function slugDaComposition(comp) {
  const s = String(comp)
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^A-Za-z0-9]+/g, '-')
    .toLowerCase()
    .replace(/^-|-$/g, '');
  return s + '-video';
}

/** ffprobe: duração, resolução e fps reais do arquivo entregue. Nunca lança. */
function sondaVideo(arquivo) {
  try {
    const saida = execFileSync('ffprobe', [
      '-v', 'error',
      '-select_streams', 'v:0',
      '-show_entries', 'stream=width,height,r_frame_rate:format=duration',
      '-of', 'json', arquivo,
    ], { encoding: 'utf8', timeout: 20000 });
    const j = JSON.parse(saida);
    const st = (j.streams || [])[0] || {};
    const dur = parseFloat((j.format || {}).duration);
    let fps = null;
    if (st.r_frame_rate && st.r_frame_rate.includes('/')) {
      const [a, b] = st.r_frame_rate.split('/').map(Number);
      if (b) fps = Math.round(a / b);
    }
    const w = st.width, h = st.height;
    return {
      duracao_s: isNaN(dur) ? null : Math.round(dur * 100) / 100,
      resolucao: w && h ? `${w}x${h}` : null,
      fps,
      formato: w && h ? (h > w ? 'vertical' : (w > h ? 'horizontal' : 'quadrado')) : null,
    };
  } catch (e) {
    return { duracao_s: null, resolucao: null, fps: null, formato: null };
  }
}

/** Notas do gate visual, se a composition tiver passado por ele. */
function leAprovacao(comp) {
  const p = path.join(SQUAD, 'output', '_qa', comp, 'approval.json');
  try {
    const a = JSON.parse(fs.readFileSync(p, 'utf8'));
    const scores = Object.entries(a.scores || {}).map(([k, v]) => `${k}=${v}`).join(' ');
    return { scores: scores || null, veredito: a.verdict || null };
  } catch (e) {
    return { scores: null, veredito: null };
  }
}

/**
 * Marca da composition: lê o tokens.ts da pasta dela procurando o id de brand do
 * design-core. Sem achar, devolve null (melhor campo vazio que campo errado: marca
 * errada numa ficha é pior que marca ausente).
 */
function detectaBrand(comp) {
  const dir = path.join(SQUAD, 'src', 'compositions', comp);
  for (const nome of ['tokens.ts', 'index.tsx']) {
    try {
      const src = fs.readFileSync(path.join(dir, nome), 'utf8');
      const m = src.match(/loadBrand\(\s*["'`]([a-z0-9:_-]+)["'`]/i)
        || src.match(/BRAND_ID\s*=\s*["'`]([a-z0-9:_-]+)["'`]/i);
      if (m && (BRAND_CONHECIDA.has(m[1]) || m[1].startsWith('cliente:'))) return m[1];
    } catch (e) { /* arquivo nao existe: tenta o proximo */ }
  }
  return null;
}

/** Cores dominantes declaradas no código da composition, para o campo video_paleta. */
function detectaPaleta(comp) {
  const dir = path.join(SQUAD, 'src', 'compositions', comp);
  const contagem = new Map();
  for (const nome of ['tokens.ts', 'index.tsx']) {
    try {
      const src = fs.readFileSync(path.join(dir, nome), 'utf8');
      for (const m of src.matchAll(/#([0-9A-Fa-f]{6})\b/g)) {
        const hex = '#' + m[1].toUpperCase();
        contagem.set(hex, (contagem.get(hex) || 0) + 1);
      }
    } catch (e) { /* segue */ }
  }
  return [...contagem.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(e => e[0]);
}

/**
 * Acha a ficha que JÁ representa esta composition, mesmo com nome de arquivo diferente
 * do slug que este script geraria. Sem isto, uma peça catalogada à mão como
 * `agente-arquiteto-motion.md` ganharia uma segunda ficha `agente-arquiteto-video.md`
 * no primeiro render, e ficha duplicada é exatamente o que o Atlas existe para evitar
 * (pegado no teste da Fase 3, 27/08/2026).
 *
 * Ordem de busca: campo `video_composition` (o vínculo forte), depois caminho da pasta
 * da composition em `paths`, e só então o slug.
 */
function achaFichaExistente(comp, slug) {
  const direto = path.join(ATLAS_ASSETS, slug + '.md');
  if (fs.existsSync(direto)) return direto;
  const marcaComposition = new RegExp('^\\s*video_composition:\\s*' + comp + '\\s*$', 'm');
  const marcaCaminho = 'src/compositions/' + comp;
  try {
    for (const nome of fs.readdirSync(ATLAS_ASSETS)) {
      if (!nome.endsWith('.md')) continue;
      const cheio = path.join(ATLAS_ASSETS, nome);
      const txt = fs.readFileSync(cheio, 'utf8');
      if (marcaComposition.test(txt)) return cheio;
      if (txt.includes(marcaCaminho + '/') || txt.includes(marcaCaminho + '.')) return cheio;
    }
  } catch (e) { /* pasta ilegivel: cai pro caminho de ficha nova */ }
  return null;
}

function campoFrontmatter(texto, chave, valor) {
  const re = new RegExp('^(\\s*)' + chave + ':.*$', 'm');
  if (re.test(texto)) return texto.replace(re, (_, pad) => `${pad}${chave}: ${valor}`);
  // Insere logo depois de updated_at, dentro de metadata
  return texto.replace(/^(\s*)updated_at:.*$/m, (linha, pad) => `${linha}\n${pad}${chave}: ${valor}`);
}

/**
 * Registra o render no Atlas. Devolve { ok, acao, ficha, aviso }.
 * NUNCA lança: o chamador segue a vida com qualquer resultado.
 */
function registrarRender({ composition, arquivo, campanha, srcHash }) {
  try {
    if (!composition || !arquivo || !fs.existsSync(arquivo)) {
      return { ok: false, aviso: 'sem composition ou arquivo para registrar' };
    }

    const sonda = sondaVideo(arquivo);
    const qa = leAprovacao(composition);
    const brand = detectaBrand(composition);
    const paleta = detectaPaleta(composition);
    const relArquivo = path.relative(AIOS, arquivo).replace(/\\/g, '/');
    const relComp = `squads/motion/src/compositions/${composition}/`;
    const hoje = new Date().toISOString().slice(0, 10);
    const slug = slugDaComposition(composition);
    const existente = achaFichaExistente(composition, slug);
    const destino = existente || path.join(ATLAS_ASSETS, slug + '.md');

    const campos = {
      video_duracao_s: sonda.duracao_s,
      video_resolucao: sonda.resolucao,
      video_fps: sonda.fps,
      video_formato: sonda.formato,
      video_brand: brand,
      video_composition: composition,
      video_paleta: paleta.length ? `"${paleta.join(' ')}"` : null,
      video_scores: qa.scores,
      video_veredito: qa.veredito,
    };

    if (fs.existsSync(destino)) {
      // Ficha já existe: atualiza só os campos de vídeo e a data. Nunca reescreve o
      // corpo nem os apelidos, que são o trabalho humano que faz a peça ser encontrada.
      let texto = fs.readFileSync(destino, 'utf8');

      // DADO CURADO À MÃO VENCE DADO SONDADO. Em ficha `confidence: curated`, só preenche
      // campo que ainda está vazio; nunca sobrescreve. Motivo real, pego no teste da Fase 3:
      // o ffprobe leu 540x960 de um arquivo renderizado em meia escala e ia gravar isso por
      // cima do 1080x1920 verdadeiro da composition, e ia trocar a paleta escrita com o nome
      // das cores em português (que é o que faz a busca funcionar) por uma lista só de hex.
      const curada = /^\s*confidence:\s*curated\s*$/m.test(texto);

      texto = campoFrontmatter(texto, 'updated_at', hoje);
      for (const [k, v] of Object.entries(campos)) {
        if (v === null || v === undefined) continue;
        const jaTem = new RegExp('^\\s*' + k + ':\\s*\\S', 'm').test(texto);
        if (curada && jaTem) continue;
        texto = campoFrontmatter(texto, k, v);
      }
      if (!texto.includes(relArquivo)) {
        texto = texto.replace(/^(\s*)paths:\s*$/m, (l, pad) => `${l}\n${pad}  - ${relArquivo}`);
      }
      fs.writeFileSync(destino, texto, 'utf8');
      return { ok: true, acao: 'atualizada', ficha: path.relative(AIOS, destino).replace(/\\/g, '/') };
    }

    // Ficha nova: nasce como rascunho. O que a torna encontrável de verdade (as frases
    // que o o dono do canal usa) precisa de gente; por isso o corpo diz isso na cara.
    const linhas = [
      '---',
      `name: ${composition} (video)`,
      `description: Video renderizado pelo squad zeus-motion a partir da composition ${composition}. Ficha criada automaticamente pelo render em ${hoje}, ainda sem os apelidos do o dono do canal.`,
      'metadata:',
      '  type: asset',
      '  universe: zeus',
      '  status: ativo',
      '  confidence: draft',
      `  created_at: ${hoje}`,
      `  updated_at: ${hoje}`,
    ];
    for (const [k, v] of Object.entries(campos)) {
      if (v !== null && v !== undefined) linhas.push(`  ${k}: ${v}`);
    }
    linhas.push(
      '  topics:',
      '    - `video`',
      '    - `motion`',
      '  keywords:',
      '    - `video`',
      '    - `motion`',
      '    - `animacao`',
      `    - \`${String(composition).toLowerCase()}\``,
      '  paths:',
      `    - ${relArquivo}`,
      `    - ${relComp}`,
      '---',
      '',
      `Render final de ${hoje}${campanha ? ', campanha ' + campanha : ''}.`,
      srcHash ? `Hash do codigo no momento do render: ${srcHash}.` : '',
      '',
      'RASCUNHO GERADO PELO RENDER. Falta o mais importante: as frases que o o dono do canal usa para',
      'pedir esta peca (`user_phrases`) e a descricao do que ela mostra. Sem isso, so encontra',
      'quem ja souber o nome tecnico da composition, que e exatamente o problema que o Atlas',
      'existe para resolver. Preencher com:',
      '',
      '```bash',
      `node scripts/atlas/catalog.js --alias "a frase dele" --to ${slug}`,
      '```',
      '',
      'Referencia de ficha de video bem preenchida:',
      '`.zeus_atlas/02_entities/assets/agente-arquiteto-motion.md`.',
      ''
    );
    fs.mkdirSync(ATLAS_ASSETS, { recursive: true });
    fs.writeFileSync(destino, linhas.filter(l => l !== '').join('\n').replace(/\n---\n/, '\n---\n'), 'utf8');
    return { ok: true, acao: 'criada', ficha: path.relative(AIOS, destino).replace(/\\/g, '/'), rascunho: true, slug };
  } catch (e) {
    return { ok: false, aviso: e.message };
  }
}

module.exports = { registrarRender, slugDaComposition, sondaVideo };
