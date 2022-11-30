const Users = require('./Users');
const Products = require('./Products');
const Warehouses = require('./Warehouses');
const Stores = require('./Stores');
const Orders = require('./Orders');
const OrderDetails = require('./OrderDetails');
const Stocks = require('./Stocks');
const Suppliers = require('./Suppliers');

Stores.hasMany(Orders);
Orders.hasMany(OrderDetails);
Products.hasMany(Stocks);
Orders.belongsTo(Stores);
OrderDetails.belongsTo(Orders);
Stocks.belongsTo(Products);
Suppliers.hasMany(Products);
Products.belongsTo(Suppliers);

module.exports = {
    Users,
    Products,
    Warehouses,
    Stores,
    Orders,
    OrderDetails,
    Stocks,
    Suppliers
}