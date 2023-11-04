import { Router } from 'express'
import { manager1 } from '../dao/fileSystem/ProductManager.js';
import { productsManagerDB } from '../dao/mongoDB/productsManagerDB.js';
import { cartManagerDB } from '../dao/mongoDB/cartManagerDB.js';
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
});

//products paginate
router.get('/products', async (req, res) => {
    try {
        const response = await productsManagerDB.mostrarProducts(req.query);
        //console.log(response);
        res.render('products', { objetos: response });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//cart
router.get('/cart', async (req, res) => {
    try {
        const response = await cartManagerDB.mostrarCart();
        res.render('cart', response);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

export default router;
