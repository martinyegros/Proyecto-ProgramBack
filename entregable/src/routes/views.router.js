import express from "express";
import { ProductsModel } from "../dao/dbManagers/models/products.models.js";
import { CartsModel } from "../dao/dbManagers/models/carts.models.js";

const router = express.Router();

router.get('/products', async (req, res) => {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    try {
        const options = {
            page: page,
            limit: limit,
            lean: true,
            leanWithId: false
        };

        const result = await ProductsModel.paginate({}, options);

        res.render('products', {
            products: result.docs,
            page: result.page,
            totalPages: result.totalPages,
            hasNextPage: result.hasNextPage,
            hasPrevPage: result.hasPrevPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            limit: result.limit
        });
    } catch (error) {
        res.status(500).render('error', { message: 'Error al cargar la lista de productos.' });
    }
});

router.get('/carts/:cid', async (req, res) => {
    const cartId = req.params.cid;

    try {
        const cart = await CartsModel.findById(cartId).populate('products.product');

        if (!cart) {
            return res.status(404).render('error', { message: 'Carrito no encontrado.' });
        }

        const productsWithSubtotals = cart.products.map(item => {
            return {
                ...item.toObject(),
                subtotal: item.quantity * item.product.price
            };
        });

        res.render('carts', { products: productsWithSubtotals });
    } catch (error) {
        res.status(500).render('error', { message: 'Error al cargar el carrito' });
    }
});

export default router;