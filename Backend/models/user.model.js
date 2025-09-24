import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,"first name must be of at least 3 char"]
        },
        lastname:{
            type:String,
            minlength:[3,"last Name must be of 3 char"]
        }
    },
    email:{
        type:String,
        unique:true,
        required:true,
        minlength:[5,"email must be of 5 digit"]
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId:{
        type:String
    }
})

//Generating the token
UserSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}
//compare password
UserSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}
//hash password
UserSchema.statics.hashedPassword=async function (password){
    return await bcrypt.hash(password,10)
}
const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);
export default UserModel;
