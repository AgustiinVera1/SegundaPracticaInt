import { Router } from 'express';
import { manager1 } from '../dao/fileSystem/ProductManager.js';
import { productsManagerDB } from '../dao/mongoDB/productsManagerDB.js';

const router = Router();

// rutas para fs

router.get('/fs', async (req, res) => {
	try {
		const products = await manager1.getProducts(req.query);
		res.status(200).json({ message: 'Products found', products });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
})

router.get('/fs/:pid', async (req, res) => {
	const { pid } = req.params;
	try {
		const product = await manager1.getProductById(+pid);
		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}
		res.status(200).json({ message: 'Product found', product });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
})

router.post("/fs", async (req, res) => {
	const { title, description, code, price, stock, category } = req.body;

	if (!title || !description || !code || !price || !stock || !category) {
		return res.status(400).json({ message: 'Faltan datos' });
	}

	try {
		const response = await manager1.addProduct(req.body);
		res.status(200).json({ message: "Product add", product: response });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
})

router.delete('/fs/:pid', async (req, res) => {
	const { pid } = req.params;
	try {
		const response = await manager1.deleteProduct(+pid);
		if (!response) {
			return res.status(404).json({ message: 'Product not found' });
		}
		res.status(200).json({ message: "Product deleted", product: response });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
})

router.put('/fs/:pid', async (req, res) => {
	const { pid } = req.params;
	try {
		const response = await manager1.updateProduct(+pid, req.body);
		if (!response) {
			return res.status(404).json({ message: 'Product not found' });
		}
		res.status(200).json({ message: 'Product Updated' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
})

// routas para DB

router.get('/db', async (req, res) => {
	try {
		const products = await productsManagerDB.mostrarProducts();
		res.status(200).json({ message: 'Products found', products });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
})

router.get('/db/:idP', async (req, res) => {
	const { idP } = req.params;
	try {
		const product = await productsManagerDB.mostrarProductsId(idP);
		res.status(200).json({ message: 'Product', product: product });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
})

router.post('/db', async (req, res) => {
	const { title, description, price, category } = req.body;
	if (!title || !description || !price || !category) {
		return res.status(400).json({ message: 'Faltan datos' });
	}
	try {
		const newProduct = await productsManagerDB.crearProduct(req.body);
		res.status(200).json({ message: 'Product created', newProduct });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
})

router.put('/db/:idP', async (req, res) => {
	const { idP } = req.params;
	try {
		const upProduct = await productsManagerDB.actualizarProduct(idP, req.body);
		res.status(200).json({ message: 'Update Product', data: upProduct });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
})

router.delete('/db/:idP', async (req, res) => {
	const { idP } = req.params;
	try {
		await productsManagerDB.eliminarProduct(idP);
		res.status(200).json({ message: 'Delete Product' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
})

export default router;