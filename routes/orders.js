const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orders');

router.post('/', orderCtrl.createOrder);
router.get('/', orderCtrl.getAllOrders);
router.get('/pending', orderCtrl.getOrdersPending);
router.get('/validated', orderCtrl.getOrdersValidated);
router.get('/to-bill', orderCtrl.getOrdersToBill);
router.get('/:id', orderCtrl.getOneOrder);
router.put('/:id', orderCtrl.editOrder);
router.put('/confirm/:id', orderCtrl.confirmOrder);
router.put('/invoice/:id', orderCtrl.confirmInvoice);
router.delete('/:id', orderCtrl.deleteOrder);
router.get('/check-quantity/:id', orderCtrl.checkQuantity);

module.exports = router;