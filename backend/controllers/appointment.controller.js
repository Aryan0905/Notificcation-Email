import notificationQueue from '../config/queue.js';
import {Appointment} from '../models/appointment.model.js';
import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';

console.log(" I am in appointment.controllewr.js");

export const bookAppointment=async(req, res)=> {
  const { date, time } = req.body;
  
  try {
   
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const patientId = decodedToken.userId; 

   console.log("patientid is : " ,patientId);
    const appointmentDateTime = new Date(`${date}T${time}`);
    const patient=await User.findById(patientId);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    
    const patientEmail = patient.email;

    const newAppointment = Appointment({ 
     patientEmail,
      appointmentDateTime 
    });
    console.log(newAppointment);
    await newAppointment.save();
    
   
    try {
      const job = await notificationQueue.add(
        'sendEmailNotification',
        { email: patientEmail, appointmentDateTime },
        { delay: appointmentDateTime.getTime() - Date.now() - 2 * 60 * 60 * 1000}
      );
      console.log('Job added to queue:', job.id);
    } catch (error) {
      console.error('Error adding job to queue:', error);
    }
    


  
    

    
    res.status(201).json({ message: `Appointment booked for ${appointmentDateTime}` });
  } catch (error) {
    res.status(500).json({ error: 'Appointment booking failed' });
  }
}
