# Privacidade

## O essencial

Tudo que o ZEUS aprende sobre você fica na sua máquina, em arquivos de texto
que você pode abrir, ler, corrigir e apagar. O autor deste projeto não recebe,
não coleta e não tem acesso a nada disso.

## Onde ficam os seus dados

| O quê | Onde | Vai para o git? |
|---|---|---|
| O que ele sabe sobre você | `memory/` | Não |
| Suas chaves de integração | `.env` | Não |
| Sua Vault do Obsidian | onde você escolher | Não |
| Registro de erros e correções | `memory/_learning/` | Não |
| Cópias de segurança de arquivos | `_versions/` | Não |
| A estrutura do sistema | todo o resto | Sim |

O `.gitignore` já cuida disso. Se você publicar um fork, nada pessoal vai
junto.

## O que sai da sua máquina

O ZEUS roda dentro do Claude Code. O texto da conversa e os arquivos que ele
lê durante a conversa vão para o modelo de IA que você escolheu, porque é
assim que qualquer assistente de IA funciona. Isso vale para este e para
qualquer outro.

O que NÃO acontece:

- Nenhum dado vai para o autor deste projeto.
- Nenhuma telemetria, nenhuma estatística de uso, nenhum "ping para casa".
- Nenhuma integração externa é chamada sem você ter configurado a chave e
  autorizado a ação.

## Memória sensível

Marque uma memória com `sensibilidade: sensível` ou `secreto` e ela:

- Nunca é espelhada para a Vault.
- Nunca é enviada a serviço externo sem autorização específica.
- É tratada com cuidado extra em toda produção.

Use isso para: dado de cliente ou paciente, informação financeira, documento
pessoal, qualquer coisa sobre terceiro identificável.

## Dados de terceiros

Se você atende clientes, pacientes ou alunos, os dados deles não são seus para
distribuir. Regras que valem sempre:

- Dado de terceiro é sempre sensível.
- Nunca aparece em exemplo, em material público ou em espelho.
- Se a sua área é regulada (saúde, direito, contabilidade), as regras do seu
  conselho valem acima de qualquer conveniência deste sistema.

## Como apagar tudo

```bash
# apaga o que o ZEUS sabe sobre você, mantendo o sistema
# confira o conteúdo antes: não tem volta
```
Apague a pasta `memory/`, o arquivo `.env` e a sua Vault. O sistema volta ao
estado de instalação nova e vai te oferecer o boot de novo, sem lembrar de
nada.

## Seus direitos

Os dados são seus. Você pode ler todos, corrigir todos, exportar todos (já
são arquivos de texto) e apagar todos, a qualquer momento, sem depender de
ninguém e sem pedir para nenhum sistema.

Isso não é uma cortesia deste projeto: é consequência de a memória ser
arquivo de texto na sua máquina, em vez de banco de dados na nuvem de alguém.
