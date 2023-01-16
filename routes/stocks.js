const express = require('express');
const router = express.Router();
const { checkJWT, checkUser, checkAdmin } = require('../middleware/auth');
const stockCtrl = require('../controllers/stocks');

router.post('/', checkJWT, checkUser, checkAdmin, stockCtrl.createStock);
router.delete('/:id', checkJWT, checkUser, stockCtrl.deleteStock);
router.get('/', checkJWT, checkUser, stockCtrl.getAllStocks);
router.get('/:id', checkJWT, checkUser, stockCtrl.getOneStock);
router.put('/:id', checkJWT, checkUser, stockCtrl.editStock);
router.post('/update/:productId', checkJWT, checkUser, stockCtrl.updateStock);
router.get('/marketvalue/:id', checkJWT, checkUser, checkAdmin, stockCtrl.getMarketValue);

module.exports = router;