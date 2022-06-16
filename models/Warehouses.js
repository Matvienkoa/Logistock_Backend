const Sequelize = require('sequelize');
const db = require('../config/config');

const Warehouses = db.define('warehouses', {
    adress: {
        type: Sequelize.STRING
    },
    adress2: {
        type: Sequelize.STRING
    },
    postalCode: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    number: {
        type: Sequelize.STRING,
        unique: 'number'
    }
});

module.exports = Warehouses;