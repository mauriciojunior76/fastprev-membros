# A marca do vídeo é a SUA, não a do Zeus

Leia isto antes de gerar a primeira peça. Vale para este time e para o time de vídeo (`motion`).

## A regra em uma frase

O método viaja inteiro. A cara não.

Você recebeu o jeito de pensar e de construir o vídeo: como escolher a cena, como quebrar a fala em
beats, quais gestos existem, quais curvas de movimento usar, quanto tempo cada coisa dura, qual som
entra em qual peso, como auditar o resultado. Isso é seu para usar, sempre.

O que não vem junto é a identidade visual do canal de origem: a paleta, o anel de espectro, o selo e
o conjunto de traços que fazem alguém bater o olho e reconhecer de quem é o vídeo. Essa parte você
substitui pela sua marca, e o próprio sistema te obriga a fazer isso antes de rodar.

## O que você pode copiar à vontade

- A estrutura da cena: onde o texto senta, o que aparece primeiro, o que fica de fundo.
- Os gestos e o repertório de peças: contador, grade, selo que assenta, traço que sublinha, revelação.
- As curvas de movimento, os tempos, o peso de cada beat, a sincronia com a sílaba tônica.
- O processo inteiro (transcrever, mapear, escolher a cena, montar, auditar, renderizar).
- As cotas e os fiscais: quantas peças da mesma família por vídeo, quanto estímulo por minuto.
- Os efeitos de som por peso e a lógica de quando cada um entra.

## O que não é licenciado, e por que

- A paleta exata e o anel de espectro (as sete paradas de cor na ordem original).
- O selo e a faísca da marca de origem.
- O painel visual do design system.
- A combinação "preto no branco com espectro colorido" como assinatura pronta.

Isso não é implicância: é o que separa o seu vídeo do vídeo de outra pessoa. Se dez alunos usarem a
mesma paleta e o mesmo selo, ninguém reconhece ninguém, e o seu conteúdo trabalha para construir a
marca de outro. Nos arquivos deste pacote, esses valores chegam como espaço reservado
(`{{marca.traco}}`, `{{marca.espectro.2}}`, `{{marca.selo}}`). Quem preenche é o seu onboarding.

## Como a sua marca entra

1. No boot da inteligência, o passo "Marca no vídeo" pergunta pela sua pasta de marca. Se você não
   tiver uma, mande referências: fotos, prints do Pinterest, uma peça que você gosta.
2. Dali sai a sua paleta (cinco cores), a sua tipografia e o seu estilo de traço.
3. Tudo isso é gravado em `squads/motion/src/brand/marca.json`.
4. `node squads/motion/scripts/marca-check.js` confere. Enquanto não passar, o time de vídeo não roda.

## Estilo: você escolhe a estrutura do traço, não só a cor

Trocar a cor e manter o resto igual ainda deixa o vídeo com cara de cópia. Por isso existe estilo:

- `apple-conceitual`: traço fino, cantos largos, muito respiro, tipografia neutra.
- `classico`: traço mais grosso, cantos menores, sem vidro, tipografia com serifa opcional.
- `proprio`: você define os valores de traço, canto e respiro na sua `marca.json`.

Rode `node squads/motion/scripts/new-composition.js MinhaPeca --estilo classico` para nascer já no seu
estilo.

## Se você tentar usar a paleta de origem

O `marca-check.js` compara a sua paleta com a assinatura da marca de origem. Três cores parecidas
demais e ele reprova, com a mensagem da licença. Não é para atrapalhar o seu trabalho: é para você
não publicar, sem perceber, um vídeo que parece de outra pessoa.
