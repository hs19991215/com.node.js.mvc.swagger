import { PRODUCT_ID_PREFIX } from "../config";
import productsModel from "../models/products-model";
import { v4 as uuidv4 } from "uuid";

export const addProducts = async (req, res, next) => {
  const prefix = PRODUCT_ID_PREFIX;
  try {
    const {
      name,
      description,
      sellingPrice,
      actualPrice,
      discount,
      image,
      rating,
      category,
      size,
      brand,
    } = req.body;

    // Add required validation
    if (
      !name ||
      !description ||
      !sellingPrice ||
      !image ||
      !category ||
      !size ||
      !brand
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Generate a unique product ID
    const uniqueId = uuidv4().replace(/-/g, "");

    console.log("PRODUCT_ID_PREFIX===>", `${prefix}-${uniqueId}`);

    const product = new productsModel({
      name: name,
      description: description,
      sellingPrice: sellingPrice,
      brand: brand,
      actualPrice: actualPrice,
      discount: discount,
      image: image,
      rating: rating,
      productId: `${prefix}-${uniqueId}`,
      category: category,
      size: size,
    });

    const result = await product.save();

    if (result) {
      res.status(201).json({ result });
    }
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const product = await productsModel.find();
    if (product) {
      res.status(200).json({ product });
    } else if (!product) {
      return res.status(404).json({ message: "No Products Found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getProductById = async (req, res, next)=>{
  try {
    const product = await productsModel.findOne({_id: req.params.id })
      if (product) {
      res.status(200).json({ product });
    } else if (!product) {
      return res.status(404).json({ message: "No Products Found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}