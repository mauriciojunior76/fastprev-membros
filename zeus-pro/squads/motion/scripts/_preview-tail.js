/**
 * Render de PREVIA rapido, so os ultimos N frames, sem o pipeline de gates
 * completo (choreo-lint, qa-frames, qa-approve). Uso pontual pra teste de
 * sincronia de audio novo no PauloRuizReels (04/09/2026). Nao entra no
 * fluxo normal de entrega — apagar depois do teste aprovado.
 */
const path = require("path");

async function main() {
  const { bundle } = require("@remotion/bundler");
  const { selectComposition, renderMedia } = require("@remotion/renderer");

  const ENTRY = path.join(__dirname, "..", "src", "index.ts");
  const composition = process.argv[2];
  const totalFrames = Number(process.argv[3]);
  const tailSeconds = Number(process.argv[4] || 15);
  const fps = Number(process.argv[5] || 60);
  const outputFile = process.argv[6];

  const startFrame = totalFrames - tailSeconds * fps;

  console.log("Empacotando...");
  const serveUrl = await bundle({ entryPoint: ENTRY });

  const selected = await selectComposition({ serveUrl, id: composition });

  console.log(`Renderizando frames ${startFrame} a ${totalFrames - 1}...`);
  await renderMedia({
    serveUrl,
    composition: selected,
    codec: "h264",
    outputLocation: outputFile,
    scale: 1,
    jpegQuality: 95,
    frameRange: [startFrame, totalFrames - 1],
    offthreadVideoCacheSizeInBytes: 128 * 1024 * 1024,
    offthreadVideoThreads: 1,
    onProgress: ({ progress }) => {
      process.stdout.write(`\r  ${Math.round(progress * 100)}%   `);
    },
  });

  console.log(`\nPronto: ${outputFile}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
