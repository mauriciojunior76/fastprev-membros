# Briefing Estratégico do Ebook (obrigatorio, v3)

Preenchido pelo `book-strategist` a partir do pedido do usuario, ANTES de qualquer outline ou
escrita. Bloqueante: sem este briefing aprovado, o pipeline não avanca (PAUSA 0).

```yaml
título: ""
tenant: "" # o dono do canal-exemplo (Modo A) ou {mentor-slug} (Modo B/B+)

objetivo_primario: "" # 1 dos 10 objetivos de STRATEGY.md
objetivo_secundario: "" # opcional

tema: ""
tema_validado_contra_blacklist: false # true só após check
tema_validado_contra_whitelist: false # aspiracional, não bloqueante

público:
  persona: ""
  nivel_consciencia: "" # Unaware | Problem aware | Solution aware | Product aware | Most aware
  cruzado_com_icp_real: false # true após ler memory/icp-exemplo-ht-completo.md

promessa:
  texto: ""
  tem_numero_concreto: false # ex: "vender 10 mentorias de R$4k em 90 dias"

cta:
  tipo: "" # reflexivo | atitudinal | transacional | conteúdo
  proximo_passo_funil: "" # ex: "agendar encontro individual", "comprar Agente Arquiteto R$67"

origem_trafego_prevista: "" # organico, ads, lista, biblioteca pública
meta_resultado:
  downloads_esperados: ""
  leads_esperados: ""
  observacao: "Se não houver meta, declarar 'Dado ausente' -- não inventar número."
```

## Gate bloqueante (book-strategist)

Rejeitar e devolver ao usuario se:
- `objetivo_primario` vazio
- `tema` bate com qualquer item da blacklist (`STRATEGY.md`)
- `promessa.tem_numero_concreto` = false
- `cta.proximo_passo_funil` vazio

Se aprovado: seguir para `book-outliner` (PAUSA 1: outline).
