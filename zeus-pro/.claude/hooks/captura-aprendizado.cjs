#!/usr/bin/env node
/**
 * ZEUS PRO: sensor de aprendizado.
 *
 * Eventos: PostToolUse (captura falha de ferramenta) e UserPromptSubmit
 *          (captura correcao ou elogio do dono).
 *
 * Filosofia: o hook e' burro e rapido. Ele so carimba uma linha num arquivo e
 * sai. Toda a inteligencia (agrupar, contar reincidencia, decidir se vira
 * regra) acontece depois, quando o assistente le o arquivo.
 *
 * REGRA DURA: este hook NUNCA escreve em stdout. Em UserPromptSubmit, stdout
 * vira contexto do pedido e poluiria a conversa.
 */

const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..', '..');
const DESTINO = path.join(RAIZ, 'memory', '_learning');
const ARQUIVO = path.join(DESTINO, 'eventos.jsonl');

const SINAIS_CORRECAO = [
  'nao e assim', 'nao era isso', 'ta errado', 'esta errado', 'errado',
  'nao foi isso que pedi', 'refaz', 'de novo', 'corrige', 'nunca faca',
  'nunca mais', 'ja falei', 'de novo isso', 'nao gostei', 'pessimo'
];

const SINAIS_ELOGIO = [
  'perfeito', 'isso mesmo', 'ficou otimo', 'exatamente', 'muito bom',
  'funcionou', 'era isso', 'salvou'
];

const RUIDO = [
  'command not found', 'no such file or directory', 'aborted by user',
  'user rejected', 'interrupted'
];

function normalizar(t) {
  return String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

/**
 * Assinatura estavel do erro: normaliza caminho, hash e numero para que a
 * mesma falha em arquivos diferentes conte como o mesmo padrao.
 */
function assinatura(texto) {
  return normalizar(texto)
    .replace(/[a-z]:\\[^\s'"]+/g, '<caminho>')
    .replace(/\/[^\s'"]+\//g, '<caminho>')
    .replace(/\b[0-9a-f]{7,}\b/g, '<hash>')
    .replace(/\d+/g, '<n>')
    .slice(0, 200);
}

function registrar(evento) {
  try {
    fs.mkdirSync(DESTINO, { recursive: true });
    fs.appendFileSync(ARQUIVO, JSON.stringify(evento) + '\n', 'utf8');
  } catch (e) {
    // registro e' desejavel, nao obrigatorio
  }
}

function main() {
  const entrada = JSON.parse(fs.readFileSync(0, 'utf8'));
  const agora = new Date().toISOString();
  const sessao = String(entrada.session_id || 'sem-sessao');

  // Caso 1: falha de ferramenta
  if (entrada.tool_name) {
    const resposta = JSON.stringify(entrada.tool_response || {});
    const falhou =
      entrada.tool_response &&
      (entrada.tool_response.is_error === true ||
        /\berror\b|\berro\b|failed|exception|traceback/i.test(resposta));
    if (!falhou) return;
    if (RUIDO.some((r) => normalizar(resposta).includes(r))) return;

    return registrar({
      quando: agora,
      sessao,
      tipo: 'falha_ferramenta',
      ferramenta: entrada.tool_name,
      assinatura: assinatura(resposta),
      bruto: resposta.slice(0, 400)
    });
  }

  // Caso 2: correcao ou elogio do dono
  if (typeof entrada.prompt === 'string') {
    const p = normalizar(entrada.prompt);
    if (p.length < 4) return;
    const correcao = SINAIS_CORRECAO.find((s) => p.includes(s));
    if (correcao) {
      return registrar({
        quando: agora,
        sessao,
        tipo: 'correcao_do_dono',
        sinal: correcao,
        bruto: String(entrada.prompt).slice(0, 400)
      });
    }
    const elogio = SINAIS_ELOGIO.find((s) => p.includes(s));
    if (elogio) {
      return registrar({
        quando: agora,
        sessao,
        tipo: 'aprovacao_do_dono',
        sinal: elogio,
        bruto: String(entrada.prompt).slice(0, 400)
      });
    }
  }
}

try {
  main();
} catch (e) {
  // fail-open
}
process.exit(0);
