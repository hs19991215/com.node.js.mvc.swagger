/**
 * @swagger
 * tags
 *  -name Product
 */

import bodyParser from "body-parser";
import express from "express";
import { addProducts, getAllProducts, getProductById } from "../controllers/product-controllers";

const productRoutes = express.Router();

productRoutes.use(bodyParser.json())
productRoutes.use(bodyParser.urlencoded({extended:true}))

/**
 * @swagger
 *  /api/addProducts:
 *   post:
 *     summary: Add a new product
 *     description: Endpoint to add a new product to the database.
 *     tags:
 *      - Product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               brand:
 *                 type: string
 *               sellingPrice:
 *                 type: number
 *               actualPrice:
 *                 type: number
 *               discount:
 *                 type: number
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *               rating:
 *                 type: number
 *               category:
 *                 type: string
 *               size:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     quantity:
 *                       type: number
 *     responses:
 *       201:
 *         description: Product added successfully
 */

productRoutes.post("/addProduct", addProducts);

/**
 * @swagger
 * /api/getAllProduct:
 *   get:
 *     summary: This API is for fetching all Products
 *     description: This API is for fetching all Products
 *     tags:
 *       - Product
 *     responses:
 *       200:
 *         description: Successful response with Products details
 */

productRoutes.get("/getAllProduct", getAllProducts)
<<<<<<< HEAD

/**
 * @swagger
 * /api/getProductById/{id}:
 *   get:
 *     summary: Get a Product by ID
 *     description: Retrieve Product details based on the provided ID
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the Product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with Product details
 */
productRoutes.get("/getProductById/:id",getProductById);

=======
>>>>>>> b6a70f6 (changes)
export default productRoutes;