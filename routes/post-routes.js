/**
 * @swagger
 * tags:
 * - name: Post
 *
 */
import express from "express";
import {
  addPost,
  getAllPost,
  getPostByUserId,
} from "../controllers/post-controllers";
import bodyParser from "body-parser";
import multer from "multer";

const postRoutes = express.Router();

postRoutes.use(bodyParser.json());
postRoutes.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file?.originalname}`);
  },
});
const upload = multer({storage:storage})
/**
 * @swagger
 * /api/addpost:
 *     post:
 *       summary: This api for creating posts
 *       description: This api for creating posts
 *       tags:
 *        - Post
 *       requestBody:
 *         required: true
 *         content:
 *          application/json:
 *           schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string,
 *              content:
 *                type: string,
 *              image:
 *                type: string,
 *              userNumber:
 *                type: string
 *       responses:
 *          201:
 *            description: Post created successfully
 *          404:
 *            description: Customer number not matched
 *          500:
 *            description: Internal server error
 *
 */
postRoutes.post("/addpost",upload.single("image"), addPost);

/**
 *@swagger
 * /api/getallposts:
 *        get:
 *          summary: This api for creating posts
 *          description: This api for creating posts
 *          tags:
 *            - Post
 *          responses:
 *            200:
 *              description: Data fetched successfully
 */
postRoutes.get("/getallposts", getAllPost);

/**
 * @swagger
 * /api/getPostByUserId/{id}:
 *   get:
 *     summary: Get posts by user ID
 *     description: Retrieve posts associated with a specific user ID
 *     tags:
 *       - Post
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved posts
 *         content:
 *           application/json:
 *             example:
 *               posts:
 *                 // your posts data here
 *       401:
 *         description: Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: "Server Error"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 */
postRoutes.get("/getPostByUserId/:id", getPostByUserId);

export default postRoutes;
