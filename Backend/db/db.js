import mongoose from "mongoose";

async function connectToDB() {
  try {
    console.log("DB URL:", process.env.DB_URL);

    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }); 

    console.log("✅ Connected to DB");
  } catch (err) {
    console.error(" Error in Connecting DB:", err.message);
    process.exit(1); 
  }
}

export default connectToDB;
