const SHEET_NAME = 'Results';

function doPost(e) {
  const sheet = getOrCreateSheet_();
  ensureHeader_(sheet);

  const p = (e && e.parameter) ? e.parameter : {};
  sheet.appendRow([
    p.playedAt || new Date().toISOString(),
    sanitizeCell_(p.playerName || ''),
    sanitizeCell_(p.petType || ''),
    Number(p.score || 0),
    sanitizeCell_(p.recommendedProductId || ''),
    sanitizeCell_(p.recommendedProductName || ''),
    sanitizeCell_(p.sessionId || ''),
    sanitizeCell_(p.userAgent || ''),
    sanitizeCell_(p.game || 'keos-slice')
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}

function ensureHeader_(sheet) {
  if (sheet.getLastRow() > 0) return;
  sheet.appendRow([
    'playedAt',
    'playerName',
    'petType',
    'score',
    'recommendedProductId',
    'recommendedProductName',
    'sessionId',
    'userAgent',
    'game'
  ]);
}

function sanitizeCell_(value) {
  const text = String(value || '');
  if (/^[=+\-@]/.test(text)) {
    return "'" + text;
  }
  return text;
}
