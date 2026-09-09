---
name: ingerir-conhecimento
description: Transforma material externo (livro, curso, aula, artigo, documento, transcrição) em conhecimento organizado e utilizável dentro do ZEUS, sempre ancorado na fonte. Use quando o dono mandar um material e disser "estuda isso", "organiza isso", "resume", "joga no cérebro".
---

# Ingerir conhecimento

## Objetivo

Material bruto vira conhecimento consultável. A diferença entre os dois é a
âncora: conhecimento sabe de onde veio e pode ser conferido.

## Antes de ingerir, pergunte

1. O material é seu, ou você tem direito de usar?
2. Pode ficar guardado no sistema?
3. Tem informação sensível dentro?
4. Deve ficar só nesta máquina?

Se houver dúvida sobre direito autoral, guarde o entendimento e a referência,
nunca o texto integral.

## Pipeline

### ETAPA 1: obter o texto
Documento, transcrição, artigo ou anotação. Se for vídeo ou áudio, peça a
transcrição ou o link com legenda. Registre a origem exata.

### ETAPA 2: verificar duplicata
Procure na memória se já existe dossiê sobre este tema ou este autor. Se
existir, ALIMENTE aquele arquivo com um apêndice datado. Não crie duplicata:
duas versões do mesmo assunto divergem com o tempo e o sistema passa a mentir.

### ETAPA 3: extrair, com âncora obrigatória
Cinco categorias. Cada item extraído carrega a origem (página, minuto,
capítulo). Item sem âncora NÃO ENTRA, sem exceção.

1. Heurísticas: regras do tipo "quando X, faça Y".
2. Métodos: sequências de passos reproduzíveis.
3. Conceitos: definições que mudam a forma de pensar o assunto.
4. Números e fatos: com fonte e data.
5. Discordâncias: onde este material contraria algo já na memória.

### ETAPA 4: escrever o dossiê
Em `memory/conhecimento/{tema}-{AAAA-MM-DD}.md`, com o frontmatter padrão,
camada `operacional`, tipo `fato` ou `declaração` conforme o caso.

Estrutura:
- O que é este material e quem escreveu.
- Os conceitos centrais, cada um com âncora.
- Os métodos, em passos.
- O que contraria o que eu já sabia.
- ONDE ISSO SE APLICA NO MEU CASO. Esta seção é obrigatória: sem ela, o
  material vira acúmulo, não inteligência.

### ETAPA 5: propor skills, com teto
Se o material trouxer método reproduzível, proponha transformar em skill.
Máximo três por ingestão, e só com aprovação do dono. Skill nasce em
`.claude/skills-rascunho/` e só vira skill de verdade quando ele aprovar.

### ETAPA 6: registrar
- Uma linha em `memory/INDICE.md`.
- Documentar na Vault, pasta `11-CONHECIMENTO`.
- Gatilho novo em `context-triggers.json`, se o tema for recorrente.

## Fronteiras

- Nunca atribua ao autor algo que ele não disse. A âncora existe exatamente
  para impedir isso.
- Nunca copie material protegido por inteiro.
- Nunca trate opinião do autor como fato. Marque como `declaração`.
- Material de terceiro não vira regra de comportamento do ZEUS sem o dono
  decidir que vira.
