import fs from 'fs';

export default class ProductManager {
    
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
            const productById = products.find(product => product.id === idProduct);

            return productById;
            
        } catch (error) {
            console.log(error);
        }
    }

    updateProduct = async (idProduct, updateData) => {
        try {
            const products = await this.getProducts();
            const productIndex = products.findIndex(product => product.id === idProduct);

            if(productIndex === -1) {
                console.log('Producto no encontrado');
                return;
            } else {
                const updatedProduct = { ...products[productIndex], ...updateData}
                products[productIndex] = updatedProduct;
            }

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

        return products;

        } catch (error) {
            console.log(error);
        }
    }

    deleteProduct = async (idProduct) => {
        try {
            const products = await this.getProducts();
            const productId = products.findIndex(product => product.id === idProduct);

            if (productId != -1) {
                products.splice(productId, 1);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            } else {
                console.log('Producto no encontrado');
            }
        } catch (error) {
            console.log(error);
        }
    }
}