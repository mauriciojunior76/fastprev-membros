---
task: transformFormat()
responsavel: "@copy-chief"
apoio: "@ad-copy-warlord + @hook-warlord + @whatsapp-humanizer"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada: uma peça JÁ APROVADA (roteiro, anúncio, e-mail) e a lista de formatos de destino.
Saída: as peças novas, cada uma no padrão do seu canal, herdando o ângulo que já venceu.
---

# TASK: TRANSFORMAR UMA PEÇA APROVADA EM OUTROS FORMATOS

## STATUS: criada em 11/08/2026, junto com a aula "Copy para Vender Mentoria".

## POR QUE ESTA TASK EXISTE

Cada módulo do squad escrevia do zero no seu canal. O roteiro que venceu no vídeo não alimentava o carrossel, o e-mail nascia de página em branco. Resultado: a inteligência conquistada numa peça morria nela.

A lei: peça aprovada não morre na campanha, vira matéria-prima do resto.

## PASSO 1: EXTRAIR O NÚCLEO (o que atravessa qualquer formato)

Da peça aprovada, isolar 5 coisas. Elas são o que se transfere; o resto é roupa do canal.

1. ALVO: quem é chamado.
2. ÂNGULO: a ideia central, em uma frase.
3. FERIDA: onde dói, e em qual moeda (bolso, status, tempo).
4. TRANSFORMAÇÃO: o ponto B prometido.
5. PROVA: o que sustenta.

Se a peça original não tem esses 5 claros, ela não estava aprovada de verdade: rodar `extract-heuristics.md` antes.

## PASSO 2: VESTIR O NÚCLEO NO CANAL DE DESTINO

O núcleo é o mesmo. O que muda é o corpo, e cada canal tem dono no squad.

| Destino | Módulo dono | O que muda de verdade |
|---|---|---|
| Criativo estático | `modules/ads.md` mais `@ad-copy-warlord` | vira H1 curto mais H2 mais preço, anatomia de 4 camadas, limite de caracteres |
| Carrossel | `modules/carousel.md` | o ângulo vira capa; a ferida e a prova viram slides internos, um por slide |
| Stories | `modules/carousel.md` (seção stories) | fatiar em 3 a 5 telas, cada uma com um gancho próprio, ritmo de conversa |
| Reels ou vídeo | `modules/scripts.md` | oralidade obrigatória, gancho nos 3 primeiros segundos, frase falada e não escrita |
| E-mail | `modules/email.md` | o gancho vira assunto, a ferida vira abertura, a prova ganha espaço |
| WhatsApp | `modules/whatsapp.md` mais `@whatsapp-humanizer` | escolher o registro certo: conversa 1:1 ou mensagem estruturada |
| Página | `modules/landing-pages.md` | o ângulo vira hero, a ferida vira a primeira dobra, a prova vira seção |

## PASSO 3: O QUE NUNCA SE TRANSFERE

- O TAMANHO. Roteiro de 45 segundos não vira legenda de 45 segundos de leitura.
- O RITMO. Texto falado tem repetição e pausa que, escritos, parecem erro.
- O CTA. Cada canal está num estágio diferente do funil: o CTA se recalcula sempre, nunca se copia.
- A PALAVRA EXATA do gancho, quando o formato muda o contexto de leitura. Gancho de vídeo é ouvido, gancho de estático é visto de relance.

## PASSO 4: AUDITAR CADA PEÇA NOVA COMO PEÇA NOVA

Herdar o núcleo não isenta do gate. Cada saída passa pelo `@copy-auditor` normalmente, incluindo a Lei da Ferida e a Lei do Alvo. Peça derivada que reprova é peça reprovada, mesmo que a original tenha vendido.

## SAÍDA DA TASK

As peças pedidas, cada uma pronta para uso no canal, mais uma linha dizendo qual núcleo foi herdado (alvo, ângulo, ferida, transformação, prova). Essa linha é o que permite rastrear depois qual matriz gerou qual filha.

## GATE

Só transforma peça APROVADA, nunca hipótese. Multiplicar formato de copy que ainda não provou nada é multiplicar risco: antes de gerar dez, faça uma ficar boa.
