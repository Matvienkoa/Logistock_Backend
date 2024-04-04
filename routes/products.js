const express = require('express');
const router = express.Router();
const { checkJWT, checkUser, checkAdmin } = require('../middleware/auth');
const productCtrl = require('../controllers/products');
const multerImage = require('../middleware/multerImage');

router.post('/', checkJWT, checkUser, checkAdmin, multerImage, productCtrl.createProduct);
router.get('/', checkJWT, checkUser, productCtrl.getAllProducts);
router.get('/store/:id', checkJWT, checkUser, productCtrl.getAllProductsForStore);
router.get('/:id', checkJWT, checkUser, productCtrl.getOneProduct);
router.put('/:id', checkJWT, checkUser, checkAdmin, multerImage, productCtrl.editProduct);
router.put('/onSale/:id', checkJWT, checkUser, checkAdmin, productCtrl.editOnSaleProduct);
router.put('/price/:id', checkJWT, checkUser, checkAdmin, productCtrl.sellingPriceProduct);
router.put('/resetPrice/:id', checkJWT, checkUser, checkAdmin, productCtrl.resetSellingPriceProduct);
router.delete('/:id', checkJWT, checkUser, checkAdmin, productCtrl.deleteProduct);
router.post('/xls', checkJWT, checkUser, productCtrl.getAllProductsForXls);

module.exports = router;