#!/usr/bin/env node
/**
 * Mede o custo fixo de contexto: quantos caracteres o ZEUS carrega em TODA
 * sessao, antes mesmo de o usuario falar qualquer coisa.
 *
 * Por que importa: contexto fixo grande demais deixa o assistente lento, caro
 * e distraido. O teto do ZEUS PRO e' 100.000 caracteres.
 *
 * Uso: node scripts/medir-contexto.js
 */

const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const TETO = 100000;

const ALVOS = [
  { rotulo: 'CLAUDE.md', caminho: 'CLAUDE.md' },
  { rotulo: 'CLAUDE.local.md', caminho: 'CLAUDE.local.md', opcional: true },
  { rotulo: 'Regras sempre ativas', caminho: '.claude/rules', pasta: true },
  { rotulo: 'Indice de memoria', caminho: 'memory/INDICE.md', opcional: true },
  { rotulo: 'Perfil do dono', caminho: 'memory/PERFIL.md', opcional: true }
];

function tamanhoDe(alvoAbsoluto, pasta) {
  if (!fs.existsSync(alvoAbsoluto)) return { chars: 0, arquivos: 0 };
  if (!pasta) {
    return { chars: fs.readFileSync(alvoAbsoluto, 'utf8').length, arquivos: 1 };
  }
  let chars = 0;
  let arquivos = 0;
  for (const nome of fs.readdirSync(alvoAbsoluto)) {
    if (!nome.endsWith('.md')) continue;
    chars += fs.readFileSync(path.join(alvoAbsoluto, nome), 'utf8').length;
    arquivos++;
  }
  return { chars, arquivos };
}

let total = 0;
const linhas = [];

for (const alvo of ALVOS) {
  const absoluto = path.join(RAIZ, alvo.caminho);
  const { chars, arquivos } = tamanhoDe(absoluto, alvo.pasta);
  if (chars === 0 && alvo.opcional) continue;
  total += chars;
  linhas.push({ rotulo: alvo.rotulo, chars, arquivos });
}

console.log('\nCUSTO FIXO DE CONTEXTO DO ZEUS\n');
for (const l of linhas) {
  const barra = '#'.repeat(Math.min(40, Math.round((l.chars / TETO) * 40)));
  console.log(
    `${l.rotulo.padEnd(24)} ${String(l.chars).padStart(7)} chars  ${String(l.arquivos).padStart(2)} arq  ${barra}`
  );
}

const pct = Math.round((total / TETO) * 100);
console.log('\n' + '-'.repeat(60));
console.log(`TOTAL: ${total} caracteres  (${pct}% do teto de ${TETO})`);

if (total > TETO) {
  console.log('\nACIMA DO TETO. O que fazer, nesta ordem:');
  console.log('  1. Mover detalhe de regra sempre ativa para docs/rules-on-demand/');
  console.log('  2. Encurtar o indice de memoria, movendo linhas frias para memory/_arquivo/');
  console.log('  3. Conferir se alguma regra esta duplicando conteudo de outra');
  process.exit(1);
}

console.log('\nDentro do teto.');
