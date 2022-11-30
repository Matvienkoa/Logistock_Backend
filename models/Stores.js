const Sequelize = require('sequelize');
const db = require('../config/config');

const Stores = db.define('stores', {
    number: {
        type: Sequelize.STRING,
        unique: 'number'
    },
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
    city: {
        type: Sequelize.STRING
    },
    tel: {
        type: Sequelize.STRING
    },
});

module.exports = Stores;