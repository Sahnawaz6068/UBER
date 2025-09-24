import mongoose from "mongoose";

const blacklistTokenSchema=new mongoose.Schema({
    token:{
        type:String,
        require:true,
        unique:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:86400 //24 hourse in second 
    }
})

const blackListTokenModel=mongoose.model('BlackList',blacklistTokenSchema);
export default blackListTokenModel;