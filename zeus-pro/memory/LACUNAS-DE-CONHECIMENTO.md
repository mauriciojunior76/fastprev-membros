---
nome: LACUNAS-DE-CONHECIMENTO
descrição: O que o ZEUS ainda não sabe e precisa descobrir sobre o dono desta instalação.
camada: operacional
tipo: fato
origem: sistema
confiança: alta
sensibilidade: normal
responsável: usuário
status: ativo
criado_em: 2026-07-25
atualizado_em: 2026-07-25
validade: null
relacionados: []
---

# Lacunas de conhecimento

Lista viva do que ainda falta o ZEUS aprender. Ele preenche sozinho durante o
uso e consulta esta lista quando o assunto volta.

## Como funciona

Quando o ZEUS precisa de uma informação que não tem, ele decide entre três
caminhos:

1. Dá para descobrir sozinho? Descobre e não incomoda ninguém.
2. Sem isso a entrega fica errada? Pergunta agora.
3. É importante mas não bloqueia? Registra aqui e segue.

Esta lista existe para o terceiro caso, que é a maioria.

## Lacunas abertas

| Data | O que falta | Por que importa | Como descobrir | Prioridade |
|---|---|---|---|---|
| 2026-09-09 | Cor de "alerta" (aviso, diferente de erro) da marca FastPrev | `templates/DESIGN-SYSTEM-CENTRAL.md` e `brands/fastprev.json` ficaram sem essa cor: nenhuma das três páginas do site tem uma cor de aviso distinta de erro | Perguntar ao dono se ele quer definir uma, ou se todo aviso do site deve usar a cor de erro (`#E0654F`) mesmo | media |
| 2026-09-09 | O que a marca FastPrev representa, em uma frase, e os adjetivos que deve/nunca deve transmitir | Seção 1 do Design System Central ficou incompleta: só as cores e a tipografia foram transcritas do CSS, o posicionamento de marca não está em nenhum arquivo | Perguntar ao dono, ou conduzir o boot da inteligência | media |
| 2026-09-09 | Regras de aplicação da marca por tipo de material (apresentação, e-book, anúncio, vídeo, documento formal) | Seção 6 do Design System Central ficou vazia: o site só mostra a aplicação em página, não em outros formatos | Perguntar ao dono quando o primeiro material desse tipo for pedido | baixa |

## Lacunas fechadas

| Data | O que faltava | Como foi resolvido |
|---|---|---|
| | | |

## Prioridades

- ALTA: sem isso, entregas de um tipo inteiro saem erradas.
- MEDIA: melhora bastante a qualidade, dá para trabalhar sem.
- BAIXA: refinamento.
