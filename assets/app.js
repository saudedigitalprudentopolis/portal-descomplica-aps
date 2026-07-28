const cfg = window.PORTAL_CONFIG || {};
const state = { data:null, route:'home', query:'', monthlySort:{section:0,column:0,direction:'asc'}, summarySort:{section:0,column:0,direction:'asc'}, quadrSort:{group:0,column:0,direction:'asc'}, municipalSort:{column:6,direction:'desc'} };
const svgIcon = body => `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${body}</svg>`;
const icons = {
  home: svgIcon('<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M9 22V12h6v10"/>'),
  vinculo: svgIcon('<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>'),
  familia: svgIcon('<path d="M11 2v2"/><path d="M5 2v2"/><path d="M5 3H4a2 2 0 0 0-2 2v3a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/><path d="M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/>'),
  bucal: svgIcon('<path d="M12 5.5C10.93 4.91 10.19 4 8.67 4 5.98 4 4 6.28 4 9c0 4.5 2.5 11.5 5 11.5 1.25 0 1.25-4 3-4s1.75 4 3 4c2.5 0 5-7 5-11.5C20 6.28 18.02 4 15.33 4 13.81 4 13.07 4.91 12 5.5Z"/>'),
  emulti: svgIcon('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'),
  mensais: svgIcon('<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M8 2v4"/><path d="M16 2v4"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/>'),
  resumo: svgIcon('<path d="M4 3h16v18H4z"/><path d="M8 8h8"/><path d="M8 12h8"/><path d="M8 16h5"/>'),
  quadrimestre: svgIcon('<path d="M4 3h16v18H4z"/><path d="m8 13 2 2 5-5"/><path d="M9 3V1h6v2"/>'),
  municipios: svgIcon('<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z"/><path d="M9 3v15"/><path d="M15 6v15"/>'),
  sobre: svgIcon('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>')
};
const labels = {home:'Início', vinculo:'Vínculo e acompanhamento', familia:'Saúde da Família', bucal:'Saúde Bucal', emulti:'eMulti', mensais:'Notas mensais', resumo:'Resumo das notas Mensal', quadrimestre:'Avaliação quadrimestral', municipios:'Comparativo de municípios', sobre:'Sobre'};
const navGroups = [
  ['Portal',['home']],
  ['Indicadores',['vinculo','familia','bucal','emulti']],
  ['Resultados',['mensais','resumo','quadrimestre','municipios']]
];
const aboutInfo = {
  sobre: 'Desenvolvido com o objetivo de facilitar o acesso às informações essenciais, contribuindo para o entendimento e o acompanhamento dos indicadores de forma clara, rápida e acessível.',
  desenvolvedores: [
    ['Lucas Bahri', 'Coordenador da Saúde Digital e Inovação'],
    ['Guilherme Horodenski Meneghini', 'Estagiário Saúde Digital e Inovação']
  ],
  apoio: [
    ['Camila S. Tluski Siqueira', 'Diretora da Rede de Atenção Primária'],
    ['Erica Moleta Bini', 'Diretora do Departamento de Gestão em Saúde'],
    ['Cassia Jaíne do Nascimento', 'Coordenadora da Rede de Atenção Primária']
  ]
};

const OFFICIAL_CONTENT_OVERRIDES = {"vinculo":{"A1":{"title":"Cadastro (PESO 3)","content":"Considera apenas cadastros individuais incluídos ou atualizados nos últimos 24 meses, até o último mês do quadrimestre avaliado.\n\nNão são considerados cadastros rápidos ou simplificados, nem pessoas cujo cadastro individual tenha \"Fora de Área\" ou \"Mudança de território\".\n\nTipos de cadastro e fatores:\nCadastro rápido, atendimento individual ou outra forma de entrada no sistema: não considerado.\nCadastro individual (MICI): fator 0,75.\nCadastro individual + cadastro domiciliar e territorial (MICI + MICDT): fator 1,5.\n\nSe o cadastro domiciliar e territorial não tiver sido incluído ou atualizado nos últimos 24 meses, será considerado apenas o fator 0,75 do cadastro individual.\n\nFórmula do resultado do cadastro:\nX = [(nº de pessoas com somente cadastro individual × 0,75) + (nº de pessoas com cadastro completo × 1,5)] ÷ população-parâmetro da equipe ou população IBGE × 100.\n\nParâmetro por porte populacional e tipo de equipe:\nAté 20 mil habitantes: eSF 2.000; eAP 30h 1.500; eAP 20h 1.000.\nAcima de 20 mil até 50 mil: eSF 2.500; eAP 30h 1.875; eAP 20h 1.250.\nAcima de 50 mil até 100 mil: eSF 2.750; eAP 30h 2.063; eAP 20h 1.375.\nAcima de 100 mil: eSF 3.000; eAP 30h 2.250; eAP 20h 1.500.\n\nQuando a população do município for inferior ao parâmetro da equipe, utiliza-se a população atualizada do IBGE no denominador.\n\nAtenção ao limite financeiro:\nSe o limite máximo de pessoas cadastradas por eSF ou eAP for ultrapassado, a classificação do componente poderá alcançar no máximo \"Bom\" para fins de transferência do incentivo financeiro no quadrimestre posterior.\n\nNotas\n\nRegular < 45% = 0,75\n\nSuficiente 45 a 64,9% = 1,50\n\nBom 65 a 84,9% = 2,25\n\nÓtimo > 85% = 3,00"},"A2":{"title":"Acompanhamento (PESO 7)","content":"Pessoa acompanhada:\nPessoa com mais de um contato assistencial em 12 meses, sendo necessário que pelo menos um contato seja uma prática de cuidado. Considera-se prática de cuidado + procedimento ou prática de cuidado + outra prática de cuidado.\n\nProcedimentos incluem:\nVacinação (MIV) e demais procedimentos do MIP.\n\nPráticas de cuidado incluem:\nAtendimento individual (MIAI).\nAtendimento odontológico individual (MIAOI).\nAtividade coletiva (MIAC).\nMarcadores de consumo alimentar (MIMCA).\nVisita domiciliar e territorial (MIVDT).\n\nFatores de vulnerabilidade:\nSem critérios = 1,0.\nPessoa idosa ou criança = 1,2.\nBPC ou PBF = 1,3.\nPessoa idosa ou criança + BPC ou PBF = 2,5.\n\nPara esta ponderação, criança é a pessoa com até 5 anos incompletos e pessoa idosa é quem tem 60 anos ou mais.\nBPC: Benefício de Prestação Continuada.\nPBF: Programa Bolsa Família.\n\nFórmula do resultado do acompanhamento:\nA = pessoas acompanhadas sem critério × 1,0.\nB = pessoas idosas ou crianças acompanhadas × 1,2.\nC = pessoas acompanhadas beneficiárias do PBF ou BPC × 1,3.\nD = pessoas idosas ou crianças acompanhadas e beneficiárias do PBF ou BPC × 2,5.\nY = (A + B + C + D) ÷ população-parâmetro da equipe ou população IBGE × 100.\n\nNotas\n\nRegular < 45% = 1,75\n\nSuficiente 45 a 64,9% = 3,50\n\nBom 65 a 84,9% = 5,25\n\nÓtimo > 85% = 7,00\n\nAvaliação do usuário - Aplicativo Meu SUS Digital\n\nSatisfação do usuário:\nA equipe recebe pontuação adicional quando houver atendimento avaliado no aplicativo Meu SUS Digital. A avaliação positiva ou negativa não altera o bônus.\n\nPontuação adicional:\nNenhuma avaliação = sem acréscimo.\nAcima de 0% e abaixo de 5% do total de atendimentos avaliados no quadrimestre = +0,15 ponto.\n5% ou mais do total de atendimentos avaliados no quadrimestre = +0,30 ponto.\n\nO universo considerado é o total de atendimentos registrados no SIAPS pela equipe no quadrimestre avaliado. O escore da dimensão acompanhamento não pode ultrapassar 7,00.\n\nResultado final do componente:\nEscore final = escore do cadastro (X) + escore do acompanhamento (Y).\nRegular: menor que 5,0.\nSuficiente: de 5,0 a 6,9.\nBom: de 7,0 a 8,5.\nÓtimo: acima de 8,5."}},"familia":{"C3":{"title":"Cuidado na Gestação e Puerpério (PESO 2)","content":"Equipe de Atenção Primária – Cuidado na Gestação e Puerpério\n\nConceitos importantes:\nCaptação precoce: início do pré-natal até a 12ª semana de gestação.\nData da Última Menstruação: parâmetro para o cálculo da idade gestacional.\nData Provável do Parto: data prevista para o nascimento.\nPuerpério: período após o parto, até 42 dias.\n\nInterrupção do acompanhamento:\nMudança de território registrada no cadastro individual.\nMudança de equipe conforme os critérios oficiais de desempate.\nAborto identificado por CID-10 ou CIAP-2.\nÓbito no CadSUS.\n\nDatas relevantes:\nO encerramento considera primeiro a Data de Desfecho da Gestação. Somente quando essa data não estiver registrada são considerados 294 dias de gestação, equivalentes a 42 semanas. O puerpério corresponde a 42 dias após a Data de Desfecho ou, na ausência dela, após o término estimado pelos 294 dias.\n\nCritérios de elegibilidade:\nGestação — CIAP-2: W03, W78, W79, W81, W84 e W85.\nGestação — CID-10: O10, O11, O12, O13, O14, O15, O16, O20, O21, O22, O23, O24, O25, O26, O28, O29, O30, O31, O32, O33, O34, O35, O36, O40, O41, O43, O44, O46, O47, O48, O75.2, O75.3, O98, O99.0, O99.1, O99.2, O99.3, O99.4, O99.5, O99.6, O99.7, Z32.1, Z33, Z34, Z35, Z36 e Z64.0.\nPuerpério — CIAP-2: 48, 49, P29, W18, W19, W70, W90, W91, W92, W93, W94, W95 e W96.\nPuerpério — CID-10: F53, F53.0, F53.1, F53.8, F53.9, M83.0, O10, O15.2, O26.6, O72.2, O72.3, O85, O86, O87, O90, O91, O92, O94, O98, O99, Z37.0 a Z37.7, Z37.9, Z38 e Z39.\nExclusão — CIAP-2: W82 e W83. CID-10: O02, O02.1, O03, O04, O05, O06 e Z30.3.\n\nAtividade coletiva:\nConsidera o quantitativo de participantes em atividades coletivas registradas com:\nAtividade 05 — Atendimento em grupo.\nAtividade 06 — Avaliação/Procedimento coletivo.\nPráticas em Saúde 01 — Antropometria.\nPráticas em Saúde 02 — Aplicação tópica de flúor.\nPráticas em Saúde 04 — Escovação dental supervisionada.\n\nOs registros podem ser específicos ou compartilhados, desde que o profissional esteja identificado.\n\nPara a atividade em saúde bucal durante a gestação, são considerados os registros com Atividade 05 — Atendimento em grupo ou Atividade 06 — Avaliação/Procedimento coletivo, junto com Práticas em Saúde 02 — Aplicação tópica de flúor ou Práticas em Saúde 04 — Escovação dental supervisionada, realizados por cirurgiã(o)-dentista ou técnica(o) de saúde bucal.\n\nVisita Domiciliar e Territorial:\nConsidera o registro de visitas domiciliares, com preenchimento do “motivo da visita”.\n\nConsulta Odontológica:\nAtividade em saúde bucal realizada por cirurgiã(o)-dentista ou técnica(o) de saúde bucal durante o período da gestação.\n\nSIGTAP - Códigos:\n01.01.04.002-4 - Avaliação antropométrica.\n01.01.04.008-3 - Medição de peso.\n01.01.04.007-5 - Medição de altura.\n03.01.10.003-9 - Aferição da pressão arterial.\n03.01.01.003-0 - Consulta de profissionais de nível superior na atenção primária (exceto médico).\n03.01.01.006-4 - Consulta médica em atenção primária.\n03.01.01.011-0 - Consulta pré-natal.\n03.01.01.012-9 - Consulta puerperal.\n03.01.01.013-7 - Consulta/atendimento domiciliar.\n03.01.01.025-0 - Teleconsulta na atenção primária.\n02.14.01.004-0 - Teste rápido para detecção de HIV na gestante ou pai/parceiro.\n02.14.01.027-9 - Teste rápido para detecção de anticorpos anti-HIV em gestante.\n02.14.01.005-8 - Teste rápido para detecção de infecção pelo HIV.\n02.14.01.007-4 - Teste rápido para sífilis.\n02.14.01.008-2 - Teste rápido para sífilis na gestante ou pai/parceiro.\n02.14.01.025-2 - Teste rápido treponêmico (sífilis) em gestante.\n02.14.01.009-0 - Teste rápido para detecção de hepatite C.\n02.14.01.030-9 - Teste rápido para detecção de anticorpos contra o vírus da hepatite C em gestante.\n02.14.01.010-4 - Teste rápido para detecção de infecção pelo HBV.\n02.14.01.023-6 - Teste rápido para detecção do antígeno de superfície do vírus da hepatite B - HBV (HBSAG) em gestante.\n02.13.01.078-0 - Detecção rápida da carga viral do HIV.\n02.13.01.050-0 - Quantificação da carga viral do HIV (RNA).\n02.02.03.109-8 - Teste treponêmico para detecção de sífilis.\n02.02.03.111-0 - Teste não treponêmico para detecção de sífilis.\n02.02.03.117-9 - Teste não treponêmico para detecção de sífilis em gestante.\n02.02.03.078-4 - Pesquisa de anticorpos IgG e IgM contra o antígeno central do vírus da hepatite B (anti-HBC total).\n02.02.03.097-0 - Pesquisa de antígeno de superfície do vírus da hepatite B (HBsAg).\n02.13.01.020-8 - Identificação do vírus da hepatite B por PCR (quantitativo).\n02.02.03.005-9 - Detecção de RNA do vírus da hepatite C (qualitativo).\n02.02.03.067-9 - Pesquisa de anticorpos contra o vírus da hepatite C (anti-HCV).\n02.02.03.030-0 - Pesquisa de Anticorpos Anti-Hiv-1 + Hiv-2 (Elisa).\n02.02.03.031-8 - Pesquisa de Anticorpos Anti-Htlv-1 + Htlv-2.\n\nEsquema de doses:\nUma dose da vacina acelular contra difteria, tétano e coqueluche (dTpa adulto), código 57 — Vacina dTpa adulto, a cada gestação, a partir da 20ª semana.\n\nFórmula de cálculo\n\nNumerador\n(A) Primeira consulta presencial ou remota por médica(o) ou enfermeira(o) até a 12ª semana de gestação — 10 pontos.\n(B) Pelo menos 7 consultas presenciais ou remotas por médica(o) ou enfermeira(o) durante a gestação — 9 pontos.\n(C) Pelo menos 7 registros de aferição de pressão arterial durante a gestação — 9 pontos.\n(D) Pelo menos 7 registros simultâneos de peso e altura durante a gestação — 9 pontos.\n(E) Pelo menos 3 visitas domiciliares por ACS/TACS após a primeira consulta do pré-natal — 9 pontos.\n(F) Vacina dTpa registrada a partir da 20ª semana — 9 pontos.\n(G) Testes ou exames avaliados para sífilis, HIV e hepatites B e C no 1º trimestre — 9 pontos.\n(H) Testes ou exames avaliados para sífilis e HIV no 3º trimestre — 9 pontos.\n(I) Pelo menos 1 consulta por médica(o) ou enfermeira(o) durante o puerpério — 9 pontos.\n(J) Pelo menos 1 visita domiciliar por ACS/TACS durante o puerpério — 9 pontos.\n(K) Pelo menos 1 atividade de saúde bucal durante a gestação — 9 pontos.\n÷\nDenominador\nNúmero total de gestantes e puérperas vinculadas à equipe no período.\n\nRegular\n≤ 25\n\nSuficiente\n> 25 e ≤ 50\n\nBom\n> 50 e ≤ 75\n\nÓtimo\n> 75 e ≤ 100"},"C4":{"title":"Cuidado da Pessoa com Diabetes (PESO 1)","content":"Equipe de Atenção Primária – Cuidado da Pessoa com Diabetes\n\nIdentificação da pessoa com diabetes:\nPessoa identificada em atendimento individual com a condição diabetes avaliada por médica(o) ou enfermeira(o) da APS, em pelo menos uma ocasião desde 2013.\n\nPara a identificação das pessoas com diabetes serão utilizadas as condições ou problemas “ativos” informados.\nAs pessoas com condições ou problemas “resolvidos” não serão contabilizadas para o período de referência.\n\nInterrupção do acompanhamento:\nMudança de território registrada no cadastro individual.\nMudança de equipe conforme os critérios oficiais de desempate.\nTodas as condições elegíveis marcadas como resolvidas.\nÓbito no CadSUS.\n\nCID-10 ativos considerados:\nE10 – Diabetes mellitus insulinodependente.\nE10.0 – Com coma.\nE10.1 – Com cetoacidose.\nE10.2 – Com complicações renais.\nE10.3 – Com complicações oftálmicas.\nE10.4 – Com complicações neurológicas.\nE10.5 – Com complicações circulatórias periféricas.\nE10.6 – Com outras complicações especificadas.\nE10.7 – Com complicações múltiplas.\nE10.8 – Com complicações não especificadas.\nE10.9 – Sem complicações.\n\nE11 – Diabetes mellitus não insulinodependente.\nE11.0 – Com coma.\nE11.1 – Com cetoacidose.\nE11.2 – Com complicações renais.\nE11.3 – Com complicações oftálmicas.\nE11.4 – Com complicações neurológicas.\nE11.5 – Com complicações circulatórias periféricas.\nE11.6 – Com outras complicações especificadas.\nE11.7 – Com complicações múltiplas.\nE11.8 – Com complicações não especificadas.\nE11.9 – Sem complicações.\n\nE14 – Diabetes mellitus não especificado.\nE14.0 – Com coma.\nE14.1 – Com cetoacidose.\nE14.2 – Com complicações renais.\nE14.3 – Com complicações oftálmicas.\nE14.4 – Com complicações neurológicas.\nE14.5 – Com complicações circulatórias periféricas.\nE14.6 – Com outras complicações especificadas.\nE14.7 – Com complicações múltiplas.\nE14.8 – Com complicações não especificadas.\nE14.9 – Sem complicações.\n\nCIAP-2 ativos considerados:\nT89 – Diabetes insulinodependente.\nT90 – Diabetes não insulinodependente.\n\nAtividade Coletiva:\nConsidera o quantitativo de pessoas participantes de pelo menos uma atividade coletiva registrada, de forma específica ou compartilhada, desde que o profissional de saúde esteja identificado.\n\n04 – Educação em saúde.\n05 – Atendimento em grupo.\n06 – Avaliação/Procedimento coletivo.\n07 – Mobilização social.\n\nVisita Domiciliar e Territorial:\nConsidera o registro de visitas domiciliares, com preenchimento do “motivo da visita” para o item de acompanhamento de “pessoa com diabetes”.\n\nSIGTAP - Códigos:\n01.01.04.002-4 - Avaliação antropométrica.\n01.01.04.008-3 - Medição de peso.\n01.01.04.007-5 - Medição de altura.\n03.01.10.003-9 - Aferição da pressão arterial.\n03.01.01.003-0 - Consulta de profissionais de nível superior na atenção primária (exceto médico).\n03.01.01.006-4 - Consulta médica em atenção primária.\n03.01.01.025-0 - Teleconsulta na atenção primária.\n03.01.04.009-5 - Exame do pé diabético.\n02.02.01.050-3 - Dosagem de hemoglobina glicosilada.\n\nCódigo ABEX:\nABEX008 - Hemoglobina glicosilada (registro de avaliação do exame).\n\nFórmula de cálculo\n\nNumerador\n(A) Pelo menos 1 consulta presencial ou remota por médica(o) ou enfermeira(o) nos últimos 6 meses — 20 pontos.\n(B) Pelo menos 1 aferição de pressão arterial nos últimos 6 meses — 15 pontos.\n(C) Pelo menos 1 registro simultâneo, no mesmo dia, de peso e altura nos últimos 12 meses — 15 pontos.\n(D) Pelo menos 2 visitas domiciliares por ACS/TACS, com intervalo mínimo de 30 dias, nos últimos 12 meses — 20 pontos.\n(E) Pelo menos 1 solicitação ou avaliação de hemoglobina glicada nos últimos 12 meses — 15 pontos.\n(F) Pelo menos 1 avaliação dos pés nos últimos 12 meses — 15 pontos.\n÷\nDenominador\nNúmero total de pessoas com diabetes vinculadas à equipe no período.\n\nRegular\n≤ 25\n\nSuficiente\n> 25 e ≤ 50\n\nBom\n> 50 e ≤ 75\n\nÓtimo\n> 75 e ≤ 100"},"C5":{"title":"Cuidado da Pessoa com Hipertensão (PESO 1)","content":"Equipe de Atenção Primária – Cuidado da Pessoa com Hipertensão\n\nIdentificação da pessoa com hipertensão:\nPessoa identificada em atendimento individual com a condição hipertensão avaliada por médica(o) ou enfermeira(o) da APS, em pelo menos uma ocasião desde 2013.\n\nPara a identificação das pessoas com hipertensão serão utilizadas as condições ou problemas “ativos” informados.\nAs pessoas com condições ou problemas “resolvidos” ou “concluídos” não serão contabilizadas para o período de referência.\n\nInterrupção do acompanhamento:\nMudança de território registrada no cadastro individual.\nMudança de equipe conforme os critérios oficiais de desempate.\nTodas as condições elegíveis marcadas como resolvidas ou concluídas.\nÓbito no CadSUS.\n\nCID-10 ativos considerados:\nI10 – Hipertensão essencial (primária).\n\nI11 – Doença cardíaca hipertensiva.\nI11.0 – Doença cardíaca hipertensiva com insuficiência cardíaca congestiva.\nI11.9 – Doença cardíaca hipertensiva sem insuficiência cardíaca congestiva.\n\nI12 – Doença renal hipertensiva.\nI12.0 – Doença renal hipertensiva com insuficiência renal.\nI12.9 – Doença renal hipertensiva sem insuficiência renal.\n\nI13 – Doença cardíaca e renal hipertensiva.\nI13.0 – Doença cardíaca e renal hipertensiva com insuficiência cardíaca congestiva.\nI13.1 – Doença cardíaca e renal hipertensiva com insuficiência renal.\nI13.2 – Doença cardíaca e renal hipertensiva com insuficiência cardíaca congestiva e insuficiência renal.\nI13.9 – Doença cardíaca e renal hipertensiva sem insuficiência cardíaca congestiva ou insuficiência renal.\n\nI15 – Hipertensão secundária.\nI15.0 – Hipertensão renovascular.\nI15.1 – Hipertensão secundária a outras afecções renais.\nI15.2 – Hipertensão secundária a afecções endócrinas.\nI15.8 – Outras formas de hipertensão secundária.\nI15.9 – Hipertensão secundária não especificada.\n\nO10 – Hipertensão pré-existente complicando a gravidez, o parto e o puerpério.\nO10.0 – Hipertensão essencial pré-existente complicando a gravidez, o parto e o puerpério.\nO10.1 – Doença cardíaca hipertensiva pré-existente complicando a gravidez, o parto e o puerpério.\nO10.2 – Doença renal hipertensiva pré-existente complicando a gravidez, o parto e o puerpério.\nO10.3 – Doença cardíaca e renal hipertensiva pré-existente complicando a gravidez, o parto e o puerpério.\nO10.4 – Hipertensão secundária pré-existente complicando a gravidez, o parto e o puerpério.\nO10.9 – Hipertensão pré-existente não especificada complicando a gravidez, o parto e o puerpério.\nO11 – Distúrbio hipertensivo pré-existente com proteinúria superposta.\n\nCIAP-2 ativos considerados:\nK86 – Hipertensão sem complicações.\nK87 – Hipertensão com complicações.\n\nAtividade Coletiva:\nPara a aferição da pressão arterial, são considerados os registros no campo específico de pressão arterial ou o procedimento SIGTAP 03.01.10.003-9.\n\nPara peso e altura, são considerados os registros no campo “Antropometria” ou nos campos específicos de peso e altura. Os dois registros precisam ter sido realizados no mesmo dia.\n\nVisita Domiciliar e Territorial:\nConsidera o registro de visitas domiciliares, com preenchimento do “motivo da visita” para acompanhamento de “pessoa com hipertensão”.\n\nSIGTAP - Códigos:\n01.01.04.002-4 - Avaliação antropométrica.\n01.01.04.008-3 - Medição de peso.\n01.01.04.007-5 - Medição de altura.\n03.01.10.003-9 - Aferição da pressão arterial.\n03.01.01.003-0 - Consulta de profissionais de nível superior na atenção primária (exceto médico).\n03.01.01.006-4 - Consulta médica em atenção primária.\n03.01.01.025-0 - Teleconsulta na atenção primária.\n\nFórmula de cálculo\n\nNumerador\n(A) Pelo menos 1 consulta presencial ou remota por médica(o) ou enfermeira(o) nos últimos 6 meses — 25 pontos.\n(B) Pelo menos 1 aferição de pressão arterial nos últimos 6 meses — 25 pontos.\n(C) Pelo menos 1 registro simultâneo, no mesmo dia, de peso e altura nos últimos 12 meses — 25 pontos.\n(D) Pelo menos 2 visitas domiciliares por ACS/TACS, com intervalo mínimo de 30 dias, nos últimos 12 meses — 25 pontos.\n÷\nDenominador\nNúmero total de pessoas com hipertensão vinculadas à equipe no período.\n\nRegular\n≤ 25\n\nSuficiente\n> 25 e ≤ 50\n\nBom\n> 50 e ≤ 75\n\nÓtimo\n> 75 e ≤ 100"},"C7":{"title":"Cuidado da Mulher na Prevenção do Câncer (PESO 2)","content":"Cuidado da mulher e do homem transgênero na prevenção do câncer na Atenção Primária à Saúde\n\nQuem entra no cálculo:\nSão consideradas as pessoas de 9 a 69 anos vinculadas à equipe no período que tenham:\nRegistro de sexo feminino; ou\nRegistro de sexo masculino e identidade de gênero “Homem transgênero”.\n\nQuem não entra no cálculo:\nPessoas com registro de sexo feminino e identidade de gênero “Mulher transgênero” não são consideradas nas boas práticas deste indicador.\n\nInterrupção do acompanhamento:\nMudança de território registrada no cadastro individual.\nMudança de equipe conforme os critérios oficiais de desempate.\nÓbito no CadSUS.\n\nCritérios de elegibilidade para saúde sexual e reprodutiva:\nCIAP-2: B25, W02, W10, W11, W12, W13, W14, W15, W79, W82, X01 a X13, X23, X24, X82, X89 e Y14.\nCID-10: códigos previstos na nota para saúde sexual e reprodutiva, incluindo os grupos N80, N91 a N97, O03, O04, R10.2, T74.2, Y05, Z12.3, Z12.4, Z20.5, Z20.6, Z30, Z31, Z32.0, Z60.0, Z63.0, Z64.0, Z70, Z71.7 e Z72.5.\nCódigos ABP:\nABP003 – Saúde sexual e reprodutiva.\nABP022 – Rastreamento de câncer do colo do útero.\nABP023 – Rastreamento de câncer de mama.\n\nSIGTAP - Códigos:\n02.04.03.003-0 - Mamografia.\n02.04.03.018-8 - Mamografia bilateral para rastreamento.\n02.01.02.003-3 - Coleta de citopatológico de colo uterino.\n02.03.01.008-6 - Exame citopatológico cérvico-vaginal/microflora para rastreamento.\n02.03.01.001-9 - Exame citopatológico cérvico-vaginal/microflora.\n02.01.02.007-6 - Coleta de material do colo do útero para exame molecular de HPV.\n02.01.02.008-4 - Entrega de material obtido por autocoleta para exame molecular de HPV.\n02.02.10.025-1 - Exame molecular de detecção de HPV.\n03.01.01.003-0 - Consulta de profissional de nível superior na APS, exceto médico.\n03.01.01.006-4 - Consulta médica em APS.\n03.01.01.025-0 - Teleconsulta na APS.\n\nEsquema de doses:\nDose única da vacina HPV quadrivalente, código 67, ou HPV nonavalente, código 93.\n\nFórmula de cálculo\n\nNumerador\n(A) Exame de rastreamento do câncer do colo do útero para mulheres e homens transgênero de 25 a 64 anos, coletado, solicitado ou avaliado nos últimos 36 meses — 20 pontos. Para o procedimento 02.02.10.025-1, exame molecular de detecção de HPV, a janela é de 60 meses.\n(B) Pelo menos 1 dose da vacina HPV para crianças e adolescentes do sexo feminino de 9 a 14 anos — 30 pontos.\n(C) Pelo menos 1 atendimento presencial ou remoto sobre saúde sexual e reprodutiva para adolescentes, mulheres e homens transgênero de 14 a 69 anos, nos últimos 12 meses — 30 pontos.\n(D) Exame de rastreamento do câncer de mama para mulheres e homens transgênero de 50 a 69 anos, solicitado ou avaliado nos últimos 24 meses — 20 pontos.\n÷\nDenominador\nNúmero total de mulheres e homens transgênero na faixa etária avaliada em cada boa prática e vinculados à equipe no período.\n\nRegular\n≤ 25\n\nSuficiente\n> 25 e ≤ 50\n\nBom\n> 50 e ≤ 75\n\nÓtimo\n> 75 e ≤ 100"}},"emulti":{"M2":{"title":"Ações interprofissionais realizadas pela eMulti (PESO 4)","content":"Representa a proporção de ações voltadas ao cuidado centrado na pessoa realizadas pela eMulti, nos últimos 4 meses, de forma compartilhada com profissionais da própria eMulti, equipes vinculadas ou outros profissionais da APS.\n\nEquipes consideradas:\nSão consideradas eMulti homologadas, válidas no quadrimestre e identificadas pelo INE como tipo de equipe 72.\nOs registros podem ter sido realizados em qualquer estabelecimento da APS, independentemente da equipe de referência do usuário.\n\nPossibilidades de ação compartilhada:\neMulti com eSF, eSFR, eCR, eAP ou UBSF.\nProfissionais da mesma eMulti.\neMulti com equipe de Saúde Bucal.\neMulti com qualquer profissional da APS identificado por CNS ou CPF.\n\nRequisitos gerais:\nEm toda ação compartilhada, pelo menos um dos profissionais deve pertencer à eMulti e estar identificado como profissional principal ou secundário, com CNS e CBO válidos.\n\nPara o atendimento ser considerado compartilhado, dois ou mais profissionais diferentes precisam participar ao mesmo tempo, cada um com seu próprio CNS.\n\nSe a mesma ação for registrada no mesmo dia como específica e também como compartilhada, será considerada apenas a ação compartilhada.\n\nA mesma ação não pode ser contada duas vezes: como compartilhada e como específica.\n\nAtendimento Individual Compartilhado:\nSão considerados tanto o atendimento individual — presencial, domiciliar ou remoto — quanto o atendimento odontológico individual.\n\nPara entrar no cálculo como atendimento compartilhado, dois ou mais profissionais de nível superior precisam participar ao mesmo tempo, com CNS diferentes. Pelo menos um deles deve estar cadastrado na eMulti e identificado como profissional principal ou secundário.\n\nAtividade Coletiva Compartilhada:\nReuniões consideradas:\nCódigo 01 — Reunião de equipe.\nCódigo 02 — Reunião com outras equipes de saúde.\nCódigo 03 — Reunião intersetorial.\n\nAs reuniões dos códigos 01, 02 e 03 só entram no cálculo quando forem registradas com o tema Código 05 — Discussão de Caso/Projeto Terapêutico Singular.\n\nOutras atividades consideradas:\nCódigo 04 — Educação em saúde.\nCódigo 05 — Atendimento em grupo.\nCódigo 06 — Avaliação/Procedimento coletivo.\nCódigo 07 — Mobilização social.\n\nPara entrar no cálculo como atividade compartilhada, a ação deve ser realizada ao mesmo tempo por dois ou mais profissionais de nível superior ou médio, com CNS diferentes. Pelo menos um deles deve estar cadastrado na eMulti e identificado como profissional principal ou secundário.\n\nFórmula de cálculo\n\nNumerador\nQuantidade de ações realizadas em conjunto com outros profissionais.\n÷\nDenominador\nQuantidade total de ações realizadas pela eMulti, compartilhadas ou não.\n\nRegular\n≤ 1\n\nSuficiente\n> 1 e ≤ 2,5\n\nBom\n> 2,5 e ≤ 5\n\nÓtimo\n> 5"}}};
function applyOfficialMethodologyCorrections(data){
  if(!data?.areas) return data;
  Object.entries(OFFICIAL_CONTENT_OVERRIDES).forEach(([areaKey,items])=>{
    const indicators=data.areas?.[areaKey]?.indicators||[];
    Object.entries(items).forEach(([code,official])=>{
      const indicator=indicators.find(item=>String(item.code||'').toUpperCase()===code);
      if(!indicator) return;
      indicator.title=official.title;
      indicator.content=official.content;
    });
  });
  const findIndicator=(areaKey,code)=>(data.areas?.[areaKey]?.indicators||[]).find(item=>String(item.code||'').toUpperCase()===code);
  const replaceSection=(content,startHeading,endHeading,replacement)=>{
    const text=String(content||'');
    const lower=text.toLowerCase();
    const start=lower.indexOf(startHeading.toLowerCase());
    const end=lower.indexOf(endHeading.toLowerCase(),start+startHeading.length);
    if(start<0||end<0) return text;
    return text.slice(0,start)+replacement.trim()+"\n\n"+text.slice(end);
  };
  const activityCollectiveText='Atividade Coletiva:\nPara peso e altura, são considerados os registros no campo “Antropometria” ou nos campos específicos de peso e altura, desde que os dois registros sejam realizados no mesmo dia.';
  ['C2','C6'].forEach(code=>{
    const indicator=findIndicator('familia',code);
    if(indicator) indicator.content=replaceSection(indicator.content,'Atividade Coletiva:','Visita Domiciliar e Territorial:',activityCollectiveText);
  });
  const oralHealthNote='Para eSB de 20 horas vinculada a uma eSF, a população vinculada utilizada no denominador deve ser dividida por dois.';
  ['B1','B4'].forEach(code=>{
    const indicator=findIndicator('bucal',code);
    if(indicator&&!String(indicator.content||'').includes(oralHealthNote)){
      indicator.content=String(indicator.content||'').replace(/\n\nRegular/i,`\n\n${oralHealthNote}\n\nRegular`);
    }
  });
  return data;
}

const $ = s => document.querySelector(s);
const esc = v => String(v ?? '').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
function toast(m){const e=$('#toast');e.textContent=m;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),2500)}
function routeTo(r){state.route=r;location.hash=r;render();window.scrollTo({top:0,behavior:'smooth'});$('#sidebar').classList.remove('open')}
function nav(){return navGroups.map(([g,items])=>`<div class="nav-group"><div class="nav-label">${g}</div>${items.map(r=>`<button class="nav-link ${state.route===r?'active':''}" data-route="${r}"><span class="nav-icon">${icons[r]}</span>${labels[r]}</button>`).join('')}</div>`).join('')}
function normalizeApi(raw){
  if(raw.portal) return raw.portal;
  if(raw.sheets){return {updatedAt:raw.updatedAt,about:raw.sheets.Sobre?.text||'',areas:raw.areas||{},tables:raw.tables||{}}}
  return raw;
}
async function load(){
  try{
    let raw;
    if(cfg.apiUrl){
      const res=await fetch(cfg.apiUrl,{cache:'no-store'});
      if(!res.ok) throw new Error('Falha ao carregar a integração');
      raw=await res.json();
    } else if(window.PORTAL_FALLBACK_DATA){
      raw=window.PORTAL_FALLBACK_DATA;
    } else {
      const res=await fetch(cfg.fallbackDataUrl,{cache:'no-store'});
      if(!res.ok) throw new Error('Falha ao carregar os dados locais');
      raw=await res.json();
    }
    state.data=applyOfficialMethodologyCorrections(normalizeApi(raw));
    $('#updatedAt').textContent='Dados de '+(state.data.updatedAt||'data não informada')+'.';
    render();
  }
  catch(e){
    console.error(e);
    $('#updatedAt').textContent='Não foi possível carregar';
    $('#app').innerHTML=`<div class="empty"><h2>Dados indisponíveis</h2><p>Confira a integração no arquivo <b>config.js</b> ou abra a versão atualizada do portal.</p></div>`;
  }
}
function areaCount(k){return state.data?.areas?.[k]?.indicators?.length||0}
function institutionBlocks(){
  return `<section class="section"><div class="grid info-grid">
    <article class="card info-card">
      <h3>Sobre</h3>
      <p>${esc(aboutInfo.sobre)}</p>
    </article>
    <article class="card info-card">
      <h3>Desenvolvedor</h3>
      <ul class="info-list">${aboutInfo.desenvolvedores.map(([nome,cargo])=>`<li><strong>${esc(nome)}</strong>${esc(cargo)}</li>`).join('')}</ul>
    </article>
    <article class="card info-card">
      <h3>Apoio técnico e revisão</h3>
      <ul class="info-list">${aboutInfo.apoio.map(([nome,cargo])=>`<li><strong>${esc(nome)}</strong>${esc(cargo)}</li>`).join('')}</ul>
    </article>
  </div></section>`
}
function homeInstitutionBlocks(){
  return `<section class="section home-info-section">
    <article class="card home-info-card home-info-about">
      <h3>Sobre</h3>
      <p>${esc(aboutInfo.sobre)}</p>
    </article>
    <div class="grid home-people-grid">
      <article class="card home-info-card home-people-card">
        <h3>Desenvolvedor</h3>
        <ul class="home-info-list home-developer-list">${aboutInfo.desenvolvedores.map(([nome,cargo])=>`<li><strong>${esc(nome)}</strong><span>${esc(cargo)}</span></li>`).join('')}</ul>
      </article>
      <article class="card home-info-card home-people-card">
        <h3>Apoio técnico e revisão</h3>
        <ul class="home-info-list home-support-list">${aboutInfo.apoio.map(([nome,cargo])=>`<li><strong>${esc(nome)}</strong><span>${esc(cargo)}</span></li>`).join('')}</ul>
      </article>
    </div>
  </section>`
}
function officialTechnicalSheetsBlock(){
  return `<section class="section official-sheets-section"><article class="card official-sheets-card"><div class="official-sheets-copy"><span class="official-sheets-tag">Fonte oficial</span><div><h2>Fichas Técnicas</h2><p>Consulte as notas e fichas técnicas oficiais publicadas pelo Ministério da Saúde.</p></div></div><a class="official-sheets-link" href="https://www.gov.br/saude/pt-br/composicao/saps/publicacoes/fichas-tecnicas" target="_blank" rel="noopener noreferrer">Consultar fichas técnicas <span aria-hidden="true">↗</span></a></article></section>`;
}
function home(){
 return `<section class="hero"><div class="hero-grid"><div class="hero-copy"><div class="eyebrow">Atenção Primária à Saúde</div><h1>Portal para consulta simplificada dos indicadores da Atenção Primária à Saúde.</h1><p>Consulte regras, fórmulas, notas e avaliações das equipes.</p></div><div class="hero-logos"><div class="hero-logo-card equal-card"><img class="logo-descomplica-hero" src="assets/logo-descomplica.png" alt="Logo Descomplica APS"></div><div class="hero-logo-card equal-card"><img class="logo-prefeitura-hero" src="assets/logo-prefeitura-saude.png" alt="Logo da Prefeitura e Secretaria de Saúde de Prudentópolis"></div></div></div></section>
 ${officialTechnicalSheetsBlock()}
 ${homeInstitutionBlocks()}`
}


function noteTone(text){
  const t=(text||'').toLowerCase();
  if(t.includes('regular')) return 'regular';
  if(t.includes('suficiente')) return 'suficiente';
  if(t.includes('bom')) return 'bom';
  if(t.includes('ótimo') || t.includes('otimo')) return 'otimo';
  return 'neutral';
}
function cardsGrid(items, kind='score'){
  return `<div class="metric-grid ${kind} count-${items.length}">${items.map(item=>`<div class="metric-card ${kind==='note'?'note-tone '+noteTone(item.title):''}"><strong>${esc(item.title)}</strong>${item.desc?`<span>${esc(item.desc)}</span>`:''}</div>`).join('')}</div>`
}
function sectionBlock(title, body){
  return `<section class="content-section"><h4>${esc(title)}</h4>${body}</section>`
}
function bulletList(items){
  return `<ul class="bullet-list">${items.map(item=>`<li>${item}</li>`).join('')}</ul>`
}

const FAMILY_NOTE_LABELS = ['Regular','Suficiente','Bom','Ótimo'];
function renderStructuredParagraph(line){
  if(/^https?:\/\//i.test(line)) return `<p><a class="inline-link" href="${esc(line)}" target="_blank" rel="noopener noreferrer">Link de apoio</a></p>`;
  if(/^(Numerador|Denominador)$/i.test(line)) return `<p class="formula-heading"><strong>${esc(line)}</strong></p>`;
  if(/^(Cirurgião-Dentista|Técnico em Saúde Bucal|Auxiliar em Saúde Bucal|Técnico de Saúde Bucal|Auxiliar de Saúde Bucal)$/i.test(line)) return `<p class="role-line"><strong>${esc(line)}</strong></p>`;
  const idx=line.indexOf(':');
  if(idx>0 && idx<100){
    const before=line.slice(0,idx).trim();
    const after=line.slice(idx+1).trim();
    if(after) return `<p><strong>${esc(before)}:</strong> ${esc(after)}</p>`;
  }
  return `<p>${esc(line)}</p>`;
}
function renderStructuredBody(lines){
  let html='';
  let list=[];
  const flushList=()=>{ if(list.length){ html += bulletList(list); list=[]; } };
  lines.forEach(line=>{
    if(!line) return;
    if(/^e-SUS AB\s*-\s*Problemas e condições:\s*(?:Pré-Natal|Puerpério)\.?$/i.test(line)) return;
    if(/^⚠️/.test(line)){
      flushList();
      html += `<div class="warning-item">${esc(line.replace(/^⚠️\s*/,''))}</div>`;
      return;
    }
    if(/^(?:\d{2}\s*[–-]|\(?[A-Z]\)|\d+[º°]?\s*[–.-]|Nº\s+|Registro de |Pessoas com registro de sexo feminino e identidade de gênero|[A-Z]\d+\s*[–-])/.test(line) && !line.includes(':')){
      list.push(esc(line));
      return;
    }
    flushList();
    html += renderStructuredParagraph(line);
  });
  flushList();
  return html;
}

function renderCodeBody(lines){
  return lines.filter(Boolean).map(line=>{
    const idx=line.indexOf(':');
    if(idx>0 && idx<100){
      const before=line.slice(0,idx).trim();
      const after=line.slice(idx+1).trim();
      if(after) return `<p><strong>${esc(before)}:</strong> ${esc(after)}</p>`;
    }
    return `<p>${esc(line)}</p>`;
  }).join('');
}
function renderVaccineBody(lines){
  let html='';
  let list=[];
  const flushList=()=>{ if(list.length){ html += bulletList(list); list=[]; } };
  lines.forEach(line=>{
    if(!line) return;
    if(line.endsWith(':')){
      flushList();
      html += `<p class="nested-topic-heading"><strong>${esc(line.slice(0,-1))}</strong></p>`;
      return;
    }
    if(/^\d+\s*[–-]/.test(line)){
      list.push(esc(line));
      return;
    }
    flushList();
    html += renderStructuredParagraph(line);
  });
  flushList();
  return html;
}

function renderFormulaText(lines){
  return lines.map(line=>{
    const criteria=line.match(/^\(([A-Z])\)\s*(.*)$/);
    if(criteria) return `<div class="formula-criterion"><strong>${esc(criteria[1])}</strong><span>${esc(criteria[2])}</span></div>`;
    return `<p>${esc(line)}</p>`;
  }).join('');
}
function renderFormulaSection(lines){
  let numerator=[]; let denominator=[]; let mode='';
  lines.forEach(line=>{
    if(line==='Numerador'){ mode='numerador'; return; }
    if(line==='Denominador'){ mode='denominador'; return; }
    if(line==='÷') return;
    if(!line) return;
    if(mode==='numerador') numerator.push(line);
    else if(mode==='denominador') denominator.push(line);
  });
  return sectionBlock('Fórmula de cálculo', `<div class="formula-equation">
    <div class="formula-part formula-numerator"><span class="formula-label">Numerador</span>${renderFormulaText(numerator)}</div>
    <div class="formula-operation"><span>÷</span></div>
    <div class="formula-part formula-denominator"><span class="formula-label">Denominador</span>${renderFormulaText(denominator)}</div>
  </div>`);
}
function renderFamilyNotes(lines){
  const items=[];
  for(let i=0;i<lines.length;i++){
    const label=lines[i];
    if(FAMILY_NOTE_LABELS.includes(label)){
      let value='';
      let j=i+1;
      while(j<lines.length && !lines[j]) j++;
      if(j<lines.length) value=lines[j];
      items.push({title:label,desc:value});
      i=j;
    }
  }
  return items.length ? sectionBlock('Notas', cardsGrid(items,'note')) : '';
}
function renderFamilyStructuredContent(text){
  const lines=String(text||'').split('\n').map(l=>l.trim());
  let html='<div class="themed-content family-content">';
  let i=0;
  while(i<lines.length && !lines[i]) i++;
  if(lines[i] && /^Equipe de Atenção Primária/i.test(lines[i])){
    i++;
  }
  while(i<lines.length){
    const line=lines[i];
    if(!line){ i++; continue; }
    if(/^e-SUS AB\s*-\s*Problemas e condições:\s*(?:Pré-Natal|Puerpério)\.?$/i.test(line)){ i++; continue; }
    if(/^(Numerador|Denominador)$/i.test(line)){
      html += `<p class="formula-heading"><strong>${esc(line)}</strong></p>`;
      i++;
      continue;
    }
    if(/^(Cirurgião-Dentista|Técnico em Saúde Bucal|Auxiliar em Saúde Bucal|Técnico de Saúde Bucal|Auxiliar de Saúde Bucal)$/i.test(line)){
      html += `<p class="role-line"><strong>${esc(line)}</strong></p>`;
      i++;
      continue;
    }
    if(line==='Fórmula de cálculo'){
      let block=[]; i++;
      while(i<lines.length && !FAMILY_NOTE_LABELS.includes(lines[i])){ block.push(lines[i]); i++; }
      html += renderFormulaSection(block);
      continue;
    }
    if(/^Esquemas? de Vacinação:$/i.test(line)){
      const title=line.slice(0,-1);
      const block=[]; i++;
      while(i<lines.length && lines[i] !== 'Fórmula de cálculo' && !FAMILY_NOTE_LABELS.includes(lines[i])){
        block.push(lines[i]); i++;
      }
      html += sectionBlock(title, renderVaccineBody(block));
      continue;
    }
    if(FAMILY_NOTE_LABELS.includes(line)){
      const block=[];
      while(i<lines.length && (FAMILY_NOTE_LABELS.includes(lines[i]) || !lines[i])){ block.push(lines[i]); if(lines[i] && FAMILY_NOTE_LABELS.includes(lines[i]) && i+1<lines.length) { block.push(lines[i+1]); i+=2; } else i++; }
      html += renderFamilyNotes(block);
      continue;
    }
    if(line.endsWith(':') && line.length < 120){
      const title=line.slice(0,-1);
      const block=[]; i++;
      while(i<lines.length && lines[i] && lines[i] !== 'Fórmula de cálculo' && !FAMILY_NOTE_LABELS.includes(lines[i]) && !(lines[i].endsWith(':') && lines[i].length < 120)){
        block.push(lines[i]); i++;
      }
      const isCodeSection=/^(CID|CIAP)/i.test(title);
      const isEsusSection=/^e-SUS AB\s*-\s*Problemas e condições$/i.test(title);
      const body=isCodeSection ? renderCodeBody(block) : (isEsusSection ? bulletList(block.filter(Boolean).map(esc)) : renderStructuredBody(block));
      html += sectionBlock(title, body);
      continue;
    }
    if(/^⚠️/.test(line)){
      html += `<div class="warning-item">${esc(line.replace(/^⚠️\s*/,''))}</div>`;
      i++;
      continue;
    }
    html += `<p class="section-note">${esc(line)}</p>`;
    i++;
  }
  html += '</div>';
  return html;
}


function renderExampleCards(lines){
  const cleaned = lines.filter(Boolean);
  const calc = cleaned.find(line => line.includes('÷')) || '';
  const resultLine = cleaned.find(line => /^Resultado/.test(line)) || '';
  const nextSteps = resultLine ? cleaned.slice(cleaned.indexOf(resultLine)+1).join(' ') : '';
  const isPercentage = calc.includes('× 100');

  if(isPercentage){
    return `<div class="example-simple">
      <div class="example-facts">
        <div class="example-fact"><strong>1.000</strong><span>ações realizadas no total</span></div>
        <div class="example-fact"><strong>60</strong><span>ações feitas com outro profissional</span></div>
      </div>
      <div class="example-calculation">
        <span>60 compartilhadas</span><b>÷</b><span>1.000 ações</span><b>× 100</b><strong>= 6%</strong>
      </div>
      <div class="example-result"><span>Resultado do indicador</span><strong>Ótimo</strong></div>
    </div>`;
  }

  return `<div class="example-simple">
    <div class="example-facts">
      <div class="example-fact"><strong>1.200</strong><span>atendimentos realizados</span></div>
      <div class="example-fact"><strong>400</strong><span>pessoas atendidas</span></div>
    </div>
    <div class="example-calculation">
      <span>1.200 atendimentos</span><b>÷</b><span>400 pessoas</span><strong>= 3 por pessoa</strong>
    </div>
    <div class="example-result"><span>Resultado do indicador</span><strong>Bom</strong></div>
    <p class="example-tip">Para alcançar <strong class="optimal-text">Ótimo</strong>, a média precisa ser maior que 3 atendimentos por pessoa.</p>
  </div>`;
}
function renderEmultiStructuredContent(text){
  const lines=String(text||'').split('\n').map(l=>l.trim());
  let html='<div class="themed-content family-content emulti-content">';
  let i=0;
  while(i<lines.length && !lines[i]) i++;
  if(lines[i] && /^Equipes Multiprofissionais \(eMulti\)\s*-/i.test(lines[i])) i++;
  while(i<lines.length){
    const line=lines[i];
    if(!line){ i++; continue; }
    if(line==='Fórmula de cálculo'){
      let block=[]; i++;
      while(i<lines.length && !FAMILY_NOTE_LABELS.includes(lines[i])){ block.push(lines[i]); i++; }
      html += renderFormulaSection(block);
      continue;
    }
    if(line==='Exemplo prático'){
      let block=[]; i++;
      while(i<lines.length && lines[i] !== 'Fórmula de cálculo' && !FAMILY_NOTE_LABELS.includes(lines[i])){ if(lines[i]) block.push(lines[i]); i++; }
      html += sectionBlock('Exemplo prático', renderExampleCards(block));
      continue;
    }
    if(FAMILY_NOTE_LABELS.includes(line)){
      const block=[];
      while(i<lines.length && (FAMILY_NOTE_LABELS.includes(lines[i]) || !lines[i])){ block.push(lines[i]); if(lines[i] && FAMILY_NOTE_LABELS.includes(lines[i]) && i+1<lines.length) { block.push(lines[i+1]); i+=2; } else i++; }
      html += renderFamilyNotes(block);
      continue;
    }
    if(line.endsWith(':') && line.length < 120){
      const title=line.slice(0,-1);
      const block=[]; i++;
      while(i<lines.length && lines[i] && lines[i] !== 'Fórmula de cálculo' && lines[i] !== 'Exemplo prático' && !FAMILY_NOTE_LABELS.includes(lines[i]) && !(lines[i].endsWith(':') && lines[i].length < 120)){
        block.push(lines[i]); i++;
      }
      html += sectionBlock(title, renderStructuredBody(block));
      continue;
    }
    if(/^⚠️/.test(line)){
      html += `<div class="warning-item">${esc(line.replace(/^⚠️\s*/,''))}</div>`;
      i++;
      continue;
    }
    html += `<p class="section-note">${esc(line)}</p>`;
    i++;
  }
  html += '</div>';
  return html;
}

function renderAreaIntro(areaKey, area){
  if(areaKey==='familia' || areaKey==='bucal') return `<div class="card themed-content" style="margin-bottom:16px"><div class="intro-meta"><p><strong>Periodicidade</strong> mensal / quadrimestral.</p></div>${sectionBlock('Validações', bulletList(['<strong>Cadastro do Usuário:</strong> CPF, CNS e data de nascimento devem ser idênticos aos registros no CADSUS e no sistema de prontuário.','<strong>Vínculo Profissional (CNES, INE, CNS e CBO):</strong> o profissional deve estar corretamente vinculado à equipe de saúde da unidade, com CNS e CBO válidos.','<strong>Registros Retroativos:</strong> procedimentos e atendimentos devem ser digitados no mesmo dia em que foram realizados.']))}</div>`;
  if(areaKey==='emulti') return `<div class="card themed-content" style="margin-bottom:16px"><div class="intro-meta"><p><strong>Periodicidade</strong> mensal / quadrimestral.</p></div>${sectionBlock('Validações', bulletList(['<strong>Cadastro do Usuário:</strong> CPF, CNS e data de nascimento devem ser idênticos aos registros no CADSUS e no sistema de prontuário.','<strong>Vínculo Profissional (CNES, INE, CNS e CBO):</strong> o profissional deve estar corretamente vinculado à equipe de saúde da unidade, com CNS e CBO válidos.','<strong>Registros Retroativos:</strong> procedimentos e atendimentos devem ser digitados no mesmo dia em que foram realizados.']))}${sectionBlock('Critérios de vinculação', `<div class="criteria-steps"><p>1º – Maior número de atendimentos no último ano.</p><p>2º – Atendimento mais recente.</p><p>3º – Cadastro mais atualizado.</p></div>`)}</div>`;
  if(areaKey!=='vinculo') return area.intro?`<div class="card rich-text" style="margin-bottom:16px">${esc(area.intro)}</div>`:'';
  return `<div class="card themed-content" style="margin-bottom:16px">
    <div class="intro-meta">
      <p><strong>Periodicidade</strong> mensal / quadrimestral.</p>
    </div>
    ${sectionBlock('Validações', bulletList([
      '<strong>Cadastro do Usuário:</strong> CPF, CNS e data de nascimento devem ser idênticos aos registros no CADSUS e no sistema de prontuário.',
      '<strong>Vínculo Profissional (CNES, INE, CNS e CBO):</strong> o profissional deve estar corretamente vinculado à equipe de saúde da unidade, com CNS e CBO válidos.',
      '<strong>Registros Retroativos:</strong> procedimentos e atendimentos devem ser digitados no mesmo dia em que foram realizados.'
    ]))}
    ${sectionBlock('Critérios de desempate do vínculo', `<p class="section-lead">Na hipótese do usuário ter sido cadastrado por mais de uma equipe, serão adotados os seguintes critérios, na ordem abaixo:</p><div class="criteria-steps"><p>1º – Maior número de atendimentos no período de um ano.</p><p>2º – Atendimento mais recente.</p><p>3º – Cadastro mais atualizado.</p></div>`)}
  </div>`;
}
function renderIndicatorContent(areaKey, indicator){
  if(areaKey==='vinculo' && indicator.code==='A1'){
    const parameterRows=[
      ['Até 20 mil','2.000','1.500','1.000'],
      ['Acima de 20 mil até 50 mil','2.500','1.875','1.250'],
      ['Acima de 50 mil até 100 mil','2.750','2.063','1.375'],
      ['Acima de 100 mil','3.000','2.250','1.500']
    ];
    return `<div class="themed-content">
      <p class="section-lead">Considera apenas cadastros individuais realizados ou atualizados nos <strong>últimos 24 meses</strong>, até o último mês do quadrimestre avaliado.</p>
      <div class="warning-list">
        <div class="warning-item">Não serão considerados para o cálculo os usuários cujo cadastro individual contenha o registro <strong>“Fora de Área”</strong>.</div>
        <div class="warning-item">Não serão considerados para o cálculo os usuários cujo cadastro individual contenha o registro <strong>“Mudança de território”</strong>.</div>
      </div>
      ${sectionBlock('Tipos de cadastro', bulletList([
        '<strong>Cadastro simplificado:</strong> não será considerado.',
        '<strong>Pessoa cadastrada:</strong> possui cadastro individual.',
        '<strong>Pessoa com cadastro completo:</strong> possui cadastro individual e cadastro domiciliar/territorial.'
      ]))}
      <p class="section-note">Se o cadastro domiciliar/territorial não for incluído ou atualizado nos últimos 2 anos, aplica-se apenas o fator <strong>0,75</strong>, referente ao cadastro individual.</p>
      ${sectionBlock('Pontuação', cardsGrid([
        {title:'Cadastros simplificados', desc:'0'},
        {title:'Cadastro individual', desc:'0,75'},
        {title:'Cadastro individual + cadastro domiciliar', desc:'1,5'}
      ], 'score'))}
      ${sectionBlock('Parâmetro por porte populacional e equipe', `<div class="card table-card"><table class="data-table"><thead><tr><th>Porte populacional</th><th>eSF</th><th>eAP 30h</th><th>eAP 20h</th></tr></thead><tbody>${parameterRows.map(row=>`<tr>${row.map(value=>`<td>${esc(value)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`)}
      <div class="warning-item"><strong>Limite financeiro:</strong> se o limite máximo de pessoas cadastradas for ultrapassado, a classificação do componente poderá alcançar no máximo <strong>Bom</strong> para fins de transferência do incentivo financeiro no quadrimestre posterior.</div>
      ${sectionBlock('Notas', cardsGrid([
        {title:'Regular', desc:'< 45% = 0,75'},
        {title:'Suficiente', desc:'45 a 64,9% = 1,50'},
        {title:'Bom', desc:'65 a 84,9% = 2,25'},
        {title:'Ótimo', desc:'> 85% = 3,00'}
      ], 'note'))}
    </div>`;
  }
  if(['familia','bucal'].includes(areaKey)){
    return renderFamilyStructuredContent(indicator.content||'');
  }
  if(areaKey==='emulti'){
    return renderEmultiStructuredContent(indicator.content||'');
  }
  if(areaKey==='vinculo' && indicator.code==='A2'){
    return `<div class="themed-content">
      ${sectionBlock('Pessoa acompanhada', '<p>Usuária(o) com mais de um contato assistencial em 12 meses, sendo pelo menos um deles uma prática de cuidado.</p>')}
      ${sectionBlock('Contatos assistenciais', bulletList([
        'Conta como acompanhamento quando há <strong>prática de cuidado + procedimento</strong> ou <strong>duas práticas de cuidado</strong>.',
        '<strong>Exemplo 1:</strong> consulta + vacinação ou curativo.',
        '<strong>Exemplo 2:</strong> consulta médica + atendimento odontológico.'
      ]))}
      ${sectionBlock('O que entra no acompanhamento', bulletList([
        '<strong>Procedimentos:</strong> vacinação e outros procedimentos realizados na APS.',
        '<strong>Práticas de cuidado:</strong> consultas, atendimento odontológico, atividades coletivas, acompanhamento alimentar e visitas domiciliares.'
      ]))}
      ${sectionBlock('Pontuação', `<div class="a2-score-dark">${cardsGrid([
        {title:'Sem critérios', desc:'1,0'},
        {title:'Pessoa idosa ou criança', desc:'1,2'},
        {title:'BPC ou PBF', desc:'1,3'},
        {title:'Pessoa idosa ou criança + BPC ou PBF', desc:'2,5'}
      ], 'score')}</div>`)}
      <p class="section-note">Para esta regra, <strong>criança</strong> é a pessoa com até 5 anos incompletos e <strong>pessoa idosa</strong> é quem tem 60 anos ou mais.</p>
      <div class="mini-info-grid">
        <div class="mini-info"><strong>BPC</strong><span>Benefício de Prestação Continuada.</span></div>
        <div class="mini-info"><strong>PBF</strong><span>Programa Bolsa Família.</span></div>
      </div>
      ${sectionBlock('Notas', cardsGrid([
        {title:'Regular', desc:'< 45% = 1,75'},
        {title:'Suficiente', desc:'45 a 64,9% = 3,50'},
        {title:'Bom', desc:'65 a 84,9% = 5,25'},
        {title:'Ótimo', desc:'> 85% = 7,00'}
      ], 'note'))}
      <section class="content-section extra-app-section">
        <div class="extra-app-title"><span>EXTRA</span><h4>Avaliação do usuário – Aplicativo Meu SUS Digital</h4></div>
        <p><strong>Satisfação do usuário:</strong> as equipes que tiverem usuários avaliando o atendimento pelo aplicativo Meu SUS Digital recebem pontuação extra, somada ao escore de acompanhamento.</p>
        <p>A pontuação da equipe não depende se a avaliação do usuário foi positiva ou negativa, pois o objetivo é incentivar a participação da comunidade e usar o feedback para aprimorar os serviços.</p>
      </section>
      ${sectionBlock('Pontuação adicional', cardsGrid([
        {title:'Acima de 0 e menos de 5% dos atendimentos avaliados', desc:'+0,15 ponto'},
        {title:'5% ou mais dos atendimentos avaliados', desc:'+0,30 ponto'}
      ], 'score'))}
      <p class="section-note"><strong>Sem avaliação:</strong> não há acréscimo. <strong>Limite máximo do escore:</strong> o valor final do acompanhamento não pode ultrapassar <strong>7,00</strong>.</p>
    </div>`;
  }
  return `<div class="rich-text">${esc(indicator.content||'Conteúdo em atualização.')}</div>`;
}

function indicators(key){const a=state.data.areas[key]||{title:labels[key],intro:'',indicators:[]};return `<div class="page-title"><div><div class="eyebrow" style="color:var(--primary)">Indicadores</div><h1>${esc(a.title)}</h1>${(['vinculo','familia','bucal','emulti'].includes(key))?'':`<p>${esc(a.summary||'Consulte os critérios, regras e orientações de cada indicador.')}</p>`}</div></div>${renderAreaIntro(key,a)}<div class="indicator-list">${a.indicators.map((i,n)=>`<article class="indicator ${(['vinculo','familia','bucal','emulti'].includes(key))?'indicator-themed':''}"><button class="indicator-button"><span class="indicator-code">${esc(i.code||n+1)}</span><span class="indicator-title">${esc(i.title)}</span><span class="chevron">＋</span></button><div class="indicator-body">${renderIndicatorContent(key,i)}</div></article>`).join('')||'<div class="empty card">Nenhum indicador encontrado.</div>'}</div>`}

function monthlyCategoryMeta(value){
  const normalized=String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  if(normalized.includes('vinculo')) return {key:'vinculo',label:'Vínculo e acompanhamento'};
  if(normalized.includes('saude da familia') || normalized==='familia') return {key:'familia',label:'Saúde da Família'};
  if(normalized.includes('saude bucal') || normalized.includes('odont')) return {key:'bucal',label:'Saúde Bucal'};
  if(normalized.includes('emulti') || normalized.includes('multiprofissional')) return {key:'emulti',label:'eMulti'};
  return {key:'outros',label:value||'Outros indicadores'};
}
function monthlySections(rows){
  const sections=[];
  let currentGroup='Vínculo e acompanhamento';
  let current={title:'Vínculo e acompanhamento',group:currentGroup,rows:[]};
  const finish=()=>{if(current&&current.rows.length)sections.push(current)};
  (rows||[]).forEach(row=>{
    const label=String(row?.[0]??'').trim();
    const emptyTail=(row||[]).slice(1).every(v=>v===''||v===null||v===undefined);
    if(label.toLowerCase()==='unidade') return;
    if(emptyTail){
      const meta=monthlyCategoryMeta(label);
      const isCategory=['vinculo','familia','bucal','emulti'].includes(meta.key) && (
        meta.key==='emulti' ||
        label.toLowerCase().includes('saúde') ||
        label.toLowerCase().includes('saude') ||
        label.toLowerCase().includes('vínculo') ||
        label.toLowerCase().includes('vinculo')
      );
      if(isCategory){
        finish();
        currentGroup=meta.label;
        current=null;
        return;
      }
      finish();
      current={title:label,group:currentGroup,rows:[]};
      return;
    }
    if(!current) current={title:'Resultado geral',group:currentGroup,rows:[]};
    current.rows.push(row);
  });
  finish();
  return sections;
}
function monthlyGroupedSections(sections){
  const order=['vinculo','familia','bucal','emulti','outros'];
  const map=new Map();
  sections.forEach((section,index)=>{
    const meta=monthlyCategoryMeta(section.group);
    if(!map.has(meta.key)) map.set(meta.key,{...meta,items:[]});
    map.get(meta.key).items.push({...section,index});
  });
  return order.filter(key=>map.has(key)).map(key=>map.get(key));
}
function monthlyFilterTitle(item,group){
  const a=String(item.title||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const b=String(group.label||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  return a===b?'Resultado geral':item.title;
}
function monthlyCategoryFilters(sections,selected){
  const groups=monthlyGroupedSections(sections);
  return `<div class="monthly-select-wrap"><label for="monthlyIndicatorSelect">Indicador</label><select id="monthlyIndicatorSelect">${groups.map(group=>`<optgroup label="${esc(group.label)}">${group.items.map(item=>`<option value="${item.index}" ${item.index===selected?'selected':''}>${esc(monthlyFilterTitle(item,group))}</option>`).join('')}</optgroup>`).join('')}</select></div>`;
}
function numericValue(value){
  if(typeof value==='number') return value;
  const parsed=Number(String(value??'').replace('*','').replace(',','.'));
  return Number.isFinite(parsed)?parsed:null;
}
function formatMonthly(value){
  if(value===null||value===undefined||value==='')return '—';
    const n=numericValue(value);
  return n===null?esc(value):n.toLocaleString('pt-BR',{minimumFractionDigits:n%1?2:0,maximumFractionDigits:2});
}
function monthlyStats(section){
  const valid=section.rows.map(row=>({row,previous:numericValue(row[1]),current:numericValue(row[2]),change:numericValue(row[3])})).filter(item=>item.current!==null);
  const average=key=>valid.length?valid.reduce((sum,item)=>sum+(item[key]??0),0)/valid.length:0;
  const improved=valid.filter(item=>(item.change??0)>0).length;
  const best=valid.filter(item=>item.change!==null && item.change>0).sort((a,b)=>b.change-a.change)[0];
  return {valid,previousAverage:average('previous'),currentAverage:average('current'),improved,best};
}
function monthlyKpis(section){
  const stats=monthlyStats(section);
  const delta=stats.currentAverage-stats.previousAverage;
  return `<div class="monthly-kpis">
    <div class="monthly-kpi"><span>Média de abril</span><strong>${formatMonthly(stats.previousAverage)}</strong><small>resultado anterior</small></div>
    <div class="monthly-kpi monthly-kpi-primary"><span>Média de maio</span><strong>${formatMonthly(stats.currentAverage)}</strong><small>resultado atual</small></div>
    <div class="monthly-kpi ${delta>0?'is-positive':delta<0?'is-negative':'is-neutral'}"><span>Evolução média</span><strong>${delta>0?'+':''}${formatMonthly(delta)}</strong><small>de abril para maio</small></div>
    <div class="monthly-kpi"><span>Unidades em alta</span><strong>${stats.improved}<em>/${stats.valid.length}</em></strong><small>com evolução positiva</small></div>
  </div>`;
}
function monthlyEvolution(value){
  const n=numericValue(value);
  if(n===null)return `<span class="evolution-badge neutral">—</span>`;
  const cls=n>0?'positive':n<0?'negative':'neutral';
  const arrow=n>0?'↑':n<0?'↓':'→';
  return `<span class="evolution-badge ${cls}"><b>${arrow}</b>${n>0?'+':''}${formatMonthly(n)}</span>`;
}

function resultLabelNormalize(value){
  return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
}
function canonicalIndicatorKey(groupLabel,indicatorLabel){
  const group=resultLabelNormalize(groupLabel);
  const indicator=resultLabelNormalize(indicatorLabel);

  // Vínculo e acompanhamento aparece com nomes diferentes nas duas tabelas.
  if(group.includes('vinculo') || indicator.includes('vi. e acom') || indicator.includes('vinculo') || indicator==='resultado geral') return 'vinculo';

  // Saúde da Família.
  if(indicator.includes('mais acesso')) return 'familia-mais-acesso';
  if(indicator.includes('infantil') || indicator.includes('desenvolvimento')) return 'familia-infantil';
  if(indicator.includes('gestante') || indicator.includes('puerpera') || indicator.includes('gestante e p.')) return 'familia-gestante';
  if(indicator.includes('diabetes')) return 'familia-diabetes';
  if(indicator.includes('hipertens')) return 'familia-hipertensao';
  if(indicator.includes('idos')) return 'familia-idoso';
  if(indicator.includes('cancer') || indicator.includes('mulher')) return 'familia-cancer-mulher';

  // Saúde Bucal.
  if(group.includes('bucal')){
    if(indicator.includes('consulta')) return 'bucal-consulta';
    if(indicator.includes('conclu')) return 'bucal-concluido';
    if(indicator.includes('exodont')) return 'bucal-exodontias';
    if(indicator.includes('escov')) return 'bucal-escovacao';
    if(indicator.includes('preventiv')) return 'bucal-preventivos';
    if(indicator==='art' || indicator.includes('restaurador atraumatico')) return 'bucal-art';
  }

  // eMulti.
  if(group.includes('emulti')){
    if(indicator.includes('media')) return 'emulti-media';
    if(indicator.includes('acoes') || indicator.includes('interprofissional')) return 'emulti-acoes';
  }

  return `${group}|${indicator}`;
}
function toneScale10(n){
  if(n<5) return 'regular';
  if(n<7) return 'suficiente';
  if(n<=8.5) return 'bom';
  return 'otimo';
}
function toneQuality100(n){
  if(n<=25) return 'regular';
  if(n<=50) return 'suficiente';
  if(n<=75) return 'bom';
  return 'otimo';
}
function indicatorRuleTone(groupLabel,indicatorLabel,value){
  const n=numericValue(value);
  if(n===null) return 'neutral';
  const group=resultLabelNormalize(groupLabel);
  const key=canonicalIndicatorKey(groupLabel,indicatorLabel);

  // A mesma chave e a mesma regra são usadas em Notas mensais e no Resumo mensal.
  if(key==='vinculo') return toneScale10(n);

  if(key==='familia-mais-acesso'){
    if(n<=10 || n>70) return 'regular';
    if(n<=30) return 'suficiente';
    if(n<=50) return 'bom';
    return 'otimo';
  }
  if(key.startsWith('familia-')) return toneQuality100(n);

  if(key==='bucal-consulta'){
    if(n<=0.25) return 'regular';
    if(n<=0.75) return 'suficiente';
    if(n<=1.25) return 'bom';
    return 'otimo';
  }
  if(key==='bucal-concluido') return toneQuality100(n);
  if(key==='bucal-exodontias'){
    if(n<3 || n>=14) return 'regular';
    if(n>=12) return 'suficiente';
    if(n>=10) return 'bom';
    return 'otimo';
  }
  if(key==='bucal-escovacao'){
    if(n<=0.25) return 'regular';
    if(n<=0.5) return 'suficiente';
    if(n<=1) return 'bom';
    return 'otimo';
  }
  if(key==='bucal-preventivos'){
    if(n<40 || n>85) return 'regular';
    if(n<55) return 'suficiente';
    if(n<65) return 'bom';
    return 'otimo';
  }
  if(key==='bucal-art'){
    if(n<=3) return 'regular';
    if(n<=6) return 'suficiente';
    if(n<=8) return 'bom';
    return 'otimo';
  }

  if(key==='emulti-media'){
    if(n<=1) return 'regular';
    if(n<=2) return 'suficiente';
    if(n<=3) return 'bom';
    return 'otimo';
  }
  if(key==='emulti-acoes'){
    if(n<=1) return 'regular';
    if(n<=2.5) return 'suficiente';
    if(n<=5) return 'bom';
    return 'otimo';
  }

  if(group.includes('familia')) return toneQuality100(n);
  return n>10 ? toneQuality100(n) : toneScale10(n);
}
function monthlyIndicatorClass(section,value){
  return indicatorRuleTone(section.group,section.title,value);
}
function monthlyScore(value,maxValue,kind,section){
  const n=numericValue(value);
  const width=n===null?0:Math.max(0,Math.min(100,(n/maxValue)*100));
  const tone=section?monthlyIndicatorClass(section,value):'neutral';
  return `<div class="monthly-score ${kind} tone-${tone}"><strong class="score-badge ${tone}">${formatMonthly(value)}</strong><div class="monthly-track"><span style="width:${width}%"></span></div></div>`;
}

function monthlySummaryValueMap(){
  const table=state.data?.tables?.resumo;
  const values=new Map();
  if(!table) return values;
  resumoSections(table).forEach(section=>{
    const headers=section.headers||[];
    (section.rows||[]).forEach(row=>{
      const unit=resultLabelNormalize(row[0]);
      headers.slice(1).forEach((header,index)=>{
        if(!header) return;
        const value=row[index+1];
        if(numericValue(value)===null) return;
        const key=`${canonicalIndicatorKey(section.group,header)}|${unit}`;
        values.set(key,value);
      });
    });
  });
  return values;
}
function monthlyRowsAlignedWithSummary(section){
  const summaryValues=monthlySummaryValueMap();
  const indicatorKey=canonicalIndicatorKey(section.group,section.title);
  return (section.rows||[]).map(row=>{
    const aligned=[...row];
    const key=`${indicatorKey}|${resultLabelNormalize(row[0])}`;
    if(summaryValues.has(key)){
      aligned[2]=summaryValues.get(key);
      const previous=numericValue(aligned[1]);
      const current=numericValue(aligned[2]);
      aligned[3]=previous!==null&&current!==null?current-previous:aligned[3];
    }
    return aligned;
  });
}
function monthlySortedRows(section){
  const ranked=[...(section.rows||[])]
    .map((row,index)=>({row,index}))
    .sort((a,b)=>{
      const av=numericValue(a.row[2]);
      const bv=numericValue(b.row[2]);
      if(av===null && bv!==null) return 1;
      if(av!==null && bv===null) return -1;
      if(av!==null && bv!==null && Math.abs(av-bv)>0.000001) return bv-av;
      const unit=String(a.row[0]||'').localeCompare(String(b.row[0]||''),'pt-BR',{sensitivity:'base'});
      return unit||a.index-b.index;
    })
    .map((item,index)=>({...item,rank:index+1}));
  const sortConfig=state.monthlySort?.section===state.monthlySection?state.monthlySort:{section:state.monthlySection||0,column:0,direction:'asc'};
  const column=Number.isInteger(sortConfig.column)?sortConfig.column:0;
  const direction=sortConfig.direction==='desc'?-1:1;
  return ranked.sort((a,b)=>{
    if(column===0) return (a.rank-b.rank)*direction;
    if(column===1){
      const text=String(a.row[0]||'').localeCompare(String(b.row[0]||''),'pt-BR',{sensitivity:'base'});
      if(text!==0) return text*direction;
    } else {
      const dataIndex=column-1;
      const av=numericValue(a.row[dataIndex]);
      const bv=numericValue(b.row[dataIndex]);
      if(av===null && bv!==null) return 1;
      if(av!==null && bv===null) return -1;
      if(av!==null && bv!==null && Math.abs(av-bv)>0.000001) return (av-bv)*direction;
      if(av===null && bv===null){
        const text=String(a.row[dataIndex]||'').localeCompare(String(b.row[dataIndex]||''),'pt-BR',{sensitivity:'base'});
        if(text!==0) return text*direction;
      }
    }
    return a.rank-b.rank;
  });
}
function monthlySortHeader(label,column){
  const active=state.monthlySort?.section===state.monthlySection && state.monthlySort?.column===column;
  const direction=active?state.monthlySort.direction:'';
  const aria=active?`Ordenado ${direction==='asc'?'do menor para o maior':'do maior para o menor'}`:'Clique para ordenar esta coluna';
  return `<th aria-sort="${active?(direction==='asc'?'ascending':'descending'):'none'}"><button class="municipal-sort-button ${active?'active':''}" data-monthly-sort="${column}" title="${aria}"><span>${esc(label)}</span><span class="municipal-sort-arrows" aria-hidden="true"><i class="${active&&direction==='asc'?'active':''}">▲</i><i class="${active&&direction==='desc'?'active':''}">▼</i></span></button></th>`;
}
function monthlyDashboard(section){
  const alignedSection={...section,rows:monthlyRowsAlignedWithSummary(section)};
  const stats=monthlyStats(alignedSection);
  const maxValue=canonicalIndicatorKey(section.group,section.title)==='vinculo'?10:100;
  const sorted=monthlySortedRows(alignedSection);
  const headers=['Posição','Unidade','Abril','Maio','Evolução'];
  const best=stats.best;
  return `${monthlyKpis(alignedSection)}
    <div class="monthly-highlight card">
      <div><span class="monthly-highlight-label">Indicador selecionado</span><h2>${esc(section.title)}</h2><p>Comparação dos resultados mensal.</p></div>
      ${best?`<div class="monthly-best"><span>Maior evolução</span><strong>${esc(best.row[0])}</strong><small>+${formatMonthly(best.change)} pontos</small></div>`:`<div class="monthly-best"><span>Evolução</span><strong>Sem evolução</strong><small>Nenhuma unidade apresentou aumento</small></div>`}
    </div>
    <div class="monthly-table-card card">
      <div class="monthly-table-head"><div><h3>Resultados por unidade</h3><p>Use as setas dos títulos para reorganizar a tabela.</p></div><div class="monthly-legend"><span><i class="legend-dot previous"></i>Abril</span><span><i class="legend-dot current"></i>Maio</span><span><i class="legend-dot evolution"></i>Evolução</span></div></div>
      <div class="monthly-table-wrap"><table class="monthly-table"><thead><tr>${headers.map((header,column)=>monthlySortHeader(header,column)).join('')}</tr></thead><tbody id="monthlyTableBody">${sorted.map(item=>{const row=item.row;return `<tr data-monthly-row><td><span class="rank-badge">${item.rank}º</span></td><td class="unit-name">${esc(row[0])}</td><td>${monthlyScore(row[1],maxValue,'previous',section)}</td><td>${monthlyScore(row[2],maxValue,'current',section)}</td><td>${monthlyEvolution(row[3])}</td></tr>`}).join('')}</tbody></table></div>
    </div>`;
}
function monthlyPage(table){
  const sections=monthlySections(table.rows||[]);
  if(!sections.length)return '<div class="empty card">Não foi possível organizar os dados mensais.</div>';
  const selected=Math.min(state.monthlySection||0,sections.length-1);
  state.monthlySection=selected;
  const section=sections[selected];
  return `<div class="page-title monthly-page-title"><div><div class="eyebrow" style="color:var(--primary)">Resultados</div><h1>Notas mensais</h1></div></div>
    <section class="monthly-selector card monthly-selector-compact"><div class="monthly-compact-controls">${monthlyCategoryFilters(sections,selected)}<div class="monthly-search"><span>⌕</span><input id="monthlyFilter" placeholder="Pesquisar unidade..." /></div></div></section>
    <div id="monthlyDashboard">${monthlyDashboard(section)}</div>`;
}


function resumoSections(table){
  const rows=table.rows||[];
  const sections=[];
  const familyRows=[];
  let bucalHeaders=null, bucalRows=[];
  let emultiHeaders=null, emultiRows=[];
  let mode='familia';
  rows.forEach(row=>{
    const label=String(row[0]??'').trim();
    if(!label) return;
    if(label==='Saúde Bucal'){ mode='bucal'; return; }
    if(label==='eMulti'){ mode='emulti'; return; }
    if(mode==='familia'){
      familyRows.push(row);
      return;
    }
    if(label.toUpperCase()==='UNIDADE'){
      if(mode==='bucal') bucalHeaders=row;
      else if(mode==='emulti') emultiHeaders=row;
      return;
    }
    if(mode==='bucal') bucalRows.push(row);
    else if(mode==='emulti') emultiRows.push(row);
  });
  sections.push({key:'familia',group:'Saúde da Família',title:'Resultado geral',headers:table.headers||[],rows:familyRows});
  if(bucalHeaders && bucalRows.length) sections.push({key:'bucal',group:'Saúde Bucal',title:'Saúde Bucal',headers:bucalHeaders,rows:bucalRows});
  if(emultiHeaders && emultiRows.length) sections.push({key:'emulti',group:'eMulti',title:'eMulti',headers:emultiHeaders,rows:emultiRows});
  return sections;
}
function resumoGroupedSections(sections){
  const order=['Saúde da Família','Saúde Bucal','eMulti'];
  return order.map(label=>{
    const items=sections.map((section,index)=>({...section,index})).filter(item=>item.group===label);
    if(!items.length) return null;
    const key=label==='Saúde da Família'?'familia':label==='Saúde Bucal'?'bucal':'emulti';
    return {key,label,items};
  }).filter(Boolean);
}
function resumoFilterTitle(item){
  if(item.group==='Saúde da Família') return 'Saúde da Família';
  if(item.group==='Saúde Bucal') return 'Saúde Bucal';
  if(item.group==='eMulti') return 'eMulti';
  return item.title;
}
function resumoCategoryFilters(sections,selected){
  const items=sections.map((section,index)=>({...section,index}));
  return `<div class="summary-choice-line">${items.map(item=>`<button class="monthly-tab summary-choice-btn ${item.index===selected?'active':''}" data-resumo-section="${item.index}"><strong>${esc(resumoFilterTitle(item))}</strong></button>`).join('')}</div>`;
}
function resumoRowAverage(row){
  const values=row.slice(1).map(numericValue).filter(v=>v!==null);
  if(!values.length) return null;
  return values.reduce((sum,v)=>sum+v,0)/values.length;
}
function resumoToneByScale10(n){
  return toneScale10(n);
}
function resumoToneByScale100(n){
  return toneQuality100(n);
}
function resumoTone(section,header,value){
  return indicatorRuleTone(section.group,header,value);
}
function resumoCell(section,header,value){
  if(value===null||value===undefined||value==='') return `<span class="summary-pill neutral">—</span>`;
  const tone=resumoTone(section,header,value);
  return `<span class="summary-pill ${tone}">${formatMonthly(value)}</span>`;
}
function resumoStats(section){
  const rows=section.rows||[];
  const headers=(section.headers||[]).slice(1).filter(Boolean);
  const sortedRows=[...rows].map(row=>({row,average:resumoRowAverage(row)})).sort((a,b)=>(b.average??-Infinity)-(a.average??-Infinity));
  const bestUnit=sortedRows[0]||null;
  let topScore=null;
  rows.forEach(row=>{
    section.headers.slice(1).forEach((header,idx)=>{
      const raw=row[idx+1];
      const n=numericValue(raw);
      if(n===null) return;
      if(!topScore || n>topScore.value) topScore={unit:row[0], header, value:raw, numeric:n};
    });
  });
  const allValues=[];
  rows.forEach(row=>row.slice(1).forEach(v=>{ const n=numericValue(v); if(n!==null) allValues.push(n); }));
  const average=allValues.length ? allValues.reduce((sum,v)=>sum+v,0)/allValues.length : null;
  return {headers,rows,sortedRows,bestUnit,topScore,average};
}
function resumoKpis(section){
  return ``;
}
function resumoSortedRows(section){
  const sortConfig=state.summarySort?.section===state.summarySection?state.summarySort:{section:state.summarySection||0,column:0,direction:'asc'};
  const column=Number.isInteger(sortConfig.column)?sortConfig.column:0;
  const direction=sortConfig.direction==='desc'?-1:1;
  return [...(section.rows||[])].sort((a,b)=>{
    if(column===0){
      const text=String(a[0]||'').localeCompare(String(b[0]||''),'pt-BR',{sensitivity:'base'});
      if(text!==0) return text*direction;
    } else {
      const av=numericValue(a[column]);
      const bv=numericValue(b[column]);
      if(av===null && bv!==null) return 1;
      if(av!==null && bv===null) return -1;
      if(av!==null && bv!==null && Math.abs(av-bv)>0.000001) return (av-bv)*direction;
      if(av===null && bv===null){
        const text=String(a[column]||'').localeCompare(String(b[column]||''),'pt-BR',{sensitivity:'base'});
        if(text!==0) return text*direction;
      }
    }
    return String(a[0]||'').localeCompare(String(b[0]||''),'pt-BR',{sensitivity:'base'});
  });
}
function resumoSortHeader(label,column){
  const active=state.summarySort?.section===state.summarySection && state.summarySort?.column===column;
  const direction=active?state.summarySort.direction:'';
  const aria=active?`Ordenado ${direction==='asc'?'do menor para o maior':'do maior para o menor'}`:'Clique para ordenar esta coluna';
  return `<th aria-sort="${active?(direction==='asc'?'ascending':'descending'):'none'}"><button class="municipal-sort-button ${active?'active':''}" data-summary-sort="${column}" title="${aria}"><span>${esc(label)}</span><span class="municipal-sort-arrows" aria-hidden="true"><i class="${active&&direction==='asc'?'active':''}">▲</i><i class="${active&&direction==='desc'?'active':''}">▼</i></span></button></th>`;
}
function resumoDashboard(section){
  const headers=(section.headers||[]).filter(Boolean);
  const rows=resumoSortedRows(section);
  return `<div class="monthly-table-card card summary-table-card">
      <div class="monthly-table-head"><div><h3>Resumo por unidade</h3></div><div class="monthly-legend summary-legend"><span><i class="legend-dot previous"></i>Regular</span><span><i class="legend-dot current"></i>Suficiente</span><span><i class="legend-dot bom"></i>Bom</span><span><i class="legend-dot otimo"></i>Ótimo</span></div></div>
      <div class="monthly-table-wrap"><table class="monthly-table summary-table"><thead><tr>${headers.map((header,column)=>resumoSortHeader(header,column)).join('')}</tr></thead><tbody id="summaryTableBody">${rows.map(row=>`<tr data-summary-row><td class="unit-name">${esc(row[0])}</td>${headers.slice(1).map((header,colIndex)=>`<td>${resumoCell(section,header,row[colIndex+1])}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
    </div>`;
}
function resumoPage(table){
  const sections=resumoSections(table);
  if(!sections.length) return '<div class="empty card">Não foi possível organizar o resumo das notas.</div>';
  const selected=Math.min(state.summarySection||0,sections.length-1);
  state.summarySection=selected;
  const section=sections[selected];
  return `<div class="page-title monthly-page-title"><div><div class="eyebrow" style="color:var(--primary)">Resultados</div><h1>Resumo das notas Mensal</h1></div></div>
    <section class="monthly-selector card summary-selector-compact"><div class="monthly-selector-copy"><h2>Escolha o quadro</h2></div>${resumoCategoryFilters(sections,selected)}<div class="monthly-search"><span>⌕</span><input id="summaryFilter" placeholder="Pesquisar unidade..." /></div></section>
    <div id="summaryDashboard">${resumoDashboard(section)}</div>`;
}



function quadrimestreLabel(value){
  return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();
}
function quadrimestreParseTable(table){
  const parsed={vinculo:[],familiaFinal:[],familiaDetail:[],emulti:[],bucalFinal:[],bucalDetail:[]};
  let section='';
  let currentUnit='';
  (table.rows||[]).forEach(sourceRow=>{
    const row=[...(sourceRow||[])];
    while(row.length<4) row.push('');
    const first=String(row[0]??'').trim();
    const label=quadrimestreLabel(first);

    if(label.includes('saude bucal') && label.includes('detalhado')){section='bucalDetail';currentUnit='';return;}
    if(label==='saude bucal'){section='bucalFinal';currentUnit='';return;}
    if(label.includes('saude da familia') && label.includes('qualidade') && label.includes('detalhado')){section='familiaDetail';currentUnit='';return;}
    if(label.includes('saude da familia') && label.includes('componente qualidade')){section='familiaFinal';currentUnit='';return;}
    if(label==='emulti'){section='emulti';currentUnit='';return;}
    if(label.includes('acs') && label.includes('vinculo')){section='vinculo';currentUnit='';return;}

    if(!section) return;
    if(['estabelecimento','nome da equipe','unidade','equipe'].includes(label)) return;

    if(section==='familiaDetail' || section==='bucalDetail'){
      if(first) currentUnit=first;
      const indicator=String(row[1]??'').trim();
      const value=numericValue(row[2]);
      if(currentUnit && indicator && value!==null) parsed[section].push([currentUnit,indicator,row[2]]);
      return;
    }

    if(!first) return;
    if(section==='vinculo'){
      if(numericValue(row[1])!==null || numericValue(row[2])!==null || numericValue(row[3])!==null) parsed.vinculo.push([row[0],row[1],row[2],row[3]]);
      return;
    }
    if(section==='familiaFinal' || section==='bucalFinal'){
      if(numericValue(row[1])!==null) parsed[section].push([row[0],row[1]]);
      return;
    }
    if(section==='emulti'){
      if(numericValue(row[1])!==null || numericValue(row[2])!==null || numericValue(row[3])!==null) parsed.emulti.push([row[0],row[1],row[2],row[3]]);
    }
  });
  return parsed;
}
function quadrimestreGroups(table){
  const parsed=quadrimestreParseTable(table);
  return [
    {
      key:'familia',
      group:'Saúde da Família',
      title:'Saúde da Família',
      subtitle:'',
      blocks:[
        {key:'vinculo',title:'Vínculo e acompanhamento',headers:['Estabelecimento','Cadastro','Acompanhamento','Nota Final'],rows:parsed.vinculo},
        {key:'qualidade',title:'Componente qualidade',headers:['Nome da Equipe','Nota Final'],rows:parsed.familiaFinal},
        {key:'detalhado',title:'Qualidade detalhada',headers:['Unidade','Indicador','Nota do Indicador'],rows:parsed.familiaDetail}
      ]
    },
    {
      key:'bucal',
      group:'Saúde Bucal',
      title:'Saúde Bucal',
      subtitle:'',
      blocks:[
        {key:'geral',title:'Resultado geral',headers:['Equipe','Nota Final'],rows:parsed.bucalFinal},
        {key:'detalhado',title:'Detalhado',headers:['Unidade','Indicador','Nota do Indicador'],rows:parsed.bucalDetail}
      ]
    },
    {
      key:'emulti',
      group:'eMulti',
      title:'eMulti',
      subtitle:'',
      blocks:[
        {key:'geral',title:'Resultado geral',headers:['Equipe','Média de atendimentos','Ações interprofissionais','Nota Final'],rows:parsed.emulti}
      ]
    }
  ].map(group=>({...group,blocks:group.blocks.filter(block=>block.rows?.length)})).filter(group=>group.blocks.length);
}
function quadrimestreGroupLabel(group){
  return group.group || group.title;
}
function quadrimestreFilters(groups,selected){
  return `<div class="summary-choice-line quadrimestre-choice-line">${groups.map((group,index)=>`<button class="monthly-tab summary-choice-btn quadrimestre-choice-btn ${index===selected?'active':''}" data-quadr-group="${index}"><strong>${esc(quadrimestreGroupLabel(group))}</strong></button>`).join('')}</div>`;
}
function quadrimestreFinalTone(value){
  const n=numericValue(value);
  if(n===null) return 'neutral';
  if(n<=2.5) return 'regular';
  if(n<5) return 'suficiente';
  if(n<=7.5) return 'bom';
  return 'otimo';
}
function quadrimestreTone(group,header,value){
  const n=numericValue(value);
  if(n===null) return 'neutral';
  const h=quadrimestreLabel(header);
  if(h.includes('cadastro')){
    if(n<=0.75) return 'regular';
    if(n<=1.5) return 'suficiente';
    if(n<3) return 'bom';
    return 'otimo';
  }
  if(h==='acompanhamento'){
    if(n<=1.75) return 'regular';
    if(n<=3.5) return 'suficiente';
    if(n<7) return 'bom';
    return 'otimo';
  }
  if(h==='nota final') return group.key==='vinculo'?toneScale10(n):quadrimestreFinalTone(n);
  return indicatorRuleTone(group.group||group.title,header,n);
}
function quadrimestreClassificationLabel(value){
  const tone=quadrimestreFinalTone(value);
  return tone==='regular'?'Regular':tone==='suficiente'?'Suficiente':tone==='bom'?'Bom':tone==='otimo'?'Ótimo':'—';
}
function quadrimestreClassificationTone(value){
  const normalized=quadrimestreLabel(value);
  if(normalized==='regular') return 'regular';
  if(normalized==='suficiente') return 'suficiente';
  if(normalized==='bom') return 'bom';
  if(normalized==='otimo') return 'otimo';
  return 'neutral';
}
function quadrimestreCell(group,header,value){
  if(value===null || value===undefined || value==='') return `<span class="summary-pill neutral">—</span>`;
  if(quadrimestreLabel(header)==='classificacao'){
    return `<span class="summary-pill ${quadrimestreClassificationTone(value)}">${esc(value)}</span>`;
  }
  if(typeof value==='number' || /^\d+(?:[\.,]\d+)?$/.test(String(value).trim())){
    return `<span class="summary-pill ${quadrimestreTone(group,header,value)}">${formatMonthly(value)}</span>`;
  }
  return `<span class="table-text">${esc(value)}</span>`;
}

const quadrimestreUnitAliases = {
  'JACIABA':'MARIANO LUBCZYK',
  'PAPANDUVA DE CIMA':'LUCIA FABRI',
  'PIQUIRI':'VOLANTE PIQUIRI',
  'RIO DA AREIA':'LAUDELINA QUEIROZ DOS SANTOS',
  'VILA DA LUZ':'VEREADOR FRANCISCO KLOSOVSKI',
  'VILA DAS FLORES':'DR ANTONIO LEMOS',
  'CENTRO':'ANGELA MARIA MACHADO'
};
function quadrimestreNormalizeName(value){
  let name=String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase();
  name=name.replace(/[^A-Z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
  name=name.replace(/^(ESF|USF|ESB)\s+/,'');
  name=name.replace(/UNIDADE DE SAUDE DA FAMILIA/g,'').replace(/\s+/g,' ').trim();
  if(name.includes('ANGELA MARIA')) name='ANGELA MARIA MACHADO';
  return quadrimestreUnitAliases[name] || name;
}
function quadrimestreUnitKey(value){
  return quadrimestreNormalizeName(value);
}
function quadrimestreDisplayName(value){
  const normalized=quadrimestreNormalizeName(value);
  if(!normalized) return String(value||'').trim();
  if(normalized==='ANGELA MARIA MACHADO') return 'USF ANGELA MARIA MACHADO';
  return `ESF ${normalized}`.replace(/\s+/g,' ').trim();
}
function quadrimestreMergeUnit(units,key,displayName,values){
  if(!key) return;
  const current=units.get(key) || {name:displayName,values:{}};
  if(!current.name) current.name=displayName;
  Object.entries(values||{}).forEach(([label,val])=>{
    if(val!=='' && val!==null && val!==undefined) current.values[label]=val;
  });
  units.set(key,current);
}
function quadrimestreFamilyColumn(indicator){
  const label=quadrimestreLabel(indicator);
  if(label.includes('mais acesso')) return 'Mais Acesso';
  if(label.includes('desenvolvimento infantil')) return 'Infantil';
  if(label.includes('gestacao') || label.includes('puerperio')) return 'Gestante e Puérpera';
  if(label.includes('diabetes')) return 'Diabetes';
  if(label.includes('hipertens')) return 'Hipertensão';
  if(label.includes('idosa')) return 'Idoso';
  if(label.includes('mulher') || label.includes('cancer')) return 'Prevenção do câncer da mulher';
  return '';
}
function quadrimestreBucalColumn(indicator){
  const label=quadrimestreLabel(indicator);
  if(label.includes('primeira consulta')) return '1ª Consulta';
  if(label.includes('concluido')) return 'Concluído';
  if(label.includes('exodont')) return 'Exodontias';
  if(label.includes('escovacao')) return 'Escovação';
  if(label.includes('preventiv')) return 'Preventivos';
  if(label.includes('restaurador atraumatico')) return 'ART';
  return '';
}
function quadrimestreDetailModel(group){
  if(group.key==='familia'){
    const scoreColumns=['Vínculo e acompanhamento','Mais Acesso','Infantil','Gestante e Puérpera','Diabetes','Hipertensão','Idoso','Prevenção do câncer da mulher','Nota Final'];
    const columns=[...scoreColumns];
    const units=new Map();
    const vinculo=group.blocks.find(block=>block.key==='vinculo');
    const qualidade=group.blocks.find(block=>block.key==='qualidade');
    const detalhado=group.blocks.find(block=>block.key==='detalhado');

    (vinculo?.rows||[]).forEach(row=>quadrimestreMergeUnit(units,quadrimestreUnitKey(row[0]),quadrimestreDisplayName(row[0]),{'Vínculo e acompanhamento':row[3]}));
    (qualidade?.rows||[]).forEach(row=>quadrimestreMergeUnit(units,quadrimestreUnitKey(row[0]),quadrimestreDisplayName(row[0]),{'Nota Final':row[1]}));
    (detalhado?.rows||[]).forEach(row=>{
      const column=quadrimestreFamilyColumn(row[1]);
      if(column) quadrimestreMergeUnit(units,quadrimestreUnitKey(row[0]),quadrimestreDisplayName(row[0]),{[column]:row[2]});
    });

    return {
      layout:'matrix',
      title:'Tabela consolidada das notas',
      subtitle:'',
      headers:['Unidade',...columns],
      rows:[...units.values()].map(item=>[item.name,...scoreColumns.map(column=>item.values[column]??'')]).sort((a,b)=>String(a[0]).localeCompare(String(b[0]),'pt-BR'))
    };
  }

  if(group.key==='bucal'){
    const scoreColumns=['1ª Consulta','Concluído','Exodontias','Escovação','Preventivos','ART','Nota Final'];
    const columns=[...scoreColumns];
    const units=new Map();
    const geral=group.blocks.find(block=>block.key==='geral');
    const detalhado=group.blocks.find(block=>block.key==='detalhado');

    (geral?.rows||[]).forEach(row=>quadrimestreMergeUnit(units,quadrimestreUnitKey(row[0]),quadrimestreDisplayName(row[0]),{'Nota Final':row[1]}));
    (detalhado?.rows||[]).forEach(row=>{
      const column=quadrimestreBucalColumn(row[1]);
      if(column) quadrimestreMergeUnit(units,quadrimestreUnitKey(row[0]),quadrimestreDisplayName(row[0]),{[column]:row[2]});
    });

    return {
      layout:'matrix',
      title:'Tabela consolidada das notas',
      subtitle:'',
      headers:['Unidade',...columns],
      rows:[...units.values()].map(item=>[item.name,...scoreColumns.map(column=>item.values[column]??'')]).sort((a,b)=>String(a[0]).localeCompare(String(b[0]),'pt-BR'))
    };
  }

  const firstBlock=group.blocks[0];
  return {
    layout:'matrix',
    title:'Tabela consolidada das notas',
    subtitle:'',
    headers:['Equipe','Média de atendimentos','Ações interprofissionais','Nota Final'],
    rows:(firstBlock?.rows||[]).map(row=>[row[0],row[1],row[2],row[3]]).sort((a,b)=>String(a[0]).localeCompare(String(b[0]),'pt-BR'))
  };
}
function quadrimestreSortValue(header,value){
  if(value===null || value===undefined || String(value).trim()==='') return {empty:true,value:''};
  if(quadrimestreLabel(header)==='classificacao'){
    const order={regular:0,suficiente:1,bom:2,otimo:3};
    return {empty:false,value:order[quadrimestreLabel(value)]??-1};
  }
  const numeric=typeof value==='number'?value:Number(String(value).trim().replace(',','.'));
  if(!Number.isNaN(numeric)) return {empty:false,value:numeric};
  return {empty:false,value:String(value).localeCompare?String(value):value};
}
function quadrimestreSortedRows(model){
  const current=state.quadrSort?.group===state.quadrGroup?state.quadrSort:{group:state.quadrGroup||0,column:0,direction:'asc'};
  const column=Number.isInteger(current.column)?current.column:0;
  const direction=current.direction==='desc'?-1:1;
  const header=model.headers[column]||'';
  return [...model.rows].sort((a,b)=>{
    const av=quadrimestreSortValue(header,a[column]);
    const bv=quadrimestreSortValue(header,b[column]);
    if(av.empty && bv.empty) return 0;
    if(av.empty) return 1;
    if(bv.empty) return -1;
    if(typeof av.value==='number' && typeof bv.value==='number') return (av.value-bv.value)*direction;
    return String(av.value).localeCompare(String(bv.value),'pt-BR',{numeric:true,sensitivity:'base'})*direction;
  });
}
function quadrimestreSortHeader(label,column){
  const current=state.quadrSort?.group===state.quadrGroup?state.quadrSort:{group:state.quadrGroup||0,column:0,direction:'asc'};
  const active=current.column===column;
  const direction=current.direction||'asc';
  const aria=active?(direction==='asc'?`Ordenado por ${label}, do menor para o maior`:`Ordenado por ${label}, do maior para o menor`):`Ordenar por ${label}`;
  const classes=`${quadrimestreLabel(label)==='classificacao'?'classification-column':''} ${column===0?'unit-column':''}`;
  return `<th class="${classes}" aria-sort="${active?(direction==='asc'?'ascending':'descending'):'none'}"><button class="municipal-sort-button ${active?'active':''}" data-quadr-sort="${column}" title="${esc(aria)}"><span>${esc(label)}</span><span class="municipal-sort-arrows" aria-hidden="true"><i class="${active&&direction==='asc'?'active':''}">▲</i><i class="${active&&direction==='desc'?'active':''}">▼</i></span></button></th>`;
}
function quadrimestreDetailTable(group){
  const model=quadrimestreDetailModel(group);
  if(!model.rows.length) return '';
  const sortedRows=quadrimestreSortedRows(model);
  return `<section class="card quadrimestre-detail-card quadrimestre-matrix-card">
    <div class="quadrimestre-block-head"><div><h3>${esc(model.title)}</h3>${model.subtitle?`<p>${esc(model.subtitle)}</p>`:''}</div></div>
    <div class="quadrimestre-detail-inner">
      <div class="monthly-table-wrap"><table class="monthly-table summary-table quadrimestre-table quadrimestre-detail-table quadrimestre-matrix-table"><thead><tr>${model.headers.map((h,colIndex)=>quadrimestreSortHeader(h,colIndex)).join('')}</tr></thead><tbody>${sortedRows.map(row=>`<tr data-quadr-row>${row.map((value,colIndex)=>`<td class="${colIndex===0?'unit-name unit-column':''} ${quadrimestreLabel(model.headers[colIndex])==='classificacao'?'classification-column':''}">${colIndex===0?`<span class="table-text">${esc(value)}</span>`:quadrimestreCell(group,model.headers[colIndex],value)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
    </div>
  </section>`;
}
function quadrimestreKpis(){
  return '';
}
function quadrimestreDashboard(group){
  return `${quadrimestreKpis(group)}
  <div class="monthly-legend summary-legend quadrimestre-legend"><span><i class="legend-dot previous"></i>Regular</span><span><i class="legend-dot current"></i>Suficiente</span><span><i class="legend-dot bom"></i>Bom</span><span><i class="legend-dot otimo"></i>Ótimo</span></div>
  <div class="quadrimestre-blocks">${quadrimestreDetailTable(group)}</div>`;
}
function quadrimestrePage(table){
  const groups=quadrimestreGroups(table);
  if(!groups.length) return '<div class="empty card">Não foi possível organizar a avaliação quadrimestral.</div>';
  const selected=Math.min(state.quadrGroup||0,groups.length-1);
  state.quadrGroup=selected;
  const group=groups[selected];
  return `<div class="page-title monthly-page-title"><div><div class="eyebrow" style="color:var(--primary)">Resultados • 1º quadrimestre de 2026</div><h1>Avaliação quadrimestral</h1></div></div>
    <section class="monthly-selector card summary-selector-compact quadrimestre-selector"><div class="monthly-selector-copy"><h2>Escolha a área</h2></div>${quadrimestreFilters(groups,selected)}<div class="monthly-search"><span>⌕</span><input id="quadrimestreFilter" placeholder="Pesquisar equipe, unidade ou indicador..." /></div></section>
    <div id="quadrimestreDashboard">${quadrimestreDashboard(group)}</div>`;
}

function municipiosNormalizeText(value){
  return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
}
function municipiosAreaMeta(label){
  const normalized=municipiosNormalizeText(label);
  if(normalized.includes('acs') && normalized.includes('vinculo')) return {key:'vinculo',label:'Vínculo e acompanhamento'};
  if(normalized==='saude da familia') return {key:'familia',label:'Saúde da Família'};
  if(normalized==='saude bucal') return {key:'bucal',label:'Saúde Bucal'};
  if(normalized==='emulti') return {key:'emulti',label:'eMulti'};
  return null;
}
function municipiosShortTitle(title,areaKey){
  if(areaKey==='vinculo') return 'Vínculo e acompanhamento';
  const normalized=municipiosNormalizeText(title);
  if(normalized.includes('mais acesso')) return 'Mais Acesso à APS';
  if(normalized.includes('desenvolvimento infantil')) return 'Desenvolvimento Infantil';
  if(normalized.includes('gestante')) return 'Gestante e Puérpera';
  if(normalized.includes('saude da mulher')) return 'Saúde da Mulher';
  if(normalized.includes('pessoa idosa')) return 'Pessoa Idosa';
  if(normalized.includes('1ª consulta') || normalized.includes('1a consulta')) return '1ª Consulta Odontológica';
  if(normalized.includes('tratamento odontologico concluido')) return 'Tratamento Odontológico Concluído';
  if(normalized.includes('exodontias')) return 'Taxa de Exodontias';
  if(normalized.includes('escovacao supervisionada')) return 'Escovação Supervisionada';
  if(normalized.includes('procedimentos odontologicos preventivos')) return 'Procedimentos Preventivos';
  if(normalized.includes('restaurador atraumatico')) return 'Tratamento Restaurador Atraumático';
  if(normalized.includes('acoes interprofissionais')) return 'Ações Interprofissionais';
  if(normalized.includes('media de atendimentos')) return 'Média de Atendimentos';
  return title;
}
function municipiosSections(table){
  const rows=table.rows||[];
  const sections=[];
  let currentArea=null;
  for(let i=0;i<rows.length;i++){
    const row=rows[i]||[];
    const label=String(row[0]??'').trim();
    const area=municipiosAreaMeta(label);
    if(area){ currentArea=area; continue; }
    if(!currentArea || !label) continue;
    const next=rows[i+1]||[];
    if(municipiosNormalizeText(next[0])!=='municipio') continue;
    const dataRows=[];
    let j=i+2;
    while(j<rows.length){
      const candidate=rows[j]||[];
      const first=String(candidate[0]??'').trim();
      if(!first) break;
      if(municipiosAreaMeta(first)) break;
      const tail=candidate.slice(1,7);
      if(tail.every(v=>v===''||v===null||v===undefined)) break;
      if(municipiosNormalizeText(first)==='municipio') break;
      dataRows.push(candidate.slice(0,7));
      j++;
    }
    if(dataRows.length){
      sections.push({
        areaKey:currentArea.key,
        areaLabel:currentArea.label,
        title:municipiosShortTitle(label,currentArea.key),
        fullTitle:label,
        headers:['Município','Regular','Suficiente','Bom','Ótimo','Total','% Bom/Ótimo'],
        rows:dataRows
      });
    }
  }
  return sections;
}
function municipiosPercent(value,row){
  let n=numericValue(value);
  if(n===null){
    const total=numericValue(row?.[5]);
    const bom=numericValue(row?.[3])||0;
    const otimo=numericValue(row?.[4])||0;
    return total ? ((bom+otimo)/total)*100 : 0;
  }
  if(n>=0 && n<=1.000001) n*=100;
  return n;
}
function municipiosFormatPercent(value,row){
  const n=municipiosPercent(value,row);
  return n.toLocaleString('pt-BR',{minimumFractionDigits:0,maximumFractionDigits:n%1?1:0})+'%';
}
function municipiosSortedRows(section,sortConfig=state.municipalSort){
  const column=Number.isInteger(sortConfig?.column)?sortConfig.column:6;
  const direction=sortConfig?.direction==='asc'?1:-1;
  return [...section.rows].sort((a,b)=>{
    if(column===0){
      const text=String(a[0]||'').localeCompare(String(b[0]||''),'pt-BR',{sensitivity:'base'});
      if(text!==0) return text*direction;
    } else {
      const av=column===6?municipiosPercent(a[6],a):numericValue(a[column]);
      const bv=column===6?municipiosPercent(b[6],b):numericValue(b[column]);
      if(av===null && bv!==null) return 1;
      if(av!==null && bv===null) return -1;
      if(av!==null && bv!==null && Math.abs(av-bv)>0.000001) return (av-bv)*direction;
    }

    // Desempate mantém o melhor desempenho geral acima.
    const pct=municipiosPercent(b[6],b)-municipiosPercent(a[6],a);
    if(Math.abs(pct)>0.000001) return pct;
    const otimo=(numericValue(b[4])||0)-(numericValue(a[4])||0);
    if(otimo!==0) return otimo;
    const bom=(numericValue(b[3])||0)-(numericValue(a[3])||0);
    if(bom!==0) return bom;
    return String(a[0]||'').localeCompare(String(b[0]||''),'pt-BR',{sensitivity:'base'});
  });
}
function municipiosSortHeader(label,column){
  const active=state.municipalSort?.column===column;
  const direction=active?state.municipalSort.direction:'';
  const aria=active?`Ordenado ${direction==='asc'?'do menor para o maior':'do maior para o menor'}`:'Clique para ordenar esta coluna';
  return `<th aria-sort="${active?(direction==='asc'?'ascending':'descending'):'none'}"><button class="municipal-sort-button ${active?'active':''}" data-municipal-sort="${column}" title="${aria}"><span>${esc(label)}</span><span class="municipal-sort-arrows" aria-hidden="true"><i class="${active&&direction==='asc'?'active':''}">▲</i><i class="${active&&direction==='desc'?'active':''}">▼</i></span></button></th>`;
}
function municipiosFindPrudentopolis(rows){
  return rows.findIndex(row=>municipiosNormalizeText(row[0]).includes('prudentopolis'));
}
const MUNICIPIOS_POPULACAO = [
  ['IRATI',61004],
  ['MARECHAL CÂNDIDO RONDON',58734],
  ['MEDIANEIRA',57910],
  ['UNIÃO DA VITÓRIA',56560],
  ['IBIPORÃ',53276],
  ['PRUDENTÓPOLIS',50946],
  ['CAMPINA GRANDE DO SUL',50600],
  ['PALMAS',50238],
  ['PAIÇANDU',48695],
  ['DOIS VIZINHOS',47589],
  ['LAPA',45878]
];
function municipiosPopulationTable(){
  const halfway=Math.ceil(MUNICIPIOS_POPULACAO.length/2);
  const left=MUNICIPIOS_POPULACAO.slice(0,halfway);
  const right=MUNICIPIOS_POPULACAO.slice(halfway);
  const rows=left.map((item,index)=>{
    const other=right[index];
    const leftPrudent=municipiosNormalizeText(item[0]).includes('prudentopolis');
    const rightPrudent=other&&municipiosNormalizeText(other[0]).includes('prudentopolis');
    return `<tr>
      <td class="${leftPrudent?'is-pop-prudent':''}">${esc(item[0])}${leftPrudent?'<em>Seu município</em>':''}</td>
      <td class="municipal-pop-value">${Number(item[1]).toLocaleString('pt-BR')}</td>
      <td class="${rightPrudent?'is-pop-prudent':''}">${other?esc(other[0])+(rightPrudent?'<em>Seu município</em>':''):'—'}</td>
      <td class="municipal-pop-value">${other?Number(other[1]).toLocaleString('pt-BR'):'—'}</td>
    </tr>`;
  }).join('');
  return `<section class="card municipal-pop-card">
    <div class="municipal-pop-head"><div><h2>População dos municípios comparados</h2><p>População utilizada na planilha de referência.</p></div><span>IBGE 2025</span></div>
    <div class="municipal-pop-wrap"><table class="municipal-pop-table"><thead><tr><th>Município</th><th>População</th><th>Município</th><th>População</th></tr></thead><tbody>${rows}</tbody></table></div>
  </section>`;
}

function municipiosOptions(sections,selected){
  const order=['vinculo','familia','bucal','emulti'];
  const groups=order.map(key=>({key,items:sections.map((section,index)=>({...section,index})).filter(section=>section.areaKey===key)})).filter(group=>group.items.length);
  return groups.map(group=>`<optgroup label="${esc(group.items[0].areaLabel)}">${group.items.map(item=>`<option value="${item.index}" ${item.index===selected?'selected':''}>${esc(item.title)}</option>`).join('')}</optgroup>`).join('');
}
function municipiosKpis(section){
  const sorted=municipiosSortedRows(section,{column:6,direction:'desc'});
  const prudentIndex=municipiosFindPrudentopolis(sorted);
  const prudent=prudentIndex>=0?sorted[prudentIndex]:null;
  const best=sorted[0]||null;
  const prudentPct=prudent?municipiosFormatPercent(prudent[6],prudent):'—';
  const prudentTotal=prudent?formatMonthly(prudent[5]):'—';
  return `<div class="municipal-kpis">
    <div class="municipal-kpi"><span>Posição de Prudentópolis</span><strong>${prudentIndex>=0?`${prudentIndex+1}º de ${sorted.length}`:'—'}</strong><small>ranking Bom/Ótimo</small></div>
    <div class="municipal-kpi municipal-kpi-primary"><span>Prudentópolis</span><strong>${prudentPct}</strong><small>equipes em Bom ou Ótimo</small></div>
    <div class="municipal-kpi"><span>Melhor resultado</span><strong class="municipal-kpi-name">${best?esc(best[0]):'—'}</strong><small>${best?municipiosFormatPercent(best[6],best):'sem dados'}</small></div>
    <div class="municipal-kpi"><span>Equipes de Prudentópolis</span><strong>${prudentTotal}</strong><small>total avaliado no indicador</small></div>
  </div>`;
}
function municipiosCount(value,tone){
  return `<span class="municipal-count ${tone}">${formatMonthly(value)}</span>`;
}
function municipiosPerformance(row){
  const pct=municipiosPercent(row[6],row);
  return `<div class="municipal-performance"><strong>${municipiosFormatPercent(row[6],row)}</strong><div class="municipal-track"><span style="width:${Math.max(0,Math.min(100,pct))}%"></span></div></div>`;
}
function municipiosTable(section){
  const sorted=municipiosSortedRows(section);
  const headers=['Município','Regular','Suficiente','Bom','Ótimo','Total','Bom/Ótimo'];
  return `<section class="card municipal-table-card">
    <div class="municipal-table-head">
      <div><span class="municipal-area-badge">${esc(section.areaLabel)}</span><h2>${esc(section.title)}</h2></div>
      <div class="monthly-legend summary-legend municipal-legend"><span><i class="legend-dot previous"></i>Regular</span><span><i class="legend-dot current"></i>Suficiente</span><span><i class="legend-dot bom"></i>Bom</span><span><i class="legend-dot otimo"></i>Ótimo</span></div>
    </div>
    <div class="monthly-table-wrap municipal-table-wrap"><table class="municipal-table"><thead><tr>${headers.map((header,column)=>municipiosSortHeader(header,column)).join('')}</tr></thead><tbody>${sorted.map((row,index)=>{const prudent=municipiosNormalizeText(row[0]).includes('prudentopolis');return `<tr data-municipal-row class="${prudent?'is-prudentopolis':''}"><td class="municipal-name"><span class="municipal-rank">${index+1}º</span><strong>${esc(row[0])}</strong>${prudent?'<em>Seu município</em>':''}</td><td>${municipiosCount(row[1],'regular')}</td><td>${municipiosCount(row[2],'suficiente')}</td><td>${municipiosCount(row[3],'bom')}</td><td>${municipiosCount(row[4],'otimo')}</td><td><span class="municipal-total">${formatMonthly(row[5])}</span></td><td>${municipiosPerformance(row)}</td></tr>`}).join('')}</tbody></table></div>
  </section>`;
}
function municipiosPage(table){
  const sections=municipiosSections(table);
  if(!sections.length) return '<div class="empty card">Não foi possível organizar o comparativo municipal.</div>';
  const selected=Math.min(state.municipalIndicator||0,sections.length-1);
  state.municipalIndicator=selected;
  const section=sections[selected];
  return `<div class="page-title monthly-page-title"><div><div class="eyebrow" style="color:var(--primary)">Resultados</div><h1>Comparativo municipal</h1><div class="page-period-badge">Indicadores do 1º quadrimestre de 2026</div></div></div>
    ${municipiosPopulationTable()}
    <section class="card municipal-controls"><div class="municipal-select-wrap"><label for="municipalIndicator">Indicador</label><select id="municipalIndicator">${municipiosOptions(sections,selected)}</select></div><div class="monthly-search municipal-search"><span>⌕</span><input id="municipalFilter" placeholder="Pesquisar município..." /></div></section>
    ${municipiosTable(section)}`;
}

function classify(v){const n=Number(String(v).replace(',','.'));if(Number.isNaN(n))return '';return toneScale10(n)}
function tablePage(key){const t=state.data.tables[key];if(!t)return'<div class="empty card">Tabela ainda não configurada.</div>';if(key==='mensais')return monthlyPage(t);if(key==='resumo')return resumoPage(t);if(key==='quadrimestre')return quadrimestrePage(t);if(key==='municipios')return municipiosPage(t);const headers=t.headers||[];const rows=t.rows||[];return `<div class="page-title"><div><div class="eyebrow" style="color:var(--primary)">Resultados</div><h1>${esc(t.title||labels[key])}</h1><p>${esc(t.subtitle||'Dados exibidos diretamente da planilha oficial.')}</p></div></div><div class="filterbar"><input id="tableFilter" placeholder="Filtrar unidade ou município..." /></div><div class="card table-card"><table class="data-table"><thead><tr>${headers.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead><tbody id="tableBody">${rows.map(row=>rowHtml(row)).join('')}</tbody></table></div>`}
function rowHtml(row){return `<tr>${row.map((v,i)=>`<td>${i>0&&typeof v==='number'?`<span class="score ${classify(v)}">${String(v).replace('.',',')}</span>`:esc(v)}</td>`).join('')}</tr>`}
function about(){return `<div class="page-title"><div><div class="eyebrow" style="color:var(--primary)">Institucional</div><h1>Sobre o Portal</h1><p>Conheça o objetivo do portal, os responsáveis pelo desenvolvimento e o apoio técnico da Secretaria Municipal de Saúde.</p></div></div>${institutionBlocks()}`}
function searchPage(q){const results=[];Object.entries(state.data.areas||{}).forEach(([k,a])=>(a.indicators||[]).forEach(i=>{const hay=(i.code+' '+i.title+' '+i.content).toLowerCase();if(hay.includes(q.toLowerCase()))results.push({k,i})}));return `<div class="page-title"><div><div class="eyebrow" style="color:var(--primary)">Pesquisa</div><h1>Resultados para “${esc(q)}”</h1><p>${results.length} resultado(s) encontrado(s).</p></div></div><div class="search-results">${results.map(({k,i})=>`<article class="result" data-route="${k}"><small>${esc(labels[k])} • ${esc(i.code)}</small><h3>${esc(i.title)}</h3><p>${esc((i.content||'').slice(0,180))}...</p></article>`).join('')||'<div class="empty card">Nenhum conteúdo encontrado.</div>'}</div>`}
function render(){if(!state.data)return;$('#mainNav').innerHTML=nav();let html=state.query?searchPage(state.query):state.route==='home'?home():['vinculo','familia','bucal','emulti'].includes(state.route)?indicators(state.route):state.route==='sobre'?about():tablePage(state.route);$('#app').innerHTML=html;bind()}
function bind(){document.querySelectorAll('[data-route]').forEach(e=>e.onclick=()=>routeTo(e.dataset.route));document.querySelectorAll('.indicator-button').forEach(b=>b.onclick=()=>{b.parentElement.classList.toggle('open');b.querySelector('.chevron').textContent=b.parentElement.classList.contains('open')?'−':'＋'});document.querySelectorAll('[data-monthly-section]').forEach(button=>button.onclick=()=>{state.monthlySection=Number(button.dataset.monthlySection);state.monthlySort={section:state.monthlySection,column:0,direction:'asc'};render()});const monthlyIndicatorSelect=$('#monthlyIndicatorSelect');if(monthlyIndicatorSelect)monthlyIndicatorSelect.onchange=()=>{state.monthlySection=Number(monthlyIndicatorSelect.value);state.monthlySort={section:state.monthlySection,column:0,direction:'asc'};render()};document.querySelectorAll('[data-monthly-sort]').forEach(button=>button.onclick=()=>{const column=Number(button.dataset.monthlySort);const current=state.monthlySort?.section===state.monthlySection?state.monthlySort:{section:state.monthlySection||0,column:0,direction:'asc'};state.monthlySort=current.column===column?{section:state.monthlySection||0,column,direction:current.direction==='asc'?'desc':'asc'}:{section:state.monthlySection||0,column,direction:column<=1?'asc':'desc'};render()});document.querySelectorAll('[data-resumo-section]').forEach(button=>button.onclick=()=>{state.summarySection=Number(button.dataset.resumoSection);state.summarySort={section:state.summarySection,column:0,direction:'asc'};render()});document.querySelectorAll('[data-summary-sort]').forEach(button=>button.onclick=()=>{const column=Number(button.dataset.summarySort);const current=state.summarySort?.section===state.summarySection?state.summarySort:{section:state.summarySection||0,column:0,direction:'asc'};state.summarySort=current.column===column?{section:state.summarySection||0,column,direction:current.direction==='asc'?'desc':'asc'}:{section:state.summarySection||0,column,direction:column===0?'asc':'desc'};render()});document.querySelectorAll('[data-quadr-group]').forEach(button=>button.onclick=()=>{state.quadrGroup=Number(button.dataset.quadrGroup);state.quadrSort={group:state.quadrGroup,column:0,direction:'asc'};render()});document.querySelectorAll('[data-quadr-sort]').forEach(button=>button.onclick=()=>{const column=Number(button.dataset.quadrSort);const current=state.quadrSort?.group===state.quadrGroup?state.quadrSort:{group:state.quadrGroup||0,column:0,direction:'asc'};state.quadrSort=current.column===column?{group:state.quadrGroup||0,column,direction:current.direction==='asc'?'desc':'asc'}:{group:state.quadrGroup||0,column,direction:column===0?'asc':'desc'};render()});document.querySelectorAll('[data-quadr-detail-group]').forEach(button=>button.onclick=()=>{state.quadrDetail=state.quadrDetail||{};state.quadrDetail[button.dataset.quadrDetailGroup]=button.dataset.quadrDetailOption;render()});document.querySelectorAll('[data-municipal-sort]').forEach(button=>button.onclick=()=>{const column=Number(button.dataset.municipalSort);const current=state.municipalSort||{column:6,direction:'desc'};state.municipalSort=current.column===column?{column,direction:current.direction==='asc'?'desc':'asc'}:{column,direction:column===0?'asc':'desc'};render()});const municipalIndicator=$('#municipalIndicator');if(municipalIndicator)municipalIndicator.onchange=()=>{state.municipalIndicator=Number(municipalIndicator.value);render()};const monthlyFilter=$('#monthlyFilter');if(monthlyFilter)monthlyFilter.oninput=()=>{const q=monthlyFilter.value.toLowerCase();document.querySelectorAll('[data-monthly-row]').forEach(row=>row.style.display=row.textContent.toLowerCase().includes(q)?'':'none')};const summaryFilter=$('#summaryFilter');if(summaryFilter)summaryFilter.oninput=()=>{const q=summaryFilter.value.toLowerCase();document.querySelectorAll('[data-summary-row]').forEach(row=>row.style.display=row.textContent.toLowerCase().includes(q)?'':'none')};const quadrimestreFilter=$('#quadrimestreFilter');if(quadrimestreFilter)quadrimestreFilter.oninput=()=>{const q=quadrimestreFilter.value.toLowerCase();document.querySelectorAll('[data-quadr-row]').forEach(row=>row.style.display=row.textContent.toLowerCase().includes(q)?'':'none')};const municipalFilter=$('#municipalFilter');if(municipalFilter)municipalFilter.oninput=()=>{const q=municipalFilter.value.toLowerCase();document.querySelectorAll('[data-municipal-row]').forEach(row=>row.style.display=row.textContent.toLowerCase().includes(q)?'':'none')};const f=$('#tableFilter');if(f)f.oninput=()=>{const q=f.value.toLowerCase();document.querySelectorAll('#tableBody tr').forEach(r=>r.style.display=r.textContent.toLowerCase().includes(q)?'':'none')}}
$('#menuButton').onclick=()=>$('#sidebar').classList.toggle('open');$('#globalSearch').oninput=e=>{state.query=e.target.value.trim();render()};window.addEventListener('hashchange',()=>{state.route=location.hash.slice(1)||'home';state.query='';$('#globalSearch').value='';render()});state.route=location.hash.slice(1)||'home';load();
