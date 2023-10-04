import * as  redis from "redis";

export let client;

(async function(){
    try{
        client = await redis.createClient();
        await client.connect();
        console.log("Connected to rdis");
    }
    catch(error){
        console.log("Redis connection error: ", error);

    }
})();


class Redis{
    async maitain_session(user) {
        try{
            await client.SET(user.username, JSON.stringify({
                userID : user._id,
                status: true,
            }));
            const UserSession = await client.GET(user.username);
            console.log({UserSession: UserSession});
        }
        catch(error){
            console.log("Redis connection Error: ", error);
        }
    }

    async logout_session_redis(isUser) {
        try {
            await client.SET(isUser.username, JSON.stringify({
                userID: isUser._id,
                status: false
            }));
            const session = await client.GET(isUser.username);
            console.log(session);
        }
        catch (err) {
            console.log(err);
        }
    }
}

export default new Redis();
