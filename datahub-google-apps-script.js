// For storing config exclusive to this spreadsheet
var documentProperties = PropertiesService.getDocumentProperties();

// Register datahub menu
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Datahub')
      .addItem('Publish latest version of data', 'exportJson')
      .addSubMenu(ui.createMenu('Configuration')
          .addItem('Set Configuration', 'setConfig')
          .addItem('View Configuration', 'viewConfig'))
      .addToUi();
}

// Walk user through the process of setting config
function setConfig() {
  var ui = SpreadsheetApp.getUi();
  var result1 = ui.prompt(
      'Step 1 of 4',
      'AWS Access Key:',
      ui.ButtonSet.OK_CANCEL);

  var button1 = result1.getSelectedButton();
  var text1 = result1.getResponseText();

  if (button1 == ui.Button.OK && text1 !== "") {
    documentProperties.setProperty('AWS_ACCESS_KEY', text1);
  } else {
    incompleteSetup();
  }

  var result2 = ui.prompt(
      'Step 2 of 4',
      'AWS Secret Key:',
      ui.ButtonSet.OK_CANCEL);

  var button2 = result2.getSelectedButton();
  var text2 = result2.getResponseText();

  if (button2 == ui.Button.OK && text2 !== "") {
    documentProperties.setProperty('AWS_SECRET_KEY', text2);
  } else {
    incompleteSetup();
  }

  var result3 = ui.prompt(
      'Step 3 of 4',
      'AWS Bucket:',
      ui.ButtonSet.OK_CANCEL);

  var button3 = result3.getSelectedButton();
  var text3 = result3.getResponseText();

  if (button3 == ui.Button.OK && text3 !== "") {
    documentProperties.setProperty('AWS_BUCKET', text3);
  } else {
    incompleteSetup();
  }

  var result4 = ui.prompt(
      'Step 4 of 4',
      'Project path:',
      ui.ButtonSet.OK_CANCEL);

  var button4 = result4.getSelectedButton();
  var text4 = result4.getResponseText();

  if (button4 == ui.Button.OK && text4 !== "") {
    documentProperties.setProperty('PROJECT_PATH', text4);
  } else {
    incompleteSetup();
  }

}

// view configutation
function viewConfig() {
  var ui = SpreadsheetApp.getUi();
  ui.alert("AWS Access Key: " + documentProperties.getProperty('AWS_ACCESS_KEY') + "\n"
      + "AWS Secret Key: " + documentProperties.getProperty('AWS_SECRET_KEY') + "\n"
      + "AWS Bucket: " + documentProperties.getProperty('AWS_BUCKET') + "\n"
      + "Project Path: " + documentProperties.getProperty('PROJECT_PATH')
  );
}

// debug configuration fields
function incompleteSetup() {
  var ui = SpreadsheetApp.getUi();
  ui.alert('Configuration is incomplete, please restart the process. \n'
      + "AWS Access Key: " + documentProperties.getProperty('AWS_ACCESS_KEY') + "\n"
      + "AWS Secret Key: " + documentProperties.getProperty('AWS_SECRET_KEY') + "\n"
      + "AWS Bucket: " + documentProperties.getProperty('AWS_BUCKET') + "\n"
      + "Project Path: " + documentProperties.getProperty('PROJECT_PATH')
  );
}

function exportJson() {

  var endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  }

  var sheet = SpreadsheetApp.getActiveSheet();
  var sheetNameAKAdayNum = sheet.getName().substr(3,3).trim();
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var numCols = rows.getNumColumns();
  var values = rows.getValues();
  var header = values[0];

  var output = [];
  
  for (var i = 1; i < numRows; i++) {
    var row = values[i];
    var tempObj = {};
    for (var j = 0; j < numCols; j++) {
      if (row[j]) {
        var val = row[j];
        if (header[j] === 'headliner') {
          if (val.toLowerCase() === 'yes') {
            val = true;
          } else {
            val = false;
          }
        }
        if (header[j] === 'local') {
          if (val.toLowerCase() === 'local') {
            val = true;
          } else {
            val = false;
          }
        }
        if (header[j] === 'stage' || header[j] === 'genre') {
          val = val.trim();
        }
        tempObj[header[j]] = val;
      }
    }
    output.push(tempObj);
  }

  var ts = new Date().toString();
  
  output.sort(function(a,b){
    if (a.date_time < b.date_time) {
      return -1;
    }
    if (a.date_time > b.date_time) {
      return 1;
    }
    return 0;
  });
  
  var final = {
    data: output,
    timestamp: ts
  };

  var finalJSON = JSON.stringify(final);

  //Logger.log(finalJSON);
  saveToS3(finalJSON, sheetNameAKAdayNum);
}

// push to S3 bucket
function saveToS3(blob, dayNum) {
  // see S3 script imported a library
  // https://script.google.com/macros/d/1qFTTCLzjrDqYYUNRIvjZ4LmlySSGr6v0SGlDIajy1wvQPaNvjm5hkMEk/edit
  var awsAccessKey = documentProperties.getProperty('AWS_ACCESS_KEY');
  var awsSecretKey = documentProperties.getProperty('AWS_SECRET_KEY');
  var bucket = documentProperties.getProperty('AWS_BUCKET');
  var projectPath = documentProperties.getProperty('PROJECT_PATH') + '/schedule-' + dayNum + '.json';

  var s3 = S3.getInstance(awsAccessKey, awsSecretKey);
  s3.putObject(bucket, projectPath, blob, {logRequests:false});
}

// returns timestamp in human read-able format
function timeStamp() {
  var now = new Date();
  var date = [ now.getMonth() + 1, now.getDate() ];
  var time = [ now.getHours(), now.getMinutes()];
  var suffix = ( time[0] < 12 ) ? "am" : "pm";
  time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
  time[0] = time[0] || 12;
  for ( var i = 1; i < 2; i++ ) {
    if ( time[i] < 10 ) {
      time[i] = "0" + time[i];
    }
  }
  return date.join("/") + " at " + time.join(":") + " " + suffix;
}

function getStagesAndGenres(){
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  var stages = [];
  var genres = [];
  for(var i = 0; i < sheets.length; i++) {
    var sheet = sheets[i];
    var rows = sheet.getDataRange();
    var numRows = rows.getNumRows();
    var numCols = rows.getNumColumns();
    var values = rows.getValues();
    var header = values[0];
  
    for (var i = 1; i < numRows; i++) {
      var row = values[i];
      for (var j = 0; j < numCols; j++) {
        if (row[j]) {
          var val = row[j];
          if (header[j] === 'stage') {
            if (stages.indexOf(val) === -1) {
              stages.push(val.trim());
            }
          }
          if (header[j] === 'genre') {
            if (genres.indexOf(val) === -1) {
              genres.push(val.trim());
            }
          }
        }
      }
    }
  }
  var ts = new Date().toString();
  var final = {
    stages: stages,
    genres: genres,
    timestamp: ts
  };
  var finalJSON = JSON.stringify(final);
  
  //Logger.log(finalJSON);
  saveToS3(finalJSON, 'meta');
}

function getMediaFilename(d, artist) {
  var monthNames = ["January", "February", "March", "April", "May", "JUNE", "JULY", "August", "September", "October", "November", "December"];
  var filename = monthNames[d.getMonth()] + ' ' + d.getDate() + ' ' + artist.toUpperCase() + '.JPG';
  return filename.replace(/ /g, '%20');
}
