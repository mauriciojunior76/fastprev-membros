/**
 * CasoEstatistica — fixture de regressao (fase 6). Numero hero com count-up
 * + label de apoio (delay hierarquico), depois texto de contexto.
 */
import { defineSpec, alternateDir } from "../../../core/choreo";

export default defineSpec({
  composition: "CasoEstatistica",
  fps: 30,
  scenes: [
    {
      name: "numero",
      from: 0,
      dur: 80,
      exitF: 58,
      elements: [
        { id: "numero-hero", role: "hero", entry: { dir: alternateDir(0) } },
        { id: "label-numero", role: "label", entry: { dir: alternateDir(0), delayF: 6 } },
      ],
    },
    {
      name: "contexto",
      from: 72,
      dur: 60,
      exitF: null,
      elements: [
        { id: "texto-contexto", role: "hero", entry: { dir: alternateDir(1) } },
      ],
    },
  ],
});
