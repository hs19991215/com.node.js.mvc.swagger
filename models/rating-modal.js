import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    userId: { type: String, required: true },
    productId:{
        type : Schema.Types.ObjectId,
        ref  : 'Product'        
    },
    rating: {type: Number},
})

export default mongoose.model()