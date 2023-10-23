import { Router } from 'express'
import { manager1 } from '../dao/fileSystem/ProductManager.js';
const router = Router();

router.get('/home', async (req, res) => {
    try {
        const products = await manager1.getProducts({});
        res.render('home', { listProducts: products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await manager1.getProducts({});
        res.render('realTimeProducts', { listProducts: products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//chat
router.get('/chat', async (req, res) => {
    res.render('chat');
})

export default router;
