#!/usr/bin/env node
/**
 * lib/resolve-comp-dir.js — acha a pasta real de uma composition no disco.
 *
 * Ate a fase 6 da reforma (20/08/2026), todo script assumia a convencao fixa
 * `src/compositions/<Id>/`. Isso quebrou pros 6 casos de teste, que vivem em
 * `src/compositions/_casos/<Id>/` (organizacao pedida explicitamente no
 * plano da reforma, pra nao misturar fixture de regressao com composition de
 * entrega real). Resolve o caminho direto primeiro (caso comum, mais rapido);
 * se nao existir, procura em UM nivel de subpasta (cobre `_casos/` e
 * qualquer agrupamento futuro do mesmo tipo, sem precisar hardcodar o nome).
 *
 * Usado por pre-render-validate.js, choreo-lint.js e qa-frames.js — os 3
 * pontos que antes montavam `path.join(COMPOSITIONS_DIR, COMPOSITION)` na
 * mao. Fonte unica pra essa resolucao, pra nao divergir de novo entre eles.
 */
const fs = require("fs");
const path = require("path");

/**
 * @param {string} compositionsDir caminho absoluto de src/compositions
 * @param {string} compositionId id da composition (mesmo valor do <Composition id=... /> no Root.tsx)
 * @returns {string} caminho absoluto da pasta da composition (existente ou nao — quem chama decide o que fazer se nao existir)
 */
function resolveCompDir(compositionsDir, compositionId) {
  const direct = path.join(compositionsDir, compositionId);
  if (fs.existsSync(direct)) return direct;

  for (const entry of fs.readdirSync(compositionsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const nested = path.join(compositionsDir, entry.name, compositionId);
    if (fs.existsSync(nested)) return nested;
  }

  // Nao achou em lugar nenhum: devolve o caminho direto (comportamento
  // antigo) pra quem chama continuar gerando a mensagem de erro de sempre.
  return direct;
}

module.exports = { resolveCompDir };
