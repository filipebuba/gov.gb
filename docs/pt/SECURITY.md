# Politica de Seguranca / Security Policy


Este documento descreve como reportar vulnerabilidades no **GOV-GB** e os principios de seguranca adotados no projeto.

### Escopo

Esta politica cobre:

- Aplicacao web (`src/`)
- Configuracoes de infraestrutura e deploy
- Scripts e SQL em `supabase/`

### Como Reportar Vulnerabilidades

Se descobrir uma vulnerabilidade:

1. **Nao** abra issue publica com detalhes sensiveis.
2. Envie um email para: `nhadafilipe@gmail.com`.
3. Inclua:
   - descricao tecnica do problema;
   - passos para reproducao;
   - impacto potencial;
   - sugestao de mitigacao (se houver).

### Processo de Resposta

- Confirmacao de recebimento: ate **72 horas**.
- Analise inicial e classificacao de severidade: ate **7 dias**.
- Plano de correcao e comunicacao: conforme risco e complexidade.
- Divulgacao publica: apos correcao e validacao.

### Boas Praticas de Seguranca

- Nunca commitar segredos ou chaves privadas.
- Usar variaveis de ambiente para credenciais.
- Validar e sanitizar entradas de usuario.
- Aplicar principio de menor privilegio no banco de dados.
- Manter dependencias atualizadas e revisar alertas de seguranca.

### Fora de Escopo

- Problemas em ambientes locais nao reproduziveis.
- Relatorios sem passos concretos de reproducao.
- Questoes sem impacto de seguranca real.

