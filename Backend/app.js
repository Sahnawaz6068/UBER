import { config } from "dotenv";
config();
import express from "express";
const app = express();
import connectToDB from "./db/db.js";
connectToDB();
import cors from "cors";
import userRoutes from "./routes/user.routes.js"
import cookieParser from 'cookie-parser'
import captainRoute from "./routes/captain.route.js"


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/users',userRoutes);
app.use('/captains',captainRoute);

app.get("/", (req, res) => {
  res.send("HEllo ji");
});

export default app;
