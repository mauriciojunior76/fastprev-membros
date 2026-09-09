#!/usr/bin/env node
/**
 * Indexador de memoria: le todos os arquivos de memory/, extrai o frontmatter
 * e monta um catalogo que o ZEUS usa para achar informacao rapido.
 *
 * Uso:
 *   node scripts/memory-index.js            gera o indice
 *   node scripts/memory-index.js --auditar  aponta problemas sem gerar nada
 */

const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const MEMORIA = path.join(RAIZ, 'memory');
const SAIDA = path.join(MEMORIA, '_index.json');
const TETO_INDICE = 15000;

const IGNORAR = ['_arquivo', '_learning', '_index.json', '_templates', 'node_modules'];
const CAMPOS = [
  'nome', 'descrição', 'camada', 'tipo', 'origem', 'confiança',
  'sensibilidade', 'responsável', 'status', 'criado_em', 'atualizado_em', 'validade'
];

function lerFrontmatter(conteudo) {
  const m = conteudo.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const dados = {};
  for (const linha of m[1].split(/\r?\n/)) {
    const sep = linha.indexOf(':');
    if (sep < 1) continue;
    const chave = linha.slice(0, sep).trim();
    const valor = linha.slice(sep + 1).trim();
    if (CAMPOS.includes(chave)) dados[chave] = valor;
  }
  return dados;
}

function varrer(pasta, acumulado = []) {
  for (const nome of fs.readdirSync(pasta)) {
    if (IGNORAR.includes(nome)) continue;
    const completo = path.join(pasta, nome);
    const info = fs.statSync(completo);
    if (info.isDirectory()) varrer(completo, acumulado);
    else if (nome.endsWith('.md')) acumulado.push(completo);
  }
  return acumulado;
}

if (!fs.existsSync(MEMORIA)) {
  console.log('Pasta memory/ ainda nao existe. Rode node scripts/setup.js primeiro.');
  process.exit(0);
}

const auditar = process.argv.includes('--auditar');
const arquivos = varrer(MEMORIA);
const entradas = [];
const problemas = [];

for (const caminho of arquivos) {
  const relativo = path.relative(RAIZ, caminho).replace(/\\/g, '/');
  const conteudo = fs.readFileSync(caminho, 'utf8');
  const fm = lerFrontmatter(conteudo);
  const nomeArquivo = path.basename(caminho, '.md');

  if (!fm) {
    problemas.push(`${relativo}: sem frontmatter. Toda memoria precisa dele.`);
    continue;
  }
  if (!fm['descrição']) problemas.push(`${relativo}: falta o campo descricao, que e o que faz o recall funcionar.`);
  if (!fm.camada) problemas.push(`${relativo}: falta o campo camada.`);
  if (!fm.tipo) problemas.push(`${relativo}: falta o campo tipo (fato, hipotese, decisao...).`);
  if (fm.nome && fm.nome !== nomeArquivo) {
    problemas.push(`${relativo}: o campo nome ("${fm.nome}") difere do nome do arquivo.`);
  }
  if (fm.validade && fm.validade !== 'null') {
    const hoje = new Date().toISOString().slice(0, 10);
    if (fm.validade < hoje) problemas.push(`${relativo}: passou da data de revisao (${fm.validade}).`);
  }

  entradas.push({
    arquivo: relativo,
    nome: fm.nome || nomeArquivo,
    descrição: fm['descrição'] || '',
    camada: fm.camada || 'sem-camada',
    tipo: fm.tipo || 'sem-tipo',
    sensibilidade: fm.sensibilidade || 'normal',
    status: fm.status || 'ativo',
    atualizado_em: fm.atualizado_em || null,
    tamanho: conteudo.length
  });
}

if (auditar) {
  console.log(`\nAUDITORIA DA MEMORIA: ${arquivos.length} arquivo(s)\n`);
  if (!problemas.length) console.log('Nenhum problema encontrado.');
  else problemas.forEach((p) => console.log(`  - ${p}`));

  const indice = path.join(MEMORIA, 'INDICE.md');
  if (fs.existsSync(indice)) {
    const tam = fs.readFileSync(indice, 'utf8').length;
    console.log(`\nIndice: ${tam} de ${TETO_INDICE} caracteres.`);
    if (tam > TETO_INDICE) {
      console.log('ACIMA DO TETO. Mova linhas frias para memory/_arquivo/ antes de adicionar novas.');
    }
  }
  process.exit(problemas.length ? 1 : 0);
}

const porCamada = {};
for (const e of entradas) {
  porCamada[e.camada] = (porCamada[e.camada] || 0) + 1;
}

fs.writeFileSync(
  SAIDA,
  JSON.stringify(
    { gerado_em: new Date().toISOString(), total: entradas.length, por_camada: porCamada, entradas },
    null,
    2
  ),
  'utf8'
);

console.log(`Indice gerado: ${entradas.length} memoria(s) catalogada(s).`);
for (const [camada, n] of Object.entries(porCamada).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${camada.padEnd(18)} ${n}`);
}
if (problemas.length) {
  console.log(`\n${problemas.length} aviso(s). Rode com --auditar para ver quais.`);
}
