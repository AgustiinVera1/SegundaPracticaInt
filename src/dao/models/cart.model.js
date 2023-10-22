import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
    },
    quantify: {
        type: Number,
        default: 0,
    }
})
export const cartModel = mongoose.model('cart', cartSchema)