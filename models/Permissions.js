const Sequelize = require('sequelize');
const db = require('../config/config');

const Permissions = db.define('permissions', {
    store: {
        type: Sequelize.STRING
    },
    storeName: {
        type: Sequelize.STRING
    },
    productId: {
        type: Sequelize.INTEGER
    }
});

module.exports = Permissions;