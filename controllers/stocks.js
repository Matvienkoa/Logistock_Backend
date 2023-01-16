const models = require('../models/Index');

// Create Stock
exports.createStock = (req, res) => {
    // Empty Inputs
    if (req.body.quantity === "" || req.body.buyingDate === "" || req.body.buyingPrice === "" || req.body.dluo === "" || req.body.productId === "") {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires"});
    }
    models.Stocks.create({
        quantity: req.body.quantity,
        buyingDate: req.body.buyingDate,
        buyingPrice: req.body.buyingPrice,
        dluo: req.body.dluo,
        productId: req.body.productId,
        packaging: req.body.packaging,
        size: req.body.size
    })
    .then((stock) => res.status(201).json(stock))
    .catch(error => res.status(400).json({ error }));    
};

// Edit Stock
exports.editStock = async (req, res) => {
    // Empty Inputs
    if (req.body.quantity === "" || req.body.buyingDate === "" || req.body.buyingPrice === "" || req.body.dluo === "" || req.body.productId === "") {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires" });
    }
    const stock = await models.Stocks.findOne({
        where: { id: req.params.id }
    })
    stock.update({
        quantity: req.body.quantity,
        buyingDate: req.body.buyingDate,
        buyingPrice: req.body.buyingPrice,
        dluo: req.body.dluo,
        productId: req.body.productId,
        packaging: req.body.packaging,
        size: req.body.size
    })
    .then((stock) => res.status(201).json(stock))
    .catch(error => res.status(400).json({ error }));
};

// Update Stock
exports.updateStock = (req, res) => {
    models.Stocks.findAll({
        where: { productId: req.params.productId },
        order: [['dluo', 'ASC']]
    })
    .then((stocks) => {
        if(stocks.length > 0) {
            let orderQuantity = req.body.quantity;
            let i = 0
            while (orderQuantity > 0) {
                if (stocks[i].quantity > orderQuantity) {
                    stocks[i].quantity -= orderQuantity
                    orderQuantity = 0
                    models.Stocks.findOne({ where: { id: stocks[i].id } })
                    .then(stock => {
                        stock.update({
                            quantity: stocks[i].quantity
                        })
                        .then((newStock) => res.status(201).json(newStock))
                        .catch(error => res.status(400).json({ error }));
                    })
                }
                if (stocks[i].quantity === orderQuantity) {
                    orderQuantity = 0
                    models.Stocks.destroy({ where: { id: stocks[i].id } })
                }
                if (stocks[i].quantity < orderQuantity) {
                    orderQuantity -= stocks[i].quantity
                    stocks[i].quantity = 0
                    models.Stocks.destroy({ where: { id: stocks[i].id } })
                    i++
                }
            }
        } else {
            res.status(400).json({ message: 'no stock' })
        }
    })
    .catch(error => res.status(400).json({ error }));
}

// Delete Stock
exports.deleteStock = (req, res) => {
    models.Stocks.destroy({ where: { id: req.params.id }})
    .then(() => res.status(200).json({ message: 'stock supprimé' }))
    .catch(error => res.status(400).json({ error }));
};

// Get One Stock
exports.getOneStock = (req, res) => {
    models.Stocks.findOne({ where: { id: req.params.id }})
    .then((stock) => res.status(200).json(stock))
    .catch(error => res.status(400).json({ error }));
};

// Get All Stocks
exports.getAllStocks = (req, res) => {
    models.Stocks.findAll({
        order: [['dluo', 'ASC']]
    })
    .then((stocks) => res.status(200).json(stocks))
    .catch(error => res.status(400).json({ error }));
};

// Get Market Value
exports.getMarketValue = (req, res) => {
    models.Stocks.findAll({ where : { productId: req.params.id}})
    .then((stocks) => {
        let amount = 0;
        stocks.forEach((stock) => {
            amount += (stock.buyingPrice * stock.quantity)
        })
        res.status(200).json(amount)
    })
    .catch(error => res.status(400).json({ error }));
}