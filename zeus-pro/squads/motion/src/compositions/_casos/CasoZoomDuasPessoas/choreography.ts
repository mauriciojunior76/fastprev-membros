/**
 * CasoZoomDuasPessoas — fixture de regressao (fase 6). Testa a hierarquia
 * da secao 6 do doc central: rosto > mensagem falada > legenda > grafico
 * complementar. Os 2 tiles de "pessoa" ficam fixos fora do palco de cena
 * (nao fazem parte do spec, sao o fundo constante). Dentro de cada cena, a
 * legenda (hero) sempre entra ANTES do grafico de apoio (support, delayF
 * maior que o hero) — nunca o contrario.
 */
import { defineSpec, alternateDir } from "../../../core/choreo";

export default defineSpec({
  composition: "CasoZoomDuasPessoas",
  fps: 30,
  scenes: [
    {
      name: "fala-1",
      from: 0,
      dur: 78,
      exitF: 56,
      elements: [
        { id: "legenda-1", role: "hero", entry: { dir: alternateDir(0) } },
        { id: "grafico-apoio-1", role: "support", entry: { dir: alternateDir(0), delayF: 10 } },
      ],
    },
    {
      name: "fala-2",
      from: 70,
      dur: 65,
      exitF: null,
      elements: [
        { id: "legenda-2", role: "hero", entry: { dir: alternateDir(1) } },
      ],
    },
  ],
});
