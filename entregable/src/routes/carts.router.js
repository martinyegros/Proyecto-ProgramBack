import { Router } from "express";
import Carts from "../dao/dbManagers/carts.managers.js";

const router = Router();
const cartManager = new Carts();

router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.addCart();
        res.status(201).send({ status: 'success', payload: newCart });
    } catch (error) {
        res.status(500).send({ status: 'error', payload: error.message });
    }
})

router.get('/:cid', async (req, res) => {
    try {
        const cart = await cartManager.getCartById(req.params.cid).populate('products.product').exec();

        if (cart) {
            res.status(200).send({ status: 'success', payload: cart.products });
        } else {
            res.status(404).send({ status: 'error', payload: 'Cart no encontrado' });
        }
    } catch (error) {
        res.status(500).send({ status: 'error', payload: error.message });
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const idCart = req.params.cid;
        const idProd = req.params.pid;

        const cart = await cartManager.getCartById(idCart);
        if (!cart) {
            return res.status(404).send({ error: "Cart not found" });
        }

        const productIndex = cart.products.findIndex(p => p.product.toString() === idProd);

        if (productIndex === -1) {
            cart.products.push({ product: idProd, quantity: 1 });
        } else {
            cart.products[productIndex].quantity++;
        }

        const updatedCart = await cartManager.updateCart(idCart, cart.products);

        res.status(200).send({ status: 'success', payload: updatedCart });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const idCart = req.params.cid;
        const idProd = req.params.pid;

        const result = await cartManager.deleteProduct(idCart, idProd);

        res.status(200).send({ status: 'success', payload: result });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.put('/:cid ', async (req, res) => {
    try {
        const cartId = req.params["cid"];
        const productsToUpdate = req.body.products;

        const updatedCart = await cartManager.updateCartWithProducts(cartId, productsToUpdate);

        res.status(200).send({ status: 'success', payload: updatedCart });
    } catch (error) {
        res.status(400).send({ status: 'error', payload: error.message });
    }
});

router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const idCart = req.params.cid;
        const idProduct = req.params.pid;
        const newQuantity = req.body.quantity;

        const result = await cartManager.updateCart(idCart, {
            'products.product': idProduct
        }, {
            $set: {
                'products.$.quantity': newQuantity
            }
        });

        res.status(200).send({ status: 'success', payload: result });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.delete('/:cid', async (req, res) => {
    try {
        const idCart = req.params.cid;
        const result = await cartManager.updateCart(idCart, { products: [] });
        res.status(200).send({ status: 'success', payload: result });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

export default router;