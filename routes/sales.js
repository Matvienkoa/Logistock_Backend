const express = require('express');
const router = express.Router();
const salesCtrl = require('../controllers/sales');

router.post('/', salesCtrl.createSale);
router.get('/', salesCtrl.getAllSales);
router.get('/product/:id', salesCtrl.getAllSalesByProduct);
router.post('/product/quantity/:id', salesCtrl.getQuantity);


module.exports = router;