import Session from "../models/session.model";

class SessionService{
    async session_store(user){
        try{
            const isSession = await Session.findOne({userId: user._id});
            if(!isSession){
                const session_details = new Session({
                    userId: user._id,
                    status: true,
                });
                const session_store = await session_details.save();
                return session_store;
            }
            else{
                if(!isSession.status){
                    const updateSession = await Session.findOneAndUpdate(
                        {userId: user._id}, 
                        {status: !isSession.status}
                    );
                    return updateSession;
                }
                else{
                    return "Active";
                }
            }
        }
        catch(error){
            console.log("Session Error: ", error);
            return false;
        }
    }
}

export default new SessionService();