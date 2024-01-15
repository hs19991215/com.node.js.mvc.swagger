import mongoose from "mongoose";
import postSchema from "../models/post-model";
import userModel from "../models/user-model";
import { v2 as cloudinary } from "cloudinary";
import { unlink } from "fs";

export const addPost = async (req, res, next) => {
  try {
    const post = new postSchema({
      title: req.body.title,
      content: req.body.content,
      image: req.file.image,
      userNumber: req.body.userNumber,
    });
    const ObjId = new mongoose.Types.ObjectId(post.id);
    const updating = await userModel.updateOne(
      {
        userNumber: req.body.userNumber,
      },
      {
        $push: {
          post: ObjId,
        },
      },
      { upsert: false, new: true }
    );

    if (updating?.matchedCount > 0) {
      const result = await post.save();
      if (result) {
        cloudinary.uploader.upload(req.file?.path, (error, resp) => {
          if (error) {
            console.log("===", error);
          }
          const imageUrl = resp.secure_url;
          post.image = imageUrl;
          post.save();
          console.log("resp", resp);
          if (!error) {
            unlink(req.file?.path, (err) => {
              if (!err) {
              }
            });
          }
        });
        res.status(201).json({ result });
      }
    }

    if (updating?.matchedCount === 0) {
      res.status(404).json({ message: "customer number not matched" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllPost = async (req, res, post) => {
  try {
    const post = await postSchema
      .find()
      .populate({ path: "comments", model: "comments" });
    if (post) {
      res.status(200).json({ post });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPostByUserId = async (req, res, next) => {
  const userNumber = req.params.id;
  try {
    const posts = await postSchema.find({ userNumber: userNumber });

    if (!posts) {
      return res.status(401).json({ message: "Server Error" });
    }

    if (posts?.length === 0) {
      return res.status(200).json({ posts: [] });
    }

    res.status(200).json({ posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
