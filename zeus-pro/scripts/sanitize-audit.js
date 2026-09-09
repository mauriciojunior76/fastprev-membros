#!/usr/bin/env node
/**
 * Auditoria de sanitizacao: varre o repositorio procurando qualquer coisa que
 * nao deveria ser publicada.
 *
 * Uso:
 *   node scripts/sanitize-audit.js
 *   node scripts/sanitize-audit.js --lista lista-de-termos.txt
 *
 * Serve para dois momentos:
 *  1. Antes de tornar o repositorio publico (auditoria de vazamento).
 *  2. Depois, como checagem periodica de que nenhuma memoria pessoal escapou
 *     para dentro do codigo versionado.
 *
 * O arquivo passado em --lista contem termos privados (um por linha) que
 * jamais podem aparecer. Esse arquivo NAO deve ser versionado.
 */

const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');

const PADROES = [
  { id: 'chave-generica', regex: /\b(sk|pk|rk)[-_][A-Za-z0-9]{16,}\b/g, gravidade: 'CRITICO' },
  { id: 'token-bearer', regex: /\bBearer\s+[A-Za-z0-9._~+/-]{20,}/g, gravidade: 'CRITICO' },
  { id: 'chave-privada', regex: /-----BEGIN [A-Z ]*PRIVATE KEY-----/g, gravidade: 'CRITICO' },
  { id: 'senha-em-codigo', regex: /(senha|password|passwd|pwd)\s*[:=]\s*['"][^'"\s]{6,}['"]/gi, gravidade: 'CRITICO' },
  { id: 'token-longo', regex: /\b[A-Za-z0-9_-]{40,}\b/g, gravidade: 'ALERTA' },
  { id: 'email', regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g, gravidade: 'ALERTA' },
  { id: 'telefone-br', regex: /\+?55\s*\(?\d{2}\)?\s*9?\d{4}[-\s]?\d{4}\b/g, gravidade: 'ALERTA' },
  { id: 'cpf-cnpj', regex: /\b\d{3}\.\d{3}\.\d{3}-\d{2}\b|\b\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}\b/g, gravidade: 'CRITICO' },
  { id: 'caminho-de-usuario', regex: /[Cc]:\\+Users\\+[A-Za-z0-9._-]+/g, gravidade: 'ALERTA' },
  { id: 'caminho-unix-pessoal', regex: /\/(home|Users)\/[A-Za-z0-9._-]+\//g, gravidade: 'ALERTA' },
  { id: 'ip-publico', regex: /\b(?!127\.|0\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g, gravidade: 'ALERTA' }
];

const EXTENSOES = ['.md', '.js', '.cjs', '.mjs', '.json', '.yaml', '.yml', '.txt', '.html', '.css', '.sh', '.ps1'];
const PULAR = ['node_modules', '.git', '_versions', 'vault-local', '.cache'];

// Falsos positivos legitimos: exemplos didaticos e nomes de variavel.
const ISENTOS = [
  /exemplo/i, /placeholder/i, /seu-email@/i, /fulano/i, /AAAA-MM-DD/,
  /\.env\.example/, /sanitize-audit\.js/
];

let termosPrivados = [];
const flagLista = process.argv.indexOf('--lista');
if (flagLista > -1 && process.argv[flagLista + 1]) {
  const arq = process.argv[flagLista + 1];
  if (fs.existsSync(arq)) {
    termosPrivados = fs
      .readFileSync(arq, 'utf8')
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith('#'));
    console.log(`Lista privada carregada: ${termosPrivados.length} termo(s).`);
  } else {
    console.log(`Lista nao encontrada: ${arq}. Seguindo so com os padroes gerais.`);
  }
}

function varrer(pasta, acumulado = []) {
  for (const nome of fs.readdirSync(pasta)) {
    if (PULAR.includes(nome)) continue;
    const completo = path.join(pasta, nome);
    let info;
    try {
      info = fs.statSync(completo);
    } catch (e) {
      continue;
    }
    if (info.isDirectory()) varrer(completo, acumulado);
    else if (EXTENSOES.includes(path.extname(nome))) acumulado.push(completo);
  }
  return acumulado;
}

const arquivos = varrer(RAIZ);
const achados = [];

for (const caminho of arquivos) {
  const relativo = path.relative(RAIZ, caminho).replace(/\\/g, '/');
  const linhas = fs.readFileSync(caminho, 'utf8').split(/\r?\n/);

  linhas.forEach((linha, i) => {
    if (ISENTOS.some((r) => r.test(linha))) return;

    for (const p of PADROES) {
      p.regex.lastIndex = 0;
      const m = linha.match(p.regex);
      if (m) {
        achados.push({
          gravidade: p.gravidade,
          padrao: p.id,
          arquivo: relativo,
          linha: i + 1,
          trecho: linha.trim().slice(0, 90)
        });
      }
    }

    for (const termo of termosPrivados) {
      if (linha.toLowerCase().includes(termo.toLowerCase())) {
        achados.push({
          gravidade: 'CRITICO',
          padrao: 'termo-privado',
          arquivo: relativo,
          linha: i + 1,
          trecho: '[trecho omitido: contem termo privado]'
        });
      }
    }
  });
}

const criticos = achados.filter((a) => a.gravidade === 'CRITICO');
const alertas = achados.filter((a) => a.gravidade === 'ALERTA');

console.log('\n=========================================');
console.log('  AUDITORIA DE SANITIZACAO');
console.log('=========================================\n');
console.log(`Arquivos varridos: ${arquivos.length}`);
console.log(`Criticos: ${criticos.length}   Alertas: ${alertas.length}\n`);

for (const grupo of [criticos, alertas]) {
  for (const a of grupo) {
    console.log(`[${a.gravidade}] ${a.padrao}`);
    console.log(`   ${a.arquivo}:${a.linha}`);
    console.log(`   ${a.trecho}\n`);
  }
}

if (criticos.length) {
  console.log('RESULTADO: NAO PUBLICAR. Resolva os criticos primeiro.');
  process.exit(1);
}
if (alertas.length) {
  console.log('RESULTADO: revisar os alertas na mao antes de publicar.');
  console.log('Muitos sao falso positivo (exemplo didatico, nome de variavel).');
  process.exit(0);
}
console.log('RESULTADO: limpo.');
