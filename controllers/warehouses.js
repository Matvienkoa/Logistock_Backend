const models = require('../models/Index');

// Create Warehouse
exports.createWarehouse = async (req, res) => {
    // Empty Inputs
    if (req.body.number === "" || req.body.name === "") {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires"});
    }
    const warehouseNumber = await models.Warehouses.findOne({
        where: { number: req.body.number }
    })
    const warehouseName = await models.Warehouses.findOne({
        where: { name: req.body.name }
    })
    if (warehouseNumber) {
        return res.status(400).json({ message: "Ce numéro d'identifiant existe déjà, merci d'en choisir un autre" });
    }
    if (warehouseName) {
        return res.status(400).json({ message: "Ce nom existe déjà, merci d'en choisir un autre" });
    }
    models.Warehouses.create({
        number: req.body.number,
        name: req.body.name,
        adress: req.body.adress,
        adress2: req.body.adress2,
        postalCode: req.body.postalCode,
        city: req.body.city
    })
    .then((warehouse) => res.status(201).json(warehouse))
    .catch(error => res.status(400).json({ error }));    
};

// Edit Warehouse
exports.editWarehouse = async (req, res) => {
    if (req.body.number === "" || req.body.name === "") {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires" });
    }
    const warehouse = await models.Warehouses.findOne({
        where: { id: req.params.id }
    })
    await warehouse.update({
        number: req.body.number,
        name: req.body.name,
        adress: req.body.adress,
        adress2: req.body.adress2,
        postalCode: req.body.postalCode,
        city: req.body.city
    })
    .then((warehouse) => res.status(201).json(warehouse))
    .catch(error => res.status(400).json({ error }));
};

// Delete Warehouse
exports.deleteWarehouse = (req, res) => {
    models.Warehouses.destroy({ where: { id: req.params.id }})
    .then(() => res.status(200).json({ message: 'warehouse supprimé' }))
    .catch(error => res.status(400).json({ error }));
};

// Get One Warehouse
exports.getOneWarehouse = (req, res) => {
    models.Warehouses.findOne({ where: { id: req.params.id }})
    .then((warehouse) => res.status(200).json(warehouse))
    .catch(error => res.status(400).json({ error }));
};

// Get All Warehouses
exports.getAllWarehouses = (req, res) => {
    models.Warehouses.findAll({
        order: [['number', 'ASC']]
    })
    .then((warehouses) => res.status(200).json(warehouses))
    .catch(error => res.status(400).json({ error }));
};