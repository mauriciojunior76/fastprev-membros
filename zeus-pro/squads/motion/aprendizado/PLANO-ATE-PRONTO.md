# Plano até "está tudo pronto"

Escrito em 05/09/2026, depois de revisar conferindo no disco, não de memória.

## O que "pronto" significa

Só digo "está tudo pronto" quando as três frases abaixo forem verdade ao mesmo tempo:

1. As três peças antigas (Hamilton, ZeusTrafego, Bernardo) têm som pelo sistema novo
   e foram entregues de novo, com o arquivo anterior guardado.
2. Uma gravação real do o dono do canal, de 10 minutos ou mais, virou pelo menos 3 vídeos
   aprovados por ele, passando pelo `aprendizado.js --revisar` sem eu tocar em número
   nenhum à mão.
3. O `aprendizado.js --relatorio` não lista nenhuma lição com 2 ou mais repetições
   sem checagem, e o `--revisar` das quatro peças passa limpo.

Antes disso é "avançou muito", não "pronto".

## O que está bom (provado, não achado)

- Cópia de segurança dos vídeos: testada com Zoom aberto, 7 finais no pacote, alarme
  de sumiço testado.
- Som replicável: reproduziu a mixagem aprovada com diferença abaixo de 0,6 dB.
- Sistema de aprendizado: 12 de 13 lições com checagem, cada checagem validada com
  defeito plantado E contra as peças aprovadas.
- Organização: 10 de 10 produções no padrão, busca por fala funcionando.
- Documentação: porta de entrada única e regra de desempate (o arquivo de dados manda).

## O que está ruim, na ordem do que mais dói

### 1. O som só existe na peça do Paulo

`SFX_EVENTS` declarado: Paulo 13 de 13. Hamilton 0 de 13. ZeusTrafego 0 de 17.
Bernardo 0 de 6. O o dono do canal pediu duas vezes que fosse aplicado na isca de baleia e
no tráfego. Não foi. O sistema está pronto; o trabalho de declarar não foi feito.

### 2. "Gravação vira vídeo" é meia verdade

O que o lote produz hoje: corte da transcrição mais um esqueleto de composition com
UMA cena vazia. Ele não escreve as cenas. Entre o esqueleto e o vídeo pronto continua
existindo o trabalho criativo de montar cada cena, que é meu e é por peça.

O que dá para automatizar aí: gerar a lista de cenas a partir das frases do corte,
uma cena por frase forte, escolhendo o molde da `BIBLIOTECA-DE-MOLDES.md` pelo tipo
de frase (número, palavra conceito, comparação, lista). Isso tira o "por onde começo"
e deixa só o ajuste fino. Não existe ainda.

### 3. Nunca rodou numa gravação de verdade

Toda validação da escala foi numa gravação sintética, colando as quatro transcrições
existentes. Uma call real de 20 minutos tem pausa, ruído, "né", repetição. O minerador
pode se comportar diferente. Sem essa prova, a escala é promessa.

### 4. Achados que ficaram sem conserto

- ZeusTrafego, cena `telegram-abre`: três elementos com topos em 378, 383 e 380.
  O gate achou, ninguém corrigiu.
- Tile do rosto do Paulo a 24,97 quadros numa peça de 60. Aviso existe; conserto
  depende do arquivo bruto da call, que não está no repositório.

### 5. Pedaços do plano original que ficaram para trás

- `trilha-avaliar.py` (ordenar trilha candidata pela régua) não foi feito.
- 102 arquivos fora do histórico. O snapshot diário roda, mas não existe um commit
  que diga "aqui nasceu o sistema de som e aprendizado".

## O plano, em ordem

### Fase A: as três peças antigas entram no sistema de som

Por que primeiro: é pedido explícito dele, duas vezes, e é o único item da lista que
não depende de nada novo.

1. Hamilton: declarar `SFX_EVENTS` nos 13 componentes. Categorias novas que a peça
   traz (`objeto-3d`, número em cartão de vidro) precisam de som escolhido por ele.
   Gerar a folha `sfx-mapa.js HamiltonZeusReels --salvar`, ele aprova, mixar com
   `mixar-final.js`, revisar, trocar em `entregas/` guardando a anterior.
2. ZeusTrafego: mesmo caminho, 17 componentes, estilo Popular (sem trilha, densidade
   maior). Categorias de interface (`interface-mensagem`) precisam de som escolhido.
   Aproveitar e corrigir os 5px da cena `telegram-abre`.
3. Bernardo: 6 componentes, estilo Depoimento.

Cada uma termina com `aprendizado.js --revisar` limpo e `--aprovado` registrado.

### Fase B: o lote entrega cenas propostas, não esqueleto vazio

1. `scripts/propor-cenas.js`: lê o `narration.json` do corte e devolve um `SCENES`
   proposto, uma cena por frase forte, com o molde sugerido por tipo de frase
   (número, palavra conceito, comparação, lista, frase grande). Sai como
   `storyboard-proposto.md` na pasta do corte, para ele aprovar no papel antes de
   qualquer código.
2. `lote.js --propor-cenas` chama isso para cada corte.
3. O que continua manual, e é honesto dizer: escrever os componentes de cada cena.
   O molde reduz, não elimina.

### Fase C: a prova real

1. Ele manda uma gravação real (10 minutos ou mais) com transcrição, ou eu transcrevo.
2. Roda o caminho inteiro: `minerar-ganchos` → `lote --aplicar --propor-cenas` → ele
   aprova os storyboards → eu monto as cenas → `lote --renderizar` → ele assiste.
3. O que quebrar nesse caminho vira lição no `licoes.json` na mesma sessão.
4. Só depois de 3 vídeos aprovados por esse caminho, "pronto" vale.

### Fase D: fechar o resto

1. `trilha-avaliar.py` sobre as trilhas que existem, com a aprovada do Hamilton como
   prova da régua.
2. Um commit coerente com tudo desta rodada, mensagem dizendo o que nasceu.
3. Tile do rosto: quando o arquivo bruto aparecer, reexportar a 30 quadros e passar
   pelo `checar-cadencia.js`.

## Ordem e sessões

Cada fase numa sessão nova. Esta está com 20 MB e cada mensagem custa seis vezes
mais. A fase A cabe numa sessão; a B em outra; a C depende dele mandar a gravação.

## O que eu não faria

Não começar a fase C antes da A. A tentação é ir direto para a prova real porque é a
mais vistosa, mas a fase A é pedido explícito dele que já ficou para trás uma vez, e
o sistema de som sem as três peças antigas é sistema com uma peça só.

---

## Manual de Motion v3.0 incorporado (08/09/2026)

O bloco de motion do pacote APPLE DESIGN 6 entrou no motor. O que está no ar agora:

- Curvas de cauda longa e a camada avançada (`anticipate`, `overshootMicro`, `brake`,
  `gravity`, `lift`, `linear`) em `src/core/curves.ts`.
- Tempo por classe, massa do objeto, peso 0 a 10 e sincronia pela sílaba tônica em
  `src/core/tokens.ts`.
- Teto de cascata de 24 quadros em `src/core/choreo.ts` (`childDelayComTeto`).
- O manual inteiro virou código em `src/core/motion-spec.ts`, exportado como
  `motionV3` pelo `core/index.ts`.
- Quatro fiscais novos no `choreo-lint.js`: teto de cascata, amplitude acima de 16px,
  curva fora do vocabulário v3 e peça v3 sem palavras alinhadas. Peça que declara
  `motionVersion: 3` é reprovada; peça antiga só recebe aviso.
- Regras de peso e som (`--peso`, `--cena`) no `ds-som.js` do motion-apple.
- Proporções do palco 16:9 em `src/core/layout.ts` e o Transformar em `motion-spec.ts`.

Conflitos com as peças aprovadas e o motivo de cada decisão:
`squads/motion-apple/design-system/motion/CONFLITOS-v3.md`.

### O que ficou pendente

1. **Rodada 1 do pacote (storyboard), que nunca rodou.** É o bloco visual: `TRADUCAO.md`,
   `MANUAL-DE-ESCOLHA.md`, `MATRIZ-DE-CENAS.md` revisada e os registries novos
   (`seo-matrix`, `choice-paths`, `translation-map`, `repertory`, `uid-index`). O
   design-system do squad ainda está na 2.2. O plano inteiro está em
   `~/.claude/plans/typed-greeting-cerf.md`. É onde mora a cota de no máximo 2 cenas
   por família, que é o item que mais muda o resultado.
2. **Wide 16:9 completo**: falta o `wide-registry.json` e os mocks de aparelho, que vêm
   no pacote visual.
3. **Migrar uma peça para `motionVersion: 3`** e comparar lado a lado com a versão
   aprovada. Enquanto nenhuma peça rodar em v3, a regra existe mas nunca foi vista em
   movimento.

---

## Formato `vertical-mao` e direção dinâmica (08/09/2026)

O squad ganhou um segundo formato: vídeo vertical gravado de frente, na mão, que não é Reels de
call nem aula. Nasceu de uma referência externa que o o dono do canal trouxe, e o que veio dela foi
estrutura, nunca estética (o visual continua sendo o do design system).

### O que está no ar

- Manual completo em `squads/motion-apple/design-system/DIRECAO-DINAMICA.md` (11 seções):
  três estados de palco, regra de alternância, os 13 papéis narrativos, título persistente,
  repertório de 14 ideias de direção e a cena sob demanda.
- Regra em código: `registry/narrative-roles.json`, `stage-states.json`, `primitivas-atomicas.json`.
- `beats.js --formato vertical-mao` propõe papel e estado de palco por beat, aplicando a regra de
  alternância na sequência inteira.
- `cena-sob-demanda.js` compõe cena a partir de 12 primitivas quando o catálogo não cobre a fala.
- `ds-auditar.js --direcao`: quinto fiscal, reprova quem fura a alternância. Só roda em
  `vertical-mao`, então peça aprovada de `reels-call` passa intacta.
- Motor: `src/core/palco.ts` (geometria e alternância, puro), `LegendaCostura.tsx` e
  `FraseCinetica.tsx` em `src/modules/text-system/`.
- Testes: `squads/motion-apple/scripts/tests/testa-direcao-dinamica.js` (regra, léxico e ponta
  a ponta) e `scripts/testes/testa-palco.js` (paridade entre o registry e o código). Este segundo
  já provou o valor no primeiro dia: pegou uma faixa de palco que somava 1919 em vez de 1920.

### O que falta para o formato existir em vídeo

1. **Peça de teste renderizada.** Nenhum mp4 saiu ainda no formato novo. Sem isso, a regra está
   provada em número e não em imagem. É o próximo passo óbvio: uma peça curta com face-cam real do
   o dono do canal, alternando A, B e C, para ele ver e reclamar.
2. **Primitivas atômicas em componente.** As doze estão especificadas no registry e o
   `cena-sob-demanda.js` já emite o spec completo, mas ninguém desenha elas ainda. Falta
   `src/modules/primitivas-atomicas/` e o `ComporCena.tsx` que lê o spec.
3. **Momentos de interface do §6**: abas, grade que colapsa e botão de ação ainda não existem como
   recurso no `visual-registry` nem como componente.
4. **Print vira wireframe** (`print-para-esquema.js`): especificado na seção 11 do manual, não
   implementado. Hoje um print de apoio só serve como referência de posição para quem escreve a cena.
5. **Slot de imagem de metáfora**: o manual define quando entra e como pedir, mas nenhuma imagem foi
   gerada (gate de gasto: gerar imagem é escolha do o dono do canal, com o custo na frente).
6. **Horizontal testado**: `palcoHorizontal` existe e as proporções estão em `layout.ts`, mas
   nenhuma peça 16:9 rodou com os três estados.
