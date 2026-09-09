# Escrita Segura em Conta de Google Ads

## STATUS: régua do squad zeus-google-ads. Gate obrigatório antes de qualquer alteração em conta real. Conta de cliente é patrimônio de terceiro.

## PRINCÍPIO

Ler é livre. Escrever é sob aprovação, sempre. Conta de anúncio de cliente é dinheiro real de outra pessoa: mudança errada não gera aviso, gera prejuízo silencioso.

## AS 6 TRAVAS (todas precisam passar antes de qualquer escrita)

1. CAPACIDADE TESTADA: a operação já foi testada em conta de teste antes de tocar conta real. Operação nunca executada não estreia na conta do cliente.
2. IDENTIFICADOR EXPLÍCITO: campanha, grupo, palavra ou anúncio identificados pelo id exato. Nunca operar por nome parecido nem por posição na lista.
3. DIFERENÇA LEGÍVEL: antes de aplicar, mostrar em português o que muda, do estado atual para o novo. Se não dá para explicar em uma linha o que muda, não aplica.
4. APROVAÇÃO COM TETO: você aprova, e a aprovação vale para aquela mudança, dentro de um teto definido. Mudança de verba tem teto de 30 por cento por vez e 7 dias de descanso. Sem teto definido, não escreve.
5. IDEMPOTÊNCIA E VOLTA: cada mudança carrega uma chave própria para não ser aplicada duas vezes, e o estado anterior fica guardado para desfazer.
6. CONFERÊNCIA DEPOIS: aplicou, lê de volta na API e confirma que o valor novo está lá. Retorno de sucesso da chamada não é prova; prova é o campo lido de novo.

Falhou qualquer uma, a operação não acontece. Não existe pular trava por pressa.

## O QUE NUNCA ACONTECE

- Nunca apagar campanha, grupo, palavra ou anúncio. Pausar preserva histórico; apagar joga aprendizado fora e não tem volta.
- Nunca alterar conta que o squad não criou sem autorização explícita, na mesma sessão.
- Nunca aplicar recomendação automática do Google em massa.
- Nunca subir campanha nova direto em ativo com verba alta. Sobe pausada, confere, ativa com verba de teste.
- Nunca escrever em conta real enquanto o token de desenvolvedor estiver pendente. Sem aprovação, a API opera só em conta de teste, e forçar isso quebra o acesso.

## ACESSO À API

A API do Google Ads exige um token de desenvolvedor aprovado (nível básico ou avançado, solicitado em ads.google.com, área de ferramentas e configurações, centro da API) e um MCC (conta de gerenciador) próprio. Sem aprovação, a API só opera em conta de teste, e forçar escrita em conta real sem o token aprovado quebra o acesso.

Enquanto o token não sai: as etapas de pesquisa, plano e criação de anúncio rodam normalmente, e a subida acontece em conta de teste ou como pacote pronto para subida manual pela interface do Google Ads.

## POLÍTICA DE CONTEÚDO DO GOOGLE (o que reprova anúncio)

Regra geral: o anúncio não promete resultado que não se pode garantir, não assusta, e não usa dado pessoal da pessoa para constranger.

SAÚDE E BEM-ESTAR (vale para qualquer profissional de saúde: psicólogo, nutricionista, fisioterapeuta, médico):
- Não prometer cura, resultado garantido nem prazo de melhora.
- Não citar diagnóstico como se o anúncio soubesse o que a pessoa tem.
- Não usar linguagem que explore medo ou sofrimento.
- Respeitar as regras do conselho profissional, que costumam ser mais rígidas que as do Google: sem promessa de resultado, sem comparação com colegas, sem depoimento de paciente quando o conselho proíbe.
- Caminho seguro: falar do atendimento, do método, do acolhimento e da facilidade de agendar. Nunca do resultado prometido.

DINHEIRO E RENDA: não prometer ganho, não citar valor de retorno, não sugerir enriquecimento rápido.

MARCA DE TERCEIRO: pode dar lance no nome do concorrente, mas não escrever o nome dele no texto do anúncio. Isso derruba o anúncio e pode gerar reclamação de marca.

## ANTES DE SUBIR, CONFERIR

1. As 6 travas passaram?
2. O gate de coerência dos 6 itens passou?
3. O texto passa na política da categoria?
4. A conversão está sendo medida e o identificador de clique chega no cadastro do lead?
5. O contexto da conta (`contexto.example.md` preenchido) confirma a régua desta categoria?

Qualquer não, não sobe.

## DEPOIS DE SUBIR

Ler de volta pela API e confirmar. Registrar no MEMORY.md do squad o que subiu, quando, e a previsão escrita antes do resultado, para o ciclo de aprendizado fechar depois.
