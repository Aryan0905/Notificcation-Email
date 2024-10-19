import transporter from '../config/mailer.js';
import notificationQueue from '../config/queue.js';

dotenv.config();

notificationQueue.process('sendEmailNotification', async (job) => {
  const { email, appointmentDateTime } = job.data;

  const appointmentTimeString = new Date(appointmentDateTime).toLocaleString();

  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to: email,
    subject: 'Appointment Reminder',
    text: `This is a reminder that you have an appointment scheduled on ${appointmentTimeString}. Please be on time.`,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Reminder email sent to ${email} for appointment on ${appointmentTimeString}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
});
