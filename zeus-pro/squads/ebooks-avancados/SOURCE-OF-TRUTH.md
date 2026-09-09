# SOURCE OF TRUTH - Cadeia Oficial de Verdade do Book Forge

## STATUS: LEITURA OBRIGATÓRIA antes de gerar QUALQUER ebook
## CRIADO: 2026-06-10, após dois erros em sequência no mesmo ebook (dourado + template errado)
## ATUALIZADO: 2026-07-02 (v3) - pipeline consolidado para 13 agentes. Está hierarquia de cor/logo/
## template continua 100% inviolável e é lida pelo `book-designer` (agente v3 que absorveu
## theme-loader, cover-designer, logo-guardian, color-consistency-guard e outros 11 agentes visuais
## antigos). Antes de produzir estratégia, tema ou objetivo do ebook, ver `STRATEGY.md` (novo,
## camada estratégica que vem ANTES desta cadeia visual no pipeline).

---

## O PROBLEMA QUE ESTE DOCUMENTO MATA

O squad tinha fontes de verdade ESPALHADAS e CONFLITANTES:
- `themes/exemplo.json` dizia uma coisa (tinha escala dourada)
- `_memory/o dono do canal-exemplo/approved-patterns.md` dizia outra (gold gradient aprovado)
- `docs/rules-on-demand/ebook-exemplo-padrao-oficial.md` dizia a CERTA (rosegold, template oficial)
- E o sistema escolhia a fonte errada porque nada apontava para a certa

Resultado: e-book entregue com dourado e com CSS inventado em vez do template oficial.
Isso NUNCA mais acontece se a cadeia abaixo for seguida na ordem.

---

## A CADEIA LINEAR (seguir SEMPRE nesta ordem, sem pular)

### PASSO 1: Ler a regra suprema
`docs/rules-on-demand/ebook-exemplo-padrao-oficial.md`
É a única autoridade sobre cores, fontes, wireframe, gates e pipeline.
Se qualquer outro arquivo do squad contradisser essa regra, a regra VENCE.

Página clara dentro de ebook escuro (garantia, certidão, prova isolada) é parte oficial do
padrão desde 23/07/2026, ver seção "Página clara dentro de ebook escuro" na regra suprema.
Variante Premium Claro (ebook majoritariamente claro) está em `templates/_drafts/`, SEM
status oficial até aprovação por demo.

### PASSO 2: Clonar o template oficial (NUNCA recriar CSS)
`squads/book-forge/templates/_oficiais-aprovados/exemplo-v2-template-oficial.html`
- Copiar o arquivo inteiro
- Editar APENAS os blocos `<div class="page">`
- NUNCA mexer no `<style>` nem no SVG defs (`linearGradient#rg`)
- NUNCA escrever CSS Exemplo do zero. O CSS oficial JÁ EXISTE.

### PASSO 3: Logo oficial
`squads/book-forge/templates/_oficiais-aprovados/exemplo-logo-rosegold.png`
- Converter para WebP local na pasta do ebook: `exemplo-logo-rosegold.webp`
- Referenciar SEMPRE com caminho local
- PROIBIDO usar `Exemplo OFICIAL dourado vivo.png` em ebooks (esse PNG é de outro contexto)

### PASSO 4: Conferir contra as referências vivas (confirmadas pelo o dono do canal em 2026-06-10)
| Referência | URL | Fonte local |
|------------|-----|-------------|
| Boas e Más Práticas com IA | https://seu-dominio.com.br | `biblioteca-ebooks-exemplo/04-boas-e-mas-praticas-com-ia/` |
| Ebooks, Governança e IA | https://seu-dominio.com.br | `biblioteca-ebooks-exemplo/03-ebooks-governanca-e-ia/` |
| Zeus Ebooks v2 | https://seu-dominio.com.br | `clientes/zeus/ebook-ebooks-v2/` |

São os ebooks aprovados em produção: cores, fontes, estilo e linguagem.
O novo ebook tem que parecer irmão deles.

### PASSO 5: Pipeline de validação (bloqueante)
```bash
python scripts/fix-acentos-pt.py <pasta>/index.html
python scripts/verify-pages-overflow.py <pasta>/index.html
grep -icE "F7E47A|D4A43A|C9941C|8B6410|C9A84C" <pasta>/index.html   # deve ser 0
grep -cE "—|–" <pasta>/index.html                                    # deve ser 0
```

### PASSO 6: Deploy + verificação
```bash
node scripts/deploy-<nome>.js   # rede zeus-extra (coolify está lotada desde 2026-06-10)
curl -s -o /dev/null -w "%{http_code}" https://seu-dominio.com.br   # 200
```

---

## HIERARQUIA DE AUTORIDADE (quando arquivos conflitam)

| Nível | Fonte | Papel |
|-------|-------|-------|
| 1 | `docs/rules-on-demand/ebook-exemplo-padrao-oficial.md` | LEI. Cores, fontes, wireframe, gates |
| 2 | `templates/_oficiais-aprovados/exemplo-v2-template-oficial.html` | Código canônico. Clonar, nunca recriar |
| 3 | `docs/rules-on-demand/exemplo-color-standard.md` | Regra de cores (rosegold sim, dourado não) |
| 4 | `themes/exemplo.json` | Metadados do tema (subordinado aos níveis 1-3) |
| 5 | `_memory/o dono do canal-exemplo/*.md` | Contexto e histórico. NUNCA fonte de cor ou template |

REGRA DE OURO: memória de squad é CONTEXTO, não AUTORIDADE.
Se a memória diz "aprovado" mas a regra suprema diz "proibido", está proibido.
Memória desatualizada foi exatamente o que causou o erro do dourado.

---

## SOBRE EBOOKS ANTIGOS (locais e na VPS)

Existem ebooks antigos com dourado (ex: Ebook Low Ticket Milionário, de abril/2026,
anterior ao padrão v2). Eles são HISTÓRICO, não referência de estilo.

| Ebook | Status como referência |
|-------|------------------------|
| `biblioteca-ebooks-exemplo/04-boas-e-mas-praticas-com-ia` | REFERÊNCIA OFICIAL VIVA (confirmada pelo o dono do canal 2026-06-10) |
| `biblioteca-ebooks-exemplo/03-ebooks-governanca-e-ia` | REFERÊNCIA OFICIAL VIVA (confirmada pelo o dono do canal 2026-06-10) |
| `ebook-ebooks-v2` (VPS) | REFERÊNCIA OFICIAL VIVA (primeira aprovação do padrão v2) |
| Ebook Low Ticket Milionário (181 pg) | Histórico. NÃO copiar cores (era pré-v2, tinha dourado) |
| Ebook Site Próprio Claude Code | Histórico. Conferir contra regra suprema antes de copiar qualquer coisa |
| Guia Agentes IA Mentores | Histórico. Mesma condição |

O catálogo central é `biblioteca-ebooks-exemplo/ebooks-registry.json` e o template da biblioteca
fica em `biblioteca-ebooks-exemplo/00-template-oficial/`. Novos ebooks entram no registry.

NUNCA usar um ebook antigo como fonte de paleta. Paleta vem do nível 1 da hierarquia.

---

## CHECKLIST FINAL ANTES DE ENTREGAR (gates marciais)

1. Clonei o template oficial? (não recriei CSS)
2. Logo é exemplo-logo-rosegold.webp local?
3. grep dourado = 0?
4. grep travessão = 0?
5. fix-acentos-pt.py rodado?
6. verify-pages-overflow.py sem issues?
7. curl 200 na URL?

Qualquer "não" = NÃO ENTREGAR. Voltar e corrigir.
