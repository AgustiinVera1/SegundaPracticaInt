import { existsSync, promises } from "fs";
import { manager1 } from './ProductManager.js';
const path = 'Carts.json';

class CartManager {

	async getCarts() {
		try {
			if (existsSync(path)) {
				const cartFile = await promises.readFile(path, 'utf-8');
				return JSON.parse(cartFile);
			} else {
				return [];
			}
		} catch (error) {
			return error;
		}
	}

	async createCart() {
		try {
			const carts = await this.getCarts()
			let id;
			!carts.length ? id = 1 : id = carts[carts.length - 1].id + 1;
			const newCart = { id, products: [] };
			carts.push(newCart);
			await promises.writeFile(path, JSON.stringify(carts));
		} catch (error) {
			return error;
		}
	}

	async getCartById(id) {
		try {
			const carts = await this.getCarts();
			const cart = carts.find(cart => cart.id === id);
            if (!cart) {
                return 'No existe carrito con ese id';
            }else{
                return cart;
            }
        } catch (error) {
			return error;
		}
	}

    async addProductToCart(cid, pid) {
        const carts = await this.getCarts(); // Obtiene la lista de carritos existentes
        const cartIndex = carts.findIndex(cart => cart.id === cid); // Encuentra el índice del carrito con el ID dado
    
        if (!carts[cartIndex].products) { // Si el carrito no tiene una propiedad 'products'
            const newProduct = { product: pid, quantity: 1 }; // Crea un nuevo objeto de producto con cantidad 1
            carts[cartIndex].products = [newProduct]; // Agrega el nuevo producto al array de productos del carrito
        } else {
            // Si el carrito ya tiene productos
            const existingProductIndex = carts[cartIndex].products.findIndex(product => product.product === pid);
    
            if (existingProductIndex !== -1) {
                // Si el producto ya está en el carrito, incrementa la cantidad
                carts[cartIndex].products[existingProductIndex].quantity++;
            } else {
                // Si el producto no está en el carrito, agrega un nuevo objeto de producto
                const newProduct = { product: pid, quantity: 1 };
                carts[cartIndex].products.push(newProduct);
            }
        }
        // Escribe la información actualizada de los carritos en el archivo
        await promises.writeFile(path, JSON.stringify(carts));
    }
    
}

export const cartManager = new CartManager();