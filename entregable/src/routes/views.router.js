import { Router } from "express";
import ProductManager from '../managers/product.manager.js'
import { __dirname, productsFilePath } from "../utils.js";

const router = Router();

const productManager = new ProductManager(productsFilePath);

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {
        style: 'index.css'
    });
});

router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('home', {
            style: 'index.css',
            products
        });
    } catch (error) {
        res.status(500).send('Error al cargar los productos');
    }
});

export default router;