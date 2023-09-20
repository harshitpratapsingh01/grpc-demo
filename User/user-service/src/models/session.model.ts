import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId,ref: "User",required: true},
    status: {type: Boolean,default: false},
    careatedAt: {type: Date,default: Date.now(),},
    updatedAt:{type: Date,default: Date.now()}
});

const Session = mongoose.model("Session", SessionSchema);

export default Session;