const Sequelize = require('sequelize');
const db = require('../config/config');

const OrderDetails = db.define('orderDetails', {
    orderId: {
        type: Sequelize.INTEGER
    },
    productId: {
        type: Sequelize.STRING
    },
    quantity: {
        type: Sequelize.INTEGER
    },
    requestQuantity: {
        type: Sequelize.INTEGER
    }
});

module.exports = OrderDetails;