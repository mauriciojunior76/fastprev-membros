---
name: guia-inicial
description: Conduz a primeira experiência de uso do ZEUS, do diagnóstico de memória até a configuração de personalidade e autonomia, encadeando boot-inteligencia e importar-memorias quando fizer sentido. DISPARA SOZINHA, sem o usuário pedir, sempre que a instalação estiver na primeira sessão (memory/PERFIL.md ausente ou memória central incompleta), antes de responder qualquer outro pedido. Também usar quando o usuário disser "guia inicial", "primeiro uso", "por onde eu começo", "configura o zeus do zero", "acabei de instalar".
---

# Guia Inicial

## Objetivo

Levar quem acabou de instalar o ZEUS da tela vazia até um assistente pronto
pra uso real, em três frentes: memória (quem ele é), conexões (o que está
ligado) e personalidade (como o ZEUS deve se comportar com ele). É a porta de
entrada da instalação inteira, e por isso dispara sozinha, sem precisar ser
pedida.

## Quando dispara sozinha

Todo início de conversa, antes de responder qualquer outra coisa, confira o
estado da memória central: `memory/PERFIL.md` existe? Os arquivos centrais
(`memory/produtos/`, `memory/publico.md`, `memory/comunicacao.md`,
`memory/empresa.md`, `memory/objetivos.md`) existem e têm conteúdo real, não
só o esqueleto?

- Se faltar praticamente tudo (primeira sessão de verdade): acione este guia
  imediatamente, antes de tentar responder o pedido original da pessoa.
- Se a pessoa chegou com um pedido concreto e urgente: diga em uma frase que a
  instalação ainda está vazia e que um guia rápido deixa toda resposta futura
  melhor, pergunte se ela topa fazer agora ou prefere resolver o pedido dela
  primeiro. Se ela preferir resolver o pedido primeiro, registre em
  `memory/LACUNAS-DE-CONHECIMENTO.md` que o guia ficou pendente e ofereça de
  novo na sessão seguinte, sem insistir na mesma sessão.
- Se a memória central já está completa: este guia não dispara sozinho de
  novo. Só roda se a pessoa chamar pelo nome.

## Antes de começar

1. Leia `core/autonomia.md` e `core/memoria-schema/FRONTMATTER.md`: são a
   base de tudo que este guia escreve.
2. Confira, em silêncio, se existe uma ferramenta de widget visual disponível
   nesta instalação (normalmente chamada `show_widget`, de um MCP de
   visualização). Se existir, use nos pontos indicados abaixo. Se não
   existir, substitua cada widget por uma lista de texto simples, com `[ ]`
   para pendente e `[x]` para feito. O conteúdo importa mais que o enfeite.
3. Diga, uma única vez, logo na abertura, e nunca mais repita: o ZEUS carrega
   anos de treinamento em marketing, vendas, mentoria e tráfego que um Claude
   Code ou um Codex crus não têm sozinhos, e terminar este guia é o que
   separa uma ferramenta genérica de um assistente que já entende o jogo
   dela.

## Pipeline

### ETAPA 1: diagnóstico de memória

Confira, arquivo por arquivo, o que existe e o que está preenchido de
verdade (não conta arquivo vazio ou só com o frontmatter):

| Falta | O que dizer, específico |
|---|---|
| `memory/PERFIL.md` não existe | "Ainda não sei quem você é, nem seu nome." |
| `PERFIL.md` existe, `memory/produtos/` vazia | "Sei quem você é, mas não sei o que você vende." |
| Produtos preenchidos, `memory/publico.md` vazio | "Sei o que você vende, mas não sei pra quem." |
| `memory/comunicacao.md` vazio | "Não sei como você fala, então meus textos ainda saem genéricos." |
| `memory/posicionamento.md` vazio | "Não sei como você quer ser percebido, então posso errar o tom." |
| `memory/empresa.md` vazio | "Não sei como o seu negócio funciona por dentro." |
| `memory/objetivos.md` vazio | "Não sei qual é a sua meta agora, então não consigo priorizar por você." |

Se a memória central já está completa, diga isso em uma frase e siga direto
pra ETAPA 2.

Se falta algo, mostre um widget (ou lista, no fallback) com o checklist
específico do que falta, usando as frases da tabela acima, nunca uma frase
genérica.

Aí vem a pergunta que abre o tour de verdade, e ela tem uma ordem certa:

> Antes de eu te entrevistar do zero: você já usa o ChatGPT, o Claude, o
> Gemini ou o Grok no dia a dia? Se usa, essas ferramentas já sabem um monte
> sobre você, e dá pra trazer tudo isso pra cá em vez de você repetir na mão.

A ordem importa e não é capricho. Primeiro IMPORTAR, depois COMPLETAR:

1. IMPORTAR (acione `importar-memorias`). Peça a exportação de cada serviço
   que ela usa, um de cada vez, começando pelo que ela mais usa. O passo a
   passo de exportação de cada um está na própria skill. Se ela não quiser
   exportar tudo, o caminho manual (copiar as conversas mais importantes e
   colar num documento) também serve.
2. COMPLETAR (acione `boot-inteligencia`). Depois de importar, você já sabe
   uma parte. A entrevista fecha só o que ficou faltando, então fica bem mais
   curta do que se ela começasse do zero.

Por que nessa ordem: começar pela entrevista faz a pessoa gastar tempo
respondendo o que ela já respondeu em outro lugar. Importar primeiro é o que
economiza a conversa dela e o custo de uso.

Se ela não usa nenhuma outra inteligência artificial, pule direto para a
entrevista (`boot-inteligencia`), sem insistir na importação.

Espere a skill terminar antes de seguir. Quando terminar, diga em uma frase o
que você já sabe sobre ela agora e o que ainda falta, antes de avançar pra
ETAPA 2.

### ETAPA 2: diagnóstico de conexões

Confira, sem nunca imprimir valor de chave, o que está preenchido no `.env`
e o que está ligado:

| Integração | O que conferir | Doc de referência |
|---|---|---|
| Conta de anúncios Meta | Conector MCP de anúncios ligado, ou `META_ACCESS_TOKEN` no `.env` | `docs/rules-on-demand/conectar-meta.md` |
| Geração de imagem | `GOOGLE_API_KEY` ou `OPENAI_API_KEY` no `.env` | `docs/rules-on-demand/conectar-apis-de-imagem.md` |
| Servidor e domínio próprio | `VPS_HOST`, `VPS_USER`, `VPS_PASS`, `VPS_DOMINIO` no `.env` | `docs/rules-on-demand/paginas-e-vps.md` |
| Envio de e-mail | qualquer chave de serviço de envio (ex: `EMAIL_API_KEY`) no `.env` | não existe doc dedicado ainda; oriente direto, ver abaixo |

Mostre um widget (ou lista) com o que já está ligado e o que falta, sem
detalhe técnico, só o nome da integração e o status.

Para CADA integração que falta, pergunte se ela quer ajuda pra conectar
agora. Nunca conecte nada sem essa pergunta específica, mesmo que pareça
óbvio que ela vai querer.

- Se disser que sim, resuma o passo a passo em linguagem leiga, apontando pro
  documento certo da tabela acima. Não repita o conteúdo do documento aqui,
  só o caminho resumido, e leia o documento antes de resumir, pra não
  inventar passo que não existe nele.
- Envio de e-mail não tem documento dedicado ainda. Explique em linguagem
  simples: é o serviço que manda mensagem automática em nome dela (aviso,
  relatório, notificação), separado do WhatsApp. Pergunte se ela já usa
  algum (Gmail, um serviço de envio em massa, outro), peça a chave de acesso
  dele e guarde em `.env` como `EMAIL_API_KEY` (mais o remetente, se houver).
  Se essa conversa se repetir em outras instalações, registre em
  `memory/LACUNAS-DE-CONHECIMENTO.md` que vale criar
  `docs/rules-on-demand/conectar-email.md`.
- Se disser que não quer conectar agora, registre a lacuna e siga.

### ETAPA 3: personalidade e autonomia

Pergunte, uma coisa de cada vez:

1. Tom de conversa: formal, informal, direto e curto, ou explicado com
   calma. Pergunte com exemplos curtos, não com jargão.
2. Iniciativa: o quanto ela quer que o ZEUS tome a frente por conta própria,
   contra o quanto ela quer aprovar cada passo. Explique a escada de
   `core/autonomia.md` em linguagem simples, nível por nível, sem citar o
   nome técnico "nível de autonomia" antes de explicar o que cada um faz na
   prática. Deixe claro que, em qualquer nível escolhido, gastar dinheiro,
   apagar algo, publicar, falar com terceiro em nome dela ou mexer em conta
   SEMPRE pede autorização, isso não muda com a resposta dela.
3. O que ela quer que o ZEUS faça sozinho sem perguntar, e o que ela quer
   que sempre pare e pergunte antes, além da lista fixa acima.

Depois de ouvir as respostas:

- Se a resposta da pergunta 2 mapear claramente pra um nível da escada,
  confirme o número com ela em uma frase e grave `ZEUS_NIVEL_AUTONOMIA` no
  `.env` com esse número.
- Grave o conjunto das respostas como regra viva em
  `.claude/rules/personalidade.md`, seguindo o formato dos outros arquivos
  de `.claude/rules/` (título, uma linha de `## STATUS`, seções curtas). Se o
  arquivo já existir de uma configuração anterior, siga o protocolo FULLSAFE
  antes de sobrescrever. Modelo de conteúdo:

```markdown
# Personalidade e preferências de comportamento

## STATUS: SEMPRE ATIVO. Configurado na entrevista do guia inicial em AAAA-MM-DD.

## Tom de conversa
[o que a pessoa respondeu, resumido]

## Iniciativa
Nível de autonomia configurado: [N], ver `core/autonomia.md`.
[qualquer nuance própria que a pessoa tenha dado além do nível padrão]

## Faz sozinho, sem perguntar
- [itens]

## Sempre pergunta antes
- [itens, além da lista fixa que já vale em qualquer nível]
```

## Forma de conduzir, em todas as etapas

Uma pergunta ou um bloco pequeno por vez, nunca a etapa inteira de uma vez.
Cada etapa relevante (o diagnóstico da ETAPA 1, o diagnóstico da ETAPA 2, e o
fechamento) vem acompanhada de um widget visual: um checklist do que falta,
ou um cartão de progresso mostrando as três etapas e o status de cada uma
(pendente, em andamento, feita). Atualize esse cartão conforme cada etapa
fecha. Nunca repita em texto o que já está no widget, só comente o que ele
não mostra.

## ETAPA 4: encerramento

Quando as três etapas estiverem resolvidas (memória completa ou o caminho
escolhido concluído, conexões diagnosticadas com decisão registrada em cada
uma, personalidade e autonomia gravadas):

1. Mostre o cartão de progresso final com as três etapas marcadas.
2. Resuma em poucas linhas o que foi configurado: o que o ZEUS passou a
   saber, o que ficou ligado, e como ele vai se comportar daqui pra frente.
3. Confirme que o ZEUS está pronto pra uso real.
4. Diga que ela pode voltar a qualquer momento e pedir pra rever qualquer
   parte disso, seja memória, conexão ou personalidade, sem precisar refazer
   o guia inteiro.
5. Rode `node scripts/memory-index.js` se o script existir, pra manter o
   índice de memória coerente com o que mudou.

## Fronteiras

- Não invente nenhuma informação sobre a pessoa, o negócio dela ou as
  integrações. Vazio é melhor que errado.
- Nunca conecte uma integração sem a pergunta específica de autorização,
  mesmo que a resposta pareça óbvia.
- Nunca peça senha, cartão ou dado bancário. Chave de API entra só no `.env`,
  nunca colada na conversa nem escrita em código.
- Inferência sobre o jeito da pessoa não vira regra de personalidade sem
  confirmação explícita dela.

## Critério de saída

O guia terminou quando: a memória central está completa ou o caminho
escolhido pela pessoa foi concluído; cada integração da tabela da ETAPA 2 tem
uma decisão registrada (conectada, ou lacuna anotada por escolha dela); e
`.claude/rules/personalidade.md` existe com as respostas dela. Sem isso, a
instalação segue no meio do primeiro uso, não pronta.
