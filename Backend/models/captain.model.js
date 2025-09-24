import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last name must be at least 3 characters"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Color must be at least 3 letters"],
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, "Plate must be at least 3 letters"],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "motorcycle", "auto"],
    },
    location: {
      lat: Number,
      lng: Number, // fixed typo
    },
  },
});

// Generate JWT
captainSchema.methods.generateAuthToken = async function () {
  return jwt.sign(
    { _id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};

// Compare passwords
captainSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Hash password
captainSchema.methods.hashPassword = async function (password) {
  return bcrypt.hash(password, 10);
};

const captainModel = mongoose.model("Captain", captainSchema);
export default captainModel;
