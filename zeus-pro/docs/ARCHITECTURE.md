# Arquitetura do ZEUS PRO

Documento de decisões. Explica não só o que existe, mas por que existe assim.

## O princípio que organiza tudo

Três tempos para toda informação:

1. SEMPRE ATIVO: o que carrega em toda sessão. Orçamento duro de 100.000
   caracteres.
2. SOB DEMANDA: o que carrega quando o assunto aparece.
3. ARQUIVO: o que nunca carrega e nunca se perde.

Conteúdo se move entre as camadas, nunca é deletado. Sai da 1, vai para a 2.
Sai da 2, vai para a 3. Da 3 não sai.

Isto é, antes de mais nada, uma arquitetura de ORÇAMENTO DE CONTEXTO. Um
assistente que carrega tudo em toda conversa fica lento, caro e distraído.
Um que carrega pouco demais fica burro. A solução é carregar o certo na hora
certa, e o que decide isso é o roteador de gatilhos.

Meça com `node scripts/medir-contexto.js`.

## Camadas do sistema

```
        o que o dono fala
               |
   [ roteador de contexto ]  injeta o arquivo certo, no máximo 2 por pedido
               |
   [ orquestrador, 6 passos ]  classifica, pesa, decide quem entra
               |
    +----------+----------+
    |                     |
[ squads ]          [ skills ]     times de agentes | procedimentos
    |                     |
    +----------+----------+
               |
   [ time transversal ]  economia, idioma, anti-genérico, aprendizado
               |
   [ gates de proteção ]  bloqueia ou pede confirmação antes de agir
               |
          a entrega
               |
   [ memória ]  o que aprendemos fica, e o espelho vai para a Vault
```

## Decisões de arquitetura, e o porquê

### 1. Declarativo, não programático

O comportamento do ZEUS mora em arquivos markdown que o modelo lê, não em um
motor de orquestração em código.

POR QUÊ: o modelo já é o motor. Um orquestrador programático em cima dele
adiciona uma camada que precisa ser mantida, que engessa o julgamento e que
erra em casos que o modelo resolveria sozinho. Regra escrita é lida, entendida
e aplicada com bom senso; código não tem bom senso.

O QUE FICA EM CÓDIGO: só o que precisa ser determinístico. Gates de segurança,
versionamento, índices e o roteador. Segurança não pode depender de
interpretação.

### 2. Fail-open no contexto, fail-closed na segurança

O roteador de contexto, se quebrar, sai em silêncio e o trabalho continua.
Perder um contexto é aceitável.

Os gates de segurança, se detectarem algo, bloqueiam ou perguntam. Executar
uma ação destrutiva não é aceitável.

### 3. Tabela viva, nunca o código

Todo hook lê uma tabela JSON ao lado. Falso positivo se corrige na tabela.

POR QUÊ: a lógica é estável, a política muda toda semana. Separar as duas
permite ajustar comportamento sem tocar em código testado. E todo hook tem
fallback embutido: se a tabela sumir, a proteção continua valendo em modo
reduzido.

### 4. Sem porta dos fundos

Não existe marcador que o próprio assistente possa usar para pular um gate.

POR QUÊ: se existisse, ele usaria. Um gate que o agente consegue contornar
não é um gate, é uma sugestão. A liberação é sempre humana, editando a
tabela.

### 5. Poucos agentes, e bons

Cada squad tem um lead mais 3 a 6 especialistas. Nunca dezenas.

POR QUÊ: cada agente custa contexto e tempo. Squad grande não é mais
inteligente, é mais lento e mais propenso a produzir texto redundante. A
regra é o menor conjunto capaz de entregar bem.

### 6. Memória legível por humano

A memória é markdown na pasta `memory/`, espelhada para uma Vault do Obsidian.
Sem banco vetorial, sem índice invisível.

POR QUÊ: memória que o dono não consegue ler não é dele. Se o sistema guarda
tudo em embeddings, ninguém sabe o que ele acha que sabe, e não há como
corrigir. Markdown abre em qualquer editor, funciona sem o Obsidian, e
sobrevive a este projeto.

CUSTO ACEITO: busca por índice e por gatilho, não por similaridade semântica.
Para o volume de memória de uma pessoa, isso basta. Busca vetorial fica no
roadmap, como camada adicional, nunca substituindo os arquivos.

### 7. Tipo de informação marcado, sempre

Toda memória declara se é fato, declaração, hipótese, inferência, preferência,
decisão ou regra.

POR QUÊ: é o que impede o pior defeito de um assistente com memória, que é
promover suposição a verdade. Uma inferência não confirmada que vira regra
contamina todas as decisões seguintes, com aparência de embasamento.

### 8. Autonomia em escada, com teto fixo

Cinco níveis, e uma lista de ações que exigem confirmação em qualquer nível.

POR QUÊ: confiança se constrói, não se declara. Quem instala hoje não sabe se
o sistema é confiável, e não deveria descobrir com um erro caro. Mas algumas
ações nunca devem ser automáticas por mais confiança que exista: as que
gastam, publicam, enviam ou destroem.

### 9. Versionar antes de editar

Todo arquivo existente ganha cópia numerada antes de ser alterado.

POR QUÊ: o custo é um arquivo a mais; o benefício é nunca perder trabalho. É
a proteção mais barata do sistema inteiro.

### 10. Aprendizado com escalada

Erro registra. Erro repetido vira regra. Erro pela terceira vez vira trava em
código.

POR QUÊ: se uma regra escrita não segurou o erro duas vezes, escrever de novo
não vai segurar na terceira. Nesse ponto, o problema deixa de ser de
conhecimento e passa a ser de arquitetura.

## Fronteiras que não se cruzam

| Fronteira | Regra |
|---|---|
| Memória e código | `memory/` nunca é versionado no git. É do dono. |
| Genérico e pessoal | O repositório é genérico; toda personalização mora em `memory/` e `CLAUDE.local.md`. |
| Leitura e escrita na Vault | O repositório manda, a Vault recebe. Via única. |
| Sensível e espelhado | Memória sensível nunca sai para a Vault, nem para serviço externo. |
| Squad e orquestrador | O squad executa, o orquestrador decide quem executa. |

## O que ficou de fora, de propósito

- Interface gráfica. O Claude Code já é a interface.
- Banco de dados. Arquivo de texto resolve, e é auditável.
- Servidor. Tudo roda na máquina do dono.
- Multi-usuário. É um sistema pessoal. Compartilhar memória entre pessoas é
  outro produto, com outros problemas de privacidade.
- Motor de orquestração programático. Ver a decisão 1.

## Roadmap arquitetural

Ver `ROADMAP.md`. Em resumo: busca semântica como camada adicional, mais
planos por profissão, e suporte a outros runtimes além do Claude Code.
