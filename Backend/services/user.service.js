import UserModel from "../models/user.model.js";

export const createUser = async ({ firstname, lastname, email, password }) => {
  if (!firstname || !email || !password) {
    throw new Error("All fields are required");
  }

  // Check if email already exists
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  // Create new user
  const user = await UserModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password, 
  });

  return user;
};
