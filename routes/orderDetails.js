const express = require('express');
const router = express.Router();
const { checkJWT, checkUser } = require('../middleware/auth');
const orderDetailsCtrl = require('../controllers/orderDetails');

router.post('/', checkJWT, checkUser, orderDetailsCtrl.createOrderDetails);
router.get('/', checkJWT, checkUser, orderDetailsCtrl.getAllOrderDetails);
router.get('/:id', checkJWT, checkUser, orderDetailsCtrl.getOneOrderDetails);
router.put('/:id', checkJWT, checkUser, orderDetailsCtrl.editOrderDetails);
router.delete('/:id', checkJWT, checkUser, orderDetailsCtrl.deleteOrderDetails);

module.exports = router;