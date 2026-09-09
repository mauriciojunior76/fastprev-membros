/**
 * CasoLowerThird — fixture de regressao (fase 6 da reforma do motion design
 * system, 20/08/2026). Exercita modules/lower-thirds/: SpeakerLowerThird e
 * ContextTag ja se animam sozinhos (entryFrom/exitTo internos via props
 * start/exit), por isso ownsMotion:true nos dois — o palco so cuida do
 * corte de cena, nao aplica entrada/saida de posicao por cima (evitaria
 * duplo movimento, o mesmo bug real do AskBubble/ResponseBubble).
 */
import { defineSpec, alternateDir } from "../../../core/choreo";

export default defineSpec({
  composition: "CasoLowerThird",
  fps: 30,
  scenes: [
    {
      name: "speaker",
      from: 0,
      dur: 78,
      exitF: 56,
      elements: [
        { id: "speaker-lower-third", role: "hero", entry: { dir: alternateDir(0) }, ownsMotion: true },
      ],
    },
    {
      name: "tag",
      from: 70,
      dur: 60,
      exitF: null,
      elements: [
        { id: "context-tag", role: "hero", entry: { dir: alternateDir(1) }, ownsMotion: true },
      ],
    },
  ],
});
