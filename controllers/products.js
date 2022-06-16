const models = require('../models/Index');
const fs = require('fs');

// Create Product
exports.createProduct = (req, res) => {
    // Empty Inputs
    if (req.body.reference === "" || req.body.title === "" || req.body.description === "") {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires"});
    }
    models.Products.create({
        reference: req.body.reference,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        subCategory: req.body.subCategory,
        image: req.file ? 
        `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        :null,
        supplier: req.body.supplier,
        packaging: req.body.packaging,
        leadTime: req.body.leadTime,
        tva: req.body.tva
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
    if (req.body.reference === "" || req.body.title === "" || req.body.description === "") {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires"});
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
    await product.update({
            reference: req.body.reference,
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            subCategory: req.body.subCategory,
            image: req.file ? 
            `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            :product.image,
            supplier: req.body.supplier,
            packaging: req.body.packaging,
            leadTime: req.body.leadTime,
            tva: req.body.tva
        })
        .then((product) => res.status(201).json(product))
        .catch(error => res.status(400).json({ error }));
};

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
    models.Products.findOne({ where: { id: req.params.id }, include: [{model: models.Stocks}]})
    .then((product) => res.status(200).json(product))
    .catch(error => res.status(400).json({ error }));
};

// Get All Products
exports.getAllProducts = (req, res) => {
    models.Products.findAll({
        order: [['title', 'ASC']],
        include: [{model: models.Stocks}]
    })
    .then((products) => res.status(200).json(products))
    .catch(error => res.status(400).json({ error }));
};