# Portal Descomplica — Indicadores APS

Site público e responsivo conectado ao Google Planilhas.

## 1. Publicar a API da planilha

1. Abra a planilha do Portal Descomplica.
2. Clique em **Extensões > Apps Script**.
3. Apague o conteúdo existente e cole o arquivo `apps-script/Code.gs`.
4. Em **Configurações do projeto**, confira o fuso `America/Sao_Paulo`.
5. Clique em **Implantar > Nova implantação**.
6. Selecione **Aplicativo da Web**.
7. Em **Executar como**, escolha **Eu**.
8. Em **Quem pode acessar**, escolha **Qualquer pessoa**.
9. Autorize e copie a URL final terminada em `/exec`.

A planilha não precisa ficar pública. O aplicativo lê os dados com a autorização do proprietário e entrega apenas os dados preparados pelo script.

## 2. Conectar o site

Abra `config.js` e cole a URL em:

```js
apiUrl: "SUA_URL_DO_APPS_SCRIPT_AQUI"
```

## 3. Publicar o site

### Opção simples: Netlify

Arraste a pasta `portal-descomplica` para a área de implantação manual do Netlify.

### Opção com domínio próprio

O mesmo pacote pode ser publicado em Netlify, Cloudflare Pages, GitHub Pages ou na hospedagem já usada pela Prefeitura.

## Manutenção diária

- Textos dos indicadores: altere nas abas atuais da planilha.
- Notas e resultados: altere nas tabelas atuais.
- O portal consulta a planilha sempre que é aberto.
- Não é necessário editar HTML para atualizar números ou orientações.

## Segurança

Não coloque nomes de pacientes, CPF, CNS ou dados identificáveis nas abas lidas pelo portal. Publique somente dados consolidados.


## Revisão metodológica — 22/07/2026

Conteúdos de Vínculo/Acompanhamento, C3, C4, C5, C7 e M2 revisados conforme as notas metodológicas oficiais fornecidas pelo Ministério da Saúde. A classificação final do componente de vínculo também foi corrigida no código do portal.


## Ajuste visual da fórmula do cadastro

A fórmula do resultado do cadastro foi reorganizada em etapas visuais: soma ponderada dos dois tipos de cadastro, divisão pelo parâmetro e multiplicação por 100.

## Revisão metodológica - 19/10/2026

Saúde Bucal (B1 a B6) revisada conforme as versões atualizadas das Notas Metodológicas do Ministério da Saúde. Foram incorporadas as regras de carga horária e vinculação das eSB, consideração da produção em Unidade Odontológica Móvel, CBOs elegíveis por indicador e detalhamentos de elegibilidade/registro. A Nota Técnica nº 8/2026-DEAPS/SAPS/MS também foi conferida; as faixas de classificação do portal já estavam corretas, inclusive o limite de 2,5 pontos como Regular no Componente III.


## Comparativo municipal

O comparativo municipal mantém o Q1/2026 e inclui o Q2/2026, com seleção de período na própria página. Os dados do Q2 foram incorporados a partir dos relatórios públicos do SIAPS de Vínculo e Acompanhamento Territorial e Qualidade — Conceito obtido por indicador, gerados em 19/10/2026.


## Atualização Q2/26 — Avaliação Quadrimestral
- Mantido o Q1/26.
- Adicionado o Q2/26 com seletor de quadrimestre na Avaliação Quadrimestral.
- Q2/26 inclui 17 eSF, 3 eMulti e 2 eSB conforme relatórios SIAPS enviados em 19/10/2026.

## Atualização mensal — Agosto/2026

- Dados mensais atualizados para a competência AGO/26, conforme 16 relatórios SIAPS enviados em 19/10/2026.
- A tela **Notas mensais** passa a comparar **Julho x Agosto/2026**, com evolução por unidade.
- O **Resumo das notas Mensal** passa a exibir os resultados de Agosto/2026.
- Atualizados Vínculo e Acompanhamento, os sete indicadores de Saúde da Família, seis indicadores de Saúde Bucal e os dois indicadores da eMulti.
- Mantidos sem alteração os comparativos Q1/Q2 de municípios, a Avaliação Quadrimestral Q1/Q2 e as revisões metodológicas do Ministério da Saúde.

## Ajustes de 19/10/2026
- B1, B2 e B4 resumidos para consulta rápida, preservando códigos e regras essenciais.
- Corrigida a exibição das Notas Mensais de Saúde Bucal.
- Removido o texto auxiliar da página de Avaliação Quadrimestral.
- Comparativo de Municípios Q2: Cadastro e Acompanhamento reunidos sob uma única opção “Vínculo e acompanhamento”, mantendo as duas dimensões visíveis separadamente.


## Atualização
- Detalhamento Mensal restaurado com dados da competência Ago/26 (preliminares).


## Ajuste visual B1, B2 e B4
Conteúdo reorganizado para manter o formato simplificado anterior (código, regras, fórmula e notas), preservando as regras atualizadas do Ministério da Saúde.
