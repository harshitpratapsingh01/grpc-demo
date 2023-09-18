import * as protoLoader from '@grpc/proto-loader';
import * as grpc from "grpc";
import { dbConnection } from './src/connection/db.connection';
import { User } from './src/models/user.model';
import path from 'path';
import userController from './src/controller/user.controller';
const PROTO_PATH = "./src/proto/users.proto";

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
    GetUsers: userController.GetUsers
});

server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), () => {
    server.start();
});
console.log("Server running at http://0.0.0.0:50051");



