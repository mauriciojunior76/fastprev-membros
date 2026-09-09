# O motor compartilhado

Este squad é o cérebro. O motor que renderiza vídeo continua morando em `squads/motion` e é
usado por caminho, nunca copiado. Copiar criaria duas versões que divergem em uma semana, e toda
correção precisaria ser feita duas vezes.

## O que vive lá e é usado daqui

| Coisa | Caminho | Para quê |
|---|---|---|
| Peças de vídeo | `src/compositions/<Nome>Reels/` | as composições continuam lá |
| Núcleo de motion | `src/core/` | grade, coreografia, curvas, molas, contrato de som |
| Legenda | `src/modules/text-system/Captions.tsx` | a fala virando legenda, palavra a palavra |
| Transcrição | `scripts/transcribe-words.py` | áudio vira `data/narration.json` |
| Folha de storyboard | `scripts/storyboard.js` | a folha que o o dono do canal aprova |
| Lint de coreografia | `scripts/choreo-lint.js` | direção repetida, som sem movimento, componente aposentado |
| Trava pré-render | `scripts/pre-render-validate.js` | reprova antes de gastar render |
| Revisão por quadro | `scripts/qa-frames.js` e `qa-approve.js` | prints por cena e as sete notas |
| Render | `scripts/render.js` | único caminho para gerar o arquivo final |
| Som | `public/_sfx/catalogo.json`, `scripts/sfx-mapa.js` | peso do gesto escolhe arquivo e volume |
| Ícones | `public/_icones/icons-map.json`, `scripts/escolher-icone.js` | ícone por conceito, com rodízio |
| Aprendizado | `scripts/aprendizado.js`, `aprendizado/licoes.json` | escada de 1, 2 e 3 vezes |
| Contrato do código | `docs/zeus-motion-design-system.md` | o que é regra de código, não de estilo |

Os scripts deste squad acham tudo isso por `scripts/lib/ds-root.js`, nunca por caminho escrito na
mão em cada arquivo.

## A regra

Precisa corrigir algo do motor, corrige dentro do `zeus-motion`, uma vez. Vale para os dois squads
na hora. Nunca copie arquivo de motor para cá, e nunca crie aqui uma segunda versão de algo que já
existe lá.

## O que é só deste squad

Design system dos Reels Apple e seu índice, os agentes, a esteira, os scripts de inteligência
(beats, roteador, plano de cenas, fiscais), os documentos de estilo Apple, a memória e os casos.

## Fronteira de assunto

Vídeo narrado por voz sintética, estilos Popular, Depoimento, Exemplo, Neoanalógica e Vintage
continuam sendo do `zeus-motion`. Este squad só faz Zoom virando Reel no estilo Apple Conceitual.
