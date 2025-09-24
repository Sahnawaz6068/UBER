import captainModel from "../models/captain.model.js";

export const createCaptain=async({firstname,lastname,email,password,color,plate,capacity,vehicleType})=>{
    if(!firstname || !email ||!password ||!color ||!plate ||!capacity ||!vehicleType){
        throw new Error("Every field must be present")
    }
    const captain=await captainModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    })

    return captain
}