const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your-secret-key';

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized!' });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token!' });
    }
};

const authMiddleware = require('./middlewares/authMiddleware');

app.use('/order', authMiddleware, orderRoutes);
app.use('/cart', authMiddleware, cartRoutes);


module.exports = authenticate;
