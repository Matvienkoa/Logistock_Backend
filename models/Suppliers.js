const Sequelize = require('sequelize');
const db = require('../config/config');

const Suppliers = db.define('suppliers', {
    name: {
        type: Sequelize.STRING,
        unique: 'name'
    },
    adress: {
        type: Sequelize.STRING
    },
    adress2: {
        type: Sequelize.STRING
    },
    postalCode: {
        type: Sequelize.STRING
    },
    tel: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    mail: {
        type: Sequelize.STRING
    },
    contact: {
        type: Sequelize.STRING
    },
});

module.exports = Suppliers;