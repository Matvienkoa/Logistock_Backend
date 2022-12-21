const Sequelize = require('sequelize');
const db = require('../config/config');

const Sales = db.define('sales', {
    productId: {
        type: Sequelize.INTEGER
    },
    productName: {
        type: Sequelize.STRING
    },
    storeId: {
        type: Sequelize.INTEGER
    },
    storeName: {
        type: Sequelize.STRING
    },
    supplierId: {
        type: Sequelize.INTEGER
    },
    supplierName: {
        type: Sequelize.STRING
    },
    quantity: {
        type: Sequelize.INTEGER
    },
});

module.exports = Sales;