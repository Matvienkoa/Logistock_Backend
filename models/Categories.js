const Sequelize = require('sequelize');
const db = require('../config/config');

const Categories = db.define('categories', {
    name: {
        type: Sequelize.STRING,
        unique: 'name'
    }
});

module.exports = Categories;