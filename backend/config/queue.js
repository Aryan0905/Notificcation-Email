// queue.js
import Bull from 'bull'; // Ensure this import is correct
import dotenv from 'dotenv';

dotenv.config();

const notificationQueue = new Bull('notifications', {
  redis: {
    host: '127.0.0.1',
    port: 6379,
    password: process.env.REDIS_PASSWORD || '', // Ensure this is correct
  },
});

export default notificationQueue; // Ensure this is exporting the instance
