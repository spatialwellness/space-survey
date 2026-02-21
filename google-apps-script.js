// INSTRUCTIES:
// 1. Ga naar https://sheets.google.com en maak een nieuw spreadsheet aan
// 2. Noem het "Space Survey Responses"
// 3. Ga naar Extensions > Apps Script
// 4. Plak deze code en vervang alles wat er staat
// 5. Klik Deploy > New deployment > Web app
// 6. Execute as: Me, Who has access: Anyone
// 7. Klik Deploy en kopieer de URL
// 8. Geef de URL aan Sage

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  var answers = data.answers || {};
  
  // Als eerste rij leeg is, maak headers
  if (sheet.getLastRow() === 0) {
    var headers = ["Timestamp", "Code"];
    // Voeg alle mogelijke vraag-kolommen toe
    for (var i = 1; i <= 15; i++) {
      headers.push("q" + i);
      headers.push("q" + i + "_comment");
    }
    headers.push("q5_checkbox");
    headers.push("q16_open");
    headers.push("q17_open");
    headers.push("q18_open");
    sheet.appendRow(headers);
  }
  
  var row = [
    data.submittedAt || new Date().toISOString(),
    answers.code || ""
  ];
  
  for (var i = 1; i <= 15; i++) {
    row.push(answers["q" + i] || "");
    row.push(answers["q" + i + "_comment"] || "");
  }
  row.push(answers.q5 || "");
  row.push(answers.q16_open || "");
  row.push(answers.q17_open || "");
  row.push(answers.q18_open || "");
  
  sheet.appendRow(row);
  
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
