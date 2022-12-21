const express = require('express');
const router = express.Router();
// const { checkJWT, checkUser, checkAdmin } = require('../middleware/auth');
const productCtrl = require('../controllers/products');
const multerImage = require('../middleware/multerImage');

router.post('/', multerImage, productCtrl.createProduct);
router.get('/', productCtrl.getAllProducts);
router.get('/:id', productCtrl.getOneProduct);
router.put('/:id', multerImage, productCtrl.editProduct);
router.put('/onSale/:id', productCtrl.editOnSaleProduct);
router.delete('/:id', productCtrl.deleteProduct);

module.exports = router;