function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('ระบบเช็คชื่อแขก')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// ฟังก์ชันดึงรายชื่อทั้งหมดจาก Google Sheets
function getGuestList() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Guests');
  // ดึงข้อมูลตั้งแต่แถวที่ 2 ลงไป (ไม่เอาหัวข้อ A1)
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return []; // ถ้าไม่มีข้อมูลเลย
  
  var data = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  return data.map(function(r) { return r[0]; }); // แปลง Array 2 มิติเป็น 1 มิติ
}

// ฟังก์ชันเพิ่มรายชื่อ
function addGuest(name) {
  if (!name) return "กรุณากรอกชื่อ";
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Guests');
  sheet.appendRow([name]); // เพิ่มต่อท้าย
  return "เพิ่มสำเร็จ";
}

// ฟังก์ชันลบรายชื่อ
function deleteGuest(name) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Guests');
  var data = sheet.getDataRange().getValues();
  
  // วนลูปหาชื่อแล้วลบ (ลบเฉพาะชื่อแรกที่เจอ)
  for (var i = 0; i < data.length; i++) {
    if (data[i][0] == name) {
      sheet.deleteRow(i + 1); // ลบแถวนั้น
      return "ลบสำเร็จ";
    }
  }
  return "ไม่พบรายชื่อ";
}