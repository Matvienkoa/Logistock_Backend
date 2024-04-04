const Users = require('./Users');
const Products = require('./Products');
const Warehouses = require('./Warehouses');
const Stores = require('./Stores');
const Orders = require('./Orders');
const OrderDetails = require('./OrderDetails');
const Stocks = require('./Stocks');
const Suppliers = require('./Suppliers');
const Sales = require('./Sales');
const Categories = require('./Categories');
const Permissions = require('./Permissions');

Stores.hasMany(Orders);
Orders.hasMany(OrderDetails);
Products.hasMany(Stocks);
Products.hasMany(Permissions);
Orders.belongsTo(Stores);
OrderDetails.belongsTo(Orders);
Stocks.belongsTo(Products);
Suppliers.hasMany(Products);
Products.belongsTo(Suppliers);
Categories.hasMany(Products);
Products.belongsTo(Categories);
Permissions.belongsTo(Products);

module.exports = {
    Users,
    Products,
    Warehouses,
    Stores,
    Orders,
    OrderDetails,
    Stocks,
    Suppliers,
    Sales,
    Categories,
    Permissions
}