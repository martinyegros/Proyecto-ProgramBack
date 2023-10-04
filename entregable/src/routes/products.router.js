import { Router } from "express";
import ProductManager from "../managers/product.manager.js";
import { __dirname, productsFilePath } from "../utils.js";

const router = Router();

const productManager = new ProductManager(productsFilePath);

router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        const cantidad = req.query.limit;

        if(cantidad) {
            const result = products.slice(0, cantidad)
            res.send({ status: 'success', payload: result})
        } else {
            res.send({ status: 'success', payload: products})
        }
    } catch (error) {
        res.status(400).send({ status: 'error', error: 'Producto no encontrado' });
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const idProdExistente = await productManager.getProductById(Number(req.params.pid));

        res.send({ status: 'succes', payload: idProdExistente});
    } catch (error) {
        res.status(404).send({ status: 'error', error: 'Producto no encontrado'})
    }
})

router.post('/', async (req, res) => {
    try {
        const product = req.body;

        await productManager.addProduct(product);

        res.status(200).send({ status: 'success', payload: product });
    } catch (error) {
        return res.status(400).send({ status: 'error', error: 'Producto no encontrado'})
    }
})

router.put('/:pid', async (req, res) => {
    try {
        const updateData = req.body;
        const idProduct = parseInt(req.params.pid);

        await productManager.updateProduct(idProduct, updateData);

        res.send({ status: 'success', payload: await productManager.getProductById(idProduct) });

    } catch (error) {
        res.status(500).send({error: 'Error al actualizarlo'})
    }
})

router.delete('/:pid', async (req, res) => {
    try {
        const idProduct = parseInt(req.params.pid);

        await productManager.deleteProduct(idProduct);

        res.status(200).send({ status: 'success', message: 'Producto eliminado'});
    }
    catch (error) {
        res.status(400).send({ status: 'error', error: error.message }); 
    }
})

export default router;