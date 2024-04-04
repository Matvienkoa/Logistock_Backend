const models = require('../models/Index');

// Create Store
exports.createStore = async (req, res) => {
    // Empty Inputs
    if (req.body.number === "" || req.body.name === "") {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires"});
    }
    const storeNumber = await models.Stores.findOne({
        where: { number: req.body.number }
    })
    const storeName = await models.Stores.findOne({
        where: { name: req.body.name }
    })
    if (storeNumber) {
        return res.status(400).json({ message: "Ce numéro d'identifiant existe déjà, merci d'en choisir un autre" });
    }
    if (storeName) {
        return res.status(400).json({ message: "Ce nom existe déjà, merci d'en choisir un autre" });
    }
    models.Stores.create({
        number: req.body.number,
        name: req.body.name,
        adress: req.body.adress,
        adress2: req.body.adress2,
        postalCode: req.body.postalCode,
        city: req.body.city,
        tel: req.body.tel
    })
    .then((store) => res.status(201).json(store))
    .catch(error => res.status(400).json({ error }));    
};

// Edit Store
exports.editStore = async (req, res) => {
    if (req.body.number === "" || req.body.name === "") {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires" });
    }
    const store = await models.Stores.findOne({
        where: { id: req.params.id }
    })
    await store.update({
        number: req.body.number,
        name: req.body.name,
        adress: req.body.adress,
        adress2: req.body.adress2,
        postalCode: req.body.postalCode,
        city: req.body.city,
        tel: req.body.tel
    })
    .then((store) => res.status(201).json(store))
    .catch(error => res.status(400).json({ error }));
};

// Delete Store
exports.deleteStore = (req, res) => {
    models.Stores.destroy({ where: { id: req.params.id }})
    .then(() => res.status(200).json({ message: 'store supprimé' }))
    .catch(error => res.status(400).json({ error }));
};

// Get One Store
exports.getOneStore = (req, res) => {
    models.Stores.findOne({ where: { id: req.params.id } })
    .then((store) => res.status(200).json(store))
    .catch(error => res.status(400).json({ error }));
};

// Get One Store by Number
exports.getOneStoreByNumber = (req, res) => {
    models.Stores.findOne({ where: { number: req.params.roleNumber } })
        .then((store) => res.status(200).json(store))
        .catch(error => res.status(400).json({ error }));
};

// Get All Stores
exports.getAllStores = (req, res) => {
    models.Stores.findAll({
        order: [['number', 'ASC']]
    })
    .then((stores) => res.status(200).json(stores))
    .catch(error => res.status(400).json({ error }));
};