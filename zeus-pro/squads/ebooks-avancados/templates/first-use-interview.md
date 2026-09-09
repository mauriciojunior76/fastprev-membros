# First Use Interview - Guia de Onboarding

Roteiro de entrevista do primeiro uso com mentorado novo.
Aplicado pelo @book-first-use-guide antes da primeira producao.

Tempo estimado: 5-7 minutos para o usuario responder.
As respostas salvam o brand profile completo para sempre.

---

## INTRODUCAO (apresentacao do agente)

"Oi. Antes de comecar o primeiro ebook, preciso conhecer voce e sua marca em 5 minutos.
As respostas ficam salvas. Da proxima vez nao pergunto de novo. Vamos la?"

---

## BLOCO 1 - IDENTIDADE (2 perguntas)

### Pergunta 1.1 - Marca
"Qual o nome da sua marca ou projeto?"

Campo: brand_name
Tipo: texto livre
Exemplo de resposta: "Consultoria Financeira Silva"

### Pergunta 1.2 - Nicho e publico
"Qual segmento voce atua e quem voce quer atingir?"

Sub-perguntas se resposta for vaga:
- Que tipo de cliente paga voce hoje?
- Qual a profissao/faixa etaria/renda deles?
- Que problema especifico voce resolve?

Campos: segment, target_audience
Exemplo: "Consultoria para classe media alta preocupada com aposentadoria, 40-60 anos, profissionais liberais"

---

## BLOCO 2 - VISUAL (3 perguntas)

### Pergunta 2.1 - Logo
"Voce tem logo definida? Me envia como arquivo."

Opcoes de resposta:
- (a) Envia arquivo PNG/SVG/JPG
- (b) Nao tenho, pode usar tipografia pura
- (c) Tenho mas nao e final, pode refinar

Processamento:
- Se (a): rodar @palette-extractor + analisar estilo
- Se (b): gerar com typography-only cover
- Se (c): extrair paleta mas permitir variacoes

Campos: logo_path, logo_variants, logo_confidence

### Pergunta 2.2 - Cores
"Voce ja tem paleta de cores definida?"

Opcoes:
- (a) Sim, {listar cores}
- (b) Extrair do logo
- (c) Nao tenho, quero receber sugestao

Se usuario tem paleta:
- Cor principal (qual representa a marca?)
- Cor secundaria (contraste/apoio)
- Cores neutras (claro e escuro)
- Alguma cor PROIBIDA para voce?

Se nao tem, pergunta complementar: "Que sensacao voce quer passar?"
- Confiabilidade e solidez? (azul, cinza, tons terrosos)
- Premium e luxo? (dourado, preto, off-white)
- Moderna e vibrante? (cores saturadas)
- Limpa e minimalista? (brancos, neutros, 1 cor de destaque)
- Acolhedora e humana? (tons quentes, pasteis)

Campos: palette_primary, palette_secondary, palette_neutral_light, palette_neutral_dark, forbidden_colors, desired_feeling

### Pergunta 2.3 - Estilo visual geral
"Que estilo visual mais representa sua marca?"

Apresentar 6 opcoes com breve descricao:

1. Sofisticado classico (editorial, serifada, dourado, premium)
2. Moderno minimalista (limpo, muito espaco, tipografia forte)
3. Tech/startup (geometrico, gradientes, sans-serif moderno)
4. Luxury dark (preto, dourado, contraste forte, ornamentos)
5. Acolhedor humano (tons quentes, arredondado, ilustracoes)
6. Editorial magazine (denso, imagens grandes, tipografia mista)

Pode escolher 1 principal + 1 tendencia secundaria.

Campos: visual_style_primary, visual_style_secondary

---

## BLOCO 3 - VOZ E ESCRITA (3 perguntas)

### Pergunta 3.1 - Tom de voz
"Como voce fala com seu publico?"

Apresentar escala dupla para usuario posicionar:

Formalidade (0 = totalmente casual, 10 = totalmente formal)
0 -------- 5 -------- 10
gente oi  mistura    prezado senhor

Calor (0 = distante profissional, 10 = proximo amigavel)
0 -------- 5 -------- 10
institucional neutro  afetivo

Autoridade (0 = humilde colega, 10 = guru que sabe)
0 -------- 5 -------- 10
par dialogando  especialista  autoridade

Urgencia (0 = contemplativo, 10 = make it happen agora)
0 -------- 5 -------- 10
reflexivo   equilibrado  acionavel

Pedir valores (exemplo: 7/4/9/5 significa formal, um pouco distante, muito autoritario, moderadamente acionavel)

Campos: formality_level, warmth, authority, urgency

### Pergunta 3.2 - Exemplo de frase
"Me da um exemplo de frase que voce gostaria de ler em um ebook seu. Algo que soe como VOCE falando."

Campo: example_phrase
Uso: fingerprinting de voz, validacao no voice-matcher

Sub-pergunta: "E uma frase que VOCE NUNCA falaria, mesmo que tecnicamente correta?"
Campo: anti_phrase

### Pergunta 3.3 - Palavras favoritas e proibidas
"Tem palavras que voce adora usar? (ate 5)"
Campo: favorite_words

"Tem palavras ou expressoes que voce odeia? (ate 5)"
Exemplos comuns de rejeicao: "incrivel", "revolucionario", "game changer", "mudou o jogo", "trend"
Campo: avoid_words

---

## BLOCO 4 - REFERENCIAS (2 perguntas)

### Pergunta 4.1 - Referencias textuais
"Quais autores, livros, newsletters ou perfis voce admira pela forma de escrever?"

Sub-pergunta se resposta for genérica: "Por que esse? O que faz o estilo dele(a) funcionar?"

Exemplos de respostas uteis:
- "Warren Buffett nas cartas anuais - objetivo e pausado"
- "Seth Godin - frases curtas e pontuadas"
- "Tim Urban no Wait But Why - conversacional e detalhado"
- "Rolf Dobelli em Arte de Pensar Claramente - capitulos curtos"

Campo: writing_references
Uso: o @writer e as @voices-especializadas absorvem o padrao

### Pergunta 4.2 - Referencias visuais
"Quais marcas ou publicacoes voce admira visualmente?"

Sub-pergunta: "O que especificamente voce gosta na identidade delas?"

Exemplos uteis:
- "Monocle - editorial, tipografia mista, densidade"
- "Apple - minimalismo, muito espaco branco"
- "Hermes - luxo classico, dourado, serifada"
- "Stripe - tech clean, gradientes suaves"

Campo: visual_references
Uso: @concept-aligner, @cover-designer, @typography

---

## PROCESSAMENTO FINAL

Apos coletar todas as respostas, o agente executa:

1. Se logo foi enviado: @palette-extractor roda automaticamente
2. Mapeia segment + visual_style + writing_references para arquetipo de marca (1 dos 12)
3. Gera brand-profile.md completo em _memory/{slug}/
4. Gera style-preferences.md com base nas referencias
5. Gera taste-fingerprint.md inicial (confidence: low, vai aumentar com uso)
6. Sugere typography combo baseado em visual_style
7. Define tone guidance para @voice-dispatcher

---

## CONFIRMACAO COM USUARIO

Antes de comecar a producao, o agente apresenta um resumo:

```
PERFIL SALVO

Marca: Consultoria Financeira Silva
Segmento: consultoria para classe media alta 40-60 anos
Arquetipo detectado: SABIO
Paleta: #1a3a5c primary / #c5a572 secondary / #f7f7f7 accent
Estilo visual: Sofisticado classico + editorial
Tom: formal(7) / distante(4) / autoridade alta(9) / acionavel(5)
Voz de referencia: Warren Buffett em carta anual
Visual de referencia: Monocle magazine

Tudo certo? Se precisar ajustar, me fala antes de comecar.
```

Se usuario confirmar: produz o ebook.
Se pedir ajuste: atualiza campos especificos.

---

## ARMAZENAMENTO

Os dados ficam permanentes em:

_memory/{tenant_slug}/
├── brand-profile.md
├── style-preferences.md
├── taste-fingerprint.md
├── references-approved.md
└── anti-references.md

Da proxima vez: zero perguntas. Modo B+ ativado.
