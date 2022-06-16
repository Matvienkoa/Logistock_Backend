const express = require('express');
const router = express.Router();
const stockCtrl = require('../controllers/stocks');

router.post('/', stockCtrl.createStock);
router.delete('/:id', stockCtrl.deleteStock);
router.get('/', stockCtrl.getAllStocks);
router.get('/:id', stockCtrl.getOneStock);

module.exports = router;