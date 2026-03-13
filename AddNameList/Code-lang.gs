var sheetName = "Guests";

function getSheet(){
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
}

function getGuestList(){

  var sheet = getSheet();

  var data = sheet.getRange(2,1,sheet.getLastRow()).getValues();

  return data.flat().filter(String);
}

function addGuest(name){

  var sheet = getSheet();

  sheet.appendRow([name]);
}

function deleteGuest(name){

  var sheet = getSheet();

  var data = sheet.getDataRange().getValues();

  for(var i=0;i<data.length;i++){

    if(data[i][0] == name){

      sheet.deleteRow(i+1);

      break;
    }

  }

}