const models = require('../models/Index');
var moment = require('moment');
moment.locale('fr'); 

// Create Sale
exports.createSale = async (req, res) => {
    const product = await models.Products.findOne({ where: { id: req.body.productId }})
    const supplier = await models.Suppliers.findOne({ where: { id: product.supplierId } })
    const store = await models.Stores.findOne({ where: { id: req.body.storeId } })

    models.Sales.create({
        productId: req.body.productId,
        productName: product.name,
        storeId: req.body.storeId,
        storeName: store.name,
        supplierId: supplier.id,
        supplierName: supplier.name,
        quantity: req.body.quantity
    })
    .then((sale) => res.status(201).json(sale))
    .catch(error => res.status(400).json({ error }));
}

// Get All Sales
exports.getAllSales = (req, res) => {
    models.Sales.findAll()
        .then((sales) => res.status(200).json(sales))
    .catch(error => res.status(400).json({ error }));
}

// Get All Sales by Product
exports.getAllSalesByProduct = (req, res) => {
    models.Sales.findAll({ where: { productId: req.params.id }})
        .then((sales) => res.status(200).json(sales))
        .catch(error => res.status(400).json({ error }));
}

// Get Quantity
exports.getQuantity = (req, res) => {
    models.Sales.findAll({ where: { productId: req.params.id } })
        .then((sales) => {
            let quantity = 0;
            // let allDates = [];
            sales.forEach((sale) => {
                let saleDate = Date.parse(sale.createdAt)
                let bodyStart = Date.parse(req.body.start)
                let bodyEnd = new Date(req.body.end).setHours(23,59,59)
                if(
                    (sale.storeId === req.body.store || req.body.store === "") && 
                    (sale.supplierId === req.body.supplier || req.body.supplier === "") && 
                    (bodyStart <= saleDate || req.body.start === "") &&
                    (bodyEnd >= saleDate || req.body.end === "")
                ) {
                    quantity += sale.quantity
                }
            })
            res.status(200).json(quantity)
        })
        .catch(error => res.status(400).json({ error }));
}

// Get summary xls
exports.getXls = async (req, res) => {
    const sales = await models.Sales.findAll()
    const products = await models.Products.findAll()
    const categories = await models.Categories.findAll()
    let content1 = [];
    sales.forEach(sale => {
        let saleDate = Date.parse(sale.createdAt)
        let bodyStart = Date.parse(req.body.start)
        let bodyEnd = new Date(req.body.end).setHours(23, 59, 59)
        const indexContent1 = content1.findIndex(c => c.productId === sale.productId)
        if (
            (sale.storeId === req.body.store || req.body.store === "") &&
            (sale.supplierId === req.body.supplier || req.body.supplier === "") &&
            (bodyStart <= saleDate || req.body.start === "") &&
            (bodyEnd >= saleDate || req.body.end === "")
        ) {
            if(indexContent1 === -1) {
                content1.push({
                    productId: sale.productId,
                    qty: sale.quantity,
                })
            } else {
                content1[indexContent1].qty += sale.quantity
            }
        }
    })
    content1.forEach(cont => {
        const indexProduct = products.findIndex(p => p.id === cont.productId)
        if(indexProduct !== -1) {
            if (products[indexProduct].categoryId === null) {
                cont.category = 'sans catégorie attribuée'
            }
            cont.reference = products[indexProduct].reference
            cont.categoryId = products[indexProduct].categoryId
            cont.tva = products[indexProduct].tva
            cont.sellingPrice = products[indexProduct].sellingPrice/100
            cont.name = products[indexProduct].name
        }
        const indexCategory = categories.findIndex(c => c.id === cont.categoryId)
        if(indexCategory !== -1) {
            cont.category = categories[indexCategory].name
        }
    })
    const supplier = await models.Suppliers.findOne({ where: { id: req.body.supplier }})
    const store = await models.Stores.findOne({ where: { id: req.body.store } })

    let infos = {
        start: req.body.start,
        end: req.body.end,
    }
    if(store !== null) {
        infos.store = store.name
    }
    if (supplier !== null) {
        infos.supplier = supplier.name
    }
    if (store === null) {
        infos.store = 'Tout Point de vente'
    }
    if (supplier === null) {
        infos.supplier = 'Tout Fournisseur'
    }
    if (req.body.start === "") {
        infos.start = 'Toutes dates'
    }
    if(req.body.start === "") {
        infos.start = 'Toutes dates'
    }
    if (req.body.end === "") {
        infos.end = 'Toutes dates'
    }
    res.status(200).json({content1, infos})
}