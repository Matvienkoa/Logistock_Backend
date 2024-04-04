const models = require('../models/Index');

// Create Supplier
exports.createSupplier = async (req, res) => {
    // Empty Inputs
    if (req.body.name === "") {
        return res.status(400).json({ message: "Merci de renseigner un nom de fournisseur" });
    }
    const supplierName = await models.Suppliers.findOne({
        where: { name: req.body.name }
    })
    if (supplierName) {
        return res.status(400).json({ message: "Ce fournisseur existe déjà!" });
    }
    models.Suppliers.create({
        name: req.body.name,
        adress: req.body.adress,
        adress2: req.body.adress2,
        postalCode: req.body.postalCode,
        city: req.body.city,
        tel: req.body.tel,
        mail: req.body.mail,
        contact: req.body.contact,
        siret: req.body.siret,
        number: req.body.number,
        comment: req.body.comment
    })
    .then((supplier) => res.status(201).json(supplier))
    .catch(error => res.status(400).json({ error }));
};

// Edit Supplier
exports.editSupplier = async (req, res) => {
    // Empty Inputs
    if (req.body.name === "") {
        return res.status(400).json({ message: "Merci de renseigner un nom de fournisseur" });
    }
    const supplierName = await models.Suppliers.findOne({
        where: { name: req.body.name }
    })
    if (supplierName && supplierName.id !== JSON.parse(req.params.id)) {
        return res.status(400).json({ message: "Ce fournisseur existe déjà!" });
    }
    models.Suppliers.findOne({ where: { id: req.params.id } })
    .then(supplier => {
        supplier.update({
            name: req.body.name,
            adress: req.body.adress,
            adress2: req.body.adress2,
            postalCode: req.body.postalCode,
            city: req.body.city,
            tel: req.body.tel,
            mail: req.body.mail,
            contact: req.body.contact,
            siret: req.body.siret,
            number: req.body.number,
            comment: req.body.comment
        })
        .then((supplier) => res.status(201).json(supplier))
        .catch(error => res.status(400).json({ error })); 
    })
};

// Delete Supplier
exports.deleteSupplier = (req, res) => {
    models.Suppliers.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: 'Fournisseur supprimé' }))
    .catch(error => res.status(400).json({ error }));
}

// Get All Suppliers
exports.getAllSuppliers = (req, res) => {
    models.Suppliers.findAll({order: [['name', 'ASC']], include: [{model: models.Products}]})
    .then((suppliers) => { res.send(suppliers)})
    .catch(error => res.status(400).json({ error }));
}

// Get One Supplier
exports.getOneSupplier = (req, res) => {
    models.Suppliers.findOne({ where: { id: req.params.id }, include: [{model: models.Products}]})
    .then((supplier) => res.status(200).json(supplier))
    .catch(error => res.status(400).json({ error }));
}