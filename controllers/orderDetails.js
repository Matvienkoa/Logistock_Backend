const models = require('../models/Index');

// Create OrderDetails
exports.createOrderDetails = (req, res) => {
    // Empty Inputs
    if (req.body.orderId === "" || req.body.productId === "" || req.body.quantity === "") {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires"});
    }
    models.OrderDetails.create({
        orderId: req.body.orderId,
        productId: req.body.productId,
        quantity: req.body.quantity,
        requestQuantity: req.body.quantity
    })
    .then((orderdetails) => res.status(201).json(orderdetails))
    .catch(error => res.status(400).json({ error }));    
};

// Edit Quantity
exports.editOrderDetails = async (req, res) => {
    const orderdetail = await models.OrderDetails.findOne({
        where: { id: req.params.id }
    })
    await orderdetail.update({
        quantity: req.body.quantity
    })
    .then((orderdetail) => res.status(201).json(orderdetail))
    .catch(error => res.status(400).json({ error }));
};

// Delete OrderDetails
exports.deleteOrderDetails = (req, res) => {
    models.OrderDetails.destroy({ where: { id: req.params.id }})
    .then(() => res.status(200).json({ message: 'orderdetail supprimée' }))
    .catch(error => res.status(400).json({ error }));
};

// Get One OrderDetails
exports.getOneOrderDetails = (req, res) => {
    models.OrderDetails.findOne({ where: { id: req.params.id }})
    .then((orderdetail) => res.status(200).json(orderdetail))
    .catch(error => res.status(400).json({ error }));
};

// Get All OrderDetails
exports.getAllOrderDetails = (req, res) => {
    models.OrderDetails.findAll({
        order: [['createdAt', 'DESC']]
    })
    .then((orderdetails) => res.status(200).json(orderdetails))
    .catch(error => res.status(400).json({ error }));
};