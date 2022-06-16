const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orders');

router.post('/', orderCtrl.createOrder);
router.get('/', orderCtrl.getAllOrders);
router.get('/:id', orderCtrl.getOneOrder);
router.put('/:id', orderCtrl.editOrder);
router.delete('/:id', orderCtrl.deleteOrder);

module.exports = router;