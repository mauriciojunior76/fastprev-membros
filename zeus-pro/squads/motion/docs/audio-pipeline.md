# Audio Pipeline — Receita Completa (narração + trilha + mixing)

Complementa `guia-video-narrado.md`. Aqui está o COMO executável de cada etapa de áudio.
Regra mãe: NUNCA Audio component dentro da composition. Todo áudio entra via ffmpeg pós-render.

## 1. Gerar narração

TTS (MiniMax ou Edge TTS) → `public/{nome}-narracao.mp3`.

## 2. silencedetect → scene_map.json

```bash
ffmpeg -i public/{nome}-narracao.mp3 -af silencedetect=noise=-35dB:duration=0.15 -f null - 2>&1
```

Extrair `silence_start` / `silence_end` do stderr. Cada segmento falado vira uma cena.
Converter segundos → frames (× 30).

### Schema do scene_map.json

```json
{
  "fps": 30,
  "audio": "public/{nome}-narracao.mp3",
  "total_frames": 1387,
  "scenes": [
    {
      "id": "C1",
      "from": 0,
      "dur": 142,
      "narr_start": 0.0,
      "narr_end": 4.5,
      "text": "texto exato narrado neste intervalo"
    }
  ]
}
```

Leis:
- `durationInFrames` de TODA cena vem daqui. NUNCA inventar timing (ERRO8).
- Cena NUNCA se estende além de `narr_end` (ERRO9).
- Mudou `dur` de uma cena: propagar cascata em todas as seguintes (ERRO10).
- `EXIT_F = narr_end × 30 - from`, e `EXIT_F + 18 <= dur`.

## 3. Legendas word-level (opcional)

```bash
python scripts/transcribe-words.py public/{nome}-narracao.mp3 --out src/compositions/{Comp}/data/narration.json
```

Consumir com o componente `<Captions>` de `src/modules/text-system/Captions.tsx`.

## 4. Render (sem áudio)

```bash
# draft (conferência visual)
npx remotion render {CompId} out/{nome}-draft.mp4 --scale=0.5 --jpeg-quality=80
# final
npx remotion render {CompId} out/{nome}-video.mp4 --jpeg-quality=95
```

Antes do render: `node scripts/pre-render-validate.js` DEVE passar.

## 5. Mixing ffmpeg (a parte que sempre quebra)

O mp4 do Remotion pode carregar um stream AAC embutido. `-map 0` inclui esse stream e gera
áudio triplo (ERRO7). Por isso:

### Só narração

```bash
ffmpeg -i out/{nome}-video.mp4 -i public/{nome}-narracao.mp3 \
  -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest \
  out/{nome}-FINAL.mp4
```

### Narração + trilha de fundo

```bash
ffmpeg -i out/{nome}-video.mp4 -i public/{nome}-narracao.mp3 -i public/{trilha}.mp3 \
  -filter_complex "[2:a]volume=0.12,atrim=start={startFrom_s}[bg];[1:a][bg]amix=inputs=2:duration=first:dropout_transition=0[out]" \
  -map 0:v -map "[out]" -c:v copy -c:a aac -b:a 192k -shortest \
  out/{nome}-FINAL.mp4
```

- Volume da trilha: 0.10-0.15 (referência aprovada: 0.12 no MentoriaEstrutura21Dias).
- `startFrom` da trilha calculado pra música fechar junto do vídeo (ver music_sync_note no squad.yaml).

PROIBIDO:
- `-map 0` ou `-map 0:a` (áudio triplo, ERRO7)
- `aecho` / `delay` filters (eco artificial)

## 6. Verificação obrigatória

```bash
ffprobe -v error -show_entries stream=codec_type -of csv=p=0 out/{nome}-FINAL.mp4
```

Resultado exigido: exatamente `video` + `audio` (1 de cada). Qualquer coisa diferente: NÃO entregar.
