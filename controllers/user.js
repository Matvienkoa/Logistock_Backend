const bcryptjs = require('bcryptjs');
const models = require('../models/Index');
const passwordValidator = require('../middleware/passwordValidator');
const emailValidator = require('email-validator');

// Change Password
exports.changePassword = (req, res) => {
    // Empty Inputs
    if (req.body.actualPassword === "" || req.body.password === "" || req.body.password2 === "") {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires" });
    }
    // Bad Schema Password
    if (!passwordValidator.validate(req.body.password)) {
        return res.status(400).json({ message: "Mot de Passe invalide : Veuillez utiliser entre 8 et 30 caractères avec au minimum 1 Majuscule, 1 Minuscule et 1 Chiffre" });
    }
    // Different Password
    if (req.body.password !== req.body.password2) {
        return res.status(400).json({ message: "Les mots de passe ne sont pas identiques" });
    }
    models.Users.findOne({ where: { id: req.params.id } })
        .then(user => {
            bcryptjs.compare(req.body.actualPassword, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Mot de passe actuel incorrect' });
                    }
                    bcryptjs.hash(req.body.password, 10)
                        .then(hash => {
                            user.update({
                                password: hash
                            })
                        })
                        .then(() => res.status(200).json({ user }))
                        .catch(error => res.status(400).json({ error }));
                })
                .catch(error => res.status(500).json({ error }));
        })
}

// Edit Profile
exports.modifyUser = async (req, res) => {
    // Empty Inputs
    if (req.body.email === "" || req.body.login === "" || req.body.role === "" || req.body.roleNumber === "") {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires"});
    }
    if (!emailValidator.validate(req.body.email)) {
        return res.status(400).json({ message: "Format d'email invalide" });
    }
    const userLogin = await models.Users.findOne({ where: { login: req.body.login } })
    if (userLogin && userLogin.id !== JSON.parse(req.params.id)) {
        return res.status(400).json({ message: "Ce login existe déjà!" });
    }
    const userMail = await models.Users.findOne({ where: { email: req.body.email } })
    if (userMail && userMail.id !== JSON.parse(req.params.id)) {
        return res.status(400).json({ message: "Ce mail existe déjà!" });
    }
    const user = await models.Users.findOne({ where: { id: req.params.id } })
        user.update({
                email: req.body.email,
                login: req.body.login,
                role: req.body.role,
                roleNumber: req.body.roleNumber
        })
        .then(() => res.status(200).json({ message: 'Utilisateur modifié' }))
        .catch(error => res.status(400).json({ error }));
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
        order: [['roleNumber', 'ASC']]
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