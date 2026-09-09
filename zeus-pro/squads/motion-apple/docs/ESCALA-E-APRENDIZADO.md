# Escala e aprendizado: de uma gravação longa para vários vídeos

Como o squad vai de uma gravação de 60 minutos para vários Reels, e como ele
aprende sozinho com o que já foi corrigido.

## Parte 1: o aprendizado

### A escada

O que decide o quanto uma lição é protegida é **quantas vezes o o dono do canal
precisou falar dela**:

| Vezes | Vira | Por quê |
|---|---|---|
| 1 | registro | Fica escrito. O agente lê antes de começar. |
| 2 | checagem automática | Ele repetir significa que a explicação escrita não pegou. Repetir a explicação de novo não resolve. |
| 3 ou mais | gate que bloqueia | Não se confia mais em atenção. A entrega para até passar. |

Atenção não escala. Código escala.

### Como o sistema sabe

- **Errei**: ele reclama, corrige, repete um pedido, ou usa palavra de
  irritação. Toda reclamação é um erro registrado, mesmo quando parece detalhe.
- **Acertei**: ele aprova a peça. Nesse instante o estado daquela peça vira o
  retrato do que é certo, e cada lição que ela respeita ganha uma prova a favor.

Não existe terceira fonte de verdade. O sistema não adivinha acerto sozinho.

### Os comandos

```bash
node scripts/aprendizado.js --revisar <Composition>
node scripts/aprendizado.js --relatorio
node scripts/aprendizado.js --reclamacao <id> "a frase dele"
node scripts/aprendizado.js --aprovado <Composition> --data AAAA-MM-DD
```

`--revisar` é o que roda antes de qualquer entrega: dispara todas as
conferências automáticas, bloqueia se falhar uma lição de três vezes ou mais, e
lista o que ainda depende do olho.

O registro vive em `aprendizado/licoes.json`. A contagem nunca se edita à mão:
é ela que decide se a lição vira gate, então chute ali desliga proteção.

## Parte 2: a escala

### O caminho

```
gravação de 60 min
   ↓  minerar-ganchos.js      acha os cortes, pela régua de gancho
   ↓  lote.js                 prepara N produções irmãs
   ↓  aprendizado.js          revisa cada uma antes de mostrar
```

### Por que isso economiza

Uma hora de gravação tem cerca de 9 mil palavras. Ler isso dentro da conversa
custa uns 12 mil tokens, e o custo se repete a cada resposta seguinte da mesma
sessão. O minerador lê o arquivo **fora** da conversa e devolve 20 linhas.

Vinte gravações lidas na conversa custariam 240 mil tokens. Pelo minerador,
custam menos de 6 mil.

### A régua de gancho

Vem de `docs/rules-on-demand/hook-intelligence.md`: dez gatilhos mentais, e o
gate que reprova abertura genérica, em primeira pessoa do mentor ou que começa
com emenda.

Peso maior para o que para o dedo: dizer que a pessoa está errando vale mais do
que prometer um resultado bonito. Gatilho na abertura vale cheio; mais adiante
vale metade, porque o espectador já decidiu antes de chegar lá.

Um gatilho foi **aprendido**, não copiado da régua: `receita-especifica`. O reel
do Instagram do mentor foi aprovado e não bate nenhum dos dez gatilhos de
conflito. Ele abre nomeando um objeto concreto do público e prometendo a forma
certa dele. Sem esse gatilho, o minerador reprovava uma peça já aprovada.

### Onde o corte começa e termina

Começa no gancho. Termina numa fronteira de frase, e **nunca atravessa o próximo
gancho**: em gravação longa, engolir o gancho seguinte custa um Reels inteiro.
Melhor um corte mais curto e dois vídeos do que um corte longo e um perdido.

### Os comandos

```bash
node scripts/minerar-ganchos.js <transcricao> --quantos 10
node scripts/lote.js --de <transcricao> --midia <arquivo> --cortes 1,3,5 --aplicar
```

Aceita `narration.json` do squad, `.srt`, `.vtt` e JSON do Whisper.

## Parte 3: as salvaguardas

Volume é onde se perde material. Cinco travas:

1. Lote nunca escreve dentro de produção existente. Pasta nova, sempre.
2. Lote recusa começar se a pasta já tiver conteúdo. Lote não sobrescreve lote.
3. Entrega já aprovada é intocável: o lote nem enxerga `entregas/`.
4. Corte de mídia sai em arquivo novo. O original nunca é tocado.
5. Sem `--aplicar`, nada é gravado.

Fora isso, valem as travas que já existem no repositório: o guarda que barra
apagar em massa, o versionamento antes de editar arquivo existente, e o gate que
impede sobrescrever backup.

## As checagens que existem

| O que ela mede | Comando |
|---|---|
| Elemento que ele pediu pelo nome | `checar-pedido-literal.js` (com `--extrair` para ler a mensagem dele) |
| Cor de marca copiada da referência | `checar-cor-de-marca.js` |
| Som por movimento e por categoria | `choreo-lint.js` |
| Alinhamento e ritmo de grade | `checar-espacamento.js` |
| Nível de voz, vinheta e pico | `mixar-final.js --so-medir` |
| Foto com barra na borda | `checar-foto-enquadramento.js` |
| Imagem repetida entre peças | `checar-asset-repetido.js` |
| Origem de logo de terceiro | `checar-origem-de-marca.js` |
| Cadência de vídeo contra a da peça | `checar-cadencia.js` |
| Organização de pasta e nome | `organizar-producao.js --auditar` |

Todas rodam de uma vez:

```bash
node scripts/aprendizado.js --revisar <Composition>
```

## O que ainda depende do olho

- **Hierarquia e peso visual**: máquina não vê "ficou bonito". Alinhamento e
  ritmo de grade viraram número; o resto é do agente `revisor-visual-motion`.
- **Respiro abaixo do queixo numa foto**: a barra lateral é medida; o respiro
  depende de saber onde está o rosto.
- **Entregar versão além da escolhida**: comportamental, não tem o que medir.

### O que foi tentado e descartado, para ninguém repetir

- **Margem de segurança nas bordas do quadro**: reprovou 40 dos 41 frames da
  peça aprovada, porque estas peças ocupam a tela inteira de propósito.
- **Folga mínima entre elementos**: na peça aprovada, folga pequena é quase
  sempre legítima (linha de texto, traço colado na palavra que ele sublinha de
  propósito, partes do mesmo desenho). Não existe número que separe descuido de
  decisão sem saber o que é cada elemento.

### Como uma checagem visual nasce sem virar ruído

O caminho que funcionou, em cinco passos:

1. Medir a relação que corresponde à reclamação dele, não a que é fácil de medir.
2. Rodar contra as peças que ele **já aprovou**.
3. Olhar **cada** falso positivo, um a um, e entender o que ele revela do desenho.
4. Ajustar o critério pelo que se descobriu, nunca afrouxar o número até passar.
5. Validar com um defeito **plantado** antes de ligar no fluxo.

Quando um gate reprova material aprovado, o errado quase sempre é a régua.
