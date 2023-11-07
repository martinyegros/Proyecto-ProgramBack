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
            /* const products = await this.getProducts();

            if (products.some(p => p.code === product.code)) {
                throw new Error("You cannot add the product because a product with the same code already exists");
            }

            if (!product.title || !product.description || !product.price || !product.status || !product.code || !product.stock || !product.category) {
                throw new Error("All fields are required to add a product.");
            }
            product.id = products.length === 0 ? 1 : products[products.length - 1].id + 1;
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            return product; */
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

    updateProduct = async (id, product) => {
        try {
            const products = await this.getProducts();
            const productIndex = products.findIndex(p => p.id === id);

            if (productIndex != -1) {
                if (products.some(p => p.code === product.code)) {
                    throw new Error("Codigo de producto no existente");
                }
                else {
                    products[productIndex] = {
                        title: product.title || products[productIndex].title,
                        description: product.description || products[productIndex].description,
                        price: product.price || products[productIndex].price,
                        thumbnail: product.thumbnail || products[productIndex].thumbnail,
                        code: product.code || products[productIndex].code,
                        stock: product.stock || products[productIndex].stock,
                        status: product.status || products[productIndex].status,
                        category: product.category || products[productIndex].category,
                        id: product.id || products[productIndex].id
                    };

                    await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
                }
            }
        }catch (error) {
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