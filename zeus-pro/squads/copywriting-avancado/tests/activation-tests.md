# TESTES DE ATIVAÇÃO — COPY KILLER MEGA SKILL

## O que é este arquivo
Testes padronizados para verificar se a skill ativa corretamente
em diferentes contextos e se os agentes certos são recrutados.

---

## TESTE 1 — Ativação por palavra-chave "copy"

Entrada: "cria uma copy de anúncio para o Agente Arquiteto"

Esperado:
- Skill ativa automaticamente (peso >= 41, tipo = copy)
- @copy-chief é recrutado
- @ad-copy-warlord é ativado para anúncio
- @eugene-schwartz-agent identifica nível de consciência
- Output entregue com H1 (max 32 chars), H2 (max 30), CTA (max 20)
- Palavra "mentoria" presente na headline
- Score Copy Auditor >= 60 antes de entregar

---

## TESTE 2 — Ativação por palavra-chave "gancho"

Entrada: "me dá 5 ganchos para post no Instagram sobre mentoria"

Esperado:
- @hook-warlord é recrutado
- 5 tipos de gancho diferentes (não 5 variações do mesmo tipo)
- Cada gancho passa no Teste do Estranho
- Nenhum gancho proibido na lista

---

## TESTE 3 — Ativação por canal "WhatsApp"

Entrada: "escreve uma mensagem de follow-up no WhatsApp para lead que não respondeu"

Esperado:
- @whatsapp-humanizer é recrutado
- Output em minúsculas
- Zero "!"
- Zero travessão
- Máximo 1 emoji
- Tom calmo, não insistente

---

## TESTE 4 — Ativação de contexto de negócio

Entrada: "faz um email de venda para o produto LT"

Esperado:
- @copy-chief carrega `business-context.md`
- Produto = Agente Arquiteto, R$67
- Prova social = um cliente do exemplo
- Resultado = 8 minutos, mentoria estruturada
- NUNCA mencionar Exemplo como produto principal neste email

---

## TESTE 5 — Aplicação de nível de consciência (Eugene Schwartz)

Entrada: "copy para público frio que não conhece o produto"

Esperado:
- @eugene-schwartz-agent diagnostica como Nível 1-2
- Copy começa com cena ou dor (não com o produto)
- NÃO mencionar "Agente Arquiteto" no gancho
- Constrói consciência antes de vender

---

## TESTE 6 — Aplicação de framework PASTOR em email longo

Entrada: "faz um email de venda longo usando PASTOR"

Esperado:
- Skill carrega `frameworks/pastor.md`
- Output tem os 6 blocos: P, A, S, T, O, R
- Exemplo com um cliente do exemplo no bloco S (Story/Solution)
- Oferta com stack e garantia no bloco O
- CTA único no bloco R

---

## TESTE 7 — Aplicação da matriz 2+8 para Meta Ads

Entrada: "preciso de 10 variações de criativos para Meta Ads"

Esperado:
- @ad-copy-warlord produz bloco 1 (2 próximas) + bloco 2 (8 variações)
- Cada variação altera UMA dimensão diferente
- Lógica de rotação entregue no final
- V8 Viagem Louca incluída como última variação

---

## TESTE 8 — Ativação da equação de valor (Hormozi)

Entrada: "como estruturo a oferta do Agente Arquiteto de forma irresistível?"

Esperado:
- @hormozi-offer-agent é recrutado
- Os 4 levers são trabalhados: resultado do sonho, probabilidade, delay, esforço
- Stack de valor apresentado com valores percebidos declarados
- Garantia sugerida com prazo e condição específica

---

## TESTE 9 — Copy Auditor bloqueando output ruim

Entrada de teste simulada (copy intencionalmente ruim):
"Olá! Espero que você esteja bem. Temos uma incrível oportunidade que vai mudar sua vida.
Não perca essa chance revolucionária!"

Esperado:
- @copy-auditor detecta score < 40
- Identifica: sinal de IA (Olá + Espero que esteja bem), frase batida (vai mudar sua vida, não perca essa chance, revolucionária)
- NÃO entrega ao usuário
- Reescreve internamente (máx 2 tentativas)
- Entrega versão com score >= 60

---

## TESTE 10 — Modo ADAPT (adaptar padrão campeão para outro nicho)

Entrada: "adapta o padrão Sofá Marrom para médico que quer lançar mentoria"

Esperado:
- Skill identifica modo ADAPT
- Produto adaptado: mentoria médica (não Agente Arquiteto)
- Estrutura mantida: resultado + valor + preço + CTA
- Nicho específico: "médico" aparece no copy
- Resultado específico do nicho: não "R$2.997" genérico mas algo coerente com o nicho médico
- 10 briefings no novo contexto

---

## RESULTADO ESPERADO: 10/10 TESTES PASSAM

Se qualquer teste falhar:
1. Identificar qual agente/módulo falhou
2. Atualizar o arquivo correspondente
3. Re-executar o teste

---

## STATUS DOS TESTES

| Teste | Descrição | Status |
|-------|-----------|--------|
| 1 | Ativação por "copy" | A executar |
| 2 | Ativação por "gancho" | A executar |
| 3 | Ativação por "WhatsApp" | A executar |
| 4 | Contexto de negócio LT | A executar |
| 5 | Nível de consciência frio | A executar |
| 6 | Framework PASTOR | A executar |
| 7 | Matriz 2+8 | A executar |
| 8 | Equação Hormozi | A executar |
| 9 | Copy Auditor bloqueando | A executar |
| 10 | Modo ADAPT | A executar |
