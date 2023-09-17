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

    updateProduct = async (idProduct, updateData) => {
        try {
            const products = await this.getProducts();
            const productId = products.findIndex(product => product.id === idProduct);

            if(productId === -1) {
                console.log('Producto no encontrado');
                return;
            } else {
                const updatedProduct = { ...products[productId], ...updateData}
                products[productId] = updatedProduct;
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
            const productId = products.filter(product => product.id === idProduct);

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