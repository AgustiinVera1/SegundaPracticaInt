import { productsModel } from "../models/products.model.js";

class ProductsManagerDB {
    async mostrarProducts(obj) {
        const { limit = 5, page = 1, sort, ...query } = obj;
        const sortPrice = sort ? { price: sort } : null;
        const options = { limit: limit, page: page, sort: sortPrice, lean: true };
        
        const products = await productsModel.paginate(query, options);
        const info = {
            status: products ? 'success' : 'error',
            payload: products.totalDocs,
            totalPages: products.totalPages,
            prevPages: products.prevPages,
            nextPages: products.nextPages,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? `http://localhost:3000/api/products/db?page=${products.prevPage}` : null,
            nextLink: products.hasNextPage ? `http://localhost:3000/api/products/db?page=${products.nextPage}` : null,
        }
        //const responseProducts = products.docs; (no me funciona con esta linea, por eso lo cambie por products)
        return { products, info };
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