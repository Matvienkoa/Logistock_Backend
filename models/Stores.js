const Sequelize = require('sequelize');
const db = require('../config/config');

const Stores = db.define('stores', {
    number: {
        type: Sequelize.STRING,
        unique: 'number'
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
    city: {
        type: Sequelize.STRING
    },
    tel: {
        type: Sequelize.STRING
    },
});

module.exports = Stores;