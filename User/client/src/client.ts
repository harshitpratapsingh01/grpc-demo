import * as protoLoader from '@grpc/proto-loader';
import * as grpc from "grpc";
import path from 'path';
import * as dotenv from "dotenv";
const PROTO_PATH = "./proto/users.proto";

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

const client = new userPackage.UserService(`localhost:${port}`, grpc.credentials.createInsecure());

export default client;