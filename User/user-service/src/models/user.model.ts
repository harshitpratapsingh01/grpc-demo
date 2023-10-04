import mongoose, { trusted } from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true, },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, },
    password: { type: String, required: true, },
    mobile_no: { type: Number, unique: true, required: true },
    profilePic: { type: Buffer, required: false },
    careatedAt: { type: Date, default: Date.now(), },
    updatedAt: { type: Date, default: Date.now() }
});
const User = mongoose.model("User", UserSchema);
export { User };

// import mongoose, { Document, Schema } from 'mongoose'; 

// export interface UserDocument extends Document { username: string; email: string; password: string; }
// const userSchema = new Schema<UserDocument>({ 
//     username: String, 
//     email: String, 
//     password: String, 
// }); 
// export default mongoose.model<UserDocument>('User', userSchema);