import express from "express";
import { User } from "../controller/user.controller";

export const userRoutes = express.Router();

const user = new User();

userRoutes.post('/Register', user.registerUser);
userRoutes.get("/getUserDetails", user.getUserDetails);
userRoutes.post("/login", user.loginUser);
userRoutes.get("/allUsers", user.getAllUsers);


