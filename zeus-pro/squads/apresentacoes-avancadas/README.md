# Zeus Show

**Apresentações sob medida para mentores.** Squad com 52 agentes especializados e memória persistente por mentor.

Cria prelúdios em loop automático, aulas interativas e ebooks visuais com estética profissional. Você passa a ideia em texto livre, o Zeus Show entrega o HTML pronto e publicado na sua URL.

- 52 agentes especializados + 1 Lead orquestrador.
- Orquestração sob demanda: ativa só os especialistas necessários por briefing.
- Memória persistente: cada mentor fica personalizado desde a segunda execução.
- 6 temas visuais (Exemplo, Apple, Vintage, Futurista, Editorial, Corporativo).
- Gate obrigatório de acentuação, contraste WCAG AA e responsividade.
- Deploy automático para VPS com HTTPS.

---

## Comando de ativação

```
Zeus Show, vamos criar uma apresentação
```

Na primeira vez, o squad pergunta 8 coisas (nicho, produto, avatar, tom, marca, cores, estilo, referências). Isso vira o seu perfil salvo em `_memory/mentores/{seu-slug}.md`. Da segunda execução em diante, o squad pula o onboarding.

---

## Formatos que ele cria

### Prelúdio (antes da aula)

Loop automático de 30 a 60 segundos. Slides curtos com ícones animados, frases de curiosidade, countdown para a abertura da aula. Roda sozinho num telão ou numa aba do navegador.

### Aula (durante o encontro)

Navegação manual por seta, scroll ou teclado. Slides mais densos com esquemas, comparativos, números de impacto, linha do tempo. Sem loop automático.

### Ebook (depois da aula)

Página scrollável com índice, seções, bullets, bloco de código quando é técnico. Pra compartilhar como material de apoio ou guia de leitura livre.

---

## Os 52 agentes por camada

| Camada | Agentes | Quando ativa |
|--------|---------|--------------|
| Onboarding | 5 | Primeira execução do mentor |
| Intake | 3 | Sempre |
| Copy | 6 | Sempre |
| Conteúdo Avançado | 5 | Quando tem número, comparação, timeline, prova |
| Design Visual | 6 | Sempre |
| Design Reforço | 3 | Quando precisa adaptar paleta ou estilo extra |
| Iconografia | 4 | Quando usa ícone |
| Icon Reforço | 2 | Quando precisa ícone externo |
| Imagens | 4 | Quando precisa de foto |
| Animação | 5 | Sempre |
| Qualidade | 6 | Sempre (gate obrigatório) |
| Formato | 3 | Sempre (1 por formato escolhido) |

Total: 52 agentes + Lead Maestro.

---

## Instalação rápida

```bash
git clone https://github.com/seu-usuario/zeus-show.git
cd zeus-show
npm install
node scripts/install.js
```

Depois:

```bash
node scripts/new-presentation.js
```

Abre o wizard interativo.

Detalhes completos em [MANUAL.md](MANUAL.md).

---

## Requisitos

- Node.js 18 ou superior
- Git
- 10 minutos para a primeira configuração

Opcional:

- Conta Unsplash, Pexels ou Pixabay (apenas se for usar fotos)
- Chave de API do Lovart (apenas se for gerar imagens com IA)

---

## Temas disponíveis

| Tema | Descrição |
|------|-----------|
| Exemplo | Dark + rosegold, editorial, luxo. Tema padrão |
| Apple | Claro, minimalista, SF-like, premium |
| Vintage | Tons terra, serifa, papel envelhecido |
| Futurista | Dark neon, glow, cyberpunk sutil |
| Editorial | Revista premium, preto/branco, serifa |
| Corporativo | Azul executivo, sóbrio, enterprise |

O Style Oracle decide o tema baseado nas suas preferências ou você escolhe direto.

---

## Diretório

```
zeus-show/
├── README.md           # você está aqui
├── MANUAL.md           # instalação passo a passo
├── WIZARD.md           # primeira apresentação guiada
├── CHANGELOG.md
├── squad.yaml          # 52 agentes + workflows
├── agents/             # 53 arquivos .md
├── templates/          # masters HTML (prelúdio, aula, ebook)
├── themes/             # 6 variantes visuais
├── _memory/            # regras globais + pasta por mentor
├── config/             # regras visuais, specs, schema
└── scripts/            # install, new-presentation, deploy
```

---

## Licença

Uso interno Synkra AIOS. Distribuição autorizada para mentores da sua mentoria.

---

## Autor

um mentor de referencia para Synkra AIOS. Repo público: [seu-usuario/zeus-show](https://github.com/seu-usuario/zeus-show).
