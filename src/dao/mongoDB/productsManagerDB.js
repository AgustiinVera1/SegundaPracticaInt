import { productsModel } from "../models/products.model.js";

class ProductsManagerDB {
    async mostrarProducts() {
        const products = await productsModel.find().lean();
        return products;
    }

    async mostrarProductsId(id) {
        const product = await productsModel.findById(id);
        return product;
    }

    async crearProduct(obj) {
        const newProduct = await productsModel.create(obj);
        return newProduct;
    }

    async actualizarProduct(id, obj) {
        const upProduct = await productsModel.updateOne({ _id: id }, obj);
        return upProduct;
    }

    async eliminarProduct(id) {
        const product = await productsModel.deleteOne({ _id: id });
        return product;
    }

}
export const productsManagerDB = new ProductsManagerDB();