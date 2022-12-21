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
            sales.forEach((sale) => {
                console.log(req.body.store)
                let saleDate = moment(sale.createdAt).format('LL')
                console.log(saleDate)
                let bodyStart = moment(req.body.start).format('LL')
                let bodyEnd = moment(req.body.end).format('LL')
                if(
                    (sale.storeId === req.body.store || req.body.store === "") && 
                    (sale.supplierId === req.body.supplier || req.body.supplier === "") && 
                    (saleDate >= bodyStart || req.body.start === "") &&
                    (saleDate <= bodyEnd || req.body.end === "")
                ) {
                    quantity += sale.quantity
                }
            })
            res.status(200).json(quantity)
        })
        .catch(error => res.status(400).json({ error }));
}