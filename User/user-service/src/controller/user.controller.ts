import { response } from "express";
import * as grpc from "grpc";
import userService from "../services/user.service";

class UserController {
    async RegisterUser(call, callback) {
        try {
            const response = await userService.RegisterUser(call.request);
            callback(null,
                {
                    success: true,
                    message: "Signup Successfully",
                    Userdata: response
                }
            );
        }
        catch (error) {
            callback(error, null);
        }
    }

    async GetUserDetails(call, callback) {
        try {
            const userId = call.metadata.get("UserData");
            const response = await userService.GetUserDetails(JSON.parse(userId));
            if (!response) {
                callback({
                    code: grpc.status.NOT_FOUND,
                    details: "Not found"
                });
            }
            callback(null, response);
        }
        catch (error) {
            callback(error, null);
        }
    }

    async LoginUser(call, callback) {
        try {
            const result = await userService.LoginUser(call.request);
            console.log(result);
            if (!result) {
                callback({
                    code: grpc.status.NOT_FOUND,
                    details: "Not found"
                });
            }
            callback(null,
                {
                    success: true,
                    message: "Logged in Successfully",
                    user_data: result.isUser,
                    token: result.token
                }
            );
        }
        catch (error) {
            callback(error, null);
        }
    }

    // async GetUsers(call, callback){
    //     try{
    //         const users = await userService.GetUsers();
    //         users.forEach(u => call.write(u));
    //         call.end();
    //     }
    //     catch(error){
    //         callback(error,null);
    //     }
    // }

    async LogoutUser(call,callback){
        try{
            const user = call.metadata.get("UserData");
            const response = await userService.LogoutUser(JSON.parse(user));
            if(!response){
                callback({
                    code: grpc.status.NOT_FOUND,
                    details: "Not found"
                });
            }
            callback(null,{
                success:true,
                message: "User Logout Successfully",
                Userdata: response 
            })
        }
        catch(error){
            callback(error,null);
        }
    }
}

export default new UserController();