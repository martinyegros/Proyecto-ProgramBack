import { Router } from "express";
import CartManager from '../managers/cart.manager.js';
import { __dirname, cartsFilePath } from "../utils.js";

const router = Router();

const cartManager = new CartManager(cartsFilePath);

router.post('/', async (req, res) => {
    await cartManager.addCart();
    res.send({ status: 'success'})
})

router.get('/:cid', async (req, res) => {
    try {
        const idProduct = Number(req.params.cid);
        const products = await cartManager.getCartById(idProduct);
        res.send({ status: 'success', payload: products.products });
    } catch (error) {
        res.status(400).send({ error: 'Producto no encontrado' });
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const idCart = Number(req.params.cid);
        const idProduct = Number(req.params.pid);

        const cartById = await cartManager.getCartById(idProduct);
        const indexProductInCart = cartById.products.findIndex(product => product.id === idProduct)
        if (indexProductInCart != -1) {
            cartById.products[indexProductInCart] = cartById.products[indexProductInCart].quantity++;
        } else {
            cartById.products.push({ idCart });
        }

        await cartManager.updateCart(idCart, idProduct);

        res.status(200).send({ status: 'success' })
    } catch (error) {
        res.status(400).send({ error: 'Producto no encontrado' });
    }
})