const express = require('express');
const router = express.Router();
const supplierCtrl = require('../controllers/suppliers');

router.post('/', supplierCtrl.createSupplier);
router.get('/', supplierCtrl.getAllSuppliers);
router.get('/:id', supplierCtrl.getOneSupplier);
router.put('/:id', supplierCtrl.editSupplier);
router.delete('/:id', supplierCtrl.deleteSupplier);

module.exports = router;