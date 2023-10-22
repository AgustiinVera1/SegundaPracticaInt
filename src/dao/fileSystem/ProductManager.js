import { existsSync, promises } from "fs";
const path = 'ProductsFile.json';

class ProductManager {

    async getProducts(queryObj) {
        const { limit } = queryObj;
        try {
            if (existsSync(path)) {
                const productFile = await promises.readFile(path, 'utf-8');
                const productData = JSON.parse(productFile);
                return limit ? productData.slice(0, +limit) : productData;
            } else {
                return [];
            }
        } catch (error) {
            return error;
        }
    }

    async addProduct(product) {
        try {
            const products = await this.getProducts({})
            let id
            !products.length ? id = 1 : id = products[products.length - 1].id + 1;
            products.push({ id, ...product, status: true });
            await promises.writeFile(path, JSON.stringify(products));
        } catch (error) {
            return error;
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts({});
            const product = products.find((product) => product.id === id);
            if (!product) {
                return 'No existe producto con ese id';
            } else {
                return product;
            }
        } catch (error) {
            return error;
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProducts({});
            const product = products.find(product => product.id === id);
            if (product) {
                const newArrProducts = products.filter(product => product.id !== id);
                await promises.writeFile(path, JSON.stringify(newArrProducts));
            }
            return product;
        } catch (error) {
            return error;
        }
    }

    async updateProduct(id, obj) {
        try {
            const products = await this.getProducts({});
            const index = products.findIndex(product => product.id === id);
            if (index === -1) {
                return null;
            }
            const productUpdated = { ...products[index], ...obj };
            products.splice(index, 1, productUpdated);
            await promises.writeFile(path, JSON.stringify(products));
            return productUpdated;
        } catch (error) {
            return error;
        }
    }
}

const product1 = {
    title: 'Teclado',
    description: 'Mecanico',
    price: 1000,
    thumbnail: ['/img/teclado'],
    code: 100,
    stock: 20
}

const product2 = {
    title: 'Mouse',
    description: 'Inalambrico',
    price: 500,
    thumbnail: ['/img/mouse'],
    code: 101,
    stock: 20
}

const product3 = {
    title: 'Monitor',
    description: 'HDMI',
    price: 1500,
    thumbnail: ['/img/monitor'],
    code: 102,
    stock: 5
}

const product4 = {
    title: 'Parlantes',
    description: 'Bluetooth',
    price: 100,
    thumbnail: ['/img/parlantes'],
    code: 103,
    stock: 50
}

const product5 = {
    title: 'Gabinete',
    description: 'Standard',
    price: 150,
    thumbnail: ['/img/gabinete'],
    code: 104,
    stock: 10
}

const product6 = {
    title: 'Auriculares',
    description: 'Gamer',
    price: 200,
    thumbnail: ['/img/auriculares'],
    code: 105,
    stock: 15
}

const product7 = {
    title: 'CPU',
    description: 'Ryzen 3200G',
    price: 250,
    thumbnail: ['/img/cpu'],
    code: 106,
    stock: 20
}

const product8 = {
    title: 'Motherboard',
    description: 'A520',
    price: 200,
    thumbnail: ['/img/motherboard'],
    code: 107,
    stock: 20
}

const product9 = {
    title: 'Memoria',
    description: 'DDR4',
    price: 100,
    thumbnail: ['/img/memoria'],
    code: 108,
    stock: 40
}

const product10 = {
    title: 'Disco',
    description: 'SSD',
    price: 50,
    thumbnail: ['/img/disco'],
    code: 109,
    stock: 50
}

/*
async function test() {
const manager1 = new ProductManager();
await manager1.addProduct(product1);
await manager1.addProduct(product2);
await manager1.addProduct(product3);
await manager1.addProduct(product4);

const products = await manager1.getProducts();

await manager1.deleteProduct();

await manager1.updateProduct(2,{tile: 'iphone', price: 15000});
}
test();
*/
export const manager1 = new ProductManager();