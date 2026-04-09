const SHEET_NAME = 'Results';
const SPREADSHEET_ID = ''; // Nếu script không gắn trực tiếp với Google Sheet, dán Spreadsheet ID vào đây.

function doGet(e) {
  return jsonOutput_({
    ok: true,
    message: 'KEOS Slice webhook is running',
    time: new Date().toISOString(),
    hasSpreadsheet: !!getSpreadsheet_(),
    mode: (e && e.parameter && e.parameter.mode) ? e.parameter.mode : 'health'
  });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const sheet = getOrCreateSheet_();
    ensureHeader_(sheet);

    const p = getPayload_(e);
    sheet.appendRow([
      p.playedAt || new Date().toISOString(),
      sanitizeCell_(p.playerName || p.fullName || ''),
      sanitizeCell_(p.fullName || p.playerName || ''),
      sanitizeCell_(p.email || ''),
      sanitizeCell_(p.phone || ''),
      sanitizeCell_(p.petType || ''),
      Number(p.score || 0),
      Number(p.voucherMilestone || 0),
      sanitizeCell_(String(p.voucherEligible || '')),
      Number(p.pointsToVoucher || 0),
      sanitizeCell_(p.recommendedProductId || ''),
      sanitizeCell_(p.recommendedProductName || ''),
      sanitizeCell_(p.sessionId || ''),
      sanitizeCell_(p.pageUrl || ''),
      sanitizeCell_(p.userAgent || ''),
      sanitizeCell_(p.game || 'keos-slice'),
      new Date()
    ]);

    SpreadsheetApp.flush();
    return jsonOutput_({ ok: true });
  } catch (error) {
    console.error('doPost error:', error);
    return jsonOutput_({ ok: false, error: String(error && error.message ? error.message : error) });
  } finally {
    lock.releaseLock();
  }
}

function getPayload_(e) {
  if (!e) return {};

  if (e.postData && e.postData.contents) {
    const contents = String(e.postData.contents || '');
    const contentType = String(e.postData.type || '').toLowerCase();

    if (contentType.indexOf('application/json') !== -1) {
      try {
        return JSON.parse(contents);
      } catch (error) {
        console.warn('JSON parse failed, fallback to parameters');
      }
    }
  }

  return e.parameter || {};
}

function getSpreadsheet_() {
  if (SPREADSHEET_ID) {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  }

  const active = SpreadsheetApp.getActiveSpreadsheet();
  if (active) return active;

  throw new Error('Không tìm thấy Google Sheet. Hãy gắn script vào Sheet hoặc dán SPREADSHEET_ID.');
}

function getOrCreateSheet_() {
  const ss = getSpreadsheet_();
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}

function ensureHeader_(sheet) {
  if (sheet.getLastRow() > 0) return;

  sheet.appendRow([
    'playedAt',
    'playerName',
    'fullName',
    'email',
    'phone',
    'petType',
    'score',
    'voucherMilestone',
    'voucherEligible',
    'pointsToVoucher',
    'recommendedProductId',
    'recommendedProductName',
    'sessionId',
    'pageUrl',
    'userAgent',
    'game',
    'savedAt'
  ]);
}

function sanitizeCell_(value) {
  const text = String(value || '').trim();
  if (/^[=+\-@]/.test(text)) {
    return "'" + text;
  }
  return text;
}

function jsonOutput_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
