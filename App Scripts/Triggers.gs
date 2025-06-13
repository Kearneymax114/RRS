function createEmailTrigger() {
  // Delete any existing triggers
  var existingTriggers = ScriptApp.getProjectTriggers();
  existingTriggers.forEach(function(trigger) {
    if (trigger.getHandlerFunction() === 'checkAndSendEmails') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  
  // Create a new trigger that runs every 30 minutes
  ScriptApp.newTrigger('checkAndSendEmails')
    .timeBased()
    .everyMinutes(30)
    .create();
    
  SpreadsheetApp.getActiveSpreadsheet().toast('Email automation trigger created successfully', 'Success');
}

function manualEmailCheck() {
  try {
    checkAndSendEmails();
    SpreadsheetApp.getActiveSpreadsheet().toast('Manual email check completed', 'Success');
  } catch (error) {
    SpreadsheetApp.getActiveSpreadsheet().toast('Error: ' + error.toString(), 'Error');
  }
}

function createFormTrigger() {
  // Delete any existing triggers for onFormSubmit
  var existingTriggers = ScriptApp.getProjectTriggers();
  existingTriggers.forEach(function(trigger) {
    if (trigger.getHandlerFunction() === 'onFormSubmit') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  
  // Create new trigger specifically for form submissions
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ScriptApp.newTrigger('onFormSubmit')
    .forSpreadsheet(ss)
    .onFormSubmit()
    .create();
    
  SpreadsheetApp.getActiveSpreadsheet().toast('Form submission trigger created successfully', 'Success');
}

function createNewEntryTrigger() {
  // Delete any existing triggers
  var existingTriggers = ScriptApp.getProjectTriggers();
  existingTriggers.forEach(function(trigger) {
    if (trigger.getHandlerFunction() === 'checkForNewEntries') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  
  // Create new trigger to run every 5 minutes
  ScriptApp.newTrigger('checkForNewEntries')
    .timeBased()
    .everyMinutes(5)
    .create();
    
  SpreadsheetApp.getActiveSpreadsheet().toast('New entry check trigger created successfully', 'Success');
}

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Applicant Actions')
      .addItem('Send Pending Emails Now', 'manualEmailCheck')
      .addSeparator()
      .addItem('Setup New Entry Trigger', 'createNewEntryTrigger')
      .addItem('Setup Email Trigger', 'createEmailTrigger')
      .addToUi();
} 