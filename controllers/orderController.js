const Order = require('../models/order');

exports.createOrder = async (req, res) => {
    try {
        const { userId, products, totalPrice } = req.body;
        const order = new Order({ userId, products, totalPrice });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOrderHistory = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
