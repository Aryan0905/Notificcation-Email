# Appointment Reminder System

## Overview

The Appointment Reminder System is a web application that allows users to book appointments and receive email reminders before their scheduled appointments. Users can log in, manage their appointments, and get notified via email about upcoming appointments.

## Features

- **User Authentication**: Users can log in and out of the system.
- **Appointment Booking**: Users can book appointments by selecting a date and time.
- **Email Notifications**: Users receive email reminders 2 hours before their scheduled appointments.
- **Role Management**: Users can have different roles (e.g., patient, doctor).
  
## Technologies Used

- **Frontend**: 
  - React
  - Axios for API calls
  - React Router for routing

- **Backend**: 
  - Node.js
  - Express.js
  - MongoDB for database management
  - Redis for job queuing (email notifications)
  
- **Email Service**: 
  - Nodemailer for sending emails through SMTP (Gmail)

## Installation

### Prerequisites

- Node.js (v14 or above)
- MongoDB (for database)
- Redis (for job queue)

### Clone the Repository

```bash
git clone https://github.com/Aryan0905/Notification-Email.git
cd Notification-Email


.env file shoud contain
SECRET_KEY=your_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password


For starting surver 
Backend:- cd backend -> npm run dev

Frontend:- cd appointment-reminder-frontend -> npm start




