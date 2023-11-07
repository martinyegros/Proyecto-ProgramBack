import { CartsModel } from './models/carts.models.js';

export default class Carts {
    constructor() {
        console.log('Carts preparados');
    }

    async getCarts() {
        const result = await CartsModel.find().lean();
        return result;
    }

    async addCart() {
        const result = await CartsModel.create({});
        return result;
    }

    getCartById(id) {
        return CartsModel.findById(id);
    }

    async deleteProduct(cid, pid) {
        const result = await CartsModel.updateOne(
            { _id: cid },
            { $pull: { products: { product: pid } } }
        );
        return result;
    }

    async updateCartWithProducts(cartId, productsToUpdate) {
        const updatedCart = await CartsModel.findByIdAndUpdate(
            cartId,
            { $set: { products: productsToUpdate } },
            { new: true, runValidators: true }
        );

        return updatedCart;
    }

    async updateCart(id, products) {
        const updatedCart = await CartsModel.findOneAndUpdate(
            { _id: id },
            { $set: { products: products } },
            { new: true, runValidators: true }
        );

        return updatedCart;
    }

    async deleteCart(id) {
        const cart = await CartsModel.findById(id);
        if (!cart) {
            throw new Error("Cart eliminado no existente");
        }
        const result = await CartsModel.deleteOne({ _id: id });
        return result;
    }
}