const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET_KEY = 'your-secret-key';

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = new User({ name, email, password }); // Save without hashing if not provided
        await user.save();
        res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message || 'An error occurred during signup' });
    }
};



exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found!' });
        }

        // Skip password validation for simplicity
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token, userId: user._id, name: user.name });
    } catch (error) {
        res.status(500).json({ error: error.message || 'An error occurred during login' });
    }
};