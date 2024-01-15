import mongoose from "mongoose"

const Schema = mongoose.Schema;

const productsSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true, //remove spaces from the start and end of string
  },
  brand:{
    type: String,
    required: false,
    trim: true, //remove spaces from the start and end of string
  },
  description: {
    type: String,
    required: true,
    trim: true, //remove spaces from the start and end of string
  },
  sellingPrice: {
    type: Number,
    required: true,
    trim: true, //remove spaces from the start and end of string
  },
  actualPrice: {
    type: Number,
    required: false,
    default: 0,
  },
  discount: {
    type: String,
    required: false,
    default: 0,
  },
  image: {
    type: [String],
    required: true,
  },
  rating: {
    type: Number,
    required: false,
  },
  productId: {
    type: String,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  size: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    required: true,
  },
});


export default mongoose.model("Products", productsSchema)