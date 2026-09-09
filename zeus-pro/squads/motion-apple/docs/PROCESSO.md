# A esteira, do vídeo bruto ao Reel

## Formato antes de esquema

Antes da etapa R2, dois eixos precisam estar resolvidos: o **tipo** (`reels-call`, `vertical-mao`
ou `aula`) e a **orientação** (`vertical` por padrão, `horizontal` quando o objetivo pedir).
Formato errado faz o esquema certo parecer errado. `vertical-mao` (uma pessoa gravada de frente,
na mão) usa os três estados de palco da direção dinâmica; `reels-call` segue como sempre foi.
Regra completa: `design-system/DIRECAO-DINAMICA.md`.

Dez etapas, na ordem. Cada uma diz quem faz, o que sai e quanto custa de leitura.
Tipo: AUTOMÁTICO é script que decide sozinho, PADRÃO é script com escolha guardada, PENSADO é
onde o julgamento importa e nunca vira automático.

| Etapa | Tipo | Comando ou quem | Sai daqui |
|---|---|---|---|
| R0 material bruto | AUTOMÁTICO | `scripts/video/cortar-fala.js`, `mapear-redundancia.js`, `face_track.py` | vídeo cortado e áudio nivelado |
| R1 transcrição | AUTOMÁTICO | `transcribe-words.py` | `data/narration.json` por palavra |
| R2 beats | PENSADO | `beats.js --formato <tipo>` mais `transcript-analyst` e `semantic-content-architect` | `01-transcript-digest.md`, `02-beats.json`, `03-visual-opportunities.json`. Em `vertical-mao`, cada beat sai com **papel narrativo** (um dos 13 do arco) e estado de palco sugerido |
| R3 plano de cenas | PENSADO | `ds-router.js --plan`, `cena-sob-demanda.js` mais `design-system-router` e `reels-motion-director` | `04-ds-retrieval.json`, `05-scene-plan.json`. O **estado de palco vem antes do molde**: o papel decide o estado, o estado filtra os recursos, o verbo escolhe o molde. Beat sem recurso vira **cena composta** (`03-cenas-compostas.json`) antes de cair em lettering |
| R4 storyboard | PADRÃO mais o dono | `scene-plan-to-tokens.js` e `storyboard.js` | folha para o o dono do canal aprovar |
| R5 componentes | PENSADO | `motion-dev` | as peças de cada cena |
| R6 fiscais | AUTOMÁTICO | `choreo-lint.js`, `pre-render-validate.js`, `ds-auditar.js --tudo` (o fiscal `direcao` só roda em `vertical-mao`) | `09-lint.json` |
| R7 revisão | PENSADO | `qa-frames.js`, `visual-reviewer`, `qa-approve.js` | as sete notas |
| R8 render | AUTOMÁTICO | `render.js` | o arquivo final |
| R9 o dono assiste | dono | o dono do canal | aprovação ou reclamação |
| R10 aprendizado | AUTOMÁTICO | `aprendizado.js` | a lição registrada |

Nada pula etapa. Nenhum render antes do OK na folha de storyboard.

## O que entrou na esteira com o design system 3.2 (06/09/2026)

Em R2, antes de fechar os beats, declare quantas cenas a fala pede: conte as afirmações por
minuto e leia a faixa na `design-system/MATRIZ-DE-CENAS.md`. Fala lenta pede 7 a 9 cenas, fala
rápida pede 14 a 16. Beat que não cabe na faixa é beat grande demais e vira dois.

Em R3, três coisas novas:

- Cena curta não recebe molde de montagem longa. Abaixo de 240 quadros, nada com `quadroCompleto`
  acima de 48 (`registry/build-registry.json`). Isso é escolha de candidato, não conserto depois.
- Menção de plataforma vira acento de passagem por cima da cena, não cena de interface. O
  `ds-router.js` já devolve qual variante e com que recorte. Cena de interface é quando a AÇÃO
  acontece dentro do aplicativo.
- Duas peças na mesma cena só com invariante declarado em `registry/composition-rules.json`.

Em R3 também, o som sai da ponte: `ds-som.js` traduz o gesto do design system no par do motor.
Gesto fora da ponte fica em silêncio declarado, nunca em som inventado.

Em R6 o `ds-auditar.js` cobra as três regras sozinho, e o `choreo-lint.js` cobra o teto e a
janela do acento (`acento-limite`).

## O custo de leitura, etapa por etapa

O que faz uma produção ficar cara não é o tamanho da tarefa, é o tanto de documento que se abre.
Por isso cada etapa lê só o que precisa:

| Etapa | O que o modelo lê | Tamanho |
|---|---|---|
| sempre | o índice do design system | 5 KB |
| R2 | o digest da fala | 2 a 4 KB |
| R3 | os candidatos que o roteador devolveu | 3 a 12 KB |
| R3 na dúvida | uma seção do manual, por comando | 2,5 KB |
| R4 | a folha de storyboard | 5 KB |
| R7 | os quadros e o relatório dos fiscais | imagens mais 2 KB |

Nunca entra no contexto: a lista de palavras da transcrição, o painel visual, o manual inteiro,
o registro visual inteiro, a memória inteira.

Referência medida em 05/09/2026: uma produção do jeito antigo custava por volta de 87 mil
unidades de leitura. Com esta esteira, o alvo é 37 mil, com teto de 55 mil.

## Onde o o dono do canal entra

Em dois lugares: aprova a folha de storyboard antes do render, e assiste o vídeo pronto. Reclamou,
a reclamação vira lição contada: uma vez fica escrita, duas vira conferência automática, três vira
trava que segura a entrega.

## Uma sessão por peça

Antes de mexer numa composição, confira se outra sessão já está trabalhando nela. Duas mãos no
mesmo arquivo quebram o trabalho das duas. Isso aconteceu em 05/09/2026 com o vídeo do Carlos.
