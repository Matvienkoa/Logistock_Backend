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
    },
    commentStore: {
        type: Sequelize.STRING
    },
    commentWarehouse: {
        type: Sequelize.STRING
    },
    applicant: {
        type: Sequelize.STRING
    },
    billed: {
        type: Sequelize.STRING
    }
});

module.exports = Orders;