const models = require('../models/Index');

// Create Category
exports.createCategory = async (req, res) => {
    // Empty Inputs
    if (req.body.name === "") {
        return res.status(400).json({ message: "Merci de renseigner un nom de catégorie" });
    }
    const categoryName = await models.Categories.findOne({
        where: { name: req.body.name }
    })
    if (categoryName) {
        return res.status(400).json({ message: "Cette catégorie existe déjà!" });
    }
    models.Categories.create({
        name: req.body.name
    })
    .then((category) => res.status(201).json(category))
    .catch(error => res.status(400).json({ error }));
};

// Edit Category
exports.editCategory = async (req, res) => {
    // Empty Inputs
    if (req.body.name === "") {
        return res.status(400).json({ message: "Merci de renseigner un nom de catégorie" });
    }
    const categoryName = await models.Categories.findOne({
        where: { name: req.body.name }
    })
    if (categoryName && categoryName.id !== JSON.parse(req.params.id)) {
        return res.status(400).json({ message: "Cette catégorie existe déjà!" });
    }
    const categoryId = await models.Categories.findOne({ where: { id: req.params.id } })
    categoryId.update({
        name: req.body.name,
    })
    .then((category) => res.status(201).json(category))
    .catch(error => res.status(400).json({ error }));
}

// Delete Category
exports.deleteCategory = (req, res) => {
    models.Categories.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: 'Catégorie supprimée' }))
    .catch(error => res.status(400).json({ error }));
}

// Get All Categories
exports.getAllCategories = (req, res) => {
    models.Categories.findAll({ order: [['name', 'ASC']] })
    .then((categories) => { res.send(categories) })
    .catch(error => res.status(400).json({ error }));
}

// Get One Category
exports.getOneCategory = (req, res) => {
    models.Categories.findOne({ where: { id: req.params.id } })
    .then((category) => res.status(200).json(category))
    .catch(error => res.status(400).json({ error }));
}