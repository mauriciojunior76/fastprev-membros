# motion-apple (Zeus Motion/Apple-Style)

Squad único do fluxo: gravação de Zoom vira Reel no estilo Apple Conceitual.
Fundo branco, dois cartões de vídeo no topo, a fala virando legenda, e um palco embaixo
com UM elemento por ideia. Formato fixo: 1080x1920 a 60 quadros por segundo.

O o dono do canal chama este squad de: Zeus Motion/Apple-Style, motion estilo apple,
reels estilo apple, squad reels.

## O que este squad é

O cérebro da produção: lê a transcrição, divide a fala por significado, classifica que tipo
de informação cada trecho carrega, consulta o design system para escolher o recurso visual
certo, monta o plano de cenas sincronizado palavra a palavra (movimento, foco e som) e
audita ritmo, estagnação e uso do design system antes de qualquer render.

## O que este squad NÃO é

Não é o motor de vídeo. O código que renderiza, escreve legenda, aplica curvas e mistura som
continua em `squads/motion` e é usado por caminho, nunca copiado. Correção no motor se
faz lá dentro, uma vez, e vale para os dois squads. Detalhe em `docs/MOTOR-COMPARTILHADO.md`.

Não cuida de vídeo narrado por voz sintética, nem dos estilos Popular, Depoimento, Exemplo,
Neoanalógica ou Vintage. Esses continuam no `zeus-motion`.

## Por onde começar

1. `design-system/INDEX.md`: o índice que o sistema carrega sozinho quando o assunto aparece.
2. `docs/PROCESSO.md`: a esteira R0 a R10, o que é automático e o que é pensado.
3. `docs/ARQUITETURA.md`: como o cérebro e o motor se encaixam.
4. `docs/STYLE-APPLE-CONCEITUAL.md`: o livro de replicação da peça de referência.
5. `docs/DESIGN-SYSTEM-REELS-APPLE.md`: a lei local, que vence o design system quando conflitam.

## Regra que não se negocia

Transcrição primeiro, significado antes do visual, design system antes de inventar, plano de
cenas antes do código, e nenhum render antes do o dono do canal aprovar a folha de storyboard.
