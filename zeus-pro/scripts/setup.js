#!/usr/bin/env node
/**
 * ZEUS PRO: instalador.
 *
 * Uso: node scripts/setup.js
 *
 * O que ele faz, e nada alem disso:
 *  1. Confere se o ambiente atende o minimo.
 *  2. Cria o .env a partir do .env.example, se ainda nao existir.
 *  3. Cria as pastas de memoria e a Vault do Obsidian.
 *  4. Testa se os hooks respondem.
 *  5. Diz qual e' o proximo passo.
 *
 * O que ele NAO faz: nao instala dependencia, nao chama servico externo, nao
 * pede credencial e nao envia nada para lugar nenhum.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const RAIZ = path.resolve(__dirname, '..');
const VERDE = (t) => `\x1b[32m${t}\x1b[0m`;
const VERMELHO = (t) => `\x1b[31m${t}\x1b[0m`;
const AMARELO = (t) => `\x1b[33m${t}\x1b[0m`;

const ok = (t) => console.log(`${VERDE('OK')}    ${t}`);
const aviso = (t) => console.log(`${AMARELO('ATENCAO')} ${t}`);
const erro = (t) => console.log(`${VERMELHO('ERRO')}  ${t}`);

let problemas = 0;

console.log('\n=============================================');
console.log('  ZEUS PRO: instalacao');
console.log('=============================================\n');

// 1. Ambiente
const versaoNode = process.versions.node;
const maior = Number(versaoNode.split('.')[0]);
if (maior >= 18) {
  ok(`Node.js ${versaoNode}`);
} else {
  erro(`Node.js ${versaoNode}. Precisa ser 18 ou maior. Baixe em nodejs.org`);
  problemas++;
}

try {
  execSync('git --version', { stdio: 'ignore' });
  ok('Git encontrado');
} catch (e) {
  aviso('Git nao encontrado. O ZEUS funciona sem ele, mas voce perde o historico de mudancas.');
}

// 2. Arquivo de configuracao
const envPath = path.join(RAIZ, '.env');
const examplePath = path.join(RAIZ, '.env.example');
if (fs.existsSync(envPath)) {
  ok('.env ja existe, mantido como esta');
} else if (fs.existsSync(examplePath)) {
  fs.copyFileSync(examplePath, envPath);
  ok('.env criado a partir do modelo (nenhuma chave e obrigatoria para comecar)');
} else {
  erro('.env.example nao encontrado. O repositorio parece incompleto.');
  problemas++;
}

// 3. Pastas de trabalho
const PASTAS = [
  'memory',
  'memory/diarios',
  'memory/_arquivo',
  'memory/_learning',
  'memory/_templates'
];
for (const p of PASTAS) {
  fs.mkdirSync(path.join(RAIZ, p), { recursive: true });
}
ok('Pastas de memoria prontas');

// 4. Vault do Obsidian
const PASTAS_VAULT = [
  '00-INICIO', '01-IDENTIDADE', '02-EMPRESA', '03-PRODUTOS', '04-PUBLICOS',
  '05-POSICIONAMENTO', '06-BRANDING', '07-COMUNICACAO', '08-PROJETOS',
  '09-PROCESSOS', '10-CLIENTES', '11-CONHECIMENTO', '12-SQUADS', '13-AGENTES',
  '14-DECISOES', '15-DIARIOS', '16-PESQUISAS', '17-TEMPLATES', '18-RESULTADOS',
  '19-INTEGRACOES', '20-SISTEMA', '99-ARQUIVO'
];
const vaultDestino =
  process.env.ZEUS_VAULT_PATH && process.env.ZEUS_VAULT_PATH.trim()
    ? process.env.ZEUS_VAULT_PATH.trim()
    : path.join(RAIZ, 'obsidian', 'vault-local');

let criadas = 0;
for (const p of PASTAS_VAULT) {
  const destino = path.join(vaultDestino, p);
  if (!fs.existsSync(destino)) {
    fs.mkdirSync(destino, { recursive: true });
    criadas++;
  }
  // leva o README explicativo do template junto, se ainda nao houver
  const modelo = path.join(RAIZ, 'obsidian', 'ZEUS-VAULT', p, 'README.md');
  const alvoReadme = path.join(destino, 'README.md');
  if (fs.existsSync(modelo) && !fs.existsSync(alvoReadme)) {
    fs.copyFileSync(modelo, alvoReadme);
  }
}
ok(`Vault pronta em ${vaultDestino} (${criadas} pastas criadas)`);

// 5. Hooks
const HOOKS = [
  '.claude/hooks/context-router.cjs',
  '.claude/hooks/guard-acoes-criticas.cjs',
  '.claude/hooks/captura-aprendizado.cjs'
];
for (const h of HOOKS) {
  const caminho = path.join(RAIZ, h);
  if (!fs.existsSync(caminho)) {
    erro(`Hook ausente: ${h}`);
    problemas++;
    continue;
  }
  try {
    execSync(`node --check "${caminho}"`, { stdio: 'ignore' });
    ok(`Hook respondendo: ${path.basename(h)}`);
  } catch (e) {
    erro(`Hook com problema de sintaxe: ${h}`);
    problemas++;
  }
}

// 6. Estado do conhecimento
const perfil = path.join(RAIZ, 'memory', 'PERFIL.md');
const jaConhece = fs.existsSync(perfil);

console.log('\n---------------------------------------------');
if (problemas > 0) {
  console.log(VERMELHO(`\n${problemas} problema(s) encontrado(s). Resolva antes de continuar.`));
  process.exit(1);
}

console.log(VERDE('\nInstalacao concluida.\n'));

if (jaConhece) {
  console.log('O ZEUS ja conhece voce. E so abrir o Claude Code nesta pasta e pedir o que precisa.');
} else {
  console.log('PROXIMO PASSO, o mais importante:\n');
  console.log('  1. Abra o Claude Code nesta pasta.');
  console.log('  2. Diga: "vamos fazer o boot da inteligencia".');
  console.log('  3. Reserve de 30 a 60 minutos e responda com calma.\n');
  console.log('E a entrevista que transforma este sistema no SEU assistente.');
  console.log('Sem ela, o ZEUS e uma casa vazia: tem estrutura, nao tem dono.');
}
console.log('');
