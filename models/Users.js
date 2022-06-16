const Sequelize = require('sequelize');
const db = require('../config/config');

const Users = db.define('users', {
    email: {
        type: Sequelize.STRING,
        unique: 'email'
    },
    password: {
        type: Sequelize.STRING
    },
    role: {
        type: Sequelize.STRING
    },
    roleNumber: {
        type: Sequelize.STRING
    }
});

module.exports = Users;