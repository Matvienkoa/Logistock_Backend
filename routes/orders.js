const express = require('express');
const router = express.Router();
const { checkJWT, checkUser, checkAdmin } = require('../middleware/auth');
const orderCtrl = require('../controllers/orders');

router.post('/store/:storeId', checkJWT, checkUser, orderCtrl.getAllOrdersByStore);
router.post('/', checkJWT, checkUser, orderCtrl.createOrder);
router.post('/validated', checkJWT, checkUser, orderCtrl.getOrdersValidatedByDate);
router.get('/', checkJWT, checkUser, orderCtrl.getAllOrders);
router.get('/pending', checkJWT, checkUser, orderCtrl.getOrdersPending);
router.get('/validated', checkJWT, checkUser, orderCtrl.getOrdersValidated);
router.get('/to-bill', checkJWT, checkUser, orderCtrl.getOrdersToBill);
router.get('/:id', checkJWT, checkUser, orderCtrl.getOneOrder);
router.put('/:id', checkJWT, checkUser, orderCtrl.editOrder);
router.put('/confirm/:id', checkJWT, checkUser, checkAdmin, orderCtrl.confirmOrder);
router.put('/invoice/:id', checkJWT, checkUser, checkAdmin, orderCtrl.confirmInvoice);
router.delete('/:id', checkJWT, checkUser, orderCtrl.deleteOrder);
router.get('/check-quantity/:id', checkJWT, checkUser, orderCtrl.checkQuantity);
router.get('/amount/:id', checkJWT, checkUser, orderCtrl.getAmount);

module.exports = router;