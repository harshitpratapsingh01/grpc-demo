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

    async update_session(user_id) {
        const isSession: any = await Session.findOne({ userId: user_id } )
        if (isSession) {
            if (isSession.status) {
                await Session.findOneAndUpdate( { userId: user_id }, { status: !isSession.status } );
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
}

export default new SessionService();