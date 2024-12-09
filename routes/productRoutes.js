const express = require('express');
const {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getLowStockProducts,
    searchProducts
} = require('../controllers/productController');

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/low-stock', getLowStockProducts);
router.get('/search', searchProducts);


module.exports = router;
