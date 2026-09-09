const path = require("path");
async function main() {
  const { bundle } = require("@remotion/bundler");
  const { selectComposition, renderMedia } = require("@remotion/renderer");
  const serveUrl = await bundle({ entryPoint: path.join(__dirname, "..", "src", "index.ts") });
  const composition = await selectComposition({ serveUrl, id: process.argv[2] });
  await renderMedia({
    serveUrl,
    composition,
    codec: "h264",
    outputLocation: process.argv[3],
    scale: 1,
    jpegQuality: 100,
    crf: 16,
    x264Preset: "slow",
    pixelFormat: "yuv420p",
    offthreadVideoCacheSizeInBytes: 256 * 1024 * 1024,
    offthreadVideoThreads: 1,
    onProgress: ({ progress }) => process.stdout.write(`\r  ${Math.round(progress * 100)}%   `),
  });
  console.log(`\nPronto: ${process.argv[3]}`);
}
main().catch((e) => { console.error(e); process.exit(1); });
