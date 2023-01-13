const models = require('../models/Index');

// Create Order
exports.createOrder = (req, res) => {
    // Empty Inputs
    if (req.body.storeId === "" || req.body.delivery === "" || req.body.status === "") {
        return res.status(400).json({ message: "Merci de sélectionner un mode de livraison"});
    }
    if (req.body.storeId === "" || req.body.applicant === "" || req.body.status === "") {
        return res.status(400).json({ message: "Merci d'indiquer le demandeur" });
    }
    models.Orders.create({
        storeId: req.body.storeId,
        delivery: req.body.delivery,
        status: req.body.status,
        commentStore: req.body.commentStore,
        applicant: req.body.applicant,
        billed: 'no'
    })
    .then((order) => res.status(201).json(order))
    .catch(error => res.status(400).json({ error }));    
};

// Edit Order
exports.editOrder = async (req, res) => {
    const order = await models.Orders.findOne({
        where: { id: req.params.id }
    })
    await order.update({
        storeId: req.body.storeId,
        delivery: req.body.delivery,
        status: req.body.status
    })
    .then((order) => res.status(201).json(order))
    .catch(error => res.status(400).json({ error }));
};

// Confirm Order
exports.confirmOrder = async (req, res) => {
    const order = await models.Orders.findOne({
        where: { id: req.params.id }, include: [{ model: models.OrderDetails }]
    })
    await order.update({
        status: 'validated',
        commentWarehouse: req.body.commentWarehouse
    })
    .then((order) => {
        res.status(201).json(order)
    })
    .catch(error => res.status(400).json({ error }));
};

// Confim Invoice
exports.confirmInvoice = async (req, res) => {
    const order = await models.Orders.findOne({
        where: { id: req.params.id }, include: [{ model: models.OrderDetails }]
    })
    await order.update({
        billed: 'yes'
    })
        .then((order) => {
            res.status(201).json(order)
        })
        .catch(error => res.status(400).json({ error }));
}

// Delete Order
exports.deleteOrder = (req, res) => {
    models.Orders.destroy({ where: { id: req.params.id }})
    .then(() => res.status(200).json({ message: 'order supprimée' }))
    .catch(error => res.status(400).json({ error }));
};

// Get One Order
exports.getOneOrder = (req, res) => {
    models.Orders.findOne({ where: { id: req.params.id }, include: [{model: models.OrderDetails}]})
    .then((order) => res.status(200).json(order))
    .catch(error => res.status(400).json({ error }));
};

// Get All Orders
exports.getAllOrders = (req, res) => {
    models.Orders.findAll({
        order: [['createdAt', 'DESC']],
        include: [{model: models.OrderDetails}]
    })
    .then((orders) => res.status(200).json(orders))
    .catch(error => res.status(400).json({ error }));
};

// Get Orders Pending
exports.getOrdersPending = (req, res) => {
    models.Orders.findAll({
        where: { status: 'pending'},
        order: [['createdAt', 'DESC']],
        include: [{ model: models.OrderDetails }]
    })
        .then((orders) => res.status(200).json(orders))
        .catch(error => res.status(400).json({ error }));
};

// Get Orders Validated
exports.getOrdersValidated = (req, res) => {
    models.Orders.findAll({
        where: { status: 'validated' },
        order: [['createdAt', 'DESC']],
        include: [{ model: models.OrderDetails }]
    })
        .then((orders) => res.status(200).json(orders))
        .catch(error => res.status(400).json({ error }));
};

// Get Orders To Bill
exports.getOrdersToBill = (req, res) => {
    models.Orders.findAll({
        where: { billed: 'no', status: 'validated' },
        order: [['createdAt', 'DESC']]
    })
        .then((orders) => res.status(200).json(orders))
        .catch(error => res.status(400).json({ error }));
};

// Check Quantity
exports.checkQuantity = async (req, res) => {
    let checkQuantity = [];
    const order = await models.Orders.findOne({ where: { id: req.params.id }, include: [{ model: models.OrderDetails }] });
    const productsInOrder = await order.orderDetails;
    console.log(productsInOrder)
    productsInOrder.forEach(detail => {
        checkQuantity.push({
            id: detail.productId,
            quantity: detail.quantity
        })
    })
    res.status(200).json(checkQuantity)
}

