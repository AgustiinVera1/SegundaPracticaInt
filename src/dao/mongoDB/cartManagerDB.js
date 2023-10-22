import { cartModel } from "../models/cart.model.js";

class CartManagerDB {
    async mostrarCart() {
        const cart = await cartModel.find();
        return cart;
    }

    async mostrarCartById(id) {
        const cart = await cartModel.findById(id);
        return cart;

    }

    async crearCart(idP, quantify) {
        const newCart = await cartModel.create(idP, quantify);
        return newCart;
    }

    async agregarProductToCart(idCart, idProduct) {
        const productAdd = await cartModel.updateOne({ _id: idCart }, { $push: { idProducts: idProduct } });
        return productAdd;
    }

}
export const cartManagerDB = new CartManagerDB();