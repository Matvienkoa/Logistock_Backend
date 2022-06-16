const bcryptjs = require('bcryptjs');
const models = require('../models/Index');
const passwordValidator = require('../middleware/passwordValidator');
const emailValidator = require('email-validator');

// Edit Profile
exports.modifyUser = (req, res) => {
    // Empty Inputs
    if (req.body.email === "" || req.body.role === "" || req.body.roleNumber === "") {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires"});
    }
    if (!emailValidator.validate(req.body.email)) {
        return res.status(400).json({ message: "Format d'email invalide" });
    }
    models.Users.findOne({ where: { id: req.params.id } })
        .then(user => {
            if(!req.body.password) {
                user.update({
                        email: req.body.email,
                        role: req.body.role,
                        roleNumber: req.body.roleNumber
                })
                .then(() => res.status(200).json({ message: 'Utilisateur modifié' }))
                .catch(error => res.status(400).json({ error }));
            } if (req.body.password) {
                if (!passwordValidator.validate(req.body.password)) {
                    return res.status(400).json({ message: "Mot de Passe invalide : Veuillez utiliser entre 8 et 12 caractères avec au minimum 1 Majuscule, 1 Minuscule et 1 Chiffre." });
                }
                bcryptjs.hash(req.body.password, 10)
                .then(hash => {
                    user.update({
                        email: req.body.email,
                        role: req.body.role,
                        roleNumber: req.body.roleNumber,
                        password: hash
                    })
                })
                .then(() => res.status(200).json({ message: 'Utilisateur modifié' }))
                .catch(error => res.status(400).json({ error }));
            }
        });
};

// Delete Profile
exports.deleteUser = (req, res) => {
    models.Users.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Utilisateur supprimé' }))
        .catch(error => res.status(400).json({ error }));
};

// Get Profiles
exports.getAllUsers = (req, res) => {
    models.Users.findAll({
        order: [['createdAt', 'DESC']]
    })
        .then((users) => { res.send(users)})
        .catch(error => res.status(400).json({ error }));
};

// Get Profile
exports.getOneUser = (req, res) => {
    models.Users.findOne({ where: { id: req.params.id } })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));
};