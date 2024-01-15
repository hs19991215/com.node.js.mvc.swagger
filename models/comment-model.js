import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: { type: String, required: true },
    author: { type: String, required: true, ref: "Users" },
    post: { type: String, required: true, },
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.model("comments", commentSchema);