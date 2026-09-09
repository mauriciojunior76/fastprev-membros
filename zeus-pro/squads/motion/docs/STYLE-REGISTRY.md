# Style Registry: Zeus Motion

Catálogo de estilos. ON-DEMAND: cada estilo só carrega quando seus gatilhos aparecem.

## Estáveis (replicáveis)

| Estilo | Gatilhos | Doc | Base aprovada |
|--------|----------|-----|---------------|
| Navy Arquiteto Vintage | navy, arquiteto, vintage editorial, conhecimento brian, autoridade adulta | `STYLE-NAVY-ARQUITETO-VINTAGE.md` | ConhecimentoBrian v07 |
| Neo-Analógica | neo-analógica, brutalismo funcional, dark premium, rosa, verde acid | `STYLE-NEOANALOGIACA.md` | MaquinaNeoanalogiaca2 v12 |

## Reels de Zoom (call horizontal vira reel vertical com motion)

Categoria própria, com playbook técnico em `ZOOM-REEL-MOTION.md`. São três estilos, cada um com
livro completo: heurísticas, storyboard de referência cena a cena, catálogo de componentes,
curvas com tempo, erros cometidos e checklist de replicação.

| Estilo | Gatilhos | Doc | Composition | Versão aprovada |
|--------|----------|-----|-------------|-----------------|
| Popular | estilo popular, igual o de tráfego, reel institucional, vídeo do Zeus pelo Telegram | `STYLE-POPULAR.md` | ZeusTrafegoReels | v36 (34,52s) |
| Depoimento | estilo depoimento, igual o do Bernardo, depoimento de mentorado, prova social em reel | `STYLE-DEPOIMENTO.md` | BernardoDepoimentoReels | v10 (32,90s) |
| Apple Conceitual | estilo apple, apple conceitual, igual o vídeo do Hamilton, reels 2, objeto 3d, fundo branco minimalista | `STYLE-APPLE-CONCEITUAL.md` | HamiltonZeusReels | v18 (63,00s) |

### Como escolher entre os três

| Objetivo | Estilo |
|----------|--------|
| Institucional: apresentar um recurso, uma ferramenta, um sistema, com marcas na tela | Popular |
| Uma pessoa provando algo: depoimento, prova social, resultado de aluno | Depoimento |
| Conceito, argumento, ideia do o dono do canal explicada com objeto e número | Apple Conceitual |

### Base comum e protocolo

Os três herdam a mesma base de formato (`ZOOM-REEL-MOTION.md` seção 2b) e o mesmo protocolo de
replicação (seção 2). Cada livro documenta só os DESVIOS do seu estilo, nunca repete a base.

### Duas exceções desta categoria

1. Reels de Zoom rodam a 60 fps, sobre vídeo-fonte de 25 ou 30 fps. As convenções globais abaixo
   dizem 30 fps, e isso vale para o resto do squad, não para esta categoria.
2. Reel de Zoom NÃO nasce do `new-composition.js` (que gera 30 fps e outra estrutura). Nasce por
   cópia da composition de referência do estilo, seguida da poda obrigatória dos componentes que
   o novo storyboard não usa. Pular a poda é o ERRO #332: a v08 do reel do Hamilton saiu com uma
   cor que ninguém pediu porque herdou componentes de outra variante junto com a pasta.

## Em uso (docs no header das compositions, sem MD dedicado)

| Estilo | Gatilhos | Composition | Paleta |
|--------|----------|-------------|--------|
| Dark Luxury Tech Premium | luxury tech, laser red, nível 5 | ExemploUltraPremium, Ads007, MentoriaEstrutura21Dias | dark + `#FF001E` |
| Vintage Premium Anos 80 | anos 80, retrowave, vintage 80 | MaquinaMentoria | dark + gold + cyan + magenta |
| Vintage Sepia Quente | sepia, vintage quente | Conhecimento | paper + sepia + rust + gold |
| Apple Minimalist Kinetic | apple minimalista, pitch minimal | MentoriaPitch | minimal |
| Brabo Edition | brabo, diretor brabo | AgenteArquiteto, V2 | (ver `brabo-motion-os-v9.md`) |

## Como escolher

| Objetivo | Estilo |
|----------|--------|
| Autoridade adulta, explicar produto | Navy Arquiteto Vintage |
| Anúncio moderno direto | Neo-Analógica |
| Lançamento high ticket nível 5 | Dark Luxury Tech Premium |
| Feminino premium viral | Neo-Analógica Rosa |
| Low ticket agressivo | Vintage Premium Anos 80 |
| Storytelling emocional | Vintage Sepia Quente |
| Pitch minimal | Apple Minimalist Kinetic |
| Institucional Exemplo direto | Brabo Edition |

## Convenções globais Zeus Motion

- Portrait 1080x1920, 30fps, h264 (exceção: Reels de Zoom rodam a 60fps sobre fonte de 25 ou 30)
- Áudio: trilha + narração em camadas
- Whisper word-timestamps obrigatório
- FULLSAFE em `_versions/` antes de editar
- Tag `-APROVADO-1080x1920` após aprovação
- Type-check zero erros antes de render

## Criar novo estilo

Estilo novo nasce de composition real aprovada. Quando aprovada:
1. Criar `docs/STYLE-NOME.md` enxuto (modelo: Navy Arquiteto Vintage)
2. Adicionar linha aqui no registry com gatilhos
