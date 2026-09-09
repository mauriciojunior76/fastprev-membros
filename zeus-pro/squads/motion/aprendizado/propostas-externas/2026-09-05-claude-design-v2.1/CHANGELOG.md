# CHANGELOG · Zeus Reels Design System

## 2.1 — revisão de auditoria (2026-09-05)

### Corrigido
- Cor: um portador por quadro também para cor citada (comparação: anel do Instagram só no lado descrito); pontos sólidos de espectro → mini-anel 14; gancho 1B reprovado; live → indicador neutro; anel aninhado → um contorno.
- Foco: presença × ênfase separadas; recuo por contraste (fundo gray400/.6 sem blur; dito gray600/.8, blur ≤2 opcional, nunca em rótulo); specimens dos moldes atualizados.
- Geometria: legenda 1039→1161 (122), palco 1162; 04f 6 = 3×2; blocos 280 máx. 3/linha; barras ≤3/bloco; conteúdo em foco ≥22px.
- Dados: preço revelado (não contado); enquete 64+36; ranking proporcional só com valores; monotônica só ilustrativa; onda gravada ≠ visualizador; progresso ≠ playback (indeterminado sem dado).
- Traço de ícone: clamp(1, 2, 6,5×24/tamanho) — 6,5px constantes de 80 a 156.
- Curvas: funções response/transfer/reveal/exit; settle deixa de prometer "começa parado".
- Tokens: shorthand tipográfico completo (peso, tamanho, altura), --z-fps, --z-caption-*, --z-emph-*, --z-dur-* por classe, --z-icon-stroke-*, --z-solid-*.
- Índice/roteador: foco-migra → foco; versões e status por entrada; deprecações; regras de relação; confiança/fallback; presets de composição; seção production.
- icons-log: IDs do índice, segundos, exceção de assinatura.

### Adicionado
- 04c: 6 esquemas prioritários (total 23 esquemas desenhados; 25 lógicas na gramática, 2 delas atendidas pelos moldes da 04) com inputs/foco/sequência/evitar — gargalo, causa-efeito, árvore de decisão, filtro por critérios, evidência anotada, manual × automatizado.
- 04h: 31 variantes motion + 6 interfaces dentro do celular (moldura 300) — formulário, chat, notificações, post, checkout, perfil — com regra de quando usar a moldura.
- 05b: motion por natureza do elemento — seis perguntas, classes temporais, contrato motionSpec, matriz de 24 elementos, natureza dos esquemas, teste de subtração, 3 storyboards (formulário, trio, causa-efeito).
- Guia §2 (presença × ênfase), §9a (contradições), §9e (motion), §9f (produção).

### Adicionado em 2.1.1
- Seção "Do After Effects para o Remotion": vocabulário técnico (comp, pre-comp, keyframe/clamp, Graph Editor→Easing.bezier, anchor point→transformOrigin, parenting, Trim Paths→dashoffset, track matte→mask, Gaussian Blur padronizado, sequencing sem drift, time remap, motion blur off, determinismo) e a receita [in][build][act][focus][hold][out] válida para todo molde. Tokens: --z-ease-response/transfer/reveal/exit, --z-blur-*, --z-offset-max.

### Adicionado em 2.1.2
- `sfx-map.json`: 40 eventos de som mapeados por gesto/molde, cada um com peso 0–10, categoria, dB de referência e ponto de sincronização em frames; escala de peso, 10 regras (densidade, corte por proximidade, cascata longa, pan, som sobre fala, soma ≤22 por cena) e os pesos 0 obrigatórios. Guia §9g + checklist item 13; roteador devolve `sfxSchedule`.
- Correções: gabarito da legenda 904×122 centro 1100 (era 134/1106); 7 rótulos com blur na seção 04 → recuo por contraste; citação do depoimento com ortografia normal; 97 gradientes com parada errada ({{marca.espectro.3}} 36% → 28%); seção 01 com espaçamento e alinhamento normalizados; SIM/NÃO da árvore fora das curvas.

### Pendências verificáveis (não executadas neste ambiente)
- Animação real: os storyboards são quadros estáticos; suavidade, sincronismo e transferência de foco em movimento NÃO foram observados.
- Componentes React/Remotion, validação em runtime (zod), fixtures e testes de regressão: não existem; o painel é preview de design (CSS inline), não implementação.
- Teste de leitura a 360px de largura real em aparelho: não executado; os specimens estão a 60% e os storyboards a 20%.
- O painel não consome tokens/reels-tokens.css (design components exigem estilo inline); a sincronização entre painel, guia e tokens é manual e foi revisada nesta versão, sem geração automática.
- Nomes de ícones Lucide verificados só para os que renderizam no painel; ícones citados em texto (circle-check, help-circle, clipboard-list, arrow-right, mail, video, tower-control) renderizam; qualquer novo nome deve ser conferido (help-circle → circle-help corrigido; varredura de imagens quebradas no painel: 0 de 615).
- Variantes de interface pedidas e ainda não desenhadas: kanban, editor de documento, fluxo de automação, central de conversas, activity log, simulador, pesquisa com fonte, version diff. Esquemas ainda não desenhados: dependência/desbloqueio, ponte, custo de oportunidade, acúmulo, saturação, distribuição, sintoma-causa, desmontar, objeção-resposta, zoom.
- Biblioteca de SFX: os arquivos vivem no PC do squad; o mapa nomeia categoria e peso, não valida se o arquivo existe nem mede loudness (LUFS) do mix final.
- Áreas seguras do Reels (160 / 1536): preset declarado, não verificado contra a UI atual do app.

### Handoff — contratos propostos (não implementados)
BeatPlan {id, templateId, templateVersion, family, role, startFrame, durationFrames, transcript: WordTiming[], focusEvents: FocusEvent[], captionPolicy, dataMode, assetIds}
WordTiming {id, text, startFrame, endFrameExclusive} · FocusEvent {startFrame, durationFrames, fromElementId|null, toElementId|null}
SemanticMotionSpec: ver painel #s05b-motion-semantico.

### Migração de identificadores
foco-migra → foco · trophy → award · gancho 1B → removido da seleção · "quatro estados" → presença × ênfase.
