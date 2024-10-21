import express,{urlencoded} from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./routes/user.route.js";
import appointmentRoute from "./routes/appointment.route.js"
import cors from "cors";
import './jobs/notificationJob.js';  



dotenv.config({});
const app=express();


app.use(cors({
  origin: 'http://localhost:3001',  
  credentials: true,                
}));


//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const PORT=process.env.PORT || 3000;

app.use("/user",userRoute);
app.use("/api",appointmentRoute);

app.listen( PORT ,()=>{
    connectDB();
  console.log(`server running at port ${PORT}`);
})