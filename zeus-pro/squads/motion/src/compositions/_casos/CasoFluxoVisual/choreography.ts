/**
 * CasoFluxoVisual — fixture de regressao (fase 6). 3 nos de um fluxograma
 * com staggerF explicito (children.count:3), a mesma correcao aplicada no
 * Checklist do ZeusTrafegoReels (nunca mais 22f hardcoded dentro do
 * componente).
 */
import { defineSpec, alternateDir } from "../../../core/choreo";

export default defineSpec({
  composition: "CasoFluxoVisual",
  fps: 30,
  scenes: [
    {
      name: "fluxo",
      from: 0,
      dur: 100,
      exitF: null,
      elements: [
        {
          id: "fluxo-nos",
          role: "hero",
          entry: { dir: alternateDir(0) },
          children: { count: 3, staggerF: 18 },
        },
      ],
    },
  ],
});
