#!/usr/bin/env node
/**
 * ativar-licenca.js
 *
 * Liga o seu ZEUS nesta maquina.
 *
 * Voce recebeu um codigo quando baixou o pacote, no formato ZEUS-XXXX-XXXX.
 * Ele tambem esta no arquivo LICENCA.txt, aqui na pasta. Este script confirma
 * o codigo com o servidor, registra esta maquina e guarda a confirmacao em
 * memory/LICENCA.json.
 *
 * Uso:
 *   node scripts/ativar-licenca.js ZEUS-XXXX-XXXX
 *   node scripts/ativar-licenca.js --status
 */

const fs = require('fs');
const os = require('os');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const ARQUIVO = path.join(RAIZ, 'memory', 'LICENCA.json');
const SERVIDOR = 'https://zeus.fabricadementores.com/zeus-download';

function lerLocal() {
  try {
    return JSON.parse(fs.readFileSync(ARQUIVO, 'utf8'));
  } catch {
    return null;
  }
}

function mostrarStatus() {
  const l = lerLocal();
  if (!l || !l.codigo) {
    console.log('\nEste ZEUS ainda nao foi ativado nesta maquina.');
    console.log('Rode: node scripts/ativar-licenca.js SEU-CODIGO\n');
    process.exit(1);
  }
  console.log('\nLicenca ativa nesta maquina');
  console.log(`  titular: ${l.nome}`);
  console.log(`  codigo:  ${l.codigo}`);
  console.log(`  ativada: ${new Date(l.ativado_em).toLocaleString('pt-BR')}`);
  console.log(`  maquina: ${l.maquina}\n`);
}

async function ativar(codigo) {
  const limpo = String(codigo || '').trim().toUpperCase();
  if (!/^ZEUS-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(limpo)) {
    console.error('\nEsse codigo nao esta no formato certo.');
    console.error('O formato e ZEUS-XXXX-XXXX, como aparece no seu LICENCA.txt.\n');
    process.exit(1);
  }

  const dados = {
    codigo: limpo,
    maquina: os.hostname(),
    usuario: os.userInfo().username,
    sistema: `${os.type()} ${os.release()}`,
    versao: '2.0.0',
  };

  let resposta;
  try {
    const r = await fetch(`${SERVIDOR}/api/ativar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });
    resposta = await r.json();
    if (!r.ok || !resposta.valido) {
      console.error(`\n${resposta.erro || 'Nao consegui confirmar esse codigo.'}`);
      console.error('Confira letra por letra, ou pegue o codigo no arquivo LICENCA.txt.\n');
      process.exit(1);
    }
  } catch (e) {
    console.error('\nNao consegui falar com o servidor de licenca agora.');
    console.error('Confira a sua internet e tente de novo em instantes.\n');
    process.exit(1);
  }

  const registro = {
    codigo: resposta.codigo,
    nome: resposta.nome,
    email: resposta.email,
    ativado_em: resposta.ativado_em,
    maquina: `${dados.maquina} (${dados.sistema})`,
    usuario: dados.usuario,
    ativacoes: resposta.ativacoes,
  };

  fs.mkdirSync(path.dirname(ARQUIVO), { recursive: true });
  fs.writeFileSync(ARQUIVO, JSON.stringify(registro, null, 2), 'utf8');

  console.log(`\nLicenca confirmada, ${resposta.nome}.`);
  console.log('Este ZEUS esta ativo nesta maquina.\n');
}

const arg = process.argv[2];
if (!arg || arg === '--status') mostrarStatus();
else ativar(arg);
