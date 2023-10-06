import { Router } from 'express';
import { cartManager } from '../CartManager.js';

const router = Router();

router.post('/', async (req, res) => {
	try {
		const response = await cartManager.createCart();
		res.status(200).json({ message: 'Cart created', carts: response });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
})

router.get('/:cid', async (req, res) => {
	const { cid } = req.params;
	try {
		const cart = await cartManager.getCartById(+cid);
		if (!cart) {
			return res.status(404).json({ message: 'Cart not found' });
		}
		res.status(200).json({ message: 'Cart found', cart });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
})

router.post('/:cid/product/:pid', async (req, res) => {
	const { cid, pid } = req.params;
	try {
		const response = await cartManager.addProductToCart(+cid, +pid);
		res.status(200).json({message: 'Product add', cart: response});
	} catch (error) {
		return res.status(500).json({message: error.message});
	}
})

export default router;