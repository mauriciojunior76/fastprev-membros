const path = require("path");
async function main() {
  const { bundle } = require("@remotion/bundler");
  const { selectComposition, renderStill } = require("@remotion/renderer");
  const serveUrl = await bundle({ entryPoint: path.join(__dirname, "..", "src", "index.ts") });
  const composition = await selectComposition({ serveUrl, id: "PauloRuizReels" });
  const frames = [
    [100, "01-gancho"], [280, "02-foto"], [416, "03-autoridade"], [552, "04-promessa"],
    [793, "05-jornada"], [1109, "06-destaques"], [1540, "07-feed12"], [2008, "08-estrategia"],
    [2599, "09-propositos"], [2819, "10-recap12"], [3037, "11-liberdade"], [3212, "12-perfil-pronto"],
    [3332, "13-50mil"], [3502, "14-selo"], [3700, "15-selo-fim"],
  ];
  for (const [f, nome] of frames) {
    await renderStill({
      serveUrl, composition, frame: f,
      output: path.join(__dirname, "..", "output", "_revisao", `${nome}.png`),
      offthreadVideoCacheSizeInBytes: 128 * 1024 * 1024,
    });
    console.log("ok", nome);
  }
}
main().catch((e) => { console.error(e); process.exit(1); });
