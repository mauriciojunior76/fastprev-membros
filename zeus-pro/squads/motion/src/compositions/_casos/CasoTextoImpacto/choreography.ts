/**
 * CasoTextoImpacto — fixture de regressao (fase 6). Frase de impacto,
 * palavra por palavra (stagger de palavra), depois assinatura final.
 */
import { defineSpec, alternateDir } from "../../../core/choreo";

export default defineSpec({
  composition: "CasoTextoImpacto",
  fps: 30,
  scenes: [
    {
      name: "frase",
      from: 0,
      dur: 90,
      exitF: 68,
      // ownsMotion:true: a frase se anima palavra por palavra por dentro
      // (wordEntry), o palco so aplica um fade simples de saida (nunca
      // soma outra entrada de posicao por cima, ver core/choreo.ts).
      elements: [{ id: "frase-impacto", role: "hero", entry: { dir: alternateDir(0) }, ownsMotion: true }],
    },
    {
      name: "assinatura",
      from: 82,
      dur: 50,
      exitF: null,
      elements: [{ id: "assinatura", role: "hero", entry: { dir: alternateDir(1) } }],
    },
  ],
});
