# Benchmark externo: 13 repos já clonados + pesquisa dirigida em 4 gaps

> Status: registro da Fase 8 da auditoria do ecossistema audiovisual (27/08/2026).
> Metodologia: primeiro auditou-se o que já estava clonado em `_research/` (nunca formalmente
> avaliado antes), depois pesquisa externa só nos 4 gaps reais confirmados pelas fases
> anteriores (motion blur, engine de legenda, diarização, indexação de vídeo).

## Veredito geral

Nenhum dos 13 repositórios substitui ou supera o núcleo do zeus-motion como um todo: em
coreografia declarativa, tokens de marca, springs e curvas nomeadas, alinhamento óptico e gate
automático de qualidade, o sistema próprio está à frente de tudo que foi auditado. Existem 5
técnicas pontuais reais, pequenas e baratas de portar. Nenhuma delas justifica importar um
pacote externo como dependência: em todo caso de ganho real, a decisão foi pegar a TÉCNICA e
descartar o repositório.

## Tabela principal

| Capacidade | Estado Zeus | Solução externa | Decisão | Motivo |
|---|---|---|---|---|
| Legenda pronta em SRT/VTT → frames | Captions.tsx só gera a partir do roteiro | remotion-ui: conversor SRT/VTT → objeto com frame de início/fim | ADAPT | Reimplementar só o conversor no módulo de legenda; o pacote inteiro é mal mantido (1 commit, componentes com duplo movimento que o próprio choreo-lint reprovaria) |
| Câmera 3D por etapas + partículas físicas | Não existe (OpticalBox é 2D) | remotion-bits: Scene3D (matriz/quaternion via three.js) + spawner de partículas | LEARN | Estudar a arquitetura; importar traria three.js (dependência pesada) sem nenhum gate de qualidade |
| Aberração cromática + blocos de interface (terminal/diff) | Nenhuma curva de aberração; device module não cobre terminal/diff | remocn: separação RGB no pico de transição + peças de UI de sistema | ADAPT | Recriar como curva nova e peça de módulo; o resto do repo (parado, sem token, sem legenda sincronizada) não compensa importar |
| Rastro de movimento (motion blur direcional) | Blur hoje é filtro CSS uniforme, nunca direcional | **@remotion/motion-blur** (pacote OFICIAL do time Remotion): `CameraMotionBlur` e `Trail` | ADAPT | Usar o pacote oficial (mantido, documentado), não o exemplo de 2022; prototipar `Trail` num elemento de entrada rápida, samples baixo (3-5), medir custo de render antes de padronizar |
| Moldura fiel de aparelho (iPhone/Android/iPad) | Já integrado (`react-device-mockup`, `DeviceFrame.tsx`, FULLSAFE) | idem | INTEGRATE (já feito) | Lacuna já fechada, manter como está |
| Hierarquia semântica em legenda (destaque só da palavra-chave, variedade de efeito) | Captions.tsx sincroniza por palavra com blur fixo | remotion-captions-themes, tema `kinetic-01` | LEARN | Copiar 2 ideias (destaque semântico, alternância blur/deslize/esmaecimento) como incremento, sem trocar o motor |
| Detecção de quem fala | Heurística de boca (MediaPipe) + suavização, 5,7x de diferença validada (spike Fase 7) | `webrtcvad` (VAD leve, sem torch) | REJEITADO, manter o atual | Áudio é canal único mixado: VAD só diz "tem voz", não "de quem"; só ganharia valor com trilha separada por pessoa |
| Indexação de vídeo por conteúdo | Cor e transcrição preenchidas à mão; busca por BM25+TF-IDF+grafo | Paleta dominante via k-means em keyframe (FFmpeg); transcrição via Whisper automático | ADAPT | Automação de baixo custo pro que já existe. Embeddings CLIP + banco vetorial: REJEITADO por ora (infraestrutura de milhares de vídeos, nosso volume é dezenas) |

## Rejeitados (resumo)

`remotion-animated`, `remotion-animations` (bug real de `Math.random()` quebrando determinismo),
`remotion-kit` (bug de divisão por zero), `Vibe Motion` (wrapper de app, zero técnica de motion),
`remotion-templates` (78/81 componentes hardcoded, formato horizontal errado),
`remotion-animate-text` (abandonado há 2+ anos), `react-mockup` (parado desde 2022, React 16
travado), `awesome-ui-libraries` (lista de links, zero código).

## Adotados ou a prototipar (próximo passo concreto)

1. **Motion blur oficial** (`@remotion/motion-blur`, componente `Trail`): prototipar em 1
   elemento de entrada rápida, samples 3-5, medir custo antes de virar padrão em `moves.ts`.
2. **Conversor de legenda SRT/VTT**: portar a função pro módulo de legenda, sem importar o
   pacote inteiro.
3. **Aberração cromática**: nova curva em `curves.ts`, ligada ao pico de troca de cena.
4. **Automação de indexação**: cor dominante via k-means em keyframe (FFmpeg) e transcrição via
   Whisper automático, alimentando os campos `video_*` do Atlas (ver `CATALOG_PROTOCOL.md`).
5. **Legenda com destaque semântico**: incrementar `Captions.tsx` com destaque de palavra-chave
   e alternância de efeito.

Guardado como referência, sem portar agora: câmera 3D e partículas do `remotion-bits` (custo do
three.js não compensa sem demanda real); blocos de interface do `remocn` (só valem se aparecer
pedido real de vídeo de demonstração de produto).

Nenhum item acima foi implementado nesta sessão: são recomendações com próximo passo definido,
não trabalho concluído. Qualquer adoção futura nasce com POC isolado antes de integrar ao core.

## Fontes da pesquisa dirigida

- Motion blur: [remotion.dev/docs/motion-blur](https://www.remotion.dev/docs/motion-blur/),
  [GitHub remotion-dev/motion-blur-example](https://github.com/remotion-dev/motion-blur-example)
- Legenda: [github.com/vshukla7/remotion-captions-themes](https://github.com/vshukla7/remotion-captions-themes),
  [remotion.dev/docs/captions/api](https://www.remotion.dev/docs/captions/api)
- Diarização: [py-webrtcvad](https://github.com/wiseman/py-webrtcvad),
  [State of Speaker Diarization 2026 (Picovoice)](https://picovoice.ai/blog/state-of-speaker-diarization/)
- Indexação: [Mixpeek, Video Analysis AI Guide](https://mixpeek.com/blog/video-analysis-ai),
  [pipeline FFmpeg+faster-whisper (DEV Community)](https://dev.to/kiranbaby14/i-built-a-video-search-engine-that-understands-what-youre-looking-for-51m7)
