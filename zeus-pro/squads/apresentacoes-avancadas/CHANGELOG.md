# Changelog - Zeus Show

## v1.0.0 - 2026-04-14

Primeira versão pública do Zeus Show. Evolução do squad interno `exemplo-presentation` (32 agentes) para uma distribuição aberta aos mentores da sua mentoria.

### Adicionado

- 52 agentes especializados organizados em 12 camadas
- 1 Lead orquestrador (Maestro) com roteamento sob demanda
- Camada de onboarding por mentor (5 agentes) com memória persistente
- Camada de imagens externas (4 agentes) com integração Unsplash, Pexels, Pixabay
- Camada de conteúdo avançado (5 agentes) para dados, timelines, comparações, narrativa, prova
- 6 temas visuais: Exemplo, Apple, Vintage, Futurista, Editorial, Corporativo
- 3 formatos: Prelúdio (loop), Aula (manual), Ebook (scroll)
- Accessibility Auditor: WCAG AA obrigatório
- Gate de acentuação perfeita automatizado
- Deploy automático para VPS Zeus com verificação HTTP 200
- Scripts CLI: install, new-presentation, validate-output, deploy
- Documentação completa: README, MANUAL, WIZARD
- Guia vivo publicado em seu-dominio.com.br/aula-zeus-show/
- Teaser prelúdio em seu-dominio.com.br/preludio-zeus-show/

### Base

- Construído sobre o padrão visual Exemplo validado em 8 apresentações internas
- Reusa a biblioteca Exemplo de 50 ícones animados
- Usa Playwright para renderização headless
- Compatível com Claude Code, Copilot CLI e execução standalone

### Créditos

Desenvolvido por um mentor de referencia para Synkra AIOS.
Padrão visual Exemplo por um mentor de referencia.
Iconografia por squad exemplo-icons.
