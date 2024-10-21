import transporter from '../config/mailer.js'; 
import notificationQueue from '../config/queue.js'; 
import dotenv from 'dotenv';

dotenv.config(); 

console.log("I am in notificationJob.js");


notificationQueue.process('sendEmailNotification', async (job) => {
  console.log(`Processing job with ID: ${job.id}`); 

  const { email, appointmentDateTime } = job.data; 
  const appointmentTimeString = new Date(appointmentDateTime).toLocaleString(); 

  // Set up mail options
  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to: email, 
    subject: 'Appointment Reminder', 
    text: `This is a reminder that you have an appointment scheduled on ${appointmentTimeString}. Please be on time.`, 
  };

  console.log("Mail options are:", mailOptions); 

 
  try {
    await transporter.sendMail(mailOptions); 
    console.log(`Reminder email sent to ${email} for appointment on ${appointmentTimeString}`); 
  } catch (error) {
    console.error('Error sending email:', error); 
  }
});


notificationQueue.on('completed', (job) => {
  console.log(`Job with ID ${job.id} has been completed!`); 
});

notificationQueue.on('failed', (job, err) => {
  console.error(`Job with ID ${job.id} has failed: ${err.message}`); 
});
