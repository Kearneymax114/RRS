function getInterviewEmailTemplate(firstName) {
  return `<div style="font-family: Roboto, sans-serif;">
    Hi ${firstName},<br><br>
    My name is Max, and I'm the hiring manager for Package Delivery Express. Thank you for applying for the FedEx Ground Delivery Driver position.<br><br>
    We've reviewed your application and would like to invite you to an in-person interview with our company owner, Fluvio. Please use the link below to schedule a meeting time:<br><br>
    <strong>${EMAIL_CONFIG.CALENDLY_LINK}</strong><br><br>
    <strong>Important:</strong> The website contains essential details on the <strong>left-hand side</strong>, including the interview location and a contact number for Fluvio. Please make sure to review this information carefully.<br><br>
    Congratulations on moving forward in the process! We look forward to meeting you.<br><br>
    Best regards,<br>
    <strong>Max</strong><br>
    Hiring Manager | Package Delivery Express
    </div>`;
}

function getRejectionEmailTemplate(firstName) {
  return `<div style="font-family: Roboto, sans-serif;">
    Hi ${firstName},<br><br>
    Thank you for your interest in the FedEx Ground Delivery Driver position at Package Delivery Express and for taking the time to apply.<br><br>
    After careful consideration of your application, we regret to inform you that we have decided to move forward with other candidates whose qualifications more closely match our current needs.<br><br>
    We appreciate your interest in joining our team and wish you the best in your job search.<br><br>
    Best regards,<br>
    <strong>Max</strong><br>
    Hiring Manager | Package Delivery Express
    </div>`;
} 