/**
 * Synapse website -> Google Sheet.
 * Receives each doubt from the Contact Us form and adds it as a new row on a sheet called "Doubts".
 * Setup steps are in README.md next to this file.
 */

// OPTIONAL but recommended: put any long random text here, then add  ?token=THAT_TEXT  to the end of the
// DOUBTS_WEBHOOK_URL. Requests without the right token are rejected. Leave empty to skip the check.
const SHARED_SECRET = "";

const SHEET_NAME = "Doubts";
const HEADERS = ["Received", "Name", "Email", "Topic", "Message", "Status"];

function doPost(e) {
  try {
    if (SHARED_SECRET && (!e.parameter || e.parameter.token !== SHARED_SECRET)) {
      return reply_({ ok: false, error: "unauthorized" });
    }

    const data = JSON.parse(e.postData.contents);
    const lock = LockService.getScriptLock(); // stops two doubts arriving together from overwriting each other
    lock.waitLock(10000);
    try {
      getSheet_().appendRow([
        new Date(),
        clean_(data.name),
        clean_(data.email),
        clean_(data.topic),
        clean_(data.message),
        "New", // change to "Answered" by hand once someone has replied
      ]);
    } finally {
      lock.releaseLock();
    }
    return reply_({ ok: true });
  } catch (err) {
    return reply_({ ok: false, error: String(err) });
  }
}

// Visiting the web app URL in a browser shows this line, so you can check it is deployed.
function doGet() {
  return ContentService.createTextOutput("Synapse doubts endpoint is running.");
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
  return sheet;
}

// A cell that starts with = + - or @ would be run as a formula by Sheets. Visitors control this text, so
// prefix such values with an apostrophe to keep them as plain text.
function clean_(value) {
  const text = String(value == null ? "" : value).slice(0, 2500);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function reply_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
