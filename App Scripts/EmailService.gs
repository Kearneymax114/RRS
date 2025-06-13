function sendInterviewEmail(email, firstName) {
  GmailApp.sendEmail(
    email,
    EMAIL_CONFIG.INTERVIEW_SUBJECT,
    '', // Plain text body (required but we'll use HTML)
    {
      name: EMAIL_CONFIG.SENDER_NAME,
      htmlBody: getInterviewEmailTemplate(firstName)
    }
  );
}

function sendRejectionEmail(email, firstName) {
  GmailApp.sendEmail(
    email,
    EMAIL_CONFIG.REJECTION_SUBJECT,
    '', // Plain text body (required but we'll use HTML)
    {
      name: EMAIL_CONFIG.SENDER_NAME,
      htmlBody: getRejectionEmailTemplate(firstName)
    }
  );
}

function checkAndSendEmails() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAMES.CANDIDATE_LIST);
  
  // Get all data
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  
  // Find required column indexes
  var statusIndex = headers.indexOf('status');
  var emailIndex = headers.indexOf('email');
  var firstNameIndex = headers.indexOf('first_name');
  var lastNameIndex = headers.indexOf('last_name');
  var rejectionSentIndex = headers.indexOf('rejection_email_sent');
  var rejectionSentTimestampIndex = headers.indexOf('rejection_email_sent_timestamp');
  var interviewSentIndex = headers.indexOf('interview_email_sent');
  var interviewSentTimestampIndex = headers.indexOf('interview_email_sent_timestamp');
  
  // Process each row starting from row 2 (skip headers)
  for (var i = 1; i < data.length; i++) {
    processRow(sheet, data[i], i, {
      statusIndex,
      emailIndex,
      firstNameIndex,
      lastNameIndex,
      rejectionSentIndex,
      rejectionSentTimestampIndex,
      interviewSentIndex,
      interviewSentTimestampIndex
    });
  }
}

function processRow(sheet, row, rowIndex, indices) {
  var status = row[indices.statusIndex];
  var email = row[indices.emailIndex];
  var firstName = row[indices.firstNameIndex];
  var lastName = row[indices.lastNameIndex];
  var rejectionSent = row[indices.rejectionSentIndex];
  var interviewSent = row[indices.interviewSentIndex];
  
  if (!email || !firstName) return; // Skip if no email or name
  
  var rowNumber = rowIndex + 1;
  
  try {
    // Handle rejection emails
    if (status === 'reject' && !rejectionSent) {
      sendRejectionEmail(email, firstName);
      updateEmailStatus(sheet, rowNumber, indices.rejectionSentIndex, indices.rejectionSentTimestampIndex);
      Logger.log(`Sent rejection email to: ${firstName} ${lastName} at ${email}`);
    }
    
    // Handle interview invitation emails
    if (status === 'invite to interview' && !interviewSent) {
      sendInterviewEmail(email, firstName);
      updateEmailStatus(sheet, rowNumber, indices.interviewSentIndex, indices.interviewSentTimestampIndex);
      sheet.getRange(rowNumber, indices.statusIndex + 1).setValue('invited to interview');
      Logger.log(`Sent interview invitation to: ${firstName} ${lastName} at ${email}`);
    }
  } catch (error) {
    Logger.log(`Error processing ${email}: ${error.toString()}`);
  }
}

function updateEmailStatus(sheet, rowNumber, sentIndex, timestampIndex) {
  sheet.getRange(rowNumber, sentIndex + 1).setValue(true);
  sheet.getRange(rowNumber, timestampIndex + 1)
       .setValue(new Date())
       .setNumberFormat('M/d/yyyy h:mm:ss AM/PM');
} 