const express = require('express');
const router = express.Router();
const { checkJWT, checkUser, checkAdmin } = require('../middleware/auth');
const storeCtrl = require('../controllers/stores');

router.post('/', storeCtrl.createStore);
router.get('/', storeCtrl.getAllStores);
router.get('/:id', storeCtrl.getOneStore);
router.get('/number/:roleNumber', storeCtrl.getOneStoreByNumber);
router.put('/:id', checkJWT, checkUser, checkAdmin, storeCtrl.editStore);
router.delete('/:id', checkJWT, checkUser, checkAdmin, storeCtrl.deleteStore);

module.exports = router;