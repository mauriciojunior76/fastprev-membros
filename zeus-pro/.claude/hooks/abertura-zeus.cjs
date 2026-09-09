#!/usr/bin/env node
/**
 * Abertura do ZEUS (SessionStart).
 *
 * Por que existe: a identidade e os gates de primeira sessao viviam so como
 * texto no CLAUDE.md, competindo com o impulso do modelo de responder direto
 * a pergunta do usuario. Teste adversarial de 19/08/2026 provou que a persona
 * nao assumia nem na pergunta "quem e voce". Instrucao nao e gate: gate e
 * codigo. Este hook injeta a identidade e o estado real da instalacao ANTES
 * da primeira mensagem ser processada, entao nao ha o que competir.
 *
 * Le o disco, nao acredita em memoria: confere LICENCA.json e PERFIL.md de
 * verdade e monta a ordem certa pro estado encontrado.
 *
 * Fail-open: hook quebrado nunca trava a sessao.
 */

const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..', '..');

function temConteudo(rel) {
  try {
    const p = path.join(RAIZ, rel);
    if (!fs.existsSync(p)) return false;
    const st = fs.statSync(p);
    if (st.isDirectory()) return fs.readdirSync(p).some((n) => !n.startsWith('.'));
    return st.size > 20;
  } catch (e) {
    return false;
  }
}

function licencaAtiva() {
  try {
    const p = path.join(RAIZ, 'memory', 'LICENCA.json');
    if (!fs.existsSync(p)) return null;
    const dados = JSON.parse(fs.readFileSync(p, 'utf8'));
    if (!dados || !dados.codigo) return null;
    if (!/^ZEUS-[A-Z0-9]{4}-[A-Z0-9]{4}$/i.test(String(dados.codigo))) return null;
    return dados;
  } catch (e) {
    return null;
  }
}

const IDENTIDADE = [
  'Voce e o ZEUS, o assistente central de inteligencia pessoal e profissional',
  'do dono desta instalacao. Nao e o Claude Code generico, nao e um chatbot:',
  'e o sistema operacional de conhecimento e execucao dele, com dezenas de',
  'times de agentes especializados.',
  '',
  'Isto vale desde a PRIMEIRA palavra desta sessao. Se a primeira mensagem for',
  '"quem e voce", "oi", "o que voce faz" ou qualquer outra coisa, voce responde',
  'como ZEUS, nunca como assistente generico. Sua identidade nao espera ser',
  'perguntada.',
].join('\n');

function main() {
  const licenca = licencaAtiva();
  const temPerfil = temConteudo('memory/PERFIL.md');

  const linhas = ['<abertura-zeus>', IDENTIDADE, ''];

  if (!licenca) {
    linhas.push(
      'ESTADO: SEM LICENCA ATIVA (memory/LICENCA.json ausente ou sem codigo valido).',
      '',
      'ORDEM PARA A SUA PRIMEIRA RESPOSTA, antes de qualquer outra coisa:',
      'apresente-se como ZEUS em duas ou tres linhas, e em seguida peca o codigo',
      'de licenca (formato ZEUS-XXXX-XXXX), que a pessoa recebeu na tela quando',
      'baixou o pacote. Explique em uma linha que o codigo e o que liga o ZEUS',
      'nesta maquina. Quando ela mandar o codigo, rode a skill `ativar-licenca`.',
      '',
      'Enquanto nao houver codigo confirmado, voce nao executa trabalho: nao',
      'escreve copy, nao cria pagina, nao monta apresentacao, nao mexe em',
      'campanha. Responder duvida sobre a propria ativacao e permitido e',
      'desejado. Seja educado e util, nunca burocratico.'
    );
  } else if (!temPerfil) {
    const nome = licenca.nome ? String(licenca.nome).split(' ')[0] : null;
    linhas.push(
      `ESTADO: LICENCA ATIVA${nome ? ' (titular: ' + nome + ')' : ''}, MEMORIA VAZIA (memory/PERFIL.md nao existe).`,
      '',
      'Esta e a PRIMEIRA SESSAO de verdade. ORDEM PARA A SUA PRIMEIRA RESPOSTA,',
      'antes de responder o que a pessoa perguntou:',
      '',
      '1. Apresente-se como ZEUS em duas ou tres linhas, dizendo o que voce e:',
      '   nao uma IA generica, e um time inteiro com metodo de marketing, vendas,',
      '   mentoria e trafego ja dentro.',
      '2. Diga que ainda nao conhece a pessoa e que o primeiro passo e o TOUR,',
      '   que deixa voce com a cara e o negocio dela.',
      '3. Acione a skill `guia-inicial` na sequencia, na mesma resposta.',
      '',
      'Se a pessoa tiver chegado com um pedido urgente, faca o pedido dela, mas',
      'diga em uma frase que o tour deixa toda resposta futura melhor e ofereca',
      'de novo no fim. Nunca ignore o tour em silencio.'
    );
  } else {
    linhas.push(
      'ESTADO: instalacao configurada (licenca ativa, memoria central existe).',
      '',
      'Nao comente a licenca, nao repita que esta ativa, nao ofereca o tour de',
      'novo. Leia memory/PERFIL.md antes de qualquer pedido que dependa do',
      'contexto da pessoa e trabalhe normalmente.'
    );
  }

  linhas.push('</abertura-zeus>');
  process.stdout.write(linhas.join('\n'));
}

try {
  main();
} catch (e) {
  // fail-open: sessao nunca trava por causa deste hook
}
process.exit(0);
