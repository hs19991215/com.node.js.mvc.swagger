import Jwt from "jsonwebtoken";
import userSchema from "../models/user-model";
import bcrypt from "bcryptjs";
import { JWT_SECRET_KEY } from "../config";

export const addUser = async (req, res, next) => {
  const hashedPassword = bcrypt.hashSync(req.body.password);
  try {
    const user = new userSchema({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      userNumber: Math.floor(Math.random() * 9000000000) + 1000000000,
    });
    const result = await user.save();
    if (!result) {
      return res.status(401).send("Server Error");
    }
    if (result) {
      return res.status(201).json({status:201,
         result });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const result = await userSchema
      .findById(req.params.id)
      .populate({ path: "post", model: "posts" });
    if (!result) {
      return res.status(401).send("Server Error");
    }
    if (result) {
      return res.status(200).json({ result });
    }
  } catch (error) {}
};

export const userLogin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await userSchema.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      const isMatched = await bcrypt.compare(password, user.password);
  
      if (!isMatched) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      Jwt.sign({ user }, JWT_SECRET_KEY, (err, token) => {
        if (token) {
          res.status(200).json({
            status:200,
            user,
            token,
          });
        } else {
          console.log(err);
          res.status(500).json({status:500, message: "Internal Server Error" });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };