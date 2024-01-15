import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        require: true,
    },
    userNumber: {
        type: String,
    },
    post: [{
        type: mongoose.Types.ObjectId,
        ref: "posts",
        required: true
    }],
    comments: [{ type: mongoose.Types.ObjectId, ref: "comments", required: true }],
    createdAt:{
        type:Date,
        default: Date.now()
    }
})

export default mongoose.model("Users", userSchema)