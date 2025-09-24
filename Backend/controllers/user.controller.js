import UserModel from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
import blackListTokenModel from "../models/blacklistToken.model.js";

export const registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const userExist=await UserModel.findOne({email});
    if(userExist){
      res.status(400).json({
        msg:"user alredy exist with this emailId "
      })
    }

    // Hash password via model static method
    const hashedPassword = await UserModel.hashedPassword(password);

    // Create user via service
    const user = await createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });

    // Generate token via instance method
    const token = user.generateAuthToken();

    res.status(201).json({
      message: "User registered successfully",
      token,
      user,
    });
  } catch (err) {
    console.error("Error in registerUser:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
 
//Login controller
// 1. Validate the input
// 2. find in the db if not exist then -->Invalid
// 3.Cpmpare the password using function made in userModel
export const loginUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      error: error.array(),
    });
  }

  const {email,password}=req.body;
  const user=await UserModel.findOne({email}).select('+password');

  if(!user){
    return res.status(401).json({message:"Invalid email or password"})
  }
  const isMatch=await user.comparePassword(password);
  if(!isMatch){
    return res.status(401).json({message:"Invalid email or password"})
  }
 const token=user.generateAuthToken();

 res.cookie('token',token,{
  httpOnly:true,
  maxAge:3600000
 })

 res.status(200).json({
  token,
  user
 })
};

//Before get profile we have to find validate the 
export const getUserProfile=async (req,res,next)=>{
  res.status(200).json(req.user);
}

//Logout
export const logoutUser=async (req,res)=>{

  const token=req.cookies.token || req.headers.authorization;
  await blackListTokenModel.create({token});
  res.clearCookie('token');

  res.status(200).json({message:"Logged out"});
} 