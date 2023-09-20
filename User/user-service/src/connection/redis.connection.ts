import * as  redis from "redis";

let client;

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
}

export default new Redis();
