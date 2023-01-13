const models = require('../models/Index');
const fs = require('fs');

// Create Product
exports.createProduct = (req, res) => {
    // Empty Inputs
    if (req.body.reference === "" || req.body.name === "" || req.body.category === "" || req.body.tva === "" || req.body.packaging === "" || req.body.size === "" || req.body.leadTime === "" || req.body.onSale === "") {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires"});
    }
    models.Products.create({
        reference: req.body.reference,
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        subCategory: req.body.subCategory,
        image: req.file ? 
        `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        :null,
        packaging: req.body.packaging,
        leadTime: req.body.leadTime,
        tva: req.body.tva,
        size: req.body.size,
        supplierId: req.body.supplierId,
        onSale: req.body.onSale
    })
    .then((product) => res.status(201).json(product))
    .catch((error) => {
        if(req.file) {
            let filename = req.file.filename;
            if (filename !== undefined) {
                fs.unlink(`images/${filename}`,
                    function (err) {
                        if (err) {
                            console.log('error');
                        } else {
                            console.log('fichier supprimé');
                        }
                    }
                )
            }
        }
        res.status(400).json({ error })
    });    
};

// Edit Product
exports.editProduct = async (req, res) => {
    // Empty Inputs
    if (req.body.reference === "" || req.body.name === "" || req.body.category === "" || req.body.tva === "" || req.body.packaging === "" || req.body.size === "" || req.body.leadTime === "") {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires" });
    }
    const product = await models.Products.findOne({
        where: { id: req.params.id }
    })
    if (req.file) {
        let filename = product.image.split('/images/')[1];
        if (filename !== undefined) {
            fs.unlink(`images/${filename}`,
                function (err) {
                    if (err) {
                        console.log('error');
                    } else {
                        console.log('fichier supprimé');
                    }
                }
            )
        }
    }
    product.update({
        reference: req.body.reference,
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        subCategory: req.body.subCategory,
        image: req.file ? 
        `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        :product.image,
        packaging: req.body.packaging,
        leadTime: req.body.leadTime,
        tva: req.body.tva,
        size: req.body.size,
        supplierId: req.body.supplierId
    })
    .then((product) => res.status(201).json(product))
    .catch(error => res.status(400).json({ error }));
};

// Edit Onsale Product
exports.editOnSaleProduct = async (req, res) => {
    if (req.body.onSale === "") {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires" });
    }
    const product = await models.Products.findOne({
        where: { id: req.params.id }
    })
    product.update({
        onSale: req.body.onSale
    })
    .then((product) => res.status(200).json(product))
    .catch(error => res.status(400).json({ error }));
}

// Delete Product
exports.deleteProduct = (req, res) => {
    models.Products.findOne({ where: { id: req.params.id } })
        .then(product => {
            let filename = product.image.split('/images/')[1];
            if (filename !== undefined) {
                fs.unlink(`images/${filename}`,
                    function (err) {
                        if (err) {
                            console.log('error');
                        } else {
                            console.log('fichier supprimé');
                        }
                    },
                );
            }
        })
    models.Products.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: 'Produit supprimé' }))
    .catch(error => res.status(400).json({ error }));
};

// Get One Product
exports.getOneProduct = (req, res) => {
    models.Products.findOne({ where: { id: req.params.id }, include: [{model: models.Stocks}], order: [[{ model: models.Stocks}, 'dluo', 'ASC']] })
    .then((product) => res.status(200).json(product))
    .catch(error => res.status(400).json({ error }));
};

// Get All Products
exports.getAllProducts = (req, res) => {
    models.Products.findAll({
        order: [['name', 'ASC']],
        include: [{model: models.Stocks}]
    })
    .then((products) => res.status(200).json(products))
    .catch(error => res.status(400).json({ error }));
};