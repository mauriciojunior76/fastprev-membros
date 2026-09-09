/**
 * CasoConceito — fixture de regressao (fase 6). Explicacao de conceito:
 * icone central se desenhando + rotulo de apoio (delay hierarquico
 * respeitado: support entra DEPOIS do hero), depois texto de explicacao.
 * Aqui o palco controla 100% o movimento (ownsMotion ausente), exercitando
 * o caminho de applyChoreo() em vez do ownsMotion:true do CasoLowerThird.
 */
import { defineSpec, alternateDir } from "../../../core/choreo";

export default defineSpec({
  composition: "CasoConceito",
  fps: 30,
  scenes: [
    {
      name: "setup",
      from: 0,
      dur: 78,
      exitF: 56,
      elements: [
        { id: "icon-concept", role: "hero", entry: { dir: alternateDir(0) } },
        { id: "label-concept", role: "label", entry: { dir: alternateDir(0), delayF: 8 } },
      ],
    },
    {
      name: "explicacao",
      from: 70,
      dur: 65,
      exitF: null,
      elements: [
        { id: "texto-explicacao", role: "hero", entry: { dir: alternateDir(1) } },
      ],
    },
  ],
});
