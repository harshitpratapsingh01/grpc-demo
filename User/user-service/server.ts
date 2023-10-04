import * as protoLoader from '@grpc/proto-loader';
import * as grpc from "grpc";
import * as dotenv from "dotenv";
import { dbConnection } from './utils/db.connection';
import { User } from './src/models/user.model';
import path from 'path';
import userController from './src/controller/user.controller';
const PROTO_PATH = "./src/proto/users.proto";

dotenv.config();
const port = process.env.USER_SERVICE_PORT
const packageDefinition = protoLoader.loadSync(path.join(__dirname, PROTO_PATH), {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const usersProto: any = grpc.loadPackageDefinition(packageDefinition);
const userPackage = usersProto.userPackage;
const server = new grpc.Server();
dbConnection();

server.addService(userPackage.UserService.service, {
    RegisterUser: userController.RegisterUser,
    GetUserDetails: userController.GetUserDetails,
    LoginUser: userController.LoginUser,
    LogoutUser: userController.LogoutUser
});

server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), () => {
    server.start();
});
console.log(`Server running at http://0.0.0.0:${port}`);



