import { User } from "../models/user.model";
import sessionController from "../controller/session.controller";
import jwt from "jsonwebtoken";

class UserService {
    async RegisterUser(Details) {
        if(!Details){
            return;
        }
        const user = new User(Details);
        const response = await user.save();
        return response;
    }

    async GetUserDetails(userId){
        if(!userId){
            return;
        }
        const user = await User.findOne({ _id: userId.id });
        if(!user){
            return;
        }
        return user;
    }

    async LoginUser(Details){
        const email = Details.email;
        const password = Details.password;
        if(!email && !password){
            return;
        }
        const isUser = await User.findOne({
            email: email, password: password
        });
        if(!isUser){
            return;
        }
        const token = jwt.sign({ id: isUser._id, username: isUser.username }, 
            process.env.SECRET_KEY, 
            { expiresIn: '2d' }
        );
        await sessionController.session(isUser);
        return {isUser,token};
    }

    // async GetUsers(){
    //     const users = await User.find();
    //     if(!users){
    //         return;
    //     }
    //     return users;
    // }

    async LogoutUser(user){
        const isUser = await User.findOne({_id: user.id});
        if(!isUser){
            return null;
        }
        if(!await sessionController.sessionOut(isUser)){
            return null;
        }
        return isUser
    }
}

export default new UserService();