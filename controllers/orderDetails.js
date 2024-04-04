const models = require('../models/Index');

// Create OrderDetails
exports.createOrderDetails = (req, res) => {
    // Empty Inputs
    if (req.body.orderId === "" || req.body.productId === "") {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires"});
    }
    if (req.body.quantity === null || req.body.quantity <= 0 || req.body.quantity === "") {
        return res.status(400).json({ message: "Merci de renseigner une quantité valable" });
    }
    if (req.body.stock && (req.body.quantity > req.body.stock)) {
        return res.status(400).json({ message: "Pas assez de stock sur l'entrepôt, veuillez réduire la quantité" });
    }
    models.OrderDetails.create({
        orderId: req.body.orderId,
        productId: req.body.productId,
        quantity: req.body.quantity,
        requestQuantity: req.body.requestQuantity
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

// Get Purchase Order
exports.getPurchaseOrder = async (req, res) => {
    let prod = [];
    const details = await models.OrderDetails.findAll({ where: { orderId: req.params.id } })
    const products = await models.Products.findAll()
    details.forEach(detail => {
        const indexProd = products.findIndex(p => p.id === detail.productId)
        if (indexProd !== -1) {
            if (products[indexProd].categoryId === null) {
                prod.push({
                    name: products[indexProd].name,
                    qty: detail.quantity,
                    packaging: products[indexProd].packaging,
                    category: 'no'
                })
            } else {
                prod.push({
                    name: products[indexProd].name,
                    qty: detail.quantity,
                    packaging: products[indexProd].packaging,
                    category: products[indexProd].categoryId
                })
            }
        }
    })
    let cat = [];
    const categories = await models.Categories.findAll()
    categories.forEach(category => {
        const indexCat = prod.findIndex(pCat => pCat.category === category.id)
        if (indexCat !== -1) {
            cat.push({
                category: category.name,
                id: category.id,
                products: []
            })
        }
    })
    const indexNoCat = prod.findIndex(p => p.category === 'no')
    if (indexNoCat !== -1) {
        cat.push({
            category: 'Sans catégorie attribuée',
            id: 'no',
            products: []
        })
    }
    prod.forEach(product => {
        const indexCat = cat.findIndex(c => c.id === product.category)
        if (indexCat !== -1) {
            cat[indexCat].products.push(product)
        }
    })
    res.status(200).json(cat)
}