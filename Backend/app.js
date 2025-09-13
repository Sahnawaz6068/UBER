import { config } from 'dotenv';
config();
import express from 'express';
import cors from 'cors'

const app=express();

app.use(cors());

app.get("/",(req,res)=>{
    res.send("HEllo ji");
})

export default app;