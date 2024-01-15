import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    userNumber: { type: String, required: true, ref: "Users" },
    createdAt: { type: Date, default: Date.now },
    comments: [{ type: mongoose.Types.ObjectId, ref: "posts", required: true }]
})

export default mongoose.model("posts", postSchema);