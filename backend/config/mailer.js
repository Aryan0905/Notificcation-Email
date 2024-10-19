import nodemailer from 'nodemailer';

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like SMTP
  auth: {
    user: process.env.EMAIL_USER,  // Your email from .env
    pass: process.env.EMAIL_PASS,  // Your email password from .env
  },
});

export default transporter;
