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