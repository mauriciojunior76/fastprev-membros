# AI_USAGE_GUIDE — como usar o Zeus Reels Design System

Você é a IA que vai montar vídeos com este sistema. Leia este arquivo inteiro
uma vez. Depois, por produção, você lê **índices**, não documentação.

## ANTES DE ESCOLHER UM COMPONENTE

1. Leia a transcrição inteira, alinhada por palavra se houver.
2. Entenda o vídeo como um todo: quem fala, para quem, o que promete, onde
   termina.
3. Segmente por **significado** (beats), não por tempo nem por frase.
4. Classifique cada beat: qual a **estrutura da informação**?
5. Procure essa estrutura em `registry/semantic-registry.json`.
6. Recupere os candidatos (2 a 4, nunca 1).
7. Abra **apenas** essas entradas em `registry/visual-registry.json`.
8. Compare `useWhen` × `dontUseWhen` × dados que você realmente tem.
9. Escolha, e registre **por que** (rationale).
10. Só então implemente, com a cena de `registry/scene-registry.json`.

Nunca pule do passo 1 para o 10. Nunca escolha por palavra-chave solta.

## A REGRA DE OURO

Um recurso só entra se ele **representa a estrutura que a fala afirma**.

- A fala afirma **relação**? → diagrama (`registry/diagram-registry.json`).
- A fala descreve **ação numa plataforma**? → interface
  (`registry/interface-registry.json`).
- A fala **crava uma palavra**? → destaque (emphasis).
- A fala dá um **número**? → number (`numbers-spec.json`).
- A fala não afirma nada disso? → **legenda e speaker** (densidade 0). Isso é
  uma decisão legítima, não uma falha.

## TRANSCRIPT TO VISUAL (metodologia oficial)

```
FALA
 → SIGNIFICADO LITERAL      (o que as palavras dizem)
 → SIGNIFICADO CONTEXTUAL   (o que elas dizem NESTE vídeo, para ESTE público)
 → CONCEITO                 (a ideia por trás)
 → ESTRUTURA DA INFORMAÇÃO  (comparação? sequência? bifurcação? número?)
 → FUNÇÃO NARRATIVA         (hook, exemplo, prova, clímax, CTA, respiro)
 → FAMÍLIA VISUAL           (emphasis, flow, compare, interface, number…)
 → CANDIDATOS               (2 a 4 do semantic-registry)
 → MELHOR RECURSO           (+ segunda alternativa e o motivo)
 → CENA                     (família de cena, densidade, speaker, legenda)
```

A decisão é:

```
PALAVRAS × CONTEXTO LOCAL × CONTEXTO DO VÍDEO × INTENÇÃO DO SPEAKER
× ESTRUTURA DA INFORMAÇÃO = DECISÃO VISUAL
```

Palavra-gatilho sozinha **não decide**. Verifique a relação antes
(`design-router.json → relation_rules`):

- "mais" só é equação se houver dois termos e um resultado nomeado; "mais
  clareza" é destaque.
- "liga" só é toggle se o objeto for uma configuração; "liga para o cliente" é
  ação humana.
- "vagas" sem prazo não é contagem regressiva.
- "gancho" é função narrativa, não categoria de recurso.

## CONFIANÇA E FALLBACK

- **alta** = expressão inteira casada + relação compatível + dados disponíveis.
- **média** = palavra + relação compatível. Escolha o recurso mais simples.
- **baixa** = só a palavra casou. **Fallback: legenda, ou destaque N1/N3.**

Se a estrutura da fala **não existe** no registry, não improvise no meio da
produção: use o fallback e depois siga o `CREATION-MANUAL.md` para criar o
recurso direito, fora do lote.

Nunca invente dado ausente. Se a fala não dá o número, o percentual, o prazo ou
a prova, escolha um recurso que não os exija — ou mostre o rótulo sem o valor.

## ORDEM DE DESEMPATE

1. O recurso mais simples que ainda mostra a relação afirmada.
2. Entre dois empatados, o de menos elementos.
3. Variedade: não repita o mesmo recurso, o mesmo ícone ou o mesmo gesto dos 3
   beats anteriores (nem dos vídeos anteriores — veja `icons-log.json`).
4. Orçamento da cena: ≤5 itens de significado, ≤3 sólidos, cor ≤5%, soma de
   pesos de som ≤22.

## RITMO E DENSIDADE

`registry/scene-registry.json` define 6 níveis (0 a 5) e 18 famílias de cena.
Regras duras: nunca 3 cenas seguidas no mesmo nível; nunca dois níveis 4/5 em
15s; depois de um 4/5, a próxima cai para 0–2; nível 5 (lettering, selo) no
máximo 2 vezes por vídeo.

A alternância **não é aleatória**: ela segue a construção da mensagem. Problema
→ densidade sobe. Explicação → estruturada. Prova → exemplo. Tese → clímax.
Respiro → nível 0.

## MOVIMENTO

Nada é estático: todo objeto tem entrada, sustentação e saída declaradas.
"Parado" é *hold*, não ausência de animação. Toda animação tem uma das 10
funções de `registry/motion-registry.json`. Vocabulário After Effects →
Remotion e a receita `[in][build][act][focus][hold][out]` estão no guia §9e2.
Respeite a natureza do objeto (relógio → ponteiros; gráfico → dados crescem;
mensagem → aparece do lado de quem fala).

Som: `sfx-map.json`, peso 0–10 por gesto. Peso 0 é silêncio obrigatório.

## OS ARQUIVOS, E QUANDO ABRIR CADA UM

| Arquivo | Quando |
|---|---|
| `AI_USAGE_GUIDE.md` | uma vez, no começo |
| `registry/semantic-registry.json` | **toda** produção, por beat |
| `registry/visual-registry.json` | só as entradas candidatas |
| `registry/scene-registry.json` | ao montar a linha de cenas |
| `registry/interface-registry.json` | quando o beat cita plataforma |
| `registry/diagram-registry.json` | quando o beat afirma relação |
| `registry/motion-registry.json` | ao animar |
| `numbers-spec.json` | quando há número |
| `sfx-map.json` | ao sincronizar som |
| `icons-map.json` / `icons-log.json` | ao escolher e registrar ícone |
| `DESIGN-SYSTEM-REELS-APPLE-v2.md` | quando o registry aponta (`where.guide`) |
| `Zeus Reels Design System.dc.html` | quando precisar VER (`where.panel`) |
| `decision-examples.md` | para calibrar o raciocínio |
| `CREATION-MANUAL.md` | quando nenhum recurso serve e você precisa criar |
| `semantic-atlas.md` | para reconhecer estruturas por exemplo |

Não leia o painel inteiro numa produção: ele é a prova visual, não o índice.

## EXEMPLOS SÃO TREINAMENTO, NÃO LEIS

`decision-examples.md` traz decisões sobre vídeos reais. Extraia **o padrão, a
lógica, a heurística**. Não copie posição, objeto, frase, composição ou cor.

**PADRÃO, NÃO CÓPIA. SISTEMA, NÃO TEMPLATE.**

## O QUE NUNCA FAZER

- Escolher recurso por palavra-chave sem checar a relação.
- Desenhar interface porque o nome do app apareceu (menção ≠ ação).
- Inventar número, percentual, prazo, print ou depoimento.
- Transformar tudo em cards, tudo em ícones ou tudo em texto.
- Cor em dois elementos da mesma cena, ou cor em preenchimento.
- Blur em rótulo que ainda precisa ser lido.
- Animar sem informação nova.
- Repetir o mesmo recurso em beats vizinhos.
- Deixar o vídeo todo no mesmo nível de densidade.
