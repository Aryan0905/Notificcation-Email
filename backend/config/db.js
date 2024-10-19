import mongoose from 'mongoose';

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,  // Optional timeout for selecting servers
      });
      console.log("MongoDB connected!");
    } catch (error) {
      console.error("Database Connection failed due to :", error);
    }
  };
  

export default connectDB;