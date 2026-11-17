const SPREADSHEET_ID = '1i19smJ_9t0jPhvR6i2fXx4BBbxOKQeDpEL277sEl48w';

function doGet() {
  const payload = buildPortalData_();
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function buildPortalData_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const areas = {
    vinculo: parseIndicatorSheet_(ss.getSheetByName('Vínc.e Acompanhamento')),
    familia: parseIndicatorSheet_(ss.getSheetByName('S. da Família')),
    bucal: parseIndicatorSheet_(ss.getSheetByName('S. Bucal')),
    emulti: parseIndicatorSheet_(ss.getSheetByName('eMulti'))
  };

  return {
    updatedAt: Utilities.formatDate(new Date(), Session.getScriptTimeZone() || 'America/Sao_Paulo', 'dd/MM/yyyy HH:mm'),
    about: firstLongText_(ss.getSheetByName('Sobre')),
    areas,
    tables: {
      mensais: parseTableSheet_(ss.getSheetByName('Notas Mensais'), 'Notas mensais'),
      resumo: parseTableSheet_(ss.getSheetByName('Notas - RESUMO'), 'Resumo das notas'),
      quadrimestre: parseQuadrimestreSheet_(ss.getSheetByName('Avaliação Quadrimestre ') || ss.getSheetByName('Avaliação Quadrimestre'), 'Avaliação quadrimestral'),
      municipios: parseMunicipiosSheet_(ss.getSheetByName('Comparativo - Municípios '), 'Comparativo entre municípios')
    }
  };
}

function parseIndicatorSheet_(sheet) {
  if (!sheet) return { title:'', intro:'', indicators:[] };
  const values = sheet.getDataRange().getDisplayValues();
  const title = firstText_(values[0]) || sheet.getName();
  const intro = firstText_(values[1]);
  const indicators = [];
  const codePattern = /^(A|B|C|M)\d+(\.\d+)?$/i;

  for (let r = 2; r < values.length; r++) {
    const row = values[r];
    const codeIndex = row.findIndex(v => codePattern.test(String(v).trim()));
    if (codeIndex === -1) continue;
    const code = String(row[codeIndex]).trim();
    const titleText = row.slice(codeIndex + 1).find(v => String(v).trim()) || code;
    const blocks = [];
    for (let rr = r + 1; rr < values.length; rr++) {
      const next = values[rr];
      if (next.some(v => codePattern.test(String(v).trim()))) break;
      next.forEach(v => { if (String(v).trim()) blocks.push(String(v).trim()); });
    }
    indicators.push({ code, title: titleText, content: unique_(blocks).join('\n\n') });
  }
  return { title, intro, summary:intro ? intro.split('\n')[0] : '', indicators };
}

function parseTableSheet_(sheet, fallbackTitle) {
  if (!sheet) return { title:fallbackTitle, headers:[], rows:[] };
  const values = sheet.getDataRange().getDisplayValues();
  const title = firstText_(values[0]) || fallbackTitle;
  let headerRow = -1;
  for (let r = 0; r < Math.min(values.length, 30); r++) {
    const filled = values[r].filter(v => String(v).trim()).length;
    if (filled >= 2 && /(unidade|estabelecimento|município)/i.test(values[r].join(' '))) { headerRow = r; break; }
  }
  if (headerRow === -1) headerRow = values.findIndex(r => r.filter(v => String(v).trim()).length >= 3);
  const width = lastFilledIndex_(values[headerRow]) + 1;
  const headers = values[headerRow].slice(0, width).map((v,i)=>v || `Coluna ${i+1}`);
  const rows = [];
  for (let r = headerRow + 1; r < values.length; r++) {
    const row = values[r].slice(0, width);
    if (!row.some(v => String(v).trim())) continue;
    if (!String(row[0]).trim()) continue;
    rows.push(row.map(parseNumber_));
  }
  return { title, subtitle:'Dados atualizados pela planilha oficial.', headers, rows };
}


function parseQuadrimestreSheet_(sheet, fallbackTitle) {
  if (!sheet) return { title:fallbackTitle, subtitle:'', headers:[], rows:[] };
  const values = sheet.getDataRange().getDisplayValues();
  const title = firstText_(values[0]) || fallbackTitle;
  const rows = [];

  // Mantém também as linhas em que a primeira coluna está vazia.
  // Isso é necessário porque as unidades das tabelas detalhadas usam células mescladas.
  for (let r = 3; r < values.length; r++) {
    const row = values[r].slice(0, 4);
    if (!row.some(v => String(v).trim())) continue;
    rows.push(row.map(parseNumber_));
  }

  return {
    title,
    subtitle:'Indicadores do 1º quadrimestre de 2026.',
    headers:['Estabelecimento','Cadastro','Acompanhamento','Nota Final'],
    rows
  };
}


function parseMunicipiosSheet_(sheet, fallbackTitle) {
  if (!sheet) return { title:fallbackTitle, headers:[], rows:[] };
  const values = sheet.getDataRange().getDisplayValues();
  const title = firstText_(values[0]) || fallbackTitle;
  const rows = [];
  for (let r = 16; r < values.length; r++) {
    const row = values[r].slice(0, 7);
    if (!row.some(v => String(v).trim())) continue;
    if (!String(row[0]).trim()) continue;
    rows.push(row.map(parseNumber_));
  }
  return {
    title,
    subtitle:'Distribuição das equipes por classificação em cada indicador.',
    headers:['Município','Regular','Suficiente','Bom','Ótimo','Total','% Bom/Ótimo'],
    rows
  };
}

function firstLongText_(sheet) {
  if (!sheet) return '';
  const vals = sheet.getDataRange().getDisplayValues().flat().filter(v => String(v).trim());
  return vals.sort((a,b)=>String(b).length-String(a).length)[0] || '';
}
function firstText_(row) { return (row || []).find(v => String(v).trim()) || ''; }
function lastFilledIndex_(row) { for (let i=row.length-1;i>=0;i--) if(String(row[i]).trim()) return i; return 0; }
function unique_(arr) { return [...new Set(arr)]; }
function parseNumber_(v) { const s=String(v).trim(); if(/^[-+]?\d+[.,]?\d*%?$/.test(s)){const pct=s.endsWith('%');const n=Number(s.replace('%','').replace(',','.'));return pct?n:n;} return v; }
