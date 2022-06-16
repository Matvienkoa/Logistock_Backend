const Sequelize = require('sequelize');
const db = require('../config/config');

const Stocks = db.define('stocks', {
    productId: {
        type: Sequelize.INTEGER
    },
    quantity: {
        type: Sequelize.INTEGER
    },
    buyingDate: {
        type: Sequelize.DATE
    },
    buyingPrice: {
        type: Sequelize.INTEGER
    },
    dluo: {
        type: Sequelize.DATE
    },
    packaging: {
        type: Sequelize.INTEGER
    },
    size: {
        type: Sequelize.STRING
    }
});

module.exports = Stocks;