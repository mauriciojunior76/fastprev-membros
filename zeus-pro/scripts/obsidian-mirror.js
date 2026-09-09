#!/usr/bin/env node
/**
 * Espelho da memoria para a Vault do Obsidian.
 *
 * Uso:
 *   node scripts/obsidian-mirror.js            espelha
 *   node scripts/obsidian-mirror.js --simular  mostra o que faria, sem fazer
 *
 * Via unica: repositorio para vault. Editar a memoria e' no repositorio; a
 * vault e' a camada de LEITURA, onde o dono abre, le e entende o que o ZEUS
 * sabe sobre ele.
 *
 * Tres filtros de seguranca, nesta ordem:
 *   1. Extensao: so texto.
 *   2. Tamanho: nada gigante.
 *   3. Sensibilidade: nada marcado como sensivel ou secreto, e nada com nome
 *      que cheire a credencial.
 */

const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const ORIGEM = path.join(RAIZ, 'memory');
const SIMULAR = process.argv.includes('--simular');

const EXTENSOES = ['.md', '.txt'];
const TAMANHO_MAX = 2 * 1024 * 1024;
const PASTAS_PULADAS = ['_versions', '_learning', '_arquivo', 'node_modules'];
const NOME_SENSIVEL = /(credencial|senha|token|chave|api[-_]?key|secret|contrato|financeiro|extrato)/i;

function destinoVault() {
  const env = path.join(RAIZ, '.env');
  if (fs.existsSync(env)) {
    const m = fs.readFileSync(env, 'utf8').match(/^ZEUS_VAULT_PATH\s*=\s*(.+)$/m);
    if (m && m[1].trim()) return path.join(m[1].trim(), '30-MEMORIA-ZEUS');
  }
  return path.join(RAIZ, 'obsidian', 'vault-local', '30-MEMORIA-ZEUS');
}

function ehSensivel(caminho, conteudo) {
  if (NOME_SENSIVEL.test(path.basename(caminho))) return 'nome do arquivo';
  const fm = conteudo.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (fm && /sensibilidade:\s*(sensível|sensivel|secreto)/i.test(fm[1])) {
    return 'marcado como sensivel no frontmatter';
  }
  return null;
}

function varrer(pasta, acumulado = []) {
  if (!fs.existsSync(pasta)) return acumulado;
  for (const nome of fs.readdirSync(pasta)) {
    if (PASTAS_PULADAS.includes(nome)) continue;
    const completo = path.join(pasta, nome);
    if (fs.statSync(completo).isDirectory()) varrer(completo, acumulado);
    else if (EXTENSOES.includes(path.extname(nome))) acumulado.push(completo);
  }
  return acumulado;
}

const destino = destinoVault();
const arquivos = varrer(ORIGEM);
let copiados = 0;
let pulados = 0;
const bloqueados = [];

for (const origem of arquivos) {
  const relativo = path.relative(ORIGEM, origem);
  const info = fs.statSync(origem);

  if (info.size > TAMANHO_MAX) {
    pulados++;
    continue;
  }

  const conteudo = fs.readFileSync(origem, 'utf8');
  const motivo = ehSensivel(origem, conteudo);
  if (motivo) {
    bloqueados.push(`${relativo} (${motivo})`);
    continue;
  }

  const alvo = path.join(destino, relativo);
  if (!SIMULAR) {
    fs.mkdirSync(path.dirname(alvo), { recursive: true });
    fs.writeFileSync(alvo, conteudo, 'utf8');
  }
  copiados++;
}

if (!SIMULAR && copiados > 0) {
  fs.writeFileSync(
    path.join(destino, 'LEIA-ME.md'),
    [
      '# Memoria do ZEUS (espelho automatico)',
      '',
      'Esta pasta e' + "' " + 'gerada pelo comando `node scripts/obsidian-mirror.js`.',
      '',
      'Para LER e ENTENDER o que o ZEUS sabe sobre voce, este e o lugar certo.',
      'Para CORRIGIR alguma coisa, edite no repositorio (pasta `memory/`) ou',
      'simplesmente diga ao ZEUS o que esta errado: ele corrige e o espelho se',
      'atualiza sozinho na proxima vez.',
      '',
      'Memoria marcada como sensivel NUNCA aparece aqui, de proposito.',
      '',
      `Ultima atualizacao: ${new Date().toISOString().slice(0, 16).replace('T', ' ')}`
    ].join('\n'),
    'utf8'
  );
}

console.log(`\nEspelho da memoria ${SIMULAR ? '(SIMULACAO)' : ''}`);
console.log(`  destino:    ${destino}`);
console.log(`  espelhados: ${copiados}`);
console.log(`  grandes demais: ${pulados}`);
console.log(`  bloqueados por sensibilidade: ${bloqueados.length}`);
for (const b of bloqueados) console.log(`     - ${b}`);
console.log('');
