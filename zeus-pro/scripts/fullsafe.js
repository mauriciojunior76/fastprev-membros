#!/usr/bin/env node
/**
 * FULLSAFE: guarda uma copia numerada antes de qualquer alteracao.
 *
 * Uso:
 *   node scripts/fullsafe.js versionar <caminho> "motivo"
 *   node scripts/fullsafe.js voltar <caminho> <numero-da-versao>
 *   node scripts/fullsafe.js listar <caminho>
 *
 * Lei: versao nunca e' apagada, nem durante um rollback.
 */

const fs = require('fs');
const path = require('path');

function caminhoRegistry(alvo) {
  return path.join(path.dirname(alvo), '_versions', 'registry.json');
}

function lerRegistry(alvo) {
  try {
    return JSON.parse(fs.readFileSync(caminhoRegistry(alvo), 'utf8'));
  } catch (e) {
    return { _fullsafe: true, _atualizado: null, arquivos: {} };
  }
}

function salvarRegistry(alvo, registry) {
  const destino = caminhoRegistry(alvo);
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  registry._atualizado = new Date().toISOString().slice(0, 10);
  fs.writeFileSync(destino, JSON.stringify(registry, null, 2), 'utf8');
}

function versionar(alvo, motivo) {
  if (!fs.existsSync(alvo)) {
    console.log(`Arquivo novo, nada a versionar: ${alvo}`);
    return 0;
  }
  const nome = path.basename(alvo);
  const ext = path.extname(nome);
  const base = nome.slice(0, nome.length - ext.length);

  const registry = lerRegistry(alvo);
  const entrada = registry.arquivos[nome] || { versao_atual: 0, versoes: [] };
  const proxima = entrada.versao_atual + 1;

  const pastaVersoes = path.join(path.dirname(alvo), '_versions');
  fs.mkdirSync(pastaVersoes, { recursive: true });
  const destino = path.join(pastaVersoes, `${base}.v${proxima}${ext}`);
  fs.copyFileSync(alvo, destino);

  entrada.versao_atual = proxima;
  entrada.versoes.push({
    v: proxima,
    data: new Date().toISOString().slice(0, 10),
    motivo: motivo || 'sem motivo informado',
    caminho: path.relative(path.dirname(alvo), destino).replace(/\\/g, '/')
  });
  registry.arquivos[nome] = entrada;
  salvarRegistry(alvo, registry);

  console.log(`Versao ${proxima} guardada. Para voltar:`);
  console.log(`  node scripts/fullsafe.js voltar "${alvo}" ${proxima}`);
  return proxima;
}

function voltar(alvo, numero) {
  const nome = path.basename(alvo);
  const ext = path.extname(nome);
  const base = nome.slice(0, nome.length - ext.length);
  const origem = path.join(path.dirname(alvo), '_versions', `${base}.v${numero}${ext}`);

  if (!fs.existsSync(origem)) {
    console.error(`Versao ${numero} nao existe para ${nome}.`);
    process.exit(1);
  }

  // guarda o estado atual antes de voltar: nada se perde, nunca
  versionar(alvo, `antes de voltar para a versao ${numero}`);
  fs.copyFileSync(origem, alvo);

  const registry = lerRegistry(alvo);
  const entrada = registry.arquivos[nome];
  if (entrada) {
    entrada.versoes[entrada.versoes.length - 1].motivo += ' (rollback aplicado)';
    salvarRegistry(alvo, registry);
  }
  console.log(`Pronto: ${nome} voltou para a versao ${numero}.`);
}

function listar(alvo) {
  const nome = path.basename(alvo);
  const entrada = lerRegistry(alvo).arquivos[nome];
  if (!entrada) {
    console.log(`Nenhuma versao guardada de ${nome}.`);
    return;
  }
  console.log(`Versoes de ${nome} (atual: ${entrada.versao_atual}):`);
  for (const v of entrada.versoes) {
    console.log(`  v${v.v}  ${v.data}  ${v.motivo}`);
  }
}

const [, , comando, alvo, extra] = process.argv;
if (!comando || !alvo) {
  console.log('Uso: node scripts/fullsafe.js versionar|voltar|listar <caminho> [motivo|versao]');
  process.exit(1);
}

if (comando === 'versionar') versionar(alvo, extra);
else if (comando === 'voltar') voltar(alvo, extra);
else if (comando === 'listar') listar(alvo);
else {
  console.error(`Comando desconhecido: ${comando}`);
  process.exit(1);
}
