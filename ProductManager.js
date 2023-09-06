
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

