import Joi from "joi";
import { NextFunction } from "express";


export const RegisterValidator = (req,res,next:NextFunction) => {
    const RegisterSchema = Joi.object({
        username: Joi.string().min(5).max(30).required(),
        name: Joi.string().min(6).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(30).required(),
        mobile_no: Joi.number().min(6000000000).max(9999999999).required(),
        profilePic: Joi.string().trim()
    })
    const result = RegisterSchema.validate(req.body);
    if(result.error){
        return res.status(400).send(result.error).json({message: "Invalid User Input"});
    }
    next();
}