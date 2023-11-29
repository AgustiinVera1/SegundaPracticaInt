import { Router } from 'express'
import { manager1 } from '../dao/fileSystem/ProductManager.js';
import { productsManagerDB } from '../dao/mongoDB/productsManagerDB.js';
import { cartManagerDB } from '../dao/mongoDB/cartManagerDB.js';
import { jwtValidation } from '../middlewares/jwt.middlewares.js';
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

//products paginate y session y passport
router.get('/products', async (req, res) => {
    try {
        const response = await productsManagerDB.mostrarProducts(req.query);
        //console.log(response);
        if (!req.session.passport) {
            return res.redirect('/api/views/login')
        }
        const { first_name, email, Administrador } = req.user;
        res.render('products', { objetos: response, user: { first_name, email, Administrador } });
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

//sessions
router.get('/login', (req, res) => {
    /* if (req.session.user) {
         return res.redirect('/api/views/products')
     }*/
    res.render('login');
})

router.get('/signup', (req, res) => {
    /*if (req.session.user) {
        return res.redirect('/api/views/products')
    }*/
    res.render('signup');
})

router.get('/error', async (req, res) => {
    res.render('error');
})

router.get("/restaurar", jwtValidation, (req, res) => {
    res.render("restaurar");
  });

export default router;
