import { Queue } from 'bullmq';
import dotenv from 'dotenv';
dotenv.config();


// console.log(process.env.REDIS_HOST);
const connection = {
  host: process.env.REDIS_HOST,         // Redis host from the .env file
  port: parseInt(process.env.REDIS_PORT,10),  // Redis port from the .env file, converted to a number
  password: process.env.REDIS_PASSWORD,  // Redis password from the .env file
};
console.log("reddis connected");
const notificationQueue = new Queue('notifications', { connection });

export default notificationQueue;
