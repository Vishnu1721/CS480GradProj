const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 },
});

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [cartItemSchema],
    totalPrice: { type: Number, required: true, default: 0 },
}, { timestamps: true });

// Method to calculate total price
cartSchema.methods.calculateTotalPrice = async function () {
    const productModel = mongoose.model('Product'); // Reference the Product model
    let total = 0;

    for (const item of this.items) {
        const product = await productModel.findById(item.productId);
        if (product) {
            total += product.price * item.quantity;
        }
    }
    this.totalPrice = total;
    return total;
};

module.exports = mongoose.model('Cart', cartSchema);
