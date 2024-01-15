import { JWT_SECRET_KEY } from "../config";
import adminSchema from "../models/admin-model";
import userModel from "../models/user-model";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
export const addAdmin = async (req, res, next) => {
  const hashedPassword = bcrypt.hashSync(req.body.password);
  try {
    const admin = new adminSchema({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    const result = await admin.save();
    res.status(201).json({ result });
  } catch (error) {
    console.log(error);
  }
};

export const getAdminDetailById = async (req, res, next) => {
  try {
    const admin = await adminSchema.findById(req.params.id);
    if (!admin) {
      return res.status(404).json("No Admin Found");
    } else if (admin) {
      return res.status(200).json({ admin });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Somthing went wrong" });
  }
};

export const getAllAdmin = async (req, res, next) => {
  try {
    const admin = await adminSchema.find();
    if (!admin) {
      return res.status(404).json("No Admin Found");
    } else if (admin) {
      return res.status(200).json({ admin });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Somthing went wrong" });
  }
};

export const getAllUser = async (req, res, next) => {
  try {
    const user = await userModel.find();
    if (!user) {
      return res.status(404).json("No User Found");
    } else if (user) {
      return res.status(200).json({ user });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Somthing went wrong" });
  }
};

export const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const UserData = await adminSchema.findOne({ email: email })
    if (UserData) {
      const isMatch = await bcrypt.compare(password, UserData.password);
      if (isMatch) {
        Jwt.sign({ UserData }, JWT_SECRET_KEY, (errr, token) => {
          if (token) {
            res.status(200).json({
              data: UserData,
              token: token,
            });
          } else {
            console.log(errr);
          }
        });
      } else {
        console.log("Incorrect password");
        res.status(401).json({ message: "Incorrect password" });
      }
    } else {
      console.log("User not found");
      res.status(401).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
