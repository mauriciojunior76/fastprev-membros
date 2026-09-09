const path = require("path");
async function main() {
  const { bundle } = require("@remotion/bundler");
  const { selectComposition, renderStill } = require("@remotion/renderer");
  const serveUrl = await bundle({ entryPoint: path.join(__dirname, "..", "src", "index.ts") });
  const composition = await selectComposition({ serveUrl, id: process.argv[2] });
  await renderStill({
    serveUrl,
    composition,
    frame: Number(process.argv[3]),
    output: process.argv[4],
    offthreadVideoCacheSizeInBytes: 128 * 1024 * 1024,
  });
  console.log("ok", process.argv[4]);
}
main().catch((e) => { console.error(e); process.exit(1); });
