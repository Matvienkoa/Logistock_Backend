const Sequelize = require('sequelize');
const db = require('../config/config');

const Products = db.define('products', {
    reference: {
        type: Sequelize.STRING,
        unique: 'reference'
    },
    title: {
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
    supplier: {
        type: Sequelize.STRING
    },
    packaging: {
        type: Sequelize.INTEGER
    },
    leadTime: {
        type: Sequelize.INTEGER
    },
    tva: {
        type: Sequelize.FLOAT
    },
    size: {
        type: Sequelize.STRING
    },
});

module.exports = Products;