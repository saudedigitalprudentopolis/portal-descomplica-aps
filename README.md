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


## Atualização — 18/09/2026

- `Notas mensais` renomeado para **Evolução Mensal**.
- **Resumo das notas Mensal** preservado sem alterações.
- Incluído o novo menu **Detalhamento do Indicador Mensal**.
- Detalhamento disponível para Vínculo/Acompanhamento, C1–C7, Saúde Bucal e eMulti.
- O Ponto de Atenção é exibido somente quando o item de menor desempenho estiver em Regular, Suficiente ou Bom.
- Os percentuais auxiliares não são exibidos abaixo das notas.
- Os cabeçalhos não repetem a nota máxima; a nota máxima permanece nas células (ex.: `15,31/20`).


## Ajustes finais — 18/09/2026

- `Detalhamento do Indicador Mensal` renomeado para **Detalhamento Mensal**.
- **Resumo das notas Mensal** recebeu o selo `Competência Jul/26`.
- **Avaliação quadrimestral** recebeu o selo `Indicadores do 1º quadrimestre de 2026`.
- No Detalhamento Mensal, além das notas, passam a aparecer números brutos do SIAPS/MS:
  - Saúde da Família (C2–C7): numerador / denominador.
  - Vínculo e Acompanhamento: cadastros, parâmetro populacional e pessoas acompanhadas.
  - Saúde Bucal (B1–B6): numerador / denominador.
  - eMulti (M1–M2): numerador / denominador.
- Percentuais continuam ocultos.
- O Ponto de Atenção continua vazio quando o menor desempenho da equipe é `Ótimo`.
