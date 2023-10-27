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
        const cart = await cartModel.findById(idCart);
        const productIndex = cart.products.findIndex((p) => p.product.equals(idProduct));
        if (productIndex === -1) {
            cart.products.push({ product: idProduct, quantify: 1 });
        } else {
            cart.products[productIndex].quantify++;
        } 
        return await cart.save();
    }

}
export const cartManagerDB = new CartManagerDB();