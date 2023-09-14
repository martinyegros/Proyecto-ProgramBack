const { ProductManager } = require("./managers/ProductManager");

const manager = new ProductManager('./files/Productos.json');

const agrProd = async () => {

    const productos = await manager.getProducts();
    console.log(productos);

    const product = {
        title: 'producto prueba',
        description: 'Este es un producto prueba',
        price: 200,
        thumbnail: 'Sin imagen',
        code: 'abc123',
        stock: 25
    };

    await manager.addProduct(product);

    const productosResultadoFinal = await manager.getProducts();
    console.log(productosResultadoFinal);

    const idProdExistente = await manager.getProductById(1)
    console.log(idProdExistente)

    const idProdNoExistente = await manager.getProductById(100)
    console.log(idProdNoExistente)

    const eliminarId = await manager.deleteProduct(3)
    console.log(eliminarId)
}

agrProd();