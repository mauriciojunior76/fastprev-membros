# Wizard - Primeira apresentação guiada

Este é o passo a passo interativo da primeira vez que você roda o Zeus Show. As 8 perguntas do onboarding ficam salvas em `_memory/mentores/{seu-slug}.md` e você não vai responder de novo.

---

## 1. Quem é você e o que vende?

O Client Profiler faz 4 perguntas rápidas:

- Seu nome completo
- Qual o nicho da sua mentoria? (exemplo: emagrecimento, mentoria digital, finanças, barbearia)
- Qual o nome do seu produto principal?
- Em uma frase, o que o seu produto entrega para o aluno?

Exemplo de resposta do mentor o dono do canal:

```
Nome: um mentor de referencia
Nicho: mentoria digital para mentores iniciantes
Produto: Agente Arquiteto
Entrega: organiza o conhecimento do mentor em 8 minutos usando IA
```

---

## 2. Quem é o seu avatar?

Uma frase sobre quem é a pessoa que você ajuda.

```
Exemplo: "mentor iniciante que já é especialista mas trava na hora de estruturar o conteúdo"
```

O Zeus Show usa isso para ajustar tom, vocabulário e exemplos em toda apresentação.

---

## 3. Qual o seu tom de voz?

Escolha entre:

- **Direto e provocador** (confronta, tira da zona de conforto)
- **Técnico e didático** (explica passo a passo, tom de professor)
- **Inspirador e motivacional** (eleva, conecta com propósito)
- **Casual e amigável** (tom de conversa, sem formalidade)
- **Executivo e sóbrio** (formal, corporativo)

Pode escolher 1 ou combinar 2 (ex: direto + técnico).

---

## 4. Você já tem marca visual?

Se sim, o Brand Loader vai ler:

- Caminho do logo (PNG ou SVG)
- Paleta de cores (3 a 5 hex codes)
- Fontes (nomes do Google Fonts ou upload)

Se não, o squad usa o tema escolhido na próxima pergunta.

---

## 5. Qual o estilo visual que você gosta?

O Preference Mapper pergunta:

- Moderno ou clássico?
- Claro ou escuro?
- Colorido ou monocromático?
- Serifa ou sem serifa?
- Muita animação ou movimento sutil?

As respostas viram um dos 6 temas:

| Resposta típica | Tema sugerido |
|-----------------|---------------|
| Escuro, dourado, luxo, serifa + sans | **Exemplo** |
| Claro, minimalista, sem serifa, pouca animação | **Apple** |
| Bege, serifa, papel, nostalgia | **Vintage** |
| Escuro neon, glow, movimento marcante | **Futurista** |
| Preto e branco, serifa, revista | **Editorial** |
| Azul, cinza, sóbrio, corporate | **Corporativo** |

Você pode sobrescrever depois com `--theme`.

---

## 6. Tem alguma referência visual?

Cole um link ou caminho de:

- Apresentação de alguém que você gosta
- Site cujo design você admira
- Paleta do Coolors, Colorhunt ou Adobe

O Style Oracle analisa a referência e adapta os tokens sem copiar de forma literal.

---

## 7. Precisa de fotos?

Se sim, o squad ativa a camada de imagens. Fontes disponíveis:

- Unsplash (fotos profissionais, uso comercial livre)
- Pexels (fotos e vídeos incluso)
- Pixabay (ilustrações e fotos)
- IA (Lovart ou Nano Banana se você tem chave)

Se não, o squad usa apenas ícones animados e tipografia. Mais rápido e mais leve.

---

## 8. Quer ícones animados ou estáticos?

- **Animados** (recomendado para prelúdio) - ícones se movem suavemente em loop
- **Estáticos** (recomendado para corporativo) - ícones fixos, sem distração
- **Sem ícones** - apenas tipografia e cor
- **Emojis** - quando o tom pede mais leveza

---

## Pronto. Agora crie a primeira.

Depois das 8 respostas, o Zeus Show pergunta apenas:

1. Qual o formato? (prelúdio, aula ou ebook)
2. Qual o tema da apresentação?
3. Quantos slides ou quantos minutos de duração?

E produz o HTML em 2 a 5 minutos.

---

## Exemplo de execução completa (prelúdio)

```bash
$ node scripts/new-presentation.js

[Zeus Show] Primeira execução detectada. Vou te conhecer rápido.

Seu nome: um mentor de referencia
Nicho: mentoria digital
Produto: Agente Arquiteto
Entrega: organiza o conhecimento do mentor em 8 minutos
Avatar: mentor iniciante travado na estruturação
Tom: direto e provocador
Marca visual: sim
  Logo: CAMINHO_DA_SUA_PASTA
  Paleta: #b8887a, #d4a08a, #0a0806
  Fontes: Inter, DM Sans
Estilo: escuro, dourado, luxo, serifa
Tema detectado: Exemplo
Referência: https://exemplo.seu-dominio.com.br
Precisa de fotos? não
Ícones: animados

[Memory Builder] Perfil salvo em _memory/mentores/o dono do canal-silveira.md

[Briefing]
Formato: prelúdio
Tema: 15 coisas que o meu aluno aprende em 30 dias
Duração: 45s em loop
Slides: 8

[Maestro] Pool ativo: Intake, Briefer, Structure, Hook, Bullet, Curiosity,
         Icon Selector, Icon Animator, Color Guard, Typography, Layout, Bg,
         Loop Engine, AE Motion, Element Animator, Preludio Specialist,
         Spell Checker, Brand Checker, A11y, Final QA, Deploy Agent
[Maestro] Pool dormente: 31 agentes (sem fotos, sem números, sem timeline, sem comparação)

[Renderer] Gerando HTML...
[Spell] Acentuação verificada. 0 erros.
[Contrast] WCAG AA ok.
[A11y] Navegação por teclado ok.
[Final QA] 14/14 pontos aprovados.
[Deploy] Publicado em https://seu-dominio.com.br
[Deploy] HTTP 200 confirmado.

Pronto. 3 minutos, 12 segundos.
```

---

## Próxima execução

Da segunda em diante, você pula direto para o briefing:

```bash
$ node scripts/new-presentation.js

[Zeus Show] Usando perfil: o dono do canal-silveira
Formato: _
```

Para forçar um novo onboarding (se você mudou de produto, por exemplo):

```bash
node scripts/new-presentation.js --reonboarding
```
