/**
 * @swagger
 * tags:
 *   - name: User
 *     description: APIs related to User operations
 */

import bodyParser from "body-parser";
import express from "express";
import {
  addUser,
  getUserById,
  updateUserDetails,
  userLogin,
} from "../controllers/user-controllers";

const userRoutes = express.Router();

userRoutes.use(bodyParser.json());
userRoutes.use(bodyParser.urlencoded({ extended: true }));

/**
 * @swagger
 * /api/addUser:
 *   post:
 *     summary: Add a new user
 *     description: Create a new user in the database
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name for the user
 *               email:
 *                 type: string
 *                 description: Email for the user
 *               password:
 *                 type: string
 *                 description: Password for the user
 *     responses:
 *       201:
 *         description: User created successfully
 *       401:
 *         description: Server error
 */

userRoutes.post("/addUser", addUser);

// /**
//  * @swagger
//  * /api/getalluser:
//  *   get:
//  *     summary: This API is for fetching all users
//  *     description: This API is for fetching all users
//  *     tags:
//  *       - User
//  *     responses:
//  *       200:
//  *         description: Successful response with user details
//  */

// userRoutes.get("/getalluser", getAllUser);

/**
 * @swagger
 * /api/getuserbyid/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve user details based on the provided ID
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with user details
 */
userRoutes.get("/getuserbyid/:id", getUserById);

/**
 * @swagger
 * /api/userLogin:
 *   post:
 *     summary: User login
 *     description: Authenticate user and generate a token
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User login successful
 *         content:
 *           application/json:
 *             example:
 *               user:
 *                 // your user data here
 *               token: "your_generated_token"
 *       400:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             example:
 *               message: "Invalid email or password"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 */
userRoutes.post("/userLogin", userLogin)

userRoutes.post("/updateUserById/:id", updateUserDetails)

export default userRoutes;
