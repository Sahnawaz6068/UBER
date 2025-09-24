import { validationResult } from "express-validator";
import captainModel from "../models/captain.model.js";
import { createCaptain } from "../services/captain.service.js";
import bcrypt from "bcrypt";
import blackListTokenModel from "../models/blacklistToken.model.js";

export const registerCaptain = async (req, res) => {
  try {
    // Express-validator errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    // Check if captain already exists
    const captainExist = await captainModel.findOne({ email });
    if (captainExist) {
      return res.status(400).json({
        success: false,
        message: "Captain already exists with this email",
      });
    }

    // Dynamic field checks
    const requiredFields = [
      { value: fullname?.firstname, name: "Firstname" },
      { value: fullname?.lastname, name: "Lastname" },
      { value: email, name: "Email" },
      { value: password, name: "Password" },
      { value: vehicle?.color, name: "Vehicle color" },
      { value: vehicle?.plate, name: "Vehicle plate" },
      { value: vehicle?.capacity, name: "Vehicle capacity" },
      { value: vehicle?.vehicleType, name: "Vehicle type" },
    ];

    for (const field of requiredFields) {
      if (!field.value) {
        return res.status(400).json({ success: false, message: `${field.name} is required` });
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create captain
    const captain = await createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      password: hashedPassword,
      email,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });

    // Generate token
    const token = captain.generateAuthToken();

    res.status(201).json({ success: true, token, captain });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const loginCaptain=async (req,res)=>{
  //For login
  //Error Handling 
  const error=validationResult(req);
  if(!error.isEmpty()){
    return res.status(400).json({
      success:false,error:error.array()
    })
  }

  //Check captain exist or not
  const {email,password}=req.body;
  const captain=await captainModel.findOne({email}).select('+password');
  
  if(!captain){
    return res.status(404).json({msg:"Invalid Email or Password"})
  }

  const isMatch=captain.comparePassword(password);
//Check password
  if(!isMatch){
    return res.status(404).json({msg:"Invalid Email or Password"})
  }
  
  //Generate token
const token=await captain.generateAuthToken();
  res.cookie('token',token);

  res.status(200).json({
    token,
    captain 
  })
}

//User profile
export const getCaptainProfile=async (req,res)=>{
  res.status(200).json({
    profile:req.captain
  })
}

//logout
export const logoutCaptain=async (req,res)=>{
  const token=req.headers.authorization||req.cookies.token;

  await blackListTokenModel.create({token});

  res.clearCookie('token');

  res.status(200).json({msg:"Hay captain You are logout"})
}