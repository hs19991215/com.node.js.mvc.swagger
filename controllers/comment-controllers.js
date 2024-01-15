import mongoose from "mongoose";
import userModel from "../models/user-model";
import commentSchema from "../models/comment-model"
import postModel from "../models/post-model";

export const addComment = async (req, res, next) => {
    try {
        const postId = new mongoose.Types.ObjectId(req.body.post)
        const comment = new commentSchema({
            text: req.body.text,
            author: req.body.author,
            post: postId,
        })
        const ObjId = new mongoose.Types.ObjectId(comment?.id);
        const updating = await userModel.updateOne({
            userNumber: req.body.author,

        }, {
            $push: {
                comments: ObjId
            }
        }, { upsert: false, new: true });

        const updatingPosts = await postModel.updateOne({
            _id: postId
        }, {
            $push: {
                comments: ObjId
            }
        }, { upsert: false, new: true })
        console.log("///>", updatingPosts)
        const result = await comment.save();
        if (result) {
            res.status(201).json({ result });
        }
        if (updating?.matchedCount === 0) {
            res.status(404).json({ message: "customer number not matched" });
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}