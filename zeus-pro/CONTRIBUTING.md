# Contribuir

## O que ajuda de verdade

1. RELATO DE USO REAL. O que funcionou, o que atrapalhou, onde o ZEUS te
   irritou. Isso vale mais que código.
2. PLANO DE PROFISSÃO NOVO. Se a sua área não está em
   `onboarding/planos-por-profissao/`, escreva o seu seguindo o formato de
   `generico.md`. É a contribuição mais útil que existe hoje.
3. CORREÇÃO DE ERRO. Regra confusa, comando que não funciona, documentação
   errada.
4. FRAMEWORK GENÉRICO. Princípio público bem explicado para algum squad.

## O que não entra

- Método proprietário, conteúdo de curso pago ou material sob direito autoral.
- Dependência nova sem uma justificativa forte. O projeto é Node.js puro de
  propósito.
- Squad com trinta agentes. A regra é poucos e bons.
- Qualquer coisa que enfraqueça as travas de confirmação.
- Dado pessoal, seu ou de terceiro, em exemplo. Use sempre exemplo fictício.

## Antes de enviar

```bash
node scripts/sanitize-audit.js   # nada pessoal escapou?
node scripts/medir-contexto.js   # o contexto continua abaixo do teto?
node --check <arquivo.js>        # a sintaxe está válida?
```

## Padrão de escrita

- Português brasileiro com acentuação correta.
- Frase curta. Regra escrita como ordem, não como sugestão.
- Toda regra explica o PORQUÊ. Regra sem motivo não é seguida.
- Sem travessão nem meia risca: vírgula, dois pontos ou reescreva.
- Linguagem simples: quem lê pode não ser programador.

## Licença

Contribuição aceita entra sob a licença do projeto (ver `LICENSE`). Uso
pessoal livre, uso comercial mediante autorização.
