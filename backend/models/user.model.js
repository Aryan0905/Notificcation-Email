import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { 
    type: String,
     required: true 
    },
  email: { 
    type: String,
     required: true,
      unique: true 
    },
  password: { 
    type: String,
     required: true 
    },
  role: { 
    type: String,
     enum: ["doctor", "patient"],
      required: true
     },
},{timestamp:true});



export const User = mongoose.model('User',userSchema);
