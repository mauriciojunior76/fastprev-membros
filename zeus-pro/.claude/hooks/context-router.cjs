#!/usr/bin/env node
/**
 * ZEUS PRO: roteador de contexto.
 *
 * Evento: UserPromptSubmit.
 *
 * O que faz: le o pedido do usuario, compara com a tabela viva
 * context-triggers.json e injeta o arquivo relevante no contexto da conversa.
 * Assim o conhecimento sob demanda chega sozinho, sem o usuario precisar
 * lembrar de mandar ler.
 *
 * Principios (nao mude sem entender):
 *  1. FAIL-OPEN. Qualquer erro sai em silencio. Um hook quebrado nunca pode
 *     travar o trabalho do usuario.
 *  2. TABELA VIVA. Falso positivo ou gatilho morto se corrige no JSON, NUNCA
 *     neste arquivo.
 *  3. TETO. No maximo 2 injecoes por pedido, e o mesmo arquivo nunca entra
 *     duas vezes na mesma sessao.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const DIR = __dirname;
const RAIZ = path.resolve(DIR, '..', '..');
const TABELA = path.join(DIR, 'context-triggers.json');
const ESTADO = path.join(DIR, 'context-router-stats.json');

const MAX_INJECOES = 2;      // por pedido
const MAX_INLINE = 8000;     // bytes: acima disso injeta ponteiro, nao conteudo
const MAX_SESSOES = 40;      // retencao do estado
const MAX_POR_SESSAO = 50;

function normalizar(texto) {
  return String(texto || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

function lerJSON(caminho, padrao) {
  try {
    return JSON.parse(fs.readFileSync(caminho, 'utf8'));
  } catch (e) {
    return padrao;
  }
}

function resolverCaminho(alvo) {
  if (!alvo) return null;
  if (alvo.startsWith('~')) return path.join(os.homedir(), alvo.slice(1));
  if (path.isAbsolute(alvo)) return alvo;
  return path.join(RAIZ, alvo);
}

function podarEstado(estado) {
  const sessoes = Object.keys(estado.sessoes || {});
  if (sessoes.length > MAX_SESSOES) {
    for (const s of sessoes.slice(0, sessoes.length - MAX_SESSOES)) {
      delete estado.sessoes[s];
    }
  }
  return estado;
}

function main() {
  const entrada = JSON.parse(fs.readFileSync(0, 'utf8'));
  const prompt = String(entrada.prompt || '');
  const sessao = String(entrada.session_id || 'sem-sessao');

  if (prompt.length < 8) return;

  const tabela = lerJSON(TABELA, { triggers: [] });
  const gatilhos = Array.isArray(tabela.triggers) ? tabela.triggers : [];
  if (!gatilhos.length) return;

  const estado = podarEstado(lerJSON(ESTADO, { sessoes: {}, acertos: {} }));
  estado.sessoes = estado.sessoes || {};
  estado.acertos = estado.acertos || {};
  const jaInjetados = new Set(estado.sessoes[sessao] || []);

  const alvo = normalizar(prompt);
  const blocos = [];

  for (const g of gatilhos) {
    if (blocos.length >= MAX_INJECOES) break;
    const palavras = Array.isArray(g.keywords) ? g.keywords : [];
    const bateu = palavras.some((p) => alvo.includes(normalizar(p)));
    if (!bateu) continue;

    const caminho = resolverCaminho(g.file);
    // a chave do dedupe e' o caminho declarado na tabela, nao o absoluto:
    // caminho absoluto no arquivo de estado vazaria o caminho da maquina
    const chave = g.file;
    if (!caminho || jaInjetados.has(chave) || !fs.existsSync(caminho)) continue;

    let conteudo = '';
    try {
      conteudo = fs.readFileSync(caminho, 'utf8');
    } catch (e) {
      continue;
    }

    if (Buffer.byteLength(conteudo, 'utf8') <= MAX_INLINE) {
      blocos.push(
        `<contexto-roteado fonte="${g.file}" gatilho="${g.id}">\n${conteudo}\n</contexto-roteado>`
      );
    } else {
      blocos.push(
        `<contexto-roteado gatilho="${g.id}">\nO assunto deste pedido bate com "${g.id}". LER ${g.file} antes de agir. ${g.note || ''}\n</contexto-roteado>`
      );
    }

    jaInjetados.add(chave);
    estado.acertos[g.id] = (estado.acertos[g.id] || 0) + 1;
    estado.acertos[`${g.id}:ultimo`] = new Date().toISOString().slice(0, 10);
  }

  if (!blocos.length) return;

  const lista = Array.from(jaInjetados);
  estado.sessoes[sessao] = lista.slice(Math.max(0, lista.length - MAX_POR_SESSAO));

  try {
    fs.writeFileSync(ESTADO, JSON.stringify(estado, null, 2), 'utf8');
  } catch (e) {
    // estado e' otimizacao, nao requisito
  }

  process.stdout.write(blocos.join('\n\n'));
}

try {
  main();
} catch (e) {
  // fail-open sempre
}
process.exit(0);
