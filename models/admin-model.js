import mongoose from "mongoose";


const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        unique: true,
        lowercase: true,  //converts the string to lower case
        required: [true, "Please provide your Email"],
    },
    password: {
        type: String,
        required: [true, "please enter your Password"],
        required: true
    }
})

export default mongoose.model("admins", adminSchema)