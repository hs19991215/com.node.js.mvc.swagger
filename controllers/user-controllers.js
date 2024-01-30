import Jwt from "jsonwebtoken";
import userSchema from "../models/user-model";
import bcrypt from "bcryptjs";
import {
  JWT_SECRET_KEY,
  SMTP_PASSWORD,
  SMTP_PORT,
  SMTP_SERVER,
  SMTP_USERNAME,
} from "../config";
import userModel from "../models/user-model";
import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  host: SMTP_SERVER,
  port: SMTP_PORT,
  secure: true,
  auth: {
    user: SMTP_USERNAME,
    pass: SMTP_PASSWORD,
  },
  from: SMTP_USERNAME,
  tls: {
    rejectUnauthorized: true,
    minVersion: "TLSv1.2",
  },
});

let message = {
  to: "hs2038304@gmail.com",
  subject: "This is for Testing purpose only",
  text: "Hello,",
  html: `
  <p>Hello this is for testing only</p>
  <p>please click here to <a href="http://localhost:3000/resetpassword">reset password</a></p>
  `,
};

export const addUser = async (req, res, next) => {
  const hashedPassword = bcrypt.hashSync(req.body.password);
  try {
    const user = new userSchema({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      userNumber: Math.floor(Math.random() * 9000000000) + 1000000000,
    });
    const result = await user.save();
    if (!result) {
      return res.status(401).send("Server Error");
    }
    if (result) {
      return res.status(201).json({ status: 201, result });
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
          status: 200,
          user,
          token,
        });
      } else {
        console.log(err);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUserDetails = async (req, res, next) => {
  try {
    if (req.body.dob && req.body.image && req.body.aadharCardNo) {
      const imageUrl = "";
      const isUser = await userSchema.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          image: imageUrl,
          dob: req.body.dob,
          aadharCardNo: req.body.aadharCardNo,
        }
      );
      if (isUser) {
        res.status(202).json(isUser);
      } else if (!isUser) {
        res.status(404).json({ message: "User not found" });
      }
    } else {
      res
        .status(500)
        .json({ message: "Please fill Image, DOB and Addhar number" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const resetPasseord = async (req, res, next) => {
  try {
    const checkEmail = userModel.findOne({ emial: req.body.email });
    if (checkEmail) {
      transporter.sendMail(message, (error, info) => {
        if (error) {
          res.status(500).json({
            error: error,
          });
        } else {
          res.status(200).json({
            message: "Email sended successfully",
          });
        }
      });
    }
  } catch (error) {}
};

export const resetPasswordWebView = async (req, res, next) => {
  try {
    const checkemail = await userModel.findOne({ email: req.body.email }); // Add await here

    if (checkemail) {
      const hashedPassword = bcrypt.hashSync(req.body.password, 10); // Add salt rounds to bcrypt.hashSync
      checkemail.password = hashedPassword;

      const result = await checkemail.save(); // Change user to checkemail

      if (result) {
        return res
          .status(200)
          .json({ message: "Password updated successfully" });
      } else {
        return res.status(500).json({ message: "Error updating password" }); // Handle the case where saving fails
      }
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
