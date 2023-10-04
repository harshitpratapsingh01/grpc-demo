import * as dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import { NextFunction } from 'express';
import { client } from '../../../user-service/utils/redis.connection';

dotenv.config();

const key = process.env.SECRET_KEY;

export class UserVerification {
    async verify_token(req, res, next:NextFunction) {
        try {
            const token = req.headers.authorization;
            if (token) {
                const decoded = jwt.verify(token, key);
                if (decoded) {
                    const sessionCheck = await client.GET(decoded.username);
                    if(!JSON.parse(sessionCheck).status){
                        return res.status(400).json({ status: JSON.parse(sessionCheck).status,message: "Please Login First to access this Service" });
                    }
                    req.user = decoded;
                    next();
                } else {
                    return res.status(401).json({ error: 'Unauthorized' });
                }
            }
            else {
                return false;
            }
        }
        catch (err) {
            console.log(err);
            return res.status(500).send(err).json({ message: "Error in token varification" });
        }
    }
}
