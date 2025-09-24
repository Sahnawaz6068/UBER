import UserModel from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import blackListTokenModel from "../models/blacklistToken.model.js";
import captainModel from "../models/captain.model.js";


export const authUser=async (req,res,next)=>{
    const token=req.cookie.token || req.headers.authorization;
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }

    const isBlacklisted=await blackListTokenModel.findOne({token:token});
    if(isBlacklisted){
        res.status(401).json({message:"Unauthorized"});
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await UserModel.findById(decoded._Id);
        req.user=user;
        next();
    }catch(err){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
}

//It authorize that get token and check that the token is valid or not -->return profile
export const authCaptain=async (req,res,next)=>{
    const token=req.headers.authorization || req.cookies.token;

    const isBlacklistedToken=await blackListTokenModel.findOne({token});
    if(isBlacklistedToken){
        return res.status(401).json({msg:'Unauthorized'});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const captain=await captainModel.findById(decoded._id);
        req.captain=captain;
        return next();
    }catch(err){
        res.status(401).json({msg:"Unauthorized .."})
    }
}