const express = require('express');
const { createOrder, getOrderHistory } = require('../controllers/orderController');

const router = express.Router();

router.post('/', createOrder);
router.get('/:userId', getOrderHistory);

module.exports = router;
