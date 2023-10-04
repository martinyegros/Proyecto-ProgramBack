import { Router } from "express";
import CartManager from '../managers/cart.manager.js';
import ProductManager from "../managers/product.manager.js";
import { __dirname, cartsFilePath, productsFilePath } from "../utils.js";   

const router = Router();

const cartManager = new CartManager(cartsFilePath);
const productManager = new ProductManager(productsFilePath);

router.post('/', async (req, res) => {
    await cartManager.addCart();
    res.send({ status: 'success', message: 'Carrito' })
})

router.get('/:cid', async (req, res) => {
    try {
        const idProduct = Number(req.params.cid);
        const products = await cartManager.getCartById(idProduct);
        res.send({ status: 'success', payload: products.products });
    } catch (error) {
        res.status(400).send({ status: 'error', error: 'Producto no encontrado' });
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const idCart = Number(req.params.cid);
        const idProduct = Number(req.params.pid);

        const product = await productManager.getProductById(idProduct);

        await cartManager.updateCart(idCart, idProduct);

        res.status(200).send({ status: 'success' })
    }
    catch(error) {
        res.status(400).send({ error: error.message });
    }
})

export default router;