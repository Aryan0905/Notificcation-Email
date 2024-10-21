import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {User} from "../models/user.model.js";

console.log("I am in user.controller.js");
export const register = async (req, res) => {
  console.log("I am in user.controller.js and register");
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "Something is Missing",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already Exists with this email!",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser=await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
   
    return res.status(201).json({
      message: "Account created succesfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
    try {
      const { email, password, role } = req.body;
      if (!email || !password || !role) {
        return res.status(400).json({
          message: "Something is Missing",
          success: false,
        });
      }
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "Incorrect email or password.",
          success: false,
        });
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(400).json({
          message: "Incorrect email or password.",
          success: false,
        });
      }
      //check for role
      if (role !== user.role) {
        return res.status(400).json({
          message: "Account doesn't exist with current role.",
          success: false,
        });
      }
      const tokenData = {
        userId: user._id,
      };
      const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });
      
      user={
          _id:user._id,
          name:user.name,
          email:user.email,
          role:user.role,
      }
  
      return res
        .status(200)
        .cookie("token", token, {
          maxAge: 1 * 24 * 60 * 60 * 1000,
          httpsOnly: true,
          sameSite: "strict",
        })
        .json({
          message: `Welcome back ${user.name}`,
          user,
          success: true,
          token
        });
    } catch (error) {
      console.log(error);
    }
  };

  export const logout = async (req, res) => {
    try {
      return res.status(201).cookie("token", "", { maxAge: 0 }).json({
        message: "Logout succesfully",
        success: true,
      });
    } catch (error) {}
  };