import express from "express";
import { body } from "express-validator";
import { getUserProfile, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
const router = express.Router();

//Register a user
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("Must be of at least 3 char"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be of at-least 6 digit"),
  ],
  registerUser
);
//Login a user
router.post("/login", [
  body("email").isEmail().withMessage("Invalid Email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be of at-least 6 digit"),
],
  loginUser
);
//Get User Profile
router.get("/profile",authUser,getUserProfile);
//Logout
router.get("/logout",authUser,logoutUser);


export default router;
