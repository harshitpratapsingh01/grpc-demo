import sessionService from "../services/session.service";
import redisConnection from "../../utils/redis.connection";
class UserSession{
    async session(user){
        try{
            const session = await sessionService.session_store(user)
            if(!session){
                console.log("Error in Storing Session");
            }
            else if(session == "Active"){
                console.log("User Is Already Active");
            }
            else{
                console.log("Session Created Successfully: ", session);
                await redisConnection.maitain_session(user);
            }
        }
        catch(error){
            console.log("Server Error: ", error);
        }
    }

    async sessionOut(user){
        try{
            const sessionOut = await sessionService.update_session(user._id)
            if(!sessionOut){
                console.log("Error in Updating SessionOut");
                return false;
            }
            console.log("SessionOut Updated Successfully");
            await redisConnection.logout_session_redis(user);
            return true;
        }
        catch(error){
            console.log("Server Error: ", error);
        }
    }
}

export default new UserSession();