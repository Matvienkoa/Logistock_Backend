const express = require('express');
const router = express.Router();
const { checkJWT, checkUser, checkAdmin } = require('../middleware/auth');
const supplierCtrl = require('../controllers/suppliers');

router.post('/', checkJWT, checkUser, checkAdmin, supplierCtrl.createSupplier);
router.get('/', checkJWT, checkUser, supplierCtrl.getAllSuppliers);
router.get('/:id', checkJWT, checkUser, supplierCtrl.getOneSupplier);
router.put('/:id', checkJWT, checkUser, checkAdmin, supplierCtrl.editSupplier);
router.delete('/:id', checkJWT, checkUser, checkAdmin, supplierCtrl.deleteSupplier);

module.exports = router;