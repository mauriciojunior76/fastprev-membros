#!/usr/bin/env node
/**
 * Compila os tokens de design em CSS pronto para usar.
 *
 * Uso: node templates/design-tokens/build.js [nome-da-marca]
 *
 * Entrada:  core.json + brands/<marca>.json
 * Saida:    css/marca-<marca>.css
 *
 * Zero dependencia, de proposito: quem instala o ZEUS nao precisa instalar
 * mais nada para ter o sistema visual funcionando.
 *
 * NUNCA edite o CSS gerado na mao. Edite o JSON e rode isto de novo.
 */

const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const marca = process.argv[2] || 'exemplo';

const core = JSON.parse(fs.readFileSync(path.join(DIR, 'core.json'), 'utf8'));
const arquivoMarca = path.join(DIR, 'brands', `${marca}.json`);

if (!fs.existsSync(arquivoMarca)) {
  console.error(`Marca "${marca}" nao encontrada em brands/.`);
  console.error('Marcas disponiveis:', fs.readdirSync(path.join(DIR, 'brands')).map((f) => f.replace('.json', '')).join(', '));
  process.exit(1);
}

const m = JSON.parse(fs.readFileSync(arquivoMarca, 'utf8'));
const linhas = [];

linhas.push('/* GERADO AUTOMATICAMENTE. Nao edite este arquivo. */');
linhas.push(`/* Fonte: core.json + brands/${marca}.json */`);
linhas.push(`/* Regerar: node templates/design-tokens/build.js ${marca} */`);
linhas.push('');
linhas.push(':root {');

// ---- cores ----
linhas.push('  /* cores */');
for (const [nome, valor] of Object.entries(m.cores || {})) {
  linhas.push(`  --cor-${nome.replace(/_/g, '-')}: ${valor};`);
}

// ---- tipografia ----
const perfil = core.perfis_tipograficos[m.perfil_tipografico || 'sobrio'];
linhas.push('');
linhas.push('  /* famílias */');
for (const [nome, valor] of Object.entries(perfil)) {
  linhas.push(`  --fonte-${nome}: ${valor};`);
}

// ---- escala tipografica fluida (calculada, nao escrita a mao) ----
const e = core.escala_tipografica;
linhas.push('');
linhas.push('  /* escala tipográfica fluida: calculada, cresce com a tela */');
for (const degrau of e.degraus) {
  const minPx = e.base_min_px * Math.pow(e.razao_min, degrau);
  const maxPx = e.base_max_px * Math.pow(e.razao_max, degrau);
  const minRem = minPx / 16;
  const maxRem = maxPx / 16;

  // reta entre os dois viewports: y = a*vw + b
  const inclinacao = (maxPx - minPx) / (e.viewport_max_px - e.viewport_min_px);
  const vw = (inclinacao * 100).toFixed(3);
  const intercepto = ((minPx - inclinacao * e.viewport_min_px) / 16).toFixed(3);

  const nome = degrau < 0 ? `menor${Math.abs(degrau)}` : `t${degrau}`;
  linhas.push(
    `  --texto-${nome}: clamp(${minRem.toFixed(3)}rem, ${intercepto}rem + ${vw}vw, ${maxRem.toFixed(3)}rem);`
  );
}

// ---- espacamento ----
linhas.push('');
linhas.push('  /* espaçamento */');
for (const mult of core.espacamento.escala) {
  const nome = String(mult).replace('.', '-');
  linhas.push(`  --espaco-${nome}: ${core.espacamento.base_px * mult}px;`);
}

// ---- geometria ----
linhas.push('');
linhas.push('  /* geometria */');
for (const [nome, valor] of Object.entries(core.geometria)) {
  linhas.push(`  --${nome.replace(/_/g, '-')}: ${valor};`);
}
if (m.geometria_preferida) {
  linhas.push(`  --raio-padrao: var(--${m.geometria_preferida.replace(/_/g, '-')});`);
}

// ---- transicoes ----
linhas.push('');
linhas.push('  /* transições */');
for (const [nome, valor] of Object.entries(core.transicoes)) {
  linhas.push(`  --transicao-${nome.replace(/_/g, '-')}: ${valor};`);
}

linhas.push('}');
linhas.push('');
linhas.push('/* respeita quem pediu menos movimento no sistema operacional */');
linhas.push('@media (prefers-reduced-motion: reduce) {');
linhas.push('  *, *::before, *::after {');
linhas.push('    animation-duration: 0.01ms !important;');
linhas.push('    transition-duration: 0.01ms !important;');
linhas.push('  }');
linhas.push('}');
linhas.push('');

const destino = path.join(DIR, 'css');
fs.mkdirSync(destino, { recursive: true });
const arquivo = path.join(destino, `marca-${marca}.css`);
fs.writeFileSync(arquivo, linhas.join('\n'), 'utf8');

const variaveis = linhas.filter((l) => l.trim().startsWith('--')).length;
console.log(`Gerado: ${path.relative(process.cwd(), arquivo)}`);
console.log(`${variaveis} variáveis de CSS a partir de core.json + brands/${marca}.json`);
console.log('\nPara usar: cole o conteúdo do arquivo dentro de uma tag <style> na página,');
console.log('e use as variáveis, por exemplo: color: var(--cor-texto-principal);');
