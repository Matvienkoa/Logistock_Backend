const Sequelize = require('sequelize');
const db = require('../config/config');

const Orders = db.define('orders', {
    storeId: {
        type: Sequelize.INTEGER
    },
    delivery: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING
    }
});

module.exports = Orders;