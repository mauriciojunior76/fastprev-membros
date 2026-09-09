#!/usr/bin/env node
/**
 * Testes automaticos de aceitacao do ZEUS PRO.
 * Uso: node tests/aceitacao/verificar.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const RAIZ = path.resolve(__dirname, '..', '..');
let passou = 0;
let falhou = 0;

function teste(nome, fn) {
  try {
    const r = fn();
    if (r === false) throw new Error('retornou falso');
    console.log(`  OK    ${nome}${typeof r === 'string' ? ' (' + r + ')' : ''}`);
    passou++;
  } catch (e) {
    console.log(`  FALHA ${nome}: ${e.message}`);
    falhou++;
  }
}

function existe(rel) {
  if (!fs.existsSync(path.join(RAIZ, rel))) throw new Error(`ausente: ${rel}`);
  return true;
}

console.log('\n== ESTRUTURA ==');
for (const f of [
  'README.md', 'INSTALL.md', 'QUICKSTART.md', 'LICENSE', 'SECURITY.md',
  'PRIVACY.md', 'DATA-GOVERNANCE.md', 'CONTRIBUTING.md', 'CHANGELOG.md',
  'ROADMAP.md', 'CLAUDE.md', '.env.example', '.gitignore',
  'core/autonomia.md', 'core/memoria-schema/FRONTMATTER.md',
  'onboarding/boot-da-inteligencia.md',
  'templates/DESIGN-SYSTEM-CENTRAL.md',
  'docs/ARCHITECTURE.md', 'docs/SQUADS.md', 'docs/AGENTS.md', 'docs/SKILLS.md',
  'docs/MEMORY.md', 'docs/OBSIDIAN.md', 'docs/ONBOARDING.md',
  'docs/CUSTOMIZATION.md', 'docs/DEPENDENCIAS-E-FONTES.md',
  'docs/RELATORIO-CLASSIFICACAO.md',
  'memory/LACUNAS-DE-CONHECIMENTO.md', 'memory/DIARIO-DE-BORDO-INICIAL.md'
]) {
  teste(`existe ${f}`, () => existe(f));
}

console.log('\n== REGRAS SEMPRE ATIVAS ==');
for (const r of [
  'orquestrador', 'memoria', 'autonomia-e-confirmacao', 'verificacao-de-entrega',
  'fullsafe', 'aprendizado', 'perguntas-e-lacunas', 'privacidade'
]) {
  teste(`regra ${r}`, () => existe(`.claude/rules/${r}.md`));
}

console.log('\n== SQUADS ==');
const SQ = [
  'copywriting', 'apresentacoes', 'ebooks', 'video', 'produtos-de-entrada',
  'trafego', 'branding', 'pesquisa', 'conhecimento', 'automacao',
  'desenvolvimento', 'planejamento-decisao'
];
for (const s of SQ) {
  teste(`squad ${s} completo`, () => {
    existe(`squads/${s}/squad.yaml`);
    existe(`squads/${s}/MEMORY.md`);
    existe(`squads/${s}/CHECKLIST.md`);
    const ag = fs.readdirSync(path.join(RAIZ, 'squads', s, 'agentes'));
    if (ag.length < 3) throw new Error(`só ${ag.length} agentes`);
    if (ag.length > 7) throw new Error(`${ag.length} agentes, acima do limite de 7`);
    return `${ag.length} agentes`;
  });
}
teste('squads silenciosos', () => {
  existe('squads/_dispatcher/squad.yaml');
  existe('squads/_quality-gate/squad.yaml');
  return true;
});
teste('time transversal', () => {
  existe('squads/_core-team/squad.yaml');
  const n = fs.readdirSync(path.join(RAIZ, 'squads/_core-team/agentes')).length;
  return `${n} agentes`;
});
teste('template de squad', () => existe('squads/_template/squad.yaml'));

console.log('\n== SKILLS ==');
for (const s of [
  'boot-inteligencia', 'diario-de-bordo', 'criar-squad',
  'pesquisar-ferramenta', 'ingerir-conhecimento'
]) {
  teste(`skill ${s}`, () => {
    const p = path.join(RAIZ, '.claude/skills', s, 'SKILL.md');
    if (!fs.existsSync(p)) throw new Error('ausente');
    const c = fs.readFileSync(p, 'utf8');
    if (!/^---[\s\S]*?name:\s*\S/.test(c)) throw new Error('sem frontmatter válido');
    if (!/description:/.test(c)) throw new Error('sem description');
    return true;
  });
}

console.log('\n== SINTAXE ==');
function varrerJS(dir, acc = []) {
  for (const n of fs.readdirSync(dir)) {
    if (['node_modules', '.git', '_versions'].includes(n)) continue;
    const p = path.join(dir, n);
    if (fs.statSync(p).isDirectory()) varrerJS(p, acc);
    else if (/\.(js|cjs|mjs)$/.test(n)) acc.push(p);
  }
  return acc;
}
for (const f of varrerJS(RAIZ)) {
  teste(`sintaxe ${path.relative(RAIZ, f).replace(/\\/g, '/')}`, () => {
    execSync(`node --check "${f}"`, { stdio: 'ignore' });
    return true;
  });
}

console.log('\n== JSON ==');
function varrerJSON(dir, acc = []) {
  for (const n of fs.readdirSync(dir)) {
    if (['node_modules', '.git', '_versions'].includes(n)) continue;
    const p = path.join(dir, n);
    if (fs.statSync(p).isDirectory()) varrerJSON(p, acc);
    else if (n.endsWith('.json')) acc.push(p);
  }
  return acc;
}
for (const f of varrerJSON(RAIZ)) {
  teste(`json ${path.relative(RAIZ, f).replace(/\\/g, '/')}`, () => {
    const c = fs.readFileSync(f, 'utf8');
    if (c.charCodeAt(0) === 0xfeff) throw new Error('tem BOM');
    JSON.parse(c);
    return true;
  });
}

console.log('\n== COMPORTAMENTO DOS HOOKS ==');
teste('roteador injeta contexto no gatilho certo', () => {
  const out = execSync(`node "${path.join(RAIZ, '.claude/hooks/context-router.cjs')}"`, {
    // sessão única a cada execução: o roteador não repete injeção na mesma
    // sessão, por design, então reusar o id faria o teste falhar na 2a vez
    input: JSON.stringify({ session_id: `teste-${process.pid}-${Date.now()}`, prompt: 'quero configurar o zeus pela primeira vez' })
  }).toString();
  if (!out.includes('contexto-roteado')) throw new Error('não injetou');
  return true;
});
teste('roteador fica quieto quando não há gatilho', () => {
  const out = execSync(`node "${path.join(RAIZ, '.claude/hooks/context-router.cjs')}"`, {
    input: JSON.stringify({ session_id: 'teste-aceitacao-2', prompt: 'xyzabc qwerty zzz nada aqui' })
  }).toString();
  if (out.trim()) throw new Error('injetou sem gatilho');
  return true;
});
teste('roteador não quebra com entrada inválida', () => {
  execSync(`node "${path.join(RAIZ, '.claude/hooks/context-router.cjs')}"`, { input: 'nao e json' });
  return 'fail-open funcionando';
});

const b64 = (s) => Buffer.from(s, 'base64').toString('utf8');
const CASOS = [
  ['bloqueia delete recursivo', b64('cm0gLXJmIGFsdm8='), 'deny'],
  ['bloqueia git destrutivo', b64('Z2l0IHJlc2V0IC0taGFyZCBIRUFEfjE='), 'deny'],
  ['bloqueia dump de credencial', b64('Y2F0IC5lbnY='), 'deny'],
  ['pergunta antes de instalar', 'npm install alguma-lib', 'ask'],
  ['pergunta antes de publicar', 'git push origin main', 'ask'],
  ['pergunta antes de apagar dado', b64('RFJPUCBUQUJMRSBjbGllbnRlcw=='), 'ask'],
  ['libera comando inofensivo', 'ls -la', 'liberado']
];
for (const [nome, cmd, esperado] of CASOS) {
  teste(nome, () => {
    const out = execSync(`node "${path.join(RAIZ, '.claude/hooks/guard-acoes-criticas.cjs')}"`, {
      input: JSON.stringify({ tool_input: { command: cmd } })
    }).toString();
    let d = 'liberado';
    try { d = JSON.parse(out).hookSpecificOutput.permissionDecision; } catch (e) {}
    if (d !== esperado) throw new Error(`esperado ${esperado}, veio ${d}`);
    return true;
  });
}

console.log('\n== DESIGN TOKENS ==');
teste('compila tokens da marca de exemplo', () => {
  execSync(`node "${path.join(RAIZ, 'templates/design-tokens/build.js')}" exemplo`, { stdio: 'ignore' });
  const css = fs.readFileSync(path.join(RAIZ, 'templates/design-tokens/css/marca-exemplo.css'), 'utf8');
  const n = (css.match(/^\s+--/gm) || []).length;
  if (n < 30) throw new Error(`só ${n} variáveis`);
  if (!css.includes('clamp(')) throw new Error('escala fluida não foi calculada');
  if (!css.includes('prefers-reduced-motion')) throw new Error('sem respeito a movimento reduzido');
  return `${n} variáveis`;
});

console.log('\n== VAULT ==');
teste('22 pastas com README', () => {
  const v = path.join(RAIZ, 'obsidian/ZEUS-VAULT');
  const pastas = fs.readdirSync(v).filter((n) => fs.statSync(path.join(v, n)).isDirectory());
  if (pastas.length !== 22) throw new Error(`${pastas.length} pastas`);
  for (const p of pastas) {
    if (!fs.existsSync(path.join(v, p, 'README.md'))) throw new Error(`${p} sem README`);
  }
  return '22 pastas';
});

console.log('\n== CONTAGEM DE SQUADS (doc bate com o disco) ==');
teste('a contagem escrita nos docs bate com as pastas reais', () => {
  const dir = path.join(RAIZ, 'squads');
  const pastas = fs.readdirSync(dir).filter((n) => {
    if (n.startsWith('_')) return false;
    return fs.statSync(path.join(dir, n)).isDirectory();
  });
  const doc = fs.readFileSync(path.join(RAIZ, 'docs/SQUADS.md'), 'utf8');
  const naTabela = new Set(
    (doc.match(/^\| ([a-z][a-z-]+) \|/gm) || []).map((l) => l.slice(2).split(' |')[0])
  );
  // Squad que existe no disco PRECISA estar documentado. O contrario nao vale
  // aqui: no repositorio fonte os times avancados ainda nao foram copiados,
  // eles entram na montagem do pacote. Quem cobra a lista completa e o build
  // (scripts/build-zeus-zip.js), que enxerga o pacote final.
  const faltando = pastas.filter((p) => !naTabela.has(p));
  if (faltando.length) throw new Error('existe no disco e nao esta em docs/SQUADS.md: ' + faltando.join(', '));
  return pastas.length + ' squads no disco, todos documentados';
});

console.log('\n== ORÇAMENTO DE CONTEXTO ==');
teste('contexto fixo abaixo do teto', () => {
  const out = execSync(`node "${path.join(RAIZ, 'scripts/medir-contexto.js')}"`).toString();
  const m = out.match(/TOTAL:\s*(\d+)/);
  if (!m) throw new Error('não consegui medir');
  const total = Number(m[1]);
  if (total > 100000) throw new Error(`${total} caracteres, acima do teto`);
  return `${total} chars, ${Math.round((total / 100000) * 100)}% do teto`;
});

console.log('\n== PRIVACIDADE ==');
teste('nenhum dado privado do sistema de origem', () => {
  const proibidos = ['Pichau', 'aios', 'megabrain', 'squads/lt-', 'seu-usuario'];
  const achados = [];
  // isentos: este próprio arquivo (contém a lista de termos por definição),
  // os arquivos de estado de execução (guardam caminho da máquina local e
  // nunca são versionados), e o ativador de licença, que precisa do endereço
  // real do servidor de licença pra funcionar.
  const ISENTOS = ['verificar.js', 'context-router-stats.json', 'ativar-licenca.js'];
  function varrer(dir) {
    for (const n of fs.readdirSync(dir)) {
      if (['node_modules', '.git', '_versions', 'vault-local'].includes(n)) continue;
      const p = path.join(dir, n);
      if (fs.statSync(p).isDirectory()) { varrer(p); continue; }
      if (ISENTOS.includes(n)) continue;
      if (!/\.(md|js|cjs|json|yaml|yml|txt)$/.test(n)) continue;
      const c = fs.readFileSync(p, 'utf8');
      for (const termo of proibidos) {
        if (c.includes(termo)) achados.push(`${path.relative(RAIZ, p)}: ${termo}`);
      }
    }
  }
  varrer(RAIZ);
  if (achados.length) throw new Error(achados.slice(0, 5).join(' | '));
  return 'limpo';
});

console.log('\n' + '='.repeat(55));
console.log(`PASSOU: ${passou}   FALHOU: ${falhou}`);
console.log('='.repeat(55) + '\n');
process.exit(falhou === 0 ? 0 : 1);
