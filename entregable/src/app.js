import express from 'express';
import ProductManager from "./ProductManager.js";

const app = express();

const manager = new ProductManager('./Productos.json');

app.use(express.urlencoded({extended: true}));

//Llamado de los 10 productos y los primeros 5 productos
app.get('/products', async (req, res) => {
    const products = await manager.getProducts();
    const queryParamsLimit = parseInt(req.query.limit)

    if (queryParamsLimit) {
        const result = products.slice(0, queryParamsLimit)
        res.send(result)
    } else {
        res.send(products)
    } 
})

//Llamado de producto por id
app.get('/products/:pid', async (req, res) => {
    const idProdExistente = await manager.getProductById(Number(req.params.pid));

    if (!idProdExistente) {
        res.send({ error: 'Producto no encontrado'})
    }
    res.send(idProdExistente);
})


app.listen(8080, () => console.log('Listening on port 8080'));