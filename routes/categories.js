const express = require('express');
const router = express.Router();
const { checkJWT, checkUser, checkAdmin } = require('../middleware/auth');
const categoryCtrl = require('../controllers/categories');

router.post('/', checkJWT, checkUser, checkAdmin, categoryCtrl.createCategory);
router.get('/', checkJWT, checkUser, categoryCtrl.getAllCategories);
router.get('/:id', checkJWT, checkUser, categoryCtrl.getOneCategory);
router.put('/:id', checkJWT, checkUser, checkAdmin, categoryCtrl.editCategory);
router.delete('/:id', checkJWT, checkUser, checkAdmin, categoryCtrl.deleteCategory);

module.exports = router;