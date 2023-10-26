import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'products',
            },
            quantify: {
                type: Number,
            },
            _id: false, //para que no genere un id de mas
        }
    ]
})

export const cartModel = mongoose.model('cart', cartSchema)
// {products: ['324432dsdsd','3654654fsfs']}  Es para q aparezca asi