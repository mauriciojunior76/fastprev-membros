# ZEUS PRO

Um assistente de inteligência pessoal e profissional que começa sem saber nada
sobre você, te entrevista, e vai virando o seu.

Não é um chatbot. É um sistema que conhece o seu negócio, os seus produtos, o
seu público, o seu jeito de escrever e as suas decisões, e trabalha a partir
disso.

## Novidades da versão 2.5.0

- **O time de Motion virou 2.0.** Passou por auditoria completa: aprende com
  os próprios erros de verdade (não só na teoria), confere a cor da sua marca
  antes de renderizar, e todo vídeo pronto se acha sozinho depois, mesmo sem
  lembrar o nome do arquivo. Duas referências de qualidade novas, com nota
  objetiva, para saber qual estilo cabe em cada peça.

**Já tem uma instalação anterior?** Baixe o pacote novo pela mesma página,
com o mesmo código de licença, e extraia por cima da pasta que você já tem,
sem apagar nada antes. O pacote nunca inclui `memory/LICENCA.json`,
`memory/PERFIL.md` nem qualquer outro arquivo pessoal seu (confira em
`.gitignore` e no que `memory/` traz de fábrica): extrair por cima só
atualiza o método, sua licença e tudo que você já ensinou continuam intactos.
Se está lendo isto como o Zeus da instalação, pode fazer esse processo
sozinho quando o dono pedir para atualizar, sem perguntar de novo se pode
sobrescrever `memory/`.

## Novidades da versão 2.4.0

- **Ele sabe montar palestra de telão.** Chegou a receita completa de um deck
  real aprovado, usado numa imersão presencial: o arco de quatro atos, como
  abrir com prova e deixar o público preso, o teto de palavras por slide, a
  tipografia que funciona projetada e a mecânica de revelar um item por clique.
  Peça uma palestra e ele segue esse padrão.
- **Gerar imagem virou escolha sua.** Antes de gastar com qualquer imagem,
  vídeo ou voz gerada por IA, ele diz quantas peças, quanto custa e o que muda
  se não gerar, e espera você aceitar. Vale a partir da primeira imagem.

## Novidades da versão 2.3.0

Se você já usava uma versão anterior, é isto que mudou:

- **Ele ganhou critério visual.** Onze documentos novos em
  `templates/inteligencia-visual/` respondem o que faltava: quando usar vidro
  fosco, quanto tempo dura uma animação, qual espaçamento, e principalmente a
  lista dos vinte sinais que fazem uma página parecer feita por IA. Todo time
  que produz algo visual consulta isso antes de decidir. O Design System
  Central continua guardando a SUA marca; a inteligência visual traz o
  julgamento.
- **O time de vídeo virou ferramenta, não só método.** Antes vinha a explicação
  de como fazer. Agora vêm junto os programas que conferem: a checagem que
  barra animação dura antes de virar vídeo, a validação antes de gerar, e seis
  exemplos em código completo para você estudar e adaptar.
- **Você pede em português e ele entende.** "Suaviza isso", "coloca um
  desfoque", "deixa com cara de cinema" agora têm tradução fixa para o efeito
  certo, em vez de depender de improviso a cada pedido.

O histórico completo, versão por versão, está em `CHANGELOG.md`.

## O que ele faz

- **Te conhece.** Na primeira execução, conduz uma entrevista que constrói a
  memória central: quem você é, o que vende, para quem, como fala.
- **Lembra.** Tudo que você conta vira memória organizada e legível, que você
  pode abrir, ler e corrigir. Nada de banco de dados invisível.
- **Produz.** Vinte e oito times de agentes: os doze de sempre (copy,
  apresentação, e-book, vídeo, produto, tráfego, branding, pesquisa,
  conhecimento, automação, desenvolvimento, planejamento) mais dezessete
  avançados de trabalho pesado (aplicativo, baixo ticket, motion, edição de
  vídeo, apresentações avançadas, pitch, webinário, lançamento, páginas,
  carrossel, e-books avançados, copy avançado, branding avançado, tráfego
  avançado, painel de dados, Google Ads).
- **Aprende.** Cada correção sua vira regra. O mesmo erro não acontece três
  vezes.
- **Pergunta pouco.** Descobre o que dá para descobrir sozinho, pergunta só o
  que muda a entrega, e nunca pergunta duas vezes a mesma coisa.
- **Cresce.** Quando percebe que falta capacidade, propõe criar um time novo
  para o seu caso.

## O que ele NÃO faz

- Não age sozinho em nada que envolva dinheiro, publicação, envio de mensagem
  ou destruição de dado. Isso sempre pede o seu "pode".
- Não inventa informação sobre você. O que ele não sabe, ele pergunta ou marca
  como lacuna.
- Não manda o seu trabalho para lugar nenhum. Tudo fica na sua máquina.

## Instalação

Você precisa de: [Node.js 18 ou maior](https://nodejs.org),
[Git](https://git-scm.com) e [Claude Code](https://claude.com/claude-code).
Git e Node você só instala, não precisa aprender a usar.

Você baixou um arquivo compactado pela página. Descompacte numa pasta do seu
computador, abra o terminal dentro dela e rode:

```bash
node scripts/setup.js
```

Depois abra o Claude Code nessa pasta e diga:

> vamos fazer o boot da inteligência

Reserve de 30 a 60 minutos. É a conversa que transforma isto no SEU assistente.
Sem ela, o ZEUS é uma casa vazia: tem estrutura, não tem dono.

## Como funciona por dentro

```
CLAUDE.md              quem ele é e as 9 leis que ele nunca quebra
.claude/rules/         regras sempre ativas: orquestração, memória, autonomia
.claude/hooks/         proteções automáticas e roteamento de contexto
.claude/skills/        procedimentos: boot, diário, criar squad, ingerir material
core/                  orquestração, níveis de autonomia, esquema de memória
onboarding/            a entrevista inicial e os planos por profissão
squads/                os 12 times, mais 2 que rodam em silêncio
memory/                o que ele sabe sobre você (não versionado, é seu)
obsidian/              a Vault: sua memória em formato que você lê
templates/             a sua marca (design system e tokens) e a inteligência
                       visual: o critério de quando usar cada coisa
scripts/               instalação, versionamento, índices, auditoria
docs/                  documentação completa
```

Leia `docs/ARCHITECTURE.md` para entender as decisões de arquitetura.

## Os cinco níveis de autonomia

Instalação nova nasce no nível 1. Você sobe quando confiar.

| Nível | O que ele faz sozinho |
|---|---|
| 0 | Só lê e responde |
| 1 | Escreve planos e rascunhos, não mexe no que existe |
| 2 | Altera arquivos locais, sempre guardando cópia antes |
| 3 | Consulta serviços externos que você autorizou |
| 4 | Repete rotinas que você já aprovou |

Dinheiro, publicação, envio e destruição SEMPRE pedem confirmação, em qualquer
nível. Isso não é configurável.

## A sua memória é sua

Tudo que o ZEUS aprende sobre você fica na sua máquina, em arquivos de texto
que você pode abrir em qualquer editor. Nem a sua memória, nem os seus
documentos, nem nada do que você produz é enviado para lugar nenhum.
O conteúdo de `memory/` está no `.gitignore`: se você publicar seu fork, nada
pessoal vai junto.

A única exceção, e ela é conhecida: a licença. Quando você baixou o pacote,
ficaram registrados o seu nome, e-mail, telefone, o endereço de IP e a máquina
usada, e a ativação nesta máquina também é registrada. É o que identifica cada
cópia e foi o que você aceitou nos termos de uso. O que o registro guarda é a
existência da sua licença, nunca o que você faz com o ZEUS.

Leia `PRIVACY.md` e `DATA-GOVERNANCE.md`.

## Licença

Uso pessoal e profissional livre. Revenda, redistribuição comercial e oferta
como serviço são proibidas sem autorização. Leia `LICENSE`.

## Origem

O ZEUS PRO nasceu da arquitetura de um sistema privado em produção. O que
veio para cá foi a ESTRUTURA, nunca os dados: nenhuma memória, nenhuma
estratégia, nenhuma identidade do sistema original está aqui. Ele chega até
você sem dono, de propósito.
