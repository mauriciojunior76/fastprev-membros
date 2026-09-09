# Zeus Reels Design System · v2.1

Sistema de design para vídeos verticais (1080×1920, 60 fps) do Zeus, estilo
Apple conceitual: preto no branco, vidro sutil, Inter + Playfair itálico para
ênfase, e **um portador de cor (espectro) por quadro** — sempre em traço
(anel, sublinhado, selo), nunca em preenchimento.

## Se você é uma IA, comece por `AI_USAGE_GUIDE.md`

Ele traz o processo de decisão em 10 passos, a metodologia **Transcript to
Visual**, as regras de confiança e fallback e a tabela de qual arquivo abrir em
qual momento. Depois dele, por produção, você lê apenas índices:

```
AI_USAGE_GUIDE.md            → uma vez
registry/semantic-registry.json → toda produção (estrutura → candidatos)
registry/visual-registry.json   → só as entradas candidatas
registry/scene-registry.json    → densidade e famílias de cena
registry/interface-registry.json → menção × ação em plataformas
registry/diagram-registry.json  → relação → esquema
registry/motion-registry.json   → gesto → curva, duração, som
semantic-atlas.md            → 53 frases faladas → recurso
decision-examples.md         → 4 vídeos reais analisados beat a beat
retrieval-tests.json         → 22 testes de recuperação (+ limitações)
```

## Comece por aqui (ordem de leitura para humanos)

1. `design-router.json` — roteador. Recebe um beat da transcrição e devolve
   família, entrada do índice, onde está a regra, peças, gesto e limites.
   Inclui regras de relação (gatilho lexical não basta), confiança/fallback,
   presets de composição e a seção `production` (Remotion).
2. `moldes-index.json` — índice de todos os moldes, esquemas e interfaces
   (id, família, modo completa/motion, tags, peças, gesto, versão, status,
   `where` = seção do guia + âncora do painel, `triggers`).
3. `DESIGN-SYSTEM-REELS-APPLE-v2.md` — o guia (fonte da verdade). §00 onde
   procurar · §0 como o sistema cresce · §1 cor · §2 presença × ênfase ·
   §3 legenda · §4–5 raio, espaço, rótulos · §6 moldes, esquemas, interfaces
   (completa e motion) · §6c simetria · §7 ícones · §8 gabarito · §9 movimento
   (funções de curva, massa visual, traço, expectativa, motion por natureza,
   AE → Remotion, produção) · §10 checklist.
4. `tokens/reels-tokens.css` — todos os valores como variáveis `--z-*`
   (cor, tipo com peso, raio, espaço, anéis, blur, curvas por função,
   durações por classe, layout, moldes). Tempos em quadros a 60 fps.
5. `icons-map.json` — termos da fala → ícone Lucide (escolha por SEO, nunca
   aleatória). `icons-log.json` — registro de uso por vídeo (rotação).
6. `numbers-spec.json` — a peça mais usada: os 6 tipos de número (contagem,
   dinheiro, hora, data, percentual, impacto) com corpo, peso, tracking,
   formatação pt-BR, conta × revela, som e cor. Painel: #s06-numeros.
7. `sfx-map.json` — efeito sonoro por movimento, com **peso 0–10** (o peso
   escolhe o arquivo e o volume na biblioteca de SFX do squad), regra de
   densidade, pan e sincronização por frame.
8. `Zeus Reels Design System.dc.html` — painel visual (prova de cada regra).
   Âncoras: #s01-cor · #s02-tokens · #s02b-icones · #s03-gabarito ·
   #s04-moldes · #s04b-gancho · #s04c-esquemas · #s04d-enfase ·
   #s04e-lettering · #s04f-simetria · #s04g-interfaces (completa) ·
   #s04h-motion (motion + celular) · #s05-movimento · #s05b-motion-semantico · #s06-numeros.
9. `CHANGELOG.md` — o que mudou na v2.1, migrações de ids e **pendências
   verificáveis** (leia antes de produzir em lote).
10. `assets/` — `{{marca.selo}}` (símbolo) e `{{marca.selo}}` (selo com anel).

## Regras que não se negociam

- Fundo branco puro; tinta `#1d1d1f`; cinzas do sistema; cor viva só no
  espectro de 8 paradas, em traço, um portador por quadro, ≤ 5% da tela.
- Verde/vermelho só em check/X (semântica), nunca como destaque.
- Texto colorido não existe. Sólido preto só até 64px (exceção: célula de
  contagem 96 em movimento). Acima disso, vazado + anel.
- Legenda: caixa baixa, sem pontuação, ≤ 2 linhas, faixa 1039→1161; some
  quando o palco tem tipografia própria.
- Ênfase na legenda: Playfair itálico, 1 palavra, regras em §3b.
- Um protagonista por beat; ritmo nível → molde → nível; nunca dois N3 em 15s.
- Movimento: quatro funções (response · transfer · reveal · exit), sem
  overshoot, deslocamento ≤ 16px, escala ≤ 1,04, blur como profundidade;
  contexto entra pronto, só a ação narrada acontece diante do público;
  hold ≥ 60q; um único anel que migra.
- No vídeo, interface é **motion** (símbolo: texto vira barra; só o dado lido
  vira texto real). A versão completa (#s04g) é para landing, site, deck.
- Ícones: Lucide 0.452, traço alvo 6,5px (`clamp(1, 2, 6,5×24/tamanho)`),
  sempre em contêiner, escolhidos pelo mapa, registrados no log.

## Estado

Painel, guia, tokens, índice e roteador estão sincronizados manualmente na
v2.1. O que **não** foi feito neste ambiente (ver CHANGELOG): componentes
Remotion, validação em runtime, testes, animações reais (os storyboards são
quadros estáticos) e leitura em aparelho a 360px. Variantes ainda não
desenhadas também estão listadas lá.

## Como estender

Vídeo novo → transcrição alinhada por palavra → beats → roteador → índice →
montar pelas peças → ícones pelo mapa → verificador (§6c, §10) → registrar
(índice + specimen no painel + log). Nada entra na biblioteca aprovada
durante um lote; composições novas nascem em modo exploração.
