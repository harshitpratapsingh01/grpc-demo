import { User } from "../models/user.model";

class UserService {
    async RegisterUser(Details) {
        if(!Details){
            return;
        }
        const user = new User(Details);
        const response = await user.save();
        return response;
    }

    async GetUserDetails(username){
        if(!username){
            return;
        }
        const user = await User.findOne({ username: username });
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
        return isUser;
    }

    async GetUsers(){
        const users = await User.find();
        if(!users){
            return;
        }
        return users;
    }
}

export default new UserService();