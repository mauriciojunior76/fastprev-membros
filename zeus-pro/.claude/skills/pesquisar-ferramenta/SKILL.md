---
name: pesquisar-ferramenta
description: Procura, audita e recomenda ferramenta ou projeto público que amplie o que o ZEUS consegue fazer, sem instalar nada sem autorização. Use quando faltar capacidade técnica para atender um pedido, ou quando o dono perguntar se existe alguma ferramenta para determinada coisa.
---

# Pesquisar ferramenta

## Antes de procurar

Pergunte-se: o que já existe no sistema resolve? Ferramenta nova é dívida
permanente: código de terceiro na máquina do dono, que precisa ser mantido,
atualizado e confiado. A melhor dependência é a que não foi instalada.

## Pipeline

### ETAPA 1: definir a necessidade em uma frase
"Preciso de algo que faça X, recebendo Y e devolvendo Z." Se você não
consegue escrever essa frase, ainda não sabe o que procurar.

### ETAPA 2: buscar
Procure em repositório público, em registro de pacotes e na documentação
oficial das ferramentas que o dono já paga. Muitas vezes a capacidade já
existe em algo que ele assina e não usa.

### ETAPA 3: auditar cada candidato

| Critério | O que verificar | Reprova se |
|---|---|---|
| Licença | Qual é, e se permite o uso pretendido | Proíbe o uso, ou não tem licença |
| Manutenção | Data do último commit e das últimas versões | Parado há mais de dois anos |
| Comunidade | Contribuidores, issues abertas e respondidas | Um autor só, issues abandonadas |
| Documentação | Existe e explica o básico | Sem documentação |
| Dependências | Quantas traz junto | Traz dezenas de pacotes |
| Permissões | O que ela pede acesso para fazer | Pede mais do que precisa |
| Segurança | Vulnerabilidades conhecidas | Vulnerabilidade aberta e sem correção |
| Necessidade | Resolve mesmo o problema, ou só parte | Resolve 30 por cento e complica o resto |

### ETAPA 4: apresentar ao dono
Máximo três candidatos, com: o que faz, por que serve, o que preocupa, e a
sua recomendação com o motivo. Uma recomendação clara, não um catálogo.

### ETAPA 5: instalar só depois do "pode"
Instalação exige autorização explícita, sempre. Depois de instalar, registre
em `docs/DEPENDENCIAS-E-FONTES.md`: nome, link, para que serve, licença,
versão, data, riscos conhecidos, e qual parte do sistema usa.

## Fronteiras invioláveis

- Nunca execute código baixado sem ter lido o que ele faz.
- Nunca instale nada sem autorização, mesmo que pareça óbvio e inofensivo.
- Nunca envie dado do dono para serviço de terceiro sem autorização
  específica para aquele serviço e aquele tipo de dado.
- Repositório público serve para achar FERRAMENTA. Nunca é fonte de verdade
  sobre direito, medicina, contabilidade ou qualquer área regulada.
