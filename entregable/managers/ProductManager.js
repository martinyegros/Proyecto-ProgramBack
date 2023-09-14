/* 
class ProductManager {
    //Array vacío
    constructor() {
        this.products = [];
    }
    //Método getProducts
    getProducts = () => {
        return this.products;
    }
    //Método addProduct
    addProduct = ( title, description, price, thumbnail, code, stock ) => {
        //Validar campos obligatorios
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log('Todos los campos son obligatorios')
            return;
        }
        //Producto gestionado
        const product =
            {
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
        //Validar que no se repita el campo code
        if (this.products.some(product => product.code === code)) {
            console.log('Código ya existente');
            return;
        }
        //Creación del id
        if (this.products.length === 0) {
            product.id = 1;
        } else {
            product.id = this.products[this.products.length - 1].id + 1;
        }

        this.products.push(product);

    }
    //Método getProductById
    getProductById = (idProduct) => {
        const productId = this.products.find(product => product.id === idProduct);

        if (!productId) {
            console.log('Producto no encontrado');
            return;
        } else {
            console.log(productId);
        }
    }
}
//Creación de la instancia
const manejadorEventos = new ProductManager();
//Llamado de getProducts
console.log(manejadorEventos.getProducts());
//Llamado de addProduct
manejadorEventos.addProduct('Turmalina Negra', 'La turmalina negra es un mineral empleado para evitar que las influencias negativas de un lugar o individuo, logren afectar al portador o a su entorno', 900, 'https://www.gemascanarias.com/img/cms/turmalina-negra-en-bruto.jpg', 'CODE-001', 50)
//Id generado sin repetirse
manejadorEventos.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
//Error porque el código se repite
manejadorEventos.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
//Llamado de getProducts
console.log(manejadorEventos.getProducts());
//Evaluación de getProductById
//Error porque no se encuentra el producto
console.log(manejadorEventos.getProductById(5));
//El producto encontrado
console.log(manejadorEventos.getProductById(1));
 */

const fs = require('fs');

class ProductManager {
    
    constructor(path) {
        this.path = path;
    }

    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const products = JSON.parse(data);
                return products;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    addProduct = async (product) => {
        try {
            const products = await this.getProducts();

            if (products.length === 0) {
                product.id = 1;
            } else {
                product.id = products[products.length - 1].id + 1;
            }

            products.push(product);

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

            return product;

        } catch (error) {
            console.log(error);
        }
    }

    getProductById = async (idProduct) => {
        try {
            const products = await this.getProducts();
            const productId = products.find(product => product.id === idProduct);

            if (!productId) {
                console.log('Producto no encontrado');
                return;
            } else {
                console.log(productId);
            }
        } catch (error) {
            console.log(error);
        }
    }

    deleteProduct = async (idProduct) => {
        try {
            const products = await this.getProducts();
            const productId = products.find(product => product.id === idProduct);

            if (!productId) {
                console.log('Producto no encontrado');
                return;
            } else {
                products.splice(idProduct)
            }
            
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

            return products;
        } catch (error) {
            console.log(error);
        }
        
    }
}

module.exports = {
    ProductManager
}