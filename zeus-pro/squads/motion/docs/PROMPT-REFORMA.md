# Prompt de reforma (esteira oficial, 05/09/2026)

Template do o dono do canal para reformar qualquer peça do zeus-motion. Trocar o que está entre colchetes. Os 7 passos e as regras valem para toda produção nova também, não só reforma.

```
Zeus Motion/Apple-Style: reforma o [NOME DA PEÇA].

O que me incomoda nele: [escreve com tuas palavras. Ex: pouca cena, fica parado demais no meio, a legenda repete o que já está na tela, o som entra fora de hora, a parte do [assunto] não tem nada visual, o final morre].

Segue a esteira do squad, sem pular etapa:

1. Confere a transcrição por palavra da peça. Não existe, transcreve antes.
2. Divide a fala em trechos por SIGNIFICADO, nunca por tempo, e escreve o papel de cada um (gancho, problema, explicação, exemplo, prova, clímax, chamada, respiro).
3. Para cada trecho, pergunta ao design system que tipo de informação é aquilo e recebe os candidatos. Escolhe lendo "use quando" e "não use quando", e escreve o motivo da escolha.
4. Monta o plano de cenas: âncora numa palavra real da fala, densidade alternando (nunca três cenas seguidas no mesmo nível), legenda calando onde o palco já tem texto ou número grande, movimento com entrada, ação, foco, sustentação e saída, e som por peso do gesto.
5. Passa nos fiscais automáticos: ritmo, som, cena parada tempo demais, uso do design system.
6. Gera o código e a folha de storyboard, e PARA. Me manda a folha para eu aprovar. Nenhum render antes do meu OK.
7. Depois do meu OK: monta os componentes, revisa quadro a quadro, renderiza e me manda o vídeo aqui na conversa.

Regras que não se negociam:
- Nada de copiar cena, texto ou componente de outra peça. Cada vídeo é único.
- Se a fala não dá o número, o prazo ou a prova, não inventa: escolhe um recurso que não exija.
- Trecho sem estrutura clara é locutor e legenda, e isso é decisão certa, não preguiça.
- O que já foi reprovado antes continua reprovado, mesmo que o manual novo sugira o contrário.

No fim, me diz em duas linhas o que mudou de verdade em relação à versão anterior.
```

## Como os passos casam com o protocolo P0 a P11 (`ZOOM-REEL-MOTION.md`)

| Passo do template | Protocolo |
|---|---|
| 1 transcrição | P0b (bruto) e P3 (cortado) |
| 2 trechos por significado | P4, seção 4 do playbook |
| 3 candidatos do design system | `docs/design-system-v2/design-router.json` (classify) + `moldes-index.json` (triggers); motivo vai no comentário da cena em `tokens.ts` |
| 4 plano de cenas | `tokens.ts SCENES` + `choreography.ts` |
| 5 fiscais | `choreo-lint.js`, `sfx-mapa.js`, `checar-cadencia.js`, `checar-asset-repetido.js`, `checar-pedido-literal.js`, `pre-render-validate.js` |
| 6 folha e PARAR | P5 `storyboard.js`; render só com OK |
| 7 render e entrega | P6 a P11, com `revisor-visual-motion` antes de mandar |

Primeira produção que rodou por esta esteira: `CarlosSemeReels` (05/09/2026).
