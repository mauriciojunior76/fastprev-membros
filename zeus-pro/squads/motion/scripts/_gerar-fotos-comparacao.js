/**
 * Gera as 2 imagens da cena "foto certo/errado" do PauloRuizReels.
 * Gemini (Nano Banana) sem cota de imagem na chave atual (limit 0,
 * 04/09/2026) — usa OpenAI gpt-image-1 no lugar, mesma familia de
 * ferramenta ("nanobanana ou GPT, a mais barata", pedido do o dono do canal).
 */
require("dotenv").config({ path: require("path").join(__dirname, "..", "..", "..", ".env") });
const fs = require("fs");
const path = require("path");

const KEY = process.env.OPENAI_API_KEY;
const OUT = path.join(__dirname, "..", "output", "_assets-foto-comparacao");
fs.mkdirSync(OUT, { recursive: true });

const PROMPTS = {
  errado:
    "Realistic amateur smartphone photo of a person, full body visible from head to feet, standing far away and small in the frame, in a cluttered messy room background full of distracting objects, poor flat harsh lighting, low contrast, washed out dull colors, grainy low resolution, unprofessional casual outfit, awkward stiff pose, badly composed snapshot, looks like a bad AI-generated profile photo.",
  certo:
    "Realistic professional headshot photo, tightly framed portrait cropped from just above the collarbone (two finger-widths below the chin) to the top of the head, sharp focus, excellent studio lighting with soft shadows, high contrast, clean elegant blurred neutral background, professional business attire, confident warm natural expression, centered composition, high quality magazine-grade portrait photography.",
};

async function gerar(nome, prompt) {
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
      quality: "low",
    }),
  });
  const json = await res.json();
  if (!res.ok) {
    console.error(nome, "ERRO", JSON.stringify(json).slice(0, 800));
    return null;
  }
  const b64 = json?.data?.[0]?.b64_json;
  if (!b64) {
    console.error(nome, "sem imagem na resposta", JSON.stringify(json).slice(0, 800));
    return null;
  }
  const buf = Buffer.from(b64, "base64");
  const outPath = path.join(OUT, `${nome}.png`);
  fs.writeFileSync(outPath, buf);
  console.log(nome, "salvo em", outPath, buf.length, "bytes");
  return outPath;
}

(async () => {
  for (const [nome, prompt] of Object.entries(PROMPTS)) {
    await gerar(nome, prompt);
  }
})();
