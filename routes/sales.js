const express = require('express');
const router = express.Router();
const { checkJWT, checkUser, checkAdmin } = require('../middleware/auth');
const salesCtrl = require('../controllers/sales');

router.post('/', checkJWT, checkUser, salesCtrl.createSale);
router.get('/', checkJWT, checkUser, checkAdmin, salesCtrl.getAllSales);
router.get('/product/:id', checkJWT, checkUser, checkAdmin, salesCtrl.getAllSalesByProduct);
router.post('/product/quantity/:id', checkJWT, checkUser, salesCtrl.getQuantity);
router.post('/product/xls/', checkJWT, checkUser, salesCtrl.getXls);


module.exports = router;