# Appointment Reminder System

## Overview

This project is a Notification System backend built with **Node.js**, **Express**, **JavaScript**, **Redis**, and **BullMQ**. It provides a set of API endpoints for user registration, subscription management, and sending notifications asynchronously using a queue system. Notifications can be sent via email.

---

## Prerequisites

Before setting up the project, ensure you have the following installed on your machine:

- **Node.js** (v14.x or later)
- **npm** (v6.x or later)
- **MongoDB** (v12.x or later)
- **Redis** (v5.x or later)
- **Git** (optional, for cloning the repository)

---

## Project Directory Structure

Here's the structure of the project directory:
```bash
appointment-reminder-system/
│
├── backend/
│   ├── config/
│   │   ├── db.js                   # MongoDB connection
│   │   ├── queue.js                # Redis/BullMQ setup
│   │
│   ├── controllers/
│   │   ├── appointment.controller.js  # Appointment controller
│   │   ├── user.controller.js         # User controller (login, signup, logout)
│   │
│   ├── jobs/
│   │   ├── notificationJob.js       # Job processing for notifications
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT authentication middleware
│   │
│   ├── models/
│   │   ├── appointment.model.js     # Appointment model (MongoDB schema)
│   │   ├── user.model.js            # User model (MongoDB schema)
│   │
│   ├── routes/
│   │   ├── appointment.routes.js    # Appointment-related routes
│   │   ├── user.routes.js           # User-related routes (signup, login, logout)
│   │
│   ├── utils/
│   │   ├── emailService.js          # Utility for sending email notifications
│   │
│   ├── .env                         # Environment variables
│   ├── server.js                    # Main server file
│   ├── package.json                 # Backend dependencies
│
├── frontend/
│   ├── public/
│   │   ├── index.html               # HTML file for React app
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js             # Login component
│   │   │   ├── Home.js              # Home component for booking
│   │   │   ├── PrivateRoute.js      # Private route component for authenticated pages
│   │   │
│   │   ├── App.js                   # Main React component
│   │   ├── index.js                 # React DOM rendering
│   │   ├── api/                     # API calls
│   │   │   ├── auth.js              # Authentication-related API calls
│   │   │   ├── appointments.js      # Appointment-related API calls
│   │
│   ├── .env                         # Frontend environment variables
│   ├── package.json                 # Frontend dependencies
│
├── README.md                        # Project documentation
├── .gitignore                       # Git ignore file

```

---

## Setup Instructions

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/appointment-reminder-system.git
cd appointment-reminder-system

```

### 2.Install Dependencies

Install the required npm packages:

```bash
cd backend
npm install

cd frontend
npm install

```
### 3.Setup MongoDB

* Install MongoDB.
* Start the MongoDB server on your local machine.
* Create a database called appointment_system:
```bash
use appointment_system

```

### 4.Configure Redis

* Install Redis on your machine.
* Make sure the Redis server is running. Use the following configuration for your Redis instance
```bash
REDIS_HOST=localhost
REDIS_PORT=6379


```

### 5.Configure Environment Variables

Create a .env file in the root directory of your project and add the following environment variables:+

```bash

PORT=4001
JWT_SECRET=your_jwt_secret
MONGODB_URL=mongodb://localhost:27017/appointment_system
REDIS_HOST=localhost
REDIS_PORT=6379
EMAIL_USER=your_email
EMAIL_PASS=your_email_password


```
Replace EMAIL_USER and EMAIL_PASS with the credentials you set up in your email.


### 7. Run the Project
After completing the setup, start the development server:
```bash
npm run dev

```
The server should be running at http://localhost:{POST}.

### 8. package.json 
```bash
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "]"
  ],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bcrypt": "^5.1.1",
    "bcryptjs": "^2.4.3",
    "bull": "^4.16.3",
    "bullmq": "^5.21.1",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.1",
    "jsonwebtoken": "^9.0.2",
    "mongodb": "^6.9.0",
    "mongoose": "^8.7.2",
    "nodemailer": "^6.9.15",
    "nodemon": "^3.1.7",
    "redis": "^4.7.0"
  }
}


```

## API Documentation

### 1. Register a User
* Endpoint: POST /user/register
* Description: It will alow user to signup

Request Body:
```bash
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "123456",
  "role": "patient"
}


```

Response:
```bash
{
  "message": "Account created successfully",
  "success": true
}


```
### 2. Login for User
* Endpoint: POST /user/login
* Description: Allow User to login.

Request Body:
```bash
{
  "email": "johndoe@example.com",
  "password": "123456",
  "role": "patient"
}


```
Response:
```bash
{
  "message": "Welcome back John",
  "user": {
      "_id": "671556dec43d23975f37614c",
      "name": "John Doe",
      "email": "johndoe@example.com",
      "role": "patient"
  },
  "success": true,
  "token": "your_jwt_token"
}


```
### 3. Book an Appointment
* Endpoint: POST /api/book

Request Body:
```bash
{
  "date": "2024-10-21",
  "time": "17:06:00"
}


```
Response:
```bash
{
  "message": "Appointment booked for Mon Oct 21 2024 17:06:00 GMT+0530 (India Standard Time)"
}

```

### 4. Logout
* Endpoint: GET /user/logout
* Description: Logs out the user by clearing their session cookie.


---
## Detailed Explanation of Technologies Used

### Node.js
Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It enables the development of scalable network applications and is used to run the backend server in this project.

### Express
Express is a web application framework for Node.js. It provides a robust set of features for building web applications and APIs. In this project, Express is used to create the API endpoints.

### JavaScript
TypeScript is a statically typed superset of JavaScript that adds type safety to the language. It helps in catching errors during development and improving code quality. This project uses TypeScript to write the backend code.

### Redis
Redis is an in-memory data structure store used as a database, cache, and message broker. It is used in this project for managing the notification queue with BullMQ.

### BullMQ
BullMQ is a library for handling distributed jobs and messages in Node.js. It uses Redis as a backend for queuing and processing jobs. In this project, BullMQ is used to queue and process notification jobs asynchronously.

---
## Deployment

### Link :

#### 


---
## Future Enhancements
* Role-based Access Control: Implement different roles like admin and user.
* User Subscription Preferences: Allow users to choose their notification preferences (email, SMS, etc.).
* SMS Integration: Send appointment reminders via SMS in addition to email.
