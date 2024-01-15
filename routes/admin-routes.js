/**
 * @swagger
 * tags:
 *  - name: Admin
 */


/**
 * @swagger 
 * tags:
 *   - name: Super Admin
 */
import express from "express";
import { addAdmin, adminLogin, getAdminDetailById, getAllAdmin, getAllUser } from "../controllers/admin-controllers";
import bodyParser from "body-parser";
const adminRoutes = express.Router()
adminRoutes.use(bodyParser.json());
adminRoutes.use(bodyParser.urlencoded({ extended: true }))


// SUPER ADMIN ---------------------------------------------

/**
 * @swagger
 * /admin/addAdmin:
 *   post:
 *     summary: Add a new admin
 *     description: Create a new admin account
 *     tags:
 *       - Super Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Admin added successfully
 *         content:
 *           application/json:
 *             example:
 *               result:
 *                 your admin data here
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 */
adminRoutes.post("/addadmin", addAdmin);

/**
 * @swagger
 * /admin/getAllAdmin:
 *    get:
 *      summary: This is for get all admin
 *      description: This is for get all admin
 *      tags:
 *        - Super Admin
 *      responses:
 *        200: 
 *          description: Successful response with admin details
 */
adminRoutes.get("/getAllAdmin", getAllAdmin)

/**
 * @swagger
 * /admin/getalluser:
 *   get:
 *     summary: This API is for fetching all users
 *     description: This API is for fetching all users
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: Successful response with user details
 */

adminRoutes.get("/getAllUser", getAllUser)

/**
 * @swagger 
 * /admin/getAdminDetailById/{id}:
 *   get:
 *     summary: This API is for getting an admin by ID.
 *     description: This API is for getting an admin by ID.
 *     tags:
 *      - Admin
 *     parameters: 
 *       - in: path
 *         name: id
 *         required: true
 *         description: Mongoose ID of the admin
 *         schema: 
 *           type: string
 *     responses:
 *       200:
 *         description: Admin data fetched successful
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 // your user data here
 *       401:
 *         description: Incorrect Id
 *         content:
 *           application/json:
 *             example:
 *               message: "Incorrect Id"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 * 
 */

adminRoutes.get("/getAdminDetailById/:id", getAdminDetailById)

/**
 * @swagger
 * /admin/adminLogin:
 *   post:
 *     summary: Admin login
 *     description: Authenticate admin and generate a token
 *     tags:
 *       - Admin
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
 *         description: Admin login successful
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 // your user data here
 *               token: "your_generated_token"
 *       401:
 *         description: Incorrect email or password
 *         content:
 *           application/json:
 *             example:
 *               message: "Incorrect email or password"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 */

adminRoutes.post("/adminLogin", adminLogin)
export default adminRoutes;