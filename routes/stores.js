const express = require('express');
const router = express.Router();
const { checkJWT, checkUser, checkAdmin } = require('../middleware/auth');
const storeCtrl = require('../controllers/stores');

router.post('/', checkJWT, checkUser, checkAdmin, storeCtrl.createStore);
router.get('/', checkJWT, checkUser, storeCtrl.getAllStores);
router.get('/:id', checkJWT, checkUser, storeCtrl.getOneStore);
router.get('/number/:roleNumber', checkJWT, checkUser, storeCtrl.getOneStoreByNumber);
router.put('/:id', checkJWT, checkUser, checkAdmin, storeCtrl.editStore);
router.delete('/:id', checkJWT, checkUser, checkAdmin, storeCtrl.deleteStore);

module.exports = router;