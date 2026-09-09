#!/usr/bin/env node
/**
 * Gate de licenca (PreToolUse).
 *
 * O relatorio adversarial de 19/08/2026 mostrou que "o ZEUS nao trabalha sem
 * licenca" escrito no CLAUDE.md nao segura nada: o modelo listou pastas, leu
 * arquivos e explicou o produto com LICENCA.json ausente. Gate de verdade e
 * codigo, entao este hook nega a ACAO, nao so a resposta.
 *
 * Regra do que passa e do que nao passa, sem exagero:
 *   PASSA sempre  -> leitura (Read, Grep, Glob) e qualquer comando de leitura.
 *                    A pessoa precisa conseguir entender e ativar.
 *   PASSA sempre  -> o proprio caminho de ativacao (scripts/ativar-licenca.js,
 *                    escrita de memory/LICENCA.json).
 *   NAO PASSA     -> escrita e execucao de trabalho enquanto nao houver
 *                    codigo valido em memory/LICENCA.json.
 *
 * Fail-open: hook quebrado nunca trava a maquina de quem pagou.
 */

const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..', '..');

function licencaValida() {
  try {
    const p = path.join(RAIZ, 'memory', 'LICENCA.json');
    if (!fs.existsSync(p)) return false;
    const d = JSON.parse(fs.readFileSync(p, 'utf8'));
    return !!(d && d.codigo && /^ZEUS-[A-Z0-9]{4}-[A-Z0-9]{4}$/i.test(String(d.codigo)));
  } catch (e) {
    return false;
  }
}

const MENSAGEM = [
  'Este ZEUS ainda nao foi ativado nesta maquina, entao ele nao executa trabalho.',
  '',
  'Peca o codigo de licenca a pessoa (formato ZEUS-XXXX-XXXX, apareceu na tela',
  'quando ela baixou o pacote) e rode:',
  '',
  '  node scripts/ativar-licenca.js CODIGO',
  '',
  'Depois de ativar, tudo volta ao normal. Ler arquivos e responder duvidas',
  'sobre a ativacao continua liberado.',
].join('\n');

// Comandos que sao claramente leitura: nunca bloquear.
const SO_LEITURA = /^\s*(cat|ls|dir|head|tail|grep|find|pwd|echo|which|type|wc|sort|uniq|less|more|tree|stat|file|node\s+--version|npm\s+(-v|--version)|git\s+(status|log|diff|branch|show))\b/i;

// O caminho da ativacao: sempre livre, senao ninguem consegue ativar.
const CAMINHO_ATIVACAO = /ativar-licenca|LICENCA\.json/i;

function main() {
  let entrada = '';
  try {
    entrada = fs.readFileSync(0, 'utf8');
  } catch (e) {
    return;
  }

  let dados;
  try {
    dados = JSON.parse(entrada);
  } catch (e) {
    return;
  }

  if (licencaValida()) return;

  const ferramenta = dados.tool_name || '';
  const params = dados.tool_input || {};
  const alvo = [params.command, params.file_path, params.path, params.notebook_path]
    .filter(Boolean)
    .join(' ');

  if (CAMINHO_ATIVACAO.test(alvo)) return;

  if (/^(Bash|PowerShell)$/i.test(ferramenta)) {
    const cmd = String(params.command || '');
    if (SO_LEITURA.test(cmd)) return;
  } else if (!/^(Edit|Write|NotebookEdit|MultiEdit)$/i.test(ferramenta)) {
    return;
  }

  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'deny',
        permissionDecisionReason: MENSAGEM,
      },
    })
  );
}

try {
  main();
} catch (e) {
  // fail-open
}
process.exit(0);
