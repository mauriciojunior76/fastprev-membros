#!/usr/bin/env node
/**
 * marca-check.js — o vídeo só roda com a marca de quem está usando.
 *
 * Existe por uma regra do pacote: o método viaja inteiro, a identidade visual
 * não. Quem recebe o Zeus Pro monta as mesmas animações com a marca DELE. Este
 * script é o gate que confere isso antes de qualquer render ou scaffold.
 *
 * Reprova quando:
 *   1. src/brand/marca.json não existe (onboarding não foi feito).
 *   2. O arquivo está vazio ou sem paleta.
 *   3. A paleta ainda é a de exemplo (o placeholder que veio no pacote).
 *   4. Três ou mais cores batem com a assinatura da marca de origem.
 *
 * Uso:
 *   node scripts/marca-check.js            # confere e sai 0 ou 1
 *   node scripts/marca-check.js --json     # saída legível por script
 *
 * Dentro do repositório de origem (onde existe a pasta design-core na raiz) o
 * gate é informativo: avisa e devolve 0. No pacote licenciado ele bloqueia.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const MARCA_PATH = path.join(ROOT, 'src', 'brand', 'marca.json');

/**
 * Assinatura visual da marca de origem. Não é uma lista de cores proibidas no
 * mundo: é o conjunto que, junto, faz alguém reconhecer de quem é o vídeo.
 *
 * Guardada como componentes de cor, e não como texto de cor, de propósito: o
 * arquivo que confere a cópia não pode ser, ele mesmo, a receita para copiar.
 */
const ASSINATURA_ORIGEM_RGB = [
  [255, 107, 107],
  [255, 159, 67],
  [254, 202, 87],
  [72, 219, 251],
  [10, 189, 227],
  [162, 155, 254],
  [253, 121, 168],
];

const ASSINATURA_ORIGEM = ASSINATURA_ORIGEM_RGB.map(
  (c) => '#' + c.map((n) => n.toString(16).padStart(2, '0')).join('')
);

/** Paleta neutra que sai de fábrica: usar ela é o mesmo que não ter marca. */
const PALETA_DE_EXEMPLO = ['#ffffff', '#000000', '#888888', '#e5e5e5'];

const TOLERANCIA = 40; // distância de cor abaixo disso conta como "a mesma cor"

function hexParaRgb(hex) {
  const h = String(hex || '').trim().replace('#', '');
  if (!/^[0-9a-f]{6}$/i.test(h)) return null;
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function distancia(a, b) {
  const x = hexParaRgb(a);
  const y = hexParaRgb(b);
  if (!x || !y) return Infinity;
  return Math.sqrt((x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2);
}

function pareceComAOrigem(cor) {
  return ASSINATURA_ORIGEM.some((ref) => distancia(cor, ref) < TOLERANCIA);
}

/** No repositório de origem o gate avisa; no pacote licenciado ele bloqueia. */
function ehPacoteLicenciado() {
  return !fs.existsSync(path.resolve(ROOT, '..', '..', 'design-core'));
}

function conferir() {
  const problemas = [];

  if (!fs.existsSync(MARCA_PATH)) {
    problemas.push(
      'A sua marca ainda não foi configurada. Rode o passo "Marca no vídeo" do boot ' +
        'da inteligência, ou peça: "configura a marca do meu vídeo".'
    );
    return { ok: false, problemas, marca: null };
  }

  let marca;
  try {
    marca = JSON.parse(fs.readFileSync(MARCA_PATH, 'utf8'));
  } catch (e) {
    problemas.push(`O arquivo da sua marca está ilegível: ${e.message}`);
    return { ok: false, problemas, marca: null };
  }

  const paleta = Array.isArray(marca.paleta)
    ? marca.paleta.filter(Boolean)
    : Object.values(marca.cores || {}).filter(Boolean);

  if (paleta.length < 3) {
    problemas.push('A sua paleta precisa de pelo menos três cores. Hoje tem ' + paleta.length + '.');
  }

  const invalidas = paleta.filter((c) => !hexParaRgb(c));
  if (invalidas.length) {
    problemas.push('Estas cores não estão no formato certo (#rrggbb): ' + invalidas.join(', '));
  }

  const soExemplo =
    paleta.length > 0 &&
    paleta.every((c) => PALETA_DE_EXEMPLO.some((p) => distancia(c, p) < TOLERANCIA));
  if (soExemplo) {
    problemas.push(
      'A sua paleta ainda é a de exemplo que veio no pacote. Coloque as suas cores de verdade.'
    );
  }

  const iguaisAOrigem = paleta.filter(pareceComAOrigem);
  if (iguaisAOrigem.length >= 3) {
    problemas.push(
      'Três ou mais cores da sua paleta são as da marca de origem (' +
        iguaisAOrigem.join(', ') +
        '). A identidade visual de origem não é licenciada: o método é seu, a cara não. ' +
        'Leia squads/motion-apple/MARCA-DO-USUARIO.md e use as suas cores.'
    );
  }

  if (!marca.estilo) {
    problemas.push(
      'Falta escolher o estilo do traço: "apple-conceitual", "classico" ou "proprio".'
    );
  }

  return { ok: problemas.length === 0, problemas, marca };
}

function main() {
  const resultado = conferir();
  const comoJson = process.argv.includes('--json');

  // No repositório de origem o gate não é o assunto: uma linha e segue.
  if (!resultado.ok && !comoJson && !ehPacoteLicenciado()) {
    console.log('Marca do vídeo: sem marca.json (repositório de origem, seguindo).');
    return process.exit(0);
  }

  if (comoJson) {
    console.log(JSON.stringify(resultado, null, 2));
  } else if (resultado.ok) {
    console.log('Marca conferida: pode gerar vídeo.');
    if (resultado.marca && resultado.marca.estilo) {
      console.log(`Estilo: ${resultado.marca.estilo}`);
    }
  } else {
    console.error('\nO vídeo não pode rodar ainda:\n');
    resultado.problemas.forEach((p) => console.error('  - ' + p));
    console.error('');
  }

  if (resultado.ok) return process.exit(0);
  if (!ehPacoteLicenciado()) {
    console.error('(repositório de origem: seguindo mesmo assim)\n');
    return process.exit(0);
  }
  process.exit(1);
}

if (require.main === module) main();

module.exports = { conferir, pareceComAOrigem, distancia, ASSINATURA_ORIGEM };
