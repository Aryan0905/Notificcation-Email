
import Bull from 'bull'; 
import dotenv from 'dotenv';

dotenv.config();

const notificationQueue = new Bull('notifications', {
  redis: {
    host: '127.0.0.1',
    port: 6379,
    password: process.env.REDIS_PASSWORD || '', 
  },
});

export default notificationQueue; 
