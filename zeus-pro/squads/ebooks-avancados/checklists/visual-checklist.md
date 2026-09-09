# Checklist Visual (v3)

Usado pelo `book-qa`. A regra de design em si (cores, fontes, wireframe) e inviolavel e vive em
`docs/rules-on-demand/ebook-exemplo-padrão-oficial.md` -- este checklist só verifica aplicação, não
redefine o padrão.

1. [ ] PDF abre sem erro
2. [ ] Capa com logo oficial (img src, nunca recriado em SVG) e big idea legivel
3. [ ] Indice (TOC) existe com links clicaveis
4. [ ] Número de páginas dentro do target +/- 10%
5. [ ] Tipografia do tema aplicada (Playfair Display + DM Sans para Exemplo, ou tema do tenant)
6. [ ] Paleta do tema aplicada sem dissonancia (bg, accent, text)
7. [ ] Contraste WCAG AA
8. [ ] Ornamentos presentes (grain, cantos, footer -- conforme tema)
9. [ ] Icones/gráficos renderizados corretamente
9.1 [ ] Esquemas dos marcadores (tabela, fluxo, pirâmide, funil, linha do tempo, matriz) renderizados com cores do tema, legíveis no PDF, sem estourar os 241mm úteis nem invadir os 30mm do rodapé
9.2 [ ] Nenhuma página com dois blocos densos juntos (a tabela com 5 ou mais linhas e a matriz contam como bloco denso sozinhos)
10. [ ] Hierarquia visual clara (título > subtitulo > corpo > destaque)
11. [ ] Zero travessao (U+2014) e zero meia risca (U+2013)
12. [ ] Acentuacao PT-BR perfeita
13. [ ] Se Modo B (mentorado novo): paleta extraida do logo teve aprovacao explicita antes de aplicar
    em todo o material (nunca aplicar direto sem checagem de dissonancia)
