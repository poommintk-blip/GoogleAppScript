function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('ระบบเช็คชื่อนักเรียน')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getStudentByClass(level, room) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Students');
  var data = sheet.getDataRange().getValues();
  var students = [];
  
  // วนลูปหาชื่อคนที่อยู่ชั้นและห้องที่เลือก
  for (var i = 1; i < data.length; i++) {
    if (data[i][1] == level && data[i][2] == room) {
      students.push(data[i][0]); // เก็บชื่อ
    }
  }
  return students;
}

function saveAttendance(recordData) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Records');
  // recordData จะส่งมาเป็น object {date, level, room, reporter, list: []}
  
  var date = recordData.date;
  var level = recordData.level;
  var room = recordData.room;
  var reporter = recordData.reporter;
  

  recordData.list.forEach(function(item) {
    sheet.appendRow([date, level, room, item.name, item.status, reporter]);
  });
  
  return "บันทึกข้อมูลเรียบร้อย!";
}