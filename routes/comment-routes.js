/**
 * @swagger
 * tags:
 *   - name: Comment
 */

import express from "express";
import bodyParser from "body-parser";
import { addComment } from "../controllers/comment-controllers";
const commentRoutes = express.Router()
commentRoutes.use(bodyParser.json());
commentRoutes.use(bodyParser.urlencoded({ extended: true }))

/**
 * @swagger
 * /api/addcomment:
 *    post:
 *      summary: This is for creating comments
 *      description: This is for creating comments
 *      tags:
 *      - Comment
 *      requestBody:
 *        required: true
 *        content:
 *         application/json:
 *          schema:
 *           type: object
 *           properties:
 *             text:
 *              type: string
 *             author:
 *              type: string
 *             post:
 *              type: string
 *             
 *      responses:
 *         201: 
 *           description: Comment added successfully
 *         404:
 *           description: customer number not matched
 *         500: 
 *           description:  Internal server error
 * 
 */

commentRoutes.post("/addcomment", addComment);

export default commentRoutes;