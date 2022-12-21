const express = require('express');
const router = express.Router();
const stockCtrl = require('../controllers/stocks');

router.post('/', stockCtrl.createStock);
router.delete('/:id', stockCtrl.deleteStock);
router.get('/', stockCtrl.getAllStocks);
router.get('/:id', stockCtrl.getOneStock);
router.put('/:id', stockCtrl.editStock);
router.post('/update/:productId', stockCtrl.updateStock);
router.get('/marketvalue/:id', stockCtrl.getMarketValue);

module.exports = router;