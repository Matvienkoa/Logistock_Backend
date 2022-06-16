const express = require('express');
const router = express.Router();
const storeCtrl = require('../controllers/stores');

router.post('/', storeCtrl.createStore);
router.get('/', storeCtrl.getAllStores);
router.get('/:id', storeCtrl.getOneStore);
router.put('/:id', storeCtrl.editStore);
router.delete('/:id', storeCtrl.deleteStore);

module.exports = router;