
class ProductManager {
    constructor() {
        this.products = [];
    }

    getProducts = () => {
        return this.products;
    }

    addProduct = ( title, description, price, thumbnail, code, stock ) => {
        //Validar campos obligatorios
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log('Todos los campos son obligatorios')
            return;
        }

        const product =
            {
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
        //Validar que no se repita el campo code (ÉSTA VALIDACIÓN NO PUDE LOGRARLA)
        /* const productIndex = this.products.findIndex(product => product.code);
        const campoCode = this.products[productIndex].includes(product.code);
        
        if (campoCode) {
            console.log('Código ya existente');
            return;
        } */

        if (this.products.length === 0) {
            product.id = 1;
        } else {
            product.id = this.products[this.products.length - 1].id + 1;
        }

        this.products.push(product);

    }

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

const manejadorEventos = new ProductManager();

console.log(manejadorEventos.getProducts());

manejadorEventos.addProduct('Turmalina Negra', 'La turmalina negra es un mineral empleado para evitar que las influencias negativas de un lugar o individuo, logren afectar al portador o a su entorno', 900, 'https://www.gemascanarias.com/img/cms/turmalina-negra-en-bruto.jpg', 'CODE-001', 50)
manejadorEventos.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
manejadorEventos.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);

console.log(manejadorEventos.getProducts());

console.log(manejadorEventos.getProductById(5));
console.log(manejadorEventos.getProductById(1));

