const express = require('express');
const router = express.Router();
const warehouseCtrl = require('../controllers/warehouses');

router.post('/', warehouseCtrl.createWarehouse);
router.get('/', warehouseCtrl.getAllWarehouses);
router.get('/:id', warehouseCtrl.getOneWarehouse);
router.put('/:id', warehouseCtrl.editWarehouse);
router.delete('/:id', warehouseCtrl.deleteWarehouse);

module.exports = router;