const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        // Find the product by ID
        const product = await Product.findById(productId); 
        if (!product || product.stock < quantity) {
            return res.status(400).json({ message: "Product out of stock or unavailable" });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, products: [] });
        }

        const productInCart = cart.products.find(p => p.productId.equals(productId));
        if (productInCart) {
            productInCart.quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }

        // Update product stock
        product.stock -= quantity;
        await product.save();

        // Update total price
        const updatedProducts = await Promise.all(
            cart.products.map(async (item) => {
                const product = await Product.findById(item.productId);
                return item.quantity * product.price;
            })
        );

        cart.totalPrice = updatedProducts.reduce((sum, price) => sum + price, 0);

        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
