const Users = require('./Users');
const Products = require('./Products');
const Warehouses = require('./Warehouses');
const Stores = require('./Stores');
const Orders = require('./Orders');
const OrderDetails = require('./OrderDetails');
const Stocks = require('./Stocks');

Stores.hasMany(Orders);
Orders.hasMany(OrderDetails);
Products.hasMany(Stocks);
Orders.belongsTo(Stores);
OrderDetails.belongsTo(Orders);
Stocks.belongsTo(Products);

module.exports = {
    Users,
    Products,
    Warehouses,
    Stores,
    Orders,
    OrderDetails,
    Stocks,
}