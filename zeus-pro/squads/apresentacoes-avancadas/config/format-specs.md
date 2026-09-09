# Especificações por Formato

## Prelúdio

- **Objetivo**: antecipação e desejo antes da aula começar
- **Duração por slide**: 8 a 10 segundos (dá tempo de ler tranquilo)
- **Duração total do loop**: 30s a 60s
- **Slides ideais**: 5 a 8
- **Navegação**: automática por padrão. Clique pausa. Seta e scroll também funcionam
- **Countdown**: aparece em slides específicos (abertura, meio, fechamento). Nunca fixo
- **Copy**: bullets curtos, perguntas de curiosidade, números de impacto, promessa
- **Animação**: blur reveal + word-by-word nos títulos, ícones em loop
- **Final do loop**: volta ao slide 1 suavemente, nunca para

## Aula

- **Objetivo**: transmitir conteúdo estruturado durante o encontro
- **Duração**: 15 a 45 minutos de apresentação ao vivo
- **Slides ideais**: 10 a 30
- **Navegação**: seta direita/esquerda, scroll do mouse, tecla espaço, touch swipe
- **Indicador**: barra ou dots mostrando posição atual
- **Copy**: títulos claros, bullets densos, exemplos, comparativos, passo a passo
- **Animação**: stagger de entrada dos elementos ao chegar no slide, ícones em loop
- **Sem loop**: após o último, botão ou link para próxima ação
- **Presenter mode**: tecla P abre notas privadas (opcional)

## Ebook

- **Objetivo**: material de leitura livre pós-aula
- **Duração**: leitura autodidata
- **Páginas**: scroll contínuo com âncoras
- **Navegação**: scroll do mouse, nav fixa no topo com links
- **Conteúdo**: seções com headings, bullets, tabelas, code blocks se técnico
- **Animação**: scroll reveal (entra ao aparecer na viewport)
- **Índice**: sidebar fixa em desktop, colapsa em mobile
- **Impressão**: CSS @print configurado para impressão limpa

## Tamanhos de tipografia por formato

| Elemento | Prelúdio | Aula | Ebook |
|----------|----------|------|-------|
| Título principal | clamp(3rem, 8vw, 6rem) | clamp(2rem, 5vw, 4rem) | clamp(2rem, 4vw, 3rem) |
| Subtítulo | clamp(1.2rem, 2.5vw, 2rem) | clamp(1.2rem, 2vw, 1.8rem) | clamp(1.2rem, 1.8vw, 1.6rem) |
| Corpo | clamp(1rem, 1.8vw, 1.4rem) | clamp(1rem, 1.5vw, 1.2rem) | clamp(1rem, 1.2vw, 1.1rem) |
| Número de impacto | clamp(4rem, 12vw, 9rem) | clamp(3rem, 8vw, 6rem) | clamp(2.5rem, 5vw, 4rem) |

## Grade por formato

- **Prelúdio**: 1 elemento por slide (centralizado) ou 2 (título + subtítulo)
- **Aula**: até 4 elementos por slide (título + 2-3 bullets ou comparativo)
- **Ebook**: sem limite, layout editorial livre

## Áudio (opcional)

- Prelúdio pode ter música de fundo em loop (volume 15%)
- Aula não tem áudio (evita competir com apresentador ao vivo)
- Ebook pode ter narração opcional (controle play/pause)
