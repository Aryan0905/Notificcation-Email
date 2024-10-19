import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patientEmail: { 
    type: String,
     required: true
     },
    appointmentDateTime: { type: Date, required: true }
});

export const Appointment= mongoose.model('Appointment', appointmentSchema);
