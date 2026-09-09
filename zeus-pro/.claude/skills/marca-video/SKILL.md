---
name: marca-video
description: Configura a marca visual dos vídeos (paleta, tipografia e estilo de traço) e grava em squads/motion/src/brand/marca.json, liberando o time de vídeo. Usar quando a pessoa disser "configura a marca do meu vídeo", "minha identidade no vídeo", quando o marca-check reprovar, ou antes do primeiro vídeo.
---

# Marca no vídeo

## Objetivo

O método de vídeo veio inteiro no pacote, mas a cara do vídeo é sempre a de quem está usando. Esta
skill descobre a marca da pessoa e grava o arquivo que libera o time de vídeo.

Leia antes: `squads/motion-apple/MARCA-DO-USUARIO.md` (o que pode e o que não pode ser copiado).

## Quando roda

- No boot da inteligência, passo 4.
- Quando `node squads/motion/scripts/marca-check.js` reprovar.
- Sempre que a pessoa quiser trocar a identidade dos vídeos.

## Passo a passo

### 1. Descobrir o material que já existe

Pergunte, nesta ordem, e pare assim que tiver o suficiente:

1. Você tem uma pasta de marca (manual, logotipo, cores)? Se sim, qual o caminho?
2. Se não tem: me manda três a cinco referências. Pode ser foto, print do Pinterest, um site que
   você gosta, uma peça sua que deu certo.
3. Tem uma cor que já é a sua? Qual?

Se a pessoa mandar imagens, leia as imagens e tire as cores dominantes delas. Se mandar um site,
leia a página e pegue as cores e as fontes.

### 2. Fechar a paleta

Cinco cores, nesta função:

| Posição | Função | Dica |
|---|---|---|
| 1 | fundo | a cor que ocupa a tela inteira |
| 2 | texto | contraste alto contra o fundo |
| 3 | texto secundário | mesma família do texto, mais apagado |
| 4 | destaque | a cor que marca o que importa |
| 5 | apoio | usada em traço fino, borda e detalhe |

Confira o contraste entre fundo e texto. Se estiver fraco, avise e proponha o ajuste.

### 3. Escolher o estilo de traço

Explique em uma frase cada um e deixe a pessoa escolher:

- `apple-conceitual`: traço fino, cantos largos, muito espaço em branco.
- `classico`: traço grosso, cantos pequenos, sem vidro, título com serifa.
- `proprio`: a pessoa define espessura, canto e respiro.

Trocar só a cor e manter a estrutura ainda deixa o vídeo parecido com o de origem. O estilo é o que
dá a cara.

### 4. Gravar

Escreva `squads/motion/src/brand/marca.json`:

```json
{
  "nome": "minha-marca",
  "paleta": ["#0b1b2b", "#f7f7f5", "#8d8d92", "#c8a04a", "#1f6f8b"],
  "estilo": "classico",
  "tipografia": { "titulo": "Georgia", "corpo": "Inter" },
  "selo": "assets/meu-selo.png"
}
```

O campo `selo` é opcional: só preencha se a pessoa tiver um símbolo próprio.

### 5. Conferir

```bash
node squads/motion/scripts/marca-check.js
```

Passou, diga que o time de vídeo está liberado e mostre como criar a primeira peça:

```bash
node squads/motion/scripts/new-composition.js MinhaPrimeiraPeca --estilo classico
```

Reprovou, mostre o motivo em linguagem simples e corrija junto com a pessoa. O motivo mais comum é
paleta parecida demais com a marca de origem: nesse caso troque as cores, não o gate.

## O que nunca fazer

- Preencher a marca sozinho, sem perguntar, só para o gate passar.
- Usar a paleta ou o selo da marca de origem porque "ficou bonito".
- Dizer que está pronto sem ter rodado o `marca-check.js` e visto passar.
