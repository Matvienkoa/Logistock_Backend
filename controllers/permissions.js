const models = require('../models/Index');

// Create Permissions
exports.createPermissions = async (req, res) => {
    const store = await models.Stores.findOne({ where: { name: req.body.store }})
    models.Permissions.create({
        store: store.id,
        storeName: store.name,
        productId: req.body.productId
    })
    .then((permission) => res.status(201).json(permission))
    .catch(error => res.status(400).json({ error }));
};

// Delete Permissions of product
exports.deletePermissionsOfProduct = async (req, res) => {
    models.Permissions.findAll({ where: { productId: req.params.id } })
    .then((permissions) => {
        permissions.forEach((permission) => {
            permission.destroy()
        })
    })
    .then(() => res.status(200).json({ message: 'Permissions supprimées' }))
    .catch(error => res.status(400).json({ error }));
}

// Get All Permissions for one Product
exports.getPermissionsOfProduct = (req, res) => {
    models.Permissions.findAll({ where: { productId: req.params.id } })
    .then((permissions) => res.status(201).json(permissions))
    .catch(error => res.status(400).json({ error }));
}