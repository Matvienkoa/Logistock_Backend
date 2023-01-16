const express = require('express');
const router = express.Router();
// const { checkJWT, checkUser, checkAdmin } = require('../middleware/auth');
const userCtrl = require('../controllers/user');

router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.getOneUser);
router.put('/:id', userCtrl.modifyUser);
router.put('/password/:id', userCtrl.changePassword)
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;