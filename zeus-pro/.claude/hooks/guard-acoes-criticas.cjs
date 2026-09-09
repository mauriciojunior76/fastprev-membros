#!/usr/bin/env node
/**
 * ZEUS PRO: gate de acoes criticas.
 *
 * Evento: PreToolUse, ferramentas de shell (Bash, PowerShell).
 *
 * O que faz: intercepta comandos perigosos ANTES de rodarem. Alguns sao
 * negados de vez, outros pedem confirmacao do dono da instalacao.
 *
 * Principios:
 *  1. FAIL-OPEN. Erro do hook nunca trava o trabalho.
 *  2. TABELA VIVA. As listas moram em acoes-criticas.json. Falso positivo se
 *     corrige LA, nunca aqui.
 *  3. SEM PORTA DOS FUNDOS. Nao existe marcador que o proprio assistente possa
 *     usar para pular o gate. Se existisse, o gate nao valeria nada.
 *  4. TODA NEGATIVA VEM COM ALTERNATIVA. Bloquear sem dizer o caminho certo
 *     so gera tentativa criativa de contornar.
 */

const fs = require('fs');
const path = require('path');

const TABELA = path.join(__dirname, 'acoes-criticas.json');

const PADRAO = {
  negar: [
    { id: 'delete-recursivo', regex: '(rm\\s+(-[a-z]*r[a-z]*\\s+)+|Remove-Item[^\\n]*-Recurse|rd\\s+/s|rmdir\\s+/s)', motivo: 'Delete recursivo apaga pasta inteira sem volta.', alternativa: 'Mova para uma pasta _lixo/ ou apague arquivo por arquivo, conferindo antes.' },
    { id: 'git-destrutivo', regex: 'git\\s+(reset\\s+--hard|clean\\s+-[a-z]*f|push\\s+--force(?!-with-lease)|branch\\s+-D)', motivo: 'Comando git destrutivo descarta trabalho sem volta.', alternativa: 'Use git stash, git revert ou --force-with-lease.' },
    { id: 'formatar-disco', regex: '(?i)(mkfs|format\\s+[a-z]:|diskpart)', motivo: 'Operacao de disco.', alternativa: 'Nenhuma. Isso e feito pelo dono da maquina, na mao.' },
    { id: 'dump-de-segredo', regex: '(cat|type|Get-Content)\\s+[^\\n|]*\\.env(\\s|$)', motivo: 'Imprimir o arquivo de credenciais inteiro expoe segredo no historico da conversa.', alternativa: 'Verifique so a presenca da variavel, sem imprimir o valor.' }
  ],
  perguntar: [
    { id: 'envio-externo', regex: '(curl|fetch\\(|Invoke-RestMethod|Invoke-WebRequest|axios)[^\\n]*(send|message|mail|webhook|notify)', motivo: 'Este comando parece enviar algo para fora da maquina.' },
    { id: 'script-de-disparo', regex: '(node|python|py)\\s+[^\\n]*(enviar|disparo|envio|send-|broadcast)', motivo: 'Script com nome de disparo pode mandar mensagem de verdade.' },
    { id: 'instalar-dependencia', regex: '(npm\\s+i(nstall)?|pnpm\\s+add|yarn\\s+add|pip3?\\s+install)\\s+(?!--dry-run)\\S', motivo: 'Instalar dependencia nova traz codigo de terceiro para a maquina.' },
    { id: 'publicacao', regex: '(git\\s+push(?!\\s+--dry-run)|vercel\\s+deploy|wrangler\\s+(publish|deploy)|docker\\s+run)', motivo: 'Isto publica ou coloca algo no ar.' },
    { id: 'banco-destrutivo', regex: '(?i)(DROP\\s+(TABLE|DATABASE)|TRUNCATE\\s+TABLE|DELETE\\s+FROM(?!.*WHERE))', motivo: 'Operacao de banco que apaga dado.' }
  ]
};

function lerTabela() {
  try {
    const t = JSON.parse(fs.readFileSync(TABELA, 'utf8'));
    return {
      negar: Array.isArray(t.negar) ? t.negar : PADRAO.negar,
      perguntar: Array.isArray(t.perguntar) ? t.perguntar : PADRAO.perguntar
    };
  } catch (e) {
    return PADRAO; // tabela sumiu: protecao continua valendo
  }
}

function casou(regex, comando) {
  try {
    let fonte = regex;
    let flags = '';
    if (fonte.startsWith('(?i)')) {
      fonte = fonte.slice(4);
      flags = 'i';
    }
    return new RegExp(fonte, flags).test(comando);
  } catch (e) {
    return false;
  }
}

function decidir(decisao, razao) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: decisao,
        permissionDecisionReason: razao
      }
    })
  );
}

function main() {
  const entrada = JSON.parse(fs.readFileSync(0, 'utf8'));
  const cmd = String(
    (entrada.tool_input && (entrada.tool_input.command || entrada.tool_input.script)) || ''
  );
  if (!cmd.trim()) return;

  const tabela = lerTabela();

  for (const r of tabela.negar) {
    if (casou(r.regex, cmd)) {
      return decidir(
        'deny',
        `BLOQUEADO (${r.id}). ${r.motivo} Caminho seguro: ${r.alternativa || 'peca ao dono da maquina para fazer na mao.'}`
      );
    }
  }

  for (const r of tabela.perguntar) {
    if (casou(r.regex, cmd)) {
      return decidir(
        'ask',
        `CONFIRMACAO NECESSARIA (${r.id}). ${r.motivo} Explique em uma frase o que vai acontecer e espere o "pode".`
      );
    }
  }
}

try {
  main();
} catch (e) {
  // fail-open
}
process.exit(0);
