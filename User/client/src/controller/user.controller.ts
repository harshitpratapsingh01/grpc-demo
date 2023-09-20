import client from "../client";
export class User{
    async registerUser(req,res){
        try{
            client.RegisterUser({
                "username": req.body.username,
                "email": req.body.email,
                "password": req.body.password,
            }, (err, response)=> {
                if(!err){
                    console.log(response);
                    res.json({user: response});
                }
                else{
                    console.log(err);
                }
            })
        }
        catch(err){
            console.log(err);
            res.json({message: "Error", err});
        }
    }


    async getUserDetails(req,res){
        try{
            client.GetUserDetails({
                "username": req.body.username,
            }, (err,response)=>{
                if(!err){
                    console.log(response);
                    res.json({details: response});
                }
                else{
                    console.log(err);
                }
            })
        }
        catch(err){
            console.log(err);
            res.json({message: "Error", err});
        }
    }

    async loginUser(req,res){
        try{
            client.LoginUser({
                "email": req.body.email,
                "password": req.body.password,
            },(err,response)=> {
                if(!err){
                    console.log(response);
                    res.json({response});
                }
                else{
                    console.log(err);
                    res.json({err});
                }
            })
        }
        catch(err){
            console.log(err);
            res.json({message: "Error", err});
        }
    }

    async getAllUsers(req,res){
        try{
            const call = client.GetUsers();
            const users = [];
            call.on("data", item => {
                users.push(item);
            });
            call.on("end", e => res.json({message: "User Details", Users: users}));
            // await res.json({message: "User Details", Users: users});
        }
        catch(err){
            console.log(err);
            res.json({message: "Error", err});
        }
    }
}