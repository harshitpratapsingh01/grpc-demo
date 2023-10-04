import express from "express";
import { User } from "../controller/user.controller";
import { RegisterValidator } from "../moddleware/validation";
import { UserVerification } from "../moddleware/auth";
export const userRoutes = express.Router();

const verifyUser = new UserVerification();
const user = new User();

userRoutes.post('/Register', RegisterValidator, user.registerUser);
userRoutes.get("/getUserDetails", verifyUser.verify_token, user.getUserDetails);
userRoutes.post("/login", user.loginUser);
// userRoutes.get("/allUsers", user.getAllUsers);
userRoutes.get("/logout", verifyUser.verify_token, user.logoutUser );


