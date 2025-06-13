// Configuration constants
const SHEET_NAMES = {
  RAW_FORM: 'RRS Driver Application Form',
  CANDIDATE_LIST: 'Editable Candidate List'
};

const EMAIL_CONFIG = {
  SENDER_NAME: 'Max @ Package Delivery Express',
  INTERVIEW_SUBJECT: 'Invitation to Interview – FedEx Ground Delivery Driver Position',
  REJECTION_SUBJECT: 'Update Regarding Your FedEx Ground Delivery Driver Application',
  CALENDLY_LINK: 'https://calendly.com/fluviomarin/pde'
};

const STATUS_VALUES = [
  'new',
  'invite to interview',
  'reject',
  'invited to interview',
  'interview booked',
  'attended interview',
  'missed interview',
  'hired',
  'archived'
];

const COPY_SHEET_COLUMNS = {
  // ... your existing form response columns ...
  
  // Add these new columns
  status: "Status",
  interview_date: "Interview Date",
  interview_time: "Interview Time",
  last_updated: "Last Updated",
  rejection_email_sent: "Rejection Email Sent",
  rejection_email_sent_timestamp: "Rejection Email Sent Timestamp",
  interview_email_sent: "Interview Email Sent",
  interview_email_sent_timestamp: "Interview Email Sent Timestamp",
  candidate_id: "Candidate ID",
  notes: "Notes"
}; 