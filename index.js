/**
 * @swagger
 * tags:
 *   - name: Check Connection
 *     description: APIs related to User operations
 */
import mongoose from "mongoose";
import express from "express";
import adminRoutes from "./routes/admin-routes";
import userRoutes from "./routes/user-routes";
import postRoutes from "./routes/post-routes";
import commentRoutes from "./routes/comment-routes";
import swaggerui from "swagger-ui-express";
import swaggerSpec from "./swaggerConfig";
import { DB_KEY, LOCAL_DB_URL, MAIN_DB_URL, PORT } from "./config";
import productRoutes from "./routes/product-model";
import {v2 as cloudinary} from 'cloudinary';
import path from "path";
import multer from "multer";
import { unlink } from "fs";
const app = express();

// mongoose.connect(MAIN_DB_URL);// Main DB Cloud
mongoose.connect(LOCAL_DB_URL + DB_KEY);// Local DB 
/**
 * @swagger
 * /check:
 *       get:
 *          summary: This api is used to check server is running or not.
 *          description: This api is used to check server is running or not.
 *          tags:
 *           - Check Connection
 *          responses:
 *              200:
 *                  description: to test get method
 */

app.use("/check", (req, res, next) => {
  res.status(200).json({ message: "Server is working fine" });
});

// View engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());

app.get("/homepage", (req, res, next) => {
  return res.render("homepage");
});
// MULTER -----------------------------------------------------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage:storage });

app.post("/upload", upload.single("Profile image"), (req, res, next) => {
  cloudinary.uploader.upload(req.file?.path,(error , result)=>{
    if(error){
        console.log(error)
    }
    if(!error){
        console.log(result)
        unlink(req.file?.path, (err)=>{
            console.log(err)
        })
    }
  });
  return res.redirect("/homepage");
});
// ------------------------------------------------------------------------
app.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerSpec));
app.use("/admin", adminRoutes);
app.use("/api", userRoutes);
app.use("/api", postRoutes);
app.use("/api", commentRoutes);
app.use("/api", productRoutes);

app.listen(PORT, console.warn("Server is running"));
