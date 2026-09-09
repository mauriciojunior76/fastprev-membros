# Gravação bruta

Aqui mora o material que o o dono do canal manda: a gravação de 10, 20 ou 60 minutos e a
transcrição dela, lado a lado, uma pasta por gravação.

```
brutos/AAAA-MM-DD-assunto/
    gravacao.mp4
    transcricao.json     (ou .srt)
```

## Por que esta pasta existe separada

É o único material do fluxo que **não se refaz**. Render sai do código de novo; gravação
perdida não volta. Por isso ela fica fora de qualquer pasta chamada `output`, que é
ignorada pela cópia de segurança, e entra na fonte `aios-video` do backup diário.

Não vai para o histórico do projeto (arquivo grande demais), mas é copiada todo dia para
o Google Drive e o OneDrive.

## O que fazer com uma gravação nova

```bash
node scripts/minerar-ganchos.js brutos/<pasta>/transcricao.json --quantos 10
node scripts/lote.js --de brutos/<pasta>/transcricao.json --midia brutos/<pasta>/gravacao.mp4 --aplicar
```

O primeiro comando lê a transcrição inteira fora da conversa e devolve só os cortes com
gancho aprovado. O segundo prepara cada corte como produção.

Detalhe em `docs/ESCALA-E-APRENDIZADO.md`.
