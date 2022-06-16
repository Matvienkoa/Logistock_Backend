const express = require('express');
const router = express.Router();
const orderDetailsCtrl = require('../controllers/orderDetails');

router.post('/', orderDetailsCtrl.createOrderDetails);
router.get('/', orderDetailsCtrl.getAllOrderDetails);
router.get('/:id', orderDetailsCtrl.getOneOrderDetails);
router.put('/:id', orderDetailsCtrl.editOrderDetails);
router.delete('/:id', orderDetailsCtrl.deleteOrderDetails);

module.exports = router;