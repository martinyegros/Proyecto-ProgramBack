const { ProductManager } = require("./managers/ProductManager");

const manager = new ProductManager('./files/Productos.json');

const arrayProduct = async () => {
    const gp = await manager.getProducts();
    console.log(gp)
}

const agrProd = async () => {

    const productos = await manager.addProduct();
    console.log(productos);

    const producto = {
        title: 'producto prueba',
        description: 'Este es un producto prueba',
        price: 200,
        thumbnail: 'Sin imagen',
        code: 'abc123',
        stock: 25
    };

    await manager.addProduct(producto);

    const productosResultadoFinal = await manager.addProduct();
    console.log(productosResultadoFinal);
}

//Llamado de getProducts
arrayProduct();
//Llamado de addProduct
agrProd();
/* //Id generado sin repetirse
agrProd();
//Llamado de getProducts
arrayProduct(); */