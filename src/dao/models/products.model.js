import mongoose from "mongoose";
const productsSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
    },
    description:{
        type: String,
        required: true,
    },
    code:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    stock:{
        type:Number,
        default:0,
    },
    category:{
        type: String,
        required:true,
    },
    status:{
        type: Boolean,
        default: true,
    }
})

export const productsModel = mongoose.model('products',productsSchema)