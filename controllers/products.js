const models = require('../models/Index');
const fs = require('fs');
const multer = require('multer')

// Create Product
exports.createProduct = async (req, res) => {
    // Empty Inputs
    if (req.body.reference === "" || req.body.name === "" || req.body.categoryId === "" || req.body.categoryId === null || req.body.tva === "" || req.body.packaging === "" || req.body.size === "" || req.body.leadTime === "" || req.body.onSale === "") {
        if (req.file) {
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
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires"});
    }
    // Same ref
    const productRef = await models.Products.findOne({
        where: { reference: req.body.reference }
    })
    if (productRef) {
        if (req.file) {
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
        return res.status(400).json({ message: "Cette référence est déjà utilisée !" });
    }
    models.Products.create({
        reference: req.body.reference,
        name: req.body.name,
        description: req.body.description,
        categoryId: req.body.categoryId,
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
    if (req.body.reference === "" || req.body.name === "" || req.body.categoryId === "" || req.body.categoryId === null || req.body.categoryId === 'null' || req.body.supplierId === "" || req.body.supplierId === null || req.body.supplierId === 'null' || req.body.tva === "" || req.body.packaging === "" || req.body.size === "" || req.body.leadTime === "") {
        if (req.file) {
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
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires" });
    }
    const productRef = await models.Products.findOne({
        where: { reference: req.body.reference }
    })
    if (productRef && productRef.id !== JSON.parse(req.params.id)) {
        if (req.file) {
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
        return res.status(400).json({ message: "Cette référence est déjà utilisée !" });
    }
    const product = await models.Products.findOne({
        where: { id: req.params.id }
    })
    if (req.file && product.image !== null) {
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
        categoryId: req.body.categoryId,
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
    .catch((error) => {
        if (req.file) {
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

// Add-Edit Selling Price
exports.sellingPriceProduct = async (req, res) => {
    if (req.body.sellingPrice === "" || req.body.sellingPrice === null || req.body.sellingPrice < 0) {
        return res.status(400).json({ message: "Merci de renseigner un prix de vente valide" });
    }
    const product = await models.Products.findOne({
        where: { id: req.params.id }
    })
    product.update({
        sellingPrice: req.body.sellingPrice*100
    })
    .then((product) => res.status(200).json(product))
    .catch(error => res.status(400).json({ error }));
}

// Reset Selling Price
exports.resetSellingPriceProduct = async (req, res) => {
    const product = await models.Products.findOne({
        where: { id: req.params.id }
    })
    product.update({
        sellingPrice: null
    })
    .then((product) => res.status(200).json(product))
    .catch(error => res.status(400).json({ error }));
}

// Delete Product
exports.deleteProduct = (req, res) => {
    models.Products.findOne({ where: { id: req.params.id } })
    .then(product => {
        if(product.image) {
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
        }
        product.destroy()
        .then(() => res.status(200).json({ message: 'Produit supprimé' }))
        .catch(error => res.status(400).json({ error }));
    })
    
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

// Get Products for Store (permissions)
exports.getAllProductsForStore = async (req, res) => {
    const permissions = await models.Permissions.findAll({ where: { store: req.params.id }})
    const products = await models.Products.findAll({include: [{ model: models.Stocks }]})
    let allProducts = [];
    products.forEach(product => {
        const index = permissions.findIndex(perm => perm.productId === product.id)
        if(index !== -1) {
            allProducts.push(product)
        }
    })
    function compare(a, b) {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    }
    allProducts.sort(compare);
    res.status(200).json(allProducts)
};

// Get Products for XLS
exports.getAllProductsForXls = async (req, res) => {
    const products = await models.Products.findAll({ include: [{ model: models.Stocks }] })
    let content = []
    products.forEach(product => {
        let stockQty = 0;
        let stockValue = 0;
        product.stocks.forEach(stock => {
            stockQty += stock.quantity
            stockValue += (stock.quantity*stock.buyingPrice/100)
        })
        content.push({
            productId: product.id,
            name: product.name,
            reference: product.reference,
            tva: product.tva,
            sellingPrice: product.sellingPrice/100,
            categoryId: product.categoryId,
            qty: stockQty,
            value: stockValue
        })
    })
    const categories = await models.Categories.findAll()
    content.forEach(cont => {
        if (cont.categoryId === null) {
            cont.category = 'sans catégorie attribuée'
        }
        const indexCategory = categories.findIndex(c => c.id === cont.categoryId)
        if (indexCategory !== -1) {
            cont.category = categories[indexCategory].name
        }
    })
    res.status(200).json(content)
}