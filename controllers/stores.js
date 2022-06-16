const models = require('../models/Index');

// Create Store
exports.createStore = (req, res) => {
    // Empty Inputs
    if (req.body.number === "") {
        return res.status(400).json({ message: "Merci de renseigner un numéro d'identifiant de point de vente"});
    }
    models.Stores.create({
        number: req.body.number,
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
    const store = await models.Stores.findOne({
        where: { id: req.params.id }
    })
    await store.update({
        number: req.body.number,
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
    models.Stores.findOne({ where: { id: req.params.id }, include: [{model: models.Orders}]})
    .then((store) => res.status(200).json(store))
    .catch(error => res.status(400).json({ error }));
};

// Get All Warehouses
exports.getAllStores = (req, res) => {
    models.Stores.findAll({
        order: [['number', 'ASC']],
        include: [{model: models.Orders}]
    })
    .then((stores) => res.status(200).json(stores))
    .catch(error => res.status(400).json({ error }));
};