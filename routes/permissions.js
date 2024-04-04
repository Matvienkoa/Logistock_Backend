const express = require('express');
const router = express.Router();
const { checkJWT, checkUser, checkAdmin } = require('../middleware/auth');
const permissionsCtrl = require('../controllers/permissions');

router.post('/', checkJWT, checkUser, checkAdmin, permissionsCtrl.createPermissions);
router.delete('/product/:id', checkJWT, checkUser, checkAdmin, permissionsCtrl.deletePermissionsOfProduct)
router.get('/:id', checkJWT, checkUser, checkAdmin, permissionsCtrl.getPermissionsOfProduct)

module.exports = router;