
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
        
        const product = [
            {
                title: "Aceitunas descarozadas",
                description: "Aceitunas verdes descarozadas orgánicas 'San Nicolas' 900g",
                price: 900,
                thumbnail: 'https://cdn.newgarden.com.ar/media/catalog/product/cache/dda7253a1a2f6711745de410175d10f8/a/c/aceitunas-verdes-descarozadas-organicas-san-nicolas-x-250-g.jpg',
                code: 'PROD-001',
                stock: 25
            }
        ]

        const campoCode = this.products.includes(product.code);
        if (campoCode) {
            console.log('Codigo ya existente');
            return;
        }

        if (this.products.length === 0) {
            product.id = 1;
        } else {
            product.id = this.products[this.products.lenght - 1].id + 1;
        }

        this.products.push(product)
    }

    getProductById = (idProduct) => {
        const productId = this.products.find(product => product.id === idProduct);

        if (!productId) {
            console.log('Producto no encontrado');
            return;
        }
    }
}