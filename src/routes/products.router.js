import { Router } from 'express';
import { manager1 } from '../ProductManager.js';

const router = Router();

router.get('/', async (req, res) => {
	try {
		const products = await manager1.getProducts(req.query);
		res.status(200).json({ message: 'Products found', products });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
})

router.get('/:pid', async (req, res) => {
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

router.post("/", async (req, res) => {
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

router.delete('/:pid', async (req, res) => {
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

router.put('/:pid', async (req, res) => {
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

export default router;