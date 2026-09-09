# Task 01 - Coletar Briefing do Webinario

> Agente responsavel: Ficha (webinar-intake-specialist)
> Fase: 0 - Briefing
> Bloqueante: SIM

## Inputs

- Solicitacao inicial do usuario
- Contexto do projeto (se existir)

## Protocolo de Execucao

### STEP 1 - Apresentar formulario de coleta
Apresentar ao usuario os 12 campos obrigatorios do briefing, explicando brevemente o que cada um significa e por que e necessario.

### STEP 2 - Coletar os 12 campos
Coletar as seguintes informacoes:
1. Nome do webinario
2. Nicho de atuacao
3. Produto vendido ao final
4. Ticket do produto (valor)
5. Modelo: vivo, automatizado ou hibrido
6. Tipo: incluso, pago ou por aplicacao
7. Publico-alvo (descricao detalhada)
8. Dores principais do publico
9. Promessa inicial (o que o participante vai conquistar)
10. Orcamento de trafego disponivel
11. Stack tecnologica (plataformas, ferramentas)
12. Equipe disponivel (quem faz o que)

### STEP 3 - Validar completude
Verificar se todos os 12 campos foram preenchidos com informacao suficiente. Se algum campo estiver vago ou incompleto, solicitar detalhamento antes de prosseguir.

### STEP 4 - Consolidar briefing
Organizar todas as informacoes coletadas em formato estruturado, com cada campo claramente identificado e preenchido.

## Outputs

- `webinar-brief-{project}.md` - Documento completo com os 12 campos do briefing preenchidos e validados

## Checklist de Validacao

- [ ] Todos os 12 campos preenchidos
- [ ] Nenhum campo com resposta generica ou vaga
- [ ] Ticket do produto definido com valor exato
- [ ] Modelo (vivo/auto/hibrido) escolhido explicitamente
- [ ] Tipo (incluso/pago/aplicacao) escolhido explicitamente
- [ ] Publico-alvo descrito com detalhes suficientes para pesquisa
- [ ] Stack tecnologica listada com ferramentas especificas
- [ ] Briefing salvo no formato padrao
