const Sequelize = require('sequelize');
const db = require('../config/config');

const Products = db.define('products', {
    reference: {
        type: Sequelize.STRING,
        unique: 'reference'
    },
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    category: {
        type: Sequelize.STRING
    },
    subCategory: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.STRING
    },
    packaging: {
        type: Sequelize.STRING
    },
    leadTime: {
        type: Sequelize.STRING
    },
    tva: {
        type: Sequelize.STRING
    },
    size: {
        type: Sequelize.STRING
    },
    supplierId: {
        type: Sequelize.INTEGER
    },
    onSale: {
        type: Sequelize.STRING
    }
});

module.exports = Products;