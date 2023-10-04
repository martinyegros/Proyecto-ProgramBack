import fs from 'fs';

export default class CartManager {
    
    constructor(path) {
        this.path = path;
    }

    getCart = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const cart = JSON.parse(data);
                return cart;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    addCart = async () => {
        try {
            const carts = await this.getCart();
            let cart = {}

            cart.id = carts.length === 0 ? 1 : carts[carts.length - 1].id + 1;
            cart.products = [];
            
            carts.push(cart);

            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));

            return cart;

        } catch (error) {
            console.log(error);
        }
    }

    getCartById = async (idProduct) => {
        try {
            const carts = await this.getCart();
            const cartById = carts.find(product => product.id === idProduct);

            return cartById;

        } catch (error) {
            console.log(error);
        }
    }

    updateCart = async (idCart, idProduct) => {
        try {
            const carts = await this.getCart();
            const cartIndex = carts.findIndex(product => product.id === idCart);

            if (cartIndex !== -1) {
                const productIndex = carts[cartIndex].products.findIndex(product => product.id === idProduct);

                if (productIndex !== -1) {
                    carts[cartIndex].products[productIndex].quantity++;
                } else {
                    carts[cartIndex].products.push({ id: idProduct, quantity: 1 });
                }

                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
            }
        } catch (error) {
            console.log(error);
        }
    }
}