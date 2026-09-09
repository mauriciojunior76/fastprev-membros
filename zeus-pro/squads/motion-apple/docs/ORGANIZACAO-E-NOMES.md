# Organização e nomes: achar o que já foi feito, inclusive um pedaço

Regra do squad. Vale para toda peça de vídeo, sem exceção.

O problema que ela resolve: em setembro de 2026 a pasta `output/` tinha 16 produções e
três convenções de nome ao mesmo tempo, `ZeusTrafego` e `01-zeus-trafego` eram a mesma
coisa em duas pastas, e o arquivo se chamava `PauloRuizReels-v01.mp4`, nome que só quem
já sabia o que era conseguia entender. Nenhuma produção tinha índice de cena, então
reaproveitar um pedaço significava assistir tudo de novo, ou refazer.

## As 5 leis

1. **Uma produção, uma pasta, todas as versões juntas.** Nunca a mesma peça em duas
   pastas. Nunca versão espalhada em `_preview` ou `_old`.
2. **O nome diz o assunto, não o código.** `03-isca-hamilton` se acha; `HamiltonZeusReels`
   só quem escreveu acha.
3. **A versão final mora sozinha, fora da pasta de trabalho.** Rascunho e entrega não
   se misturam: é assim que se manda o arquivo errado.
4. **Toda produção tem índice de cena com a fala.** É o que deixa achar um pedaço meses
   depois, porque ninguém lembra do nome da cena, todo mundo lembra do que foi dito.
5. **Nada é apagado, só reorganizado.** Versão reprovada continua existindo, com o motivo
   no nome.

## Onde cada coisa mora

```
squads/motion/output/<NN>-<assunto-em-palavras>/      TRABALHO: tudo junto
    producao.json           a ficha: tema, cliente, composition, contagem de versões
    LEIA-ME.md              gerado: onde está cada coisa e a tabela de cenas
    cenas.json              gerado: o índice que deixa achar um pedaço
    <Composition>-v01.mp4   as versões, todas, inclusive as reprovadas
    ...-storyboard-vNN.md   os storyboards
    ...-sfx-mapa-vNN.md     os mapas de som

entregas/videos/<assunto>/                                 ENTREGA: só a final
    AAAA-MM-DD-<assunto>-FINAL-aprovado.mp4
    LEIA-ME.md
    _versions/              as que já foram entregues antes, com o motivo no nome
```

O código vive à parte, em `src/compositions/<Composition>/`, e não segue esta regra:
lá o nome é o da composition, porque é o que o Remotion carrega.

## Como se chama cada arquivo

| Coisa | Nome | Exemplo |
|---|---|---|
| Pasta de trabalho | `NN-assunto-em-palavras` | `03-isca-hamilton` |
| Versão de trabalho | `<Composition>-vNN.mp4` | `HamiltonZeusReels-v18.mp4` |
| Pasta de entrega | `assunto-em-palavras` | `isca-baleia-hamilton` |
| Entrega aprovada | `AAAA-MM-DD-<assunto>-FINAL-aprovado.mp4` | `2026-09-04-reel-instagram-do-mentor-FINAL-aprovado.mp4` |
| Entrega antiga | `AAAA-MM-DD-<assunto>-vNN-<motivo>.mp4` | `2026-09-04-reel-instagram-do-mentor-v19-trilha-antiga.mp4` |

O motivo no nome da versão antiga não é enfeite: é o que evita reabrir três arquivos
para descobrir qual era o reprovado.

## O assunto sai da transcrição, não do chute

O tema de uma peça é o que ela FALA. O organizador lê `data/narration.json` (a
transcrição por palavra da própria narração), conta as palavras de conteúdo e mostra as
mais repetidas mais a frase de abertura. Isso não vira nome sozinho: é sugestão, e o
nome final é escolhido por quem manda. Mas ninguém precisa mais assistir o vídeo para
lembrar do que ele trata.

## Achar um pedaço depois

```bash
node scripts/organizar-producao.js --achar "aquela parte que fala de conexao"
```

Procura em todas as produções ao mesmo tempo e responde com a produção, o segundo, o
nome da cena, o componente que a desenha e a fala. Daí dá para reaproveitar o pedaço
sem refazer.

Só entra na busca produção que tem `cenas.json`. Produção sem índice é invisível.

## Os comandos

```bash
node scripts/organizar-producao.js --auditar
node scripts/organizar-producao.js <Composition> --tema "assunto em palavras" --cliente <slug>
node scripts/organizar-producao.js <Composition> --tema "..." --aplicar
node scripts/organizar-producao.js --achar "frase que eu lembro"
```

Sem `--aplicar` nada é gravado. Com `--aplicar`, grava a ficha, o LEIA-ME e o índice de
cenas, e cataloga no Zeus Atlas para achar pela frase falada também fora do squad.

## O gate

Peça entregue ao o dono do canal termina com:

1. a pasta de trabalho no padrão, com todas as versões juntas;
2. `producao.json`, `LEIA-ME.md` e `cenas.json` gravados;
3. a final em `entregas/videos/<assunto>/` com data e `FINAL-aprovado` no nome;
4. as anteriores em `_versions/` com o motivo no nome;
5. catalogada no Atlas.

Faltando qualquer um, a entrega não está pronta, mesmo com o vídeo perfeito: daqui a
seis meses ninguém acha.
